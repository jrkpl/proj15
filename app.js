import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DelayCounter() {
  const [bpm, setBpm] = useState(60);
  const [lastTap, setLastTap] = useState(null);
  const noteValues = [1, 1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512];

  const handleTap = () => {
    const now = performance.now();
    if (lastTap) {
      const delayInSec = (now - lastTap) / 1000;
      setBpm(60 / delayInSec);
    }
    setLastTap(now);
  };

  const handleBpmChange = (event) => {
    setBpm(event.target.value);
  };

  return (
    <div className="App container">
      <h1 className="text-center">Delay Time Counter + Tap BPM App</h1>
      <button className="btn btn-primary" onClick={handleTap}>Tap the beat</button>
      <div className="form-group">
        <label for="bpm">BPM:</label>
        <input className="form-control" type="number" id="bpm" value={bpm} onChange={handleBpmChange}/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Note Value</th>
            <th>Notes</th>
            <th>Dotted</th>
            <th>Triplets</th>
          </tr>
        </thead>
        <tbody>
          {noteValues.map(noteValue => (
            <tr key={noteValue}>
              <td>{noteValue}</td>
              <td>{((60 / bpm) / noteValue * 1000).toFixed(2)} ms</td>
              <td>{((60 / bpm) / noteValue * 1000 * 1.5).toFixed(2)} ms</td>
              <td>{((60 / bpm) / noteValue * 1000 / 3 * 2).toFixed(2)} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DelayCounter;

