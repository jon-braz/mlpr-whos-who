import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, route } from 'preact-router';
import { useState } from 'preact/hooks';

import { auth } from '../../shared/firebase';
import Header from '../../components/header';
import style from './style.scss';
import ApiService from '../../shared/api-service';

const Register = ({ matches }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const loggedIn = !!auth.currentUser;

  const { redirectUrl } = matches;

  if (loggedIn) {
    route(redirectUrl || '/');
    return;
  }

  const handleInput = (updateStateFn) => (event) => {
    updateStateFn(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setErrorMsg(null);
    createUserWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Add their name
        updateProfile(userCredential.user, { displayName });

        // Signed in -> redirect to given target or home
        route(redirectUrl || '/');
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };

  return (
    <div class={style.login}>
      <Header showMenu={true} title='Login' />

      <div class={style.loginContainer}>
        <form onSubmit={onSubmit}>
          <label class={style.row}>
            <span>Name: </span>
            <input
              type='text'
              value={displayName}
              required
              onInput={handleInput(setDisplayName)}></input>
          </label>
          <label class={style.row}>
            <span>E-Mail: </span>
            <input
              type='text'
              value={username}
              required
              onInput={handleInput(setUsername)}></input>
          </label>
          <label class={style.row}>
            <span>Password: </span>
            <input
              type='password'
              value={password}
              required
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
            <button type='submit'>Register</button>
          </div>
          <div class={style.row}>
            <span></span>
            <Link
              href={`/login${
                redirectUrl ? '?redirectUrl=' + redirectUrl : ''
              }`}>
              Have an account already? Log in here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
