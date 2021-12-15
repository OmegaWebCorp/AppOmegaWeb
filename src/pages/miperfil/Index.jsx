
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
// ** imports @apollo
import { useQuery, useMutation } from '@apollo/client';
// ** import components
import Input from 'components/Input';
import LoadingButton from 'components/LoadingButton';
import DropDown from 'components/Dropdown';
// ** import hooks
import useFormData from 'hooks/useFormData';
// ** import gql mutations-queries
import { EDITAR_USUARIO } from 'graphql/miperfil/mutations';
import { GET_USUARIO } from 'graphql/miperfil/queries';
// ** import ROLES-enums
import { Enum_EstadoUsuario } from 'utils/enums';

const IndexMiperfil = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Tus datos se editarón correctamente');
    }
  }, [mutationData]);

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
            //defaultValue={queryData.Usuario.nombre}
            required={true}
          />
          <Input
            label='Apellido:'
            type='text'
            name='apellido'
            //defaultValue={queryData.Usuario.apellido}
            required={true}
          />
          <Input
            label='Correo:'
            type='email'
            name='correo'
            //defaultValue={queryData.Usuario.correo}
            required={true}
          />
          <Input
            label='Documento:'
            type='text'
            name='identificacion'
            //defaultValue={queryData.Usuario.identificacion}
            required={true}
          />
          <DropDown
            label='Estado:'
            name='estado'
            //defaultValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoUsuario}
          />
          {/*<span>Rol del usuario: {queryData.Usuario.rol}</span>*/}
          <LoadingButton
            disabled={Object.keys(formData).length === 0}
            loading={mutationLoading}
            text='Confirmar'
          />
        </form>
      </div>
      </div>
    );
};

export default IndexMiperfil;
