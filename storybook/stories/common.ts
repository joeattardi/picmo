import { Meta } from '@storybook/html';

import { TwemojiRenderer } from '../../packages/renderer-twemoji/src/index';
import { lightTheme, darkTheme, autoTheme, NativeRenderer } from '../../packages/picmo/src/index';

export function toElement<E extends Element = HTMLElement>(html: string): E {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content?.firstElementChild as E;
}

export function getArgs(extraArgs): Meta {
  return {
    title: extraArgs.title,
    args: {
      theme: 'lightTheme',
      renderer: 'native',
      uiElements: ['showRecents', 'showCategoryTabs', 'showSearch', 'showVariants', 'showPreview'],
      ...extraArgs.args
    },
    argTypes: {
      emojiSelect: { 
        action: 'emoji:select',
        table: { disable: true }
      },
      uiElements: {
        name: 'UI elements',
        control: {
          type: 'inline-check',
          labels: {
            showRecents: 'Recents',
            showCategoryTabs: 'Category tabs',
            showSearch: 'Search',
            showPreview: 'Preview',
            showVariants: 'Variants'
          }
        },
        options: ['showRecents', 'showCategoryTabs', 'showSearch', 'showVariants', 'showPreview']  
      },
      theme: {
        name: 'Color theme',
        options: ['lightTheme', 'darkTheme', 'autoTheme'],
        mapping: {
          lightTheme,
          darkTheme,
          autoTheme
        },
        control: {
          type: 'select',
          labels: {
            lightTheme: 'Light',
            darkTheme: 'Dark',
            autoTheme: 'Auto'
          }
        }
      },
      renderer: {
        name: 'Emoji renderer',
        options: ['native', 'twemoji-svg', 'twemoji-png'],
        mapping: {
          native: new NativeRenderer(),
          'twemoji-svg': new TwemojiRenderer('svg'),
          'twemoji-png': new TwemojiRenderer('png')
        },
        control: {
          type: 'select',
          labels: {
            native: 'Native',
            'twemoji-svg': 'Twemoji (SVG)',
            'twemoji-png': 'Twemoji (PNG)'
          },
          
        }
      },
      ...extraArgs.argTypes
    }
  };
}

export const customEmojis = [
    { 
      emoji: 'kitty1', 
      label: 'Cute kitty', 
      url: 'https://placekitten.com/200/200', 
      tags: ['cute', 'cat', 'kitty'],
      data: {
        id: 1
      }
    },
    {
      emoji: 'conga-parrot',
      label: 'Conga parrot',
      url: 'data:image/gif;base64,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',
      data: {
        id: 2
      }
    }
];
