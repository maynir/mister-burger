import './Checkout.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'
import axios from 'axios';

function Checkout({ products, setSelectedPage, calcTotalPrice, loggedInEmail, setCartItems }) {

  const itemList = () => {
    return products.map(({ name, description, img, price }) => {
      return <div key={name} className='item-section'>
        <Item productName={name}
          productDesc={description}
          productImg={img}
          productPrice={price} />
      </div>
    })
  }

  const clearCart = async () => {
    setCartItems([]);
    await axios.delete('/cart');
  }

  const pay = async () => {
    const purchase = { items: products, email: loggedInEmail, price: calcTotalPrice() };
    try {
      await axios.post('/purchase', { purchase });
      await clearCart();
      setSelectedPage('store');
      alert("Thank you for ordering!");
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong...')
    }
  }

  return (
    <div className={classNames('Checkout')}>
      <button className='go-back' onClick={() => setSelectedPage('cart')}>Go back to cart</button>
      {itemList()}
      <span className='total-price'>{calcTotalPrice()}$</span>
      <button onClick={pay} className='pay'>Pay</button>
    </div>
  );
}

export default Checkout;
