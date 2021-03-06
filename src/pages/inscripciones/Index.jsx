import { Table, TableHead, TableCell, TableRow, TableBody, Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { toast } from 'react-toastify';
import LoadingButton from 'components/LoadingButton';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION, RECHAZAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
import PrivateComponent from 'components/PrivateComponent';

const useStyles = makeStyles({
    table: {
        align: 'center',
        borderRadius: '10px',
        width: '90%',
        marginLeft: '5%',
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
            color: '#313C46',
            family: 'Quicksand,SemiBold'
        }
    }
})

const IndexInscripciones = () => {
    const classes = useStyles();
    const { data: queryData, loading, error } = useQuery(GET_INSCRIPCIONES);
    const [aprobarInscripcion, { data: aprobarInscripcionData, loading: aprobarInscripcionLoading, error: aprobarInscripcionError }] = useMutation(APROBAR_INSCRIPCION, {
        onCompleted: (data) => {
            toast.success('Inscripción aprobada')
        },
        refetchQueries: [GET_INSCRIPCIONES]
    });
    const [rechazarInscripcion, { data: rechazarInscripcionData, loading: rechazarInscripcionLoading, error: rechazarInscripcionError }] = useMutation(RECHAZAR_INSCRIPCION, {
        onCompleted: (data) => {
            toast.error('Inscripción rechazada')
        },
        refetchQueries: [GET_INSCRIPCIONES]
    });

    const handleAprobarInscripcion = (id) => {
        aprobarInscripcion({ variables: { aprobarInscripcionId: id } })
    }

    const handlerRechazarInscripcion = (id) => {
        rechazarInscripcion({ variables: { rechazarInscripcionId: id } })
    }

    useEffect(() => {
        console.log('datos Inscripciones', queryData);
    }, [queryData]);

    if (loading) return <div>Cargando...</div>;

    if (queryData.Inscripciones) {
        return (
            <div>
                <div className='H1-header'>Inscripciones</div>
                <p className='H2-header'>Aquí puedes ver y gestionar los estudiantes inscritos a un proyecto.</p>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow className={classes.thead}>
                            <TableCell>Estudiante</TableCell>
                            <TableCell>Proyecto</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align='center'>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            queryData.Inscripciones.map((Inscripcion) => {
                                return (
                                    <TableRow className={classes.row} key={Inscripcion._id}>
                                        <TableCell>{Inscripcion.estudiante.nombre} {Inscripcion.estudiante.apellido}</TableCell>
                                        <TableCell>{Inscripcion.proyecto.nombre}</TableCell>
                                        <TableCell>{Inscripcion.estado}</TableCell>
                                        <TableCell align='center'>
                                            <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']} >
                                                <LoadingButton onClick={() => handleAprobarInscripcion(Inscripcion._id)}
                                                    text='APROBAR'
                                                />
                                                <LoadingButton
                                                    bgColor="bg-slate"
                                                    onClick={() => handlerRechazarInscripcion(Inscripcion._id)}
                                                    text='RECHAZAR'
                                                />

                                            </PrivateComponent>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default IndexInscripciones;
