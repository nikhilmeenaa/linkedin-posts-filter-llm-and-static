import { useEffect, useState } from "react";

export const useApp = () => {
  const [color, setColor] = useState("");

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
  return { color, userClick, setColor };
};
