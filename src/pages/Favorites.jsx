import React, { Component } from 'react';
import { Header } from '../components/Header';

class Favorites extends Component {
  state = {
    favoritesSongs: [],
    checked: false,
  };

  async componentDidMount() {
    const favoritesSongs = JSON.parse(localStorage.getItem('favorite_songs'));
    this.setState({
      favoritesSongs,
      checked: true,
    });
  }

  render() {
    const { favoritesSongs, checked } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          favoritesSongs.map((favoriteSong) => (
            <div key={ favoriteSong.trackId }>
              <p data-testid="music-name">{ favoriteSong.musicName }</p>
              <audio data-testid="audio-component" src={ favoriteSong.audio } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                {' '}
                <code>audio</code>
                .
              </audio>
              <label data-testid={ `checkbox-music-${favoriteSong.trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  value={ favoriteSong.trackId }
                  checked={ checked }
                  // onChange={ ({ target }) => {
                  //   this.setState({ checked: target.checked });
                  //   handleFavorite(target.checked, favoriteSong);
                  // } }
                />
              </label>
            </div>
          ))
        }
      </div>
    );
  }
}

export default Favorites;
