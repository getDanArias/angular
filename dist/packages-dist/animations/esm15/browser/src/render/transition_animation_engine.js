/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AUTO_STYLE, NoopAnimationPlayer, ɵAnimationGroupPlayer as AnimationGroupPlayer, ɵPRE_STYLE as PRE_STYLE } from '@angular/animations';
import { ElementInstructionMap } from '../dsl/element_instruction_map';
import { ENTER_CLASSNAME, LEAVE_CLASSNAME, NG_ANIMATING_CLASSNAME, NG_ANIMATING_SELECTOR, NG_TRIGGER_CLASSNAME, NG_TRIGGER_SELECTOR, copyObj, eraseStyles, setStyles } from '../util';
import { getOrSetAsInMap, listenOnPlayer, makeAnimationEvent, normalizeKeyframes, optimizeGroupPlayer } from './shared';
const /** @type {?} */ QUEUED_CLASSNAME = 'ng-animate-queued';
const /** @type {?} */ QUEUED_SELECTOR = '.ng-animate-queued';
const /** @type {?} */ DISABLED_CLASSNAME = 'ng-animate-disabled';
const /** @type {?} */ DISABLED_SELECTOR = '.ng-animate-disabled';
const /** @type {?} */ EMPTY_PLAYER_ARRAY = [];
const /** @type {?} */ NULL_REMOVAL_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: false
};
const /** @type {?} */ NULL_REMOVED_QUERIED_STATE = {
    namespaceId: '',
    setForRemoval: null,
    hasAnimation: false,
    removedBeforeQueried: true
};
/**
 * @record
 */
function TriggerListener() { }
function TriggerListener_tsickle_Closure_declarations() {
    /** @type {?} */
    TriggerListener.prototype.name;
    /** @type {?} */
    TriggerListener.prototype.phase;
    /** @type {?} */
    TriggerListener.prototype.callback;
}
/**
 * @record
 */
export function QueueInstruction() { }
function QueueInstruction_tsickle_Closure_declarations() {
    /** @type {?} */
    QueueInstruction.prototype.element;
    /** @type {?} */
    QueueInstruction.prototype.triggerName;
    /** @type {?} */
    QueueInstruction.prototype.fromState;
    /** @type {?} */
    QueueInstruction.prototype.toState;
    /** @type {?} */
    QueueInstruction.prototype.transition;
    /** @type {?} */
    QueueInstruction.prototype.player;
    /** @type {?} */
    QueueInstruction.prototype.isFallbackTransition;
}
export const /** @type {?} */ REMOVAL_FLAG = '__ng_removed';
/**
 * @record
 */
