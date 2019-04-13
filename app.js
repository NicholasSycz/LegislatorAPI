/**
 * CONFIGURATION FILE --- holds all the configuration for the API
 */
const express = require('express');
const db = require('./database');
const lc = require ('./legislator/LegislatorController');

const app = express();

app.use('/legislators', lc);

module.exports = app;