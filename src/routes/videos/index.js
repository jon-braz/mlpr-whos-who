import { getCurrentUrl, Link } from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import Header from '../../components/header';
import ApiService from '../../shared/api-service';
import { authenticate, verifyUserIsLoggedIn } from '../../shared/auth-guard';
import { PERMISSIONS, MB } from '../../shared/constants';
import style from './style.scss';
import ControlledInputWithSave from '../../components/controlled-input-save';

const Videos = () => {
  // Protected route - user must be logged in
  useEffect(() => {
    verifyUserIsLoggedIn();
  }, []);

  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [categoryInput, setCategoryInput] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [newCategoryDisabled, setNewCategoryDisabled] = useState(false);

  const [videoPath, setVideoPath] = useState(null);
  const [showVideoInput, setShowVideoInput] = useState(null);

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
    Promise.all([ApiService.getVideos(), ApiService.getVideoCategories()]).then(
      async ([videos, categories]) => {
        setVideos(videos);
        setCategories(categories || []);
      }
    );
  }, []);

  /*
   * Handle Inputs (not yet in use)
   * - New Category
   * - Upload Video
   */

  const onCategoryInput = (e) => {
    setCategoryInput(e.target.value);
  };
  const triggerShowCategoryInput = () => setShowCategoryInput(true);

  const triggerShowVideoInput = (category) => () => setShowVideoInput(category);
  const onVideoInput = (e) => {
    const video = e.target.files[0];
    if (!file) {
      setVideoPath('');
      return;
    }

    const fileSize = video.length / MB;
  };

  /**
   * Render a div for each category, with a list of videos and option to add a new video to that category
   */
  const categoryEls = categories.map((category) => {
    const videosInCategory = videos.filter(
      (video) => video.category === category
    );
    const videoEls = videosInCategory.map((video) => (
      <Link href={`/videos/${video.id}`}>{video.title}</Link>
    ));

    return (
      <section>
        <h2 class={style.categoryTitle}>{category}</h2>
        {videoEls}
        {isAdmin && showVideoInput !== category && (
          <button onClick={triggerShowVideoInput(category)}>+ Add Video</button>
        )}
        {isAdmin && showVideoInput === category && (
          <div>
            <input
              value={videoPath}
              onInput={onVideoInput}
              type='file'
              accept='video/*'
            />
          </div>
        )}
      </section>
    );
  });

  const saveNewCategory = () => {
    const newCategory = categoryInput;
    if (!newCategory) {
      window.alert('You must enter a name for the new category');
      return false;
    }
    if (categories.includes(newCategory)) {
      window.alert('The category you are trying to add already exists.');
      return false;
    }

    const categoriesWithNew = [...categories, newCategory];
    setNewCategoryDisabled(true);
    ApiService.updateVideoCategories(categoriesWithNew).then(() => {
      setCategories(categoriesWithNew);
      setShowCategoryInput(false);
      setNewCategoryDisabled(false);
    });
  };

  /*
   * Render
   */

  return (
    <div class={style.videos}>
      <Header showMenu={true} title='Videos' backLink='/' />
      <div class={style.content}>{categoryEls}</div>
      {isAdmin && !showCategoryInput && (
        <button onClick={triggerShowCategoryInput}>+ Add Category</button>
      )}
      {isAdmin && showCategoryInput && (
        <div>
          <ControlledInputWithSave
            value={categoryInput}
            onChange={onCategoryInput}
            onSave={saveNewCategory}
            disabled={newCategoryDisabled}
          />
        </div>
      )}
    </div>
  );
};

export default Videos;
