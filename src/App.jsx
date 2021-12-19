import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
// ** imports @apollo
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
// ** imports contexts (transversales)
import { AuthContext } from 'context/authContext';
import { setContext } from '@apollo/client/link/context';
import { UserContext } from 'context/userContext';
// ** imports layouts secciones
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
// ** imports secciones
import Login from 'pages/auth/Login';
import SignUp from 'pages/auth/SignUp';
import IndexMiperfil from 'pages/miperfil/Index';
import Index from 'pages/proyectos/Index';
import CrearProyecto from 'pages/proyectos/CrearProyecto';
import IndexUsuarios from 'pages/usuarios/Index';
import EditarUsuario from 'pages/usuarios/EditarUsuario';
import IndexInscripciones from 'pages/inscripciones/Index';
import IndexAvance from 'pages/avances/Index';
// ** imports estilos
import 'styles/globals.css';


const httpLink = createHttpLink({
  uri: 'https://omegawebbakend.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem('token'));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout />}>
                <Route path='miperfil' element={<IndexMiperfil />} />
                <Route path='/index' element={<Index />} />
                <Route path='/proyectos/crearproyecto' element={<CrearProyecto />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/:_id/editar' element={<EditarUsuario />} />
                <Route path='/inscripciones/' element={<IndexInscripciones />} />
                <Route path='/avances/:projectid' element={<IndexAvance />} />            
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='signup' element={<SignUp />} />
                <Route path='login' element={<Login />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>   
  );
}

export default App;
