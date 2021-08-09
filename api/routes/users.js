const express = require('express');
const User = require('../models/User')

const router = require('express').Router();

const passport = require('passport');
const bcrypt = require('bcrypt')

//Passport Routes
//Post to Register
router.post('/register', (req, res, next) =>{
    User.findOne({username: req.body.username}, (err, user) =>{
      if (err) throw err;
      if (user) res.send([false, 'User alredy exist!'])
      if (!user){
        bcrypt.hash(req.body.password, 10)
          .then(result => {
            const newUser = new User({
              username:req.body.username,
              password: result
            })
            newUser.save()
            .then(res.send([true, 'User Created!']))
          })
      }
    })
  })
  //Post To Login
  router.post('/login', (req, res, next) =>{
    passport.authenticate("local",(err, user, info) =>{
      if(err) throw err;
      if(!user) res.send([false, 'Username or Password are wrong!'])
      else{
        req.logIn(user, err =>{
          if(err) throw err;
          res.send([true, req.user])
        })
      }
    })(req, res ,next)
  })
  
  router.get('/logout', function(req, res){
    req.logout();
    res.send('Log out!')
  });

  router.get('/user', (req, res) =>{
    if(!req.user) res.send('not logged')
    const readyUser = {
      username:req.user.username,
      createdAt:req.user.createdAt,
      id:req.user._id,
      savedPosts:user.savedPosts
    }
    res.status(200).json(readyUser)
  })

  router.get('/user/:username', (req, res) =>{
    User.findOne({username:req.params.username})
      .exec((err, user) =>{
        if (err) next(err);
        if(!user) res.send('There is no user!')
        console.log(user)
        const readyUser ={
          username:user.username,
          createdAt:user.createdAt,
          userId:user._id,
          savedPosts:user.savedPosts
        }
        res.status(200).json(readyUser)
      })
  })

  router.put('/users/:id', (req, res) =>{
    console.log(req.body)
    User.findByIdAndUpdate(req.params.id, {savedPosts:[...req.body.savedPosts, req.body.postId]}, {new: true, omitUndefined:true})
      .exec((err, user ) =>{
        console.log('a');
        if(err) next(err);
        if(!user) res.status(404).json({msg:"Not Found"});
        res.status(200).json(user); 
    })

  })


module.exports = router