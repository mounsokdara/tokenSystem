"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Infinity, FileText, ChevronLeft, ShieldCheck, Terminal, Copy, Check } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';
import Link from 'next/link';
import config from '@config/checkpoint-config.json';

function LifeTimeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const apiToken = searchParams.get('ApiAccessToken');
  const [luaCopied, setLuaCopied] = useState(false);

  useEffect(() => {
    if (apiToken !== 'YEUURYEYEEUU') {
      router.push('/');
    }
  }, [apiToken, router]);

  const luaScript = `-- Roblox Lua script to fetch and print the token
local url = "https://darahubaccesstoken.vercel.app/ForeverAccess.Txt"

-- Use pcall to handle potential errors
local success, result = pcall(function()
    return game:HttpGet(url)
end)

if success then
    print("Token successfully fetched!")
    print("--- START OF TOKEN ---")
    print(result)
    print("--- END OF TOKEN ---")
else
    warn("Failed to fetch token: " .. tostring(result))
end

return result`;

  const copyLua = () => {
    navigator.clipboard.writeText(luaScript);
    setLuaCopied(true);
    setTimeout(() => setLuaCopied(false), 2000);
  };

  if (apiToken !== 'YEUURYEYEEUU') return null;

  return (
    <div className="min-h-screen bg-background text-foreground font-code p-6 md:p-12 flex flex-col items-center justify-center selection:bg-primary selection:text-primary-foreground">
      <div className="w-full max-w-3xl space-y-12 animate-in fade-in duration-1000">
        
        <header className="flex items-center justify-between border-b border-white/5 pb-6">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Terminal.Return</span>
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            <ShieldCheck className="w-3 h-3" />
            Permanent.Access.Unlocked
          </div>
        </header>

        <main className="space-y-12">
          <div className="space-y-6 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full border border-primary/20">
              <Infinity className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-[0.2em] uppercase">Lifetime.Token</h1>
              <p className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.3em]">
                Signature persistence: INF / Expiration: NONE
              </p>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2">
               <CopyButton value={config.lifetimeToken} />
            </div>
            <div className="text-xs md:text-sm leading-relaxed text-foreground break-all font-code selection:bg-primary/30">
              {config.lifetimeToken}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
                <Terminal className="w-3 h-3" />
                Integration.Lua.API
              </div>
              <button 
                onClick={copyLua}
                className="flex items-center gap-1.5 text-[10px] font-code uppercase tracking-wider text-primary hover:text-accent transition-colors"
              >
                {luaCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {luaCopied ? 'Script Copied' : 'Copy Script'}
              </button>
            </div>
            <div className="bg-black/40 border border-white/5 p-6 rounded-sm overflow-x-auto relative group">
              <pre className="text-[11px] leading-relaxed text-primary/70 font-code">
                <code>{luaScript}</code>
              </pre>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <Link 
              href="/ForeverAccess.Txt" 
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-white/10 text-foreground text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95"
            >
              <FileText className="w-3 h-3" />
              Download Raw Signature
            </Link>
            
            <div className="text-[9px] text-muted-foreground/20 uppercase tracking-[0.4em] text-center max-w-xs leading-relaxed">
              This token is cryptographically linked to your hardware ID. Unauthorized distribution will terminate lifecycle.
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function LifeTimeGenPage() {
  return (
    <Suspense fallback={null}>
      <LifeTimeContent />
    </Suspense>
  );
}
