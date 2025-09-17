import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectConstructorIngredients } from '../../services/constructorSlice';
import { selectFeedData, selectFeedLoading } from '../../services/feedSlice';
import { useParams } from 'react-router-dom';
import { selectIngredientsLoading } from '../../services/ingredientsSlice';

export const OrderInfo: FC = () => {
  const ingredients = useSelector(selectConstructorIngredients);
  const { number } = useParams<{ number?: string }>();
  const ingredientLoading = useSelector(selectIngredientsLoading);
  const feedLoading = useSelector(selectFeedLoading);
  const ordersData = useSelector(selectFeedData);

  const orderData = useMemo(() => {
    if (!number || !ordersData?.orders?.length) return null;
    const orderNumber = parseInt(number, 10);
    const foundOrder = ordersData.orders.find(
      (order) => order.number === orderNumber
    );
    if (!foundOrder) {
      console.error(`Order with number ${number} not found`);
      return null;
    }
    return foundOrder;
  }, [number, ordersData]);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length || ingredientLoading || feedLoading)
      return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
