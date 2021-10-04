const express = require('express');
const Post = require('../models/Post')
const Forum = require('../models/Forum')
const router = require('express').Router();
const session = require('express-session');


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
                forum:req.body.forum,
                comments:req.body.comments
            })
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
        .select('title text createdAt likes _id user forum')
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
                forum:post.forum
            }
            
            res.status(200).json(selectedPost)
        })
    })
// //Coments
// router.post('/comment/:id', (req, res, next) =>{
//     const comment = { msg:req.body.msg, comments:req.body.comments  }
//     Post.findByIdAndUpdate(req.params.id, {comments: [...originalComments, comment]}, {new: true, omitUndefined:true})
//         .exec((err, post) =>{
//             if(err) next(err)
//             if(!post) return res.status(404).send('Not Found')
//             res.status(201).send('Post Edited')
//         })
// })
    
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


module.exports = router