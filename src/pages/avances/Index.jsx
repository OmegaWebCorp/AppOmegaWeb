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


const IndexAvance = () => {
    const { projectid } = useParams();
    const [openDialog, setOpenDialog] = useState(false);

    const { data, loading } = useQuery(GET_AVANCES, {
        variables: {
            project: projectid,
        },
    });


    return (
        <div className='flex flex-col p-10 items-center w-full'>
            <h1 className='text-2xl font-bold text-gray-900 my-2'>
                Avances del proyecto {projectid}
            </h1>
        </div>
    );
};


export default IndexAvance;
