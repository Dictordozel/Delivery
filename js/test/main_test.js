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
  outBtn = document.querySelector('.button-out'),

  cardsRestaurants = document.querySelector('.cards-restaurants'),
  containerPromo = document.querySelector('.container-promo'),
  restaurants = document.querySelector('.restaurants'),
  menu = document.querySelector('.menu'),
  logo = document.querySelector('.logo'),
  cardsMenu = document.querySelector('.cards-menu');

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
    cartButton.style.display = 'none';

    restaurants.classList.remove('hide');
    containerPromo.classList.remove('hide');
    menu.classList.add('hide');

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

    if(loginInput.value.trim() === '') {
      loginInput.style.borderColor = 'red';
      setTimeout(() => loginInput.style.borderColor = '', 500);

      } else {
        login = loginInput.value;
        localStorage.setItem('logDelivery', login);
        cartButton.style.display = 'flex';
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

const createCardsRestaurants = () => {

  const card = `
    <a class="card card-restaurant">
      <img src="img/tanuki/preview.jpg" alt="image" class="card-image"/>
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">Тануки</h3>
          <span class="card-tag tag">60 мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
            4.5
          </div>
          <div class="price">От 1 200 ₽</div>
          <div class="category">Суши, роллы</div>
        </div>
      </div>
    </a>
  `;

  cardsRestaurants.insertAdjacentHTML('beforeend', card);
};

const addToCart = (event) => {
    if(login) {
      const target = event.target.closest('.button-add-cart');
      console.dir(target);
    } else {
      toggleModalAuth();
    }
};

const createCardGoods = () => {

  const getRestaurantData = (data) => {
    data.forEach((item) => {
      const { id, name, description, price, image } = item;
      const card = document.createElement('div');
      card.className = 'card';
      card.insertAdjacentHTML('beforeend', `
        <img src=${image} alt="image" class="card-image"/>
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>
          <div class="card-info">
            <div class="ingredients">${description}</div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      `);
      cardsMenu.insertAdjacentElement('beforeend', card);
      card.addEventListener('click', addToCart); 
    });  
  };
  
  const getData = () => {
    const restaurantName = 'db/tanuki.json';
  
  fetch(restaurantName)
    .then(resp => resp.json())
    .then(data => getRestaurantData(data));
  };
  
  getData();
 
};

const openGoods = (event) => {
  const target = event.target;
  const restaurant = target.closest('.card-restaurant');
  if(restaurant) {
    if(login) {
      cartButton.style.display = 'flex';
      cardsMenu.textContent = '';
      restaurants.classList.add('hide');
      containerPromo.classList.add('hide');
      menu.classList.remove('hide');

      createCardGoods();

    } else {
      toggleModalAuth();
    }  
  }  
};

 
cartButton.addEventListener('click', toggleModal);

closeBtn.addEventListener('click', toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', () => {
  restaurants.classList.remove('hide');
  containerPromo.classList.remove('hide');
  menu.classList.add('hide');
});


checkAuth();

createCardsRestaurants();
createCardsRestaurants();
createCardsRestaurants();