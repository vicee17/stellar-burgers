import orderSlice from '../orderSlice';
import { orderBurgerApi } from '../../utils/burger-api';

const initialState = {
  orderData: null,
  isLoading: false,
  error: null
};

jest.mock('../../utils/burger-api', () => ({
  orderBurgerApi: jest.fn()
}));

describe('order reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle createOrder/pending action', () => {
    const pendingAction = {
      type: 'order/create/pending',
      meta: { requestId: 'mockRequestId' }
    };
    const state = orderSlice(initialState, pendingAction);

    expect(state.isLoading).toBe(true);
    expect(state.orderData).toBeNull();
    expect(state.error).toBeNull();
  });

  it('should handle createOrder/fulfilled action', () => {
    const mockOrder = {
      _id: 'order1',
      name: 'Test Order',
      number: 123,
      status: 'done',
      ingredients: [],
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z'
    };
    const fulfilledAction = {
      type: 'order/create/fulfilled',
      payload: mockOrder,
      meta: { requestId: 'mockRequestId' }
    };
    const state = orderSlice(initialState, fulfilledAction);

    expect(state.isLoading).toBe(false);
    expect(state.orderData).toEqual(mockOrder);
    expect(state.error).toBeNull();
  });

  it('should handle createOrder/rejected action', () => {
    const mockError = 'Test error message';
    const rejectedAction = {
      type: 'order/create/rejected',
      payload: mockError,
      error: null,
      meta: { requestId: 'mockRequestId' }
    };
    const state = orderSlice(initialState, rejectedAction);

    expect(state.isLoading).toBe(false);
    expect(state.orderData).toBeNull();
    expect(state.error).toEqual(mockError);
  });

  it('should handle clearOrder reducer', () => {
    const stateWithOrder = {
      ...initialState,
      orderData: {
        _id: 'order1',
        name: 'Test Order',
        number: 123,
        status: 'done',
        ingredients: [],
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      }
    };
    const state = orderSlice(stateWithOrder, { type: 'order/clearOrder' });

    expect(state.orderData).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });
});
