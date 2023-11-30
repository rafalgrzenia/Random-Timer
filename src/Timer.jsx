import { useEffect, useState } from "react";
import { alertSound } from "./ContinuousSlider";
import { getRandomTime } from "./functions/getRandomTime";
import ContinuousSlider from "./ContinuousSlider";

export default function Timer() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [volume, setVolume] = useState(30);
  const [minTime, setMinTime] = useState(2);
  const [maxTime, setMaxTime] = useState(3);

  let pauseTimer;

  useEffect(() => {
    pauseTimer = false;

    if (isTimerOn) setTimer();

    return () => {
      pauseTimer = true;
    };
  }, [isTimerOn]);

  async function setTimer() {
    const randomTime = getRandomTime(minTime, maxTime);

    await timerDelay(randomTime);

    await playAlertWithDelay(250);

    await playAlertWithDelay(12000);

    if (!pauseTimer) setTimer();
  }

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
                  maxLength={2}
                  min={1}
                  max={60}
                  value={minTime}
                  onChange={(e) => {
                    setMinTime(Number(e.target.value));
                  }}
                />
              </div>
              <div className="max-timer">
                <label htmlFor="max-input">Max time:</label>

                <input
                  type="number"
                  id="max-input"
                  maxLength={2}
                  min={1}
                  max={60}
                  placeholder="min"
                  value={maxTime}
                  onChange={(e) => {
                    setMaxTime(Number(e.target.value));
                  }}
                />
              </div>
            </div>
            <div className="volume-container">
              <ContinuousSlider volume={volume} setVolume={setVolume} />
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
