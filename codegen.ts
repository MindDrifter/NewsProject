import {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema:"http://localhost:4000/graphql",
  documents: ['src/components/**/*.tsx', 'src/app/*.tsx', 'src/app/**/*.tsx'],
  ignoreNoDocuments: true,
  generates:{
    './gql/':{
      preset:'client',
      plugins: [],
    }
  }
}

export default config