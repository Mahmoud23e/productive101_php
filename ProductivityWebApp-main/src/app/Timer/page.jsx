"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./timer.css";

const fadeUpAnimationVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const CountdownTimer = () => {
  const [timers, setTimers] = useState([]);
  const [inputTime, setInputTime] = useState("");
  const [inputLabel, setInputLabel] = useState("");

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    if (timeInSeconds >= 60) {
      return `${minutes} min ${seconds.toString().padStart(2, "0")} sec`;
    } else {
      return `${seconds} sec`;
    }
  };

  const saveTimersToLocalStorage = (timers) => {
    localStorage.setItem("timers", JSON.stringify(timers));
  };

  const loadTimersFromLocalStorage = () => {
    const storedTimers = localStorage.getItem("timers");
    if (storedTimers) {
      return JSON.parse(storedTimers);
    }
    return [];
  };

  const addTimer = () => {
    const totalTime = parseInt(inputTime, 10);
    if (!isNaN(totalTime) && totalTime > 0 && inputLabel.trim() !== "") {
      const newTimers = [
        {
          label: inputLabel,
          time: totalTime * 60,
          totalTime: totalTime * 60,
          isActive: false,
        },
        ...timers,
      ];
      setTimers(newTimers);
      saveTimersToLocalStorage(newTimers);
      setInputTime("");
      setInputLabel("");
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
    saveTimersToLocalStorage(updatedTimers);
  };
  const Deleter = (index) => {
    const updatedTimers = timers.filter((timer, idx) => idx !== index);
    setTimers(updatedTimers);
    saveTimersToLocalStorage(updatedTimers);
  };

  useEffect(() => {
    const storedTimers = loadTimersFromLocalStorage();
    if (storedTimers.length > 0) {
      setTimers(storedTimers);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prevTimers) => {
        const updatedTimers = prevTimers
          .map((timer) => {
            if (timer.isActive && timer.time > 0) {
              return { ...timer, time: timer.time - 1 };
            }
            return timer;
          })
          .filter((timer) => timer.time > 0);

        saveTimersToLocalStorage(updatedTimers);
        return updatedTimers;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  return (
    <motion.div
      id="hell"
      className="flex flex-col items-center justify-center"
      initial="initial"
      animate="animate"
      variants={fadeUpAnimationVariant}
    >
      <div className="timer-list-container">
        {timers.length === 0 ? (
          <motion.h1
            className="h-full text-center w-[80%] font-bold text-[30px] flex items-center justify-center"
            variants={fadeUpAnimationVariant}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            There are no active timers at the moment, Start by adding new timer.
            <br /> 👇
          </motion.h1>
        ) : (
          timers.map((timer, index) => (
            <motion.div
              key={index}
              className="timer-card shadow-lg"
              variants={fadeUpAnimationVariant}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="timer-container ">
                <div className="timer-header flex">
                  <div className="flex gap-2">
                    <div className="timer-label">{timer.label}</div>
                    <div className="timer-total">
                      {Math.floor(timer.totalTime / 60)} min
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-black px-[20px] py-[4px] rounded-full text-[20px] text-white">
                      {formatTime(timer.time)} left
                    </div>
                    <div className="timer-controls">
                      <button
                        onClick={() => Deleter(index)}
                        className={`timer-button ${
                          timer.isActive ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        {"Delete"}
                      </button>
                    </div>
                    <div className="timer-controls">
                      <button
                        onClick={() => toggleTimer(index)}
                        className={`timer-button ${
                          timer.isActive ? "opacity-100" : "opacity-35"
                        }`}
                      >
                        {timer.isActive ? "Stop" : "Start"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="timer-progress-container">
                  <div
                    className="timer-progress-bar"
                    style={{
                      width: `${
                        ((timer.totalTime - timer.time) / timer.totalTime) * 100
                      }%`,
                    }}
                  />
                  <div
                    className="timer-progress-marker"
                    style={{
                      right: `${(timer.time / timer.totalTime) * 102}%`,
                    }}
                  />
                  <div className="timer-time absolute left-5 bottom-2 text-[40px] font-bold text-white">
                    {formatTime(timer.totalTime - timer.time)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
      <motion.div
        className="input-container flex w-full p-2 bg-[#ddd] rounded-full shadow-md bg-gradient-to-l from-[#ddd] to-[#333] font-bold"
        variants={fadeUpAnimationVariant}
        transition={{ duration: 0.4, delay: timers.length * 0.1 + 0.2 }}
      >
        <input
          type="text"
          value={inputLabel}
          onChange={(e) => setInputLabel(e.target.value)}
          placeholder="Enter label"
          className="input-label grow bg-[#f8f8f8]"
        />
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Enter time in minutes"
          className="input-time rounded-full grow bg-[#f8f8f8]"
        />
        <button
          onClick={addTimer}
          className="add-timer-button rounded-full grow"
        >
          Add Timer
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CountdownTimer;
