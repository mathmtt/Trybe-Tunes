import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album" element={ <h1>Album</h1> } />
      <Route path="*" element={ <h1>NotFound</h1> } />
    </Routes>
  );
}

export default App;
