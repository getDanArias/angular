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
import { AnimationBuilder } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine as AnimationEngine, ɵAnimationStyleNormalizer as AnimationStyleNormalizer, ɵNoopAnimationDriver as NoopAnimationDriver, ɵWebAnimationsDriver as WebAnimationsDriver, ɵWebAnimationsStyleNormalizer as WebAnimationsStyleNormalizer, ɵsupportsWebAnimations as supportsWebAnimations } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { BrowserAnimationBuilder } from './animation_builder';
import { AnimationRendererFactory } from './animation_renderer';
export class InjectableAnimationEngine extends AnimationEngine {
    /**
     * @param {?} driver
     * @param {?} normalizer
     */
    constructor(driver, normalizer) {
        super(driver, normalizer);
    }
}
InjectableAnimationEngine.decorators = [
    { type: Injectable },
];
/** @nocollapse */
InjectableAnimationEngine.ctorParameters = () => [
    { type: AnimationDriver, },
    { type: AnimationStyleNormalizer, },
];
function InjectableAnimationEngine_tsickle_Closure_declarations() {
    /** @type {?} */
    InjectableAnimationEngine.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    InjectableAnimationEngine.ctorParameters;
}
/**
 * @return {?}
 */
export function instantiateSupportedAnimationDriver() {
    if (supportsWebAnimations()) {
        return new WebAnimationsDriver();
    }
    return new NoopAnimationDriver();
}
/**
 * @return {?}
 */
export function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
export function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
const /** @type {?} */ SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: AnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: AnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [DomRendererFactory2, AnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
export const /** @type {?} */ BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
export const /** @type {?} */ BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{ provide: AnimationDriver, useClass: NoopAnimationDriver }, ...SHARED_ANIMATION_PROVIDERS];
//# sourceMappingURL=providers.js.map