import { useEffect, useState } from "react";
import { alertSound } from "./ContinuousSlider";
import { getRandomTime } from "./functions/getRandomTime";
import ContinuousSlider from "./ContinuousSlider";

export default function Timer() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [volume, setVolume] = useState(30);
  const [minTime, setMinTime] = useState(2);
  const [maxTime, setMaxTime] = useState(3);

  let pausedTimer;

  useEffect(() => {
    pausedTimer = false;

    if (isTimerOn) setTimer();

    return () => {
      pausedTimer = true;
    };
  }, [isTimerOn]);

  async function setTimer() {
    const randomTime = getRandomTime(Number(minTime), Number(maxTime));

    await timerDelay(randomTime);

    await playAlertWithDelay(250);

    await playAlertWithDelay(12000);

    if (!pausedTimer) setTimer();
  }

  function timerDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (pausedTimer) return;
        resolve();
      }, delay);
    });
  }

  function playAlertWithDelay(delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (pausedTimer) return;
        alertSound.play();
        resolve();
      }, delay);
    });
  }

  function handleSetTimerOff() {
    setIsTimerOn(false);
  }

  function handleSetTimerOn() {
    if (minTime > maxTime) {
      alert("Min Time must be less than Max Time");
    } else if (maxTime > 60) {
      alert("Max time can't be higher than 60");
    } else if (minTime > 60) {
      alert("Min time can't be higher than 60");
    } else {
      setIsTimerOn(true);
    }
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
                  min={0}
                  max={60}
                  placeholder="min"
                  value={minTime}
                  onChange={(e) => {
                    setMinTime(e.target.value);
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
                    setMaxTime(e.target.value);
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
            <button onClick={handleSetTimerOff}>Cancel</button>
          ) : (
            <button onClick={handleSetTimerOn} className="start-button">
              START
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
