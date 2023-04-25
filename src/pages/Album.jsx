import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musics: [],
    name: '',
    album: '',
    isLoading: false,
    favoritesSongs: [],
  };

  async componentDidMount() {
    const result = await this.handleMusics();
    const musics = result.map((music) => ({
      trackName: music.trackName,
      audio: music.previewUrl,
      kind: music.kind,
      trackId: music.trackId,
    }));
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      musics,
      name: result[0].artistName,
      album: result[0].collectionName,
      favoritesSongs,
    });
  }

  removeSongRender = (trackId) => {
    this.setState((previusState) => ({
      favoritesSongs: previusState.favoritesSongs
        .filter((song) => song.trackId !== trackId),
    }));
  };

  handleMusics = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await getMusics(id);
    return result;
  };

  render() {
    const { musics, name, album, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {
          isLoading ? <h1>Carregando...</h1> : (
            <div>
              <h3 data-testid="artist-name">{name}</h3>
              <h4 data-testid="album-name">{album}</h4>
              {musics.filter((music) => music.kind === 'song')
                .map((music) => (
                  <MusicCard
                    removeSongRender={ this.removeSongRender }
                    key={ music.trackId }
                    music={ music }
                  />
                ))}
            </div>
          )
        }
      </div>
    );
  }
}

export default Album;

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
