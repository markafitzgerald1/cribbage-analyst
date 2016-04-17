/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals module */

(function() {
    'use strict';

    /* Create at least one e2e test verifying entry point + HTML with Vue.js
     * markup works as expected - at least for a happy path. */

    module.exports = {
        // jscs:disable jsDoc
        'happy path': function(browser) {
            // jscs:enable jsDoc
            browser
                .url('http://localhost:8080/index.html')
                .waitForElementVisible('body', 1000)
                .setValue('input[type=text]', 'Q7742A')
                .pause(100)
                .assert.containsText('#analyses',
                    'Keep Q77A, discard 42 = 2 points.')
                .end();
        },

        // jscs:disable jsDoc
        'unknown card index': function(browser) {
            // jscs:enable jsDoc
            browser
                .url('http://localhost:8080/index.html')
                .waitForElementVisible('body', 1000)
                .setValue('input[type=text]', 'A233XY')
                .pause(100)
                .assert.containsText('#analyses',
                    'Keep A33X, discard 2Y = 2 points.')
                .end();
        },

        // jscs:disable jsDoc
        'analyses sorted in descending points order': function(browser) {
            // jscs:enable jsDoc
            browser
                .url('http://localhost:8080/index.html')
                .waitForElementVisible('body', 1000)
                .setValue('input[type=text]', 'Q7777A')
                .pause(100)
                // need to assert first analysis text
                .assert.containsText('#analyses > :first-child',
                    'Keep 7777, discard QA = 12 points.')
                .end();
        }
    };
}());
