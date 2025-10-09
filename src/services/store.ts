import { configureStore, combineReducers } from '@reduxjs/toolkit'; // [ADD] combineReducers для создания rootReducer

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

const rootReducer = combineReducers({
  user: userReduser,
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducesr
});

const store = configureStore({
  reducer: rootReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

export { rootReducer };
