import { useEffect, useState } from 'preact/hooks';
import EditForm from '../../components/edit-form';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import style from './style.scss';

const Edit = ({ name }) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [state, setState] = useState(null);
  const [formState, setFormState] = useState(null);

  useEffect(() => {
    setLoading(true);
    ApiService.fetchAnimal({ name }).then((animal) => {
      setFormState({
        ...animal,
        food: animal.food.join(',')
      });
      setLoading(false);
    });
  }, [name]);

  const onSave = (updatedAnimal) => {
    setLoading(true);
    ApiService.addOrUpdateAnimal(updatedAnimal).then(
      () => {
        setLoading(false);
        setStatus(`${updatedAnimal.name} updated`);
        setState('success');

        setTimeout(() => {
          setState(null);
          setStatus(null);
        }, 5000);
      },
      (error) => {
        setLoading(false);
        setStatus(`Error updating ${updatedAnimal.name}`);
        setState('error');
        console.error('Error when updating animal: ', error);

        setTimeout(() => {
          setState(null);
          setStatus(null);
        }, 5000);
      }
    );
  };

  return (
    <div class={style.add}>
      <Header
        title={`Edit ${formState?.name || '...'}`}
        backLink={`/who/${name}`}
      />
      {formState && (
        <EditForm onSave={onSave} loading={loading} existingState={formState} />
      )}
      <span class={`${style.status} ${style[state]}`}>{status}</span>
    </div>
  );
};

export default Edit;
