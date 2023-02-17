const ControlledInput = ({ value, onChange, ...props }) => {
  return (
    <input type='text' value={value} onInput={onChange} {...props}></input>
  );
};

export default ControlledInput;
