import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import OuterHeader from '../Components/shared/OuterHeader';
import SuspenseFallback from '../Components/shared/SuspenseFallback';

const LoginPage = lazy(() => import(/* webpackChunkName: "LoginPage" */'../Pages/Login'));
const RegisterPage = lazy(() => import(/* webpackChunkName: "RegisterPage" */'../Pages/Register'));
const VerifyCodePage = lazy(() => import(/* webpackChunkName: "VerifyCodePage" */'../Pages/VerifyCode'));
const ForgotPasswordPage = lazy(() => import(/* webpackChunkName: "ForgotPasswordPage" */'../Pages/ForgotPassword'));
const ResetPasswordPage = lazy(() => import(/* webpackChunkName: "ResetPasswordPage" */'../Pages/ResetPassword'));
const BookingPage = lazy(() => import(/* webpackChunkName: "BookingPage" */'../Pages/Booking'));
const BookingProcess = lazy(() => import(/* webpackChunkName: "BookingProcess" */'../Pages/Booking/Process'));
const ErrorPage = lazy(() => import(/* webpackChunkName: "ErrorPage" */'../Pages/ErrorPage'));
const TOUPage = lazy(() => import(/* webpackChunkName: "TOUPage" */'../Pages/PolicyEdit'));

const NotAuthorized = () => (
  <Router>
    <OuterHeader />

    <Suspense fallback={<SuspenseFallback />}>
      <Switch>
        <Route exact path="/" component={BookingPage} />
        <Route exact path="/booking-process" component={BookingProcess} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/verify-code" component={VerifyCodePage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <Route exact path="/policy" component={TOUPage} />
        <Route exact path="/error" component={ErrorPage} />
        <Route path="/*">
          <Redirect to="/error" />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default NotAuthorized;
