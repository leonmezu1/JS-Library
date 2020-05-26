/* eslint-disable no-var */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-expressions */

// variables

var myLibrary = getMyLibraryLS();
const bForm = document.getElementById('bForm');

// Add event
bForm.addEventListener('submit', addBookToLibrary);
document.addEventListener('DOMContentLoaded', renderLibrary(myLibrary));
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
  const bTitle = document.getElementById('bTitle').value;
  const bDescription = document.getElementById('bDescription').value;
  const bNumber = document.getElementById('bNumber').value;
  const bAuthor = document.getElementById('bAuthor').value;
  const bGenre = document.getElementById('bGenre').value;
  let bStatus = document.getElementById('bStatus').checked;
  // eslint-disable-next-line no-unused-expressions
  bStatus === true ? (bStatus = 'Read') : (bStatus = 'Not read');
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
  $('#bAddBook').modal('toggle');
}

// Read toggle
function clickReadBtn() {
  const readBtns = document.getElementsByClassName('read-btn');
  Array.prototype.forEach.call(readBtns, (element) => {
    element.addEventListener('click', () => {
      myLibrary[element.dataset.btn].bStatus === 'Read'
        ? myLibrary[element.dataset.btn].bStatus = 'Not Read'
        : myLibrary[element.dataset.btn].bStatus = 'Read';
      updateMyLibraryLS(myLibrary);
      renderLibrary(myLibrary);
    });
  });
}
// Delete a book from the library
function clickTrashBtn() {
  const trashBtns = document.getElementsByClassName('fa-trash-alt');
  Array.prototype.forEach.call(trashBtns, (element) => {
    element.addEventListener('click', () => {
      myLibrary.splice(element.dataset.trash, 1);
      updateMyLibraryLS(myLibrary);
      renderLibrary(myLibrary);
    });
  });
}
function updateMyLibraryLS(myLibrary) {
  localStorage.setItem('myLibrary', JSON.stringify([]));
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function getMyLibraryLS() {
  if (localStorage.getItem('myLibrary') === null) {
    myLibrary = [];
  } else {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
  }
  return myLibrary;
}
