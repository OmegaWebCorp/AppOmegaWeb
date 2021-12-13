import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
// ** imports @apollo
import { useQuery } from '@apollo/client';
// ** import components
import PrivateRoute from 'components/PrivateRoute';
// ** import gql queries
import { GET_USUARIOS } from 'graphql/usuarios/queries';
// ** import ROLES-enums
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import { Table, TableHead, TableCell, TableRow, TableBody, Button} from '@material-ui/core';


const useStyles = makeStyles({
  table: {
      align: 'center',
      borderRadius: '10px',
      width: '85%',
      marginLeft: '7.5%',
      marginTop: '3%'
  },
  thead: {
      '& > *': {
          width: 'auto',
          fontSize: 17,
          background: '#313C46',
          color: '#FFFFFF',
          family: 'Quicksand, SemiBold'
      }
  },
  row: {
      '& > *': {
          fontSize: 15,
          color: '#1a497a',
          family: 'Quicksand,SemiBold'
      }
  }
})

const IndexUsuarios = () => {
  const classes = useStyles();
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
        <Table className = {classes.table}>
          <TableHead >
            <TableRow className = {classes.thead}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellidos</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Identificación</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableCell>
            <Link to={`/EditarUsuario`}>
              <i className='fas fa-pen text-gray hover:text-orange cursor-pointer' />
            </Link>
          </TableCell>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default IndexUsuarios