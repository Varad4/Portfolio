'use client';

import { useState, useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Wand2, CheckCircle } from 'lucide-react';
import { handleSuggestSkills, type SuggestSkillsState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const initialSkills = [
  { name: 'JavaScript (ES6+)', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'React & Next.js', category: 'Frontend' },
  { name: 'HTML5 & CSS3', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js & Express.js', category: 'Backend' },
  { name: 'Python (Flask/Django)', category: 'Backend' },
  { name: 'RESTful APIs & GraphQL', category: 'Backend' },
  { name: 'PostgreSQL & MongoDB', category: 'Database' },
  { name: 'AWS & Google Cloud', category: 'Cloud' },
  { name: 'Docker & Kubernetes', category: 'DevOps' },
  { name: 'CI/CD Pipelines', category: 'DevOps' },
  { name: 'Git & GitHub', category: 'Tools' },
  { name: 'Agile Methodologies', category: 'Other' },
  { name: 'Machine Learning Basics', category: 'AI' },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Suggest Skills & Keywords
    </Button>
  );
}

export default function SkillsSection() {
  const { toast } = useToast();
  const initialState: SuggestSkillsState = { message: null, errors: null };
  const [state, dispatch] = useFormState(handleSuggestSkills, initialState);
  const [workExperience, setWorkExperience] = useState('');
  const [projectDescriptions, setProjectDescriptions] = useState('');

  useEffect(() => {
    if (state.message) {
      if (state.suggestedSkills || state.suggestedKeywords) {
        toast({
          title: "AI Suggestions Ready!",
          description: state.message,
          variant: 'default',
        });
      } else if (state.errors) {
         toast({
          title: "Oops! Something went wrong.",
          description: state.message,
          variant: 'destructive',
        });
      } else {
         toast({
          title: "Update",
          description: state.message,
          variant: 'default',
        });
      }
    }
  }, [state, toast]);
  
  const skillCategories = Array.from(new Set(initialSkills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map(category => (
            <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {initialSkills.filter(skill => skill.category === category).map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-sm px-3 py-1">{skill.name}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-xl mt-12 p-6 md:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-accent flex items-center gap-2">
              <Wand2 className="h-7 w-7" />
              AI Skill & Keyword Suggester
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground">
              Provide your experience and project details to get AI-powered suggestions for skills and keywords.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form action={dispatch} className="space-y-6">
              <div>
                <Label htmlFor="workExperience" className="text-lg font-medium text-foreground/90">Work Experience</Label>
                <Textarea
                  id="workExperience"
                  name="workExperience"
                  rows={6}
                  placeholder="Describe your professional work experience (min 50 characters)..."
                  className="mt-2 text-base"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                  aria-describedby="workExperience-error"
                />
                {state.errors?.workExperience && (
                  <p id="workExperience-error" className="text-sm text-destructive mt-1">{state.errors.workExperience.join(', ')}</p>
                )}
              </div>
              <div>
                <Label htmlFor="projectDescriptions" className="text-lg font-medium text-foreground/90">Project Descriptions</Label>
                <Textarea
                  id="projectDescriptions"
                  name="projectDescriptions"
                  rows={6}
                  placeholder="Summarize your key projects (min 50 characters)..."
                  className="mt-2 text-base"
                  value={projectDescriptions}
                  onChange={(e) => setProjectDescriptions(e.target.value)}
                  aria-describedby="projectDescriptions-error"
                />
                {state.errors?.projectDescriptions && (
                  <p id="projectDescriptions-error" className="text-sm text-destructive mt-1">{state.errors.projectDescriptions.join(', ')}</p>
                )}
              </div>
              <SubmitButton />
            </form>
            
            {(state.suggestedSkills || state.suggestedKeywords) && (
              <Alert className="mt-8 bg-primary/5 border-primary/20">
                <CheckCircle className="h-5 w-5 text-primary" />
                <AlertTitle className="text-lg font-semibold text-primary">AI Generated Suggestions:</AlertTitle>
                <AlertDescription className="text-md text-foreground/80">
                  {state.suggestedSkills && state.suggestedSkills.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-foreground/90 mb-2">Suggested Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {state.suggestedSkills.map((skill, index) => (
                          <Badge key={`skill-${index}`} variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {state.suggestedKeywords && state.suggestedKeywords.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-foreground/90 mb-2">Suggested Keywords:</h4>
                      <div className="flex flex-wrap gap-2">
                        {state.suggestedKeywords.map((keyword, index) => (
                          <Badge key={`keyword-${index}`} variant="outline" className="text-sm">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
