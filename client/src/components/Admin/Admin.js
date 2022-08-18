import './Admin.scss';
import React from 'react';
import classNames from 'classnames';
import UserActivityItem from '../UserActivityItem/UserActivityItem'
import Search from '../Search/Search';

function Admin({ isAdmin, activities, filteredActivities, setFilteredActivities }) {

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

  return (
    <div className={classNames('Admin')}>
      <div className='activities-section'>
        <Search originalList={activities}
          setFilteredList={setFilteredActivities}
          filterFunction={searchFunction}
          searchPlaceholder='Search by email prefix' />
        {activities && listActivity()}
      </div>
    </div>
  );
}

export default Admin;
