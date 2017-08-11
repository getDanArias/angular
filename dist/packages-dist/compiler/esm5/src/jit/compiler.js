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
import { Compiler, Injector, ModuleWithComponentFactories, ɵConsole as Console, ɵgetComponentViewDefinitionFactory as getComponentViewDefinitionFactory, ɵstringify as stringify } from '@angular/core';
import { ProviderMeta, createHostComponentMeta, identifierName, ngModuleJitUrl, sharedStylesheetJitUrl, templateJitUrl, templateSourceUrl } from '../compile_metadata';
import { CompilerConfig } from '../config';
import { CompilerInjectable } from '../injectable';
import { CompileMetadataResolver } from '../metadata_resolver';
import { NgModuleCompiler } from '../ng_module_compiler';
import * as ir from '../output/output_ast';
import { interpretStatements } from '../output/output_interpreter';
import { jitStatements } from '../output/output_jit';
import { StyleCompiler } from '../style_compiler';
import { SummaryResolver } from '../summary_resolver';
import { TemplateParser } from '../template_parser/template_parser';
import { SyncAsync } from '../util';
import { ViewCompiler } from '../view_compiler/view_compiler';
/**
 * An internal module of the Angular compiler that begins with component types,
 * extracts templates, and eventually produces a compiled version of the component
 * ready for linking into an application.
 *
 * \@security When compiling templates at runtime, you must ensure that the entire template comes
 * from a trusted source. Attacker-controlled data introduced by a template could expose your
 * application to XSS risks.  For more detail, see the [Security Guide](http://g.co/ng/security).
 */
