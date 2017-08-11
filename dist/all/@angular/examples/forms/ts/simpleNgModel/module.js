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
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var simple_ng_model_example_1 = require("./simple_ng_model_example");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule],
        declarations: [simple_ng_model_example_1.SimpleNgModelComp],
        bootstrap: [simple_ng_model_example_1.SimpleNgModelComp]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvZXhhbXBsZXMvZm9ybXMvdHMvc2ltcGxlTmdNb2RlbC9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7QUFFSCxzQ0FBdUM7QUFDdkMsd0NBQTJDO0FBQzNDLDhEQUF3RDtBQUN4RCxxRUFBNEQ7QUFPNUQsSUFBYSxTQUFTO0lBQXRCO0lBQ0EsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQURELElBQ0M7QUFEWSxTQUFTO0lBTHJCLGVBQVEsQ0FBQztRQUNSLE9BQU8sRUFBRSxDQUFDLGdDQUFhLEVBQUUsbUJBQVcsQ0FBQztRQUNyQyxZQUFZLEVBQUUsQ0FBQywyQ0FBaUIsQ0FBQztRQUNqQyxTQUFTLEVBQUUsQ0FBQywyQ0FBaUIsQ0FBQztLQUMvQixDQUFDO0dBQ1csU0FBUyxDQUNyQjtBQURZLDhCQUFTIn0=