/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals exports */

(function() {
    "use strict";

    /**
     * Cribbage card module.
     * @module cribbageCard
     */

    /**
     * Parse the given card index string into a corresponding card object.
     * @param {string} cardIndex single-character card index
     * @returns {{ordinal: number}} card - object with ordinal property
     * @returns {number} card.ordinal - base-1 ordinal of the card index
     * @example
     * // returns { ordinal: 11 }
     * cribbageCard.parseIndex('J');
     * @example
     * // returns undefined
     * cribbageCard.parseIndex('X');
     */
    exports.parseIndex = function(cardIndex) {
        if (cardIndex === '') {
            return undefined;
        }

        var foundIndex = 'A23456789TJQK'.indexOf(cardIndex.toUpperCase());
        if (foundIndex === -1) {
            return undefined;
        }

        return {
            ordinal: foundIndex + 1
        };
    };

    /**
     * Parse the given card indices string into a corresponding array of card
     * objects.
     * @param {string} cardIndices one or more card index characters
     * @returns {Array<{ordinal: number}>} cards - objects each with an ordinal
     * property
     * @example
     * // returns [ { ordinal: 11 } ]
     * cribbageCard.parseIndices('J');
     * @example
     * // returns [ undefined ]
     * cribbageCard.parseIndices('X');
     * @example
     * // returns [ { ordinal: 3 }, { ordinal: 13 } ]
     * cribbageCard.parseIndices('3K');
     */
    exports.parseIndices = function(cardIndices) {
        return cardIndices.split('').map(exports.parseIndex);
    };
}());