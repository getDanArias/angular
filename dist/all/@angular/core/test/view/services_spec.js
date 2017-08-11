"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("@angular/core/src/view/index");
var helper_1 = require("./helper");
function main() {
    describe('View Services', function () {
        function compViewDef(nodes, updateDirectives, updateRenderer, viewFlags) {
            if (viewFlags === void 0) { viewFlags = 0 /* None */; }
            return index_1.viewDef(viewFlags, nodes, updateDirectives, updateRenderer);
        }
        function createAndGetRootNodes(viewDef, context) {
            if (context === void 0) { context = null; }
            var view = helper_1.createRootView(viewDef, context);
            var rootNodes = index_1.rootRenderNodes(view);
            return { rootNodes: rootNodes, view: view };
        }
        describe('DebugContext', function () {
            var AComp = (function () {
                function AComp() {
                }
                return AComp;
            }());
            var AService = (function () {
                function AService() {
                }
                return AService;
            }());
            function createViewWithData() {
                var view = createAndGetRootNodes(compViewDef([
                    index_1.elementDef(0 /* None */, null, null, 1, 'div', null, null, null, null, function () { return compViewDef([
                        index_1.elementDef(0 /* None */, [['ref', 0 /* ElementRef */]], null, 2, 'span'),
                        index_1.directiveDef(0 /* None */, null, 0, AService, []), index_1.textDef(null, ['a'])
                    ]); }),
                    index_1.directiveDef(32768 /* Component */, null, 0, AComp, []),
                ])).view;
                return view;
            }
            it('should provide data for elements', function () {
                var view = createViewWithData();
                var compView = index_1.asElementData(view, 0).componentView;
                var debugCtx = index_1.Services.createDebugContext(compView, 0);
                expect(debugCtx.componentRenderElement).toBe(index_1.asElementData(view, 0).renderElement);
                expect(debugCtx.renderNode).toBe(index_1.asElementData(compView, 0).renderElement);
                expect(debugCtx.injector.get(AComp)).toBe(compView.component);
                expect(debugCtx.component).toBe(compView.component);
                expect(debugCtx.context).toBe(compView.context);
                expect(debugCtx.providerTokens).toEqual([AService]);
                expect(debugCtx.references['ref'].nativeElement)
                    .toBe(index_1.asElementData(compView, 0).renderElement);
            });
            it('should provide data for text nodes', function () {
                var view = createViewWithData();
                var compView = index_1.asElementData(view, 0).componentView;
                var debugCtx = index_1.Services.createDebugContext(compView, 2);
                expect(debugCtx.componentRenderElement).toBe(index_1.asElementData(view, 0).renderElement);
                expect(debugCtx.renderNode).toBe(index_1.asTextData(compView, 2).renderText);
                expect(debugCtx.injector.get(AComp)).toBe(compView.component);
                expect(debugCtx.component).toBe(compView.component);
                expect(debugCtx.context).toBe(compView.context);
            });
            it('should provide data for other nodes based on the nearest element parent', function () {
                var view = createViewWithData();
                var compView = index_1.asElementData(view, 0).componentView;
                var debugCtx = index_1.Services.createDebugContext(compView, 1);
                expect(debugCtx.renderNode).toBe(index_1.asElementData(compView, 0).renderElement);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvdGVzdC92aWV3L3NlcnZpY2VzX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFHSCxzREFBMlM7QUFJM1MsbUNBQW1EO0FBRW5EO0lBQ0UsUUFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixxQkFDSSxLQUFnQixFQUFFLGdCQUErQixFQUFFLGNBQTZCLEVBQ2hGLFNBQXFDO1lBQXJDLDBCQUFBLEVBQUEsd0JBQXFDO1lBQ3ZDLE1BQU0sQ0FBQyxlQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBRUQsK0JBQ0ksT0FBdUIsRUFBRSxPQUFtQjtZQUFuQix3QkFBQSxFQUFBLGNBQW1CO1lBQzlDLElBQU0sSUFBSSxHQUFHLHVCQUFjLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzlDLElBQU0sU0FBUyxHQUFHLHVCQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEMsTUFBTSxDQUFDLEVBQUMsU0FBUyxXQUFBLEVBQUUsSUFBSSxNQUFBLEVBQUMsQ0FBQztRQUMzQixDQUFDO1FBRUQsUUFBUSxDQUFDLGNBQWMsRUFBRTtZQUN2QjtnQkFBQTtnQkFBYSxDQUFDO2dCQUFELFlBQUM7WUFBRCxDQUFDLEFBQWQsSUFBYztZQUVkO2dCQUFBO2dCQUFnQixDQUFDO2dCQUFELGVBQUM7WUFBRCxDQUFDLEFBQWpCLElBQWlCO1lBRWpCO2dCQUNTLElBQUE7Ozs7Ozt3QkFBSSxDQVFQO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBRUQsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO2dCQUNyQyxJQUFNLElBQUksR0FBRyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNsQyxJQUFNLFFBQVEsR0FBRyxx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