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
Object.defineProperty(exports, "__esModule", { value: true });
var testing_internal_1 = require("@angular/core/testing/src/testing_internal");
var index_1 = require("../../index");
function main() {
    function createMetric(ids) {
        var m = index_1.Injector
            .create([
            ids.map(function (id) { return ({ provide: id, useValue: new MockMetric(id) }); }),
            index_1.MultiMetric.provideWith(ids)
        ])
            .get(index_1.MultiMetric);
        return Promise.resolve(m);
    }
    testing_internal_1.describe('multi metric', function () {
        testing_internal_1.it('should merge descriptions', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            createMetric(['m1', 'm2']).then(function (m) {
                testing_internal_1.expect(m.describe()).toEqual({ 'm1': 'describe', 'm2': 'describe' });
                async.done();
            });
        }));
        testing_internal_1.it('should merge all beginMeasure calls', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            createMetric(['m1', 'm2']).then(function (m) { return m.beginMeasure(); }).then(function (values) {
                testing_internal_1.expect(values).toEqual(['m1_beginMeasure', 'm2_beginMeasure']);
                async.done();
            });
        }));
        [false, true].forEach(function (restartFlag) {
            testing_internal_1.it("should merge all endMeasure calls for restart=" + restartFlag, testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                createMetric(['m1', 'm2']).then(function (m) { return m.endMeasure(restartFlag); }).then(function (values) {
                    testing_internal_1.expect(values).toEqual({ 'm1': { 'restart': restartFlag }, 'm2': { 'restart': restartFlag } });
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var MockMetric = (function (_super) {
    __extends(MockMetric, _super);
    function MockMetric(_id) {
        var _this = _super.call(this) || this;
        _this._id = _id;
        return _this;
    }
    MockMetric.prototype.beginMeasure = function () { return Promise.resolve(this._id + "_beginMeasure"); };
    MockMetric.prototype.endMeasure = function (restart) {
        var result = {};
        result[this._id] = { 'restart': restart };
        return Promise.resolve(result);
    };
    MockMetric.prototype.describe = function () {
        var result = {};
        result[this._id] = 'describe';
        return result;
    };
    return MockMetric;
}(index_1.Metric));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlfbWV0cmljX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iZW5jaHByZXNzL3Rlc3QvbWV0cmljL211bHRpX21ldHJpY19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztBQUVILCtFQUE0RztBQUU1RyxxQ0FBMEQ7QUFFMUQ7SUFDRSxzQkFBc0IsR0FBVTtRQUM5QixJQUFNLENBQUMsR0FBRyxnQkFBUTthQUNILE1BQU0sQ0FBQztZQUNOLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxDQUFDLEVBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxFQUE3QyxDQUE2QyxDQUFDO1lBQzVELG1CQUFXLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQztTQUM3QixDQUFDO2FBQ0QsR0FBRyxDQUFDLG1CQUFXLENBQUMsQ0FBQztRQUNoQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsMkJBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIscUJBQUUsQ0FBQywyQkFBMkIsRUFBRSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ2xGLFlBQVksQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ2hDLHlCQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztnQkFDbkUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFD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