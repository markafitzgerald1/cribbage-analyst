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
        _ = require('lodash'),
        Vue = require('vue');

    /**
     * Initialize Vue.js.  This is needed in order for the front-end (HTML) to
     * be able to make use of Vue.js for ease of rendering returned hand
     * analyses.
     */
    exports.initVue = function() {
        Vue.component('analysis', {
            props: ['analysis'],
            template: '<div class="analysis">Keep ' +
                '<card-list v-bind:cards="analysis.keptCards">' +
                '</card-list>, ' +
                'discard ' +
                '<card-list v-bind:cards="analysis.discardedCards">' +
                '</card-list> ' +
                '= {{analysis.points}} points.</div>'
        });

        Vue.component('card-list', {
            props: ['cards'],
            template: '<span v-for="card in cards">{{card.index}}</span>'
        });

        Vue.config.debug = true;

        /*jshint -W031 */
        new Vue({
            el: '#cribbageAnalyst',
            data: {
                cardIndices: ''
            },
            computed: {
                /**
                 * Analyze discard options for the current card indices string
                 * by calculating the number of in-hand points for each legal
                 * manner in which the player could discard cards to the crib
                 * from the given hand.
                 *
                 * @function
                 * @returns {!Array<{keptCards: !Array<{ordinal: number}>,
                 * discardedCards: !Array<{ordinal: number}>, points: !number}>}
                 * analyzeDiscardOption - objects each containing the number of
                 * in-hand points for a possible hand discard option.
                 */
                analyses: function() {
                    return cribbageAnalysis.inHandPointsPerDiscardOption(
                        jsCombinatorics, _,
                        cribbageCard.parseIndices(
                            this.cardIndices),
                        cribbageScoring.pairsPoints);
                }
            }
        });
    };
}());
