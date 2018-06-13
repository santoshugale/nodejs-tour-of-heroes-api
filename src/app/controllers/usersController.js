'use strict';
const jwt = require('jsonwebtoken');

exports.registerUser = function (req, res, db) {
    const body = req.body;
    db.collection('users')
        .insert({ 'name': body.name, 'password': body.password }, (err, result) => {
            if (err) throw err;
            res.status(200).send(result);
        });
}

exports.login = function (req, res, db) {
    const body = req.body;
    db.collection('users')
        .findOne({ 'name': body.name }, (error, user) => {
            if (error) throw err;
            if (!user) res.status(404).send({ success: false, message: 'Authentication failed. User not found.' });
            else if (user.password != body.password) {
                res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
            }
            else {
                const token = jwt.sign(user.name, 'ilovenodejswebapi');
                res.status(200).send({
                    success: true,
                    message: 'Authentication successfull',
                    token: token
                });
            }
        });
}

exports.logout = function (req, res, db) {
    res.status(200).send('welcome to tour of heroes web api using node js');
}
