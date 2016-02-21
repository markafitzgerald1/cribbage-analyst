/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    'use strict';

    /**
     * Cribbage analyst module.
     * @module cribbageAnalyst
     */

    var cribbageAnalysis = require('../src/cribbageAnalysis.js'),
        jsCombinatorics = require('js-combinatorics'),
        cribbageScoring = require('../src/cribbageScoring.js'),
        cribbageCard = require('../src/cribbageCard'),
        _ = require('lodash');

    /**
     * Analyze discard options for the given card indices string by calculating
     * the number of in-hand points for each legal manner in which the player
     * could discard cards to the crib from the given hand.
     *
     * @function
     * @param {!string} cardIndices - one or more card index characters
     * @returns {!Array<{keptCards: !Array<{ordinal: number}>,
     * discardedCards: !Array<{ordinal: number}>, points: !number}>}
     * analyzeDiscardOption - objects each containing the number of in-hand
     * points for a possible hand discard option.
     * @example
     * // returns [{ keptCards: [{ordinal: 1}, {ordinal: 3}, {ordinal: 1},
     * // {ordinal: 10}], discardedCards: [], points: 2}]
     * cribbageAnalyst.analyzeDiscardOptions('A3AT');
     */
    exports.analyzeDiscardOptions = function(cardIndices) {
        return cribbageAnalysis.inHandPointsPerDiscardOption(
            jsCombinatorics, _, cribbageCard.parseIndices(
                cardIndices),
            cribbageScoring.pairsPoints);
    };
}());
