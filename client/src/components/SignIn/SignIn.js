import './SignIn.scss';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const axios = require('axios');

const SignIn = ({ setSelectedPage }) => {
  const initialData = {
    email: '',
    password: '',
  };

  const initialValidation = {
    email: '',
    password: '',
  };

  const [data, setData] = useState(initialData);
  const [validation, setValidation] = useState(initialValidation);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSumbitEnabled(false);
    setLoader(true);
    try {
      await axios.post('/sign-in', data);
      setSelectedPage('login');
      Swal.fire('Signed in successfully', 'Please login to continue', 'info')
    } catch (err) {
      setSumbitEnabled(true);
      setLoader(false);
      if (err.status === 303) {
        Swal.fire('User with this email already exist', '', 'error')
      } else {
        alert('Sorry, something went wrong...');
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  const handleBlur = (e) => {
    if (e.target.name === 'email' && data.email !== '' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      setValidation({ ...validation, email: 'Not valid email format' });
    }
    //TODO: add validation for password

  }

  const handleFocus = (e) => {
    setValidation({ ...validation, [e.target.name]: '' })
  }

  useEffect(() => {
    setSumbitEnabled(!Object.values(data).some(val => val === '') && Object.values(validation).every((valid) => valid === ''));
  }, [validation, data]);

  return (
    <div className="SignIn" id="SignIn">

      <h1>Sign In:</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='email'
          placeholder='Your email'
          value={data.email}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.email && <div className="error">{validation.email}</div>}
        <input
          type='password'
          name='password'
          placeholder='Your Password'
          value={data.password}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        <div className="navigator-container">
          <button className="navigator" onClick={() => setSelectedPage('login')}>Login</button>
        </div>
        <button className="login-button" disabled={!sumbitEnabled} type='submit'>
          {showLoader && <i className="fa fa-spinner fa-spin"></i>}
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignIn;
