'use server';

import { z } from 'zod';
import { summarizeProject } from '@/ai/flows/summarize-project';
import { suggestSkillsAndKeywords } from '@/ai/flows/suggest-skills-and-keywords';

// Schema for Project Summarization
const SummarizeProjectSchema = z.object({
  projectText: z.string().min(50, { message: 'Project description must be at least 50 characters long.' }),
});

export type SummarizeProjectState = {
  message?: string | null;
  summary?: string | null;
  errors?: {
    projectText?: string[];
  } | null;
};

export async function handleSummarizeProject(
  prevState: SummarizeProjectState,
  formData: FormData
): Promise<SummarizeProjectState> {
  const validatedFields = SummarizeProjectSchema.safeParse({
    projectText: formData.get('projectText'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  try {
    const { projectText } = validatedFields.data;
    const result = await summarizeProject({ projectText });
    return { summary: result.summary, message: 'Project summarized successfully!' };
  } catch (error) {
    console.error('Error summarizing project:', error);
    return { message: 'An error occurred while summarizing the project. Please try again.', summary: null };
  }
}

// Schema for Skills and Keywords Suggestion
const SuggestSkillsSchema = z.object({
  workExperience: z.string().min(50, { message: 'Work experience must be at least 50 characters long.' }),
  projectDescriptions: z.string().min(50, { message: 'Project descriptions must be at least 50 characters long.' }),
});

export type SuggestSkillsState = {
  message?: string | null;
  suggestedSkills?: string[] | null;
  suggestedKeywords?: string[] | null;
  errors?: {
    workExperience?: string[];
    projectDescriptions?: string[];
  } | null;
};

export async function handleSuggestSkills(
  prevState: SuggestSkillsState,
  formData: FormData
): Promise<SuggestSkillsState> {
  const validatedFields = SuggestSkillsSchema.safeParse({
    workExperience: formData.get('workExperience'),
    projectDescriptions: formData.get('projectDescriptions'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your inputs.',
    };
  }

  try {
    const { workExperience, projectDescriptions } = validatedFields.data;
    const result = await suggestSkillsAndKeywords({ workExperience, projectDescriptions });
    return { 
      suggestedSkills: result.suggestedSkills, 
      suggestedKeywords: result.suggestedKeywords, 
      message: 'Skills and keywords suggested successfully!' 
    };
  } catch (error) {
    console.error('Error suggesting skills:', error);
    return { message: 'An error occurred while suggesting skills. Please try again.' };
  }
}

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
