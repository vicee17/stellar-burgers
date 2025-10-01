import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  loginUser,
  selectError,
  selectIsLoading
} from '../../services/userSlice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectError);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
