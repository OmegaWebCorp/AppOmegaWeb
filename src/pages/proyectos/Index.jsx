import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// ** import @apollo
import { useMutation, useQuery } from '@apollo/client';
// ** import components
import PrivateComponent from 'components/PrivateComponent';
import DropDown from 'components/Dropdown';
import LoadingButton from 'components/LoadingButton';
import { AccordionStyled, AccordionSummaryStyled, AccordionDetailsStyled, } from 'components/Accordion';
// ** import contexts
import { useUser } from 'context/userContext';
// ** import hooks
import useFormData from 'hooks/useFormData';
// ** import gql mutations/queries
import { PROYECTOS } from 'graphql/proyectos/queries';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutations';
// ** import ROLES-enums
import { Enum_EstadoProyecto } from 'utils/enums';
// ** imports estilos
import { Dialog } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Enum_FaseProyecto } from 'utils/enums';


const Index = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log('datos proyecto', queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  if (queryData.Proyectos) {
    return (
      // ** Encabezado sección **
      <div>
        <div className='H1-header'>Proyectos</div>
        <p className='H2-header'>Aquí puedes ver todos tus proyectos.</p>
        <div className='p-14 flex flex-col'>
          <div className='flex w-full items-center justify-center'>
          </div>
          {/** link para crear un proyecto desde ADMINISTRADOR **/}
          <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
            <div className='my-2 self-end'>
              {/*<button className='bg-gray-lightest text-gray-dark p-2 rounded-lg shadow-lg hover:bg-green'>
                <Link to='/proyectos/CrearProyecto'>Crear nuevo proyecto</Link>
                </button>*/}
            </div>
          </PrivateComponent>
          {queryData.Proyectos.map((proyecto) => {
            return <AccordionProyecto proyecto={proyecto} />;
          })}
        </div>
      </div>
    );
  }

  return <></>;
};


const AccordionProyecto = ({ proyecto }) => {

  const [showDialog, setShowDialog] = useState(false);
  const onCloseEditForm = () => {
    setShowDialog(false)
  }
  return (
    <>
      {/*** Estilos accordion ***/}
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down text-green hover:text-white' />}>
          <div className='flex w-full justify-between'>
            <div className='H3-header1'>
              {proyecto.nombre}
              <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
                <button
                  className='text-white mx-10 hover:text-green ml-6 cursor-pointer px-2'
                  onClick={() => {
                    setShowDialog(true);
                  }}>
                  {proyecto.estado}
                  <FontAwesomeIcon className='ml-2' icon={faPen} />
                </button>
              </PrivateComponent>
            </div>
          </div>

          {/*** Estilos botón editar proyecto ***/}
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>

          <PrivateComponent roleList={['ESTUDIANTE']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.estado}
              inscripciones={proyecto.inscripciones}
            />
          </PrivateComponent >

          {/*** Estilos internos accordion ***/}
          <div className='font-Quicksand ml-5 mr-5 mt-2 flex flex-cols-4 p-2 justify-between rounded-lg border border-gray-light'>
            <div className='font-Quicksand flex flex-col p-2'>
              <b>Liderado por: </b>
              {proyecto.lider.nombre} {proyecto.lider.apellido}
            </div>
            <div className='font-Quicksand ml-2 flex flex-col p-2'>
              <b>Presupuesto:</b> ${proyecto.presupuesto}
            </div>
            <div className='font-Quicksand ml-2 flex flex-col p-2'>
              <b>Fecha Inicio:</b> {proyecto.fechaInicio.substring(0, 10)}
            </div>
            <div className='font-Quicksand ml-2 flex flex-col p-2'>
              <b>Fecha Fin:</b> {proyecto.fechaFin.substring(0, 10)}
            </div>
            <div className='font-Quicksand ml-2 flex flex-col p-2'>
              <b>Fase:</b> {Enum_FaseProyecto[proyecto.fase]}
            </div>
            <Link className='flex flex-col' to={`/avances/${proyecto._id}`}>
              <LoadingButton text='Ver Avances'/>
            </Link>
          </div>
          <div className='flex H4-gray items-left'>
            {proyecto.objetivos.map((objetivo) => {
              return <Objetivo tipo={objetivo.tipo} descripcion={objetivo.descripcion} />;
            })}
          </div >
        </AccordionDetailsStyled>
      </AccordionStyled>

      <Dialog
        open={showDialog}
        onClose={() => {
          setShowDialog(false);
        }}
      >
        <FormEditProyecto _id={proyecto._id} estado={proyecto.estado} fase={proyecto.fase} onCloseEditForm={onCloseEditForm} />
      </Dialog>
    </>
  );
};

const FormEditProyecto = ({ _id, estado, fase, onCloseEditForm }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        campos: formData,
      },
    });
    onCloseEditForm()
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
  }, [dataMutation]);

  return (
    <div className='p-4'>
      <h1 className='Header-dialog'>Modificar Estado del Proyecto</h1>
      <form
        ref={form}
        onChange={updateFormData}
        onSubmit={submitForm}
        className='flex flex-col ml-4 h-90 w-80 H4-gray'
      >
        <DropDown label='Estado' name='estado' options={Enum_EstadoProyecto} defaultValue={estado} />
        <DropDown label='Fase' name='fase' options={Enum_FaseProyecto} defaultValue={fase} />
        <LoadingButton disabled={false} loading={loading} text='Confirmar' />
      </form>
    </div>
  );
};
{/*** Estilos internos accordion OBJETIVOS ***/ }
const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 p-8 rounded-lg border border-gray-light flex flex-col items-left justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <div>Editar</div>
      </PrivateComponent>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripciones }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripciones) {
      const flt = inscripciones.filter((el) => el.estudiante._id === userData._id);
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].estado);
      }
    }
  }, [userData, inscripciones]);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast.success('inscripcion creada con exito');
    }
  }, [data]);

  const confirmarInscripcion = () => {
    crearInscripcion({ variables: { proyecto: idProyecto, estudiante: userData._id } });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <span>Ya estas inscrito en este proyecto y el estado es {estadoInscripcion}</span>
      ) : (
        <LoadingButton
          onClick={() => confirmarInscripcion()}
          disabled={estado === 'INACTIVO'}
          loading={loading}
          text='Inscribirme en este proyecto'
        />
      )}
    </>
  );
};


export default Index;