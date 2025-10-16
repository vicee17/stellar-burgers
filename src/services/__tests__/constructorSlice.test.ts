import { constructorSlice, initialState } from '../constructorSlice';
import {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient
} from '../constructorSlice';

describe('burgerConstructor reducer', () => {
  it('should handle addBun action', () => {
    const mockBun = {
      _id: 'bun1',
      name: 'Test Bun',
      type: 'bun',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 100,
      price: 20,
      image: 'test-image.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg'
    };
    const state = constructorSlice.reducer(initialState, addBun(mockBun));

    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toEqual([]);
  });

  it('should handle addIngredient action', () => {
    const mockIngredient = {
      _id: 'ing1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 15,
      fat: 8,
      carbohydrates: 25,
      calories: 150,
      price: 10,
      image: 'test-image.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      id: 'unique-id'
    };
    const state = constructorSlice.reducer(
      initialState,
      addIngredient(mockIngredient)
    );

    expect(state.bun).toEqual(null);
    expect(state.ingredients).toEqual([mockIngredient]);
  });

  it('should handle removeIngredient action', () => {
    const mockIngredient = {
      _id: 'ing1',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 15,
      fat: 8,
      carbohydrates: 25,
      calories: 150,
      price: 10,
      image: 'test-image.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      id: 'unique-id'
    };
    const stateWithIngredient = constructorSlice.reducer(
      initialState,
      addIngredient(mockIngredient)
    );
    const state = constructorSlice.reducer(
      stateWithIngredient,
      removeIngredient('unique-id')
    );

    expect(state.bun).toEqual(null);
    expect(state.ingredients).toEqual([]);
  });

  it('should handle moveIngredient action', () => {
    const mockIng1 = {
      _id: 'ing1',
      name: 'Ing1',
      type: 'main',
      proteins: 15,
      fat: 8,
      carbohydrates: 25,
      calories: 150,
      price: 10,
      image: 'test-image.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      id: 'id1'
    };
    const mockIng2 = {
      _id: 'ing2',
      name: 'Ing2',
      type: 'main',
      proteins: 20,
      fat: 10,
      carbohydrates: 30,
      calories: 200,
      price: 20,
      image: 'test-image.jpg',
      image_large: 'test-large.jpg',
      image_mobile: 'test-mobile.jpg',
      id: 'id2'
    };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [mockIng1, mockIng2]
    };
    const state = constructorSlice.reducer(
      stateWithIngredients,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    expect(state.bun).toEqual(null);
    expect(state.ingredients).toEqual([mockIng2, mockIng1]);
  });
});