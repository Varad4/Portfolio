'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, Info } from 'lucide-react';
import { handleSummarizeProject, type SummarizeProjectState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

const initialProjects = [
  {
    id: '1',
    title: 'E-commerce Platform Revamp',
    description: 'Led the redesign and development of a scalable e-commerce platform, improving performance by 40% and user engagement by 25%. Integrated advanced search, personalized recommendations, and a streamlined checkout process.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'ecommerce website',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: '2',
    title: 'AI-Powered Customer Support Chatbot',
    description: 'Developed an NLP-based chatbot to handle customer inquiries, reducing response times by 60% and improving customer satisfaction. The chatbot was trained on a custom dataset and integrated with existing CRM systems.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'chatbot interface',
    technologies: ['Python', 'TensorFlow', 'Flask', 'Docker'],
    liveLink: '#',
    repoLink: '#',
  },
  {
    id: '3',
    title: 'Cloud Migration & DevOps Automation',
    description: 'Managed the migration of legacy applications to a cloud-native architecture on AWS. Implemented CI/CD pipelines, infrastructure as code (Terraform), and automated monitoring, resulting in 99.99% uptime.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud infrastructure',
    technologies: ['AWS', 'Terraform', 'Jenkins', 'Kubernetes'],
    liveLink: '#',
    repoLink: '#',
  },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lightbulb className="mr-2 h-4 w-4" />}
      Summarize Project
    </Button>
  );
}

export default function ProjectsSection() {
  const { toast } = useToast();
  const initialState: SummarizeProjectState = { message: null, summary: null, errors: null };
  const [state, dispatch] = useFormState(handleSummarizeProject, initialState);
  const [projectText, setProjectText] = useState('');

  useEffect(() => {
    if (state.message) {
      if (state.summary) {
        toast({
          title: "AI Summary Ready!",
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

  return (
    <section id="projects" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">My Projects</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {initialProjects.map((project) => (
            <Card key={project.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full h-48">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={project.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-primary">{project.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground h-20 overflow-y-auto">{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-foreground/90">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {/* <Button variant="outline" asChild><a href={project.repoLink} target="_blank" rel="noopener noreferrer">View Code</a></Button>
                <Button variant="default" asChild><a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Demo</a></Button> */}
              </CardFooter>
            </Card>
          ))}
        </div>

        <Card className="shadow-xl mt-12 p-6 md:p-8">
          <CardHeader className="p-0 mb-6">
            <CardTitle className="text-2xl md:text-3xl font-bold text-accent flex items-center gap-2">
              <Lightbulb className="h-7 w-7" />
              AI Project Summarizer
            </CardTitle>
            <CardDescription className="text-md text-muted-foreground">
              Have a project description? Let AI create a concise summary for you.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <form action={dispatch} className="space-y-6">
              <div>
                <Label htmlFor="projectText" className="text-lg font-medium text-foreground/90">Project Description</Label>
                <Textarea
                  id="projectText"
                  name="projectText"
                  rows={8}
                  placeholder="Paste your detailed project description here (min 50 characters)..."
                  className="mt-2 text-base"
                  value={projectText}
                  onChange={(e) => setProjectText(e.target.value)}
                  aria-describedby="projectText-error"
                />
                {state.errors?.projectText && (
                  <p id="projectText-error" className="text-sm text-destructive mt-1">{state.errors.projectText.join(', ')}</p>
                )}
              </div>
              <SubmitButton />
            </form>
            {state.summary && (
              <Alert className="mt-8 bg-primary/5 border-primary/20">
                <Info className="h-5 w-5 text-primary" />
                <AlertTitle className="text-lg font-semibold text-primary">AI Generated Summary:</AlertTitle>
                <AlertDescription className="text-md text-foreground/80 whitespace-pre-wrap">
                  {state.summary}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
