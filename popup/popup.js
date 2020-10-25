function scanBook(title, author) {
  const container = document.querySelector("#bookFormContainer");
  const text = document.createElement("h1");
  text.classList.add("locateText");
  text.textContent = `Looking for ${title} by ${author}...`;
  container.appendChild(text);

  function getCurrentTabID(cb) {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, function (tabArray) {
      console.log("Tab id: " + tabArray[0].id);
      cb(tabArray[0].id);
    });
  }

  getCurrentTabID(function (id) {
    console.log("Activated connect.");
    var port = chrome.tabs.connect(id, { name: "scan_port" });
    port.postMessage({ objective: "scan" });
    port.onMessage.addListener(function (msg) {
      if (msg.response == "success") {
        console.log(msg.response);
      } else if (msg.response == "failure") {
        console.log("Scanning failed.");
      } else {
        console.log(msg.response);
      }
    });
  });

  // Send message to background
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, { objective: "scan" }, function (response) {
  //     response.action ? console.log(response.action) : console.log("Yikes.");
  //   });
  // });
}
const submitButton = document.querySelector("#submitButton");
submitButton.addEventListener("click", () => {
  // Grab form input from popup
  const form = document.querySelector("#query");
  const header = document.querySelector("#header");

  const title = form.title.value;
  const author = form.author.value;

  header.classList.add("disabled");
  submitButton.classList.add("disabled");
  form.classList.add("disabled");

  scanBook(title, author);
});
