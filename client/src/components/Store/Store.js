import './Store.scss';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import axios from 'axios';
import Item from '../Item/Item'

function Store({ setCartItems }) {

  const [products, setProducts] = useState({});

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/products');
      setProducts(res.data.products);
    }

    getProducts();
  }, [])

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
        <button>Add to Cart</button>
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
