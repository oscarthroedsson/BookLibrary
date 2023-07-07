let addBook = document.getElementById("addBook-el");
let dontAddBook = document.getElementById("noAddBook");
let form = document.getElementById("form-el");
let bookGrid = document.getElementById("bookGrid");
const library = [];
//Open addbook window

addBook.addEventListener("click", () => {
  showInputWindow();
});

dontAddBook.addEventListener("click", () => {
  removeInputWindow();
  clearInputField();
});

function removeInputWindow() {
  form.style.display = "none";
  dontAddBook.style.display = "none";
  addBook.style.display = "flex";
  bookGrid.style.display = "flex";
}

function showInputWindow() {
  form.style.display = "flex";
  dontAddBook.style.display = "flex";
  addBook.style.display = "none";
}

// -------------------   CLEAN THE INPUTFIELD  -------------------
function clearInputField() {
  const inputForm = document.getElementById("form-el");
  inputForm.querySelectorAll("input").forEach((inputField) => {
    inputField.value = "";
  });
}

// -------------------   CREATE A BOOK  -------------------
// function Book(title, author, pages, description, isRead) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.description = description;
//   this.isRead = isRead;
// }
// ------------------- CHANGED FROM CONSTRUCTOR FUNCTION TO CLASS -------------------

class Book {
  constructor(title, author, pages, description, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.isRead = isRead;
  }
}

// -------------------   READ INPUT OF ADDBOOK   -------------------
const submitBtn = document.getElementById("submitBook");
form.addEventListener("submit", function (e) {
  removeInputWindow();
  addBookToLibrary();
  e.preventDefault();
});

function getBookFromInput() {
  const title = document.getElementById("titleBook").value;
  const author = document.getElementById("authorBook").value;
  const pages = document.getElementById("pagesBook").value;
  const description = document.getElementById("descriptionBook").value;
  const isRead = document.getElementById("isReadBook").checked;

  return new Book(title, author, pages, description, isRead);
}

// -------------------   DISPLAY BOOK -------------------

function displayLibrary() {
  cleanGrid();
  library.forEach((book, index) => {
    createBookCard(book, index);
  });

  clearInputField();
}

// -------------------   ADD BOOK TO LIBRARY   -------------------
function addBookToLibrary() {
  const book = getBookFromInput();
  library.push(book);
  displayLibrary();
}

function cleanGrid() {
  bookGrid.innerHTML = "";
}

// -------------------   CREATE A BOOKCARD   -------------------
function createBookCard(book, index) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("h2");
  const bookInfo = document.createElement("div");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookDescription = document.createElement("p");
  const bookIsRead = document.createElement("button");
  const btnContainerBook = document.createElement("div");
  const deleteCardBtn = document.createElement("img");

  bookCard.classList.add("bookCard");
  bookInfo.classList.add("bookInfo");
  deleteCardBtn.src = "trashcan.svg";
  deleteCardBtn.dataset.index = index;

  bookTitle.textContent = `"${book.title}"`;
  bookAuthor.textContent = `"${book.author}"`;
  bookPages.textContent = `"${book.pages}"`;
  bookDescription.textContent = `"${book.description}"`;
  bookIsRead.textContent = `"${book.isRead}"`;

  // -------------------   Delete specifik card  -------------------
  deleteCardBtn.addEventListener("click", (e) => {
    let indexOfCard = e.target.dataset.index;
    if (indexOfCard > -1) {
      library.splice(indexOfCard, 1);
      displayLibrary();
    } else {
      console.log("couldn't find any card");
    }
  });

  // -------------------   Appened card  -------------------
  bookGrid.appendChild(bookCard);
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookInfo);
  bookInfo.appendChild(bookAuthor);
  bookInfo.appendChild(bookPages);
  bookCard.appendChild(bookDescription);
  bookCard.appendChild(btnContainerBook);
  btnContainerBook.append(bookIsRead);
  btnContainerBook.appendChild(deleteCardBtn);
}
