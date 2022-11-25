export async function computeHash(obj: object) {
  const arr = new TextEncoder().encode(JSON.stringify(obj));
  const hashBuffer = await crypto.subtle.digest('SHA-256', arr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function caseInsensitiveIncludes(str: string, search: string) {
  return str.toLowerCase().includes(search.toLowerCase());
}
