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
    // Validate the input data against the schema
    const validatedData = addTransactionFormSchema.parse(data);

    // Create the object to be saved, converting the date to a Firestore Timestamp
    const transactionToSave = {
      userId: userId,
      description: validatedData.description,
      amount: validatedData.amount,
      type: validatedData.type,
      category: validatedData.category,
      accountId: validatedData.accountId,
      date: Timestamp.fromDate(validatedData.date),
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
