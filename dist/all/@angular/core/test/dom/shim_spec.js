"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_internal_1 = require("@angular/core/testing/src/testing_internal");
function main() {
    testing_internal_1.describe('Shim', function () {
        testing_internal_1.it('should provide correct function.name ', function () {
            var functionWithoutName = identity(function () { return function (_ /** TODO #9100 */) { }; });
            function foo(_ /** TODO #9100 */) { }
            ;
            testing_internal_1.expect(functionWithoutName.name).toBeFalsy();
            testing_internal_1.expect(foo.name).toEqual('foo');
        });
    });
}
exports.main = main;
function identity(a /** TODO #9100 */) {
    return a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS90ZXN0L2RvbS9zaGltX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrRUFBZ0Y7QUFFaEY7SUFDRSwyQkFBUSxDQUFDLE1BQU0sRUFBRTtRQUVmLHFCQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsSUFBTSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsY0FBTSxPQUFBLFVBQVMsQ0FBTSxDQUFDLGlCQUFpQixJQUFHLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1lBQ2xGLGFBQWEsQ0FBTSxDQUFDLGlCQUFpQixJQUFFLENBQUM7WUFBQSxDQUFDO1lBRXpDLHlCQUFNLENBQU8sbUJBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEQseUJBQU0sQ0FBTyxHQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWkQsb0JBWUM7QUFFRCxrQkFBa0IsQ0FBTSxDQUFDLGlCQUFpQjtJQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQ1gsQ0FBQyJ9