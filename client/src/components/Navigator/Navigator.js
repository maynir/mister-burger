import './Navigator.scss';
import React from 'react';
import classNames from 'classnames';
const axios = require('axios');

const Navigator = ({ headerRef, isLoggedIn, setSelectedPage, isAdmin, setIsLoggedIn, setLoggedInEmail, numItemsInCart, selectedPage, loggedInEmail }) => {
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
      setSelectedPage('store');
      alert('Logged out successfuly');
    } catch (err) {
      alert('Couldnt log out...')
    }
  }

  return (
    <div className={classNames('Navigator', 'sticky')}>
      <button className={classNames("tab", { selected: selectedPage === 'store' })} onClick={() => changePage('store')}>Store</button>
      {isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'ourlifestyle' })} onClick={() => changePage('ourlifestyle')}>Our Lifestyle</button>}
      {isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'calories' })} onClick={() => changePage('calories')}>Calories</button>}
      {isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'lottery' })} onClick={() => changePage('lottery')}>Lottery</button>}
      {isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'contactus' })} onClick={() => changePage('contactus')}>Contact Us</button>}
      <button className={classNames("tab", { selected: selectedPage === 'readme' })} onClick={() => changePage('readme')}>Readme</button>
      {isAdmin && <button className={classNames("tab", { selected: selectedPage === 'admin' })} onClick={() => changePage('admin')}>Admin</button>}
      {isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'cart' })} onClick={() => changePage('cart')}>Cart ({numItemsInCart})</button>}
      {!isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'signIn' })} onClick={() => changePage('signIn')}>Sign In</button>}
      {!isLoggedIn && <button className={classNames("tab", { selected: selectedPage === 'login' })} onClick={() => changePage('login')}>Log In</button>}
      {isLoggedIn && <button className='tab' onClick={() => logOut()}>Log Out</button>}
      <button className='tab' disabled={true}>Hello {loggedInEmail}</button>
      <button className="up" onClick={() => jumpTo(headerRef)}>UP</button>
    </div>
  );
}

export default Navigator;
