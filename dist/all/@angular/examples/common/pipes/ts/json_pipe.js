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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// #docregion JsonPipe
var JsonPipeComponent = (function () {
    function JsonPipeComponent() {
        this.object = { foo: 'bar', baz: 'qux', nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] } };
    }
    return JsonPipeComponent;
}());
JsonPipeComponent = __decorate([
    core_1.Component({
        selector: 'json-pipe',
        template: "<div>\n    <p>Without JSON pipe:</p>\n    <pre>{{object}}</pre>\n    <p>With JSON pipe:</p>\n    <pre>{{object | json}}</pre>\n  </div>"
    })
], JsonPipeComponent);
exports.JsonPipeComponent = JsonPipeComponent;
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZXhhbXBsZXMvY29tbW9uL3BpcGVzL3RzL2pzb25fcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7OztBQUVILHNDQUF3QztBQUV4QyxzQkFBc0I7QUFVdEIsSUFBYSxpQkFBaUI7SUFUOUI7UUFVRSxXQUFNLEdBQVcsRUFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBQyxDQUFDO0lBQ3hGLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksaUJBQWlCO0lBVDdCLGdCQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUseUlBS0g7S0FDUixDQUFDO0dBQ1csaUJBQWlCLENBRTdCO0FBRlksOENBQWlCO0FBRzlCLGdCQUFnQiJ9