"use client";

import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { LayoutDashboard, Wallet, ArrowRightLeft, GitMerge, HeartHandshake, Repeat, CreditCard, Tags, LineChart, CheckSquare, UserCircle, Settings, LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useState } from 'react';
import { AddTransactionForm } from '@/components/add-transaction-form';

// export const metadata: Metadata = {
//   title: 'Casal Próspero',
//   description: 'Gestão financeira para casais',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);

  // Dummy handler, in a real app this would likely be managed by a global state provider
  const handleTransactionAdded = (values: any) => {
    console.log("Transaction added globally:", values);
    setIsTransactionDialogOpen(false);
    // You might want to show a toast notification here
  };


  return (
    <html lang="pt-BR">
      <head>
        <title>Casal Próspero</title>
        <meta name="description" content="Gestão financeira para casais" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Dialog open={isTransactionDialogOpen} onOpenChange={setIsTransactionDialogOpen}>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader>
                <Logo />
              </SidebarHeader>
              <SidebarContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/"><LayoutDashboard />Visão Geral</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/contas"><Wallet />Central de Contas</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/transacoes"><ArrowRightLeft />Extrato de Transações</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/cartoes"><CreditCard />Central de Cartões</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/divisor"><GitMerge />Divisor</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/relacionamento"><HeartHandshake />Relatório do Casal</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/regras"><Repeat />Regras de Negócios</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/categorias"><Tags />Categorias</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/fluxo-caixa"><LineChart />Fluxo de Caixa Preditivo</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href="/aprovacoes"><CheckSquare />Sistema de Aprovações</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton><UserCircle />Perfil</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton><Settings />Configurações</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton><LogOut />Sair</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="flex items-center justify-between p-4 bg-background border-b sticky top-0 z-10">
                <div className="flex items-center gap-4">
                   <SidebarTrigger className="md:hidden" />
                   <Logo />
                </div>
                 <DialogTrigger asChild>
                   <Button>
                      <PlusCircle />
                      <span className="hidden sm:inline">Nova Transação</span>
                    </Button>
                 </DialogTrigger>
              </header>
              <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Transação</DialogTitle>
              <DialogDescription>
                Preencha as informações abaixo para adicionar uma nova transação.
              </DialogDescription>
            </DialogHeader>
            <AddTransactionForm onTransactionAdded={handleTransactionAdded} />
          </DialogContent>
        </Dialog>
        <Toaster />
      </body>
    </html>
  );
}
