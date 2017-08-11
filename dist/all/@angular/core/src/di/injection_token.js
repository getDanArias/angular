"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Creates a token that can be used in a DI Provider.
 *
 * ### Example ([live demo](http://plnkr.co/edit/Ys9ezXpj2Mnoy3Uc8KBp?p=preview))
 *
 * ```typescript
 * var t = new OpaqueToken("value");
 *
 * var injector = Injector.resolveAndCreate([
 *   {provide: t, useValue: "bindingValue"}
 * ]);
 *
 * expect(injector.get(t)).toEqual("bindingValue");
 * ```
 *
 * Using an `OpaqueToken` is preferable to using strings as tokens because of possible collisions
 * caused by multiple providers using the same string as two different tokens.
 *
 * Using an `OpaqueToken` is preferable to using an `Object` as tokens because it provides better
 * error messages.
 * @deprecated since v4.0.0 because it does not support type information, use `InjectionToken<?>`
 * instead.
 */
var OpaqueToken = (function () {
    function OpaqueToken(_desc) {
        this._desc = _desc;
    }
    OpaqueToken.prototype.toString = function () { return "Token " + this._desc; };
    return OpaqueToken;
}());
exports.OpaqueToken = OpaqueToken;
/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parametrized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * ### Example
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * @stable
 */
var InjectionToken = (function (_super) {
    __extends(InjectionToken, _super);
    function InjectionToken(desc) {
        return _super.call(this, desc) || this;
    }
    InjectionToken.prototype.toString = function () { return "InjectionToken " + this._desc; };
    return InjectionToken;
}(OpaqueToken));
exports.InjectionToken = InjectionToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uX3Rva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zcmMvZGkvaW5qZWN0aW9uX3Rva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztBQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0g7SUFDRSxxQkFBc0IsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7SUFBRyxDQUFDO0lBRXZDLDhCQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLFdBQVMsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUM7SUFDdEQsa0JBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLGtDQUFXO0FBTXhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSDtJQUF1QyxrQ0FBVztJQUloRCx3QkFBWSxJQUFZO2VBQUksa0JBQU0sSUFBSSxDQUFDO0lBQUUsQ0FBQztJQUUxQyxpQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxvQkFBa0IsSUFBSSxDQUFDLEtBQU8sQ0FBQyxDQUFDLENBQUM7SUFDL0QscUJBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBdUMsV0FBVyxHQU9qRDtBQVBZLHdDQUFjIn0=