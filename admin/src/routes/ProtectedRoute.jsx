// src/routes/ProtectedRoute.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, roleRequired }) {
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  if (!isLoggedIn) return <Navigate to="/login"  />;
  if (roleRequired && user?.role !== roleRequired) return <Navigate to="/" />;

  return children;
}



// // src/routes/ProtectedRoute.jsx
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// export default function ProtectedRoute({ children, roleRequired }) {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   if (!isAuthenticated) return <Navigate to="/login" />;
//   if (roleRequired && role !== roleRequired) return <Navigate to="/" />;

//   return children;
// }
