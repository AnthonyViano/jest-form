import './App.css';
import Form from './components/form/Form';
import NameInput from './components/textfields/NameInput/NameInput';
import { useState } from 'react';

function App() {

  const [content, setContent] = useState('');

  return (
      <div>
        <NameInput label={"Nom de famille"} content={content} setContent={setContent} />
      </div>
  );
}

export default App;