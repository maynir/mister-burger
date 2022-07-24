import './Login.scss';
import { useState, useEffect } from 'react';

const Login = ({setSelectedPage}) => {
    const initialData = {
      email: '',
      password: '',
    };

  const [data, setData] = useState(initialData);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSumbitEnabled(false);
    setLoader(true);
    // send(
    //   'service_6vfmncl',
    //   'template_qafpzpk',
    //   toSend,
    //   'user_O5llRtB6936quwnSxnYFh'
    // )
    //   .then((response) => {
    //     console.log('SUCCESS!', response.status, response.text);
    //     setToSend(initialToSend);
    //     setSumbitEnabled(true);
    //     setShowAlert(true);
    //     setLoader(false);

    //     setTimeout(() => {
    //       setShowAlert(false);
    //     }, 10000);
    //   })
    //   .catch((err) => {
    //     console.log('FAILED...', err);
    //   });
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
          value={data.phone}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className="navigator-container">
          <button className="navigator" onClick={() => setSelectedPage('signIn')}>Sign In</button>
        </div>
        <button className="login-button" disabled={!sumbitEnabled} type='submit'>
          {showLoader && <i className="fa fa-spinner fa-spin"></i>}
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
