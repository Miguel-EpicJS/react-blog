import axios from "axios";

import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api")
      .then((res) => res.json())
      .then((d) => setData(d));

    console.log(data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data.message}</p>
      </header>
    </div>
  );
}

export default App;