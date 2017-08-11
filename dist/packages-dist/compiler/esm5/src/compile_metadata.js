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
import { ChangeDetectionStrategy, ViewEncapsulation, ɵstringify as stringify } from '@angular/core';
import { StaticSymbol } from './aot/static_symbol';
import { CssSelector } from './selector';
import { splitAtColon } from './util';
// group 0: "[prop] or (event) or @trigger"
// group 1: "prop" from "[prop]"
// group 2: "event" from "(event)"
// group 3: "@trigger" from "@trigger"
var /** @type {?} */ HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/;
var CompileAnimationEntryMetadata = (function () {
    /**
     * @param {?=} name
     * @param {?=} definitions
     */
    function CompileAnimationEntryMetadata(name, definitions) {
        if (name === void 0) { name = null; }
        if (definitions === void 0) { definitions = null; }
        this.name = name;
        this.definitions = definitions;
    }
    return CompileAnimationEntryMetadata;
}());
export { CompileAnimationEntryMetadata };
function CompileAnimationEntryMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationEntryMetadata.prototype.name;
    /** @type {?} */
    CompileAnimationEntryMetadata.prototype.definitions;
}
/**
 * @abstract
 */
var CompileAnimationStateMetadata = (function () {
    function CompileAnimationStateMetadata() {
    }
    return CompileAnimationStateMetadata;
}());
export { CompileAnimationStateMetadata };
var CompileAnimationStateDeclarationMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationStateDeclarationMetadata, _super);
    /**
     * @param {?} stateNameExpr
     * @param {?} styles
     */
    function CompileAnimationStateDeclarationMetadata(stateNameExpr, styles) {
        var _this = _super.call(this) || this;
        _this.stateNameExpr = stateNameExpr;
        _this.styles = styles;
        return _this;
    }
    return CompileAnimationStateDeclarationMetadata;
}(CompileAnimationStateMetadata));
export { CompileAnimationStateDeclarationMetadata };
function CompileAnimationStateDeclarationMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationStateDeclarationMetadata.prototype.stateNameExpr;
    /** @type {?} */
    CompileAnimationStateDeclarationMetadata.prototype.styles;
}
var CompileAnimationStateTransitionMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationStateTransitionMetadata, _super);
    /**
     * @param {?} stateChangeExpr
     * @param {?} steps
     */
    function CompileAnimationStateTransitionMetadata(stateChangeExpr, steps) {
        var _this = _super.call(this) || this;
        _this.stateChangeExpr = stateChangeExpr;
        _this.steps = steps;
        return _this;
    }
    return CompileAnimationStateTransitionMetadata;
}(CompileAnimationStateMetadata));
export { CompileAnimationStateTransitionMetadata };
function CompileAnimationStateTransitionMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationStateTransitionMetadata.prototype.stateChangeExpr;
    /** @type {?} */
    CompileAnimationStateTransitionMetadata.prototype.steps;
}
/**
 * @abstract
 */
var CompileAnimationMetadata = (function () {
    function CompileAnimationMetadata() {
    }
    return CompileAnimationMetadata;
}());
export { CompileAnimationMetadata };
var CompileAnimationKeyframesSequenceMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationKeyframesSequenceMetadata, _super);
    /**
     * @param {?=} steps
     */
    function CompileAnimationKeyframesSequenceMetadata(steps) {
        if (steps === void 0) { steps = []; }
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    return CompileAnimationKeyframesSequenceMetadata;
}(CompileAnimationMetadata));
export { CompileAnimationKeyframesSequenceMetadata };
function CompileAnimationKeyframesSequenceMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationKeyframesSequenceMetadata.prototype.steps;
}
var CompileAnimationStyleMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationStyleMetadata, _super);
    /**
     * @param {?} offset
     * @param {?=} styles
     */
    function CompileAnimationStyleMetadata(offset, styles) {
        if (styles === void 0) { styles = null; }
        var _this = _super.call(this) || this;
        _this.offset = offset;
        _this.styles = styles;
        return _this;
    }
    return CompileAnimationStyleMetadata;
}(CompileAnimationMetadata));
export { CompileAnimationStyleMetadata };
function CompileAnimationStyleMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationStyleMetadata.prototype.offset;
    /** @type {?} */
    CompileAnimationStyleMetadata.prototype.styles;
}
var CompileAnimationAnimateMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationAnimateMetadata, _super);
    /**
     * @param {?=} timings
     * @param {?=} styles
     */
    function CompileAnimationAnimateMetadata(timings, styles) {
        if (timings === void 0) { timings = 0; }
        if (styles === void 0) { styles = null; }
        var _this = _super.call(this) || this;
        _this.timings = timings;
        _this.styles = styles;
        return _this;
    }
    return CompileAnimationAnimateMetadata;
}(CompileAnimationMetadata));
export { CompileAnimationAnimateMetadata };
function CompileAnimationAnimateMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationAnimateMetadata.prototype.timings;
    /** @type {?} */
    CompileAnimationAnimateMetadata.prototype.styles;
}
/**
 * @abstract
 */
var CompileAnimationWithStepsMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationWithStepsMetadata, _super);
    /**
     * @param {?=} steps
     */
    function CompileAnimationWithStepsMetadata(steps) {
        if (steps === void 0) { steps = null; }
        var _this = _super.call(this) || this;
        _this.steps = steps;
        return _this;
    }
    return CompileAnimationWithStepsMetadata;
}(CompileAnimationMetadata));
export { CompileAnimationWithStepsMetadata };
function CompileAnimationWithStepsMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileAnimationWithStepsMetadata.prototype.steps;
}
var CompileAnimationSequenceMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationSequenceMetadata, _super);
    /**
     * @param {?=} steps
     */
    function CompileAnimationSequenceMetadata(steps) {
        if (steps === void 0) { steps = null; }
        return _super.call(this, steps) || this;
    }
    return CompileAnimationSequenceMetadata;
}(CompileAnimationWithStepsMetadata));
export { CompileAnimationSequenceMetadata };
var CompileAnimationGroupMetadata = (function (_super) {
    tslib_1.__extends(CompileAnimationGroupMetadata, _super);
    /**
     * @param {?=} steps
     */
    function CompileAnimationGroupMetadata(steps) {
        if (steps === void 0) { steps = null; }
        return _super.call(this, steps) || this;
    }
    return CompileAnimationGroupMetadata;
}(CompileAnimationWithStepsMetadata));
export { CompileAnimationGroupMetadata };
/**
 * @param {?} name
 * @return {?}
 */
function _sanitizeIdentifier(name) {
    return name.replace(/\W/g, '_');
}
var /** @type {?} */ _anonymousTypeIndex = 0;
/**
 * @param {?} compileIdentifier
 * @return {?}
 */
export function identifierName(compileIdentifier) {
    if (!compileIdentifier || !compileIdentifier.reference) {
        return null;
    }
    var /** @type {?} */ ref = compileIdentifier.reference;
    if (ref instanceof StaticSymbol) {
        return ref.name;
    }
    if (ref['__anonymousType']) {
        return ref['__anonymousType'];
    }
    var /** @type {?} */ identifier = stringify(ref);
    if (identifier.indexOf('(') >= 0) {
        // case: anonymous functions!
        identifier = "anonymous_" + _anonymousTypeIndex++;
        ref['__anonymousType'] = identifier;
    }
    else {
        identifier = _sanitizeIdentifier(identifier);
    }
    return identifier;
}
/**
 * @param {?} compileIdentifier
 * @return {?}
 */
export function identifierModuleUrl(compileIdentifier) {
    var /** @type {?} */ ref = compileIdentifier.reference;
    if (ref instanceof StaticSymbol) {
        return ref.filePath;
    }
    // Runtime type
    return "./" + stringify(ref);
}
/**
 * @param {?} compType
 * @param {?} embeddedTemplateIndex
 * @return {?}
 */
export function viewClassName(compType, embeddedTemplateIndex) {
    return "View_" + identifierName({ reference: compType }) + "_" + embeddedTemplateIndex;
}
/**
 * @param {?} compType
 * @return {?}
 */
