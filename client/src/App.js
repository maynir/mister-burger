import './App.css';
import React, { useRef, useState, useEffect } from "react";
import Navigator from './components/Navigator/Navigator';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import StoreHeader from './components/StoreHeader/StoreHeader';
import SignIn from './components/SignIn/SignIn';
import Cart from './components/Cart/Cart'
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPage, setSelectedPage] = useState('store');
  const [loggedInEmail, setLoggedInEmail] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});

  const headerRef = useRef();

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get('/products');
      setProducts(res.data.products);
    }

    getProducts();
  }, [])

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

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
        setLoggedInEmail(null)
      }
    }

    try {
      getEmail();
    } catch (err) {
      alert('Something went wrong...')
    }
  }, []);

  useEffect(() => {
    const getUserCart = async () => {
      if (Object.keys(products).length === 0) return;
      const res = await axios.get("/cart");
      const cart = res.data.cart;

      if (!cart) return;
      let items = [];
      Object.values(products).forEach(typedProducts => {
        Object.keys(typedProducts).forEach(item => {
          if (cart[item]) items = [...items, { name: item, description: typedProducts[item].description, img: typedProducts[item].img }]
        })
      })
      setCartItems(items);
    }

    try {
      getUserCart();
    } catch (err) {
      alert('Something went wrong...')
    }
  }, [isLoggedIn, products]);

  const addItemToCart = (name, description, img, update = true) => {
    setCartItems([...cartItems, { name, description, img }]);
    if (update) axios.put('/add-to-cart', { name });
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
        numItemsInCart={cartItems.length} />
      <StoreHeader headerRef={headerRef} />
      {selectedPage === 'login' && <Login setSelectedPage={setSelectedPage}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInEmail={setLoggedInEmail}
        setIsAdmin={setIsAdmin} />}
      {selectedPage === 'store' && <Store products={products} addItemToCart={addItemToCart} />}
      {selectedPage === 'signIn' && <SignIn setSelectedPage={setSelectedPage} />}
      {selectedPage === 'cart' && <Cart cartItems={cartItems} />}
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
