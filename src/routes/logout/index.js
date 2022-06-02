import { signOut } from 'firebase/auth';
import { route } from 'preact-router';
import { auth } from '../../shared/firebase';

const Logout = () => {
  signOut(auth).then(
    () => route('/'),
    (error) => console.error(error)
  );
  return <div>Logging Out...</div>;
};

export default Logout;
