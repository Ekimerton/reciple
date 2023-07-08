import React, { useEffect, useState } from "react";
import moment from "moment";

const Timer = ({ isModalActive }) => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    let timer = null;

    const calculateRemainingTime = () => {
      const now = moment();
      const endOfDay = moment().endOf("day");
      const duration = moment.duration(endOfDay.diff(now));
      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");
      setRemainingTime(`${hours}:${minutes}:${seconds}`);
    };

    if (isModalActive) {
      calculateRemainingTime();
      timer = setInterval(calculateRemainingTime, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isModalActive]);

  return isModalActive && <p>Next reciple in: [ {remainingTime} ]</p>;
};

export default Timer;