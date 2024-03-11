const displayPw = document.querySelector(".displayPw");
const createPw = document.querySelector(".createPw");

let letters =
  "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z a b c d e f g h i j k l m n o p q r s t u v w x y z 1 2 3 4 5 6 7 8 9 0 ! @ # $ % ^ & * ( ) _ - + = ? / { } [ ]";

letters = letters.split(" ");

createPw.addEventListener("click", () => {
  console.log("Clicking");
});

function randomVal() {
  return Math.floor(Math.random() * letters.length);
}

function randomLetter(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const makePass = () => {
  let password = "";

  for (let i = 0; i < 10; i++) {
    password += randomLetter(letters);
  }
  return password;
};

console.log(makePass());
