import './Admin.scss';
import React from 'react';
import classNames from 'classnames';
import UserActivityItem from '../UserActivityItem/UserActivityItem'
import Search from '../Search/Search';
import AddNewProduct from '../AddNewProduct/AddNewProduct'
import Item from '../Item/Item';
import axios from 'axios';

function Admin({ isAdmin, activities, filteredActivities, setFilteredActivities, getProducts, products, getUserCart }) {

  const removeProduct = async (productType, productName) => {
    try {
      await axios.put('/remove-product', { productType, productName });
      await getProducts();
      await getUserCart();
      alert('Removed new product');
    } catch (error) {
      console.log(error.message);
      alert('Something went wrong...');
    }
  }

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
          productImg={productInfo.img}
          productPrice={productInfo.price} />
        <button onClick={() => removeProduct(type, product)}>Remove from store</button>
      </div>
    });
  }
  const listActivity = () => {
    return filteredActivities.map(({ email, path, time, item, items, price, win, coupon }, i) => {
      return <div key={i} className='user-activity-item-section'>
        <UserActivityItem email={email}
          path={path}
          time={time}
          item={item}
          items={items}
          price={price}
          win={win}
          coupon={coupon} />
      </div>
    });
  }

  const searchFunction = (searchPhrase) => {
    return activities.filter(({ email }) => email.startsWith(searchPhrase))
  }

  return (
    <div className={classNames('Admin')}>
      <div className='activities-section'>
        <div className='title'>USERS ACTIVITY</div>
        <span className='info-msg'>You might need to refresh the page</span><br/>
        <span className='info-msg'>to see new activities</span>
        <Search originalList={activities}
          setFilteredList={setFilteredActivities}
          filterFunction={searchFunction}
          searchPlaceholder='Search by email prefix' />
        <div className='list-section'>
          {activities && listActivity()}
        </div>
        {activities.length > 2 && <span className='info-msg'>Scroll for more...</span>}
      </div>

      <div className='products-manager-section'>
        <div className='title'>PRODUCTS MANAGER</div>
        <AddNewProduct getProducts={getProducts} />
        {products && menuSection('main')}
        {products && menuSection('side')}
        {products && menuSection('drink')}
      </div>
    </div>
  );
}

export default Admin;
