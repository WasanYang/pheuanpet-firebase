'use server';
/**
 * @fileOverview An AI flow for the expert chat feature.
 *
 * - expertChat - A function that responds to user queries in a chat conversation.
 * - ExpertChatInput - The input type for the expertChat function.
 * - ExpertChatOutput - The return type for the expertChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MessageSchema = z.object({
    role: z.enum(['user', 'model']).describe("The role of the message sender."),
    content: z.string().describe("The content of the message.")
});

export const ExpertChatInputSchema = z.object({
  history: z.array(MessageSchema).describe("The history of the conversation so far.")
});
export type ExpertChatInput = z.infer<typeof ExpertChatInputSchema>;

export type ExpertChatOutput = string;

// The exported wrapper function
export async function expertChat(input: ExpertChatInput): Promise<ExpertChatOutput> {
  return expertChatFlow(input);
}

const expertChatPrompt = ai.definePrompt({
  name: 'expertChatPrompt',
  input: {schema: ExpertChatInputSchema},
  output: {format: 'text'},
  prompt: `You are a friendly and helpful AI Pet Care Assistant for an app called PheuanPet. Your goal is to provide general advice and answer questions about pet care.

Conversation History:
{{#each history}}
- {{role}}: {{content}}
{{/each}}
- model:

IMPORTANT:
- Keep your answers concise and easy to understand.
- Always include a disclaimer at the end of your first response in any conversation: "Please remember, I am an AI assistant and not a real veterinarian. For any medical concerns or emergencies, please consult a qualified vet."
- Do not provide medical diagnoses or prescribe medication. You can provide general information but must always refer the user to a professional veterinarian for diagnosis and treatment.
- Use a friendly and encouraging tone.`,
});

const expertChatFlow = ai.defineFlow(
  {
    name: 'expertChatFlow',
    inputSchema: ExpertChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const {output} = await expertChatPrompt(input);
    return output!;
  }
);
