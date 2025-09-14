import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtecredRoute';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch, useSelector } from '../../services/store';
import { setAuthCheck } from '../../services/userSlice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthChecked } = useAuth();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients()).catch((error) =>
      console.error('Fetch ingredients error:', error)
    );
    if (!isAuthChecked) {
      dispatch(setAuthCheck(true));
    }
  }, []);

  if (!isAuthChecked) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        //publicRoutes
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        //ProtectedRoutes with onlyUnAuth
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        //ProtecredRoute with Auth
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        //Route for NotFound404
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      //Modal and publicRoutes
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title='Детали заказа'
                onClose={() => window.history.back()}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Детали ингредиента'
                onClose={() => window.history.back()}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          //ProtecredRoute Modal
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <OrderInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
