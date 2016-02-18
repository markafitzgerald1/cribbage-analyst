/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    "use strict";

    /**
     * Cribbage scoring module.
     * @module cribbageScoring
     */

    /**
     * Calculate the number of points from pairs in the given cards hand.
     * @function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module
     * @param {!Array<{ordinal: number}>} cards - objects each with an ordinal
     * property
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
     *     [{ordinal: 1}, {ordinal: 5}, {ordinal: 9}, {ordinal: 13}]);
     */
    exports.pairsPoints = function(jsCombinatorics, cards) {
        // return combinatorics.combination(cards, 3);
        return jsCombinatorics.combination(cards, 2).map(function(pair) {
            return pair[0].ordinal === pair[1].ordinal ? 2 : 0;
        }).reduce(function(previousReduceValue, currentArrayValue) {
            return previousReduceValue + currentArrayValue;
        });
    };
}());