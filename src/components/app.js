import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Area from '../routes/area';
import Who from '../routes/who';
import Add from '../routes/add';
import Edit from '../routes/edit';

const App = () => (
  <div id='app'>
    <Router>
      <Home path='/' />
      <Area path='/area/:area' />
      <Who path='/who/:name' />
      <Add path='/add' />
      <Edit path='/edit/:name' />
    </Router>
  </div>
);

export default App;
