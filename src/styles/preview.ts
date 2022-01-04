export const preview = {
  preview: {
    alignItems: 'center',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'row',
    height: 'var(--emoji-preview-size)',
    padding: '0.5em'
  },

  previewEmoji: {
    fontSize: 'var(--emoji-preview-size)',
    marginRight: '0.25em',
    fontFamily: 'var(--emoji-font)'
  },

  previewName: {
    color: 'var(--text-color)',
    fontSize: '0.85em',
    overflowWrap: 'break-word',
    wordBreak: 'break-all'
  }
};

export type PreviewKeys = keyof typeof preview;
