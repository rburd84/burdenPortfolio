const newBookBtn = document.getElementById("new-book");
const bookForm = document.getElementById("book-form");
const bookList = document.getElementById("book-list");
const title = document.getElementById("title");
const author = document.getElementById("author");
const year = document.getElementById("year");
const read = document.getElementById("read-box");

newBookBtn.addEventListener("click", function (e) {
  bookForm.classList.toggle("hide");
});

document.getElementById("submit").addEventListener("click", function (e) {
  const book = new Book(title.value, author.value, year.value, read.checked);
  console.log(book);
  clearData();
  addBookToLibrary(book);
  bookList.innerHTML = "";
  paint(myLibrary);
  e.preventDefault();
});

function clearData() {
  title.value = "";
  author.value = "";
  year.value = "";
}
