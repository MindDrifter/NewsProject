import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'
import {GraphQLScalarType, locatedError} from 'graphql'

import fs from 'fs'

import express from 'express';
import http from 'http';

import url, { fileURLToPath } from 'url' 

const app = express();
const httpServer = http.createServer(app);
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import path, {dirname} from 'path';


type SortType = {
  sortType: 'desc' | 'asc'
}

type News = {
  id:number,
  groupId: number,
  group: string,
  authorId: number,
  author: string,
  authorImage: string, //#TODO
  title: string,
  image:string, //#TODO
  content: string,
  likes: number,
  commentsId:number[],
  rating: number
}

type NewsInput = {
  news:{
    groupId: number
    group: string
    authorId: number
    author: string
    title: string
    image: string
    content: string
  }
}
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  scalar ImageType

  enum SortType {
    desc
    asc
  }


  input NewsInput {
    groupId: Int
    group: String
    authorId: Int
    author: String
    title: String
    image: String
    content: String
  }

  type ResponseMessage{
    message:String!
    status:Int!
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Group {
    id:ID!
    name:String!
  }

  type Author {
    id:ID!
    name:String!
  }
  
  type Comment {
    id: ID!
    NewsId: Int!
    authorId: String!
    authorImage: String!
    content: String!
  }

  type News {
    id: ID!
    groupId:Int
    group: String
    author:String
    authorId: Int
    authorImage: String
    title: String
    image: String
    content: String
    commentsId: [Int]
    likes: Int!
    rating: Float!
  }

  


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    AllNews: [News],
    AllNewsByRating (sortType:SortType!): [News],
    NewsById (id: ID!):News,
    UploadImage(id: ImageType): ImageType
    
  }

  type Mutation {
    CreateNews (news: NewsInput): ResponseMessage
  }
`;

const author =[
  {
    id:0,
    name:'Kate Chopin'
  },
  {
    id:1,
    name:'Mike Chopin'
  },
]

const group = [
  {
    id:0,
    name:'Games4Loosers',
  },
  {
    id:1,
    name:'Games4Fun',
  },

]

const comments = [
  {
    id:1,
    NewsId:1,
    author: 'Kate Chopin',
    authorImage: '',
    content:'comment 1',
    likes: 0
  }
]

const newsData:News[]  = [
  {
    id:0,
    groupId: 0,
    group: 'Games4Loosers',
    authorId: 0,
    author: 'Kate Chopin',
    authorImage: '',
    title: 'GTA V',
    image:"gta5.png",
    content: 'My opinion about new game from Rockstar. Very good game',
    likes: 0,
    commentsId:[1],
    rating: 0,

  },
  {
    id:1,
    groupId: 1,
    group: 'Games4Fun',
    authorId: 1,
    author: 'Mike Chopin',
    authorImage: '',
    title: 'Skyrim',
    image:"skyrim.png",
    content: 'My opinion about new game from Bethesda. Very bad game',
    likes: 0,
    commentsId:[],
    rating: 0.5
  },
  {
    id:2,
    groupId: 1,
    group: 'Games4Fun',
    authorId: undefined,
    author: '',
    authorImage: '',
    title: 'Skyrim2',
    image:"skyrim.png",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet bibendum sapien at bibendum. Sed a volutpat urna. Suspendisse risus nisl, consequat dictum velit at, suscipit malesuada urna. Proin dictum eu purus sed scelerisque. Ut id aliquet sem.",
    likes: 0,
    commentsId:[],
    rating: 0.9
  },
  {
    id:3,
    groupId: undefined,
    group: '',
    authorId: 1,
    author: 'Mike Chopin',
    authorImage: '',
    title: 'Skyrim2',
    image:"skyrim.png",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet bibendum sapien at bibendum. Sed a volutpat urna. Suspendisse risus nisl, consequat dictum velit at, suscipit malesuada urna. Proin dictum eu purus sed scelerisque. Ut id aliquet sem.",
    likes: 0,
    commentsId:[],
    rating: 0.9
  },
];

// console.log(news.find(news=>news.id === 1));



const imageType = new GraphQLScalarType ({
  name:'Image',
  serialize:()=>{return {data:'ffff'}},
  parseValue:(val)=>{
    console.log(val);
    
    return val},
})

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  ImageType:imageType,
  Query: {
    AllNews: () => {
      console.log('fetching')
      return [...newsData].reverse()
    },
    AllNewsByRating: (_, {sortType}:SortType) => {
      return sortType === 'desc' ? [...newsData].sort((a,b)=>{return b.rating-a.rating})
      :[...newsData].sort((a,b)=>{return a.rating-b.rating})
    },
    NewsById: (_, args: { id:number } ) =>{
    console.log( args );
      return newsData.find( news=>news.id == args.id )
    },
    UploadImage: (_, args) =>{
      console.log(args)
      return imageType},
    
  },
  Mutation:{
    CreateNews: (_, {news}:NewsInput)=>{console.log(news);
   
      newsData.push({
        id: Date.now(),
        ...news,
        authorImage:'',
        likes: 0,
        commentsId: [],
        rating: 0
      },)

      console.log(newsData);
      
      return {message:"News created", status:200}
    }
  }
  
};

interface MyContext {
  token?: String;
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});


await server.start();

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  // 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
  bodyParser.json({ limit: '50mb' }),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ 
      token: req.headers.token  
    }),

  }),
)


// Path Refinements


app.use('/images', 
bodyParser.json({ limit: '50mb' }), 
(req, res)=>{
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  console.log(__dirname + '/public/1.png');
  
  const img = fs.readFileSync(__dirname + '/public/download.jpg'  )
  res.setHeader('content-type', 'image/jpg').send(img)
  console.log(img);

//  res.json({data:'23rsd'})

})

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

// console.log(`🚀 Server listening at: ${url}`);


await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);