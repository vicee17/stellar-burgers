import ingredientsSlice, { initialState } from '../ingredientsSlice';
import { fetchIngredients, clearIngredientsError } from '../ingredientsSlice';
import { getIngredientsApi } from '../../utils/burger-api';

jest.mock('../../utils/burger-api', () => ({
  getIngredientsApi: jest.fn()
}));

describe('ingredients reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle fetchIngredients/pending action', () => {
    const state = ingredientsSlice(
      initialState,
      fetchIngredients.pending('mockRequestId')
    );

    expect(state.isLoading).toBe(true);
    expect(state.items).toEqual([]);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients/fulfilled action', () => {
    const mockData = [
      {
        _id: '1',
        name: 'Test Ingredient',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 20,
        image: 'test.jpg',
        image_large: 'large.jpg',
        image_mobile: 'mobile.jpg'
      }
    ];
    const state = ingredientsSlice(
      initialState,
      fetchIngredients.fulfilled(mockData, 'mockRequestId')
    );

    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual(mockData);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients/rejected action', () => {
    const mockError = 'Test error message';
    const rejectedAction = {
      type: 'ingredients/fetchIngredients/rejected',
      payload: mockError,
      error: null,
      meta: { requestId: 'mockRequestId' }
    };
    const state = ingredientsSlice(initialState, rejectedAction);
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual([]);
    expect(state.error).toEqual(mockError);
  });

  it('should handle clearIngredientsError reducer', () => {
    const stateWithError = {
      ...initialState,
      error: 'Test error'
    };
    const state = ingredientsSlice(stateWithError, clearIngredientsError());

    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.items).toEqual([]);
  });
});
