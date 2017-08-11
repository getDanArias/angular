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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var JsonpCmp = (function () {
    function JsonpCmp(jsonp) {
        var _this = this;
        jsonp.get('./people.json?callback=JSONP_CALLBACK').subscribe(function (res) { return _this.people = res.json(); });
    }
    return JsonpCmp;
}());
JsonpCmp = __decorate([
    core_1.Component({
        selector: 'jsonp-app',
        template: "\n    <h1>people</h1>\n    <ul class=\"people\">\n      <li *ngFor=\"let person of people\">\n        hello, {{person['name']}}\n      </li>\n    </ul>\n  "
    }),
    __metadata("design:paramtypes", [http_1.Jsonp])
], JsonpCmp);
exports.JsonpCmp = JsonpCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfY29tcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9zcmMvanNvbnAvYXBwL2pzb25wX2NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7QUFFSCxzQ0FBd0M7QUFDeEMsc0NBQW9DO0FBYXBDLElBQWEsUUFBUTtJQUVuQixrQkFBWSxLQUFZO1FBQXhCLGlCQUVDO1FBREMsS0FBSyxDQUFDLEdBQUcsQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxFQUF4QixDQUF3QixDQUFDLENBQUM7SUFDaEcsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLFFBQVE7SUFYcEIsZ0JBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSw2SkFPVDtLQUNGLENBQUM7cUNBR21CLFlBQUs7R0FGYixRQUFRLENBS3BCO0FBTFksNEJBQVEifQ==