import './Lottery.scss';
import { useState, useEffect } from 'react';
const axios = require('axios');

const Lottery = ({ loggedInEmail }) => {

  const [showAlert, setShowAlert] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userLotteryStatus, setUserLotteryStatus] = useState(null);
  const [userLotteryWin, setUserLotteryWin] = useState(null);
  const [showLoader, setLoader] = useState(false);
  const [sumbitEnabled, setSumbitEnabled] = useState(true);

  const onClick = async (e) => {
    e.preventDefault();
    const res = await axios.post('/lottry');
    setUserLotteryWin(res.win);
    setUserLotteryStatus(res.status);
    setShowAlert(true);
    setIsDisabled(true);
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
      {showAlert && <div className="alert">
        <span className="closebtn" onClick={() => setShowAlert(false)}>&times;</span>
        {userLotteryWin ? 'You just won!' : 'Its not your time to shine, try again next month!'}
      </div>}

      <h1>Lottery</h1>

      {userLotteryStatus === 'participated' ? alreadyParticipated() : lottery()}

    </div>
  );
}

export default Lottery;
