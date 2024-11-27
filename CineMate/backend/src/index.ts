import express from 'express'
import cors from 'cors'
import connectDB from './db/db'
import authRoutes from './routes/authRoutes'
import favoriteMoviesRoutes from './routes/favoriteMoviesRoutes'

const app = express()
app.use(cors())
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 6008

app.get('/', (req, res) => {
  res.send('CineMate API is running...')
})

app.use('/auth', authRoutes)
app.use('/favorites', favoriteMoviesRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
