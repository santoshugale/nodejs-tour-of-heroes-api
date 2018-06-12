'use strict';
module.exports = function (app, db) {

  const heroesControler = require('../controllers/heroesController');

  app.route('')
    .get((req, res) => heroesControler.getWelcomeMessage(req, res, db))

  app.route('/heroes')
    .get((req, res) => heroesControler.getHeroes(req, res, db))
    .put((req, res) => heroesControler.updateHero(req, res, db))
    .post((req, res) => heroesControler.addHero(req, res, db));

  app.route('/hero/:id')
    .get((req, res) => heroesControler.getHero(req, res, db))
    .delete((req, res) => heroesControler.deleteHero(req, res, db));
};