import React, { Component } from 'react';
import { Header } from '../components/Header';

class Search extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          isLoading ? <h2>Carregando...</h2> : (
            <h2>Search</h2>
          )
        }
      </div>
    );
  }
}

export default Search;
