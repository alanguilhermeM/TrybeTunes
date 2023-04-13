import React, { Component } from 'react';
import { getUser } from '../services/userAPI';

export class Header extends Component {
  state = {
    name: '',
    isLoading: true,
  };

  async componentDidMount() {
    await getUser();
    const user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      name: user.name,
      isLoading: false,
    });
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          Header
        </header>
        {
          isLoading ? <h2>Carregando...</h2> : (
            <h2 data-testid="header-user-name">{name}</h2>
          )
        }
      </div>
    );
  }
}
export default Header;
