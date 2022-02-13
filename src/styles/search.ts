export const search = {
  searchResults: {
    height: 'var(--content-height)',
    overflowY: 'auto'
  },

  searchContainer: {
    display: 'flex',
    height: 'var(--search-height)',
    margin: '0.5em',
    position: 'relative'
  },

  searchField: {
    background: 'var(--search-background-color)',
    borderRadius: '3px',
    border: '1px solid var(--border-color)',
    boxSizing: 'border-box',
    color: 'var(--text-color)',
    fontSize: '0.85em',
    outline: 'none',
    paddingRight: '2em',
    padding: '0.5em 2.25em 0.5em 0.5em',
    width: '100%',

    '&:focus': {
      border: '1px solid var(--search-focus-border-color)'
    },

    '&::placeholder': {
      color: 'var(--search-placeholder-color)'
    }
  },

  clearButton: {
    border: 0,
    color: 'var(--search-icon-color)',
    background: 'transparent',
    cursor: 'pointer'
  },

  searchAccessory: {
    color: 'var(--search-icon-color)',
    height: '1.25rem',
    position: 'absolute',
    right: '0.75em',
    top: 'calc(50% - 0.625rem)',
    width: '1.25rem',
    display: 'flex',
    alignItems: 'center',

    '& img': {
      width: '1.25rem',
      height: '1.25rem'
    },

    '& svg': {
      fill: 'var(--search-icon-color)'
    }
  },

  clearSearchButton: {
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: 'var(--search-icon-color)',
    fontSize: '1em',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: 0
  },

  // TODO fix layering icons
  searchNotFound: {
    color: 'var(--secondary-text-color)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',

    '& div': {
      color: 'var(--secondary-text-color)'
    }
  },

  searchNotFoundMessage: {
    color: 'var(--secondary-text-color)',
    fontSize: '1em',
    margin: '0.5em 0'
  }
};

export type SearchKeys = keyof typeof search;
