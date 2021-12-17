
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
// ** imports @apollo
import { useQuery, useMutation } from '@apollo/client';
// ** import components
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
// ** import contexts
import { useUser } from 'context/userContext';
// ** import hooks
import useFormData from 'hooks/useFormData';
// ** import gql mutations-queries
import { EDITAR_PERFIL } from 'graphql/usuarios/mutations';
import { GET_USUARIO } from 'graphql/usuarios/queries';

const IndexMiperfil = () => {

  const { form, formData, updateFormData } = useFormData();
  const { userData, setUserData } = useUser();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
    refetch,
  } = useQuery(GET_USUARIO, {
    variables: {
      _id: userData._id,
    },
  });

  const [editarPerfil, { data: dataMutation, loading: loadingMutation, error: mutationError }] =
    useMutation(EDITAR_PERFIL);

  const submitForm = (e) => {
    e.preventDefault();
    //delete formData.rol;
    editarPerfil({
      variables: { _id: userData._id, campos: formData },
    });
  };

  useEffect(() => {
    if (dataMutation) {
      setUserData({ ...userData });
      toast.success('Tus datos se editarón correctamente');
      refetch();
    }
  }, [dataMutation]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando tus datos');
    }

    if (queryError) {
      toast.error('Error consultando los datos');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (

    // ** Encabezado sección **

    <div>
      <div className='H1-header'>Mi perfil</div>
      <p className='H2-header'>Aquí puedes editar y actualizar tu información.</p>
      <div className='flew flex-col w-full h-full items-center justify-center p-10 H4-gray'>

        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className='flex flex-col items-left ml-5 h-90 w-80'
        >
          <Input
            label='Nombre:'
            type='text'
            name='nombre'
            defaultValue={queryData.Usuario.nombre}
            required
          />
          <Input
            label='Apellido:'
            type='text'
            name='apellido'
            defaultValue={queryData.Usuario.apellido}
            required
          />
          <Input
            label='Documento:'
            type='text'
            name='identificacion'
            defaultValue={queryData.Usuario.identificacion}
            required
          />
          <Input
            label='Correo:'
            type='email'
            name='correo'
            defaultValue={queryData.Usuario.correo}
            required
          />
          <LoadingButton
            disabled={Object.keys(formData).length === 0}
            loading={loadingMutation}
            text='Confirmar'
          />
        </form>
      </div>
    </div>
  );
};

export default IndexMiperfil;
