import { useEffect, useState } from 'preact/hooks';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import style from './style.scss';

/**
 * Render a player for the given video
 *
 * @param {string} param0.id - ID of the video to be shown
 * @returns Component
 */
const Video = ({ id }) => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  const [video, setVideo] = useState({});

  // Fetch the desired video
  useEffect(() => {
    if (!id) {
      // If no id is provided, we can't fetch a video
      return false;
    }
    ApiService.getVideo(id).then((video) => {
      setVideo(video);
    });
  }, [id]);

  return (
    <div class={style.video}>
      <Header showMenu={true} title={video.title} backLink='/videos' />
      <div class={style.content}>
        {video && (
          <video controls src={video.src} class={style.videoEl}></video>
        )}
      </div>
    </div>
  );
};

export default Video;
