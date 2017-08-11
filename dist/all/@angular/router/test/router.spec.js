"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = require("@angular/common");
var testing_1 = require("@angular/core/testing");
var pre_activation_1 = require("../src/pre_activation");
var router_1 = require("../src/router");
var router_outlet_context_1 = require("../src/router_outlet_context");
var router_state_1 = require("../src/router_state");
var url_tree_1 = require("../src/url_tree");
var tree_1 = require("../src/utils/tree");
var router_testing_module_1 = require("../testing/src/router_testing_module");
var helpers_1 = require("./helpers");
describe('Router', function () {
    describe('resetRootComponentType', function () {
        var NewRootComponent = (function () {
            function NewRootComponent() {
            }
            return NewRootComponent;
        }());
        beforeEach(function () { testing_1.TestBed.configureTestingModule({ imports: [router_testing_module_1.RouterTestingModule] }); });
        it('should not change root route when updating the root component', function () {
            var r = testing_1.TestBed.get(router_1.Router);
            var root = r.routerState.root;
            r.resetRootComponentType(NewRootComponent);
            expect(r.routerState.root).toBe(root);
        });
    });
    describe('setUpLocationChangeListener', function () {
        beforeEach(function () { testing_1.TestBed.configureTestingModule({ imports: [router_testing_module_1.RouterTestingModule] }); });
        it('should be idempotent', testing_1.inject([router_1.Router, common_1.Location], function (r, location) {
            r.setUpLocationChangeListener();
            var a = r.locationSubscription;
            r.setUpLocationChangeListener();
            var b = r.locationSubscription;
            expect(a).toBe(b);
            r.dispose();
            r.setUpLocationChangeListener();
            var c = r.locationSubscription;
            expect(c).not.toBe(b);
        }));
    });
    describe('PreActivation', function () {
        var serializer = new url_tree_1.DefaultUrlSerializer();
        var inj = { get: function (token) { return function () { return token + "_value"; }; } };
        var empty;
        var logger;
        var CA_CHILD = 'canActivate_child';
        var CA_CHILD_FALSE = 'canActivate_child_false';
        var CAC_CHILD = 'canActivateChild_child';
        var CAC_CHILD_FALSE = 'canActivateChild_child_false';
        var CA_GRANDCHILD = 'canActivate_grandchild';
        var CA_GRANDCHILD_FALSE = 'canActivate_grandchild_false';
        var CDA_CHILD = 'canDeactivate_child';
        var CDA_CHILD_FALSE = 'canDeactivate_child_false';
        var CDA_GRANDCHILD = 'canDeactivate_grandchild';
        var CDA_GRANDCHILD_FALSE = 'canDeactivate_grandchild_false';
        beforeEach(function () {
            testing_1.TestBed.configureTestingModule({
                providers: [
                    helpers_1.Logger, helpers_1.provideTokenLogger(CA_CHILD), helpers_1.provideTokenLogger(CA_CHILD_FALSE, false),
                    helpers_1.provideTokenLogger(CAC_CHILD), helpers_1.provideTokenLogger(CAC_CHILD_FALSE, false),
                    helpers_1.provideTokenLogger(CA_GRANDCHILD), helpers_1.provideTokenLogger(CA_GRANDCHILD_FALSE, false),
                    helpers_1.provideTokenLogger(CDA_CHILD), helpers_1.provideTokenLogger(CDA_CHILD_FALSE, false),
                    helpers_1.provideTokenLogger(CDA_GRANDCHILD), helpers_1.provideTokenLogger(CDA_GRANDCHILD_FALSE, false)
                ]
            });
        });
        beforeEach(testing_1.inject([helpers_1.Logger], function (_logger) {
            empty = router_state_1.createEmptyStateSnapshot(serializer.parse('/'), null);
            logger = _logger;
        }));
        describe('guards', function () {
            it('should run CanActivate checks', function () {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA, CAC)
                 *            \
                 *             grandchild (CA)
                 */
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: {
                        canActivate: [CA_CHILD],
                        canActivateChild: [CAC_CHILD]
                    }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, empty, testing_1.TestBed, function (result) {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([CA_CHILD, CAC_CHILD, CA_GRANDCHILD]);
                });
            });
            it('should not run grandchild guards if child fails', function () {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA: x, CAC)
                 *            \
                 *             grandchild (CA)
                 */
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD_FALSE], canActivateChild: [CAC_CHILD] }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, empty, testing_1.TestBed, function (result) {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual([CA_CHILD_FALSE]);
                });
            });
            it('should not run grandchild guards if child canActivateChild fails', function () {
                /**
                 * R  -->  R
                 *          \
                 *           child (CA, CAC: x)
                 *            \
                 *             grandchild (CA)
                 */
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD_FALSE] }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, empty, testing_1.TestBed, function (result) {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual([CA_CHILD, CAC_CHILD_FALSE]);
                });
            });
            it('should run deactivate guards before activate guards', function () {
                /**
                 *      R  -->  R
                 *     /         \
                 *    prev (CDA)  child (CA)
                 *                 \
                 *                  grandchild (CA)
                 */
                var prevSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'prev', routeConfig: { canDeactivate: [CDA_CHILD] } });
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(prevSnapshot, [])]));
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, currentState, testing_1.TestBed, function (result) {
                    expect(logger.logs).toEqual([CDA_CHILD, CA_CHILD, CAC_CHILD, CA_GRANDCHILD]);
                });
            });
            it('should not run activate if deactivate fails guards', function () {
                /**
                 *      R  -->  R
                 *     /         \
                 *    prev (CDA)  child (CA)
                 *                 \
                 *                  grandchild (CA)
                 */
                var prevSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'prev', routeConfig: { canDeactivate: [CDA_CHILD_FALSE] } });
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(prevSnapshot, [])]));
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, currentState, testing_1.TestBed, function (result) {
                    expect(result).toBe(false);
                    expect(logger.logs).toEqual([CDA_CHILD_FALSE]);
                });
            });
            it('should deactivate from bottom up, then activate top down', function () {
                /**
                 *      R     -->      R
                 *     /                \
                 *    prevChild (CDA)    child (CA)
                 *   /                    \
                 *  prevGrandchild(CDA)    grandchild (CA)
                 */
                var prevChildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'prev_child', routeConfig: { canDeactivate: [CDA_CHILD] } });
                var prevGrandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'prev_grandchild', routeConfig: { canDeactivate: [CDA_GRANDCHILD] } });
                var childSnapshot = helpers_1.createActivatedRouteSnapshot({
                    component: 'child',
                    routeConfig: { canActivate: [CA_CHILD], canActivateChild: [CAC_CHILD] }
                });
                var grandchildSnapshot = helpers_1.createActivatedRouteSnapshot({ component: 'grandchild', routeConfig: { canActivate: [CA_GRANDCHILD] } });
                var currentState = new router_state_1.RouterStateSnapshot('prev', new tree_1.TreeNode(empty.root, [
                    new tree_1.TreeNode(prevChildSnapshot, [new tree_1.TreeNode(prevGrandchildSnapshot, [])])
                ]));
                var futureState = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(childSnapshot, [new tree_1.TreeNode(grandchildSnapshot, [])])]));
                checkGuards(futureState, currentState, testing_1.TestBed, function (result) {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([
                        CDA_GRANDCHILD, CDA_CHILD, CA_CHILD, CAC_CHILD, CA_GRANDCHILD
                    ]);
                });
                logger.empty();
                checkGuards(currentState, futureState, testing_1.TestBed, function (result) {
                    expect(result).toBe(true);
                    expect(logger.logs).toEqual([]);
                });
            });
        });
        describe('resolve', function () {
            it('should resolve data', function () {
                /**
                 * R  -->  R
                 *          \
                 *           a
                 */
                var r = { data: 'resolver' };
                var n = helpers_1.createActivatedRouteSnapshot({ component: 'a', resolve: r });
                var s = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n, [])]));
                checkResolveData(s, empty, inj, function () {
                    expect(s.root.firstChild.data).toEqual({ data: 'resolver_value' });
                });
            });
            it('should wait for the parent resolve to complete', function () {
                /**
                 * R  -->  R
                 *          \
                 *           null (resolve: parentResolve)
                 *            \
                 *             b (resolve: childResolve)
                 */
                var parentResolve = { data: 'resolver' };
                var childResolve = {};
                var parent = helpers_1.createActivatedRouteSnapshot({ component: null, resolve: parentResolve });
                var child = helpers_1.createActivatedRouteSnapshot({ component: 'b', resolve: childResolve });
                var s = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(parent, [new tree_1.TreeNode(child, [])])]));
                var inj = { get: function (token) { return function () { return Promise.resolve(token + "_value"); }; } };
                checkResolveData(s, empty, inj, function () {
                    expect(s.root.firstChild.firstChild.data).toEqual({ data: 'resolver_value' });
                });
            });
            it('should copy over data when creating a snapshot', function () {
                /**
                 * R  -->  R         -->         R
                 *          \                     \
                 *           n1 (resolve: r1)      n21 (resolve: r1)
                 *                                  \
                 *                                   n22 (resolve: r2)
                 */
                var r1 = { data: 'resolver1' };
                var r2 = { data: 'resolver2' };
                var n1 = helpers_1.createActivatedRouteSnapshot({ component: 'a', resolve: r1 });
                var s1 = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n1, [])]));
                checkResolveData(s1, empty, inj, function () { });
                var n21 = helpers_1.createActivatedRouteSnapshot({ component: 'a', resolve: r1 });
                var n22 = helpers_1.createActivatedRouteSnapshot({ component: 'b', resolve: r2 });
                var s2 = new router_state_1.RouterStateSnapshot('url', new tree_1.TreeNode(empty.root, [new tree_1.TreeNode(n21, [new tree_1.TreeNode(n22, [])])]));
                checkResolveData(s2, s1, inj, function () {
                    expect(s2.root.firstChild.data).toEqual({ data: 'resolver1_value' });
                    expect(s2.root.firstChild.firstChild.data).toEqual({ data: 'resolver2_value' });
                });
            });
        });
    });
});
function checkResolveData(future, curr, injector, check) {
    var p = new pre_activation_1.PreActivation(future, curr, injector);
    p.initalize(new router_outlet_context_1.ChildrenOutletContexts());
    p.resolveData().subscribe(check, function (e) { throw e; });
}
function checkGuards(future, curr, injector, check) {
    var p = new pre_activation_1.PreActivation(future, curr, injector);
    p.initalize(new router_outlet_context_1.ChildrenOutletContexts());
    p.checkGuards().subscribe(check, function (e) { throw e; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvdGVzdC9yb3V0ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILDBDQUF5QztBQUN6QyxpREFBc0Q7QUFHdEQsd0RBQW9EO0FBQ3BELHdDQUFxQztBQUNyQyxzRUFBb0U7QUFDcEUsb0RBQTBHO0FBQzFHLDRDQUFxRDtBQUNyRCwwQ0FBMkM7QUFDM0MsOEVBQXlFO0FBRXpFLHFDQUFtRjtBQUVuRixRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2pCLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRTtRQUNqQztZQUFBO1lBQXdCLENBQUM7WUFBRCx1QkFBQztRQUFELENBQUMsQUFBekIsSUFBeUI7UUFFekIsVUFBVSxDQUFDLGNBQVEsaUJBQU8sQ0FBQyxzQkFBc0IsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLDJDQUFtQixDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFeEYsRUFBRSxDQUFDLCtEQUErRCxFQUFFO1lBQ2xFLElBQU0sQ0FBQyxHQUFXLGlCQUFPLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxDQUFDO1lBQ3RDLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBRWhDLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLDZCQUE2QixFQUFFO1FBQ3RDLFVBQVUsQ0FBQyxjQUFRLGlCQUFPLENBQUMsc0JBQXNCLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQywyQ0FB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