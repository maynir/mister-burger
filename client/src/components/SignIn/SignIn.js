import './SignIn.scss';
import { useState, useEffect } from 'react';

const SignIn = ({ SignInRef }) => {
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
    <div className="SignIn" id="SignIn" ref={SignInRef}>
      {showAlert && <div className="alert"  >
        <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
        An email just sent to me! Thank you for filling the form.
      </div>}

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
          value={data.phone}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />

        <button disabled={!sumbitEnabled} type='submit'>
          {showLoader && <i className="fa fa-spinner fa-spin"></i>}
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignIn;
