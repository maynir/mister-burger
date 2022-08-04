import './App.css';
import React, { useRef, useState, useEffect } from "react";
import Navigator from './components/Navigator/Navigator';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import StoreHeader from './components/StoreHeader/StoreHeader';
import SignIn from './components/SignIn/SignIn';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedPage, setSelectedPage] = useState('store');
  const [loggedInEmail, setLoggedInEmail] = useState(null);

  const headerRef = useRef();

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
    } catch (err){
      alert('Something went wrong...')
    }
  }, [isLoggedIn, loggedInEmail]);

  return (
    <div className="App">
      <Navigator
        isLoggedIn={isLoggedIn}
        setSelectedPage={setSelectedPage}
        headerRef={headerRef}
        isAdmin={isAdmin}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInEmail={setLoggedInEmail} />
      <StoreHeader headerRef={headerRef} />
      {selectedPage === 'login' && <Login setSelectedPage={setSelectedPage}
        setIsLoggedIn={setIsLoggedIn}
        setLoggedInEmail={setLoggedInEmail}
        setIsAdmin={setIsAdmin} />}
      {selectedPage === 'store' && <Store />}
      {selectedPage === 'signIn' && <SignIn setSelectedPage={setSelectedPage} />}
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
