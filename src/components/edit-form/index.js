import { useState } from 'preact/hooks';
import { readFiles } from '../../shared/image-preprocessor';
import AreaMap from '../area-map';
import OverallMap from '../map';
import Modal from '../modal';
import style from './style.scss';

const defaultFormState = {
  species: 'pig',
  dangerLevel: 'green'
};

const formLabels = {
  name: 'Name',
  species: 'Species',
  area: 'Area',
  dangerLevel: 'Danger Level',
  dangerReason: 'Why?',
  food: 'Food',
  enrichment: 'Enrichment',
  dominant: 'Dominant',
  character: 'Character',
  howToIdentify: 'How to Identify',
  about: 'About',
  imagePath: 'Image'
};

const FormInput = ({ fieldName, formState, onInput, className, ...params }) => (
  <label class={`${style.inputPair} ${className || null}`} key={fieldName}>
    <span class={style.inputLabel}>{formLabels[fieldName] || fieldName}</span>
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
    <span class={style.inputLabel}>{formLabels[fieldName] || fieldName}</span>
    <select value={formState[fieldName]} onChange={onChange(fieldName)}>
      {options.map((option) => (
        <option value={option.id}>{option.label}</option>
      ))}
    </select>
  </label>
);

const dangerLevelOptions = [
  { id: 'green', label: 'Green' },
  { id: 'orange', label: 'Orange' },
  { id: 'red', label: 'Red' }
];

const EditForm = ({ existingState, onSave, loading }) => {
  const [formState, setFormState] = useState(existingState || defaultFormState);
  const [showMap, setShowMap] = useState(false);
  const [showArea, setShowArea] = useState(null);

  const onInput = (fieldName) => (e) => {
    setFormState({ ...formState, [fieldName]: e.target.value });
  };

  const onImageInput = (fieldName) => async (e) => {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      alert('The File APIs are not fully supported in this browser.');
      return false;
    }

    const files = Array.from(e.target.files);

    const compressedImages = await readFiles(files, 500, 500);

    setFormState({
      ...formState,
      [fieldName]: files.map((file) => file.name),
      imageUpdated: true,
      imageDataUrl: compressedImages[0],
      imageName: files.map((file) => file.name)
    });
  };

  const toggle = (fieldName) => () => {
    setFormState({ ...formState, [fieldName]: !formState[fieldName] });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  const showAreaMap = (area) => {
    setShowArea(area);
    setShowMap(false);
  };

  const changeLocation = (event) => {
    event.preventDefault();
    setShowMap(true);
  };

  const setLocation = (position) => {
    setFormState({ ...formState, area: showArea, location: position });
    setShowArea(null);
  };

  const setPairedLocation = (animal) => {
    setLocation(animal.location);
  };

  const closeModal = () => {
    setShowArea(null);
    setShowMap(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <FormInput fieldName={'name'} formState={formState} onInput={onInput} />
      <FormInput
        fieldName={'species'}
        formState={formState}
        onInput={onInput}
      />
      <label class={style.inputPair} key={'area'}>
        <span class={style.inputLabel}>{formLabels['area']}</span>
        <button type='button' class={style.button} onClick={changeLocation}>
          {formState.area
            ? `${formState.area} (${formState.location?.join(', ')})`
            : 'Select Area'}
        </button>
      </label>
      <FormSelect
        fieldName={'dangerLevel'}
        formState={formState}
        onChange={onInput}
        options={dangerLevelOptions}
      />
      {(formState.dangerLevel === 'orange' ||
        formState.dangerLevel === 'red') && (
        <FormInput
          fieldName='dangerReason'
          formState={formState}
          onInput={onInput}
          required
          className={
            formState.dangerLevel === 'red'
              ? style.dangerRed
              : style.dangerOrange
          }
        />
      )}
      <label class={style.inputPair} key='dominant'>
        <span class={style.inputLabel}>{formLabels['dominant']}</span>
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
      <FormInput
        fieldName={'howToIdentify'}
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
      <label class={`${style.inputPair}`} key={'imagePath'}>
        <span class={style.inputLabel}>
          {formLabels['imagePath'] || 'imagePath'}
        </span>
        <span class={style.button}>{formState.imageName || 'Choose File'}</span>
        <input
          value={formState['imagePath']}
          onInput={onImageInput('imagePath')}
          type='file'
          accept='image/*;capture-camera'
          style='display: none'
        />
      </label>
      {(formState.imageDataUrl || formState.imagePath) && (
        <div class={style.inputPair}>
          <span class={style.inputLabel}></span>
          <img
            src={formState.imageDataUrl || formState.imagePath}
            class={style.imagePreview}
          />
        </div>
      )}
      <button
        type='submit'
        disabled={loading}
        class={`${style.button} ${style.submitBtn}`}>
        Save
      </button>
      {showMap && (
        <Modal dismiss={closeModal}>
          <OverallMap onClick={showAreaMap} />
        </Modal>
      )}
      {showArea && (
        <Modal dismiss={closeModal}>
          <AreaMap
            area={showArea}
            showAnimals={true}
            onClick={setLocation}
            animalOnClick={setPairedLocation}></AreaMap>
        </Modal>
      )}
    </form>
  );
};

export default EditForm;
