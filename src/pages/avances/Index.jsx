import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
// ** import @apollo
import { useMutation, useQuery } from '@apollo/client';
// ** import components
import Input from 'components/Input';
import ButtonLoading from 'components/LoadingButton';
// ** import contexts
import { useUser } from 'context/userContext';
// ** import hooks
import useFormData from 'hooks/useFormData';
// ** import gql mutations/queries
import { GET_AVANCES } from 'graphql/avances/queries';
import { CREAR_AVANCE } from 'graphql/avances/mutations';
import { GET_PROYECTO } from 'graphql/proyectos/queries'
// ** imports estilos
import { Dialog } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

import { Enum_Rol } from 'utils/enums';

/***** Traer el nombre del Proyecto ******/
const IndexAvance = () => {
    const { projectid } = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const { data, loading } = useQuery(GET_AVANCES, {
        variables: {
            project: projectid,
        },
    });

    const { data: proyectoData, loading: proyectoLoading } = useQuery(GET_PROYECTO, {
        variables: {
            id: projectid
        }
    })

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className='H1-header'>Avances del proyecto</div>
            {
                proyectoData &&
                <>
                    <div className='self-start flew flex-col w-full h-full items-center justify-center p-10 ml-5'>
                        <Link className='font-Quicksand font-medium text-lg text-gray-dark hover:underline' to='/index'>
                            <i className='fas fa-arrow-left hover:text-green mr-2' />Volver
                        </Link>
                    </div>
                    <div className='H2-header'><b>Proyecto: </b>{proyectoData.Proyecto.nombre}</div>
                    <p className='H2-header'>{proyectoData.Proyecto._id}</p>
                </>
            }
            <div className='flew flex-col w-full h-full items-center justify-center p-10 ml-4'>

                {data.Avances.length === 0 ? (
                    <div>No hay avances para este proyecto</div>
                ) : (
                    <ListaAvances avances={data.Avances}></ListaAvances>
                )}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                    <CrearAvance proyecto={projectid} setOpenDialog={setOpenDialog} />
                </Dialog>
                <button
                    onClick={() => setOpenDialog(true)}
                    className='Button-2'
                    type='button'
                >
                    Crear nuevo avance
                </button>
            </div>
        </div>
    );
};

const CrearAvance = ({ proyecto, setOpenDialog }) => {
    const { userData } = useUser();
    const { form, formData, updateFormData } = useFormData();

    const [crearAvance, { loading }] = useMutation(CREAR_AVANCE, {
        refetchQueries: [GET_AVANCES],
    });

    const submitForm = (e) => {
        e.preventDefault();

        crearAvance({
            variables: { ...formData, proyecto, creadoPor: userData._id },
        })
            .then(() => {
                toast.success('avance creado con exito');
                setOpenDialog(false);
            })
            .catch(() => {
                toast.error('error creando el avance');
            });
    };
    return (
        <div className='p-4'>
            <h1 className='Header-dialog'>Crear Nuevo Avance</h1>
            <div className='flex flex-col items-left h-90 w-80 H4-gray'>
                <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
                    <Input name='descripcion' label='Descripción' type='text' />
                    <Input name='fecha' label='Fecha' type='date' />
                    <ButtonLoading
                        text='Crear Avance'
                        loading={loading}
                        disabled={Object.keys(formData).length === 0}
                    />
                </form>
            </div>
        </div>
    );
};

const ListaAvances = ({ avances }) => {
    return (
        <List sx={{ width: '100%', maxWidth: 800, bgcolor: 'background.paper' }}>
            {
                avances && avances.map(avance => {
                    return (
                        <DescripcionAvance key={avance._id} avance={avance}></DescripcionAvance>
                    )
                })
            }
        </List>
    )
}

const DescripcionAvance = ({ avance }) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={avance.descripcion}
                    secondary={
                        <>
                            <p>{`${avance.creadoPor.nombre} ${avance.creadoPor.apellido}`}</p>
                            <p>{Enum_Rol[avance.creadoPor.rol]}</p>
                            <p>{avance.fecha}</p>
                        </>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    )
}

export default IndexAvance;
