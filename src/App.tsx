import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/search" element={ <Search /> } />
      <Route path="/album" element={ <Album /> } />
      <Route path="*" element={ <NotFount /> } />
    </Routes>
  );
}

export default App;
