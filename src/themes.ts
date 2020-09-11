import { EmojiCustomTheme, EmojiTheme } from "./types";

const compareCustomThemes = (a:EmojiCustomTheme,b:EmojiCustomTheme): boolean => {
	return a.extends == b.extends && a.className == b.className;
  }

export const compareThemes = (a:EmojiTheme, b:EmojiTheme): boolean => {
	if (typeof a !== typeof b) return false;
	if (typeof a !== "string") {
	  return compareCustomThemes(a,<EmojiCustomTheme>b); //both themes are custom, since we know they have the same type
	} else {
	  return a === b;
	}
  }
