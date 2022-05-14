import { AREAS } from '../../shared/constants';
import style from './style.scss';

const OverallMap = ({ onClick }) => {
  const areaOnClick = (area) => () => {
    onClick(area);
  };

  const areaButtons = Object.values(AREAS).map((area) => {
    return (
      <div
        class={`${style[area.id]} ${style.area}`}
        onClick={areaOnClick(area.id)}>
        {area.name}
      </div>
    );
  });

  return <div class={style.map}>{areaButtons}</div>;
};

export default OverallMap;
