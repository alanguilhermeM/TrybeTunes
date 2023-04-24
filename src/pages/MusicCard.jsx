import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, removeSong, addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    checked: false,
    isLoading: true,
  };

  async componentDidMount() {
    const { music } = this.props;
    const favorites = await this.handleFavoriteSongs();
    if (favorites !== null) {
      const isFavorite = favorites
        .filter((favorite) => favorite.musicName === music.musicName);
      if (isFavorite.length > 0) {
        this.setState({
          checked: true,
        });
      }
      this.setState({
        isLoading: false,
      });
    }
  }

  handleFavorite = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;
    this.setState({
      checked,
      isLoading: true,
    });
    if (checked) {
      await addSong(music);
      // this.setState((previusState) => ({
      //   isLoading: false,
      //   favoriteSongs: [...previusState.favoriteSongs, music],
      // }));
    } else {
      await removeSong(music);
    }
    this.setState({
      isLoading: false,
    });
    // const result = await getFavoriteSongs();
    // return result;
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
          <p data-testid="music-name">{ music.musicName }</p>
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
    musicName: PropTypes.string.isRequired,
    audio: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
};
