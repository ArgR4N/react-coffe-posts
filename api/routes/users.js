const express = require('express');
const Post = require('../models/Post')

const router = require('express').Router();


router.get('/users', (req, res, next) =>{
    Post.find()
        .select('username password createdAt')
        .sort('createdAt')
        .exec((err, users) =>{
            if (err) next(err);
            res.status(200).json({a:'a'})
        })
})

module.exports = router