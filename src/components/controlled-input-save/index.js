import ControlledInput from '../controlled-input';

const ControlledInputWithSave = ({ value, onChange, onSave, disabled }) => {
  return (
    <div>
      <ControlledInput value={value} onChange={onChange} disabled={disabled} />
      <button onClick={onSave} disabled={disabled}>
        Save
      </button>
    </div>
  );
};

export default ControlledInputWithSave;
