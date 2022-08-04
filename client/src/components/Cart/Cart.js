import './Cart.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Item from '../Item/Item'

function Cart({ cartItems }) {


  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await axios.get('/products');
  //     setProducts(res.data.products);
  //   }

  //   getProducts();
  // }, [])

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
      Cart:
      {itemList()}
      {/* {menuSection('main')}
      {menuSection('side')}
      {menuSection('drink')} */}
    </div>
  );
}

export default Cart;
