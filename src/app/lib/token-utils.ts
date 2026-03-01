export function generateDailyToken(dateStr: string): string {
  const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  let result = '';
  let seed = Math.abs(hash || 1);
  for (let i = 0; i < 15; i++) {
    // Simple LCG pseudo-random generation
    seed = (seed * 16807) % 2147483647;
    result += alphabet.charAt(seed % alphabet.length);
  }
  return result;
}

export function getCurrentUtcDateStr(): string {
  return new Date().toISOString().split('T')[0];
}
