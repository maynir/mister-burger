import './Admin.scss';
import React from 'react';
import classNames from 'classnames';
import UserActivityItem from '../UserActivityItem/UserActivityItem'
import Search from '../Search/Search';
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import Item from '../Item/Item';

function Admin({ isAdmin, activities, filteredActivities, setFilteredActivities, getProducts }) {

  const listActivity = () => {
    return filteredActivities.map(({ email, path, time, item, items, price }, i) => {
      return <div key={i} className='user-activity-item-section'>
        <UserActivityItem email={email}
          path={path}
          time={time}
          item={item}
          items={items}
          price={price} />
      </div>
    });
  }

  const searchFunction = (searchPhrase) => {
    return activities.filter(({ email }) => email.startsWith(searchPhrase))
  }

  const listProducts = () => {
    return [];
  }

  return (
    <div className={classNames('Admin')}>
      <div className='activities-section'>
        <div className='title'>USERS ACTIVITY</div>
        <Search originalList={activities}
          setFilteredList={setFilteredActivities}
          filterFunction={searchFunction}
          searchPlaceholder='Search by email prefix' />
        <div className='list-section'>
          {activities && listActivity()}
        </div>
        {activities.length > 2 && <span className='scroll-for-more'>Scroll for more...</span>}
      </div>

      <div className='products-manager-section'>
        <div className='title'>PRODUCTS MANAGER</div>
        <AddNewProduct getProducts={getProducts} />
        {listProducts()}
      </div>
    </div>
  );
}

export default Admin;
