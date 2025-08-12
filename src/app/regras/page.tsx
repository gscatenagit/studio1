import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

const rules = [
  { id: 1, description: "Assinatura Netflix", category: "Lazer", amount: "R$ 55,90", frequency: "Mensal", nextDate: "05/08/2024" },
  { id: 2, description: "Aluguel", category: "Moradia", amount: "R$ 2.500,00", frequency: "Mensal", nextDate: "10/08/2024" },
  { id: 3, description: "Parcela Notebook", category: "Eletrônicos", amount: "R$ 350,00", frequency: "Parcela 5/12", nextDate: "15/08/2024" },
  { id: 4, description: "Seguro do Carro", category: "Transporte", amount: "R$ 180,00", frequency: "Mensal", nextDate: "20/08/2024" },
  { id: 5, description: "Academia", category: "Saúde", amount: "R$ 120,00", frequency: "Mensal", nextDate: "01/08/2024" },
];

export default function RegrasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Regras de Negócios</h1>
          <p className="text-muted-foreground">Gerencie suas recorrências e parcelamentos.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Criar Regra
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Suas Regras</CardTitle>
          <CardDescription>Transações que se repetem ou são parceladas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Frequência</TableHead>
                <TableHead>Próxima Ocorrência</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.description}</TableCell>
                  <TableCell><Badge variant="outline">{rule.category}</Badge></TableCell>
                  <TableCell>{rule.frequency}</TableCell>
                  <TableCell>{rule.nextDate}</TableCell>
                  <TableCell className="text-right font-medium">{rule.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
