/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { ɵTRANSITION_ID } from '@angular/platform-browser';
import { filter } from 'rxjs/operator/filter';
import { first } from 'rxjs/operator/first';
import { toPromise } from 'rxjs/operator/toPromise';
import { PlatformState } from './platform_state';
import { platformDynamicServer, platformServer } from './server';
import { INITIAL_CONFIG } from './tokens';
var /** @type {?} */ parse5 = require('parse5');
/**
 * @record
 */
function PlatformOptions() { }
function PlatformOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    PlatformOptions.prototype.document;
    /** @type {?|undefined} */
    PlatformOptions.prototype.url;
    /** @type {?|undefined} */
    PlatformOptions.prototype.extraProviders;
}
/**
 * @param {?} platformFactory
 * @param {?} options
 * @return {?}
 */
function _getPlatform(platformFactory, options) {
    var /** @type {?} */ extraProviders = options.extraProviders ? options.extraProviders : [];
    return platformFactory([
        { provide: INITIAL_CONFIG, useValue: { document: options.document, url: options.url } },
        extraProviders
    ]);
}
/**
 * @template T
 * @param {?} platform
 * @param {?} moduleRefPromise
 * @return {?}
 */
function _render(platform, moduleRefPromise) {
    return moduleRefPromise.then(function (moduleRef) {
        var /** @type {?} */ transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
        if (!transitionId) {
            throw new Error("renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure\nthe server-rendered app can be properly bootstrapped into a client app.");
        }
        var /** @type {?} */ applicationRef = moduleRef.injector.get(ApplicationRef);
        return toPromise
            .call(first.call(filter.call(applicationRef.isStable, function (isStable) { return isStable; })))
            .then(function () {
            var /** @type {?} */ output = platform.injector.get(PlatformState).renderToString();
            platform.destroy();
            return output;
        });
    });
}
/**
 * Renders a Module to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * Do not use this in a production server environment. Use pre-compiled {\@link NgModuleFactory} with
 * {\@link renderModuleFactory} instead.
 *
 * \@experimental
 * @template T
 * @param {?} module
 * @param {?} options
 * @return {?}
 */
export function renderModule(module, options) {
    var /** @type {?} */ platform = _getPlatform(platformDynamicServer, options);
    return _render(platform, platform.bootstrapModule(module));
}
/**
 * Renders a {\@link NgModuleFactory} to string.
 *
 * `document` is the full document HTML of the page to render, as a string.
 * `url` is the URL for the current render request.
 * `extraProviders` are the platform level providers for the current render request.
 *
 * \@experimental
 * @template T
 * @param {?} moduleFactory
 * @param {?} options
 * @return {?}
 */
export function renderModuleFactory(moduleFactory, options) {
    var /** @type {?} */ platform = _getPlatform(platformServer, options);
    return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
//# sourceMappingURL=utils.js.map