export function ElementAnimationState() { }
function ElementAnimationState_tsickle_Closure_declarations() {
    /** @type {?} */
    ElementAnimationState.prototype.setForRemoval;
    /** @type {?} */
    ElementAnimationState.prototype.hasAnimation;
    /** @type {?} */
    ElementAnimationState.prototype.namespaceId;
    /** @type {?} */
    ElementAnimationState.prototype.removedBeforeQueried;
}
export class StateValue {
    /**
     * @return {?}
     */
    get params() { return (this.options.params); }
    /**
     * @param {?} input
     */
    constructor(input) {
        const /** @type {?} */ isObj = input && input.hasOwnProperty('value');
        const /** @type {?} */ value = isObj ? input['value'] : input;
        this.value = normalizeTriggerValue(value);
        if (isObj) {
            const /** @type {?} */ options = copyObj(/** @type {?} */ (input));
            delete options['value'];
            this.options = (options);
        }
        else {
            this.options = {};
        }
        if (!this.options.params) {
            this.options.params = {};
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    absorbOptions(options) {
        const /** @type {?} */ newParams = options.params;
        if (newParams) {
            const /** @type {?} */ oldParams = ((this.options.params));
            Object.keys(newParams).forEach(prop => {
                if (oldParams[prop] == null) {
                    oldParams[prop] = newParams[prop];
                }
            });
        }
    }
}
function StateValue_tsickle_Closure_declarations() {
    /** @type {?} */
    StateValue.prototype.value;
    /** @type {?} */
    StateValue.prototype.options;
}
export const /** @type {?} */ VOID_VALUE = 'void';
export const /** @type {?} */ DEFAULT_STATE_VALUE = new StateValue(VOID_VALUE);
export const /** @type {?} */ DELETED_STATE_VALUE = new StateValue('DELETED');
export class AnimationTransitionNamespace {
    /**
     * @param {?} id
     * @param {?} hostElement
     * @param {?} _engine
     */
    constructor(id, hostElement, _engine) {
        this.id = id;
        this.hostElement = hostElement;
        this._engine = _engine;
        this.players = [];
        this._triggers = {};
        this._queue = [];
        this._elementListeners = new Map();
        this._hostClassName = 'ng-tns-' + id;
        addClass(hostElement, this._hostClassName);
    }
    /**
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    listen(element, name, phase, callback) {
        if (!this._triggers.hasOwnProperty(name)) {
            throw new Error(`Unable to listen on the animation trigger event "${phase}" because the animation trigger "${name}" doesn\'t exist!`);
        }
        if (phase == null || phase.length == 0) {
            throw new Error(`Unable to listen on the animation trigger "${name}" because the provided event is undefined!`);
        }
        if (!isTriggerEventValid(phase)) {
            throw new Error(`The provided animation trigger event "${phase}" for the animation trigger "${name}" is not supported!`);
        }
        const /** @type {?} */ listeners = getOrSetAsInMap(this._elementListeners, element, []);
        const /** @type {?} */ data = { name, phase, callback };
        listeners.push(data);
        const /** @type {?} */ triggersWithStates = getOrSetAsInMap(this._engine.statesByElement, element, {});
        if (!triggersWithStates.hasOwnProperty(name)) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + name);
            triggersWithStates[name] = null;
        }
        return () => {
            // the event listener is removed AFTER the flush has occurred such
            // that leave animations callbacks can fire (otherwise if the node
            // is removed in between then the listeners would be deregistered)
            this._engine.afterFlush(() => {
                const /** @type {?} */ index = listeners.indexOf(data);
                if (index >= 0) {
                    listeners.splice(index, 1);
                }
                if (!this._triggers[name]) {
                    delete triggersWithStates[name];
                }
            });
        };
    }
    /**
     * @param {?} name
     * @param {?} ast
     * @return {?}
     */
    register(name, ast) {
        if (this._triggers[name]) {
            // throw
            return false;
        }
        else {
            this._triggers[name] = ast;
            return true;
        }
    }
    /**
     * @param {?} name
     * @return {?}
     */
    _getTrigger(name) {
        const /** @type {?} */ trigger = this._triggers[name];
        if (!trigger) {
            throw new Error(`The provided animation trigger "${name}" has not been registered!`);
        }
        return trigger;
    }
    /**
     * @param {?} element
     * @param {?} triggerName
     * @param {?} value
     * @param {?=} defaultToFallback
     * @return {?}
     */
    trigger(element, triggerName, value, defaultToFallback = true) {
        const /** @type {?} */ trigger = this._getTrigger(triggerName);
        const /** @type {?} */ player = new TransitionAnimationPlayer(this.id, triggerName, element);
        let /** @type {?} */ triggersWithStates = this._engine.statesByElement.get(element);
        if (!triggersWithStates) {
            addClass(element, NG_TRIGGER_CLASSNAME);
            addClass(element, NG_TRIGGER_CLASSNAME + '-' + triggerName);
            this._engine.statesByElement.set(element, triggersWithStates = {});
        }
        let /** @type {?} */ fromState = triggersWithStates[triggerName];
        const /** @type {?} */ toState = new StateValue(value);
        const /** @type {?} */ isObj = value && value.hasOwnProperty('value');
        if (!isObj && fromState) {
            toState.absorbOptions(fromState.options);
        }
        triggersWithStates[triggerName] = toState;
        if (!fromState) {
            fromState = DEFAULT_STATE_VALUE;
        }
        else if (fromState === DELETED_STATE_VALUE) {
            return player;
        }
        const /** @type {?} */ isRemoval = toState.value === VOID_VALUE;
        // normally this isn't reached by here, however, if an object expression
        // is passed in then it may be a new object each time. Comparing the value
        // is important since that will stay the same despite there being a new object.
        // The removal arc here is special cased because the same element is triggered
        // twice in the event that it contains animations on the outer/inner portions
        // of the host container
        if (!isRemoval && fromState.value === toState.value) {
            // this means that despite the value not changing, some inner params
            // have changed which means that the animation final styles need to be applied
            if (!objEquals(fromState.params, toState.params)) {
                const /** @type {?} */ errors = [];
                const /** @type {?} */ fromStyles = trigger.matchStyles(fromState.value, fromState.params, errors);
                const /** @type {?} */ toStyles = trigger.matchStyles(toState.value, toState.params, errors);
                if (errors.length) {
                    this._engine.reportError(errors);
                }
                else {
                    this._engine.afterFlush(() => {
                        eraseStyles(element, fromStyles);
                        setStyles(element, toStyles);
                    });
                }
            }
            return;
        }
        const /** @type {?} */ playersOnElement = getOrSetAsInMap(this._engine.playersByElement, element, []);
        playersOnElement.forEach(player => {
            // only remove the player if it is queued on the EXACT same trigger/namespace
            // we only also deal with queued players here because if the animation has
            // started then we want to keep the player alive until the flush happens
            // (which is where the previousPlayers are passed into the new palyer)
            if (player.namespaceId == this.id && player.triggerName == triggerName && player.queued) {
                player.destroy();
            }
        });
        let /** @type {?} */ transition = trigger.matchTransition(fromState.value, toState.value);
        let /** @type {?} */ isFallbackTransition = false;
        if (!transition) {
            if (!defaultToFallback)
                return;
            transition = trigger.fallbackTransition;
            isFallbackTransition = true;
        }
        this._engine.totalQueuedPlayers++;
        this._queue.push({ element, triggerName, transition, fromState, toState, player, isFallbackTransition });
        if (!isFallbackTransition) {
            addClass(element, QUEUED_CLASSNAME);
            player.onStart(() => { removeClass(element, QUEUED_CLASSNAME); });
        }
        player.onDone(() => {
            let /** @type {?} */ index = this.players.indexOf(player);
            if (index >= 0) {
                this.players.splice(index, 1);
            }
            const /** @type {?} */ players = this._engine.playersByElement.get(element);
            if (players) {
                let /** @type {?} */ index = players.indexOf(player);
                if (index >= 0) {
                    players.splice(index, 1);
                }
            }
        });
        this.players.push(player);
        playersOnElement.push(player);
        return player;
    }
    /**
     * @param {?} name
     * @return {?}
     */
    deregister(name) {
        delete this._triggers[name];
        this._engine.statesByElement.forEach((stateMap, element) => { delete stateMap[name]; });
        this._elementListeners.forEach((listeners, element) => {
            this._elementListeners.set(element, listeners.filter(entry => { return entry.name != name; }));
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    clearElementCache(element) {
        this._engine.statesByElement.delete(element);
        this._elementListeners.delete(element);
        const /** @type {?} */ elementPlayers = this._engine.playersByElement.get(element);
        if (elementPlayers) {
            elementPlayers.forEach(player => player.destroy());
            this._engine.playersByElement.delete(element);
        }
    }
    /**
     * @param {?} rootElement
     * @param {?} context
     * @param {?=} animate
     * @return {?}
     */
    _destroyInnerNodes(rootElement, context, animate = false) {
        this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true).forEach(elm => {
            if (animate && containsClass(elm, this._hostClassName)) {
                const /** @type {?} */ innerNs = this._engine.namespacesByHostElement.get(elm);
                // special case for a host element with animations on the same element
                if (innerNs) {
                    innerNs.removeNode(elm, context, true);
                }
                this.removeNode(elm, context, true);
            }
            else {
                this.clearElementCache(elm);
            }
        });
    }
    /**
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    removeNode(element, context, doNotRecurse) {
        const /** @type {?} */ engine = this._engine;
        if (!doNotRecurse && element.childElementCount) {
            this._destroyInnerNodes(element, context, true);
        }
        const /** @type {?} */ triggerStates = engine.statesByElement.get(element);
        if (triggerStates) {
            const /** @type {?} */ players = [];
            Object.keys(triggerStates).forEach(triggerName => {
                // this check is here in the event that an element is removed
                // twice (both on the host level and the component level)
                if (this._triggers[triggerName]) {
                    const /** @type {?} */ player = this.trigger(element, triggerName, VOID_VALUE, false);
                    if (player) {
                        players.push(player);
                    }
                }
            });
            if (players.length) {
                engine.markElementAsRemoved(this.id, element, true, context);
                optimizeGroupPlayer(players).onDone(() => engine.processLeaveNode(element));
                return;
            }
        }
        // find the player that is animating and make sure that the
        // removal is delayed until that player has completed
        let /** @type {?} */ containsPotentialParentTransition = false;
        if (engine.totalAnimations) {
            const /** @type {?} */ currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
            // when this `if statement` does not continue forward it means that
            // a previous animation query has selected the current element and
            // is animating it. In this situation want to continue fowards and
            // allow the element to be queued up for animation later.
            if (currentPlayers && currentPlayers.length) {
                containsPotentialParentTransition = true;
            }
            else {
                let /** @type {?} */ parent = element;
                while (parent = parent.parentNode) {
                    const /** @type {?} */ triggers = engine.statesByElement.get(parent);
                    if (triggers) {
                        containsPotentialParentTransition = true;
                        break;
                    }
                }
            }
        }
        // at this stage we know that the element will either get removed
        // during flush or will be picked up by a parent query. Either way
        // we need to fire the listeners for this element when it DOES get
        // removed (once the query parent animation is done or after flush)
        const /** @type {?} */ listeners = this._elementListeners.get(element);
        if (listeners) {
            const /** @type {?} */ visitedTriggers = new Set();
            listeners.forEach(listener => {
                const /** @type {?} */ triggerName = listener.name;
                if (visitedTriggers.has(triggerName))
                    return;
                visitedTriggers.add(triggerName);
                const /** @type {?} */ trigger = this._triggers[triggerName];
                const /** @type {?} */ transition = trigger.fallbackTransition;
                const /** @type {?} */ elementStates = ((engine.statesByElement.get(element)));
                const /** @type {?} */ fromState = elementStates[triggerName] || DEFAULT_STATE_VALUE;
                const /** @type {?} */ toState = new StateValue(VOID_VALUE);
                const /** @type {?} */ player = new TransitionAnimationPlayer(this.id, triggerName, element);
                this._engine.totalQueuedPlayers++;
                this._queue.push({
                    element,
                    triggerName,
                    transition,
                    fromState,
                    toState,
                    player,
                    isFallbackTransition: true
                });
            });
        }
        // whether or not a parent has an animation we need to delay the deferral of the leave
        // operation until we have more information (which we do after flush() has been called)
        if (containsPotentialParentTransition) {
            engine.markElementAsRemoved(this.id, element, false, context);
        }
        else {
            // we do this after the flush has occurred such
            // that the callbacks can be fired
            engine.afterFlush(() => this.clearElementCache(element));
            engine.destroyInnerAnimations(element);
            engine._onRemovalComplete(element, context);
        }
    }
    /**
     * @param {?} element
     * @param {?} parent
     * @return {?}
     */
    insertNode(element, parent) { addClass(element, this._hostClassName); }
    /**
     * @param {?} microtaskId
     * @return {?}
     */
    drainQueuedTransitions(microtaskId) {
        const /** @type {?} */ instructions = [];
        this._queue.forEach(entry => {
            const /** @type {?} */ player = entry.player;
            if (player.destroyed)
                return;
            const /** @type {?} */ element = entry.element;
            const /** @type {?} */ listeners = this._elementListeners.get(element);
            if (listeners) {
                listeners.forEach((listener) => {
                    if (listener.name == entry.triggerName) {
                        const /** @type {?} */ baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
                        ((baseEvent))['_data'] = microtaskId;
                        listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
                    }
                });
            }
            if (player.markedForDestroy) {
                this._engine.afterFlush(() => {
                    // now we can destroy the element properly since the event listeners have
                    // been bound to the player
                    player.destroy();
                });
            }
            else {
                instructions.push(entry);
            }
        });
        this._queue = [];
        return instructions.sort((a, b) => {
            // if depCount == 0 them move to front
            // otherwise if a contains b then move back
            const /** @type {?} */ d0 = a.transition.ast.depCount;
            const /** @type {?} */ d1 = b.transition.ast.depCount;
            if (d0 == 0 || d1 == 0) {
                return d0 - d1;
            }
            return this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
        });
    }
    /**
     * @param {?} context
     * @return {?}
     */
    destroy(context) {
        this.players.forEach(p => p.destroy());
        this._destroyInnerNodes(this.hostElement, context);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    elementContainsData(element) {
        let /** @type {?} */ containsData = false;
        if (this._elementListeners.has(element))
            containsData = true;
        containsData =
            (this._queue.find(entry => entry.element === element) ? true : false) || containsData;
        return containsData;
    }
}
function AnimationTransitionNamespace_tsickle_Closure_declarations() {
    /** @type {?} */
    AnimationTransitionNamespace.prototype.players;
    /** @type {?} */
    AnimationTransitionNamespace.prototype._triggers;
    /** @type {?} */
    AnimationTransitionNamespace.prototype._queue;
    /** @type {?} */
    AnimationTransitionNamespace.prototype._elementListeners;
    /** @type {?} */
    AnimationTransitionNamespace.prototype._hostClassName;
    /** @type {?} */
    AnimationTransitionNamespace.prototype.id;
    /** @type {?} */
    AnimationTransitionNamespace.prototype.hostElement;
    /** @type {?} */
    AnimationTransitionNamespace.prototype._engine;
}
/**
 * @record
 */
export function QueuedTransition() { }
function QueuedTransition_tsickle_Closure_declarations() {
    /** @type {?} */
    QueuedTransition.prototype.element;
    /** @type {?} */
    QueuedTransition.prototype.instruction;
    /** @type {?} */
    QueuedTransition.prototype.player;
}
export class TransitionAnimationEngine {
    /**
     * @param {?} driver
     * @param {?} _normalizer
     */
    constructor(driver, _normalizer) {
        this.driver = driver;
        this._normalizer = _normalizer;
        this.players = [];
        this.newHostElements = new Map();
        this.playersByElement = new Map();
        this.playersByQueriedElement = new Map();
        this.statesByElement = new Map();
        this.disabledNodes = new Set();
        this.totalAnimations = 0;
        this.totalQueuedPlayers = 0;
        this._namespaceLookup = {};
        this._namespaceList = [];
        this._flushFns = [];
        this._whenQuietFns = [];
        this.namespacesByHostElement = new Map();
        this.collectedEnterElements = [];
        this.collectedLeaveElements = [];
        this.onRemovalComplete = (element, context) => { };
    }
    /**
     * \@internal
     * @param {?} element
     * @param {?} context
     * @return {?}
     */
    _onRemovalComplete(element, context) { this.onRemovalComplete(element, context); }
    /**
     * @return {?}
     */
    get queuedPlayers() {
        const /** @type {?} */ players = [];
        this._namespaceList.forEach(ns => {
            ns.players.forEach(player => {
                if (player.queued) {
                    players.push(player);
                }
            });
        });
        return players;
    }
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    createNamespace(namespaceId, hostElement) {
        const /** @type {?} */ ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
        if (hostElement.parentNode) {
            this._balanceNamespaceList(ns, hostElement);
        }
        else {
            // defer this later until flush during when the host element has
            // been inserted so that we know exactly where to place it in
            // the namespace list
            this.newHostElements.set(hostElement, ns);
            // given that this host element is apart of the animation code, it
            // may or may not be inserted by a parent node that is an of an
            // animation renderer type. If this happens then we can still have
            // access to this item when we query for :enter nodes. If the parent
            // is a renderer then the set data-structure will normalize the entry
            this.collectEnterElement(hostElement);
        }
        return this._namespaceLookup[namespaceId] = ns;
    }
    /**
     * @param {?} ns
     * @param {?} hostElement
     * @return {?}
     */
    _balanceNamespaceList(ns, hostElement) {
        const /** @type {?} */ limit = this._namespaceList.length - 1;
        if (limit >= 0) {
            let /** @type {?} */ found = false;
            for (let /** @type {?} */ i = limit; i >= 0; i--) {
                const /** @type {?} */ nextNamespace = this._namespaceList[i];
                if (this.driver.containsElement(nextNamespace.hostElement, hostElement)) {
                    this._namespaceList.splice(i + 1, 0, ns);
                    found = true;
                    break;
                }
            }
            if (!found) {
                this._namespaceList.splice(0, 0, ns);
            }
        }
        else {
            this._namespaceList.push(ns);
        }
        this.namespacesByHostElement.set(hostElement, ns);
        return ns;
    }
    /**
     * @param {?} namespaceId
     * @param {?} hostElement
     * @return {?}
     */
    register(namespaceId, hostElement) {
        let /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (!ns) {
            ns = this.createNamespace(namespaceId, hostElement);
        }
        return ns;
    }
    /**
     * @param {?} namespaceId
     * @param {?} name
     * @param {?} trigger
     * @return {?}
     */
    registerTrigger(namespaceId, name, trigger) {
        let /** @type {?} */ ns = this._namespaceLookup[namespaceId];
        if (ns && ns.register(name, trigger)) {
            this.totalAnimations++;
        }
    }
    /**
     * @param {?} namespaceId
     * @param {?} context
     * @return {?}
     */
    destroy(namespaceId, context) {
        if (!namespaceId)
            return;
        const /** @type {?} */ ns = this._fetchNamespace(namespaceId);
        this.afterFlush(() => {
            this.namespacesByHostElement.delete(ns.hostElement);
            delete this._namespaceLookup[namespaceId];
            const /** @type {?} */ index = this._namespaceList.indexOf(ns);
            if (index >= 0) {
                this._namespaceList.splice(index, 1);
            }
        });
        this.afterFlushAnimationsDone(() => ns.destroy(context));
    }
    /**
     * @param {?} id
     * @return {?}
     */
    _fetchNamespace(id) { return this._namespaceLookup[id]; }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} value
     * @return {?}
     */
    trigger(namespaceId, element, name, value) {
        if (isElementNode(element)) {
            this._fetchNamespace(namespaceId).trigger(element, name, value);
            return true;
        }
        return false;
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} parent
     * @param {?} insertBefore
     * @return {?}
     */
    insertNode(namespaceId, element, parent, insertBefore) {
        if (!isElementNode(element))
            return;
        // special case for when an element is removed and reinserted (move operation)
        // when this occurs we do not want to use the element for deletion later
        const /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            details.setForRemoval = false;
        }
        // in the event that the namespaceId is blank then the caller
        // code does not contain any animation code in it, but it is
        // just being called so that the node is marked as being inserted
        if (namespaceId) {
            this._fetchNamespace(namespaceId).insertNode(element, parent);
        }
        // only *directives and host elements are inserted before
        if (insertBefore) {
            this.collectEnterElement(element);
        }
    }
    /**
     * @param {?} element
     * @return {?}
     */
    collectEnterElement(element) { this.collectedEnterElements.push(element); }
    /**
     * @param {?} element
     * @param {?} value
     * @return {?}
     */
    markElementAsDisabled(element, value) {
        if (value) {
            if (!this.disabledNodes.has(element)) {
                this.disabledNodes.add(element);
                addClass(element, DISABLED_CLASSNAME);
            }
        }
        else if (this.disabledNodes.has(element)) {
            this.disabledNodes.delete(element);
            removeClass(element, DISABLED_CLASSNAME);
        }
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} context
     * @param {?=} doNotRecurse
     * @return {?}
     */
    removeNode(namespaceId, element, context, doNotRecurse) {
        if (!isElementNode(element)) {
            this._onRemovalComplete(element, context);
            return;
        }
        const /** @type {?} */ ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
        if (ns) {
            ns.removeNode(element, context, doNotRecurse);
        }
        else {
            this.markElementAsRemoved(namespaceId, element, false, context);
        }
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?=} hasAnimation
     * @param {?=} context
     * @return {?}
     */
    markElementAsRemoved(namespaceId, element, hasAnimation, context) {
        this.collectedLeaveElements.push(element);
        element[REMOVAL_FLAG] = {
            namespaceId,
            setForRemoval: context, hasAnimation,
            removedBeforeQueried: false
        };
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @param {?} name
     * @param {?} phase
     * @param {?} callback
     * @return {?}
     */
    listen(namespaceId, element, name, phase, callback) {
        if (isElementNode(element)) {
            return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
        }
        return () => { };
    }
    /**
     * @param {?} entry
     * @param {?} subTimelines
     * @return {?}
     */
    _buildInstruction(entry, subTimelines) {
        return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, entry.fromState.options, entry.toState.options, subTimelines);
    }
    /**
     * @param {?} containerElement
     * @return {?}
     */
    destroyInnerAnimations(containerElement) {
        let /** @type {?} */ elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
        elements.forEach(element => {
            const /** @type {?} */ players = this.playersByElement.get(element);
            if (players) {
                players.forEach(player => {
                    // special case for when an element is set for destruction, but hasn't started.
                    // in this situation we want to delay the destruction until the flush occurs
                    // so that any event listeners attached to the player are triggered.
                    if (player.queued) {
                        player.markedForDestroy = true;
                    }
                    else {
                        player.destroy();
                    }
                });
            }
            const /** @type {?} */ stateMap = this.statesByElement.get(element);
            if (stateMap) {
                Object.keys(stateMap).forEach(triggerName => stateMap[triggerName] = DELETED_STATE_VALUE);
            }
        });
        if (this.playersByQueriedElement.size == 0)
            return;
        elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
        if (elements.length) {
            elements.forEach(element => {
                const /** @type {?} */ players = this.playersByQueriedElement.get(element);
                if (players) {
                    players.forEach(player => player.finish());
                }
            });
        }
    }
    /**
     * @return {?}
     */
    whenRenderingDone() {
        return new Promise(resolve => {
            if (this.players.length) {
                return optimizeGroupPlayer(this.players).onDone(() => resolve());
            }
            else {
                resolve();
            }
        });
    }
    /**
     * @param {?} element
     * @return {?}
     */
    processLeaveNode(element) {
        const /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval) {
            // this will prevent it from removing it twice
            element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
            if (details.namespaceId) {
                this.destroyInnerAnimations(element);
                const /** @type {?} */ ns = this._fetchNamespace(details.namespaceId);
                if (ns) {
                    ns.clearElementCache(element);
                }
            }
            this._onRemovalComplete(element, details.setForRemoval);
        }
        if (this.driver.matchesElement(element, DISABLED_SELECTOR)) {
            this.markElementAsDisabled(element, false);
        }
        this.driver.query(element, DISABLED_SELECTOR, true).forEach(node => {
            this.markElementAsDisabled(element, false);
        });
    }
    /**
     * @param {?=} microtaskId
     * @return {?}
     */
    flush(microtaskId = -1) {
        let /** @type {?} */ players = [];
        if (this.newHostElements.size) {
            this.newHostElements.forEach((ns, element) => this._balanceNamespaceList(ns, element));
            this.newHostElements.clear();
        }
        if (this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
            const /** @type {?} */ cleanupFns = [];
            try {
                players = this._flushAnimations(cleanupFns, microtaskId);
            }
            finally {
                for (let /** @type {?} */ i = 0; i < cleanupFns.length; i++) {
                    cleanupFns[i]();
                }
            }
        }
        else {
            for (let /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
                const /** @type {?} */ element = this.collectedLeaveElements[i];
                this.processLeaveNode(element);
            }
        }
        this.totalQueuedPlayers = 0;
        this.collectedEnterElements.length = 0;
        this.collectedLeaveElements.length = 0;
        this._flushFns.forEach(fn => fn());
        this._flushFns = [];
        if (this._whenQuietFns.length) {
            // we move these over to a variable so that
            // if any new callbacks are registered in another
            // flush they do not populate the existing set
            const /** @type {?} */ quietFns = this._whenQuietFns;
            this._whenQuietFns = [];
            if (players.length) {
                optimizeGroupPlayer(players).onDone(() => { quietFns.forEach(fn => fn()); });
            }
            else {
                quietFns.forEach(fn => fn());
            }
        }
    }
    /**
     * @param {?} errors
     * @return {?}
     */
    reportError(errors) {
        throw new Error(`Unable to process animations due to the following failed trigger transitions\n ${errors.join("\n")}`);
    }
    /**
     * @param {?} cleanupFns
     * @param {?} microtaskId
     * @return {?}
     */
    _flushAnimations(cleanupFns, microtaskId) {
        const /** @type {?} */ subTimelines = new ElementInstructionMap();
        const /** @type {?} */ skippedPlayers = [];
        const /** @type {?} */ skippedPlayersMap = new Map();
        const /** @type {?} */ queuedInstructions = [];
        const /** @type {?} */ queriedElements = new Map();
        const /** @type {?} */ allPreStyleElements = new Map();
        const /** @type {?} */ allPostStyleElements = new Map();
        const /** @type {?} */ disabledElementsSet = new Set();
        this.disabledNodes.forEach(node => {
            const /** @type {?} */ nodesThatAreDisabled = this.driver.query(node, QUEUED_SELECTOR, true);
            for (let /** @type {?} */ i = 0; i < nodesThatAreDisabled.length; i++) {
                disabledElementsSet.add(nodesThatAreDisabled[i]);
            }
        });
        const /** @type {?} */ bodyNode = getBodyNode();
        const /** @type {?} */ allEnterNodes = this.collectedEnterElements.length ?
            this.collectedEnterElements.filter(createIsRootFilterFn(this.collectedEnterElements)) :
            [];
        // this must occur before the instructions are built below such that
        // the :enter queries match the elements (since the timeline queries
        // are fired during instruction building).
        for (let /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            addClass(allEnterNodes[i], ENTER_CLASSNAME);
        }
        const /** @type {?} */ allLeaveNodes = [];
        const /** @type {?} */ leaveNodesWithoutAnimations = [];
        for (let /** @type {?} */ i = 0; i < this.collectedLeaveElements.length; i++) {
            const /** @type {?} */ element = this.collectedLeaveElements[i];
            const /** @type {?} */ details = (element[REMOVAL_FLAG]);
            if (details && details.setForRemoval) {
                addClass(element, LEAVE_CLASSNAME);
                allLeaveNodes.push(element);
                if (!details.hasAnimation) {
                    leaveNodesWithoutAnimations.push(element);
                }
            }
        }
        cleanupFns.push(() => {
            allEnterNodes.forEach(element => removeClass(element, ENTER_CLASSNAME));
            allLeaveNodes.forEach(element => {
                removeClass(element, LEAVE_CLASSNAME);
                this.processLeaveNode(element);
            });
        });
        const /** @type {?} */ allPlayers = [];
        const /** @type {?} */ erroneousTransitions = [];
        for (let /** @type {?} */ i = this._namespaceList.length - 1; i >= 0; i--) {
            const /** @type {?} */ ns = this._namespaceList[i];
            ns.drainQueuedTransitions(microtaskId).forEach(entry => {
                const /** @type {?} */ player = entry.player;
                allPlayers.push(player);
                const /** @type {?} */ element = entry.element;
                if (!bodyNode || !this.driver.containsElement(bodyNode, element)) {
                    player.destroy();
                    return;
                }
                const /** @type {?} */ instruction = ((this._buildInstruction(entry, subTimelines)));
                if (instruction.errors && instruction.errors.length) {
                    erroneousTransitions.push(instruction);
                    return;
                }
                // if a unmatched transition is queued to go then it SHOULD NOT render
                // an animation and cancel the previously running animations.
                if (entry.isFallbackTransition) {
                    player.onStart(() => eraseStyles(element, instruction.fromStyles));
                    player.onDestroy(() => setStyles(element, instruction.toStyles));
                    skippedPlayers.push(player);
                    return;
                }
                // this means that if a parent animation uses this animation as a sub trigger
                // then it will instruct the timeline builder to not add a player delay, but
                // instead stretch the first keyframe gap up until the animation starts. The
                // reason this is important is to prevent extra initialization styles from being
                // required by the user in the animation.
                instruction.timelines.forEach(tl => tl.stretchStartingKeyframe = true);
                subTimelines.append(element, instruction.timelines);
                const /** @type {?} */ tuple = { instruction, player, element };
                queuedInstructions.push(tuple);
                instruction.queriedElements.forEach(element => getOrSetAsInMap(queriedElements, element, []).push(player));
                instruction.preStyleProps.forEach((stringMap, element) => {
                    const /** @type {?} */ props = Object.keys(stringMap);
                    if (props.length) {
                        let /** @type {?} */ setVal = ((allPreStyleElements.get(element)));
                        if (!setVal) {
                            allPreStyleElements.set(element, setVal = new Set());
                        }
                        props.forEach(prop => setVal.add(prop));
                    }
                });
                instruction.postStyleProps.forEach((stringMap, element) => {
                    const /** @type {?} */ props = Object.keys(stringMap);
                    let /** @type {?} */ setVal = ((allPostStyleElements.get(element)));
                    if (!setVal) {
                        allPostStyleElements.set(element, setVal = new Set());
                    }
                    props.forEach(prop => setVal.add(prop));
                });
            });
        }
        if (erroneousTransitions.length) {
            const /** @type {?} */ errors = [];
            erroneousTransitions.forEach(instruction => {
                errors.push(`@${instruction.triggerName} has failed due to:\n`); /** @type {?} */
                ((instruction.errors)).forEach(error => errors.push(`- ${error}\n`));
            });
            allPlayers.forEach(player => player.destroy());
            this.reportError(errors);
        }
        // these can only be detected here since we have a map of all the elements
        // that have animations attached to them...
        const /** @type {?} */ enterNodesWithoutAnimations = [];
        for (let /** @type {?} */ i = 0; i < allEnterNodes.length; i++) {
            const /** @type {?} */ element = allEnterNodes[i];
            if (!subTimelines.has(element)) {
                enterNodesWithoutAnimations.push(element);
            }
        }
        const /** @type {?} */ allPreviousPlayersMap = new Map();
        let /** @type {?} */ sortedParentElements = [];
        queuedInstructions.forEach(entry => {
            const /** @type {?} */ element = entry.element;
            if (subTimelines.has(element)) {
                sortedParentElements.unshift(element);
                this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
            }
        });
        skippedPlayers.forEach(player => {
            const /** @type {?} */ element = player.element;
            const /** @type {?} */ previousPlayers = this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
            previousPlayers.forEach(prevPlayer => { getOrSetAsInMap(allPreviousPlayersMap, element, []).push(prevPlayer); });
        });
        allPreviousPlayersMap.forEach(players => players.forEach(player => player.destroy()));
        // PRE STAGE: fill the ! styles
        const /** @type {?} */ preStylesMap = allPreStyleElements.size ?
            cloakAndComputeStyles(this.driver, enterNodesWithoutAnimations, allPreStyleElements, PRE_STYLE) :
            new Map();
        // POST STAGE: fill the * styles
        const /** @type {?} */ postStylesMap = cloakAndComputeStyles(this.driver, leaveNodesWithoutAnimations, allPostStyleElements, AUTO_STYLE);
        const /** @type {?} */ rootPlayers = [];
        const /** @type {?} */ subPlayers = [];
        queuedInstructions.forEach(entry => {
            const { element, player, instruction } = entry;
            // this means that it was never consumed by a parent animation which
            // means that it is independent and therefore should be set for animation
            if (subTimelines.has(element)) {
                if (disabledElementsSet.has(element)) {
                    skippedPlayers.push(player);
                    return;
                }
                const /** @type {?} */ innerPlayer = this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
                player.setRealPlayer(innerPlayer);
                let /** @type {?} */ parentHasPriority = null;
                for (let /** @type {?} */ i = 0; i < sortedParentElements.length; i++) {
                    const /** @type {?} */ parent = sortedParentElements[i];
                    if (parent === element)
                        break;
                    if (this.driver.containsElement(parent, element)) {
                        parentHasPriority = parent;
                        break;
                    }
                }
                if (parentHasPriority) {
                    const /** @type {?} */ parentPlayers = this.playersByElement.get(parentHasPriority);
                    if (parentPlayers && parentPlayers.length) {
                        player.parentPlayer = optimizeGroupPlayer(parentPlayers);
                    }
                    skippedPlayers.push(player);
                }
                else {
                    rootPlayers.push(player);
                }
            }
            else {
                eraseStyles(element, instruction.fromStyles);
                player.onDestroy(() => setStyles(element, instruction.toStyles));
                subPlayers.push(player);
            }
        });
        subPlayers.forEach(player => {
            const /** @type {?} */ playersForElement = skippedPlayersMap.get(player.element);
            if (playersForElement && playersForElement.length) {
                const /** @type {?} */ innerPlayer = optimizeGroupPlayer(playersForElement);
                player.setRealPlayer(innerPlayer);
            }
        });
        // the reason why we don't actually play the animation is
        // because all that a skipped player is designed to do is to
        // fire the start/done transition callback events
        skippedPlayers.forEach(player => {
            if (player.parentPlayer) {
                player.parentPlayer.onDestroy(() => player.destroy());
            }
            else {
                player.destroy();
            }
        });
        // run through all of the queued removals and see if they
        // were picked up by a query. If not then perform the removal
        // operation right away unless a parent animation is ongoing.
        for (let /** @type {?} */ i = 0; i < allLeaveNodes.length; i++) {
            const /** @type {?} */ element = allLeaveNodes[i];
            const /** @type {?} */ details = (element[REMOVAL_FLAG]);
            removeClass(element, LEAVE_CLASSNAME);
            // this means the element has a removal animation that is being
            // taken care of and therefore the inner elements will hang around
            // until that animation is over (or the parent queried animation)
            if (details && details.hasAnimation)
                continue;
            let /** @type {?} */ players = [];
            // if this element is queried or if it contains queried children
            // then we want for the element not to be removed from the page
            // until the queried animations have finished
            if (queriedElements.size) {
                let /** @type {?} */ queriedPlayerResults = queriedElements.get(element);
                if (queriedPlayerResults && queriedPlayerResults.length) {
                    players.push(...queriedPlayerResults);
                }
                let /** @type {?} */ queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
                for (let /** @type {?} */ j = 0; j < queriedInnerElements.length; j++) {
                    let /** @type {?} */ queriedPlayers = queriedElements.get(queriedInnerElements[j]);
                    if (queriedPlayers && queriedPlayers.length) {
                        players.push(...queriedPlayers);
                    }
                }
            }
            if (players.length) {
                removeNodesAfterAnimationDone(this, element, players);
            }
            else {
                this.processLeaveNode(element);
            }
        }
        // this is required so the cleanup method doesn't remove them
        allLeaveNodes.length = 0;
        rootPlayers.forEach(player => {
            this.players.push(player);
            player.onDone(() => {
                player.destroy();
                const /** @type {?} */ index = this.players.indexOf(player);
                this.players.splice(index, 1);
            });
            player.play();
        });
        return rootPlayers;
    }
    /**
     * @param {?} namespaceId
     * @param {?} element
     * @return {?}
     */
    elementContainsData(namespaceId, element) {
        let /** @type {?} */ containsData = false;
        const /** @type {?} */ details = (element[REMOVAL_FLAG]);
        if (details && details.setForRemoval)
            containsData = true;
        if (this.playersByElement.has(element))
            containsData = true;
        if (this.playersByQueriedElement.has(element))
            containsData = true;
        if (this.statesByElement.has(element))
            containsData = true;
        return this._fetchNamespace(namespaceId).elementContainsData(element) || containsData;
    }
    /**
     * @param {?} callback
     * @return {?}
     */
    afterFlush(callback) { this._flushFns.push(callback); }
    /**
     * @param {?} callback
     * @return {?}
     */
    afterFlushAnimationsDone(callback) { this._whenQuietFns.push(callback); }
    /**
     * @param {?} element
     * @param {?} isQueriedElement
     * @param {?=} namespaceId
     * @param {?=} triggerName
     * @param {?=} toStateValue
     * @return {?}
     */
    _getPreviousPlayers(element, isQueriedElement, namespaceId, triggerName, toStateValue) {
        let /** @type {?} */ players = [];
        if (isQueriedElement) {
            const /** @type {?} */ queriedElementPlayers = this.playersByQueriedElement.get(element);
            if (queriedElementPlayers) {
                players = queriedElementPlayers;
            }
        }
        else {
            const /** @type {?} */ elementPlayers = this.playersByElement.get(element);
            if (elementPlayers) {
                const /** @type {?} */ isRemovalAnimation = !toStateValue || toStateValue == VOID_VALUE;
                elementPlayers.forEach(player => {
                    if (player.queued)
                        return;
                    if (!isRemovalAnimation && player.triggerName != triggerName)
                        return;
                    players.push(player);
                });
            }
        }
        if (namespaceId || triggerName) {
            players = players.filter(player => {
                if (namespaceId && namespaceId != player.namespaceId)
                    return false;
                if (triggerName && triggerName != player.triggerName)
                    return false;
                return true;
            });
        }
        return players;
    }
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @return {?}
     */
    _beforeAnimationBuild(namespaceId, instruction, allPreviousPlayersMap) {
        // it's important to do this step before destroying the players
        // so that the onDone callback below won't fire before this
        eraseStyles(instruction.element, instruction.fromStyles);
        const /** @type {?} */ triggerName = instruction.triggerName;
        const /** @type {?} */ rootElement = instruction.element;
        // when a removal animation occurs, ALL previous players are collected
        // and destroyed (even if they are outside of the current namespace)
        const /** @type {?} */ targetNameSpaceId = instruction.isRemovalTransition ? undefined : namespaceId;
        const /** @type {?} */ targetTriggerName = instruction.isRemovalTransition ? undefined : triggerName;
        instruction.timelines.map(timelineInstruction => {
            const /** @type {?} */ element = timelineInstruction.element;
            const /** @type {?} */ isQueriedElement = element !== rootElement;
            const /** @type {?} */ players = getOrSetAsInMap(allPreviousPlayersMap, element, []);
            const /** @type {?} */ previousPlayers = this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
            previousPlayers.forEach(player => {
                const /** @type {?} */ realPlayer = (player.getRealPlayer());
                if (realPlayer.beforeDestroy) {
                    realPlayer.beforeDestroy();
                }
                players.push(player);
            });
        });
    }
    /**
     * @param {?} namespaceId
     * @param {?} instruction
     * @param {?} allPreviousPlayersMap
     * @param {?} skippedPlayersMap
     * @param {?} preStylesMap
     * @param {?} postStylesMap
     * @return {?}
     */
    _buildAnimation(namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
        const /** @type {?} */ triggerName = instruction.triggerName;
        const /** @type {?} */ rootElement = instruction.element;
        // we first run this so that the previous animation player
        // data can be passed into the successive animation players
        const /** @type {?} */ allQueriedPlayers = [];
        const /** @type {?} */ allConsumedElements = new Set();
        const /** @type {?} */ allSubElements = new Set();
        const /** @type {?} */ allNewPlayers = instruction.timelines.map(timelineInstruction => {
            const /** @type {?} */ element = timelineInstruction.element;
            allConsumedElements.add(element);
            // FIXME (matsko): make sure to-be-removed animations are removed properly
            const /** @type {?} */ details = element[REMOVAL_FLAG];
            if (details && details.removedBeforeQueried)
                return new NoopAnimationPlayer();
            const /** @type {?} */ isQueriedElement = element !== rootElement;
            const /** @type {?} */ previousPlayers = flattenGroupPlayers((allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY)
                .map(p => p.getRealPlayer()))
                .filter(p => {
                // the `element` is not apart of the AnimationPlayer definition, but
                // Mock/WebAnimations
                // use the element within their implementation. This will be added in Angular5 to
                // AnimationPlayer
                const /** @type {?} */ pp = (p);
                return pp.element ? pp.element === element : false;
            });
            const /** @type {?} */ preStyles = preStylesMap.get(element);
            const /** @type {?} */ postStyles = postStylesMap.get(element);
            const /** @type {?} */ keyframes = normalizeKeyframes(this.driver, this._normalizer, element, timelineInstruction.keyframes, preStyles, postStyles);
            const /** @type {?} */ player = this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
            // this means that this particular player belongs to a sub trigger. It is
            // important that we match this player up with the corresponding (@trigger.listener)
            if (timelineInstruction.subTimeline && skippedPlayersMap) {
                allSubElements.add(element);
            }
            if (isQueriedElement) {
                const /** @type {?} */ wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
                wrappedPlayer.setRealPlayer(player);
                allQueriedPlayers.push(wrappedPlayer);
            }
            return player;
        });
        allQueriedPlayers.forEach(player => {
            getOrSetAsInMap(this.playersByQueriedElement, player.element, []).push(player);
            player.onDone(() => deleteOrUnsetInMap(this.playersByQueriedElement, player.element, player));
        });
        allConsumedElements.forEach(element => addClass(element, NG_ANIMATING_CLASSNAME));
        const /** @type {?} */ player = optimizeGroupPlayer(allNewPlayers);
        player.onDestroy(() => {
            allConsumedElements.forEach(element => removeClass(element, NG_ANIMATING_CLASSNAME));
            setStyles(rootElement, instruction.toStyles);
        });
        // this basically makes all of the callbacks for sub element animations
        // be dependent on the upper players for when they finish
        allSubElements.forEach(element => { getOrSetAsInMap(skippedPlayersMap, element, []).push(player); });
        return player;
    }
    /**
     * @param {?} instruction
     * @param {?} keyframes
     * @param {?} previousPlayers
     * @return {?}
     */
    _buildPlayer(instruction, keyframes, previousPlayers) {
        if (keyframes.length > 0) {
            return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
        }
        // special case for when an empty transition|definition is provided
        // ... there is no point in rendering an empty animation
        return new NoopAnimationPlayer();
    }
}
function TransitionAnimationEngine_tsickle_Closure_declarations() {
    /** @type {?} */
    TransitionAnimationEngine.prototype.players;
    /** @type {?} */
    TransitionAnimationEngine.prototype.newHostElements;
    /** @type {?} */
    TransitionAnimationEngine.prototype.playersByElement;
    /** @type {?} */
    TransitionAnimationEngine.prototype.playersByQueriedElement;
    /** @type {?} */
    TransitionAnimationEngine.prototype.statesByElement;
    /** @type {?} */
    TransitionAnimationEngine.prototype.disabledNodes;
    /** @type {?} */
    TransitionAnimationEngine.prototype.totalAnimations;
    /** @type {?} */
    TransitionAnimationEngine.prototype.totalQueuedPlayers;
    /** @type {?} */
    TransitionAnimationEngine.prototype._namespaceLookup;
    /** @type {?} */
    TransitionAnimationEngine.prototype._namespaceList;
    /** @type {?} */
    TransitionAnimationEngine.prototype._flushFns;
    /** @type {?} */
    TransitionAnimationEngine.prototype._whenQuietFns;
    /** @type {?} */
    TransitionAnimationEngine.prototype.namespacesByHostElement;
    /** @type {?} */
    TransitionAnimationEngine.prototype.collectedEnterElements;
    /** @type {?} */
    TransitionAnimationEngine.prototype.collectedLeaveElements;
    /** @type {?} */
    TransitionAnimationEngine.prototype.onRemovalComplete;
    /** @type {?} */
    TransitionAnimationEngine.prototype.driver;
    /** @type {?} */
    TransitionAnimationEngine.prototype._normalizer;
}
export class TransitionAnimationPlayer {
    /**
     * @param {?} namespaceId
     * @param {?} triggerName
     * @param {?} element
     */
    constructor(namespaceId, triggerName, element) {
        this.namespaceId = namespaceId;
        this.triggerName = triggerName;
        this.element = element;
        this._player = new NoopAnimationPlayer();
        this._containsRealPlayer = false;
        this._queuedCallbacks = {};
        this._destroyed = false;
        this.markedForDestroy = false;
    }
    /**
     * @return {?}
     */
    get queued() { return this._containsRealPlayer == false; }
    /**
     * @return {?}
     */
    get destroyed() { return this._destroyed; }
    /**
     * @param {?} player
     * @return {?}
     */
    setRealPlayer(player) {
        if (this._containsRealPlayer)
            return;
        this._player = player;
        Object.keys(this._queuedCallbacks).forEach(phase => {
            this._queuedCallbacks[phase].forEach(callback => listenOnPlayer(player, phase, undefined, callback));
        });
        this._queuedCallbacks = {};
        this._containsRealPlayer = true;
    }
    /**
     * @return {?}
     */
    getRealPlayer() { return this._player; }
    /**
     * @param {?} name
     * @param {?} callback
     * @return {?}
     */
    _queueEvent(name, callback) {
        getOrSetAsInMap(this._queuedCallbacks, name, []).push(callback);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDone(fn) {
        if (this.queued) {
            this._queueEvent('done', fn);
        }
        this._player.onDone(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onStart(fn) {
        if (this.queued) {
            this._queueEvent('start', fn);
        }
        this._player.onStart(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    onDestroy(fn) {
        if (this.queued) {
            this._queueEvent('destroy', fn);
        }
        this._player.onDestroy(fn);
    }
    /**
     * @return {?}
     */
    init() { this._player.init(); }
    /**
     * @return {?}
     */
    hasStarted() { return this.queued ? false : this._player.hasStarted(); }
    /**
     * @return {?}
     */
    play() { !this.queued && this._player.play(); }
    /**
     * @return {?}
     */
    pause() { !this.queued && this._player.pause(); }
    /**
     * @return {?}
     */
    restart() { !this.queued && this._player.restart(); }
    /**
     * @return {?}
     */
    finish() { this._player.finish(); }
    /**
     * @return {?}
     */
    destroy() {
        this._destroyed = true;
        this._player.destroy();
    }
    /**
     * @return {?}
     */
    reset() { !this.queued && this._player.reset(); }
    /**
     * @param {?} p
     * @return {?}
     */
    setPosition(p) {
        if (!this.queued) {
            this._player.setPosition(p);
        }
    }
    /**
     * @return {?}
     */
    getPosition() { return this.queued ? 0 : this._player.getPosition(); }
    /**
     * @return {?}
     */
    get totalTime() { return this._player.totalTime; }
}
function TransitionAnimationPlayer_tsickle_Closure_declarations() {
    /** @type {?} */
    TransitionAnimationPlayer.prototype._player;
    /** @type {?} */
    TransitionAnimationPlayer.prototype._containsRealPlayer;
    /** @type {?} */
    TransitionAnimationPlayer.prototype._queuedCallbacks;
    /** @type {?} */
    TransitionAnimationPlayer.prototype._destroyed;
    /** @type {?} */
    TransitionAnimationPlayer.prototype.parentPlayer;
    /** @type {?} */
    TransitionAnimationPlayer.prototype.markedForDestroy;
    /** @type {?} */
    TransitionAnimationPlayer.prototype.namespaceId;
    /** @type {?} */
    TransitionAnimationPlayer.prototype.triggerName;
    /** @type {?} */
    TransitionAnimationPlayer.prototype.element;
}
/**
 * @param {?} map
 * @param {?} key
 * @param {?} value
 * @return {?}
 */
function deleteOrUnsetInMap(map, key, value) {
    let /** @type {?} */ currentValues;
    if (map instanceof Map) {
        currentValues = map.get(key);
        if (currentValues) {
            if (currentValues.length) {
                const /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                map.delete(key);
            }
        }
    }
    else {
        currentValues = map[key];
        if (currentValues) {
            if (currentValues.length) {
                const /** @type {?} */ index = currentValues.indexOf(value);
                currentValues.splice(index, 1);
            }
            if (currentValues.length == 0) {
                delete map[key];
            }
        }
    }
    return currentValues;
}
/**
 * @param {?} value
 * @return {?}
 */
function normalizeTriggerValue(value) {
    switch (typeof value) {
        case 'boolean':
            return value ? '1' : '0';
        default:
            return value != null ? value.toString() : null;
    }
}
/**
 * @param {?} node
 * @return {?}
 */
function isElementNode(node) {
    return node && node['nodeType'] === 1;
}
/**
 * @param {?} eventName
 * @return {?}
 */
function isTriggerEventValid(eventName) {
    return eventName == 'start' || eventName == 'done';
}
/**
 * @param {?} element
 * @param {?=} value
 * @return {?}
 */
function cloakElement(element, value) {
    const /** @type {?} */ oldValue = element.style.display;
    element.style.display = value != null ? value : 'none';
    return oldValue;
}
/**
 * @param {?} driver
 * @param {?} elements
 * @param {?} elementPropsMap
 * @param {?} defaultStyle
 * @return {?}
 */
function cloakAndComputeStyles(driver, elements, elementPropsMap, defaultStyle) {
    const /** @type {?} */ cloakVals = elements.map(element => cloakElement(element));
    const /** @type {?} */ valuesMap = new Map();
    elementPropsMap.forEach((props, element) => {
        const /** @type {?} */ styles = {};
        props.forEach(prop => {
            const /** @type {?} */ value = styles[prop] = driver.computeStyle(element, prop, defaultStyle);
            // there is no easy way to detect this because a sub element could be removed
            // by a parent animation element being detached.
            if (!value || value.length == 0) {
                element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
            }
        });
        valuesMap.set(element, styles);
    });
    elements.forEach((element, i) => cloakElement(element, cloakVals[i]));
    return valuesMap;
}
/**
 * @param {?} nodes
 * @return {?}
 */
function createIsRootFilterFn(nodes) {
    const /** @type {?} */ nodeSet = new Set(nodes);
    const /** @type {?} */ knownRootContainer = new Set();
    let /** @type {?} */ isRoot;
    isRoot = node => {
        if (!node)
            return true;
        if (nodeSet.has(node.parentNode))
            return false;
        if (knownRootContainer.has(node.parentNode))
            return true;
        if (isRoot(node.parentNode)) {
            knownRootContainer.add(node);
            return true;
        }
        return false;
    };
    return isRoot;
}
const /** @type {?} */ CLASSES_CACHE_KEY = '$$classes';
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function containsClass(element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }
    else {
        const /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        return classes && classes[className];
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function addClass(element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else {
        let /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (!classes) {
            classes = element[CLASSES_CACHE_KEY] = {};
        }
        classes[className] = true;
    }
}
/**
 * @param {?} element
 * @param {?} className
 * @return {?}
 */
function removeClass(element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        let /** @type {?} */ classes = element[CLASSES_CACHE_KEY];
        if (classes) {
            delete classes[className];
        }
    }
}
/**
 * @return {?}
 */
function getBodyNode() {
    if (typeof document != 'undefined') {
        return document.body;
    }
    return null;
}
/**
 * @param {?} engine
 * @param {?} element
 * @param {?} players
 * @return {?}
 */
function removeNodesAfterAnimationDone(engine, element, players) {
    optimizeGroupPlayer(players).onDone(() => engine.processLeaveNode(element));
}
/**
 * @param {?} players
 * @return {?}
 */
function flattenGroupPlayers(players) {
    const /** @type {?} */ finalPlayers = [];
    _flattenGroupPlayersRecur(players, finalPlayers);
    return finalPlayers;
}
/**
 * @param {?} players
 * @param {?} finalPlayers
 * @return {?}
 */
function _flattenGroupPlayersRecur(players, finalPlayers) {
    for (let /** @type {?} */ i = 0; i < players.length; i++) {
        const /** @type {?} */ player = players[i];
        if (player instanceof AnimationGroupPlayer) {
            _flattenGroupPlayersRecur(player.players, finalPlayers);
        }
        else {
            finalPlayers.push(/** @type {?} */ (player));
        }
    }
}
/**
 * @param {?} a
 * @param {?} b
 * @return {?}
 */
function objEquals(a, b) {
    const /** @type {?} */ k1 = Object.keys(a);
    const /** @type {?} */ k2 = Object.keys(b);
    if (k1.length != k2.length)
        return false;
    for (let /** @type {?} */ i = 0; i < k1.length; i++) {
        const /** @type {?} */ prop = k1[i];
        if (!b.hasOwnProperty(prop) || a[prop] !== b[prop])
            return false;
    }
    return true;
}
//# sourceMappingURL=transition_animation_engine.js.map