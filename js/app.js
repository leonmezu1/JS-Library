// variables
var myLibrary = []
var readBtns = document.getElementsByClassName('read-btn')
var trashBtns = document.getElementsByClassName('fa-trash-alt')
const bForm = document.getElementById('bForm')
const tableBody = document.getElementById('tableBody')
const jumbotron = document.getElementById('emptyLibrary')
const displayLibrary = document.getElementById('displayLibrary')



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
    let bStatus = document.getElementById('bStatus').checked
    bStatus === true ? bStatus = 'Read' : bStatus = 'Not read'
    let book = new Book(bTitle, bDescription, bNumber, bAuthor, bGenre, bStatus)

    myLibrary.push(book)
    renderLibrary(myLibrary)

    clickReadBtn()
    clickTrashBtn()
    //Jquery for modal
    $('#bAddBook').modal('toggle');
    // return false;

}

// Render the submit book to view
function renderLibrary(myLibrary) {
    emptyLibrary()
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
                <td><button type="button" class="btn btn-outline-primary read-btn" data-btn="${index}">${book.bStatus}</button></td>
                <td><i class="fas fa-trash-alt text-center" data-trash="${index}"></i></td>
            </tr>
            `
            tableBody.innerHTML += template
        }))
    }
}

// Empty library
function emptyLibrary() {
    if (myLibrary.length != 0) {
        jumbotron.classList.add('d-none')
        jumbotron.classList.remove('d-block')
        displayLibrary.classList.remove('d-none')
        displayLibrary.classList.add('d-block')
    } else {
        jumbotron.classList.add('d-block')
        jumbotron.classList.remove('d-none')
        displayLibrary.classList.remove('d-block')
        displayLibrary.classList.add('d-none')
    }
}

// Read toggle
function clickReadBtn() {
    Array.prototype.forEach.call(readBtns, function (element) {
        element.addEventListener('click', function () {
            if (element.innerHTML === 'Read')  {
                myLibrary[element.dataset.btn].bStatus = 'Not Read'
                element.innerHTML = 'Not Read'
            } else if (element.innerHTML === 'Not Read') {
                myLibrary[element.dataset.btn].bStatus = 'Read'
                element.innerHTML = 'Read'
            }
        })
    })
}

function clickTrashBtn() {
    Array.prototype.forEach.call(trashBtns, function (element) {
        element.addEventListener('click', function () {
            myLibrary.splice(element.dataset.trash, 1)
            console.log(myLibrary)
            renderLibrary(myLibrary)
        })
    })
}
