import { BrowserRouter, useRoutes } from 'react-router-dom';
import Login from './pages/Login/Login'
import Register from './pages/Register/Register';
import { AuthProvider } from './context/AuthContext';
import  MainOutlet  from './pages/Outlets/MainLayout';
import { MainUI } from './pages/Chat/mainUI';

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
        {path:"profile",element:<MainUI />}
      ]
      
    }
  ];
  let element = useRoutes(routes);

  return element;
}

