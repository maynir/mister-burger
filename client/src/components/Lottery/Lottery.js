import './Lottery.scss';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
const axios = require('axios');

const Lottery = ({ loggedInEmail }) => {

  const [isDisabled, setIsDisabled] = useState(false);
  const [userLotteryStatus, setUserLotteryStatus] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const onClick = async (e) => {
    e.preventDefault();
    setShowLoader(true);
    setIsDisabled(true);
    const { data } = await axios.post('/lottry');
    setShowLoader(false);
    setUserLotteryStatus(data.status);
    if (data.win) {
      Swal.fire('You just won!', `Save this coupon for the next time: ${ data.coupon }`, 'success')
    } else {
      Swal.fire('You didnt win this time :(', 'Try again next month.', 'error')
    }
  };

  const getUserLotteryStatus = async () => {
    const res = await axios.get('/lottry-status');
    setUserLotteryStatus(res.data.status);
  }

  useEffect(() => {
    getUserLotteryStatus();
  }, []);

  const alreadyParticipated = () => {
    return <div>
      <h2>Hi {loggedInEmail}, we see you've already participated in this month lottery.</h2>
      <h3>Try again next month :)</h3>
    </div>
  }

  const lottery = () => {
    return <div>
      <h2>Want to win a full meal with cheeseburger, fries and cold coke for <span className='big'>FREE</span>?</h2>
      <h3>All you need to do is click this button, and hope you are one of the lucky ones!</h3>
      <div className='info'>The chances are pretty hight: 1 out of 10 people will get a free meal</div>
      <button className="lottery-button" disabled={isDisabled} onClick={onClick}>
        {showLoader && <i className="fa fa-spinner fa-spin"></i>}
        Take Your Chance
      </button>
    </div>
  }

  return (
    <div className="Lottery">

      <h1>Lottery</h1>

      {userLotteryStatus === 'participated' ? alreadyParticipated() : lottery()}

    </div>
  );
}

export default Lottery;
