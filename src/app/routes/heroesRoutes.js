'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (app, db) {

  const heroesControler = require('../controllers/heroesController');

  app.route('')
    .get((req, res) => heroesControler.getWelcomeMessage(req, res, db))

  app.route('/heroes')
    .get(authenticateRequest, (req, res) => heroesControler.getHeroes(req, res, db))
    .put(authenticateRequest, (req, res) => heroesControler.updateHero(req, res, db))
    .post(authenticateRequest, (req, res) => heroesControler.addHero(req, res, db));

  app.route('/hero/:id')
    .get(authenticateRequest, (req, res) => heroesControler.getHero(req, res, db))
    .delete(authenticateRequest, (req, res) => heroesControler.deleteHero(req, res, db));
};

function authenticateRequest(req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  } else {
    jwt.verify(token, 'ilovenodejswebapi', (err, decoded) => {
      if (err) {
        return res.send({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
}