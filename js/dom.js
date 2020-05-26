/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// DOM scripts
const tableBody = document.getElementById('tableBody');
const jumbotron = document.getElementById('emptyLibrary');
const displayLibrary = document.getElementById('displayLibrary');
const mainContainer = document.getElementById('main-container');

// Render the submit book to view
function renderLibrary(myLibrary) {
  emptyLibrary();
  tableBody.innerHTML = '';
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
                  <td>
                    <button type="button" class="btn btn-outline-primary read-btn" data-btn="${index}">
                      ${book.bStatus}
                    </button>
                  </td>
                  <td align='center'>
                    <a href="#"><i class="fas fa-trash-alt" data-trash="${index}"></i></a>
                  </td>
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
    jumbotron.classList.add('d-none');
    jumbotron.classList.remove('d-block');
    displayLibrary.classList.remove('d-none');
    displayLibrary.classList.add('d-block');
  } else {
    jumbotron.classList.add('d-block');
    jumbotron.classList.remove('d-none');
    displayLibrary.classList.remove('d-block');
    displayLibrary.classList.add('d-none');
  }
}

function validateEmptiness(bTitle, bDescription, bNumber, bAuthor, bGenre) {
  let enable = false;
  if (
    bTitle !== ''
    && bAuthor !== ''
    && bDescription !== ''
    && bNumber !== ''
    && bGenre !== ''
  ) {
    enable = true;
  } else {
    const divNode = document.createElement('div');
    divNode.classList.add('message');
    divNode.innerHTML = 'Please fill the all fields';
    mainContainer.appendChild(divNode);
    setTimeout(() => {
      mainContainer.removeChild(divNode);
    }, 3000);
  }
  return enable;
}