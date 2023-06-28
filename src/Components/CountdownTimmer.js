import React, { useEffect, useState } from "react";

const CountdownTimmer = () => {
  const [timerDays, setTimerDays] = useState(0);
  const [timerHours, setTimerHours] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [intervalId, setIntervalId] = useState();

  const deadLineDate = "June, 28, 2023 , 17:23:00";

  const getTime = () => {
    const time = Date.parse(deadLineDate) - Date.now();
    setTimerDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setTimerHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setTimerMinutes(Math.floor((time / 1000 / 60) % 60));
    setTimerSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      getTime();
    }, 1000);
    setIsInitialLoad(false);
    setIntervalId(interval);
    return () => {
      clearInterval(interval);
    };
  }, []);
  useEffect(() => {
    if (timerSeconds <= 0 && !isInitialLoad) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [timerSeconds]);
  return (
    <>
      <section className="timer-container">
        <section className="timer">
          <div>
            <span className="mdi mdi-calendar-clock timer-icon"></span>
            <h2>Countdown timer</h2>
          </div>
          {intervalId ? (
            <div>
              <section>
                {/* {
                  timerDays==="00" && timerHours==="00" && timerMinutes==="00" && timerSeconds==="00"? "hii" : null  
                } */}
                <p>{timerDays < 10 ? "0" + timerDays : timerDays}</p>
                <p>
                  <small>Days</small>
                </p>
              </section>
              <span>:</span>
              <section>
                <p>{timerHours < 10 ? "0" + timerHours : timerHours}</p>
                <p>
                  <small>Hours</small>
                </p>
              </section>
              <span>:</span>
              <section>
                <p>{timerMinutes < 10 ? "0" + timerMinutes : timerMinutes}</p>
                <p>
                  <small>Minutes</small>
                </p>
              </section>
              <span>:</span>
              <section>
                <p>{timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}</p>
                <p>
                  <small>Seconds</small>
                </p>
              </section>
            </div>
          ) : (
            <button>Click me!!!</button>
          )}
        </section>
      </section>
    </>
  );
};

export default CountdownTimmer;