export function rendererTypeName(compType) {
    return "RenderType_" + identifierName({ reference: compType });
}
/**
 * @param {?} compType
 * @return {?}
 */
export function hostViewClassName(compType) {
    return "HostView_" + identifierName({ reference: compType });
}
/**
 * @param {?} compType
 * @return {?}
 */
export function componentFactoryName(compType) {
    return identifierName({ reference: compType }) + "NgFactory";
}
/**
 * @record
 */
export function ProxyClass() { }
function ProxyClass_tsickle_Closure_declarations() {
    /** @type {?} */
    ProxyClass.prototype.setDelegate;
}
/**
 * @record
 */
export function CompileIdentifierMetadata() { }
function CompileIdentifierMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileIdentifierMetadata.prototype.reference;
}
export var CompileSummaryKind = {};
CompileSummaryKind.Pipe = 0;
CompileSummaryKind.Directive = 1;
CompileSummaryKind.NgModule = 2;
CompileSummaryKind.Injectable = 3;
CompileSummaryKind[CompileSummaryKind.Pipe] = "Pipe";
CompileSummaryKind[CompileSummaryKind.Directive] = "Directive";
CompileSummaryKind[CompileSummaryKind.NgModule] = "NgModule";
CompileSummaryKind[CompileSummaryKind.Injectable] = "Injectable";
/**
 * A CompileSummary is the data needed to use a directive / pipe / module
 * in other modules / components. However, this data is not enough to compile
 * the directive / module itself.
 * @record
 */
export function CompileTypeSummary() { }
function CompileTypeSummary_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileTypeSummary.prototype.summaryKind;
    /** @type {?} */
    CompileTypeSummary.prototype.type;
}
/**
 * @record
 */
export function CompileDiDependencyMetadata() { }
function CompileDiDependencyMetadata_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isAttribute;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isSelf;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isHost;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isSkipSelf;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isOptional;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.isValue;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.token;
    /** @type {?|undefined} */
    CompileDiDependencyMetadata.prototype.value;
}
/**
 * @record
 */
export function CompileProviderMetadata() { }
function CompileProviderMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileProviderMetadata.prototype.token;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.useClass;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.useValue;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.useExisting;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.useFactory;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.deps;
    /** @type {?|undefined} */
    CompileProviderMetadata.prototype.multi;
}
/**
 * @record
 */
export function CompileFactoryMetadata() { }
function CompileFactoryMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileFactoryMetadata.prototype.diDeps;
    /** @type {?} */
    CompileFactoryMetadata.prototype.reference;
}
/**
 * @param {?} token
 * @return {?}
 */
export function tokenName(token) {
    return token.value != null ? _sanitizeIdentifier(token.value) : identifierName(token.identifier);
}
/**
 * @param {?} token
 * @return {?}
 */
export function tokenReference(token) {
    if (token.identifier != null) {
        return token.identifier.reference;
    }
    else {
        return token.value;
    }
}
/**
 * @record
 */
export function CompileTokenMetadata() { }
function CompileTokenMetadata_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    CompileTokenMetadata.prototype.value;
    /** @type {?|undefined} */
    CompileTokenMetadata.prototype.identifier;
}
/**
 * Metadata regarding compilation of a type.
 * @record
 */
export function CompileTypeMetadata() { }
function CompileTypeMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileTypeMetadata.prototype.diDeps;
    /** @type {?} */
    CompileTypeMetadata.prototype.lifecycleHooks;
    /** @type {?} */
    CompileTypeMetadata.prototype.reference;
}
/**
 * @record
 */
export function CompileQueryMetadata() { }
function CompileQueryMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileQueryMetadata.prototype.selectors;
    /** @type {?} */
    CompileQueryMetadata.prototype.descendants;
    /** @type {?} */
    CompileQueryMetadata.prototype.first;
    /** @type {?} */
    CompileQueryMetadata.prototype.propertyName;
    /** @type {?} */
    CompileQueryMetadata.prototype.read;
}
/**
 * Metadata about a stylesheet
 */
