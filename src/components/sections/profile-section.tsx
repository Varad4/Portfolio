import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Briefcase, Mail, MapPin, UserCircle } from 'lucide-react';

const userProfile = {
  name: 'Alex Johnson',
  title: 'Senior Software Engineer & AI Enthusiast',
  bio: "Passionate about building innovative solutions that leverage cutting-edge technology. With over 8 years of experience in software development, I specialize in full-stack web applications, cloud computing, and machine learning. I'm always eager to learn new things and tackle challenging problems. My goal is to create impactful products that make a difference.",
  imageUrl: 'https://placehold.co/300x300.png',
  imageHint: 'professional portrait',
  email: 'alex.johnson@example.com',
  location: 'San Francisco, CA',
  skills: ['React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TensorFlow', 'Next.js'],
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
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground/90">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {userProfile.skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full">
                            {skill}
                          </span>
                        ))}
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
