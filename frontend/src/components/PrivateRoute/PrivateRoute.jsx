import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.js';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({
  component: Component,
  redirectTo,
}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return (Component);
}
