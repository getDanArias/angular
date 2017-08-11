/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { SecurityContext } from '@angular/core';
var MockSchemaRegistry = (function () {
    /**
     * @param {?} existingProperties
     * @param {?} attrPropMapping
     * @param {?} existingElements
     * @param {?} invalidProperties
     * @param {?} invalidAttributes
     */
    function MockSchemaRegistry(existingProperties, attrPropMapping, existingElements, invalidProperties, invalidAttributes) {
        this.existingProperties = existingProperties;
        this.attrPropMapping = attrPropMapping;
        this.existingElements = existingElements;
        this.invalidProperties = invalidProperties;
        this.invalidAttributes = invalidAttributes;
    }
    /**
     * @param {?} tagName
     * @param {?} property
     * @param {?} schemas
     * @return {?}
     */
    MockSchemaRegistry.prototype.hasProperty = function (tagName, property, schemas) {
        var /** @type {?} */ value = this.existingProperties[property];
        return value === void 0 ? true : value;
    };
    /**
     * @param {?} tagName
     * @param {?} schemaMetas
     * @return {?}
     */
    MockSchemaRegistry.prototype.hasElement = function (tagName, schemaMetas) {
        var /** @type {?} */ value = this.existingElements[tagName.toLowerCase()];
        return value === void 0 ? true : value;
    };
    /**
     * @return {?}
     */
    MockSchemaRegistry.prototype.allKnownElementNames = function () { return Object.keys(this.existingElements); };
    /**
     * @param {?} selector
     * @param {?} property
     * @param {?} isAttribute
     * @return {?}
     */
    MockSchemaRegistry.prototype.securityContext = function (selector, property, isAttribute) {
        return SecurityContext.NONE;
    };
    /**
     * @param {?} attrName
     * @return {?}
     */
    MockSchemaRegistry.prototype.getMappedPropName = function (attrName) { return this.attrPropMapping[attrName] || attrName; };
    /**
     * @return {?}
     */
    MockSchemaRegistry.prototype.getDefaultComponentElementName = function () { return 'ng-component'; };
    /**
     * @param {?} name
     * @return {?}
     */
    MockSchemaRegistry.prototype.validateProperty = function (name) {
        if (this.invalidProperties.indexOf(name) > -1) {
            return { error: true, msg: "Binding to property '" + name + "' is disallowed for security reasons" };
        }
        else {
            return { error: false };
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    MockSchemaRegistry.prototype.validateAttribute = function (name) {
        if (this.invalidAttributes.indexOf(name) > -1) {
            return {
                error: true,
                msg: "Binding to attribute '" + name + "' is disallowed for security reasons"
            };
        }
        else {
            return { error: false };
        }
    };
    /**
     * @param {?} propName
     * @return {?}
     */
    MockSchemaRegistry.prototype.normalizeAnimationStyleProperty = function (propName) { return propName; };
    /**
     * @param {?} camelCaseProp
     * @param {?} userProvidedProp
     * @param {?} val
     * @return {?}
     */
    MockSchemaRegistry.prototype.normalizeAnimationStyleValue = function (camelCaseProp, userProvidedProp, val) {
        return { error: /** @type {?} */ ((null)), value: val.toString() };
    };
    return MockSchemaRegistry;
}());
export { MockSchemaRegistry };
function MockSchemaRegistry_tsickle_Closure_declarations() {
    /** @type {?} */
    MockSchemaRegistry.prototype.existingProperties;
    /** @type {?} */
    MockSchemaRegistry.prototype.attrPropMapping;
    /** @type {?} */
    MockSchemaRegistry.prototype.existingElements;
    /** @type {?} */
    MockSchemaRegistry.prototype.invalidProperties;
    /** @type {?} */
    MockSchemaRegistry.prototype.invalidAttributes;
}
//# sourceMappingURL=schema_registry_mock.js.map