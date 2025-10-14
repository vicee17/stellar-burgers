/// <reference types="cypress" />

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    // Перехват запроса на ингредиенты с моковыми данными
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    // Перехват запроса на создание заказа
    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json'
    }).as('createOrder');

    cy.intercept('GET', '/api/auth/user', {
      fixture: 'user.json' 
    }).as('getUser');

    // Подготовка токенов авторизации
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', 'mock_refresh_token');
      win.document.cookie = 'accessToken=mock_access_token';
    });

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // Очистка токенов после теста
    cy.window().then((win) => {
      win.localStorage.removeItem('refreshToken');
      win.document.cookie =
        'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  });

  it('добавление ингредиента из списка в конструктор', () => {
    // Добавление булки
    cy.get('[data-cy="bun"]').contains('Добавить').click();
    cy.get('[data-cy="bun-price-top"]').contains('Краторная булка');
    cy.get('[data-cy="bun-price-bottom"]').contains('Краторная булка');

    // Добавление начинки
    cy.get('[data-cy="main"]').contains('Добавить').click();
    cy.get('[data-cy="main-price"]').contains(
      'Филе Люминесцентный вегетарианский'
    );
  });

  it('работа модальных окон: открытие и закрытие', () => {
    // Открытие модального окна ингредиента
    cy.get('[data-cy=ingredient]').eq(0).click();
    cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');

    //Закрытие по клику на крестик
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal-title"]').should('not.exist');

    // Закрытие по клику на оверлей
    cy.get('[data-cy=ingredient]').eq(0).click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal-title"]').should('not.exist');
  });

  it('создание заказа', () => {
    // Добавление ингредиентов в конструктор
    cy.get('[data-cy="bun"]').contains('Добавить').click();
    cy.get('[data-cy="main"]').first().click();

    // Клик по кнопке "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');

    // Проверка модального окна с номером заказа
    cy.get('[data-cy="order-modal"]').should('exist');
    cy.get('[data-cy="order-number"]').should('contain', '034536');

    // Закрытие модального окна
    cy.get('[data-cy="order-close"]').click();
    cy.get('[data-cy="order-modal"]').should('not.exist');

    // Проверка очистки конструктора
    cy.get('[data-cy="bun-price-top"]').should('not.exist');
    cy.get('[data-cy="bun-price-bottom"]').should('not.exist');
    cy.get('[data-cy="main-price"]').should('not.exist');
  });
});
