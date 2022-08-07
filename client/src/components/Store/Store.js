import './Store.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'
import Search from '../Search/Search';

function Store({ products, addItemToCart, filteredProducts, setFilteredProducts }) {

  const menuSection = (type) => {
    return <div className='menu-section'>
      <div className='menu-section-title'>{type.toUpperCase()}</div>
      {itemList(type)}
    </div>
  }

  const itemList = (type) => {
    return Object.entries(filteredProducts[type] || {}).map(([product, productInfo]) => {
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
      <Search originalList={products}
        setFilteredList={setFilteredProducts} />
      {filteredProducts && menuSection('main')}
      {filteredProducts && menuSection('side')}
      {filteredProducts && menuSection('drink')}
    </div>
  );
}

export default Store;
