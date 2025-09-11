import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/store';
import {
  fetchUser,
  selectIsAuthChecked,
  setAuthCheck
} from '../services/userSlice';
import { getCookie } from '../utils/cookie';

export const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    const token = getCookie('accessToken');
    console.log('useAuth: token =', token);
    console.log('useAuth: isAuthChecked =', isAuthChecked);

    if (token && !isAuthChecked) {
      dispatch(fetchUser());
      console.log('Dispatching fetchUser');
    } else {
      dispatch(setAuthCheck(true));
      console.log('Setting auth checked to true directly');
    }
  }, [dispatch, isAuthChecked]);
};
