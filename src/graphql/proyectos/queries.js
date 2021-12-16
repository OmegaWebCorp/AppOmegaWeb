import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      presupuesto
      fechaFin
      fase
      fechaInicio
      objetivos {
        descripcion
        tipo
      }
      lider {
        _id
        correo
        nombre
        apellido
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS };