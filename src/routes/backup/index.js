import { useEffect, useState } from 'preact/hooks';
import Button from '../../components/button';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import style from './style.scss';

const Backup = () => {
  const [backupURL, setBackupURL] = useState(null);
  const [loading, setLoading] = useState(false);

  // Protected route - user must be an admin
  useEffect(() => {
    verifyUserIsLoggedIn(true);
  }, []);

  const createBackup = () => {
    setLoading(true);
    ApiService.fetchAnimals({ fetchAll: true }).then((animals) => {
      const backupJSON = JSON.stringify(animals);
      const backupURL = URL.createObjectURL(
        new Blob([backupJSON], { type: 'application/json' })
      );

      setBackupURL(backupURL);
      setLoading(false);
    });
  };

  return (
    <div class={style.backup}>
      <Header showMenu={true} title='Backup Animals' backLink='/' />
      <div class={style.content}>
        <p>
          This will create a backup of all animals currently in the database.
          You can download this backup, or save it to MLPR's cloud storage
          (future).
        </p>
        <p>NOTE: This is a 2-step process.</p>
        {!backupURL ? (
          <Button onClick={createBackup} disabled={loading}>
            {loading ? 'Loading' : 'Prepare Backup'}
          </Button>
        ) : (
          <a href={backupURL} download='backup.json'>
            <Button onClick={() => null}>Download File</Button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Backup;
