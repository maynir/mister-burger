import './App.css';
import React, { useRef } from "react";
import Navigator from './components/Navigator/Navigator';
import Login from './components/Login/Login';
import Store from './components/Store/Store';
import StoreHeader from './components/StoreHeader/StoreHeader';
function App() {
  const [data, setData] = React.useState(null);
  const [isLogIn, setIsLogIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState('store');

  const headerRef = useRef();

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <Navigator
        isLogIn={isLogIn}
        setSelectedPage={setSelectedPage}
        headerRef={headerRef}
        isAdmin={isAdmin} />
      <StoreHeader headerRef={headerRef} />
      {selectedPage === 'logIn' && <Login />}
      {selectedPage === 'store' && <Store />}
      <p>{!data ? "Loading..." : data}</p>
    </div>
  );
}

export default App;
