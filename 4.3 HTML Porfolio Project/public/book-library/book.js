class Book {
  constructor(title, author, year, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = read;
  }
  toggleRead() {
    this.read = !this.read;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeStorage() {}

  static displayBooks() {
    const books = Library.books;
    let ui = new UI();

    books.forEach((book) => {
      ui.displayBook(book);
    });
    // console.log(books);
  }
}

class Library {
  static books = Store.getBooks();

  static addBook(book) {
    this.books.push(book);
  }

  static deleteBook(book) {
    this.books.forEach((lib, index) => {
      if (lib.title === book.title) {
        Library.books.splice(index, 1);
      }
    });
    return Library.books;
  }

  static getBooks() {
    Library.books.forEach((book) => {
      console.log(Library.books, book);
      return book;
    });
  }
}

class UI {
  constructor() {
    this.title = document.getElementById("title");
    this.author = document.getElementById("author");
    this.year = document.getElementById("year");
    this.read = document.getElementById("read-box");
    this.bookForm = document.getElementById("book-form");
    this.bookList = document.getElementById("book-list");
    this.submitBtn = document.getElementById("submit");
    this.addBookBtn = document.getElementById("new-book");
  }

  displayBook(book) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><div class="form-check form-switch"><input class="form-check-input read-switch" type="checkbox" role="switch" ${
        book.read ? "checked" : ""
      }></div></td>
      <td><button id="delete" type="button" class="btn btn-danger btn-sm">Delete</button></td>
    `;
    this.bookList.appendChild(row);
  }

  addBook(book) {}

  deleteBook(target) {}

  clearFields() {
    this.title.value = "";
    this.author.value = "";
    this.year.value = "";
    this.read.checked = false;
  }
}

// Display books on Document load
document.addEventListener("DOMContentLoaded", Store.displayBooks);

// Add New Book Event Listener
document.getElementById("book-form").addEventListener("submit", (e) => {
  let ui = new UI();

  // Make a book object from input
  const book = new Book(
    ui.title.value,
    ui.author.value,
    ui.year.value,
    ui.read.checked
  );

  // Push new book to book library
  Library.addBook(book);

  // Clear input fields
  ui.clearFields();

  // Store book in local storage
  Store.addBook(book);

  // Display to UI
  ui.displayBook(book);

  // Toggle book form
  ui.bookForm.classList.toggle("hide");

  // Toggle add book button
  ui.addBookBtn.classList.toggle("hide");

  // Delete Book from library
  // Library.deleteBook(book);

  e.preventDefault();
});

// New book button event listener
document.getElementById("new-book").addEventListener("click", (e) => {
  let ui = new UI();

  // Toggle book form
  ui.bookForm.classList.toggle("hide");

  // Toggle add book button
  ui.addBookBtn.classList.toggle("hide");
  // console.log(e.target);
});

// Delete book event listener
document.getElementById("book-list").addEventListener("click", function (e) {
  if (e.target.id === "delete") {
    e.target.parentNode.parentNode.remove();
  }
});
