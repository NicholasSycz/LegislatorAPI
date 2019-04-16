/**
 * CONTROLLER FILE --- controls the data flow in the database
 */
const express = require('express');
const bp = require('body-parser');
const Legislator = require('./Legislator');
const router = express.Router();

router.use(bp.urlencoded({ extended: true }));
router.use(bp.json());

// GET function to return all data from the database
router.get('/', (req, res) => {
    let pageNum = parseInt(req.query.pageNum);
    let size = parseInt(req.query.size);
    let query = {};

    if (pageNum === 0 || pageNum < 0) {
        return res.json({ 'error': true, 'message': 'invalid page number.' });
    }

    query.skip = size * (pageNum - 1);
    query.limit = size;

    Legislator.count({}, (err, count) => {
        if (err) {
            return res.status(500).send('ERROR occured while accessing the legislator from the database.');
        }

        Legislator.find({}, {}, query, (err, leg) => {
            if(err) {
                return res.status(500).send('ERROR occured while accessing the legislators');
            }
            if(!leg) {
                return res.status(404).send('No Legislator Found');
            }
            let total = Math.ceil(count / size);
            return res.status(200).json({"error":false, "message": leg, "pages": total});
        });
    });
});

// GET function to return a legislator by their id
router.get('/:id', (req, res) => {
    Legislator.findById(req.params.id, (err, leg) => {
        if (err) {
            return res.status(500).send('ERROR occured while accessing the legislator from the database.');
        } else if (!leg) {
            return res.status(404).send('No Legislator Found');
        }
        res.status(200).send(leg);
    });
});

// POST function to input data into the database
router.post('/', (req, res) => {
    Legislator.create({
        info: {
            bioguide: req.body.bioguide,
            thomas: req.body.thomas,
            lis: req.body.lis,
            govtrack: req.body.govtrack,
            opensecrets: req.body.opensecrets,
            votesmart: req.body.votesmart,
            fec: req.body.fec,
            cspan: req.body.cspan,
            wikipedia: req.body.wikipedia,
            house_history: req.body.house_history,
            ballotpedia: req.body.ballotpedia,
            maplight: req.body.maplight,
            icpsr: req.body.icpsr,
            wikidata: req.body.wikidata,
            google_entity_id: req.body.google_entity_id
        },
        name: {
            first: req.body.first,
            last: req.body.last,
            official_full: req.body.official_full
        },
        bio: {
            birthday: req.body.birthday,
            gender: req.body.gender
        },
        terms: req.body.terms
    }, (err, leg) => {
        if (err) {
            return res.status(500).send('ERROR occured while attempting to input data to database.');
        }
        res.status(200).send(leg);
    });
});

// DELETE function to remove a legislator.
router.delete('/:id', (req, res) => {
    Legislator.findByIdAndDelete(req.params.id, (err, leg) => {
        if (err) {
            return res.status(500).send('ERROR occured while attempting to remove legislator');
        }
        res.status(200).send(`${leg.name.official_full} was removed from the database.`);
    });
});

// PUT function to update a legislator.
router.put('/:id', (req, res) => {
    Legislator.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, leg) => {
        if (err) {
            return res.status(500).send('ERROR occured while attempting to update a legislator\'s information');
        }
        res.status(200).send(leg);
    });
});
module.exports = router;