const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./app/routes/heroesRoutes');

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

MongoClient.connect('mongodb://localhost:27017', function (err, mongoCl) {
    if (err) return console.log(err);
    const db = mongoCl.db('tour-of-heroes');
    db.collection('counters').find().count((err, count) => {
        if (err) return console.log(err);
        if (count === 0) db.collection('counters').insert({ 'name': 'heroid', seq: 0 });
        routes(app, db);
        app.listen(port, () => {
            console.log('Started server on port  ' + port);
        });
    });
})