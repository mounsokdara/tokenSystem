"use client";

import { useState, useEffect } from 'react';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';
import { format } from 'date-fns';
import { Hash, Calendar, Terminal, ShieldAlert } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<{ token: string; displayDate: string } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    // Check access token in URL
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('AccessToken');
    
    if (accessToken === '1Y8DIWB99ET') {
      setIsAuthorized(true);
      // Generate daily token only if authorized
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-code p-6">
        <div className="flex flex-col items-center gap-6 animate-in fade-in duration-700">
          <ShieldAlert className="w-12 h-12 text-primary opacity-50" />
          <div className="text-center space-y-4">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.4em] text-muted-foreground">Access.Required</h1>
            <a 
              href="https://link-target.net/1408661/Ays6AavuxWJ1" 
              className="inline-block px-8 py-4 border border-primary/20 bg-primary/5 text-primary text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Get Access token
            </a>
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
