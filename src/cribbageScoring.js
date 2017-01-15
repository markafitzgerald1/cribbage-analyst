/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    'use strict';

    /**
     * Cribbage scoring module.
     * @module cribbageScoring
     */

    var pairPoints = 2,
        fifteenCount = 15,
        fifteenPoints = 2,
        minRunLength = 3;

    /**
     * Calculate the number of points from pairs in the given cards hand.
     *
     * @function
     * @param {!{sum: function(Array)}} lodash - an instance of the lodash
     * module having at least a 'sum' function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module having at least a 'combination' function
     * @param {!Array<{ordinal: !number}>} cards - zero or more objects either
     * having ordinal properties, indicating parseable indices, or being
     * undefined, indicating non-parseable indices
     * @returns {!number} pairsPoints - number of points from pairs in hand
     * @example
     * // returns 2
     * cribbageScoring.pairsPoints(
     *     [{ordinal: 1}, {ordinal: 3}, {ordinal: 1}, {ordinal: 10}]);
     * @example
     * // returns 6
     * cribbageScoring.pairsPoints(
     *     [{ordinal: 12}, {ordinal: 12}, {ordinal: 12}, {ordinal: 3}]);
     * @example
     * // returns 0
     * cribbageScoring.pairsPoints(
     *     [{ordinal: 1, index: 'A'}, {ordinal: 5, index: '5'},
     *      {ordinal: 9, index: '9'}, {ordinal: 13, index: 'K'}]);
     */
    exports.pairsPoints = function(lodash, jsCombinatorics, cards) {
        if (cards.length < 2) {
            return 0;
        }

        return lodash.sum(jsCombinatorics.combination(cards, 2).map(
            function(
                pair) {
                if (!pair[0].ordinal || !pair[1].ordinal) {
                    return 0;
                }
                return pair[0].ordinal === pair[1].ordinal ?
                    pairPoints : 0;
            }));
    };

    /**
     * Calculate the number of points from fifteens in the given cards hand.
     *
     * @function
     * @param {!{sum: function(Array)}} lodash - an instance of the lodash
     * module having at least a 'sum' function
     * @param {!{power: function(Array)}} jsCombinatorics - an instance of the
     * js-combinatorics module having at least a 'power' function
     * @param {!Array<{countingValue: !number}>} cards - zero or more objects
     * either having countingValue properties, indicating parseable indices, or
     * being undefined, indicating non-parseable indices
     * @returns {!number} fifteensPoints - number of points from fifteens in
     * hand
     * @example
     * // returns 4
     * cribbageScoring.fifteensPoints(
     *     [{countingValue: 6}, {countingValue: 9}, {countingValue: 9}]);
     */
    exports.fifteensPoints = function(lodash, jsCombinatorics, cards) {
        return lodash.sum(jsCombinatorics.power(cards).map(function(
            cardsSubset) {
            return lodash(cardsSubset).map('countingValue')
                .sum() ===
                fifteenCount ? fifteenPoints : 0;
        }));
    };

    /**
     * Calculate the number of points from runs in the given hand of cards.
     *
     * @function
     * @param {!{map: function(String)}} lodash - an instance of the lodash
     * module having at least 'map', 'sortBy', 'zipWith', 'filter' and 'sum'
     * functions
     * @param {!{power: function(Array)}} jsCombinatorics - an instance of the
     * js-combinatorics module having at least a 'power' function
     * @param {!Array<{ordinal: !number}>} cards - zero or more objects either
     * having ordinal properties, indicating parseable indices, or being
     * undefined, indicating non-parseable indices
     * @returns {!number} runsPoints - number of points from runs in hand
     */
    exports.runsPoints = function(lodash, jsCombinatorics, cards) {
        var individialRunsPoints = jsCombinatorics.power(cards).filter(
                function(cardsSubset) {
                    return cardsSubset.length >= minRunLength;
                }).map(function(cardsSubset) {
                return lodash(cardsSubset).map('ordinal').value();
            }).map(function(cardOrdinalsSubset) {
                return lodash(cardOrdinalsSubset).sortBy().value();
            }).map(function(sortedCardOrdinalsSubset) {
                return lodash.zipWith(sortedCardOrdinalsSubset.slice(
                    0, -1), sortedCardOrdinalsSubset.slice(
                    1), function(lowerOrdinal,
                    higherOrdinal) {
                    return higherOrdinal - lowerOrdinal;
                });
            }).filter(function(sortedCardOrdinalsSubsetDeltas) {
                return sortedCardOrdinalsSubsetDeltas.every(
                    function(delta) {
                        return delta === 1;
                    });
            }).map(function(sortedCardOrdinalsSubsetDeltas) {
                return sortedCardOrdinalsSubsetDeltas.length + 1;
            }),
            longestRunPoints = lodash.max(individialRunsPoints);

        return lodash(individialRunsPoints).filter(function(
            individialRunPoints) {
            return individialRunPoints === longestRunPoints;
        }).sum();
    };

    /**
     * Calculate the number of points from pairs, fifteens and runs combined in
     * the given cards hand.
     *
     * @param {!{sum: function(Array)}} lodash - an instance of the lodash
     * module having at least a 'sum' function
     * @function
     * @param {!{combination: function(Array), power: function(Array)}} jsCombinatorics
     * - an instance of the js-combinatorics module having at least a
     * 'combination' function and a 'power' function
     * @param {!Array<{ordinal: !number}>} cards - zero or more objects either
     * having ordinal properties, indicating parseable indices, or being
     * undefined, indicating non-parseable indices
     * @returns {!number} pairsFifteensAndRunsPoints - number of points from
     * pairs, fifteens and runs combined in hand
     * @example
     * // returns 12
     * cribbageScoring.pairsFifteensAndRunsPoints(
     *     [{ordinal: 6}, {ordinal: 5}, {ordinal: 4}, {ordinal: 4}]);
     */
    exports.pairsFifteensAndRunsPoints = function(lodash, jsCombinatorics,
        cards) {
        return exports.pairsPoints(lodash, jsCombinatorics, cards) +
            exports.fifteensPoints(lodash, jsCombinatorics, cards) +
            exports.runsPoints(lodash, jsCombinatorics, cards);
    };
}());
