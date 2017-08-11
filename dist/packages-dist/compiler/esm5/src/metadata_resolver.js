/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Attribute, Component, Host, Inject, Injectable, InjectionToken, Optional, Self, SkipSelf, Type, resolveForwardRef, ɵConsole as Console, ɵERROR_COMPONENT_TYPE, ɵccf as createComponentFactory, ɵisPromise as isPromise, ɵstringify as stringify } from '@angular/core';
import { StaticSymbol, StaticSymbolCache } from './aot/static_symbol';
import { ngfactoryFilePath } from './aot/util';
import { assertArrayOfStrings, assertInterpolationSymbols } from './assertions';
import * as cpl from './compile_metadata';
import { CompileReflector } from './compile_reflector';
import { CompilerConfig } from './config';
import { DirectiveNormalizer } from './directive_normalizer';
import { DirectiveResolver } from './directive_resolver';
import { Identifiers } from './identifiers';
import { CompilerInjectable } from './injectable';
import { getAllLifecycleHooks } from './lifecycle_reflector';
import { NgModuleResolver } from './ng_module_resolver';
import { PipeResolver } from './pipe_resolver';
import { ElementSchemaRegistry } from './schema/element_schema_registry';
import { SummaryResolver } from './summary_resolver';
import { SyncAsync, ValueTransformer, noUndefined, syntaxError, visitValue } from './util';
export var /** @type {?} */ ERROR_COLLECTOR_TOKEN = new InjectionToken('ErrorCollector');
var CompileMetadataResolver = (function () {
    /**
     * @param {?} _config
     * @param {?} _ngModuleResolver
     * @param {?} _directiveResolver
     * @param {?} _pipeResolver
     * @param {?} _summaryResolver
     * @param {?} _schemaRegistry
     * @param {?} _directiveNormalizer
     * @param {?} _console
     * @param {?} _staticSymbolCache
     * @param {?} _reflector
     * @param {?=} _errorCollector
     */
    function CompileMetadataResolver(_config, _ngModuleResolver, _directiveResolver, _pipeResolver, _summaryResolver, _schemaRegistry, _directiveNormalizer, _console, _staticSymbolCache, _reflector, _errorCollector) {
        this._config = _config;
        this._ngModuleResolver = _ngModuleResolver;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._summaryResolver = _summaryResolver;
        this._schemaRegistry = _schemaRegistry;
        this._directiveNormalizer = _directiveNormalizer;
        this._console = _console;
        this._staticSymbolCache = _staticSymbolCache;
        this._reflector = _reflector;
        this._errorCollector = _errorCollector;
        this._nonNormalizedDirectiveCache = new Map();
        this._directiveCache = new Map();
        this._summaryCache = new Map();
        this._pipeCache = new Map();
        this._ngModuleCache = new Map();
        this._ngModuleOfTypes = new Map();
    }
    /**
     * @return {?}
     */
    CompileMetadataResolver.prototype.getReflector = function () { return this._reflector; };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.clearCacheFor = function (type) {
        var /** @type {?} */ dirMeta = this._directiveCache.get(type);
        this._directiveCache.delete(type);
        this._nonNormalizedDirectiveCache.delete(type);
        this._summaryCache.delete(type);
        this._pipeCache.delete(type);
        this._ngModuleOfTypes.delete(type);
        // Clear all of the NgModule as they contain transitive information!
        this._ngModuleCache.clear();
        if (dirMeta) {
            this._directiveNormalizer.clearCacheFor(dirMeta);
        }
    };
    /**
     * @return {?}
     */
    CompileMetadataResolver.prototype.clearCache = function () {
        this._directiveCache.clear();
        this._nonNormalizedDirectiveCache.clear();
        this._summaryCache.clear();
        this._pipeCache.clear();
        this._ngModuleCache.clear();
        this._ngModuleOfTypes.clear();
        this._directiveNormalizer.clearCache();
    };
    /**
     * @param {?} baseType
     * @param {?} name
     * @return {?}
     */
    CompileMetadataResolver.prototype._createProxyClass = function (baseType, name) {
        var /** @type {?} */ delegate = null;
        var /** @type {?} */ proxyClass = (function () {
            if (!delegate) {
                throw new Error("Illegal state: Class " + name + " for type " + stringify(baseType) + " is not compiled yet!");
            }
            return delegate.apply(this, arguments);
        });
        proxyClass.setDelegate = function (d) {
            delegate = d;
            ((proxyClass)).prototype = d.prototype;
        };
        // Make stringify work correctly
        ((proxyClass)).overriddenName = name;
        return proxyClass;
    };
    /**
     * @param {?} dirType
     * @param {?} name
     * @return {?}
     */
    CompileMetadataResolver.prototype.getGeneratedClass = function (dirType, name) {
        if (dirType instanceof StaticSymbol) {
            return this._staticSymbolCache.get(ngfactoryFilePath(dirType.filePath), name);
        }
        else {
            return this._createProxyClass(dirType, name);
        }
    };
    /**
     * @param {?} dirType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getComponentViewClass = function (dirType) {
        return this.getGeneratedClass(dirType, cpl.viewClassName(dirType, 0));
    };
    /**
     * @param {?} dirType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getHostComponentViewClass = function (dirType) {
        return this.getGeneratedClass(dirType, cpl.hostViewClassName(dirType));
    };
    /**
     * @param {?} dirType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getHostComponentType = function (dirType) {
        var /** @type {?} */ name = cpl.identifierName({ reference: dirType }) + "_Host";
        if (dirType instanceof StaticSymbol) {
            return this._staticSymbolCache.get(dirType.filePath, name);
        }
        else {
            var /** @type {?} */ HostClass = (function HostClass() { });
            HostClass.overriddenName = name;
            return HostClass;
        }
    };
    /**
     * @param {?} dirType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getRendererType = function (dirType) {
        if (dirType instanceof StaticSymbol) {
            return this._staticSymbolCache.get(ngfactoryFilePath(dirType.filePath), cpl.rendererTypeName(dirType));
        }
        else {
            // returning an object as proxy,
            // that we fill later during runtime compilation.
            return ({});
        }
    };
    /**
     * @param {?} selector
     * @param {?} dirType
     * @param {?} inputs
     * @param {?} outputs
     * @return {?}
     */
    CompileMetadataResolver.prototype.getComponentFactory = function (selector, dirType, inputs, outputs) {
        if (dirType instanceof StaticSymbol) {
            return this._staticSymbolCache.get(ngfactoryFilePath(dirType.filePath), cpl.componentFactoryName(dirType));
        }
        else {
            var /** @type {?} */ hostView = this.getHostComponentViewClass(dirType);
            // Note: ngContentSelectors will be filled later once the template is
            // loaded.
            return createComponentFactory(selector, dirType, /** @type {?} */ (hostView), inputs, outputs, []);
        }
    };
    /**
     * @param {?} factory
     * @param {?} ngContentSelectors
     * @return {?}
     */
    CompileMetadataResolver.prototype.initComponentFactory = function (factory, ngContentSelectors) {
        if (!(factory instanceof StaticSymbol)) {
            (_a = factory.ngContentSelectors).push.apply(_a, ngContentSelectors);
        }
        var _a;
    };
    /**
     * @param {?} type
     * @param {?} kind
     * @return {?}
     */
    CompileMetadataResolver.prototype._loadSummary = function (type, kind) {
        var /** @type {?} */ typeSummary = this._summaryCache.get(type);
        if (!typeSummary) {
            var /** @type {?} */ summary = this._summaryResolver.resolveSummary(type);
            typeSummary = summary ? summary.type : null;
            this._summaryCache.set(type, typeSummary || null);
        }
        return typeSummary && typeSummary.summaryKind === kind ? typeSummary : null;
    };
    /**
     * @param {?} ngModuleType
     * @param {?} directiveType
     * @param {?} isSync
     * @return {?}
     */
    CompileMetadataResolver.prototype.loadDirectiveMetadata = function (ngModuleType, directiveType, isSync) {
        var _this = this;
        if (this._directiveCache.has(directiveType)) {
            return null;
        }
        directiveType = resolveForwardRef(directiveType);
        var _a = ((this.getNonNormalizedDirectiveMetadata(directiveType))), annotation = _a.annotation, metadata = _a.metadata;
        var /** @type {?} */ createDirectiveMetadata = function (templateMetadata) {
            var /** @type {?} */ normalizedDirMeta = new cpl.CompileDirectiveMetadata({
                isHost: false,
                type: metadata.type,
                isComponent: metadata.isComponent,
                selector: metadata.selector,
                exportAs: metadata.exportAs,
                changeDetection: metadata.changeDetection,
                inputs: metadata.inputs,
                outputs: metadata.outputs,
                hostListeners: metadata.hostListeners,
                hostProperties: metadata.hostProperties,
                hostAttributes: metadata.hostAttributes,
                providers: metadata.providers,
                viewProviders: metadata.viewProviders,
                queries: metadata.queries,
                viewQueries: metadata.viewQueries,
                entryComponents: metadata.entryComponents,
                componentViewType: metadata.componentViewType,
                rendererType: metadata.rendererType,
                componentFactory: metadata.componentFactory,
                template: templateMetadata
            });
            if (templateMetadata) {
                _this.initComponentFactory(/** @type {?} */ ((metadata.componentFactory)), templateMetadata.ngContentSelectors);
            }
            _this._directiveCache.set(directiveType, normalizedDirMeta);
            _this._summaryCache.set(directiveType, normalizedDirMeta.toSummary());
            return null;
        };
        if (metadata.isComponent) {
            var /** @type {?} */ template = ((metadata.template));
            var /** @type {?} */ templateMeta = this._directiveNormalizer.normalizeTemplate({
                ngModuleType: ngModuleType,
                componentType: directiveType,
                moduleUrl: this._reflector.componentModuleUrl(directiveType, annotation),
                encapsulation: template.encapsulation,
                template: template.template,
                templateUrl: template.templateUrl,
                styles: template.styles,
                styleUrls: template.styleUrls,
                animations: template.animations,
                interpolation: template.interpolation
            });
            if (isPromise(templateMeta) && isSync) {
                this._reportError(componentStillLoadingError(directiveType), directiveType);
                return null;
            }
            return SyncAsync.then(templateMeta, createDirectiveMetadata);
        }
        else {
            // directive
            createDirectiveMetadata(null);
            return null;
        }
    };
    /**
     * @param {?} directiveType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getNonNormalizedDirectiveMetadata = function (directiveType) {
        var _this = this;
        directiveType = resolveForwardRef(directiveType);
        if (!directiveType) {
            return null;
        }
        var /** @type {?} */ cacheEntry = this._nonNormalizedDirectiveCache.get(directiveType);
        if (cacheEntry) {
            return cacheEntry;
        }
        var /** @type {?} */ dirMeta = this._directiveResolver.resolve(directiveType, false);
        if (!dirMeta) {
            return null;
        }
        var /** @type {?} */ nonNormalizedTemplateMetadata = ((undefined));
        if (dirMeta instanceof Component) {
            // component
            assertArrayOfStrings('styles', dirMeta.styles);
            assertArrayOfStrings('styleUrls', dirMeta.styleUrls);
            assertInterpolationSymbols('interpolation', dirMeta.interpolation);
            var /** @type {?} */ animations = dirMeta.animations;
            nonNormalizedTemplateMetadata = new cpl.CompileTemplateMetadata({
                encapsulation: noUndefined(dirMeta.encapsulation),
                template: noUndefined(dirMeta.template),
                templateUrl: noUndefined(dirMeta.templateUrl),
                styles: dirMeta.styles || [],
                styleUrls: dirMeta.styleUrls || [],
                animations: animations || [],
                interpolation: noUndefined(dirMeta.interpolation),
                isInline: !!dirMeta.template,
                externalStylesheets: [],
                ngContentSelectors: []
            });
        }
        var /** @type {?} */ changeDetectionStrategy = ((null));
        var /** @type {?} */ viewProviders = [];
        var /** @type {?} */ entryComponentMetadata = [];
        var /** @type {?} */ selector = dirMeta.selector;
        if (dirMeta instanceof Component) {
            // Component
            changeDetectionStrategy = ((dirMeta.changeDetection));
            if (dirMeta.viewProviders) {
                viewProviders = this._getProvidersMetadata(dirMeta.viewProviders, entryComponentMetadata, "viewProviders for \"" + stringifyType(directiveType) + "\"", [], directiveType);
            }
            if (dirMeta.entryComponents) {
                entryComponentMetadata = flattenAndDedupeArray(dirMeta.entryComponents)
                    .map(function (type) { /** @type {?} */ return ((_this._getEntryComponentMetadata(type))); })
                    .concat(entryComponentMetadata);
            }
            if (!selector) {
                selector = this._schemaRegistry.getDefaultComponentElementName();
            }
        }
        else {
            // Directive
            if (!selector) {
                this._reportError(syntaxError("Directive " + stringifyType(directiveType) + " has no selector, please add it!"), directiveType);
                selector = 'error';
            }
        }
        var /** @type {?} */ providers = [];
        if (dirMeta.providers != null) {
            providers = this._getProvidersMetadata(dirMeta.providers, entryComponentMetadata, "providers for \"" + stringifyType(directiveType) + "\"", [], directiveType);
        }
        var /** @type {?} */ queries = [];
        var /** @type {?} */ viewQueries = [];
        if (dirMeta.queries != null) {
            queries = this._getQueriesMetadata(dirMeta.queries, false, directiveType);
            viewQueries = this._getQueriesMetadata(dirMeta.queries, true, directiveType);
        }
        var /** @type {?} */ metadata = cpl.CompileDirectiveMetadata.create({
            isHost: false,
            selector: selector,
            exportAs: noUndefined(dirMeta.exportAs),
            isComponent: !!nonNormalizedTemplateMetadata,
            type: this._getTypeMetadata(directiveType),
            template: nonNormalizedTemplateMetadata,
            changeDetection: changeDetectionStrategy,
            inputs: dirMeta.inputs || [],
            outputs: dirMeta.outputs || [],
            host: dirMeta.host || {},
            providers: providers || [],
            viewProviders: viewProviders || [],
            queries: queries || [],
            viewQueries: viewQueries || [],
            entryComponents: entryComponentMetadata,
            componentViewType: nonNormalizedTemplateMetadata ? this.getComponentViewClass(directiveType) :
                null,
            rendererType: nonNormalizedTemplateMetadata ? this.getRendererType(directiveType) : null,
            componentFactory: null
        });
        if (nonNormalizedTemplateMetadata) {
            metadata.componentFactory =
                this.getComponentFactory(selector, directiveType, metadata.inputs, metadata.outputs);
        }
        cacheEntry = { metadata: metadata, annotation: dirMeta };
        this._nonNormalizedDirectiveCache.set(directiveType, cacheEntry);
        return cacheEntry;
    };
    /**
     * Gets the metadata for the given directive.
     * This assumes `loadNgModuleDirectiveAndPipeMetadata` has been called first.
     * @param {?} directiveType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
        var /** @type {?} */ dirMeta = ((this._directiveCache.get(directiveType)));
        if (!dirMeta) {
            this._reportError(syntaxError("Illegal state: getDirectiveMetadata can only be called after loadNgModuleDirectiveAndPipeMetadata for a module that declares it. Directive " + stringifyType(directiveType) + "."), directiveType);
        }
        return dirMeta;
    };
    /**
     * @param {?} dirType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getDirectiveSummary = function (dirType) {
        var /** @type {?} */ dirSummary = (this._loadSummary(dirType, cpl.CompileSummaryKind.Directive));
        if (!dirSummary) {
            this._reportError(syntaxError("Illegal state: Could not load the summary for directive " + stringifyType(dirType) + "."), dirType);
        }
        return dirSummary;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.isDirective = function (type) {
        return !!this._loadSummary(type, cpl.CompileSummaryKind.Directive) ||
            this._directiveResolver.isDirective(type);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.isPipe = function (type) {
        return !!this._loadSummary(type, cpl.CompileSummaryKind.Pipe) ||
            this._pipeResolver.isPipe(type);
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.isNgModule = function (type) {
        return !!this._loadSummary(type, cpl.CompileSummaryKind.NgModule) ||
            this._ngModuleResolver.isNgModule(type);
    };
    /**
     * @param {?} moduleType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getNgModuleSummary = function (moduleType) {
        var /** @type {?} */ moduleSummary = (this._loadSummary(moduleType, cpl.CompileSummaryKind.NgModule));
        if (!moduleSummary) {
            var /** @type {?} */ moduleMeta = this.getNgModuleMetadata(moduleType, false);
            moduleSummary = moduleMeta ? moduleMeta.toSummary() : null;
            if (moduleSummary) {
                this._summaryCache.set(moduleType, moduleSummary);
            }
        }
        return moduleSummary;
    };
    /**
     * Loads the declared directives and pipes of an NgModule.
     * @param {?} moduleType
     * @param {?} isSync
     * @param {?=} throwIfNotFound
     * @return {?}
     */
    CompileMetadataResolver.prototype.loadNgModuleDirectiveAndPipeMetadata = function (moduleType, isSync, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var /** @type {?} */ ngModule = this.getNgModuleMetadata(moduleType, throwIfNotFound);
        var /** @type {?} */ loading = [];
        if (ngModule) {
            ngModule.declaredDirectives.forEach(function (id) {
                var /** @type {?} */ promise = _this.loadDirectiveMetadata(moduleType, id.reference, isSync);
                if (promise) {
                    loading.push(promise);
                }
            });
            ngModule.declaredPipes.forEach(function (id) { return _this._loadPipeMetadata(id.reference); });
        }
        return Promise.all(loading);
    };
    /**
     * @param {?} moduleType
     * @param {?=} throwIfNotFound
     * @return {?}
     */
    CompileMetadataResolver.prototype.getNgModuleMetadata = function (moduleType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        moduleType = resolveForwardRef(moduleType);
        var /** @type {?} */ compileMeta = this._ngModuleCache.get(moduleType);
        if (compileMeta) {
            return compileMeta;
        }
        var /** @type {?} */ meta = this._ngModuleResolver.resolve(moduleType, throwIfNotFound);
        if (!meta) {
            return null;
        }
        var /** @type {?} */ declaredDirectives = [];
        var /** @type {?} */ exportedNonModuleIdentifiers = [];
        var /** @type {?} */ declaredPipes = [];
        var /** @type {?} */ importedModules = [];
        var /** @type {?} */ exportedModules = [];
        var /** @type {?} */ providers = [];
        var /** @type {?} */ entryComponents = [];
        var /** @type {?} */ bootstrapComponents = [];
        var /** @type {?} */ schemas = [];
        if (meta.imports) {
            flattenAndDedupeArray(meta.imports).forEach(function (importedType) {
                var /** @type {?} */ importedModuleType = ((undefined));
                if (isValidType(importedType)) {
                    importedModuleType = importedType;
                }
                else if (importedType && importedType.ngModule) {
                    var /** @type {?} */ moduleWithProviders = importedType;
                    importedModuleType = moduleWithProviders.ngModule;
                    if (moduleWithProviders.providers) {
                        providers.push.apply(providers, _this._getProvidersMetadata(moduleWithProviders.providers, entryComponents, "provider for the NgModule '" + stringifyType(importedModuleType) + "'", [], importedType));
                    }
                }
                if (importedModuleType) {
                    if (_this._checkSelfImport(moduleType, importedModuleType))
                        return;
                    var /** @type {?} */ importedModuleSummary = _this.getNgModuleSummary(importedModuleType);
                    if (!importedModuleSummary) {
                        _this._reportError(syntaxError("Unexpected " + _this._getTypeDescriptor(importedType) + " '" + stringifyType(importedType) + "' imported by the module '" + stringifyType(moduleType) + "'. Please add a @NgModule annotation."), moduleType);
                        return;
                    }
                    importedModules.push(importedModuleSummary);
                }
                else {
                    _this._reportError(syntaxError("Unexpected value '" + stringifyType(importedType) + "' imported by the module '" + stringifyType(moduleType) + "'"), moduleType);
                    return;
                }
            });
        }
        if (meta.exports) {
            flattenAndDedupeArray(meta.exports).forEach(function (exportedType) {
                if (!isValidType(exportedType)) {
                    _this._reportError(syntaxError("Unexpected value '" + stringifyType(exportedType) + "' exported by the module '" + stringifyType(moduleType) + "'"), moduleType);
                    return;
                }
                var /** @type {?} */ exportedModuleSummary = _this.getNgModuleSummary(exportedType);
                if (exportedModuleSummary) {
                    exportedModules.push(exportedModuleSummary);
                }
                else {
                    exportedNonModuleIdentifiers.push(_this._getIdentifierMetadata(exportedType));
                }
            });
        }
        // Note: This will be modified later, so we rely on
        // getting a new instance every time!
        var /** @type {?} */ transitiveModule = this._getTransitiveNgModuleMetadata(importedModules, exportedModules);
        if (meta.declarations) {
            flattenAndDedupeArray(meta.declarations).forEach(function (declaredType) {
                if (!isValidType(declaredType)) {
                    _this._reportError(syntaxError("Unexpected value '" + stringifyType(declaredType) + "' declared by the module '" + stringifyType(moduleType) + "'"), moduleType);
                    return;
                }
                var /** @type {?} */ declaredIdentifier = _this._getIdentifierMetadata(declaredType);
                if (_this.isDirective(declaredType)) {
                    transitiveModule.addDirective(declaredIdentifier);
                    declaredDirectives.push(declaredIdentifier);
                    _this._addTypeToModule(declaredType, moduleType);
                }
                else if (_this.isPipe(declaredType)) {
                    transitiveModule.addPipe(declaredIdentifier);
                    transitiveModule.pipes.push(declaredIdentifier);
                    declaredPipes.push(declaredIdentifier);
                    _this._addTypeToModule(declaredType, moduleType);
                }
                else {
                    _this._reportError(syntaxError("Unexpected " + _this._getTypeDescriptor(declaredType) + " '" + stringifyType(declaredType) + "' declared by the module '" + stringifyType(moduleType) + "'. Please add a @Pipe/@Directive/@Component annotation."), moduleType);
                    return;
                }
            });
        }
        var /** @type {?} */ exportedDirectives = [];
        var /** @type {?} */ exportedPipes = [];
        exportedNonModuleIdentifiers.forEach(function (exportedId) {
            if (transitiveModule.directivesSet.has(exportedId.reference)) {
                exportedDirectives.push(exportedId);
                transitiveModule.addExportedDirective(exportedId);
            }
            else if (transitiveModule.pipesSet.has(exportedId.reference)) {
                exportedPipes.push(exportedId);
                transitiveModule.addExportedPipe(exportedId);
            }
            else {
                _this._reportError(syntaxError("Can't export " + _this._getTypeDescriptor(exportedId.reference) + " " + stringifyType(exportedId.reference) + " from " + stringifyType(moduleType) + " as it was neither declared nor imported!"), moduleType);
                return;
            }
        });
        // The providers of the module have to go last
        // so that they overwrite any other provider we already added.
        if (meta.providers) {
            providers.push.apply(providers, this._getProvidersMetadata(meta.providers, entryComponents, "provider for the NgModule '" + stringifyType(moduleType) + "'", [], moduleType));
        }
        if (meta.entryComponents) {
            entryComponents.push.apply(entryComponents, flattenAndDedupeArray(meta.entryComponents)
                .map(function (type) { /** @type {?} */ return ((_this._getEntryComponentMetadata(type))); }));
        }
        if (meta.bootstrap) {
            flattenAndDedupeArray(meta.bootstrap).forEach(function (type) {
                if (!isValidType(type)) {
                    _this._reportError(syntaxError("Unexpected value '" + stringifyType(type) + "' used in the bootstrap property of module '" + stringifyType(moduleType) + "'"), moduleType);
                    return;
                }
                bootstrapComponents.push(_this._getIdentifierMetadata(type));
            });
        }
        entryComponents.push.apply(entryComponents, bootstrapComponents.map(function (type) { /** @type {?} */ return ((_this._getEntryComponentMetadata(type.reference))); }));
        if (meta.schemas) {
            schemas.push.apply(schemas, flattenAndDedupeArray(meta.schemas));
        }
        compileMeta = new cpl.CompileNgModuleMetadata({
            type: this._getTypeMetadata(moduleType),
            providers: providers,
            entryComponents: entryComponents,
            bootstrapComponents: bootstrapComponents,
            schemas: schemas,
            declaredDirectives: declaredDirectives,
            exportedDirectives: exportedDirectives,
            declaredPipes: declaredPipes,
            exportedPipes: exportedPipes,
            importedModules: importedModules,
            exportedModules: exportedModules,
            transitiveModule: transitiveModule,
            id: meta.id || null,
        });
        entryComponents.forEach(function (id) { return transitiveModule.addEntryComponent(id); });
        providers.forEach(function (provider) { return transitiveModule.addProvider(provider, /** @type {?} */ ((compileMeta)).type); });
        transitiveModule.addModule(compileMeta.type);
        this._ngModuleCache.set(moduleType, compileMeta);
        return compileMeta;
    };
    /**
     * @param {?} moduleType
     * @param {?} importedModuleType
     * @return {?}
     */
    CompileMetadataResolver.prototype._checkSelfImport = function (moduleType, importedModuleType) {
        if (moduleType === importedModuleType) {
            this._reportError(syntaxError("'" + stringifyType(moduleType) + "' module can't import itself"), moduleType);
            return true;
        }
        return false;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype._getTypeDescriptor = function (type) {
        if (this.isDirective(type)) {
            return 'directive';
        }
        if (this.isPipe(type)) {
            return 'pipe';
        }
        if (this.isNgModule(type)) {
            return 'module';
        }
        if (((type)).provide) {
            return 'provider';
        }
        return 'value';
    };
    /**
     * @param {?} type
     * @param {?} moduleType
     * @return {?}
     */
    CompileMetadataResolver.prototype._addTypeToModule = function (type, moduleType) {
        var /** @type {?} */ oldModule = this._ngModuleOfTypes.get(type);
        if (oldModule && oldModule !== moduleType) {
            this._reportError(syntaxError("Type " + stringifyType(type) + " is part of the declarations of 2 modules: " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + "! " +
                ("Please consider moving " + stringifyType(type) + " to a higher module that imports " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + ". ") +
                ("You can also create a new NgModule that exports and includes " + stringifyType(type) + " then import that NgModule in " + stringifyType(oldModule) + " and " + stringifyType(moduleType) + ".")), moduleType);
            return;
        }
        this._ngModuleOfTypes.set(type, moduleType);
    };
    /**
     * @param {?} importedModules
     * @param {?} exportedModules
     * @return {?}
     */
    CompileMetadataResolver.prototype._getTransitiveNgModuleMetadata = function (importedModules, exportedModules) {
        // collect `providers` / `entryComponents` from all imported and all exported modules
        var /** @type {?} */ result = new cpl.TransitiveCompileNgModuleMetadata();
        var /** @type {?} */ modulesByToken = new Map();
        importedModules.concat(exportedModules).forEach(function (modSummary) {
            modSummary.modules.forEach(function (mod) { return result.addModule(mod); });
            modSummary.entryComponents.forEach(function (comp) { return result.addEntryComponent(comp); });
            var /** @type {?} */ addedTokens = new Set();
            modSummary.providers.forEach(function (entry) {
                var /** @type {?} */ tokenRef = cpl.tokenReference(entry.provider.token);
                var /** @type {?} */ prevModules = modulesByToken.get(tokenRef);
                if (!prevModules) {
                    prevModules = new Set();
                    modulesByToken.set(tokenRef, prevModules);
                }
                var /** @type {?} */ moduleRef = entry.module.reference;
                // Note: the providers of one module may still contain multiple providers
                // per token (e.g. for multi providers), and we need to preserve these.
                if (addedTokens.has(tokenRef) || !prevModules.has(moduleRef)) {
                    prevModules.add(moduleRef);
                    addedTokens.add(tokenRef);
                    result.addProvider(entry.provider, entry.module);
                }
            });
        });
        exportedModules.forEach(function (modSummary) {
            modSummary.exportedDirectives.forEach(function (id) { return result.addExportedDirective(id); });
            modSummary.exportedPipes.forEach(function (id) { return result.addExportedPipe(id); });
        });
        importedModules.forEach(function (modSummary) {
            modSummary.exportedDirectives.forEach(function (id) { return result.addDirective(id); });
            modSummary.exportedPipes.forEach(function (id) { return result.addPipe(id); });
        });
        return result;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype._getIdentifierMetadata = function (type) {
        type = resolveForwardRef(type);
        return { reference: type };
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.isInjectable = function (type) {
        var /** @type {?} */ annotations = this._reflector.annotations(type);
        // Note: We need an exact check here as @Component / @Directive / ... inherit
        // from @CompilerInjectable!
        return annotations.some(function (ann) { return ann.constructor === Injectable; });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    CompileMetadataResolver.prototype.getInjectableSummary = function (type) {
        return {
            summaryKind: cpl.CompileSummaryKind.Injectable,
            type: this._getTypeMetadata(type, null, false)
        };
    };
    /**
     * @param {?} type
     * @param {?=} dependencies
     * @return {?}
     */
    CompileMetadataResolver.prototype._getInjectableMetadata = function (type, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        var /** @type {?} */ typeSummary = this._loadSummary(type, cpl.CompileSummaryKind.Injectable);
        if (typeSummary) {
            return typeSummary.type;
        }
        return this._getTypeMetadata(type, dependencies);
    };
    /**
     * @param {?} type
     * @param {?=} dependencies
     * @param {?=} throwOnUnknownDeps
     * @return {?}
     */
    CompileMetadataResolver.prototype._getTypeMetadata = function (type, dependencies, throwOnUnknownDeps) {
        if (dependencies === void 0) { dependencies = null; }
        if (throwOnUnknownDeps === void 0) { throwOnUnknownDeps = true; }
        var /** @type {?} */ identifier = this._getIdentifierMetadata(type);
        return {
            reference: identifier.reference,
            diDeps: this._getDependenciesMetadata(identifier.reference, dependencies, throwOnUnknownDeps),
            lifecycleHooks: getAllLifecycleHooks(this._reflector, identifier.reference),
        };
    };
    /**
     * @param {?} factory
     * @param {?=} dependencies
     * @return {?}
     */
    CompileMetadataResolver.prototype._getFactoryMetadata = function (factory, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        factory = resolveForwardRef(factory);
        return { reference: factory, diDeps: this._getDependenciesMetadata(factory, dependencies) };
    };
    /**
     * Gets the metadata for the given pipe.
     * This assumes `loadNgModuleDirectiveAndPipeMetadata` has been called first.
     * @param {?} pipeType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
        var /** @type {?} */ pipeMeta = this._pipeCache.get(pipeType);
        if (!pipeMeta) {
            this._reportError(syntaxError("Illegal state: getPipeMetadata can only be called after loadNgModuleDirectiveAndPipeMetadata for a module that declares it. Pipe " + stringifyType(pipeType) + "."), pipeType);
        }
        return pipeMeta || null;
    };
    /**
     * @param {?} pipeType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getPipeSummary = function (pipeType) {
        var /** @type {?} */ pipeSummary = (this._loadSummary(pipeType, cpl.CompileSummaryKind.Pipe));
        if (!pipeSummary) {
            this._reportError(syntaxError("Illegal state: Could not load the summary for pipe " + stringifyType(pipeType) + "."), pipeType);
        }
        return pipeSummary;
    };
    /**
     * @param {?} pipeType
     * @return {?}
     */
    CompileMetadataResolver.prototype.getOrLoadPipeMetadata = function (pipeType) {
        var /** @type {?} */ pipeMeta = this._pipeCache.get(pipeType);
        if (!pipeMeta) {
            pipeMeta = this._loadPipeMetadata(pipeType);
        }
        return pipeMeta;
    };
    /**
     * @param {?} pipeType
     * @return {?}
     */
    CompileMetadataResolver.prototype._loadPipeMetadata = function (pipeType) {
        pipeType = resolveForwardRef(pipeType);
        var /** @type {?} */ pipeAnnotation = ((this._pipeResolver.resolve(pipeType)));
        var /** @type {?} */ pipeMeta = new cpl.CompilePipeMetadata({
            type: this._getTypeMetadata(pipeType),
            name: pipeAnnotation.name,
            pure: !!pipeAnnotation.pure
        });
        this._pipeCache.set(pipeType, pipeMeta);
        this._summaryCache.set(pipeType, pipeMeta.toSummary());
        return pipeMeta;
    };
    /**
     * @param {?} typeOrFunc
     * @param {?} dependencies
     * @param {?=} throwOnUnknownDeps
     * @return {?}
     */
    CompileMetadataResolver.prototype._getDependenciesMetadata = function (typeOrFunc, dependencies, throwOnUnknownDeps) {
        var _this = this;
        if (throwOnUnknownDeps === void 0) { throwOnUnknownDeps = true; }
        var /** @type {?} */ hasUnknownDeps = false;
        var /** @type {?} */ params = dependencies || this._reflector.parameters(typeOrFunc) || [];
        var /** @type {?} */ dependenciesMetadata = params.map(function (param) {
            var /** @type {?} */ isAttribute = false;
            var /** @type {?} */ isHost = false;
            var /** @type {?} */ isSelf = false;
            var /** @type {?} */ isSkipSelf = false;
            var /** @type {?} */ isOptional = false;
            var /** @type {?} */ token = null;
            if (Array.isArray(param)) {
                param.forEach(function (paramEntry) {
                    if (paramEntry instanceof Host) {
                        isHost = true;
                    }
                    else if (paramEntry instanceof Self) {
                        isSelf = true;
                    }
                    else if (paramEntry instanceof SkipSelf) {
                        isSkipSelf = true;
                    }
                    else if (paramEntry instanceof Optional) {
                        isOptional = true;
                    }
                    else if (paramEntry instanceof Attribute) {
                        isAttribute = true;
                        token = paramEntry.attributeName;
                    }
                    else if (paramEntry instanceof Inject) {
                        token = paramEntry.token;
                    }
                    else if (paramEntry instanceof InjectionToken) {
                        token = paramEntry;
                    }
                    else if (isValidType(paramEntry) && token == null) {
                        token = paramEntry;
                    }
                });
            }
            else {
                token = param;
            }
            if (token == null) {
                hasUnknownDeps = true;
                return ((null));
            }
            return {
                isAttribute: isAttribute,
                isHost: isHost,
                isSelf: isSelf,
                isSkipSelf: isSkipSelf,
                isOptional: isOptional,
                token: _this._getTokenMetadata(token)
            };
        });
        if (hasUnknownDeps) {
            var /** @type {?} */ depsTokens = dependenciesMetadata.map(function (dep) { return dep ? stringifyType(dep.token) : '?'; }).join(', ');
            var /** @type {?} */ message = "Can't resolve all parameters for " + stringifyType(typeOrFunc) + ": (" + depsTokens + ").";
            if (throwOnUnknownDeps) {
                this._reportError(syntaxError(message), typeOrFunc);
            }
            else {
                this._console.warn("Warning: " + message + " This will become an error in Angular v5.x");
            }
        }
        return dependenciesMetadata;
    };
    /**
     * @param {?} token
     * @return {?}
     */
    CompileMetadataResolver.prototype._getTokenMetadata = function (token) {
        token = resolveForwardRef(token);
        var /** @type {?} */ compileToken;
        if (typeof token === 'string') {
            compileToken = { value: token };
        }
        else {
            compileToken = { identifier: { reference: token } };
        }
        return compileToken;
    };
    /**
     * @param {?} providers
     * @param {?} targetEntryComponents
     * @param {?=} debugInfo
     * @param {?=} compileProviders
     * @param {?=} type
     * @return {?}
     */
    CompileMetadataResolver.prototype._getProvidersMetadata = function (providers, targetEntryComponents, debugInfo, compileProviders, type) {
        var _this = this;
        if (compileProviders === void 0) { compileProviders = []; }
        providers.forEach(function (provider, providerIdx) {
            if (Array.isArray(provider)) {
                _this._getProvidersMetadata(provider, targetEntryComponents, debugInfo, compileProviders);
            }
            else {
                provider = resolveForwardRef(provider);
                var /** @type {?} */ providerMeta = ((undefined));
                if (provider && typeof provider === 'object' && provider.hasOwnProperty('provide')) {
                    _this._validateProvider(provider);
                    providerMeta = new cpl.ProviderMeta(provider.provide, provider);
                }
                else if (isValidType(provider)) {
                    providerMeta = new cpl.ProviderMeta(provider, { useClass: provider });
                }
                else if (provider === void 0) {
                    _this._reportError(syntaxError("Encountered undefined provider! Usually this means you have a circular dependencies (might be caused by using 'barrel' index.ts files."));
                    return;
                }
                else {
                    var /** @type {?} */ providersInfo = ((providers.reduce(function (soFar, seenProvider, seenProviderIdx) {
                        if (seenProviderIdx < providerIdx) {
                            soFar.push("" + stringifyType(seenProvider));
                        }
                        else if (seenProviderIdx == providerIdx) {
                            soFar.push("?" + stringifyType(seenProvider) + "?");
                        }
                        else if (seenProviderIdx == providerIdx + 1) {
                            soFar.push('...');
                        }
                        return soFar;
                    }, [])))
                        .join(', ');
                    _this._reportError(syntaxError("Invalid " + (debugInfo ? debugInfo : 'provider') + " - only instances of Provider and Type are allowed, got: [" + providersInfo + "]"), type);
                    return;
                }
                if (providerMeta.token ===
                    _this._reflector.resolveExternalReference(Identifiers.ANALYZE_FOR_ENTRY_COMPONENTS)) {
                    targetEntryComponents.push.apply(targetEntryComponents, _this._getEntryComponentsFromProvider(providerMeta, type));
                }
                else {
                    compileProviders.push(_this.getProviderMetadata(providerMeta));
                }
            }
        });
        return compileProviders;
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    CompileMetadataResolver.prototype._validateProvider = function (provider) {
        if (provider.hasOwnProperty('useClass') && provider.useClass == null) {
            this._reportError(syntaxError("Invalid provider for " + stringifyType(provider.provide) + ". useClass cannot be " + provider.useClass + ".\n           Usually it happens when:\n           1. There's a circular dependency (might be caused by using index.ts (barrel) files).\n           2. Class was used before it was declared. Use forwardRef in this case."));
        }
    };
    /**
     * @param {?} provider
     * @param {?=} type
     * @return {?}
     */
    CompileMetadataResolver.prototype._getEntryComponentsFromProvider = function (provider, type) {
        var _this = this;
        var /** @type {?} */ components = [];
        var /** @type {?} */ collectedIdentifiers = [];
        if (provider.useFactory || provider.useExisting || provider.useClass) {
            this._reportError(syntaxError("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports useValue!"), type);
            return [];
        }
        if (!provider.multi) {
            this._reportError(syntaxError("The ANALYZE_FOR_ENTRY_COMPONENTS token only supports 'multi = true'!"), type);
            return [];
        }
        extractIdentifiers(provider.useValue, collectedIdentifiers);
        collectedIdentifiers.forEach(function (identifier) {
            var /** @type {?} */ entry = _this._getEntryComponentMetadata(identifier.reference, false);
            if (entry) {
                components.push(entry);
            }
        });
        return components;
    };
    /**
     * @param {?} dirType
     * @param {?=} throwIfNotFound
     * @return {?}
     */
    CompileMetadataResolver.prototype._getEntryComponentMetadata = function (dirType, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var /** @type {?} */ dirMeta = this.getNonNormalizedDirectiveMetadata(dirType);
        if (dirMeta && dirMeta.metadata.isComponent) {
            return { componentType: dirType, componentFactory: /** @type {?} */ ((dirMeta.metadata.componentFactory)) };
        }
        var /** @type {?} */ dirSummary = (this._loadSummary(dirType, cpl.CompileSummaryKind.Directive));
        if (dirSummary && dirSummary.isComponent) {
            return { componentType: dirType, componentFactory: /** @type {?} */ ((dirSummary.componentFactory)) };
        }
        if (throwIfNotFound) {
            throw syntaxError(dirType.name + " cannot be used as an entry component.");
        }
        return null;
    };
    /**
     * @param {?} provider
     * @return {?}
     */
    CompileMetadataResolver.prototype.getProviderMetadata = function (provider) {
        var /** @type {?} */ compileDeps = ((undefined));
        var /** @type {?} */ compileTypeMetadata = ((null));
        var /** @type {?} */ compileFactoryMetadata = ((null));
        var /** @type {?} */ token = this._getTokenMetadata(provider.token);
        if (provider.useClass) {
            compileTypeMetadata = this._getInjectableMetadata(provider.useClass, provider.dependencies);
            compileDeps = compileTypeMetadata.diDeps;
            if (provider.token === provider.useClass) {
                // use the compileTypeMetadata as it contains information about lifecycleHooks...
                token = { identifier: compileTypeMetadata };
            }
        }
        else if (provider.useFactory) {
            compileFactoryMetadata = this._getFactoryMetadata(provider.useFactory, provider.dependencies);
            compileDeps = compileFactoryMetadata.diDeps;
        }
        return {
            token: token,
            useClass: compileTypeMetadata,
            useValue: provider.useValue,
            useFactory: compileFactoryMetadata,
            useExisting: provider.useExisting ? this._getTokenMetadata(provider.useExisting) : undefined,
            deps: compileDeps,
            multi: provider.multi
        };
    };
    /**
     * @param {?} queries
     * @param {?} isViewQuery
     * @param {?} directiveType
     * @return {?}
     */
    CompileMetadataResolver.prototype._getQueriesMetadata = function (queries, isViewQuery, directiveType) {
        var _this = this;
        var /** @type {?} */ res = [];
        Object.keys(queries).forEach(function (propertyName) {
            var /** @type {?} */ query = queries[propertyName];
            if (query.isViewQuery === isViewQuery) {
                res.push(_this._getQueryMetadata(query, propertyName, directiveType));
            }
        });
        return res;
    };
    /**
     * @param {?} selector
     * @return {?}
     */
    CompileMetadataResolver.prototype._queryVarBindings = function (selector) { return selector.split(/\s*,\s*/); };
    /**
     * @param {?} q
     * @param {?} propertyName
     * @param {?} typeOrFunc
     * @return {?}
     */
    CompileMetadataResolver.prototype._getQueryMetadata = function (q, propertyName, typeOrFunc) {
        var _this = this;
        var /** @type {?} */ selectors;
        if (typeof q.selector === 'string') {
            selectors =
                this._queryVarBindings(q.selector).map(function (varName) { return _this._getTokenMetadata(varName); });
        }
        else {
            if (!q.selector) {
                this._reportError(syntaxError("Can't construct a query for the property \"" + propertyName + "\" of \"" + stringifyType(typeOrFunc) + "\" since the query selector wasn't defined."), typeOrFunc);
                selectors = [];
            }
            else {
                selectors = [this._getTokenMetadata(q.selector)];
            }
        }
        return {
            selectors: selectors,
            first: q.first,
            descendants: q.descendants, propertyName: propertyName,
            read: q.read ? this._getTokenMetadata(q.read) : ((null))
        };
    };
    /**
     * @param {?} error
     * @param {?=} type
     * @param {?=} otherType
     * @return {?}
     */
    CompileMetadataResolver.prototype._reportError = function (error, type, otherType) {
        if (this._errorCollector) {
            this._errorCollector(error, type);
            if (otherType) {
                this._errorCollector(error, otherType);
            }
        }
        else {
            throw error;
        }
    };
    return CompileMetadataResolver;
}());
export { CompileMetadataResolver };
CompileMetadataResolver.decorators = [
    { type: CompilerInjectable },
];
/** @nocollapse */
CompileMetadataResolver.ctorParameters = function () { return [
    { type: CompilerConfig, },
    { type: NgModuleResolver, },
    { type: DirectiveResolver, },
    { type: PipeResolver, },
    { type: SummaryResolver, },
    { type: ElementSchemaRegistry, },
    { type: DirectiveNormalizer, },
    { type: Console, },
    { type: StaticSymbolCache, decorators: [{ type: Optional },] },
    { type: CompileReflector, },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [ERROR_COLLECTOR_TOKEN,] },] },
]; };
function CompileMetadataResolver_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileMetadataResolver.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    CompileMetadataResolver.ctorParameters;
    /** @type {?} */
    CompileMetadataResolver.prototype._nonNormalizedDirectiveCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._directiveCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._summaryCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._pipeCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._ngModuleCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._ngModuleOfTypes;
    /** @type {?} */
    CompileMetadataResolver.prototype._config;
    /** @type {?} */
    CompileMetadataResolver.prototype._ngModuleResolver;
    /** @type {?} */
    CompileMetadataResolver.prototype._directiveResolver;
    /** @type {?} */
    CompileMetadataResolver.prototype._pipeResolver;
    /** @type {?} */
    CompileMetadataResolver.prototype._summaryResolver;
    /** @type {?} */
    CompileMetadataResolver.prototype._schemaRegistry;
    /** @type {?} */
    CompileMetadataResolver.prototype._directiveNormalizer;
    /** @type {?} */
    CompileMetadataResolver.prototype._console;
    /** @type {?} */
    CompileMetadataResolver.prototype._staticSymbolCache;
    /** @type {?} */
    CompileMetadataResolver.prototype._reflector;
    /** @type {?} */
    CompileMetadataResolver.prototype._errorCollector;
}
/**
 * @param {?} tree
 * @param {?=} out
 * @return {?}
 */
