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
      background: 'transparent',
      border: 'none',
      '--icon-size': '1.2em',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      opacity: 0.3,
      transition: 'opacity 200ms',

      '&:hover': {
        opacity: 1
      }
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
    justifyContent: 'space-around',
    margin: '0.5em'
  },

  categoryButton: {
    fill: 'var(--category-button-color)',
    background: 'transparent',
    border: 'none',
    borderRadius: '0.25em',
    color: 'var(--category-button-color)',
    cursor: 'pointer',
    flexGrow: 1,
    fontSize: 'var(--category-button-size)',
    padding: 4,
    verticalAlign: 'middle',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& img': {
      width: 'var(--category-button-size)',
      height: 'var(--category-button-size)'
    },

    '&:hover': {
      fill: 'var(--category-button-highlight-color)'
    },

    '&:focus': {
      outline: '1px dotted var(--focus-indicator-color)'
    }
  },

  categoryButtonActive: {
    background: 'var(--category-button-active-background)',
    fill: 'var(--category-button-active-color)',

    '&:hover': {
      fill: 'var(--category-button-active-color)'
    }
  }
};

export type CategoryKeys = keyof typeof categories;
