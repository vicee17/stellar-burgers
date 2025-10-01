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
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useMatch
} from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtecredRoute';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from '../../services/store';
import { setAuthCheck } from '../../services/userSlice';
import { useEffect } from 'react';
import { fetchIngredients } from '../../services/ingredientsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthChecked } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

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

  const handleClose = () => {
    if (background && window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/', { replace: true });
    }
  };

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
        <Route
          path='/ingredients/:id'
          element={
            <div className={styles.detailPageWrap}>
              <p className={`text text_type_main-large ${styles.detailHeader}`}>
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_digits-default ${styles.detailHeader}`}
              >
                #{orderNumber && orderNumber.padStart(6, '0')}
              </p>
              <OrderInfo />
            </div>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <div className={styles.detailPageWrap}>
                <p
                  className={`text text_type_digits-default ${styles.detailHeader}`}
                >
                  #{orderNumber && orderNumber.padStart(6, '0')}
                </p>
                <OrderInfo />
              </div>
            </ProtectedRoute>
          }
        />
        //Route for NotFound404
        <Route path='*' element={<NotFound404 />} />
        //Modal and publicRoutes
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='Детали заказа' onClose={handleClose}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          //ProtecredRoute Modal
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='Детали заказа' onClose={handleClose}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
