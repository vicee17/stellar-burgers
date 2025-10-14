import { rootReducer } from '../store';

jest.mock('../../utils/burger-api.ts', () => ({
  refreshToken: jest
    .fn()
    .mockResolvedValue({
      success: true,
      refreshToken: 'mock_refresh',
      accessToken: 'mock_access'
    }),
  fetchWithRefresh: jest.fn().mockResolvedValue({ success: true }),
  getIngredientsApi: jest.fn().mockResolvedValue({ success: true, data: [] }),
  getFeedsApi: jest
    .fn()
    .mockResolvedValue({ success: true, orders: [], total: 0, totalToday: 0 }),
  getOrdersApi: jest.fn().mockResolvedValue([]),
  orderBurgerApi: jest
    .fn()
    .mockResolvedValue({ success: true, order: {}, name: 'mock' }),
  getOrderByNumberApi: jest
    .fn()
    .mockResolvedValue({ success: true, orders: [] }),
  registerUserApi: jest
    .fn()
    .mockResolvedValue({
      success: true,
      refreshToken: 'mock',
      accessToken: 'mock',
      user: { email: '', name: '' }
    }),
  loginUserApi: jest
    .fn()
    .mockResolvedValue({
      success: true,
      refreshToken: 'mock',
      accessToken: 'mock',
      user: { email: '', name: '' }
    }),
  forgotPasswordApi: jest.fn().mockResolvedValue({ success: true }),
  resetPasswordApi: jest.fn().mockResolvedValue({ success: true }),
  getUserApi: jest
    .fn()
    .mockResolvedValue({ success: true, user: { email: '', name: '' } }),
  updateUserApi: jest
    .fn()
    .mockResolvedValue({ success: true, user: { email: '', name: '' } }),
  logoutApi: jest.fn().mockResolvedValue({ success: true })
}));

describe('rootReducer initialization', () => {
  it('should correctly combine all reducers', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state).toHaveProperty('user');
    expect(state.user).toEqual({
      user: null,
      isAuth: false,
      isAuthChecked: false,
      isLoading: false,
      error: null
    });

    expect(state).toHaveProperty('ingredients');
    expect(state.ingredients).toEqual({
      items: [],
      isLoading: false,
      error: null
    });

    expect(state).toHaveProperty('burgerConstructor');
    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state).toHaveProperty('order');
    expect(state.order).toEqual({
      orderData: null,
      isLoading: false,
      error: null
    });

    expect(state).toHaveProperty('feed');
    expect(state.feed).toEqual({
      error: null,
      feed: null,
      isLoading: false,
      orders: []
    });
  });
});
