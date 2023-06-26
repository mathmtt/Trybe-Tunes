import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

function Header() {
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    async function captureUser() {
      setCarregando(true);
      const user = await getUser();
      setCarregando(false);
      setNome(user.name);
      console.log(user);
    }
    captureUser();
  }, []);
  const carregandoPage = carregando && <Loading />;
  return (
    <header data-testid="header-component">
      <nav>
        <NavLink to="/search" data-testid="link-to-search">Search</NavLink>
        <NavLink to="/profile" data-testid="link-to-profile">Profile</NavLink>
        <NavLink to="/favorites" data-testid="link-to-favorites">Favorites</NavLink>
      </nav>
      <p data-testid="header-user-name">{ nome }</p>
      { carregandoPage }
    </header>
  );
}

export default Header;
