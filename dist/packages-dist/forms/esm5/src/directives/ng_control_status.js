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
import { Directive, Self } from '@angular/core';
import { ControlContainer } from './control_container';
import { NgControl } from './ng_control';
var AbstractControlStatus = (function () {
    /**
     * @param {?} cd
     */
    function AbstractControlStatus(cd) {
        this._cd = cd;
    }
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassUntouched", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.untouched : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassTouched", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.touched : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassPristine", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.pristine : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassDirty", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.dirty : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassValid", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.valid : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassInvalid", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.invalid : false; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AbstractControlStatus.prototype, "ngClassPending", {
        /**
         * @return {?}
         */
        get: function () { return this._cd.control ? this._cd.control.pending : false; },
        enumerable: true,
        configurable: true
    });
    return AbstractControlStatus;
}());
export { AbstractControlStatus };
function AbstractControlStatus_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractControlStatus.prototype._cd;
}
export var /** @type {?} */ ngControlStatusHost = {
    '[class.ng-untouched]': 'ngClassUntouched',
    '[class.ng-touched]': 'ngClassTouched',
    '[class.ng-pristine]': 'ngClassPristine',
    '[class.ng-dirty]': 'ngClassDirty',
    '[class.ng-valid]': 'ngClassValid',
    '[class.ng-invalid]': 'ngClassInvalid',
    '[class.ng-pending]': 'ngClassPending',
};
/**
 * Directive automatically applied to Angular form controls that sets CSS classes
 * based on control status. The following classes are applied as the properties
 * become true:
 *
 * * ng-valid
 * * ng-invalid
 * * ng-pending
 * * ng-pristine
 * * ng-dirty
 * * ng-untouched
 * * ng-touched
 *
 * \@stable
 */
var NgControlStatus = (function (_super) {
    tslib_1.__extends(NgControlStatus, _super);
    /**
     * @param {?} cd
     */
    function NgControlStatus(cd) {
        return _super.call(this, cd) || this;
    }
    return NgControlStatus;
}(AbstractControlStatus));
export { NgControlStatus };
NgControlStatus.decorators = [
    { type: Directive, args: [{ selector: '[formControlName],[ngModel],[formControl]', host: ngControlStatusHost },] },
];
/** @nocollapse */
NgControlStatus.ctorParameters = function () { return [
    { type: NgControl, decorators: [{ type: Self },] },
]; };
function NgControlStatus_tsickle_Closure_declarations() {
    /** @type {?} */
    NgControlStatus.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgControlStatus.ctorParameters;
}
/**
 * Directive automatically applied to Angular form groups that sets CSS classes
 * based on control status (valid/invalid/dirty/etc).
 *
 * \@stable
 */
var NgControlStatusGroup = (function (_super) {
    tslib_1.__extends(NgControlStatusGroup, _super);
    /**
     * @param {?} cd
     */
    function NgControlStatusGroup(cd) {
        return _super.call(this, cd) || this;
    }
    return NgControlStatusGroup;
}(AbstractControlStatus));
export { NgControlStatusGroup };
NgControlStatusGroup.decorators = [
    { type: Directive, args: [{
                selector: '[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]',
                host: ngControlStatusHost
            },] },
];
/** @nocollapse */
NgControlStatusGroup.ctorParameters = function () { return [
    { type: ControlContainer, decorators: [{ type: Self },] },
]; };
function NgControlStatusGroup_tsickle_Closure_declarations() {
    /** @type {?} */
    NgControlStatusGroup.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    NgControlStatusGroup.ctorParameters;
}
//# sourceMappingURL=ng_control_status.js.map