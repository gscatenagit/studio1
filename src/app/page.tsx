
"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Banknote, Users } from "lucide-react";
import { VisaoGeralChart } from "@/components/visao-geral-chart";
import { db } from "@/lib/firebase";
import { collection, query, where, onSnapshot, orderBy, limit, getDocs, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface Account {
  id: string;
  balance: number;
}

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: "Receita" | "Despesa";
  date: Timestamp;
}

interface MonthlyExpense {
  month: string;
  total: number;
}

export default function Home() {
  const [totalBalance, setTotalBalance] = useState(0);
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [expenseChartData, setExpenseChartData] = useState<MonthlyExpense[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      // Fetch total balance
      const accountsQuery = query(collection(db, "accounts"), where("userId", "==", user.uid));
      const unsubscribeAccounts = onSnapshot(accountsQuery, (snapshot) => {
        let total = 0;
        snapshot.forEach((doc) => {
          total += (doc.data() as Account).balance;
        });
        setTotalBalance(total);
      });

      // Fetch recent transactions
      const transactionsQuery = query(
        collection(db, "transactions"),
        where("userId", "==", user.uid),
        orderBy("date", "desc"),
        limit(5)
      );
      const unsubscribeTransactions = onSnapshot(transactionsQuery, (snapshot) => {
        const transactionsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
        setRecentTransactions(transactionsData);
      });
      
      // Fetch expenses for the current month and chart data
      const fetchExpenses = async () => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        const monthlyQuery = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid),
          where("type", "==", "Despesa"),
          where("date", ">=", startOfMonth)
        );
        const monthlySnapshot = await getDocs(monthlyQuery);
        let currentMonthTotal = 0;
        monthlySnapshot.forEach(doc => {
            currentMonthTotal += doc.data().amount;
        });
        setMonthlyExpenses(currentMonthTotal);

        // Fetch chart data for the last 6 months
        const months = [];
        const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        const expenseData: { [key: string]: number } = {};

        for (let i = 5; i >= 0; i--) {
            const d = new Date();
            d.setMonth(d.getMonth() - i);
            const monthName = monthNames[d.getMonth()];
            months.push(monthName);
            expenseData[monthName] = 0;
        }

        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
        sixMonthsAgo.setDate(1);

        const chartQuery = query(
          collection(db, "transactions"),
          where("userId", "==", user.uid),
          where("type", "==", "Despesa"),
          where("date", ">=", sixMonthsAgo)
        );

        const chartSnapshot = await getDocs(chartQuery);
        chartSnapshot.forEach(doc => {
            const transaction = doc.data() as Transaction;
            const transactionDate = (transaction.date as Timestamp).toDate();
            const monthName = monthNames[transactionDate.getMonth()];
            if (expenseData.hasOwnProperty(monthName)) {
                expenseData[monthName] += transaction.amount;
            }
        });

        const finalChartData = months.map(month => ({ month, total: expenseData[month] }));
        setExpenseChartData(finalChartData);
      };

      fetchExpenses();


      return () => {
        unsubscribeAccounts();
        unsubscribeTransactions();
      };
    }
  }, [user]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Visão Geral Financeira</h1>
        <p className="text-muted-foreground">Bem-vindos ao seu painel financeiro compartilhado.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saldo Total</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">Soma de todas as contas</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Saúde do Relacionamento</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Equilibrado</div>
            <p className="text-xs text-muted-foreground">Parceiro A deve R$ 50,20 ao Parceiro B</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gastos do Mês</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyExpenses)}
            </div>
            <p className="text-xs text-muted-foreground">Total de despesas em {new Date().toLocaleString('pt-BR', { month: 'long' })}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Resumo de Gastos</CardTitle>
            <CardDescription>Uma visão geral dos seus gastos nos últimos 6 meses.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <VisaoGeralChart data={expenseChartData} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>As últimas transações realizadas por vocês.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://placehold.co/100x100.png`} data-ai-hint="person" alt="Avatar" />
                    <AvatarFallback>{user?.displayName?.[0] || 'U'}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{user?.displayName || user?.email}</p>
                  </div>
                  <div className={`ml-auto font-medium ${transaction.type === 'Receita' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'Receita' ? '+' : '-'}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
