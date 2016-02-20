/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    'use strict';

    var cribbageAnalysis = require('../src/cribbageAnalysis.js'),
        jsCombinatorics = require('js-combinatorics'),
        cribbageScoring = require('../src/cribbageScoring.js'),
        cribbageCard = require('../src/cribbageCard'),
        _ = require('lodash');

    describe('inHandPointsPerDiscardOption method', function() {
        it('returns an empty array if no cards handed in',
            function() {
                expect(cribbageAnalysis.inHandPointsPerDiscardOption(
                    jsCombinatorics, _, [],
                    cribbageScoring.pairsPoints)).toEqual([]);
            });

        it(
            'returns all cards kept, none discarded and 0 points for 1 card',
            function() {
                var cards = [{
                    ordinal: 3
                }];
                expect(cribbageAnalysis.inHandPointsPerDiscardOption(
                    jsCombinatorics, _, cards,
                    cribbageScoring.pairsPoints)).toEqual([{
                    keptCards: cards,
                    discardedCards: [],
                    points: 0
                }]);
            });

        it(
            'returns all cards kept, none discarded and 2 points for 2 equal ' +
            'card ordinals',
            function() {
                var cards = [{
                    ordinal: 3
                }, {
                    ordinal: 3
                }];
                expect(cribbageAnalysis.inHandPointsPerDiscardOption(
                    jsCombinatorics, _, cards,
                    cribbageScoring.pairsPoints)).toEqual([{
                    keptCards: cards,
                    discardedCards: [],
                    points: 2
                }]);
            });

        it(
            'returns 5 distinct analyses for a 5-card hand',
            function() {
                var cards = cribbageCard.parseIndices('A74J7');
                expect(cribbageAnalysis.inHandPointsPerDiscardOption(
                    jsCombinatorics, _, cards,
                    cribbageScoring.pairsPoints).length).toEqual(
                    5);
            });

        it(
            'calculates all expected discard analyses for a 5-card hand',
            function() {
                var cards = cribbageCard.parseIndices('A74J7');
                expect(_.xorWith(cribbageAnalysis.inHandPointsPerDiscardOption(
                    jsCombinatorics, _, cards,
                    cribbageScoring.pairsPoints), [{
                    keptCards: cribbageCard.parseIndices(
                        'A74J'),
                    discardedCards: cribbageCard
                        .parseIndices(
                            '7'),
                    points: 0
                }, {
                    keptCards: cribbageCard.parseIndices(
                        'A747'),
                    discardedCards: cribbageCard
                        .parseIndices(
                            'J'),
                    points: 2
                }, {
                    keptCards: cribbageCard.parseIndices(
                        'A7J7'),
                    discardedCards: cribbageCard
                        .parseIndices(
                            '4'),
                    points: 2
                }, {
                    keptCards: cribbageCard.parseIndices(
                        'A4J7'),
                    discardedCards: cribbageCard
                        .parseIndices(
                            '7'),
                    points: 0
                }, {
                    keptCards: cribbageCard.parseIndices(
                        '74J7'),
                    discardedCards: cribbageCard
                        .parseIndices(
                            'A'),
                    points: 2
                }], _.isEqual)).toEqual(
                    []);
            });

        it(
            'calculates the expected pairs points for "KQJJJK"',
            function() {
                var cards = cribbageCard.parseIndices('KQJJJK');
                expect(_.map(cribbageAnalysis.inHandPointsPerDiscardOption(
                        jsCombinatorics, _, cards,
                        cribbageScoring.pairsPoints),
                    'points').sort()).toEqual([2, 2, 2, 2,
                    2, 2, 6, 4, 4, 4, 6, 2, 2, 2, 6
                ].sort());
            });
    });
}());
