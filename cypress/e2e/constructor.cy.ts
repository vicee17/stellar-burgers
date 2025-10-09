/// <reference types="cypress" />

describe('Страница конструктора бургера', () => {
  beforeEach(() => {
    // Перехват запроса на ингредиенты с моковыми данными
    cy.intercept('GET', '/api/ingredients', {
      fixture: 'ingredients.json',
    }).as('getIngredients');

    // Перехват запроса на создание заказа
    cy.intercept('POST', '/api/orders', {
      fixture: 'order.json',
    }).as('createOrder');

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
      win.document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
  });

  it('добавление ингредиента из списка в конструктор', () => {
    // Добавление булки
    cy.get('[data-cy="bun"]').first().click();
    cy.get('[data-cy="bun-price"]').should('exist');

    // Добавление начинки
    cy.get('[data-cy="main"]').first().click();
    cy.get('[data-cy="main-price"]').should('exist');
  });

  it('работа модальных окон: открытие и закрытие', () => {
    // Открытие модального окна ингредиента
    cy.get('[data-cy="bun"]').first().click();
    cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');

    //Закрытие по клику на крестик
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal-title"]').should('not.exist');

    // Закрытие по клику на оверлей
    cy.get('[data-cy="bun"]').first().click();
    cy.get('[data-cy="modal-overlay"]').click();
    cy.get('[data-cy="modal-title"]').should('not.exist');
  });

  it('создание заказа', () => {
    // Добавление ингредиентов в конструктор
    cy.get('[data-cy="bun"]').first().click();
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
    cy.get('[data-cy="bun-price"]').should('not.exist');
    cy.get('[data-cy="main-price"]').should('not.exist');
  });
});