import React, { Component } from 'react';
import { Header } from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    name: '',
    album: '',
    isLoading: false,
    favoriteSongs: {},
    favoriteSongs2: {},
  };

  async componentDidMount() {
    const id = this.getId();
    const result = await getMusics(id);
    const musics = result.map((music) => ({
      musicName: music.trackName,
      audio: music.previewUrl,
      kind: music.kind,
      trackId: music.trackId,
    }));
    const favoriteSongs2 = await getFavoriteSongs();
    this.setState({
      musics,
      name: result[0].artistName,
      album: result[0].collectionName,
      favoriteSongs2,
    });
  }

  getId = () => {
    const path = location.pathname;
    const ids = path.split('/');
    const idd = ids[2];
    return idd;
  };

  handleFavorite = async (event) => {
    const { favoriteSongs } = this.state;
    const trackId = event.target.value;
    const isFavorite = favoriteSongs[trackId] || false; // obtém o estado atual da música favorita
    const updatedFavoriteSongs = {
      ...favoriteSongs,
      [trackId]: !isFavorite, // atualiza o estado da música favorita
    };
    this.setState({
      isLoading: true,
      favoriteSongs: updatedFavoriteSongs,
    });
    if (updatedFavoriteSongs[trackId]) {
      const { musics } = this.state;
      const music = musics.find((musicc) => musicc.trackId === Number(trackId));
      await addSong(music);
    }
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { musics, name, album, isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading ? <h1>Carregando...</h1> : (
            <div>
              <h3 data-testid="artist-name">{name}</h3>
              <h4 data-testid="album-name">{album}</h4>
              {musics.filter((music) => music.kind === 'song')
                .map((music, index) => (
                  <div key={ index }>
                    <p data-testid="music-name">{ music.musicName }</p>
                    <audio data-testid="audio-component" src={ music.audio } controls>
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label data-testid={ `checkbox-music-${music.trackId}` }>
                      Favorita
                      <input
                        type="checkbox"
                        value={ music.trackId }
                        onChange={ this.handleFavorite }
                        checked={ favoriteSongs[music.trackId] || false }
                      />
                    </label>
                  </div>
                ))}
            </div>
          )
        }
      </div>
    );
  }
}

export default Album;
