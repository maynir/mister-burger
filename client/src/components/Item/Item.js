import './Item.scss';
import React from 'react';
import classNames from 'classnames';

const Item = ({ productName, productDesc, productImg, productPrice }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={classNames('Item')}>
      <div className={classNames('info')}>
        <div className={classNames('title')}>{capitalizeFirstLetter(productName)}</div>
        <div className={classNames('desc')}>{productDesc}</div>
        <div className={classNames('price')}>{productPrice}$</div>
      </div>
      <div className={classNames('img')}>
        <img src={`/images/${productImg}`} alt={productImg} key={productImg}/>
      </div>
    </div>
  );
}

export default Item;
