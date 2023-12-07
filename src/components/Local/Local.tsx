import './Local.css';

export default function Local() {
  return (
    <label htmlFor="check" className="label">
      <div className="toggle">
        <input
          id="check"
          className="toggle-state"
          type="checkbox"
          name="check"
          value="check"
        />
        <div className="indicator" />
      </div>
    </label>
  );
}
