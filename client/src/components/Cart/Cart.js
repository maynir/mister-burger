import './Cart.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'

function Cart({ cartItems, removeItemFromCart }) {

  const itemList = () => {
    return cartItems.map(product => {
      return <div key={product.name} className='item-section'>
        <Item productName={product.name}
          productDesc={product.description}
          productImg={product.img} />
        <button onClick={() => removeItemFromCart(product.name)}>Remove From Cart</button>
      </div>
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
