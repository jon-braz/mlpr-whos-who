import { getAuth } from 'firebase/auth';
import { route } from 'preact-router';

import ApiService from './api-service';
import { buildRoute } from './helpers';

const redirectToLogin = (redirectUrl, warningMessage) => {
  route(buildRoute('/login', { redirectUrl, warningMessage }));
};

export const authenticate = ({ permissions, redirectUrl, warningMessage }) => {
  const currentUserId = getAuth().currentUser?.uid;

  if (!currentUserId) {
    redirectToLogin(redirectUrl, warningMessage);
    return Promise.resolve(true);
  }
  if (!permissions?.length) {
    return Promise.resolve(true);
  }

  return ApiService.getUser(currentUserId)
    .then((user) => {
      const allowed = permissions.every((permission) => user[permission]);
      return allowed;
    })
    .catch(() => {
      return false;
    });
};
