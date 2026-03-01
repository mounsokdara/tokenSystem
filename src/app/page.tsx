"use client";

import { useState, useEffect } from 'react';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';
import { format } from 'date-fns';
import { Hash, Calendar, Terminal, Lock, ExternalLink } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<{ token: string; displayDate: string } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('AccessToken');
    
    if (accessToken === '1Y8DIWB99ET') {
      setIsAuthorized(true);
      const dateStr = getCurrentUtcDateStr();
      const token = generateDailyToken(dateStr);
      const displayDate = format(new Date(dateStr), 'yyyy.MM.dd');
      setData({ token, displayDate });
    } else {
      setIsAuthorized(false);
    }
  }, []);

  if (isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-code p-6 selection:bg-primary selection:text-primary-foreground">
        <div className="w-full max-w-sm space-y-12 text-center animate-in fade-in duration-1000">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 border border-white/10 bg-white/5 rounded-full">
                <Lock className="w-8 h-8 text-primary/50" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                Access.Required
              </h1>
              <p className="text-sm text-muted-foreground/60 leading-relaxed uppercase tracking-widest">
                This node requires a valid authorization token for deterministic key synchronization.
              </p>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="https://link-target.net/1408661/Ays6AavuxWJ1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95"
            >
              Get Access Token
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="text-[10px] text-muted-foreground/20 uppercase tracking-widest pt-8 border-t border-white/5">
            System.Status: Gated.Node
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-code p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-xl space-y-16 animate-in fade-in duration-1000">
        
        {/* Output Area */}
        <main className="space-y-8 text-center">
          {data ? (
            <div className="space-y-12">
              {/* Token Display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    <Hash className="w-3 h-3" />
                    System.Output.Token
                  </div>
                  <CopyButton value={data.token} />
                </div>
                
                <div className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground break-all select-all py-4">
                  {data.token}
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  Validity.Period
                </div>
                <div className="text-xl font-medium text-primary tracking-widest">
                  {data.displayDate}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="text-xs text-muted-foreground animate-pulse tracking-widest uppercase">
                {isAuthorized === null ? "Authenticating..." : "Synchronizing.Clock..."}
              </div>
            </div>
          )}
        </main>

        {/* System Footer */}
        <footer className="pt-12 flex flex-col items-center gap-8 border-t border-white/5">
          <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
            <Link href="/raw" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Terminal className="w-3 h-3" />
              JSON_VIEW
            </Link>
            <Link href="/raw.txt" className="hover:text-primary transition-colors flex items-center gap-1.5">
              RAW_TEXT
            </Link>
          </div>
          
          <div className="text-[10px] text-muted-foreground/30 text-center max-w-md leading-relaxed uppercase tracking-widest">
            Deterministic key derivation. All nodes synchronize at 00:00:00 UTC. 
            Algorithm: LCG-32-BIT_DETERMINISTIC_PRNG.
          </div>
        </footer>
      </div>
    </div>
  );
}