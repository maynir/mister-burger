import './Readme.scss';

const Readme = () => {

  return (
    <div className="Readme">

      <h1>Readme</h1>
      <h1>May Nir - 209041797</h1>

      <hr />

      <h2>Store Name: <hr /></h2>
      <div>MisteR Burger Shop.<br />It symbolize our two names in it - M(ay)isteR(oee).</div>

      <h2>What are you selling? <hr /></h2>
      <div>We made a store for a burger resturant. You can order different types of burgers, side dishes such as fries and onion rings, and you can order drinks too.</div>

      <h2>What additional pages did you add? How to operate it? <hr /></h2>
      <div>We added 4 additional pages - Our Lifestyle, Recipe, Lottery, Contact Us.</div>

      <h3>1. Our Lifestyle <hr /></h3>

      <div>This page is supposed to show the "vibe" of the shop.</div>
      <div>
        On this page, we developed a gallery component which displays pictures from <code>/client/public/films</code> folder.
        You can simply add more pictures - just add the file to the films folder and update the <code>fileNames</code> variable at <code>OurLifestyle.js</code>.
      </div>

      <h3>2. Recipe <hr /></h3>
      <div>
        This page reveals the MisteR burger's secret Recipe. A simply and pretty static page
      </div>

      <h3>3. Lottery <hr /></h3>
      <div>
        In this page, every month, each user gets the oppurtunity to win a free meal.
      </div>
      <div>
        This is an interactive page, where a user clicks on the lottery button, waits for a couple of seconds, and then gets an alert if they won the free meal lottery.
        If he wins - he will also get the promo code for the free meal and can use it in the physical store(in the future I want to add input at the checkout page to enter the promo code and it will reduce the cost)
        Every user tries to win a free meal once every month. we make sure it will happen by saving the time the user tried, and displaying the right screen depending on the user's status.
      </div>
      <div>
        How the lottery works behind the scenes - it randomizes a number between 0 to 9, and the user wins if they got the number 1.
      </div>

      <h3>4. Contact Us <hr /></h3>
      <div>
        This is a page where the user can contact to store by filling in his details. After the user submits, the store owner(me) will get an email with the user's input, and the user will also get a confirmation email for filling out the form.
      </div>
      <div>
        This is my favorite page because of the email interactions :)
      </div>

      <h2>What was hard to do? <hr /></h2>
      <div>
        The thing that was most challenging for me was managing the user's authentication - only exposing the data to logged-in users and maintaining it.
      </div>

      <h2>Who is your partner? <hr /></h2>
      <div>
        Roee Milo - 319091690
      </div>

      <h2>What did you do? <hr /></h2>
      <div>
        I was responsible for the user managment(register/login/logout), the store with the cart, checkout, and products, the Admin page, and the Lottery and Contact Us.
      </div>

      <h2>What did your partner do <hr /></h2>
      <div>
        We together thought about the store idea, what are going to be additional pages. Roee was responsible for the development of the "Our Lifestyle" and the "Recipe" pages.
      </div>

      <h2>Routes: <hr /></h2>

      <h3>Public routes:</h3>

      <ul>
        <li>/username - get status if user is logged in</li>
        <li>/sign-in - add new user</li>
        <li>/login - login user</li>
        <li>/products - get object of products grouped by product type</li>
        <li>/flat-products - get list of products</li>
      </ul>

      <h3>Users only routes:</h3>

      <ul>
        <li>/log-out - log out user</li>
        <li>/add-to-cart - add product to user's cart</li>
        <li>/remove-from-cart - remove product from user's cart</li>
        <li>/cart(get) - get user's cart products</li>
        <li>/cart(delete)cart - delete user's cart</li>
        <li>/purchase - create new purchase for user</li>
        <li>/lottry-status - get user's status if he already participated</li>
        <li>/lottry - submit lottery yry for user</li>
      </ul>


      <h3>Admin only routes:</h3>
      <ul>

        <li>/users-activities - get list of all users activities</li>
        <li>/add-product - add new product to store</li>
        <li>/remove-product - remove product from store</li>
      </ul>
    </div>
  );
}

export default Readme;
