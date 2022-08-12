import './SelectableItem.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item';

const SelectableItem = ({ productName, productDesc, productImg, productPrice, isSelected, toggleItemFromCheckout }) => {

  const handleClick = () => {
    toggleItemFromCheckout(productName);
  }
  return (
    <div className={classNames('SelectableItem', { selected: isSelected })} onClick={handleClick}>
      <Item productName={productName}
        productDesc={productDesc}
        productImg={productImg}
        productPrice={productPrice} />
    </div>
  );
}

export default SelectableItem;
