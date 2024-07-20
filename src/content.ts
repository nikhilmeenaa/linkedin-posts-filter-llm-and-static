// import { clear } from "console";

// const parentElement = document.getElementsByClassName(
//   "scaffold-finite-scroll__content"
// )[0] as HTMLElement;
// console.log(parentElement);

// chrome.runtime.sendMessage({ greeting: "Hello from content script" });

const userClick = async () => {
  //   const [currentTab] = await chrome.tabs.query({ active: true });
  //   chrome.scripting.executeScript({
  //     target: { tabId: currentTab.id! },
  //     func: () => {
  const posts = document.getElementsByClassName("artdeco-card");
  console.log("color in content");
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
  // },
  //   });
};

// parentElement.addEventListener("mousemove", userClick);
document.body.addEventListener("mousemove", userClick);
