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
const core_1 = require("@angular/core");
let Pane = class Pane {
};
__decorate([
    core_1.Input()
], Pane.prototype, "id", void 0);
Pane = __decorate([
    core_1.Directive({ selector: 'pane' })
], Pane);
exports.Pane = Pane;
let Tab = class Tab {
};
__decorate([
    core_1.ContentChild(Pane)
], Tab.prototype, "pane", void 0);
Tab = __decorate([
    core_1.Component({
        selector: 'tab',
        template: `
    <div>pane: {{pane?.id}}</div> 
  `
    })
], Tab);
exports.Tab = Tab;
let ContentChildComp = class ContentChildComp {
    constructor() {
        this.shouldShow = true;
    }
    toggle() { this.shouldShow = !this.shouldShow; }
};
ContentChildComp = __decorate([
    core_1.Component({
        selector: 'example-app',
        template: `
    <tab>
      <pane id="1" *ngIf="shouldShow"></pane>
      <pane id="2" *ngIf="!shouldShow"></pane>
    </tab>
    
    <button (click)="toggle()">Toggle</button>
  `,
    })
], ContentChildComp);
exports.ContentChildComp = ContentChildComp;
// #enddocregion
//# sourceMappingURL=content_child_example.js.map