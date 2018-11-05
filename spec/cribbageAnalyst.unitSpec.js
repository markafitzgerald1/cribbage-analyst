/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* globals describe, it, expect, jasmine */
/* jshint node: true */

'use strict';

const cribbageAnalyst = require('../src/cribbageAnalyst');

// jscs:disable jsDoc
describe('cribbageAnalyst module', () => {
    it('exports initVue', () => {
        expect(Object.getOwnPropertyNames(cribbageAnalyst)).toContain(
            'initVue'
        );
    });

    it('initVue is a function', () => {
        expect(cribbageAnalyst.initVue).toEqual(jasmine.any(Function));
    });
});
// jscs:enable jsDoc
