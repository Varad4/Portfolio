'use client';

import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link as LinkIcon } from 'lucide-react';

const initialProjects = [
  {
    id: '1',
    title: 'AI Desktop Assistant',
    description: "Built an open-source AI desktop assistant using OpenAI's API and Python. It interacts with users human-like, providing responses and performing tasks. Source code available online for contribution and customization.",
    imageUrl: 'https://belwoodmusic.com/wp-content/uploads/2015/01/spotify-logo.jpg',
    imageHint: 'AI assistant interface',
    technologies: ['Python', 'OpenAI API', 'UI/UX'],
    // liveLink: '#', // Add actual links if available
    // repoLink: '#',
  },
  {
    id: '2',
    title: 'Spotify Clone',
    description: 'Developed a music streaming app with React Native, Firebase, and Tailwind CSS. Features AI-driven music recommendations, playlist creation, song search, and real-time audio streaming with a seamless UI/UX.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'music streaming app',
    technologies: ['React Native', 'Firebase', 'Tailwind CSS', 'AI'],
    // liveLink: '#',
    // repoLink: '#',
  },
  {
    id: '3',
    title: 'Weather App',
    description: 'Created an intuitive and visually appealing weather app using HTML, CSS, and JavaScript. Integrates Weather API and Location API for accurate, up-to-date weather information based on user input.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'weather app display',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Weather API', 'Location API'],
    // liveLink: '#',
    // repoLink: '#',
  },
  {
    id: '4',
    title: 'Cloud-Based Storage System',
    description: 'Developed a secure cloud storage platform using React, Firebase, and AWS S3. Implemented user authentication, file encryption, real-time access control, and seamless file uploads/sharing with a scalable infrastructure.',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'cloud storage dashboard',
    technologies: ['React', 'Firebase', 'AWS S3', 'Security'],
    // liveLink: '#', // Add actual link from resume: (Try it here)
    // repoLink: '#',
  },
];

export default function ProjectsSection() {
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
                <CardDescription className="text-sm text-muted-foreground h-24 overflow-y-auto">{project.description}</CardDescription>
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
                {project.liveLink && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-3 w-3" /> Live Demo
                    </a>
                  </Button>
                )}
                {project.repoLink && (
                  <Button variant="default" size="sm" asChild>
                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                      View Code
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
