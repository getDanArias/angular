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
var abstract_emitter_1 = require("./abstract_emitter");
var o = require("./output_ast");
var AbstractJsEmitterVisitor = (function (_super) {
    __extends(AbstractJsEmitterVisitor, _super);
    function AbstractJsEmitterVisitor() {
        return _super.call(this, false) || this;
    }
    AbstractJsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
        var _this = this;
        ctx.pushClass(stmt);
        this._visitClassConstructor(stmt, ctx);
        if (stmt.parent != null) {
            ctx.print(stmt, stmt.name + ".prototype = Object.create(");
            stmt.parent.visitExpression(this, ctx);
            ctx.println(stmt, ".prototype);");
        }
        stmt.getters.forEach(function (getter) { return _this._visitClassGetter(stmt, getter, ctx); });
        stmt.methods.forEach(function (method) { return _this._visitClassMethod(stmt, method, ctx); });
        ctx.popClass();
        return null;
    };
    AbstractJsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
        ctx.print(stmt, "function " + stmt.name + "(");
        if (stmt.constructorMethod != null) {
            this._visitParams(stmt.constructorMethod.params, ctx);
        }
        ctx.println(stmt, ") {");
        ctx.incIndent();
        if (stmt.constructorMethod != null) {
            if (stmt.constructorMethod.body.length > 0) {
                ctx.println(stmt, "var self = this;");
                this.visitAllStatements(stmt.constructorMethod.body, ctx);
            }
        }
        ctx.decIndent();
        ctx.println(stmt, "}");
    };
    AbstractJsEmitterVisitor.prototype._visitClassGetter = function (stmt, getter, ctx) {
        ctx.println(stmt, "Object.defineProperty(" + stmt.name + ".prototype, '" + getter.name + "', { get: function() {");
        ctx.incIndent();
        if (getter.body.length > 0) {
            ctx.println(stmt, "var self = this;");
            this.visitAllStatements(getter.body, ctx);
        }
        ctx.decIndent();
        ctx.println(stmt, "}});");
    };
    AbstractJsEmitterVisitor.prototype._visitClassMethod = function (stmt, method, ctx) {
        ctx.print(stmt, stmt.name + ".prototype." + method.name + " = function(");
        this._visitParams(method.params, ctx);
        ctx.println(stmt, ") {");
        ctx.incIndent();
        if (method.body.length > 0) {
            ctx.println(stmt, "var self = this;");
            this.visitAllStatements(method.body, ctx);
        }
        ctx.decIndent();
        ctx.println(stmt, "};");
    };
    AbstractJsEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
        if (ast.builtin === o.BuiltinVar.This) {
            ctx.print(ast, 'self');
        }
        else if (ast.builtin === o.BuiltinVar.Super) {
            throw new Error("'super' needs to be handled at a parent ast node, not at the variable level!");
        }
        else {
            _super.prototype.visitReadVarExpr.call(this, ast, ctx);
        }
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
        ctx.print(stmt, "var " + stmt.name + " = ");
        stmt.value.visitExpression(this, ctx);
        ctx.println(stmt, ";");
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
        ast.value.visitExpression(this, ctx);
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
        var fnExpr = expr.fn;
        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
            ctx.currentClass.parent.visitExpression(this, ctx);
            ctx.print(expr, ".call(this");
            if (expr.args.length > 0) {
                ctx.print(expr, ", ");
                this.visitAllExpressions(expr.args, ctx, ',');
            }
            ctx.print(expr, ")");
        }
        else {
            _super.prototype.visitInvokeFunctionExpr.call(this, expr, ctx);
        }
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
        ctx.print(ast, "function(");
        this._visitParams(ast.params, ctx);
        ctx.println(ast, ") {");
        ctx.incIndent();
        this.visitAllStatements(ast.statements, ctx);
        ctx.decIndent();
        ctx.print(ast, "}");
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
        ctx.print(stmt, "function " + stmt.name + "(");
        this._visitParams(stmt.params, ctx);
        ctx.println(stmt, ") {");
        ctx.incIndent();
        this.visitAllStatements(stmt.statements, ctx);
        ctx.decIndent();
        ctx.println(stmt, "}");
        return null;
    };
    AbstractJsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
        ctx.println(stmt, "try {");
        ctx.incIndent();
        this.visitAllStatements(stmt.bodyStmts, ctx);
        ctx.decIndent();
        ctx.println(stmt, "} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ") {");
        ctx.incIndent();
        var catchStmts = [abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack')).toDeclStmt(null, [
                o.StmtModifier.Final
            ])].concat(stmt.catchStmts);
        this.visitAllStatements(catchStmts, ctx);
        ctx.decIndent();
        ctx.println(stmt, "}");
        return null;
    };
    AbstractJsEmitterVisitor.prototype._visitParams = function (params, ctx) {
        this.visitAllObjects(function (param) { return ctx.print(null, param.name); }, params, ctx, ',');
    };
    AbstractJsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
        var name;
        switch (method) {
            case o.BuiltinMethod.ConcatArray:
                name = 'concat';
                break;
            case o.BuiltinMethod.SubscribeObservable:
                name = 'subscribe';
                break;
            case o.BuiltinMethod.Bind:
                name = 'bind';
                break;
            default:
                throw new Error("Unknown builtin method: " + method);
        }
        return name;
    };
    return AbstractJsEmitterVisitor;
}(abstract_emitter_1.AbstractEmitterVisitor));
exports.AbstractJsEmitterVisitor = AbstractJsEmitterVisitor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RfanNfZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvbXBpbGVyL3NyYy9vdXRwdXQvYWJzdHJhY3RfanNfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7QUFHSCx1REFBbUg7QUFDbkgsZ0NBQWtDO0FBRWxDO0lBQXVELDRDQUFzQjtJQUMzRTtlQUFnQixrQkFBTSxLQUFLLENBQUM7SUFBRSxDQUFDO0lBQy9CLHdEQUFxQixHQUFyQixVQUFzQixJQUFpQixFQUFFLEdBQTBCO1FBQW5FLGlCQWFDO1FBWkMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQixJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QixHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBSyxJQUFJLENBQUMsSUFBSSxnQ0FBNkIsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLElBQUssT0FBQSxLQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBekMsQ0FBeUMsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxJQUFLLE9BQUEsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxNQUFNLEVB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