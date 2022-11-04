import React from 'react';
import debounce from '../utils/debounce';

function Input() {
  const [normalInput, setNormalInput] = React.useState('');
  const [debounceInput, setDebounceInput] = React.useState('');
  const [debounceResult, setDebounceResult] = React.useState('');

  const handleDebounceResult = debounce((e) => {
    setDebounceResult(e.target.value);
  }, 1000);

  return (
    <div className='input-group'>
      <div>
        <h3>Normal Input</h3>
        <input
          type='text'
          value={normalInput}
          onChange={(e) => setNormalInput(e.target.value)}
        />
        <p>{normalInput ? normalInput : '......'}</p>
      </div>
      <div>
        <h3>Debounce Input (500ms)</h3>
        <input
          type='text'
          value={debounceInput}
          onChange={(e) => {
            setDebounceInput(e.target.value);
            handleDebounceResult(e);
          }}
        />
        <p>{debounceResult ? debounceResult : '......'}</p>
      </div>
    </div>
  );
}

export default Input;
