// variables
let myLibrary = []

const bForm = document.getElementById('bForm')
const tableBody = document.getElementById('tableBody')

// Add event

bForm.addEventListener('submit', addBookToLibrary)
document.addEventListener("DOMContentLoaded", renderLibrary(myLibrary))


class Book {
    constructor(bTitle, bDescription, bNumber, bAuthor, bGenre, bStatus) {
        this.bTitle = bTitle
        this.bDescription = bDescription
        this.bNumber = bNumber
        this.bAuthor = bAuthor
        this.bGenre = bGenre
        this.bStatus = bStatus
    }
}

// Submit book information
function addBookToLibrary(e) {
    e.preventDefault()

    const bTitle = document.getElementById('bTitle').value
    const bDescription = document.getElementById('bDescription').value
    const bNumber = document.getElementById('bNumber').value
    const bAuthor = document.getElementById('bAuthor').value
    const bGenre = document.getElementById('bGenre').value
    const bStatus = document.getElementById('bStatus').value

    let book = new Book(bTitle, bDescription, bNumber, bAuthor, bGenre, bStatus)

    myLibrary.push(book)
    renderLibrary(myLibrary)
}

// Render the submit book to view
function renderLibrary(myLibrary) {
    tableBody.innerHTML = ''
    if (myLibrary.length != 0) {
        myLibrary.forEach((function (book, index) {
            template =
                `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${book.bTitle}</td>
                <td>${book.bDescription}</td>
                <td>${book.bNumber}</td>
                <td>${book.bAuthor}</td>
                <td>${book.bGenre}</td>
                <td>${book.bStatus}</td>
            </tr>
            `
            tableBody.innerHTML += template
        }))
    }
}