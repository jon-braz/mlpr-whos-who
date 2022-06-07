import { getCurrentUrl, route } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import EditForm from '../../components/edit-form';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { authenticate } from '../../shared/auth-guard';
import { PERMISSIONS } from '../../shared/constants';
import { warningMessageKeys } from '../../shared/warning-messages';
import style from './style.scss';

const Edit = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [state, setState] = useState(null);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    authenticate({
      permissions: [PERMISSIONS.write],
      redirectUrl: getCurrentUrl(),
      warningMessage: warningMessageKeys.loginToEdit
    }).then((hasPermissions) => {
      if (!hasPermissions) {
        alert(
          `You don't have permission to edit animals. Please contact Jon for support.`
        );
        route(`/who/${name}`);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    ApiService.fetchAnimal({ name }).then((animal) => {
      setFormState({
        ...animal,
        food: animal.food?.join(',') || null
      });
      setLoading(false);
    });
  }, [name]);

  const onSave = (updatedAnimal) => {
    setLoading(true);
    return ApiService.addOrUpdateAnimal(updatedAnimal).then(
      () => {
        setLoading(false);
        route(`/who/${updatedAnimal.name.toLowerCase()}`);
      },
      (error) => {
        const { code } = error;
        console.log(JSON.stringify(error));

        setLoading(false);
        setState('error');

        switch (code) {
          case 'permission-denied':
            setStatus('You must be logged in to update an animal');
            break;
          default:
            setStatus(`Error updating ${updatedAnimal.name}`);
        }

        console.error('Error when updating animal: ', error);

        setTimeout(() => {
          setState(null);
          setStatus(null);
        }, 5000);
      }
    );
  };

  const onDelete = () => {
    const area = formState.area;
    return ApiService.deleteAnimal(name).then(() =>
      area ? route(`/area/${area}`) : route('/')
    );
  };

  return (
    <div class={style.add}>
      <Header
        title={`Edit ${formState?.name || '...'}`}
        backLink={`/who/${name}`}
      />
      {formState && (
        <EditForm
          onSave={onSave}
          onDelete={onDelete}
          loading={loading}
          existingState={formState}
        />
      )}
      <span class={`${style.status} ${style[state]}`}>{status}</span>
    </div>
  );
};

export default Edit;
