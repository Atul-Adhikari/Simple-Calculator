let input = document.getElementById("inputBox");
let buttons = document.querySelectorAll(".button");

let string = "";
let arr = Array.from(buttons);
arr.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      string = eval(string);
      input.value = string;
    } else if (e.target.innerHTML == "AC") {
      string = "";
      input.value = string;
    } else if (e.target.innerHTML == "DEL") {
      string = string.substring(0, string.length - 1);
      input.value = string;
    } else {
      string += e.target.innerHTML;
      input.value = string;
    }
  });
});

fetch("https://api.api-ninjas.com/v1/quotes", {
  method: "GET",
  headers: {
    "X-Api-Key": `${API_KEY}`,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data); // Log the API response

    // Update the quotes element with the fetched quote
    const quotes = document.getElementById("quote");
    const author = document.getElementById("author");
    quotes.innerHTML = data[0].quote;
    author.innerHTML = "-" + data[0].author;
  })
  .catch((error) => {
    console.error("Error: ", error.message); // Handle errors
  });
