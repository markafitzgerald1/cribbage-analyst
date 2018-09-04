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

            it('"A" return value ordinal', function() {
                expect(cribbageCard.parseIndex('A').ordinal).toEqual(1);
            });

            it('"a" return value ordinal', function() {
                expect(cribbageCard.parseIndex('a').ordinal).toEqual(1);
            });

            it('"X" return value ordinal', function() {
                expect(cribbageCard.parseIndex('X').ordinal).not.toBeDefined();
            });

            it('"" return value ordinal', function() {
                expect(cribbageCard.parseIndex('')).not.toBeDefined();
            });

            it('"T" return value ordinal, index and countingValue', function() {
                expect(cribbageCard.parseIndex('T')).toEqual({
                    ordinal: 10,
                    index: 'T',
                    countingValue: 10
                });
            });

            it('"K" return countingValue', function() {
                expect(cribbageCard.parseIndex('K').countingValue).toEqual(10);
            });
        });

        describe('parseIndices method', function() {
            it('is defined', function() {
                expect(cribbageCard.parseIndices).toBeDefined();
            });

            it('return value for ""', function() {
                expect(cribbageCard.parseIndices('').length).toEqual(0);
            });

            it('return Array length for "3"', function() {
                expect(cribbageCard.parseIndices('3').length).toEqual(1);
            });

            it('return Array length for "5J9"', function() {
                expect(cribbageCard.parseIndices('5J9').length).toEqual(3);
            });

            it('return value ordinals for "KAKA"', function() {
                expect(
                    cribbageCard.parseIndices('KAKA').map(function(card) {
                        return card.ordinal;
                    })
                ).toEqual([13, 1, 13, 1]);
            });

            it('return array for ""', function() {
                expect(cribbageCard.parseIndices('')).toEqual([]);
            });

            it('return array ordinal for " " index', function() {
                expect(
                    cribbageCard.parseIndices('A2 45')[2].ordinal
                ).not.toBeDefined();
            });

            it('return value for index after invalid one', function() {
                expect(cribbageCard.parseIndices('A2?45')[3]).toBeDefined();
            });
        });
    });
})();
