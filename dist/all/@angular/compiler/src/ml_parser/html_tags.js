"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var tags_1 = require("./tags");
var HtmlTagDefinition = (function () {
    function HtmlTagDefinition(_a) {
        var _b = _a === void 0 ? {} : _a, closedByChildren = _b.closedByChildren, requiredParents = _b.requiredParents, implicitNamespacePrefix = _b.implicitNamespacePrefix, _c = _b.contentType, contentType = _c === void 0 ? tags_1.TagContentType.PARSABLE_DATA : _c, _d = _b.closedByParent, closedByParent = _d === void 0 ? false : _d, _e = _b.isVoid, isVoid = _e === void 0 ? false : _e, _f = _b.ignoreFirstLf, ignoreFirstLf = _f === void 0 ? false : _f;
        var _this = this;
        this.closedByChildren = {};
        this.closedByParent = false;
        this.canSelfClose = false;
        if (closedByChildren && closedByChildren.length > 0) {
            closedByChildren.forEach(function (tagName) { return _this.closedByChildren[tagName] = true; });
        }
        this.isVoid = isVoid;
        this.closedByParent = closedByParent || isVoid;
        if (requiredParents && requiredParents.length > 0) {
            this.requiredParents = {};
            // The first parent is the list is automatically when none of the listed parents are present
            this.parentToAdd = requiredParents[0];
            requiredParents.forEach(function (tagName) { return _this.requiredParents[tagName] = true; });
        }
        this.implicitNamespacePrefix = implicitNamespacePrefix || null;
        this.contentType = contentType;
        this.ignoreFirstLf = ignoreFirstLf;
    }
    HtmlTagDefinition.prototype.requireExtraParent = function (currentParent) {
        if (!this.requiredParents) {
            return false;
        }
        if (!currentParent) {
            return true;
        }
        var lcParent = currentParent.toLowerCase();
        var isParentTemplate = lcParent === 'template' || currentParent === 'ng-template';
        return !isParentTemplate && this.requiredParents[lcParent] != true;
    };
    HtmlTagDefinition.prototype.isClosedByChild = function (name) {
        return this.isVoid || name.toLowerCase() in this.closedByChildren;
    };
    return HtmlTagDefinition;
}());
exports.HtmlTagDefinition = HtmlTagDefinition;
// see http://www.w3.org/TR/html51/syntax.html#optional-tags
// This implementation does not fully conform to the HTML5 spec.
var TAG_DEFINITIONS = {
    'base': new HtmlTagDefinition({ isVoid: true }),
    'meta': new HtmlTagDefinition({ isVoid: true }),
    'area': new HtmlTagDefinition({ isVoid: true }),
    'embed': new HtmlTagDefinition({ isVoid: true }),
    'link': new HtmlTagDefinition({ isVoid: true }),
    'img': new HtmlTagDefinition({ isVoid: true }),
    'input': new HtmlTagDefinition({ isVoid: true }),
    'param': new HtmlTagDefinition({ isVoid: true }),
    'hr': new HtmlTagDefinition({ isVoid: true }),
    'br': new HtmlTagDefinition({ isVoid: true }),
    'source': new HtmlTagDefinition({ isVoid: true }),
    'track': new HtmlTagDefinition({ isVoid: true }),
    'wbr': new HtmlTagDefinition({ isVoid: true }),
    'p': new HtmlTagDefinition({
        closedByChildren: [
            'address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset', 'footer', 'form',
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr',
            'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'
        ],
        closedByParent: true
    }),
    'thead': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'] }),
    'tbody': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'], closedByParent: true }),
    'tfoot': new HtmlTagDefinition({ closedByChildren: ['tbody'], closedByParent: true }),
    'tr': new HtmlTagDefinition({
        closedByChildren: ['tr'],
        requiredParents: ['tbody', 'tfoot', 'thead'],
        closedByParent: true
    }),
    'td': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
    'th': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
    'col': new HtmlTagDefinition({ requiredParents: ['colgroup'], isVoid: true }),
    'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
    'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
    'li': new HtmlTagDefinition({ closedByChildren: ['li'], closedByParent: true }),
    'dt': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'] }),
    'dd': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'], closedByParent: true }),
    'rb': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
    'rt': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
    'rtc': new HtmlTagDefinition({ closedByChildren: ['rb', 'rtc', 'rp'], closedByParent: true }),
    'rp': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
    'optgroup': new HtmlTagDefinition({ closedByChildren: ['optgroup'], closedByParent: true }),
    'option': new HtmlTagDefinition({ closedByChildren: ['option', 'optgroup'], closedByParent: true }),
    'pre': new HtmlTagDefinition({ ignoreFirstLf: true }),
    'listing': new HtmlTagDefinition({ ignoreFirstLf: true }),
    'style': new HtmlTagDefinition({ contentType: tags_1.TagContentType.RAW_TEXT }),
    'script': new HtmlTagDefinition({ contentType: tags_1.TagContentType.RAW_TEXT }),
    'title': new HtmlTagDefinition({ contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT }),
    'textarea': new HtmlTagDefinition({ contentType: tags_1.TagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }),
};
var _DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
function getHtmlTagDefinition(tagName) {
    return TAG_DEFINITIONS[tagName.toLowerCase()] || _DEFAULT_TAG_DEFINITION;
}
exports.getHtmlTagDefinition = getHtmlTagDefinition;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF90YWdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvc3JjL21sX3BhcnNlci9odG1sX3RhZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrQkFBcUQ7QUFFckQ7SUFZRSwyQkFDSSxFQVVNO1lBVk4sNEJBVU0sRUFWTCxzQ0FBZ0IsRUFBRSxvQ0FBZSxFQUFFLG9EQUF1QixFQUMxRCxtQkFBMEMsRUFBMUMsc0VBQTBDLEVBQUUsc0JBQXNCLEVBQXRCLDJDQUFzQixFQUFFLGNBQWMsRUFBZCxtQ0FBYyxFQUNsRixxQkFBcUIsRUFBckIsMENBQXFCO1FBSDFCLGlCQTBCQztRQXJDTyxxQkFBZ0IsR0FBNkIsRUFBRSxDQUFDO1FBRXhELG1CQUFjLEdBQVksS0FBSyxDQUFDO1FBT2hDLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBYzVCLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQXJDLENBQXFDLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLElBQUksTUFBTSxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLGVBQWUsSUFBSSxlQUFlLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7WUFDMUIsNEZBQTRGO1lBQzVGLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLGVBQWUsQ0FBQyxPQUFPLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBcEMsQ0FBb0MsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFDRCxJQUFJLENBQUMsdUJBQXVCLEdBQUcsdUJBQXVCLElBQUksSUFBSSxDQUFDO1FBQy9ELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRCw4Q0FBa0IsR0FBbEIsVUFBbUIsYUFBcUI7UUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMxQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELElBQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM3QyxJQUFNLGdCQUFnQixHQUFHLFFBQVEsS0FBSyxVQUFVLElBQUksYUFBYSxLQUFLLGFBQWEsQ0FBQztRQUNwRixNQUFNLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQztJQUNyRSxDQUFDO0lBRUQsMkNBQWUsR0FBZixVQUFnQixJQUFZO1FBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDcEUsQ0FBQztJQUNILHdCQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEWSw4Q0FBaUI7QUEyRDlCLDREQUE0RDtBQUM1RCxnRUFBZ0U7QUFDaEUsSUFBTSxlQUFlLEdBQXVDO0lBQzFELE1BQU0sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzdDLE1BQU0sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzdDLE1BQU0sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzdDLE9BQU8sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzlDLE1BQU0sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzdDLEtBQUssRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzVDLE9BQU8sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzlDLE9BQU8sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzlDLElBQUksRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNDLElBQUksRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzNDLFFBQVEsRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQy9DLE9BQU8sRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzlDLEtBQUssRUFBRSxJQUFJLGlCQUFpQixDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDO0lBQzVDLEdBQUcsRUFBRSxJQUFJLGlCQUFpQixDQUFDO1FBQ3pCLGdCQUFnQixFQUFFO1lBQ2hCLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFPLFVBQVUs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