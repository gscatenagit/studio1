"use client";

import { useState, useEffect } from "react";
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
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where, orderBy, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createTransaction } from "@/services/transactionService";

const addTransactionFormSchema = z.object({
  description: z.string(),
  amount: z.number(),
  type: z.enum(["Receita", "Despesa"]),
  date: z.date(),
  category: z.string(),
  accountId: z.string(),
});

type AddTransactionFormValues = z.infer<typeof addTransactionFormSchema>;


interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  date: { seconds: number; nanoseconds: number; } | Date;
  category: string;
  accountId: string;
  accountName?: string;
}

interface Account {
  id: string;
  name: string;
}

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const accountsQuery = query(collection(db, "accounts"), where("userId", "==", user.uid));
      const unsubscribeAccounts = onSnapshot(accountsQuery, (querySnapshot) => {
        const accountsData: Account[] = [];
        querySnapshot.forEach((doc) => {
          accountsData.push({ id: doc.id, ...doc.data() } as Account);
        });
        setAccounts(accountsData);
      });

      const transactionsQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      const unsubscribeTransactions = onSnapshot(transactionsQuery, async (querySnapshot) => {
        const transactionsData: Transaction[] = [];
        for (const docSnapshot of querySnapshot.docs) {
          const data = docSnapshot.data() as Omit<Transaction, 'id' | 'accountName'>;
          let accountName = 'Conta Deletada';
          if (data.accountId) {
             const accountDoc = await getDoc(doc(db, "accounts", data.accountId));
             if (accountDoc.exists()) {
                accountName = accountDoc.data().name;
             }
          }
          transactionsData.push({ id: docSnapshot.id, ...data, accountName } as Transaction);
        }
        setTransactions(transactionsData);
      });

      return () => {
        unsubscribeAccounts();
        unsubscribeTransactions();
      };
    }
  }, [user]);

  const handleTransactionAdded = async (values: AddTransactionFormValues) => {
    if (user) {
      try {
        await createTransaction(user.uid, values);
        setIsDialogOpen(false);
        toast({
          title: "Sucesso!",
          description: "Transação adicionada.",
        });
      } catch (error) {
        console.error("Error adding document: ", error);
        toast({
          variant: "destructive",
          title: "Erro ao criar transação",
          description: "Não foi possível salvar a transação. Verifique sua conexão e tente novamente.",
        });
      }
    }
  };

  const formatDate = (date: { seconds: number; nanoseconds: number; } | Date) => {
    if (date instanceof Date) {
      return format(date, "dd/MM/yyyy");
    }
    if (date && date.seconds) {
      return format(new Date(date.seconds * 1000), "dd/MM/yyyy");
    }
    return "Data inválida";
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
              </Header>
              <AddTransactionForm onTransactionAdded={handleTransactionAdded} accounts={accounts} />
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
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell className="font-medium">{transaction.description}</TableCell>
                  <TableCell>{transaction.accountName}</TableCell>
                  <TableCell><Badge variant="outline">{transaction.category}</Badge></TableCell>
                  <TableCell>
                    {transaction.type === "Receita" ? (
                      <span className="text-green-600 flex items-center gap-1"><ArrowUp className="h-3 w-3" /> {transaction.type}</span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-1"><ArrowDown className="h-3 w-3" /> {transaction.type}</span>
                    )}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.type === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                     {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
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
