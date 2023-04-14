import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
        {
          isLoading ? <h2>Carregando...</h2> : (
            <header data-testid="header-component">
              <h2 data-testid="header-user-name">{name}</h2>
              <nav>
                <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
                <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
                <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
              </nav>
            </header>
          )
        }
      </div>
    );
  }
}
export default Header;
