
import { GraphQLClient } from 'graphql-request'

// import { devtools, persist } from 'zustand/middleware'

// export { gql } from 'graphql-request'


export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    // headers: {
    //   'x-api-key': process.env.GRAFBASE_API_KEY as string
    // }
    // headers: {
    //   'accessToken': localStorage.getItem('accessToken')!
    // }
  }
)