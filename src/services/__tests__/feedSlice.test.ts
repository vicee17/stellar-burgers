import feedSlice from '../feedSlice';
import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';

const initialState = {
  orders: [],
  feed: null,
  isLoading: false,
  error: null
};

jest.mock('../../utils/burger-api', () => ({
  getFeedsApi: jest.fn(),
  getOrdersApi: jest.fn()
}));

describe('feed reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFeeds actions', () => {
    it('should handle fetchFeeds/pending action', () => {
      const pendingAction = {
        type: 'feed/fetchFeed/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.orders).toEqual([]);
      expect(state.feed).toBeNull();
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeeds/fulfilled action', () => {
      const mockPayload = {
        orders: [{ _id: 'order1', name: 'Test Order' }],
        total: 1,
        totalToday: 1
      };
      const fulfilledAction = {
        type: 'feed/fetchFeed/fulfilled',
        payload: mockPayload,
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockPayload.orders);
      expect(state.feed).toEqual(mockPayload);
      expect(state.error).toBeNull();
    });

    it('should handle fetchFeeds/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'feed/fetchFeed/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.feed).toBeNull();
      expect(state.error).toEqual(mockError);
    });
  });

  describe('fetchOrders actions', () => {
    it('should handle fetchOrders/pending action', () => {
      const pendingAction = {
        type: 'feed/fetchOrders/pending',
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, pendingAction);

      expect(state.isLoading).toBe(true);
      expect(state.orders).toEqual([]);
      expect(state.feed).toBeNull();
      expect(state.error).toBeNull();
    });

    it('should handle fetchOrders/fulfilled action', () => {
      const mockPayload = {
        orders: [{ _id: 'order2', name: 'Test Order 2' }],
        total: 2,
        totalToday: 2
      };
      const fulfilledAction = {
        type: 'feed/fetchOrders/fulfilled',
        payload: mockPayload,
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, fulfilledAction);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockPayload.orders);
      expect(state.feed).toEqual(mockPayload);
      expect(state.error).toBeNull();
    });

    it('should handle fetchOrders/rejected action', () => {
      const mockError = 'Test error message';
      const rejectedAction = {
        type: 'feed/fetchOrders/rejected',
        payload: mockError,
        error: null,
        meta: { requestId: 'mockRequestId' }
      };
      const state = feedSlice(initialState, rejectedAction);

      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual([]);
      expect(state.feed).toBeNull();
      expect(state.error).toEqual(mockError);
    });
  });
});
