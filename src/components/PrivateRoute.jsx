import { useUser } from 'context/userContext';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <div 
   
  className='text-2xl font-Quicksand text-gray-dark flex flex-col w-full h-full items-center justify-center'
  data-testid="not-authorized"
  ><i class="fas fa-ban"></i>¡Lo sentimos, no estás autorizado!</div>;
};

export default PrivateRoute;