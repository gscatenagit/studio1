import { PiggyBank } from 'lucide-react';
import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  iconOnly?: boolean;
};

export function Logo({ className, iconOnly = false }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="bg-primary/20 p-2 rounded-lg">
        <PiggyBank className="h-6 w-6 text-primary" />
      </div>
      {!iconOnly && <h1 className="text-lg font-bold text-primary-foreground hidden md:block group-data-[state=expanded]:md:block">Casal Próspero</h1>}
    </div>
  );
}
