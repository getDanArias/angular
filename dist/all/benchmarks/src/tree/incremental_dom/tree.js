"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('incremental-dom'), patch = _a.patch, elementOpen = _a.elementOpen, elementClose = _a.elementClose, elementOpenStart = _a.elementOpenStart, elementOpenEnd = _a.elementOpenEnd, text = _a.text, attr = _a.attr;
var TreeComponent = (function () {
    function TreeComponent(_rootEl) {
        this._rootEl = _rootEl;
    }
    Object.defineProperty(TreeComponent.prototype, "data", {
        set: function (data) {
            var _this = this;
            patch(this._rootEl, function () { return _this._render(data); });
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype._render = function (data) {
        elementOpenStart('span', '', null);
        if (data.depth % 2 === 0) {
            attr('style', 'background-color: grey');
        }
        elementOpenEnd();
        text(" " + data.value + " ");
        elementClose('span');
        if (data.left) {
            elementOpen('tree', '', null);
            this._render(data.left);
            elementClose('tree');
        }
        if (data.right) {
            elementOpen('tree', '', null);
            this._render(data.right);
            elementClose('tree');
        }
    };
    return TreeComponent;
}());
exports.TreeComponent = TreeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvYmVuY2htYXJrcy9zcmMvdHJlZS9pbmNyZW1lbnRhbF9kb20vdHJlZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUdHLElBQUEsK0JBQ3dCLEVBRHZCLGdCQUFLLEVBQUUsNEJBQVcsRUFBRSw4QkFBWSxFQUFFLHNDQUFnQixFQUFFLGtDQUFjLEVBQUUsY0FBSSxFQUFFLGNBQUksQ0FDdEQ7QUFFL0I7SUFDRSx1QkFBb0IsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7SUFBRyxDQUFDO0lBRXBDLHNCQUFJLCtCQUFJO2FBQVIsVUFBUyxJQUFjO1lBQXZCLGlCQUEyRTtZQUFoRCxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFNLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO1FBQUMsQ0FBQzs7O09BQUE7SUFFbkUsK0JBQU8sR0FBZixVQUFnQixJQUFjO1FBQzVCLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixJQUFJLENBQUMsT0FBTyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELGNBQWMsRUFBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxNQUFJLElBQUksQ0FBQyxLQUFLLE1BQUcsQ0FBQyxDQUFDO1FBQ3hCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNkLFdBQVcsQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hCLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixXQUFXLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztJQUNILENBQUM7SUFDSCxvQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksc0NBQWEifQ==