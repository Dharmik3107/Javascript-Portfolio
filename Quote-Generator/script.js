//DOM Nodes
const quoteNode = document.getElementById("quote");
const authorNode = document.getElementById("author");
const newQuoteNode = document.getElementById("new-quote");
const twitterNode = document.getElementById("twitter");
const copyNode = document.getElementById("copy");

//Helper functions

function randomNumber() {
  return Math.floor(Math.random() * 8262);
} //Generate Random Number

function tweetQuote() {
  const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteNode.textContent} ${authorNode.textContent}`;
  window.open(TWITTER_URL, "_blank");
} //Tweet the quote

function copyToClipboard() {
  const text = `${quoteNode.textContent} - ${authorNode.textContent}`;
  navigator.clipboard.writeText(text).catch((error) => {
    console.error(error);
  });
} //Copy to Clipboard

//API Handling
async function getQuote() {
  const API_URL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(API_URL, {
      method: "GET",
    });
    const data = await response.json();
    const number = randomNumber();
    const quote = data[number];
    return quote;
  } catch (error) {
    console.error(error.message);
  }
}

//Data Processing
async function main() {
  try {
    const randomQuote = await getQuote();
    quoteNode.innerText = randomQuote.text;
    authorNode.innerText = `- ${
      randomQuote.author ? randomQuote.author : "Unknown"
    }`;
  } catch (error) {
    console.error(error);
  }
}

main();

//Event Handlers
newQuoteNode.addEventListener("click", main);
twitterNode.addEventListener("click", tweetQuote);
copyNode.addEventListener("click", copyToClipboard);
