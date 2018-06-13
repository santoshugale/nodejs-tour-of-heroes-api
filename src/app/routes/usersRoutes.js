'use strict';

module.exports = function (app, db) {

    const usersControler = require('../controllers/usersController');

    app.route('/register')
        .post((req, res) => usersControler.registerUser(req, res, db))

    app.route('/login')
        .post((req, res) => usersControler.login(req, res, db))

    app.route('/logout')
        .put((req, res) => heroesControler.logout(req, res, db))
};
