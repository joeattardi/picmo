export const search = {
  searchResults: {
    height: 'var(--content-height)',
    overflowY: 'auto'
  },

  searchContainer: {
    display: 'flex',
    height: 'var(--search-height)',
    margin: '0.5em',
    marginBottom: '0.25em',
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

  searchIcon: {
    color: 'var(--search-icon-color)',
    height: '1em',
    position: 'absolute',
    right: '0.75em',
    top: 'calc(50% - 0.5em)',
    width: '1em',

    '& img': {
      width: '1em',
      height: '1em'
    }
  },

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
  },

  searchNotFoundIcon: {
    fontSize: '5em',

    '& img': {
      width: '1em',
      height: '1em'
    }
  }
};

export type SearchKeys = keyof typeof search;
