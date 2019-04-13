/**
 * LEGISLATOR FILE --- creates the model for a Legislator
 */
const mongoose = require('mongoose');

// Schema for Legislator data
const LegSchema = new mongoose.Schema({
    info: {
        bioguide: String,
        thomas: String,
        lis: String,
        govtrack: Number,
        opensecrets: String,
        votesmart: Number,
        fec: [String],
        cspan: Number,
        wikipedia: String,
        house_history: Number,
        ballotpedia: String,
        maplight: Number,
        icpsr: Number,
        wikidata: String,
        google_entity_id: String
    },
    name: {
        first: String,
        last: String,
        official_full: String
    },
    bio: {
        birthday: String,
        gender: String
    },
    terms: [Object]
});

mongoose.model('Legislator', LegSchema);

module.exports = mongoose.model('Legislator');