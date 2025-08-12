"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileDown, ArrowDown, ArrowUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTransactionForm } from "@/components/add-transaction-form";
import { format } from "date-fns";

const initialTransactions = [
  { id: 1, date: "15/07/2024", description: "Salário Parceiro B", category: "Salário", type: "Receita", amount: "R$ 5.000,00", account: "Conta Corrente B" },
  { id: 2, date: "14/07/2024", description: "Supermercado", category: "Alimentação", type: "Despesa", amount: "R$ 450,30", account: "Cartão Principal A" },
  { id: 3, date: "13/07/2024", description: "Aluguel", category: "Moradia", type: "Despesa", amount: "R$ 2.500,00", account: "Conta Corrente A" },
  { id: 4, date: "12/07/2024", description: "Restaurante", category: "Lazer", type: "Despesa", amount: "R$ 180,50", account: "Cartão Viagem B" },
  { id: 5, date: "10/07/2024", description: "Salário Parceiro A", category: "Salário", type: "Receita", amount: "R$ 6.200,00", account: "Conta Corrente A" },
  { id: 6, date: "09/07/2024", description: "Gasolina", category: "Transporte", type: "Despesa", amount: "R$ 200,00", account: "Cartão Principal A" },
];

const accounts = [
  { id: "1", name: "Conta Corrente A (Banco X)" },
  { id: "2", name: "Poupança A (Banco X)" },
  { id: "3", name: "Conta Corrente B (Banco Y)" },
  { id: "4", name: "Cartão Principal A (Mastercard)" },
  { id: "5", name: "Cartão Viagem B (Visa)" },
];

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTransactionAdded = (newTransaction: any) => {
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    const formattedAmount = `R$ ${parseFloat(newTransaction.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const formattedDate = format(newTransaction.date, "dd/MM/yyyy");
    const accountName = accounts.find(acc => acc.id === newTransaction.accountId)?.name || 'Desconhecida';

    setTransactions([{ ...newTransaction, id: newId, amount: formattedAmount, date: formattedDate, account: accountName }, ...transactions]);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Extrato de Transações</h1>
          <p className="text-muted-foreground">Acompanhe todas as suas movimentações financeiras.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline">
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
              <DialogHeader>
                <DialogTitle>Adicionar Nova Transação</DialogTitle>
                <DialogDescription>
                  Preencha as informações abaixo para adicionar uma nova transação.
                </DialogDescription>
              </DialogHeader>
              <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Input placeholder="Filtrar por descrição..." className="max-w-sm" />
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="receita">Receita</SelectItem>
                <SelectItem value="despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="salario">Salário</SelectItem>
                <SelectItem value="alimentacao">Alimentação</SelectItem>
                <SelectItem value="moradia">Moradia</SelectItem>
                <SelectItem value="lazer">Lazer</SelectItem>
                <SelectItem value="transporte">Transporte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.account}</TableCell>
                  <TableCell><Badge variant="outline">{transaction.category}</Badge></TableCell>
                  <TableCell>
                    {transaction.type === "Receita" ? (
                      <span className="text-green-600 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> {transaction.type}</span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> {transaction.type}</span>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.type === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount}
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
