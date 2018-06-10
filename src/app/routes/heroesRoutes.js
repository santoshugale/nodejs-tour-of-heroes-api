'use strict';
module.exports = function (app) {

  const heroesControler = require('../controllers/heroesController');

  app.route('')
    .get(heroesControler.getWelcomeMessage);
  app.route('/heroes')
    .get(heroesControler.getHeroes)
    .post(heroesControler.addHero);


  app.route('/hero/:id')
    .get(heroesControler.getHero)
    .put(heroesControler.updateHero)
    .delete(heroesControler.deleteHero);
};