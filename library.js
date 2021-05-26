let myLibrary = [];

class Book {
    constructor (title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const form = document.querySelector('.form');
const newBook = document.querySelector('#newBook')
.addEventListener('click', () => {
    form.style.display = 'flex';
});

const removeForm = document.querySelector('#removeForm')
.addEventListener('click', () => {
    form.style.display = 'none';
});

const addBookButton = document.querySelector('#addBook')
.addEventListener('click', addBookToLibrary);

const booksContainer = document.querySelector('.books');

function addBookToLibrary () {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    if (title.value === '' || author.value === '' || pages.value === '') {
        alert('Enter details.');
        return;
    }
    if (parseInt(pages.value) < 1 || parseInt(pages.value) > 9999) {
        alert('Pages should be more than 0 or less than 9999');
        return;
    }
    for (let i = 0; i < myLibrary.length; i++) {
        if (title.value === myLibrary[i].title) {
            alert('The book is already inside the shelf.');
            return;
        }
    }

    const newBook = new Book(title.value, author.value, pages.value, read.checked);
    myLibrary.push(newBook);
    setStorage();

    resetLibrary();
    displayLibrary();
}

function resetLibrary() {
    booksContainer.innerHTML = '';
}

function displayLibrary() {
    //Create added book and show details
    for(let i = 0; i < myLibrary.length; i++) {
    const addedBook = document.createElement('div')
    addedBook.className = 'addedBook';
    addedBook.dataset.index = i;
    booksContainer.appendChild(addedBook);

    const addedTitle = document.createElement('h1')
    addedTitle.textContent = myLibrary[i].title;

    const addedAuthor = document.createElement('h2')
    addedAuthor.textContent = myLibrary[i].author;

    const addedPages = document.createElement('h3')
    addedPages.textContent = `${parseInt(myLibrary[i].pages)} pages`;

    const readContainer = document.createElement('div');
    readContainer.className = 'readContainer';

    const addedRead = document.createElement('p')
    if (myLibrary[i].read === false) addedRead.textContent = 'Have not finished reading.';
    else addedRead.textContent = 'Finished reading.';

    const readButton = document.createElement('input');
    readButton.type = 'checkbox';

    const remove = document.createElement('button');
    remove.textContent = 'x';

    //Append all added details to books section
    addedBook.appendChild(addedTitle);
    addedBook.appendChild(addedAuthor);
    addedBook.appendChild(addedPages);
    addedBook.appendChild(readContainer);
    readContainer.appendChild(addedRead);
    readContainer.appendChild(readButton);
    addedBook.appendChild(remove);

    //readButton Value Changer (Finished reading or Have not finished reading)
    if (myLibrary[i].read === true) readButton.checked = true;
    readButton.addEventListener('click', () => {
        if (readButton.checked === true) {
            addedRead.textContent = 'Finished Reading';
            myLibrary[i].read = true;
        }
        else {
            addedRead.textContent = 'Have Not Finished Reading';
            myLibrary[i].read = false;
        }
        setStorage();
    });

    //Remove Book Function
    remove.addEventListener('click', () => {
        if (parseInt(addedBook.dataset.index) === myLibrary.length) myLibrary.pop();
        else myLibrary.splice(addedBook.dataset.index, 1);
        addedBook.remove();
        setStorage();
    });
    }
}

function setStorage () {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function retrieveStorage () {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
    if (myLibrary === null) myLibrary = [];
    displayLibrary();
}

retrieveStorage();