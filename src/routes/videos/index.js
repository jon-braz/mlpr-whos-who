import { useEffect, useState } from 'preact/hooks';
import Header from '../../components/header';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import style from './style.scss';

const Videos = () => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    ApiService.getVideos().then(async (videos) => {
      setVideos(videos);
    });
  }, []);

  return (
    <div class={style.videos}>
      <Header showMenu={true} title='Videos' backLink='/' />
      <div class={style.content}></div>
    </div>
  );
};

export default Videos;
