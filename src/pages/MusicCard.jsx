import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: false,
  };

  async componentDidMount() {
    const { music } = this.props;
    const favorites = await this.handleFavoriteSongs();
    if (favorites !== null) {
      this.setState({
        checked: favorites.some((favorite) => favorite.trackId === music.trackId),
      });
    }
  }

  handleFavorite = async (event) => {
    event.preventDefault();
    const { checked } = event.target;
    const { music, removeSongRender } = this.props;
    this.setState({
      checked,
      isLoading: true,
    });
    if (checked) {
      await addSong(music);
      this.setState({
        checked: true,
      });
    } else {
      await removeSong(music);
      this.setState({
        checked: false,
      });
      removeSongRender(music.trackId);
    }
    this.setState({
      isLoading: false,
    });
  };

  handleFavoriteSongs = async () => {
    const result = await getFavoriteSongs();
    return result;
  };

  render() {
    const { checked, isLoading } = this.state;
    const { music } = this.props;
    return (
      isLoading ? <h2>Carregando...</h2> : (
        <div>
          <p data-testid="music-name">{ music.trackName }</p>
          <audio data-testid="audio-component" src={ music.audio } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            {' '}
            {' '}
            <code>audio</code>
            .
          </audio>
          <label>
            Favorita
            <input
              data-testid={ `checkbox-music-${music.trackId}` }
              type="checkbox"
              checked={ checked }
              onChange={ this.handleFavorite }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  removeSongRender: PropTypes.func.isRequired,
};