var JitCompiler = (function () {
    /**
     * @param {?} _injector
     * @param {?} _metadataResolver
     * @param {?} _templateParser
     * @param {?} _styleCompiler
     * @param {?} _viewCompiler
     * @param {?} _ngModuleCompiler
     * @param {?} _summaryResolver
     * @param {?} _compilerConfig
     * @param {?} _console
     */
    function JitCompiler(_injector, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _summaryResolver, _compilerConfig, _console) {
        this._injector = _injector;
        this._metadataResolver = _metadataResolver;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._summaryResolver = _summaryResolver;
        this._compilerConfig = _compilerConfig;
        this._console = _console;
        this._compiledTemplateCache = new Map();
        this._compiledHostTemplateCache = new Map();
        this._compiledDirectiveWrapperCache = new Map();
        this._compiledNgModuleCache = new Map();
        this._sharedStylesheetCount = 0;
    }
    Object.defineProperty(JitCompiler.prototype, "injector", {
        /**
         * @return {?}
         */
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    JitCompiler.prototype.compileModuleSync = function (moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndComponents(moduleType, true));
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    JitCompiler.prototype.compileModuleAsync = function (moduleType) {
        return Promise.resolve(this._compileModuleAndComponents(moduleType, false));
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    JitCompiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndAllComponents(moduleType, true));
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    JitCompiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        return Promise.resolve(this._compileModuleAndAllComponents(moduleType, false));
    };
    /**
     * @param {?} component
     * @return {?}
     */
    JitCompiler.prototype.getNgContentSelectors = function (component) {
        this._console.warn('Compiler.getNgContentSelectors is deprecated. Use ComponentFactory.ngContentSelectors instead!');
        var /** @type {?} */ template = this._compiledTemplateCache.get(component);
        if (!template) {
            throw new Error("The component " + stringify(component) + " is not yet compiled!");
        }
        return ((template.compMeta.template)).ngContentSelectors;
    };
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    JitCompiler.prototype.getComponentFactory = function (component) {
        var /** @type {?} */ summary = this._metadataResolver.getDirectiveSummary(component);
        return (summary.componentFactory);
    };
    /**
     * @param {?} summaries
     * @return {?}
     */
    JitCompiler.prototype.loadAotSummaries = function (summaries) {
        var _this = this;
        this.clearCache();
        flattenSummaries(summaries).forEach(function (summary) {
            _this._summaryResolver.addSummary({ symbol: summary.type.reference, metadata: null, type: summary });
        });
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    JitCompiler.prototype.hasAotSummary = function (ref) { return !!this._summaryResolver.resolveSummary(ref); };
    /**
     * @param {?} ids
     * @return {?}
     */
    JitCompiler.prototype._filterJitIdentifiers = function (ids) {
        var _this = this;
        return ids.map(function (mod) { return mod.reference; }).filter(function (ref) { return !_this.hasAotSummary(ref); });
    };
    /**
     * @template T
     * @param {?} moduleType
     * @param {?} isSync
     * @return {?}
     */
    JitCompiler.prototype._compileModuleAndComponents = function (moduleType, isSync) {
        var _this = this;
        return SyncAsync.then(this._loadModules(moduleType, isSync), function () {
            _this._compileComponents(moduleType, null);
            return _this._compileModule(moduleType);
        });
    };
    /**
     * @template T
     * @param {?} moduleType
     * @param {?} isSync
     * @return {?}
     */
    JitCompiler.prototype._compileModuleAndAllComponents = function (moduleType, isSync) {
        var _this = this;
        return SyncAsync.then(this._loadModules(moduleType, isSync), function () {
            var /** @type {?} */ componentFactories = [];
            _this._compileComponents(moduleType, componentFactories);
            return new ModuleWithComponentFactories(_this._compileModule(moduleType), componentFactories);
        });
    };
    /**
     * @param {?} mainModule
     * @param {?} isSync
     * @return {?}
     */
    JitCompiler.prototype._loadModules = function (mainModule, isSync) {
        var _this = this;
        var /** @type {?} */ loading = [];
        var /** @type {?} */ mainNgModule = ((this._metadataResolver.getNgModuleMetadata(mainModule)));
        // Note: for runtime compilation, we want to transitively compile all modules,
        // so we also need to load the declared directives / pipes for all nested modules.
        this._filterJitIdentifiers(mainNgModule.transitiveModule.modules).forEach(function (nestedNgModule) {
            // getNgModuleMetadata only returns null if the value passed in is not an NgModule
            var /** @type {?} */ moduleMeta = ((_this._metadataResolver.getNgModuleMetadata(nestedNgModule)));
            _this._filterJitIdentifiers(moduleMeta.declaredDirectives).forEach(function (ref) {
                var /** @type {?} */ promise = _this._metadataResolver.loadDirectiveMetadata(moduleMeta.type.reference, ref, isSync);
                if (promise) {
                    loading.push(promise);
                }
            });
            _this._filterJitIdentifiers(moduleMeta.declaredPipes)
                .forEach(function (ref) { return _this._metadataResolver.getOrLoadPipeMetadata(ref); });
        });
        return SyncAsync.all(loading);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    JitCompiler.prototype._compileModule = function (moduleType) {
        var _this = this;
        var /** @type {?} */ ngModuleFactory = ((this._compiledNgModuleCache.get(moduleType)));
        if (!ngModuleFactory) {
            var /** @type {?} */ moduleMeta_1 = ((this._metadataResolver.getNgModuleMetadata(moduleType)));
            // Always provide a bound Compiler
            var /** @type {?} */ extraProviders = [this._metadataResolver.getProviderMetadata(new ProviderMeta(Compiler, { useFactory: function () { return new ModuleBoundCompiler(_this, moduleMeta_1.type.reference); } }))];
            var /** @type {?} */ outputCtx = createOutputContext();
            var /** @type {?} */ compileResult = this._ngModuleCompiler.compile(outputCtx, moduleMeta_1, extraProviders);
            if (!this._compilerConfig.useJit) {
                ngModuleFactory =
                    interpretStatements(outputCtx.statements)[compileResult.ngModuleFactoryVar];
            }
            else {
                ngModuleFactory = jitStatements(ngModuleJitUrl(moduleMeta_1), outputCtx.statements)[compileResult.ngModuleFactoryVar];
            }
            this._compiledNgModuleCache.set(moduleMeta_1.type.reference, ngModuleFactory);
        }
        return ngModuleFactory;
    };
    /**
     * \@internal
     * @param {?} mainModule
     * @param {?} allComponentFactories
     * @return {?}
     */
    JitCompiler.prototype._compileComponents = function (mainModule, allComponentFactories) {
        var _this = this;
        var /** @type {?} */ ngModule = ((this._metadataResolver.getNgModuleMetadata(mainModule)));
        var /** @type {?} */ moduleByJitDirective = new Map();
        var /** @type {?} */ templates = new Set();
        var /** @type {?} */ transJitModules = this._filterJitIdentifiers(ngModule.transitiveModule.modules);
        transJitModules.forEach(function (localMod) {
            var /** @type {?} */ localModuleMeta = ((_this._metadataResolver.getNgModuleMetadata(localMod)));
            _this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach(function (dirRef) {
                moduleByJitDirective.set(dirRef, localModuleMeta);
                var /** @type {?} */ dirMeta = _this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    templates.add(_this._createCompiledTemplate(dirMeta, localModuleMeta));
                    if (allComponentFactories) {
                        var /** @type {?} */ template = _this._createCompiledHostTemplate(dirMeta.type.reference, localModuleMeta);
                        templates.add(template);
                        allComponentFactories.push(/** @type {?} */ (dirMeta.componentFactory));
                    }
                }
            });
        });
        transJitModules.forEach(function (localMod) {
            var /** @type {?} */ localModuleMeta = ((_this._metadataResolver.getNgModuleMetadata(localMod)));
            _this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach(function (dirRef) {
                var /** @type {?} */ dirMeta = _this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    dirMeta.entryComponents.forEach(function (entryComponentType) {
                        var /** @type {?} */ moduleMeta = ((moduleByJitDirective.get(entryComponentType.componentType)));
                        templates.add(_this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                    });
                }
            });
            localModuleMeta.entryComponents.forEach(function (entryComponentType) {
                if (!_this.hasAotSummary(entryComponentType.componentType.reference)) {
                    var /** @type {?} */ moduleMeta = ((moduleByJitDirective.get(entryComponentType.componentType)));
                    templates.add(_this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                }
            });
        });
        templates.forEach(function (template) { return _this._compileTemplate(template); });
    };
    /**
     * @param {?} type
     * @return {?}
     */
    JitCompiler.prototype.clearCacheFor = function (type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        var /** @type {?} */ compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
            this._compiledTemplateCache.delete(type);
        }
    };
    /**
     * @return {?}
     */
    JitCompiler.prototype.clearCache = function () {
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._compiledNgModuleCache.clear();
    };
    /**
     * @param {?} compType
     * @param {?} ngModule
     * @return {?}
     */
    JitCompiler.prototype._createCompiledHostTemplate = function (compType, ngModule) {
        if (!ngModule) {
            throw new Error("Component " + stringify(compType) + " is not part of any NgModule or the module has not been imported into your module.");
        }
        var /** @type {?} */ compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (!compiledTemplate) {
            var /** @type {?} */ compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            assertComponent(compMeta);
            var /** @type {?} */ componentFactory = (compMeta.componentFactory);
            var /** @type {?} */ hostClass = this._metadataResolver.getHostComponentType(compType);
            var /** @type {?} */ hostMeta = createHostComponentMeta(hostClass, compMeta, /** @type {?} */ (getComponentViewDefinitionFactory(componentFactory)));
            compiledTemplate =
                new CompiledTemplate(true, compMeta.type, hostMeta, ngModule, [compMeta.type]);
            this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
    };
    /**
     * @param {?} compMeta
     * @param {?} ngModule
     * @return {?}
     */
    JitCompiler.prototype._createCompiledTemplate = function (compMeta, ngModule) {
        var /** @type {?} */ compiledTemplate = this._compiledTemplateCache.get(compMeta.type.reference);
        if (!compiledTemplate) {
            assertComponent(compMeta);
            compiledTemplate = new CompiledTemplate(false, compMeta.type, compMeta, ngModule, ngModule.transitiveModule.directives);
            this._compiledTemplateCache.set(compMeta.type.reference, compiledTemplate);
        }
        return compiledTemplate;
    };
    /**
     * @param {?} template
     * @return {?}
     */
    JitCompiler.prototype._compileTemplate = function (template) {
        var _this = this;
        if (template.isCompiled) {
            return;
        }
        var /** @type {?} */ compMeta = template.compMeta;
        var /** @type {?} */ externalStylesheetsByModuleUrl = new Map();
        var /** @type {?} */ outputContext = createOutputContext();
        var /** @type {?} */ componentStylesheet = this._styleCompiler.compileComponent(outputContext, compMeta); /** @type {?} */
        ((compMeta.template)).externalStylesheets.forEach(function (stylesheetMeta) {
            var /** @type {?} */ compiledStylesheet = _this._styleCompiler.compileStyles(createOutputContext(), compMeta, stylesheetMeta);
            externalStylesheetsByModuleUrl.set(/** @type {?} */ ((stylesheetMeta.moduleUrl)), compiledStylesheet);
        });
        this._resolveStylesCompileResult(componentStylesheet, externalStylesheetsByModuleUrl);
        var /** @type {?} */ directives = template.directives.map(function (dir) { return _this._metadataResolver.getDirectiveSummary(dir.reference); });
        var /** @type {?} */ pipes = template.ngModule.transitiveModule.pipes.map(function (pipe) { return _this._metadataResolver.getPipeSummary(pipe.reference); });
        var _a = this._templateParser.parse(compMeta, /** @type {?} */ ((((compMeta.template)).template)), directives, pipes, template.ngModule.schemas, templateSourceUrl(template.ngModule.type, template.compMeta, /** @type {?} */ ((template.compMeta.template)))), parsedTemplate = _a.template, usedPipes = _a.pipes;
        var /** @type {?} */ compileResult = this._viewCompiler.compileComponent(outputContext, compMeta, parsedTemplate, ir.variable(componentStylesheet.stylesVar), usedPipes);
        var /** @type {?} */ evalResult;
        if (!this._compilerConfig.useJit) {
            evalResult = interpretStatements(outputContext.statements);
        }
        else {
            evalResult = jitStatements(templateJitUrl(template.ngModule.type, template.compMeta), outputContext.statements);
        }
        var /** @type {?} */ viewClass = evalResult[compileResult.viewClassVar];
        var /** @type {?} */ rendererType = evalResult[compileResult.rendererTypeVar];
        template.compiled(viewClass, rendererType);
    };
    /**
     * @param {?} result
     * @param {?} externalStylesheetsByModuleUrl
     * @return {?}
     */
    JitCompiler.prototype._resolveStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        var _this = this;
        result.dependencies.forEach(function (dep, i) {
            var /** @type {?} */ nestedCompileResult = ((externalStylesheetsByModuleUrl.get(dep.moduleUrl)));
            var /** @type {?} */ nestedStylesArr = _this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
            dep.setValue(nestedStylesArr);
        });
    };
    /**
     * @param {?} result
     * @param {?} externalStylesheetsByModuleUrl
     * @return {?}
     */
    JitCompiler.prototype._resolveAndEvalStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        if (!this._compilerConfig.useJit) {
            return interpretStatements(result.outputCtx.statements)[result.stylesVar];
        }
        else {
            return jitStatements(sharedStylesheetJitUrl(result.meta, this._sharedStylesheetCount++), result.outputCtx.statements)[result.stylesVar];
        }
    };
    return JitCompiler;
}());
export { JitCompiler };
JitCompiler.decorators = [
    { type: CompilerInjectable },
];
/** @nocollapse */
JitCompiler.ctorParameters = function () { return [
    { type: Injector, },
    { type: CompileMetadataResolver, },
    { type: TemplateParser, },
    { type: StyleCompiler, },
    { type: ViewCompiler, },
    { type: NgModuleCompiler, },
    { type: SummaryResolver, },
    { type: CompilerConfig, },
    { type: Console, },
]; };
function JitCompiler_tsickle_Closure_declarations() {
    /** @type {?} */
    JitCompiler.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    JitCompiler.ctorParameters;
    /** @type {?} */
    JitCompiler.prototype._compiledTemplateCache;
    /** @type {?} */
    JitCompiler.prototype._compiledHostTemplateCache;
    /** @type {?} */
    JitCompiler.prototype._compiledDirectiveWrapperCache;
    /** @type {?} */
    JitCompiler.prototype._compiledNgModuleCache;
    /** @type {?} */
    JitCompiler.prototype._sharedStylesheetCount;
    /** @type {?} */
    JitCompiler.prototype._injector;
    /** @type {?} */
    JitCompiler.prototype._metadataResolver;
    /** @type {?} */
    JitCompiler.prototype._templateParser;
    /** @type {?} */
    JitCompiler.prototype._styleCompiler;
    /** @type {?} */
    JitCompiler.prototype._viewCompiler;
    /** @type {?} */
    JitCompiler.prototype._ngModuleCompiler;
    /** @type {?} */
    JitCompiler.prototype._summaryResolver;
    /** @type {?} */
    JitCompiler.prototype._compilerConfig;
    /** @type {?} */
    JitCompiler.prototype._console;
}
var CompiledTemplate = (function () {
    /**
     * @param {?} isHost
     * @param {?} compType
     * @param {?} compMeta
     * @param {?} ngModule
     * @param {?} directives
     */
    function CompiledTemplate(isHost, compType, compMeta, ngModule, directives) {
        this.isHost = isHost;
        this.compType = compType;
        this.compMeta = compMeta;
        this.ngModule = ngModule;
        this.directives = directives;
        this._viewClass = ((null));
        this.isCompiled = false;
    }
    /**
     * @param {?} viewClass
     * @param {?} rendererType
     * @return {?}
     */
    CompiledTemplate.prototype.compiled = function (viewClass, rendererType) {
        this._viewClass = viewClass;
        ((this.compMeta.componentViewType)).setDelegate(viewClass);
        for (var /** @type {?} */ prop in rendererType) {
            ((this.compMeta.rendererType))[prop] = rendererType[prop];
        }
        this.isCompiled = true;
    };
    return CompiledTemplate;
}());
function CompiledTemplate_tsickle_Closure_declarations() {
    /** @type {?} */
    CompiledTemplate.prototype._viewClass;
    /** @type {?} */
    CompiledTemplate.prototype.isCompiled;
    /** @type {?} */
    CompiledTemplate.prototype.isHost;
    /** @type {?} */
    CompiledTemplate.prototype.compType;
    /** @type {?} */
    CompiledTemplate.prototype.compMeta;
    /** @type {?} */
    CompiledTemplate.prototype.ngModule;
    /** @type {?} */
    CompiledTemplate.prototype.directives;
}
/**
 * @param {?} meta
 * @return {?}
 */
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new Error("Could not compile '" + identifierName(meta.type) + "' because it is not a component.");
    }
}
/**
 * Implements `Compiler` by delegating to the JitCompiler using a known module.
 */
