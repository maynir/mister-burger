import './Login.scss';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
const axios = require('axios');

const Login = ({ setSelectedPage, setIsLoggedIn, setLoggedInEmail, setIsAdmin }) => {
  const initialData = {
    email: '',
    password: '',
    rememberMe: false
  };

  const buttonRef = useRef();
  const [data, setData] = useState(initialData);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setLoader] = useState(false);

  useEffect(() => {
    buttonRef.current.focus();
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSumbitEnabled(false);
    setLoader(true);
    try {
      await axios.post('/login', data);
      setSelectedPage('store');
      setIsLoggedIn(true);
      if (data.email === 'admin') setIsAdmin(true);
      setLoggedInEmail(data.email);
      Swal.fire(`Welcome ${ data.email }!`)
    } catch (err) {
      setSumbitEnabled(true);
      setLoader(false);
      Swal.fire('Wrong email or password...', '', 'error');
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    setSumbitEnabled(!Object.values(data).some(val => val === ''));
  }, [data]);

  return (
    <div className="Login" id="Login">
      {showAlert && <div className="alert"  >
        <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
        An email just sent to me! Thank you for filling the form.
      </div>}

      <h1>Login:</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='email'
          placeholder='Your email'
          value={data.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          type='password'
          name='password'
          placeholder='Your Password'
          value={data.password}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className='remember-me'>
          <label>Remember Me:</label>
          <input
            type='checkbox'
            name='rememberMe'
            value={data.rememberMe}
            onChange={handleChange}
          />
        </div>
        <div className="navigator-container">
          <button className="navigator" onClick={() => setSelectedPage('signIn')}>Sign In</button>
        </div>
        <button ref={buttonRef} className="login-button" disabled={!sumbitEnabled} type='submit'>
          {showLoader && <i className="fa fa-spinner fa-spin"></i>}
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
