import { useState } from 'preact/hooks';
import EditForm from '../../components/edit-form';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import style from './style.scss';

const Add = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [state, setState] = useState(null);

  const onSave = (animal) => {
    setLoading(true);
    ApiService.addOrUpdateAnimal(animal).then(
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
