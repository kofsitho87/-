import { gql } from 'apollo-server-express'

//import scheme from "./scheme.graphql"

import { Movie } from '../db'

export const typeDefs = gql`
  type Movie {
    id: String!
    title: String!
    overview: String
    poster: String
    rating: Int
  }
  type Query {
    movie(id: String): Movie
    movies(page: Int, count: Int): [Movie]!
    moviesTotal: Int!
  }
`;
export const resolvers = {
  Query: {
    movie: async (root, { id }, context, info) => {
      return Movie.findOne({ _id: id })
    },
    movies: async (root, {page, count}, context, info) => {
      const items = await Movie.find().skip((page - 1) * count).limit(count)
      return items.map(row => {
        row.rating = 0
        return row
      })
    },
    moviesTotal: async () => {
      return Movie.count()
    }
  },
};