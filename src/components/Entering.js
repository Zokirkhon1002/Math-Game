import React from "react";

const Entering = ({ setStart }) => {
  return (
    <div>
        <h1>Are you good at math?</h1>
        <h1>If your answer is "yes",</h1>
        <h1>Let's try it your self one more!</h1>
      <button
        onClick={()=> setStart(true)}
        style={{ fontSize: "30px", padding: "5px 40px 5px 40px" }}
        type="button"
        className="btn btn-primary btn-lg"
      >
        Start
      </button>
    </div>
  );
};

export default Entering;
