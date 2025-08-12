import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, Banknote, MoreHorizontal, Users } from "lucide-react";
import { VisaoGeralChart } from "@/components/visao-geral-chart";

export default function Home() {
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
            <div className="text-2xl font-bold">R$ 12.345,67</div>
            <p className="text-xs text-muted-foreground">+20.1% do último mês</p>
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
            <div className="text-2xl font-bold">R$ 4.876,54</div>
            <p className="text-xs text-muted-foreground">-5.2% do último mês</p>
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
            <VisaoGeralChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
           <CardHeader>
            <CardTitle>Transações Recentes</CardTitle>
            <CardDescription>As últimas transações realizadas por vocês.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Supermercado</p>
                  <p className="text-sm text-muted-foreground">Parceiro A</p>
                </div>
                <div className="ml-auto font-medium text-red-600">-R$ 250,75</div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Salário</p>
                  <p className="text-sm text-muted-foreground">Parceiro B</p>
                </div>
                <div className="ml-auto font-medium text-green-600">+R$ 5.000,00</div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                  <AvatarFallback>PB</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Restaurante</p>
                  <p className="text-sm text-muted-foreground">Parceiro B</p>
                </div>
                <div className="ml-auto font-medium text-red-600">-R$ 120,00</div>
              </div>
               <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Gasolina</p>
                  <p className="text-sm text-muted-foreground">Parceiro A</p>
                </div>
                <div className="ml-auto font-medium text-red-600">-R$ 150,00</div>
              </div>
               <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://placehold.co/100x100.png" alt="Avatar" data-ai-hint="person" />
                  <AvatarFallback>PA</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Cinema</p>
                  <p className="text-sm text-muted-foreground">Compartilhado</p>
                </div>
                <div className="ml-auto font-medium text-red-600">-R$ 80,00</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
