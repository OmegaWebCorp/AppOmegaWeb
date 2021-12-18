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

const GET_PROYECTO = gql`

query Proyecto($id: String!){
  Proyecto(_id: $id){
    _id
    nombre
    fase
  }
}
`

export { PROYECTOS, GET_PROYECTO };