const textDate = document.querySelector(".date");
const time = document.querySelector(".time");
const button = document.querySelector("button");
const date = new Date();
let army = false;

const options = {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
};

function printTime() {
  const date = new Date();
  time.textContent = army
    ? date.toLocaleTimeString("en-US", { hour12: false })
    : date.toLocaleTimeString("en-US");
  button.textContent = army
    ? "Switch to Standard Time Format"
    : "Switch to Military Time Format";
}

button.addEventListener("click", () => {
  army = !army;
  console.log("Button clicked");
});

setInterval(() => {
  printTime();
}, 1000);

textDate.textContent = date.toLocaleDateString("en-US", options);
