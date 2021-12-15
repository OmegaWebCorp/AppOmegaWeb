
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams, useNavigate, Link } from 'react-router-dom';
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

const EditarUsuario = () => {

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  let navigate = useNavigate();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError },] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    delete formData.rol;
    editarUsuario({
      variables: { _id, ...formData },
    });
    navigate('/usuarios')
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario editado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (

    // ** Encabezado sección **

    <div>
      <div className='H1-header'>Editar usuario</div>
      <p className='H2-header'>Aquí puedes editar y actualizar la información del usuario.</p>
      <div className='flew flex-col w-full h-full items-center justify-center p-10 H4-gray'>
        <Link to='/usuarios'>
          <i className='fas fa-arrow-left text-gray cursor-pointer font-bold text-xl hover:text-green-dark' />
        </Link>

        <form
          onSubmit={submitForm}
          onChange={updateFormData}
          ref={form}
          className='flex flex-col items-left ml-5 h-90 w-80'
        >
          <Input
            label='Nombre de la persona:'
            type='text'
            name='nombre'
            defaultValue={queryData.Usuario.nombre}
            required={true}

          />
          <Input
            label='Apellido de la persona:'
            type='text'
            name='apellido'
            defaultValue={queryData.Usuario.apellido}
            required={true}
          />
          <Input
            label='Correo de la persona:'
            type='email'
            name='correo'
            defaultValue={queryData.Usuario.correo}
            required={true}
          />
          <Input
            label='Identificación de la persona:'
            type='text'
            name='identificacion'
            defaultValue={queryData.Usuario.identificacion}
            required={true}
          />
          <DropDown
            label='Estado de la persona:'
            name='estado'
            defaultValue={queryData.Usuario.estado}
            required={true}
            options={Enum_EstadoUsuario}
          />
          <span>Rol del usuario: {queryData.Usuario.rol}</span>
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

export default EditarUsuario;
