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
import { ApplicationInitStatus } from './application_init';
import { ApplicationRef, ApplicationRef_ } from './application_ref';
import { APP_ID_RANDOM_PROVIDER } from './application_tokens';
import { IterableDiffers, KeyValueDiffers, defaultIterableDiffers, defaultKeyValueDiffers } from './change_detection/change_detection';
import { Inject, Optional, SkipSelf } from './di/metadata';
import { LOCALE_ID } from './i18n/tokens';
import { Compiler } from './linker/compiler';
import { NgModule } from './metadata';
/**
 * @return {?}
 */
export function _iterableDiffersFactory() {
    return defaultIterableDiffers;
}
/**
 * @return {?}
 */
export function _keyValueDiffersFactory() {
    return defaultKeyValueDiffers;
}
/**
 * @param {?=} locale
 * @return {?}
 */
export function _localeFactory(locale) {
    return locale || 'en-US';
}
/**
 * This module includes the providers of \@angular/core that are needed
 * to bootstrap components via `ApplicationRef`.
 *
 * \@experimental
 */
var ApplicationModule = (function () {
    /**
     * @param {?} appRef
     */
    function ApplicationModule(appRef) {
    }
    return ApplicationModule;
}());
export { ApplicationModule };
ApplicationModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    ApplicationRef_,
                    { provide: ApplicationRef, useExisting: ApplicationRef_ },
                    ApplicationInitStatus,
                    Compiler,
                    APP_ID_RANDOM_PROVIDER,
                    { provide: IterableDiffers, useFactory: _iterableDiffersFactory },
                    { provide: KeyValueDiffers, useFactory: _keyValueDiffersFactory },
                    {
                        provide: LOCALE_ID,
                        useFactory: _localeFactory,
                        deps: [[new Inject(LOCALE_ID), new Optional(), new SkipSelf()]]
                    },
                ]
            },] },
];
/** @nocollapse */
ApplicationModule.ctorParameters = function () { return [
    { type: ApplicationRef, },
]; };
function ApplicationModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ApplicationModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ApplicationModule.ctorParameters;
}
//# sourceMappingURL=application_module.js.map