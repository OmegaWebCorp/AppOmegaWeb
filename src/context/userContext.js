// importado en App.js

import { createContext, useContext } from 'react';

export const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};

// ** Funciones o conponentes que envuelven a otros ** 

/*
import { createContext, useContext, useReducer } from 'react';

const UserContext = createContext(null);

// Permite hacer mutaciones al contexto con reducers
const UserDispatchContext = createContext(null);

export function UserProvider({ children }) {
  const [user, dispatch] = useReducer(
      userReducer,
      initialUser
  );

  return (
      <UserContext.Provider value={user}>
          <UserDispatchContext.Provider
              value={dispatch}
          >
              {children}
          </UserDispatchContext.Provider>
      </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}

export function useUserDispatch() {
  return useContext(UserDispatchContext);
}
//Define las acciones para mutar context: valor y remover el valor
function userReducer(user, action) {
  switch (action.type) {
      case 'set': {
          saveUser(action.user)
          return action.user
      }
      case 'unset':
          localStorage.removeItem('userData')
          return null
      default: {
          throw Error('Unknown action: ' + action.type);
      }
  }
}

const saveUser = user => localStorage.setItem('userData', JSON.stringify(user))
const initialUser = JSON.parse(localStorage.getItem('userData')) || null
*/
