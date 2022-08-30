import './Cart.scss';
import React from 'react';
import classNames from 'classnames';
import SelectableItem from '../SelectableItem/SelectableItem';

function Cart({ cartItems, removeItemFromCart, calcTotalPrice, toggleItemFromCheckout, setSelectedPage }) {

  const itemList = () => {
    return cartItems.map(product => {
      return <div key={product.name} className='item-section'>
        <SelectableItem productName={product.name}
          productDesc={product.description}
          productImg={product.img}
          productPrice={product.price}
          isSelected={product.isSelected}
          itemNotAvailable={product.itemNotAvailable}
          toggleItemFromCheckout={toggleItemFromCheckout} />
        <button onClick={() => removeItemFromCart(product.name)}>Remove From Cart</button>
      </div>
    });
  }

  const showPrice = () => {
    return <div className='price-section'>
      <span className='label'>Total price:</span>
      <span className='price'>{calcTotalPrice()}$</span>
    </div>
  }

  const showSelectItemsMsg = () => {
    return <span className='info-text'>
      Please select items to checkout
    </span>
  }

  return (
    <div className={classNames('Cart')}>
      {calcTotalPrice() === 0 ? showSelectItemsMsg() : showPrice()}
      {itemList()}
      {calcTotalPrice() !== 0 && <button className='checkout' onClick={() => setSelectedPage('checkout')}>Checkout</button>}
    </div>
  );
}

export default Cart;
