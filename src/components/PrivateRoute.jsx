import { useUser } from 'context/userContext';
import React from 'react';

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();

  if (roleList.includes(userData.rol)) {
    return children;
  }

  return <div data-testid="not-authorized" className='text-9xl text-red-500 '>No estás autorizado.</div>;
};

export default PrivateRoute;