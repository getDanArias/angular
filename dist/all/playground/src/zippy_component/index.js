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
var platform_browser_1 = require("@angular/platform-browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var zippy_1 = require("./app/zippy");
var ZippyApp = (function () {
    function ZippyApp() {
        this.logs = [];
    }
    ZippyApp.prototype.pushLog = function (log) { this.logs.push(log); };
    return ZippyApp;
}());
ZippyApp = __decorate([
    core_1.Component({
        selector: 'zippy-app',
        template: "\n    <zippy (open)=\"pushLog('open')\" (close)=\"pushLog('close')\" title=\"Details\">\n      This is some content.\n    </zippy>\n    <ul>\n      <li *ngFor=\"let  log of logs\">{{log}}</li>\n    </ul>\n  "
    })
], ZippyApp);
var ExampleModule = (function () {
    function ExampleModule() {
    }
    return ExampleModule;
}());
ExampleModule = __decorate([
    core_1.NgModule({ declarations: [ZippyApp, zippy_1.Zippy], bootstrap: [ZippyApp], imports: [platform_browser_1.BrowserModule] })
], ExampleModule);
function main() {
    platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(ExampleModule);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3ppcHB5X2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7OztBQUVILHNDQUFrRDtBQUNsRCw4REFBd0Q7QUFDeEQsOEVBQXlFO0FBRXpFLHFDQUFrQztBQWFsQyxJQUFNLFFBQVE7SUFYZDtRQVlFLFNBQUksR0FBYSxFQUFFLENBQUM7SUFHdEIsQ0FBQztJQURDLDBCQUFPLEdBQVAsVUFBUSxHQUFXLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLGVBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpLLFFBQVE7SUFYYixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLGlOQU9UO0tBQ0YsQ0FBQztHQUNJLFFBQVEsQ0FJYjtBQUdELElBQU0sYUFBYTtJQUFuQjtJQUNBLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFERCxJQUNDO0FBREssYUFBYTtJQURsQixlQUFRLENBQUMsRUFBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsYUFBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsZ0NBQWEsQ0FBQyxFQUFDLENBQUM7R0FDdkYsYUFBYSxDQUNsQjtBQUVEO0lBQ0UsaURBQXNCLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUZELG9CQUVDIn0=