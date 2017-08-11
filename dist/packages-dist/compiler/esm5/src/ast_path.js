/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * A path is an ordered set of elements. Typically a path is to  a
 * particular offset in a source file. The head of the list is the top
 * most node. The tail is the node that contains the offset directly.
 *
 * For example, the expresion `a + b + c` might have an ast that looks
 * like:
 *     +
 *    / \
 *   a   +
 *      / \
 *     b   c
 *
 * The path to the node at offset 9 would be `['+' at 1-10, '+' at 7-10,
 * 'c' at 9-10]` and the path the node at offset 1 would be
 * `['+' at 1-10, 'a' at 1-2]`.
 */
var AstPath = (function () {
    /**
     * @param {?} path
     * @param {?=} position
     */
    function AstPath(path, position) {
        if (position === void 0) { position = -1; }
        this.path = path;
        this.position = position;
    }
    Object.defineProperty(AstPath.prototype, "empty", {
        /**
         * @return {?}
         */
        get: function () { return !this.path || !this.path.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AstPath.prototype, "head", {
        /**
         * @return {?}
         */
        get: function () { return this.path[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AstPath.prototype, "tail", {
        /**
         * @return {?}
         */
        get: function () { return this.path[this.path.length - 1]; },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} node
     * @return {?}
     */
    AstPath.prototype.parentOf = function (node) {
        return node && this.path[this.path.indexOf(node) - 1];
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AstPath.prototype.childOf = function (node) { return this.path[this.path.indexOf(node) + 1]; };
    /**
     * @template N
     * @param {?} ctor
     * @return {?}
     */
    AstPath.prototype.first = function (ctor) {
        for (var /** @type {?} */ i = this.path.length - 1; i >= 0; i--) {
            var /** @type {?} */ item = this.path[i];
            if (item instanceof ctor)
                return (item);
        }
    };
    /**
     * @param {?} node
     * @return {?}
     */
    AstPath.prototype.push = function (node) { this.path.push(node); };
    /**
     * @return {?}
     */
    AstPath.prototype.pop = function () { return ((this.path.pop())); };
    return AstPath;
}());
export { AstPath };
function AstPath_tsickle_Closure_declarations() {
    /** @type {?} */
    AstPath.prototype.path;
    /** @type {?} */
    AstPath.prototype.position;
}
//# sourceMappingURL=ast_path.js.map