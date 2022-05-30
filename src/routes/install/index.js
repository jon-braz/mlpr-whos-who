import Header from '../../components/header';
import style from './style.scss';

const Install = () => (
  <div class={style.rehomed}>
    <Header showMenu={true} title='Install App' backLink='/' />
    <div class={style.content}>
      <section>
        <h2>Android</h2>
        <ol>
          <li>Open this website with Chrome</li>
          <li>Open Chrome's menu (the three dots in the top right corner)</li>
          <li>Click 'Install App'</li>
        </ol>
      </section>
      <section>
        <h2>iPhone</h2>
        <ol>
          <li>Open this website with Safari</li>
          <li>Click the 'Share' icon</li>
          <li>Click 'Add to Home Screen'</li>
        </ol>
      </section>
    </div>
  </div>
);

export default Install;
