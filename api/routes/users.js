const express = require('express');
const User = require('../models/User')
const Forum = require('../models/Forum')
const router = require('express').Router();

const passport = require('passport');
const bcrypt = require('bcrypt')

//Passport Routes
//Post to Register
router.post('/register', (req, res, next) =>{
    User.findOne({username: req.body.username}, (err, user) =>{
      if (err) throw err;
      if (user) res.status(400).send(new Error('User alredy exist!'))
      if (!user){
        bcrypt.hash(req.body.password, 10)
          .then(result => {
            const newUser = new User({
              username:req.body.username,
              password: result,
              userIcon:`https://avatars.dicebear.com/api/big-smile/${req.body.username}.svg`
            })
            newUser.save()
            .then(savedUser =>{
              return res.status(201).send(['User Created!', savedUser])
            });
          })
        
      }
    })
  })
  //Post To Login
  router.post('/login', (req, res, next) =>{
    passport.authenticate("local",(err, user, info) =>{
      if(err) throw err;
      if(!user) return res.status(401).send(new Error('User or Password wrong!'))
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
    if(!req.user) return res.status(401).json({msg:"you are not logeed"})
        const readyUser = {
          username:req.user.username,
          createdAt:req.user.createdAt,
          id:req.user._id,
          savedPosts:req.user.savedPosts,
          description:req.user.description,
          forums:req.user.forums,
          savedPosts:req.user.savedPosts,
          userIcon:req.user.userIcon
        }
        return res.status(200).json(readyUser)
    })

  router.get('/user/:username', (req, res) =>{
    User.findOne({username:req.params.username})
        .exec((err, user) =>{
          if (err) next(err);
          if(!user) return  res.send(false);
          const readyUser ={
            username:user.username,
            createdAt:user.createdAt,
            description:user.description,
            forums:user.forums,
            userIcon:user.userIcon
          }
          return res.status(200).json(readyUser)
      })
  })

  router.get('/users', (req, res, next) =>{
    User.find()
    .exec((err, users) =>{
      if(err) return next(err);
      if(!users) return res.status(404)
      const usersList = users.map(user =>(
        {
          username:user.username,
          description:user.description,
          forums:user.forums,
          userIcon:user.userIcon
        }
      ))
      return res.status(200).json(usersList)
    })
  } )

  router.put('/users/:id', (req, res, next) =>{
    if(req.body.savedPosts){
      let unSave = false;
      req.body.savedPosts.forEach(id => id === req.body.postId ? unSave = true : null)
      if(!unSave){
        User.findByIdAndUpdate(req.params.id, {savedPosts:[...req.body.savedPosts, req.body.postId]}, {new: true, omitUndefined:true})
        .exec((err, user ) =>{
          if(err) return next(err);
          if(!user) return res.status(404).json({msg:"Not Found"});
          const readyUser ={
            savedPosts:user.savedPosts
            }
            return res.status(200).json({readyUser, msg:'unsaved'})
          })
        }
        else{
          const savedPosts = [];
          req.body.savedPosts.forEach(id =>{
            if(id === req.body.postId) return null
            else savedPosts.push(id);
          });
          User.findByIdAndUpdate(req.params.id, {savedPosts}, {new: true, omitUndefined:true})
          .exec((err, user ) =>{
            if(err) return next(err);
            if(!user) return res.status(404).json({msg:"Not Found"});
            const readyUser ={
              savedPosts:user.savedPosts
            }
            return res.status(200).json({readyUser, msg:'saved'})
          });
        }
    }else{
      User.findByIdAndUpdate(req.params.id, req.body, {new: true, omitUndefined:true})
        .exec((err, user) =>{
          if(err) return next(err);
          if(!user) return res.status(404).send('Not Found!')
          const readyUser ={
            username:user.username,
            createdAt:user.createdAt,
            description:user.description,
            forums:user.forums,
            savedPosts:user.savedPosts,
            id:user._id,
            userIcon:user.userIcon
          }
          return res.status(201).json({newUser:readyUser, state:true})
        })
    }
  })


module.exports = router