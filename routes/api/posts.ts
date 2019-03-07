import express from 'express'

const router = express.Router()

// @route   GET api/posts/test
// @desc    Tests posts route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Posts works!"}))

export default router
