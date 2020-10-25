const puppeteer = require("puppeteer");
const fs = require("fs");

let bookTitle = "1984";
// Turn bookTitle into parseable phrase
let parseableTitle = bookTitle.split(" ").join("+");
let bookAuthor = "George Orwell";

(async () => {
  await puppeteer.connect(chrome);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://bookdepository.com");
  await page.type(".text-input", bookTitle);
  await page.click(".header-search-btn"); // Cli/*{ headless: false }*/cks the search button

  await browser.waitForTarget(
    (target) =>
      target.url() ===
      `https://www.bookdepository.com/search?searchTerm=${parseableTitle}&search=Find+book`
  );

  await page
    .waitForSelector(".search-page")
    .then(() => console.log("Continue?"));

  const example = await page.evaluate(() => {
    let searchMap = document.querySelectorAll(".book-item > .item-info");

    let gallery = [];

    Array.from(searchMap).forEach((searchQuery) => {
      let bookTitle = "1984";
      let bookAuthor = "George Orwell";

      // Check if query's title and author matches user input
      let checkTitle = searchQuery.children["0"].textContent.trim("");
      let checkAuthor = searchQuery.children["1"].textContent.trim("");

      // If there's no match, go to the next query
      if (checkTitle !== bookTitle || checkAuthor !== bookAuthor) {
        return;
      }

      let bookJSON = new Map(); //to convert bookInfo to map

      // create new temporary array to store single book info
      let bookInfo = [];

      // store link to book to array
      bookInfo.push(["url", searchQuery.children["0"].children[0].href]);

      Array.from(searchQuery.children).forEach((searchPage) => {
        // Iterate through the book information and push it into an array
        bookInfo.push([
          searchPage.className,
          searchPage.textContent.trim("").split("\n")[0], // remove whitespace, and everything after final price
        ]);
      });

      // Remove the US$ next to the pricetag
      bookInfo[bookInfo.length - 1][1] = bookInfo[
        bookInfo.length - 1
      ][1].replace("US$", "");

      // Write each item (title, author .. etc.) into a map for JSON access
      bookInfo.forEach((item) => {
        bookJSON[item[0]] = item[1];
      });

      gallery.push(bookJSON);
    });

    return gallery;
  });

  fs.writeFile("./json/books.json", JSON.stringify(example), (err) => {
    err
      ? console.error("Data not written!", err)
      : console.log("Data written!");
  });

  await browser.close();
})();
