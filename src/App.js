import React, { useState } from "react";
import "./App.css";
import Entering from "./components/Entering";
import Game from "./components/Game";
import NewLoader from "./components/NewLoader";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [loader, setLoader] = useState(true);
  const [start, setStart] = useState(false);

  setTimeout(() => {
    setLoader(false);
  }, 500);

  return (
    <div className="App">
      <header className="App-header">
        {loader ?
         (<NewLoader />) 
        :
         (
          start ? 
          <Game
          setStart={setStart}
          />
          :
          <Entering
           setStart={setStart} 
          />
          )}
      </header>
    </div>
  );
}

export default App;
