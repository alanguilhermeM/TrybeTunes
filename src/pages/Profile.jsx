import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { Header } from '../components/Header';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    isLoading: true,
    profile: [],
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      profile: [user],
    });
  }

  render() {
    const { isLoading, profile } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading ? <h2>Carregando...</h2> : (
          profile.map((user) => (
            <div key={ Math.random() }>
              <h3>{ user.name }</h3>
              <h4>{ user.email }</h4>
              <h4>{ user.description }</h4>
              <img data-testid="profile-image" src={ user.image } alt="profile img" />
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default Profile;
