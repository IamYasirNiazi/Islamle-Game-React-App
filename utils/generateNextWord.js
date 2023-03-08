import moment from "moment";
import { updateNextWordTimestamp } from "./updateNextWordTimestamp";

export async function generateNextWord() {
  try {
    const nextWordTimestamp = localStorage.getItem("nextWordTimestamp");

    if (!nextWordTimestamp) {
      updateNextWordTimestamp();
    }

    const nextWordTime = moment.utc(parseInt(nextWordTimestamp) * 1000);

    const currentTime = moment.utc();
    const timeRemaining = Math.floor(nextWordTime.diff(currentTime) / 1000);

    if(timeRemaining > 86400 || timeRemaining < 0) {
      updateNextWordTimestamp()
    }

    return timeRemaining;
  } catch (error) {
    console.error("Error generating next word:", error);
    return null;
  }
}

