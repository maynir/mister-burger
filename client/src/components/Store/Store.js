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

  const searchFunction = (searchPhrase) => {
    const newFilteredList = JSON.parse(JSON.stringify(products));
    Object.entries(products).forEach(([type, productsType]) => {
      Object.entries(productsType).forEach(([productName, { description }]) => {
        if (!productName.includes(searchPhrase) && !description.includes(searchPhrase)) delete newFilteredList[type][productName];
      })
    });
    return newFilteredList;
  }

  const itemList = (type) => {
    return Object.entries(filteredProducts[type] || {}).map(([product, productInfo]) => {
      return <div key={product} className='item-section'>
        <Item productName={product}
          productDesc={productInfo.description}
          productImg={productInfo.img}
          productPrice={productInfo.price} />
        <button onClick={() => addItemToCart(product, productInfo.description, productInfo.img, productInfo.price)}>Add to Cart</button>
      </div>
    });
  }

  return (
    <div className={classNames('Store')}>
      <Search originalList={products}
        setFilteredList={setFilteredProducts}
        filterFunction={searchFunction}
        searchPlaceholder='Search by product name/description' />
      {filteredProducts && menuSection('main')}
      {filteredProducts && menuSection('side')}
      {filteredProducts && menuSection('drink')}
    </div>
  );
}

export default Store;
