import userSlice from '../userSlice';
import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '../../utils/burger-api';

const initialState = {
  user: null,
  isLoading: false,
  isAuth: false,
  isAuthChecked: false,
  error: null
};

jest.mock('../../utils/burger-api', () => ({
  loginUserApi: jest.fn(),
  registerUserApi: jest.fn(),
  getUserApi: jest.fn(),
  updateUserApi: jest.fn(),
  logoutApi: jest.fn(),
  forgotPasswordApi: jest.fn(),
  resetPasswordApi: jest.fn()
}));

describe('user reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginUser actions', () => {
    it('should handle loginUser/pending action', () => {
      const pendingAction = {
        type: 'user/login/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser/fulfilled action', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const fulfilledAction = {
        type: 'user/login/fulfilled',
        payload: mockUser,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle loginUser/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/login/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('registerUser actions', () => {
    it('should handle registerUser/pending action', () => {
      const pendingAction = {
        type: 'user/register/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser/fulfilled action', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const fulfilledAction = {
        type: 'user/register/fulfilled',
        payload: mockUser,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle registerUser/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/register/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('fetchUser actions', () => {
    it('should handle fetchUser/pending action', () => {
      const pendingAction = {
        type: 'user/fetchUser/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle fetchUser/fulfilled action', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const fulfilledAction = {
        type: 'user/fetchUser/fulfilled',
        payload: mockUser,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fetchUser/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/fetchUser/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('updateUser actions', () => {
    it('should handle updateUser/pending action', () => {
      const pendingAction = {
        type: 'user/updateUser/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser/fulfilled action', () => {
      const mockUser = { email: 'test@test.com', name: 'Test User' };
      const fulfilledAction = {
        type: 'user/updateUser/fulfilled',
        payload: mockUser,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuth).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle updateUser/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/updateUser/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('logoutUser actions', () => {
    it('should handle logoutUser/fulfilled action', () => {
      const fulfilledAction = {
        type: 'user/logoutUser/fulfilled',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });
  });

  describe('forgotPassword actions', () => {
    it('should handle forgotPassword/pending action', () => {
      const pendingAction = {
        type: 'user/forgotPassword/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle forgotPassword/fulfilled action', () => {
      const fulfilledAction = {
        type: 'user/forgotPassword/fulfilled',
        payload: true,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle forgotPassword/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/forgotPassword/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('resetPassword actions', () => {
    it('should handle resetPassword/pending action', () => {
      const pendingAction = {
        type: 'user/resetPassword/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle resetPassword/fulfilled action', () => {
      const fulfilledAction = {
        type: 'user/resetPassword/fulfilled',
        payload: true,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should handle resetPassword/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'user/resetPassword/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = userSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.error).toEqual(mockError);
    });
  });

  describe('reducers', () => {
    it('should handle clearError reducer', () => {
      const stateWithError = {
        ...initialState,
        error: 'Test error'
      };
      const state = userSlice(stateWithError, { type: 'user/clearError' });

      expect(state.error).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.isAuthChecked).toBe(false);
    });

    it('should handle setAuthCheck reducer', () => {
      const state = userSlice(initialState, {
        type: 'user/setAuthCheck',
        payload: true
      });

      expect(state.isAuthChecked).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.user).toBeNull();
      expect(state.isAuth).toBe(false);
      expect(state.error).toBeNull();
    });
  });
});
