"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var util_1 = require("../../util");
var animation_style_normalizer_1 = require("./animation_style_normalizer");
var WebAnimationsStyleNormalizer = (function (_super) {
    __extends(WebAnimationsStyleNormalizer, _super);
    function WebAnimationsStyleNormalizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebAnimationsStyleNormalizer.prototype.normalizePropertyName = function (propertyName, errors) {
        return util_1.dashCaseToCamelCase(propertyName);
    };
    WebAnimationsStyleNormalizer.prototype.normalizeStyleValue = function (userProvidedProperty, normalizedProperty, value, errors) {
        var unit = '';
        var strVal = value.toString().trim();
        if (DIMENSIONAL_PROP_MAP[normalizedProperty] && value !== 0 && value !== '0') {
            if (typeof value === 'number') {
                unit = 'px';
            }
            else {
                var valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
                if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
                    errors.push("Please provide a CSS unit value for " + userProvidedProperty + ":" + value);
                }
            }
        }
        return strVal + unit;
    };
    return WebAnimationsStyleNormalizer;
}(animation_style_normalizer_1.AnimationStyleNormalizer));
exports.WebAnimationsStyleNormalizer = WebAnimationsStyleNormalizer;
var DIMENSIONAL_PROP_MAP = makeBooleanMap('width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective'
    .split(','));
function makeBooleanMap(keys) {
    var map = {};
    keys.forEach(function (key) { return map[key] = true; });
    return map;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfc3R5bGVfbm9ybWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvZHNsL3N0eWxlX25vcm1hbGl6YXRpb24vd2ViX2FuaW1hdGlvbnNfc3R5bGVfbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCxtQ0FBK0M7QUFFL0MsMkVBQXNFO0FBRXRFO0lBQWtELGdEQUF3QjtJQUExRTs7SUF1QkEsQ0FBQztJQXRCQyw0REFBcUIsR0FBckIsVUFBc0IsWUFBb0IsRUFBRSxNQUFnQjtRQUMxRCxNQUFNLENBQUMsMEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELDBEQUFtQixHQUFuQixVQUNJLG9CQUE0QixFQUFFLGtCQUEwQixFQUFFLEtBQW9CLEVBQzlFLE1BQWdCO1FBQ2xCLElBQUksSUFBSSxHQUFXLEVBQUUsQ0FBQztRQUN0QixJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFFdkMsRUFBRSxDQUFDLENBQUMsb0JBQW9CLENBQUMsa0JBQWtCLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzdFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLElBQUksR0FBRyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sSUFBTSxpQkFBaUIsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDLHlDQUF1QyxvQkFBb0IsU0FBSSxLQUFPLENBQUMsQ0FBQztnQkFDdEYsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUNILG1DQUFDO0FBQUQsQ0FBQyxBQXZCRCxDQUFrRCxxREFBd0IsR0F1QnpFO0FBdkJZLG9FQUE0QjtBQXlCekMsSUFBTSxvQkFBb0IsR0FBRyxjQUFjLENBQ3ZDLGdVQUFnVTtLQUMzVCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUVyQix3QkFBd0IsSUFBYztJQUNwQyxJQUFNLEdBQUcsR0FBNkIsRUFBRSxDQUFDO0lBQ3pDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFmLENBQWUsQ0FBQyxDQUFDO0lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDIn0=