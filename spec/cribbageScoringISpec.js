/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    'use strict';

    var jsCombinatorics = require('js-combinatorics'),
        cribbageScoring = require('../src/cribbageScoring'),
        cribbageCard = require('../src/cribbageCard');

    describe('pairsPoints method', function() {
        it('returns 8 for a hand with a pairs royale and a separate pair',
            function() {
                expect(cribbageScoring.pairsPoints(jsCombinatorics,
                    cribbageCard.parseIndices('5Q5QQ'))).toEqual(8);
            });

        it('returns 2 for a hand with a single non-contiguous pair',
            function() {
                expect(cribbageScoring.pairsPoints(jsCombinatorics,
                    cribbageCard.parseIndices('A7KA4'))).toEqual(2);
            });

        it('returns 0 for a hand with no pairs',
            function() {
                expect(cribbageScoring.pairsPoints(jsCombinatorics,
                    cribbageCard.parseIndices('2468Q'))).toEqual(0);
            });

        it('returns 4 for a hand with two pairs',
            function() {
                expect(cribbageScoring.pairsPoints(jsCombinatorics,
                    cribbageCard.parseIndices('8844A'))).toEqual(4);
            });

        it('returns 12 for a hand with double pairs royale',
            function() {
                expect(cribbageScoring.pairsPoints(jsCombinatorics,
                    cribbageCard.parseIndices('JJJJ5'))).toEqual(12);
            });
    });
}());
