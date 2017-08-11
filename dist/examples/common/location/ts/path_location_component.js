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
// #docregion LocationComponent
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
let PathLocationComponent = class PathLocationComponent {
    constructor(location) { this.location = location; }
};
PathLocationComponent = __decorate([
    core_1.Component({
        selector: 'path-location',
        providers: [common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }],
        template: `
    <h1>PathLocationStrategy</h1>
    Current URL is: <code>{{location.path()}}</code><br>
    Normalize: <code>/foo/bar/</code> is: <code>{{location.normalize('foo/bar')}}</code><br>
  `
    })
], PathLocationComponent);
exports.PathLocationComponent = PathLocationComponent;
// #enddocregion
//# sourceMappingURL=path_location_component.js.map