import './ContactUs.scss';
import { useState, useEffect } from 'react';
import { send } from '@emailjs/browser'
import Swal from 'sweetalert2';

const ContactUs = () => {
  const initialToSend = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  };

  const initialValidation = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    message: '',
  };

  const [toSend, setToSend] = useState(initialToSend);
  const [validation, setValidation] = useState(initialValidation);
  const [sumbitEnabled, setSumbitEnabled] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSumbitEnabled(false);
    setLoader(true);
    send(
      'service_6vfmncl',
      'template_mq3ipzq',
      toSend,
      'user_O5llRtB6936quwnSxnYFh'
    )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setToSend(initialToSend);
        setSumbitEnabled(true);
        Swal.fire('An email just sent to us!', 'Thank you for filling the form.', 'success');
        setLoader(false);
      })
      .catch((err) => {
        console.log('FAILED...', err);
      });
  };

  const handleChange = (e) => {
    setToSend({ ...toSend, [e.target.name]: e.target.value })
  };

  const handleBlur = (e) => {
    if (toSend[e.target.name] === '') {
      setValidation({ ...validation, [e.target.name]: 'Field cannot be empty' })
    }
    if (e.target.name === 'email' && toSend.email !== '' && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(toSend.email)) {
      setValidation({ ...validation, email: 'Not valid email format' });
    }
    if (e.target.name === 'phone' && toSend.phone !== '' && !/^((0)|(\+972))5[0-9]{8}$/.test(toSend.phone)) {
      setValidation({ ...validation, phone: 'Not valid phone number format' });
    }
  }

  const handleFocus = (e) => {
    setValidation({ ...validation, [e.target.name]: '' })
  }

  useEffect(() => {
    setSumbitEnabled(!Object.values(toSend).some(val => val === '') && Object.values(validation).every((valid) => valid === ''));
  }, [validation, toSend]);

  return (
    <div className="ContactUs" id="ContactUs">

      <h1>CONTACT US!</h1>
      <h4>We would love to hear from you :)</h4>
      <h5>An email will  be sent back to you after submit.</h5>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          value={toSend.first_name}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.first_name && <div className="error">{validation.first_name}</div>}
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={toSend.last_name}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.last_name && <div className="error">{validation.last_name}</div>}
        <input
          type='text'
          name='email'
          placeholder='Your email'
          value={toSend.email}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.email && <div className="error">{validation.email}</div>}
        <input
          type='text'
          name='phone'
          placeholder='Your Phone Number'
          value={toSend.phone}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.phone && <div className="error">{validation.phone}</div>}
        <textarea
          type='text'
          name='message'
          placeholder='Your message'
          value={toSend.message}
          onChange={handleChange}
          autoComplete="off"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
        {validation.message && <div className="error">{validation.message}</div>}

        <button disabled={!sumbitEnabled} type='submit'>
          {showLoader && <i className="fa fa-spinner fa-spin"></i>}
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
