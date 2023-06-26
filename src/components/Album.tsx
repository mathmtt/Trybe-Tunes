import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { AlbumType, SongType } from '../types';

function Album() {
  const { id } = useParams();
  const [list, setMusicList] = useState<SongType[]>([]);
  const [info, setInfo] = useState<AlbumType | null>(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (id) {
          const response = await getMusics(id);
          const [album, ...musicData] = response;
          setInfo(album);
          setMusicList(musicData);
          setCarregando(false);
        } else {
          console.error('ID do álbum não foi fornecido.');
          setCarregando(false);
        }
      } catch (error) {
        console.error('Erro ao obter músicas:', error);
        setCarregando(false);
      }
    };
    fetchAlbum();
  }, [id]);

  return (
    <div>
      {carregando ? (
        <div className="loading-message">
          Carregando...
        </div>
      ) : (
        <>
          <h2 data-testid="artist-name">{info?.artistName}</h2>
          <h1 data-testid="album-name">{info?.collectionName}</h1>
          <div className="music-list">
            {list.map((musica) => (
              <MusicCard
                key={ musica.trackId }
                trackName={ musica.trackName }
                previewUrl={ musica.previewUrl }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Album;
