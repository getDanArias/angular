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
/* tslint:disable:no-console  */
// #docregion Component
var core_1 = require("@angular/core");
var NgModelGroupComp = (function () {
    function NgModelGroupComp() {
        this.name = { first: 'Nancy', last: 'Drew' };
    }
    NgModelGroupComp.prototype.onSubmit = function (f) {
        console.log(f.value); // {name: {first: 'Nancy', last: 'Drew'}, email: ''}
        console.log(f.valid); // true
    };
    NgModelGroupComp.prototype.setValue = function () { this.name = { first: 'Bess', last: 'Marvin' }; };
    return NgModelGroupComp;
}());
NgModelGroupComp = __decorate([
    core_1.Component({
        selector: 'example-app',
        template: "\n    <form #f=\"ngForm\" (ngSubmit)=\"onSubmit(f)\">\n      <p *ngIf=\"nameCtrl.invalid\">Name is invalid.</p>\n    \n      <div ngModelGroup=\"name\" #nameCtrl=\"ngModelGroup\">\n        <input name=\"first\" [ngModel]=\"name.first\" minlength=\"2\">\n        <input name=\"last\" [ngModel]=\"name.last\" required>\n      </div>\n      \n      <input name=\"email\" ngModel> \n      <button>Submit</button>\n    </form>\n    \n    <button (click)=\"setValue()\">Set value</button>\n  ",
    })
], NgModelGroupComp);
exports.NgModelGroupComp = NgModelGroupComp;
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kZWxfZ3JvdXBfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2V4YW1wbGVzL2Zvcm1zL3RzL25nTW9kZWxHcm91cC9uZ19tb2RlbF9ncm91cF9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7O0FBRUgsZ0NBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2QixzQ0FBd0M7QUFxQnhDLElBQWEsZ0JBQWdCO0lBbEI3QjtRQW1CRSxTQUFJLEdBQUcsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQztJQVF4QyxDQUFDO0lBTkMsbUNBQVEsR0FBUixVQUFTLENBQVM7UUFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxvREFBb0Q7UUFDM0UsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxPQUFPO0lBQ2hDLENBQUM7SUFFRCxtQ0FBUSxHQUFSLGNBQWEsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCx1QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksZ0JBQWdCO0lBbEI1QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFLHdlQWNUO0tBQ0YsQ0FBQztHQUNXLGdCQUFnQixDQVM1QjtBQVRZLDRDQUFnQjtBQVU3QixnQkFBZ0IifQ==