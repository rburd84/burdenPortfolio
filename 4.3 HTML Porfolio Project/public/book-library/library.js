// Libray of Books
let myLibrary = [
  // { title: "Success", author: "Dave Rivers", year: 2012, read: false },
  // { title: "Being Great", author: "Marcus Frank", year: 2018, read: true },
  // { title: "No Complaints", author: "Lance Greer", year: 2007, read: false },
];

// Book Constructor
function Book(title, author, year, read) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.read = read;

  return { title, author, year, read };
}

// Book Instance
const book1 = Book("Winners", "Marvin Jakes", 2017, false);
// console.log(book1);

// Add Book to Library
function addBookToLibrary(book) {
  // Has to take user input
  myLibrary.push(book);
  // Store user input into book array
}

const paint = book => {
  const list = document.getElementById("book-list");
  book.forEach(bk => {
    const row = document.createElement("tr");
    row.className = "line";
    // console.log(row);

    const title = document.createElement("td");
    const author = document.createElement("td");
    const year = document.createElement("td");
    const read = document.createElement("td");
    const btn = document.createElement("td");
    title.textContent = `${bk.title}`;
    author.innerHTML = `<td>${bk.author}</td>`;
    year.innerHTML = `<td>${bk.year}</td>`;
    read.innerHTML = `<div class="form-check form-switch">
      <input class="form-check-input read-switch" type="checkbox">
      <label class="form-check-label" for="read-switch">${bk.read}</label>
      </div>`;
    btn.innerHTML = `<td><button type="button" class="btn btn-danger btn-sm">Delete</button></td>`;
    // row.textContent = "";
    list.appendChild(row);
    row.appendChild(title);
    row.appendChild(author);
    row.appendChild(year);
    row.appendChild(read);
    row.appendChild(btn);
    btn.addEventListener("click", function (e) {
      e.target.parentElement.parentElement.remove();
    });
  });

  document.querySelectorAll(".read-switch").forEach(sw => {
    if (sw.nextElementSibling.textContent === "true") {
      sw.checked = true;
    } else {
      sw.nextElementSibling.textContent === "false";
      sw.checked = false;
    }
  });
};

// create function to toggle status ?
// Add a button to change/flip read status

// Optional
// Place books into local storage
