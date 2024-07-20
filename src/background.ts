chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length > 0) {
    chrome.tabs.sendMessage(tabs[0].id!, {
      greeting: "Hello from service worker",
    });
  }
});
