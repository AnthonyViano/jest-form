import React, { useState } from 'react';

const Form = () => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [ville, setVille] = useState('');
  const [codePostal, setCodePostal] = useState('');

  const [nomError, setNomError] = useState('');
  const [prenomError, setPrenomError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [dateNaissanceError, setDateNaissanceError] = useState('');
  const [villeError, setVilleError] = useState('');
  const [codePostalError, setCodePostalError] = useState('');

  const [isFormValid, setIsFormValid] = useState(false);

  const handleNomChange = (e) => {
    const newNom = e.target.value;

    const isValidNom = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newNom);

    setNom(newNom);

    if (!isValidNom) {
        setNomError('Nom de famille non valide');
    } else {
        setNomError('');
    }

    let data = {nom: e.target.value, prenom, email, dateNaissance, ville, codePostal};

    validateForm(data);
  };

  const handlePrenomChange = (e) => {
    const newPrenom = e.target.value;

    const isValidPrenom = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newPrenom);

    setPrenom(newPrenom);

    if (!isValidPrenom) {
        setPrenomError('Prénom non valide');
    } else {
        setPrenomError('');
    }

    let data = {nom, prenom: e.target.value, email, dateNaissance, ville, codePostal};

    validateForm(data);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    // Vérification de l'adresse e-mail avec une expression régulière simple
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);

    setEmail(newEmail);

    if (!isValidEmail) {
      setEmailError('Adresse e-mail non valide');
    } else {
      setEmailError('');
    }

    let data = {nom, prenom, email: newEmail, dateNaissance, ville, codePostal};

    validateForm(data);
  };

  const handleDateNaissanceChange = (e) => {
    const newDateNaissance = e.target.value;
    // Vérification de l'âge (supérieur à 18 ans)
    const today = new Date();
    const birthDate = new Date(newDateNaissance);
    const age = today.getFullYear() - birthDate.getFullYear();

    setDateNaissance(newDateNaissance);

    if (age < 18) {
      setDateNaissanceError('L\'âge doit être supérieur à 18 ans');
    } else {
      setDateNaissanceError('');
    }

    let data = {nom, prenom, email, dateNaissance: newDateNaissance, ville, codePostal};

    validateForm(data);
  };

  const handleVilleChange = (e) => {
    const newVille = e.target.value;

    const isValidVille = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(newVille);

    setVille(newVille);

    if (!isValidVille) {
        setVilleError('Ville non valide');
    } else {
        setVilleError('');
    }

    let data = {nom, prenom, email, dateNaissance, ville: e.target.value, codePostal};

    validateForm(data);
  };

  const handleCodePostalChange = (e) => {
    const newCodePostal = e.target.value;
    // Vérification du format du code postal (pour la France)
    const isValidCodePostal = /^\d{5}$/.test(newCodePostal) && newCodePostal.length === 5;

    setCodePostal(newCodePostal);

    if (!isValidCodePostal) {
      setCodePostalError('Format de code postal invalide (France : XXXXX)');
    } else {
      setCodePostalError('');
    }

    let data = {nom, prenom, email, dateNaissance, ville, codePostal: newCodePostal};

    validateForm(data);
  };

  const validateForm = (data) => {
    let {nom, prenom, email, dateNaissance, ville, codePostal} = data;
    // Vérifiez tous les champs ici
    const isValidNom = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(nom);
    const isPrenomValid = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(prenom);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const today = new Date();
    const birthDate = new Date(dateNaissance);
    const age = today.getFullYear() - birthDate.getFullYear();
    const isDateValid = age >= 18;
    const isValidVille = /^[a-zA-ZÀ-ÖØ-öø-ÿ-]+$/.test(ville);
    const isCodePostalValid = /^\d{5}$/.test(codePostal) && codePostal.length === 5;
  
    // Mettez à jour les états d'erreur
    setNomError(isValidNom ? '' : 'Nom de famille non valide');
    setPrenomError(isPrenomValid ? '' : 'Prénom non valide');
    setEmailError(isEmailValid ? '' : 'Adresse e-mail non valide');
    setDateNaissanceError(isDateValid ? '' : 'L\'âge doit être supérieur à 18 ans');
    setVilleError(isValidVille ? '' : 'Ville non valide');
    setCodePostalError(isCodePostalValid ? '' : 'Format de code postal invalide (France : XXXXX)');
  
    // Vérifiez si tous les champs sont valides
    const formIsValid =
      isEmailValid && isDateValid && isCodePostalValid && isValidNom && isPrenomValid && isValidVille;
  
    setIsFormValid(formIsValid);
  
    return formIsValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = {nom, prenom, email, dateNaissance, ville, codePostal};
  
    // Validez le formulaire avant de soumettre
    const formIsValid = validateForm(data);

    // Si le formulaire n'est pas valide, ne soumettez pas les données
    if (!formIsValid) {
      console.error('Le formulaire contient des erreurs');
      return;
    }
    else {

      window.localStorage.setItem('Nom:', nom);
      window.localStorage.setItem('Prénom:', prenom);
      window.localStorage.setItem('Adresse e-mail:', email);
      window.localStorage.setItem('Date de naissance:', dateNaissance);
      window.localStorage.setItem('Ville:', ville);
      window.localStorage.setItem('Code postal:', codePostal);

      setNom('');
      setPrenom('');
      setEmail('');
      setDateNaissance('');
      setVille('');
      setCodePostal('');
      setIsFormValid(false);

      window.alert('Le formulaire a été soumis avec succès');
    }

  };

  return (
    <form data-testid="form" onSubmit={handleSubmit}>
      <div>
        <label>Nom: </label>
        <input data-testid="lastname" type="text" value={nom} onChange={handleNomChange} />
        {nomError && <span data-testid="lastname-error" style={{ color: 'red' }}>{nomError}</span>}
      </div>
      <div>
        <label>Prénom: </label>
        <input data-testid="firstname" type="text" value={prenom} onChange={handlePrenomChange} />
        {prenomError && <span data-testid="firstname-error" style={{ color: 'red' }}>{prenomError}</span>}
      </div>
      <div>
        <label>Adresse e-mail: </label>
        <input data-testid="email" type="text" value={email} onChange={handleEmailChange} />
        {emailError && <span data-testid="email-error" style={{ color: 'red' }}>{emailError}</span>}
      </div>
      <div>
        <label>Date de naissance: </label>
        <input data-testid="birthdate" type="date" value={dateNaissance} onChange={handleDateNaissanceChange} />
        {dateNaissanceError && <span data-testid="birthdate-error" style={{ color: 'red' }}>{dateNaissanceError}</span>}
      </div>
      <div>
        <label>Ville: </label>
        <input data-testid="city" type="text" value={ville} onChange={handleVilleChange} />
        {villeError && <span data-testid="city-error" style={{ color: 'red' }}>{villeError}</span>}
      </div>
      <div>
        <label>Code postal: </label>
        <input data-testid="zipcode" type="number" value={codePostal} onChange={handleCodePostalChange} />
        {codePostalError && <span data-testid="zipcode-error" style={{ color: 'red' }}>{codePostalError}</span>}
      </div>
      <button data-testid="submit" type="submit" style={{ color: isFormValid ? 'green' : 'red' }} disabled={!isFormValid}>
        Soumettre
      </button>
    </form>
  );
};

export default Form;
