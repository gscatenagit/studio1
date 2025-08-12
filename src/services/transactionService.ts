'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
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

  const validatedData = addTransactionFormSchema.parse(data);

  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      ...validatedData,
      userId: userId,
    });
    return { id: docRef.id };
  } catch (error) {
    console.error("Error creating transaction in service: ", error);
    // Re-throw the error to be handled by the caller
    throw new Error("Could not create transaction.");
  }
}
