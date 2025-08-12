import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle } from "lucide-react";

const accounts = [
  { id: 1, name: "Conta Corrente A", bank: "Banco X", type: "Corrente", balance: "R$ 5.432,10" },
  { id: 2, name: "Poupança A", bank: "Banco X", type: "Poupança", balance: "R$ 2.109,80" },
  { id: 3, name: "Conta Corrente B", bank: "Banco Y", type: "Corrente", balance: "R$ 3.890,15" },
  { id: 4, name: "Investimentos", bank: "Corretora Z", type: "Investimento", balance: "R$ 10.500,00" },
];

export default function ContasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Contas</h1>
          <p className="text-muted-foreground">Gerencie suas contas bancárias e de investimento.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Conta
        </Button>
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
