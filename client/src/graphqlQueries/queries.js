import { gql } from 'apollo-boost';

export const QUERY_ALLMOVIES = gql`
  query  {
    movies {
        id
        name
        genre
        rate
        watched
        director{
          name
        }
    }
  }
`
export const QWERY_ALLDIRECTORS = gql`
  query  {
    directors {
      id
      name
      age
      movies{
        name
        id
      }
    }
  }
`