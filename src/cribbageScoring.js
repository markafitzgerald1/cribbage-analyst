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
        fifteenPoints = 2;

    /**
     * Calculate the number of points from pairs in the given cards hand.
     *
     * @function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module having at least a 'combination' function
     * @param {!{sum: function(Array)}} _ - an instance of the lodash module
     * having at least a 'sum' function
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
    exports.pairsPoints = function(jsCombinatorics, _, cards) {
        if (cards.length < 2) {
            return 0;
        }

        return _.sum(jsCombinatorics.combination(cards, 2).map(function(
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
     * @param {!{power: function(Array)}} jsCombinatorics - an instance of the
     * js-combinatorics module having at least a 'power' function
     * @param {!{sum: function(Array)}} _ - an instance of the lodash module
     * having at least a 'sum' function
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
    exports.fifteensPoints = function(jsCombinatorics, _, cards) {
        return _.sum(jsCombinatorics.power(cards).map(function(
            cardsSubset) {
            return _(cardsSubset).map('countingValue').sum() ===
                fifteenCount ? fifteenPoints : 0;
        }));
    };

    /**
     * Calculate the number of points from pairs and fifteens combined in the
     * given cards hand.
     *
     * @function
     * @param {!{combination: function(Array), power: function(Array)}} jsCombinatorics
     * - an instance of the js-combinatorics module having at
     * least a 'combination' function and a 'power' function
     * @param {!{sum: function(Array)}} _ - an instance of the lodash module
     * having at least a 'sum' function
     * @param {!Array<{ordinal: !number}>} cards - zero or more objects either
     * having ordinal properties, indicating parseable indices, or being
     * undefined, indicating non-parseable indices
     * @returns {!number} pairsAndFifteensPoints - number of points from pairs
     * and fifteens combined in hand
     * @example
     * // returns 4
     * cribbageScoring.pairsAndFifteensPoints(
     *     [{ordinal: 7}, {ordinal: 7}, {ordinal: 1}]);
     */
    exports.pairsAndFifteensPoints = function(jsCombinatorics, _, cards) {
        return exports.pairsPoints(jsCombinatorics, _, cards) + exports
            .fifteensPoints(jsCombinatorics, _, cards);
    };
}());
