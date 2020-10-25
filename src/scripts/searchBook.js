/*

readBookData.js

Reads through the created books.json file, 
and checks the minimum cost of a selected book.
Returns the lowest book to the user, as well as a redirect link for easy access.

*/

// import bookScan from "./bookscan.js";

const fs = require("fs");

export function searchBook() {
  try {
    const data = JSON.parse(
      fs.readFileSync(
        "/home/sweeneyngo/code/chrome-extensions/book-srch/json",
        "utf8"
      )
    );

    let max = Number.MAX_SAFE_INTEGER;
    let url;
    let cost;

    // Look through each book, and check the smallest price.
    data.forEach((book) => {
      // Return the URL, Cost, and update the minimum price.
      if (+book["price-wrap"] < max) {
        max = +book["price-wrap"];
        url = book["url"];
        cost = "$" + book["price-wrap"];
      }
    });

    return cost;
  } catch (err) {
    console.error(err);
    return -1;
  }
}
