import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuthIsLoggedIn } from '../../redux/auth/selectors.js';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({
  component: Component,
  redirectTo,
}) {
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  if (isLoggedIn) {
    toast.error('You are already signed in');
    return <Navigate to={redirectTo} />;
  }

  return (Component);
}
