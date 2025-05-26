export default function Footer() {
  return (
    <footer className="py-8 text-center bg-card border-t">
      <div className="container mx-auto">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} PersonaAI. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Powered by Next.js and Generative AI
        </p>
      </div>
    </footer>
  );
}
