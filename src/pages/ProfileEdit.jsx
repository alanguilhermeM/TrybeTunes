import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends Component {
  state = {
    isLoading: true,
    profile: {},
    isDisabled: true,
    newProfile: {},
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      profile: user,
    });
  }

  validation = () => {
    const email = document.getElementById('email').value;
    const description = document.getElementById('description').value;
    const name = document.getElementById('name').value;
    const image = document.getElementById('image').value;
    const newProfile = { description, email, image, name };
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = regex.test(email);

    if (name.length > 0 && description.length > 0
      && image.length > 0 && email.length > 0 && isValid) {
      this.setState({
        isDisabled: false,
        newProfile,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const { newProfile } = this.state;
    const { history } = this.props;
    await updateUser(newProfile);
    history.push('/profile');
  };

  render() {
    const { isLoading, profile, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {isLoading ? <h2>Carregando...</h2> : (
          <form>
            <label>
              Digite Seu Nome:
              <input
                id="name"
                data-testid="edit-input-name"
                type="text"
                defaultValue={ profile.name }
                onChange={ this.validation }
              />
            </label>
            <label>
              Digite Seu email:
              <input
                id="email"
                data-testid="edit-input-email"
                type="email"
                defaultValue={ profile.email }
                onChange={ this.validation }
              />
            </label>
            <label>
              Descrição:
              <input
                id="description"
                data-testid="edit-input-description"
                type="text"
                defaultValue={ profile.description }
                onChange={ this.validation }
              />
            </label>
            <label>
              Escolha uma Foto:
              <input
                id="image"
                data-testid="edit-input-image"
                type="url"
                defaultValue={ profile.image }
                onChange={ this.validation }
              />
            </label>
            <button
              data-testid="edit-button-save"
              disabled={ isDisabled }
              onClick={ this.handleClick }
            >
              Salvar

            </button>
          </form>
        )}
      </div>
    );
  }
}

export default ProfileEdit;

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
