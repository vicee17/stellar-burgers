import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  selectIngredients,
  selectIngredientsLoading
} from '../../services/ingredientsSlice';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const { id } = useParams<{ id?: string }>();

  const ingredientData = id
    ? ingredients.find((item) => item._id === id)
    : null;

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients()).catch((err) => {
        console.error('Fetch ingredients error:', err);
      });
    }
  }, [dispatch]);

  if (isLoading || !ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
