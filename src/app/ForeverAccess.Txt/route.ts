import { NextRequest, NextResponse } from 'next/server';
import config from '@config/checkpoint-config.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ACCESS_DENIED_HTML = (url: string) => `
<!DOCTYPE html>
<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Access Denied</title>
<!-- Fonts -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Theme Configuration -->
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#ec9213",
                        "background-light": "#f8f7f6",
                        "background-dark": "#221a10",
                    },
                    fontFamily: {
                        "display": ["Space Grotesk", "sans-serif"],
                        "mono": ["Space Grotesk", "monospace"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.3s ease-out;
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark text-[#181511] dark:text-white font-display antialiased overflow-x-hidden">
<div class="relative flex h-full min-h-screen w-full flex-col">
<!-- TopAppBar -->
<div class="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
<button id="homeButton" class="relative flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors" onclick="window.location.href = '/'">
<span class="material-symbols-outlined text-[#181511] dark:text-white" style="font-size: 24px;">home</span>
</button>
<h2 class="text-[#181511] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
                Security Alert
            </h2>
</div>
<!-- Main Content -->
<div class="flex flex-col flex-1 px-6 pb-8 pt-4 items-center max-w-md mx-auto w-full">
<!-- Warning Graphic -->
<div class="flex flex-col items-center justify-center py-8">
<div class="relative flex items-center justify-center size-24 rounded-full bg-primary/10 mb-4 ring-1 ring-primary/20">
<span class="material-symbols-outlined text-primary" style="font-size: 48px;">gpp_maybe</span>
<!-- Decorative subtle pulse -->
<div class="absolute inset-0 rounded-full bg-primary/5 animate-pulse"></div>
</div>
</div>
<!-- Headline -->
<h1 class="text-[#181511] dark:text-white tracking-tight text-3xl font-bold leading-tight text-center mb-4">
                Script Access Denied
            </h1>
<!-- Body Text -->
<p class="text-[#181511]/70 dark:text-white/70 text-base font-normal leading-relaxed text-center mb-8">
                This script has been blocked browser access due to the config privacy settings sites, this can only read with lua client only! Please use Loadstring to able to use this script!
            </p>
<!-- Code Snippet Section -->
<div class="w-full flex flex-col gap-2 mb-8 animate-fade-in-up">
<div class="flex justify-between items-baseline px-1">
<span class="text-[#181511]/60 dark:text-white/50 text-sm font-medium">Required Loadstring:</span>
</div>
<div class="group relative w-full bg-[#181511]/5 dark:bg-white/5 rounded-xl border border-[#181511]/10 dark:border-white/10 overflow-hidden transition-all hover:border-primary/50">
<!-- Code Content -->
<div id="loadstring" class="p-4 pr-14 font-mono text-sm text-primary break-all leading-6">
                        loadstring(game:HttpGet("${url}"))()
                    </div>
<!-- Copy Button -->
<button id="copyButton" aria-label="Copy to clipboard" class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-[#181511]/40 dark:text-white/40 hover:text-primary hover:bg-primary/10 transition-colors">
<span id="copyIcon" class="material-symbols-outlined" style="font-size: 20px;">content_copy</span>
</button>
</div>
</div>
</div>
</div>
<script>
  document.getElementById('copyButton').addEventListener('click', async function() {
    const loadstringText = document.getElementById('loadstring').innerText;
    const copyIcon = document.getElementById('copyIcon');
    const originalIcon = copyIcon.innerHTML;
    try {
      await navigator.clipboard.writeText(loadstringText);
      copyIcon.innerHTML = 'check';
      copyIcon.style.color = '#10b981';
      setTimeout(() => {
        copyIcon.innerHTML = originalIcon;
        copyIcon.style.color = '';
      }, 2000);
    } catch (err) {}
  });
</script>
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

  return new NextResponse(ACCESS_DENIED_HTML(request.nextUrl.toString()), {
    status: 403,
    headers: { 'Content-Type': 'text/html' },
  });
}
