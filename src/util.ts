import type { EmojiRecord } from './data';

export async function computeHash(obj: object) {
  const arr = new TextEncoder().encode(JSON.stringify(obj));
  const hashBuffer = await crypto.subtle.digest('SHA-256', arr);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function caseInsensitiveIncludes(str: string, search: string) {
  return str.toLowerCase().includes(search.toLowerCase());
}

export function getEmojiForEvent(event: Event, emojis: EmojiRecord[]): EmojiRecord | null {
  const target = event.target as HTMLElement;
  const emojiElement = target.closest('[data-emoji]') as HTMLElement;
  if (emojiElement) {
    const emoji = emojis.find(e => e.emoji === emojiElement.dataset.emoji);
    if (emoji) {
      return emoji;
    }
  }

  return null;
}
