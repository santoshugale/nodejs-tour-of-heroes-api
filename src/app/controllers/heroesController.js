'use strict';
const heroes = require('../model/heroes');

exports.getHeroes = function (req, res) {
    res.status(200).send(heroes);
}

exports.getWelcomeMessage = function (req, res) {
    res.status(200).send('welcome to tour of heroes web api using node js');
}

exports.getHero = function (req, res) {
    let id = req.params.id;
    let hero = heroes.Heros.find(hero => hero.Id === id);
    res.status(200).send(hero);
}

exports.addHero = function (req, res) {
    heroes.Heros.push(req.body);
    res.status(200).send();
}

exports.updateHero = function (req, res) {
    res.send('update Hero');
}

exports.deleteHero = function (req, res) {
    res.send('delete Hero');
}