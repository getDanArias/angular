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
import { Attribute, Component, ContentChild, ContentChildren, Directive, Host, HostBinding, HostListener, Inject, Injectable, Input, NgModule, Optional, Output, Pipe, Self, SkipSelf, ViewChild, ViewChildren, animate, group, keyframes, sequence, state, style, transition, trigger } from '@angular/core';
import { CompileSummaryKind } from '../compile_metadata';
import { syntaxError } from '../util';
import { StaticSymbol } from './static_symbol';
var /** @type {?} */ ANGULAR_CORE = '@angular/core';
var /** @type {?} */ ANGULAR_ROUTER = '@angular/router';
var /** @type {?} */ HIDDEN_KEY = /^\$.*\$$/;
var /** @type {?} */ IGNORE = {
    __symbolic: 'ignore'
};
var /** @type {?} */ USE_VALUE = 'useValue';
var /** @type {?} */ PROVIDE = 'provide';
var /** @type {?} */ REFERENCE_SET = new Set([USE_VALUE, 'useFactory', 'data']);
/**
 * @param {?} value
 * @return {?}
 */
function shouldIgnore(value) {
    return value && value.__symbolic == 'ignore';
}
/**
 * A static reflector implements enough of the Reflector API that is necessary to compile
 * templates statically.
 */
