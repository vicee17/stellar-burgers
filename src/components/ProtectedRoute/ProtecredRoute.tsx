import { FC } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuth } from '../../services/userSlice';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: JSX.Element;
  onlyUnAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth = false
}) => {
  const isAuth = useSelector(selectIsAuth);
  const location = useLocation();

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from || '/';
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};
