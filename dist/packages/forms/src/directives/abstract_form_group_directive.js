/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ControlContainer } from './control_container';
import { composeAsyncValidators, composeValidators, controlPath } from './shared';
/**
 * This is a base class for code shared between {\@link NgModelGroup} and {\@link FormGroupName}.
 *
 * \@stable
 */
export class AbstractFormGroupDirective extends ControlContainer {
    /**
     * @return {?}
     */
    ngOnInit() {
        this._checkParentType(); /** @type {?} */
        ((this.formDirective)).addFormGroup(this);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.formDirective) {
            this.formDirective.removeFormGroup(this);
        }
    }
    /**
     * Get the {\@link FormGroup} backing this binding.
     * @return {?}
     */
    get control() { return ((this.formDirective)).getFormGroup(this); }
    /**
     * Get the path to this control group.
     * @return {?}
     */
    get path() { return controlPath(this.name, this._parent); }
    /**
     * Get the {\@link Form} to which this group belongs.
     * @return {?}
     */
    get formDirective() { return this._parent ? this._parent.formDirective : null; }
    /**
     * @return {?}
     */
    get validator() { return composeValidators(this._validators); }
    /**
     * @return {?}
     */
    get asyncValidator() {
        return composeAsyncValidators(this._asyncValidators);
    }
    /**
     * \@internal
     * @return {?}
     */
    _checkParentType() { }
}
function AbstractFormGroupDirective_tsickle_Closure_declarations() {
    /**
     * \@internal
     * @type {?}
     */
    AbstractFormGroupDirective.prototype._parent;
    /**
     * \@internal
     * @type {?}
     */
    AbstractFormGroupDirective.prototype._validators;
    /**
     * \@internal
     * @type {?}
     */
    AbstractFormGroupDirective.prototype._asyncValidators;
}
//# sourceMappingURL=abstract_form_group_directive.js.map