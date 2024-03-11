// import players from "./players";
import { players } from "./players.js";
import { trivia, teamsList, NBATeams } from "./questions.js";

const display = document.querySelector(".display-screen");
const optionBtns = document.querySelectorAll(".option__btn");

// TODO
// Retrieve question data (fetch)
async function fetchData(url) {
  const res = await fetch(url);
  const data = await res.json();
  // console.log(res.body);
  // console.log(data.trivia);
  return data;
}

const showTeams = await fetchData("../db copy.json");
// console.log(showTeams);
// console.log(showTeams.players);
debugger;
let { eastern, western } = showTeams.teams;
// let east = Object.values(teams.eastern);
let { atlantic, central, southeast } = eastern;
let { northwest, pacific, southwest } = western;
let squads = [];

// Return All Teams In Database
function getAllTeams() {
  let teams = [];

  for (const val of Object.values(eastern)) {
    for (const team of val) {
      teams.push(team);
    }
  }

  for (const val of Object.values(western)) {
    for (const team of val) {
      teams.push(team);
    }
  }

  return teams;
}

// Return Single Team
function getTeam(id) {
  let teams = getAllTeams();
  return teams.filter(t => t.id === id);
}

console.log(getTeam("7agg7ej82cLU1F7KJ9CO"));
console.log(...atlantic, ...southwest);

// Should be a question selected randomly from an array of question data objects
// Question data should be object
// const quiz = {
//   question: "Which NBA player is the current all time leading scorer?",
//   answer: "Lebron James",
//   fact: "",
// }

// TODO
/* Create an array with the correct answer(player) and 
   three additional choices and use this array to create buttons */

// TODO
/* Create a button to start a new game */

// TODO
// TODO

function displayQuestion() {
  const triviaQuest = randomData(trivia);
  display.textContent = triviaQuest.question;
  console.log(triviaQuest.question);
}

// Return a random data point from list of data
// Number, Array or Object
function randomData(arr) {
  return arr[randomNumber(arr.length)];
}

function randomNumber(val) {
  return Math.floor(Math.random() * val);
}

function renderButtons(choicesArray, correctAnswer) {
  function buttonHandler(e) {}
}

// Function to retrieve a list of n player names
function getMultipleChoices(n, correctAnswer, array) {
  let choices = [];
  choices.push(correctAnswer);

  while (choices.length < n) {
    const player = randomData(array);

    if (!choices.includes(player)) {
      choices.push(player);
    }
  }
  return shuffleArray(choices);
}

// Fisher-Yates algorithm to shuffle array
const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // const temp = array[i];
    // array[i] = array[j];
    // array[j] = temp;
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

function randomPassword() {
  return (
    Math.random().toString(36).slice(2) +
    Math.random().toString(36).toUpperCase().slice(2)
  );
}

let teamsJson = teamsList.map((team, idx) => {
  return { id: idx + 1, name: team };
});

let jsonString = JSON.stringify(teamsJson);

// console.log(teamsList);
// console.log(teamsJson);
// console.log(jsonString);

// console.log(randomData(players));
// console.log(getMultipleChoices(5, "Kevin Garnett", players));
