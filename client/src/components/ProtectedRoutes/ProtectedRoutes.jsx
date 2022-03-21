import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'; 
import Login from '../Login/Login';
import useToken from '../../hooks/useToken';
import useAutoLogout from '../../hooks/useAutoLogout';

const ProtectedRoutes = () => {
  const timer = useAutoLogout(10);
  const { token, setToken } = useToken();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(token && timer > 0);
  }, [timer, token]);
  
  return isAuth ? <Outlet/> : <Login setToken={setToken}/>;
}

export default ProtectedRoutes