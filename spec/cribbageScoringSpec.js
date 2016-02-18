/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect, beforeEach, spyOn */

(function() {
    "use strict";

    var cribbageScoring = require('../src/cribbageScoring'),
        cribbageCard = require('../src/cribbageCard.js'),
        jsCombinatorics = require('js-combinatorics');

    describe("cribbageScoring module", function() {
        it("is defined", function() {
            expect(cribbageScoring).toBeDefined();
        });
    });
    describe("pairsPoints method", function() {
        var jsCombinatoricsSpy;

        beforeEach(function() {
            jsCombinatoricsSpy = {
                combination: function(cards, subsetSize) {
                    return jsCombinatorics.combination(cards, subsetSize);
                }
            };
        });

        it("is defined", function() {
            expect(cribbageScoring.pairsPoints).toBeDefined();
        });

        it("calls js-combinatorics.combination() with its cards and subset " +
            "size 2",
            function() {
                var cards = cribbageCard.parseIndices("A2345");
                spyOn(jsCombinatoricsSpy, "combination").and.callThrough();
                cribbageScoring.pairsPoints(jsCombinatoricsSpy, cards);
                expect(jsCombinatoricsSpy.combination).toHaveBeenCalledWith(
                    cards, 2);
            });

        it("returns 0 if no js-combinatorics.combination() returned " +
            "combination is a pair",
            function() {
                var fakeCards = [];
                spyOn(jsCombinatoricsSpy, "combination").and.returnValue([
                    [{
                        ordinal: 2
                    }, {
                        ordinal: 3
                    }],
                    [{
                        ordinal: 11
                    }, {
                        ordinal: 7
                    }]
                ]);
                expect(cribbageScoring.pairsPoints(jsCombinatoricsSpy,
                    fakeCards)).toEqual(0);
            });

        it("returns 2 if one js-combinatorics.combination() returned " +
            "combination is a pair",
            function() {
                var fakeCards = [];
                spyOn(jsCombinatoricsSpy, "combination").and.returnValue([
                    [{
                        ordinal: 2
                    }, {
                        ordinal: 3
                    }],
                    [{
                        ordinal: 8
                    }, {
                        ordinal: 8
                    }],
                    [{
                        ordinal: 13
                    }, {
                        ordinal: 1
                    }]
                ]);
                expect(cribbageScoring.pairsPoints(jsCombinatoricsSpy,
                    fakeCards)).toEqual(2);
            });

        it("returns 8 if four js-combinatorics.combination() returned " +
            "combinations are pairs",
            function() {
                var fakeCards = [];
                spyOn(jsCombinatoricsSpy, "combination").and.returnValue([
                    [{
                        ordinal: 2
                    }, {
                        ordinal: 2
                    }],
                    [{
                        ordinal: 2
                    }, {
                        ordinal: 2
                    }],
                    [{
                        ordinal: 2
                    }, {
                        ordinal: 2
                    }],
                    [{
                        ordinal: 6
                    }, {
                        ordinal: 6
                    }]
                ]);
                expect(cribbageScoring.pairsPoints(jsCombinatoricsSpy,
                    fakeCards)).toEqual(8);
            });
    });
}());