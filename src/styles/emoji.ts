export const emoji = {
  '@keyframes pulse': {
    '0%': {
      opacity: 0
    },
    '50%': {
      opacity: 0.2
    },
    '100%': {
      opacity: 0
    }
  },

  emoji: {
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
    fontFamily: 'var(--emoji-font)',
    fontSize: 'var(--emoji-size)',
    height: '1.5em',
    justifyContent: 'center',
    margin: 0,
    overflow: 'hidden',
    padding: 0,
    width: '1.5em',
    display: 'flex',

    '&:hover': {
      background: 'var(--hover-color)',
      border: ['1px', 'solid', 'var(--hover-shadow-color)']
    },

    '&:focus': {
      borderRadius: 0,
      background: 'var(--focus-indicator-background)',
      outline: '1px solid var(--focus-indicator-color)'
    }
  },

  emojis: {
    height: 'calc(var(--content-height) - var(--category-button-height) - 1em)',
    overflowY: 'auto',
    position: 'relative'
  },

  emojiContainer: {
    display: 'grid',
    justifyContent: 'space-between',
    gap: '1px',
    padding: [0, '0.5em'],
    gridTemplateColumns: 'repeat(var(--emojis-per-row), calc(var(--emoji-size) * var(--emoji-size-multiplier)))',
    gridAutoRows: 'calc(var(--emoji-size) * var(--emoji-size-multiplier))',
    marginTop: 8,
    marginBottom: 8
  },

  customEmoji: {
    width: '1em',
    height: '1em'
  },

  imagePlaceholder: {
    animation: '$pulse 1.75s ease-in-out infinite alternate',
    opacity: 0.1,
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    background: 'var(--image-placeholder-color)'
  }
};

export type EmojiKeys = keyof typeof emoji;
