import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const categories = [
  { id: 1, name: "Moradia", parent: null, shared: true },
  { id: 2, name: "Aluguel", parent: "Moradia", shared: true },
  { id: 3, name: "Contas (Água, Luz, etc)", parent: "Moradia", shared: true },
  { id: 4, name: "Alimentação", parent: null, shared: true },
  { id: 5, name: "Supermercado", parent: "Alimentação", shared: true },
  { id: 6, name: "Restaurantes", parent: "Alimentação", shared: true },
  { id: 7, name: "Transporte", parent: null, shared: false },
  { id: 8, name: "Combustível", parent: "Transporte", shared: false },
  { id: 9, name: "Lazer", parent: null, shared: true },
  { id: 10, name: "Viagens Pessoais", parent: "Lazer", shared: false },
];

export default function CategoriasPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
          <p className="text-muted-foreground">Organize suas transações com categorias e subcategorias.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Categoria
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sua Estrutura de Categorias</CardTitle>
          <CardDescription>Crie, edite e organize suas categorias financeiras.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome da Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium" style={{ paddingLeft: category.parent ? '2rem' : '1rem' }}>
                    {category.name}
                  </TableCell>
                  <TableCell>
                    {category.shared && <Badge>Compartilhada</Badge>}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Criar Subcategoria</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Excluir</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
