import { useState } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import { AlbumType } from '../types';

function Search() {
  const [inputs, setInputs] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);
  const [promise, setPromise] = useState<AlbumType[]>([]);
  const [error, setError] = useState(false);

  const giveIn = () => {
    localStorage.setItem('artist', inputs);
    setLoading(true);
    setInputs('');
    searchAlbumsAPI(inputs).then((reactive) => {
      setLoading(false);
      if (reactive.length > 0) {
        setPromise(reactive);
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  const modify = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs(event.target.value);
    if
    (event
      .target
      .value
      .length >= 2) { setDisabledButton(false); } else { setDisabledButton(true); }
  };

  return (
    <>
      <h1>Search your Artist!</h1>
      <div>
        {loading && <Loading />}
        {!loading && (
          <form onSubmit={ giveIn }>
            <input
              type="text"
              value={ inputs }
              data-testid="search-artist-input"
              onChange={ modify }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disabledButton }
            >
              Pesquisar
            </button>
          </form>
        )}
      </div>
      {promise.length > 1 && (
        <div>
          <h2>
            Resultado de álbuns de:
            {' '}
            {localStorage.getItem('artist')}
          </h2>
          <div>
            {promise.map((album) => {
              return (
                <div key={ album.artistId }>
                  <img src={ album.artworkUrl100 } alt="album" />
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    <p>{album.collectionName}</p>
                  </Link>
                  <p>{ album.artistName }</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {error && (
        <h1>Nenhum álbum foi encontrado</h1>
      )}
    </>
  );
}

export default Search;
