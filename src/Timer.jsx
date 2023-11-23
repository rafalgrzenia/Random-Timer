import InputSlider from "./ContinuousSlider";

export default function Timer() {
  return (
    <main>
      <div className="small-container">
        <h1>Random Timer</h1>
        <div className="minmax-container">
          <div className="min-timer">
            <label htmlFor="min-input">Min time:</label>
            <input
              id="min-input"
              type="number"
              min={0}
              max={60}
              placeholder="min"
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
            />
          </div>
        </div>
        <div className="volume-container">
          <InputSlider />
          {/* <input
            className="volume-range"
            min={0}
            max={100}
            defaultValue={50}
            type="range"
          /> */}
        </div>
        <div className="buttons-container">
          <button className="start-button">START</button>
          <button className="reset-button">RESET</button>
        </div>
      </div>
    </main>
  );
}
