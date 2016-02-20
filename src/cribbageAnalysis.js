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

    /**
     * Calculate the number of in-hand points for each legal manner in which the
     * player could discard cards to the crib from the given hand.
     *
     * @function
     * @param {!{combination: function(Array)}} jsCombinatorics - an instance
     * of the js-combinatorics module having at least a 'combination' function
     * @param {!{xor: function(Array, Array)}} _ - an instance of the lodash
     * module having at least a 'xor' function
     * @param {!Array<{ordinal: number}>} cards - objects each with an ordinal
     * property
     * @param {!function(!{combination: function(Array)}, !Array)} calculateInHandPoints
     * - a function which uses jsCombinatorics to calculate the number of
     * in-hand points in a given {Array} of cards.
     * @returns {!Array<{keptCards: !Array<{ordinal: number}>,
     * discardedCards: !Array<{ordinal: number}>, points: !number}>}
     * inHandPointsPerDiscardOption - objects each containing the number of
     * in-hand points for a possible hand discard option.
     */
    exports.inHandPointsPerDiscardOption = function(jsCombinatorics, _,
        cards,
        calculateInHandPoints) {
        var keptHandSize = 4;
        if (cards.length === 0) {
            return [];
        }
        if (cards.length < keptHandSize) {
            return [{
                keptCards: cards,
                discardedCards: [],
                points: calculateInHandPoints(jsCombinatorics,
                    cards)
            }];
        }

        return jsCombinatorics.combination(cards, keptHandSize).map(
            function(
                keptCards) {
                return {
                    keptCards: keptCards,
                    discardedCards: _.xor(cards, keptCards),
                    points: calculateInHandPoints(jsCombinatorics,
                        keptCards)
                };
            });
    };
}());
