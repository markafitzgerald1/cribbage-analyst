/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    'use strict';

    var cribbageCard = require('../src/cribbageCard');

    describe('cribbageCard module', function() {
        describe('parseIndex method', function() {
            it('is defined', function() {
                expect(cribbageCard.parseIndex).toBeDefined();
            });

            it('returns ordinal=1 for "A"', function() {
                expect(cribbageCard.parseIndex('A')
                    .ordinal).toEqual(1);
            });

            it('returns ordinal=1 for "a"', function() {
                expect(cribbageCard.parseIndex('a')
                    .ordinal).toEqual(1);
            });

            it('returns undefined for non card index "X"',
                function() {
                    expect(cribbageCard.parseIndex('X'))
                        .not.toBeDefined();
                });

            it('returns undefined for non card index "',
                function() {
                    expect(cribbageCard.parseIndex(''))
                        .not.toBeDefined();
                });

            it('returns ordinal=10 and index="T" for "T"',
                function() {
                    expect(cribbageCard.parseIndex('T'))
                        .toEqual({
                            ordinal: 10,
                            index: 'T'
                        });
                });
        });

        describe('parseIndices method', function() {
            it('is defined', function() {
                expect(cribbageCard.parseIndices).toBeDefined();
            });

            it(
                'returns an empty array for the empty string',
                function() {
                    expect(cribbageCard.parseIndices('')
                            .length)
                        .toEqual(0);
                });

            it('returns an array of one object for "3"',
                function() {
                    expect(cribbageCard.parseIndices(
                            '3').length)
                        .toEqual(1);
                });

            it(
                'returns an array of three objects for "5J9"',
                function() {
                    expect(cribbageCard.parseIndices(
                            '5J9').length)
                        .toEqual(3);
                });

            it(
                'returns an array with the expected ordinals for "KAKA"',
                function() {
                    expect(cribbageCard.parseIndices(
                        'KAKA').map(
                        function(card) {
                            return card.ordinal;
                        })).toEqual([13, 1, 13, 1]);
                });

            it('returns the empty array for "', function() {
                expect(cribbageCard.parseIndices(''))
                    .toEqual(
                        []);
            });

            it(
                'returns undefined for a space within the card indices string',
                function() {
                    expect(cribbageCard.parseIndices(
                            'A2 45')[2])
                        .not.toBeDefined();
                });

            it(
                'returns defined for a card index character after an invalid ' +
                'character',
                function() {
                    expect(cribbageCard.parseIndices(
                            'A2?45')[3])
                        .toBeDefined();
                });
        });
    });
}());
