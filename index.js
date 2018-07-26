'use strict';

var Alexa = require('alexa-app');
var app = new Alexa.app('starcraftinfo');

var _ = require('lodash');

var UnitHelper = require('./modules/unit_data_helper');

// launch without intent
app.launch(function (req, res) {
    var prompt = "Welcome to StarCraft Help";
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

    var species = "";
    var unitName = "";
    var speciesSlot = req.slots['SPECIES'];
    var unitNameSlot = req.slots['UNIT'];

    for (var i = 0; i < speciesSlot.resolutions.length; i++) {
        var resolution = speciesSlot.resolution(i);
        if (resolution.status == 'ER_SUCCESS_MATCH') {
            species = resolution.first().name;
        }
    }

    for (var i = 0; i < unitNameSlot.resolutions.length; i++) {
        var resolution = unitNameSlot.resolution(i);
        if (resolution.status == 'ER_SUCCESS_MATCH') {
            unitName = resolution.first().name;
        }
    }

    if (_.isEmpty(species) || _.isEmpty(unitName)) {
        var prompt = "oh.";
        return res.say(prompt).shouldEndSession(true);
    }

    var unitHelper = new UnitHelper();
    
    // var unitsForSpecies = unitHelper.getUnitsForSpecies(species);
    var unitSpecies = unitHelper.getSpeciesForUnit(unitName);
    var unit = unitHelper.createUnit(unitSpecies, unitName);

    var weakAgainstUnit = unit.weakAgainst[species];

    res.say("As " + species + " build " + weakAgainstUnit + " against " + unitName);
});

//hack to support custom utterances in utterance expansion string
var utterancesMethod = app.utterances;
app.utterances = function () {
    return utterancesMethod().replace(/\{\-\|/g, '{');
};

module.exports = app;