'use strict';

const util = require('util')

exports.getHeroes = function (req, res, db) {
    this.heroes = '';
    db.collection('heroes')
        .find()
        .toArray((error, result) => {
            if (error) res.send({ 'error': error });
            else
                res.status(200).send(result);
        });
}

exports.getWelcomeMessage = function (req, res, db) {
    res.status(200).send('welcome to tour of heroes web api using node js');
}

exports.getHero = function (req, res, db) {
    let id = req.params.id;
    res.status(200).send('');
}

exports.addHero = function (req, res, db) {
    let name = req.body.name;
    let age = req.body.age;
    console.log(util.inspect(req.body, false));
    db.collection('counters')
        .findAndModify({ 'name': 'heroid' }, [], { '$inc': { 'seq': 1 } }, { 'new': true },
            (err, doc) => {
                if (err) throw err;
                else {
                    db.collection('heroes').insert({
                        '_id': doc.value.seq,
                        'name': name,
                        'age': age
                    }, (err, result) => {
                        if (err) throw err;
                        res.status(200).send();
                    });
                }
            }
        );
}

exports.updateHero = function (req, res, db) {
    res.send('update Hero');
}

exports.deleteHero = function (req, res, db) {
    res.send('delete Hero');
}
