import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';
import {
  selectFeedData,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/feedSlice';
import { Preloader } from '@ui';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const feed = useSelector(selectFeedData);
  const isLoading = useSelector(selectFeedLoading);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  if (isLoading || !feed) {
    return <Preloader />;
  }

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
