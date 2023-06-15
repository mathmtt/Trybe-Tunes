import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

const init = {
  name: '',
};

type Nome = {
  name: string;
};

function Login() {
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const traveling = useNavigate();
  const [inputs, setInputs] = useState<Nome>(init);

  const handleChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await createUser(inputs);
    setLoading(false);
    traveling('/search');
  };

  const handleClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [event?.target.id]: event?.target.value,
    });
    if (inputs.name.length >= 2) {
      setDisabledButton(false);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <form onSubmit={ handleChange }>
        <div>
          <label htmlFor="name">Insira seu nome:</label>
          <input
            type="text"
            id="name"
            data-testid="login-name-input"
            value={ inputs.name }
            onChange={ handleClick }
          />
        </div>
        <button
          data-testid="login-submit-button"
          disabled={ disabledButton }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
