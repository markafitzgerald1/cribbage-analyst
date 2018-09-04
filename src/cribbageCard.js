/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    'use strict';

    /**
     * Cribbage card module.
     * @module cribbageCard
     */

    var maxCountingValue = 10;

    /**
     * Parse the given card index string into a corresponding card object
     * containing the source index, its base-1 ordinal, and its counting value.
     *
     * @function
     * @param {!string} cardIndex - single-character card index
     * @returns {!{ordinal: !number, index: !string, countingValue: !number}}
     * card - object with ordinal property which is the base-1 ordinal of the
     * card index if a valid index, otherwise undefined; index property which
     * equals cardIndex; and countingValue, the cribbage counting value of the
     * given card.
     * @example
     * // returns { ordinal: 11, index: 'J' }
     * cribbageCard.parseIndex('J');
     * @example
     * // returns { ordinal: undefined, index: 'X' }
     * cribbageCard.parseIndex('X');
     */
    exports.parseIndex = function(cardIndex) {
        if (cardIndex === '') {
            return undefined;
        }

        var foundIndex = 'A23456789TJQK'.indexOf(cardIndex.toUpperCase()),
            ordinal = foundIndex === -1 ? undefined : foundIndex + 1;
        return {
            ordinal: ordinal,
            index: cardIndex,
            countingValue: Math.min(ordinal, maxCountingValue)
        };
    };

    /**
     * Parse the given card indices string into a corresponding array of card
     * objects.
     *
     * @param {!string} cardIndices - zero or more card index characters
     * @returns {!Array<{ordinal: !number, index: !string}>} cards - objects
     * each with ordinal and index properties
     * @example
     * // returns [ { ordinal: 11, index: 'J' } ]
     * cribbageCard.parseIndices('J');
     * @example
     * // returns [ undefined ]
     * cribbageCard.parseIndices('X');
     * @example
     * // returns [ { ordinal: 3, index: '3' }, { ordinal: 13, index: 'k' } ]
     * cribbageCard.parseIndices('3k');
     */
    exports.parseIndices = function(cardIndices) {
        return cardIndices.split('').map(exports.parseIndex);
    };
})();
