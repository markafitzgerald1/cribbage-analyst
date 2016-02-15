/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect */

(function() {
    "use strict";

    var cribbageScoring = require('../src/cribbageScoring');

    describe("cribbageScoring module", function() {
        it("is defined", function() {
            expect(cribbageScoring).toBeDefined();
        });
    });
    describe("parseIndex method", function() {
        it("is defined", function() {
            expect(cribbageScoring.pairsPoints).toBeDefined();
        });

        it("returns 0 for a hand with pairs", function() {
            expect(cribbageScoring.pairsPoints("AA")).toEqual(0);
        });
    });
}());