chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.url &&
    !changeInfo.url.startsWith("https://www.linkedin.com/feed")
  ) {
    chrome.tabs.sendMessage(tabId, { action: "cleanup" });
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    function saveData(key: string, value: string[]) {
      chrome.storage.local.set({ [key]: value }, () => {
        console.log(`Data saved: ${key} = ${value}`);
      });
    }
    saveData("filters", ["hiring"]);

    // Code to execute on first install
    console.log("Extension installed for the first time.");
  } else if (details.reason === "update") {
    // Code to execute on update
    console.log("Extension updated from version", details.previousVersion);
  }
});
