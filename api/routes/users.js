const express = require('express');
const User = require('../models/User')

const router = require('express').Router();

const passport = require('passport');
const bcrypt = require('bcrypt')

//Passport Routes
//Post to Register
router.post('/register', (req, res, next) =>{
    console.log(req.body)
    User.findOne({username: req.body.username}, (err, user) =>{
      if (err) throw err;
      if (user) res.send('User alredy exist!')
      if (!user){
        bcrypt.hash(req.body.password, 10)
          .then(result => {
            const newUser = new User({
              username:req.body.username,
              password: result
            })
            newUser.save()
            .then(res.send('User Created!'))
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
    const readyUser = {
      username:req.user.username,
      createdAt:req.user.createdAt,
      id:req.user._id
    }
    res.status(200).json(readyUser)
  })


module.exports = router