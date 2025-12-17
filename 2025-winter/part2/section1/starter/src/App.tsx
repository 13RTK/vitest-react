import { useState } from 'react';
import './App.css';

function App() {
  const [content, setContent] = useState('Click me');
  const [classes, setClasses] = useState('btn');

  function onClick() {
    setContent('Active');
    setClasses('btn active');
  }

  return (
    <>
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    </>
  );
}

export default App;
