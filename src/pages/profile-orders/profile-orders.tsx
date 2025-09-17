import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchOrders,
  selectFeedLoading,
  selectFeedOrders
} from '../../services/feedSlice';
import { Preloader } from '@ui';
import { selectIsAuth } from '../../services/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchOrders()).catch((err) => {
        console.error('Fetch orders error:', err);
      });
    }
  }, [dispatch, isAuth]);

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  if (!orders.length) {
    return (
      <div className='text text_type_main-medium'>Нет истории заказов</div>
    );
  }

  return <ProfileOrdersUI orders={orders} />;
};
