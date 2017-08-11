"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = require("@angular/core");
var util_1 = require("../util");
var CORE_TOKENS = {
    'ApplicationRef': core.ApplicationRef,
    'NgZone': core.NgZone,
};
var INSPECT_GLOBAL_NAME = 'probe';
var CORE_TOKENS_GLOBAL_NAME = 'coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element) {
    return core.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
/**
 * Deprecated. Use the one from '@angular/core'.
 * @deprecated
 */
var NgProbeToken = (function () {
    function NgProbeToken(name, token) {
        this.name = name;
        this.token = token;
    }
    return NgProbeToken;
}());
exports.NgProbeToken = NgProbeToken;
function _createNgProbe(extraTokens, coreTokens) {
    var tokens = (extraTokens || []).concat(coreTokens || []);
    util_1.exportNgVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    util_1.exportNgVar(CORE_TOKENS_GLOBAL_NAME, __assign({}, CORE_TOKENS, _ngProbeTokensToMap(tokens || [])));
    return function () { return inspectNativeElement; };
}
exports._createNgProbe = _createNgProbe;
function _ngProbeTokensToMap(tokens) {
    return tokens.reduce(function (prev, t) { return (prev[t.name] = t.token, prev); }, {});
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = [
    {
        provide: core.APP_INITIALIZER,
        useFactory: _createNgProbe,
        deps: [
            [NgProbeToken, new core.Optional()],
            [core.NgProbeToken, new core.Optional()],
        ],
        multi: true,
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vZGVidWcvbmdfcHJvYmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7OztBQUVILG9DQUFzQztBQUN0QyxnQ0FBb0M7QUFFcEMsSUFBTSxXQUFXLEdBQUc7SUFDbEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWM7SUFDckMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO0NBQ3RCLENBQUM7QUFFRixJQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQztBQUNwQyxJQUFNLHVCQUF1QixHQUFHLFlBQVksQ0FBQztBQUU3Qzs7OztHQUlHO0FBQ0gsOEJBQXFDLE9BQVk7SUFDL0MsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEMsQ0FBQztBQUZELG9EQUVDO0FBRUQ7OztHQUdHO0FBQ0g7SUFDRSxzQkFBbUIsSUFBWSxFQUFTLEtBQVU7UUFBL0IsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQUs7SUFBRyxDQUFDO0lBQ3hELG1CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxvQ0FBWTtBQUl6Qix3QkFBK0IsV0FBMkIsRUFBRSxVQUErQjtJQUN6RixJQUFNLE1BQU0sR0FBRyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzVELGtCQUFXLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUN2RCxrQkFBVyxDQUFDLHVCQUF1QixlQUFNLFdBQVcsRUFBSyxtQkFBbUIsQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUM3RixNQUFNLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0FBQ3BDLENBQUM7QUFMRCx3Q0FLQztBQUVELDZCQUE2QixNQUFzQjtJQUNqRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFDLElBQVMsRUFBRSxDQUFNLElBQUssT0FBQSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBOUIsQ0FBOEIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNsRixDQUFDO0FBRUQ7O0dBRUc7QUFDVSxRQUFBLHVCQUF1QixHQUFvQjtJQUN0RDtRQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsZUFBZTtRQUM3QixVQUFVLEVBQUUsY0FBYztRQUMxQixJQUFJLEVBQUU7WUFDSixDQUFDLFlBQVksRUFBRSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDekM7UUFDRCxLQUFLLEVBQUUsSUFBSTtLQUNaO0NBQ0YsQ0FBQyJ9