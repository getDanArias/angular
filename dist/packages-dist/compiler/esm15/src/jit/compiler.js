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
export class JitCompiler {
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
    constructor(_injector, _metadataResolver, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _summaryResolver, _compilerConfig, _console) {
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
    /**
     * @return {?}
     */
    get injector() { return this._injector; }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleSync(moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndComponents(moduleType, true));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAsync(moduleType) {
        return Promise.resolve(this._compileModuleAndComponents(moduleType, false));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsSync(moduleType) {
        return SyncAsync.assertSync(this._compileModuleAndAllComponents(moduleType, true));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        return Promise.resolve(this._compileModuleAndAllComponents(moduleType, false));
    }
    /**
     * @param {?} component
     * @return {?}
     */
    getNgContentSelectors(component) {
        this._console.warn('Compiler.getNgContentSelectors is deprecated. Use ComponentFactory.ngContentSelectors instead!');
        const /** @type {?} */ template = this._compiledTemplateCache.get(component);
        if (!template) {
            throw new Error(`The component ${stringify(component)} is not yet compiled!`);
        }
        return ((template.compMeta.template)).ngContentSelectors;
    }
    /**
     * @template T
     * @param {?} component
     * @return {?}
     */
    getComponentFactory(component) {
        const /** @type {?} */ summary = this._metadataResolver.getDirectiveSummary(component);
        return (summary.componentFactory);
    }
    /**
     * @param {?} summaries
     * @return {?}
     */
    loadAotSummaries(summaries) {
        this.clearCache();
        flattenSummaries(summaries).forEach((summary) => {
            this._summaryResolver.addSummary({ symbol: summary.type.reference, metadata: null, type: summary });
        });
    }
    /**
     * @param {?} ref
     * @return {?}
     */
    hasAotSummary(ref) { return !!this._summaryResolver.resolveSummary(ref); }
    /**
     * @param {?} ids
     * @return {?}
     */
    _filterJitIdentifiers(ids) {
        return ids.map(mod => mod.reference).filter((ref) => !this.hasAotSummary(ref));
    }
    /**
     * @template T
     * @param {?} moduleType
     * @param {?} isSync
     * @return {?}
     */
    _compileModuleAndComponents(moduleType, isSync) {
        return SyncAsync.then(this._loadModules(moduleType, isSync), () => {
            this._compileComponents(moduleType, null);
            return this._compileModule(moduleType);
        });
    }
    /**
     * @template T
     * @param {?} moduleType
     * @param {?} isSync
     * @return {?}
     */
    _compileModuleAndAllComponents(moduleType, isSync) {
        return SyncAsync.then(this._loadModules(moduleType, isSync), () => {
            const /** @type {?} */ componentFactories = [];
            this._compileComponents(moduleType, componentFactories);
            return new ModuleWithComponentFactories(this._compileModule(moduleType), componentFactories);
        });
    }
    /**
     * @param {?} mainModule
     * @param {?} isSync
     * @return {?}
     */
    _loadModules(mainModule, isSync) {
        const /** @type {?} */ loading = [];
        const /** @type {?} */ mainNgModule = ((this._metadataResolver.getNgModuleMetadata(mainModule)));
        // Note: for runtime compilation, we want to transitively compile all modules,
        // so we also need to load the declared directives / pipes for all nested modules.
        this._filterJitIdentifiers(mainNgModule.transitiveModule.modules).forEach((nestedNgModule) => {
            // getNgModuleMetadata only returns null if the value passed in is not an NgModule
            const /** @type {?} */ moduleMeta = ((this._metadataResolver.getNgModuleMetadata(nestedNgModule)));
            this._filterJitIdentifiers(moduleMeta.declaredDirectives).forEach((ref) => {
                const /** @type {?} */ promise = this._metadataResolver.loadDirectiveMetadata(moduleMeta.type.reference, ref, isSync);
                if (promise) {
                    loading.push(promise);
                }
            });
            this._filterJitIdentifiers(moduleMeta.declaredPipes)
                .forEach((ref) => this._metadataResolver.getOrLoadPipeMetadata(ref));
        });
        return SyncAsync.all(loading);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    _compileModule(moduleType) {
        let /** @type {?} */ ngModuleFactory = ((this._compiledNgModuleCache.get(moduleType)));
        if (!ngModuleFactory) {
            const /** @type {?} */ moduleMeta = ((this._metadataResolver.getNgModuleMetadata(moduleType)));
            // Always provide a bound Compiler
            const /** @type {?} */ extraProviders = [this._metadataResolver.getProviderMetadata(new ProviderMeta(Compiler, { useFactory: () => new ModuleBoundCompiler(this, moduleMeta.type.reference) }))];
            const /** @type {?} */ outputCtx = createOutputContext();
            const /** @type {?} */ compileResult = this._ngModuleCompiler.compile(outputCtx, moduleMeta, extraProviders);
            if (!this._compilerConfig.useJit) {
                ngModuleFactory =
                    interpretStatements(outputCtx.statements)[compileResult.ngModuleFactoryVar];
            }
            else {
                ngModuleFactory = jitStatements(ngModuleJitUrl(moduleMeta), outputCtx.statements)[compileResult.ngModuleFactoryVar];
            }
            this._compiledNgModuleCache.set(moduleMeta.type.reference, ngModuleFactory);
        }
        return ngModuleFactory;
    }
    /**
     * \@internal
     * @param {?} mainModule
     * @param {?} allComponentFactories
     * @return {?}
     */
    _compileComponents(mainModule, allComponentFactories) {
        const /** @type {?} */ ngModule = ((this._metadataResolver.getNgModuleMetadata(mainModule)));
        const /** @type {?} */ moduleByJitDirective = new Map();
        const /** @type {?} */ templates = new Set();
        const /** @type {?} */ transJitModules = this._filterJitIdentifiers(ngModule.transitiveModule.modules);
        transJitModules.forEach((localMod) => {
            const /** @type {?} */ localModuleMeta = ((this._metadataResolver.getNgModuleMetadata(localMod)));
            this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach((dirRef) => {
                moduleByJitDirective.set(dirRef, localModuleMeta);
                const /** @type {?} */ dirMeta = this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    templates.add(this._createCompiledTemplate(dirMeta, localModuleMeta));
                    if (allComponentFactories) {
                        const /** @type {?} */ template = this._createCompiledHostTemplate(dirMeta.type.reference, localModuleMeta);
                        templates.add(template);
                        allComponentFactories.push(/** @type {?} */ (dirMeta.componentFactory));
                    }
                }
            });
        });
        transJitModules.forEach((localMod) => {
            const /** @type {?} */ localModuleMeta = ((this._metadataResolver.getNgModuleMetadata(localMod)));
            this._filterJitIdentifiers(localModuleMeta.declaredDirectives).forEach((dirRef) => {
                const /** @type {?} */ dirMeta = this._metadataResolver.getDirectiveMetadata(dirRef);
                if (dirMeta.isComponent) {
                    dirMeta.entryComponents.forEach((entryComponentType) => {
                        const /** @type {?} */ moduleMeta = ((moduleByJitDirective.get(entryComponentType.componentType)));
                        templates.add(this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                    });
                }
            });
            localModuleMeta.entryComponents.forEach((entryComponentType) => {
                if (!this.hasAotSummary(entryComponentType.componentType.reference)) {
                    const /** @type {?} */ moduleMeta = ((moduleByJitDirective.get(entryComponentType.componentType)));
                    templates.add(this._createCompiledHostTemplate(entryComponentType.componentType, moduleMeta));
                }
            });
        });
        templates.forEach((template) => this._compileTemplate(template));
    }
    /**
     * @param {?} type
     * @return {?}
     */
    clearCacheFor(type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        const /** @type {?} */ compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
            this._compiledTemplateCache.delete(type);
        }
    }
    /**
     * @return {?}
     */
    clearCache() {
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._compiledNgModuleCache.clear();
    }
    /**
     * @param {?} compType
     * @param {?} ngModule
     * @return {?}
     */
    _createCompiledHostTemplate(compType, ngModule) {
        if (!ngModule) {
            throw new Error(`Component ${stringify(compType)} is not part of any NgModule or the module has not been imported into your module.`);
        }
        let /** @type {?} */ compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (!compiledTemplate) {
            const /** @type {?} */ compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            assertComponent(compMeta);
            const /** @type {?} */ componentFactory = (compMeta.componentFactory);
            const /** @type {?} */ hostClass = this._metadataResolver.getHostComponentType(compType);
            const /** @type {?} */ hostMeta = createHostComponentMeta(hostClass, compMeta, /** @type {?} */ (getComponentViewDefinitionFactory(componentFactory)));
            compiledTemplate =
                new CompiledTemplate(true, compMeta.type, hostMeta, ngModule, [compMeta.type]);
            this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
    }
    /**
     * @param {?} compMeta
     * @param {?} ngModule
     * @return {?}
     */
    _createCompiledTemplate(compMeta, ngModule) {
        let /** @type {?} */ compiledTemplate = this._compiledTemplateCache.get(compMeta.type.reference);
        if (!compiledTemplate) {
            assertComponent(compMeta);
            compiledTemplate = new CompiledTemplate(false, compMeta.type, compMeta, ngModule, ngModule.transitiveModule.directives);
            this._compiledTemplateCache.set(compMeta.type.reference, compiledTemplate);
        }
        return compiledTemplate;
    }
    /**
     * @param {?} template
     * @return {?}
     */
    _compileTemplate(template) {
        if (template.isCompiled) {
            return;
        }
        const /** @type {?} */ compMeta = template.compMeta;
        const /** @type {?} */ externalStylesheetsByModuleUrl = new Map();
        const /** @type {?} */ outputContext = createOutputContext();
        const /** @type {?} */ componentStylesheet = this._styleCompiler.compileComponent(outputContext, compMeta); /** @type {?} */
        ((compMeta.template)).externalStylesheets.forEach((stylesheetMeta) => {
            const /** @type {?} */ compiledStylesheet = this._styleCompiler.compileStyles(createOutputContext(), compMeta, stylesheetMeta);
            externalStylesheetsByModuleUrl.set(/** @type {?} */ ((stylesheetMeta.moduleUrl)), compiledStylesheet);
        });
        this._resolveStylesCompileResult(componentStylesheet, externalStylesheetsByModuleUrl);
        const /** @type {?} */ directives = template.directives.map(dir => this._metadataResolver.getDirectiveSummary(dir.reference));
        const /** @type {?} */ pipes = template.ngModule.transitiveModule.pipes.map(pipe => this._metadataResolver.getPipeSummary(pipe.reference));
        const { template: parsedTemplate, pipes: usedPipes } = this._templateParser.parse(compMeta, /** @type {?} */ ((((compMeta.template)).template)), directives, pipes, template.ngModule.schemas, templateSourceUrl(template.ngModule.type, template.compMeta, /** @type {?} */ ((template.compMeta.template))));
        const /** @type {?} */ compileResult = this._viewCompiler.compileComponent(outputContext, compMeta, parsedTemplate, ir.variable(componentStylesheet.stylesVar), usedPipes);
        let /** @type {?} */ evalResult;
        if (!this._compilerConfig.useJit) {
            evalResult = interpretStatements(outputContext.statements);
        }
        else {
            evalResult = jitStatements(templateJitUrl(template.ngModule.type, template.compMeta), outputContext.statements);
        }
        const /** @type {?} */ viewClass = evalResult[compileResult.viewClassVar];
        const /** @type {?} */ rendererType = evalResult[compileResult.rendererTypeVar];
        template.compiled(viewClass, rendererType);
    }
    /**
     * @param {?} result
     * @param {?} externalStylesheetsByModuleUrl
     * @return {?}
     */
    _resolveStylesCompileResult(result, externalStylesheetsByModuleUrl) {
        result.dependencies.forEach((dep, i) => {
            const /** @type {?} */ nestedCompileResult = ((externalStylesheetsByModuleUrl.get(dep.moduleUrl)));
            const /** @type {?} */ nestedStylesArr = this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
            dep.setValue(nestedStylesArr);
        });
    }
    /**
     * @param {?} result
     * @param {?} externalStylesheetsByModuleUrl
     * @return {?}
     */
    _resolveAndEvalStylesCompileResult(result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        if (!this._compilerConfig.useJit) {
            return interpretStatements(result.outputCtx.statements)[result.stylesVar];
        }
        else {
            return jitStatements(sharedStylesheetJitUrl(result.meta, this._sharedStylesheetCount++), result.outputCtx.statements)[result.stylesVar];
        }
    }
}
JitCompiler.decorators = [
    { type: CompilerInjectable },
];
/** @nocollapse */
JitCompiler.ctorParameters = () => [
    { type: Injector, },
    { type: CompileMetadataResolver, },
    { type: TemplateParser, },
    { type: StyleCompiler, },
    { type: ViewCompiler, },
    { type: NgModuleCompiler, },
    { type: SummaryResolver, },
    { type: CompilerConfig, },
    { type: Console, },
];
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
class CompiledTemplate {
    /**
     * @param {?} isHost
     * @param {?} compType
     * @param {?} compMeta
     * @param {?} ngModule
     * @param {?} directives
     */
    constructor(isHost, compType, compMeta, ngModule, directives) {
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
    compiled(viewClass, rendererType) {
        this._viewClass = viewClass;
        ((this.compMeta.componentViewType)).setDelegate(viewClass);
        for (let /** @type {?} */ prop in rendererType) {
            ((this.compMeta.rendererType))[prop] = rendererType[prop];
        }
        this.isCompiled = true;
    }
}
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
        throw new Error(`Could not compile '${identifierName(meta.type)}' because it is not a component.`);
    }
}
/**
 * Implements `Compiler` by delegating to the JitCompiler using a known module.
 */
class ModuleBoundCompiler {
    /**
     * @param {?} _delegate
     * @param {?} _ngModule
     */
    constructor(_delegate, _ngModule) {
        this._delegate = _delegate;
        this._ngModule = _ngModule;
    }
    /**
     * @return {?}
     */
    get _injector() { return this._delegate.injector; }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleSync(moduleType) {
        return this._delegate.compileModuleSync(moduleType);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAsync(moduleType) {
        return this._delegate.compileModuleAsync(moduleType);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsSync(moduleType) {
        return this._delegate.compileModuleAndAllComponentsSync(moduleType);
    }
    /**
     * @template T
     * @param {?} moduleType
     * @return {?}
     */
    compileModuleAndAllComponentsAsync(moduleType) {
        return this._delegate.compileModuleAndAllComponentsAsync(moduleType);
    }
    /**
     * @param {?} component
     * @return {?}
     */
    getNgContentSelectors(component) {
        return this._delegate.getNgContentSelectors(component);
    }
    /**
     * Clears all caches
     * @return {?}
     */
    clearCache() { this._delegate.clearCache(); }
    /**
     * Clears the cache for the given component/ngModule.
     * @param {?} type
     * @return {?}
     */
    clearCacheFor(type) { this._delegate.clearCacheFor(type); }
}
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
function flattenSummaries(fn, out = []) {
    fn().forEach((entry) => {
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
    const /** @type {?} */ importExpr = (symbol) => ir.importExpr({ name: identifierName(symbol), moduleName: null, runtime: symbol });
    return { statements: [], genFilePath: '', importExpr };
}
//# sourceMappingURL=compiler.js.map