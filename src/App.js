import { BrowserRouter, Outlet, useRoutes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import { useContext } from 'react';
import { authContext } from './Context/AuthContext'
import { MainOutlet } from './pages/Outlets/MainLayout';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


function Router() {
  const routes = [
    {
      path: "/",
      element: <MainOutlet />,
      children: [
        { path: "/", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ]
    }
  ];
  let element = useRoutes(routes);

  return element;
}

