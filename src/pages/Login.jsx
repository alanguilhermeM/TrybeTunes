import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    nameInput: '',
    isDisabled: true,
    isLoading: false,
  };

  handleButton = (event) => {
    const name = event.target.value;
    if (name.length > 2) {
      return this.setState({
        nameInput: `${name}`,
        isDisabled: false,
      });
    } return this.setState({
      isDisabled: true,
    });
  };

  handleClick = async () => {
    this.setState({
      isLoading: true,
    });
    const { nameInput } = this.state;
    const { history } = this.props;
    await createUser({ name: nameInput });
    history.push('/search');
  };

  render() {
    const { isLoading, isDisabled } = this.state;
    return (
      <div data-testid="page-login">
        {
          isLoading ? <h2>Carregando...</h2> : (
            <div>
              <label htmlFor="name">
                <input
                  data-testid="login-name-input"
                  type="text"
                  name=""
                  id="name"
                  onChange={ this.handleButton }
                />
              </label>
              <button
                data-testid="login-submit-button"
                disabled={ isDisabled }
                onClick={ this.handleClick }
              >
                Entrar

              </button>

            </div>
          )
        }

      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
