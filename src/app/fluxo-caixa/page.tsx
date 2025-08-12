import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FluxoCaixaChart } from "@/components/fluxo-caixa-chart";
import { ArrowDown, ArrowUp } from "lucide-react";

export default function FluxoCaixaPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fluxo de Caixa Preditivo</h1>
        <p className="text-muted-foreground">Projete seus saldos futuros com base em suas recorrências.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Receitas Previstas (Próx. 30 dias)</CardTitle>
                <ArrowUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ 11.200,00</div>
                <p className="text-xs text-muted-foreground">Baseado em 2 recorrências de salário.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Despesas Previstas (Próx. 30 dias)</CardTitle>
                <ArrowDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-red-600">R$ 3.206,40</div>
                <p className="text-xs text-muted-foreground">Baseado em 5 recorrências.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Saldo Projetado (Final do mês)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">R$ 20.339,27</div>
                <p className="text-xs text-muted-foreground">Saldo atual + receitas - despesas.</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projeção de Saldo</CardTitle>
          <CardDescription>Evolução do seu saldo total nos próximos meses.</CardDescription>
        </CardHeader>
        <CardContent>
          <FluxoCaixaChart />
        </CardContent>
      </Card>
    </div>
  );
}
