"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Code2, Hash, Calendar, ExternalLink, RefreshCw, FileText } from 'lucide-react';
import { format } from 'date-fns';

interface DailyData {
  token: string;
  date: string;
}

export default function Home() {
  const [data, setData] = useState<DailyData | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background animate-in fade-in duration-700">
      <div className="w-full max-w-2xl space-y-12 text-center">
        <header className="space-y-2">
          <h1 className="text-4xl font-headline font-bold tracking-tight text-primary">
            Daily DataID
          </h1>
          <p className="text-muted-foreground font-body">
            Automatically generated persistent unique identifier for today.
          </p>
        </header>

        <main className="relative group">
          <Card className="p-12 shadow-2xl border-none bg-white/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={fetchData} className="text-muted-foreground hover:text-primary transition-colors">
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
               </button>
            </div>

            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-primary/60 text-sm font-medium uppercase tracking-widest">
                  <Hash className="w-4 h-4" />
                  <span>Daily Token</span>
                </div>
                {loading ? (
                  <Skeleton className="h-20 w-full rounded-lg mx-auto bg-primary/5" />
                ) : (
                  <div className="text-5xl md:text-7xl font-code font-bold tracking-tighter text-accent bg-clip-text drop-shadow-sm select-all">
                    {data?.token}
                  </div>
                )}
              </div>

              <div className="h-px w-16 bg-border mx-auto" />

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-primary/60 text-sm font-medium uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  <span>Current Date</span>
                </div>
                {loading ? (
                  <Skeleton className="h-8 w-48 mx-auto bg-primary/5" />
                ) : (
                  <p className="text-2xl font-body text-primary/80">
                    {data ? format(new Date(data.date), 'EEEE, MMMM do, yyyy') : '...'}
                  </p>
                )}
              </div>
            </div>
          </Card>
        </main>

        <footer className="pt-8 flex flex-col items-center gap-6">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/raw" 
              className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors py-2 px-4 rounded-full bg-primary/5 border border-primary/10 hover:border-accent/30 group"
            >
              <Code2 className="w-4 h-4" />
              <span>View JSON</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link 
              href="/raw.txt" 
              target="_blank"
              className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors py-2 px-4 rounded-full bg-primary/5 border border-primary/10 hover:border-accent/30 group"
            >
              <FileText className="w-4 h-4" />
              <span>View Raw Text</span>
              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </div>
          
          <div className="max-w-md text-sm text-muted-foreground leading-relaxed px-4">
            This token is generated server-side using a deterministic algorithm based on the UTC calendar date. It remains persistent for all users globally for exactly 24 hours.
          </div>
        </footer>
      </div>
    </div>
  );
}
