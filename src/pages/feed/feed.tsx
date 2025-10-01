import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchFeeds,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectFeedLoading);
  const orders = useSelector(selectFeedOrders);

  useEffect(() => {
    dispatch(fetchFeeds()).catch((err) => {
      console.error('Fetch feeds error:', err);
    });
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!orders.length) {
    return <div className='text text_type_main-medium'>Нет заказов</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
