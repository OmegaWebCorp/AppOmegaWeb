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
import { Table, TableHead, TableCell, TableRow, TableBody, Button } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles({
  table: {
    align: 'center',
    borderRadius: '10px',
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
    family: 'Quicksand, regular'
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
      color: '#313C46',
      family: 'Quicksand, SemiBold'
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
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div>
        <div className='H1-header'>Usuarios</div>
        <p className='H2-header'>Aquí puedes ver y asignar estados a los usuarios.</p>

        <div className='font-Quicksand'>

          <Table className={classes.table}>
            <TableHead>
              <TableRow className={classes.thead}>
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
              {data && data.Usuarios ? (
                <>
                  {data.Usuarios.map((u) => (
                    <TableRow className={classes.row} key={u._id}>
                      <TableCell>{u.nombre}</TableCell>
                      <TableCell>{u.apellido}</TableCell>
                      <TableCell>{u.correo}</TableCell>
                      <TableCell>{u.identificacion}</TableCell>
                      <TableCell>{Enum_Rol[u.rol]}</TableCell>
                      <TableCell>{Enum_EstadoUsuario[u.estado]}</TableCell>
                      <TableCell>
                        <button className='text-gray-dark p-2 px-3 rounded-xl hover:text-white cursor-pointer bg-green'>
                          <Link to={`/usuarios/${u._id}/editar`}>
                            <FontAwesomeIcon icon={faPen} />
                          </Link>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : (
                <div>No autorizado</div>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios