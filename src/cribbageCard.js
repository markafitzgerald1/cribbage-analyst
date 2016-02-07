/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * Cribbage card module.
 * @module cribbageCard
 */

/**
 * Parse the given card index string into a corresponding card object.
 * @param {string} cardIndex card index character
 * @returns {{ordinal: number}} card - object with ordinal property
 * @returns {number} card.ordinal - base-1 ordinal of the card index
 * @example
 * // returns { ordinal: 11 }
 * cribbageCard.parse('J')
 * @example
 * // returns undefined
 * cribbageCard.parse('X')
 */
exports.parse = function(cardIndex) {
    "use strict";

    if (cardIndex === '') {
        return undefined;
    }

    var foundIndex = 'A23456789TJQK'.indexOf(cardIndex.toUpperCase());
    if (foundIndex == -1) {
        return undefined;
    }

    return {
        ordinal: foundIndex + 1
    };
};