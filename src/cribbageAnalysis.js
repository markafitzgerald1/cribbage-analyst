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
    function createDiscardOptionWithInHandPoints(
        keptCards,
        discardedCards,
        points
    ) {
        return {
            keptCards: keptCards,
            discardedCards: discardedCards,
            points: points
        };
    }
    // jscs:enable jsDoc

    /**
     * Calculate the expected number of in-hand points for each legal manner in
     * which the player could discard cards to the crib from the given hand.
     *
     * @function
     * @param {!{xor: function(Array, Array)}} lodash - an instance of the
     * lodash module having at least an 'xor' function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module having at least a 'combination' function
     * @param {!Array<{ordinal: number}>} cards - zero or more objects each
     * having an ordinal property
     * @param {!function(!{lodash: function}, !{combination: function(Array)},
     * !Array, !Array)} calculateExpectedHandPoints - a function which uses
     * jsCombinatorics to calculate the expected number of in-hand points in a
     * given {Array} of cards having an associated {Array} of discarded cards.
     * @returns {!Array<{keptCards: !Array<{ordinal: number}>,
     * discardedCards: !Array<{ordinal: number}>, points: !number}>}
     * discardOptionsWithInHandPoints - objects each containing the number of
     * in-hand points for a possible hand discard option.
     * @example
     * // returns [{ keptCards: [{ordinal: 1}, {ordinal: 3}, {ordinal: 1},
     * // {ordinal: 10}], discardedCards: [], points: 2}]
     * cribbageAnalysis.expectedHandPointsPerDiscardOption(lodash,
     *     jsCombinatorics, [{ordinal: 1}, {ordinal: 3}, {ordinal: 1},
     *     {ordinal: 10}], cribbageScoring.pairsPoints);
     */
    exports.expectedHandPointsPerDiscardOption = function(
        lodash,
        jsCombinatorics,
        cards,
        calculateExpectedHandPoints
    ) {
        var keptHandSize = 4;
        if (cards.length === 0) {
            return [];
        }
        if (cards.length <= keptHandSize) {
            return [
                createDiscardOptionWithInHandPoints(
                    cards,
                    [],
                    calculateExpectedHandPoints(
                        lodash,
                        jsCombinatorics,
                        cards,
                        []
                    )
                )
            ];
        }

        return jsCombinatorics
            .combination(cards, keptHandSize)
            .map(function(keptCards) {
                var discardedCards = lodash.xor(cards, keptCards);
                return createDiscardOptionWithInHandPoints(
                    keptCards,
                    discardedCards,
                    calculateExpectedHandPoints(
                        lodash,
                        jsCombinatorics,
                        keptCards,
                        discardedCards
                    )
                );
            });
    };
})();
