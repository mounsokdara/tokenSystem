"use client";

import { useState, useEffect } from 'react';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import { Hash, Calendar, Code2 } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';

export default function Home() {
  const [data, setData] = useState<{ token: string; displayDate: string } | null>(null);

  useEffect(() => {
    // Generate token and date strings only on the client to avoid hydration mismatches
    const dateStr = getCurrentUtcDateStr();
    const token = generateDailyToken(dateStr);
    const displayDate = format(new Date(dateStr), 'MMMM do, yyyy');
    setData({ token, displayDate });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-body selection:bg-primary/20 p-6">
      <div className="w-full max-w-2xl space-y-12 animate-in fade-in duration-700">
        
        {/* Main Generator View */}
        <main className="space-y-12">
          {data ? (
            <div className="grid gap-8">
              {/* Token Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    <Hash className="w-3 h-3" />
                    System Token Output
                  </div>
                  <CopyButton value={data.token} />
                </div>
                
                <div className="relative group">
                  <div className="py-8 px-4 bg-muted/30 border-l-2 border-accent transition-all duration-500 text-center">
                    <div className="text-4xl md:text-6xl font-code font-bold tracking-tighter text-foreground break-all select-all">
                      {data.token}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              <div className="flex flex-col items-center gap-2 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60 text-center">
                  <Calendar className="w-3 h-3" />
                  Validity Period
                </div>
                <div className="text-lg font-medium text-primary/80 text-center">
                  {data.displayDate}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              <div className="h-12 w-full max-w-md bg-muted animate-pulse rounded" />
            </div>
          )}
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
