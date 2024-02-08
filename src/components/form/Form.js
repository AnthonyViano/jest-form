import React, { useState } from 'react';


const Form = () => {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  const [lastnameError, setLastnameError] = useState('');
  const [firstnameError, setFirstnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [cityError, setCityError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleLastnameChange = (e) => {
    const newLastname = e.target.value;

    const isValidLastname = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newLastname);

    setLastname(newLastname);

    if (!isValidLastname) {
        setLastnameError('Nom de famille non valide');
    } else {
        setLastnameError('');
    }

    let data = {lastname: e.target.value, firstname, email, birthdate, city, zipcode};

    validateForm(data);
  };

  const handleFirstnameChange = (e) => {
    const newFirstname = e.target.value;

    const isValidFirstname = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newFirstname);

    setFirstname(newFirstname);

    if (!isValidFirstname) {
        setFirstnameError('Prénom non valide');
    } else {
        setFirstnameError('');
    }

    let data = {lastname, firstname: e.target.value, email, birthdate, city, zipcode};

    validateForm(data);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    // Checking e-mail address with a simple regular expression
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

    setEmail(newEmail);

    if (!isValidEmail) {
      setEmailError('Adresse e-mail non valide');
    } else {
      setEmailError('');
    }

    let data = {lastname, firstname, email: newEmail, birthdate, city, zipcode};

    validateForm(data);
  };

  const handleBirthdateChange = (e) => {
    const newBirthdate = e.target.value;
    // Age verification (over 18)
    const today = new Date();
    const birthDate = new Date(newBirthdate);
    const age = today.getFullYear() - birthDate.getFullYear();

    setBirthdate(newBirthdate);

    if (age < 18) {
      setBirthdateError('L\'âge doit être supérieur à 18 ans');
    } else {
      setBirthdateError('');
    }

    let data = {lastname, firstname, email, birthdate: newBirthdate, city, zipcode};

    validateForm(data);
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;

    const isValidCity = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newCity);

    setCity(newCity);

    if (!isValidCity) {
        setCityError('Ville non valide');
    } else {
        setCityError('');
    }

    let data = {lastname, firstname, email, birthdate, city: e.target.value, zipcode};

    validateForm(data);
  };

  const handleZipcodeChange = (e) => {
    const newZipcode = e.target.value;
    // Check zip code format (for France)
    const isValidZipcode = /^\d{5}$/.test(newZipcode) && newZipcode.length === 5;

    setZipcode(newZipcode);

    if (!isValidZipcode) {
      setZipcodeError('Format de code postal invalide (France : XXXXX)');
    } else {
      setZipcodeError('');
    }

    let data = {lastname, firstname, email, birthdate, city, zipcode: newZipcode};

    validateForm(data);
  };

  const validateForm = (data) => {
    let {lastname, firstname, email, birthdate, city, zipcode} = data;
    // Check all fields here
    const isValidLastname = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(lastname);
    const isFirstnameValid = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(firstname);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const today = new Date();
    const birthDate = new Date(birthdate);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isBirthdateValid = age >= 18;
    const isValidCity = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(city);
    const isZipcodeValid = /^\d{5}$/.test(zipcode) && zipcode.length === 5;
  
    // Update error status
    // setLastnameError(isValidLastname ? '' : 'Nom de famille non valide');
    // setFirstnameError(isFirstnameValid ? '' : 'Prénom non valide');
    // setEmailError(isEmailValid ? '' : 'Adresse e-mail non valide');
    setBirthdateError(isBirthdateValid ? '' : 'L\'âge doit être supérieur à 18 ans');
    // setCityError(isValidCity ? '' : 'Ville non valide');
    // setZipcodeError(isZipcodeValid ? '' : 'Format de code postal invalide (France : XXXXX)');
  
    // Check that all fields are valid
    const formIsValid =
      isEmailValid && isBirthdateValid && isZipcodeValid && isValidLastname && isFirstnameValid && isValidCity;
  
    setIsFormValid(formIsValid);
  
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {lastname, firstname, email, birthdate, city, zipcode};
  
    // Validate the form before submitting
    const formIsValid = validateForm(data);

    // If form is invalid, do not submit data

    window.localStorage.setItem('Lastname:', lastname);
    window.localStorage.setItem('Firstname:', firstname);
    window.localStorage.setItem('Email:', email);
    window.localStorage.setItem('Birthdate:', birthdate);
    window.localStorage.setItem('City:', city);
    window.localStorage.setItem('Zipcode:', zipcode);
    window.localStorage.setItem('Form status:', 'Le formulaire a été soumis avec succès');

    setLastname('');
    setFirstname('');
    setEmail('');
    setBirthdate('');
    setCity('');
    setZipcode('');
    setIsFormValid(false);

    window.alert('Le formulaire a été soumis avec succès');


  };

  return (
    <form data-testid="form" onSubmit={handleSubmit}>
      <div>
        <label>Lastname: </label>
        <input data-testid="lastname" type="text" value={lastname} onChange={handleLastnameChange} />
        {lastnameError && <span data-testid="lastname-error" style={{ color: 'red' }}>{lastnameError}</span>}
      </div>
      <div>
        <label>Prénom: </label>
        <input data-testid="firstname" type="text" value={firstname} onChange={handleFirstnameChange} />
        {firstnameError && <span data-testid="firstname-error" style={{ color: 'red' }}>{firstnameError}</span>}
      </div>
      <div>
        <label>Adresse e-mail: </label>
        <input data-testid="email" type="text" value={email} onChange={handleEmailChange} />
        {emailError && <span data-testid="email-error" style={{ color: 'red' }}>{emailError}</span>}
      </div>
      <div>
        <label>Date de naissance: </label>
        <input data-testid="birthdate" type="date" value={birthdate} onChange={handleBirthdateChange} />
        {birthdateError && <span data-testid="birthdate-error" style={{ color: 'red' }}>{birthdateError}</span>}
      </div>
      <div>
        <label>Ville: </label>
        <input data-testid="city" type="text" value={city} onChange={handleCityChange} />
        {cityError && <span data-testid="city-error" style={{ color: 'red' }}>{cityError}</span>}
      </div>
      <div>
        <label>Code postal: </label>
        <input data-testid="zipcode" type="number" value={zipcode} onChange={handleZipcodeChange} />
        {zipcodeError && <span data-testid="zipcode-error" style={{ color: 'red' }}>{zipcodeError}</span>}
      </div>
      <button data-testid="submit" type="submit" style={{ color: isFormValid ? 'green' : 'red' }} disabled={!isFormValid}>
        Soumettre
      </button>
    </form>
  );
};

export default Form;
