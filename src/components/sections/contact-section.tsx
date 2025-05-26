
'use client';

import { useEffect, useActionState } from 'react'; // Correct: useActionState from 'react'
import { useFormStatus } from 'react-dom'; // Correct: useFormStatus from 'react-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Send, MailCheck } from 'lucide-react';
import { handleContactForm, type ContactFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      Send Message
    </Button>
  );
}

export default function ContactSection() {
  const { toast } = useToast();
  const initialState: ContactFormState = { message: null, errors: null, success: false };
  const [state, dispatch, isPending] = useActionState(handleContactForm, initialState);


  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Message Sent!" : "Error",
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        // Optionally reset form fields here if using controlled components
        // For uncontrolled with server actions, Next.js might re-render and clear them
        // or you might need to manage reset via a key on the form or ref.
      }
    }
  }, [state, toast]);

  return (
    <section id="contact" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-2xl mx-auto shadow-xl p-6 md:p-8">
          <CardHeader className="p-0 mb-6 text-center">
            <CardTitle className="text-3xl md:text-4xl font-bold text-primary">Get In Touch</CardTitle>
            <CardDescription className="text-md md:text-lg text-muted-foreground mt-2">
              Have a question or want to work together? Fill out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {state.success ? (
              <div className="flex flex-col items-center justify-center text-center p-8 bg-green-50 border border-green-200 rounded-md">
                <MailCheck className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold text-green-700 mb-2">Message Sent!</h3>
                <p className="text-green-600">{state.message}</p>
              </div>
            ) : (
              <form action={dispatch} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-medium text-foreground/90">Full Name</Label>
                  <Input 
                    type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Your Name" 
                    className="mt-2 text-base" 
                    aria-describedby="name-error"
                  />
                  {state.errors?.name && (
                    <p id="name-error" className="text-sm text-destructive mt-1">{state.errors.name.join(', ')}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-lg font-medium text-foreground/90">Email Address</Label>
                  <Input 
                    type="email" 
                    id="email" 
                    name="email" 
                    placeholder="your.email@example.com" 
                    className="mt-2 text-base"
                    aria-describedby="email-error"
                  />
                  {state.errors?.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1">{state.errors.email.join(', ')}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="message" className="text-lg font-medium text-foreground/90">Message</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    rows={6} 
                    placeholder="Your message here..." 
                    className="mt-2 text-base" 
                    aria-describedby="message-error"
                  />
                  {state.errors?.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1">{state.errors.message.join(', ')}</p>
                  )}
                </div>
                <SubmitButton />
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
