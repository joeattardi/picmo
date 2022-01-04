export const categories = {
  categoryName: {
    margin: 0,
    fontSize: '0.85em',
    padding: '0.5em',
    backgroundImage: 'var(--category-name-background)',
    color: 'var(--category-name-text-color)',
    textTransform: 'uppercase',
    boxShadow: '0 0 2px 0 var(--category-name-shadow)',
    position: 'sticky',
    top: 0,

    '& svg': {
      fontSize: '1.25em',
      opacity: 0.5,
      marginRight: '0.25em'
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
    background: 'transparent',
    border: 'none',
    borderRadius: '0.25em',
    color: 'var(--category-button-color)',
    cursor: 'pointer',
    flexGrow: 1,
    fontSize: 'var(--category-button-size)',
    padding: 0,
    verticalAlign: 'middle',

    '& img': {
      width: 'var(--category-button-size)',
      height: 'var(--category-button-size)'
    },

    '&:hover': {
      color: 'var(--category-button-highlight-color)'
    },

    '&:focus': {
      outline: '1px dotted var(--focus-indicator-color)'
    }
  },

  categoryButtonActive: {
    background: 'var(--category-button-active-background)',
    color: 'var(--category-button-active-color)'
  }
};

export type CategoryKeys = keyof typeof categories;
