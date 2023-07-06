//styles
import { useCallback, useEffect, useState } from "react";
import "./Timer.css";
import { BsClockHistory } from "react-icons/bs";

const Timer = ({ offPrice }) => {
  const [day, setDay] = useState();
  const [houer, setHouer] = useState();
  const [minutes, setMinutes] = useState();
  const [second, setSecond] = useState();
  let interval;

  const startTimer = useCallback(() => {
    const currentDate = new Date();
    const expireDate = new Date(
      currentDate.setDate(currentDate.getDate() + 14)
    ).getTime();

    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = expireDate - now;
      const expireDays = Math.floor(distance / (24 * 60 * 60 * 1000));
      const expireHouer = Math.floor(
        (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
      );
      const expireMinutes = Math.floor(
        (distance % (60 * 60 * 1000)) / (1000 * 60)
      );
      const expireSecond = Math.floor((distance % (60 * 1000)) / 1000);
      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setDay(expireDays);
        setHouer(expireHouer);
        setMinutes(expireMinutes);
        setSecond(expireSecond);
      }
    }, 1000);
  },[]);

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div className="suggestedproduct__time-Percent">
      {offPrice ? (
        <div className="suggestedproduct__percent">
          <span>%{offPrice} </span>
        </div>
      ) : null}

      <div className="suggestedproduct__time">
        <span className="timer">{day < 10 ? `0${day}` : day}</span>:
        <span className="timer">{houer < 10 ? `0${houer}` : houer}</span>:
        <span className="timer">{minutes < 10 ? `0${minutes}` : minutes}</span>:
        <span className="suggestedproduct__time-gold">
          {second < 10 ? `0${second}` : second}
        </span>
      </div>
      <div className="suggestedproduct__icon-box">
        <BsClockHistory className="fullIcon" />
      </div>
    </div>
  );
};

export default Timer;
