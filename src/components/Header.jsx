import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export class Header extends Component {
  state = {
    isLoading: false,
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    await getUser();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <header data-testid="header-component">
        {
          isLoading ? <h2>Carregando...</h2> : (
            <h2>Search</h2>
          )
        }
        Header
      </header>
    );
  }
}

export default Header;
