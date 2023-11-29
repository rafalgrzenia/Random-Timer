import { useEffect, useState } from "react";
import InputSlider from "./ContinuousSlider";

export default function Timer() {
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [minTime, setMinTime] = useState(2);
  const [maxTime, setMaxTime] = useState(3);
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
