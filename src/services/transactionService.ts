'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { z } from "zod";

const addTransactionFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  type: z.enum(["Receita", "Despesa"]),
  date: z.date(),
  category: z.string(),
  accountId: z.string(),
});

export type AddTransactionFormValues = z.infer<typeof addTransactionFormSchema>;

export async function createTransaction(userId: string, data: AddTransactionFormValues) {
  if (!userId) {
    throw new Error("User ID is required to create a transaction.");
  }

  try {
    // Manually create the object to be saved to ensure correct structure and types.
    // This is the most reliable way to ensure the userId is included for Firestore security rules.
    const transactionToSave = {
      userId: userId,
      description: data.description,
      amount: data.amount,
      type: data.type,
      category: data.category,
      accountId: data.accountId,
      date: Timestamp.fromDate(data.date), // Convert JavaScript Date to Firestore Timestamp
    };

    const docRef = await addDoc(collection(db, "transactions"), transactionToSave);
    return { id: docRef.id };
  } catch (error) {
    console.error("Error creating transaction in service: ", error);
    // Re-throw the original error to be handled by the caller, which will be caught by the UI
    if (error instanceof Error) {
        throw new Error(`Could not create transaction: ${error.message}`);
    }
    throw new Error("An unknown error occurred while creating the transaction.");
  }
}
