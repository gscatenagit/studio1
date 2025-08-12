import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tag, Users, Percent } from "lucide-react";

const categories = [
    { id: 1, name: "Aluguel & Condomínio", split: "50/50" },
    { id: 2, name: "Supermercado", split: "50/50" },
    { id: 3, name: "Restaurantes & Bares", split: "Quem convidou" },
    { id: 4, name: "Contas de Casa (Luz, Água, Gás)", split: "Proporcional à renda" },
    { id: 5, name: "Viagens", split: "50/50" },
];

export default function DivisorPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Divisor de Despesas</h1>
        <p className="text-muted-foreground">Configure as regras de divisão para suas despesas compartilhadas.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Regra Padrão</CardTitle>
                    <CardDescription>Defina como as despesas são divididas por padrão.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Método de Divisão</Label>
                      <Select defaultValue="50-50">
                        <SelectTrigger>
                            <SelectValue placeholder="Selecione um método" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="50-50"><Users className="mr-2 h-4 w-4" /> 50/50</SelectItem>
                            <SelectItem value="proportional"><Percent className="mr-2 h-4 w-4" /> Proporcional à renda</SelectItem>
                            <SelectItem value="individual"><Tag className="mr-2 h-4 w-4" /> Individual (quem gastou paga)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Switch id="auto-detect" defaultChecked />
                        <Label htmlFor="auto-detect">Detectar despesas compartilhadas automaticamente</Label>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Regras por Categoria</CardTitle>
                    <CardDescription>Crie exceções à regra padrão para categorias específicas.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Regra de Divisão</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map(cat => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium">{cat.name}</TableCell>
                                    <TableCell>{cat.split}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                     <Button className="mt-4 w-full">Adicionar Regra de Categoria</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
