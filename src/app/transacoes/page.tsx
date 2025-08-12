import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, FileDown, ArrowDown, ArrowUp } from "lucide-react";

const transactions = [
  { id: 1, date: "15/07/2024", description: "Salário Parceiro B", category: "Salário", type: "Receita", amount: "R$ 5.000,00" },
  { id: 2, date: "14/07/2024", description: "Supermercado", category: "Alimentação", type: "Despesa", amount: "R$ 450,30" },
  { id: 3, date: "13/07/2024", description: "Aluguel", category: "Moradia", type: "Despesa", amount: "R$ 2.500,00" },
  { id: 4, date: "12/07/2024", description: "Restaurante", category: "Lazer", type: "Despesa", amount: "R$ 180,50" },
  { id: 5, date: "10/07/2024", description: "Salário Parceiro A", category: "Salário", type: "Receita", amount: "R$ 6.200,00" },
  { id: 6, date: "09/07/2024", description: "Gasolina", category: "Transporte", type: "Despesa", amount: "R$ 200,00" },
];

export default function TransacoesPage() {
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
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
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
