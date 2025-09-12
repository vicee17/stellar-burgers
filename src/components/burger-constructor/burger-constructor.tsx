import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectConstructorItems } from '../../services/constructorSlice';
import {
  clearOrder,
  createOrder,
  selectOrderData,
  selectOrderLoading
} from '../../services/orderSlice';
import { selectIsAuth } from '../../services/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(selectConstructorItems) || {
    bun: null,
    ingredients: []
  };
  const orderData = useSelector(selectOrderData);
  const orderRequest = useSelector(selectOrderLoading);
  const isAuth = useSelector(selectIsAuth);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...(constructorItems.ingredients?.map((item) => item._id) || []),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems.ingredients?.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ) || 0),
    [constructorItems]
  );

  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
