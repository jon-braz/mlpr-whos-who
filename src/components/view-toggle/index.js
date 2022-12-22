import MapIcon from 'mdi-preact/MapIcon';
import ListIcon from 'mdi-preact/FormatListBulletedIcon';
import { VIEW_MODES } from '../../shared/constants';
import FAB from '../fab';
import style from './style.scss';

const ViewToggle = ({ setView, mapView, ...props }) => {
  const viewMap = () => setView(VIEW_MODES.map);
  const viewList = () => setView(VIEW_MODES.list);

  return (
    <FAB {...props}>
      <button
        onClick={viewMap}
        class={`${style.iconButton} ${mapView ? style.active : ''}`}>
        <MapIcon></MapIcon>
      </button>
      <button
        onClick={viewList}
        class={`${style.iconButton} ${mapView ? '' : style.active}`}>
        <ListIcon></ListIcon>
      </button>
    </FAB>
  );
};

export default ViewToggle;
