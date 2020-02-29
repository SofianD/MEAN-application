const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const checkAlredyConnect = require('../middlewares/already-connected');


router.post('/signup', checkAlredyConnect, (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'User created',
            result: result
          });
        })
        .catch(e => {
          res.status(500).json({
            error: e
          })
        });
    });
});


router.post('/login', checkAlredyConnect, (req, res, next) => {
  let fetchedUser;
  User
    // On cherche une addresse similaire à l'entrée utilisateur
    .findOne({
      email: req.body.email
    })

    .then(user => {
      if (!user) {
        // Error: Pas de correspondance.
        return res.status(401).json({
          message: 'Auth failed (User not find)'
        });
      }
      fetchedUser = user;
      // On compare les passwords
      return bcrypt.compare(req.body.password, user.password);
    })

    .then(result => {
      if(!result) {
        // Error: les passwords ne correspondent pas.
        return res.status(401).json({
          message: 'Auth failed (Wrong password)'
        });
      }
      // Le mot de passe entrée par l'utilisateur correspond au mot de passe en bdd et le serveur crée un token qui associe l'utilisateur à ce token
      const token = jwt.sign(
                              { email: fetchedUser.email, userId: fetchedUser._id },
                              'au_plus_la_phrase_est_longue_au_mieux_c_est',
                              { expiresIn: '1h'}
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id
      })
    })

    .catch(e => {
      console.log(e);
      return res.status(401).json({
        message: 'Auth failed',
        error: e
      });
    });
})

router.get('/getUserData', checkAuth, (req, res, next) => {
  res.status(200).json({
    message: 'getUserDataResponse',
    email: req.userData.email
  })
})

module.exports = router;
