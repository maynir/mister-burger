import './Cart.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Item from '../Item/Item'

function Cart({ cartItems }) {

  const itemList = () => {
    return cartItems.map(product => {
      return <Item key={product.name}
        productName={product.name}
        productDesc={product.description}
        productImg={product.img} />
    });
  }

  return (
    <div className={classNames('Cart')}>
      <div className='cart-title'>Cart</div>
      {itemList()}
    </div>
  );
}

export default Cart;
