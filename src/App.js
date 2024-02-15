import './App.css';
import React, { useState } from 'react';
import Form from './components/Form/index';

function App() {

  const [content , setContent] = useState('');

  return (
      <div>
        <Form content={content} setContent={setContent} />
      </div>
  );
}

export default App;