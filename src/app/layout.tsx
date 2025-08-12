"use client";

import { useEffect, useState } from 'react';
import type { Metadata } from 'next';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { app } from '@/lib/firebase';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarInset, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Logo } from '@/components/logo';
import { LayoutDashboard, Wallet, ArrowRightLeft, GitMerge, HeartHandshake, Repeat, CreditCard, Tags, LineChart, CheckSquare, UserCircle, Settings, LogOut, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AddTransactionForm } from '@/components/add-transaction-form';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login');
    }
  }, [loading, user, pathname, router]);

  const handleTransactionAdded = (values: any) => {
    console.log("Transaction added globally:", values);
    setIsTransactionDialogOpen(false);
  };
  
  const handleLogout = () => {
    const auth = getAuth(app);
    auth.signOut().then(() => {
      router.push('/login');
    });
  };

  if (loading || (!user && pathname !== '/login' && pathname !== '/signup')) {
    return (
      <html lang="pt-BR">
        <body className="font-body antialiased bg-background">
          <div className="flex items-center justify-center h-screen">
            <Skeleton className="h-12 w-12 rounded-full" />
          </div>
        </body>
      </html>
    );
  }
  
  if (!user) {
    return (
       <html lang="pt-BR">
        <body className="font-body antialiased bg-background">
          {children}
        </body>
      </html>
    )
  }

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
                    <div className="flex items-center gap-3 p-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user?.photoURL || undefined} data-ai-hint="person" />
                        <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col truncate">
                        <span className="text-sm font-semibold truncate">{user?.displayName || user?.email}</span>
                      </div>
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton><Settings />Configurações</SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout}><LogOut />Sair</SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset>
              <header className="flex items-center justify-between p-4 bg-background border-b sticky top-0 z-10">
                <div className="flex items-center gap-4">
                   <SidebarTrigger />
                   <h1 className="text-xl font-semibold tracking-tight hidden md:block">Visão Geral</h1>
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
