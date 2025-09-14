import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuid } from 'uuid';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = { ...action.payload };
      console.log('Added bun:', state.bun);
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      const newIngredient: TConstructorIngredient = {
        ...action.payload,
        id: uuid()
      };
      state.ingredients.push(newIngredient);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      if (state.ingredients) {
        state.ingredients = state.ingredients?.filter(
          (item) => item._id !== action.payload
        );
      }
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const item = state.ingredients && state.ingredients[fromIndex];
      state.ingredients?.splice(fromIndex, 1);
      item && state.ingredients?.splice(toIndex, 0, item);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;

export const selectConstructorItems = (state: {
  burgerConstructor: ConstructorState;
}) => state.burgerConstructor;
export const selectConstructorBun = (state: {
  burgerConstructor: ConstructorState;
}) => state.burgerConstructor.bun;
export const selectConstructorIngredients = (state: {
  burgerConstructor: ConstructorState;
}) => state.burgerConstructor.ingredients;
