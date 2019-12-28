const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwr = require('jsonwebtoken');

const router = express.Router();


router.post('/signup', (req, res, next) => {
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


router.post('/login', (req, res, next) => {
  User
    // On cherche une addresse similaire à l'entrée utilisateur
    .findOne({
      email: req.body.email
    })

    .then(user => {
      if (!user) {
        // Error: Pas de correspondance.
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      // On compare les passwords
      return bcrypt.compare(req.body.password, user.password);
    })

    .then(result => {
      if(!result) {
        // Error: les passwords ne correspondent pas.
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      // Le mot de passe entrée par l'utilisateur correspond au mot de passe en bdd et le serveur crée un token qui associe l'utilisateur à ce token (et expire une heure après ça création).
      const token = jwt.sign(
        {email: user.email, userId: user._id},
        'au_plus_la_phrase_est_longue_au_mieux_c_est',
        { expiresIn: '1h'}
      );
      res.status(200).json({
        token: token
      })
    })

    .catch(e => {
      return res.status(401).json({
        message: 'Auth failed',
        error: e
      });
    });
})

module.exports = router;
