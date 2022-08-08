import './StoreHeader.scss';

const StoreHeader = ({ headerRef }) => {
  return (
    <div className="StoreHeader" style={{ backgroundImage: "url(/images/hamburger-theme-2.jpeg)" }} ref={headerRef}>
      <div className='main-txt'>Welcome to MisteR Burger</div>
      <div className='sub-txt'>May and Roee's Burger Shop</div>
    </div>
  );
}

export default StoreHeader;
