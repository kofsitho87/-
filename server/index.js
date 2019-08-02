import express from 'express'
import { ApolloServer, AuthenticationError } from 'apollo-server-express'

import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

require('dotenv').config()

const app = express();
app.use(bodyParser.json())
app.use(cors())

const server = new ApolloServer({
  typeDefs: require('./graphql').typeDefs,
  resolvers: require('./graphql').resolvers,
  context: ({ req }) => {
    let authToken = null
    let currentUser = null

    try {
      // get the user token from the headers
      authToken = req.headers.authorization || ''
      if(authToken){
        let result = jwt.verify(authToken, process.env.JWT_SECRET)
        if(result){
          currentUser = result
        }
      }
    } catch (e) {
      throw new AuthenticationError(
        'Authentication token is invalid, please log in'
      )
    }
    return {
      authToken,
      currentUser,
    }
  },
});

server.applyMiddleware({ app, path:'/graphql' });


app.listen({ port: 4000 }, () =>
  console.log(`Server ready at http://localhost:4000`)
);