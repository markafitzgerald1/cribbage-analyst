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
        lodash = require('lodash');

    describe('expectedHandPointsPerDiscardOption method', function() {
        it('empty hand return value', function() {
            expect(
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash,
                    jsCombinatorics,
                    [],
                    cribbageScoring.pairsPoints
                )
            ).toEqual([]);
        });

        it('single card hand return value', function() {
            var cards = [
                {
                    ordinal: 3
                }
            ];
            expect(
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash,
                    jsCombinatorics,
                    cards,
                    cribbageScoring.pairsPoints
                )
            ).toEqual([
                {
                    keptCards: cards,
                    discardedCards: [],
                    points: 0
                }
            ]);
        });

        it('two card hand containing pair return value', function() {
            var cards = [
                {
                    ordinal: 3
                },
                {
                    ordinal: 3
                }
            ];
            expect(
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash,
                    jsCombinatorics,
                    cards,
                    cribbageScoring.pairsPoints
                )
            ).toEqual([
                {
                    keptCards: cards,
                    discardedCards: [],
                    points: 2
                }
            ]);
        });

        it('five card hand return Array length', function() {
            var cards = cribbageCard.parseIndices('A74J7');
            expect(
                cribbageAnalysis.expectedHandPointsPerDiscardOption(
                    lodash,
                    jsCombinatorics,
                    cards,
                    cribbageScoring.pairsPoints
                ).length
            ).toEqual(5);
        });

        it('five card hand return value', function() {
            var cards = cribbageCard.parseIndices('A74J7');
            expect(
                lodash.xorWith(
                    cribbageAnalysis.expectedHandPointsPerDiscardOption(
                        lodash,
                        jsCombinatorics,
                        cards,
                        cribbageScoring.pairsPoints
                    ),
                    [
                        {
                            keptCards: cribbageCard.parseIndices('A74J'),
                            discardedCards: cribbageCard.parseIndices('7'),
                            points: 0
                        },
                        {
                            keptCards: cribbageCard.parseIndices('A747'),
                            discardedCards: cribbageCard.parseIndices('J'),
                            points: 2
                        },
                        {
                            keptCards: cribbageCard.parseIndices('A7J7'),
                            discardedCards: cribbageCard.parseIndices('4'),
                            points: 2
                        },
                        {
                            keptCards: cribbageCard.parseIndices('A4J7'),
                            discardedCards: cribbageCard.parseIndices('7'),
                            points: 0
                        },
                        {
                            keptCards: cribbageCard.parseIndices('74J7'),
                            discardedCards: cribbageCard.parseIndices('A'),
                            points: 2
                        }
                    ],
                    lodash.isEqual
                )
            ).toEqual([]);
        });

        it('"KQJJJK" hand pairs points return value', function() {
            var cards = cribbageCard.parseIndices('KQJJJK');
            expect(
                lodash
                    .map(
                        cribbageAnalysis.expectedHandPointsPerDiscardOption(
                            lodash,
                            jsCombinatorics,
                            cards,
                            cribbageScoring.pairsPoints
                        ),
                        'points'
                    )
                    .sort()
            ).toEqual([2, 2, 2, 2, 2, 2, 6, 4, 4, 4, 6, 2, 2, 2, 6].sort());
        });
    });
})();
