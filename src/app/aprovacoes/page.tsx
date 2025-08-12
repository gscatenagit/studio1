import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

const approvals = [
  { id: 1, date: "15/07/2024", description: "Alteração da regra de divisão 'Viagens'", requestedBy: "Parceiro A", details: "Mudar de 50/50 para 60/40" },
  { id: 2, date: "14/07/2024", description: "Exclusão da conta 'Poupança Antiga'", requestedBy: "Parceiro B", details: "Conta inativa com saldo zero" },
  { id: 3, date: "13/07/2024", description: "Criação da recorrência 'Doação Mensal ONG'", requestedBy: "Parceiro A", details: "R$ 100,00/mês para 'Ajuda Animal'" },
];

export default function AprovacoesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sistema de Aprovações</h1>
        <p className="text-muted-foreground">Aprove operações sensíveis para manter a segurança e o acordo.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pendentes de Aprovação</CardTitle>
          <CardDescription>Ações que necessitam da sua confirmação para serem executadas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Descrição da Operação</TableHead>
                <TableHead>Solicitado Por</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {approvals.map((approval) => (
                <TableRow key={approval.id}>
                  <TableCell>{approval.date}</TableCell>
                  <TableCell>
                    <div className="font-medium">{approval.description}</div>
                    <div className="text-sm text-muted-foreground">{approval.details}</div>
                  </TableCell>
                  <TableCell>{approval.requestedBy}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-100 hover:text-red-700">
                      <X className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-green-600 hover:bg-green-100 hover:text-green-700">
                      <Check className="h-4 w-4" />
                    </Button>
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
