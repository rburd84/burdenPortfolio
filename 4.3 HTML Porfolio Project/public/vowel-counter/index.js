const button = document.querySelector("button");
const vowelSpan = document.querySelector(".vowels");
const text = document.getElementById("text");
const vowels = ["a", "e", "i", "o", "u"];
let count = 0;

function countVowels(input) {
  for (const val of input) {
    if (vowels.includes(val)) {
      count++;
      console.log(val);
    }
  }
  vowelSpan.textContent = count;
  count = 0;
}

button.addEventListener("click", () => {
  countVowels(text.value);
});
