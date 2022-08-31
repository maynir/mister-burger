import './App.css';
import React, { useRef, useState, useEffect } from "react";
import Navigator from './components/Navigator/Navigator';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import StoreHeader from './components/StoreHeader/StoreHeader';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import ContactUs from './components/ContactUs/ContactUs'
import OurLifestyle from './components/OurLifestyle/OurLifestyle';
import Admin from './components/Admin/Admin';
import Lottery from './components/Lottery/Lottery';
import Recipe from './components/Recipe/Recipe';
import Readme from './components/Readme/Readme';
import axios from 'axios';
import Swal from 'sweetalert2';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPage, setSelectedPage] = useState('store');
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [products, setProducts] = useState({});
  const [flatProducts, setFlatProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState({});

  const headerRef = useRef();

  const getProducts = async () => {
    const res = await axios.get('/products');
    setProducts(res.data.products);
    setFilteredProducts(res.data.products);
    const resFlatProducts = await axios.get('/flat-products');
    setFlatProducts(resFlatProducts.data.products);
  }

  useEffect(() => {
    getProducts();
  }, [])

  useEffect(() => {
    const getEmail = async () => {
      const res = await axios.get("/username");
      const resEmail = res.data.email;

      if (resEmail) {
        setIsLoggedIn(true);
        if (resEmail === 'admin') setIsAdmin(true);
        setLoggedInEmail(resEmail)
      } else {
        setIsLoggedIn(false);
        setLoggedInEmail(null);
      }
    }

    try {
      getEmail();
    } catch (err) {
      alert('Something went wrong...')
    }
  }, []);

  const getUserCart = async () => {
    if (flatProducts.length === 0) return;
    if (!isLoggedIn) return;
    const res = await axios.get("/cart");
    const cart = res.data.cart;

    if (!cart) return;
    let items = [];
    Object.keys(cart).forEach(itemName => {
      let cartItem = { name: itemName };
      const indexOfItemInProducts = flatProducts.findIndex(item => item.name === itemName);
      if (indexOfItemInProducts > -1) {
        cartItem.description = flatProducts[indexOfItemInProducts].description
        cartItem.img = flatProducts[indexOfItemInProducts].img
        cartItem.price = flatProducts[indexOfItemInProducts].price
      } else {
        cartItem.itemNotAvailable = true;
      }
      items = [...items, cartItem];
    })
    setCartItems(items);
  }

  useEffect(() => {
    try {
      getUserCart();
    } catch (err) {
      alert('Something went wrong...')
    }
  }, [isLoggedIn, flatProducts]);

  useEffect(() => {
    const getUserActivity = async () => {
      if (!isAdmin) return
      const res = await axios.get("/users-activities");
      setActivities(res.data.activities);
    }

    try {
      getUserActivity();
    } catch (err) {
      alert('Something went wrong...')
    }
  }, [isAdmin]);

  const addItemToCart = (name, description, img, price, update = true) => {
    if (!isLoggedIn) {
      setSelectedPage('login');
      Swal.fire('Please login to be able to add items to your cart.', '', 'warning')
      return;
    }
    const indexOfItemToRemove = cartItems.findIndex(item => item.name === name);

    if (indexOfItemToRemove > -1) return Swal.fire('Item already in cart', '', 'info');
    setCartItems([...cartItems, { name, description, img, price }]);
    if (update) axios.put('/add-to-cart', { name });
    Swal.fire('Item successfully added to cart', '', 'success');
  }

  const removeItemFromCart = (name) => {
    let newCartItems = [...cartItems];
    const indexOfItemToRemove = newCartItems.findIndex(item => item.name === name);
    newCartItems.splice(indexOfItemToRemove, 1);
    setCartItems(newCartItems);
    axios.put('/remove-from-cart', { name });
    Swal.fire('Item successfully removed from cart', '', 'success');
  }

  const calcTotalPrice = () => {
    let total = 0;
    cartItems.forEach(({ price, isSelected }) => {
      if (isSelected) total += price;
    })
    return total;
  }

  const toggleItemFromCheckout = (name) => {
    let newCartItems = [...cartItems];
    const indexOfItemToUpdate = newCartItems.findIndex(product => product.name === name);
    let item = newCartItems[indexOfItemToUpdate];
    item.isSelected = !item.isSelected;
    newCartItems[indexOfItemToUpdate] = item;
    setCartItems(newCartItems);
  }

  const selectedItems = () => {
    return cartItems.filter(({ isSelected }) => isSelected);
  }

  return (
    <div className="App">
      <Navigator
        isLoggedIn={isLoggedIn}
        setSelectedPage={setSelectedPage}
        headerRef={headerRef}
        isAdmin={isAdmin}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInEmail={setLoggedInEmail}
        numItemsInCart={cartItems.length}
        selectedPage={selectedPage}
        loggedInEmail={loggedInEmail}
        setIsAdmin={setIsAdmin} />
      <StoreHeader headerRef={headerRef} />
      {selectedPage === 'login' &&
        <Login setSelectedPage={setSelectedPage}
          setIsLoggedIn={setIsLoggedIn}
          setLoggedInEmail={setLoggedInEmail}
          setIsAdmin={setIsAdmin} />}
      {selectedPage === 'store' &&
        <Store products={products}
          addItemToCart={addItemToCart}
          filteredProducts={filteredProducts}
          setFilteredProducts={setFilteredProducts} />}
      {selectedPage === 'signIn' && <SignIn setSelectedPage={setSelectedPage} />}
      {selectedPage === 'cart' && <Cart cartItems={cartItems}
        removeItemFromCart={removeItemFromCart}
        calcTotalPrice={calcTotalPrice}
        toggleItemFromCheckout={toggleItemFromCheckout}
        setSelectedPage={setSelectedPage} />}
      {selectedPage === 'checkout' && <Checkout products={selectedItems()}
        setSelectedPage={setSelectedPage}
        calcTotalPrice={calcTotalPrice}
        loggedInEmail={loggedInEmail}
        setCartItems={setCartItems} />}
      {selectedPage === 'contactus' && <ContactUs />}
      {selectedPage === 'ourlifestyle' && <OurLifestyle />}
      {isAdmin && selectedPage === 'admin' && <Admin isAdmin={isAdmin}
        activities={activities}
        filteredActivities={filteredActivities}
        setFilteredActivities={setFilteredActivities}
        getProducts={getProducts}
        products={products}
        getUserCart={getUserCart} />}
      {selectedPage === 'lottery' && <Lottery loggedInEmail={loggedInEmail} />}
      {selectedPage === 'recipe' && <Recipe />}
      {selectedPage === 'readme' && <Readme />}
    </div>
  );
}

export default App;
