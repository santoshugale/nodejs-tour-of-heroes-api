'use strict';

// const util = require('util')

exports.getWelcomeMessage = function (req, res, db) {
    res.status(200).send('welcome to tour of heroes web api using node js');
}

exports.getHeroes = function (req, res, db) {
    db.collection('heroes')
        .find()
        .toArray((error, result) => {
            if (error) res.send({ 'error': error });
            else
                res.status(200).send(result);
        });
}

exports.getHero = function (req, res, db) {
    db.collection('heroes')
        .findOne({ _id: +req.params.id }, (error, document) => {
            if (error) throw err;
            else {
                console.log(document);
                res.status(200).send(document);
            }
        });
}

exports.addHero = function (req, res, db) {
    let name = req.body.name;
    let age = req.body.age;
    db.collection('counters')
        .findAndModify({ 'name': 'heroid' }, [], { '$inc': { 'seq': 1 } }, { 'new': true },
            (err, doc) => {
                if (err) throw err;
                else {
                    db.collection('heroes')
                        .insert({ '_id': doc.value.seq, 'name': name, 'age': age }, (err, result) => {
                            if (err) throw err;
                            res.status(200).send(result);
                        });
                }
            }
        );
}

exports.updateHero = function (req, res, db) {
    let hero = req.body;
    db.collection('heroes')
        .update({ _id: +hero.id }, { $set: { name: hero.name, age: hero.age } }, (err, response) => {
            if (err) throw err;
            res.send(response);
        });
}

exports.deleteHero = function (req, res, db) {
    db.collection('heroes')
        .deleteOne({ _id: +req.params.id }, (err, response) => {
            if (err) throw err;
            res.send(response);
        });
}
