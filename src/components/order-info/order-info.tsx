import { FC, useEffect, useMemo, useState } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { useSelector } from '../../services/store';
import { selectFeedData, selectFeedLoading } from '../../services/feedSlice';
import { useParams } from 'react-router-dom';
import {
  selectIngredients,
  selectIngredientsLoading
} from '../../services/ingredientsSlice';
import { getOrderByNumberApi } from '@api';

export const OrderInfo: FC = () => {
  const ingredients = useSelector(selectIngredients);
  const { number } = useParams<{ number?: string }>();
  const ingredientLoading = useSelector(selectIngredientsLoading);
  const feedLoading = useSelector(selectFeedLoading);
  const ordersData = useSelector(selectFeedData);
  const [orderData, setOrderData] = useState<TOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!number) return;

      setIsLoading(true);
      setError(null);

      const orderNumber = parseInt(number, 10);
      let foundOrder: TOrder | undefined;

      if (ordersData?.orders?.length) {
        foundOrder = ordersData.orders.find(
          (order) => order.number === orderNumber
        );
      }

      if (!foundOrder) {
        try {
          const response = await getOrderByNumberApi(orderNumber);
          if (response.success && response.orders.length > 0) {
            foundOrder = response.orders[0];
          } else {
            throw new Error('Order not found on server');
          }
        } catch (err) {
          setError((err as Error).message);
          console.error(`Error fetching order ${number}:`, err);
        }
      }

      setOrderData(foundOrder || null);
      setIsLoading(false);
    };

    fetchOrder();
  }, [number, ordersData]);

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

  if (error) {
    return <div className='text text_type_main-medium'>Ошибка: {error}</div>;
  }

  if (isLoading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
