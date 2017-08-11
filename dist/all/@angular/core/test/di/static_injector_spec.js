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
var core_1 = require("@angular/core");
var matchers_1 = require("@angular/platform-browser/testing/src/matchers");
var util_1 = require("../../src/util");
var Engine = (function () {
    function Engine() {
    }
    return Engine;
}());
Engine.PROVIDER = { provide: Engine, useClass: Engine, deps: [] };
var BrokenEngine = (function () {
    function BrokenEngine() {
        throw new Error('Broken Engine');
    }
    return BrokenEngine;
}());
BrokenEngine.PROVIDER = { provide: Engine, useClass: BrokenEngine, deps: [] };
var DashboardSoftware = (function () {
    function DashboardSoftware() {
    }
    return DashboardSoftware;
}());
DashboardSoftware.PROVIDER = { provide: DashboardSoftware, useClass: DashboardSoftware, deps: [] };
var Dashboard = (function () {
    function Dashboard(software) {
    }
    return Dashboard;
}());
Dashboard.PROVIDER = { provide: Dashboard, useClass: Dashboard, deps: [DashboardSoftware] };
var TurboEngine = (function (_super) {
    __extends(TurboEngine, _super);
    function TurboEngine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TurboEngine;
}(Engine));
TurboEngine.PROVIDER = { provide: Engine, useClass: TurboEngine, deps: [] };
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    return Car;
}());
Car.PROVIDER = { provide: Car, useClass: Car, deps: [Engine] };
var CarWithOptionalEngine = (function () {
    function CarWithOptionalEngine(engine) {
        this.engine = engine;
    }
    return CarWithOptionalEngine;
}());
CarWithOptionalEngine.PROVIDER = {
    provide: CarWithOptionalEngine,
    useClass: CarWithOptionalEngine,
    deps: [[new core_1.Optional(), Engine]]
};
var CarWithDashboard = (function () {
    function CarWithDashboard(engine, dashboard) {
        this.engine = engine;
        this.dashboard = dashboard;
    }
    return CarWithDashboard;
}());
CarWithDashboard.PROVIDER = {
    provide: CarWithDashboard,
    useClass: CarWithDashboard,
    deps: [Engine, Dashboard]
};
var SportsCar = (function (_super) {
    __extends(SportsCar, _super);
    function SportsCar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SportsCar;
}(Car));
SportsCar.PROVIDER = { provide: Car, useClass: SportsCar, deps: [Engine] };
var CyclicEngine = (function () {
    function CyclicEngine(car) {
    }
    return CyclicEngine;
}());
CyclicEngine.PROVIDER = { provide: Engine, useClass: CyclicEngine, deps: [Car] };
var NoAnnotations = (function () {
    function NoAnnotations(secretDependency) {
    }
    return NoAnnotations;
}());
function factoryFn(a) { }
function main() {
    var dynamicProviders = [
        { provide: 'provider0', useValue: 1 }, { provide: 'provider1', useValue: 1 },
        { provide: 'provider2', useValue: 1 }, { provide: 'provider3', useValue: 1 },
        { provide: 'provider4', useValue: 1 }, { provide: 'provider5', useValue: 1 },
        { provide: 'provider6', useValue: 1 }, { provide: 'provider7', useValue: 1 },
        { provide: 'provider8', useValue: 1 }, { provide: 'provider9', useValue: 1 },
        { provide: 'provider10', useValue: 1 }
    ];
    describe("StaticInjector", function () {
        it('should instantiate a class without dependencies', function () {
            var injector = core_1.Injector.create([Engine.PROVIDER]);
            var engine = injector.get(Engine);
            matchers_1.expect(engine).toBeAnInstanceOf(Engine);
        });
        it('should resolve dependencies based on type information', function () {
            var injector = core_1.Injector.create([Engine.PROVIDER, Car.PROVIDER]);
            var car = injector.get(Car);
            matchers_1.expect(car).toBeAnInstanceOf(Car);
            matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        it('should cache instances', function () {
            var injector = core_1.Injector.create([Engine.PROVIDER]);
            var e1 = injector.get(Engine);
            var e2 = injector.get(Engine);
            matchers_1.expect(e1).toBe(e2);
        });
        it('should provide to a value', function () {
            var injector = core_1.Injector.create([{ provide: Engine, useValue: 'fake engine' }]);
            var engine = injector.get(Engine);
            matchers_1.expect(engine).toEqual('fake engine');
        });
        it('should inject dependencies instance of InjectionToken', function () {
            var TOKEN = new core_1.InjectionToken('token');
            var injector = core_1.Injector.create([
                { provide: TOKEN, useValue: 'by token' },
                { provide: Engine, useFactory: function (v) { return v; }, deps: [[TOKEN]] },
            ]);
            var engine = injector.get(Engine);
            matchers_1.expect(engine).toEqual('by token');
        });
        it('should provide to a factory', function () {
            function sportsCarFactory(e) { return new SportsCar(e); }
            var injector = core_1.Injector.create([Engine.PROVIDER, { provide: Car, useFactory: sportsCarFactory, deps: [Engine] }]);
            var car = injector.get(Car);
            matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
            matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        it('should supporting provider to null', function () {
            var injector = core_1.Injector.create([{ provide: Engine, useValue: null }]);
            var engine = injector.get(Engine);
            matchers_1.expect(engine).toBeNull();
        });
        it('should provide to an alias', function () {
            var injector = core_1.Injector.create([
                Engine.PROVIDER, { provide: SportsCar, useClass: SportsCar, deps: [Engine] },
                { provide: Car, useExisting: SportsCar }
            ]);
            var car = injector.get(Car);
            var sportsCar = injector.get(SportsCar);
            matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
            matchers_1.expect(car).toBe(sportsCar);
        });
        it('should support multiProviders', function () {
            var injector = core_1.Injector.create([
                Engine.PROVIDER, { provide: Car, useClass: SportsCar, deps: [Engine], multi: true },
                { provide: Car, useClass: CarWithOptionalEngine, deps: [Engine], multi: true }
            ]);
            var cars = injector.get(Car);
            matchers_1.expect(cars.length).toEqual(2);
            matchers_1.expect(cars[0]).toBeAnInstanceOf(SportsCar);
            matchers_1.expect(cars[1]).toBeAnInstanceOf(CarWithOptionalEngine);
        });
        it('should support multiProviders that are created using useExisting', function () {
            var injector = core_1.Injector.create([
                Engine.PROVIDER, { provide: SportsCar, useClass: SportsCar, deps: [Engine] },
                { provide: Car, useExisting: SportsCar, multi: true }
            ]);
            var cars = injector.get(Car);
            matchers_1.expect(cars.length).toEqual(1);
            matchers_1.expect(cars[0]).toBe(injector.get(SportsCar));
        });
        it('should throw when the aliased provider does not exist', function () {
            var injector = core_1.Injector.create([{ provide: 'car', useExisting: SportsCar }]);
            var e = "StaticInjectorError[car -> " + util_1.stringify(SportsCar) + "]: \n  NullInjectorError: No provider for " + util_1.stringify(SportsCar) + "!";
            matchers_1.expect(function () { return injector.get('car'); }).toThrowError(e);
        });
        it('should handle forwardRef in useExisting', function () {
            var injector = core_1.Injector.create([
                { provide: 'originalEngine', useClass: core_1.forwardRef(function () { return Engine; }), deps: [] }, {
                    provide: 'aliasedEngine',
                    useExisting: core_1.forwardRef(function () { return 'originalEngine'; }),
                    deps: []
                }
            ]);
            matchers_1.expect(injector.get('aliasedEngine')).toBeAnInstanceOf(Engine);
        });
        it('should support overriding factory dependencies', function () {
            var injector = core_1.Injector.create([
                Engine.PROVIDER,
                { provide: Car, useFactory: function (e) { return new SportsCar(e); }, deps: [Engine] }
            ]);
            var car = injector.get(Car);
            matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
            matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        it('should support optional dependencies', function () {
            var injector = core_1.Injector.create([CarWithOptionalEngine.PROVIDER]);
            var car = injector.get(CarWithOptionalEngine);
            matchers_1.expect(car.engine).toEqual(null);
        });
        it('should flatten passed-in providers', function () {
            var injector = core_1.Injector.create([[[Engine.PROVIDER, Car.PROVIDER]]]);
            var car = injector.get(Car);
            matchers_1.expect(car).toBeAnInstanceOf(Car);
        });
        it('should use the last provider when there are multiple providers for same token', function () {
            var injector = core_1.Injector.create([
                { provide: Engine, useClass: Engine, deps: [] },
                { provide: Engine, useClass: TurboEngine, deps: [] }
            ]);
            matchers_1.expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
        });
        it('should use non-type tokens', function () {
            var injector = core_1.Injector.create([{ provide: 'token', useValue: 'value' }]);
            matchers_1.expect(injector.get('token')).toEqual('value');
        });
        it('should throw when given invalid providers', function () {
            matchers_1.expect(function () { return core_1.Injector.create(['blah']); })
                .toThrowError('StaticInjectorError[blah]: Unexpected provider');
        });
        it('should throw when missing deps', function () {
            matchers_1.expect(function () { return core_1.Injector.create([{ provide: Engine, useClass: Engine }]); })
                .toThrowError('StaticInjectorError[{provide:Engine, useClass:Engine}]: \'deps\' required');
        });
        it('should throw when using reflective API', function () {
            matchers_1.expect(function () { return core_1.Injector.create([Engine]); })
                .toThrowError('StaticInjectorError[Engine]: Function/Class not supported');
        });
        it('should throw when unknown provider shape API', function () {
            matchers_1.expect(function () { return core_1.Injector.create([{ provide: 'abc', deps: [Engine] }]); })
                .toThrowError('StaticInjectorError[{provide:"abc", deps:[Engine]}]: StaticProvider does not have [useValue|useFactory|useExisting|useClass] or [provide] is not newable');
        });
        it('should throw when given invalid providers and serialize the provider', function () {
            matchers_1.expect(function () { return core_1.Injector.create([{ foo: 'bar', bar: Car }]); })
                .toThrowError('StaticInjectorError[{foo:"bar", bar:Car}]: Unexpected provider');
        });
        it('should provide itself', function () {
            var parent = core_1.Injector.create([]);
            var child = core_1.Injector.create([], parent);
            matchers_1.expect(child.get(core_1.Injector)).toBe(child);
        });
        it('should throw when no provider defined', function () {
            var injector = core_1.Injector.create([]);
            matchers_1.expect(function () { return injector.get('NonExisting'); })
                .toThrowError('StaticInjectorError[NonExisting]: \n  NullInjectorError: No provider for NonExisting!');
        });
        it('should show the full path when no provider', function () {
            var injector = core_1.Injector.create([CarWithDashboard.PROVIDER, Engine.PROVIDER, Dashboard.PROVIDER]);
            matchers_1.expect(function () { return injector.get(CarWithDashboard); })
                .toThrowError("StaticInjectorError[" + util_1.stringify(CarWithDashboard) + " -> " + util_1.stringify(Dashboard) + " -> DashboardSoftware]: \n  NullInjectorError: No provider for DashboardSoftware!");
        });
        it('should throw when trying to instantiate a cyclic dependency', function () {
            var injector = core_1.Injector.create([Car.PROVIDER, CyclicEngine.PROVIDER]);
            matchers_1.expect(function () { return injector.get(Car); })
                .toThrowError("StaticInjectorError[" + util_1.stringify(Car) + " -> " + util_1.stringify(Engine) + " -> " + util_1.stringify(Car) + "]: Circular dependency");
        });
        it('should show the full path when error happens in a constructor', function () {
            var error = new Error('MyError');
            var injector = core_1.Injector.create([Car.PROVIDER, { provide: Engine, useFactory: function () { throw error; }, deps: [] }]);
            try {
                injector.get(Car);
                throw 'Must throw';
            }
            catch (e) {
                matchers_1.expect(e).toBe(error);
                matchers_1.expect(e.message).toContain("StaticInjectorError[" + util_1.stringify(Car) + " -> Engine]: \n  MyError");
                matchers_1.expect(e.ngTokenPath[0]).toEqual(Car);
                matchers_1.expect(e.ngTokenPath[1]).toEqual(Engine);
            }
        });
        it('should instantiate an object after a failed attempt', function () {
            var isBroken = true;
            var injector = core_1.Injector.create([
                Car.PROVIDER, {
                    provide: Engine,
                    useFactory: (function () { return isBroken ? new BrokenEngine() : new Engine(); }),
                    deps: []
                }
            ]);
            matchers_1.expect(function () { return injector.get(Car); })
                .toThrowError('StaticInjectorError[Car -> Engine]: \n  Broken Engine');
            isBroken = false;
            matchers_1.expect(injector.get(Car)).toBeAnInstanceOf(Car);
        });
        it('should support null/undefined values', function () {
            var injector = core_1.Injector.create([
                { provide: 'null', useValue: null },
                { provide: 'undefined', useValue: undefined },
            ]);
            matchers_1.expect(injector.get('null')).toBe(null);
            matchers_1.expect(injector.get('undefined')).toBe(undefined);
        });
    });
    describe('child', function () {
        it('should load instances from parent injector', function () {
            var parent = core_1.Injector.create([Engine.PROVIDER]);
            var child = core_1.Injector.create([], parent);
            var engineFromParent = parent.get(Engine);
            var engineFromChild = child.get(Engine);
            matchers_1.expect(engineFromChild).toBe(engineFromParent);
        });
        it('should not use the child providers when resolving the dependencies of a parent provider', function () {
            var parent = core_1.Injector.create([Car.PROVIDER, Engine.PROVIDER]);
            var child = core_1.Injector.create([TurboEngine.PROVIDER], parent);
            var carFromChild = child.get(Car);
            matchers_1.expect(carFromChild.engine).toBeAnInstanceOf(Engine);
        });
        it('should create new instance in a child injector', function () {
            var parent = core_1.Injector.create([Engine.PROVIDER]);
            var child = core_1.Injector.create([TurboEngine.PROVIDER], parent);
            var engineFromParent = parent.get(Engine);
            var engineFromChild = child.get(Engine);
            matchers_1.expect(engineFromParent).not.toBe(engineFromChild);
            matchers_1.expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
        });
        it('should give access to parent', function () {
            var parent = core_1.Injector.create([]);
            var child = core_1.Injector.create([], parent);
            matchers_1.expect(child.parent).toBe(parent);
        });
    });
    describe('instantiate', function () {
        it('should instantiate an object in the context of the injector', function () {
            var inj = core_1.Injector.create([Engine.PROVIDER]);
            var childInj = core_1.Injector.create([Car.PROVIDER], inj);
            var car = childInj.get(Car);
            matchers_1.expect(car).toBeAnInstanceOf(Car);
            matchers_1.expect(car.engine).toBe(inj.get(Engine));
        });
    });
    describe('depedency resolution', function () {
        describe('@Self()', function () {
            it('should return a dependency from self', function () {
                var inj = core_1.Injector.create([
                    Engine.PROVIDER,
                    { provide: Car, useFactory: function (e) { return new Car(e); }, deps: [[Engine, new core_1.Self()]] }
                ]);
                matchers_1.expect(inj.get(Car)).toBeAnInstanceOf(Car);
            });
            it('should throw when not requested provider on self', function () {
                var parent = core_1.Injector.create([Engine.PROVIDER]);
                var child = core_1.Injector.create([{ provide: Car, useFactory: function (e) { return new Car(e); }, deps: [[Engine, new core_1.Self()]] }], parent);
                matchers_1.expect(function () { return child.get(Car); })
                    .toThrowError("StaticInjectorError[" + util_1.stringify(Car) + " -> " + util_1.stringify(Engine) + "]: \n  NullInjectorError: No provider for Engine!");
            });
        });
        describe('default', function () {
            it('should skip self', function () {
                var parent = core_1.Injector.create([Engine.PROVIDER]);
                var child = core_1.Injector.create([
                    TurboEngine.PROVIDER,
                    { provide: Car, useFactory: function (e) { return new Car(e); }, deps: [[core_1.SkipSelf, Engine]] }
                ], parent);
                matchers_1.expect(child.get(Car).engine).toBeAnInstanceOf(Engine);
            });
        });
    });
    describe('resolve', function () {
        it('should throw when mixing multi providers with regular providers', function () {
            matchers_1.expect(function () {
                core_1.Injector.create([{ provide: Engine, useClass: BrokenEngine, deps: [], multi: true }, Engine.PROVIDER]);
            }).toThrowError(/Cannot mix multi providers and regular providers/);
            matchers_1.expect(function () {
                core_1.Injector.create([Engine.PROVIDER, { provide: Engine, useClass: BrokenEngine, deps: [], multi: true }]);
            }).toThrowError(/Cannot mix multi providers and regular providers/);
        });
        it('should resolve forward references', function () {
            var injector = core_1.Injector.create([
                [{ provide: core_1.forwardRef(function () { return BrokenEngine; }), useClass: core_1.forwardRef(function () { return Engine; }), deps: [] }], {
                    provide: core_1.forwardRef(function () { return String; }),
                    useFactory: function (e) { return e; },
                    deps: [core_1.forwardRef(function () { return BrokenEngine; })]
                }
            ]);
            matchers_1.expect(injector.get(String)).toBeAnInstanceOf(Engine);
            matchers_1.expect(injector.get(BrokenEngine)).toBeAnInstanceOf(Engine);
        });
        it('should support overriding factory dependencies with dependency annotations', function () {
            var injector = core_1.Injector.create([
                Engine.PROVIDER,
                { provide: 'token', useFactory: function (e) { return e; }, deps: [[new core_1.Inject(Engine)]] }
            ]);
            matchers_1.expect(injector.get('token')).toBeAnInstanceOf(Engine);
        });
    });
    describe('displayName', function () {
        it('should work', function () {
            matchers_1.expect(core_1.Injector.create([Engine.PROVIDER, { provide: BrokenEngine, useValue: null }]).toString())
                .toEqual('StaticInjector[Injector, Engine, BrokenEngine]');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX2luamVjdG9yX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3Rlc3QvZGkvc3RhdGljX2luamVjdG9yX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0FBRUgsc0NBQW9IO0FBRXBILDJFQUFzRTtBQUV0RSx1Q0FBeUM7QUFFekM7SUFBQTtJQUVBLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUZEO0FBQ1MsZUFBUSxHQUFHLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztBQUdsRTtJQUVFO1FBQWdCLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3JELG1CQUFDO0FBQUQsQ0FBQyxBQUhEO0FBQ1MscUJBQVEsR0FBRyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFJeEU7SUFBQTtJQUVBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRDtBQUNTLDBCQUFRLEdBQUcsRUFBQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztBQUd4RjtJQUVFLG1CQUFZLFFBQTJCO0lBQUcsQ0FBQztJQUM3QyxnQkFBQztBQUFELENBQUMsQUFIRDtBQUNTLGtCQUFRLEdBQUcsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQWlCLENBQUMsRUFBQyxDQUFDO0FBSXpGO0lBQTBCLCtCQUFNO0lBQWhDOztJQUVBLENBQUM7SUFBRCxrQkFBQztBQUFELENBQUMsQUFGRCxDQUEwQixNQUFN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