var StaticReflector = (function () {
    /**
     * @param {?} summaryResolver
     * @param {?} symbolResolver
     * @param {?=} knownMetadataClasses
     * @param {?=} knownMetadataFunctions
     * @param {?=} errorRecorder
     */
    function StaticReflector(summaryResolver, symbolResolver, knownMetadataClasses, knownMetadataFunctions, errorRecorder) {
        if (knownMetadataClasses === void 0) { knownMetadataClasses = []; }
        if (knownMetadataFunctions === void 0) { knownMetadataFunctions = []; }
        var _this = this;
        this.summaryResolver = summaryResolver;
        this.symbolResolver = symbolResolver;
        this.errorRecorder = errorRecorder;
        this.annotationCache = new Map();
        this.propertyCache = new Map();
        this.parameterCache = new Map();
        this.methodCache = new Map();
        this.conversionMap = new Map();
        this.annotationForParentClassWithSummaryKind = new Map();
        this.annotationNames = new Map();
        this.initializeConversionMap();
        knownMetadataClasses.forEach(function (kc) { return _this._registerDecoratorOrConstructor(_this.getStaticSymbol(kc.filePath, kc.name), kc.ctor); });
        knownMetadataFunctions.forEach(function (kf) { return _this._registerFunction(_this.getStaticSymbol(kf.filePath, kf.name), kf.fn); });
        this.annotationForParentClassWithSummaryKind.set(CompileSummaryKind.Directive, [Directive, Component]);
        this.annotationForParentClassWithSummaryKind.set(CompileSummaryKind.Pipe, [Pipe]);
        this.annotationForParentClassWithSummaryKind.set(CompileSummaryKind.NgModule, [NgModule]);
        this.annotationForParentClassWithSummaryKind.set(CompileSummaryKind.Injectable, [Injectable, Pipe, Directive, Component, NgModule]);
        this.annotationNames.set(Directive, 'Directive');
        this.annotationNames.set(Component, 'Component');
        this.annotationNames.set(Pipe, 'Pipe');
        this.annotationNames.set(NgModule, 'NgModule');
        this.annotationNames.set(Injectable, 'Injectable');
    }
    /**
     * @param {?} typeOrFunc
     * @return {?}
     */
    StaticReflector.prototype.componentModuleUrl = function (typeOrFunc) {
        var /** @type {?} */ staticSymbol = this.findSymbolDeclaration(typeOrFunc);
        return this.symbolResolver.getResourcePath(staticSymbol);
    };
    /**
     * @param {?} ref
     * @return {?}
     */
    StaticReflector.prototype.resolveExternalReference = function (ref) {
        var /** @type {?} */ importSymbol = this.getStaticSymbol(/** @type {?} */ ((ref.moduleName)), /** @type {?} */ ((ref.name)));
        var /** @type {?} */ rootSymbol = this.findDeclaration(/** @type {?} */ ((ref.moduleName)), /** @type {?} */ ((ref.name)));
        if (importSymbol != rootSymbol) {
            this.symbolResolver.recordImportAs(rootSymbol, importSymbol);
        }
        return rootSymbol;
    };
    /**
     * @param {?} moduleUrl
     * @param {?} name
     * @param {?=} containingFile
     * @return {?}
     */
    StaticReflector.prototype.findDeclaration = function (moduleUrl, name, containingFile) {
        return this.findSymbolDeclaration(this.symbolResolver.getSymbolByModule(moduleUrl, name, containingFile));
    };
    /**
     * @param {?} moduleUrl
     * @param {?} name
     * @return {?}
     */
    StaticReflector.prototype.tryFindDeclaration = function (moduleUrl, name) {
        var _this = this;
        return this.symbolResolver.ignoreErrorsFor(function () { return _this.findDeclaration(moduleUrl, name); });
    };
    /**
     * @param {?} symbol
     * @return {?}
     */
    StaticReflector.prototype.findSymbolDeclaration = function (symbol) {
        var /** @type {?} */ resolvedSymbol = this.symbolResolver.resolveSymbol(symbol);
        if (resolvedSymbol && resolvedSymbol.metadata instanceof StaticSymbol) {
            return this.findSymbolDeclaration(resolvedSymbol.metadata);
        }
        else {
            return symbol;
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    StaticReflector.prototype.annotations = function (type) {
        var _this = this;
        var /** @type {?} */ annotations = this.annotationCache.get(type);
        if (!annotations) {
            annotations = [];
            var /** @type {?} */ classMetadata = this.getTypeMetadata(type);
            var /** @type {?} */ parentType = this.findParentType(type, classMetadata);
            if (parentType) {
                var /** @type {?} */ parentAnnotations = this.annotations(parentType);
                annotations.push.apply(annotations, parentAnnotations);
            }
            var /** @type {?} */ ownAnnotations_1 = [];
            if (classMetadata['decorators']) {
                ownAnnotations_1 = this.simplify(type, classMetadata['decorators']);
                annotations.push.apply(annotations, ownAnnotations_1);
            }
            if (parentType && !this.summaryResolver.isLibraryFile(type.filePath) &&
                this.summaryResolver.isLibraryFile(parentType.filePath)) {
                var /** @type {?} */ summary = this.summaryResolver.resolveSummary(parentType);
                if (summary && summary.type) {
                    var /** @type {?} */ requiredAnnotationTypes = ((this.annotationForParentClassWithSummaryKind.get(/** @type {?} */ ((summary.type.summaryKind)))));
                    var /** @type {?} */ typeHasRequiredAnnotation = requiredAnnotationTypes.some(function (requiredType) { return ownAnnotations_1.some(function (ann) { return ann instanceof requiredType; }); });
                    if (!typeHasRequiredAnnotation) {
                        this.reportError(syntaxError("Class " + type.name + " in " + type.filePath + " extends from a " + CompileSummaryKind[(((summary.type.summaryKind)))] + " in another compilation unit without duplicating the decorator. " +
                            ("Please add a " + requiredAnnotationTypes.map(function (type) { return _this.annotationNames.get(type); }).join(' or ') + " decorator to the class.")), type);
                    }
                }
            }
            this.annotationCache.set(type, annotations.filter(function (ann) { return !!ann; }));
        }
        return annotations;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    StaticReflector.prototype.propMetadata = function (type) {
        var _this = this;
        var /** @type {?} */ propMetadata = this.propertyCache.get(type);
        if (!propMetadata) {
            var /** @type {?} */ classMetadata = this.getTypeMetadata(type);
            propMetadata = {};
            var /** @type {?} */ parentType = this.findParentType(type, classMetadata);
            if (parentType) {
                var /** @type {?} */ parentPropMetadata_1 = this.propMetadata(parentType);
                Object.keys(parentPropMetadata_1).forEach(function (parentProp) {
                    ((propMetadata))[parentProp] = parentPropMetadata_1[parentProp];
                });
            }
            var /** @type {?} */ members_1 = classMetadata['members'] || {};
            Object.keys(members_1).forEach(function (propName) {
                var /** @type {?} */ propData = members_1[propName];
                var /** @type {?} */ prop = ((propData))
                    .find(function (a) { return a['__symbolic'] == 'property' || a['__symbolic'] == 'method'; });
                var /** @type {?} */ decorators = [];
                if (((propMetadata))[propName]) {
                    decorators.push.apply(decorators, /** @type {?} */ ((propMetadata))[propName]);
                } /** @type {?} */
                ((propMetadata))[propName] = decorators;
                if (prop && prop['decorators']) {
                    decorators.push.apply(decorators, _this.simplify(type, prop['decorators']));
                }
            });
            this.propertyCache.set(type, propMetadata);
        }
        return propMetadata;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    StaticReflector.prototype.parameters = function (type) {
        var _this = this;
        if (!(type instanceof StaticSymbol)) {
            this.reportError(new Error("parameters received " + JSON.stringify(type) + " which is not a StaticSymbol"), type);
            return [];
        }
        try {
            var /** @type {?} */ parameters_1 = this.parameterCache.get(type);
            if (!parameters_1) {
                var /** @type {?} */ classMetadata = this.getTypeMetadata(type);
                var /** @type {?} */ parentType = this.findParentType(type, classMetadata);
                var /** @type {?} */ members = classMetadata ? classMetadata['members'] : null;
                var /** @type {?} */ ctorData = members ? members['__ctor__'] : null;
                if (ctorData) {
                    var /** @type {?} */ ctor = ((ctorData)).find(function (a) { return a['__symbolic'] == 'constructor'; });
                    var /** @type {?} */ rawParameterTypes = (ctor['parameters']) || [];
                    var /** @type {?} */ parameterDecorators_1 = (this.simplify(type, ctor['parameterDecorators'] || []));
                    parameters_1 = [];
                    rawParameterTypes.forEach(function (rawParamType, index) {
                        var /** @type {?} */ nestedResult = [];
                        var /** @type {?} */ paramType = _this.trySimplify(type, rawParamType);
                        if (paramType)
                            nestedResult.push(paramType);
                        var /** @type {?} */ decorators = parameterDecorators_1 ? parameterDecorators_1[index] : null;
                        if (decorators) {
                            nestedResult.push.apply(nestedResult, decorators);
                        } /** @type {?} */
                        ((parameters_1)).push(nestedResult);
                    });
                }
                else if (parentType) {
                    parameters_1 = this.parameters(parentType);
                }
                if (!parameters_1) {
                    parameters_1 = [];
                }
                this.parameterCache.set(type, parameters_1);
            }
            return parameters_1;
        }
        catch (e) {
            console.error("Failed on type " + JSON.stringify(type) + " with error " + e);
            throw e;
        }
    };
    /**
     * @param {?} type
     * @return {?}
     */
    StaticReflector.prototype._methodNames = function (type) {
        var /** @type {?} */ methodNames = this.methodCache.get(type);
        if (!methodNames) {
            var /** @type {?} */ classMetadata = this.getTypeMetadata(type);
            methodNames = {};
            var /** @type {?} */ parentType = this.findParentType(type, classMetadata);
            if (parentType) {
                var /** @type {?} */ parentMethodNames_1 = this._methodNames(parentType);
                Object.keys(parentMethodNames_1).forEach(function (parentProp) {
                    ((methodNames))[parentProp] = parentMethodNames_1[parentProp];
                });
            }
            var /** @type {?} */ members_2 = classMetadata['members'] || {};
            Object.keys(members_2).forEach(function (propName) {
                var /** @type {?} */ propData = members_2[propName];
                var /** @type {?} */ isMethod = ((propData)).some(function (a) { return a['__symbolic'] == 'method'; }); /** @type {?} */
                ((methodNames))[propName] = ((methodNames))[propName] || isMethod;
            });
            this.methodCache.set(type, methodNames);
        }
        return methodNames;
    };
    /**
     * @param {?} type
     * @param {?} classMetadata
     * @return {?}
     */
    StaticReflector.prototype.findParentType = function (type, classMetadata) {
        var /** @type {?} */ parentType = this.trySimplify(type, classMetadata['extends']);
        if (parentType instanceof StaticSymbol) {
            return parentType;
        }
    };
    /**
     * @param {?} type
     * @param {?} lcProperty
     * @return {?}
     */
    StaticReflector.prototype.hasLifecycleHook = function (type, lcProperty) {
        if (!(type instanceof StaticSymbol)) {
            this.reportError(new Error("hasLifecycleHook received " + JSON.stringify(type) + " which is not a StaticSymbol"), type);
        }
        try {
            return !!this._methodNames(type)[lcProperty];
        }
        catch (e) {
            console.error("Failed on type " + JSON.stringify(type) + " with error " + e);
            throw e;
        }
    };
    /**
     * @param {?} type
     * @param {?} ctor
     * @return {?}
     */
    StaticReflector.prototype._registerDecoratorOrConstructor = function (type, ctor) {
        this.conversionMap.set(type, function (context, args) { return new (ctor.bind.apply(ctor, [void 0].concat(args)))(); });
    };
    /**
     * @param {?} type
     * @param {?} fn
     * @return {?}
     */
    StaticReflector.prototype._registerFunction = function (type, fn) {
        this.conversionMap.set(type, function (context, args) { return fn.apply(undefined, args); });
    };
    /**
     * @return {?}
     */
    StaticReflector.prototype.initializeConversionMap = function () {
        this.injectionToken = this.findDeclaration(ANGULAR_CORE, 'InjectionToken');
        this.opaqueToken = this.findDeclaration(ANGULAR_CORE, 'OpaqueToken');
        this.ROUTES = this.tryFindDeclaration(ANGULAR_ROUTER, 'ROUTES');
        this.ANALYZE_FOR_ENTRY_COMPONENTS =
            this.findDeclaration(ANGULAR_CORE, 'ANALYZE_FOR_ENTRY_COMPONENTS');
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Host'), Host);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Injectable'), Injectable);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Self'), Self);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'SkipSelf'), SkipSelf);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Inject'), Inject);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Optional'), Optional);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Attribute'), Attribute);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'ContentChild'), ContentChild);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'ContentChildren'), ContentChildren);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'ViewChild'), ViewChild);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'ViewChildren'), ViewChildren);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Input'), Input);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Output'), Output);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Pipe'), Pipe);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'HostBinding'), HostBinding);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'HostListener'), HostListener);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Directive'), Directive);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Component'), Component);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'NgModule'), NgModule);
        // Note: Some metadata classes can be used directly with Provider.deps.
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Host'), Host);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Self'), Self);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'SkipSelf'), SkipSelf);
        this._registerDecoratorOrConstructor(this.findDeclaration(ANGULAR_CORE, 'Optional'), Optional);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'trigger'), trigger);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'state'), state);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'transition'), transition);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'style'), style);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'animate'), animate);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'keyframes'), keyframes);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'sequence'), sequence);
        this._registerFunction(this.findDeclaration(ANGULAR_CORE, 'group'), group);
    };
    /**
     * getStaticSymbol produces a Type whose metadata is known but whose implementation is not loaded.
     * All types passed to the StaticResolver should be pseudo-types returned by this method.
     *
     * @param {?} declarationFile the absolute path of the file where the symbol is declared
     * @param {?} name the name of the type.
     * @param {?=} members
     * @return {?}
     */
    StaticReflector.prototype.getStaticSymbol = function (declarationFile, name, members) {
        return this.symbolResolver.getStaticSymbol(declarationFile, name, members);
    };
    /**
     * @param {?} error
     * @param {?} context
     * @param {?=} path
     * @return {?}
     */
    StaticReflector.prototype.reportError = function (error, context, path) {
        if (this.errorRecorder) {
            this.errorRecorder(error, (context && context.filePath) || path);
        }
        else {
            throw error;
        }
    };
    /**
     * Simplify but discard any errors
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    StaticReflector.prototype.trySimplify = function (context, value) {
        var /** @type {?} */ originalRecorder = this.errorRecorder;
        this.errorRecorder = function (error, fileName) { };
        var /** @type {?} */ result = this.simplify(context, value);
        this.errorRecorder = originalRecorder;
        return result;
    };
    /**
     * \@internal
     * @param {?} context
     * @param {?} value
     * @return {?}
     */
    StaticReflector.prototype.simplify = function (context, value) {
        var _this = this;
        var /** @type {?} */ self = this;
        var /** @type {?} */ scope = BindingScope.empty;
        var /** @type {?} */ calling = new Map();
        /**
         * @param {?} context
         * @param {?} value
         * @param {?} depth
         * @param {?} references
         * @return {?}
         */
        function simplifyInContext(context, value, depth, references) {
            /**
             * @param {?} staticSymbol
             * @return {?}
             */
            function resolveReferenceValue(staticSymbol) {
                var /** @type {?} */ resolvedSymbol = self.symbolResolver.resolveSymbol(staticSymbol);
                return resolvedSymbol ? resolvedSymbol.metadata : null;
            }
            /**
             * @param {?} functionSymbol
             * @param {?} targetFunction
             * @param {?} args
             * @return {?}
             */
            function simplifyCall(functionSymbol, targetFunction, args) {
                if (targetFunction && targetFunction['__symbolic'] == 'function') {
                    if (calling.get(functionSymbol)) {
                        throw new Error('Recursion not supported');
                    }
                    try {
                        var /** @type {?} */ value_1 = targetFunction['value'];
                        if (value_1 && (depth != 0 || value_1.__symbolic != 'error')) {
                            var /** @type {?} */ parameters = targetFunction['parameters'];
                            var /** @type {?} */ defaults = targetFunction.defaults;
                            args = args.map(function (arg) { return simplifyInContext(context, arg, depth + 1, references); })
                                .map(function (arg) { return shouldIgnore(arg) ? undefined : arg; });
                            if (defaults && defaults.length > args.length) {
                                args.push.apply(args, defaults.slice(args.length).map(function (value) { return simplify(value); }));
                            }
                            calling.set(functionSymbol, true);
                            var /** @type {?} */ functionScope = BindingScope.build();
                            for (var /** @type {?} */ i = 0; i < parameters.length; i++) {
                                functionScope.define(parameters[i], args[i]);
                            }
                            var /** @type {?} */ oldScope = scope;
                            var /** @type {?} */ result_1;
                            try {
                                scope = functionScope.done();
                                result_1 = simplifyInContext(functionSymbol, value_1, depth + 1, references);
                            }
                            finally {
                                scope = oldScope;
                            }
                            return result_1;
                        }
                    }
                    finally {
                        calling.delete(functionSymbol);
                    }
                }
                if (depth === 0) {
                    // If depth is 0 we are evaluating the top level expression that is describing element
                    // decorator. In this case, it is a decorator we don't understand, such as a custom
                    // non-angular decorator, and we should just ignore it.
                    return IGNORE;
                }
                return simplify({ __symbolic: 'error', message: 'Function call not supported', context: functionSymbol });
            }
            /**
             * @param {?} expression
             * @return {?}
             */
            function simplify(expression) {
                if (isPrimitive(expression)) {
                    return expression;
                }
                if (expression instanceof Array) {
                    var /** @type {?} */ result_2 = [];
                    for (var _i = 0, _a = ((expression)); _i < _a.length; _i++) {
                        var item = _a[_i];
                        // Check for a spread expression
                        if (item && item.__symbolic === 'spread') {
                            var /** @type {?} */ spreadArray = simplify(item.expression);
                            if (Array.isArray(spreadArray)) {
                                for (var _b = 0, spreadArray_1 = spreadArray; _b < spreadArray_1.length; _b++) {
                                    var spreadItem = spreadArray_1[_b];
                                    result_2.push(spreadItem);
                                }
                                continue;
                            }
                        }
                        var /** @type {?} */ value_2 = simplify(item);
                        if (shouldIgnore(value_2)) {
                            continue;
                        }
                        result_2.push(value_2);
                    }
                    return result_2;
                }
                if (expression instanceof StaticSymbol) {
                    // Stop simplification at builtin symbols or if we are in a reference context
                    if (expression === self.injectionToken || expression === self.opaqueToken ||
                        self.conversionMap.has(expression) || references > 0) {
                        return expression;
                    }
                    else {
                        var /** @type {?} */ staticSymbol = expression;
                        var /** @type {?} */ declarationValue = resolveReferenceValue(staticSymbol);
                        if (declarationValue) {
                            return simplifyInContext(staticSymbol, declarationValue, depth + 1, references);
                        }
                        else {
                            return staticSymbol;
                        }
                    }
                }
                if (expression) {
                    if (expression['__symbolic']) {
                        var /** @type {?} */ staticSymbol = void 0;
                        switch (expression['__symbolic']) {
                            case 'binop':
                                var /** @type {?} */ left = simplify(expression['left']);
                                if (shouldIgnore(left))
                                    return left;
                                var /** @type {?} */ right = simplify(expression['right']);
                                if (shouldIgnore(right))
                                    return right;
                                switch (expression['operator']) {
                                    case '&&':
                                        return left && right;
                                    case '||':
                                        return left || right;
                                    case '|':
                                        return left | right;
                                    case '^':
                                        return left ^ right;
                                    case '&':
                                        return left & right;
                                    case '==':
                                        return left == right;
                                    case '!=':
                                        return left != right;
                                    case '===':
                                        return left === right;
                                    case '!==':
                                        return left !== right;
                                    case '<':
                                        return left < right;
                                    case '>':
                                        return left > right;
                                    case '<=':
                                        return left <= right;
                                    case '>=':
                                        return left >= right;
                                    case '<<':
                                        return left << right;
                                    case '>>':
                                        return left >> right;
                                    case '+':
                                        return left + right;
                                    case '-':
                                        return left - right;
                                    case '*':
                                        return left * right;
                                    case '/':
                                        return left / right;
                                    case '%':
                                        return left % right;
                                }
                                return null;
                            case 'if':
                                var /** @type {?} */ condition = simplify(expression['condition']);
                                return condition ? simplify(expression['thenExpression']) :
                                    simplify(expression['elseExpression']);
                            case 'pre':
                                var /** @type {?} */ operand = simplify(expression['operand']);
                                if (shouldIgnore(operand))
                                    return operand;
                                switch (expression['operator']) {
                                    case '+':
                                        return operand;
                                    case '-':
                                        return -operand;
                                    case '!':
                                        return !operand;
                                    case '~':
                                        return ~operand;
                                }
                                return null;
                            case 'index':
                                var /** @type {?} */ indexTarget = simplify(expression['expression']);
                                var /** @type {?} */ index = simplify(expression['index']);
                                if (indexTarget && isPrimitive(index))
                                    return indexTarget[index];
                                return null;
                            case 'select':
                                var /** @type {?} */ member = expression['member'];
                                var /** @type {?} */ selectContext = context;
                                var /** @type {?} */ selectTarget = simplify(expression['expression']);
                                if (selectTarget instanceof StaticSymbol) {
                                    var /** @type {?} */ members = selectTarget.members.concat(member);
                                    selectContext =
                                        self.getStaticSymbol(selectTarget.filePath, selectTarget.name, members);
                                    var /** @type {?} */ declarationValue = resolveReferenceValue(selectContext);
                                    if (declarationValue) {
                                        return simplifyInContext(selectContext, declarationValue, depth + 1, references);
                                    }
                                    else {
                                        return selectContext;
                                    }
                                }
                                if (selectTarget && isPrimitive(member))
                                    return simplifyInContext(selectContext, selectTarget[member], depth + 1, references);
                                return null;
                            case 'reference':
                                // Note: This only has to deal with variable references,
                                // as symbol references have been converted into StaticSymbols already
                                // in the StaticSymbolResolver!
                                var /** @type {?} */ name_1 = expression['name'];
                                var /** @type {?} */ localValue = scope.resolve(name_1);
                                if (localValue != BindingScope.missing) {
                                    return localValue;
                                }
                                break;
                            case 'class':
                                return context;
                            case 'function':
                                return context;
                            case 'new':
                            case 'call':
                                // Determine if the function is a built-in conversion
                                staticSymbol = simplifyInContext(context, expression['expression'], depth + 1, /* references */ 0);
                                if (staticSymbol instanceof StaticSymbol) {
                                    if (staticSymbol === self.injectionToken || staticSymbol === self.opaqueToken) {
                                        // if somebody calls new InjectionToken, don't create an InjectionToken,
                                        // but rather return the symbol to which the InjectionToken is assigned to.
                                        return context;
                                    }
                                    var /** @type {?} */ argExpressions = expression['arguments'] || [];
                                    var /** @type {?} */ converter = self.conversionMap.get(staticSymbol);
                                    if (converter) {
                                        var /** @type {?} */ args = argExpressions
                                            .map(function (arg) { return simplifyInContext(context, arg, depth + 1, references); })
                                            .map(function (arg) { return shouldIgnore(arg) ? undefined : arg; });
                                        return converter(context, args);
                                    }
                                    else {
                                        // Determine if the function is one we can simplify.
                                        var /** @type {?} */ targetFunction = resolveReferenceValue(staticSymbol);
                                        return simplifyCall(staticSymbol, targetFunction, argExpressions);
                                    }
                                }
                                return IGNORE;
                            case 'error':
                                var /** @type {?} */ message = produceErrorMessage(expression);
                                if (expression['line']) {
                                    message =
                                        message + " (position " + (expression['line'] + 1) + ":" + (expression['character'] + 1) + " in the original .ts file)";
                                    self.reportError(positionalError(message, context.filePath, expression['line'], expression['character']), context);
                                }
                                else {
                                    self.reportError(new Error(message), context);
                                }
                                return IGNORE;
                            case 'ignore':
                                return expression;
                        }
                        return null;
                    }
                    return mapStringMap(expression, function (value, name) {
                        if (REFERENCE_SET.has(name)) {
                            if (name === USE_VALUE && PROVIDE in expression) {
                                // If this is a provider expression, check for special tokens that need the value
                                // during analysis.
                                var /** @type {?} */ provide = simplify(expression.provide);
                                if (provide === self.ROUTES || provide == self.ANALYZE_FOR_ENTRY_COMPONENTS) {
                                    return simplify(value);
                                }
                            }
                            return simplifyInContext(context, value, depth, references + 1);
                        }
                        return simplify(value);
                    });
                }
                return IGNORE;
            }
            try {
                return simplify(value);
            }
            catch (e) {
                var /** @type {?} */ members = context.members.length ? "." + context.members.join('.') : '';
                var /** @type {?} */ message = e.message + ", resolving symbol " + context.name + members + " in " + context.filePath;
                if (e.fileName) {
                    throw positionalError(message, e.fileName, e.line, e.column);
                }
                throw syntaxError(message);
            }
        }
        var /** @type {?} */ recordedSimplifyInContext = function (context, value) {
            try {
                return simplifyInContext(context, value, 0, 0);
            }
            catch (e) {
                _this.reportError(e, context);
            }
        };
        var /** @type {?} */ result = this.errorRecorder ? recordedSimplifyInContext(context, value) :
            simplifyInContext(context, value, 0, 0);
        if (shouldIgnore(result)) {
            return undefined;
        }
        return result;
    };
    /**
     * @param {?} type
     * @return {?}
     */
    StaticReflector.prototype.getTypeMetadata = function (type) {
        var /** @type {?} */ resolvedSymbol = this.symbolResolver.resolveSymbol(type);
        return resolvedSymbol && resolvedSymbol.metadata ? resolvedSymbol.metadata :
            { __symbolic: 'class' };
    };
    return StaticReflector;
}());
export { StaticReflector };
function StaticReflector_tsickle_Closure_declarations() {
    /** @type {?} */
    StaticReflector.prototype.annotationCache;
    /** @type {?} */
    StaticReflector.prototype.propertyCache;
    /** @type {?} */
    StaticReflector.prototype.parameterCache;
    /** @type {?} */
    StaticReflector.prototype.methodCache;
    /** @type {?} */
    StaticReflector.prototype.conversionMap;
    /** @type {?} */
    StaticReflector.prototype.injectionToken;
    /** @type {?} */
    StaticReflector.prototype.opaqueToken;
    /** @type {?} */
    StaticReflector.prototype.ROUTES;
    /** @type {?} */
    StaticReflector.prototype.ANALYZE_FOR_ENTRY_COMPONENTS;
    /** @type {?} */
    StaticReflector.prototype.annotationForParentClassWithSummaryKind;
    /** @type {?} */
    StaticReflector.prototype.annotationNames;
    /** @type {?} */
    StaticReflector.prototype.summaryResolver;
    /** @type {?} */
    StaticReflector.prototype.symbolResolver;
    /** @type {?} */
    StaticReflector.prototype.errorRecorder;
}
/**
 * @param {?} error
 * @return {?}
 */
