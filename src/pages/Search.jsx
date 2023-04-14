import React, { Component } from 'react';
import { Header } from '../components/Header';

class Search extends Component {
  state = {
    isLoading: false,
    isDisabled: true,
    inputValue: '',
  };

  handleButton = () => {
    const { inputValue } = this.state;
    this.setState({ isDisabled: inputValue.length < 2 });
  };

  handleInputValue = (event) => {
    const { value } = event.target;
    this.setState({ inputValue: value }, this.handleButton);
  };

  render() {
    const { isLoading, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <h2>Carregando...</h2> : (
            <form>
              <h2>Search</h2>
              <label>
                <input
                  data-testid="search-artist-input"
                  placeholder="Nome do Artista"
                  onChange={ this.handleInputValue }
                />
                <button
                  data-testid="search-artist-button"
                  disabled={ isDisabled }
                >
                  Pesquisar

                </button>
              </label>
            </form>
          )
        }
      </div>
    );
  }
}

export default Search;
