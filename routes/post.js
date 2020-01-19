const express = require('express')
const {getPosts, createPost, postedByUser, postById, isPoster, deletePost, updatePost} = require('../controllers/post')
const {requireSignin} = require('../controllers/auth')
const {userById} = require('../controllers/user')
const {createPostValidator} = require('../validator')

const router = express.Router()

router.get("/posts", getPosts)
router.post("/post/new/:userId",requireSignin,createPost, createPostValidator)
router.get("/posts/by/:userId", requireSignin, postedByUser)
router.delete('/post/:postId', requireSignin, isPoster, deletePost)
router.put('/post/:postId', requireSignin, isPoster, updatePost)


//any routes containing userid , our app will first execute userbyId method
router.param("userId", userById)
//any routes containing postid , our app will first execute postById method
router.param("postId", postById)

module.exports = router;