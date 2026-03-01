"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { 
  Code2, 
  Hash, 
  Calendar, 
  ExternalLink, 
  RefreshCw, 
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { format } from 'date-fns';

interface DailyData {
  token: string;
  date: string;
}

export default function Home() {
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/daily');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Failed to fetch daily data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = () => {
    if (data?.token) {
      navigator.clipboard.writeText(data.token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body selection:bg-primary/20">
      <div className="max-w-3xl mx-auto px-6 py-12 md:py-24 space-y-16">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-xl">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <h1>DAILY DATAID</h1>
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Deterministic persistent identifier system. 
              Generated server-side every 24 hours.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchData}
              disabled={loading}
              className="rounded-none border-dashed hover:bg-primary/5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-2 ${loading ? 'animate-spin' : ''}`} />
              REGENERATE VIEW
            </Button>
          </div>
        </header>

        <Separator className="bg-primary/10" />

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
                {data && !loading && (
                   <button 
                    onClick={copyToClipboard}
                    className="flex items-center gap-1.5 text-[10px] font-code uppercase tracking-wider text-primary hover:text-accent transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied' : 'Copy Key'}
                  </button>
                )}
              </div>
              
              <div className="relative group">
                {loading ? (
                  <Skeleton className="h-24 w-full bg-primary/5 rounded-none" />
                ) : (
                  <div className="py-8 px-4 bg-muted/30 border-l-2 border-accent transition-all duration-500">
                    <div className="text-4xl md:text-6xl font-code font-bold tracking-tighter text-foreground break-all select-all">
                      {data?.token}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  <Calendar className="w-3 h-3" />
                  Validity Period
                </div>
                {loading ? (
                  <Skeleton className="h-6 w-48 bg-primary/5 rounded-none" />
                ) : (
                  <div className="text-lg font-medium text-primary/80">
                    {data ? format(new Date(data.date), 'MMMM do, yyyy') : '...'}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-code font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                  <ExternalLink className="w-3 h-3" />
                  Format Options
                </div>
                <div className="flex gap-4">
                  <Link 
                    href="/raw" 
                    className="text-sm font-medium hover:text-accent border-b border-transparent hover:border-accent transition-all"
                  >
                    JSON
                  </Link>
                  <Link 
                    href="/raw.txt" 
                    target="_blank"
                    className="text-sm font-medium hover:text-accent border-b border-transparent hover:border-accent transition-all"
                  >
                    Plain Text
                  </Link>
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
