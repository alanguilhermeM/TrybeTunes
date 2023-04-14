import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    isLoading: false,
    isDisabled: true,
    inputValue: '',
    carregando: false,
    text: '',
    albums: [],
    checkingAlbum: false,
  };

  handleButton = () => {
    const { inputValue } = this.state;
    this.setState({ isDisabled: inputValue.length < 2 });
  };

  handleInputValue = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value }, this.handleButton);
  };

  handleClick = async () => {
    const { inputValue } = this.state;
    this.setState({ carregando: true });
    const result = await searchAlbumsAPI(inputValue);
    const albums = result.map((albun) => ({
      id: albun.collectionId,
      collectionId: albun.collectionId,
      name: albun.collectionName,
      image: albun.artworkUrl100,
      artist: albun.artistName,
      price: albun.collectionPrice,
      date: albun.releaseDate,
      trackcount: albun.trackCount,
    }));
    this.setState((previus) => ({
      carregando: false,
      text: (
        <h2>
          {`Resultado de álbuns de: ${previus.inputValue}`}
        </h2>),
      inputValue: '',
      albums,
    }));
    if (albums.length > 0) {
      this.setState({
        checkingAlbum: true,
      });
    }
    return result;
  };

  render() {
    const { isLoading, isDisabled, carregando, text, albums, checkingAlbum } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <h2>Carregando...</h2> : (
            <form>
              <h2>Search</h2>
              {
                carregando ? <h2>Carregando...</h2> : (
                  <div>
                    <label>
                      <input
                        data-testid="search-artist-input"
                        placeholder="Nome do Artista"
                        onChange={ this.handleInputValue }
                      />
                      <button
                        data-testid="search-artist-button"
                        disabled={ isDisabled }
                        onClick={ this.handleClick }
                      >
                        Pesquisar

                      </button>
                    </label>
                    {text}
                    {
                      !checkingAlbum ? <h2>Nenhum álbum foi encontrado</h2> : (
                        <div>
                          {albums.map((album) => (
                            <div key={ album.id }>
                              <img src={ album.image } alt={ album.name } />
                              <p>{ album.name }</p>
                              <p>{ album.artist }</p>
                              <p>{ album.price }</p>
                              <p>{ album.trackcount }</p>
                              <p>{ album.date }</p>
                              <Link
                                to={ `/album/${album.collectionId}` }
                                data-testid={ `link-to-album-${album.collectionId}` }
                              >
                                Album
                              </Link>
                            </div>
                          ))}
                        </div>
                      )
                    }
                  </div>
                )
              }
            </form>
          )
        }
      </div>
    );
  }
}

export default Search;
