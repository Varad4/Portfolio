'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Database, Cloud, Palette, Wrench } from 'lucide-react';

const initialSkills = [
  // Programming Languages
  { name: 'Java', category: 'Programming Languages', icon: <Code className="h-4 w-4 mr-1" /> },
  { name: 'C++', category: 'Programming Languages', icon: <Code className="h-4 w-4 mr-1" /> },
  { name: 'Python', category: 'Programming Languages', icon: <Code className="h-4 w-4 mr-1" /> },
  { name: 'JavaScript', category: 'Programming Languages', icon: <Code className="h-4 w-4 mr-1" /> },
  // Software Development (Web)
  { name: 'HTML', category: 'Software Development', icon: <Code className="h-4 w-4 mr-1" /> },
  { name: 'CSS', category: 'Software Development', icon: <Code className="h-4 w-4 mr-1" /> },
  { name: 'Spring MVC', category: 'Software Development', icon: <Code className="h-4 w-4 mr-1" /> },
  // Database Management
  { name: 'SQL', category: 'Database Management', icon: <Database className="h-4 w-4 mr-1" /> },
  { name: 'MySQL', category: 'Database Management', icon: <Database className="h-4 w-4 mr-1" /> },
  { name: 'MongoDB', category: 'Database Management', icon: <Database className="h-4 w-4 mr-1" /> },
  { name: 'Postgres', category: 'Database Management', icon: <Database className="h-4 w-4 mr-1" /> },
  // Developer Tools
  { name: 'VS Code', category: 'Developer Tools', icon: <Wrench className="h-4 w-4 mr-1" /> },
  { name: 'Git', category: 'Developer Tools', icon: <Wrench className="h-4 w-4 mr-1" /> },
  // Cloud Development
  { name: 'AWS', category: 'Cloud Development', icon: <Cloud className="h-4 w-4 mr-1" /> },
  { name: 'Google Cloud', category: 'Cloud Development', icon: <Cloud className="h-4 w-4 mr-1" /> },
  // UI/UX Development
  { name: 'Figma', category: 'UI/UX Development', icon: <Palette className="h-4 w-4 mr-1" /> },
  { name: 'WordPress', category: 'UI/UX Development', icon: <Palette className="h-4 w-4 mr-1" /> },
  { name: 'Canva', category: 'UI/UX Development', icon: <Palette className="h-4 w-4 mr-1" /> },
];

const categoryIcons: { [key: string]: JSX.Element } = {
  'Programming Languages': <Code className="h-5 w-5 text-primary" />,
  'Software Development': <Code className="h-5 w-5 text-primary" />,
  'Database Management': <Database className="h-5 w-5 text-primary" />,
  'Developer Tools': <Wrench className="h-5 w-5 text-primary" />,
  'Cloud Development': <Cloud className="h-5 w-5 text-primary" />,
  'UI/UX Development': <Palette className="h-5 w-5 text-primary" />,
};

export default function SkillsSection() {
  const skillCategories = Array.from(new Set(initialSkills.map(skill => skill.category)));

  return (
    <section id="skills" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Skills & Expertise</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map(category => (
            <Card key={category} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center space-x-2">
                {categoryIcons[category] || <Code className="h-5 w-5 text-primary" />}
                <CardTitle className="text-xl text-primary">{category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {initialSkills.filter(skill => skill.category === category).map((skill) => (
                    <Badge key={skill.name} variant="secondary" className="text-sm px-3 py-1 flex items-center">
                      {skill.icon} {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
