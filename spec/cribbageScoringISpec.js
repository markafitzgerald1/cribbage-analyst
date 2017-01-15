/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    'use strict';

    var jsCombinatorics = require('js-combinatorics'),
        cribbageScoring = require('../src/cribbageScoring'),
        cribbageCard = require('../src/cribbageCard'),
        lodash = require('lodash');

    describe('pairsPoints method', function() {
        it(
            'returns 8 for a hand with a pairs royale and a separate pair',
            function() {
                expect(cribbageScoring.pairsPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        '5Q5QQ'))).toEqual(8);
            });

        it('returns 2 for a hand with a single non-contiguous pair',
            function() {
                expect(cribbageScoring.pairsPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        'A7KA4'))).toEqual(2);
            });

        it('returns 0 for a hand with no pairs',
            function() {
                expect(cribbageScoring.pairsPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        '2468Q'))).toEqual(0);
            });

        it('returns 4 for a hand with two pairs',
            function() {
                expect(cribbageScoring.pairsPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        '8844A'))).toEqual(4);
            });

        it('returns 12 for a hand with double pairs royale',
            function() {
                expect(cribbageScoring.pairsPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        'JJJJ5'))).toEqual(12);
            });
    });

    describe('fifteensPoints method', function() {
        it('returns 0 for an empty hand', function() {
            expect(cribbageScoring.fifteensPoints(
                lodash, jsCombinatorics, [])).toEqual(0);
        });

        it('returns 2 for a hand with a ten and a five',
            function() {
                expect(cribbageScoring.fifteensPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        'T5'))).toEqual(2);
            });

        it('returns 6 for "76522"',
            function() {
                expect(cribbageScoring.fifteensPoints(
                    lodash, jsCombinatorics,
                    cribbageCard.parseIndices(
                        '76522'))).toEqual(6);
            });
    });

    describe('runsPoints method', function() {
        // jscs:disable jsDoc
        function expectRunPoints(cardIndices, expectedPoints) {
            expect(cribbageScoring.runsPoints(
                lodash, jsCombinatorics, cribbageCard.parseIndices(
                    cardIndices))).toEqual(expectedPoints);
        }
        // jscs:enable jsDoc

        lodash([{
            cardIndices: '9JT',
            expectedPoints: 3
        }, {
            cardIndices: '7657',
            expectedPoints: 6
        }, {
            cardIndices: 'AAA23',
            expectedPoints: 9
        }, {
            cardIndices: '97K8T',
            expectedPoints: 4
        }, {
            cardIndices: '97T8T',
            expectedPoints: 8
        }, {
            cardIndices: '24342',
            expectedPoints: 12
        }, {
            cardIndices: '89QTJ',
            expectedPoints: 5
        }, {
            cardIndices: 'A2457',
            expectedPoints: 0
        }]).forEach(function(testCase) {
            it('returns ' + testCase.expectedPoints +
                ' for "' + testCase.cardIndices + '"',
                function() {
                    expectRunPoints(testCase.cardIndices,
                        testCase.expectedPoints);
                });
        });
    });

    describe('pairsFifteensAndRunsPoints method', function() {
        it('returns 8 for "555"', function() {
            expect(cribbageScoring.pairsFifteensAndRunsPoints(
                lodash, jsCombinatorics,
                cribbageCard.parseIndices(
                    '555'))).toEqual(8);
        });

        it('returns 5 for "654"', function() {
            expect(cribbageScoring.pairsFifteensAndRunsPoints(
                lodash, jsCombinatorics,
                cribbageCard.parseIndices(
                    '654'))).toEqual(5);
        });

        it('returns 10 for "5433"', function() {
            expect(cribbageScoring.pairsFifteensAndRunsPoints(
                lodash, jsCombinatorics,
                cribbageCard.parseIndices(
                    '5433'))).toEqual(10);
        });

        it('returns 5 for "876K"', function() {
            expect(cribbageScoring.pairsFifteensAndRunsPoints(
                lodash, jsCombinatorics,
                cribbageCard.parseIndices(
                    '876K'))).toEqual(5);
        });
    });
}());
