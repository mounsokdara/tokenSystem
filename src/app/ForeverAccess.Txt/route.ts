import { NextRequest, NextResponse } from 'next/server';
import config from '@config/checkpoint-config.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ACCESS_DENIED_HTML = () => `
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Access Denied</title>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com"></script>
<script>
    tailwind.config = {
        darkMode: "class",
        theme: {
            extend: {
                colors: {
                    "primary": "#ec9213",
                    "background-dark": "#0a0a0a",
                },
                fontFamily: {
                    "display": ["Space Grotesk", "sans-serif"],
                },
            },
        },
    }
</script>
<style>
    body {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background-color: #0a0a0a;
        font-family: 'Space Grotesk', sans-serif;
        color: white;
        overflow: hidden;
    }
    @keyframes pulse-ring {
        0% { transform: scale(0.8); opacity: 0.5; }
        100% { transform: scale(1.4); opacity: 0; }
    }
    .pulse::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid #ec9213;
        animation: pulse-ring 2s infinite;
    }
    .card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.05);
        backdrop-filter: blur(12px);
        padding: 4rem 2rem;
        border-radius: 2rem;
        text-align: center;
        max-width: 480px;
        width: 90%;
        box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
    }
    .animate-in {
        animation: animate-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes animate-in {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
</style>
</head>
<body class="dark">
    <div class="card animate-in">
        <div class="relative inline-flex items-center justify-center size-24 bg-primary/10 rounded-full mb-10 pulse">
            <span class="material-symbols-outlined text-primary" style="font-size: 48px;">gpp_maybe</span>
        </div>
        <h1 class="text-3xl font-bold mb-4 tracking-tight uppercase">Security Alert</h1>
        <p class="text-white/50 text-base leading-relaxed mb-12 max-w-[320px] mx-auto uppercase tracking-widest text-[11px] font-medium">
            This endpoint is strictly for Lua client usage. Browser requests are blocked for security purposes.
        </p>
        <div class="flex flex-col gap-6">
            <a href="/" class="py-4 px-8 bg-primary text-black font-bold uppercase tracking-[0.3em] text-[10px] rounded-full hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">
                Return to Terminal
            </a>
            <div class="text-[9px] uppercase tracking-[0.5em] text-white/10 font-bold">
                Authorization.Denied • System.Lock: Active
            </div>
        </div>
    </div>
</body></html>
`;

export async function GET(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';
  const isLuaClient = userAgent.includes('Roblox') || userAgent.includes('Lua');

  if (isLuaClient) {
    return new NextResponse(config.lifetimeToken, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  }

  return new NextResponse(ACCESS_DENIED_HTML(), {
    status: 403,
    headers: { 'Content-Type': 'text/html' },
  });
}
