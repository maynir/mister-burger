import './SelectableItem.scss';
import React from 'react';
import classNames from 'classnames';
import Item from '../Item/Item';

const SelectableItem = ({ productName, productDesc, productImg, productPrice, isSelected, toggleItemFromCheckout, itemNotAvailable }) => {

  const handleClick = () => {
    if(itemNotAvailable) return;
    toggleItemFromCheckout(productName);
  }
  return (
    <div className={classNames('SelectableItem', { selected: isSelected, 'not-available': itemNotAvailable })} onClick={handleClick}>
      <Item productName={productName}
        productDesc={productDesc}
        productImg={productImg}
        productPrice={productPrice}
        itemNotAvailable={itemNotAvailable} />
    </div>
  );
}

export default SelectableItem;
