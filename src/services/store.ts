import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import userReduser from '../services/userSlice';
import ingredientsReducer from '../services/ingredientsSlice';
import burgerConstructorReducer from '../services/constructorSlice';
import orderReducer from '../services/orderSlice';
import feedReducesr from '../services/feedSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    ingredients: ingredientsReducer,
    burgerConstructor: burgerConstructorReducer,
    order: orderReducer,
    feed: feedReducesr
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'user/setAuthCheck',
          'ingredients/fetchIngredients/pending',
          'ingredients/fetchIngredients/rejected'
        ],
        ignoredPaths: ['constructor.bun', 'constructor.ingredients']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
