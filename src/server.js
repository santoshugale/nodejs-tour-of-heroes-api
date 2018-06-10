const express = require('express');
// import express from 'express'; es6 syntax for import
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
    console.log('We are live on ' + port);
});
