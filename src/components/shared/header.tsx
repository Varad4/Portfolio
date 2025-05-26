import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Code2 } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-6 px-4 md:px-6 bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Code2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">PersonaAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Button variant="link" asChild>
            <Link href="#profile">Profile</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#projects">Projects</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#skills">Skills</Link>
          </Button>
          <Button variant="link" asChild>
            <Link href="#contact">Contact</Link>
          </Button>
        </nav>
        {/* Mobile navigation could be added here with a Sheet component */}
      </div>
    </header>
  );
}
