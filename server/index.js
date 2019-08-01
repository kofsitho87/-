import express from 'express'
import { ApolloServer } from 'apollo-server-express'

import connector from './db/connector'

const server = new ApolloServer({
  typeDefs: require('./graphql').typeDefs,
  //typeDefs: './graphql/sceme.graphql',
  resolvers: require('./graphql').resolvers
});

const app = express();
server.applyMiddleware({ app, path:'/graphql' });


app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000`)
);