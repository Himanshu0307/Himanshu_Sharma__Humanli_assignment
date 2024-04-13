import { BrowserRouter, useRoutes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';
import  MainOutlet  from './pages/Outlets/MainLayout';
import ChatLayout from './pages/layouts/ChatLayout';
import { ToastProvider } from './context/ToastProvider';
import RouteGuard from './pages/layouts/RouteGuard';

function App() {

  return (
    <AuthProvider>
      <ToastProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      </ToastProvider>
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
        { path: "register", element: <Register />, },
        {path:"profile",element:<RouteGuard children={<ChatLayout></ChatLayout>}/>}
      ]
      
    }
  ];
  let element = useRoutes(routes);

  return element;
}

