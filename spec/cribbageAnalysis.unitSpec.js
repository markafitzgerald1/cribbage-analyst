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
            spyOn(spyParent, 'fakeCalculateExpectedHandPoints');
        });

        it('hands empty discarded cards to calculateExpectedHandPoints', function() {
            var cards = cribbageCard.parseIndices('3456');
            cribbageAnalysis.expectedHandPointsPerDiscardOption(
                lodash,
                jsCombinatorics,
                cards,
                spyParent.fakeCalculateExpectedHandPoints
            );
            expect(
                spyParent.fakeCalculateExpectedHandPoints
            ).toHaveBeenCalledWith(lodash, jsCombinatorics, cards, []);
        });

        it('hands single discarded card to calculateExpectedHandPoints', function() {
            var cards = cribbageCard.parseIndices('A2345'),
                expectFakeCalculateExpectedHandPointsCall =
                    // jscs:disable jsDoc
                    function(keptCardIndices, discardedCardIndices) {
                        // jscs:enable jsDoc
                        expect(
                            spyParent.fakeCalculateExpectedHandPoints
                        ).toHaveBeenCalledWith(
                            lodash,
                            jsCombinatorics,
                            cribbageCard.parseIndices(keptCardIndices),
                            cribbageCard.parseIndices(discardedCardIndices)
                        );
                    };
            cribbageAnalysis.expectedHandPointsPerDiscardOption(
                lodash,
                jsCombinatorics,
                cards,
                spyParent.fakeCalculateExpectedHandPoints
            );

            expectFakeCalculateExpectedHandPointsCall('A235', '4');
            expectFakeCalculateExpectedHandPointsCall('A245', '3');
            expectFakeCalculateExpectedHandPointsCall('A345', '2');
            expectFakeCalculateExpectedHandPointsCall('2345', 'A');
        });

        it('hands two discarded cards to calculateExpectedHandPoints', function() {
            var cards = cribbageCard.parseIndices('A23456');
            cribbageAnalysis.expectedHandPointsPerDiscardOption(
                lodash,
                jsCombinatorics,
                cards,
                spyParent.fakeCalculateExpectedHandPoints
            );
            expect(
                spyParent.fakeCalculateExpectedHandPoints
            ).toHaveBeenCalledWith(
                lodash,
                jsCombinatorics,
                cribbageCard.parseIndices('A346'),
                cribbageCard.parseIndices('25')
            );
        });
    });
})();