var CompileStylesheetMetadata = (function () {
    /**
     * @param {?=} __0
     */
    function CompileStylesheetMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, moduleUrl = _b.moduleUrl, styles = _b.styles, styleUrls = _b.styleUrls;
        this.moduleUrl = moduleUrl || null;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
    }
    return CompileStylesheetMetadata;
}());
export { CompileStylesheetMetadata };
function CompileStylesheetMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileStylesheetMetadata.prototype.moduleUrl;
    /** @type {?} */
    CompileStylesheetMetadata.prototype.styles;
    /** @type {?} */
    CompileStylesheetMetadata.prototype.styleUrls;
}
/**
 * Summary Metadata regarding compilation of a template.
 * @record
 */
export function CompileTemplateSummary() { }
function CompileTemplateSummary_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileTemplateSummary.prototype.animations;
    /** @type {?} */
    CompileTemplateSummary.prototype.ngContentSelectors;
    /** @type {?} */
    CompileTemplateSummary.prototype.encapsulation;
}
/**
 * Metadata regarding compilation of a template.
 */
var CompileTemplateMetadata = (function () {
    /**
     * @param {?} __0
     */
    function CompileTemplateMetadata(_a) {
        var encapsulation = _a.encapsulation, template = _a.template, templateUrl = _a.templateUrl, styles = _a.styles, styleUrls = _a.styleUrls, externalStylesheets = _a.externalStylesheets, animations = _a.animations, ngContentSelectors = _a.ngContentSelectors, interpolation = _a.interpolation, isInline = _a.isInline;
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = animations ? flatten(animations) : [];
        this.ngContentSelectors = ngContentSelectors || [];
        if (interpolation && interpolation.length != 2) {
            throw new Error("'interpolation' should have a start and an end symbol.");
        }
        this.interpolation = interpolation;
        this.isInline = isInline;
    }
    /**
     * @return {?}
     */
    CompileTemplateMetadata.prototype.toSummary = function () {
        return {
            animations: this.animations.map(function (anim) { return anim.name; }),
            ngContentSelectors: this.ngContentSelectors,
            encapsulation: this.encapsulation,
        };
    };
    return CompileTemplateMetadata;
}());
export { CompileTemplateMetadata };
function CompileTemplateMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileTemplateMetadata.prototype.encapsulation;
    /** @type {?} */
    CompileTemplateMetadata.prototype.template;
    /** @type {?} */
    CompileTemplateMetadata.prototype.templateUrl;
    /** @type {?} */
    CompileTemplateMetadata.prototype.isInline;
    /** @type {?} */
    CompileTemplateMetadata.prototype.styles;
    /** @type {?} */
    CompileTemplateMetadata.prototype.styleUrls;
    /** @type {?} */
    CompileTemplateMetadata.prototype.externalStylesheets;
    /** @type {?} */
    CompileTemplateMetadata.prototype.animations;
    /** @type {?} */
    CompileTemplateMetadata.prototype.ngContentSelectors;
    /** @type {?} */
    CompileTemplateMetadata.prototype.interpolation;
}
/**
 * @record
 */
export function CompileEntryComponentMetadata() { }
function CompileEntryComponentMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileEntryComponentMetadata.prototype.componentType;
    /** @type {?} */
    CompileEntryComponentMetadata.prototype.componentFactory;
}
/**
 * @record
 */
export function CompileDirectiveSummary() { }
function CompileDirectiveSummary_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileDirectiveSummary.prototype.type;
    /** @type {?} */
    CompileDirectiveSummary.prototype.isComponent;
    /** @type {?} */
    CompileDirectiveSummary.prototype.selector;
    /** @type {?} */
    CompileDirectiveSummary.prototype.exportAs;
    /** @type {?} */
    CompileDirectiveSummary.prototype.inputs;
    /** @type {?} */
    CompileDirectiveSummary.prototype.outputs;
    /** @type {?} */
    CompileDirectiveSummary.prototype.hostListeners;
    /** @type {?} */
    CompileDirectiveSummary.prototype.hostProperties;
    /** @type {?} */
    CompileDirectiveSummary.prototype.hostAttributes;
    /** @type {?} */
    CompileDirectiveSummary.prototype.providers;
    /** @type {?} */
    CompileDirectiveSummary.prototype.viewProviders;
    /** @type {?} */
    CompileDirectiveSummary.prototype.queries;
    /** @type {?} */
    CompileDirectiveSummary.prototype.viewQueries;
    /** @type {?} */
    CompileDirectiveSummary.prototype.entryComponents;
    /** @type {?} */
    CompileDirectiveSummary.prototype.changeDetection;
    /** @type {?} */
    CompileDirectiveSummary.prototype.template;
    /** @type {?} */
    CompileDirectiveSummary.prototype.componentViewType;
    /** @type {?} */
    CompileDirectiveSummary.prototype.rendererType;
    /** @type {?} */
    CompileDirectiveSummary.prototype.componentFactory;
}
/**
 * Metadata regarding compilation of a directive.
 */
