import { getCurrentUrl } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { authenticate, verifyUserIsLoggedIn } from '../../shared/auth-guard';
import { PERMISSIONS } from '../../shared/constants';
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
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is 'admin' to display extra controls
  useEffect(() => {
    authenticate({
      permissions: [PERMISSIONS.admin],
      redirectUrl: getCurrentUrl()
    }).then(async (hasPermission) => {
      setIsAdmin(hasPermission);
    });
  }, []);

  useEffect(() => {
    if (!id) {
      // If no id is provided, we can't fetch a video
      return false;
    }
    ApiService.getVideo(id).then(async (video) => {
      setVideo(video);
    });
  }, [id]);

  return (
    <div class={style.video}>
      <Header showMenu={true} title={video.name} backLink='/videos' />
      <div class={style.content}></div>
    </div>
  );
};

export default Video;
