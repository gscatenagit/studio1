'use server';
/**
 * @fileOverview A transaction creation engine.
 *
 * - createTransaction - A function that handles the transaction creation process.
 * - CreateTransactionInput - The input type for the createTransaction function.
 * - CreateTransactionOutput - The return type for the createTransaction function.
 */

import '@/lib/firebase-admin';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { getFirestore } from 'firebase-admin/firestore';

const CreateTransactionInputSchema = z.object({
  userId: z.string(),
  description: z.string(),
  amount: z.number(),
  type: z.enum(["Receita", "Despesa"]),
  date: z.string().datetime(), // Accept date as an ISO string
  category: z.string(),
  accountId: z.string(),
});
export type CreateTransactionInput = z.infer<typeof CreateTransactionInputSchema>;

const CreateTransactionOutputSchema = z.object({
  transactionId: z.string(),
});
export type CreateTransactionOutput = z.infer<typeof CreateTransactionOutputSchema>;

export async function createTransaction(input: CreateTransactionInput): Promise<CreateTransactionOutput> {
  return createTransactionFlow(input);
}

const createTransactionFlow = ai.defineFlow(
  {
    name: 'createTransactionFlow',
    inputSchema: CreateTransactionInputSchema,
    outputSchema: CreateTransactionOutputSchema,
  },
  async (input) => {
    const db = getFirestore();
    const transactionData = {
      ...input,
      date: new Date(input.date), // Convert string back to Date object for Firestore
    };
    const docRef = await db.collection("transactions").add(transactionData);
    return { transactionId: docRef.id };
  }
);
