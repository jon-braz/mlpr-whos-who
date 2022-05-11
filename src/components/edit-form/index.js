import { useState } from 'preact/hooks';
import { AREAS } from '../../shared/constants';
import style from './style.scss';

const defaultFormState = {
  species: 'pig',
  area: 'front',
  dangerLevel: 'green'
};

const FormInput = ({ fieldName, formState, onInput, ...params }) => (
  <label class={style.inputPair} key={fieldName}>
    <span class={style.inputLabel}>{fieldName}</span>
    <input
      type='text'
      value={formState[fieldName]}
      onInput={onInput(fieldName)}
      {...params}
    />
  </label>
);

const FormSelect = ({ fieldName, formState, onChange, options }) => (
  <label class={style.inputPair} key={fieldName}>
    <span class={style.inputLabel}>{fieldName}</span>
    <select value={formState[fieldName]} onChange={onChange(fieldName)}>
      {options.map((option) => (
        <option value={option.id}>{option.label}</option>
      ))}
    </select>
  </label>
);

const areaOptions = Object.values(AREAS).map((area) => ({
  id: area.id,
  label: area.name
}));

const dangerLevelOptions = [
  { id: 'green', label: 'Green' },
  { id: 'orange', label: 'Orange' },
  { id: 'red', label: 'Red' }
];

const EditForm = ({ existingState, onSave, loading }) => {
  const [formState, setFormState] = useState(existingState || defaultFormState);

  const onInput = (fieldName) => (e) => {
    setFormState({ ...formState, [fieldName]: e.target.value });
  };

  const toggle = (fieldName) => () => {
    setFormState({ ...formState, [fieldName]: !formState[fieldName] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput fieldName={'name'} formState={formState} onInput={onInput} />
      <FormInput
        fieldName={'species'}
        formState={formState}
        onInput={onInput}
        value='pig'
      />
      <FormSelect
        fieldName={'area'}
        formState={formState}
        onChange={onInput}
        options={areaOptions}
      />
      <FormInput
        fieldName={'location'}
        formState={formState}
        onInput={onInput}
        placeholder='10,20'
      />
      <FormInput fieldName={'color'} formState={formState} onInput={onInput} />
      <FormSelect
        fieldName={'dangerLevel'}
        formState={formState}
        onChange={onInput}
        options={dangerLevelOptions}
      />
      <label class={style.inputPair} key='dominant'>
        <span class={style.inputLabel}>dominant</span>
        <input
          type='checkbox'
          checked={formState['dominant']}
          onClick={toggle('dominant')}
        />
      </label>
      <FormInput
        fieldName={'character'}
        formState={formState}
        onInput={onInput}
      />
      <FormInput fieldName={'food'} formState={formState} onInput={onInput} />
      <FormInput
        fieldName={'enrichment'}
        formState={formState}
        onInput={onInput}
      />
      <FormInput fieldName={'about'} formState={formState} onInput={onInput} />
      <button type='submit' disabled={loading}>
        Submit
      </button>
    </form>
  );
};

export default EditForm;
