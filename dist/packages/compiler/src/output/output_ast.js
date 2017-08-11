/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
export let TypeModifier = {};
TypeModifier.Const = 0;
TypeModifier[TypeModifier.Const] = "Const";
/**
 * @abstract
 */
export class Type {
    /**
     * @param {?=} modifiers
     */
    constructor(modifiers = null) {
        this.modifiers = modifiers;
        if (!modifiers) {
            this.modifiers = [];
        }
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return ((this.modifiers)).indexOf(modifier) !== -1; }
}
function Type_tsickle_Closure_declarations() {
    /** @type {?} */
    Type.prototype.modifiers;
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Type.prototype.visitType = function (visitor, context) { };
}
export let BuiltinTypeName = {};
BuiltinTypeName.Dynamic = 0;
BuiltinTypeName.Bool = 1;
BuiltinTypeName.String = 2;
BuiltinTypeName.Int = 3;
BuiltinTypeName.Number = 4;
BuiltinTypeName.Function = 5;
BuiltinTypeName.Inferred = 6;
BuiltinTypeName[BuiltinTypeName.Dynamic] = "Dynamic";
BuiltinTypeName[BuiltinTypeName.Bool] = "Bool";
BuiltinTypeName[BuiltinTypeName.String] = "String";
BuiltinTypeName[BuiltinTypeName.Int] = "Int";
BuiltinTypeName[BuiltinTypeName.Number] = "Number";
BuiltinTypeName[BuiltinTypeName.Function] = "Function";
BuiltinTypeName[BuiltinTypeName.Inferred] = "Inferred";
export class BuiltinType extends Type {
    /**
     * @param {?} name
     * @param {?=} modifiers
     */
    constructor(name, modifiers = null) {
        super(modifiers);
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitBuiltintType(this, context);
    }
}
function BuiltinType_tsickle_Closure_declarations() {
    /** @type {?} */
    BuiltinType.prototype.name;
}
export class ExpressionType extends Type {
    /**
     * @param {?} value
     * @param {?=} modifiers
     */
    constructor(value, modifiers = null) {
        super(modifiers);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitExpressionType(this, context);
    }
}
function ExpressionType_tsickle_Closure_declarations() {
    /** @type {?} */
    ExpressionType.prototype.value;
}
export class ArrayType extends Type {
    /**
     * @param {?} of
     * @param {?=} modifiers
     */
    constructor(of, modifiers = null) {
        super(modifiers);
        this.of = of;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) {
        return visitor.visitArrayType(this, context);
    }
}
function ArrayType_tsickle_Closure_declarations() {
    /** @type {?} */
    ArrayType.prototype.of;
}
export class MapType extends Type {
    /**
     * @param {?} valueType
     * @param {?=} modifiers
     */
    constructor(valueType, modifiers = null) {
        super(modifiers);
        this.valueType = valueType || null;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitType(visitor, context) { return visitor.visitMapType(this, context); }
}
function MapType_tsickle_Closure_declarations() {
    /** @type {?} */
    MapType.prototype.valueType;
}
export const /** @type {?} */ DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
export const /** @type {?} */ INFERRED_TYPE = new BuiltinType(BuiltinTypeName.Inferred);
export const /** @type {?} */ BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
export const /** @type {?} */ INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
export const /** @type {?} */ NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
export const /** @type {?} */ STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
export const /** @type {?} */ FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
/**
 * @record
 */
export function TypeVisitor() { }
function TypeVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    TypeVisitor.prototype.visitBuiltintType;
    /** @type {?} */
    TypeVisitor.prototype.visitExpressionType;
    /** @type {?} */
    TypeVisitor.prototype.visitArrayType;
    /** @type {?} */
    TypeVisitor.prototype.visitMapType;
}
export let BinaryOperator = {};
BinaryOperator.Equals = 0;
BinaryOperator.NotEquals = 1;
BinaryOperator.Identical = 2;
BinaryOperator.NotIdentical = 3;
BinaryOperator.Minus = 4;
BinaryOperator.Plus = 5;
BinaryOperator.Divide = 6;
BinaryOperator.Multiply = 7;
BinaryOperator.Modulo = 8;
BinaryOperator.And = 9;
BinaryOperator.Or = 10;
BinaryOperator.Lower = 11;
BinaryOperator.LowerEquals = 12;
BinaryOperator.Bigger = 13;
BinaryOperator.BiggerEquals = 14;
BinaryOperator[BinaryOperator.Equals] = "Equals";
BinaryOperator[BinaryOperator.NotEquals] = "NotEquals";
BinaryOperator[BinaryOperator.Identical] = "Identical";
BinaryOperator[BinaryOperator.NotIdentical] = "NotIdentical";
BinaryOperator[BinaryOperator.Minus] = "Minus";
BinaryOperator[BinaryOperator.Plus] = "Plus";
BinaryOperator[BinaryOperator.Divide] = "Divide";
BinaryOperator[BinaryOperator.Multiply] = "Multiply";
BinaryOperator[BinaryOperator.Modulo] = "Modulo";
BinaryOperator[BinaryOperator.And] = "And";
BinaryOperator[BinaryOperator.Or] = "Or";
BinaryOperator[BinaryOperator.Lower] = "Lower";
BinaryOperator[BinaryOperator.LowerEquals] = "LowerEquals";
BinaryOperator[BinaryOperator.Bigger] = "Bigger";
BinaryOperator[BinaryOperator.BiggerEquals] = "BiggerEquals";
/**
 * @abstract
 */
