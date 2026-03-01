
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Shield, ChevronRight, Lock, Loader2 } from 'lucide-react';
import config from '@config/checkpoint-config.json';

function CheckpointContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const stateParam = searchParams.get('State') || '0';
  const tokenParam = searchParams.get('Token') || '';
  
  const currentState = config.states[stateParam as keyof typeof config.states];

  useEffect(() => {
    // Basic validation
    if (!currentState) {
      router.push('/');
      return;
    }

    // Token validation for restricted states
    if (stateParam !== '0' && currentState.requiredToken && tokenParam !== currentState.requiredToken) {
      router.push('/Checkpoint?State=0');
      return;
    }

    setLoading(false);
  }, [stateParam, tokenParam, currentState, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background font-code">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  const isFinal = stateParam === '3';

  // State 3 doesn't have a nextToken, it leads to the Final Access URL defined in config
  const handleFinalRedirect = () => {
    if (isFinal) {
      // Small delay to simulate verification before final redirect
      setTimeout(() => {
        router.push(config.finalAccessUrl);
      }, 500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground font-code p-6 selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-md space-y-12 text-center animate-in fade-in duration-700">
        
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="p-4 border border-white/10 bg-white/5 rounded-full">
              <Shield className="w-8 h-8 text-primary/80" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-[10px] font-bold uppercase tracking-[0.5em] text-primary">
              {currentState.title}
            </h1>
            <p className="text-sm text-muted-foreground/80 leading-relaxed uppercase tracking-widest px-4">
              {currentState.description}
            </p>
          </div>
        </div>

        <div className="pt-4 flex flex-col items-center gap-4">
          <a 
            href={currentState.buttonUrl} 
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleFinalRedirect}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 border border-white/10"
          >
            {currentState.buttonText}
            <ChevronRight className="w-4 h-4" />
          </a>
          
          <div className="text-[9px] text-muted-foreground/30 uppercase tracking-[0.3em]">
            Step {parseInt(stateParam) + 1} of 4 • Authorization.Pending
          </div>
        </div>

        {!isFinal && (
          <div className="pt-8 border-t border-white/5">
            <div className="flex items-center justify-center gap-2 text-[9px] text-muted-foreground/20 uppercase tracking-widest">
              <Lock className="w-3 h-3" />
              Node.Encryption: Active
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckpointPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background font-code text-[10px] uppercase tracking-widest animate-pulse">
        Initializing.Stream...
      </div>
    }>
      <CheckpointContent />
    </Suspense>
  );
}
