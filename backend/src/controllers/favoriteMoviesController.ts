import { Request, Response } from 'express'
import User from '../models/userModel'
import Movie from '../models/movieModel'
import { AuthenticatedRequest } from '../middleware/authMiddleware'

export const addFavorite = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { imdbID, title, year, genre, plot, poster } = req.body
  const userId = req.user?.userId

  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const isAlreadyFavorite = user.favorites.includes(imdbID)
    if (isAlreadyFavorite) {
      res.status(400).json({ message: 'Movie is already in favorites' })
      return
    }

    const existingMovie = await Movie.findOne({ imdbID })
    if (!existingMovie) {
      const newMovie = new Movie({ imdbID, title, year, genre, plot, poster })
      await newMovie.save()
    }

    user.favorites.push(imdbID)
    await user.save()

    res.status(200).json({ message: 'Movie added to favorites' })
  } catch (error) {
    console.error('Error in addFavorite:', error)
    res.status(500).json({ message: 'Server error', error })
  }
}

export const getFavorites = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId

  try {
    const user = await User.findById(userId).populate('favorites')
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const favoriteMovies = await Movie.find({ imdbID: { $in: user.favorites } })

    res.status(200).json(favoriteMovies)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}

export const removeFavorite = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { imdbID } = req.params
  const userId = req.user?.userId

  try {
    const user = await User.findById(userId)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const favoriteIndex = user.favorites.indexOf(imdbID)
    if (favoriteIndex === -1) {
      res.status(400).json({ message: 'Movie not found in favorites' })
      return
    }

    user.favorites.splice(favoriteIndex, 1)
    await user.save()

    res.status(200).json({ message: 'Movie removed from favorites' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error })
  }
}