var CompileDirectiveMetadata = (function () {
    /**
     * @param {?} __0
     */
    function CompileDirectiveMetadata(_a) {
        var isHost = _a.isHost, type = _a.type, isComponent = _a.isComponent, selector = _a.selector, exportAs = _a.exportAs, changeDetection = _a.changeDetection, inputs = _a.inputs, outputs = _a.outputs, hostListeners = _a.hostListeners, hostProperties = _a.hostProperties, hostAttributes = _a.hostAttributes, providers = _a.providers, viewProviders = _a.viewProviders, queries = _a.queries, viewQueries = _a.viewQueries, entryComponents = _a.entryComponents, template = _a.template, componentViewType = _a.componentViewType, rendererType = _a.rendererType, componentFactory = _a.componentFactory;
        this.isHost = !!isHost;
        this.type = type;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.viewQueries = _normalizeArray(viewQueries);
        this.entryComponents = _normalizeArray(entryComponents);
        this.template = template;
        this.componentViewType = componentViewType;
        this.rendererType = rendererType;
        this.componentFactory = componentFactory;
    }
    /**
     * @param {?} __0
     * @return {?}
     */
    CompileDirectiveMetadata.create = function (_a) {
        var isHost = _a.isHost, type = _a.type, isComponent = _a.isComponent, selector = _a.selector, exportAs = _a.exportAs, changeDetection = _a.changeDetection, inputs = _a.inputs, outputs = _a.outputs, host = _a.host, providers = _a.providers, viewProviders = _a.viewProviders, queries = _a.queries, viewQueries = _a.viewQueries, entryComponents = _a.entryComponents, template = _a.template, componentViewType = _a.componentViewType, rendererType = _a.rendererType, componentFactory = _a.componentFactory;
        var /** @type {?} */ hostListeners = {};
        var /** @type {?} */ hostProperties = {};
        var /** @type {?} */ hostAttributes = {};
        if (host != null) {
            Object.keys(host).forEach(function (key) {
                var /** @type {?} */ value = host[key];
                var /** @type {?} */ matches = key.match(HOST_REG_EXP);
                if (matches === null) {
                    hostAttributes[key] = value;
                }
                else if (matches[1] != null) {
                    hostProperties[matches[1]] = value;
                }
                else if (matches[2] != null) {
                    hostListeners[matches[2]] = value;
                }
            });
        }
        var /** @type {?} */ inputsMap = {};
        if (inputs != null) {
            inputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var /** @type {?} */ parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var /** @type {?} */ outputsMap = {};
        if (outputs != null) {
            outputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var /** @type {?} */ parts = splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            isHost: isHost,
            type: type,
            isComponent: !!isComponent, selector: selector, exportAs: exportAs, changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap,
            hostListeners: hostListeners,
            hostProperties: hostProperties,
            hostAttributes: hostAttributes,
            providers: providers,
            viewProviders: viewProviders,
            queries: queries,
            viewQueries: viewQueries,
            entryComponents: entryComponents,
            template: template,
            componentViewType: componentViewType,
            rendererType: rendererType,
            componentFactory: componentFactory,
        });
    };
    /**
     * @return {?}
     */
    CompileDirectiveMetadata.prototype.toSummary = function () {
        return {
            summaryKind: CompileSummaryKind.Directive,
            type: this.type,
            isComponent: this.isComponent,
            selector: this.selector,
            exportAs: this.exportAs,
            inputs: this.inputs,
            outputs: this.outputs,
            hostListeners: this.hostListeners,
            hostProperties: this.hostProperties,
            hostAttributes: this.hostAttributes,
            providers: this.providers,
            viewProviders: this.viewProviders,
            queries: this.queries,
            viewQueries: this.viewQueries,
            entryComponents: this.entryComponents,
            changeDetection: this.changeDetection,
            template: this.template && this.template.toSummary(),
            componentViewType: this.componentViewType,
            rendererType: this.rendererType,
            componentFactory: this.componentFactory
        };
    };
    return CompileDirectiveMetadata;
}());
export { CompileDirectiveMetadata };
function CompileDirectiveMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileDirectiveMetadata.prototype.isHost;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.type;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.isComponent;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.selector;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.exportAs;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.changeDetection;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.inputs;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.outputs;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.hostListeners;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.hostProperties;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.hostAttributes;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.providers;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.viewProviders;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.queries;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.viewQueries;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.entryComponents;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.template;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.componentViewType;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.rendererType;
    /** @type {?} */
    CompileDirectiveMetadata.prototype.componentFactory;
}
/**
 * Construct {\@link CompileDirectiveMetadata} from {\@link ComponentTypeMetadata} and a selector.
 * @param {?} hostTypeReference
 * @param {?} compMeta
 * @param {?} hostViewType
 * @return {?}
 */
