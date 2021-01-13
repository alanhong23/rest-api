const express = require("express")
const Post = require("../models/post")

const router = express.Router()

//get back posts
router.get('/',async (req,res) =>{
    try {
        const posts = await Post.find()
        res.json(posts) 
    } catch (err) {
        res.json({ message: err })
    }
})

//send posts
router.post("/", async (req,res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const savedPost = await post.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ messgae: err })
    }
    
})

//get specific post
router.get("/:post_id", async (req,res) =>{
    try {
        const post = await Post.findById( req.params.post_id )
        res.json(post)
    } catch (err) {
        res.json({ message: err })
    }
})

//delete specific post
router.delete("/:post_id", async (req,res) => {
    try {
        const title = await Post.findById({ _id: req.params.post_id })
        const removedPost = await Post.deleteOne({ _id: req.params.post_id })

        console.log(`removed "${title.title}"`)
        res.end()
    } catch (err) {
        res.json({ message: err })
    }
})

//update specific post
router.patch("/:post_id", async (req,res) => {

    try {
        await Post.updateOne(
            { _id: req.params.post_id }, 
            { 
                title: req.body.title , 
                description: req.body.description
            }
        )
        res.end()
    } catch (err) {
        res.json({ message: err })
    }
    
})


module.exports = router