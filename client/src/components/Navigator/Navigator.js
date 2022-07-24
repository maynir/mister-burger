import './Navigator.scss';
import React, { useRef } from 'react';
import classNames from 'classnames';

const Navigator = ({ headerRef, isLogIn, setSelectedPage }) => {
  const jumpTo = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  const changePage = (page) => {
    setSelectedPage(page);
  }

  return (
    <div className={classNames('Navigator', 'sticky')}>
      <button className="tab" onClick={() => changePage('store')}>Store</button>
      <button className="tab" onClick={() => changePage('gallery')}>Gallery</button>
      <button className="tab" onClick={() => changePage('calories')}>Calories</button>
      <button className="tab" onClick={() => changePage('lottery')}>Lottery</button>
      <button className="tab" onClick={() => changePage('contactUs')}>Contact Us</button>
      <button className="tab" onClick={() => changePage('admin')}>Admin</button>
      <button className="tab" onClick={() => changePage('checkOut')}>Check Out</button>
      <button className="tab" onClick={() => changePage('signIn')}>Sign In</button>
      <button className="tab" onClick={() => changePage('logIn')}>Log In</button>
      <button className="tab" onClick={() => changePage('logOut')}>Log Out</button>
      <button className="up" onClick={() => jumpTo(headerRef)}>UP</button>
    </div>
  );
}

export default Navigator;
