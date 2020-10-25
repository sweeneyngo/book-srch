// // import { searchBook } from "./scripts/searchBook.js";

// chrome.runtime.onInstalled.addListener(function () {
//   console.log("Hi!");
//   chrome.runtime.onMessage.addListener(function (
//     request,
//     sender,
//     sendResponse
//   ) {
//     console.log(
//       sender.tab
//         ? "from a content script:" + sender.tab.url
//         : "Message was successfully received by the popup."
//     );
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (
//         response
//       ) {
//         response.farewell
//           ? console.log(response.farewell)
//           : console.log("Yikes.");
//       });
//     });
//     return true;
//   });
// });
