import dark from './dark';
import light from './light';

export default {
  '@media (prefers-color-scheme: light)': { ...light },
  '@media (prefers-color-scheme: dark)': { ...dark }
};
