import React from 'react';
import debounce from '../utils/debounce';

function Counter() {
  const [debounceCount, setDebounceCount] = React.useState(0);
  const [noramlCount, setNormalCount] = React.useState(0);

  const handleDebounceClick = React.useCallback(
    debounce(
      () => {
        setDebounceCount((prev) => prev + 1);
      },
      1000,
      { leading: true, trailing: false, maxWait: 500 }
    ),
    []
  );

  return (
    <div className='counter-group'>
      <div className='counter'>
        <button onClick={() => setNormalCount((prev) => prev + 1)}>
          Normal Click
        </button>
        <h1>{noramlCount}</h1>
      </div>
      <div className='counter'>
        <button onClick={handleDebounceClick}>Debounce Click (500ms)</button>
        <h1>{debounceCount}</h1>
      </div>
    </div>
  );
}

export default Counter;
