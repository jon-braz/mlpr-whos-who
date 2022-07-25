import { onAuthStateChanged } from 'firebase/auth';
import { route } from 'preact-router';

import ApiService from './api-service';
import { auth } from './firebase';
import { buildRoute } from './helpers';

const redirectToLogin = (redirectUrl, warningMessage) => {
  route(buildRoute('/login', { redirectUrl, warningMessage }));
};

export const authenticate = ({ permissions, redirectUrl, warningMessage }) => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        redirectToLogin(redirectUrl, warningMessage);
        return;
      }

      if (!permissions?.length) {
        resolve(true);
        return;
      }

      ApiService.getUser(user.uid)
        .then((user) => {
          const allowed = permissions.every((permission) => user[permission]);
          resolve(allowed);
        })
        .catch(() => resolve(false));
    });
  });
};