export function createHostComponentMeta(hostTypeReference, compMeta, hostViewType) {
    var /** @type {?} */ template = CssSelector.parse(/** @type {?} */ ((compMeta.selector)))[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        isHost: true,
        type: { reference: hostTypeReference, diDeps: [], lifecycleHooks: [] },
        template: new CompileTemplateMetadata({
            encapsulation: ViewEncapsulation.None,
            template: template,
            templateUrl: '',
            styles: [],
            styleUrls: [],
            ngContentSelectors: [],
            animations: [],
            isInline: true,
            externalStylesheets: [],
            interpolation: null
        }),
        exportAs: null,
        changeDetection: ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        isComponent: true,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: [],
        componentViewType: hostViewType,
        rendererType: { id: '__Host__', encapsulation: ViewEncapsulation.None, styles: [], data: {} },
        entryComponents: [],
        componentFactory: null
    });
}
/**
 * @record
 */
export function CompilePipeSummary() { }
function CompilePipeSummary_tsickle_Closure_declarations() {
    /** @type {?} */
    CompilePipeSummary.prototype.type;
    /** @type {?} */
    CompilePipeSummary.prototype.name;
    /** @type {?} */
    CompilePipeSummary.prototype.pure;
}
var CompilePipeMetadata = (function () {
    /**
     * @param {?} __0
     */
    function CompilePipeMetadata(_a) {
        var type = _a.type, name = _a.name, pure = _a.pure;
        this.type = type;
        this.name = name;
        this.pure = !!pure;
    }
    /**
     * @return {?}
     */
    CompilePipeMetadata.prototype.toSummary = function () {
        return {
            summaryKind: CompileSummaryKind.Pipe,
            type: this.type,
            name: this.name,
            pure: this.pure
        };
    };
    return CompilePipeMetadata;
}());
export { CompilePipeMetadata };
function CompilePipeMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompilePipeMetadata.prototype.type;
    /** @type {?} */
    CompilePipeMetadata.prototype.name;
    /** @type {?} */
    CompilePipeMetadata.prototype.pure;
}
/**
 * @record
 */
export function CompileNgModuleSummary() { }
function CompileNgModuleSummary_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileNgModuleSummary.prototype.type;
    /** @type {?} */
    CompileNgModuleSummary.prototype.exportedDirectives;
    /** @type {?} */
    CompileNgModuleSummary.prototype.exportedPipes;
    /** @type {?} */
    CompileNgModuleSummary.prototype.entryComponents;
    /** @type {?} */
    CompileNgModuleSummary.prototype.providers;
    /** @type {?} */
    CompileNgModuleSummary.prototype.modules;
}
/**
 * Metadata regarding compilation of a module.
 */
