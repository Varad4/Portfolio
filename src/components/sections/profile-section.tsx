import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Mail, MapPin, UserCircle, Phone, Linkedin, Github } from 'lucide-react';

const userProfile = {
  name: 'Varad Mishra',
  title: 'Aspiring Software Engineer | B.Tech Computer Science Student',
  bio: "A motivated B.Tech Computer Science student specializing in Internet Of Things, Cyber Security, and Blockchain at Lakshmi Narain College Of Technology, Bhopal (2021-2025). Experienced in developing diverse projects including AI assistants, music streaming clones, weather apps, and cloud storage systems. Proven leadership as Team Leader at Rajasthan IT Day Hackathon and coordination skills from managing large-scale events like the 6th Engineering Olympics. Actively seeking opportunities to apply and expand technical skills in a dynamic environment.",
  imageUrl: 'https://ceoworld.biz/wp-content/uploads/2020/01/Teenage-boy-checking-programming-code.jpg',
  imageHint: 'professional portrait',
  email: 'varadmishra0411@gmail.com',
  phone: '+91 9236183883',
  location: 'Jhansi, UP',
  linkedin: 'https://www.linkedin.com/in/varadmishra/', // Placeholder, replace with actual link if available
  github: 'https://github.com/varadmishra', // Placeholder, replace with actual link if available
  skills: ['Java', 'C++', 'Python', 'JavaScript', 'HTML', 'CSS', 'Spring MVC', 'SQL', 'MySQL', 'MongoDB', 'Postgres', 'AWS', 'Google Cloud', 'Figma', 'WordPress', 'Canva'],
};

export default function ProfileSection() {
  return (
    <section id="profile" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/3 relative">
              <Image
                src={userProfile.imageUrl}
                alt={userProfile.name}
                width={400}
                height={400}
                className="object-cover w-full h-full aspect-square"
                data-ai-hint={userProfile.imageHint}
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <UserCircle className="h-8 w-8 text-primary" />
                  <CardTitle className="text-3xl md:text-4xl font-bold text-primary">
                    {userProfile.name}
                  </CardTitle>
                </div>
                <CardDescription className="text-lg md:text-xl text-accent-foreground bg-accent px-3 py-1 rounded-md inline-block">
                  {userProfile.title}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8 pt-0">
                <p className="text-base md:text-lg text-foreground/90 mb-6 leading-relaxed">
                  {userProfile.bio}
                </p>
                <div className="space-y-3 text-foreground/80">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <a href={`mailto:${userProfile.email}`} className="hover:underline">{userProfile.email}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <span>{userProfile.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-primary" />
                    <a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <a href={userProfile.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
                  </div>
                  <div className="flex items-start gap-3 pt-3">
                    <Briefcase className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground/90">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.skills.slice(0, 7).map((skill) => ( // Show a subset of skills
                          <span key={skill} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                            {skill}
                          </span>
                        ))}
                         {userProfile.skills.length > 7 && (
                           <span className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                            + {userProfile.skills.length - 7} more
                          </span>
                         )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
