import { onAuthStateChanged, signOut } from 'firebase/auth';
import { getCurrentUrl, route } from 'preact-router';

import ApiService from './api-service';
import { PERMISSIONS } from './constants';
import { auth } from './firebase';
import { buildRoute } from './helpers';
import { warningMessageKeys } from './warning-messages';

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

/**
 * Verifies that
 *   a) The user is logged in
 *   b) The user has 'writer' permissions
 *   c) (optionally) The user has 'admin' permission
 *
 * If either check fails, the user will be redirected to the login page (and signed out if needed)
 */
export const verifyUserIsLoggedIn = (admin) => {
  // Check for 'writer' permission and, if requested, 'admin'
  const permissions = [PERMISSIONS.write, admin && PERMISSIONS.admin].filter(
    Boolean
  );

  authenticate({
    permissions,
    redirectUrl: getCurrentUrl(),
    warningMessage: warningMessageKeys.loginGeneral
  }).then((hasPermissions) => {
    if (!hasPermissions) {
      alert(
        `This user isn't yet set up. Please contact Jon or Liam for support.`
      );
      signOut(auth).then(() => route(`/login`));
    }
  });
};

/**
 * Calls verifyUserIsLoggedIn(true) -> checks for 'admin' permission
 */
export const verifyUserIsAdmin = () => {
  verifyUserIsLoggedIn(true);
};