var CompileNgModuleMetadata = (function () {
    /**
     * @param {?} __0
     */
    function CompileNgModuleMetadata(_a) {
        var type = _a.type, providers = _a.providers, declaredDirectives = _a.declaredDirectives, exportedDirectives = _a.exportedDirectives, declaredPipes = _a.declaredPipes, exportedPipes = _a.exportedPipes, entryComponents = _a.entryComponents, bootstrapComponents = _a.bootstrapComponents, importedModules = _a.importedModules, exportedModules = _a.exportedModules, schemas = _a.schemas, transitiveModule = _a.transitiveModule, id = _a.id;
        this.type = type || null;
        this.declaredDirectives = _normalizeArray(declaredDirectives);
        this.exportedDirectives = _normalizeArray(exportedDirectives);
        this.declaredPipes = _normalizeArray(declaredPipes);
        this.exportedPipes = _normalizeArray(exportedPipes);
        this.providers = _normalizeArray(providers);
        this.entryComponents = _normalizeArray(entryComponents);
        this.bootstrapComponents = _normalizeArray(bootstrapComponents);
        this.importedModules = _normalizeArray(importedModules);
        this.exportedModules = _normalizeArray(exportedModules);
        this.schemas = _normalizeArray(schemas);
        this.id = id || null;
        this.transitiveModule = transitiveModule || null;
    }
    /**
     * @return {?}
     */
    CompileNgModuleMetadata.prototype.toSummary = function () {
        var /** @type {?} */ module = ((this.transitiveModule));
        return {
            summaryKind: CompileSummaryKind.NgModule,
            type: this.type,
            entryComponents: module.entryComponents,
            providers: module.providers,
            modules: module.modules,
            exportedDirectives: module.exportedDirectives,
            exportedPipes: module.exportedPipes
        };
    };
    return CompileNgModuleMetadata;
}());
export { CompileNgModuleMetadata };
function CompileNgModuleMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    CompileNgModuleMetadata.prototype.type;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.declaredDirectives;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.exportedDirectives;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.declaredPipes;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.exportedPipes;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.entryComponents;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.bootstrapComponents;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.providers;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.importedModules;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.exportedModules;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.schemas;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.id;
    /** @type {?} */
    CompileNgModuleMetadata.prototype.transitiveModule;
}
var TransitiveCompileNgModuleMetadata = (function () {
    function TransitiveCompileNgModuleMetadata() {
        this.directivesSet = new Set();
        this.directives = [];
        this.exportedDirectivesSet = new Set();
        this.exportedDirectives = [];
        this.pipesSet = new Set();
        this.pipes = [];
        this.exportedPipesSet = new Set();
        this.exportedPipes = [];
        this.modulesSet = new Set();
        this.modules = [];
        this.entryComponentsSet = new Set();
        this.entryComponents = [];
        this.providers = [];
    }
    /**
     * @param {?} provider
     * @param {?} module
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addProvider = function (provider, module) {
        this.providers.push({ provider: provider, module: module });
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addDirective = function (id) {
        if (!this.directivesSet.has(id.reference)) {
            this.directivesSet.add(id.reference);
            this.directives.push(id);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addExportedDirective = function (id) {
        if (!this.exportedDirectivesSet.has(id.reference)) {
            this.exportedDirectivesSet.add(id.reference);
            this.exportedDirectives.push(id);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addPipe = function (id) {
        if (!this.pipesSet.has(id.reference)) {
            this.pipesSet.add(id.reference);
            this.pipes.push(id);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addExportedPipe = function (id) {
        if (!this.exportedPipesSet.has(id.reference)) {
            this.exportedPipesSet.add(id.reference);
            this.exportedPipes.push(id);
        }
    };
    /**
     * @param {?} id
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addModule = function (id) {
        if (!this.modulesSet.has(id.reference)) {
            this.modulesSet.add(id.reference);
            this.modules.push(id);
        }
    };
    /**
     * @param {?} ec
     * @return {?}
     */
    TransitiveCompileNgModuleMetadata.prototype.addEntryComponent = function (ec) {
        if (!this.entryComponentsSet.has(ec.componentType)) {
            this.entryComponentsSet.add(ec.componentType);
            this.entryComponents.push(ec);
        }
    };
    return TransitiveCompileNgModuleMetadata;
}());
export { TransitiveCompileNgModuleMetadata };
function TransitiveCompileNgModuleMetadata_tsickle_Closure_declarations() {
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.directivesSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.directives;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.exportedDirectivesSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.exportedDirectives;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.pipesSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.pipes;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.exportedPipesSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.exportedPipes;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.modulesSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.modules;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.entryComponentsSet;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.entryComponents;
    /** @type {?} */
    TransitiveCompileNgModuleMetadata.prototype.providers;
}
/**
 * @param {?} obj
 * @return {?}
 */
