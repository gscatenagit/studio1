"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { AddAccountForm } from "@/components/add-account-form";
import { db } from "@/lib/firebase";
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Account {
  id: string;
  userId: string;
  name: string;
  bank: string;
  type: string;
  balance: number;
}

export default function ContasPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "accounts"),
        where("userId", "==", user.uid),
        orderBy("name")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const accountsData: Account[] = [];
        querySnapshot.forEach((doc) => {
          accountsData.push({ id: doc.id, ...doc.data() } as Account);
        });
        setAccounts(accountsData);
      });

      return () => unsubscribe();
    }
  }, [user]);

  const handleAccountAdded = async (newAccountData: Omit<Account, 'id' | 'userId'>) => {
    if (user) {
      try {
        await addDoc(collection(db, "accounts"), {
          ...newAccountData,
          userId: user.uid,
        });
        setIsDialogOpen(false);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Contas</h1>
          <p className="text-muted-foreground">Gerencie suas contas bancárias e de investimento.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Conta
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Conta</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo para adicionar uma nova conta.
              </DialogDescription>
            </DialogHeader>
            <AddAccountForm onAccountAdded={handleAccountAdded} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Contas</CardTitle>
          <CardDescription>Visualize e gerencie todas as suas contas em um só lugar.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Conta</TableHead>
                <TableHead>Instituição</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.name}</TableCell>
                  <TableCell>{account.bank}</TableCell>
                  <TableCell>{account.type}</TableCell>
                  <TableCell className="text-right font-medium">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(account.balance)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
