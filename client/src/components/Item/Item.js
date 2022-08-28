import './Item.scss';
import React from 'react';
import classNames from 'classnames';

const Item = ({ productName, productDesc, productImg, productPrice, itemNotAvailable }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const imgNotAvailable = ({ currentTarget }) => {
    currentTarget.onerror=null;
    currentTarget.src='/images/img-not-found.png';
  }

  return (
    <div className={classNames('Item')}>
      <div className={classNames('info')}>
        <div className={classNames('title')}>{capitalizeFirstLetter(productName)}</div>
        <div className={classNames('desc')}>{itemNotAvailable ? 'This item is no longer available, please remove from cart.' : productDesc}</div>
        {!itemNotAvailable && <div className={classNames('price')}>{productPrice}$</div>}
      </div>
      <div className={classNames('img')}>
        <img src={`/images/${productImg}`} alt={productImg} key={productImg} onError={imgNotAvailable}/>
      </div>
    </div>
  );
}

export default Item;
