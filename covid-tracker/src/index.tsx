import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const blueGreyTheme = createTheme({
    palette: {
        primary: {
            main: blueGrey[900],
        },
        secondary: {
            main: blueGrey[800],
        },
    },
})
  

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <ThemeProvider theme={blueGreyTheme}>
        <App />
    </ThemeProvider>
)