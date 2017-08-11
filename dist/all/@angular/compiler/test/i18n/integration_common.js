"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var by_1 = require("@angular/platform-browser/src/dom/debug/by");
var browser_util_1 = require("@angular/platform-browser/testing/src/browser_util");
var matchers_1 = require("@angular/platform-browser/testing/src/matchers");
var I18nComponent = (function () {
    function I18nComponent() {
        this.response = { getItemsList: function () { return []; } };
    }
    return I18nComponent;
}());
I18nComponent = __decorate([
    core_1.Component({
        selector: 'i18n-cmp',
        template: '',
    })
], I18nComponent);
exports.I18nComponent = I18nComponent;
var FrLocalization = (function (_super) {
    __extends(FrLocalization, _super);
    function FrLocalization() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FrLocalization.prototype.getPluralCategory = function (value) {
        switch (value) {
            case 0:
            case 1:
                return 'one';
            default:
                return 'other';
        }
    };
    return FrLocalization;
}(common_1.NgLocalization));
FrLocalization.PROVIDE = { provide: common_1.NgLocalization, useClass: FrLocalization, deps: [] };
exports.FrLocalization = FrLocalization;
function validateHtml(tb, cmp, el) {
    expectHtml(el, 'h1').toBe('<h1>attributs i18n sur les balises</h1>');
    expectHtml(el, '#i18n-1').toBe('<div id="i18n-1"><p>imbriqué</p></div>');
    expectHtml(el, '#i18n-2').toBe('<div id="i18n-2"><p>imbriqué</p></div>');
    expectHtml(el, '#i18n-3').toBe('<div id="i18n-3"><p><i>avec des espaces réservés</i></p></div>');
    expectHtml(el, '#i18n-3b')
        .toBe('<div id="i18n-3b"><p><i class="preserved-on-placeholders">avec des espaces réservés</i></p></div>');
    expectHtml(el, '#i18n-4').toBe('<p id="i18n-4" title="sur des balises non traductibles"></p>');
    expectHtml(el, '#i18n-5').toBe('<p id="i18n-5" title="sur des balises traductibles"></p>');
    expectHtml(el, '#i18n-6').toBe('<p id="i18n-6" title=""></p>');
    cmp.count = 0;
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('zero');
    matchers_1.expect(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('zero');
    cmp.count = 1;
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('un');
    matchers_1.expect(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('un');
    matchers_1.expect(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('un');
    cmp.count = 2;
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('deux');
    matchers_1.expect(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('deux');
    matchers_1.expect(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('deux');
    cmp.count = 3;
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-7')).nativeElement).toHaveText('beaucoup');
    matchers_1.expect(el.query(by_1.By.css('#i18n-14')).nativeElement).toHaveText('beaucoup');
    matchers_1.expect(el.query(by_1.By.css('#i18n-17')).nativeElement).toHaveText('beaucoup');
    cmp.sex = 'm';
    cmp.sexB = 'f';
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('homme');
    matchers_1.expect(el.query(by_1.By.css('#i18n-8b')).nativeElement).toHaveText('femme');
    cmp.sex = 'f';
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('femme');
    cmp.sex = '0';
    tb.detectChanges();
    matchers_1.expect(el.query(by_1.By.css('#i18n-8')).nativeElement).toHaveText('autre');
    cmp.count = 123;
    tb.detectChanges();
    expectHtml(el, '#i18n-9').toEqual('<div id="i18n-9">count = 123</div>');
    cmp.sex = 'f';
    tb.detectChanges();
    expectHtml(el, '#i18n-10').toEqual('<div id="i18n-10">sexe = f</div>');
    expectHtml(el, '#i18n-11').toEqual('<div id="i18n-11">custom name</div>');
    expectHtml(el, '#i18n-12').toEqual('<h1 id="i18n-12">Balises dans les commentaires html</h1>');
    expectHtml(el, '#i18n-13').toBe('<div id="i18n-13" title="dans une section traductible"></div>');
    expectHtml(el, '#i18n-15').toMatch(/ca <b>devrait<\/b> marcher/);
    expectHtml(el, '#i18n-16').toMatch(/avec un ID explicite/);
    expectHtml(el, '#i18n-18')
        .toEqual('<div id="i18n-18">FOO<a title="dans une section traductible">BAR</a></div>');
}
exports.validateHtml = validateHtml;
function expectHtml(el, cssSelector) {
    return matchers_1.expect(browser_util_1.stringifyElement(el.query(by_1.By.css(cssSelector)).nativeElement));
}
exports.HTML = "\n<div>\n    <h1 i18n>i18n attribute on tags</h1>\n    \n    <div id=\"i18n-1\"><p i18n>nested</p></div>\n    \n    <div id=\"i18n-2\"><p i18n=\"different meaning|\">nested</p></div>\n    \n    <div id=\"i18n-3\"><p i18n><i>with placeholders</i></p></div>\n    <div id=\"i18n-3b\"><p i18n><i class=\"preserved-on-placeholders\">with placeholders</i></p></div>\n    <div id=\"i18n-3c\"><div i18n><div>with <div>nested</div> placeholders</div></div></div>\n    \n    <div>\n        <p id=\"i18n-4\" i18n-title title=\"on not translatable node\"></p>\n        <p id=\"i18n-5\" i18n i18n-title title=\"on translatable node\"></p>\n        <p id=\"i18n-6\" i18n-title title></p>\n    </div>\n    \n    <!-- no ph below because the ICU node is the only child of the div, i.e. no text nodes --> \n    <div i18n id=\"i18n-7\">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>\n    \n    <div i18n id=\"i18n-8\">\n        {sex, select, m {male} f {female} 0 {other}}\n    </div>\n    <div i18n id=\"i18n-8b\">\n        {sexB, select, m {male} f {female}}\n    </div>\n    \n    <div i18n id=\"i18n-9\">{{ \"count = \" + count }}</div>\n    <div i18n id=\"i18n-10\">sex = {{ sex }}</div>\n    <div i18n id=\"i18n-11\">{{ \"custom name\" //i18n(ph=\"CUSTOM_NAME\") }}</div>    \n</div>\n\n<!-- i18n -->\n    <h1 id=\"i18n-12\" >Markers in html comments</h1>   \n    <div id=\"i18n-13\" i18n-title title=\"in a translatable section\"></div>\n    <div id=\"i18n-14\">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>\n<!-- /i18n -->\n\n<div id=\"i18n-15\"><ng-container i18n>it <b>should</b> work</ng-container></div>\n\n<div id=\"i18n-16\" i18n=\"@@i18n16\">with an explicit ID</div>\n<div id=\"i18n-17\" i18n=\"@@i18n17\">{count, plural, =0 {zero} =1 {one} =2 {two} other {<b>many</b>}}</div>\n\n<!-- make sure that ICU messages are not treated as text nodes -->\n<div i18n=\"desc\">{\n    response.getItemsList().length,\n    plural,\n    =0 {Found no results}\n    =1 {Found one result}\n    other {Found {{response.getItemsList().length}} results}\n}</div>\n\n<div i18n id=\"i18n-18\">foo<a i18n-title title=\"in a translatable section\">bar</a></div>\n\n<div i18n>{{ 'test' //i18n(ph=\"map name\") }}</div>\n";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25fY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tcGlsZXIvdGVzdC9pMThuL2ludGVncmF0aW9uX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFSCwwQ0FBK0M7QUFDL0Msc0NBQXNEO0FBR3RELGlFQUE4RDtBQUM5RCxtRkFBb0Y7QUFDcEYsMkVBQXNFO0FBTXRFLElBQWEsYUFBYTtJQUoxQjtRQVFFLGFBQVEsR0FBUSxFQUFDLFlBQVksRUFBRSxjQUFhLE9BQUEsRUFBRSxFQUFGLENBQUUsRUFBQyxDQUFDO0lBQ2xELENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksYUFBYTtJQUp6QixnQkFBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLFVBQVU7UUFDcEIsUUFBUSxFQUFFLEVBQUU7S0FDYixDQUFDO0dBQ1csYUFBYSxDQUt6QjtBQUxZLHNDQUFhO0FBTzFCO0lBQW9DLGtDQUFjO0lBQWxEOztJQVdBLENBQUM7SUFUQywwQ0FBaUIsR0FBakIsVUFBa0IsS0FBYTtRQUM3QixNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2QsS0FBSyxDQUFDLENBQUM7WUFDUCxLQUFLLENBQUM7Z0JBQ0osTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmO2dCQUNFLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7SUFDSCxxQkFBQztBQUFELENBQUMsQUFYRCxDQUFvQyx1QkFBYztBQUNsQyxzQkFBTyxHQUFHLEVBQUMsT0FBTyxFQUFFLHVCQUFjLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFEM0Usd0NBQWM7QUFhM0Isc0JBQ0ksRUFBbUMsRUFBRSxHQUFrQixFQUFFLEVBQWdCO0lBQzNFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7SUFDckUsVUFBVSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQztJQUN6RSxVQUFVLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0lBQ3pFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLGdFQUFnRSxDQUFDLENBQUM7SUFDakcsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUM7U0FDckIsSUFBSSxDQUNELG1HQUFtRyxDQUFDLENBQUM7SUFDN0csVUFBVSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsOERBQThELENBQUMsQ0FBQztJQUMvRixVQUFVLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQywwREFBMEQsQ0FBQyxDQUFDO0lBQzNGLFVBQVUsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFFL0QsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkIsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkIsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkIsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7SUFDZCxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkIsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUUsaUJBQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFFMUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDZCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUNmLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQixpQkFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxpQkFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN2RSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQixpQkFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQixpQkFBTSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0RSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNoQixFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDbkIsVUFBVSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUV4RSxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNkLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUNuQixVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0lBRXZFLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDMUUsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztJQUMvRixVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0lBQ2pHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDakUsVUFBVSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUMzRCxVQUFVLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQztTQUNyQixPQUFPLENBQUMsNEVBQTRFLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBNURELG9DQTREQztBQUVELG9CQUFvQixFQUFnQixFQUFFLFdBQW1CO0lBQ3ZELE1BQU0sQ0FBQyxpQkFBTSxDQUFDLCtCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7QUFDL0UsQ0FBQztBQUVZLFFBQUEsSUFBSSxHQUFHLHFzRUF3RG5CLENBQUMifQ==