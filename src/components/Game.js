/* eslint-disable no-eval */
import React, { useState, useRef, useEffect } from "react";

const Game = ({ setStart }) => {
  const [value, setValue] = useState("");
  const [time, setTime] = useState(15);
  const [reverseTime, setReverseTime] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledNext, setIsDisabledNext] = useState(true);
  const [x1, setX1] = useState(Math.floor(Math.random() * 1000));
  const [x2, setX2] = useState(Math.floor(Math.random() * 1000));
  const [index, setIndex] = useState(1);
  const [res, setRes] = useState("");

  const operationss = ["*", "+"];

  const handleExit = () => {
    setStart(false);
    setValue("");
  };

  const handleEnterAsSubmit = (e) => {
      if(e.keyCode === 13){
        handleSubmitAnswer();
      }
  }

  const handleSubmitAnswer = () => {
    if (value.length) {
      let answer = String(eval(`${x1}${operationss[index]}${x2}`));
      if(answer === value && time <=0){
        setIsDisabledNext(false)
      }
      if (answer === value) {
        setRes("correct!");
        setIsDisabled(true);
      } else {
        setRes("wrong!");
      }
    } else {
      alert("Please write your answer");
      return;
    }
  };

  const handleNextQuestion = (e) => {
    e.preventDefault();
    setIndex(1);
    setX1(Math.floor(Math.random() * 1000));
    setX2(Math.floor(Math.random() * 1000));
    setTime(15);
    setReverseTime(0);
    setIsDisabled(false);
    setRes("");
    setValue("");
  };

  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
    setTimeout(() => {
      if (time >= 1) {
        setTime((p) => p - 1);
      }
    }, 1000);
  }, [time]);

  useEffect(() => {
    setTimeout(() => {
      if (reverseTime <= 14) {
        setReverseTime((p) => p + 1);
      }
    }, 1000);
  }, [reverseTime]);

  useEffect(() => {
    if (time <= 0) {
      setIsDisabled(true);
      setIsDisabledNext(false);
    }
  }, [time]);

  return (
    <div>
      <button
        onClick={handleExit}
        style={{ fontSize: "30px", padding: "5px 40px 5px 40px" }}
        type="button"
        className="btn btn-danger btn-lg mb-5"
      >
        Exit
      </button>

      <div></div>

      <div className="mt-3">
        <h1>
          {x1} {operationss[index]} {x2} = ?
        </h1>
        <h1 className="form-text">
          {res}
          {!res.length &&
            time <= 0 &&
            `The answer was: ${eval(`${x1}${operationss[index]}${x2}`)}`}
        </h1>
        <p className="form-text">
          {((!res.length && time <= 0) || (res === "correct!") || (res === "wrong!" && time <= 0)) &&
            "please click 'Next' button"}
        </p>
        <label htmlFor="number" className="form-label">
          Answer
        </label>
        <input
          disabled={isDisabled}
          ref={ref}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
          id="number"
          className="form-control"
          aria-describedby="answerHelper"
          autoComplete="none"
          onKeyUp={handleEnterAsSubmit}
        />
        <div id="answerHelper" className="form-text">
          Calculate above numbers and write answer, answer must be in numbers
        </div>
        <button
          disabled={isDisabled}
          onClick={handleSubmitAnswer}
          style={{ fontSize: "30px", padding: "5px 40px 5px 40px" }}
          type="button"
          className="btn btn-primary btn-lg m-3"
        >
          Submit
        </button>
        <button
          onClick={handleNextQuestion}
          style={{ fontSize: "30px", padding: "5px 40px 5px 40px" }}
          type="button"
          className="btn btn-success btn-lg m-3"
          disabled={isDisabledNext}
        >
          Next
        </button>
      </div>
      <div className="mt-5">
        <p>{time}</p>
        <div className="progress">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${Math.round(reverseTime * 6.6667)}%` }}
            aria-valuenow={Math.round(reverseTime * 6.6667)}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Game;
