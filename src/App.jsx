import React, { useState } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import { Auth0Provider } from '@auth0/auth0-react';
import { UserContext } from 'context/userContext';
import MyUser from 'pages/MyUser';
import Index from 'pages/projects/Index';
import NewProject from 'pages/projects/NewProject';
import Users from 'pages/Users';
import Enrollments from 'pages/Enrollments';
import AuthLayout from 'layouts/AuthLayout';
import SignUp from 'pages/auth/SignUp';
import Login from 'pages/auth/Login';
import 'styles/globals.css';

// import PrivateRoute from 'components/PrivateRoute';

function App() {
  const [userData, setUserData] = useState({});

  return (
    
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateLayout />}>
              <Route path='myuser' element={<MyUser />} />
              <Route path='' element={<Index />} />
              <Route path='projects/newproject' element={<NewProject />} />
              <Route path='users' element={<Users />} />
              <Route path='enrollments' element={<Enrollments />} />            
            </Route>
            <Route path='/auth' element={<AuthLayout />}>
              <Route path='signup' element={<SignUp />} />
              <Route path='login' element={<Login />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    
  );
}

export default App;
