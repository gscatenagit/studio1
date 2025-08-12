"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import { AddAccountForm } from "@/components/add-account-form";

const initialAccounts = [
  { id: 1, name: "Conta Corrente A", bank: "Banco X", type: "Corrente", balance: "R$ 5.432,10" },
  { id: 2, name: "Poupança A", bank: "Banco X", type: "Poupança", balance: "R$ 2.109,80" },
  { id: 3, name: "Conta Corrente B", bank: "Banco Y", type: "Corrente", balance: "R$ 3.890,15" },
  { id: 4, name: "Investimentos", bank: "Corretora Z", type: "Investimento", balance: "R$ 10.500,00" },
];

export default function ContasPage() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAccountAdded = (newAccount: any) => {
    const newId = accounts.length > 0 ? Math.max(...accounts.map(a => a.id)) + 1 : 1;
    const formattedBalance = `R$ ${parseFloat(newAccount.balance).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    setAccounts([...accounts, { ...newAccount, id: newId, balance: formattedBalance }]);
    setIsDialogOpen(false); // Close the dialog
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
                  <TableCell className="text-right font-medium">{account.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
