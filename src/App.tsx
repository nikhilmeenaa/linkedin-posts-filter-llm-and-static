import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("");
  const userClick = async () => {
    const [currentTab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id! },
      args: [color],
      func: (color) => {
        document.body.style.color = color;
        document.body.style.backgroundColor = "black";
        alert("User has given tapped on the click button");
      },
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input
          type="color"
          onChange={(event) => setColor(event.target.value)}
        />
        <button onClick={userClick}>Click</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