function flattenArray(tree, out) {
    if (out === void 0) { out = []; }
    if (tree) {
        for (var /** @type {?} */ i = 0; i < tree.length; i++) {
            var /** @type {?} */ item = resolveForwardRef(tree[i]);
            if (Array.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    return out;
}
/**
 * @param {?} array
 * @return {?}
 */
function dedupeArray(array) {
    if (array) {
        return Array.from(new Set(array));
    }
    return [];
}
/**
 * @param {?} tree
 * @return {?}
 */
function flattenAndDedupeArray(tree) {
    return dedupeArray(flattenArray(tree));
}
/**
 * @param {?} value
 * @return {?}
 */
function isValidType(value) {
    return (value instanceof StaticSymbol) || (value instanceof Type);
}
/**
 * @param {?} value
 * @param {?} targetIdentifiers
 * @return {?}
 */
function extractIdentifiers(value, targetIdentifiers) {
    visitValue(value, new _CompileValueConverter(), targetIdentifiers);
}
var _CompileValueConverter = (function (_super) {
    tslib_1.__extends(_CompileValueConverter, _super);
    function _CompileValueConverter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} value
     * @param {?} targetIdentifiers
     * @return {?}
     */
    _CompileValueConverter.prototype.visitOther = function (value, targetIdentifiers) {
        targetIdentifiers.push({ reference: value });
    };
    return _CompileValueConverter;
}(ValueTransformer));
/**
 * @param {?} type
 * @return {?}
 */
function stringifyType(type) {
    if (type instanceof StaticSymbol) {
        return type.name + " in " + type.filePath;
    }
    else {
        return stringify(type);
    }
}
/**
 * Indicates that a component is still being loaded in a synchronous compile.
 * @param {?} compType
 * @return {?}
 */
function componentStillLoadingError(compType) {
    var /** @type {?} */ error = Error("Can't compile synchronously as " + stringify(compType) + " is still being loaded!");
    ((error))[ɵERROR_COMPONENT_TYPE] = compType;
    return error;
}
//# sourceMappingURL=metadata_resolver.js.map