export class Expression {
    /**
     * @param {?} type
     * @param {?=} sourceSpan
     */
    constructor(type, sourceSpan) {
        this.type = type || null;
        this.sourceSpan = sourceSpan || null;
    }
    /**
     * @param {?} name
     * @param {?=} sourceSpan
     * @return {?}
     */
    prop(name, sourceSpan) {
        return new ReadPropExpr(this, name, null, sourceSpan);
    }
    /**
     * @param {?} index
     * @param {?=} type
     * @param {?=} sourceSpan
     * @return {?}
     */
    key(index, type, sourceSpan) {
        return new ReadKeyExpr(this, index, type, sourceSpan);
    }
    /**
     * @param {?} name
     * @param {?} params
     * @param {?=} sourceSpan
     * @return {?}
     */
    callMethod(name, params, sourceSpan) {
        return new InvokeMethodExpr(this, name, params, null, sourceSpan);
    }
    /**
     * @param {?} params
     * @param {?=} sourceSpan
     * @return {?}
     */
    callFn(params, sourceSpan) {
        return new InvokeFunctionExpr(this, params, null, sourceSpan);
    }
    /**
     * @param {?} params
     * @param {?=} type
     * @param {?=} sourceSpan
     * @return {?}
     */
    instantiate(params, type, sourceSpan) {
        return new InstantiateExpr(this, params, type, sourceSpan);
    }
    /**
     * @param {?} trueCase
     * @param {?=} falseCase
     * @param {?=} sourceSpan
     * @return {?}
     */
    conditional(trueCase, falseCase = null, sourceSpan) {
        return new ConditionalExpr(this, trueCase, falseCase, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    equals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    notEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    identical(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    notIdentical(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    minus(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    plus(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    divide(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    multiply(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    modulo(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    and(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    or(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    lower(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    lowerEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    bigger(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?} rhs
     * @param {?=} sourceSpan
     * @return {?}
     */
    biggerEquals(rhs, sourceSpan) {
        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs, null, sourceSpan);
    }
    /**
     * @param {?=} sourceSpan
     * @return {?}
     */
    isBlank(sourceSpan) {
        // Note: We use equals by purpose here to compare to null and undefined in JS.
        // We use the typed null to allow strictNullChecks to narrow types.
        return this.equals(TYPED_NULL_EXPR, sourceSpan);
    }
    /**
     * @param {?} type
     * @param {?=} sourceSpan
     * @return {?}
     */
    cast(type, sourceSpan) {
        return new CastExpr(this, type, sourceSpan);
    }
    /**
     * @return {?}
     */
    toStmt() { return new ExpressionStatement(this, null); }
}
function Expression_tsickle_Closure_declarations() {
    /** @type {?} */
    Expression.prototype.type;
    /** @type {?} */
    Expression.prototype.sourceSpan;
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Expression.prototype.visitExpression = function (visitor, context) { };
}
export let BuiltinVar = {};
BuiltinVar.This = 0;
BuiltinVar.Super = 1;
BuiltinVar.CatchError = 2;
BuiltinVar.CatchStack = 3;
BuiltinVar[BuiltinVar.This] = "This";
BuiltinVar[BuiltinVar.Super] = "Super";
BuiltinVar[BuiltinVar.CatchError] = "CatchError";
BuiltinVar[BuiltinVar.CatchStack] = "CatchStack";
export class ReadVarExpr extends Expression {
    /**
     * @param {?} name
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(name, type, sourceSpan) {
        super(type, sourceSpan);
        if (typeof name === 'string') {
            this.name = name;
            this.builtin = null;
        }
        else {
            this.name = null;
            this.builtin = (name);
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadVarExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) {
        if (!this.name) {
            throw new Error(`Built in variable ${this.builtin} can not be assigned to.`);
        }
        return new WriteVarExpr(this.name, value, null, this.sourceSpan);
    }
}
function ReadVarExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    ReadVarExpr.prototype.name;
    /** @type {?} */
    ReadVarExpr.prototype.builtin;
}
export class WriteVarExpr extends Expression {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(name, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWriteVarExpr(this, context);
    }
    /**
     * @param {?=} type
     * @param {?=} modifiers
     * @return {?}
     */
    toDeclStmt(type, modifiers) {
        return new DeclareVarStmt(this.name, this.value, type, modifiers, this.sourceSpan);
    }
}
function WriteVarExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    WriteVarExpr.prototype.value;
    /** @type {?} */
    WriteVarExpr.prototype.name;
}
export class WriteKeyExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?} value
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(receiver, index, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.receiver = receiver;
        this.index = index;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWriteKeyExpr(this, context);
    }
}
function WriteKeyExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    WriteKeyExpr.prototype.value;
    /** @type {?} */
    WriteKeyExpr.prototype.receiver;
    /** @type {?} */
    WriteKeyExpr.prototype.index;
}
export class WritePropExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(receiver, name, value, type, sourceSpan) {
        super(type || value.type, sourceSpan);
        this.receiver = receiver;
        this.name = name;
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitWritePropExpr(this, context);
    }
}
function WritePropExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    WritePropExpr.prototype.value;
    /** @type {?} */
    WritePropExpr.prototype.receiver;
    /** @type {?} */
    WritePropExpr.prototype.name;
}
export let BuiltinMethod = {};
BuiltinMethod.ConcatArray = 0;
BuiltinMethod.SubscribeObservable = 1;
BuiltinMethod.Bind = 2;
BuiltinMethod[BuiltinMethod.ConcatArray] = "ConcatArray";
BuiltinMethod[BuiltinMethod.SubscribeObservable] = "SubscribeObservable";
BuiltinMethod[BuiltinMethod.Bind] = "Bind";
export class InvokeMethodExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} method
     * @param {?} args
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(receiver, method, args, type, sourceSpan) {
        super(type, sourceSpan);
        this.receiver = receiver;
        this.args = args;
        if (typeof method === 'string') {
            this.name = method;
            this.builtin = null;
        }
        else {
            this.name = null;
            this.builtin = (method);
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInvokeMethodExpr(this, context);
    }
}
function InvokeMethodExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    InvokeMethodExpr.prototype.name;
    /** @type {?} */
    InvokeMethodExpr.prototype.builtin;
    /** @type {?} */
    InvokeMethodExpr.prototype.receiver;
    /** @type {?} */
    InvokeMethodExpr.prototype.args;
}
export class InvokeFunctionExpr extends Expression {
    /**
     * @param {?} fn
     * @param {?} args
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(fn, args, type, sourceSpan) {
        super(type, sourceSpan);
        this.fn = fn;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInvokeFunctionExpr(this, context);
    }
}
function InvokeFunctionExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    InvokeFunctionExpr.prototype.fn;
    /** @type {?} */
    InvokeFunctionExpr.prototype.args;
}
export class InstantiateExpr extends Expression {
    /**
     * @param {?} classExpr
     * @param {?} args
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(classExpr, args, type, sourceSpan) {
        super(type, sourceSpan);
        this.classExpr = classExpr;
        this.args = args;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitInstantiateExpr(this, context);
    }
}
function InstantiateExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    InstantiateExpr.prototype.classExpr;
    /** @type {?} */
    InstantiateExpr.prototype.args;
}
export class LiteralExpr extends Expression {
    /**
     * @param {?} value
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(value, type, sourceSpan) {
        super(type, sourceSpan);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralExpr(this, context);
    }
}
function LiteralExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    LiteralExpr.prototype.value;
}
export class ExternalExpr extends Expression {
    /**
     * @param {?} value
     * @param {?=} type
     * @param {?=} typeParams
     * @param {?=} sourceSpan
     */
    constructor(value, type, typeParams = null, sourceSpan) {
        super(type, sourceSpan);
        this.value = value;
        this.typeParams = typeParams;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitExternalExpr(this, context);
    }
}
function ExternalExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    ExternalExpr.prototype.value;
    /** @type {?} */
    ExternalExpr.prototype.typeParams;
}
export class ExternalReference {
    /**
     * @param {?} moduleName
     * @param {?} name
     * @param {?} runtime
     */
    constructor(moduleName, name, runtime) {
        this.moduleName = moduleName;
        this.name = name;
        this.runtime = runtime;
    }
}
function ExternalReference_tsickle_Closure_declarations() {
    /** @type {?} */
    ExternalReference.prototype.moduleName;
    /** @type {?} */
    ExternalReference.prototype.name;
    /** @type {?} */
    ExternalReference.prototype.runtime;
}
export class ConditionalExpr extends Expression {
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(condition, trueCase, falseCase = null, type, sourceSpan) {
        super(type || trueCase.type, sourceSpan);
        this.condition = condition;
        this.falseCase = falseCase;
        this.trueCase = trueCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitConditionalExpr(this, context);
    }
}
function ConditionalExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    ConditionalExpr.prototype.trueCase;
    /** @type {?} */
    ConditionalExpr.prototype.condition;
    /** @type {?} */
    ConditionalExpr.prototype.falseCase;
}
export class NotExpr extends Expression {
    /**
     * @param {?} condition
     * @param {?=} sourceSpan
     */
    constructor(condition, sourceSpan) {
        super(BOOL_TYPE, sourceSpan);
        this.condition = condition;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitNotExpr(this, context);
    }
}
function NotExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    NotExpr.prototype.condition;
}
export class AssertNotNull extends Expression {
    /**
     * @param {?} condition
     * @param {?=} sourceSpan
     */
    constructor(condition, sourceSpan) {
        super(condition.type, sourceSpan);
        this.condition = condition;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitAssertNotNullExpr(this, context);
    }
}
function AssertNotNull_tsickle_Closure_declarations() {
    /** @type {?} */
    AssertNotNull.prototype.condition;
}
export class CastExpr extends Expression {
    /**
     * @param {?} value
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(value, type, sourceSpan) {
        super(type, sourceSpan);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitCastExpr(this, context);
    }
}
function CastExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    CastExpr.prototype.value;
}
export class FnParam {
    /**
     * @param {?} name
     * @param {?=} type
     */
    constructor(name, type = null) {
        this.name = name;
        this.type = type;
    }
}
function FnParam_tsickle_Closure_declarations() {
    /** @type {?} */
    FnParam.prototype.name;
    /** @type {?} */
    FnParam.prototype.type;
}
export class FunctionExpr extends Expression {
    /**
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(params, statements, type, sourceSpan) {
        super(type, sourceSpan);
        this.params = params;
        this.statements = statements;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitFunctionExpr(this, context);
    }
    /**
     * @param {?} name
     * @param {?=} modifiers
     * @return {?}
     */
    toDeclStmt(name, modifiers = null) {
        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers, this.sourceSpan);
    }
}
function FunctionExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    FunctionExpr.prototype.params;
    /** @type {?} */
    FunctionExpr.prototype.statements;
}
export class BinaryOperatorExpr extends Expression {
    /**
     * @param {?} operator
     * @param {?} lhs
     * @param {?} rhs
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(operator, lhs, rhs, type, sourceSpan) {
        super(type || lhs.type, sourceSpan);
        this.operator = operator;
        this.rhs = rhs;
        this.lhs = lhs;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitBinaryOperatorExpr(this, context);
    }
}
function BinaryOperatorExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    BinaryOperatorExpr.prototype.lhs;
    /** @type {?} */
    BinaryOperatorExpr.prototype.operator;
    /** @type {?} */
    BinaryOperatorExpr.prototype.rhs;
}
export class ReadPropExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} name
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(receiver, name, type, sourceSpan) {
        super(type, sourceSpan);
        this.receiver = receiver;
        this.name = name;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadPropExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) {
        return new WritePropExpr(this.receiver, this.name, value, null, this.sourceSpan);
    }
}
function ReadPropExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    ReadPropExpr.prototype.receiver;
    /** @type {?} */
    ReadPropExpr.prototype.name;
}
export class ReadKeyExpr extends Expression {
    /**
     * @param {?} receiver
     * @param {?} index
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(receiver, index, type, sourceSpan) {
        super(type, sourceSpan);
        this.receiver = receiver;
        this.index = index;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitReadKeyExpr(this, context);
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set(value) {
        return new WriteKeyExpr(this.receiver, this.index, value, null, this.sourceSpan);
    }
}
function ReadKeyExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    ReadKeyExpr.prototype.receiver;
    /** @type {?} */
    ReadKeyExpr.prototype.index;
}
export class LiteralArrayExpr extends Expression {
    /**
     * @param {?} entries
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(entries, type, sourceSpan) {
        super(type, sourceSpan);
        this.entries = entries;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralArrayExpr(this, context);
    }
}
function LiteralArrayExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    LiteralArrayExpr.prototype.entries;
}
export class LiteralMapEntry {
    /**
     * @param {?} key
     * @param {?} value
     * @param {?} quoted
     */
    constructor(key, value, quoted) {
        this.key = key;
        this.value = value;
        this.quoted = quoted;
    }
}
function LiteralMapEntry_tsickle_Closure_declarations() {
    /** @type {?} */
    LiteralMapEntry.prototype.key;
    /** @type {?} */
    LiteralMapEntry.prototype.value;
    /** @type {?} */
    LiteralMapEntry.prototype.quoted;
}
export class LiteralMapExpr extends Expression {
    /**
     * @param {?} entries
     * @param {?=} type
     * @param {?=} sourceSpan
     */
    constructor(entries, type, sourceSpan) {
        super(type, sourceSpan);
        this.entries = entries;
        this.valueType = null;
        if (type) {
            this.valueType = type.valueType;
        }
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitLiteralMapExpr(this, context);
    }
}
function LiteralMapExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    LiteralMapExpr.prototype.valueType;
    /** @type {?} */
    LiteralMapExpr.prototype.entries;
}
export class CommaExpr extends Expression {
    /**
     * @param {?} parts
     * @param {?=} sourceSpan
     */
    constructor(parts, sourceSpan) {
        super(parts[parts.length - 1].type, sourceSpan);
        this.parts = parts;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitExpression(visitor, context) {
        return visitor.visitCommaExpr(this, context);
    }
}
function CommaExpr_tsickle_Closure_declarations() {
    /** @type {?} */
    CommaExpr.prototype.parts;
}
/**
 * @record
 */
export function ExpressionVisitor() { }
function ExpressionVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    ExpressionVisitor.prototype.visitReadVarExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitWriteVarExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitWriteKeyExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitWritePropExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitInvokeMethodExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitInvokeFunctionExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitInstantiateExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitLiteralExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitExternalExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitConditionalExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitNotExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitAssertNotNullExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitCastExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitFunctionExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitBinaryOperatorExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitReadPropExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitReadKeyExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitLiteralArrayExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitLiteralMapExpr;
    /** @type {?} */
    ExpressionVisitor.prototype.visitCommaExpr;
}
export const /** @type {?} */ THIS_EXPR = new ReadVarExpr(BuiltinVar.This, null, null);
export const /** @type {?} */ SUPER_EXPR = new ReadVarExpr(BuiltinVar.Super, null, null);
export const /** @type {?} */ CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError, null, null);
export const /** @type {?} */ CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack, null, null);
export const /** @type {?} */ NULL_EXPR = new LiteralExpr(null, null, null);
export const /** @type {?} */ TYPED_NULL_EXPR = new LiteralExpr(null, INFERRED_TYPE, null);
export let StmtModifier = {};
StmtModifier.Final = 0;
StmtModifier.Private = 1;
StmtModifier.Exported = 2;
StmtModifier[StmtModifier.Final] = "Final";
StmtModifier[StmtModifier.Private] = "Private";
StmtModifier[StmtModifier.Exported] = "Exported";
/**
 * @abstract
 */
