/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

(function() {
    "use strict";

    var cribbageCard = require('../src/cribbageCard');

    describe("cribbageCard module", function() {
        it("is defined", function() {
            expect(cribbageCard).toBeDefined();
        });

        describe("parse method", function() {
            it("has a parse method", function() {
                expect(cribbageCard.parse).toBeDefined();
            });

            it("returns ordinal=1 for 'A'", function() {
                expect(cribbageCard.parse('A').ordinal).toEqual(1);
            });

            it("returns ordinal=1 for 'a'", function() {
                expect(cribbageCard.parse('a').ordinal).toEqual(1);
            });

            it("returns undefined for non card index 'X'", function() {
                expect(cribbageCard.parse('X')).not.toBeDefined();
            });

            it("returns undefined for non card index ''", function() {
                expect(cribbageCard.parse('')).not.toBeDefined();
            });
        });
    });
}());