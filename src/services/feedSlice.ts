import { getFeedsApi, getOrdersApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

export interface FeedState {
  orders: TOrder[];
  feed: TOrdersData | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: FeedState = {
  orders: [],
  feed: null,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feed/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response as TOrdersData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'feed/fetchOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return { orders: response, total: 0, totalToday: 0 } as TOrdersData;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed = action.payload;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.feed = action.payload || [];
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedSlice.reducer;

export const selectFeedOrders = (state: { feed: FeedState }) =>
  state.feed.orders;
export const selectFeedData = (state: { feed: FeedState }) => state.feed.feed;
export const selectFeedLoading = (state: { feed: FeedState }) =>
  state.feed.isLoading;
export const selectFeedError = (state: { feed: FeedState }) => state.feed.error;
