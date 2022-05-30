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

const App = () => (
  <div id='app' class={style.app}>
    <Router>
      <Home path='/' />
      <Area path='/area/:area' />
      <Who path='/who/:name' />
      <Add path='/add' />
      <Edit path='/edit/:name' />
      <Rehomed path='/rehomed' />
      <Install path='/install' />
    </Router>
  </div>
);

export default App;
