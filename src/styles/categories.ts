export const categories = {
  categoryName: {
    fontSize: '1em',
    padding: [6, 12],
    margin: 0,
    background: 'var(--category-name-background)',
    color: 'var(--category-name-text-color)',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',

    '&::after': {
      width: '100%',
      height: 10,
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: -10,
      backgroundImage: 'linear-gradient(180deg, var(--fade-gradient-start) 30%, var(--fade-gradient-end) 100%)'
    },

    '& img': {
      fill: 'var(--category-name-accent)',
      width: '2rem'
    },

    '& button': {
      opacity: 0,
      background: 'transparent',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'opacity 0.2s ease-in-out',
      color: 'var(--category-name-button-color)',

      '&:hover': {
        opacity: 1
      }
    },

    '&:hover button': {
      opacity: 0.5
    }
  },

  categoryTop: {
    height: '1px'
  },

  categoryBottom: {
    height: '2px'
  },

  categoryButtons: {
    display: 'flex',
    flexDirection: 'row',
    height: 'var(--category-button-height)',
    justifyContent: 'space-between',
    margin: 0,
    marginBottom: 8,
    padding: [0, 8, 8, 8],
    borderBottom: '1px solid var(--border-color)',
    position: 'relative'
  },

  activeIndicator: {
    position: 'absolute',
    content: '""',
    bottom: 4,
    left: 0,
    width: 'calc(1.5em + 4px)',
    height: 5,
    background: 'var(--category-button-active-color)'
  },

  categoryButton: {
    background: 'transparent',
    border: 'none',
    borderRadius: 5,
    color: 'var(--category-button-color)',
    cursor: 'pointer',
    fontSize: 'var(--category-button-size)',
    padding: 4,
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '1.5em',
    width: '1.5em',
    transition: 'all 250ms',

    '& img': {
      width: 'var(--category-button-size)',
      height: 'var(--category-button-size)'
    },

    '&:hover': {
      color: 'var(--category-button-highlight-color)'
    }
  },

  categoryButtonActive: {
    color: 'var(--category-button-active-color)',
    borderColor: 'var(--category-button-active-color)',
    position: 'relative',

    '&:hover': {
      color: 'var(--category-button-active-color)'
    }
  }
};

export type CategoryKeys = keyof typeof categories;
