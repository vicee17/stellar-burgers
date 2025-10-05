import constructorReducer, { addIngredient, removeIngredient, moveIngredient, clearConstructor } from '../constructorSlice';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const initialState = {
    bun: null,
    ingredients: [],
  };

  it('должен добавлять ингредиент', () => {
    const ingredient: TConstructorIngredient = {
      _id: 'test-id',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'test-image.png',
      image_large: 'test-large.png',
      image_mobile: 'test-mobile.png',
      id: 'unique-id',
    };

    const newState = constructorReducer(initialState, addIngredient(ingredient));

    expect(newState.ingredients).toHaveLength(1); 
    expect(newState.ingredients[0]).toEqual(ingredient);
  });

  it('должен удалять ингредиент', () => {
    const ingredient: TConstructorIngredient = {
      _id: 'test-id',
      name: 'Test Ingredient',
      type: 'main',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'test-image.png',
      image_large: 'test-large.png',
      image_mobile: 'test-mobile.png',
      id: 'unique-id',
    };

    const stateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
    const newState = constructorReducer(stateWithIngredient, removeIngredient('unique-id'));

    expect(newState.ingredients).toHaveLength(0); 
  });

  it('должен изменять порядок ингредиентов', () => {
    const ingredient1: TConstructorIngredient = {
      _id: 'test-id-1',
      name: 'Test Ingredient 1',
      type: 'main',
      proteins: 10,
      fat: 10,
      carbohydrates: 10,
      calories: 100,
      price: 100,
      image: 'test-image-1.png',
      image_large: 'test-large-1.png',
      image_mobile: 'test-mobile-1.png',
      id: 'unique-id-1',
    };
    const ingredient2: TConstructorIngredient = {
      _id: 'test-id-2',
      name: 'Test Ingredient 2',
      type: 'main',
      proteins: 20,
      fat: 20,
      carbohydrates: 20,
      calories: 200,
      price: 200,
      image: 'test-image-2.png',
      image_large: 'test-large-2.png',
      image_mobile: 'test-mobile-2.png',
      id: 'unique-id-2',
    };

    const stateWithIngredients = constructorReducer(initialState, addIngredient(ingredient1));
    const stateAfterAdd = constructorReducer(stateWithIngredients, addIngredient(ingredient2));
    const newState = constructorReducer(stateAfterAdd, moveIngredient({ fromIndex: 1, toIndex: 0 }));

    expect(newState.ingredients[0]).toEqual(ingredient2); 
    expect(newState.ingredients[1]).toEqual(ingredient1);
  });
});