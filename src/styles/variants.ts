export const variants = {
  variantOverlay: {
    background: 'var(--overlay-background-color)',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1
  },

  variantPopup: {
    background: 'var(--popup-background-color)',
    borderRadius: '5px',
    margin: '0.5em',
    padding: '0.5em',
    textAlign: 'center',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& > div': {
      display: 'inline-flex',
      gap: '2px'
    }
  }
};

export type VariantKeys = keyof typeof variants;
