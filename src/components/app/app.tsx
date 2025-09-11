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
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute/ProtecredRoute';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      //publicRoutes
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      //Modal and publicRoutes
      <Route
        path='/feed/:number'
        element={
          <Modal title='Детали заказа' onClose={() => window.history.back()}>
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
        path='register'
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
      //ProtecredRoute Modal
      <Route
        path='/profile/orders/:number'
        element={
          <ProtectedRoute>
            <OrderInfo />
          </ProtectedRoute>
        }
      />
      //Route for NotFound404
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  </div>
);

export default App;
