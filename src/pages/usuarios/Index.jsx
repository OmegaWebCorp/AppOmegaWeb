import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// ** imports @apollo
import { useQuery } from '@apollo/client';
// ** import components
import PrivateRoute from 'components/PrivateRoute';
// ** import gql queries
import { GET_USUARIOS } from 'graphql/usuarios/queries';
// ** import ROLES-enums
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';

const IndexUsuarios = () => {
  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Cargando....</div>;

  return (
    <div>
      <div className='H1-header'>Usuarios</div>
      <p className='H2-header'>Aquí puedes ver y asignar estados a los usuarios.</p>  
      <div>
        Datos Usuarios:
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
          <td>
            <Link to={`/EditarUsuario`}>
              <i className='fas fa-pen text-gray hover:text-orange cursor-pointer' />
            </Link>
          </td>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexUsuarios