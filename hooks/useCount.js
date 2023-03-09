import { useState, useEffect } from "react";
import { generateNextWord } from "@/utils/generateNextWord";

export const useCount = (isFinished) => {
  const [timeRemaining, setTimeRemaining] = useState();


  useEffect(() => {
    if (!isFinished) return;

    generateNextWord().then((timeRemaining) => {
      setTimeRemaining(timeRemaining);
    });
  }, [isFinished]);

  useEffect(() => {
    if (!isFinished) return;

    const timer = setInterval(() => {
      generateNextWord().then((timeRemaining) => {
        setTimeRemaining(timeRemaining);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isFinished]);


  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = Math.floor(timeRemaining % 60);

  return {
    hours,
    minutes,
    seconds,
    timeRemaining
  };
};
