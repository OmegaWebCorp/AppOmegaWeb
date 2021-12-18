import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
// ** imports estilos
import { Dialog } from '@mui/material';

/***** Traer el nombre del Proyecto ******/
const IndexAvance = () => {
    const { projectid } = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const { data, loading } = useQuery(GET_AVANCES, {
        variables: {
            project: projectid,
        },
    });

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className='H1-header'>Avances del proyecto</div>
            <div className='H2-header'>
            {projectid}</div>
            <div className='flew flex-col w-full h-full items-center justify-center p-10 ml-5'>
            <button
                onClick={() => setOpenDialog(true)}
                className='Button-2'
                type='button'
            >
                Crear nuevo avance
            </button>
            {/*data.Avances.length === 0 ? (
                <span>No tienes avances para este proyecto</span>
            ) : (
                data.Avances.map((avance) => <IndexAvance avance={avance} />)
            )*/}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <CrearAvance proyecto={projectid} setOpenDialog={setOpenDialog} />
            </Dialog>
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
            <div className='H4-gray'>
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


export default IndexAvance;
