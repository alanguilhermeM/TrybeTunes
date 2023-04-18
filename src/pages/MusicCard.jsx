import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';


export default class MusicCard extends Component {
  state = {
    checked: false,
  };

  async componentDidMount() {
    const { music } = this.props;
    const favorites = await this.handleFavoriteSongs();
    const isFavorite = favorites
      .some((favorite) => favorite.trackName === music.trackName);
    this.setState({
      checked: isFavorite,
    });
  }

  handleFavoriteSongs = async () => {
    const result = await getFavoriteSongs();
    return result;
  };

  render() {
    const { checked } = this.state;
    const { music, handleFavorite } = this.props;
    return (
      <div>
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
            checked={ checked }
            onChange={ ({ target }) => {
              this.setState({ checked: target.checked });
              handleFavorite(target.checked, music);
            } }
          />
        </label>
      </div>
    );
  }
}
