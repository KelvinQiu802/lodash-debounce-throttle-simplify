import './App.css';
import React from 'react';
import Counter from './components/counter';
import Input from './components/Input';
import List from './components/List';

function App() {
  return (
    <div className='App'>
      <Counter />
      <hr />
      <Input />
      <hr />
      <List />
    </div>
  );
}

export default App;
