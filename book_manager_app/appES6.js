class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list');

    // Create a new row element
    const newRow = document.createElement('tr');
    // Insert cols
    newRow.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(newRow);
  }

  deleteBook(target) {
    target.parentElement.parentElement.remove();
  }

  showAlert(msg, className) {
    // Create div
    const newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.appendChild(document.createTextNode(msg));
    
    // Get Parent and Form elements
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form');

    // Append alert
    container.insertBefore(newDiv, form);

    // Dismiss after 3 seconds
    setTimeout(function() {
      document.querySelector(`.${className}`).remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI();

    books.forEach(function(book){
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if (book.isbn = isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}


/* Event Listeners */

// DOM Load event
document.addEventListener('DOMContentLoaded', function(){
  Store.displayBooks();
})

// Add book event
document.getElementById('book-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // Instantiate a Book
  const book = new Book(title, author, isbn);

  // Instantiate UI
  const ui = new UI();

  // Validate Input
  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all of the fields', 'error');
  } else {
  // Add book to list
  ui.addBookToList(book);  

  // Add to LS
  Store.addBook(book);

  // Clear input fields
  ui.clearFields();

  ui.showAlert('Book Added Successfully', 'success');
  }
}); 

// Delete book event
document.getElementById('book-list').addEventListener('click', function(e){
  e.preventDefault();
  if (e.target.className === 'delete') {
    const ui = new UI();
    ui.deleteBook(e.target);

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Removed Successfully', 'success');
  }
});