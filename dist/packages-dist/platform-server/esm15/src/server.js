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
import { ɵAnimationEngine } from '@angular/animations/browser';
import { PlatformLocation, ɵPLATFORM_SERVER_ID as PLATFORM_SERVER_ID } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { platformCoreDynamic } from '@angular/compiler';
import { Injector, NgModule, NgZone, Optional, PLATFORM_ID, PLATFORM_INITIALIZER, RendererFactory2, Testability, createPlatformFactory, platformCore, ɵALLOW_MULTIPLE_PLATFORMS as ALLOW_MULTIPLE_PLATFORMS } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule, DOCUMENT, ɵSharedStylesHost as SharedStylesHost, ɵgetDOM as getDOM } from '@angular/platform-browser';
import { NoopAnimationsModule, ɵAnimationRendererFactory } from '@angular/platform-browser/animations';
import { SERVER_HTTP_PROVIDERS } from './http';
import { ServerPlatformLocation } from './location';
import { Parse5DomAdapter, parseDocument } from './parse5_adapter';
import { PlatformState } from './platform_state';
import { ServerRendererFactory2 } from './server_renderer';
import { ServerStylesHost } from './styles_host';
import { INITIAL_CONFIG } from './tokens';
/**
 * @param {?} feature
 * @return {?}
 */
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
export const /** @type {?} */ INTERNAL_SERVER_PLATFORM_PROVIDERS = [
    { provide: DOCUMENT, useFactory: _document, deps: [Injector] },
    { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID },
    { provide: PLATFORM_INITIALIZER, useFactory: initParse5Adapter, multi: true, deps: [Injector] }, {
        provide: PlatformLocation,
        useClass: ServerPlatformLocation,
        deps: [DOCUMENT, [Optional, INITIAL_CONFIG]]
    },
    { provide: PlatformState, deps: [DOCUMENT] },
    // Add special provider that allows multiple instances of platformServer* to be created.
    { provide: ALLOW_MULTIPLE_PLATFORMS, useValue: true }
];
/**
 * @param {?} injector
 * @return {?}
 */
function initParse5Adapter(injector) {
    return () => { Parse5DomAdapter.makeCurrent(); };
}
/**
 * @param {?} renderer
 * @param {?} engine
 * @param {?} zone
 * @return {?}
 */
export function instantiateServerRendererFactory(renderer, engine, zone) {
    return new ɵAnimationRendererFactory(renderer, engine, zone);
}
export const /** @type {?} */ SERVER_RENDER_PROVIDERS = [
    ServerRendererFactory2,
    {
        provide: RendererFactory2,
        useFactory: instantiateServerRendererFactory,
        deps: [ServerRendererFactory2, ɵAnimationEngine, NgZone]
    },
    ServerStylesHost,
    { provide: SharedStylesHost, useExisting: ServerStylesHost },
];
/**
 * The ng module for the server.
 *
 * \@experimental
 */
export class ServerModule {
}
ServerModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserModule],
                imports: [HttpModule, HttpClientModule, NoopAnimationsModule],
                providers: [
                    SERVER_RENDER_PROVIDERS,
                    SERVER_HTTP_PROVIDERS,
                    { provide: Testability, useValue: null },
                ],
            },] },
];
/** @nocollapse */
ServerModule.ctorParameters = () => [];
function ServerModule_tsickle_Closure_declarations() {
    /** @type {?} */
    ServerModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    ServerModule.ctorParameters;
}
/**
 * @param {?} injector
 * @return {?}
 */
function _document(injector) {
    let /** @type {?} */ config = injector.get(INITIAL_CONFIG, null);
    if (config && config.document) {
        return parseDocument(config.document);
    }
    else {
        return getDOM().createHtmlDocument();
    }
}
/**
 * \@experimental
 */
export const /** @type {?} */ platformServer = createPlatformFactory(platformCore, 'server', INTERNAL_SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * \@experimental
 */
export const /** @type {?} */ platformDynamicServer = createPlatformFactory(platformCoreDynamic, 'serverDynamic', INTERNAL_SERVER_PLATFORM_PROVIDERS);
//# sourceMappingURL=server.js.map