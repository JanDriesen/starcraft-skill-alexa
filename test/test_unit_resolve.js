'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var expect = chai.expect;
var UnitDataHelper = require('../modules/unit_data_helper');
chai.config.includeStack = true;

var _ = require('lodash');

describe('UnitDataHelper', function () {
    var subject = new UnitDataHelper();

    describe('#getUnitsForSpecies(species)', function () {

        // should only respond on 'protoss', 'zerg' or 'terran'
        context('with a valid species', function () {
            var species = "protoss";
            it('returns a matching unit list', function () {
                var units = subject.getUnitsForSpecies(species);
                return expect(units).to.be.a("array");
            });
        });

        context('with a invalid species', function () {
            var species = "orc";
            it('returns null', function () {
                var units = subject.getUnitsForSpecies(species);
                return expect(units).to.eq(null);
            });
        });

        context('with a invalid parameter', function () {
            var species = 0;
            it('returns null', function () {
                var units = subject.getUnitsForSpecies(species);
                return expect(units).to.eq(null);
            });
        });

        // returned list should only contain the requested species unit objects
        // (test to see if the models are correct)
        context('with a protoss species it returns a list of protoss units', function () {
            var requestedSpecies = "protoss";
            var units = subject.getUnitsForSpecies(requestedSpecies);
            it('returns true', function () {
                // check each unit for species type
                var isCorrectSpecies = true;
                for (const idx in units) {
                    if (units.hasOwnProperty(idx)) {
                        const unit = units[idx];
                        if (_.toLower(unit.species) != requestedSpecies) {
                            isCorrectSpecies = false;
                        }
                    }
                }

                return expect(isCorrectSpecies).to.be.eq(true);
            });
        });

        context('with a zerg species it returns a list of zerg units', function () {
            var requestedSpecies = "zerg";
            var units = subject.getUnitsForSpecies(requestedSpecies);

            it('returns true', function () {
                // check each unit for species type
                var isCorrectSpecies = true;
                for (const idx in units) {
                    if (units.hasOwnProperty(idx)) {
                        const unit = units[idx];
                        if (_.toLower(unit.species) != requestedSpecies) {
                            isCorrectSpecies = false;
                        }
                    }
                }

                return expect(isCorrectSpecies).to.be.eq(true);
            });
        });

        context('with a terran species it returns a list of terran units', function () {
            var requestedSpecies = "terran";
            var units = subject.getUnitsForSpecies(requestedSpecies);

            it('returns true', function () {
                // check each unit for species type
                var isCorrectSpecies = true;
                for (const idx in units) {
                    if (units.hasOwnProperty(idx)) {
                        const unit = units[idx];
                        if (_.toLower(unit.species) != requestedSpecies) {
                            isCorrectSpecies = false;
                        }
                    }
                }

                return expect(isCorrectSpecies).to.be.eq(true);
            });
        });
    });
});