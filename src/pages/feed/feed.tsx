import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/feedSlice';
import { fetchIngredients } from '../../services/ingredientsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);

  useEffect(() => {
    dispatch(fetchFeeds()).catch((err) => {
      console.error('Fetch feeds error:', err);
    });
    if (!orders.length) {
      dispatch(fetchIngredients()).catch((err) => {
        console.error('Fetch ingredients error:', err);
      });
    }
  }, [dispatch, orders.length]);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
