import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Handshake } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function RelacionamentoPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Relatório do Casal</h1>
        <p className="text-muted-foreground">Mantenha a transparência e o equilíbrio nas finanças de vocês.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Balanço Atual</CardTitle>
          <CardDescription>Resumo de quem deve a quem neste momento.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8 p-8">
            <div className="flex flex-col items-center gap-2">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="woman portrait" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <p className="font-semibold">Parceiro(a) A</p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-muted-foreground">Parceiro A deve ao Parceiro B</p>
                <h2 className="text-3xl font-bold text-primary">R$ 50,20</h2>
                <ArrowRight className="h-8 w-8 text-muted-foreground" />
            </div>

            <div className="flex flex-col items-center gap-2">
                <Avatar className="h-20 w-20">
                    <AvatarImage src="https://placehold.co/100x100.png" data-ai-hint="man portrait" />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <p className="font-semibold">Parceiro(a) B</p>
            </div>
        </CardContent>
        <CardContent className="text-center">
             <Button>
                <Handshake className="mr-2 h-4 w-4" />
                Acertar Contas
            </Button>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Contribuições no Mês</CardTitle>
            <CardDescription>Total contribuído para despesas compartilhadas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="font-medium">Parceiro(a) A</span>
                <span className="font-bold text-lg">R$ 1.543,80</span>
            </div>
             <Separator />
             <div className="flex justify-between items-center">
                <span className="font-medium">Parceiro(a) B</span>
                <span className="font-bold text-lg">R$ 1.594,00</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Despesas Individuais</CardTitle>
            <CardDescription>Total gasto em categorias não compartilhadas.</CardDescription>
          </CardHeader>
           <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="font-medium">Parceiro(a) A</span>
                <span className="font-bold text-lg">R$ 876,50</span>
            </div>
             <Separator />
             <div className="flex justify-between items-center">
                <span className="font-medium">Parceiro(a) B</span>
                <span className="font-bold text-lg">R$ 1.234,90</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
