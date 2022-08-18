import './UserActivityItem.scss';
import React from 'react';
import classNames from 'classnames';

const UserActivityItem = ({ email, path, time, item, items, price }) => {
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className={classNames('UserActivityItem')}>
      <div className={classNames('info')}>
        <div className={classNames('email')}>User email: {email}.</div>
        <div className={classNames('path')}>Activity: {path}.</div>
        <div className={classNames('time')}>Time: {time}.</div>
        {item && <div className={classNames('item')}>Item: {capitalizeFirstLetter(item)}.</div>}
        {items && <div className={classNames('items')}>Itmes: {items.map(item => capitalizeFirstLetter(item)).join(', ')}.</div>}
        {price && <div className={classNames('price')}>Price: {price}$</div>}
      </div>
    </div>
  );
}

export default UserActivityItem;
