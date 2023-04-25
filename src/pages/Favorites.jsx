import React, { Component } from 'react';
import { Header } from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';

class Favorites extends Component {
  state = {
    favoritesSongs: [],
    isLoading: true,
  };

  async componentDidMount() {
    const favoritesSongs = await this.getFavorites();
    this.setState({
      favoritesSongs,
      isLoading: false,
    });
  }

  getFavorites = async () => {
    const favorites = await getFavoriteSongs();
    return favorites;
  };

  // addSongRender = () => {
  //   const { favoritesSongs } = this.state;
  //   const favorites = favoritesSongs.map(({ trackName, audio, kind, trackId }));
  //   this.setState((previusState) => ({
  //     favoritesSongs: [...previusState.favoritesSongs, favorites],
  //   }));
  // };

  removeSongRender = (trackId) => {
    this.setState((previusState) => ({
      favoritesSongs: previusState.favoritesSongs
        .filter((song) => song.trackId !== trackId),
    }));
  };

  render() {
    const { favoritesSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {
          isLoading ? <h2>Carregando...</h2> : (
            favoritesSongs.map((favoriteSong) => (
              <div key={ favoriteSong.trackId }>
                <MusicCard
                  favoritesSongs={ favoritesSongs }
                  music={ favoriteSong }
                  removeSongRender={ this.removeSongRender }
                  addSongRender={ this.addSongRender }
                />
              </div>
            ))
          )
        }
      </div>
    );
  }
}

export default Favorites;
