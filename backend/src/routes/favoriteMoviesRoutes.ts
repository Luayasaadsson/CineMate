import express from 'express'
import { authenticateJWT } from '../middleware/authMiddleware'
import { addFavorite, getFavorites, removeFavorite } from '../controllers/favoriteMoviesController'

const router = express.Router()

router.post('/add', authenticateJWT, addFavorite)
router.get('/', authenticateJWT, getFavorites)
router.delete('/:imdbID', authenticateJWT, removeFavorite)

export default router
