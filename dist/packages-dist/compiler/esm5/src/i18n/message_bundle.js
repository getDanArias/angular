/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { extractMessages } from './extractor_merger';
import * as i18n from './i18n_ast';
/**
 * A container for message extracted from the templates.
 */
var MessageBundle = (function () {
    /**
     * @param {?} _htmlParser
     * @param {?} _implicitTags
     * @param {?} _implicitAttrs
     * @param {?=} _locale
     */
    function MessageBundle(_htmlParser, _implicitTags, _implicitAttrs, _locale) {
        if (_locale === void 0) { _locale = null; }
        this._htmlParser = _htmlParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
        this._locale = _locale;
        this._messages = [];
    }
    /**
     * @param {?} html
     * @param {?} url
     * @param {?} interpolationConfig
     * @return {?}
     */
    MessageBundle.prototype.updateFromTemplate = function (html, url, interpolationConfig) {
        var /** @type {?} */ htmlParserResult = this._htmlParser.parse(html, url, true, interpolationConfig);
        if (htmlParserResult.errors.length) {
            return htmlParserResult.errors;
        }
        var /** @type {?} */ i18nParserResult = extractMessages(htmlParserResult.rootNodes, interpolationConfig, this._implicitTags, this._implicitAttrs);
        if (i18nParserResult.errors.length) {
            return i18nParserResult.errors;
        }
        (_a = this._messages).push.apply(_a, i18nParserResult.messages);
        return [];
        var _a;
    };
    /**
     * @return {?}
     */
    MessageBundle.prototype.getMessages = function () { return this._messages; };
    /**
     * @param {?} serializer
     * @param {?=} filterSources
     * @return {?}
     */
    MessageBundle.prototype.write = function (serializer, filterSources) {
        var /** @type {?} */ messages = {};
        var /** @type {?} */ mapperVisitor = new MapPlaceholderNames();
        // Deduplicate messages based on their ID
        this._messages.forEach(function (message) {
            var /** @type {?} */ id = serializer.digest(message);
            if (!messages.hasOwnProperty(id)) {
                messages[id] = message;
            }
            else {
                (_a = messages[id].sources).push.apply(_a, message.sources);
            }
            var _a;
        });
        // Transform placeholder names using the serializer mapping
        var /** @type {?} */ msgList = Object.keys(messages).map(function (id) {
            var /** @type {?} */ mapper = serializer.createNameMapper(messages[id]);
            var /** @type {?} */ src = messages[id];
            var /** @type {?} */ nodes = mapper ? mapperVisitor.convert(src.nodes, mapper) : src.nodes;
            var /** @type {?} */ transformedMessage = new i18n.Message(nodes, {}, {}, src.meaning, src.description, id);
            transformedMessage.sources = src.sources;
            if (filterSources) {
                transformedMessage.sources.forEach(function (source) { return source.filePath = filterSources(source.filePath); });
            }
            return transformedMessage;
        });
        return serializer.write(msgList, this._locale);
    };
    return MessageBundle;
}());
export { MessageBundle };
function MessageBundle_tsickle_Closure_declarations() {
    /** @type {?} */
    MessageBundle.prototype._messages;
    /** @type {?} */
    MessageBundle.prototype._htmlParser;
    /** @type {?} */
    MessageBundle.prototype._implicitTags;
    /** @type {?} */
    MessageBundle.prototype._implicitAttrs;
    /** @type {?} */
    MessageBundle.prototype._locale;
}
var MapPlaceholderNames = (function (_super) {
    tslib_1.__extends(MapPlaceholderNames, _super);
    function MapPlaceholderNames() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {?} nodes
     * @param {?} mapper
     * @return {?}
     */
    MapPlaceholderNames.prototype.convert = function (nodes, mapper) {
        var _this = this;
        return mapper ? nodes.map(function (n) { return n.visit(_this, mapper); }) : nodes;
    };
    /**
     * @param {?} ph
     * @param {?} mapper
     * @return {?}
     */
    MapPlaceholderNames.prototype.visitTagPlaceholder = function (ph, mapper) {
        var _this = this;
        var /** @type {?} */ startName = ((mapper.toPublicName(ph.startName)));
        var /** @type {?} */ closeName = ph.closeName ? ((mapper.toPublicName(ph.closeName))) : ph.closeName;
        var /** @type {?} */ children = ph.children.map(function (n) { return n.visit(_this, mapper); });
        return new i18n.TagPlaceholder(ph.tag, ph.attrs, startName, closeName, children, ph.isVoid, ph.sourceSpan);
    };
    /**
     * @param {?} ph
     * @param {?} mapper
     * @return {?}
     */
    MapPlaceholderNames.prototype.visitPlaceholder = function (ph, mapper) {
        return new i18n.Placeholder(ph.value, /** @type {?} */ ((mapper.toPublicName(ph.name))), ph.sourceSpan);
    };
    /**
     * @param {?} ph
     * @param {?} mapper
     * @return {?}
     */
    MapPlaceholderNames.prototype.visitIcuPlaceholder = function (ph, mapper) {
        return new i18n.IcuPlaceholder(ph.value, /** @type {?} */ ((mapper.toPublicName(ph.name))), ph.sourceSpan);
    };
    return MapPlaceholderNames;
}(i18n.CloneVisitor));
//# sourceMappingURL=message_bundle.js.map