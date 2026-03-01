import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Hash, Calendar, Code2 } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';

export const dynamic = 'force-dynamic';

export default function Home() {
  const dateStr = getCurrentUtcDateStr();
  const token = generateDailyToken(dateStr);
  const displayDate = format(new Date(dateStr), 'MMMM do, yyyy');

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary/20">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-24 space-y-16">
        
        {/* Main Generator View */}
        <main className="space-y-12">
          <div className="grid gap-8">
            {/* Token Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  <Hash className="w-3 h-3" />
                  System Token Output
                </div>
                <CopyButton value={token} />
              </div>
              
              <div className="relative group">
                <div className="py-8 px-4 bg-muted/30 border-l-2 border-accent transition-all duration-500">
                  <div className="text-4xl md:text-6xl font-code font-bold tracking-tighter text-foreground break-all select-all">
                    {token}
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  <Calendar className="w-3 h-3" />
                  Validity Period
                </div>
                <div className="text-lg font-medium text-primary/80">
                  {displayDate}
                </div>
              </div>
            </div>
          </div>
        </main>

        <Separator className="bg-primary/10" />

        {/* Footer / Info */}
        <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[11px] leading-relaxed text-muted-foreground/70 font-code uppercase tracking-wider">
          <div className="md:col-span-2">
            This token is derived from a deterministic algorithm utilizing the UTC ISO 8601 date string as a entropy seed. All instances globally synchronize at 00:00:00 UTC.
          </div>
          <div className="flex md:justify-end items-start gap-4">
            <div className="flex items-center gap-1.5 opacity-50">
              <Code2 className="w-3 h-3" />
              V1.0.4-STABLE
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
