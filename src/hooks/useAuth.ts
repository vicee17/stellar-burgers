import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/store';
import {
  fetchUser,
  selectIsAuthChecked,
  setAuthCheck
} from 'src/services/userSlice';
import { getCookie } from 'src/utils/cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    const token = getCookie('accessToken');
    if (token && !isAuthChecked) {
      dispatch(fetchUser());
    } else {
      dispatch(setAuthCheck(true));
    }
  }, [dispatch, isAuthChecked]);
};
