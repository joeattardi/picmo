export const preview = {
  preview: {
    alignItems: 'center',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'row',
    height: 'var(--emoji-preview-size)',
    padding: '0.5em',
    position: 'relative',
    marginTop: 4,

    '&::after': {
      width: '100%',
      height: 10,
      content: '""',
      position: 'absolute',
      left: 0,
      top: -11,
      backgroundImage: 'linear-gradient(0deg, var(--fade-gradient-start) 30%, var(--fade-gradient-end) 100%)'
    }
  },

  previewEmoji: {
    fontSize: 'var(--emoji-preview-size)',
    marginRight: '0.25em',
    fontFamily: 'var(--emoji-font)',
    display: 'flex',
    alignItems: 'center'
  },

  previewName: {
    color: 'var(--text-color)',
    fontSize: '1em',
    overflowWrap: 'break-word',
    wordBreak: 'break-all'
  }
};

export type PreviewKeys = keyof typeof preview;
