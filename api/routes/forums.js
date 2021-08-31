const express = require('express');
const router = require('express').Router();

const Forum = require('../models/Forum')

router.get('/forums', (req, res, next) =>{
    

    Forum.find()
        .exec((err, forums) =>{
            if (err) next(err);
            const forumsList = forums.map(forum => ({
                createdAt:forum.createdAt,
                users:forum.users,
                name:forum.name,
                description:forum.description
            }))
            res.status(200).json({
                count:forumsList.length,
                forums:forumsList
            })
        })
})

router.post('/forums', (req, res, next) =>{
    const forum = new Forum({
        name:req.body.name,
        description:req.body.description,
        users:[req.user.username]
    })
    Forum.findOne({name:forum.name})
        .exec((err, createdForum) =>{
            if(err) next(err);
            if(createdForum) res.status(404).send(new Error('The forum alredy exist'))
            else{
                forum.save((err, forum) =>{
                    if(err) next(err);
                    res.status(201).send([true, forum])
                })
            }
        } )
} )

router.put('/forums/:forum', (req, res, next) =>{
    const newForum = {
        name:req.body.name,
        description:req.body.description,
        users:req.body.users
    }
    Forum.findOne( {name:req.params.forum} , newForum, {new: true, omitUndefined:true})
        .exec((err, forum ) =>{
            if(err) next(err);
            if(!forum) res.status(404).json({msg:"Not Found"});
            res.status(200).json(forum); 
        })
})

router.delete('/forums/:id', (req, res, next) =>{
    Forum.findOne({name:req.params.forum})
        .exec((err, forum) =>{
            if (err) next(err);
            if(!forum) return res.status(404).send("Not Found")
            res.status(200).send("Deleted!")   
        })
    })
    
    router.get('/forums/:forum', (req, res, next) =>{
        Forum.findOne({name:req.params.forum})
        .select('name description createdAt users')
        .exec((err, forum) =>{
            if (err) next(err);
            if(!forum) return res.status(404).json({msg:'not found'})
            const selectedForum = {
                name:forum.name,
                createdAt:forum.createdAt,
                description:forum.description,
                users:forum.users
            }
            res.status(200).json(selectedForum)
        })
})

module.exports = router