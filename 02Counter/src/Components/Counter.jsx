import React, { useState } from "react";

const Counter = () => {
  let [Counter, setCounter] = useState(0);

  const addValue = () => {
    setCounter(Counter++);
  };
  const decValue = () => {
    if (Counter > 0) {
      setCounter(Counter--);
    } else {
      alert("Counter value can't go below zero");
    }
  };

  return (
    <div>
      <h1>Counter game</h1>
      <h2>Counter Value: {Counter}</h2>

      <button onClick={addValue}>Add value</button>
      <br />
      <button onClick={decValue}>Decrease Value</button>
    </div>
  );
};

export default Counter;
