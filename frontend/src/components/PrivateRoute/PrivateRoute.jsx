import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.js';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function PrivateRoute({
  component: Component,
  redirectTo,
}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  if (!isLoggedIn) {
    toast.error('You need to sign in first');
    return <Navigate to={redirectTo} />;
  }

  return (Component);
}