function _normalizeArray(obj) {
    return obj || [];
}
var ProviderMeta = (function () {
    /**
     * @param {?} token
     * @param {?} __1
     */
    function ProviderMeta(token, _a) {
        var useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass || null;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory || null;
        this.dependencies = deps || null;
        this.multi = !!multi;
    }
    return ProviderMeta;
}());
export { ProviderMeta };
function ProviderMeta_tsickle_Closure_declarations() {
    /** @type {?} */
    ProviderMeta.prototype.token;
    /** @type {?} */
    ProviderMeta.prototype.useClass;
    /** @type {?} */
    ProviderMeta.prototype.useValue;
    /** @type {?} */
    ProviderMeta.prototype.useExisting;
    /** @type {?} */
    ProviderMeta.prototype.useFactory;
    /** @type {?} */
    ProviderMeta.prototype.dependencies;
    /** @type {?} */
    ProviderMeta.prototype.multi;
}
/**
 * @template T
 * @param {?} list
 * @return {?}
 */
export function flatten(list) {
    return list.reduce(function (flat, item) {
        var /** @type {?} */ flatItem = Array.isArray(item) ? flatten(item) : item;
        return ((flat)).concat(flatItem);
    }, []);
}
/**
 * @param {?} url
 * @return {?}
 */
export function sourceUrl(url) {
    // Note: We need 3 "/" so that ng shows up as a separate domain
    // in the chrome dev tools.
    return url.replace(/(\w+:\/\/[\w:-]+)?(\/+)?/, 'ng:///');
}
/**
 * @param {?} ngModuleType
 * @param {?} compMeta
 * @param {?} templateMeta
 * @return {?}
 */
export function templateSourceUrl(ngModuleType, compMeta, templateMeta) {
    var /** @type {?} */ url;
    if (templateMeta.isInline) {
        if (compMeta.type.reference instanceof StaticSymbol) {
            // Note: a .ts file might contain multiple components with inline templates,
            // so we need to give them unique urls, as these will be used for sourcemaps.
            url = compMeta.type.reference.filePath + "." + compMeta.type.reference.name + ".html";
        }
        else {
            url = identifierName(ngModuleType) + "/" + identifierName(compMeta.type) + ".html";
        }
    }
    else {
        url = ((templateMeta.templateUrl));
    }
    // always prepend ng:// to make angular resources easy to find and not clobber
    // user resources.
    return sourceUrl(url);
}
/**
 * @param {?} meta
 * @param {?} id
 * @return {?}
 */
export function sharedStylesheetJitUrl(meta, id) {
    var /** @type {?} */ pathParts = ((meta.moduleUrl)).split(/\/\\/g);
    var /** @type {?} */ baseName = pathParts[pathParts.length - 1];
    return sourceUrl("css/" + id + baseName + ".ngstyle.js");
}
/**
 * @param {?} moduleMeta
 * @return {?}
 */
export function ngModuleJitUrl(moduleMeta) {
    return sourceUrl(identifierName(moduleMeta.type) + "/module.ngfactory.js");
}
/**
 * @param {?} ngModuleType
 * @param {?} compMeta
 * @return {?}
 */
export function templateJitUrl(ngModuleType, compMeta) {
    return sourceUrl(identifierName(ngModuleType) + "/" + identifierName(compMeta.type) + ".ngfactory.js");
}
//# sourceMappingURL=compile_metadata.js.map