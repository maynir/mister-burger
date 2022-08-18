import './Admin.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item'

function Admin({ isAdmin, activities }) {

  const listActivity = () => {
    return activities.map(([product, productInfo]) => {
      return <div key={product} className='item-section'>
        <Item productName={product}
          productDesc={productInfo.description}
          productImg={productInfo.img}
          productPrice={productInfo.price} />
        {/* <button onClick={() => addItemToCart(product, productInfo.description, productInfo.img, productInfo.price)}>Add to Cart</button> */}
      </div>
    });
  }

  return (
    <div className={classNames('Admin')}>
      {activities && listActivity()}
    </div>
  );
}

export default Admin;
