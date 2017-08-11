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
/**
 * Extract i18n messages from source code
 */
import { ViewEncapsulation, ɵConsole as Console } from '@angular/core';
import { analyzeAndValidateNgModules, extractProgramSymbols } from '../aot/compiler';
import { StaticReflector } from '../aot/static_reflector';
import { StaticSymbolCache } from '../aot/static_symbol';
import { StaticSymbolResolver } from '../aot/static_symbol_resolver';
import { AotSummaryResolver } from '../aot/summary_resolver';
import { CompilerConfig } from '../config';
import { DirectiveNormalizer } from '../directive_normalizer';
import { DirectiveResolver } from '../directive_resolver';
import { CompileMetadataResolver } from '../metadata_resolver';
import { HtmlParser } from '../ml_parser/html_parser';
import { InterpolationConfig } from '../ml_parser/interpolation_config';
import { NgModuleResolver } from '../ng_module_resolver';
import { PipeResolver } from '../pipe_resolver';
import { DomElementSchemaRegistry } from '../schema/dom_element_schema_registry';
import { createOfflineCompileUrlResolver } from '../url_resolver';
import { MessageBundle } from './message_bundle';
/**
 * The host of the Extractor disconnects the implementation from TypeScript / other language
 * services and from underlying file systems.
 * @record
 */
export function ExtractorHost() { }
function ExtractorHost_tsickle_Closure_declarations() {
    /**
     * Loads a resource (e.g. html / css)
     * @type {?}
     */
    ExtractorHost.prototype.loadResource;
}
export class Extractor {
    /**
     * @param {?} host
     * @param {?} staticSymbolResolver
     * @param {?} messageBundle
     * @param {?} metadataResolver
     */
    constructor(host, staticSymbolResolver, messageBundle, metadataResolver) {
        this.host = host;
        this.staticSymbolResolver = staticSymbolResolver;
        this.messageBundle = messageBundle;
        this.metadataResolver = metadataResolver;
    }
    /**
     * @param {?} rootFiles
     * @return {?}
     */
    extract(rootFiles) {
        const /** @type {?} */ programSymbols = extractProgramSymbols(this.staticSymbolResolver, rootFiles, this.host);
        const { files, ngModules } = analyzeAndValidateNgModules(programSymbols, this.host, this.metadataResolver);
        return Promise
            .all(ngModules.map(ngModule => this.metadataResolver.loadNgModuleDirectiveAndPipeMetadata(ngModule.type.reference, false)))
            .then(() => {
            const /** @type {?} */ errors = [];
            files.forEach(file => {
                const /** @type {?} */ compMetas = [];
                file.directives.forEach(directiveType => {
                    const /** @type {?} */ dirMeta = this.metadataResolver.getDirectiveMetadata(directiveType);
                    if (dirMeta && dirMeta.isComponent) {
                        compMetas.push(dirMeta);
                    }
                });
                compMetas.forEach(compMeta => {
                    const /** @type {?} */ html = ((((compMeta.template)).template));
                    const /** @type {?} */ interpolationConfig = InterpolationConfig.fromArray(/** @type {?} */ ((compMeta.template)).interpolation);
                    errors.push(...((this.messageBundle.updateFromTemplate(html, file.srcUrl, interpolationConfig))));
                });
            });
            if (errors.length) {
                throw new Error(errors.map(e => e.toString()).join('\n'));
            }
            return this.messageBundle;
        });
    }
    /**
     * @param {?} host
     * @param {?} locale
     * @return {?}
     */
    static create(host, locale) {
        const /** @type {?} */ htmlParser = new HtmlParser();
        const /** @type {?} */ urlResolver = createOfflineCompileUrlResolver();
        const /** @type {?} */ symbolCache = new StaticSymbolCache();
        const /** @type {?} */ summaryResolver = new AotSummaryResolver(host, symbolCache);
        const /** @type {?} */ staticSymbolResolver = new StaticSymbolResolver(host, symbolCache, summaryResolver);
        const /** @type {?} */ staticReflector = new StaticReflector(summaryResolver, staticSymbolResolver);
        const /** @type {?} */ config = new CompilerConfig({ defaultEncapsulation: ViewEncapsulation.Emulated, useJit: false });
        const /** @type {?} */ normalizer = new DirectiveNormalizer({ get: (url) => host.loadResource(url) }, urlResolver, htmlParser, config);
        const /** @type {?} */ elementSchemaRegistry = new DomElementSchemaRegistry();
        const /** @type {?} */ resolver = new CompileMetadataResolver(config, new NgModuleResolver(staticReflector), new DirectiveResolver(staticReflector), new PipeResolver(staticReflector), summaryResolver, elementSchemaRegistry, normalizer, new Console(), symbolCache, staticReflector);
        // TODO(vicb): implicit tags & attributes
        const /** @type {?} */ messageBundle = new MessageBundle(htmlParser, [], {}, locale);
        const /** @type {?} */ extractor = new Extractor(host, staticSymbolResolver, messageBundle, resolver);
        return { extractor, staticReflector };
    }
}
function Extractor_tsickle_Closure_declarations() {
    /** @type {?} */
    Extractor.prototype.host;
    /** @type {?} */
    Extractor.prototype.staticSymbolResolver;
    /** @type {?} */
    Extractor.prototype.messageBundle;
    /** @type {?} */
    Extractor.prototype.metadataResolver;
}
//# sourceMappingURL=extractor.js.map