import { getAuth } from 'firebase/auth';
import { route } from 'preact-router';

import ApiService from './api-service';

const redirectToLogin = (redirectUrl) => {
  route(`/login${redirectUrl ? `?redirectUrl=${redirectUrl}` : ''}`);
};

export const authenticate = ({ permissions, redirectUrl }) => {
  const currentUserId = getAuth().currentUser?.uid;

  if (!currentUserId) {
    redirectToLogin(redirectUrl);
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
