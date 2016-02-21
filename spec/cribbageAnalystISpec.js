/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    'use strict';

    var cribbageAnalyst = require('../src/cribbageAnalyst.js'),
        cribbageCard = require('../src/cribbageCard.js');

    describe('analyzeDiscardOptions method', function() {
        it('to return 15 analyses for a 6-card hand',
            function() {
                expect(cribbageAnalyst.analyzeDiscardOptions(
                    'Q7742A').length).toEqual(15);
            });

        it('to return 5 analyses for a 5-card hand',
            function() {
                expect(cribbageAnalyst.analyzeDiscardOptions(
                    '7742A').length).toEqual(5);
            });

        it('to return the expected analysis for a 4-card hand',
            function() {
                expect(cribbageAnalyst.analyzeDiscardOptions(
                    'Q66Q')).toEqual([{
                    keptCards: cribbageCard.parseIndices(
                        'Q66Q'),
                    discardedCards: [],
                    points: 4
                }]);
            });
    });
}());
