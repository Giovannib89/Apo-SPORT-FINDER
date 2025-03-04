/* eslint-disable import/no-unresolved */
// == Import : npm
import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import PropTypes from 'prop-types';

// == Import : local
import Field from 'src/components/Field';
import './modalSignUp.scss';

// == Component
const ModalSignUp = ({
  pseudo,
  email,
  password,
  passwordConfirm,
  passwordError,
  changeField,
  handleCreateUser,
  isCreateUserSuccess,
  isCreateUserError,
  onClickCloseSignUp,
  isCreatePasswordLengthError,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleCreateUser();
  };
  const handleOnClickCloseSignUp = () => {
    onClickCloseSignUp();
  };
  return (
    <div className="modalSignUp">
      <div className="modalSignUp__container">
        <button
          type="submit"
          className="modalSignUp__container__close"
          onClick={handleOnClickCloseSignUp}
        >
          <IoIosCloseCircleOutline className="modalSignUp__container__close__circle" />
        </button>
        <h1 className="modalSignUp__container__title">Inscription</h1>
        <form className="modalSignUp__container__form" onSubmit={handleSubmit}>
          { !isCreateUserSuccess && (
            <div className="modalSignUp__container__form__first">
              <Field
                name="email"
                type="email"
                className=""
                placeholder="Email..."
                onChange={changeField}
                value={email}
              />
              <Field
                name="pseudo"
                type="text"
                className=""
                placeholder="Pseudo..."
                onChange={changeField}
                value={pseudo}
              />
            </div>
          )}
          { !isCreateUserSuccess && (
            <div className="modalSignUp__container__form__second">
              <Field
                name="password"
                type="password"
                className=""
                placeholder="Mot de passe..."
                onChange={changeField}
                value={password}
              />
              <Field
                name="passwordConfirm"
                type="password"
                className=""
                placeholder="Vérification mot de passe..."
                onChange={changeField}
                value={passwordConfirm}
              />
            </div>
          )}
          { !isCreateUserSuccess && (
            <p className="modalSignUp__container__form__third">
              Votre mot de passe doit contenir au minimum 8 caractères.
            </p>
          )}
          {isCreateUserSuccess && <p className="modalSignUp__container__form__success">Compte crée avec succès, veuillez vous connecter</p>}
          {passwordError && <p className="modalSignUp__container__form__error">Mot de passe non identique.</p>}
          {isCreateUserError && <p className="modalSignUp__container__form__error">Email ou pseudo déjà existant.</p>}
          {isCreatePasswordLengthError && <p className="modalSignUp__container__form__error">Votre mot de passe doit contenir au minimum 8 caractères.</p>}
          {isCreateUserSuccess && (
            <button
              type="submit"
              className="modalSignUp__container__form__button"
              onClick={handleOnClickCloseSignUp}
            >
              Ok
            </button>
          )}
          {!isCreateUserSuccess && (
            <button
              type="submit"
              className="modalSignUp__container__form__button"
            >
              Valider
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

ModalSignUp.propTypes = {
  pseudo: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordConfirm: PropTypes.string.isRequired,
  passwordError: PropTypes.bool.isRequired,
  changeField: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  isCreateUserSuccess: PropTypes.bool.isRequired,
  isCreateUserError: PropTypes.bool.isRequired,
  onClickCloseSignUp: PropTypes.func.isRequired,
  isCreatePasswordLengthError: PropTypes.bool.isRequired,
};

// == Export
export default ModalSignUp;
