import { signInWithEmailAndPassword } from 'firebase/auth';
import { route } from 'preact-router';
import { useState } from 'preact/hooks';

import { auth } from '../../shared/firebase';
import Header from '../../components/header';
import style from './style.scss';
import { warningMessages } from '../../shared/warning-messages';

const Login = ({ matches }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const loggedIn = !!auth.currentUser;

  const { redirectUrl, warningMessage: warningMessageKey } = matches;

  if (loggedIn) {
    route(redirectUrl || '/');
    // TODO: Set up redirect url so we can intercept page loads with login
    return;
  }

  const handleInput = (updateStateFn) => (event) => {
    updateStateFn(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorMsg(null);
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in -> route to home
        // TODO: Set up redirect url so we can intercept page loads with login
        route(redirectUrl || '/');
      })
      .catch((error) => {
        const errorCode = error.code;

        if (
          errorCode === 'auth/wrong-password' ||
          errorCode === 'auth/invalid-email' ||
          errorCode === 'auth/user-not-found'
        ) {
          setErrorMsg('The e-mail or password you entered is incorrect.');
        } else {
          setErrorMsg('There was an error logging in. Please try again later.');
        }
      });
  };

  const warningMessage = warningMessages[warningMessageKey] || '';

  return (
    <div class={style.login}>
      <Header showMenu={true} title='Login' />

      <div class={style.loginContainer}>
        {warningMessage && <p class={style.warningMessage}>{warningMessage}</p>}
        <form onSubmit={onSubmit}>
          <label class={style.row}>
            <span>E-Mail: </span>
            <input
              type='text'
              value={username}
              onInput={handleInput(setUsername)}></input>
          </label>
          <label class={style.row}>
            <span>Password: </span>
            <input
              type='password'
              value={password}
              onInput={handleInput(setPassword)}></input>
          </label>
          {errorMsg && (
            <div class={style.row}>
              <span></span>
              <div class={style.errorMsg}>{errorMsg}</div>
            </div>
          )}
          <div class={style.row}>
            <span></span>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
