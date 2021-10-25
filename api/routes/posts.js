const express = require('express');
const Post = require('../models/Post')
const Forum = require('../models/Forum')
const router = require('express').Router();
const session = require('express-session');
const Comment = require('../models/Comment')

router.get('/posts', (req, res, next) =>{
    Post.find()
        .exec((err, posts) =>{
            if (err) next(err);
            const postsList = posts.map(post => ({
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user,
                forum:post.forum,
                comments:post.comments
            }))
            return res.status(200).json({
                count:postsList.length,
                posts:postsList
            })
        })
})

router.post('/posts', (req, res, next) =>{
    Forum.findOne({name:req.body.forum})
    .exec((err, forum) => {
        if(!forum){
            res.status(406).json({msg:'No forum finded!'})
        }
        else if (forum){
            const post = new Post({
                title:req.body.title,
                text:req.body.text,
                user:req.body.username,
                forum:req.body.forum
            })
            console.log(req.body)
            post.save((err, post) =>{
                if(err) next(err);
                res.status(201).json(post)
            })
        }
    })
} )

router.put('/posts/:id', (req, res, next) =>{
    const newPost = {
        title:req.body.title,
        text:req.body.text,
        likes:req.body.likes
    }
    Post.findByIdAndUpdate(req.params.id, newPost, {new: true, omitUndefined:true})
        .exec((err, post ) =>{
            if(err) next(err);
            if(!post) res.status(404).json({msg:"Not Found"});
            res.status(200).json(post); 
        })
})

router.delete('/posts/:id', (req, res, next) =>{
    Post.findByIdAndDelete(req.params.id) 
        .exec((err, post) =>{
            if (err) next(err);
            if(!post) return res.status(404).send("Not Found")
            res.status(200).send("Deleted!")   
        })
    })
    
router.get('/posts/:id', (req, res, next) =>{
        Post.findById(req.params.id)
        .exec((err, post) =>{
            if (err) next(err);
            if(!post) return res.status(404).send("Not Found")

            const selectedPost = {
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user,
                forum:post.forum,
                comments:post.comments
            }
            
            res.status(200).json(selectedPost)
        })
    })


router.get("/comments", (req, res, next) =>{
    Comment.find()
    .exec((err, comments) =>{

        res.json(comments)
    })
    
})

router.get('/user=:username/posts', (req, res, next) =>{
    Post.find({user:req.params.username})
        .exec((err, posts) =>{
            if (err) next(err);
            const postsList = posts.map(post =>({
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user,
                forum:post.forum
            }))
            return res.status(200).json({count:postsList.length, postsList})
        })
});

router.get('/forum=:forum/posts', (req, res, next) =>{
    Post.find({forum:req.params.forum})
        .exec((err, posts) =>{
            if (err) next(err);
            const postsList = posts.map(post =>({
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user,
                forum:post.forum
            }))
            return res.status(200).json({count:postsList.length, postsList})
        })
});



// //Coments
router.put('/comment/:id&:parent', (req, res, next) =>{
    const comments = [new Comment({
        msg:req.body.msg, 
        user:req.params.id
    }), ...req.body.oldsComments]
    Post.findByIdAndUpdate(req.params.id, {comments} , {new: true, omitUndefined:true})
    .exec((err, post) =>{
        if(err) next(err)
        return res.status(201).json([true, comments])
    })
})

module.exports = router