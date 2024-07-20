import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [color, setColor] = useState("");

  chrome.runtime.onMessage.addListener(
    (
      message: any,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: any) => void
    ) => {
      console.log("Message from content script:", message);
      sendResponse({ farewell: "Goodbye from service worker" });
    }
  );

  const userClick = async () => {
    const [currentTab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id! },
      args: [color],
      func: (color) => {
        const posts = document.getElementsByClassName("artdeco-card");
        console.log("color", color);
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i] as HTMLElement;
          // post.style.backgroundColor = "red";
          // post.style.border = "1px solid red";
          // post.style.display = "none";
          const text = (post.textContent || "")?.toLocaleLowerCase();
          if (!text.includes("hiring")) {
            post.style.display = "none";
            console.log("Not a hiring post");
          }
        }
      },
    });
  };

  const parentElement = document.getElementsByClassName(
    "scaffold-finite-scroll__content"
  )[0];

  console.log({ parentElement });

  // const observer = new MutationObserver(userClick);

  // const config = { childList: true };

  // observer.observe(parentElement, config);

  // class="scaffold-finite-scroll__content"

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
