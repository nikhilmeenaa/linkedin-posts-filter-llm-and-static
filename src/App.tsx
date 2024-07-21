import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { useApp } from "./useApp";

function App() {
  const { color, setColor, userClick } = useApp();

  const navigateToGithubRepo = () => {
    const url =
      "https://github.com/nikhilmeenaa/linkedin-posts-filter-llm-and-static";
    window.open(url, "_blank");
  };

  return (
    <div className="popUp">
      <div className="popUpHeader">LinkedIn Posts Filter</div>
      <div className="contributeSection">
        <div className="contributeSectionHeader">
          Wanna contribute to the code ?
        </div>
        <button
          className="button-63"
          role="button"
          onClick={navigateToGithubRepo}
        >
          <span>Go to repository</span>
          <img src="/github.png" alt="github" />
        </button>
      </div>

      <div className="connection">
        <div className="connectionHeader">Connect with me</div>
        <div className="connectionContents">
          <a href="https://github.com/nikhilmeenaa" target="_blank">
            <img src="/github.png" alt="github" />
          </a>
          <a
            href="https://www.linkedin.com/in/nikhil-meena-8152771a1/"
            target="_blank"
          >
            <img src="/linkedin.png" alt="linkedin" />
          </a>
          <a href="https://www.instagram.com/nikhilkameena/" target="_blank">
            <img src="/instagram.png" alt="instagram" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
