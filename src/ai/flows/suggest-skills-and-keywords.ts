'use server';

/**
 * @fileOverview An AI agent that suggests relevant skills and keywords based on work experience and project descriptions.
 *
 * - suggestSkillsAndKeywords - A function that handles the skill and keyword suggestion process.
 * - SuggestSkillsAndKeywordsInput - The input type for the suggestSkillsAndKeywords function.
 * - SuggestSkillsAndKeywordsOutput - The return type for the suggestSkillsAndKeywords function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestSkillsAndKeywordsInputSchema = z.object({
  workExperience: z
    .string()
    .describe('Description of the user\'s work experience.'),
  projectDescriptions: z
    .string()
    .describe('Description of the user\'s projects.'),
});
export type SuggestSkillsAndKeywordsInput = z.infer<typeof SuggestSkillsAndKeywordsInputSchema>;

const SuggestSkillsAndKeywordsOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('A list of suggested skills based on the input.'),
  suggestedKeywords: z
    .array(z.string())
    .describe('A list of suggested keywords based on the input.'),
});
export type SuggestSkillsAndKeywordsOutput = z.infer<typeof SuggestSkillsAndKeywordsOutputSchema>;

export async function suggestSkillsAndKeywords(
  input: SuggestSkillsAndKeywordsInput
): Promise<SuggestSkillsAndKeywordsOutput> {
  return suggestSkillsAndKeywordsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestSkillsAndKeywordsPrompt',
  input: {schema: SuggestSkillsAndKeywordsInputSchema},
  output: {schema: SuggestSkillsAndKeywordsOutputSchema},
  prompt: `You are an AI assistant designed to suggest relevant skills and keywords for a user's portfolio based on their work experience and project descriptions.

  Work Experience: {{{workExperience}}}
  Project Descriptions: {{{projectDescriptions}}}

  Please provide a list of suggested skills and keywords that would be relevant to highlight in their portfolio.
  Skills: 
  Keywords:
  `, // Ensure lists are comma-separated and formatted for easy use.
});

const suggestSkillsAndKeywordsFlow = ai.defineFlow(
  {
    name: 'suggestSkillsAndKeywordsFlow',
    inputSchema: SuggestSkillsAndKeywordsInputSchema,
    outputSchema: SuggestSkillsAndKeywordsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
