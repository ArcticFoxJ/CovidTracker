import Container from '@mui/material/Container';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <div>
      <Header title='Covid Tracker'/>
      <Container component="main" maxWidth="sm" sx={{ mt: 2 }} >
        <div>
          TODO
        </div>
      </Container>
      <footer className="text-center"><a href="https://github.com/ArcticFoxJ" target="_blank" rel="noreferrer">@ArcticFoxJ</a> 2022</footer>
    </div>
  );
}

export default App;
