'use strict';

var Alexa = require('alexa-app');
var app = new Alexa.app('starcraftinfo');

var _ = require('lodash');

var UnitHelper = require('./modules/unit_data_helper');

// launch without intent
app.launch(function (req, res) {
    var prompt = "Willkommen bei StarCraft Info";
    res.say(prompt).reprompt(prompt).shouldEndSession(false);
});

app.intent('versusIntent', {
    'slots': {
        'SPECIES': 'SPECIESNAMES',
        'UNIT': 'UNITNAMES'
    },
    'utterances': [
        '{SPECIES} {vs.|versus|gegen} {UNIT}'
    ]
}, function (req, res) {
    var species = req.slots['SPECIES'].value;
    var unitName = req.slots['UNIT'].value;

    if (_.isEmpty(species) || _.isEmpty(unitName)) {
        var prompt = "Das konnte ich nicht verstehen.";
        return res.say(prompt).shouldEndSession(true);
    }

    var unitHelper = new UnitHelper();
    
    // var unitsForSpecies = unitHelper.getUnitsForSpecies(species);
    var unitSpecies = unitHelper.getSpeciesForUnit(unitName);
    var unit = unitHelper.createUnit(unitSpecies, unitName);

    var weakAgainstUnit = unit.weakAgainst[species];

    res.say("Als " + species + " baue " + weakAgainstUnit + " gegen " + unitName);
});

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function () {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;