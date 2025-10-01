import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/store';
import {
  fetchUser,
  selectIsAuthChecked,
  setAuthCheck
} from '../services/userSlice';
import { getCookie } from '../utils/cookie';

interface AuthState {
  isAuthChecked: boolean;
}

export const useAuth = (): AuthState => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    const token = getCookie('accessToken');

    if (token && !isAuthChecked) {
      dispatch(fetchUser()).catch((error) =>
        console.error('Fetch user error:', error)
      );
    } else {
      dispatch(setAuthCheck(true));
    }
  }, [dispatch, isAuthChecked]);

  return { isAuthChecked };
};
