export const emoji = {
  emoji: {
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: '0.25em',
    cursor: 'pointer',
    fontFamily: 'var(--emoji-font)',
    fontSize: 'var(--emoji-size)',
    height: '1.5em',
    justifyContent: 'center',
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    width: '1.5em',

    '&:hover': {
      background: 'var(--hover-color)',
      boxShadow: '0 0 1px 0 var(--hover-shadow-color)'
    },

    '&:focus': {
      borderRadius: 0,
      background: 'var(--focus-indicator-background)',
      outline: '1px solid var(--focus-indicator-color)'
    }
  },

  // TODO need to remove this from here to make decoupled, only part of twemoji renderer
  twemoji: {
    height: '1em',
    width: '1em',
    margin: '0 0.05em 0 0.1em',
    verticalAlign: '-0.1em'
  },

  emojis: {
    height: 'calc(var(--content-height) - var(--category-button-height) - 0.5em)',
    overflowY: 'auto',
    position: 'relative'
  },

  emojiContainer: {
    display: 'grid',
    justifyContent: 'space-between',
    gap: '1px',
    padding: '0.5em',
    gridTemplateColumns: 'repeat(var(--emojis-per-row), calc(var(--emoji-size) * var(--emoji-size-multiplier)))',
    gridAutoRows: 'calc(var(--emoji-size) * var(--emoji-size-multiplier))'
  },

  customEmoji: {
    width: '1em',
    height: '1em'
  },

  imagePlaceholder: {
    color: 'var(--image-placeholder-color)',
    opacity: 0.1
  }
};

export type EmojiKeys = keyof typeof emoji;
