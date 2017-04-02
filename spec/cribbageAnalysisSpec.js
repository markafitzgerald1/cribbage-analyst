/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, beforeEach, spyOn, it, expect */

(function() {
    'use strict';

    var cribbageAnalysis = require('../src/cribbageAnalysis.js'),
        cribbageCard = require('../src/cribbageCard'),
        jsCombinatorics = require('js-combinatorics'),
        lodash = require('lodash');

    describe('expectedHandPointsPerDiscardOption method', function() {
        var spyParent;

        beforeEach(function() {
            spyParent = {
                // jscs:disable jsDoc
                fakeCalculateExpectedHandPoints: function() {
                    // jscs:enable jsDoc
                }
            };
            spyOn(spyParent,
                'fakeCalculateExpectedHandPoints');
        });

        it(
            'hands empty discarded cards to calculateExpectedHandPoints',
            function() {
                var cards = cribbageCard.parseIndices('3456');
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash, jsCombinatorics, cards,
                    spyParent.fakeCalculateExpectedHandPoints
                );
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cards, []);
            });

        it(
            'hands single discarded card to calculateExpectedHandPoints',
            function() {
                var cards = cribbageCard.parseIndices('A2345');
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash, jsCombinatorics, cards,
                    spyParent.fakeCalculateExpectedHandPoints
                );
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cribbageCard.parseIndices(
                            'A235'), cribbageCard.parseIndices(
                            '4'));
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cribbageCard.parseIndices(
                            'A245'), cribbageCard.parseIndices(
                            '3'));
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cribbageCard.parseIndices(
                            'A345'), cribbageCard.parseIndices(
                            '2'));
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cribbageCard.parseIndices(
                            '2345'), cribbageCard.parseIndices(
                            'A'));
            });

        it(
            'hands two discarded cards to calculateExpectedHandPoints',
            function() {
                var cards = cribbageCard.parseIndices('A23456');
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash, jsCombinatorics, cards,
                    spyParent.fakeCalculateExpectedHandPoints
                );
                expect(spyParent.fakeCalculateExpectedHandPoints)
                    .toHaveBeenCalledWith(lodash,
                        jsCombinatorics, cribbageCard.parseIndices(
                            'A346'), cribbageCard.parseIndices(
                            '25'));
            });
    });
}());
