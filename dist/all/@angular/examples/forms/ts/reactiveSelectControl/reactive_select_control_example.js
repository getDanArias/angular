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
// #docregion Component
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ReactiveSelectComp = (function () {
    function ReactiveSelectComp() {
        this.states = [
            { name: 'Arizona', abbrev: 'AZ' },
            { name: 'California', abbrev: 'CA' },
            { name: 'Colorado', abbrev: 'CO' },
            { name: 'New York', abbrev: 'NY' },
            { name: 'Pennsylvania', abbrev: 'PA' },
        ];
        this.form = new forms_1.FormGroup({
            state: new forms_1.FormControl(this.states[3]),
        });
    }
    return ReactiveSelectComp;
}());
ReactiveSelectComp = __decorate([
    core_1.Component({
        selector: 'example-app',
        template: "\n    <form [formGroup]=\"form\">\n      <select formControlName=\"state\">\n        <option *ngFor=\"let state of states\" [ngValue]=\"state\">\n          {{ state.abbrev }}\n        </option>\n      </select>\n    </form>\n    \n     <p>Form value: {{ form.value | json }}</p> \n     <!-- {state: {name: 'New York', abbrev: 'NY'} } -->\n  ",
    })
], ReactiveSelectComp);
exports.ReactiveSelectComp = ReactiveSelectComp;
// #enddocregion
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmVfc2VsZWN0X2NvbnRyb2xfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2V4YW1wbGVzL2Zvcm1zL3RzL3JlYWN0aXZlU2VsZWN0Q29udHJvbC9yZWFjdGl2ZV9zZWxlY3RfY29udHJvbF9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7O0FBRUgsdUJBQXVCO0FBQ3ZCLHNDQUF3QztBQUN4Qyx3Q0FBc0Q7QUFpQnRELElBQWEsa0JBQWtCO0lBZi9CO1FBZ0JFLFdBQU0sR0FBRztZQUNQLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBQy9CLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBQ2xDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBQ2hDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBQ2hDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFDO1NBQ3JDLENBQUM7UUFFRixTQUFJLEdBQUcsSUFBSSxpQkFBUyxDQUFDO1lBQ25CLEtBQUssRUFBRSxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN2QyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGtCQUFrQjtJQWY5QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGFBQWE7UUFDdkIsUUFBUSxFQUFFLHVWQVdUO0tBQ0YsQ0FBQztHQUNXLGtCQUFrQixDQVk5QjtBQVpZLGdEQUFrQjtBQWEvQixnQkFBZ0IifQ==