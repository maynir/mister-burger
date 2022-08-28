import './Lottery.scss';
import { useState, useEffect } from 'react';
const axios = require('axios');

const Lottery = ({ loggedInEmail }) => {

  const [userLotteryStatus, setUserLotteryStatus] = useState({});
  const [showLoader, setLoader] = useState(false);
  const [sumbitEnabled, setSumbitEnabled] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();

  };

  const getUserLotteryStatus = async () => {

  }

  useEffect(() => {
    getUserLotteryStatus();
  }, []);

  const alreadyParticipated = () => {
    return <div>

    </div>
  }

  const lottery = () => {
    return <div>
      <h2>Want to win a full meal with cheeseburger, fries and cold coke for <span className='big'>FREE</span>?</h2>
      <h3>All you need to do is click this button, and hope you are one of the lucky ones!</h3>
      <div className='info'>The chances are pretty hight: 1 out of 10 people will get a free meal</div>
      <button className="lottery-button" disabled={!sumbitEnabled} type='submit'>
        {showLoader && <i className="fa fa-spinner fa-spin"></i>}
        Take Your Chance
      </button>
    </div>
  }


  return (
    <div className="Lottery" id="Lottery">
      {/* {showAlert && <div className="alert"  >
        <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
        An email just sent to me! Thank you for filling the form.
      </div>} */}

      <h1>Lottery</h1>

      {userLotteryStatus.status === 'participated' ? alreadyParticipated() : lottery()}

    </div>
  );
}

export default Lottery;
