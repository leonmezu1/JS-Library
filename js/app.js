// variables
let myLibrary = []

const bForm = document.getElementById('bForm')

// Add event

bForm.addEventListener('submit', addBookToLibrary)


class Book {
 constructor (bTitle, bDescription, bNumber, bAuthor, bGenre) {
   this.bTitle = bTitle
   this.bDescription = bDescription
   this.bNumber = bNumber
   this.bAuthor = bAuthor
   this.bGenre = bGenre
 }
}

// Submit book information
function addBookToLibrary (e) {
  e.preventDefault()

  const bTitle = document.getElementById('bTitle').value
  const bDescription = document.getElementById('bDescription').value
  const bNumber = document.getElementById('bNumber').value
  const bAuthor = document.getElementById('bAuthor').value
  const bGenre = document.getElementById('bGenre').value

  let book = new Book(bTitle, bDescription, bNumber, bAuthor, bGenre)
  
  myLibrary.push(book)  
}

// Render the submmit book to view
function renderBook () {
  
}