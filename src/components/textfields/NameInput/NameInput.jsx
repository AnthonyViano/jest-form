import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function NameInput({ label, content, setContent }) {

  const [error, setError] = useState(false);
  const validEmail = new RegExp('/^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/');

  const handleNameChange = (e) => {

};

return (
  <div>
    <TextField
      // error
      id="outlined-error-helper-text"
      label={label}
      helperText={""}
      placeholder={"Entrer votre " + label}
      onChange={handleNameChange}
    />
  </div>
);

}

export default NameInput;