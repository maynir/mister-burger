import './Recipe.scss';

const Recipe = () => {


  return (
    <div className="Recipe">

      <h1>Always wanted to know how to make MisteR Burger's famouse burger?</h1>
      <h2>Now we're going to tell you the recipe!</h2>

      <hr />

      <img src={'/images/burger-recipe.jpeg'} alt={'burger-recipe'} key={'burger-recipe'} />

      <div className='recipe-info'>

        <div className='ingredients'>
          <div className='title'>Ingredients:</div>
          <ul role="listbox" tabindex="0" aria-label="emails list">
            <li>1 pound ground lean (7% fat) beef</li>
            <li>1 large egg</li>
            <li>½ cup minced onion</li>
            <li>¼ cup fine dried bread crumbs</li>
            <li>1 tablespoon Worcestershire</li>
            <li>1 or 2 cloves garlic, peeled and minced</li>
            <li>About 1/2 teaspoon salt</li>
            <li>About 1/4 teaspoon pepper</li>
            <li>4 hamburger buns (4 in. wide), split</li>
            <li>About 1/4 cup mayonnaise</li>
            <li>About 1/4 cup ketchup</li>
            <li>4 iceberg lettuce leaves, rinsed and crisped</li>
            <li>1 firm-ripe tomato, cored and thinly sliced</li>
            <li>4 thin slices red onion</li>
          </ul>
        </div>

        <div className='directions'>
          <div className='title'>Directions:</div>
          <div className='step'>
            <div className='step-title'>
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              Step 1
            </div>
            <div>In a bowl, mix ground beef, egg, onion, bread crumbs, Worcestershire, garlic, 1/2 teaspoon salt, and 1/4 teaspoon pepper until well blended. Divide mixture into four equal portions and shape each into a patty about 4 inches wide.</div>
          </div>
          <div className='step'>
            <div className='step-title'>
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              Step 2
            </div>
            <div>Lay burgers on an oiled barbecue grill over a solid bed of hot coals or high heat on a gas grill (you can hold your hand at grill level only 2 to 3 seconds); close lid on gas grill. Cook burgers, turning once, until browned on both sides and no longer pink inside (cut to test), 7 to 8 minutes total. Remove from grill.</div>
          </div>
          <div className='step'>
            <div className='step-title'>
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              Step 3
            </div>
            <div>Lay buns, cut side down, on grill and cook until lightly toasted, 30 seconds to 1 minute.</div>
          </div>
          <div className='step'>
            <div className='step-title'>
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              Step 4
            </div>
            <div>Spread mayonnaise and ketchup on bun bottoms. Add lettuce, tomato, burger, onion, and salt and pepper to taste. Set bun tops in place.</div>
          </div>
        </div>

        <div className='chef-note'>
          <div className='title'>Chef's Notes:</div>
          <div>If you want absolute bacteria safety, you need to cook your burgers to 160°. This recipe will keep them moist.</div>
        </div>

        <div className='nutrition-facts'>
          <div className='title'>Nutrition Facts:</div>
          <div>Per Serving: 480 calories; calories from fat 43%; protein 31g; fat 23g; saturated fat 5.6g; carbohydrates 37g; fiber 2.4g; sodium 978mg; cholesterol 127mg.</div>
        </div>

      </div>

    </div>
  );
}

export default Recipe;
