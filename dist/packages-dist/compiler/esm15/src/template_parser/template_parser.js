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
import { Inject, InjectionToken, Optional, ɵConsole as Console } from '@angular/core';
import { identifierName } from '../compile_metadata';
import { CompileReflector } from '../compile_reflector';
import { CompilerConfig } from '../config';
import { ASTWithSource, EmptyExpr } from '../expression_parser/ast';
import { Parser } from '../expression_parser/parser';
import { I18NHtmlParser } from '../i18n/i18n_html_parser';
import { Identifiers, createTokenForExternalReference, createTokenForReference } from '../identifiers';
import { CompilerInjectable } from '../injectable';
import * as html from '../ml_parser/ast';
import { ParseTreeResult } from '../ml_parser/html_parser';
import { expandNodes } from '../ml_parser/icu_ast_expander';
import { InterpolationConfig } from '../ml_parser/interpolation_config';
import { isNgTemplate, splitNsName } from '../ml_parser/tags';
import { ParseError, ParseErrorLevel, ParseSourceSpan } from '../parse_util';
import { ProviderElementContext, ProviderViewContext } from '../provider_analyzer';
import { ElementSchemaRegistry } from '../schema/element_schema_registry';
import { CssSelector, SelectorMatcher } from '../selector';
import { isStyleUrlResolvable } from '../style_url_resolver';
import { syntaxError } from '../util';
import { BindingParser } from './binding_parser';
import { AttrAst, BoundDirectivePropertyAst, BoundTextAst, DirectiveAst, ElementAst, EmbeddedTemplateAst, NgContentAst, PropertyBindingType, ReferenceAst, TextAst, VariableAst, templateVisitAll } from './template_ast';
import { PreparsedElementType, preparseElement } from './template_preparser';
const /** @type {?} */ BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(let-)|(ref-|#)|(on-)|(bindon-)|(@))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/;
// Group 1 = "bind-"
const /** @type {?} */ KW_BIND_IDX = 1;
// Group 2 = "let-"
const /** @type {?} */ KW_LET_IDX = 2;
// Group 3 = "ref-/#"
const /** @type {?} */ KW_REF_IDX = 3;
// Group 4 = "on-"
const /** @type {?} */ KW_ON_IDX = 4;
// Group 5 = "bindon-"
const /** @type {?} */ KW_BINDON_IDX = 5;
// Group 6 = "@"
const /** @type {?} */ KW_AT_IDX = 6;
// Group 7 = the identifier after "bind-", "let-", "ref-/#", "on-", "bindon-" or "@"
const /** @type {?} */ IDENT_KW_IDX = 7;
// Group 8 = identifier inside [()]
const /** @type {?} */ IDENT_BANANA_BOX_IDX = 8;
// Group 9 = identifier inside []
const /** @type {?} */ IDENT_PROPERTY_IDX = 9;
// Group 10 = identifier inside ()
const /** @type {?} */ IDENT_EVENT_IDX = 10;
// deprecated in 4.x
const /** @type {?} */ TEMPLATE_ELEMENT = 'template';
// deprecated in 4.x
const /** @type {?} */ TEMPLATE_ATTR = 'template';
const /** @type {?} */ TEMPLATE_ATTR_PREFIX = '*';
const /** @type {?} */ CLASS_ATTR = 'class';
const /** @type {?} */ TEXT_CSS_SELECTOR = CssSelector.parse('*')[0];
const /** @type {?} */ TEMPLATE_ELEMENT_DEPRECATION_WARNING = 'The <template> element is deprecated. Use <ng-template> instead';
const /** @type {?} */ TEMPLATE_ATTR_DEPRECATION_WARNING = 'The template attribute is deprecated. Use an ng-template element instead.';
let /** @type {?} */ warningCounts = {};
/**
 * @param {?} warnings
 * @return {?}
 */
function warnOnlyOnce(warnings) {
    return (error) => {
        if (warnings.indexOf(error.msg) !== -1) {
            warningCounts[error.msg] = (warningCounts[error.msg] || 0) + 1;
            return warningCounts[error.msg] <= 1;
        }
        return true;
    };
}
/**
 * Provides an array of {\@link TemplateAstVisitor}s which will be used to transform
 * parsed templates before compilation is invoked, allowing custom expression syntax
 * and other advanced transformations.
 *
 * This is currently an internal-only feature and not meant for general use.
 */
export const /** @type {?} */ TEMPLATE_TRANSFORMS = new InjectionToken('TemplateTransforms');
export class TemplateParseError extends ParseError {
    /**
     * @param {?} message
     * @param {?} span
     * @param {?} level
     */
    constructor(message, span, level) {
        super(span, message, level);
    }
}
export class TemplateParseResult {
    /**
     * @param {?=} templateAst
     * @param {?=} usedPipes
     * @param {?=} errors
     */
    constructor(templateAst, usedPipes, errors) {
        this.templateAst = templateAst;
        this.usedPipes = usedPipes;
        this.errors = errors;
    }
}
function TemplateParseResult_tsickle_Closure_declarations() {
    /** @type {?} */
    TemplateParseResult.prototype.templateAst;
    /** @type {?} */
    TemplateParseResult.prototype.usedPipes;
    /** @type {?} */
    TemplateParseResult.prototype.errors;
}
export class TemplateParser {
    /**
     * @param {?} _config
     * @param {?} _reflector
     * @param {?} _exprParser
     * @param {?} _schemaRegistry
     * @param {?} _htmlParser
     * @param {?} _console
     * @param {?} transforms
     */
    constructor(_config, _reflector, _exprParser, _schemaRegistry, _htmlParser, _console, transforms) {
        this._config = _config;
        this._reflector = _reflector;
        this._exprParser = _exprParser;
        this._schemaRegistry = _schemaRegistry;
        this._htmlParser = _htmlParser;
        this._console = _console;
        this.transforms = transforms;
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} directives
     * @param {?} pipes
     * @param {?} schemas
     * @param {?} templateUrl
     * @return {?}
     */
    parse(component, template, directives, pipes, schemas, templateUrl) {
        const /** @type {?} */ result = this.tryParse(component, template, directives, pipes, schemas, templateUrl);
        const /** @type {?} */ warnings = ((result.errors)).filter(error => error.level === ParseErrorLevel.WARNING)
            .filter(warnOnlyOnce([TEMPLATE_ATTR_DEPRECATION_WARNING, TEMPLATE_ELEMENT_DEPRECATION_WARNING]));
        const /** @type {?} */ errors = ((result.errors)).filter(error => error.level === ParseErrorLevel.ERROR);
        if (warnings.length > 0) {
            this._console.warn(`Template parse warnings:\n${warnings.join('\n')}`);
        }
        if (errors.length > 0) {
            const /** @type {?} */ errorString = errors.join('\n');
            throw syntaxError(`Template parse errors:\n${errorString}`, errors);
        }
        return { template: /** @type {?} */ ((result.templateAst)), pipes: /** @type {?} */ ((result.usedPipes)) };
    }
    /**
     * @param {?} component
     * @param {?} template
     * @param {?} directives
     * @param {?} pipes
     * @param {?} schemas
     * @param {?} templateUrl
     * @return {?}
     */
    tryParse(component, template, directives, pipes, schemas, templateUrl) {
        return this.tryParseHtml(this.expandHtml(/** @type {?} */ ((this._htmlParser)).parse(template, templateUrl, true, this.getInterpolationConfig(component))), component, directives, pipes, schemas);
    }
    /**
     * @param {?} htmlAstWithErrors
     * @param {?} component
     * @param {?} directives
     * @param {?} pipes
     * @param {?} schemas
     * @return {?}
     */
    tryParseHtml(htmlAstWithErrors, component, directives, pipes, schemas) {
        let /** @type {?} */ result;
        const /** @type {?} */ errors = htmlAstWithErrors.errors;
        const /** @type {?} */ usedPipes = [];
        if (htmlAstWithErrors.rootNodes.length > 0) {
            const /** @type {?} */ uniqDirectives = removeSummaryDuplicates(directives);
            const /** @type {?} */ uniqPipes = removeSummaryDuplicates(pipes);
            const /** @type {?} */ providerViewContext = new ProviderViewContext(this._reflector, component);
            let /** @type {?} */ interpolationConfig = ((undefined));
            if (component.template && component.template.interpolation) {
                interpolationConfig = {
                    start: component.template.interpolation[0],
                    end: component.template.interpolation[1]
                };
            }
            const /** @type {?} */ bindingParser = new BindingParser(this._exprParser, /** @type {?} */ ((interpolationConfig)), this._schemaRegistry, uniqPipes, errors);
            const /** @type {?} */ parseVisitor = new TemplateParseVisitor(this._reflector, this._config, providerViewContext, uniqDirectives, bindingParser, this._schemaRegistry, schemas, errors);
            result = html.visitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_ELEMENT_CONTEXT);
            errors.push(...providerViewContext.errors);
            usedPipes.push(...bindingParser.getUsedPipes());
        }
        else {
            result = [];
        }
        this._assertNoReferenceDuplicationOnTemplate(result, errors);
        if (errors.length > 0) {
            return new TemplateParseResult(result, usedPipes, errors);
        }
        if (this.transforms) {
            this.transforms.forEach((transform) => { result = templateVisitAll(transform, result); });
        }
        return new TemplateParseResult(result, usedPipes, errors);
    }
    /**
     * @param {?} htmlAstWithErrors
     * @param {?=} forced
     * @return {?}
     */
    expandHtml(htmlAstWithErrors, forced = false) {
        const /** @type {?} */ errors = htmlAstWithErrors.errors;
        if (errors.length == 0 || forced) {
            // Transform ICU messages to angular directives
            const /** @type {?} */ expandedHtmlAst = expandNodes(htmlAstWithErrors.rootNodes);
            errors.push(...expandedHtmlAst.errors);
            htmlAstWithErrors = new ParseTreeResult(expandedHtmlAst.nodes, errors);
        }
        return htmlAstWithErrors;
    }
    /**
     * @param {?} component
     * @return {?}
     */
    getInterpolationConfig(component) {
        if (component.template) {
            return InterpolationConfig.fromArray(component.template.interpolation);
        }
        return undefined;
    }
    /**
     * \@internal
     * @param {?} result
     * @param {?} errors
     * @return {?}
     */
    _assertNoReferenceDuplicationOnTemplate(result, errors) {
        const /** @type {?} */ existingReferences = [];
        result.filter(element => !!((element)).references)
            .forEach(element => ((element)).references.forEach((reference) => {
            const /** @type {?} */ name = reference.name;
            if (existingReferences.indexOf(name) < 0) {
                existingReferences.push(name);
            }
            else {
                const /** @type {?} */ error = new TemplateParseError(`Reference "#${name}" is defined several times`, reference.sourceSpan, ParseErrorLevel.ERROR);
                errors.push(error);
            }
        }));
    }
}
TemplateParser.decorators = [
    { type: CompilerInjectable },
];
/** @nocollapse */
TemplateParser.ctorParameters = () => [
    { type: CompilerConfig, },
    { type: CompileReflector, },
    { type: Parser, },
    { type: ElementSchemaRegistry, },
    { type: I18NHtmlParser, },
    { type: Console, },
    { type: Array, decorators: [{ type: Optional }, { type: Inject, args: [TEMPLATE_TRANSFORMS,] },] },
];
function TemplateParser_tsickle_Closure_declarations() {
    /** @type {?} */
    TemplateParser.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    TemplateParser.ctorParameters;
    /** @type {?} */
    TemplateParser.prototype._config;
    /** @type {?} */
    TemplateParser.prototype._reflector;
    /** @type {?} */
    TemplateParser.prototype._exprParser;
    /** @type {?} */
    TemplateParser.prototype._schemaRegistry;
    /** @type {?} */
    TemplateParser.prototype._htmlParser;
    /** @type {?} */
    TemplateParser.prototype._console;
    /** @type {?} */
    TemplateParser.prototype.transforms;
}
class TemplateParseVisitor {
    /**
     * @param {?} reflector
     * @param {?} config
     * @param {?} providerViewContext
     * @param {?} directives
     * @param {?} _bindingParser
     * @param {?} _schemaRegistry
     * @param {?} _schemas
     * @param {?} _targetErrors
     */
    constructor(reflector, config, providerViewContext, directives, _bindingParser, _schemaRegistry, _schemas, _targetErrors) {
        this.reflector = reflector;
        this.config = config;
        this.providerViewContext = providerViewContext;
        this._bindingParser = _bindingParser;
        this._schemaRegistry = _schemaRegistry;
        this._schemas = _schemas;
        this._targetErrors = _targetErrors;
        this.selectorMatcher = new SelectorMatcher();
        this.directivesIndex = new Map();
        this.ngContentCount = 0;
        // Note: queries start with id 1 so we can use the number in a Bloom filter!
        this.contentQueryStartId = providerViewContext.component.viewQueries.length + 1;
        directives.forEach((directive, index) => {
            const /** @type {?} */ selector = CssSelector.parse(/** @type {?} */ ((directive.selector)));
            this.selectorMatcher.addSelectables(selector, directive);
            this.directivesIndex.set(directive, index);
        });
    }
    /**
     * @param {?} expansion
     * @param {?} context
     * @return {?}
     */
    visitExpansion(expansion, context) { return null; }
    /**
     * @param {?} expansionCase
     * @param {?} context
     * @return {?}
     */
    visitExpansionCase(expansionCase, context) { return null; }
    /**
     * @param {?} text
     * @param {?} parent
     * @return {?}
     */
    visitText(text, parent) {
        const /** @type {?} */ ngContentIndex = ((parent.findNgContentIndex(TEXT_CSS_SELECTOR)));
        const /** @type {?} */ expr = this._bindingParser.parseInterpolation(text.value, /** @type {?} */ ((text.sourceSpan)));
        return expr ? new BoundTextAst(expr, ngContentIndex, /** @type {?} */ ((text.sourceSpan))) :
            new TextAst(text.value, ngContentIndex, /** @type {?} */ ((text.sourceSpan)));
    }
    /**
     * @param {?} attribute
     * @param {?} context
     * @return {?}
     */
    visitAttribute(attribute, context) {
        return new AttrAst(attribute.name, attribute.value, attribute.sourceSpan);
    }
    /**
     * @param {?} comment
     * @param {?} context
     * @return {?}
     */
    visitComment(comment, context) { return null; }
    /**
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    visitElement(element, parent) {
        const /** @type {?} */ queryStartIndex = this.contentQueryStartId;
        const /** @type {?} */ nodeName = element.name;
        const /** @type {?} */ preparsedElement = preparseElement(element);
        if (preparsedElement.type === PreparsedElementType.SCRIPT ||
            preparsedElement.type === PreparsedElementType.STYLE) {
            // Skipping <script> for security reasons
            // Skipping <style> as we already processed them
            // in the StyleCompiler
            return null;
        }
        if (preparsedElement.type === PreparsedElementType.STYLESHEET &&
            isStyleUrlResolvable(preparsedElement.hrefAttr)) {
            // Skipping stylesheets with either relative urls or package scheme as we already processed
            // them in the StyleCompiler
            return null;
        }
        const /** @type {?} */ matchableAttrs = [];
        const /** @type {?} */ elementOrDirectiveProps = [];
        const /** @type {?} */ elementOrDirectiveRefs = [];
        const /** @type {?} */ elementVars = [];
        const /** @type {?} */ events = [];
        const /** @type {?} */ templateElementOrDirectiveProps = [];
        const /** @type {?} */ templateMatchableAttrs = [];
        const /** @type {?} */ templateElementVars = [];
        let /** @type {?} */ hasInlineTemplates = false;
        const /** @type {?} */ attrs = [];
        const /** @type {?} */ isTemplateElement = isTemplate(element, this.config.enableLegacyTemplate, (m, span) => this._reportError(m, span, ParseErrorLevel.WARNING));
        element.attrs.forEach(attr => {
            const /** @type {?} */ hasBinding = this._parseAttr(isTemplateElement, attr, matchableAttrs, elementOrDirectiveProps, events, elementOrDirectiveRefs, elementVars);
            let /** @type {?} */ templateBindingsSource;
            let /** @type {?} */ prefixToken;
            let /** @type {?} */ normalizedName = this._normalizeAttributeName(attr.name);
            if (this.config.enableLegacyTemplate && normalizedName == TEMPLATE_ATTR) {
                this._reportError(TEMPLATE_ATTR_DEPRECATION_WARNING, attr.sourceSpan, ParseErrorLevel.WARNING);
                templateBindingsSource = attr.value;
            }
            else if (normalizedName.startsWith(TEMPLATE_ATTR_PREFIX)) {
                templateBindingsSource = attr.value;
                prefixToken = normalizedName.substring(TEMPLATE_ATTR_PREFIX.length) + ':';
            }
            const /** @type {?} */ hasTemplateBinding = templateBindingsSource != null;
            if (hasTemplateBinding) {
                if (hasInlineTemplates) {
                    this._reportError(`Can't have multiple template bindings on one element. Use only one attribute named 'template' or prefixed with *`, attr.sourceSpan);
                }
                hasInlineTemplates = true;
                this._bindingParser.parseInlineTemplateBinding(/** @type {?} */ ((prefixToken)), /** @type {?} */ ((templateBindingsSource)), attr.sourceSpan, templateMatchableAttrs, templateElementOrDirectiveProps, templateElementVars);
            }
            if (!hasBinding && !hasTemplateBinding) {
                // don't include the bindings as attributes as well in the AST
                attrs.push(this.visitAttribute(attr, null));
                matchableAttrs.push([attr.name, attr.value]);
            }
        });
        const /** @type {?} */ elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
        const { directives: directiveMetas, matchElement } = this._parseDirectives(this.selectorMatcher, elementCssSelector);
        const /** @type {?} */ references = [];
        const /** @type {?} */ boundDirectivePropNames = new Set();
        const /** @type {?} */ directiveAsts = this._createDirectiveAsts(isTemplateElement, element.name, directiveMetas, elementOrDirectiveProps, elementOrDirectiveRefs, /** @type {?} */ ((element.sourceSpan)), references, boundDirectivePropNames);
        const /** @type {?} */ elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, boundDirectivePropNames);
        const /** @type {?} */ isViewRoot = parent.isTemplateElement || hasInlineTemplates;
        const /** @type {?} */ providerContext = new ProviderElementContext(this.providerViewContext, /** @type {?} */ ((parent.providerContext)), isViewRoot, directiveAsts, attrs, references, isTemplateElement, queryStartIndex, /** @type {?} */ ((element.sourceSpan)));
        const /** @type {?} */ children = html.visitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, ElementContext.create(isTemplateElement, directiveAsts, isTemplateElement ? ((parent.providerContext)) : providerContext));
        providerContext.afterElement();
        // Override the actual selector when the `ngProjectAs` attribute is provided
        const /** @type {?} */ projectionSelector = preparsedElement.projectAs != null ?
            CssSelector.parse(preparsedElement.projectAs)[0] :
            elementCssSelector;
        const /** @type {?} */ ngContentIndex = ((parent.findNgContentIndex(projectionSelector)));
        let /** @type {?} */ parsedElement;
        if (preparsedElement.type === PreparsedElementType.NG_CONTENT) {
            if (element.children && !element.children.every(_isEmptyTextNode)) {
                this._reportError(`<ng-content> element cannot have content.`, /** @type {?} */ ((element.sourceSpan)));
            }
            parsedElement = new NgContentAst(this.ngContentCount++, hasInlineTemplates ? ((null)) : ngContentIndex, /** @type {?} */ ((element.sourceSpan)));
        }
        else if (isTemplateElement) {
            this._assertAllEventsPublishedByDirectives(directiveAsts, events);
            this._assertNoComponentsNorElementBindingsOnTemplate(directiveAsts, elementProps, /** @type {?} */ ((element.sourceSpan)));
            parsedElement = new EmbeddedTemplateAst(attrs, events, references, elementVars, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, providerContext.queryMatches, children, hasInlineTemplates ? ((null)) : ngContentIndex, /** @type {?} */ ((element.sourceSpan)));
        }
        else {
            this._assertElementExists(matchElement, element);
            this._assertOnlyOneComponent(directiveAsts, /** @type {?} */ ((element.sourceSpan)));
            const /** @type {?} */ ngContentIndex = hasInlineTemplates ? null : parent.findNgContentIndex(projectionSelector);
            parsedElement = new ElementAst(nodeName, attrs, elementProps, events, references, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, providerContext.queryMatches, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan, element.endSourceSpan || null);
        }
        if (hasInlineTemplates) {
            const /** @type {?} */ templateQueryStartIndex = this.contentQueryStartId;
            const /** @type {?} */ templateSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
            const { directives: templateDirectiveMetas } = this._parseDirectives(this.selectorMatcher, templateSelector);
            const /** @type {?} */ templateBoundDirectivePropNames = new Set();
            const /** @type {?} */ templateDirectiveAsts = this._createDirectiveAsts(true, element.name, templateDirectiveMetas, templateElementOrDirectiveProps, [], /** @type {?} */ ((element.sourceSpan)), [], templateBoundDirectivePropNames);
            const /** @type {?} */ templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateBoundDirectivePropNames);
            this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectiveAsts, templateElementProps, /** @type {?} */ ((element.sourceSpan)));
            const /** @type {?} */ templateProviderContext = new ProviderElementContext(this.providerViewContext, /** @type {?} */ ((parent.providerContext)), parent.isTemplateElement, templateDirectiveAsts, [], [], true, templateQueryStartIndex, /** @type {?} */ ((element.sourceSpan)));
            templateProviderContext.afterElement();
            parsedElement = new EmbeddedTemplateAst([], [], [], templateElementVars, templateProviderContext.transformedDirectiveAsts, templateProviderContext.transformProviders, templateProviderContext.transformedHasViewContainer, templateProviderContext.queryMatches, [parsedElement], ngContentIndex, /** @type {?} */ ((element.sourceSpan)));
        }
        return parsedElement;
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} attr
     * @param {?} targetMatchableAttrs
     * @param {?} targetProps
     * @param {?} targetEvents
     * @param {?} targetRefs
     * @param {?} targetVars
     * @return {?}
     */
    _parseAttr(isTemplateElement, attr, targetMatchableAttrs, targetProps, targetEvents, targetRefs, targetVars) {
        const /** @type {?} */ name = this._normalizeAttributeName(attr.name);
        const /** @type {?} */ value = attr.value;
        const /** @type {?} */ srcSpan = attr.sourceSpan;
        const /** @type {?} */ bindParts = name.match(BIND_NAME_REGEXP);
        let /** @type {?} */ hasBinding = false;
        if (bindParts !== null) {
            hasBinding = true;
            if (bindParts[KW_BIND_IDX] != null) {
                this._bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
            }
            else if (bindParts[KW_LET_IDX]) {
                if (isTemplateElement) {
                    const /** @type {?} */ identifier = bindParts[IDENT_KW_IDX];
                    this._parseVariable(identifier, value, srcSpan, targetVars);
                }
                else {
                    this._reportError(`"let-" is only supported on template elements.`, srcSpan);
                }
            }
            else if (bindParts[KW_REF_IDX]) {
                const /** @type {?} */ identifier = bindParts[IDENT_KW_IDX];
                this._parseReference(identifier, value, srcSpan, targetRefs);
            }
            else if (bindParts[KW_ON_IDX]) {
                this._bindingParser.parseEvent(bindParts[IDENT_KW_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
            }
            else if (bindParts[KW_BINDON_IDX]) {
                this._bindingParser.parsePropertyBinding(bindParts[IDENT_KW_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[IDENT_KW_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
            }
            else if (bindParts[KW_AT_IDX]) {
                this._bindingParser.parseLiteralAttr(name, value, srcSpan, targetMatchableAttrs, targetProps);
            }
            else if (bindParts[IDENT_BANANA_BOX_IDX]) {
                this._bindingParser.parsePropertyBinding(bindParts[IDENT_BANANA_BOX_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
                this._parseAssignmentEvent(bindParts[IDENT_BANANA_BOX_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
            }
            else if (bindParts[IDENT_PROPERTY_IDX]) {
                this._bindingParser.parsePropertyBinding(bindParts[IDENT_PROPERTY_IDX], value, false, srcSpan, targetMatchableAttrs, targetProps);
            }
            else if (bindParts[IDENT_EVENT_IDX]) {
                this._bindingParser.parseEvent(bindParts[IDENT_EVENT_IDX], value, srcSpan, targetMatchableAttrs, targetEvents);
            }
        }
        else {
            hasBinding = this._bindingParser.parsePropertyInterpolation(name, value, srcSpan, targetMatchableAttrs, targetProps);
        }
        if (!hasBinding) {
            this._bindingParser.parseLiteralAttr(name, value, srcSpan, targetMatchableAttrs, targetProps);
        }
        return hasBinding;
    }
    /**
     * @param {?} attrName
     * @return {?}
     */
    _normalizeAttributeName(attrName) {
        return /^data-/i.test(attrName) ? attrName.substring(5) : attrName;
    }
    /**
     * @param {?} identifier
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetVars
     * @return {?}
     */
    _parseVariable(identifier, value, sourceSpan, targetVars) {
        if (identifier.indexOf('-') > -1) {
            this._reportError(`"-" is not allowed in variable names`, sourceSpan);
        }
        targetVars.push(new VariableAst(identifier, value, sourceSpan));
    }
    /**
     * @param {?} identifier
     * @param {?} value
     * @param {?} sourceSpan
     * @param {?} targetRefs
     * @return {?}
     */
    _parseReference(identifier, value, sourceSpan, targetRefs) {
        if (identifier.indexOf('-') > -1) {
            this._reportError(`"-" is not allowed in reference names`, sourceSpan);
        }
        targetRefs.push(new ElementOrDirectiveRef(identifier, value, sourceSpan));
    }
    /**
     * @param {?} name
     * @param {?} expression
     * @param {?} sourceSpan
     * @param {?} targetMatchableAttrs
     * @param {?} targetEvents
     * @return {?}
     */
    _parseAssignmentEvent(name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
        this._bindingParser.parseEvent(`${name}Change`, `${expression}=$event`, sourceSpan, targetMatchableAttrs, targetEvents);
    }
    /**
     * @param {?} selectorMatcher
     * @param {?} elementCssSelector
     * @return {?}
     */
    _parseDirectives(selectorMatcher, elementCssSelector) {
        // Need to sort the directives so that we get consistent results throughout,
        // as selectorMatcher uses Maps inside.
        // Also deduplicate directives as they might match more than one time!
        const /** @type {?} */ directives = new Array(this.directivesIndex.size);
        // Whether any directive selector matches on the element name
        let /** @type {?} */ matchElement = false;
        selectorMatcher.match(elementCssSelector, (selector, directive) => {
            directives[((this.directivesIndex.get(directive)))] = directive;
            matchElement = matchElement || selector.hasElementSelector();
        });
        return {
            directives: directives.filter(dir => !!dir),
            matchElement,
        };
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} elementName
     * @param {?} directives
     * @param {?} props
     * @param {?} elementOrDirectiveRefs
     * @param {?} elementSourceSpan
     * @param {?} targetReferences
     * @param {?} targetBoundDirectivePropNames
     * @return {?}
     */
    _createDirectiveAsts(isTemplateElement, elementName, directives, props, elementOrDirectiveRefs, elementSourceSpan, targetReferences, targetBoundDirectivePropNames) {
        const /** @type {?} */ matchedReferences = new Set();
        let /** @type {?} */ component = ((null));
        const /** @type {?} */ directiveAsts = directives.map((directive) => {
            const /** @type {?} */ sourceSpan = new ParseSourceSpan(elementSourceSpan.start, elementSourceSpan.end, `Directive ${identifierName(directive.type)}`);
            if (directive.isComponent) {
                component = directive;
            }
            const /** @type {?} */ directiveProperties = [];
            let /** @type {?} */ hostProperties = ((this._bindingParser.createDirectiveHostPropertyAsts(directive, elementName, sourceSpan)));
            // Note: We need to check the host properties here as well,
            // as we don't know the element name in the DirectiveWrapperCompiler yet.
            hostProperties = this._checkPropertiesInSchema(elementName, hostProperties);
            const /** @type {?} */ hostEvents = ((this._bindingParser.createDirectiveHostEventAsts(directive, sourceSpan)));
            this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties, targetBoundDirectivePropNames);
            elementOrDirectiveRefs.forEach((elOrDirRef) => {
                if ((elOrDirRef.value.length === 0 && directive.isComponent) ||
                    (directive.exportAs == elOrDirRef.value)) {
                    targetReferences.push(new ReferenceAst(elOrDirRef.name, createTokenForReference(directive.type.reference), elOrDirRef.sourceSpan));
                    matchedReferences.add(elOrDirRef.name);
                }
            });
            const /** @type {?} */ contentQueryStartId = this.contentQueryStartId;
            this.contentQueryStartId += directive.queries.length;
            return new DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, contentQueryStartId, sourceSpan);
        });
        elementOrDirectiveRefs.forEach((elOrDirRef) => {
            if (elOrDirRef.value.length > 0) {
                if (!matchedReferences.has(elOrDirRef.name)) {
                    this._reportError(`There is no directive with "exportAs" set to "${elOrDirRef.value}"`, elOrDirRef.sourceSpan);
                }
            }
            else if (!component) {
                let /** @type {?} */ refToken = ((null));
                if (isTemplateElement) {
                    refToken = createTokenForExternalReference(this.reflector, Identifiers.TemplateRef);
                }
                targetReferences.push(new ReferenceAst(elOrDirRef.name, refToken, elOrDirRef.sourceSpan));
            }
        });
        return directiveAsts;
    }
    /**
     * @param {?} directiveProperties
     * @param {?} boundProps
     * @param {?} targetBoundDirectiveProps
     * @param {?} targetBoundDirectivePropNames
     * @return {?}
     */
    _createDirectivePropertyAsts(directiveProperties, boundProps, targetBoundDirectiveProps, targetBoundDirectivePropNames) {
        if (directiveProperties) {
            const /** @type {?} */ boundPropsByName = new Map();
            boundProps.forEach(boundProp => {
                const /** @type {?} */ prevValue = boundPropsByName.get(boundProp.name);
                if (!prevValue || prevValue.isLiteral) {
                    // give [a]="b" a higher precedence than a="b" on the same element
                    boundPropsByName.set(boundProp.name, boundProp);
                }
            });
            Object.keys(directiveProperties).forEach(dirProp => {
                const /** @type {?} */ elProp = directiveProperties[dirProp];
                const /** @type {?} */ boundProp = boundPropsByName.get(elProp);
                // Bindings are optional, so this binding only needs to be set up if an expression is given.
                if (boundProp) {
                    targetBoundDirectivePropNames.add(boundProp.name);
                    if (!isEmptyExpression(boundProp.expression)) {
                        targetBoundDirectiveProps.push(new BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceSpan));
                    }
                }
            });
        }
    }
    /**
     * @param {?} elementName
     * @param {?} props
     * @param {?} boundDirectivePropNames
     * @return {?}
     */
    _createElementPropertyAsts(elementName, props, boundDirectivePropNames) {
        const /** @type {?} */ boundElementProps = [];
        props.forEach((prop) => {
            if (!prop.isLiteral && !boundDirectivePropNames.has(prop.name)) {
                boundElementProps.push(this._bindingParser.createElementPropertyAst(elementName, prop));
            }
        });
        return this._checkPropertiesInSchema(elementName, boundElementProps);
    }
    /**
     * @param {?} directives
     * @return {?}
     */
    _findComponentDirectives(directives) {
        return directives.filter(directive => directive.directive.isComponent);
    }
    /**
     * @param {?} directives
     * @return {?}
     */
    _findComponentDirectiveNames(directives) {
        return this._findComponentDirectives(directives)
            .map(directive => ((identifierName(directive.directive.type))));
    }
    /**
     * @param {?} directives
     * @param {?} sourceSpan
     * @return {?}
     */
    _assertOnlyOneComponent(directives, sourceSpan) {
        const /** @type {?} */ componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 1) {
            this._reportError(`More than one component matched on this element.\n` +
                `Make sure that only one component's selector can match a given element.\n` +
                `Conflicting components: ${componentTypeNames.join(',')}`, sourceSpan);
        }
    }
    /**
     * Make sure that non-angular tags conform to the schemas.
     *
     * Note: An element is considered an angular tag when at least one directive selector matches the
     * tag name.
     *
     * @param {?} matchElement Whether any directive has matched on the tag name
     * @param {?} element the html element
     * @return {?}
     */
    _assertElementExists(matchElement, element) {
        const /** @type {?} */ elName = element.name.replace(/^:xhtml:/, '');
        if (!matchElement && !this._schemaRegistry.hasElement(elName, this._schemas)) {
            let /** @type {?} */ errorMsg = `'${elName}' is not a known element:\n`;
            errorMsg +=
                `1. If '${elName}' is an Angular component, then verify that it is part of this module.\n`;
            if (elName.indexOf('-') > -1) {
                errorMsg +=
                    `2. If '${elName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.`;
            }
            else {
                errorMsg +=
                    `2. To allow any element add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.`;
            }
            this._reportError(errorMsg, /** @type {?} */ ((element.sourceSpan)));
        }
    }
    /**
     * @param {?} directives
     * @param {?} elementProps
     * @param {?} sourceSpan
     * @return {?}
     */
    _assertNoComponentsNorElementBindingsOnTemplate(directives, elementProps, sourceSpan) {
        const /** @type {?} */ componentTypeNames = this._findComponentDirectiveNames(directives);
        if (componentTypeNames.length > 0) {
            this._reportError(`Components on an embedded template: ${componentTypeNames.join(',')}`, sourceSpan);
        }
        elementProps.forEach(prop => {
            this._reportError(`Property binding ${prop.name} not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the "@NgModule.declarations".`, sourceSpan);
        });
    }
    /**
     * @param {?} directives
     * @param {?} events
     * @return {?}
     */
    _assertAllEventsPublishedByDirectives(directives, events) {
        const /** @type {?} */ allDirectiveEvents = new Set();
        directives.forEach(directive => {
            Object.keys(directive.directive.outputs).forEach(k => {
                const /** @type {?} */ eventName = directive.directive.outputs[k];
                allDirectiveEvents.add(eventName);
            });
        });
        events.forEach(event => {
            if (event.target != null || !allDirectiveEvents.has(event.name)) {
                this._reportError(`Event binding ${event.fullName} not emitted by any directive on an embedded template. Make sure that the event name is spelled correctly and all directives are listed in the "@NgModule.declarations".`, event.sourceSpan);
            }
        });
    }
    /**
     * @param {?} elementName
     * @param {?} boundProps
     * @return {?}
     */
    _checkPropertiesInSchema(elementName, boundProps) {
        // Note: We can't filter out empty expressions before this method,
        // as we still want to validate them!
        return boundProps.filter((boundProp) => {
            if (boundProp.type === PropertyBindingType.Property &&
                !this._schemaRegistry.hasProperty(elementName, boundProp.name, this._schemas)) {
                let /** @type {?} */ errorMsg = `Can't bind to '${boundProp.name}' since it isn't a known property of '${elementName}'.`;
                if (elementName.startsWith('ng-')) {
                    errorMsg +=
                        `\n1. If '${boundProp.name}' is an Angular directive, then add 'CommonModule' to the '@NgModule.imports' of this component.` +
                            `\n2. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.`;
                }
                else if (elementName.indexOf('-') > -1) {
                    errorMsg +=
                        `\n1. If '${elementName}' is an Angular component and it has '${boundProp.name}' input, then verify that it is part of this module.` +
                            `\n2. If '${elementName}' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@NgModule.schemas' of this component to suppress this message.` +
                            `\n3. To allow any property add 'NO_ERRORS_SCHEMA' to the '@NgModule.schemas' of this component.`;
                }
                this._reportError(errorMsg, boundProp.sourceSpan);
            }
            return !isEmptyExpression(boundProp.value);
        });
    }
    /**
     * @param {?} message
     * @param {?} sourceSpan
     * @param {?=} level
     * @return {?}
     */
    _reportError(message, sourceSpan, level = ParseErrorLevel.ERROR) {
        this._targetErrors.push(new ParseError(sourceSpan, message, level));
    }
}
function TemplateParseVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    TemplateParseVisitor.prototype.selectorMatcher;
    /** @type {?} */
    TemplateParseVisitor.prototype.directivesIndex;
    /** @type {?} */
    TemplateParseVisitor.prototype.ngContentCount;
    /** @type {?} */
    TemplateParseVisitor.prototype.contentQueryStartId;
    /** @type {?} */
    TemplateParseVisitor.prototype.reflector;
    /** @type {?} */
    TemplateParseVisitor.prototype.config;
    /** @type {?} */
    TemplateParseVisitor.prototype.providerViewContext;
    /** @type {?} */
    TemplateParseVisitor.prototype._bindingParser;
    /** @type {?} */
    TemplateParseVisitor.prototype._schemaRegistry;
    /** @type {?} */
    TemplateParseVisitor.prototype._schemas;
    /** @type {?} */
    TemplateParseVisitor.prototype._targetErrors;
}
class NonBindableVisitor {
    /**
     * @param {?} ast
     * @param {?} parent
     * @return {?}
     */
    visitElement(ast, parent) {
        const /** @type {?} */ preparsedElement = preparseElement(ast);
        if (preparsedElement.type === PreparsedElementType.SCRIPT ||
            preparsedElement.type === PreparsedElementType.STYLE ||
            preparsedElement.type === PreparsedElementType.STYLESHEET) {
            // Skipping <script> for security reasons
            // Skipping <style> and stylesheets as we already processed them
            // in the StyleCompiler
            return null;
        }
        const /** @type {?} */ attrNameAndValues = ast.attrs.map((attr) => [attr.name, attr.value]);
        const /** @type {?} */ selector = createElementCssSelector(ast.name, attrNameAndValues);
        const /** @type {?} */ ngContentIndex = parent.findNgContentIndex(selector);
        const /** @type {?} */ children = html.visitAll(this, ast.children, EMPTY_ELEMENT_CONTEXT);
        return new ElementAst(ast.name, html.visitAll(this, ast.attrs), [], [], [], [], [], false, [], children, ngContentIndex, ast.sourceSpan, ast.endSourceSpan);
    }
    /**
     * @param {?} comment
     * @param {?} context
     * @return {?}
     */
    visitComment(comment, context) { return null; }
    /**
     * @param {?} attribute
     * @param {?} context
     * @return {?}
     */
    visitAttribute(attribute, context) {
        return new AttrAst(attribute.name, attribute.value, attribute.sourceSpan);
    }
    /**
     * @param {?} text
     * @param {?} parent
     * @return {?}
     */
    visitText(text, parent) {
        const /** @type {?} */ ngContentIndex = ((parent.findNgContentIndex(TEXT_CSS_SELECTOR)));
        return new TextAst(text.value, ngContentIndex, /** @type {?} */ ((text.sourceSpan)));
    }
    /**
     * @param {?} expansion
     * @param {?} context
     * @return {?}
     */
    visitExpansion(expansion, context) { return expansion; }
    /**
     * @param {?} expansionCase
     * @param {?} context
     * @return {?}
     */
    visitExpansionCase(expansionCase, context) { return expansionCase; }
}
class ElementOrDirectiveRef {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?} sourceSpan
     */
    constructor(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
}
function ElementOrDirectiveRef_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementOrDirectiveRef.prototype.name;
    /** @type {?} */
    ElementOrDirectiveRef.prototype.value;
    /** @type {?} */
    ElementOrDirectiveRef.prototype.sourceSpan;
}
/**
 * @param {?} classAttrValue
 * @return {?}
 */
export function splitClasses(classAttrValue) {
    return classAttrValue.trim().split(/\s+/g);
}
class ElementContext {
    /**
     * @param {?} isTemplateElement
     * @param {?} _ngContentIndexMatcher
     * @param {?} _wildcardNgContentIndex
     * @param {?} providerContext
     */
    constructor(isTemplateElement, _ngContentIndexMatcher, _wildcardNgContentIndex, providerContext) {
        this.isTemplateElement = isTemplateElement;
        this._ngContentIndexMatcher = _ngContentIndexMatcher;
        this._wildcardNgContentIndex = _wildcardNgContentIndex;
        this.providerContext = providerContext;
    }
    /**
     * @param {?} isTemplateElement
     * @param {?} directives
     * @param {?} providerContext
     * @return {?}
     */
    static create(isTemplateElement, directives, providerContext) {
        const /** @type {?} */ matcher = new SelectorMatcher();
        let /** @type {?} */ wildcardNgContentIndex = ((null));
        const /** @type {?} */ component = directives.find(directive => directive.directive.isComponent);
        if (component) {
            const /** @type {?} */ ngContentSelectors = ((component.directive.template)).ngContentSelectors;
            for (let /** @type {?} */ i = 0; i < ngContentSelectors.length; i++) {
                const /** @type {?} */ selector = ngContentSelectors[i];
                if (selector === '*') {
                    wildcardNgContentIndex = i;
                }
                else {
                    matcher.addSelectables(CssSelector.parse(ngContentSelectors[i]), i);
                }
            }
        }
        return new ElementContext(isTemplateElement, matcher, wildcardNgContentIndex, providerContext);
    }
    /**
     * @param {?} selector
     * @return {?}
     */
    findNgContentIndex(selector) {
        const /** @type {?} */ ngContentIndices = [];
        this._ngContentIndexMatcher.match(selector, (selector, ngContentIndex) => { ngContentIndices.push(ngContentIndex); });
        ngContentIndices.sort();
        if (this._wildcardNgContentIndex != null) {
            ngContentIndices.push(this._wildcardNgContentIndex);
        }
        return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
    }
}
function ElementContext_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementContext.prototype.isTemplateElement;
    /** @type {?} */
    ElementContext.prototype._ngContentIndexMatcher;
    /** @type {?} */
    ElementContext.prototype._wildcardNgContentIndex;
    /** @type {?} */
    ElementContext.prototype.providerContext;
}
/**
 * @param {?} elementName
 * @param {?} attributes
 * @return {?}
 */
export function createElementCssSelector(elementName, attributes) {
    const /** @type {?} */ cssSelector = new CssSelector();
    const /** @type {?} */ elNameNoNs = splitNsName(elementName)[1];
    cssSelector.setElement(elNameNoNs);
    for (let /** @type {?} */ i = 0; i < attributes.length; i++) {
        const /** @type {?} */ attrName = attributes[i][0];
        const /** @type {?} */ attrNameNoNs = splitNsName(attrName)[1];
        const /** @type {?} */ attrValue = attributes[i][1];
        cssSelector.addAttribute(attrNameNoNs, attrValue);
        if (attrName.toLowerCase() == CLASS_ATTR) {
            const /** @type {?} */ classes = splitClasses(attrValue);
            classes.forEach(className => cssSelector.addClassName(className));
        }
    }
    return cssSelector;
}
const /** @type {?} */ EMPTY_ELEMENT_CONTEXT = new ElementContext(true, new SelectorMatcher(), null, null);
const /** @type {?} */ NON_BINDABLE_VISITOR = new NonBindableVisitor();
/**
 * @param {?} node
 * @return {?}
 */
function _isEmptyTextNode(node) {
    return node instanceof html.Text && node.value.trim().length == 0;
}
/**
 * @template T
 * @param {?} items
 * @return {?}
 */
export function removeSummaryDuplicates(items) {
    const /** @type {?} */ map = new Map();
    items.forEach((item) => {
        if (!map.get(item.type.reference)) {
            map.set(item.type.reference, item);
        }
    });
    return Array.from(map.values());
}
/**
 * @param {?} ast
 * @return {?}
 */
function isEmptyExpression(ast) {
    if (ast instanceof ASTWithSource) {
        ast = ast.ast;
    }
    return ast instanceof EmptyExpr;
}
/**
 * @param {?} el
 * @param {?} enableLegacyTemplate
 * @param {?} reportDeprecation
 * @return {?}
 */
function isTemplate(el, enableLegacyTemplate, reportDeprecation) {
    if (isNgTemplate(el.name))
        return true;
    const /** @type {?} */ tagNoNs = splitNsName(el.name)[1];
    // `<template>` is HTML and case insensitive
    if (tagNoNs.toLowerCase() === TEMPLATE_ELEMENT) {
        if (enableLegacyTemplate && tagNoNs.toLowerCase() === TEMPLATE_ELEMENT) {
            reportDeprecation(TEMPLATE_ELEMENT_DEPRECATION_WARNING, /** @type {?} */ ((el.sourceSpan)));
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=template_parser.js.map