function expandedMessage(error) {
    switch (error.message) {
        case 'Reference to non-exported class':
            if (error.context && error.context.className) {
                return "Reference to a non-exported class " + error.context.className + ". Consider exporting the class";
            }
            break;
        case 'Variable not initialized':
            return 'Only initialized variables and constants can be referenced because the value of this variable is needed by the template compiler';
        case 'Destructuring not supported':
            return 'Referencing an exported destructured variable or constant is not supported by the template compiler. Consider simplifying this to avoid destructuring';
        case 'Could not resolve type':
            if (error.context && error.context.typeName) {
                return "Could not resolve type " + error.context.typeName;
            }
            break;
        case 'Function call not supported':
            var /** @type {?} */ prefix = error.context && error.context.name ? "Calling function '" + error.context.name + "', f" : 'F';
            return prefix +
                'unction calls are not supported. Consider replacing the function or lambda with a reference to an exported function';
        case 'Reference to a local symbol':
            if (error.context && error.context.name) {
                return "Reference to a local (non-exported) symbol '" + error.context.name + "'. Consider exporting the symbol";
            }
            break;
    }
    return error.message;
}
/**
 * @param {?} error
 * @return {?}
 */
function produceErrorMessage(error) {
    return "Error encountered resolving symbol values statically. " + expandedMessage(error);
}
/**
 * @param {?} input
 * @param {?} transform
 * @return {?}
 */
