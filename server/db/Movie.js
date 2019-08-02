import mongoose from 'mongoose'

const Movie = new mongoose.Schema({
  // _id: {
  //   type: Number,
  //   required: true,    
  // },
  title: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
  },
  overview: {
    type: String,
  },
  ratings: []
});

export default mongoose.model('Movie', Movie);