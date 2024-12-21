import React, { useState, useEffect } from 'react';
import './timer.css'; // Import the CSS file

const CountdownTimer = () => {
  const [timers, setTimers] = useState([]);
  const [inputTime, setInputTime] = useState('');
  const [inputLabel, setInputLabel] = useState('');

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    if (timeInSeconds >= 60) {
      return `${minutes} min ${seconds.toString().padStart(2, '0')} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  const addTimer = () => {
    const totalTime = parseInt(inputTime, 10);
    if (!isNaN(totalTime) && totalTime > 0 && inputLabel.trim() !== '') {
      setTimers([...timers, { label: inputLabel, time: totalTime * 60, totalTime: totalTime * 60, isActive: false }]);
      setInputTime('');
      setInputLabel('');
    }
  };

  const toggleTimer = (index) => {
    const updatedTimers = timers.map((timer, idx) => {
      if (idx === index) {
        return { ...timer, isActive: !timer.isActive };
      }
      return timer;
    });
    setTimers(updatedTimers);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) =>
        prevTimers.map((timer) => {
          if (timer.isActive && timer.time > 0) {
            return { ...timer, time: timer.time - 1 };
          }
          return timer;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  return (
    <div id='hell' className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Countdown Timer</h1>

      <div className="input-container">
        <input
          type="text"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          placeholder="Enter label"
          className="input-label"
        />
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Enter time in minutes"
          className="input-time"
        />
        <button onClick={addTimer} className="add-timer-button">
          Add Timer
        </button>
      </div>

      {/* Timer list container with scrolling */}
      <div className="timer-list-container">
        {timers.map((timer, index) => (
          <div key={index} className="timer-card">
          <div className="timer-container">
              <div className="timer-header">
                  <div className="timer-label">{timer.label}</div>
                  <div className="timer-total">{Math.floor(timer.totalTime / 60)} min</div>
              </div>
              <div className="timer-progress-container">
                  <div
                      className="timer-progress-bar"
                      style={{ width: `${(timer.time / timer.totalTime) * 100}%` }}
                  />
                  <div
                      className="timer-progress-marker"
                      style={{ left: `${(timer.time / timer.totalTime) * 100 - 2}%` }} // Adjusted position to be inside the progress bar
                  />
                  <div className="timer-time">{formatTime(timer.time)}</div>
              </div>
              <div className="timer-controls">
                  <button onClick={() => toggleTimer(index)} className="timer-button">
                      {timer.isActive ? 'Stop' : 'Start'}
                  </button>
                  <div className="text-sm text-gray-600">{formatTime(timer.time)} left</div>
              </div>
          </div>
      </div>


        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
