import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlusCircle } from "lucide-react";

const cards = [
  {
    id: 1,
    name: "Cartão Principal A",
    flag: "Mastercard",
    balance: "R$ 1.850,75",
    limit: "R$ 5.000,00",
    dueDate: "10/08/2024",
    usage: 37,
  },
  {
    id: 2,
    name: "Cartão Viagem B",
    flag: "Visa",
    balance: "R$ 980,00",
    limit: "R$ 10.000,00",
    dueDate: "15/08/2024",
    usage: 10,
  },
  {
    id: 3,
    name: "Cartão Reserva A",
    flag: "Elo",
    balance: "R$ 320,50",
    limit: "R$ 2.500,00",
    dueDate: "20/08/2024",
    usage: 13,
  },
];

export default function CartoesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Central de Cartões</h1>
          <p className="text-muted-foreground">Gerencie seus cartões de crédito.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Adicionar Cartão
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{card.name}</CardTitle>
                  <CardDescription>{card.flag}</CardDescription>
                </div>
                <img src={`https://placehold.co/40x25.png`} data-ai-hint="credit card" alt={card.flag} className="rounded-sm" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-sm text-muted-foreground">Fatura Atual</span>
                  <span className="text-lg font-bold">{card.balance}</span>
                </div>
                <Progress value={card.usage} aria-label={`${card.usage}% de uso`} />
                <div className="flex justify-between items-baseline mt-1">
                  <span className="text-xs text-muted-foreground">Limite: {card.limit}</span>
                  <span className="text-xs text-muted-foreground">Fecha em: {card.dueDate}</span>
                </div>
              </div>
              <Button className="w-full">Ver Fatura</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
