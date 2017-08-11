"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
var testing_internal_1 = require("../../../core/testing/src/testing_internal");
var html_parser_1 = require("../../src/ml_parser/html_parser");
var template_preparser_1 = require("../../src/template_parser/template_preparser");
function main() {
    testing_internal_1.describe('preparseElement', function () {
        var htmlParser;
        testing_internal_1.beforeEach(testing_internal_1.inject([html_parser_1.HtmlParser], function (_htmlParser) { htmlParser = _htmlParser; }));
        function preparse(html) {
            return template_preparser_1.preparseElement(htmlParser.parse(html, 'TestComp').rootNodes[0]);
        }
        testing_internal_1.it('should detect script elements', testing_internal_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            testing_internal_1.expect(preparse('<script>').type).toBe(template_preparser_1.PreparsedElementType.SCRIPT);
        }));
        testing_internal_1.it('should detect style elements', testing_internal_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            testing_internal_1.expect(preparse('<style>').type).toBe(template_preparser_1.PreparsedElementType.STYLE);
        }));
        testing_internal_1.it('should detect stylesheet elements', testing_internal_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            testing_internal_1.expect(preparse('<link rel="stylesheet">').type).toBe(template_preparser_1.PreparsedElementType.STYLESHEET);
            testing_internal_1.expect(preparse('<link rel="stylesheet" href="someUrl">').hrefAttr).toEqual('someUrl');
            testing_internal_1.expect(preparse('<link rel="someRel">').type).toBe(template_preparser_1.PreparsedElementType.OTHER);
        }));
        testing_internal_1.it('should detect ng-content elements', testing_internal_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            testing_internal_1.expect(preparse('<ng-content>').type).toBe(template_preparser_1.PreparsedElementType.NG_CONTENT);
        }));
        testing_internal_1.it('should normalize ng-content.select attribute', testing_internal_1.inject([html_parser_1.HtmlParser], function (htmlParser) {
            testing_internal_1.expect(preparse('<ng-content>').selectAttr).toEqual('*');
            testing_internal_1.expect(preparse('<ng-content select>').selectAttr).toEqual('*');
            testing_internal_1.expect(preparse('<ng-content select="*">').selectAttr).toEqual('*');
        }));
        testing_internal_1.it('should extract ngProjectAs value', function () {
            testing_internal_1.expect(preparse('<p ngProjectAs="el[attr].class"></p>').projectAs).toEqual('el[attr].class');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcHJlcGFyc2VyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21waWxlci90ZXN0L3RlbXBsYXRlX3BhcnNlci90ZW1wbGF0ZV9wcmVwYXJzZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOztBQUVILCtFQUFvRztBQUVwRywrREFBMkQ7QUFDM0QsbUZBQXFIO0FBRXJIO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLFVBQXNCLENBQUM7UUFDM0IsNkJBQVUsQ0FBQyx5QkFBTSxDQUFDLENBQUMsd0JBQVUsQ0FBQyxFQUFFLFVBQUMsV0FBdUIsSUFBTyxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3RixrQkFBa0IsSUFBWTtZQUM1QixNQUFNLENBQUMsb0NBQWUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFZLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBRUQscUJBQUUsQ0FBQywrQkFBK0IsRUFBRSx5QkFBTSxDQUFDLENBQUMsd0JBQVUsQ0FBQyxFQUFFLFVBQUMsVUFBc0I7WUFDM0UseUJBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLDhCQUE4QixFQUFFLHlCQUFNLENBQUMsQ0FBQyx3QkFBVSxDQUFDLEVBQUUsVUFBQyxVQUFzQjtZQUMxRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMseUNBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsbUNBQW1DLEVBQUUseUJBQU0sQ0FBQyxDQUFDLHdCQUFVLENBQUMsRUFBRSxVQUFDLFVBQXNCO1lBQy9FLHlCQUFNLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUFvQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZGLHlCQUFNLENBQUMsUUFBUSxDQUFDLHdDQUF3QyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZGLHlCQUFNLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pGLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLG1DQUFtQyxFQUFFLHlCQUFNLENBQUMsQ0FBQyx3QkFBVSxDQUFDLEVBQUUsVUFBQyxVQUFzQjtZQUMvRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMseUNBQW9CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsOENBQThDLEVBQzlDLHlCQUFNLENBQUMsQ0FBQyx3QkFBVSxDQUFDLEVBQUUsVUFBQyxVQUFzQjtZQUMxQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDekQseUJBQU0sQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEUseUJBQU0sQ0FBQyxRQUFRLENBQUMseUJBQXlCLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDckMseUJBQU0sQ0FBQyxRQUFRLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMvRixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXRDRCxvQkFzQ0MifQ==