import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Area from '../routes/area';

const App = () => (
  <div id='app'>
    <Router>
      <Home path='/' />
      <Area path='/area/:area' />
    </Router>
  </div>
);

export default App;
