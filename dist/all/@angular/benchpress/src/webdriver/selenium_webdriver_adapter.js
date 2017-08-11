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
var web_driver_adapter_1 = require("../web_driver_adapter");
/**
 * Adapter for the selenium-webdriver.
 */
var SeleniumWebDriverAdapter = (function (_super) {
    __extends(SeleniumWebDriverAdapter, _super);
    function SeleniumWebDriverAdapter(_driver) {
        var _this = _super.call(this) || this;
        _this._driver = _driver;
        return _this;
    }
    SeleniumWebDriverAdapter.prototype.waitFor = function (callback) { return this._driver.call(callback); };
    SeleniumWebDriverAdapter.prototype.executeScript = function (script) { return this._driver.executeScript(script); };
    SeleniumWebDriverAdapter.prototype.executeAsyncScript = function (script) {
        return this._driver.executeAsyncScript(script);
    };
    SeleniumWebDriverAdapter.prototype.capabilities = function () {
        return this._driver.getCapabilities().then(function (capsObject) {
            var localData = {};
            capsObject.forEach(function (value, key) { localData[key] = value; });
            return localData;
        });
    };
    SeleniumWebDriverAdapter.prototype.logs = function (type) {
        // Needed as selenium-webdriver does not forward
        // performance logs in the correct way via manage().logs
        return this._driver.schedule(new Command('getLog').setParameter('type', type), 'WebDriver.manage().logs().get(' + type + ')');
    };
    return SeleniumWebDriverAdapter;
}(web_driver_adapter_1.WebDriverAdapter));
SeleniumWebDriverAdapter.PROTRACTOR_PROVIDERS = [{
        provide: web_driver_adapter_1.WebDriverAdapter,
        useFactory: function () { return new SeleniumWebDriverAdapter(global.browser); },
        deps: []
    }];
exports.SeleniumWebDriverAdapter = SeleniumWebDriverAdapter;
/**
 * Copy of the `Command` class of webdriver as
 * it is not exposed via index.js in selenium-webdriver.
 */
var Command = (function () {
    function Command(name_) {
        this.name_ = name_;
        this.parameters_ = {};
    }
    Command.prototype.getName = function () { return this.name_; };
    Command.prototype.setParameter = function (name, value) {
        this.parameters_[name] = value;
        return this;
    };
    Command.prototype.setParameters = function (parameters) {
        this.parameters_ = parameters;
        return this;
    };
    Command.prototype.getParameter = function (key) { return this.parameters_[key]; };
    Command.prototype.getParameters = function () { return this.parameters_; };
    return Command;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZW5pdW1fd2ViZHJpdmVyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9iZW5jaHByZXNzL3NyYy93ZWJkcml2ZXIvc2VsZW5pdW1fd2ViZHJpdmVyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0FBSUgsNERBQXVEO0FBR3ZEOztHQUVHO0FBQ0g7SUFBOEMsNENBQWdCO0lBTzVELGtDQUFvQixPQUFZO1FBQWhDLFlBQW9DLGlCQUFPLFNBQUc7UUFBMUIsYUFBTyxHQUFQLE9BQU8sQ0FBSzs7SUFBYSxDQUFDO0lBRTlDLDBDQUFPLEdBQVAsVUFBUSxRQUFtQixJQUFrQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxGLGdEQUFhLEdBQWIsVUFBYyxNQUFjLElBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFMUYscURBQWtCLEdBQWxCLFVBQW1CLE1BQWM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELCtDQUFZLEdBQVo7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxVQUFlO1lBQ3pELElBQU0sU0FBUyxHQUF5QixFQUFFLENBQUM7WUFDM0MsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQVUsRUFBRSxHQUFXLElBQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQUksR0FBSixVQUFLLElBQVk7UUFDZixnREFBZ0Q7UUFDaEQsd0RBQXdEO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FDeEIsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFDaEQsZ0NBQWdDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDSCwrQkFBQztBQUFELENBQUMsQUFoQ0QsQ0FBOEMscUNBQWdCO0FBQ3JELDZDQUFvQixHQUFxQixDQUFDO1FBQy9DLE9BQU8sRUFBRSxxQ0FBZ0I7UUFDekIsVUFBVSxFQUFFLGNBQU0sT0FBQSxJQUFJLHdCQUF3QixDQUFPLE1BQU8sQ0FBQyxPQUFPLENBQUMsRUFBbkQsQ0FBbUQ7UUFDckUsSUFBSSxFQUFFLEVBQUU7S0FDVCxDQUFDLENBQUM7QUFMUSw0REFBd0I7QUFrQ3JDOzs7R0FHRztBQUNIO0lBRUUsaUJBQW9CLEtBQWE7UUFBYixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBRHpCLGdCQUFXLEdBQXlCLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFFckMseUJBQU8sR0FBUCxjQUFZLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUVoQyw4QkFBWSxHQUFaLFVBQWEsSUFBWSxFQUFFLEtBQVU7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwrQkFBYSxHQUFiLFVBQWMsVUFBZ0M7UUFDNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw4QkFBWSxHQUFaLFVBQWEsR0FBVyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRCwrQkFBYSxHQUFiLGNBQWtCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM5QyxjQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQyJ9