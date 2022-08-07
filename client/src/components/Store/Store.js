import './Store.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'

function Store({ products, addItemToCart }) {

  const menuSection = (type) => {
    return <div className='menu-section'>
      <div className='menu-section-title'>{type.toUpperCase()}</div>
      {itemList(type)}
    </div>
  }

  const itemList = (type) => {
    return Object.entries(products[type] || {}).map(([product, productInfo]) => {
      return <div key={product} className='item-section'>
        <Item productName={product}
          productDesc={productInfo.description}
          productImg={productInfo.img} />
        <button onClick={() => addItemToCart(product, productInfo.description, productInfo.img)}>Add to Cart</button>
      </div>
    });
  }

  return (
    <div className={classNames('Store')}>
      {menuSection('main')}
      {menuSection('side')}
      {menuSection('drink')}
    </div>
  );
}

export default Store;
