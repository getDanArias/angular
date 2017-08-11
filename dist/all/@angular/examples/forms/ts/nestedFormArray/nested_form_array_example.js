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
var forms_1 = require("@angular/forms");
var NestedFormArray = (function () {
    function NestedFormArray() {
        this.form = new forms_1.FormGroup({
            cities: new forms_1.FormArray([
                new forms_1.FormControl('SF'),
                new forms_1.FormControl('NY'),
            ]),
        });
    }
    Object.defineProperty(NestedFormArray.prototype, "cities", {
        get: function () { return this.form.get('cities'); },
        enumerable: true,
        configurable: true
    });
    NestedFormArray.prototype.addCity = function () { this.cities.push(new forms_1.FormControl()); };
    NestedFormArray.prototype.onSubmit = function () {
        console.log(this.cities.value); // ['SF', 'NY']
        console.log(this.form.value); // { cities: ['SF', 'NY'] }
    };
    NestedFormArray.prototype.setPreset = function () { this.cities.patchValue(['LA', 'MTV']); };
    return NestedFormArray;
}());
NestedFormArray = __decorate([
    core_1.Component({
        selector: 'example-app',
        template: "\n    <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n      <div formArrayName=\"cities\">\n        <div *ngFor=\"let city of cities.controls; index as i\">\n          <input [formControlName]=\"i\" placeholder=\"City\">\n        </div>\n      </div>\n      <button>Submit</button>\n    </form>\n    \n    <button (click)=\"addCity()\">Add City</button>\n    <button (click)=\"setPreset()\">Set preset</button>\n  ",
    })
], NestedFormArray);
exports.NestedFormArray = NestedFormArray;
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmVzdGVkX2Zvcm1fYXJyYXlfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2V4YW1wbGVzL2Zvcm1zL3RzL25lc3RlZEZvcm1BcnJheS9uZXN0ZWRfZm9ybV9hcnJheV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7O0FBRUgsZ0NBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2QixzQ0FBd0M7QUFDeEMsd0NBQWlFO0FBa0JqRSxJQUFhLGVBQWU7SUFoQjVCO1FBaUJFLFNBQUksR0FBRyxJQUFJLGlCQUFTLENBQUM7WUFDbkIsTUFBTSxFQUFFLElBQUksaUJBQVMsQ0FBQztnQkFDcEIsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQztnQkFDckIsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQzthQUN0QixDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBWUwsQ0FBQztJQVZDLHNCQUFJLG1DQUFNO2FBQVYsY0FBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBYyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFeEUsaUNBQU8sR0FBUCxjQUFZLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksbUJBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxELGtDQUFRLEdBQVI7UUFDRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBRSxlQUFlO1FBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFJLDJCQUEyQjtJQUM5RCxDQUFDO0lBRUQsbUNBQVMsR0FBVCxjQUFjLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELHNCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxlQUFlO0lBaEIzQixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFLHVhQVlUO0tBQ0YsQ0FBQztHQUNXLGVBQWUsQ0FrQjNCO0FBbEJZLDBDQUFlO0FBbUI1QixnQkFBZ0IifQ==