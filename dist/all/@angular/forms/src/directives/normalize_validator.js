"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
function normalizeValidator(validator) {
    if (validator.validate) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
exports.normalizeValidator = normalizeValidator;
function normalizeAsyncValidator(validator) {
    if (validator.validate) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
exports.normalizeAsyncValidator = normalizeAsyncValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplX3ZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL25vcm1hbGl6ZV92YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFLSCw0QkFBbUMsU0FBa0M7SUFDbkUsRUFBRSxDQUFDLENBQWEsU0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLFVBQUMsQ0FBa0IsSUFBSyxPQUFZLFNBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQWxDLENBQWtDLENBQUM7SUFDcEUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFjLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQztBQU5ELGdEQU1DO0FBRUQsaUNBQXdDLFNBQTRDO0lBRWxGLEVBQUUsQ0FBQyxDQUFrQixTQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsVUFBQyxDQUFrQixJQUFLLE9BQWlCLFNBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQXZDLENBQXVDLENBQUM7SUFDekUsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxDQUFtQixTQUFTLENBQUM7SUFDckMsQ0FBQztBQUNILENBQUM7QUFQRCwwREFPQyJ9