import { Table, TableHead, TableCell, TableRow, TableBody, Button} from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { toast } from 'react-toastify';
import LoadingButton from 'components/LoadingButton';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutations';

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


const IndexInscripciones = () => {

    const classes = useStyles();

    const { data, error, loading } = useQuery(GET_INSCRIPCIONES);
    console.log(data)
    /*const { ID, estado, proyecto, estudiante, fechaIngreso} = data;*/

    useEffect(() => {
      if (error) {
        toast.error('Error consultando inscripciones');
      }
    }, [error]);
  
    if (loading) return <div>Cargando....</div>;

    return (
        <div>
            <div className='H1-header'>Inscripciones</div>
            <p className='H2-header'>Aquí puedes ver y gestionar los estudiantes inscritos a un proyecto.</p>
            <Table className = {classes.table}>
                <TableHead>
                    <TableRow className = {classes.thead}>
                        <TableCell>Nombre del proyecto</TableCell>
                        <TableCell>Nombre del estudiante</TableCell>
                        <TableCell>Ingreso</TableCell>
                        <TableCell>Egreso</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        /*useQuery(GET_INSCRIPCIONES).map( data=>(
                            <TableCell>{data.proyecto.nombre}</TableCell>
                            <TableCell>{data.estudiante.id}</TableCell>
                            <TableCell>{data.fechaIngreso}</TableCell>
                            <TableCell>{data}</TableCell>
                            <TableCell>{data.estado}</TableCell>
                            <TableCell>
                                <Button color="#26ed77" onClick={() => deleteSaleData(sale._id)} >Remove</Button>
                            </TableCell>
                        ))*/
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default IndexInscripciones;
