import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Link, route } from 'preact-router';
import { useState } from 'preact/hooks';

import { auth } from '../../shared/firebase';
import Header from '../../components/header';
import style from './style.scss';
import ApiService from '../../shared/api-service';
import { buildRoute } from '../../shared/helpers';
import { warningMessages } from '../../shared/warning-messages';

const Register = ({ matches }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const loggedIn = !!auth.currentUser;

  const { redirectUrl, warningMessage: warningMessageKey } = matches;

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
        const { user } = userCredential;

        // Add their name
        updateProfile(user, { displayName });

        // Set their roles (all users are writers by default)
        ApiService.updateUserRoles({
          user: { email: user.email, displayName, uid: user.uid },
          writer: true
        }).then(() => {
          // Account is ready -> redirect to given target or home
          route(redirectUrl || '/');
        });
      })
      .catch((error) => {
        setErrorMsg(error.message);
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
            <Link href={buildRoute('/login', { redirectUrl })}>
              Have an account already? Log in here.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
