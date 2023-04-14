import React, { Component } from 'react';
import { Header } from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  state = {
    musics: [],
    name: '',
    album: '',
  };

  async componentDidMount() {
    const path = location.pathname;
    const ids = path.split('/');
    const idd = ids[2];
    const result = await getMusics(idd);
    const musics = result.map((music) => ({
      musicName: music.trackName,
      audio: music.previewUrl,
      kind: music.kind,
    }));
    this.setState({
      musics,
      name: result[0].artistName,
      album: result[0].collectionName,
    });
  }

  render() {
    const { musics, name, album } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
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
            </div>
          ))}
      </div>
    );
  }
}

export default Album;
