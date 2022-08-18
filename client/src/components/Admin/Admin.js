import './Admin.scss';
import React from 'react';
import classNames from 'classnames';
import UserActivityItem from '../UserActivityItem/UserActivityItem'

function Admin({ isAdmin, activities }) {

  const listActivity = () => {
    return activities.map(({ email, path, time, item, items, price }, i) => {
      return <div key={i} className='user-activity-item-section'>
        <UserActivityItem email={email}
          path={path}
          time={time}
          item={item}
          items={items}
          price={price} />
        {/* <button onClick={() => addItemToCart(product, productInfo.description, productInfo.img, productInfo.price)}>Add to Cart</button> */}
      </div>
    });
  }

  return (
    <div className={classNames('Admin')}>
      <div className='activities-section'>
        {activities && listActivity()}
      </div>
    </div>
  );
}

export default Admin;
