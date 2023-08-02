import { createTheme } from '@mui/material/styles';
import { indigo, pink, grey, white} from '@mui/material/colors';

export const theme = createTheme({
  background: {
    default: '#FFE17B'
  },
  palette: {
    mode: 'light',
    primary: indigo,
    secondary: pink,
    purple: {
      main: '#6573c3',
    },
    white: {
      main: '#ffffff',
    },
  },

});