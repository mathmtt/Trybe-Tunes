import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';
import Album from './components/Album';

function App() {
  return (
    <Routes>
      <Route index element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album/:id" element={ <Album /> } />
      <Route path="*" element={ <h1>NotFound</h1> } />
    </Routes>
  );
}

export default App;
