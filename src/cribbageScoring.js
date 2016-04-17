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

    /**
     * Calculate the number of points from pairs in the given cards hand.
     *
     * @function
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
    exports.pairsPoints = function(jsCombinatorics, cards) {
        if (cards.length < 2) {
            return 0;
        }

        return jsCombinatorics.combination(cards, 2).map(function(pair) {
            if (!pair[0].ordinal || !pair[1].ordinal) {
                return 0;
            }
            return pair[0].ordinal === pair[1].ordinal ? 2 : 0;
        }).reduce(function(previousReduceValue, currentArrayValue) {
            return previousReduceValue + currentArrayValue;
        });
    };
}());
