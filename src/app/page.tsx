
"use client";

import { useState, useEffect } from 'react';
import { generateDailyToken, getCurrentUtcDateStr } from '@/app/lib/token-utils';
import { format } from 'date-fns';
import { Hash, Calendar, Lock, ExternalLink, Zap, Infinity, Clock } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';

export default function Home() {
  const [data, setData] = useState<{ token: string; displayDate: string } | null>(null);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('AccessToken');
    
    // Authorization Check
    if (accessToken === '1Y8DIWB99ET') {
      setIsAuthorized(true);
      const dateStr = getCurrentUtcDateStr();
      const token = generateDailyToken(dateStr);
      const displayDate = format(new Date(dateStr), 'yyyy.MM.dd');
      setData({ token, displayDate });
    } else {
      setIsAuthorized(false);
    }

    // Live Clock Logic
    const timer = setInterval(() => {
      const now = new Date();
      const parts = now.toUTCString().split(' ');
      // parts: [DayOfWeek, Day, Month, Year, Time, GMT]
      setCurrentTime(`${parts[1]} ${parts[2]} ${parts[3]} • ${parts[4]} UTC`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isAuthorized === false) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-code p-6 selection:bg-primary selection:text-primary-foreground">
        <div className="w-full max-sm space-y-12 text-center animate-in fade-in duration-1000">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 border border-white/10 bg-white/5 rounded-full">
                <Lock className="w-8 h-8 text-primary/50" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground">
                Access Token 1 Day expired
              </h1>
              <p className="text-sm text-muted-foreground/60 leading-relaxed uppercase tracking-widest">
                This node requires a valid authorization token for deterministic key synchronization.
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <a 
              href="https://link-target.net/1408661/Ays6AavuxWJ1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Get Daily Token (24h)
              <ExternalLink className="w-3 h-3" />
            </a>

            <a 
              href="/Checkpoint?State=0" 
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary),0.2)] active:scale-95"
            >
              Get life time token
              <Infinity className="w-3 h-3" />
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
      <div className="w-full max-w-xl animate-in fade-in duration-1000">
        
        <main className="space-y-12 text-center">
          {data ? (
            <div className="space-y-12">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    <Hash className="w-3 h-3" />
                    System.Output.Token
                  </div>
                  <CopyButton value={data.token} />
                </div>
                
                <div className="text-2xl md:text-4xl font-bold tracking-tight text-foreground break-all select-all py-8 leading-relaxed font-code">
                  {data.token}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 items-start">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    Validity.Period
                  </div>
                  <div className="text-lg font-medium text-primary tracking-widest">
                    {data.displayDate}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    System.Time
                  </div>
                  <div className="text-lg font-medium text-accent tracking-widest">
                    {currentTime || "-- --- ---- • --:--:-- UTC"}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center pt-8">
                <div className="w-full max-w-xs border-t border-white/5 pt-8">
                  <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.2em] mb-4">
                    Upgrade options available
                  </div>
                  <a 
                    href="/Checkpoint?State=0" 
                    className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group"
                  >
                    <Zap className="w-3 h-3 group-hover:fill-current" />
                    Extend to Lifetime
                  </a>
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
      </div>
    </div>
  );
}
