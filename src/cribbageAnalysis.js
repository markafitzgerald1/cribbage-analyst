/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    'use strict';

    /**
     * Cribbage analysis module.
     * @module cribbageAnalysis
     */

    // jscs:disable jsDoc
    function createDiscardOptionWithInHandPoints(keptCards,
        discardedCards,
        points) {
        return {
            keptCards: keptCards,
            discardedCards: discardedCards,
            points: points
        };
    }
    // jscs:enable jsDoc

    /**
     * Calculate the number of in-hand points for each legal manner in which the
     * player could discard cards to the crib from the given hand.
     *
     * @function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module having at least a 'combination' function
     * @param {!{xor: function(Array, Array)}} _ - an instance of the lodash
     * module having at least a 'xor' function
     * @param {!Array<{ordinal: number}>} cards - zero or more objects each
     * having an ordinal property
     * @param {!function(!{combination: function(Array)}, !Array)} calculateInHandPoints
     * - a function which uses jsCombinatorics to calculate the number of
     * in-hand points in a given {Array} of cards.
     * @returns {!Array<{keptCards: !Array<{ordinal: number}>,
     * discardedCards: !Array<{ordinal: number}>, points: !number}>}
     * discardOptionsWithInHandPoints - objects each containing the number of
     * in-hand points for a possible hand discard option.
     * @example
     * // returns [{ keptCards: [{ordinal: 1}, {ordinal: 3}, {ordinal: 1},
     * // {ordinal: 10}], discardedCards: [], points: 2}]
     * cribbageAnalysis.inHandPointsPerDiscardOption(jsCombinatorics, _,
     *     [{ordinal: 1}, {ordinal: 3}, {ordinal: 1}, {ordinal: 10}],
     *     cribbageScoring.pairsPoints);
     */
    exports.inHandPointsPerDiscardOption = function(jsCombinatorics, _,
        cards,
        calculateInHandPoints) {
        var keptHandSize = 4;
        if (cards.length === 0) {
            return [];
        }
        if (cards.length < keptHandSize) {
            return [createDiscardOptionWithInHandPoints(cards, [],
                calculateInHandPoints(jsCombinatorics, cards))];
        }

        return jsCombinatorics.combination(cards, keptHandSize).map(
            function(keptCards) {
                return createDiscardOptionWithInHandPoints(
                    keptCards, _.xor(cards, keptCards),
                    calculateInHandPoints(jsCombinatorics,
                        keptCards));
            });
    };
}());
