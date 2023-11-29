import { useEffect, useState } from "react";
import InputSlider from "./ContinuousSlider";
import { getRandomTime } from "./functions/getRandomTime";
import beepAlert from "./audio/beep.mp3";

export default function Timer() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [minTime, setMinTime] = useState(2);
  const [maxTime, setMaxTime] = useState(3);
  const alertSound = new Audio(beepAlert);

  let pauseTimer;

  useEffect(() => {
    pauseTimer = false;

    if (isTimerOn) {
      setTimer();
    }

    async function setTimer() {
      const randomTime = getRandomTime(minTime, maxTime);

      await timerDelay(1000);

      await playAlertWithDelay(250);

      await playAlertWithDelay(3000);

      if (!pauseTimer) setTimer();
    }

    return () => {
      pauseTimer = true;
    };
  }, [isTimerOn]);

  function timerDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (pauseTimer) return;
        resolve();
      }, delay);
    });
  }

  function playAlertWithDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (pauseTimer) return;
        alertSound.play();
        resolve();
      }, delay);
    });
  }

  function handleTimerState() {
    setIsTimerOn(!isTimerOn);
  }


  return (
    <main>
      <div className="small-container">
        <h1>Random Timer</h1>
        {isTimerOn ? null : (
          <>
            <div className="minmax-container">
              <div className="min-timer">
                <label htmlFor="min-input">Min time:</label>
                <input
                  id="min-input"
                  type="number"
                  min={0}
                  max={60}
                  placeholder="min"
                  value={minTime}
                  onChange={(e) => setMinTime(Number(e.target.value))}
                />
              </div>
              <div className="max-timer">
                <label htmlFor="max-input">Max time:</label>

                <input
                  type="number"
                  id="max-input"
                  min={1}
                  max={60}
                  placeholder="min"
                  value={maxTime}
                  onChange={(e) => setMaxTime(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="volume-container">
              <InputSlider />
            </div>
          </>
        )}

        <div className="buttons-container">
          {isTimerOn ? (
            <button onClick={handleTimerState}>Cancel</button>
          ) : (
            <button onClick={handleTimerState} className="start-button">
              START
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
