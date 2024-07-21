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
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i] as HTMLElement;
          const text = (post.textContent || "")?.toLocaleLowerCase();
          if (!text.includes("hiring")) {
            post.style.display = "none";
          }
        }
      },
    });
  };
  return { color, userClick, setColor };
};
