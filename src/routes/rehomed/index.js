import { useEffect, useState } from 'preact/hooks';
import Button from '../../components/button';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import style from './style.scss';

const Rehomed = () => {
  const [animals, updateAnimals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  useEffect(() => {
    setLoading(true);
    ApiService.fetchAnimals({ rehomed: true }).then((fetchedAnimals) => {
      updateAnimals(fetchedAnimals);
      setLoading(false);
    });
  }, []);

  const animalList = animals.map((animal) => (
    <div class={style.animal}>
      <Button
        href={`/who/${animal.id}`}
        style={{ fontSize: '16px', width: '100%' }}>
        {animal.name}
      </Button>
    </div>
  ));

  return (
    <div class={style.rehomed}>
      <Header showMenu={true} title='Rehomed Animals' backLink='/' />
      <div class={style.content}>
        {loading && <p>Loading...</p>}
        {!loading &&
          (animalList?.length ? animalList : <p>No rehomed animals found</p>)}
      </div>
    </div>
  );
};

export default Rehomed;
