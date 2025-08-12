import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { LayoutDashboard, Wallet, ArrowRightLeft, GitMerge, HeartHandshake, Repeat, CreditCard, Tags, LineChart, CheckSquare, UserCircle, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Casal Próspero',
  description: 'Gestão financeira para casais',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
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
            <header className="flex items-center justify-between p-4 bg-background border-b sticky top-0 z-10 md:hidden">
              <Logo />
              <SidebarTrigger>
                <LayoutDashboard />
              </SidebarTrigger>
            </header>
            <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
