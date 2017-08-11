"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var recognize_1 = require("../src/recognize");
var shared_1 = require("../src/shared");
var url_tree_1 = require("../src/url_tree");
describe('recognize', function () {
    it('should work', function () {
        checkRecognize([{ path: 'a', component: ComponentA }], 'a', function (s) {
            checkActivatedRoute(s.root, '', {}, RootComponent);
            checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
        });
    });
    it('should freeze params object', function () {
        checkRecognize([{ path: 'a/:id', component: ComponentA }], 'a/10', function (s) {
            checkActivatedRoute(s.root, '', {}, RootComponent);
            var child = s.firstChild(s.root);
            expect(Object.isFrozen(child.params)).toBeTruthy();
        });
    });
    it('should support secondary routes', function () {
        checkRecognize([
            { path: 'a', component: ComponentA }, { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'right' }
        ], 'a(left:b//right:c)', function (s) {
            var c = s.children(s.root);
            checkActivatedRoute(c[0], 'a', {}, ComponentA);
            checkActivatedRoute(c[1], 'b', {}, ComponentB, 'left');
            checkActivatedRoute(c[2], 'c', {}, ComponentC, 'right');
        });
    });
    it('should set url segment and index properly', function () {
        var url = tree('a(left:b//right:c)');
        recognize_1.recognize(RootComponent, [
            { path: 'a', component: ComponentA }, { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'right' }
        ], url, 'a(left:b//right:c)')
            .subscribe(function (s) {
            expect(s.root._urlSegment).toBe(url.root);
            expect(s.root._lastPathIndex).toBe(-1);
            var c = s.children(s.root);
            expect(c[0]._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
            expect(c[0]._lastPathIndex).toBe(0);
            expect(c[1]._urlSegment).toBe(url.root.children['left']);
            expect(c[1]._lastPathIndex).toBe(0);
            expect(c[2]._urlSegment).toBe(url.root.children['right']);
            expect(c[2]._lastPathIndex).toBe(0);
        });
    });
    it('should set url segment and index properly (nested case)', function () {
        var url = tree('a/b/c');
        recognize_1.recognize(RootComponent, [
            { path: 'a/b', component: ComponentA, children: [{ path: 'c', component: ComponentC }] },
        ], url, 'a/b/c')
            .subscribe(function (s) {
            expect(s.root._urlSegment).toBe(url.root);
            expect(s.root._lastPathIndex).toBe(-1);
            var compA = s.firstChild(s.root);
            expect(compA._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
            expect(compA._lastPathIndex).toBe(1);
            var compC = s.firstChild(compA);
            expect(compC._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
            expect(compC._lastPathIndex).toBe(2);
        });
    });
    it('should set url segment and index properly (wildcard)', function () {
        var url = tree('a/b/c');
        recognize_1.recognize(RootComponent, [
            { path: 'a', component: ComponentA, children: [{ path: '**', component: ComponentB }] },
        ], url, 'a/b/c')
            .subscribe(function (s) {
            expect(s.root._urlSegment).toBe(url.root);
            expect(s.root._lastPathIndex).toBe(-1);
            var compA = s.firstChild(s.root);
            expect(compA._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
            expect(compA._lastPathIndex).toBe(0);
            var compC = s.firstChild(compA);
            expect(compC._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
            expect(compC._lastPathIndex).toBe(2);
        });
    });
    it('should match routes in the depth first order', function () {
        checkRecognize([
            { path: 'a', component: ComponentA, children: [{ path: ':id', component: ComponentB }] },
            { path: 'a/:id', component: ComponentC }
        ], 'a/paramA', function (s) {
            checkActivatedRoute(s.root, '', {}, RootComponent);
            checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
            checkActivatedRoute(s.firstChild(s.firstChild(s.root)), 'paramA', { id: 'paramA' }, ComponentB);
        });
        checkRecognize([{ path: 'a', component: ComponentA }, { path: 'a/:id', component: ComponentC }], 'a/paramA', function (s) {
            checkActivatedRoute(s.root, '', {}, RootComponent);
            checkActivatedRoute(s.firstChild(s.root), 'a/paramA', { id: 'paramA' }, ComponentC);
        });
    });
    it('should use outlet name when matching secondary routes', function () {
        checkRecognize([
            { path: 'a', component: ComponentA }, { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'b', component: ComponentC, outlet: 'right' }
        ], 'a(right:b)', function (s) {
            var c = s.children(s.root);
            checkActivatedRoute(c[0], 'a', {}, ComponentA);
            checkActivatedRoute(c[1], 'b', {}, ComponentC, 'right');
        });
    });
    it('should handle non top-level secondary routes', function () {
        checkRecognize([
            {
                path: 'a',
                component: ComponentA,
                children: [
                    { path: 'b', component: ComponentB },
                    { path: 'c', component: ComponentC, outlet: 'left' }
                ]
            },
        ], 'a/(b//left:c)', function (s) {
            var c = s.children(s.firstChild(s.root));
            checkActivatedRoute(c[0], 'b', {}, ComponentB, shared_1.PRIMARY_OUTLET);
            checkActivatedRoute(c[1], 'c', {}, ComponentC, 'left');
        });
    });
    it('should sort routes by outlet name', function () {
        checkRecognize([
            { path: 'a', component: ComponentA }, { path: 'c', component: ComponentC, outlet: 'c' },
            { path: 'b', component: ComponentB, outlet: 'b' }
        ], 'a(c:c//b:b)', function (s) {
            var c = s.children(s.root);
            checkActivatedRoute(c[0], 'a', {}, ComponentA);
            checkActivatedRoute(c[1], 'b', {}, ComponentB, 'b');
            checkActivatedRoute(c[2], 'c', {}, ComponentC, 'c');
        });
    });
    it('should support matrix parameters', function () {
        checkRecognize([
            { path: 'a', component: ComponentA, children: [{ path: 'b', component: ComponentB }] },
            { path: 'c', component: ComponentC, outlet: 'left' }
        ], 'a;a1=11;a2=22/b;b1=111;b2=222(left:c;c1=1111;c2=2222)', function (s) {
            var c = s.children(s.root);
            checkActivatedRoute(c[0], 'a', { a1: '11', a2: '22' }, ComponentA);
            checkActivatedRoute(s.firstChild(c[0]), 'b', { b1: '111', b2: '222' }, ComponentB);
            checkActivatedRoute(c[1], 'c', { c1: '1111', c2: '2222' }, ComponentC, 'left');
        });
    });
    describe('data', function () {
        it('should set static data', function () {
            checkRecognize([{ path: 'a', data: { one: 1 }, component: ComponentA }], 'a', function (s) {
                var r = s.firstChild(s.root);
                expect(r.data).toEqual({ one: 1 });
            });
        });
        it('should merge componentless route\'s data', function () {
            checkRecognize([{
                    path: 'a',
                    data: { one: 1 },
                    children: [{ path: 'b', data: { two: 2 }, component: ComponentB }]
                }], 'a/b', function (s) {
                var r = s.firstChild(s.firstChild(s.root));
                expect(r.data).toEqual({ one: 1, two: 2 });
            });
        });
        it('should set resolved data', function () {
            checkRecognize([{ path: 'a', resolve: { one: 'some-token' }, component: ComponentA }], 'a', function (s) {
                var r = s.firstChild(s.root);
                expect(r._resolve).toEqual({ one: 'some-token' });
            });
        });
    });
    describe('empty path', function () {
        describe('root', function () {
            it('should work', function () {
                checkRecognize([{ path: '', component: ComponentA }], '', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), '', {}, ComponentA);
                });
            });
            it('should match when terminal', function () {
                checkRecognize([{ path: '', pathMatch: 'full', component: ComponentA }], '', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), '', {}, ComponentA);
                });
            });
            it('should work (nested case)', function () {
                checkRecognize([{ path: '', component: ComponentA, children: [{ path: '', component: ComponentB }] }], '', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), '', {}, ComponentA);
                    checkActivatedRoute(s.firstChild(s.firstChild(s.root)), '', {}, ComponentB);
                });
            });
            it('should set url segment and index properly', function () {
                var url = tree('');
                recognize_1.recognize(RootComponent, [{ path: '', component: ComponentA, children: [{ path: '', component: ComponentB }] }], url, '')
                    .forEach(function (s) {
                    expect(s.root._urlSegment).toBe(url.root);
                    expect(s.root._lastPathIndex).toBe(-1);
                    var c = s.firstChild(s.root);
                    expect(c._urlSegment).toBe(url.root);
                    expect(c._lastPathIndex).toBe(-1);
                    var c2 = s.firstChild(s.firstChild(s.root));
                    expect(c2._urlSegment).toBe(url.root);
                    expect(c2._lastPathIndex).toBe(-1);
                });
            });
            it('should inherit params', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: '', component: ComponentB, children: [{ path: '', component: ComponentC }] }
                        ]
                    }], '/a;p=1', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', { p: '1' }, ComponentA);
                    checkActivatedRoute(s.firstChild(s.firstChild(s.root)), '', { p: '1' }, ComponentB);
                    checkActivatedRoute(s.firstChild(s.firstChild(s.firstChild(s.root))), '', { p: '1' }, ComponentC);
                });
            });
        });
        describe('aux split is in the middle', function () {
            it('should match (non-terminal)', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', component: ComponentC, outlet: 'aux' }
                        ]
                    }], 'a/b', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    checkActivatedRoute(c[0], 'b', {}, ComponentB);
                    checkActivatedRoute(c[1], '', {}, ComponentC, 'aux');
                });
            });
            it('should match (non-termianl) when both primary and secondary and primary has a child', function () {
                var config = [{
                        path: 'parent',
                        children: [
                            {
                                path: '',
                                component: ComponentA,
                                children: [
                                    { path: 'b', component: ComponentB },
                                    { path: 'c', component: ComponentC },
                                ]
                            },
                            {
                                path: '',
                                component: ComponentD,
                                outlet: 'secondary',
                            }
                        ]
                    }];
                checkRecognize(config, 'parent/b', function (s) {
                    checkActivatedRoute(s.root, '', {}, RootComponent);
                    checkActivatedRoute(s.firstChild(s.root), 'parent', {}, undefined);
                    var cc = s.children(s.firstChild(s.root));
                    checkActivatedRoute(cc[0], '', {}, ComponentA);
                    checkActivatedRoute(cc[1], '', {}, ComponentD, 'secondary');
                    checkActivatedRoute(s.firstChild(cc[0]), 'b', {}, ComponentB);
                });
            });
            it('should match (terminal)', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', pathMatch: 'full', component: ComponentC, outlet: 'aux' }
                        ]
                    }], 'a/b', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    expect(c.length).toEqual(1);
                    checkActivatedRoute(c[0], 'b', {}, ComponentB);
                });
            });
            it('should set url segment and index properly', function () {
                var url = tree('a/b');
                recognize_1.recognize(RootComponent, [{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: '', component: ComponentC, outlet: 'aux' }
                        ]
                    }], url, 'a/b')
                    .forEach(function (s) {
                    expect(s.root._urlSegment).toBe(url.root);
                    expect(s.root._lastPathIndex).toBe(-1);
                    var a = s.firstChild(s.root);
                    expect(a._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(a._lastPathIndex).toBe(0);
                    var b = s.firstChild(a);
                    expect(b._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(b._lastPathIndex).toBe(1);
                    var c = s.children(a)[1];
                    expect(c._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(c._lastPathIndex).toBe(0);
                });
            });
            it('should set url segment and index properly when nested empty-path segments', function () {
                var url = tree('a');
                recognize_1.recognize(RootComponent, [{
                        path: 'a',
                        children: [
                            { path: '', component: ComponentB, children: [{ path: '', component: ComponentC }] }
                        ]
                    }], url, 'a')
                    .forEach(function (s) {
                    expect(s.root._urlSegment).toBe(url.root);
                    expect(s.root._lastPathIndex).toBe(-1);
                    var a = s.firstChild(s.root);
                    expect(a._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(a._lastPathIndex).toBe(0);
                    var b = s.firstChild(a);
                    expect(b._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(b._lastPathIndex).toBe(0);
                    var c = s.firstChild(b);
                    expect(c._urlSegment).toBe(url.root.children[shared_1.PRIMARY_OUTLET]);
                    expect(c._lastPathIndex).toBe(0);
                });
            });
            it('should set url segment and index properly when nested empty-path segments (2)', function () {
                var url = tree('');
                recognize_1.recognize(RootComponent, [{
                        path: '',
                        children: [
                            { path: '', component: ComponentB, children: [{ path: '', component: ComponentC }] }
                        ]
                    }], url, '')
                    .forEach(function (s) {
                    expect(s.root._urlSegment).toBe(url.root);
                    expect(s.root._lastPathIndex).toBe(-1);
                    var a = s.firstChild(s.root);
                    expect(a._urlSegment).toBe(url.root);
                    expect(a._lastPathIndex).toBe(-1);
                    var b = s.firstChild(a);
                    expect(b._urlSegment).toBe(url.root);
                    expect(b._lastPathIndex).toBe(-1);
                    var c = s.firstChild(b);
                    expect(c._urlSegment).toBe(url.root);
                    expect(c._lastPathIndex).toBe(-1);
                });
            });
        });
        describe('aux split at the end (no right child)', function () {
            it('should match (non-terminal)', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: '', component: ComponentB },
                            { path: '', component: ComponentC, outlet: 'aux' },
                        ]
                    }], 'a', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    checkActivatedRoute(c[0], '', {}, ComponentB);
                    checkActivatedRoute(c[1], '', {}, ComponentC, 'aux');
                });
            });
            it('should match (terminal)', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: '', pathMatch: 'full', component: ComponentB },
                            { path: '', pathMatch: 'full', component: ComponentC, outlet: 'aux' },
                        ]
                    }], 'a', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    checkActivatedRoute(c[0], '', {}, ComponentB);
                    checkActivatedRoute(c[1], '', {}, ComponentC, 'aux');
                });
            });
            it('should work only only primary outlet', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: '', component: ComponentB },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                        ]
                    }], 'a/(aux:c)', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    checkActivatedRoute(c[0], '', {}, ComponentB);
                    checkActivatedRoute(c[1], 'c', {}, ComponentC, 'aux');
                });
            });
            it('should work when split is at the root level', function () {
                checkRecognize([
                    { path: '', component: ComponentA }, { path: 'b', component: ComponentB },
                    { path: 'c', component: ComponentC, outlet: 'aux' }
                ], '(aux:c)', function (s) {
                    checkActivatedRoute(s.root, '', {}, RootComponent);
                    var children = s.children(s.root);
                    expect(children.length).toEqual(2);
                    checkActivatedRoute(children[0], '', {}, ComponentA);
                    checkActivatedRoute(children[1], 'c', {}, ComponentC, 'aux');
                });
            });
        });
        describe('split at the end (right child)', function () {
            it('should match (non-terminal)', function () {
                checkRecognize([{
                        path: 'a',
                        component: ComponentA,
                        children: [
                            { path: '', component: ComponentB, children: [{ path: 'd', component: ComponentD }] },
                            {
                                path: '',
                                component: ComponentC,
                                outlet: 'aux',
                                children: [{ path: 'e', component: ComponentE }]
                            },
                        ]
                    }], 'a/(d//aux:e)', function (s) {
                    checkActivatedRoute(s.firstChild(s.root), 'a', {}, ComponentA);
                    var c = s.children(s.firstChild(s.root));
                    checkActivatedRoute(c[0], '', {}, ComponentB);
                    checkActivatedRoute(s.firstChild(c[0]), 'd', {}, ComponentD);
                    checkActivatedRoute(c[1], '', {}, ComponentC, 'aux');
                    checkActivatedRoute(s.firstChild(c[1]), 'e', {}, ComponentE);
                });
            });
        });
    });
    describe('wildcards', function () {
        it('should support simple wildcards', function () {
            checkRecognize([{ path: '**', component: ComponentA }], 'a/b/c/d;a1=11', function (s) {
                checkActivatedRoute(s.firstChild(s.root), 'a/b/c/d', { a1: '11' }, ComponentA);
            });
        });
    });
    describe('componentless routes', function () {
        it('should work', function () {
            checkRecognize([{
                    path: 'p/:id',
                    children: [
                        { path: 'a', component: ComponentA },
                        { path: 'b', component: ComponentB, outlet: 'aux' }
                    ]
                }], 'p/11;pp=22/(a;pa=33//aux:b;pb=44)', function (s) {
                var p = s.firstChild(s.root);
                checkActivatedRoute(p, 'p/11', { id: '11', pp: '22' }, undefined);
                var c = s.children(p);
                checkActivatedRoute(c[0], 'a', { id: '11', pp: '22', pa: '33' }, ComponentA);
                checkActivatedRoute(c[1], 'b', { id: '11', pp: '22', pb: '44' }, ComponentB, 'aux');
            });
        });
        it('should merge params until encounters a normal route', function () {
            checkRecognize([{
                    path: 'p/:id',
                    children: [{
                            path: 'a/:name',
                            children: [{
                                    path: 'b',
                                    component: ComponentB,
                                    children: [{ path: 'c', component: ComponentC }]
                                }]
                        }]
                }], 'p/11/a/victor/b/c', function (s) {
                var p = s.firstChild(s.root);
                checkActivatedRoute(p, 'p/11', { id: '11' }, undefined);
                var a = s.firstChild(p);
                checkActivatedRoute(a, 'a/victor', { id: '11', name: 'victor' }, undefined);
                var b = s.firstChild(a);
                checkActivatedRoute(b, 'b', { id: '11', name: 'victor' }, ComponentB);
                var c = s.firstChild(b);
                checkActivatedRoute(c, 'c', {}, ComponentC);
            });
        });
    });
    describe('empty URL leftovers', function () {
        it('should not throw when no children matching', function () {
            checkRecognize([{ path: 'a', component: ComponentA, children: [{ path: 'b', component: ComponentB }] }], '/a', function (s) {
                var a = s.firstChild(s.root);
                checkActivatedRoute(a, 'a', {}, ComponentA);
            });
        });
        it('should not throw when no children matching (aux routes)', function () {
            checkRecognize([{
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                        { path: '', component: ComponentC, outlet: 'aux' },
                    ]
                }], '/a', function (s) {
                var a = s.firstChild(s.root);
                checkActivatedRoute(a, 'a', {}, ComponentA);
                checkActivatedRoute(a.children[0], '', {}, ComponentC, 'aux');
            });
        });
    });
    describe('custom path matchers', function () {
        it('should use custom path matcher', function () {
            var matcher = function (s, g, r) {
                if (s[0].path === 'a') {
                    return { consumed: s.slice(0, 2), posParams: { id: s[1] } };
                }
                else {
                    return null;
                }
            };
            checkRecognize([{
                    matcher: matcher,
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }]
                }], '/a/1;p=99/b', function (s) {
                var a = s.root.firstChild;
                checkActivatedRoute(a, 'a/1', { id: '1', p: '99' }, ComponentA);
                checkActivatedRoute(a.firstChild, 'b', {}, ComponentB);
            });
        });
        it('should work with terminal route', function () {
            var matcher = function (s, g, r) { return s.length === 0 ? ({ consumed: s }) : null; };
            checkRecognize([{ matcher: matcher, component: ComponentA }], '', function (s) {
                var a = s.root.firstChild;
                checkActivatedRoute(a, '', {}, ComponentA);
            });
        });
        it('should work with child terminal route', function () {
            var matcher = function (s, g, r) { return s.length === 0 ? ({ consumed: s }) : null; };
            checkRecognize([{ path: 'a', component: ComponentA, children: [{ matcher: matcher, component: ComponentB }] }], 'a', function (s) {
                var a = s.root.firstChild;
                checkActivatedRoute(a, 'a', {}, ComponentA);
            });
        });
    });
    describe('query parameters', function () {
        it('should support query params', function () {
            var config = [{ path: 'a', component: ComponentA }];
            checkRecognize(config, 'a?q=11', function (s) {
                expect(s.root.queryParams).toEqual({ q: '11' });
                expect(s.root.queryParamMap.get('q')).toEqual('11');
            });
        });
        it('should freeze query params object', function () {
            checkRecognize([{ path: 'a', component: ComponentA }], 'a?q=11', function (s) {
                expect(Object.isFrozen(s.root.queryParams)).toBeTruthy();
            });
        });
    });
    describe('fragment', function () {
        it('should support fragment', function () {
            var config = [{ path: 'a', component: ComponentA }];
            checkRecognize(config, 'a#f1', function (s) { expect(s.root.fragment).toEqual('f1'); });
        });
    });
    describe('error handling', function () {
        it('should error when two routes with the same outlet name got matched', function () {
            recognize_1.recognize(RootComponent, [
                { path: 'a', component: ComponentA }, { path: 'b', component: ComponentB, outlet: 'aux' },
                { path: 'c', component: ComponentC, outlet: 'aux' }
            ], tree('a(aux:b//aux:c)'), 'a(aux:b//aux:c)')
                .subscribe(function (_) { }, function (s) {
                expect(s.toString())
                    .toContain('Two segments cannot have the same outlet name: \'aux:b\' and \'aux:c\'.');
            });
        });
    });
});
function checkRecognize(config, url, callback) {
    recognize_1.recognize(RootComponent, config, tree(url), url).subscribe(callback, function (e) { throw e; });
}
function checkActivatedRoute(actual, url, params, cmp, outlet) {
    if (outlet === void 0) { outlet = shared_1.PRIMARY_OUTLET; }
    if (actual === null) {
        expect(actual).not.toBeNull();
    }
    else {
        expect(actual.url.map(function (s) { return s.path; }).join('/')).toEqual(url);
        expect(actual.params).toEqual(params);
        expect(actual.component).toBe(cmp);
        expect(actual.outlet).toEqual(outlet);
    }
}
function tree(url) {
    return new url_tree_1.DefaultUrlSerializer().parse(url);
}
var RootComponent = (function () {
    function RootComponent() {
    }
    return RootComponent;
}());
var ComponentA = (function () {
    function ComponentA() {
    }
    return ComponentA;
}());
var ComponentB = (function () {
    function ComponentB() {
    }
    return ComponentB;
}());
var ComponentC = (function () {
    function ComponentC() {
    }
    return ComponentC;
}());
var ComponentD = (function () {
    function ComponentD() {
    }
    return ComponentD;
}());
var ComponentE = (function () {
    function ComponentE() {
    }
    return ComponentE;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb2duaXplLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9yb3V0ZXIvdGVzdC9yZWNvZ25pemUuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUdILDhDQUEyQztBQUUzQyx3Q0FBcUQ7QUFDckQsNENBQThEO0FBRTlELFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDcEIsRUFBRSxDQUFDLGFBQWEsRUFBRTtRQUNoQixjQUFjLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLFVBQUMsQ0FBc0I7WUFDL0UsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25ELG1CQUFtQixDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUNoQyxjQUFjLENBQUMsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQUMsQ0FBc0I7WUFDdEYsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ25ELElBQU0sS0FBSyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBRyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFB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