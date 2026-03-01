"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Copy, Check, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function RawPage() {
  const [rawData, setRawData] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e0e0e0] font-code selection:bg-primary selection:text-white">
      <div className="max-w-4xl mx-auto p-6 md:p-12 space-y-8">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to UI</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link href="/raw.txt" target="_blank">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-white hover:bg-white/10"
              >
                <FileText className="w-4 h-4 mr-2" />
                View .txt
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy}
              className="text-muted-foreground hover:text-white hover:bg-white/10"
            >
              {copied ? (
                <><Check className="w-4 h-4 mr-2" /> Copied</>
              ) : (
                <><Copy className="w-4 h-4 mr-2" /> Copy JSON</>
              )}
            </Button>
          </div>
        </header>

        <main className="bg-black/40 rounded-xl border border-white/5 p-6 md:p-8 overflow-auto min-h-[400px]">
          {rawData ? (
            <pre className="text-sm md:text-base leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-500">
              <code>{rawData}</code>
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <span className="animate-pulse">Fetching daily endpoint...</span>
            </div>
          )}
        </main>

        <footer className="text-center text-xs text-muted-foreground/50 pt-8 flex flex-col gap-2">
          <div>The above data is served from a server-side route using modern edge infrastructure.</div>
          <div className="text-muted-foreground/30">Content-Type: application/json</div>
        </footer>
      </div>
    </div>
  );
}
