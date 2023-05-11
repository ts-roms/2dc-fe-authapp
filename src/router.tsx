import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, Outlet } from "react-router-dom";
const LoginPage = React.lazy(() => import('./pages/auth/login-page'));
const HomePage = React.lazy(() => import('./pages/home'));


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <><Outlet /></>
      }
    >
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Route>
  ));