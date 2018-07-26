'use strict';

const SPECIES_PROTOSS = 'protoss';
const SPECIES_ZERG = 'zerg';
const SPECIES_TERRAN = 'terran';

var _ = require('lodash');

function UnitDataHelper (){}

/*
 * Loads from the model files the units for the species
 */
UnitDataHelper.prototype.getUnitsForSpecies = function (species) {
    species = _.toLower(species);
    if (species == SPECIES_PROTOSS || species == SPECIES_ZERG || species == SPECIES_TERRAN) {

        // get a list with all unit names for the species
        var allUnitNames = this.allUnitNamesForSpecies(species);

        // init the unit objects and create a unit object list
        var allUnits = [];
        for (const idx in allUnitNames) {
            if (allUnitNames.hasOwnProperty(idx)) {
                const unitName = allUnitNames[idx];
                var unit = this.createUnit(species, unitName);
                allUnits.push(unit);
            }
        }

        return allUnits;
    } else {
        return null;
    }
};

UnitDataHelper.prototype.getSpeciesForUnit = function (unitName) {
    var allSpecies = [SPECIES_PROTOSS, SPECIES_ZERG, SPECIES_TERRAN];
    var speciesForUnit = null;
    for (var i = 0; i < allSpecies.length; i++) {
        var species = allSpecies[i];

        var allUnitNames = this.allUnitNamesForSpecies(species);

        if (_.includes(allUnitNames, unitName)) {
            speciesForUnit = species;
            break;
        }
    }

    return speciesForUnit;
};

UnitDataHelper.prototype.allUnitNamesForSpecies = function (species) {
    return require("../sc_units/" + species + "/" + species + "_units_all.json");
};

UnitDataHelper.prototype.createUnit = function (species, unitName) {
    return require("../sc_units/" + species + "/" + unitName + ".json");
}

module.exports = UnitDataHelper;