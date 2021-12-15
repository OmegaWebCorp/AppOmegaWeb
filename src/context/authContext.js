// importado en App.js

import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

/*
import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext(null);

// Permite hacer mutaciones al contexto con reducers
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, dispatch] = useReducer(
        authReducer,
        initialAuth
    );

    return (
        <AuthContext.Provider value={auth}>
            <AuthDispatchContext.Provider
                value={dispatch}
            >
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext);
}
//Define las acciones para mutar context: valor y remover el valor
function authReducer(auth, action) {
    switch (action.type) {
        case 'set': {
            saveAuth(action.auth)
            return action.auth
        }
        case 'unset':
            localStorage.removeItem('authToken')
            return null
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

const saveAuth = auth => localStorage.setItem('authToken', JSON.stringify(auth))
const initialAuth = JSON.parse(localStorage.getItem('authToken')) || null
*/
