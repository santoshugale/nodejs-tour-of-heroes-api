'use strict';
const jwt = require('jsonwebtoken');

exports.registerUser = function (req, res, db) {
    const body = req.body;
    if (body.name == undefined || body.name == ''
        || body.password == '' || body.password == undefined) {
        res.status(400).send({
            success: false,
            message: 'Register unsuccessfull'
        });
    } else {
        db.collection('users')
            .insert({ 'name': body.name, 'password': body.password }, (err, result) => {
                if (err) throw err;
                res.status(200).send({
                    success: true,
                    message: 'Register successfull'
                });
            });
    }
}

exports.login = function (req, res, db) {
    const body = req.body;
    if (body.name == undefined || body.name == ''
        || body.password == '' || body.password == undefined) {
        res.status(400).send({
            success: false,
            message: 'Register unsuccessfull'
        });
    } else {
        db.collection('users')
            .findOne({ 'name': body.name }, (error, user) => {
                if (error) throw err;
                if (!user) res.status(404).send({ success: false, message: 'Authentication failed. User not found.' });
                else if (user.password != body.password) {
                    res.status(401).send({ success: false, message: 'Authentication failed. Wrong password.' });
                }
                else {
                    const token = jwt.sign(user, 'ilovenodejswebapi');
                    res.status(200).send({
                        success: true,
                        message: 'Authentication successfull',
                        token: token
                    });
                }
            });
    }
}

