import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export interface ConstructorState {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[] | null;
}

const initialState: ConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = { ...action.payload };
      console.log('Added bun:', state.bun);
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients?.push({ ...action.payload });
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
  constructor: ConstructorState;
}) => state.constructor;
export const selectConstructorBun = (state: {
  constructor: ConstructorState;
}) => state.constructor.bun;
export const selectConstructorIngredients = (state: {
  constructor: ConstructorState;
}) => state.constructor.ingredients;
