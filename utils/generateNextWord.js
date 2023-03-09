import moment from "moment";
import { updateNextWordTimestamp } from "./updateNextWordTimestamp";

export async function generateNextWord() {
  try {
    const nextWordTimestamp = localStorage.getItem("nextWordTimestamp");

    if (!nextWordTimestamp) {
      updateNextWordTimestamp();
    }

    const nextWordTime = moment.utc(parseInt(nextWordTimestamp) * 1000);

    const unixTimestamp = JSON.parse(localStorage.getItem("islamleHistory"));
    const { lastPlayed } = unixTimestamp[0];

    const nearest12pm = moment.unix(lastPlayed).utc().startOf('day').add(1, 'day').add(12, 'hours').unix();

    const diffTo12pm = moment.unix(nearest12pm).diff(moment.unix(lastPlayed), 'seconds');
    const diffToNow = moment.utc().diff(moment.unix(lastPlayed), 'seconds');

    const currentTime = moment.utc();
    const timeRemaining = Math.floor(nextWordTime.diff(currentTime) / 1000);

    if(timeRemaining > 86400 || timeRemaining < 0) {
      updateNextWordTimestamp();
    }
    else if(diffToNow > diffTo12pm) {
      localStorage.removeItem("islamleHistory");
      localStorage.removeItem("nextWordTimestamp");
    }

    return timeRemaining;
  } catch (error) {
    console.error("Error generating next word:", error);
    return null;
  }
}
