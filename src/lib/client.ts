import { GraphQLClient } from 'graphql-request'

export { gql } from 'graphql-request'

export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    // headers: {
    //   'x-api-key': process.env.GRAFBASE_API_KEY as string
    // }
  }
)