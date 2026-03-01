
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Copy, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RawPage() {
  const [rawData, setRawData] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('AccessToken');

    if (accessToken !== '1Y8DIWB99ET') {
      setIsAuthorized(false);
      // Redirect unauthorized browser users to Rickroll for /raw specifically
      window.location.replace("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
      return;
    }

    setIsAuthorized(true);
    fetch('/api/daily')
      .then(res => res.json())
      .then(data => setRawData(JSON.stringify(data, null, 2)))
      .catch(err => setRawData(JSON.stringify({ error: 'Failed to load raw data' }, null, 2)));
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawData);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isAuthorized === false) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background font-code p-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground animate-pulse">
          Redirecting_to_authentication_node...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-code selection:bg-primary selection:text-primary-foreground">
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-12 animate-in fade-in duration-700">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <Link 
            href="/?AccessToken=1Y8DIWB99ET" 
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-3 h-3" />
            <span>Terminal.Return</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link href="/raw.txt" target="_blank">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary"
              >
                <FileText className="w-3 h-3 mr-2" />
                view_txt
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground hover:text-primary"
            >
              {copied ? (
                <><Check className="w-3 h-3 mr-2" /> cached_copy</>
              ) : (
                <><Copy className="w-3 h-3 mr-2" /> copy_json</>
              )}
            </Button>
          </div>
        </header>

        <main className="bg-black/20 p-6 md:p-8 overflow-auto min-h-[400px] border border-white/5">
          {rawData ? (
            <pre className="text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500 text-muted-foreground">
              <code>{rawData}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground/20">
              <span className="animate-pulse">Fetching_daily_endpoint...</span>
            </div>
          )}
        </main>

        <footer className="text-center text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/30 pt-8 flex flex-col gap-2 leading-relaxed">
          <div>Served via edge infrastructure. Persistence guaranteed for 24h cycle.</div>
          <div className="text-muted-foreground/10">Content-Type: application/json</div>
        </footer>
      </div>
    </div>
  );
}
