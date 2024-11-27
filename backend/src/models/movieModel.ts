import mongoose, { Document, Schema } from 'mongoose'

interface IMovie extends Document {
  title: string
  year: number
  genre: string
  plot: string
}

const movieSchema: Schema = new Schema({
  imdbID: { type: String, required: true },
  title: { type: String, required: true },
  year: { type: Number, required: true },
  genre: { type: String, required: true },
  plot: { type: String, required: true },
  poster: { type: String, required: true },
})

export default mongoose.model<IMovie>('Movie', movieSchema)
