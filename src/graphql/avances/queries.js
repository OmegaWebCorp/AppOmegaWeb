import { gql } from '@apollo/client';

const GET_AVANCES = gql`
  query Avances($project: String!) {
    Avances(project: $project) {
      _id
      descripcion
      fecha
      observaciones
      proyecto {
        _id
        nombre
        lider{
          _id
          nombre
          apellido
        }
      }
      creadoPor{
        nombre
        apellido
        rol
      }
    }
  }
`;

export { GET_AVANCES };