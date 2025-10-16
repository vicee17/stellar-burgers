/// <reference types="cypress" />

const testUrl = 'http://localhost:4000';

export const SELECTORS = {
  BUN: '[data-cy="bun"]',
  MAIN: '[data-cy="main"]',
  INGREDIENT: '[data-cy="ingredient"]',
  ORDER_BUTTON: '[data-cy="order-button"]',
  ORDER_MODAL: '[data-cy="order-modal"]',
  ORDER_NUMBER: '[data-cy="order-number"]',
  MODAL_CLOSE: '[data-cy="modal-close"]',
  MODAL_TITLE: '[data-cy="modal-title"]',
  MODAL_OVERLAY: '[data-cy="modal-overlay"]',
  BUN_PRICE_TOP: '[data-cy="bun-price-top"]',
  BUN_PRICE_BOTTOM: '[data-cy="bun-price-bottom"]',
  MAIN_PRICE: '[data-cy="main-price"]'
} as const;

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
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');

    cy.visit(testUrl);
  });

  afterEach(() => {
    // Очистка токенов после теста
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('добавление ингредиента из списка в конструктор', () => {
    // Добавление булки
    cy.get(SELECTORS.BUN).contains('Добавить').click();
    cy.get(SELECTORS.BUN_PRICE_TOP).contains('Краторная булка');
    cy.get(SELECTORS.BUN_PRICE_BOTTOM).contains('Краторная булка');

    // Добавление начинки
    cy.get(SELECTORS.MAIN).contains('Добавить').click();
    cy.get(SELECTORS.MAIN_PRICE).contains('Филе Люминесцентный вегетарианский');
  });

  it('работа модальных окон: открытие и закрытие', () => {
    // Открытие модального окна ингредиента
    cy.get(SELECTORS.INGREDIENT).eq(0).click();
    cy.get(SELECTORS.MODAL_TITLE).should('contain', 'Детали ингредиента');

    //Закрытие по клику на крестик
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.MODAL_TITLE).should('not.exist');

    // Закрытие по клику на оверлей
    cy.get(SELECTORS.INGREDIENT).eq(0).click();
    cy.get(SELECTORS.MODAL_OVERLAY).click({ force: true });
    cy.get(SELECTORS.MODAL_TITLE).should('not.exist');
  });

  it('создание заказа', () => {
    // Добавление ингредиентов в конструктор
    cy.get(SELECTORS.BUN).contains('Добавить').click();
    cy.get(SELECTORS.MAIN).first().click();

    // Клик по кнопке "Оформить заказ"
    cy.get(SELECTORS.ORDER_BUTTON).click();
    cy.wait('@createOrder');

    // Проверка модального окна с номером заказа
    cy.get(SELECTORS.ORDER_MODAL).should('exist');
    cy.get(SELECTORS.ORDER_NUMBER).should('contain', '3456');

    // Закрытие модального окна
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.ORDER_MODAL).should('not.exist');

    // Проверка очистки конструктора
    cy.get(SELECTORS.BUN_PRICE_TOP).should('not.exist');
    cy.get(SELECTORS.BUN_PRICE_BOTTOM).should('not.exist');
    cy.get(SELECTORS.MAIN_PRICE).should('not.exist');
  });
});
