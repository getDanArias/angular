"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var router_state_1 = require("../src/router_state");
var url_tree_1 = require("../src/url_tree");
var tree_1 = require("../src/utils/tree");
describe('RouterState & Snapshot', function () {
    describe('RouterStateSnapshot', function () {
        var state;
        var a;
        var b;
        var c;
        beforeEach(function () {
            a = createActivatedRouteSnapshot('a');
            b = createActivatedRouteSnapshot('b');
            c = createActivatedRouteSnapshot('c');
            var root = new tree_1.TreeNode(a, [new tree_1.TreeNode(b, []), new tree_1.TreeNode(c, [])]);
            state = new router_state_1.RouterStateSnapshot('url', root);
        });
        it('should return first child', function () { expect(state.root.firstChild).toBe(b); });
        it('should return children', function () {
            var cc = state.root.children;
            expect(cc[0]).toBe(b);
            expect(cc[1]).toBe(c);
        });
        it('should return root', function () {
            var b = state.root.firstChild;
            expect(b.root).toBe(state.root);
        });
        it('should return parent', function () {
            var b = state.root.firstChild;
            expect(b.parent).toBe(state.root);
        });
        it('should return path from root', function () {
            var b = state.root.firstChild;
            var p = b.pathFromRoot;
            expect(p[0]).toBe(state.root);
            expect(p[1]).toBe(b);
        });
    });
    describe('RouterState', function () {
        var state;
        var a;
        var b;
        var c;
        beforeEach(function () {
            a = createActivatedRoute('a');
            b = createActivatedRoute('b');
            c = createActivatedRoute('c');
            var root = new tree_1.TreeNode(a, [new tree_1.TreeNode(b, []), new tree_1.TreeNode(c, [])]);
            state = new router_state_1.RouterState(root, null);
        });
        it('should return first child', function () { expect(state.root.firstChild).toBe(b); });
        it('should return children', function () {
            var cc = state.root.children;
            expect(cc[0]).toBe(b);
            expect(cc[1]).toBe(c);
        });
        it('should return root', function () {
            var b = state.root.firstChild;
            expect(b.root).toBe(state.root);
        });
        it('should return parent', function () {
            var b = state.root.firstChild;
            expect(b.parent).toBe(state.root);
        });
        it('should return path from root', function () {
            var b = state.root.firstChild;
            var p = b.pathFromRoot;
            expect(p[0]).toBe(state.root);
            expect(p[1]).toBe(b);
        });
    });
    describe('equalParamsAndUrlSegments', function () {
        function createSnapshot(params, url) {
            var snapshot = new router_state_1.ActivatedRouteSnapshot(url, params, null, null, null, null, null, null, null, -1, null);
            snapshot._routerState = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot, []));
            return snapshot;
        }
        function createSnapshotPairWithParent(params, parentParams, urls) {
            var snapshot1 = createSnapshot(params[0], []);
            var snapshot2 = createSnapshot(params[1], []);
            var snapshot1Parent = createSnapshot(parentParams[0], [new url_tree_1.UrlSegment(urls[0], {})]);
            var snapshot2Parent = createSnapshot(parentParams[1], [new url_tree_1.UrlSegment(urls[1], {})]);
            snapshot1._routerState =
                new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot1Parent, [new tree_1.TreeNode(snapshot1, [])]));
            snapshot2._routerState =
                new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot2Parent, [new tree_1.TreeNode(snapshot2, [])]));
            return [snapshot1, snapshot2];
        }
        it('should return false when params are different', function () {
            expect(router_state_1.equalParamsAndUrlSegments(createSnapshot({ a: 1 }, []), createSnapshot({ a: 2 }, [])))
                .toEqual(false);
        });
        it('should return false when urls are different', function () {
            expect(router_state_1.equalParamsAndUrlSegments(createSnapshot({ a: 1 }, [new url_tree_1.UrlSegment('a', {})]), createSnapshot({ a: 1 }, [new url_tree_1.UrlSegment('b', {})])))
                .toEqual(false);
        });
        it('should return true othewise', function () {
            expect(router_state_1.equalParamsAndUrlSegments(createSnapshot({ a: 1 }, [new url_tree_1.UrlSegment('a', {})]), createSnapshot({ a: 1 }, [new url_tree_1.UrlSegment('a', {})])))
                .toEqual(true);
        });
        it('should return false when upstream params are different', function () {
            var _a = createSnapshotPairWithParent([{ a: 1 }, { a: 1 }], [{ b: 1 }, { c: 1 }], ['a', 'a']), snapshot1 = _a[0], snapshot2 = _a[1];
            expect(router_state_1.equalParamsAndUrlSegments(snapshot1, snapshot2)).toEqual(false);
        });
        it('should return false when upstream urls are different', function () {
            var _a = createSnapshotPairWithParent([{ a: 1 }, { a: 1 }], [{ b: 1 }, { b: 1 }], ['a', 'b']), snapshot1 = _a[0], snapshot2 = _a[1];
            expect(router_state_1.equalParamsAndUrlSegments(snapshot1, snapshot2)).toEqual(false);
        });
        it('should return true when upstream urls and params are equal', function () {
            var _a = createSnapshotPairWithParent([{ a: 1 }, { a: 1 }], [{ b: 1 }, { b: 1 }], ['a', 'a']), snapshot1 = _a[0], snapshot2 = _a[1];
            expect(router_state_1.equalParamsAndUrlSegments(snapshot1, snapshot2)).toEqual(true);
        });
    });
    describe('advanceActivatedRoute', function () {
        var route;
        beforeEach(function () { route = createActivatedRoute('a'); });
        function createSnapshot(params, url) {
            var queryParams = {};
            var fragment = '';
            var data = {};
            var snapshot = new router_state_1.ActivatedRouteSnapshot(url, params, queryParams, fragment, data, null, null, null, null, -1, null);
            var state = new router_state_1.RouterStateSnapshot('', new tree_1.TreeNode(snapshot, []));
            snapshot._routerState = state;
            return snapshot;
        }
        it('should call change observers', function () {
            var firstPlace = createSnapshot({ a: 1 }, []);
            var secondPlace = createSnapshot({ a: 2 }, []);
            route.snapshot = firstPlace;
            route._futureSnapshot = secondPlace;
            var hasSeenDataChange = false;
            route.data.forEach(function (data) { hasSeenDataChange = true; });
            router_state_1.advanceActivatedRoute(route);
            expect(hasSeenDataChange).toEqual(true);
        });
    });
});
function createActivatedRouteSnapshot(cmp) {
    return new router_state_1.ActivatedRouteSnapshot(null, null, null, null, null, null, cmp, null, null, -1, null);
}
function createActivatedRoute(cmp) {
    return new router_state_1.ActivatedRoute(new BehaviorSubject_1.BehaviorSubject([new url_tree_1.UrlSegment('', {})]), new BehaviorSubject_1.BehaviorSubject({}), null, null, new BehaviorSubject_1.BehaviorSubject({}), null, cmp, null);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3N0YXRlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvdGVzdC9yb3V0ZXJfc3RhdGUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILHdEQUFxRDtBQUVyRCxvREFBK0o7QUFFL0osNENBQTJDO0FBQzNDLDBDQUEyQztBQUUzQyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7SUFDakMsUUFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLElBQUksS0FBMEIsQ0FBQztRQUMvQixJQUFJLENBQXlCLENBQUM7UUFDOUIsSUFBSSxDQUF5QixDQUFDO1FBQzlCLElBQUksQ0FBeUIsQ0FBQztRQUU5QixVQUFVLENBQUM7WUFDVCxDQUFDLEdBQUcsNEJBQTRCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxHQUFHLDRCQUE0QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsR0FBRyw0QkFBNEIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV0QyxJQUFNLElBQUksR0FBRyxJQUFJLGVBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGVBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxlQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RSxLQUFLLEdBQUcsSUFBSSxrQ0FBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMkJBQTJCLEVBQUUsY0FBUSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRixFQUFFLENBQUMsd0JBQXdCLEVBQUU7WUFDM0IsSUFBTSxFQUFFLEdBQUcs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