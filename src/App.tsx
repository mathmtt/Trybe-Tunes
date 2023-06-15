import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <h1>Search</h1> } />
      <Route path="/album" element={ <h1>Album</h1> } />
      <Route path="*" element={ <h1>NotFound</h1> } />
    </Routes>
  );
}

export default App;
