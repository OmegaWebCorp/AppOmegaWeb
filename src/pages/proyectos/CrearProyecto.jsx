import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { Link, useNavigate } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import LoadingButton from 'components/LoadingButton';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext, useObj } from 'context/objContext';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import PrivateRoute from 'components/PrivateRoute';
import { PROYECTOS } from 'graphql/proyectos/queries';
import { useUser } from 'context/userContext';
import { GET_USUARIO } from 'graphql/usuarios/queries';

import PrivateComponent from 'components/PrivateComponent';



const CrearProyecto = () => {
  const navigate = useNavigate();
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
  const [listaUsuarios, setListaUsuarios] = useState({});
  
 

  const { data, loading } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { rol: 'LIDER', estado: 'AUTORIZADO'  },
    },
  });

  const [crearProyecto, { loading: crearProyectoLoading, error: crearProyectoError }] = useMutation(CREAR_PROYECTO, {
    onCompleted: () => {
      toast.success('Proyecto creado correctamente')
      navigate('/index')
    },
    onError: () => {
      toast.error('Algo salió mal')
    },
    refetchQueries:[PROYECTOS]
  });

  useEffect(() => {
    if (data) {
      const lu = {};
      data.Usuarios.forEach((elemento) => {
        lu[elemento._id] = elemento.correo;
      });

      setListaUsuarios(lu);
    }
  }, [data]);

  const submitForm = (e) => {
    
    if(queryData.Usuario.rol ==='LIDER'){

      formData.lider= userData._id
    }
    e.preventDefault();

    formData.objetivos = Object.values(formData.objetivos);
    formData.presupuesto = parseFloat(formData.presupuesto);

   
    crearProyecto({
      variables: formData,
    });
  };

  if (loading) return <div>...Loading</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR', 'LIDER']}>
      <div>
        <div className='H1-header'>Crear proyecto</div>
        <p className='H2-header'>Ingresa la información para crear un nuevo proyecto.</p>
        <div className='mt-10'>
          <form className='flex flex-col items-left ml-14 h-90 w-80 H4-gray' ref={form} onChange={updateFormData} onSubmit={submitForm}>
            <Input name='nombre' label='Nombre del Proyecto' required type='text' />
            <Input
              name='presupuesto'
              label='Presupuesto del Proyecto'
              required
              type='number'
            />
            <Input
              name='fechaInicio'
              label='Fecha de Inicio'
              required
              type='date'
            />
            <Input name='fechaFin' label='Fecha de Fin' required type='date' />
            <PrivateComponent roleList={['ADMINISTRADOR']}>
            <DropDown label='Líder' options={listaUsuarios} name='lider' required />
            </PrivateComponent >
            
            <Objetivos />
            <LoadingButton text='Crear Proyecto' loading={crearProyectoLoading} />
          </form>
        </div>
      </div>
    </PrivateRoute >
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div>
        <span>Agregar objetivo al proyecto</span>
        {!maxObjetivos && (
          <button
            type='button'
            onClick={() =>
              setListaObjetivos([
                ...listaObjetivos,
                componenteObjetivoAgregado(),
              ])
            }
          >
            <i className='fas fa-plus rounded-full bg-green hover:bg-green text-white p-2 mx-2 cursor-pointer mt-4' />
          </button>
        )}
        {listaObjetivos.map((objetivo) => objetivo)}
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center flex space-x-4 mt-4'>
      <Input
        name={`nested||objetivos||${id}||descripcion`}
        label='Descripción'
        type='text'
        required
      />
      <DropDown
        name={`nested||objetivos||${id}||tipo`}
        options={Enum_TipoObjetivo}
        label='Tipo de Objetivo'
        required
      />
      <button type='button' onClick={() => eliminarObjetivo(id)}>
        <i className='fas fa-minus rounded-full bg-red hover:bg-gray-dark text-white p-2 mx-2 cursor-pointer mt-6' />
      </button>
    </div>
  );
};


export default CrearProyecto;
