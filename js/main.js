'use strict';

const cartButton = document.querySelector('#cart-button'),
  modal = document.querySelector('.modal'),
  closeBtn = document.querySelector('.close'),

  authBtn = document.querySelector('.button-auth'),
  modalAuth = document.querySelector('.modal-auth'),
  closeAuth = document.querySelector('.close-auth'),

  logInForm = document.querySelector('#logInForm'),
  loginInput = document.querySelector('#login'),
  passwordInput = document.querySelector('#password'),
  loginBtn = document.querySelector('.button-login'),

  userName = document.querySelector('.user-name'),
  outBtn = document.querySelector('.button-out');

  let login = localStorage.getItem('logDelivery');


const toggleModal = () => modal.classList.toggle('is-open');
const toggleModalAuth = () => modalAuth.classList.toggle('is-open');


const authorized = () => {

  const logOut = () => {
    login = null;
    localStorage.removeItem('logDelivery');
    authBtn.style.display = '';
    outBtn.style.display = '';
    userName.style.display = '';
    passwordInput.value = '';

    outBtn.removeEventListener('click', logOut);

    checkAuth();
  };

  authBtn.style.display = 'none';
  outBtn.style.display = 'flex';
  userName.style.display = 'inline';
  userName.textContent = login;

  outBtn.addEventListener('click', logOut);
};

const notAuthorized = () => {

  const logIn = (event) => { 
    event.preventDefault();

    if(loginInput.value === '') {
      loginInput.style.borderColor = 'red';
      setTimeout(() => loginInput.style.borderColor = '', 500);

      } else {
        login = loginInput.value;

        localStorage.setItem('logDelivery', login);
        toggleModalAuth();

        authBtn.removeEventListener('click', toggleModalAuth);
        closeAuth.removeEventListener('click', toggleModalAuth);
        logInForm.removeEventListener('submit', logIn);
        logInForm.reset();

        checkAuth();
        
      } 
  };

  authBtn.addEventListener('click', toggleModalAuth);
  closeAuth.addEventListener('click', toggleModalAuth);
  logInForm.addEventListener('submit', logIn);
};

const checkAuth = () => 
login ? authorized() : notAuthorized();
checkAuth();

cartButton.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