function mapStringMap(input, transform) {
    if (!input)
        return {};
    var /** @type {?} */ result = {};
    Object.keys(input).forEach(function (key) {
        var /** @type {?} */ value = transform(input[key], key);
        if (!shouldIgnore(value)) {
            if (HIDDEN_KEY.test(key)) {
                Object.defineProperty(result, key, { enumerable: false, configurable: true, value: value });
            }
            else {
                result[key] = value;
            }
        }
    });
    return result;
}
/**
 * @param {?} o
 * @return {?}
 */
function isPrimitive(o) {
    return o === null || (typeof o !== 'function' && typeof o !== 'object');
}
/**
 * @record
 */
function BindingScopeBuilder() { }
function BindingScopeBuilder_tsickle_Closure_declarations() {
    /** @type {?} */
    BindingScopeBuilder.prototype.define;
    /** @type {?} */
    BindingScopeBuilder.prototype.done;
}
/**
 * @abstract
 */
var BindingScope = (function () {
    function BindingScope() {
    }
    /**
     * @return {?}
     */
    BindingScope.build = function () {
        var /** @type {?} */ current = new Map();
        return {
            define: function (name, value) {
                current.set(name, value);
                return this;
            },
            done: function () {
                return current.size > 0 ? new PopulatedScope(current) : BindingScope.empty;
            }
        };
    };
    return BindingScope;
}());
BindingScope.missing = {};
BindingScope.empty = { resolve: function (name) { return BindingScope.missing; } };
function BindingScope_tsickle_Closure_declarations() {
    /** @type {?} */
    BindingScope.missing;
    /** @type {?} */
    BindingScope.empty;
    /**
     * @abstract
     * @param {?} name
     * @return {?}
     */
    BindingScope.prototype.resolve = function (name) { };
}
var PopulatedScope = (function (_super) {
    tslib_1.__extends(PopulatedScope, _super);
    /**
     * @param {?} bindings
     */
    function PopulatedScope(bindings) {
        var _this = _super.call(this) || this;
        _this.bindings = bindings;
        return _this;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    PopulatedScope.prototype.resolve = function (name) {
        return this.bindings.has(name) ? this.bindings.get(name) : BindingScope.missing;
    };
    return PopulatedScope;
}(BindingScope));
function PopulatedScope_tsickle_Closure_declarations() {
    /** @type {?} */
    PopulatedScope.prototype.bindings;
}
/**
 * @param {?} message
 * @param {?} fileName
 * @param {?} line
 * @param {?} column
 * @return {?}
 */
function positionalError(message, fileName, line, column) {
    var /** @type {?} */ result = new Error(message);
    ((result)).fileName = fileName;
    ((result)).line = line;
    ((result)).column = column;
    return result;
}
//# sourceMappingURL=static_reflector.js.map