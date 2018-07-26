'use strict';

const SPECIES_PROTOSS = 'protoss';
const SPECIES_ZERG = 'zerg';
const SPECIES_TERRAN = 'terran';

function UnitDataHelper (){}

UnitDataHelper.prototype.getUnitsForSpecies = function (species) {
    if (species == SPECIES_PROTOSS || species == SPECIES_ZERG || species == SPECIES_TERRAN) {

        // get a list with all unit names for the species
        var allUnitNames = require("../sc_units/" + species + "/" + species + "_units_all.json");

        // init the unit objects and create a unit object list
        var allUnits = [];
        for (const idx in allUnitNames) {
            if (allUnitNames.hasOwnProperty(idx)) {
                const unitName = allUnitNames[idx];
                var unit = require("../sc_units/" + species + "/" + unitName + ".json");
                allUnits.push(unit);
            }
        }

        return allUnits;
    } else {
        return null;
    }
};

module.exports = UnitDataHelper;