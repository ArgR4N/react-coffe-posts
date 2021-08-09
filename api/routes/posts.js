const express = require('express');
const Post = require('../models/Post')

const router = require('express').Router();
const session = require('express-session');


router.get('/posts', (req, res, next) =>{
    Post.find()
        .sort({createdAt:-1})
        .exec((err, posts) =>{
            if (err) next(err);
            const postsList = posts.map(post => ({
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user
            }))
            res.status(200).json({
                count:postsList.length,
                posts:postsList
            })
        })
})

router.post('/posts', (req, res, next) =>{
    const post = new Post({
        title:req.body.title,
        text:req.body.text,
        user:req.body.username
    })
    post.save((err, post) =>{
        if(err) next(err);
        res.status(201).json(post)
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
        .select('title text createdAt likes _id user')
        .exec((err, post) =>{
            if (err) next(err);
            if(!post) return res.status(404).send("Not Found")
            console.log(post)
            const selectedPost = {
                title:post.title,
                text:post.text,
                _id:post._id,
                createdAt:post.createdAt,
                likes:post.likes,
                user:post.user
            }
            
            res.status(200).json(selectedPost)
        })
})

module.exports = router