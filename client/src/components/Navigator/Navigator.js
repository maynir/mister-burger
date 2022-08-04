import './Navigator.scss';
import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
const axios = require('axios');

const Navigator = ({ headerRef, isLoggedIn, setSelectedPage, isAdmin, setIsLoggedIn, setLoggedInEmail }) => {
  const jumpTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const changePage = (page) => {
    setSelectedPage(page);
  }

  const logOut = async () => {
    try {
      await axios.post('/log-out');
      setIsLoggedIn(false);
      setLoggedInEmail(null);
      alert('Logged out successfuly');
    } catch (err) {
      alert('Couldnt log out...')
    }
  }

  return (
    <div className={classNames('Navigator', 'sticky')}>
      <button className="tab" onClick={() => changePage('store')}>Store</button>
      {isLoggedIn && <button className="tab" onClick={() => changePage('gallery')}>Gallery</button>}
      {isLoggedIn && <button className="tab" onClick={() => changePage('calories')}>Calories</button>}
      {isLoggedIn && <button className="tab" onClick={() => changePage('lottery')}>Lottery</button>}
      {isLoggedIn && <button className="tab" onClick={() => changePage('contactUs')}>Contact Us</button>}
      <button className="tab" onClick={() => changePage('readme')}>Readme</button>
      {isAdmin && <button className="tab" onClick={() => changePage('admin')}>Admin</button>}
      {isLoggedIn && <button className="tab" onClick={() => changePage('cart')}>Check Out</button>}
      {!isLoggedIn && <button className="tab" onClick={() => changePage('signIn')}>Sign In</button>}
      {!isLoggedIn && <button className="tab" onClick={() => changePage('login')}>Log In</button>}
      {isLoggedIn && <button className="tab" onClick={() => logOut()}>Log Out</button>}
      <button className="up" onClick={() => jumpTo(headerRef)}>UP</button>
    </div>
  );
}

export default Navigator;
