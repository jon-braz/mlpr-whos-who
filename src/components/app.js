import { Router } from 'preact-router';
import style from './style.scss';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Area from '../routes/area';
import Who from '../routes/who';
import Add from '../routes/add';
import Edit from '../routes/edit';
import Rehomed from '../routes/rehomed';
import Install from '../routes/install';
import Login from '../routes/login';
import Logout from '../routes/logout';
import Register from '../routes/register';
import Videos from '../routes/videos';
import Video from '../routes/video';

const App = () => (
  <div id='app' class={style.app}>
    <Router>
      <Home path='/' />
      <Area path='/area/:area' />
      <Who path='/who/:id' />
      <Add path='/add' />
      <Edit path='/edit/:id' />
      <Rehomed path='/rehomed' />
      <Install path='/install' />
      <Login path='/login' />
      <Logout path='/logout' />
      <Register path='/register' />
      <Videos path='/videos' />
      <Video path='/videos/:id' />
    </Router>
  </div>
);

export default App;
