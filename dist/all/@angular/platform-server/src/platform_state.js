"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
var parse5 = require('parse5');
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
/**
 * Representation of the current platform state.
 *
 * @experimental
 */
var PlatformState = (function () {
    function PlatformState(_doc) {
        this._doc = _doc;
    }
    /**
     * Renders the current state of the platform to string.
     */
    PlatformState.prototype.renderToString = function () { return platform_browser_1.ɵgetDOM().getInnerHTML(this._doc); };
    /**
     * Returns the current DOM state.
     */
    PlatformState.prototype.getDocument = function () { return this._doc; };
    return PlatformState;
}());
PlatformState = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], PlatformState);
exports.PlatformState = PlatformState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1zZXJ2ZXIvc3JjL3BsYXRmb3JtX3N0YXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7O0FBRUgsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLHNDQUFpRDtBQUNqRCw4REFBc0U7QUFFdEU7Ozs7R0FJRztBQUVILElBQWEsYUFBYTtJQUN4Qix1QkFBc0MsSUFBUztRQUFULFNBQUksR0FBSixJQUFJLENBQUs7SUFBRyxDQUFDO0lBRW5EOztPQUVHO0lBQ0gsc0NBQWMsR0FBZCxjQUEyQixNQUFNLENBQUMsMEJBQU0sRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXJFOztPQUVHO0lBQ0gsbUNBQVcsR0FBWCxjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUMsb0JBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGFBQWE7SUFEekIsaUJBQVUsRUFBRTtJQUVFLFdBQUEsYUFBTSxDQUFDLDJCQUFRLENBQUMsQ0FBQTs7R0FEbEIsYUFBYSxDQVl6QjtBQVpZLHNDQUFhIn0=