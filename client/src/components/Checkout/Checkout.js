import './Checkout.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'

function Checkout({ products, setSelectedPage, calcTotalPrice }) {

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

  return (
    <div className={classNames('Checkout')}>
      <button className='go-back' onClick={() => setSelectedPage('cart')}>Go back to cart</button>
      {itemList()}
      <span className='total-price'>{calcTotalPrice()}$</span>
      <button className='pay'>Pay</button>
    </div>
  );
}

export default Checkout;
