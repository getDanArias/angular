/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@whatItDoes Represents the version of Angular
 *
 * \@stable
 */
var Version = (function () {
    /**
     * @param {?} full
     */
    function Version(full) {
        this.full = full;
    }
    Object.defineProperty(Version.prototype, "major", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.')[0]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "minor", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.')[1]; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Version.prototype, "patch", {
        /**
         * @return {?}
         */
        get: function () { return this.full.split('.').slice(2).join('.'); },
        enumerable: true,
        configurable: true
    });
    return Version;
}());
export { Version };
function Version_tsickle_Closure_declarations() {
    /** @type {?} */
    Version.prototype.full;
}
/**
 * \@stable
 */
export var /** @type {?} */ VERSION = new Version('5.0.0-beta.3-14502f5b34');
//# sourceMappingURL=version.js.map