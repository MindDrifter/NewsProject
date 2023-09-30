import { ApolloServer } from '@apollo/server';
import { GraphQLScalarType } from 'graphql';
import fs from 'fs';
import express from 'express';
import http from 'http';
import { fileURLToPath } from 'url';
const app = express();
const httpServer = http.createServer(app);
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import jwt from 'jsonwebtoken';
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

  input UserInput {
    name: String
    password: String
  }

  type ResponseMessage{
    message:String!
    status:Int!
  }

  type ResponseMessageWithToken{
    message:String!
    status:Int!
    accessToken:String!
    refreshToken:String!
  }

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
    UploadImage(id: ImageType): ImageType,
    UserInformation: Author
    
  }

  type Mutation {
    CreateNews (news: NewsInput): ResponseMessage,
    CreateUser (user: UserInput): ResponseMessageWithToken
  }
`;
const author = [
    {
        id: 0,
        name: 'Kate Chopin',
        accessToken: '',
        refreshToken: ''
    },
    {
        id: 1,
        name: 'Mike Chopin',
        accessToken: '',
        refreshToken: ''
    },
];
const group = [
    {
        id: 0,
        name: 'Games4Loosers',
    },
    {
        id: 1,
        name: 'Games4Fun',
    },
];
const comments = [
    {
        id: 1,
        NewsId: 1,
        author: 'Kate Chopin',
        authorImage: '',
        content: 'comment 1',
        likes: 0
    }
];
const newsData = [
    {
        id: 0,
        groupId: 0,
        group: 'Games4Loosers',
        authorId: 0,
        author: 'Kate Chopin',
        authorImage: '',
        title: 'GTA V',
        image: "gta5.png",
        content: 'My opinion about new game from Rockstar. Very good game',
        likes: 0,
        commentsId: [1],
        rating: 0,
    },
    {
        id: 1,
        groupId: 1,
        group: 'Games4Fun',
        authorId: 1,
        author: 'Mike Chopin',
        authorImage: '',
        title: 'Skyrim',
        image: "skyrim.png",
        content: 'My opinion about new game from Bethesda. Very bad game',
        likes: 0,
        commentsId: [],
        rating: 0.5
    },
    {
        id: 2,
        groupId: 1,
        group: 'Games4Fun',
        authorId: undefined,
        author: '',
        authorImage: '',
        title: 'Skyrim2',
        image: "skyrim.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet bibendum sapien at bibendum. Sed a volutpat urna. Suspendisse risus nisl, consequat dictum velit at, suscipit malesuada urna. Proin dictum eu purus sed scelerisque. Ut id aliquet sem.",
        likes: 0,
        commentsId: [],
        rating: 0.9
    },
    {
        id: 3,
        groupId: undefined,
        group: '',
        authorId: 1,
        author: 'Mike Chopin',
        authorImage: '',
        title: 'Skyrim2',
        image: "skyrim.png",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquet bibendum sapien at bibendum. Sed a volutpat urna. Suspendisse risus nisl, consequat dictum velit at, suscipit malesuada urna. Proin dictum eu purus sed scelerisque. Ut id aliquet sem.",
        likes: 0,
        commentsId: [],
        rating: 0.9
    },
];
// console.log(news.find(news=>news.id === 1));
const imageType = new GraphQLScalarType({
    name: 'Image',
    serialize: () => { return { data: 'ffff' }; },
    parseValue: (val) => {
        console.log(val);
        return val;
    },
});
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    ImageType: imageType,
    Query: {
        AllNews: (_, __, context) => {
            console.log('fetching');
            // console.log(context);
            return [...newsData].reverse();
        },
        AllNewsByRating: (_, { sortType }) => {
            return sortType === 'desc' ? [...newsData].sort((a, b) => { return b.rating - a.rating; })
                : [...newsData].sort((a, b) => { return a.rating - b.rating; });
        },
        NewsById: (_, args) => {
            console.log(args);
            return newsData.find(news => news.id == args.id);
        },
        UploadImage: (_, args) => {
            console.log(args);
            return imageType;
        },
        UserInformation: (_, __, context) => {
            const userData = jwt.verify(context.token, 'secret');
            console.log(userData, 'NEW');
            return { name: userData.user };
        }
    },
    Mutation: {
        CreateNews: (_, { news }) => {
            console.log(news);
            newsData.push({
                id: Date.now(),
                ...news,
                authorImage: '',
                likes: 0,
                commentsId: [],
                rating: 0
            });
            console.log(newsData);
            return { message: "News created", status: 200 };
        },
        CreateUser: (_, { user }, context) => {
            console.log(context);
            const accessToken = jwt.sign({ user: user.name, password: user.password }, 'secret', { expiresIn: '10h' });
            const refreshToken = jwt.sign({ user: user.name, password: user.password }, 'secret', { expiresIn: '30d' });
            author.push({
                id: 2,
                name: user.name,
                accessToken: accessToken,
                refreshToken
            });
            return { message: 'User created', status: 200, accessToken: accessToken, refreshToken: refreshToken };
        }
    }
};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use('/graphql', cors(), 
// 50mb is the limit that `startStandaloneServer` uses, but you may configure this to suit your needs
bodyParser.json({ limit: '50mb' }), 
// expressMiddleware accepts the same arguments:
// an Apollo Server instance and optional configuration options
expressMiddleware(server, {
    context: async ({ req }) => ({
        // token: req.headers.token 
        token: req.headers.accesstoken
    }),
}));
// Path Refinements
app.use('/images', bodyParser.json({ limit: '50mb' }), (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    console.log(__dirname + '/public/1.png');
    const img = fs.readFileSync(__dirname + '/public/download.jpg');
    res.setHeader('content-type', 'image/jpg').send(img);
    console.log(img);
    //  res.json({data:'23rsd'})
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
// const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });
// console.log(`🚀 Server listening at: ${url}`);
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/`);