var ModuleBoundCompiler = (function () {
    /**
     * @param {?} _delegate
     * @param {?} _ngModule
     */
    function ModuleBoundCompiler(_delegate, _ngModule) {
        this._delegate = _delegate;
        this._ngModule = _ngModule;
    }
    Object.defineProperty(ModuleBoundCompiler.prototype, "_injector", {
        /**
         * @return {?}
         */
        get: function () { return this._delegate.injector; },
        enumerable: true,
        configurable: true
    });
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    ModuleBoundCompiler.prototype.compileModuleSync = function (moduleType) {
        return this._delegate.compileModuleSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    ModuleBoundCompiler.prototype.compileModuleAsync = function (moduleType) {
        return this._delegate.compileModuleAsync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    ModuleBoundCompiler.prototype.compileModuleAndAllComponentsSync = function (moduleType) {
        return this._delegate.compileModuleAndAllComponentsSync(moduleType);
    };
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    ModuleBoundCompiler.prototype.compileModuleAndAllComponentsAsync = function (moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType);
    };
    /**
     * @param {?} component
     * @return {?}
     */
    ModuleBoundCompiler.prototype.getNgContentSelectors = function (component) {
        return this._delegate.getNgContentSelectors(component);
    };
    /**
     * Clears all caches
     * @return {?}
     */
    ModuleBoundCompiler.prototype.clearCache = function () { this._delegate.clearCache(); };
    /**
     * Clears the cache for the given component/ngModule.
     * @param {?} type
     * @return {?}
     */
    ModuleBoundCompiler.prototype.clearCacheFor = function (type) { this._delegate.clearCacheFor(type); };
    return ModuleBoundCompiler;
}());
function ModuleBoundCompiler_tsickle_Closure_declarations() {
    /** @type {?} */
    ModuleBoundCompiler.prototype._delegate;
    /** @type {?} */
    ModuleBoundCompiler.prototype._ngModule;
}
/**
 * @param {?} fn
 * @param {?=} out
 * @return {?}
 */
function flattenSummaries(fn, out) {
    if (out === void 0) { out = []; }
    fn().forEach(function (entry) {
        if (typeof entry === 'function') {
            flattenSummaries(entry, out);
        }
        else {
            out.push(entry);
        }
    });
    return out;
}
/**
 * @return {?}
 */
function createOutputContext() {
    var /** @type {?} */ importExpr = function (symbol) {
        return ir.importExpr({ name: identifierName(symbol), moduleName: null, runtime: symbol });
    };
    return { statements: [], genFilePath: '', importExpr: importExpr };
}
//# sourceMappingURL=compiler.js.map