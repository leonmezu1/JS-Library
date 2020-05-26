/* eslint-disable no-alert */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
// variables
const myLibrary = getMyLibraryLS();
const bForm = document.getElementById("bForm");
const tableBody = document.getElementById("tableBody");
const jumbotron = document.getElementById("emptyLibrary");
const displayLibrary = document.getElementById("displayLibrary");
// Add event
bForm.addEventListener("submit", addBookToLibrary);
document.addEventListener("DOMContentLoaded", renderLibrary(myLibrary));
class Book {
  constructor(bTitle, bDescription, bNumber, bAuthor, bGenre, bStatus) {
    this.bTitle = bTitle;
    this.bDescription = bDescription;
    this.bNumber = bNumber;
    this.bAuthor = bAuthor;
    this.bGenre = bGenre;
    this.bStatus = bStatus;
  }
}
// Submit book information
function addBookToLibrary(e) {
  e.preventDefault();
  const bTitle = document.getElementById("bTitle").value;
  const bDescription = document.getElementById("bDescription").value;
  const bNumber = document.getElementById("bNumber").value;
  const bAuthor = document.getElementById("bAuthor").value;
  const bGenre = document.getElementById("bGenre").value;
  let bStatus = document.getElementById("bStatus").checked;
  bStatus === true ? (bStatus = "Read") : (bStatus = "Not read");
  if (validateEmptiness(bTitle, bDescription, bNumber, bAuthor, bGenre)) {
    const book = new Book(
      bTitle,
      bDescription,
      bNumber,
      bAuthor,
      bGenre,
      bStatus,
    );
    myLibrary.push(book);
    renderLibrary(myLibrary);
    updateMyLibraryLS(myLibrary);
  }
  // Jquery for modal
  $("#bAddBook").modal("toggle");
}
// Render the submit book to view
function renderLibrary(myLibrary) {
  emptyLibrary();
  tableBody.innerHTML = "";
  if (myLibrary.length !== 0) {
    myLibrary.forEach((book, index) => {
      template = `
            <tr>
            <th scope="row">${index + 1}</th>
                <td>${book.bTitle}</td>
                <td>${book.bDescription}</td>
                <td>${book.bNumber}</td>
                <td>${book.bAuthor}</td>
                <td>${book.bGenre}</td>
                <td><button type="button" class="btn btn-outline-primary read-btn" data-btn="${index}">${
  book.bStatus
}</button></td>
                <td align='center'><a href="#"><i class="fas fa-trash-alt" data-trash="${index}"></i></a></td>
            </tr>
            `;
      tableBody.innerHTML += template;
    });
  }
  clickReadBtn();
  clickTrashBtn();
}
// Empty library
function emptyLibrary() {
  if (myLibrary.length !== 0) {
    jumbotron.classList.add("d-none");
    jumbotron.classList.remove("d-block");
    displayLibrary.classList.remove("d-none");
    displayLibrary.classList.add("d-block");
  } else {
    jumbotron.classList.add("d-block");
    jumbotron.classList.remove("d-none");
    displayLibrary.classList.remove("d-block");
    displayLibrary.classList.add("d-none");
  }
}
// Read toggle
function clickReadBtn() {
  const readBtns = document.getElementsByClassName("read-btn");
  Array.prototype.forEach.call(readBtns, (element) => {
    element.addEventListener("click", () => {
      if (element.innerHTML === "Read") {
        myLibrary[element.dataset.btn].bStatus = "Not Read";
        element.innerHTML = "Not Read";
      } else if (element.innerHTML === "Not Read") {
        myLibrary[element.dataset.btn].bStatus = "Read";
        element.innerHTML = "Read";
      }
      updateMyLibraryLS(myLibrary);
      renderLibrary(myLibrary);
    });
  });
}
// Delete a book from the library
function clickTrashBtn() {
  const trashBtns = document.getElementsByClassName("fa-trash-alt");
  Array.prototype.forEach.call(trashBtns, (element) => {
    element.addEventListener("click", () => {
      myLibrary.splice(element.dataset.trash, 1);
      updateMyLibraryLS(myLibrary);
      renderLibrary(myLibrary);
    });
  });
}
function updateMyLibraryLS(myLibrary) {
  localStorage.setItem("myLibrary", JSON.stringify([]));
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}
function getMyLibraryLS() {
  if (localStorage.getItem("myLibrary") === null) {
    var myLibrary = [];
  } else {
    var myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  }
  return myLibrary;
}
function validateEmptiness(bTitle, bDescription, bNumber, bAuthor, bGenre) {
  let enable = false;
  if (
    bTitle !== ""
    && bAuthor !== ""
    && bDescription !== ""
    && bNumber !== ""
    && bGenre !== ""
  ) {
    enable = true;
  } else {
    alert("You must fill the required fields");
  }
  return enable;
}
