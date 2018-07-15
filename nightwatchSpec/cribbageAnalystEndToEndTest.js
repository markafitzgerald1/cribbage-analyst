/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals module */

(function() {
    'use strict';

    const siteUrl = 'http://localhost:8080',
        bodySelector = 'body',
        initialRenderTimeoutMilliseconds = 151,
        analysesSelector = '#analyses',
        firstAnalysisSelector = '.analysis:first-of-type',
        analysisTimeoutMilliseconds = 208;

    /* Create at least one e2e test verifying entry point + HTML with Vue.js
     * markup works as expected - at least for a happy path. */

    module.exports = {
        // jscs:disable jsDoc
        'hand with fifteens and pairs points': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', 'Q7742A')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText('#analyses',
                    'Keep Q77A, discard 42 = 4 points.')
                .end();
        },

        // jscs:disable jsDoc
        'unknown card index': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', 'A233XY')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText(analysesSelector,
                    'Keep A33X, discard 2Y = 2 points.')
                .end();
        },

        // jscs:disable jsDoc
        'analyses sorted in descending points order': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', 'Q77772')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText(firstAnalysisSelector,
                    'Keep 7777, discard Q2 = 12 points.')
                .end();
        },

        // jscs:disable jsDoc
        'no cards to discard': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', 'K774')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText(analysesSelector,
                    'Keep K774, discard nothing = 2 points.')
                .end();
        },

        // jscs:disable jsDoc
        'hand with just a 4-run': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', 'A289TJ')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText(analysesSelector,
                    'Keep 89TJ, discard A2 = 4 points.')
                .end();
        },

        // jscs:disable jsDoc
        'hand with pairs, fifteens and runs points': function(browser) {
            // jscs:enable jsDoc
            browser
                .url(siteUrl)
                .waitForElementVisible(bodySelector, initialRenderTimeoutMilliseconds)
                .setValue('input[type=text]', '8876KQ')
                .waitForElementPresent(firstAnalysisSelector,
                    analysisTimeoutMilliseconds)
                .assert.containsText(analysesSelector,
                    'Keep 8876, discard KQ = 12 points.')
                .end();
        }
    };
}());
