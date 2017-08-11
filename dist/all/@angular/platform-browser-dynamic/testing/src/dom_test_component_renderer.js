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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
/**
 * A DOM based implementation of the TestComponentRenderer.
 */
var DOMTestComponentRenderer = (function (_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc /** TODO #9100 */) {
        var _this = _super.call(this) || this;
        _this._doc = _doc; /** TODO #9100 */
        return _this;
    }
    DOMTestComponentRenderer.prototype.insertRootElement = function (rootElId) {
        var rootEl = platform_browser_1.ɵgetDOM().firstChild(platform_browser_1.ɵgetDOM().content(platform_browser_1.ɵgetDOM().createTemplate("<div id=\"" + rootElId + "\"></div>")));
        // TODO(juliemr): can/should this be optional?
        var oldRoots = platform_browser_1.ɵgetDOM().querySelectorAll(this._doc, '[id^=root]');
        for (var i = 0; i < oldRoots.length; i++) {
            platform_browser_1.ɵgetDOM().remove(oldRoots[i]);
        }
        platform_browser_1.ɵgetDOM().appendChild(this._doc.body, rootEl);
    };
    return DOMTestComponentRenderer;
}(testing_1.TestComponentRenderer));
DOMTestComponentRenderer = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], DOMTestComponentRenderer);
exports.DOMTestComponentRenderer = DOMTestComponentRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Rlc3RfY29tcG9uZW50X3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3Rpbmcvc3JjL2RvbV90ZXN0X2NvbXBvbmVudF9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCxzQ0FBaUQ7QUFDakQsaURBQTREO0FBQzVELDhEQUFzRTtBQUV0RTs7R0FFRztBQUVILElBQWEsd0JBQXdCO0lBQVMsNENBQXFCO0lBQ2pFLGtDQUFzQyxJQUFTLENBQUMsaUJBQWlCO1FBQWpFLFlBQXFFLGlCQUFPLFNBQUc7UUFBekMsVUFBSSxHQUFKLElBQUksQ0FBSyxDQUFDLGlCQUFpQjs7SUFBYSxDQUFDO0lBRS9FLG9EQUFpQixHQUFqQixVQUFrQixRQUFnQjtRQUNoQyxJQUFNLE1BQU0sR0FBZ0IsMEJBQU0sRUFBRSxDQUFDLFVBQVUsQ0FDM0MsMEJBQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLGVBQVksUUFBUSxjQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0UsOENBQThDO1FBQzlDLElBQU0sUUFBUSxHQUFHLDBCQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3BFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLDBCQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELDBCQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILCtCQUFDO0FBQUQsQ0FBQyxBQWRELENBQThDLCtCQUFxQixHQWNsRTtBQWRZLHdCQUF3QjtJQURwQyxpQkFBVSxFQUFFO0lBRUUsV0FBQSxhQUFNLENBQUMsMkJBQVEsQ0FBQyxDQUFBOztHQURsQix3QkFBd0IsQ0FjcEM7QUFkWSw0REFBd0IifQ==