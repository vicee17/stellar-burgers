import ingredientsReducer, { fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '../../utils/types';

describe('ingredientsSlice', () => {
  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  it('должен устанавливать isLoading в true при pending', () => {
    const pendingAction = { type: fetchIngredients.pending.type };
    const newState = ingredientsReducer(initialState, pendingAction);
    expect(newState.isLoading).toBe(true); 
    expect(newState.error).toBe(null);
  });

  it('должен устанавливать данные и isLoading в false при fulfilled', () => {
    const mockData: TIngredient[] = [{ _id: 'test', name: 'Test', type: 'bun', proteins: 10, fat: 10, carbohydrates: 10, calories: 100, price: 100, image: 'test.png', image_large: 'large.png', image_mobile: 'mobile.png' }];
    const fulfilledAction = { type: fetchIngredients.fulfilled.type, payload: mockData };
    const newState = ingredientsReducer(initialState, fulfilledAction);
    expect(newState.isLoading).toBe(false); 
    expect(newState.items).toEqual(mockData); 
  });

  it('должен устанавливать ошибку и isLoading в false при rejected', () => {
    const mockError = 'Test error';
    const rejectedAction = { type: fetchIngredients.rejected.type, payload: mockError };
    const newState = ingredientsReducer(initialState, rejectedAction);
    expect(newState.isLoading).toBe(false); 
    expect(newState.error).toBe(mockError); 
  });
});