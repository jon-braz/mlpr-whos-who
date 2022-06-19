import { getCurrentUrl, route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import EditForm from '../../components/edit-form';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { authenticate } from '../../shared/auth-guard';
import { PERMISSIONS } from '../../shared/constants';
import { warningMessageKeys } from '../../shared/warning-messages';
import style from './style.scss';

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [state, setState] = useState(null);

  useEffect(() => {
    authenticate({
      permissions: [PERMISSIONS.write],
      redirectUrl: getCurrentUrl(),
      warningMessage: warningMessageKeys.loginToEdit
    }).then((hasPermissions) => {
      if (!hasPermissions) {
        alert(
          `You don't have permission to add animals. Please contact Jon for support.`
        );
        route('/');
      }
    });
  }, []);

  const onSave = (animal) => {
    setLoading(true);
    ApiService.addAnimal(animal).then(
      () => {
        setLoading(false);
        setStatus(`${animal.name} added`);
        setState('success');

        setTimeout(() => {
          setState(null);
          setStatus(null);
        }, 5000);
      },
      (error) => {
        setLoading(false);
        setStatus(`Error adding ${animal.name}`);
        setState('error');
        console.error('Error when adding animal: ', error);

        setTimeout(() => {
          setState(null);
          setStatus(null);
        }, 5000);
      }
    );
  };

  return (
    <div class={style.add}>
      <Header title='Add Animal' backLink='/' />
      <EditForm onSave={onSave} loading={loading} />
      <span class={`${style.status} ${style[state]}`}>{status}</span>
    </div>
  );
};

export default Add;
