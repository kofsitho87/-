import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { gql } from 'apollo-server-express'
import { Movie, User } from '../db'
import {authenticated} from '../auth/authenticated-guard'

export const typeDefs = gql`
  type Movie {
    id: String!
    title: String!
    overview: String
    poster: String
    totalRating: Int
    rating: Int
  }
  type User {
    id: String!
    name: String!
    email: String!
  }
  type Auth {
    user: User!
    token: String!
    me: User!
  }
  type Query {
    movie(id: String): Movie
    movies(page: Int, count: Int): [Movie]!
    moviesTotal: Int!
    me: User
  }
  type Mutation {
    signup (name: String!, email: String!, password: String!): String
    login (email: String!, password: String!): Auth!
    updateMovieRating (movieId: String!, rating: Int!): Float!
  }
`;
export const resolvers = {
  Query: {
    movie: async (root, { id }, context, info) => {
      return Movie.findOne({ _id: id })
    },
    // movie: authenticated((root, {id}, context) => {
    //   return Movie.findOne({ _id: id })
    // }),
    movies: async (root, {page, count}, context, info) => {
      const items = await Movie.find().skip((page - 1) * count).limit(count)
      return items.map(row => {
        let total = row.ratings.map(movie => movie.rating).reduce((movie1, movie2) => movie1 + movie2, 0)
        row.totalRating = total / row.ratings.length
        row.rating = 0
        if(context.currentUser){
          let userRating = row.ratings.find(movie => movie.userId == context.currentUser.id)
          if(userRating){
            row.rating = userRating.rating 
          }
        }
        return row
      })
    },
    moviesTotal: async () => {
      return Movie.count()
    },
    me: authenticated(async (root, params, context) => {
      if(context.currentUser){
        return await User.findOne({_id: context.currentUser.id})
      }
      return null
    }),
  },
  Mutation: {
    updateMovieRating: authenticated(async (root, {movieId, rating}, context) => {
      let data = {movieId, rating}
      try{
        let movie = await Movie.findOne({_id: movieId})
        if(!movie){
          throw new Error('EMPTY MOVIE')
        }

        let userId = context.currentUser.id
        let user = await User.findOne({_id: userId})
        // /console.log(user);
        
        if(!user){
          throw new Error('EMPTY USER')
        }
        let findRating = user.ratings.find(row => row.movieId == movieId)
        if(findRating){
          await User.findOneAndUpdate({"ratings._id": findRating.id}, {
            $set: {
              'ratings.$.rating': rating
            }
          })
        }else {
          await User.findOneAndUpdate({_id: userId}, {
            $push: {
              'ratings': {movieId, rating}
            }
          })
        }
        
        let findRating2 = movie.ratings ? movie.ratings.find(row => row.userId == userId) : null
        if(findRating2){
          await Movie.findOneAndUpdate({"ratings._id": findRating2.id}, {
            $set: {
              'ratings.$.rating': rating
            }
          })
        }else {
          await Movie.findOneAndUpdate({_id: movieId}, {
            $push: {
              'ratings': {userId, rating}
            }
          })
        }

        let newMovie = await Movie.findOne({_id: movieId})
        let total = newMovie.ratings.map(movie => movie.rating).reduce((movie1, movie2) => movie1 + movie2, 0)
        return total / newMovie.ratings.length
      }catch(e){
        console.log(e);
        throw e
      }
    }),
    async signup (_, { name, email, password }) {
      const user = await User.create({
        name,
        email,
        password: await bcrypt.hash(password, 10)
      })

      // return json web token
      return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' }
      )
    },

    // Handles user login
    async login (_, { email, password }) {
      const user = await User.findOne({ email })

      if (!user) {
        throw new Error('No user with that email')
      }

      const valid = await bcrypt.compare(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      let token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      )
      
      return {
        token,
        user
      }
    }
  }
};