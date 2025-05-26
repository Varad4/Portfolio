'use server';

import { z } from 'zod';

// Schema for Contact Form
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters long.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters long.' }),
});

export type ContactFormState = {
  message?: string | null;
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  } | null;
  success?: boolean;
};

export async function handleContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const validatedFields = ContactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  // In a real application, you would send an email here.
  // For this prototype, we'll just log it to the console.
  console.log('Contact Form Submission:');
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Message:', message);

  return { message: 'Your message has been sent successfully! We will get back to you soon.', success: true };
}
