import { Link } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { verifyUserIsLoggedIn } from '../../shared/auth-guard';
import style from './style.scss';

const Videos = () => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    Promise.all([ApiService.getVideos(), ApiService.getVideoCategories()]).then(
      async ([videos, categories]) => {
        setVideos(videos);
        setCategories(categories || []);
      }
    );
  }, []);

  /**
   * Render a div for each category, with a list of videos and option to add a new video to that category
   */
  const categoryEls = categories.map((category) => {
    const videosInCategory = videos.filter(
      (video) => video.category === category
    );
    const videoEls = videosInCategory
      .sort((a, b) => (a?.order < b?.order ? -1 : 1))
      .map((video) => (
        <Link href={`/videos/${video.id}`} class={style.card}>
          <div class={style.videoDataContainer}>
            <h4 class={style.videoTitle}>{video.title}</h4>
            <span class={style.videoDescription}>{video.description}</span>
          </div>
        </Link>
      ));

    return (
      <section class={style.category}>
        <h2 class={style.categoryTitle}>{category}</h2>
        {videoEls}
      </section>
    );
  });

  /*
   * Render
   */

  return (
    <div class={style.videos}>
      <Header showMenu={true} title='Videos' backLink='/' />
      <div class={style.content}>{categoryEls}</div>
    </div>
  );
};

export default Videos;