export class Statement {
    /**
     * @param {?=} modifiers
     * @param {?=} sourceSpan
     */
    constructor(modifiers, sourceSpan) {
        this.modifiers = modifiers || [];
        this.sourceSpan = sourceSpan || null;
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return ((this.modifiers)).indexOf(modifier) !== -1; }
}
function Statement_tsickle_Closure_declarations() {
    /** @type {?} */
    Statement.prototype.modifiers;
    /** @type {?} */
    Statement.prototype.sourceSpan;
    /**
     * @abstract
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    Statement.prototype.visitStatement = function (visitor, context) { };
}
export class DeclareVarStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} value
     * @param {?=} type
     * @param {?=} modifiers
     * @param {?=} sourceSpan
     */
    constructor(name, value, type, modifiers = null, sourceSpan) {
        super(modifiers, sourceSpan);
        this.name = name;
        this.value = value;
        this.type = type || value.type;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareVarStmt(this, context);
    }
}
function DeclareVarStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    DeclareVarStmt.prototype.type;
    /** @type {?} */
    DeclareVarStmt.prototype.name;
    /** @type {?} */
    DeclareVarStmt.prototype.value;
}
export class DeclareFunctionStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} statements
     * @param {?=} type
     * @param {?=} modifiers
     * @param {?=} sourceSpan
     */
    constructor(name, params, statements, type, modifiers = null, sourceSpan) {
        super(modifiers, sourceSpan);
        this.name = name;
        this.params = params;
        this.statements = statements;
        this.type = type || null;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareFunctionStmt(this, context);
    }
}
function DeclareFunctionStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    DeclareFunctionStmt.prototype.type;
    /** @type {?} */
    DeclareFunctionStmt.prototype.name;
    /** @type {?} */
    DeclareFunctionStmt.prototype.params;
    /** @type {?} */
    DeclareFunctionStmt.prototype.statements;
}
export class ExpressionStatement extends Statement {
    /**
     * @param {?} expr
     * @param {?=} sourceSpan
     */
    constructor(expr, sourceSpan) {
        super(null, sourceSpan);
        this.expr = expr;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitExpressionStmt(this, context);
    }
}
function ExpressionStatement_tsickle_Closure_declarations() {
    /** @type {?} */
    ExpressionStatement.prototype.expr;
}
export class ReturnStatement extends Statement {
    /**
     * @param {?} value
     * @param {?=} sourceSpan
     */
    constructor(value, sourceSpan) {
        super(null, sourceSpan);
        this.value = value;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitReturnStmt(this, context);
    }
}
function ReturnStatement_tsickle_Closure_declarations() {
    /** @type {?} */
    ReturnStatement.prototype.value;
}
export class AbstractClassPart {
    /**
     * @param {?} type
     * @param {?} modifiers
     */
    constructor(type, modifiers) {
        this.modifiers = modifiers;
        if (!modifiers) {
            this.modifiers = [];
        }
        this.type = type || null;
    }
    /**
     * @param {?} modifier
     * @return {?}
     */
    hasModifier(modifier) { return ((this.modifiers)).indexOf(modifier) !== -1; }
}
function AbstractClassPart_tsickle_Closure_declarations() {
    /** @type {?} */
    AbstractClassPart.prototype.type;
    /** @type {?} */
    AbstractClassPart.prototype.modifiers;
}
export class ClassField extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, type, modifiers = null) {
        super(type, modifiers);
        this.name = name;
    }
}
function ClassField_tsickle_Closure_declarations() {
    /** @type {?} */
    ClassField.prototype.name;
}
export class ClassMethod extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?} params
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, params, body, type, modifiers = null) {
        super(type, modifiers);
        this.name = name;
        this.params = params;
        this.body = body;
    }
}
function ClassMethod_tsickle_Closure_declarations() {
    /** @type {?} */
    ClassMethod.prototype.name;
    /** @type {?} */
    ClassMethod.prototype.params;
    /** @type {?} */
    ClassMethod.prototype.body;
}
export class ClassGetter extends AbstractClassPart {
    /**
     * @param {?} name
     * @param {?} body
     * @param {?=} type
     * @param {?=} modifiers
     */
    constructor(name, body, type, modifiers = null) {
        super(type, modifiers);
        this.name = name;
        this.body = body;
    }
}
function ClassGetter_tsickle_Closure_declarations() {
    /** @type {?} */
    ClassGetter.prototype.name;
    /** @type {?} */
    ClassGetter.prototype.body;
}
export class ClassStmt extends Statement {
    /**
     * @param {?} name
     * @param {?} parent
     * @param {?} fields
     * @param {?} getters
     * @param {?} constructorMethod
     * @param {?} methods
     * @param {?=} modifiers
     * @param {?=} sourceSpan
     */
    constructor(name, parent, fields, getters, constructorMethod, methods, modifiers = null, sourceSpan) {
        super(modifiers, sourceSpan);
        this.name = name;
        this.parent = parent;
        this.fields = fields;
        this.getters = getters;
        this.constructorMethod = constructorMethod;
        this.methods = methods;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitDeclareClassStmt(this, context);
    }
}
function ClassStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    ClassStmt.prototype.name;
    /** @type {?} */
    ClassStmt.prototype.parent;
    /** @type {?} */
    ClassStmt.prototype.fields;
    /** @type {?} */
    ClassStmt.prototype.getters;
    /** @type {?} */
    ClassStmt.prototype.constructorMethod;
    /** @type {?} */
    ClassStmt.prototype.methods;
}
export class IfStmt extends Statement {
    /**
     * @param {?} condition
     * @param {?} trueCase
     * @param {?=} falseCase
     * @param {?=} sourceSpan
     */
    constructor(condition, trueCase, falseCase = [], sourceSpan) {
        super(null, sourceSpan);
        this.condition = condition;
        this.trueCase = trueCase;
        this.falseCase = falseCase;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitIfStmt(this, context);
    }
}
function IfStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    IfStmt.prototype.condition;
    /** @type {?} */
    IfStmt.prototype.trueCase;
    /** @type {?} */
    IfStmt.prototype.falseCase;
}
export class CommentStmt extends Statement {
    /**
     * @param {?} comment
     * @param {?=} sourceSpan
     */
    constructor(comment, sourceSpan) {
        super(null, sourceSpan);
        this.comment = comment;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitCommentStmt(this, context);
    }
}
function CommentStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    CommentStmt.prototype.comment;
}
export class TryCatchStmt extends Statement {
    /**
     * @param {?} bodyStmts
     * @param {?} catchStmts
     * @param {?=} sourceSpan
     */
    constructor(bodyStmts, catchStmts, sourceSpan) {
        super(null, sourceSpan);
        this.bodyStmts = bodyStmts;
        this.catchStmts = catchStmts;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitTryCatchStmt(this, context);
    }
}
function TryCatchStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    TryCatchStmt.prototype.bodyStmts;
    /** @type {?} */
    TryCatchStmt.prototype.catchStmts;
}
export class ThrowStmt extends Statement {
    /**
     * @param {?} error
     * @param {?=} sourceSpan
     */
    constructor(error, sourceSpan) {
        super(null, sourceSpan);
        this.error = error;
    }
    /**
     * @param {?} visitor
     * @param {?} context
     * @return {?}
     */
    visitStatement(visitor, context) {
        return visitor.visitThrowStmt(this, context);
    }
}
function ThrowStmt_tsickle_Closure_declarations() {
    /** @type {?} */
    ThrowStmt.prototype.error;
}
/**
 * @record
 */
