import { useLocale } from '../../context/local';
import { REGIONS } from '../../context/local/constants';
import './Local.css';

export default function Local() {
  const { state, dispatch } = useLocale();

  const handleRegionChange = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    const check = event.currentTarget.checked ? REGIONS.RU : REGIONS.EN;
    const action = {
      type: 'CHANGE_LOCALE',
      payload: {
        region: check,
      },
    };
    dispatch(action);
  };

  return (
    <div className="switch-wrapper">
      <p className="switch-text">{state.strings.en}</p>
      <label htmlFor="check" className="label">
        <div className="toggle">
          <input
            id="check"
            className="toggle-state"
            type="checkbox"
            name="check"
            value="check"
            onClick={(event) => handleRegionChange(event)}
          />
          <div className="indicator" />
        </div>
      </label>
      <p className="switch-text">{state.strings.ru}</p>
    </div>
  );
}
