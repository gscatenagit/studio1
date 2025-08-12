"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileDown, ArrowDown, ArrowUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddTransactionForm } from "@/components/add-transaction-form";
import { format } from "date-fns";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { createTransaction, type AddTransactionFormValues } from "@/services/transactionService";
import { Skeleton } from "@/components/ui/skeleton";

interface Transaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  date: Timestamp | Date;
  category: string;
  accountId: string;
  accountName?: string;
}

interface Account {
  id: string;
  name: string;
}

const formatDate = (date: Timestamp | Date): string => {
    if (date instanceof Date) {
      return format(date, "dd/MM/yyyy");
    }
    if (date && typeof date.seconds === 'number') {
      return format(date.toDate(), "dd/MM/yyyy");
    }
    return "Data inválida";
};

export default function TransacoesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");


  const auth = getAuth();
  const user = auth.currentUser;
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      const accountsQuery = query(collection(db, "accounts"), where("userId", "==", user.uid));
      
      // Create a map of account IDs to names first
      const getAccountsMap = async () => {
        const querySnapshot = await getDocs(accountsQuery);
        const map = new Map<string, string>();
        const accs: Account[] = [];
        querySnapshot.forEach((doc) => {
          map.set(doc.id, doc.data().name);
          accs.push({ id: doc.id, ...doc.data() } as Account);
        });
        setAccounts(accs);
        return map;
      };

      const transactionsQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("date", "desc")
      );

      let accountsMap: Map<string, string>;

      const unsubscribeTransactions = onSnapshot(transactionsQuery, (querySnapshot) => {
        if (!accountsMap) {
          // If map is not ready, we can't process transactions yet.
          // This case is unlikely with the new logic but good for safety.
          return;
        }

        const transactionsData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data, 
                accountName: accountsMap.get(data.accountId) || 'Conta Desconhecida'
            } as Transaction;
        });

        setTransactions(transactionsData);
      });

      // Initialize data fetching
      const fetchData = async () => {
        setLoading(true);
        accountsMap = await getAccountsMap();
        // The onSnapshot listener will now be able to use the populated accountsMap
        // A manual trigger for the first load might be needed if onSnapshot doesn't fire immediately
        const initialTransactionsSnapshot = await getDocs(transactionsQuery);
        const transactionsData = initialTransactionsSnapshot.docs.map(doc => {
          const data = doc.data();
          return { 
              id: doc.id, 
              ...data, 
              accountName: accountsMap.get(data.accountId) || 'Conta Desconhecida'
          } as Transaction;
        });
        setTransactions(transactionsData);
        setLoading(false);
      };

      fetchData();

      return () => {
        unsubscribeTransactions();
      };
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleTransactionAdded = async (values: AddTransactionFormValues) => {
    if (!user) return;
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
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
        const descriptionMatch = transaction.description.toLowerCase().includes(descriptionFilter.toLowerCase());
        const typeMatch = typeFilter === 'all' || transaction.type === typeFilter;
        const categoryMatch = categoryFilter === 'all' || transaction.category === categoryFilter;
        return descriptionMatch && typeMatch && categoryMatch;
    });
  }, [transactions, descriptionFilter, typeFilter, categoryFilter]);

  const allCategories = useMemo(() => {
    return [...new Set(transactions.map(t => t.category))].sort();
  }, [transactions]);


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
              <AddTransactionForm onTransactionAdded={handleTransactionAdded} accounts={accounts} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <Input 
                placeholder="Filtrar por descrição..." 
                className="max-w-sm flex-grow"
                value={descriptionFilter}
                onChange={(e) => setDescriptionFilter(e.target.value)}
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="Receita">Receita</SelectItem>
                <SelectItem value="Despesa">Despesa</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                 <SelectItem value="all">Todas as Categorias</SelectItem>
                 {allCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                 ))}
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
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-40" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-5 w-28 ml-auto" /></TableCell>
                    </TableRow>
                ))
              ) : filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
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
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                        Nenhuma transação encontrada.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