export function StatementVisitor() { }
function StatementVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    StatementVisitor.prototype.visitDeclareVarStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitDeclareFunctionStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitExpressionStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitReturnStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitDeclareClassStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitIfStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitTryCatchStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitThrowStmt;
    /** @type {?} */
    StatementVisitor.prototype.visitCommentStmt;
}
export class AstTransformer {
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    transformExpr(expr, context) { return expr; }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    transformStmt(stmt, context) { return stmt; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) { return this.transformExpr(ast, context); }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteVarExpr(expr, context) {
        return this.transformExpr(new WriteVarExpr(expr.name, expr.value.visitExpression(this, context), expr.type, expr.sourceSpan), context);
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteKeyExpr(expr, context) {
        return this.transformExpr(new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context), expr.type, expr.sourceSpan), context);
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWritePropExpr(expr, context) {
        return this.transformExpr(new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context), expr.type, expr.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeMethodExpr(ast, context) {
        const /** @type {?} */ method = ast.builtin || ast.name;
        return this.transformExpr(new InvokeMethodExpr(ast.receiver.visitExpression(this, context), /** @type {?} */ ((method)), this.visitAllExpressions(ast.args, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeFunctionExpr(ast, context) {
        return this.transformExpr(new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInstantiateExpr(ast, context) {
        return this.transformExpr(new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralExpr(ast, context) { return this.transformExpr(ast, context); }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExternalExpr(ast, context) {
        return this.transformExpr(ast, context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditionalExpr(ast, context) {
        return this.transformExpr(new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), /** @type {?} */ ((ast.falseCase)).visitExpression(this, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitNotExpr(ast, context) {
        return this.transformExpr(new NotExpr(ast.condition.visitExpression(this, context), ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitAssertNotNullExpr(ast, context) {
        return this.transformExpr(new AssertNotNull(ast.condition.visitExpression(this, context), ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCastExpr(ast, context) {
        return this.transformExpr(new CastExpr(ast.value.visitExpression(this, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionExpr(ast, context) {
        return this.transformExpr(new FunctionExpr(ast.params, this.visitAllStatements(ast.statements, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, context) {
        return this.transformExpr(new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadPropExpr(ast, context) {
        return this.transformExpr(new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadKeyExpr(ast, context) {
        return this.transformExpr(new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArrayExpr(ast, context) {
        return this.transformExpr(new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context), ast.type, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMapExpr(ast, context) {
        const /** @type {?} */ entries = ast.entries.map((entry) => new LiteralMapEntry(entry.key, entry.value.visitExpression(this, context), entry.quoted));
        const /** @type {?} */ mapType = new MapType(ast.valueType, null);
        return this.transformExpr(new LiteralMapExpr(entries, mapType, ast.sourceSpan), context);
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCommaExpr(ast, context) {
        return this.transformExpr(new CommaExpr(this.visitAllExpressions(ast.parts, context), ast.sourceSpan), context);
    }
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    visitAllExpressions(exprs, context) {
        return exprs.map(expr => expr.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareVarStmt(stmt, context) {
        return this.transformStmt(new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers, stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, context) {
        return this.transformStmt(new DeclareFunctionStmt(stmt.name, stmt.params, this.visitAllStatements(stmt.statements, context), stmt.type, stmt.modifiers, stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitExpressionStmt(stmt, context) {
        return this.transformStmt(new ExpressionStatement(stmt.expr.visitExpression(this, context), stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitReturnStmt(stmt, context) {
        return this.transformStmt(new ReturnStatement(stmt.value.visitExpression(this, context), stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareClassStmt(stmt, context) {
        const /** @type {?} */ parent = ((stmt.parent)).visitExpression(this, context);
        const /** @type {?} */ getters = stmt.getters.map(getter => new ClassGetter(getter.name, this.visitAllStatements(getter.body, context), getter.type, getter.modifiers));
        const /** @type {?} */ ctorMethod = stmt.constructorMethod &&
            new ClassMethod(stmt.constructorMethod.name, stmt.constructorMethod.params, this.visitAllStatements(stmt.constructorMethod.body, context), stmt.constructorMethod.type, stmt.constructorMethod.modifiers);
        const /** @type {?} */ methods = stmt.methods.map(method => new ClassMethod(method.name, method.params, this.visitAllStatements(method.body, context), method.type, method.modifiers));
        return this.transformStmt(new ClassStmt(stmt.name, parent, stmt.fields, getters, ctorMethod, methods, stmt.modifiers, stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitIfStmt(stmt, context) {
        return this.transformStmt(new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context), stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitTryCatchStmt(stmt, context) {
        return this.transformStmt(new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context), stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitThrowStmt(stmt, context) {
        return this.transformStmt(new ThrowStmt(stmt.error.visitExpression(this, context), stmt.sourceSpan), context);
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitCommentStmt(stmt, context) {
        return this.transformStmt(stmt, context);
    }
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    visitAllStatements(stmts, context) {
        return stmts.map(stmt => stmt.visitStatement(this, context));
    }
}
export class RecursiveAstVisitor {
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) { return ast; }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteVarExpr(expr, context) {
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWriteKeyExpr(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.index.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    visitWritePropExpr(expr, context) {
        expr.receiver.visitExpression(this, context);
        expr.value.visitExpression(this, context);
        return expr;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeMethodExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInvokeFunctionExpr(ast, context) {
        ast.fn.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitInstantiateExpr(ast, context) {
        ast.classExpr.visitExpression(this, context);
        this.visitAllExpressions(ast.args, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitExternalExpr(ast, context) { return ast; }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitConditionalExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        ast.trueCase.visitExpression(this, context); /** @type {?} */
        ((ast.falseCase)).visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitNotExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitAssertNotNullExpr(ast, context) {
        ast.condition.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCastExpr(ast, context) {
        ast.value.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitFunctionExpr(ast, context) {
        this.visitAllStatements(ast.statements, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitBinaryOperatorExpr(ast, context) {
        ast.lhs.visitExpression(this, context);
        ast.rhs.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadPropExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadKeyExpr(ast, context) {
        ast.receiver.visitExpression(this, context);
        ast.index.visitExpression(this, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralArrayExpr(ast, context) {
        this.visitAllExpressions(ast.entries, context);
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitLiteralMapExpr(ast, context) {
        ast.entries.forEach((entry) => entry.value.visitExpression(this, context));
        return ast;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitCommaExpr(ast, context) {
        this.visitAllExpressions(ast.parts, context);
    }
    /**
     * @param {?} exprs
     * @param {?} context
     * @return {?}
     */
    visitAllExpressions(exprs, context) {
        exprs.forEach(expr => expr.visitExpression(this, context));
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareVarStmt(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, context) {
        this.visitAllStatements(stmt.statements, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitExpressionStmt(stmt, context) {
        stmt.expr.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitReturnStmt(stmt, context) {
        stmt.value.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareClassStmt(stmt, context) {
        ((stmt.parent)).visitExpression(this, context);
        stmt.getters.forEach(getter => this.visitAllStatements(getter.body, context));
        if (stmt.constructorMethod) {
            this.visitAllStatements(stmt.constructorMethod.body, context);
        }
        stmt.methods.forEach(method => this.visitAllStatements(method.body, context));
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitIfStmt(stmt, context) {
        stmt.condition.visitExpression(this, context);
        this.visitAllStatements(stmt.trueCase, context);
        this.visitAllStatements(stmt.falseCase, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitTryCatchStmt(stmt, context) {
        this.visitAllStatements(stmt.bodyStmts, context);
        this.visitAllStatements(stmt.catchStmts, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitThrowStmt(stmt, context) {
        stmt.error.visitExpression(this, context);
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitCommentStmt(stmt, context) { return stmt; }
    /**
     * @param {?} stmts
     * @param {?} context
     * @return {?}
     */
    visitAllStatements(stmts, context) {
        stmts.forEach(stmt => stmt.visitStatement(this, context));
    }
}
/**
 * @param {?} stmts
 * @return {?}
 */
export function findReadVarNames(stmts) {
    const /** @type {?} */ visitor = new _ReadVarVisitor();
    visitor.visitAllStatements(stmts, null);
    return visitor.varNames;
}
class _ReadVarVisitor extends RecursiveAstVisitor {
    constructor() {
        super(...arguments);
        this.varNames = new Set();
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareFunctionStmt(stmt, context) {
        // Don't descend into nested functions
        return stmt;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    visitDeclareClassStmt(stmt, context) {
        // Don't descend into nested classes
        return stmt;
    }
    /**
     * @param {?} ast
     * @param {?} context
     * @return {?}
     */
    visitReadVarExpr(ast, context) {
        if (ast.name) {
            this.varNames.add(ast.name);
        }
        return null;
    }
}
function _ReadVarVisitor_tsickle_Closure_declarations() {
    /** @type {?} */
    _ReadVarVisitor.prototype.varNames;
}
/**
 * @param {?} stmt
 * @param {?} sourceSpan
 * @return {?}
 */
export function applySourceSpanToStatementIfNeeded(stmt, sourceSpan) {
    if (!sourceSpan) {
        return stmt;
    }
    const /** @type {?} */ transformer = new _ApplySourceSpanTransformer(sourceSpan);
    return stmt.visitStatement(transformer, null);
}
/**
 * @param {?} expr
 * @param {?} sourceSpan
 * @return {?}
 */
export function applySourceSpanToExpressionIfNeeded(expr, sourceSpan) {
    if (!sourceSpan) {
        return expr;
    }
    const /** @type {?} */ transformer = new _ApplySourceSpanTransformer(sourceSpan);
    return expr.visitExpression(transformer, null);
}
class _ApplySourceSpanTransformer extends AstTransformer {
    /**
     * @param {?} sourceSpan
     */
    constructor(sourceSpan) {
        super();
        this.sourceSpan = sourceSpan;
    }
    /**
     * @param {?} obj
     * @return {?}
     */
    _clone(obj) {
        const /** @type {?} */ clone = Object.create(obj.constructor.prototype);
        for (let /** @type {?} */ prop in obj) {
            clone[prop] = obj[prop];
        }
        return clone;
    }
    /**
     * @param {?} expr
     * @param {?} context
     * @return {?}
     */
    transformExpr(expr, context) {
        if (!expr.sourceSpan) {
            expr = this._clone(expr);
            expr.sourceSpan = this.sourceSpan;
        }
        return expr;
    }
    /**
     * @param {?} stmt
     * @param {?} context
     * @return {?}
     */
    transformStmt(stmt, context) {
        if (!stmt.sourceSpan) {
            stmt = this._clone(stmt);
            stmt.sourceSpan = this.sourceSpan;
        }
        return stmt;
    }
}
function _ApplySourceSpanTransformer_tsickle_Closure_declarations() {
    /** @type {?} */
    _ApplySourceSpanTransformer.prototype.sourceSpan;
}
/**
 * @param {?} name
 * @param {?=} type
 * @param {?=} sourceSpan
 * @return {?}
 */
export function variable(name, type, sourceSpan) {
    return new ReadVarExpr(name, type, sourceSpan);
}
/**
 * @param {?} id
 * @param {?=} typeParams
 * @param {?=} sourceSpan
 * @return {?}
 */
export function importExpr(id, typeParams = null, sourceSpan) {
    return new ExternalExpr(id, null, typeParams, sourceSpan);
}
/**
 * @param {?} id
 * @param {?=} typeParams
 * @param {?=} typeModifiers
 * @return {?}
 */
export function importType(id, typeParams = null, typeModifiers = null) {
    return id != null ? expressionType(importExpr(id, typeParams, null), typeModifiers) : null;
}
/**
 * @param {?} expr
 * @param {?=} typeModifiers
 * @return {?}
 */
export function expressionType(expr, typeModifiers = null) {
    return expr != null ? ((new ExpressionType(expr, typeModifiers))) : null;
}
/**
 * @param {?} values
 * @param {?=} type
 * @param {?=} sourceSpan
 * @return {?}
 */
export function literalArr(values, type, sourceSpan) {
    return new LiteralArrayExpr(values, type, sourceSpan);
}
/**
 * @param {?} values
 * @param {?=} type
 * @return {?}
 */
export function literalMap(values, type = null) {
    return new LiteralMapExpr(values.map(e => new LiteralMapEntry(e.key, e.value, e.quoted)), type, null);
}
/**
 * @param {?} expr
 * @param {?=} sourceSpan
 * @return {?}
 */
export function not(expr, sourceSpan) {
    return new NotExpr(expr, sourceSpan);
}
/**
 * @param {?} expr
 * @param {?=} sourceSpan
 * @return {?}
 */
export function assertNotNull(expr, sourceSpan) {
    return new AssertNotNull(expr, sourceSpan);
}
/**
 * @param {?} params
 * @param {?} body
 * @param {?=} type
 * @param {?=} sourceSpan
 * @return {?}
 */
export function fn(params, body, type, sourceSpan) {
    return new FunctionExpr(params, body, type, sourceSpan);
}
/**
 * @param {?} value
 * @param {?=} type
 * @param {?=} sourceSpan
 * @return {?}
 */
export function literal(value, type, sourceSpan) {
    return new LiteralExpr(value, type, sourceSpan);
}
//# sourceMappingURL=output_ast.js.map