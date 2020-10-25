// Async receive message from background (popup -> background -> content)
chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name == "scan_port");
  port.onMessage.addListener(function (msg) {
    if (msg.objective == "scan") {
      console.log("Received message!");
      // port.postMessage({ response: "failure" });
      (async () => {
        const src = chrome.runtime.getURL("./scripts/searchBook.js");
        const searchBook = await import(src);
        searchBook.searchBook()
          ? port.postMessage({ response: searchBook.searchBook() })
          : port.postMessage({ response: "failure" });
      })();
    } else {
      return;
    }
  });
  return true;
});
