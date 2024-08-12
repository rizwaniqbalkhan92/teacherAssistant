import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './Components/ContextApi/AuthContext';
import Login from './Components/Authentication/SignIn';
import SignUp from './Components/Authentication/SignUp';
import Dashboard from './Components/TeacherDashboard/BottomTab';

const AppRoutes = () => {
  const { state } = useAuth();

  return (
    <Routes>
      {state.isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

const App = () => (
  <AuthProvider   >
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
