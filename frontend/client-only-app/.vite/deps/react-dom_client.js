import {
  require_react_dom
} from "./chunk-754QBBPN.js";
import {
  require_react
} from "./chunk-ZAGUJ3RM.js";
import {
  __commonJS
} from "./chunk-5WWUZCGV.js";

// node_modules/scheduler/cjs/scheduler.development.js
var require_scheduler_development = __commonJS({
  "node_modules/scheduler/cjs/scheduler.development.js"(exports) {
    "use strict";
    (function() {
      function performWorkUntilDeadline() {
        needsPaint = false;
        if (isMessageLoopRunning) {
          var currentTime = exports.unstable_now();
          startTime = currentTime;
          var hasMoreWork = true;
          try {
            a: {
              isHostCallbackScheduled = false;
              isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
              isPerformingWork = true;
              var previousPriorityLevel = currentPriorityLevel;
              try {
                b: {
                  advanceTimers(currentTime);
                  for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                    var callback = currentTask.callback;
                    if ("function" === typeof callback) {
                      currentTask.callback = null;
                      currentPriorityLevel = currentTask.priorityLevel;
                      var continuationCallback = callback(
                        currentTask.expirationTime <= currentTime
                      );
                      currentTime = exports.unstable_now();
                      if ("function" === typeof continuationCallback) {
                        currentTask.callback = continuationCallback;
                        advanceTimers(currentTime);
                        hasMoreWork = true;
                        break b;
                      }
                      currentTask === peek(taskQueue) && pop(taskQueue);
                      advanceTimers(currentTime);
                    } else
                      pop(taskQueue);
                    currentTask = peek(taskQueue);
                  }
                  if (null !== currentTask)
                    hasMoreWork = true;
                  else {
                    var firstTimer = peek(timerQueue);
                    null !== firstTimer && requestHostTimeout(
                      handleTimeout,
                      firstTimer.startTime - currentTime
                    );
                    hasMoreWork = false;
                  }
                }
                break a;
              } finally {
                currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
              }
              hasMoreWork = void 0;
            }
          } finally {
            hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
          }
        }
      }
      function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a:
          for (; 0 < index; ) {
            var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
            if (0 < compare(parent, node))
              heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
            else
              break a;
          }
      }
      function peek(heap) {
        return 0 === heap.length ? null : heap[0];
      }
      function pop(heap) {
        if (0 === heap.length)
          return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
          heap[0] = last;
          a:
            for (var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength; ) {
              var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
              if (0 > compare(left, last))
                rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
              else if (rightIndex < length && 0 > compare(right, last))
                heap[index] = right, heap[rightIndex] = last, index = rightIndex;
              else
                break a;
            }
        }
        return first;
      }
      function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
      }
      function advanceTimers(currentTime) {
        for (var timer = peek(timerQueue); null !== timer; ) {
          if (null === timer.callback)
            pop(timerQueue);
          else if (timer.startTime <= currentTime)
            pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
          else
            break;
          timer = peek(timerQueue);
        }
      }
      function handleTimeout(currentTime) {
        isHostTimeoutScheduled = false;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled)
          if (null !== peek(taskQueue))
            isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
          else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(
              handleTimeout,
              firstTimer.startTime - currentTime
            );
          }
      }
      function shouldYieldToHost() {
        return needsPaint ? true : exports.unstable_now() - startTime < frameInterval ? false : true;
      }
      function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
          callback(exports.unstable_now());
        }, ms);
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      exports.unstable_now = void 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports.unstable_now = function() {
          return localPerformance.now();
        };
      } else {
        var localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
          return localDate.now() - initialTime;
        };
      }
      var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, needsPaint = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null, isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
      if ("function" === typeof localSetImmediate)
        var schedulePerformWorkUntilDeadline = function() {
          localSetImmediate(performWorkUntilDeadline);
        };
      else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
          port.postMessage(null);
        };
      } else
        schedulePerformWorkUntilDeadline = function() {
          localSetTimeout(performWorkUntilDeadline, 0);
        };
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(task) {
        task.callback = null;
      };
      exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error(
          "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
      };
      exports.unstable_next = function(eventHandler) {
        switch (currentPriorityLevel) {
          case 1:
          case 2:
          case 3:
            var priorityLevel = 3;
            break;
          default:
            priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_requestPaint = function() {
        needsPaint = true;
      };
      exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch (priorityLevel) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
          return eventHandler();
        } finally {
          currentPriorityLevel = previousPriorityLevel;
        }
      };
      exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch (priorityLevel) {
          case 1:
            var timeout = -1;
            break;
          case 2:
            timeout = 250;
            break;
          case 5:
            timeout = 1073741823;
            break;
          case 4:
            timeout = 1e4;
            break;
          default:
            timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
          id: taskIdCounter++,
          callback,
          priorityLevel,
          startTime: options,
          expirationTime: timeout,
          sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
      };
      exports.unstable_shouldYield = shouldYieldToHost;
      exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
          var previousPriorityLevel = currentPriorityLevel;
          currentPriorityLevel = parentPriorityLevel;
          try {
            return callback.apply(this, arguments);
          } finally {
            currentPriorityLevel = previousPriorityLevel;
          }
        };
      };
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/scheduler/index.js
var require_scheduler = __commonJS({
  "node_modules/scheduler/index.js"(exports, module) {
    "use strict";
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_scheduler_development();
    }
  }
});

// node_modules/react-dom/cjs/react-dom-client.development.js
var require_react_dom_client_development = __commonJS({
  "node_modules/react-dom/cjs/react-dom-client.development.js"(exports) {
    "use strict";
    (function() {
      function findHook(fiber, id) {
        for (fiber = fiber.memoizedState; null !== fiber && 0 < id; )
          fiber = fiber.next, id--;
        return fiber;
      }
      function copyWithSetImpl(obj, path, index, value) {
        if (index >= path.length)
          return value;
        var key = path[index], updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
        updated[key] = copyWithSetImpl(obj[key], path, index + 1, value);
        return updated;
      }
      function copyWithRename(obj, oldPath, newPath) {
        if (oldPath.length !== newPath.length)
          console.warn("copyWithRename() expects paths of the same length");
        else {
          for (var i = 0; i < newPath.length - 1; i++)
            if (oldPath[i] !== newPath[i]) {
              console.warn(
                "copyWithRename() expects paths to be the same except for the deepest key"
              );
              return;
            }
          return copyWithRenameImpl(obj, oldPath, newPath, 0);
        }
      }
      function copyWithRenameImpl(obj, oldPath, newPath, index) {
        var oldKey = oldPath[index], updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
        index + 1 === oldPath.length ? (updated[newPath[index]] = updated[oldKey], isArrayImpl(updated) ? updated.splice(oldKey, 1) : delete updated[oldKey]) : updated[oldKey] = copyWithRenameImpl(
          obj[oldKey],
          oldPath,
          newPath,
          index + 1
        );
        return updated;
      }
      function copyWithDeleteImpl(obj, path, index) {
        var key = path[index], updated = isArrayImpl(obj) ? obj.slice() : assign({}, obj);
        if (index + 1 === path.length)
          return isArrayImpl(updated) ? updated.splice(key, 1) : delete updated[key], updated;
        updated[key] = copyWithDeleteImpl(obj[key], path, index + 1);
        return updated;
      }
      function shouldSuspendImpl() {
        return false;
      }
      function shouldErrorImpl() {
        return null;
      }
      function warnForMissingKey() {
      }
      function warnInvalidHookAccess() {
        console.error(
          "Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://react.dev/link/rules-of-hooks"
        );
      }
      function warnInvalidContextAccess() {
        console.error(
          "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
        );
      }
      function noop$2() {
      }
      function setToSortedString(set) {
        var array = [];
        set.forEach(function(value) {
          array.push(value);
        });
        return array.sort().join(", ");
      }
      function createFiber(tag, pendingProps, key, mode) {
        return new FiberNode(tag, pendingProps, key, mode);
      }
      function scheduleRoot(root2, element) {
        root2.context === emptyContextObject && (updateContainerImpl(root2.current, 2, element, root2, null, null), flushSyncWork$1());
      }
      function scheduleRefresh(root2, update) {
        if (null !== resolveFamily) {
          var staleFamilies = update.staleFamilies;
          update = update.updatedFamilies;
          flushPendingEffects();
          scheduleFibersWithFamiliesRecursively(
            root2.current,
            update,
            staleFamilies
          );
          flushSyncWork$1();
        }
      }
      function setRefreshHandler(handler) {
        resolveFamily = handler;
      }
      function isValidContainer(node) {
        return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
      }
      function getNearestMountedFiber(fiber) {
        var node = fiber, nearestMounted = fiber;
        if (fiber.alternate)
          for (; node.return; )
            node = node.return;
        else {
          fiber = node;
          do
            node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
          while (fiber);
        }
        return 3 === node.tag ? nearestMounted : null;
      }
      function getSuspenseInstanceFromFiber(fiber) {
        if (13 === fiber.tag) {
          var suspenseState = fiber.memoizedState;
          null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
          if (null !== suspenseState)
            return suspenseState.dehydrated;
        }
        return null;
      }
      function assertIsMounted(fiber) {
        if (getNearestMountedFiber(fiber) !== fiber)
          throw Error("Unable to find node on an unmounted component.");
      }
      function findCurrentFiberUsingSlowPath(fiber) {
        var alternate = fiber.alternate;
        if (!alternate) {
          alternate = getNearestMountedFiber(fiber);
          if (null === alternate)
            throw Error("Unable to find node on an unmounted component.");
          return alternate !== fiber ? null : fiber;
        }
        for (var a = fiber, b = alternate; ; ) {
          var parentA = a.return;
          if (null === parentA)
            break;
          var parentB = parentA.alternate;
          if (null === parentB) {
            b = parentA.return;
            if (null !== b) {
              a = b;
              continue;
            }
            break;
          }
          if (parentA.child === parentB.child) {
            for (parentB = parentA.child; parentB; ) {
              if (parentB === a)
                return assertIsMounted(parentA), fiber;
              if (parentB === b)
                return assertIsMounted(parentA), alternate;
              parentB = parentB.sibling;
            }
            throw Error("Unable to find node on an unmounted component.");
          }
          if (a.return !== b.return)
            a = parentA, b = parentB;
          else {
            for (var didFindChild = false, _child = parentA.child; _child; ) {
              if (_child === a) {
                didFindChild = true;
                a = parentA;
                b = parentB;
                break;
              }
              if (_child === b) {
                didFindChild = true;
                b = parentA;
                a = parentB;
                break;
              }
              _child = _child.sibling;
            }
            if (!didFindChild) {
              for (_child = parentB.child; _child; ) {
                if (_child === a) {
                  didFindChild = true;
                  a = parentB;
                  b = parentA;
                  break;
                }
                if (_child === b) {
                  didFindChild = true;
                  b = parentB;
                  a = parentA;
                  break;
                }
                _child = _child.sibling;
              }
              if (!didFindChild)
                throw Error(
                  "Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue."
                );
            }
          }
          if (a.alternate !== b)
            throw Error(
              "Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue."
            );
        }
        if (3 !== a.tag)
          throw Error("Unable to find node on an unmounted component.");
        return a.stateNode.current === a ? fiber : alternate;
      }
      function findCurrentHostFiberImpl(node) {
        var tag = node.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag)
          return node;
        for (node = node.child; null !== node; ) {
          tag = findCurrentHostFiberImpl(node);
          if (null !== tag)
            return tag;
          node = node.sibling;
        }
        return null;
      }
      function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable)
          return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
      }
      function getComponentNameFromType(type) {
        if (null == type)
          return null;
        if ("function" === typeof type)
          return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type)
          return type;
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
          case REACT_ACTIVITY_TYPE:
            return "Activity";
        }
        if ("object" === typeof type)
          switch ("number" === typeof type.tag && console.error(
            "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
          ), type.$$typeof) {
            case REACT_PORTAL_TYPE:
              return "Portal";
            case REACT_CONTEXT_TYPE:
              return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
              return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
              var innerType = type.render;
              type = type.displayName;
              type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
              return type;
            case REACT_MEMO_TYPE:
              return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
              innerType = type._payload;
              type = type._init;
              try {
                return getComponentNameFromType(type(innerType));
              } catch (x) {
              }
          }
        return null;
      }
      function getComponentNameFromOwner(owner) {
        return "number" === typeof owner.tag ? getComponentNameFromFiber(owner) : "string" === typeof owner.name ? owner.name : null;
      }
      function getComponentNameFromFiber(fiber) {
        var type = fiber.type;
        switch (fiber.tag) {
          case 31:
            return "Activity";
          case 24:
            return "Cache";
          case 9:
            return (type._context.displayName || "Context") + ".Consumer";
          case 10:
            return (type.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return fiber = type.render, fiber = fiber.displayName || fiber.name || "", type.displayName || ("" !== fiber ? "ForwardRef(" + fiber + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 26:
          case 27:
          case 5:
            return type;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return getComponentNameFromType(type);
          case 8:
            return type === REACT_STRICT_MODE_TYPE ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 14:
          case 15:
            if ("function" === typeof type)
              return type.displayName || type.name || null;
            if ("string" === typeof type)
              return type;
            break;
          case 29:
            type = fiber._debugInfo;
            if (null != type) {
              for (var i = type.length - 1; 0 <= i; i--)
                if ("string" === typeof type[i].name)
                  return type[i].name;
            }
            if (null !== fiber.return)
              return getComponentNameFromFiber(fiber.return);
        }
        return null;
      }
      function createCursor(defaultValue) {
        return { current: defaultValue };
      }
      function pop(cursor, fiber) {
        0 > index$jscomp$0 ? console.error("Unexpected pop.") : (fiber !== fiberStack[index$jscomp$0] && console.error("Unexpected Fiber popped."), cursor.current = valueStack[index$jscomp$0], valueStack[index$jscomp$0] = null, fiberStack[index$jscomp$0] = null, index$jscomp$0--);
      }
      function push(cursor, value, fiber) {
        index$jscomp$0++;
        valueStack[index$jscomp$0] = cursor.current;
        fiberStack[index$jscomp$0] = fiber;
        cursor.current = value;
      }
      function requiredContext(c) {
        null === c && console.error(
          "Expected host context to exist. This error is likely caused by a bug in React. Please file an issue."
        );
        return c;
      }
      function pushHostContainer(fiber, nextRootInstance) {
        push(rootInstanceStackCursor, nextRootInstance, fiber);
        push(contextFiberStackCursor, fiber, fiber);
        push(contextStackCursor, null, fiber);
        var nextRootContext = nextRootInstance.nodeType;
        switch (nextRootContext) {
          case 9:
          case 11:
            nextRootContext = 9 === nextRootContext ? "#document" : "#fragment";
            nextRootInstance = (nextRootInstance = nextRootInstance.documentElement) ? (nextRootInstance = nextRootInstance.namespaceURI) ? getOwnHostContext(nextRootInstance) : HostContextNamespaceNone : HostContextNamespaceNone;
            break;
          default:
            if (nextRootContext = nextRootInstance.tagName, nextRootInstance = nextRootInstance.namespaceURI)
              nextRootInstance = getOwnHostContext(nextRootInstance), nextRootInstance = getChildHostContextProd(
                nextRootInstance,
                nextRootContext
              );
            else
              switch (nextRootContext) {
                case "svg":
                  nextRootInstance = HostContextNamespaceSvg;
                  break;
                case "math":
                  nextRootInstance = HostContextNamespaceMath;
                  break;
                default:
                  nextRootInstance = HostContextNamespaceNone;
              }
        }
        nextRootContext = nextRootContext.toLowerCase();
        nextRootContext = updatedAncestorInfoDev(null, nextRootContext);
        nextRootContext = {
          context: nextRootInstance,
          ancestorInfo: nextRootContext
        };
        pop(contextStackCursor, fiber);
        push(contextStackCursor, nextRootContext, fiber);
      }
      function popHostContainer(fiber) {
        pop(contextStackCursor, fiber);
        pop(contextFiberStackCursor, fiber);
        pop(rootInstanceStackCursor, fiber);
      }
      function getHostContext() {
        return requiredContext(contextStackCursor.current);
      }
      function pushHostContext(fiber) {
        null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber, fiber);
        var context = requiredContext(contextStackCursor.current);
        var type = fiber.type;
        var nextContext = getChildHostContextProd(context.context, type);
        type = updatedAncestorInfoDev(context.ancestorInfo, type);
        nextContext = { context: nextContext, ancestorInfo: type };
        context !== nextContext && (push(contextFiberStackCursor, fiber, fiber), push(contextStackCursor, nextContext, fiber));
      }
      function popHostContext(fiber) {
        contextFiberStackCursor.current === fiber && (pop(contextStackCursor, fiber), pop(contextFiberStackCursor, fiber));
        hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor, fiber), HostTransitionContext._currentValue = NotPendingTransition);
      }
      function typeName(value) {
        return "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
      }
      function willCoercionThrow(value) {
        try {
          return testStringCoercion(value), false;
        } catch (e) {
          return true;
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkAttributeStringCoercion(value, attributeName) {
        if (willCoercionThrow(value))
          return console.error(
            "The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before using it here.",
            attributeName,
            typeName(value)
          ), testStringCoercion(value);
      }
      function checkCSSPropertyStringCoercion(value, propName) {
        if (willCoercionThrow(value))
          return console.error(
            "The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before using it here.",
            propName,
            typeName(value)
          ), testStringCoercion(value);
      }
      function checkFormFieldValueStringCoercion(value) {
        if (willCoercionThrow(value))
          return console.error(
            "Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before using it here.",
            typeName(value)
          ), testStringCoercion(value);
      }
      function injectInternals(internals) {
        if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)
          return false;
        var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (hook.isDisabled)
          return true;
        if (!hook.supportsFiber)
          return console.error(
            "The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://react.dev/link/react-devtools"
          ), true;
        try {
          rendererID = hook.inject(internals), injectedHook = hook;
        } catch (err) {
          console.error("React instrumentation encountered an error: %s.", err);
        }
        return hook.checkDCE ? true : false;
      }
      function setIsStrictModeForDevtools(newIsStrictMode) {
        "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
        if (injectedHook && "function" === typeof injectedHook.setStrictMode)
          try {
            injectedHook.setStrictMode(rendererID, newIsStrictMode);
          } catch (err) {
            hasLoggedError || (hasLoggedError = true, console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
          }
      }
      function injectProfilingHooks(profilingHooks) {
        injectedProfilingHooks = profilingHooks;
      }
      function markCommitStopped() {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markCommitStopped && injectedProfilingHooks.markCommitStopped();
      }
      function markComponentRenderStarted(fiber) {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentRenderStarted && injectedProfilingHooks.markComponentRenderStarted(fiber);
      }
      function markComponentRenderStopped() {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentRenderStopped && injectedProfilingHooks.markComponentRenderStopped();
      }
      function markRenderStarted(lanes) {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markRenderStarted && injectedProfilingHooks.markRenderStarted(lanes);
      }
      function markRenderStopped() {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markRenderStopped && injectedProfilingHooks.markRenderStopped();
      }
      function markStateUpdateScheduled(fiber, lane) {
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markStateUpdateScheduled && injectedProfilingHooks.markStateUpdateScheduled(fiber, lane);
      }
      function clz32Fallback(x) {
        x >>>= 0;
        return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
      }
      function getLabelForLane(lane) {
        if (lane & 1)
          return "SyncHydrationLane";
        if (lane & 2)
          return "Sync";
        if (lane & 4)
          return "InputContinuousHydration";
        if (lane & 8)
          return "InputContinuous";
        if (lane & 16)
          return "DefaultHydration";
        if (lane & 32)
          return "Default";
        if (lane & 128)
          return "TransitionHydration";
        if (lane & 4194048)
          return "Transition";
        if (lane & 62914560)
          return "Retry";
        if (lane & 67108864)
          return "SelectiveHydration";
        if (lane & 134217728)
          return "IdleHydration";
        if (lane & 268435456)
          return "Idle";
        if (lane & 536870912)
          return "Offscreen";
        if (lane & 1073741824)
          return "Deferred";
      }
      function getHighestPriorityLanes(lanes) {
        var pendingSyncLanes = lanes & 42;
        if (0 !== pendingSyncLanes)
          return pendingSyncLanes;
        switch (lanes & -lanes) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
            return 64;
          case 128:
            return 128;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return lanes & 4194048;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return lanes & 62914560;
          case 67108864:
            return 67108864;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 0;
          default:
            return console.error(
              "Should have found matching lanes. This is a bug in React."
            ), lanes;
        }
      }
      function getNextLanes(root2, wipLanes, rootHasPendingCommit) {
        var pendingLanes = root2.pendingLanes;
        if (0 === pendingLanes)
          return 0;
        var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
        root2 = root2.warmLanes;
        var nonIdlePendingLanes = pendingLanes & 134217727;
        0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = nonIdlePendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : rootHasPendingCommit || (rootHasPendingCommit = pendingLanes & ~root2, 0 !== rootHasPendingCommit && (nextLanes = getHighestPriorityLanes(rootHasPendingCommit))));
        return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, rootHasPendingCommit = wipLanes & -wipLanes, suspendedLanes >= rootHasPendingCommit || 32 === suspendedLanes && 0 !== (rootHasPendingCommit & 4194048)) ? wipLanes : nextLanes;
      }
      function checkIfRootIsPrerendering(root2, renderLanes2) {
        return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
      }
      function computeExpirationTime(lane, currentTime) {
        switch (lane) {
          case 1:
          case 2:
          case 4:
          case 8:
          case 64:
            return currentTime + 250;
          case 16:
          case 32:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return currentTime + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            return -1;
          case 67108864:
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return console.error(
              "Should have found matching lanes. This is a bug in React."
            ), -1;
        }
      }
      function claimNextTransitionLane() {
        var lane = nextTransitionLane;
        nextTransitionLane <<= 1;
        0 === (nextTransitionLane & 4194048) && (nextTransitionLane = 256);
        return lane;
      }
      function claimNextRetryLane() {
        var lane = nextRetryLane;
        nextRetryLane <<= 1;
        0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
        return lane;
      }
      function createLaneMap(initial) {
        for (var laneMap = [], i = 0; 31 > i; i++)
          laneMap.push(initial);
        return laneMap;
      }
      function markRootUpdated$1(root2, updateLane) {
        root2.pendingLanes |= updateLane;
        268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
      }
      function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
        var previouslyPendingLanes = root2.pendingLanes;
        root2.pendingLanes = remainingLanes;
        root2.suspendedLanes = 0;
        root2.pingedLanes = 0;
        root2.warmLanes = 0;
        root2.expiredLanes &= remainingLanes;
        root2.entangledLanes &= remainingLanes;
        root2.errorRecoveryDisabledLanes &= remainingLanes;
        root2.shellSuspendCounter = 0;
        var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
        for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
          var index = 31 - clz32(remainingLanes), lane = 1 << index;
          entanglements[index] = 0;
          expirationTimes[index] = -1;
          var hiddenUpdatesForLane = hiddenUpdates[index];
          if (null !== hiddenUpdatesForLane)
            for (hiddenUpdates[index] = null, index = 0; index < hiddenUpdatesForLane.length; index++) {
              var update = hiddenUpdatesForLane[index];
              null !== update && (update.lane &= -536870913);
            }
          remainingLanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
        0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
      }
      function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
        root2.pendingLanes |= spawnedLane;
        root2.suspendedLanes &= ~spawnedLane;
        var spawnedLaneIndex = 31 - clz32(spawnedLane);
        root2.entangledLanes |= spawnedLane;
        root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 4194090;
      }
      function markRootEntangled(root2, entangledLanes) {
        var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
        for (root2 = root2.entanglements; rootEntangledLanes; ) {
          var index = 31 - clz32(rootEntangledLanes), lane = 1 << index;
          lane & entangledLanes | root2[index] & entangledLanes && (root2[index] |= entangledLanes);
          rootEntangledLanes &= ~lane;
        }
      }
      function getBumpedLaneForHydrationByLane(lane) {
        switch (lane) {
          case 2:
            lane = 1;
            break;
          case 8:
            lane = 4;
            break;
          case 32:
            lane = 16;
            break;
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
            lane = 128;
            break;
          case 268435456:
            lane = 134217728;
            break;
          default:
            lane = 0;
        }
        return lane;
      }
      function addFiberToLanesMap(root2, fiber, lanes) {
        if (isDevToolsPresent)
          for (root2 = root2.pendingUpdatersLaneMap; 0 < lanes; ) {
            var index = 31 - clz32(lanes), lane = 1 << index;
            root2[index].add(fiber);
            lanes &= ~lane;
          }
      }
      function movePendingFibersToMemoized(root2, lanes) {
        if (isDevToolsPresent)
          for (var pendingUpdatersLaneMap = root2.pendingUpdatersLaneMap, memoizedUpdaters = root2.memoizedUpdaters; 0 < lanes; ) {
            var index = 31 - clz32(lanes);
            root2 = 1 << index;
            index = pendingUpdatersLaneMap[index];
            0 < index.size && (index.forEach(function(fiber) {
              var alternate = fiber.alternate;
              null !== alternate && memoizedUpdaters.has(alternate) || memoizedUpdaters.add(fiber);
            }), index.clear());
            lanes &= ~root2;
          }
      }
      function lanesToEventPriority(lanes) {
        lanes &= -lanes;
        return 0 !== DiscreteEventPriority && DiscreteEventPriority < lanes ? 0 !== ContinuousEventPriority && ContinuousEventPriority < lanes ? 0 !== (lanes & 134217727) ? DefaultEventPriority : IdleEventPriority : ContinuousEventPriority : DiscreteEventPriority;
      }
      function resolveUpdatePriority() {
        var updatePriority = ReactDOMSharedInternals.p;
        if (0 !== updatePriority)
          return updatePriority;
        updatePriority = window.event;
        return void 0 === updatePriority ? DefaultEventPriority : getEventPriority(updatePriority.type);
      }
      function runWithPriority(priority, fn) {
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          return ReactDOMSharedInternals.p = priority, fn();
        } finally {
          ReactDOMSharedInternals.p = previousPriority;
        }
      }
      function detachDeletedInstance(node) {
        delete node[internalInstanceKey];
        delete node[internalPropsKey];
        delete node[internalEventHandlersKey];
        delete node[internalEventHandlerListenersKey];
        delete node[internalEventHandlesSetKey];
      }
      function getClosestInstanceFromNode(targetNode) {
        var targetInst = targetNode[internalInstanceKey];
        if (targetInst)
          return targetInst;
        for (var parentNode = targetNode.parentNode; parentNode; ) {
          if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
            parentNode = targetInst.alternate;
            if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
              for (targetNode = getParentSuspenseInstance(targetNode); null !== targetNode; ) {
                if (parentNode = targetNode[internalInstanceKey])
                  return parentNode;
                targetNode = getParentSuspenseInstance(targetNode);
              }
            return targetInst;
          }
          targetNode = parentNode;
          parentNode = targetNode.parentNode;
        }
        return null;
      }
      function getInstanceFromNode(node) {
        if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
          var tag = node.tag;
          if (5 === tag || 6 === tag || 13 === tag || 26 === tag || 27 === tag || 3 === tag)
            return node;
        }
        return null;
      }
      function getNodeFromInstance(inst) {
        var tag = inst.tag;
        if (5 === tag || 26 === tag || 27 === tag || 6 === tag)
          return inst.stateNode;
        throw Error("getNodeFromInstance: Invalid argument.");
      }
      function getResourcesFromRoot(root2) {
        var resources = root2[internalRootNodeResourcesKey];
        resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
        return resources;
      }
      function markNodeAsHoistable(node) {
        node[internalHoistableMarker] = true;
      }
      function registerTwoPhaseEvent(registrationName, dependencies) {
        registerDirectEvent(registrationName, dependencies);
        registerDirectEvent(registrationName + "Capture", dependencies);
      }
      function registerDirectEvent(registrationName, dependencies) {
        registrationNameDependencies[registrationName] && console.error(
          "EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",
          registrationName
        );
        registrationNameDependencies[registrationName] = dependencies;
        var lowerCasedName = registrationName.toLowerCase();
        possibleRegistrationNames[lowerCasedName] = registrationName;
        "onDoubleClick" === registrationName && (possibleRegistrationNames.ondblclick = registrationName);
        for (registrationName = 0; registrationName < dependencies.length; registrationName++)
          allNativeEvents.add(dependencies[registrationName]);
      }
      function checkControlledValueProps(tagName, props) {
        hasReadOnlyValue[props.type] || props.onChange || props.onInput || props.readOnly || props.disabled || null == props.value || ("select" === tagName ? console.error(
          "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set `onChange`."
        ) : console.error(
          "You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."
        ));
        props.onChange || props.readOnly || props.disabled || null == props.checked || console.error(
          "You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`."
        );
      }
      function isAttributeNameSafe(attributeName) {
        if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
          return true;
        if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
          return false;
        if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
          return validatedAttributeNameCache[attributeName] = true;
        illegalAttributeNameCache[attributeName] = true;
        console.error("Invalid attribute name: `%s`", attributeName);
        return false;
      }
      function getValueForAttributeOnCustomComponent(node, name, expected) {
        if (isAttributeNameSafe(name)) {
          if (!node.hasAttribute(name)) {
            switch (typeof expected) {
              case "symbol":
              case "object":
                return expected;
              case "function":
                return expected;
              case "boolean":
                if (false === expected)
                  return expected;
            }
            return void 0 === expected ? void 0 : null;
          }
          node = node.getAttribute(name);
          if ("" === node && true === expected)
            return true;
          checkAttributeStringCoercion(expected, name);
          return node === "" + expected ? expected : node;
        }
      }
      function setValueForAttribute(node, name, value) {
        if (isAttributeNameSafe(name))
          if (null === value)
            node.removeAttribute(name);
          else {
            switch (typeof value) {
              case "undefined":
              case "function":
              case "symbol":
                node.removeAttribute(name);
                return;
              case "boolean":
                var prefix2 = name.toLowerCase().slice(0, 5);
                if ("data-" !== prefix2 && "aria-" !== prefix2) {
                  node.removeAttribute(name);
                  return;
                }
            }
            checkAttributeStringCoercion(value, name);
            node.setAttribute(name, "" + value);
          }
      }
      function setValueForKnownAttribute(node, name, value) {
        if (null === value)
          node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          checkAttributeStringCoercion(value, name);
          node.setAttribute(name, "" + value);
        }
      }
      function setValueForNamespacedAttribute(node, namespace, name, value) {
        if (null === value)
          node.removeAttribute(name);
        else {
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              node.removeAttribute(name);
              return;
          }
          checkAttributeStringCoercion(value, name);
          node.setAttributeNS(namespace, name, "" + value);
        }
      }
      function disabledLog() {
      }
      function disableLogs() {
        if (0 === disabledDepth) {
          prevLog = console.log;
          prevInfo = console.info;
          prevWarn = console.warn;
          prevError = console.error;
          prevGroup = console.group;
          prevGroupCollapsed = console.groupCollapsed;
          prevGroupEnd = console.groupEnd;
          var props = {
            configurable: true,
            enumerable: true,
            value: disabledLog,
            writable: true
          };
          Object.defineProperties(console, {
            info: props,
            log: props,
            warn: props,
            error: props,
            group: props,
            groupCollapsed: props,
            groupEnd: props
          });
        }
        disabledDepth++;
      }
      function reenableLogs() {
        disabledDepth--;
        if (0 === disabledDepth) {
          var props = { configurable: true, enumerable: true, writable: true };
          Object.defineProperties(console, {
            log: assign({}, props, { value: prevLog }),
            info: assign({}, props, { value: prevInfo }),
            warn: assign({}, props, { value: prevWarn }),
            error: assign({}, props, { value: prevError }),
            group: assign({}, props, { value: prevGroup }),
            groupCollapsed: assign({}, props, { value: prevGroupCollapsed }),
            groupEnd: assign({}, props, { value: prevGroupEnd })
          });
        }
        0 > disabledDepth && console.error(
          "disabledDepth fell below zero. This is a bug in React. Please file an issue."
        );
      }
      function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix)
          try {
            throw Error();
          } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
          }
        return "\n" + prefix + name + suffix;
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry)
          return "";
        var frame = componentFrameCache.get(fn);
        if (void 0 !== frame)
          return frame;
        reentry = true;
        frame = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher2 = null;
        previousDispatcher2 = ReactSharedInternals.H;
        ReactSharedInternals.H = null;
        disableLogs();
        try {
          var RunInRootFrame = {
            DetermineComponentFrameRoot: function() {
              try {
                if (construct) {
                  var Fake = function() {
                    throw Error();
                  };
                  Object.defineProperty(Fake.prototype, "props", {
                    set: function() {
                      throw Error();
                    }
                  });
                  if ("object" === typeof Reflect && Reflect.construct) {
                    try {
                      Reflect.construct(Fake, []);
                    } catch (x) {
                      var control = x;
                    }
                    Reflect.construct(fn, [], Fake);
                  } else {
                    try {
                      Fake.call();
                    } catch (x$0) {
                      control = x$0;
                    }
                    fn.call(Fake.prototype);
                  }
                } else {
                  try {
                    throw Error();
                  } catch (x$1) {
                    control = x$1;
                  }
                  (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
                  });
                }
              } catch (sample) {
                if (sample && control && "string" === typeof sample.stack)
                  return [sample.stack, control.stack];
              }
              return [null, null];
            }
          };
          RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
          var namePropDescriptor = Object.getOwnPropertyDescriptor(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name"
          );
          namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
            RunInRootFrame.DetermineComponentFrameRoot,
            "name",
            { value: "DetermineComponentFrameRoot" }
          );
          var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
          if (sampleStack && controlStack) {
            var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
            for (_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes(
              "DetermineComponentFrameRoot"
            ); )
              namePropDescriptor++;
            for (; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes(
              "DetermineComponentFrameRoot"
            ); )
              _RunInRootFrame$Deter++;
            if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length)
              for (namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]; )
                _RunInRootFrame$Deter--;
            for (; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--)
              if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                  do
                    if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                      var _frame = "\n" + sampleLines[namePropDescriptor].replace(
                        " at new ",
                        " at "
                      );
                      fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
                      "function" === typeof fn && componentFrameCache.set(fn, _frame);
                      return _frame;
                    }
                  while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter);
                }
                break;
              }
          }
        } finally {
          reentry = false, ReactSharedInternals.H = previousDispatcher2, reenableLogs(), Error.prepareStackTrace = frame;
        }
        sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
        "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
        return sampleLines;
      }
      function formatOwnerStack(error) {
        var prevPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        error = error.stack;
        Error.prepareStackTrace = prevPrepareStackTrace;
        error.startsWith("Error: react-stack-top-frame\n") && (error = error.slice(29));
        prevPrepareStackTrace = error.indexOf("\n");
        -1 !== prevPrepareStackTrace && (error = error.slice(prevPrepareStackTrace + 1));
        prevPrepareStackTrace = error.indexOf("react-stack-bottom-frame");
        -1 !== prevPrepareStackTrace && (prevPrepareStackTrace = error.lastIndexOf(
          "\n",
          prevPrepareStackTrace
        ));
        if (-1 !== prevPrepareStackTrace)
          error = error.slice(0, prevPrepareStackTrace);
        else
          return "";
        return error;
      }
      function describeFiber(fiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return describeBuiltInComponentFrame(fiber.type);
          case 16:
            return describeBuiltInComponentFrame("Lazy");
          case 13:
            return describeBuiltInComponentFrame("Suspense");
          case 19:
            return describeBuiltInComponentFrame("SuspenseList");
          case 0:
          case 15:
            return describeNativeComponentFrame(fiber.type, false);
          case 11:
            return describeNativeComponentFrame(fiber.type.render, false);
          case 1:
            return describeNativeComponentFrame(fiber.type, true);
          case 31:
            return describeBuiltInComponentFrame("Activity");
          default:
            return "";
        }
      }
      function getStackByFiberInDevAndProd(workInProgress2) {
        try {
          var info = "";
          do {
            info += describeFiber(workInProgress2);
            var debugInfo = workInProgress2._debugInfo;
            if (debugInfo)
              for (var i = debugInfo.length - 1; 0 <= i; i--) {
                var entry = debugInfo[i];
                if ("string" === typeof entry.name) {
                  var JSCompiler_temp_const = info, env = entry.env;
                  var JSCompiler_inline_result = describeBuiltInComponentFrame(
                    entry.name + (env ? " [" + env + "]" : "")
                  );
                  info = JSCompiler_temp_const + JSCompiler_inline_result;
                }
              }
            workInProgress2 = workInProgress2.return;
          } while (workInProgress2);
          return info;
        } catch (x) {
          return "\nError generating stack: " + x.message + "\n" + x.stack;
        }
      }
      function describeFunctionComponentFrameWithoutLineNumber(fn) {
        return (fn = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(fn) : "";
      }
      function getCurrentFiberOwnerNameInDevOrNull() {
        if (null === current)
          return null;
        var owner = current._debugOwner;
        return null != owner ? getComponentNameFromOwner(owner) : null;
      }
      function getCurrentFiberStackInDev() {
        if (null === current)
          return "";
        var workInProgress2 = current;
        try {
          var info = "";
          6 === workInProgress2.tag && (workInProgress2 = workInProgress2.return);
          switch (workInProgress2.tag) {
            case 26:
            case 27:
            case 5:
              info += describeBuiltInComponentFrame(workInProgress2.type);
              break;
            case 13:
              info += describeBuiltInComponentFrame("Suspense");
              break;
            case 19:
              info += describeBuiltInComponentFrame("SuspenseList");
              break;
            case 31:
              info += describeBuiltInComponentFrame("Activity");
              break;
            case 30:
            case 0:
            case 15:
            case 1:
              workInProgress2._debugOwner || "" !== info || (info += describeFunctionComponentFrameWithoutLineNumber(
                workInProgress2.type
              ));
              break;
            case 11:
              workInProgress2._debugOwner || "" !== info || (info += describeFunctionComponentFrameWithoutLineNumber(
                workInProgress2.type.render
              ));
          }
          for (; workInProgress2; )
            if ("number" === typeof workInProgress2.tag) {
              var fiber = workInProgress2;
              workInProgress2 = fiber._debugOwner;
              var debugStack = fiber._debugStack;
              workInProgress2 && debugStack && ("string" !== typeof debugStack && (fiber._debugStack = debugStack = formatOwnerStack(debugStack)), "" !== debugStack && (info += "\n" + debugStack));
            } else if (null != workInProgress2.debugStack) {
              var ownerStack = workInProgress2.debugStack;
              (workInProgress2 = workInProgress2.owner) && ownerStack && (info += "\n" + formatOwnerStack(ownerStack));
            } else
              break;
          var JSCompiler_inline_result = info;
        } catch (x) {
          JSCompiler_inline_result = "\nError generating stack: " + x.message + "\n" + x.stack;
        }
        return JSCompiler_inline_result;
      }
      function runWithFiberInDEV(fiber, callback, arg0, arg1, arg2, arg3, arg4) {
        var previousFiber = current;
        setCurrentFiber(fiber);
        try {
          return null !== fiber && fiber._debugTask ? fiber._debugTask.run(
            callback.bind(null, arg0, arg1, arg2, arg3, arg4)
          ) : callback(arg0, arg1, arg2, arg3, arg4);
        } finally {
          setCurrentFiber(previousFiber);
        }
        throw Error(
          "runWithFiberInDEV should never be called in production. This is a bug in React."
        );
      }
      function setCurrentFiber(fiber) {
        ReactSharedInternals.getCurrentStack = null === fiber ? null : getCurrentFiberStackInDev;
        isRendering = false;
        current = fiber;
      }
      function getToStringValue(value) {
        switch (typeof value) {
          case "bigint":
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return value;
          case "object":
            return checkFormFieldValueStringCoercion(value), value;
          default:
            return "";
        }
      }
      function isCheckable(elem) {
        var type = elem.type;
        return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
      }
      function trackValueOnNode(node) {
        var valueField = isCheckable(node) ? "checked" : "value", descriptor = Object.getOwnPropertyDescriptor(
          node.constructor.prototype,
          valueField
        );
        checkFormFieldValueStringCoercion(node[valueField]);
        var currentValue = "" + node[valueField];
        if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
          var get = descriptor.get, set = descriptor.set;
          Object.defineProperty(node, valueField, {
            configurable: true,
            get: function() {
              return get.call(this);
            },
            set: function(value) {
              checkFormFieldValueStringCoercion(value);
              currentValue = "" + value;
              set.call(this, value);
            }
          });
          Object.defineProperty(node, valueField, {
            enumerable: descriptor.enumerable
          });
          return {
            getValue: function() {
              return currentValue;
            },
            setValue: function(value) {
              checkFormFieldValueStringCoercion(value);
              currentValue = "" + value;
            },
            stopTracking: function() {
              node._valueTracker = null;
              delete node[valueField];
            }
          };
        }
      }
      function track(node) {
        node._valueTracker || (node._valueTracker = trackValueOnNode(node));
      }
      function updateValueIfChanged(node) {
        if (!node)
          return false;
        var tracker = node._valueTracker;
        if (!tracker)
          return true;
        var lastValue = tracker.getValue();
        var value = "";
        node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
        node = value;
        return node !== lastValue ? (tracker.setValue(node), true) : false;
      }
      function getActiveElement(doc) {
        doc = doc || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof doc)
          return null;
        try {
          return doc.activeElement || doc.body;
        } catch (e) {
          return doc.body;
        }
      }
      function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
        return value.replace(
          escapeSelectorAttributeValueInsideDoubleQuotesRegex,
          function(ch) {
            return "\\" + ch.charCodeAt(0).toString(16) + " ";
          }
        );
      }
      function validateInputProps(element, props) {
        void 0 === props.checked || void 0 === props.defaultChecked || didWarnCheckedDefaultChecked || (console.error(
          "%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        ), didWarnCheckedDefaultChecked = true);
        void 0 === props.value || void 0 === props.defaultValue || didWarnValueDefaultValue$1 || (console.error(
          "%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component",
          props.type
        ), didWarnValueDefaultValue$1 = true);
      }
      function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
        element.name = "";
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? (checkAttributeStringCoercion(type, "type"), element.type = type) : element.removeAttribute("type");
        if (null != value)
          if ("number" === type) {
            if (0 === value && "" === element.value || element.value != value)
              element.value = "" + getToStringValue(value);
          } else
            element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
        else
          "submit" !== type && "reset" !== type || element.removeAttribute("value");
        null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
        null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
        null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? (checkAttributeStringCoercion(name, "name"), element.name = "" + getToStringValue(name)) : element.removeAttribute("name");
      }
      function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
        null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (checkAttributeStringCoercion(type, "type"), element.type = type);
        if (null != value || null != defaultValue) {
          if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value))
            return;
          defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
          value = null != value ? "" + getToStringValue(value) : defaultValue;
          isHydrating2 || value === element.value || (element.value = value);
          element.defaultValue = value;
        }
        checked = null != checked ? checked : defaultChecked;
        checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
        element.checked = isHydrating2 ? element.checked : !!checked;
        element.defaultChecked = !!checked;
        null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (checkAttributeStringCoercion(name, "name"), element.name = name);
      }
      function setDefaultValue(node, type, value) {
        "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
      }
      function validateOptionProps(element, props) {
        null == props.value && ("object" === typeof props.children && null !== props.children ? React.Children.forEach(props.children, function(child) {
          null == child || "string" === typeof child || "number" === typeof child || "bigint" === typeof child || didWarnInvalidChild || (didWarnInvalidChild = true, console.error(
            "Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>."
          ));
        }) : null == props.dangerouslySetInnerHTML || didWarnInvalidInnerHTML || (didWarnInvalidInnerHTML = true, console.error(
          "Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."
        )));
        null == props.selected || didWarnSelectedSetOnOption || (console.error(
          "Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."
        ), didWarnSelectedSetOnOption = true);
      }
      function getDeclarationErrorAddendum() {
        var ownerName = getCurrentFiberOwnerNameInDevOrNull();
        return ownerName ? "\n\nCheck the render method of `" + ownerName + "`." : "";
      }
      function updateOptions(node, multiple, propValue, setDefaultSelected) {
        node = node.options;
        if (multiple) {
          multiple = {};
          for (var i = 0; i < propValue.length; i++)
            multiple["$" + propValue[i]] = true;
          for (propValue = 0; propValue < node.length; propValue++)
            i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
        } else {
          propValue = "" + getToStringValue(propValue);
          multiple = null;
          for (i = 0; i < node.length; i++) {
            if (node[i].value === propValue) {
              node[i].selected = true;
              setDefaultSelected && (node[i].defaultSelected = true);
              return;
            }
            null !== multiple || node[i].disabled || (multiple = node[i]);
          }
          null !== multiple && (multiple.selected = true);
        }
      }
      function validateSelectProps(element, props) {
        for (element = 0; element < valuePropNames.length; element++) {
          var propName = valuePropNames[element];
          if (null != props[propName]) {
            var propNameIsArray = isArrayImpl(props[propName]);
            props.multiple && !propNameIsArray ? console.error(
              "The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",
              propName,
              getDeclarationErrorAddendum()
            ) : !props.multiple && propNameIsArray && console.error(
              "The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",
              propName,
              getDeclarationErrorAddendum()
            );
          }
        }
        void 0 === props.value || void 0 === props.defaultValue || didWarnValueDefaultValue || (console.error(
          "Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://react.dev/link/controlled-components"
        ), didWarnValueDefaultValue = true);
      }
      function validateTextareaProps(element, props) {
        void 0 === props.value || void 0 === props.defaultValue || didWarnValDefaultVal || (console.error(
          "%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://react.dev/link/controlled-components",
          getCurrentFiberOwnerNameInDevOrNull() || "A component"
        ), didWarnValDefaultVal = true);
        null != props.children && null == props.value && console.error(
          "Use the `defaultValue` or `value` props instead of setting children on <textarea>."
        );
      }
      function updateTextarea(element, value, defaultValue) {
        if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
          element.defaultValue !== value && (element.defaultValue = value);
          return;
        }
        element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
      }
      function initTextarea(element, value, defaultValue, children) {
        if (null == value) {
          if (null != children) {
            if (null != defaultValue)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(children)) {
              if (1 < children.length)
                throw Error("<textarea> can only have at most one child.");
              children = children[0];
            }
            defaultValue = children;
          }
          null == defaultValue && (defaultValue = "");
          value = defaultValue;
        }
        defaultValue = getToStringValue(value);
        element.defaultValue = defaultValue;
        children = element.textContent;
        children === defaultValue && "" !== children && null !== children && (element.value = children);
      }
      function findNotableNode(node, indent) {
        return void 0 === node.serverProps && 0 === node.serverTail.length && 1 === node.children.length && 3 < node.distanceFromLeaf && node.distanceFromLeaf > 15 - indent ? findNotableNode(node.children[0], indent) : node;
      }
      function indentation(indent) {
        return "  " + "  ".repeat(indent);
      }
      function added(indent) {
        return "+ " + "  ".repeat(indent);
      }
      function removed(indent) {
        return "- " + "  ".repeat(indent);
      }
      function describeFiberType(fiber) {
        switch (fiber.tag) {
          case 26:
          case 27:
          case 5:
            return fiber.type;
          case 16:
            return "Lazy";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 0:
          case 15:
            return fiber = fiber.type, fiber.displayName || fiber.name || null;
          case 11:
            return fiber = fiber.type.render, fiber.displayName || fiber.name || null;
          case 1:
            return fiber = fiber.type, fiber.displayName || fiber.name || null;
          default:
            return null;
        }
      }
      function describeTextNode(content, maxLength) {
        return needsEscaping.test(content) ? (content = JSON.stringify(content), content.length > maxLength - 2 ? 8 > maxLength ? '{"..."}' : "{" + content.slice(0, maxLength - 7) + '..."}' : "{" + content + "}") : content.length > maxLength ? 5 > maxLength ? '{"..."}' : content.slice(0, maxLength - 3) + "..." : content;
      }
      function describeTextDiff(clientText, serverProps, indent) {
        var maxLength = 120 - 2 * indent;
        if (null === serverProps)
          return added(indent) + describeTextNode(clientText, maxLength) + "\n";
        if ("string" === typeof serverProps) {
          for (var firstDiff = 0; firstDiff < serverProps.length && firstDiff < clientText.length && serverProps.charCodeAt(firstDiff) === clientText.charCodeAt(firstDiff); firstDiff++)
            ;
          firstDiff > maxLength - 8 && 10 < firstDiff && (clientText = "..." + clientText.slice(firstDiff - 8), serverProps = "..." + serverProps.slice(firstDiff - 8));
          return added(indent) + describeTextNode(clientText, maxLength) + "\n" + removed(indent) + describeTextNode(serverProps, maxLength) + "\n";
        }
        return indentation(indent) + describeTextNode(clientText, maxLength) + "\n";
      }
      function objectName(object) {
        return Object.prototype.toString.call(object).replace(/^\[object (.*)\]$/, function(m, p0) {
          return p0;
        });
      }
      function describeValue(value, maxLength) {
        switch (typeof value) {
          case "string":
            return value = JSON.stringify(value), value.length > maxLength ? 5 > maxLength ? '"..."' : value.slice(0, maxLength - 4) + '..."' : value;
          case "object":
            if (null === value)
              return "null";
            if (isArrayImpl(value))
              return "[...]";
            if (value.$$typeof === REACT_ELEMENT_TYPE)
              return (maxLength = getComponentNameFromType(value.type)) ? "<" + maxLength + ">" : "<...>";
            var name = objectName(value);
            if ("Object" === name) {
              name = "";
              maxLength -= 2;
              for (var propName in value)
                if (value.hasOwnProperty(propName)) {
                  var jsonPropName = JSON.stringify(propName);
                  jsonPropName !== '"' + propName + '"' && (propName = jsonPropName);
                  maxLength -= propName.length - 2;
                  jsonPropName = describeValue(
                    value[propName],
                    15 > maxLength ? maxLength : 15
                  );
                  maxLength -= jsonPropName.length;
                  if (0 > maxLength) {
                    name += "" === name ? "..." : ", ...";
                    break;
                  }
                  name += ("" === name ? "" : ",") + propName + ":" + jsonPropName;
                }
              return "{" + name + "}";
            }
            return name;
          case "function":
            return (maxLength = value.displayName || value.name) ? "function " + maxLength : "function";
          default:
            return String(value);
        }
      }
      function describePropValue(value, maxLength) {
        return "string" !== typeof value || needsEscaping.test(value) ? "{" + describeValue(value, maxLength - 2) + "}" : value.length > maxLength - 2 ? 5 > maxLength ? '"..."' : '"' + value.slice(0, maxLength - 5) + '..."' : '"' + value + '"';
      }
      function describeExpandedElement(type, props, rowPrefix) {
        var remainingRowLength = 120 - rowPrefix.length - type.length, properties = [], propName;
        for (propName in props)
          if (props.hasOwnProperty(propName) && "children" !== propName) {
            var propValue = describePropValue(
              props[propName],
              120 - rowPrefix.length - propName.length - 1
            );
            remainingRowLength -= propName.length + propValue.length + 2;
            properties.push(propName + "=" + propValue);
          }
        return 0 === properties.length ? rowPrefix + "<" + type + ">\n" : 0 < remainingRowLength ? rowPrefix + "<" + type + " " + properties.join(" ") + ">\n" : rowPrefix + "<" + type + "\n" + rowPrefix + "  " + properties.join("\n" + rowPrefix + "  ") + "\n" + rowPrefix + ">\n";
      }
      function describePropertiesDiff(clientObject, serverObject, indent) {
        var properties = "", remainingServerProperties = assign({}, serverObject), propName;
        for (propName in clientObject)
          if (clientObject.hasOwnProperty(propName)) {
            delete remainingServerProperties[propName];
            var maxLength = 120 - 2 * indent - propName.length - 2, clientPropValue = describeValue(clientObject[propName], maxLength);
            serverObject.hasOwnProperty(propName) ? (maxLength = describeValue(serverObject[propName], maxLength), properties += added(indent) + propName + ": " + clientPropValue + "\n", properties += removed(indent) + propName + ": " + maxLength + "\n") : properties += added(indent) + propName + ": " + clientPropValue + "\n";
          }
        for (var _propName in remainingServerProperties)
          remainingServerProperties.hasOwnProperty(_propName) && (clientObject = describeValue(
            remainingServerProperties[_propName],
            120 - 2 * indent - _propName.length - 2
          ), properties += removed(indent) + _propName + ": " + clientObject + "\n");
        return properties;
      }
      function describeElementDiff(type, clientProps, serverProps, indent) {
        var content = "", serverPropNames = /* @__PURE__ */ new Map();
        for (propName$jscomp$0 in serverProps)
          serverProps.hasOwnProperty(propName$jscomp$0) && serverPropNames.set(
            propName$jscomp$0.toLowerCase(),
            propName$jscomp$0
          );
        if (1 === serverPropNames.size && serverPropNames.has("children"))
          content += describeExpandedElement(
            type,
            clientProps,
            indentation(indent)
          );
        else {
          for (var _propName2 in clientProps)
            if (clientProps.hasOwnProperty(_propName2) && "children" !== _propName2) {
              var maxLength$jscomp$0 = 120 - 2 * (indent + 1) - _propName2.length - 1, serverPropName = serverPropNames.get(_propName2.toLowerCase());
              if (void 0 !== serverPropName) {
                serverPropNames.delete(_propName2.toLowerCase());
                var propName$jscomp$0 = clientProps[_propName2];
                serverPropName = serverProps[serverPropName];
                var clientPropValue = describePropValue(
                  propName$jscomp$0,
                  maxLength$jscomp$0
                );
                maxLength$jscomp$0 = describePropValue(
                  serverPropName,
                  maxLength$jscomp$0
                );
                "object" === typeof propName$jscomp$0 && null !== propName$jscomp$0 && "object" === typeof serverPropName && null !== serverPropName && "Object" === objectName(propName$jscomp$0) && "Object" === objectName(serverPropName) && (2 < Object.keys(propName$jscomp$0).length || 2 < Object.keys(serverPropName).length || -1 < clientPropValue.indexOf("...") || -1 < maxLength$jscomp$0.indexOf("...")) ? content += indentation(indent + 1) + _propName2 + "={{\n" + describePropertiesDiff(
                  propName$jscomp$0,
                  serverPropName,
                  indent + 2
                ) + indentation(indent + 1) + "}}\n" : (content += added(indent + 1) + _propName2 + "=" + clientPropValue + "\n", content += removed(indent + 1) + _propName2 + "=" + maxLength$jscomp$0 + "\n");
              } else
                content += indentation(indent + 1) + _propName2 + "=" + describePropValue(clientProps[_propName2], maxLength$jscomp$0) + "\n";
            }
          serverPropNames.forEach(function(propName) {
            if ("children" !== propName) {
              var maxLength = 120 - 2 * (indent + 1) - propName.length - 1;
              content += removed(indent + 1) + propName + "=" + describePropValue(serverProps[propName], maxLength) + "\n";
            }
          });
          content = "" === content ? indentation(indent) + "<" + type + ">\n" : indentation(indent) + "<" + type + "\n" + content + indentation(indent) + ">\n";
        }
        type = serverProps.children;
        clientProps = clientProps.children;
        if ("string" === typeof type || "number" === typeof type || "bigint" === typeof type) {
          serverPropNames = "";
          if ("string" === typeof clientProps || "number" === typeof clientProps || "bigint" === typeof clientProps)
            serverPropNames = "" + clientProps;
          content += describeTextDiff(serverPropNames, "" + type, indent + 1);
        } else if ("string" === typeof clientProps || "number" === typeof clientProps || "bigint" === typeof clientProps)
          content = null == type ? content + describeTextDiff("" + clientProps, null, indent + 1) : content + describeTextDiff("" + clientProps, void 0, indent + 1);
        return content;
      }
      function describeSiblingFiber(fiber, indent) {
        var type = describeFiberType(fiber);
        if (null === type) {
          type = "";
          for (fiber = fiber.child; fiber; )
            type += describeSiblingFiber(fiber, indent), fiber = fiber.sibling;
          return type;
        }
        return indentation(indent) + "<" + type + ">\n";
      }
      function describeNode(node, indent) {
        var skipToNode = findNotableNode(node, indent);
        if (skipToNode !== node && (1 !== node.children.length || node.children[0] !== skipToNode))
          return indentation(indent) + "...\n" + describeNode(skipToNode, indent + 1);
        skipToNode = "";
        var debugInfo = node.fiber._debugInfo;
        if (debugInfo)
          for (var i = 0; i < debugInfo.length; i++) {
            var serverComponentName = debugInfo[i].name;
            "string" === typeof serverComponentName && (skipToNode += indentation(indent) + "<" + serverComponentName + ">\n", indent++);
          }
        debugInfo = "";
        i = node.fiber.pendingProps;
        if (6 === node.fiber.tag)
          debugInfo = describeTextDiff(i, node.serverProps, indent), indent++;
        else if (serverComponentName = describeFiberType(node.fiber), null !== serverComponentName)
          if (void 0 === node.serverProps) {
            debugInfo = indent;
            var maxLength = 120 - 2 * debugInfo - serverComponentName.length - 2, content = "";
            for (propName in i)
              if (i.hasOwnProperty(propName) && "children" !== propName) {
                var propValue = describePropValue(i[propName], 15);
                maxLength -= propName.length + propValue.length + 2;
                if (0 > maxLength) {
                  content += " ...";
                  break;
                }
                content += " " + propName + "=" + propValue;
              }
            debugInfo = indentation(debugInfo) + "<" + serverComponentName + content + ">\n";
            indent++;
          } else
            null === node.serverProps ? (debugInfo = describeExpandedElement(
              serverComponentName,
              i,
              added(indent)
            ), indent++) : "string" === typeof node.serverProps ? console.error(
              "Should not have matched a non HostText fiber to a Text node. This is a bug in React."
            ) : (debugInfo = describeElementDiff(
              serverComponentName,
              i,
              node.serverProps,
              indent
            ), indent++);
        var propName = "";
        i = node.fiber.child;
        for (serverComponentName = 0; i && serverComponentName < node.children.length; )
          maxLength = node.children[serverComponentName], maxLength.fiber === i ? (propName += describeNode(maxLength, indent), serverComponentName++) : propName += describeSiblingFiber(i, indent), i = i.sibling;
        i && 0 < node.children.length && (propName += indentation(indent) + "...\n");
        i = node.serverTail;
        null === node.serverProps && indent--;
        for (node = 0; node < i.length; node++)
          serverComponentName = i[node], propName = "string" === typeof serverComponentName ? propName + (removed(indent) + describeTextNode(serverComponentName, 120 - 2 * indent) + "\n") : propName + describeExpandedElement(
            serverComponentName.type,
            serverComponentName.props,
            removed(indent)
          );
        return skipToNode + debugInfo + propName;
      }
      function describeDiff(rootNode) {
        try {
          return "\n\n" + describeNode(rootNode, 0);
        } catch (x) {
          return "";
        }
      }
      function describeAncestors(ancestor, child, props) {
        for (var fiber = child, node = null, distanceFromLeaf = 0; fiber; )
          fiber === ancestor && (distanceFromLeaf = 0), node = {
            fiber,
            children: null !== node ? [node] : [],
            serverProps: fiber === child ? props : fiber === ancestor ? null : void 0,
            serverTail: [],
            distanceFromLeaf
          }, distanceFromLeaf++, fiber = fiber.return;
        return null !== node ? describeDiff(node).replaceAll(/^[+-]/gm, ">") : "";
      }
      function updatedAncestorInfoDev(oldInfo, tag) {
        var ancestorInfo = assign({}, oldInfo || emptyAncestorInfoDev), info = { tag };
        -1 !== inScopeTags.indexOf(tag) && (ancestorInfo.aTagInScope = null, ancestorInfo.buttonTagInScope = null, ancestorInfo.nobrTagInScope = null);
        -1 !== buttonScopeTags.indexOf(tag) && (ancestorInfo.pTagInButtonScope = null);
        -1 !== specialTags.indexOf(tag) && "address" !== tag && "div" !== tag && "p" !== tag && (ancestorInfo.listItemTagAutoclosing = null, ancestorInfo.dlItemTagAutoclosing = null);
        ancestorInfo.current = info;
        "form" === tag && (ancestorInfo.formTag = info);
        "a" === tag && (ancestorInfo.aTagInScope = info);
        "button" === tag && (ancestorInfo.buttonTagInScope = info);
        "nobr" === tag && (ancestorInfo.nobrTagInScope = info);
        "p" === tag && (ancestorInfo.pTagInButtonScope = info);
        "li" === tag && (ancestorInfo.listItemTagAutoclosing = info);
        if ("dd" === tag || "dt" === tag)
          ancestorInfo.dlItemTagAutoclosing = info;
        "#document" === tag || "html" === tag ? ancestorInfo.containerTagInScope = null : ancestorInfo.containerTagInScope || (ancestorInfo.containerTagInScope = info);
        null !== oldInfo || "#document" !== tag && "html" !== tag && "body" !== tag ? true === ancestorInfo.implicitRootScope && (ancestorInfo.implicitRootScope = false) : ancestorInfo.implicitRootScope = true;
        return ancestorInfo;
      }
      function isTagValidWithParent(tag, parentTag, implicitRootScope) {
        switch (parentTag) {
          case "select":
            return "hr" === tag || "option" === tag || "optgroup" === tag || "script" === tag || "template" === tag || "#text" === tag;
          case "optgroup":
            return "option" === tag || "#text" === tag;
          case "option":
            return "#text" === tag;
          case "tr":
            return "th" === tag || "td" === tag || "style" === tag || "script" === tag || "template" === tag;
          case "tbody":
          case "thead":
          case "tfoot":
            return "tr" === tag || "style" === tag || "script" === tag || "template" === tag;
          case "colgroup":
            return "col" === tag || "template" === tag;
          case "table":
            return "caption" === tag || "colgroup" === tag || "tbody" === tag || "tfoot" === tag || "thead" === tag || "style" === tag || "script" === tag || "template" === tag;
          case "head":
            return "base" === tag || "basefont" === tag || "bgsound" === tag || "link" === tag || "meta" === tag || "title" === tag || "noscript" === tag || "noframes" === tag || "style" === tag || "script" === tag || "template" === tag;
          case "html":
            if (implicitRootScope)
              break;
            return "head" === tag || "body" === tag || "frameset" === tag;
          case "frameset":
            return "frame" === tag;
          case "#document":
            if (!implicitRootScope)
              return "html" === tag;
        }
        switch (tag) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return "h1" !== parentTag && "h2" !== parentTag && "h3" !== parentTag && "h4" !== parentTag && "h5" !== parentTag && "h6" !== parentTag;
          case "rp":
          case "rt":
            return -1 === impliedEndTags.indexOf(parentTag);
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return null == parentTag;
          case "head":
            return implicitRootScope || null === parentTag;
          case "html":
            return implicitRootScope && "#document" === parentTag || null === parentTag;
          case "body":
            return implicitRootScope && ("#document" === parentTag || "html" === parentTag) || null === parentTag;
        }
        return true;
      }
      function findInvalidAncestorForTag(tag, ancestorInfo) {
        switch (tag) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return ancestorInfo.pTagInButtonScope;
          case "form":
            return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;
          case "li":
            return ancestorInfo.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return ancestorInfo.dlItemTagAutoclosing;
          case "button":
            return ancestorInfo.buttonTagInScope;
          case "a":
            return ancestorInfo.aTagInScope;
          case "nobr":
            return ancestorInfo.nobrTagInScope;
        }
        return null;
      }
      function findAncestor(parent, tagName) {
        for (; parent; ) {
          switch (parent.tag) {
            case 5:
            case 26:
            case 27:
              if (parent.type === tagName)
                return parent;
          }
          parent = parent.return;
        }
        return null;
      }
      function validateDOMNesting(childTag, ancestorInfo) {
        ancestorInfo = ancestorInfo || emptyAncestorInfoDev;
        var parentInfo = ancestorInfo.current;
        ancestorInfo = (parentInfo = isTagValidWithParent(
          childTag,
          parentInfo && parentInfo.tag,
          ancestorInfo.implicitRootScope
        ) ? null : parentInfo) ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
        ancestorInfo = parentInfo || ancestorInfo;
        if (!ancestorInfo)
          return true;
        var ancestorTag = ancestorInfo.tag;
        ancestorInfo = String(!!parentInfo) + "|" + childTag + "|" + ancestorTag;
        if (didWarn[ancestorInfo])
          return false;
        didWarn[ancestorInfo] = true;
        var ancestor = (ancestorInfo = current) ? findAncestor(ancestorInfo.return, ancestorTag) : null, ancestorDescription = null !== ancestorInfo && null !== ancestor ? describeAncestors(ancestor, ancestorInfo, null) : "", tagDisplayName = "<" + childTag + ">";
        parentInfo ? (parentInfo = "", "table" === ancestorTag && "tr" === childTag && (parentInfo += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), console.error(
          "In HTML, %s cannot be a child of <%s>.%s\nThis will cause a hydration error.%s",
          tagDisplayName,
          ancestorTag,
          parentInfo,
          ancestorDescription
        )) : console.error(
          "In HTML, %s cannot be a descendant of <%s>.\nThis will cause a hydration error.%s",
          tagDisplayName,
          ancestorTag,
          ancestorDescription
        );
        ancestorInfo && (childTag = ancestorInfo.return, null === ancestor || null === childTag || ancestor === childTag && childTag._debugOwner === ancestorInfo._debugOwner || runWithFiberInDEV(ancestor, function() {
          console.error(
            "<%s> cannot contain a nested %s.\nSee this log for the ancestor stack trace.",
            ancestorTag,
            tagDisplayName
          );
        }));
        return false;
      }
      function validateTextNesting(childText, parentTag, implicitRootScope) {
        if (implicitRootScope || isTagValidWithParent("#text", parentTag, false))
          return true;
        implicitRootScope = "#text|" + parentTag;
        if (didWarn[implicitRootScope])
          return false;
        didWarn[implicitRootScope] = true;
        var ancestor = (implicitRootScope = current) ? findAncestor(implicitRootScope, parentTag) : null;
        implicitRootScope = null !== implicitRootScope && null !== ancestor ? describeAncestors(
          ancestor,
          implicitRootScope,
          6 !== implicitRootScope.tag ? { children: null } : null
        ) : "";
        /\S/.test(childText) ? console.error(
          "In HTML, text nodes cannot be a child of <%s>.\nThis will cause a hydration error.%s",
          parentTag,
          implicitRootScope
        ) : console.error(
          "In HTML, whitespace text nodes cannot be a child of <%s>. Make sure you don't have any extra whitespace between tags on each line of your source code.\nThis will cause a hydration error.%s",
          parentTag,
          implicitRootScope
        );
        return false;
      }
      function setTextContent(node, text) {
        if (text) {
          var firstChild = node.firstChild;
          if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
            firstChild.nodeValue = text;
            return;
          }
        }
        node.textContent = text;
      }
      function camelize(string) {
        return string.replace(hyphenPattern, function(_, character) {
          return character.toUpperCase();
        });
      }
      function setValueForStyle(style2, styleName, value) {
        var isCustomProperty = 0 === styleName.indexOf("--");
        isCustomProperty || (-1 < styleName.indexOf("-") ? warnedStyleNames.hasOwnProperty(styleName) && warnedStyleNames[styleName] || (warnedStyleNames[styleName] = true, console.error(
          "Unsupported style property %s. Did you mean %s?",
          styleName,
          camelize(styleName.replace(msPattern, "ms-"))
        )) : badVendoredStyleNamePattern.test(styleName) ? warnedStyleNames.hasOwnProperty(styleName) && warnedStyleNames[styleName] || (warnedStyleNames[styleName] = true, console.error(
          "Unsupported vendor-prefixed style property %s. Did you mean %s?",
          styleName,
          styleName.charAt(0).toUpperCase() + styleName.slice(1)
        )) : !badStyleValueWithSemicolonPattern.test(value) || warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value] || (warnedStyleValues[value] = true, console.error(
          `Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`,
          styleName,
          value.replace(badStyleValueWithSemicolonPattern, "")
        )), "number" === typeof value && (isNaN(value) ? warnedForNaNValue || (warnedForNaNValue = true, console.error(
          "`NaN` is an invalid value for the `%s` css style property.",
          styleName
        )) : isFinite(value) || warnedForInfinityValue || (warnedForInfinityValue = true, console.error(
          "`Infinity` is an invalid value for the `%s` css style property.",
          styleName
        ))));
        null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : (checkCSSPropertyStringCoercion(value, styleName), style2[styleName] = ("" + value).trim()) : style2[styleName] = value + "px";
      }
      function setValueForStyles(node, styles, prevStyles) {
        if (null != styles && "object" !== typeof styles)
          throw Error(
            "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
          );
        styles && Object.freeze(styles);
        node = node.style;
        if (null != prevStyles) {
          if (styles) {
            var expandedUpdates = {};
            if (prevStyles) {
              for (var key in prevStyles)
                if (prevStyles.hasOwnProperty(key) && !styles.hasOwnProperty(key))
                  for (var longhands = shorthandToLonghand[key] || [key], i = 0; i < longhands.length; i++)
                    expandedUpdates[longhands[i]] = key;
            }
            for (var _key in styles)
              if (styles.hasOwnProperty(_key) && (!prevStyles || prevStyles[_key] !== styles[_key]))
                for (key = shorthandToLonghand[_key] || [_key], longhands = 0; longhands < key.length; longhands++)
                  expandedUpdates[key[longhands]] = _key;
            _key = {};
            for (var key$jscomp$0 in styles)
              for (key = shorthandToLonghand[key$jscomp$0] || [key$jscomp$0], longhands = 0; longhands < key.length; longhands++)
                _key[key[longhands]] = key$jscomp$0;
            key$jscomp$0 = {};
            for (var _key2 in expandedUpdates)
              if (key = expandedUpdates[_key2], (longhands = _key[_key2]) && key !== longhands && (i = key + "," + longhands, !key$jscomp$0[i])) {
                key$jscomp$0[i] = true;
                i = console;
                var value = styles[key];
                i.error.call(
                  i,
                  "%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",
                  null == value || "boolean" === typeof value || "" === value ? "Removing" : "Updating",
                  key,
                  longhands
                );
              }
          }
          for (var styleName in prevStyles)
            !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
          for (var _styleName in styles)
            _key2 = styles[_styleName], styles.hasOwnProperty(_styleName) && prevStyles[_styleName] !== _key2 && setValueForStyle(node, _styleName, _key2);
        } else
          for (expandedUpdates in styles)
            styles.hasOwnProperty(expandedUpdates) && setValueForStyle(node, expandedUpdates, styles[expandedUpdates]);
      }
      function isCustomElement(tagName) {
        if (-1 === tagName.indexOf("-"))
          return false;
        switch (tagName) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      function getAttributeAlias(name) {
        return aliases.get(name) || name;
      }
      function validateProperty$1(tagName, name) {
        if (hasOwnProperty.call(warnedProperties$1, name) && warnedProperties$1[name])
          return true;
        if (rARIACamel$1.test(name)) {
          tagName = "aria-" + name.slice(4).toLowerCase();
          tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
          if (null == tagName)
            return console.error(
              "Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",
              name
            ), warnedProperties$1[name] = true;
          if (name !== tagName)
            return console.error(
              "Invalid ARIA attribute `%s`. Did you mean `%s`?",
              name,
              tagName
            ), warnedProperties$1[name] = true;
        }
        if (rARIA$1.test(name)) {
          tagName = name.toLowerCase();
          tagName = ariaProperties.hasOwnProperty(tagName) ? tagName : null;
          if (null == tagName)
            return warnedProperties$1[name] = true, false;
          name !== tagName && (console.error(
            "Unknown ARIA attribute `%s`. Did you mean `%s`?",
            name,
            tagName
          ), warnedProperties$1[name] = true);
        }
        return true;
      }
      function validateProperties$2(type, props) {
        var invalidProps = [], key;
        for (key in props)
          validateProperty$1(type, key) || invalidProps.push(key);
        props = invalidProps.map(function(prop) {
          return "`" + prop + "`";
        }).join(", ");
        1 === invalidProps.length ? console.error(
          "Invalid aria prop %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
          props,
          type
        ) : 1 < invalidProps.length && console.error(
          "Invalid aria props %s on <%s> tag. For details, see https://react.dev/link/invalid-aria-props",
          props,
          type
        );
      }
      function validateProperty(tagName, name, value, eventRegistry) {
        if (hasOwnProperty.call(warnedProperties, name) && warnedProperties[name])
          return true;
        var lowerCasedName = name.toLowerCase();
        if ("onfocusin" === lowerCasedName || "onfocusout" === lowerCasedName)
          return console.error(
            "React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."
          ), warnedProperties[name] = true;
        if ("function" === typeof value && ("form" === tagName && "action" === name || "input" === tagName && "formAction" === name || "button" === tagName && "formAction" === name))
          return true;
        if (null != eventRegistry) {
          tagName = eventRegistry.possibleRegistrationNames;
          if (eventRegistry.registrationNameDependencies.hasOwnProperty(name))
            return true;
          eventRegistry = tagName.hasOwnProperty(lowerCasedName) ? tagName[lowerCasedName] : null;
          if (null != eventRegistry)
            return console.error(
              "Invalid event handler property `%s`. Did you mean `%s`?",
              name,
              eventRegistry
            ), warnedProperties[name] = true;
          if (EVENT_NAME_REGEX.test(name))
            return console.error(
              "Unknown event handler property `%s`. It will be ignored.",
              name
            ), warnedProperties[name] = true;
        } else if (EVENT_NAME_REGEX.test(name))
          return INVALID_EVENT_NAME_REGEX.test(name) && console.error(
            "Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",
            name
          ), warnedProperties[name] = true;
        if (rARIA.test(name) || rARIACamel.test(name))
          return true;
        if ("innerhtml" === lowerCasedName)
          return console.error(
            "Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."
          ), warnedProperties[name] = true;
        if ("aria" === lowerCasedName)
          return console.error(
            "The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."
          ), warnedProperties[name] = true;
        if ("is" === lowerCasedName && null !== value && void 0 !== value && "string" !== typeof value)
          return console.error(
            "Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",
            typeof value
          ), warnedProperties[name] = true;
        if ("number" === typeof value && isNaN(value))
          return console.error(
            "Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",
            name
          ), warnedProperties[name] = true;
        if (possibleStandardNames.hasOwnProperty(lowerCasedName)) {
          if (lowerCasedName = possibleStandardNames[lowerCasedName], lowerCasedName !== name)
            return console.error(
              "Invalid DOM property `%s`. Did you mean `%s`?",
              name,
              lowerCasedName
            ), warnedProperties[name] = true;
        } else if (name !== lowerCasedName)
          return console.error(
            "React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",
            name,
            lowerCasedName
          ), warnedProperties[name] = true;
        switch (name) {
          case "dangerouslySetInnerHTML":
          case "children":
          case "style":
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            return true;
          case "innerText":
          case "textContent":
            return true;
        }
        switch (typeof value) {
          case "boolean":
            switch (name) {
              case "autoFocus":
              case "checked":
              case "multiple":
              case "muted":
              case "selected":
              case "contentEditable":
              case "spellCheck":
              case "draggable":
              case "value":
              case "autoReverse":
              case "externalResourcesRequired":
              case "focusable":
              case "preserveAlpha":
              case "allowFullScreen":
              case "async":
              case "autoPlay":
              case "controls":
              case "default":
              case "defer":
              case "disabled":
              case "disablePictureInPicture":
              case "disableRemotePlayback":
              case "formNoValidate":
              case "hidden":
              case "loop":
              case "noModule":
              case "noValidate":
              case "open":
              case "playsInline":
              case "readOnly":
              case "required":
              case "reversed":
              case "scoped":
              case "seamless":
              case "itemScope":
              case "capture":
              case "download":
              case "inert":
                return true;
              default:
                lowerCasedName = name.toLowerCase().slice(0, 5);
                if ("data-" === lowerCasedName || "aria-" === lowerCasedName)
                  return true;
                value ? console.error(
                  'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',
                  value,
                  name,
                  name,
                  value,
                  name
                ) : console.error(
                  'Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',
                  value,
                  name,
                  name,
                  value,
                  name,
                  name,
                  name
                );
                return warnedProperties[name] = true;
            }
          case "function":
          case "symbol":
            return warnedProperties[name] = true, false;
          case "string":
            if ("false" === value || "true" === value) {
              switch (name) {
                case "checked":
                case "selected":
                case "multiple":
                case "muted":
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                case "inert":
                  break;
                default:
                  return true;
              }
              console.error(
                "Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",
                value,
                name,
                "false" === value ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".',
                name,
                value
              );
              warnedProperties[name] = true;
            }
        }
        return true;
      }
      function warnUnknownProperties(type, props, eventRegistry) {
        var unknownProps = [], key;
        for (key in props)
          validateProperty(type, key, props[key], eventRegistry) || unknownProps.push(key);
        props = unknownProps.map(function(prop) {
          return "`" + prop + "`";
        }).join(", ");
        1 === unknownProps.length ? console.error(
          "Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://react.dev/link/attribute-behavior ",
          props,
          type
        ) : 1 < unknownProps.length && console.error(
          "Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://react.dev/link/attribute-behavior ",
          props,
          type
        );
      }
      function sanitizeURL(url) {
        return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
      }
      function getEventTarget(nativeEvent) {
        nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
        nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
        return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
      }
      function restoreStateOfTarget(target) {
        var internalInstance = getInstanceFromNode(target);
        if (internalInstance && (target = internalInstance.stateNode)) {
          var props = target[internalPropsKey] || null;
          a:
            switch (target = internalInstance.stateNode, internalInstance.type) {
              case "input":
                updateInput(
                  target,
                  props.value,
                  props.defaultValue,
                  props.defaultValue,
                  props.checked,
                  props.defaultChecked,
                  props.type,
                  props.name
                );
                internalInstance = props.name;
                if ("radio" === props.type && null != internalInstance) {
                  for (props = target; props.parentNode; )
                    props = props.parentNode;
                  checkAttributeStringCoercion(internalInstance, "name");
                  props = props.querySelectorAll(
                    'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
                      "" + internalInstance
                    ) + '"][type="radio"]'
                  );
                  for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
                    var otherNode = props[internalInstance];
                    if (otherNode !== target && otherNode.form === target.form) {
                      var otherProps = otherNode[internalPropsKey] || null;
                      if (!otherProps)
                        throw Error(
                          "ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported."
                        );
                      updateInput(
                        otherNode,
                        otherProps.value,
                        otherProps.defaultValue,
                        otherProps.defaultValue,
                        otherProps.checked,
                        otherProps.defaultChecked,
                        otherProps.type,
                        otherProps.name
                      );
                    }
                  }
                  for (internalInstance = 0; internalInstance < props.length; internalInstance++)
                    otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
                }
                break a;
              case "textarea":
                updateTextarea(target, props.value, props.defaultValue);
                break a;
              case "select":
                internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
            }
        }
      }
      function batchedUpdates$1(fn, a, b) {
        if (isInsideEventHandler)
          return fn(a, b);
        isInsideEventHandler = true;
        try {
          var JSCompiler_inline_result = fn(a);
          return JSCompiler_inline_result;
        } finally {
          if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
            if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
              for (a = 0; a < fn.length; a++)
                restoreStateOfTarget(fn[a]);
          }
        }
      }
      function getListener(inst, registrationName) {
        var stateNode = inst.stateNode;
        if (null === stateNode)
          return null;
        var props = stateNode[internalPropsKey] || null;
        if (null === props)
          return null;
        stateNode = props[registrationName];
        a:
          switch (registrationName) {
            case "onClick":
            case "onClickCapture":
            case "onDoubleClick":
            case "onDoubleClickCapture":
            case "onMouseDown":
            case "onMouseDownCapture":
            case "onMouseMove":
            case "onMouseMoveCapture":
            case "onMouseUp":
            case "onMouseUpCapture":
            case "onMouseEnter":
              (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
              inst = !props;
              break a;
            default:
              inst = false;
          }
        if (inst)
          return null;
        if (stateNode && "function" !== typeof stateNode)
          throw Error(
            "Expected `" + registrationName + "` listener to be a function, instead got a value of `" + typeof stateNode + "` type."
          );
        return stateNode;
      }
      function getData() {
        if (fallbackText)
          return fallbackText;
        var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
        for (start = 0; start < startLength && startValue[start] === endValue[start]; start++)
          ;
        var minEnd = startLength - start;
        for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++)
          ;
        return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
      }
      function getEventCharCode(nativeEvent) {
        var keyCode = nativeEvent.keyCode;
        "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
        10 === nativeEvent && (nativeEvent = 13);
        return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
      }
      function functionThatReturnsTrue() {
        return true;
      }
      function functionThatReturnsFalse() {
        return false;
      }
      function createSyntheticEvent(Interface) {
        function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
          this._reactName = reactName;
          this._targetInst = targetInst;
          this.type = reactEventType;
          this.nativeEvent = nativeEvent;
          this.target = nativeEventTarget;
          this.currentTarget = null;
          for (var propName in Interface)
            Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
          this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
          this.isPropagationStopped = functionThatReturnsFalse;
          return this;
        }
        assign(SyntheticBaseEvent.prototype, {
          preventDefault: function() {
            this.defaultPrevented = true;
            var event = this.nativeEvent;
            event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
          },
          stopPropagation: function() {
            var event = this.nativeEvent;
            event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
          },
          persist: function() {
          },
          isPersistent: functionThatReturnsTrue
        });
        return SyntheticBaseEvent;
      }
      function modifierStateGetter(keyArg) {
        var nativeEvent = this.nativeEvent;
        return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
      }
      function getEventModifierState() {
        return modifierStateGetter;
      }
      function isFallbackCompositionEnd(domEventName, nativeEvent) {
        switch (domEventName) {
          case "keyup":
            return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
          case "keydown":
            return nativeEvent.keyCode !== START_KEYCODE;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function getDataFromCustomEvent(nativeEvent) {
        nativeEvent = nativeEvent.detail;
        return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
      }
      function getNativeBeforeInputChars(domEventName, nativeEvent) {
        switch (domEventName) {
          case "compositionend":
            return getDataFromCustomEvent(nativeEvent);
          case "keypress":
            if (nativeEvent.which !== SPACEBAR_CODE)
              return null;
            hasSpaceKeypress = true;
            return SPACEBAR_CHAR;
          case "textInput":
            return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
          default:
            return null;
        }
      }
      function getFallbackBeforeInputChars(domEventName, nativeEvent) {
        if (isComposing)
          return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
        switch (domEventName) {
          case "paste":
            return null;
          case "keypress":
            if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
              if (nativeEvent.char && 1 < nativeEvent.char.length)
                return nativeEvent.char;
              if (nativeEvent.which)
                return String.fromCharCode(nativeEvent.which);
            }
            return null;
          case "compositionend":
            return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
          default:
            return null;
        }
      }
      function isTextInputElement(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
      }
      function isEventSupported(eventNameSuffix) {
        if (!canUseDOM)
          return false;
        eventNameSuffix = "on" + eventNameSuffix;
        var isSupported = eventNameSuffix in document;
        isSupported || (isSupported = document.createElement("div"), isSupported.setAttribute(eventNameSuffix, "return;"), isSupported = "function" === typeof isSupported[eventNameSuffix]);
        return isSupported;
      }
      function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
        restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
        inst = accumulateTwoPhaseListeners(inst, "onChange");
        0 < inst.length && (nativeEvent = new SyntheticEvent(
          "onChange",
          "change",
          null,
          nativeEvent,
          target
        ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
      }
      function runEventInBatch(dispatchQueue) {
        processDispatchQueue(dispatchQueue, 0);
      }
      function getInstIfValueChanged(targetInst) {
        var targetNode = getNodeFromInstance(targetInst);
        if (updateValueIfChanged(targetNode))
          return targetInst;
      }
      function getTargetInstForChangeEvent(domEventName, targetInst) {
        if ("change" === domEventName)
          return targetInst;
      }
      function stopWatchingForValueChange() {
        activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
      }
      function handlePropertyChange(nativeEvent) {
        if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
          var dispatchQueue = [];
          createAndAccumulateChangeEvent(
            dispatchQueue,
            activeElementInst$1,
            nativeEvent,
            getEventTarget(nativeEvent)
          );
          batchedUpdates$1(runEventInBatch, dispatchQueue);
        }
      }
      function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
        "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
      }
      function getTargetInstForInputEventPolyfill(domEventName) {
        if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
          return getInstIfValueChanged(activeElementInst$1);
      }
      function getTargetInstForClickEvent(domEventName, targetInst) {
        if ("click" === domEventName)
          return getInstIfValueChanged(targetInst);
      }
      function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
        if ("input" === domEventName || "change" === domEventName)
          return getInstIfValueChanged(targetInst);
      }
      function is(x, y) {
        return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
      }
      function shallowEqual(objA, objB) {
        if (objectIs(objA, objB))
          return true;
        if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
          return false;
        var keysA = Object.keys(objA), keysB = Object.keys(objB);
        if (keysA.length !== keysB.length)
          return false;
        for (keysB = 0; keysB < keysA.length; keysB++) {
          var currentKey = keysA[keysB];
          if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
            return false;
        }
        return true;
      }
      function getLeafNode(node) {
        for (; node && node.firstChild; )
          node = node.firstChild;
        return node;
      }
      function getNodeForCharacterOffset(root2, offset) {
        var node = getLeafNode(root2);
        root2 = 0;
        for (var nodeEnd; node; ) {
          if (3 === node.nodeType) {
            nodeEnd = root2 + node.textContent.length;
            if (root2 <= offset && nodeEnd >= offset)
              return { node, offset: offset - root2 };
            root2 = nodeEnd;
          }
          a: {
            for (; node; ) {
              if (node.nextSibling) {
                node = node.nextSibling;
                break a;
              }
              node = node.parentNode;
            }
            node = void 0;
          }
          node = getLeafNode(node);
        }
      }
      function containsNode(outerNode, innerNode) {
        return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
      }
      function getActiveElementDeep(containerInfo) {
        containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
        for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
          try {
            var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
          } catch (err) {
            JSCompiler_inline_result = false;
          }
          if (JSCompiler_inline_result)
            containerInfo = element.contentWindow;
          else
            break;
          element = getActiveElement(containerInfo.document);
        }
        return element;
      }
      function hasSelectionCapabilities(elem) {
        var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
        return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
      }
      function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
        var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
        mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
          anchorNode: doc.anchorNode,
          anchorOffset: doc.anchorOffset,
          focusNode: doc.focusNode,
          focusOffset: doc.focusOffset
        }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
          "onSelect",
          "select",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
      }
      function makePrefixMap(styleProp, eventName) {
        var prefixes = {};
        prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
        prefixes["Webkit" + styleProp] = "webkit" + eventName;
        prefixes["Moz" + styleProp] = "moz" + eventName;
        return prefixes;
      }
      function getVendorPrefixedEventName(eventName) {
        if (prefixedEventNames[eventName])
          return prefixedEventNames[eventName];
        if (!vendorPrefixes[eventName])
          return eventName;
        var prefixMap = vendorPrefixes[eventName], styleProp;
        for (styleProp in prefixMap)
          if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
            return prefixedEventNames[eventName] = prefixMap[styleProp];
        return eventName;
      }
      function registerSimpleEvent(domEventName, reactName) {
        topLevelEventsToReactNames.set(domEventName, reactName);
        registerTwoPhaseEvent(reactName, [domEventName]);
      }
      function createCapturedValueAtFiber(value, source) {
        if ("object" === typeof value && null !== value) {
          var existing = CapturedStacks.get(value);
          if (void 0 !== existing)
            return existing;
          source = {
            value,
            source,
            stack: getStackByFiberInDevAndProd(source)
          };
          CapturedStacks.set(value, source);
          return source;
        }
        return {
          value,
          source,
          stack: getStackByFiberInDevAndProd(source)
        };
      }
      function finishQueueingConcurrentUpdates() {
        for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
          var fiber = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var queue = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var update = concurrentQueues[i];
          concurrentQueues[i++] = null;
          var lane = concurrentQueues[i];
          concurrentQueues[i++] = null;
          if (null !== queue && null !== update) {
            var pending = queue.pending;
            null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
            queue.pending = update;
          }
          0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
        }
      }
      function enqueueUpdate$1(fiber, queue, update, lane) {
        concurrentQueues[concurrentQueuesIndex++] = fiber;
        concurrentQueues[concurrentQueuesIndex++] = queue;
        concurrentQueues[concurrentQueuesIndex++] = update;
        concurrentQueues[concurrentQueuesIndex++] = lane;
        concurrentlyUpdatedLanes |= lane;
        fiber.lanes |= lane;
        fiber = fiber.alternate;
        null !== fiber && (fiber.lanes |= lane);
      }
      function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
        enqueueUpdate$1(fiber, queue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function enqueueConcurrentRenderForLane(fiber, lane) {
        enqueueUpdate$1(fiber, null, null, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
        sourceFiber.lanes |= lane;
        var alternate = sourceFiber.alternate;
        null !== alternate && (alternate.lanes |= lane);
        for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
          parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & OffscreenVisible || (isHidden = true)), sourceFiber = parent, parent = parent.return;
        return 3 === sourceFiber.tag ? (parent = sourceFiber.stateNode, isHidden && null !== update && (isHidden = 31 - clz32(lane), sourceFiber = parent.hiddenUpdates, alternate = sourceFiber[isHidden], null === alternate ? sourceFiber[isHidden] = [update] : alternate.push(update), update.lane = lane | 536870912), parent) : null;
      }
      function getRootForUpdatedFiber(sourceFiber) {
        if (nestedUpdateCount > NESTED_UPDATE_LIMIT)
          throw nestedPassiveUpdateCount = nestedUpdateCount = 0, rootWithPassiveNestedUpdates = rootWithNestedUpdates = null, Error(
            "Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops."
          );
        nestedPassiveUpdateCount > NESTED_PASSIVE_UPDATE_LIMIT && (nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = null, console.error(
          "Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."
        ));
        null === sourceFiber.alternate && 0 !== (sourceFiber.flags & 4098) && warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber);
        for (var node = sourceFiber, parent = node.return; null !== parent; )
          null === node.alternate && 0 !== (node.flags & 4098) && warnAboutUpdateOnNotYetMountedFiberInDEV(sourceFiber), node = parent, parent = node.return;
        return 3 === node.tag ? node.stateNode : null;
      }
      function resolveFunctionForHotReloading(type) {
        if (null === resolveFamily)
          return type;
        var family = resolveFamily(type);
        return void 0 === family ? type : family.current;
      }
      function resolveForwardRefForHotReloading(type) {
        if (null === resolveFamily)
          return type;
        var family = resolveFamily(type);
        return void 0 === family ? null !== type && void 0 !== type && "function" === typeof type.render && (family = resolveFunctionForHotReloading(type.render), type.render !== family) ? (family = { $$typeof: REACT_FORWARD_REF_TYPE, render: family }, void 0 !== type.displayName && (family.displayName = type.displayName), family) : type : family.current;
      }
      function isCompatibleFamilyForHotReloading(fiber, element) {
        if (null === resolveFamily)
          return false;
        var prevType = fiber.elementType;
        element = element.type;
        var needsCompareFamilies = false, $$typeofNextType = "object" === typeof element && null !== element ? element.$$typeof : null;
        switch (fiber.tag) {
          case 1:
            "function" === typeof element && (needsCompareFamilies = true);
            break;
          case 0:
            "function" === typeof element ? needsCompareFamilies = true : $$typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = true);
            break;
          case 11:
            $$typeofNextType === REACT_FORWARD_REF_TYPE ? needsCompareFamilies = true : $$typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = true);
            break;
          case 14:
          case 15:
            $$typeofNextType === REACT_MEMO_TYPE ? needsCompareFamilies = true : $$typeofNextType === REACT_LAZY_TYPE && (needsCompareFamilies = true);
            break;
          default:
            return false;
        }
        return needsCompareFamilies && (fiber = resolveFamily(prevType), void 0 !== fiber && fiber === resolveFamily(element)) ? true : false;
      }
      function markFailedErrorBoundaryForHotReloading(fiber) {
        null !== resolveFamily && "function" === typeof WeakSet && (null === failedBoundaries && (failedBoundaries = /* @__PURE__ */ new WeakSet()), failedBoundaries.add(fiber));
      }
      function scheduleFibersWithFamiliesRecursively(fiber, updatedFamilies, staleFamilies) {
        var alternate = fiber.alternate, child = fiber.child, sibling = fiber.sibling, tag = fiber.tag, type = fiber.type, candidateType = null;
        switch (tag) {
          case 0:
          case 15:
          case 1:
            candidateType = type;
            break;
          case 11:
            candidateType = type.render;
        }
        if (null === resolveFamily)
          throw Error("Expected resolveFamily to be set during hot reload.");
        var needsRender = false;
        type = false;
        null !== candidateType && (candidateType = resolveFamily(candidateType), void 0 !== candidateType && (staleFamilies.has(candidateType) ? type = true : updatedFamilies.has(candidateType) && (1 === tag ? type = true : needsRender = true)));
        null !== failedBoundaries && (failedBoundaries.has(fiber) || null !== alternate && failedBoundaries.has(alternate)) && (type = true);
        type && (fiber._debugNeedsRemount = true);
        if (type || needsRender)
          alternate = enqueueConcurrentRenderForLane(fiber, 2), null !== alternate && scheduleUpdateOnFiber(alternate, fiber, 2);
        null === child || type || scheduleFibersWithFamiliesRecursively(
          child,
          updatedFamilies,
          staleFamilies
        );
        null !== sibling && scheduleFibersWithFamiliesRecursively(
          sibling,
          updatedFamilies,
          staleFamilies
        );
      }
      function FiberNode(tag, pendingProps, key, mode) {
        this.tag = tag;
        this.key = key;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.refCleanup = this.ref = null;
        this.pendingProps = pendingProps;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = mode;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
        this.actualDuration = -0;
        this.actualStartTime = -1.1;
        this.treeBaseDuration = this.selfBaseDuration = -0;
        this._debugTask = this._debugStack = this._debugOwner = this._debugInfo = null;
        this._debugNeedsRemount = false;
        this._debugHookTypes = null;
        hasBadMapPolyfill || "function" !== typeof Object.preventExtensions || Object.preventExtensions(this);
      }
      function shouldConstruct(Component) {
        Component = Component.prototype;
        return !(!Component || !Component.isReactComponent);
      }
      function createWorkInProgress(current2, pendingProps) {
        var workInProgress2 = current2.alternate;
        null === workInProgress2 ? (workInProgress2 = createFiber(
          current2.tag,
          pendingProps,
          current2.key,
          current2.mode
        ), workInProgress2.elementType = current2.elementType, workInProgress2.type = current2.type, workInProgress2.stateNode = current2.stateNode, workInProgress2._debugOwner = current2._debugOwner, workInProgress2._debugStack = current2._debugStack, workInProgress2._debugTask = current2._debugTask, workInProgress2._debugHookTypes = current2._debugHookTypes, workInProgress2.alternate = current2, current2.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current2.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.actualDuration = -0, workInProgress2.actualStartTime = -1.1);
        workInProgress2.flags = current2.flags & 65011712;
        workInProgress2.childLanes = current2.childLanes;
        workInProgress2.lanes = current2.lanes;
        workInProgress2.child = current2.child;
        workInProgress2.memoizedProps = current2.memoizedProps;
        workInProgress2.memoizedState = current2.memoizedState;
        workInProgress2.updateQueue = current2.updateQueue;
        pendingProps = current2.dependencies;
        workInProgress2.dependencies = null === pendingProps ? null : {
          lanes: pendingProps.lanes,
          firstContext: pendingProps.firstContext,
          _debugThenableState: pendingProps._debugThenableState
        };
        workInProgress2.sibling = current2.sibling;
        workInProgress2.index = current2.index;
        workInProgress2.ref = current2.ref;
        workInProgress2.refCleanup = current2.refCleanup;
        workInProgress2.selfBaseDuration = current2.selfBaseDuration;
        workInProgress2.treeBaseDuration = current2.treeBaseDuration;
        workInProgress2._debugInfo = current2._debugInfo;
        workInProgress2._debugNeedsRemount = current2._debugNeedsRemount;
        switch (workInProgress2.tag) {
          case 0:
          case 15:
            workInProgress2.type = resolveFunctionForHotReloading(current2.type);
            break;
          case 1:
            workInProgress2.type = resolveFunctionForHotReloading(current2.type);
            break;
          case 11:
            workInProgress2.type = resolveForwardRefForHotReloading(current2.type);
        }
        return workInProgress2;
      }
      function resetWorkInProgress(workInProgress2, renderLanes2) {
        workInProgress2.flags &= 65011714;
        var current2 = workInProgress2.alternate;
        null === current2 ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null, workInProgress2.selfBaseDuration = 0, workInProgress2.treeBaseDuration = 0) : (workInProgress2.childLanes = current2.childLanes, workInProgress2.lanes = current2.lanes, workInProgress2.child = current2.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current2.memoizedProps, workInProgress2.memoizedState = current2.memoizedState, workInProgress2.updateQueue = current2.updateQueue, workInProgress2.type = current2.type, renderLanes2 = current2.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
          lanes: renderLanes2.lanes,
          firstContext: renderLanes2.firstContext,
          _debugThenableState: renderLanes2._debugThenableState
        }, workInProgress2.selfBaseDuration = current2.selfBaseDuration, workInProgress2.treeBaseDuration = current2.treeBaseDuration);
        return workInProgress2;
      }
      function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
        var fiberTag = 0, resolvedType = type;
        if ("function" === typeof type)
          shouldConstruct(type) && (fiberTag = 1), resolvedType = resolveFunctionForHotReloading(resolvedType);
        else if ("string" === typeof type)
          fiberTag = getHostContext(), fiberTag = isHostHoistableType(type, pendingProps, fiberTag) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
        else
          a:
            switch (type) {
              case REACT_ACTIVITY_TYPE:
                return key = createFiber(31, pendingProps, key, mode), key.elementType = REACT_ACTIVITY_TYPE, key.lanes = lanes, key;
              case REACT_FRAGMENT_TYPE:
                return createFiberFromFragment(
                  pendingProps.children,
                  mode,
                  lanes,
                  key
                );
              case REACT_STRICT_MODE_TYPE:
                fiberTag = 8;
                mode |= StrictLegacyMode;
                mode |= StrictEffectsMode;
                break;
              case REACT_PROFILER_TYPE:
                return type = pendingProps, owner = mode, "string" !== typeof type.id && console.error(
                  'Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',
                  typeof type.id
                ), key = createFiber(12, type, key, owner | ProfileMode), key.elementType = REACT_PROFILER_TYPE, key.lanes = lanes, key.stateNode = { effectDuration: 0, passiveEffectDuration: 0 }, key;
              case REACT_SUSPENSE_TYPE:
                return key = createFiber(13, pendingProps, key, mode), key.elementType = REACT_SUSPENSE_TYPE, key.lanes = lanes, key;
              case REACT_SUSPENSE_LIST_TYPE:
                return key = createFiber(19, pendingProps, key, mode), key.elementType = REACT_SUSPENSE_LIST_TYPE, key.lanes = lanes, key;
              default:
                if ("object" === typeof type && null !== type)
                  switch (type.$$typeof) {
                    case REACT_PROVIDER_TYPE:
                    case REACT_CONTEXT_TYPE:
                      fiberTag = 10;
                      break a;
                    case REACT_CONSUMER_TYPE:
                      fiberTag = 9;
                      break a;
                    case REACT_FORWARD_REF_TYPE:
                      fiberTag = 11;
                      resolvedType = resolveForwardRefForHotReloading(resolvedType);
                      break a;
                    case REACT_MEMO_TYPE:
                      fiberTag = 14;
                      break a;
                    case REACT_LAZY_TYPE:
                      fiberTag = 16;
                      resolvedType = null;
                      break a;
                  }
                resolvedType = "";
                if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length)
                  resolvedType += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
                null === type ? pendingProps = "null" : isArrayImpl(type) ? pendingProps = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (pendingProps = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", resolvedType = " Did you accidentally export a JSX literal instead of a component?") : pendingProps = typeof type;
                (fiberTag = owner ? getComponentNameFromOwner(owner) : null) && (resolvedType += "\n\nCheck the render method of `" + fiberTag + "`.");
                fiberTag = 29;
                pendingProps = Error(
                  "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " + (pendingProps + "." + resolvedType)
                );
                resolvedType = null;
            }
        key = createFiber(fiberTag, pendingProps, key, mode);
        key.elementType = type;
        key.type = resolvedType;
        key.lanes = lanes;
        key._debugOwner = owner;
        return key;
      }
      function createFiberFromElement(element, mode, lanes) {
        mode = createFiberFromTypeAndProps(
          element.type,
          element.key,
          element.props,
          element._owner,
          mode,
          lanes
        );
        mode._debugOwner = element._owner;
        mode._debugStack = element._debugStack;
        mode._debugTask = element._debugTask;
        return mode;
      }
      function createFiberFromFragment(elements, mode, lanes, key) {
        elements = createFiber(7, elements, key, mode);
        elements.lanes = lanes;
        return elements;
      }
      function createFiberFromText(content, mode, lanes) {
        content = createFiber(6, content, null, mode);
        content.lanes = lanes;
        return content;
      }
      function createFiberFromPortal(portal, mode, lanes) {
        mode = createFiber(
          4,
          null !== portal.children ? portal.children : [],
          portal.key,
          mode
        );
        mode.lanes = lanes;
        mode.stateNode = {
          containerInfo: portal.containerInfo,
          pendingChildren: null,
          implementation: portal.implementation
        };
        return mode;
      }
      function pushTreeFork(workInProgress2, totalChildren) {
        warnIfNotHydrating();
        forkStack[forkStackIndex++] = treeForkCount;
        forkStack[forkStackIndex++] = treeForkProvider;
        treeForkProvider = workInProgress2;
        treeForkCount = totalChildren;
      }
      function pushTreeId(workInProgress2, totalChildren, index) {
        warnIfNotHydrating();
        idStack[idStackIndex++] = treeContextId;
        idStack[idStackIndex++] = treeContextOverflow;
        idStack[idStackIndex++] = treeContextProvider;
        treeContextProvider = workInProgress2;
        var baseIdWithLeadingBit = treeContextId;
        workInProgress2 = treeContextOverflow;
        var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
        baseIdWithLeadingBit &= ~(1 << baseLength);
        index += 1;
        var length = 32 - clz32(totalChildren) + baseLength;
        if (30 < length) {
          var numberOfOverflowBits = baseLength - baseLength % 5;
          length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
          baseIdWithLeadingBit >>= numberOfOverflowBits;
          baseLength -= numberOfOverflowBits;
          treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index << baseLength | baseIdWithLeadingBit;
          treeContextOverflow = length + workInProgress2;
        } else
          treeContextId = 1 << length | index << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
      }
      function pushMaterializedTreeId(workInProgress2) {
        warnIfNotHydrating();
        null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
      }
      function popTreeContext(workInProgress2) {
        for (; workInProgress2 === treeForkProvider; )
          treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
        for (; workInProgress2 === treeContextProvider; )
          treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
      }
      function warnIfNotHydrating() {
        isHydrating || console.error(
          "Expected to be hydrating. This is a bug in React. Please file an issue."
        );
      }
      function buildHydrationDiffNode(fiber, distanceFromLeaf) {
        if (null === fiber.return) {
          if (null === hydrationDiffRootDEV)
            hydrationDiffRootDEV = {
              fiber,
              children: [],
              serverProps: void 0,
              serverTail: [],
              distanceFromLeaf
            };
          else {
            if (hydrationDiffRootDEV.fiber !== fiber)
              throw Error(
                "Saw multiple hydration diff roots in a pass. This is a bug in React."
              );
            hydrationDiffRootDEV.distanceFromLeaf > distanceFromLeaf && (hydrationDiffRootDEV.distanceFromLeaf = distanceFromLeaf);
          }
          return hydrationDiffRootDEV;
        }
        var siblings = buildHydrationDiffNode(
          fiber.return,
          distanceFromLeaf + 1
        ).children;
        if (0 < siblings.length && siblings[siblings.length - 1].fiber === fiber)
          return siblings = siblings[siblings.length - 1], siblings.distanceFromLeaf > distanceFromLeaf && (siblings.distanceFromLeaf = distanceFromLeaf), siblings;
        distanceFromLeaf = {
          fiber,
          children: [],
          serverProps: void 0,
          serverTail: [],
          distanceFromLeaf
        };
        siblings.push(distanceFromLeaf);
        return distanceFromLeaf;
      }
      function warnNonHydratedInstance(fiber, rejectedCandidate) {
        didSuspendOrErrorDEV || (fiber = buildHydrationDiffNode(fiber, 0), fiber.serverProps = null, null !== rejectedCandidate && (rejectedCandidate = describeHydratableInstanceForDevWarnings(rejectedCandidate), fiber.serverTail.push(rejectedCandidate)));
      }
      function throwOnHydrationMismatch(fiber) {
        var diff = "", diffRoot = hydrationDiffRootDEV;
        null !== diffRoot && (hydrationDiffRootDEV = null, diff = describeDiff(diffRoot));
        queueHydrationError(
          createCapturedValueAtFiber(
            Error(
              "Hydration failed because the server rendered HTML didn't match the client. As a result this tree will be regenerated on the client. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\nhttps://react.dev/link/hydration-mismatch" + diff
            ),
            fiber
          )
        );
        throw HydrationMismatchException;
      }
      function prepareToHydrateHostInstance(fiber) {
        var didHydrate = fiber.stateNode;
        var type = fiber.type, props = fiber.memoizedProps;
        didHydrate[internalInstanceKey] = fiber;
        didHydrate[internalPropsKey] = props;
        validatePropertiesInDevelopment(type, props);
        switch (type) {
          case "dialog":
            listenToNonDelegatedEvent("cancel", didHydrate);
            listenToNonDelegatedEvent("close", didHydrate);
            break;
          case "iframe":
          case "object":
          case "embed":
            listenToNonDelegatedEvent("load", didHydrate);
            break;
          case "video":
          case "audio":
            for (type = 0; type < mediaEventTypes.length; type++)
              listenToNonDelegatedEvent(mediaEventTypes[type], didHydrate);
            break;
          case "source":
            listenToNonDelegatedEvent("error", didHydrate);
            break;
          case "img":
          case "image":
          case "link":
            listenToNonDelegatedEvent("error", didHydrate);
            listenToNonDelegatedEvent("load", didHydrate);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", didHydrate);
            break;
          case "input":
            checkControlledValueProps("input", props);
            listenToNonDelegatedEvent("invalid", didHydrate);
            validateInputProps(didHydrate, props);
            initInput(
              didHydrate,
              props.value,
              props.defaultValue,
              props.checked,
              props.defaultChecked,
              props.type,
              props.name,
              true
            );
            track(didHydrate);
            break;
          case "option":
            validateOptionProps(didHydrate, props);
            break;
          case "select":
            checkControlledValueProps("select", props);
            listenToNonDelegatedEvent("invalid", didHydrate);
            validateSelectProps(didHydrate, props);
            break;
          case "textarea":
            checkControlledValueProps("textarea", props), listenToNonDelegatedEvent("invalid", didHydrate), validateTextareaProps(didHydrate, props), initTextarea(
              didHydrate,
              props.value,
              props.defaultValue,
              props.children
            ), track(didHydrate);
        }
        type = props.children;
        "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || didHydrate.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(didHydrate.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", didHydrate), listenToNonDelegatedEvent("toggle", didHydrate)), null != props.onScroll && listenToNonDelegatedEvent("scroll", didHydrate), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", didHydrate), null != props.onClick && (didHydrate.onclick = noop$1), didHydrate = true) : didHydrate = false;
        didHydrate || throwOnHydrationMismatch(fiber);
      }
      function popToNextHostParent(fiber) {
        for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
          switch (hydrationParentFiber.tag) {
            case 5:
            case 13:
              rootOrSingletonContext = false;
              return;
            case 27:
            case 3:
              rootOrSingletonContext = true;
              return;
            default:
              hydrationParentFiber = hydrationParentFiber.return;
          }
      }
      function popHydrationState(fiber) {
        if (fiber !== hydrationParentFiber)
          return false;
        if (!isHydrating)
          return popToNextHostParent(fiber), isHydrating = true, false;
        var tag = fiber.tag, JSCompiler_temp;
        if (JSCompiler_temp = 3 !== tag && 27 !== tag) {
          if (JSCompiler_temp = 5 === tag)
            JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
          JSCompiler_temp = !JSCompiler_temp;
        }
        if (JSCompiler_temp && nextHydratableInstance) {
          for (JSCompiler_temp = nextHydratableInstance; JSCompiler_temp; ) {
            var diffNode = buildHydrationDiffNode(fiber, 0), description = describeHydratableInstanceForDevWarnings(JSCompiler_temp);
            diffNode.serverTail.push(description);
            JSCompiler_temp = "Suspense" === description.type ? getNextHydratableInstanceAfterSuspenseInstance(JSCompiler_temp) : getNextHydratable(JSCompiler_temp.nextSibling);
          }
          throwOnHydrationMismatch(fiber);
        }
        popToNextHostParent(fiber);
        if (13 === tag) {
          fiber = fiber.memoizedState;
          fiber = null !== fiber ? fiber.dehydrated : null;
          if (!fiber)
            throw Error(
              "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
            );
          nextHydratableInstance = getNextHydratableInstanceAfterSuspenseInstance(fiber);
        } else
          27 === tag ? (tag = nextHydratableInstance, isSingletonScope(fiber.type) ? (fiber = previousHydratableOnEnteringScopedSingleton, previousHydratableOnEnteringScopedSingleton = null, nextHydratableInstance = fiber) : nextHydratableInstance = tag) : nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
        return true;
      }
      function resetHydrationState() {
        nextHydratableInstance = hydrationParentFiber = null;
        didSuspendOrErrorDEV = isHydrating = false;
      }
      function upgradeHydrationErrorsToRecoverable() {
        var queuedErrors = hydrationErrors;
        null !== queuedErrors && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = queuedErrors : workInProgressRootRecoverableErrors.push.apply(
          workInProgressRootRecoverableErrors,
          queuedErrors
        ), hydrationErrors = null);
        return queuedErrors;
      }
      function queueHydrationError(error) {
        null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
      }
      function emitPendingHydrationWarnings() {
        var diffRoot = hydrationDiffRootDEV;
        if (null !== diffRoot) {
          hydrationDiffRootDEV = null;
          for (var diff = describeDiff(diffRoot); 0 < diffRoot.children.length; )
            diffRoot = diffRoot.children[0];
          runWithFiberInDEV(diffRoot.fiber, function() {
            console.error(
              "A tree hydrated but some attributes of the server rendered HTML didn't match the client properties. This won't be patched up. This can happen if a SSR-ed Client Component used:\n\n- A server/client branch `if (typeof window !== 'undefined')`.\n- Variable input such as `Date.now()` or `Math.random()` which changes each time it's called.\n- Date formatting in a user's locale which doesn't match the server.\n- External changing data without sending a snapshot of it along with the HTML.\n- Invalid HTML tag nesting.\n\nIt can also happen if the client has a browser extension installed which messes with the HTML before React loaded.\n\n%s%s",
              "https://react.dev/link/hydration-mismatch",
              diff
            );
          });
        }
      }
      function resetContextDependencies() {
        lastContextDependency = currentlyRenderingFiber$1 = null;
        isDisallowedContextReadInDEV = false;
      }
      function pushProvider(providerFiber, context, nextValue) {
        push(valueCursor, context._currentValue, providerFiber);
        context._currentValue = nextValue;
        push(rendererCursorDEV, context._currentRenderer, providerFiber);
        void 0 !== context._currentRenderer && null !== context._currentRenderer && context._currentRenderer !== rendererSigil && console.error(
          "Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."
        );
        context._currentRenderer = rendererSigil;
      }
      function popProvider(context, providerFiber) {
        context._currentValue = valueCursor.current;
        var currentRenderer = rendererCursorDEV.current;
        pop(rendererCursorDEV, providerFiber);
        context._currentRenderer = currentRenderer;
        pop(valueCursor, providerFiber);
      }
      function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
        for (; null !== parent; ) {
          var alternate = parent.alternate;
          (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
          if (parent === propagationRoot)
            break;
          parent = parent.return;
        }
        parent !== propagationRoot && console.error(
          "Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue."
        );
      }
      function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
        var fiber = workInProgress2.child;
        null !== fiber && (fiber.return = workInProgress2);
        for (; null !== fiber; ) {
          var list = fiber.dependencies;
          if (null !== list) {
            var nextFiber = fiber.child;
            list = list.firstContext;
            a:
              for (; null !== list; ) {
                var dependency = list;
                list = fiber;
                for (var i = 0; i < contexts.length; i++)
                  if (dependency.context === contexts[i]) {
                    list.lanes |= renderLanes2;
                    dependency = list.alternate;
                    null !== dependency && (dependency.lanes |= renderLanes2);
                    scheduleContextWorkOnParentPath(
                      list.return,
                      renderLanes2,
                      workInProgress2
                    );
                    forcePropagateEntireTree || (nextFiber = null);
                    break a;
                  }
                list = dependency.next;
              }
          } else if (18 === fiber.tag) {
            nextFiber = fiber.return;
            if (null === nextFiber)
              throw Error(
                "We just came from a parent so we must have had a parent. This is a bug in React."
              );
            nextFiber.lanes |= renderLanes2;
            list = nextFiber.alternate;
            null !== list && (list.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(
              nextFiber,
              renderLanes2,
              workInProgress2
            );
            nextFiber = null;
          } else
            nextFiber = fiber.child;
          if (null !== nextFiber)
            nextFiber.return = fiber;
          else
            for (nextFiber = fiber; null !== nextFiber; ) {
              if (nextFiber === workInProgress2) {
                nextFiber = null;
                break;
              }
              fiber = nextFiber.sibling;
              if (null !== fiber) {
                fiber.return = nextFiber.return;
                nextFiber = fiber;
                break;
              }
              nextFiber = nextFiber.return;
            }
          fiber = nextFiber;
        }
      }
      function propagateParentContextChanges(current2, workInProgress2, renderLanes2, forcePropagateEntireTree) {
        current2 = null;
        for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
          if (!isInsidePropagationBailout) {
            if (0 !== (parent.flags & 524288))
              isInsidePropagationBailout = true;
            else if (0 !== (parent.flags & 262144))
              break;
          }
          if (10 === parent.tag) {
            var currentParent = parent.alternate;
            if (null === currentParent)
              throw Error("Should have a current fiber. This is a bug in React.");
            currentParent = currentParent.memoizedProps;
            if (null !== currentParent) {
              var context = parent.type;
              objectIs(parent.pendingProps.value, currentParent.value) || (null !== current2 ? current2.push(context) : current2 = [context]);
            }
          } else if (parent === hostTransitionProviderCursor.current) {
            currentParent = parent.alternate;
            if (null === currentParent)
              throw Error("Should have a current fiber. This is a bug in React.");
            currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current2 ? current2.push(HostTransitionContext) : current2 = [HostTransitionContext]);
          }
          parent = parent.return;
        }
        null !== current2 && propagateContextChanges(
          workInProgress2,
          current2,
          renderLanes2,
          forcePropagateEntireTree
        );
        workInProgress2.flags |= 262144;
      }
      function checkIfContextChanged(currentDependencies) {
        for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
          if (!objectIs(
            currentDependencies.context._currentValue,
            currentDependencies.memoizedValue
          ))
            return true;
          currentDependencies = currentDependencies.next;
        }
        return false;
      }
      function prepareToReadContext(workInProgress2) {
        currentlyRenderingFiber$1 = workInProgress2;
        lastContextDependency = null;
        workInProgress2 = workInProgress2.dependencies;
        null !== workInProgress2 && (workInProgress2.firstContext = null);
      }
      function readContext(context) {
        isDisallowedContextReadInDEV && console.error(
          "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
        );
        return readContextForConsumer(currentlyRenderingFiber$1, context);
      }
      function readContextDuringReconciliation(consumer, context) {
        null === currentlyRenderingFiber$1 && prepareToReadContext(consumer);
        return readContextForConsumer(consumer, context);
      }
      function readContextForConsumer(consumer, context) {
        var value = context._currentValue;
        context = { context, memoizedValue: value, next: null };
        if (null === lastContextDependency) {
          if (null === consumer)
            throw Error(
              "Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo()."
            );
          lastContextDependency = context;
          consumer.dependencies = {
            lanes: 0,
            firstContext: context,
            _debugThenableState: null
          };
          consumer.flags |= 524288;
        } else
          lastContextDependency = lastContextDependency.next = context;
        return value;
      }
      function createCache() {
        return {
          controller: new AbortControllerLocal(),
          data: /* @__PURE__ */ new Map(),
          refCount: 0
        };
      }
      function retainCache(cache) {
        cache.controller.signal.aborted && console.warn(
          "A cache instance was retained after it was already freed. This likely indicates a bug in React."
        );
        cache.refCount++;
      }
      function releaseCache(cache) {
        cache.refCount--;
        0 > cache.refCount && console.warn(
          "A cache instance was released after it was already freed. This likely indicates a bug in React."
        );
        0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
          cache.controller.abort();
        });
      }
      function pushNestedEffectDurations() {
        var prevEffectDuration = profilerEffectDuration;
        profilerEffectDuration = 0;
        return prevEffectDuration;
      }
      function popNestedEffectDurations(prevEffectDuration) {
        var elapsedTime = profilerEffectDuration;
        profilerEffectDuration = prevEffectDuration;
        return elapsedTime;
      }
      function bubbleNestedEffectDurations(prevEffectDuration) {
        var elapsedTime = profilerEffectDuration;
        profilerEffectDuration += prevEffectDuration;
        return elapsedTime;
      }
      function startProfilerTimer(fiber) {
        profilerStartTime = now();
        0 > fiber.actualStartTime && (fiber.actualStartTime = profilerStartTime);
      }
      function stopProfilerTimerIfRunningAndRecordDuration(fiber) {
        if (0 <= profilerStartTime) {
          var elapsedTime = now() - profilerStartTime;
          fiber.actualDuration += elapsedTime;
          fiber.selfBaseDuration = elapsedTime;
          profilerStartTime = -1;
        }
      }
      function stopProfilerTimerIfRunningAndRecordIncompleteDuration(fiber) {
        if (0 <= profilerStartTime) {
          var elapsedTime = now() - profilerStartTime;
          fiber.actualDuration += elapsedTime;
          profilerStartTime = -1;
        }
      }
      function recordEffectDuration() {
        if (0 <= profilerStartTime) {
          var elapsedTime = now() - profilerStartTime;
          profilerStartTime = -1;
          profilerEffectDuration += elapsedTime;
        }
      }
      function startEffectTimer() {
        profilerStartTime = now();
      }
      function transferActualDuration(fiber) {
        for (var child = fiber.child; child; )
          fiber.actualDuration += child.actualDuration, child = child.sibling;
      }
      function entangleAsyncAction(transition, thenable) {
        if (null === currentEntangledListeners) {
          var entangledListeners = currentEntangledListeners = [];
          currentEntangledPendingCount = 0;
          currentEntangledLane = requestTransitionLane();
          currentEntangledActionThenable = {
            status: "pending",
            value: void 0,
            then: function(resolve) {
              entangledListeners.push(resolve);
            }
          };
        }
        currentEntangledPendingCount++;
        thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
        return thenable;
      }
      function pingEngtangledActionScope() {
        if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
          null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
          var listeners = currentEntangledListeners;
          currentEntangledListeners = null;
          currentEntangledLane = 0;
          currentEntangledActionThenable = null;
          for (var i = 0; i < listeners.length; i++)
            (0, listeners[i])();
        }
      }
      function chainThenableValue(thenable, result) {
        var listeners = [], thenableWithOverride = {
          status: "pending",
          value: null,
          reason: null,
          then: function(resolve) {
            listeners.push(resolve);
          }
        };
        thenable.then(
          function() {
            thenableWithOverride.status = "fulfilled";
            thenableWithOverride.value = result;
            for (var i = 0; i < listeners.length; i++)
              (0, listeners[i])(result);
          },
          function(error) {
            thenableWithOverride.status = "rejected";
            thenableWithOverride.reason = error;
            for (error = 0; error < listeners.length; error++)
              (0, listeners[error])(void 0);
          }
        );
        return thenableWithOverride;
      }
      function peekCacheFromPool() {
        var cacheResumedFromPreviousRender = resumedCache.current;
        return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
      }
      function pushTransition(offscreenWorkInProgress, prevCachePool) {
        null === prevCachePool ? push(resumedCache, resumedCache.current, offscreenWorkInProgress) : push(resumedCache, prevCachePool.pool, offscreenWorkInProgress);
      }
      function getSuspendedCache() {
        var cacheFromPool = peekCacheFromPool();
        return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
      }
      function createThenableState() {
        return { didWarnAboutUncachedPromise: false, thenables: [] };
      }
      function isThenableResolved(thenable) {
        thenable = thenable.status;
        return "fulfilled" === thenable || "rejected" === thenable;
      }
      function noop$3() {
      }
      function trackUsedThenable(thenableState2, thenable, index) {
        null !== ReactSharedInternals.actQueue && (ReactSharedInternals.didUsePromise = true);
        var trackedThenables = thenableState2.thenables;
        index = trackedThenables[index];
        void 0 === index ? trackedThenables.push(thenable) : index !== thenable && (thenableState2.didWarnAboutUncachedPromise || (thenableState2.didWarnAboutUncachedPromise = true, console.error(
          "A component was suspended by an uncached promise. Creating promises inside a Client Component or hook is not yet supported, except via a Suspense-compatible library or framework."
        )), thenable.then(noop$3, noop$3), thenable = index);
        switch (thenable.status) {
          case "fulfilled":
            return thenable.value;
          case "rejected":
            throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
          default:
            if ("string" === typeof thenable.status)
              thenable.then(noop$3, noop$3);
            else {
              thenableState2 = workInProgressRoot;
              if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
                throw Error(
                  "An unknown Component is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
                );
              thenableState2 = thenable;
              thenableState2.status = "pending";
              thenableState2.then(
                function(fulfilledValue) {
                  if ("pending" === thenable.status) {
                    var fulfilledThenable = thenable;
                    fulfilledThenable.status = "fulfilled";
                    fulfilledThenable.value = fulfilledValue;
                  }
                },
                function(error) {
                  if ("pending" === thenable.status) {
                    var rejectedThenable = thenable;
                    rejectedThenable.status = "rejected";
                    rejectedThenable.reason = error;
                  }
                }
              );
            }
            switch (thenable.status) {
              case "fulfilled":
                return thenable.value;
              case "rejected":
                throw thenableState2 = thenable.reason, checkIfUseWrappedInAsyncCatch(thenableState2), thenableState2;
            }
            suspendedThenable = thenable;
            needsToResetSuspendedThenableDEV = true;
            throw SuspenseException;
        }
      }
      function getSuspendedThenable() {
        if (null === suspendedThenable)
          throw Error(
            "Expected a suspended thenable. This is a bug in React. Please file an issue."
          );
        var thenable = suspendedThenable;
        suspendedThenable = null;
        needsToResetSuspendedThenableDEV = false;
        return thenable;
      }
      function checkIfUseWrappedInAsyncCatch(rejectedReason) {
        if (rejectedReason === SuspenseException || rejectedReason === SuspenseActionException)
          throw Error(
            "Hooks are not supported inside an async component. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server."
          );
      }
      function initializeUpdateQueue(fiber) {
        fiber.updateQueue = {
          baseState: fiber.memoizedState,
          firstBaseUpdate: null,
          lastBaseUpdate: null,
          shared: { pending: null, lanes: 0, hiddenCallbacks: null },
          callbacks: null
        };
      }
      function cloneUpdateQueue(current2, workInProgress2) {
        current2 = current2.updateQueue;
        workInProgress2.updateQueue === current2 && (workInProgress2.updateQueue = {
          baseState: current2.baseState,
          firstBaseUpdate: current2.firstBaseUpdate,
          lastBaseUpdate: current2.lastBaseUpdate,
          shared: current2.shared,
          callbacks: null
        });
      }
      function createUpdate(lane) {
        return {
          lane,
          tag: UpdateState,
          payload: null,
          callback: null,
          next: null
        };
      }
      function enqueueUpdate(fiber, update, lane) {
        var updateQueue = fiber.updateQueue;
        if (null === updateQueue)
          return null;
        updateQueue = updateQueue.shared;
        if (currentlyProcessingQueue === updateQueue && !didWarnUpdateInsideUpdate) {
          var componentName2 = getComponentNameFromFiber(fiber);
          console.error(
            "An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback.\n\nPlease update the following component: %s",
            componentName2
          );
          didWarnUpdateInsideUpdate = true;
        }
        if ((executionContext & RenderContext) !== NoContext)
          return componentName2 = updateQueue.pending, null === componentName2 ? update.next = update : (update.next = componentName2.next, componentName2.next = update), updateQueue.pending = update, update = getRootForUpdatedFiber(fiber), markUpdateLaneFromFiberToRoot(fiber, null, lane), update;
        enqueueUpdate$1(fiber, updateQueue, update, lane);
        return getRootForUpdatedFiber(fiber);
      }
      function entangleTransitions(root2, fiber, lane) {
        fiber = fiber.updateQueue;
        if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194048))) {
          var queueLanes = fiber.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          fiber.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
        var queue = workInProgress2.updateQueue, current2 = workInProgress2.alternate;
        if (null !== current2 && (current2 = current2.updateQueue, queue === current2)) {
          var newFirst = null, newLast = null;
          queue = queue.firstBaseUpdate;
          if (null !== queue) {
            do {
              var clone = {
                lane: queue.lane,
                tag: queue.tag,
                payload: queue.payload,
                callback: null,
                next: null
              };
              null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
              queue = queue.next;
            } while (null !== queue);
            null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
          } else
            newFirst = newLast = capturedUpdate;
          queue = {
            baseState: current2.baseState,
            firstBaseUpdate: newFirst,
            lastBaseUpdate: newLast,
            shared: current2.shared,
            callbacks: current2.callbacks
          };
          workInProgress2.updateQueue = queue;
          return;
        }
        workInProgress2 = queue.lastBaseUpdate;
        null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
        queue.lastBaseUpdate = capturedUpdate;
      }
      function suspendIfUpdateReadFromEntangledAsyncAction() {
        if (didReadFromEntangledAsyncAction) {
          var entangledActionThenable = currentEntangledActionThenable;
          if (null !== entangledActionThenable)
            throw entangledActionThenable;
        }
      }
      function processUpdateQueue(workInProgress2, props, instance$jscomp$0, renderLanes2) {
        didReadFromEntangledAsyncAction = false;
        var queue = workInProgress2.updateQueue;
        hasForceUpdate = false;
        currentlyProcessingQueue = queue.shared;
        var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
        if (null !== pendingQueue) {
          queue.shared.pending = null;
          var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
          lastPendingUpdate.next = null;
          null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
          lastBaseUpdate = lastPendingUpdate;
          var current2 = workInProgress2.alternate;
          null !== current2 && (current2 = current2.updateQueue, pendingQueue = current2.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current2.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current2.lastBaseUpdate = lastPendingUpdate));
        }
        if (null !== firstBaseUpdate) {
          var newState = queue.baseState;
          lastBaseUpdate = 0;
          current2 = firstPendingUpdate = lastPendingUpdate = null;
          pendingQueue = firstBaseUpdate;
          do {
            var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
            if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
              0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
              null !== current2 && (current2 = current2.next = {
                lane: 0,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: null,
                next: null
              });
              a: {
                updateLane = workInProgress2;
                var partialState = pendingQueue;
                var nextProps = props, instance = instance$jscomp$0;
                switch (partialState.tag) {
                  case ReplaceState:
                    partialState = partialState.payload;
                    if ("function" === typeof partialState) {
                      isDisallowedContextReadInDEV = true;
                      var nextState = partialState.call(
                        instance,
                        newState,
                        nextProps
                      );
                      if (updateLane.mode & StrictLegacyMode) {
                        setIsStrictModeForDevtools(true);
                        try {
                          partialState.call(instance, newState, nextProps);
                        } finally {
                          setIsStrictModeForDevtools(false);
                        }
                      }
                      isDisallowedContextReadInDEV = false;
                      newState = nextState;
                      break a;
                    }
                    newState = partialState;
                    break a;
                  case CaptureUpdate:
                    updateLane.flags = updateLane.flags & -65537 | 128;
                  case UpdateState:
                    nextState = partialState.payload;
                    if ("function" === typeof nextState) {
                      isDisallowedContextReadInDEV = true;
                      partialState = nextState.call(
                        instance,
                        newState,
                        nextProps
                      );
                      if (updateLane.mode & StrictLegacyMode) {
                        setIsStrictModeForDevtools(true);
                        try {
                          nextState.call(instance, newState, nextProps);
                        } finally {
                          setIsStrictModeForDevtools(false);
                        }
                      }
                      isDisallowedContextReadInDEV = false;
                    } else
                      partialState = nextState;
                    if (null === partialState || void 0 === partialState)
                      break a;
                    newState = assign({}, newState, partialState);
                    break a;
                  case ForceUpdate:
                    hasForceUpdate = true;
                }
              }
              updateLane = pendingQueue.callback;
              null !== updateLane && (workInProgress2.flags |= 64, isHiddenUpdate && (workInProgress2.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
            } else
              isHiddenUpdate = {
                lane: updateLane,
                tag: pendingQueue.tag,
                payload: pendingQueue.payload,
                callback: pendingQueue.callback,
                next: null
              }, null === current2 ? (firstPendingUpdate = current2 = isHiddenUpdate, lastPendingUpdate = newState) : current2 = current2.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
            pendingQueue = pendingQueue.next;
            if (null === pendingQueue)
              if (pendingQueue = queue.shared.pending, null === pendingQueue)
                break;
              else
                isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
          } while (1);
          null === current2 && (lastPendingUpdate = newState);
          queue.baseState = lastPendingUpdate;
          queue.firstBaseUpdate = firstPendingUpdate;
          queue.lastBaseUpdate = current2;
          null === firstBaseUpdate && (queue.shared.lanes = 0);
          workInProgressRootSkippedLanes |= lastBaseUpdate;
          workInProgress2.lanes = lastBaseUpdate;
          workInProgress2.memoizedState = newState;
        }
        currentlyProcessingQueue = null;
      }
      function callCallback(callback, context) {
        if ("function" !== typeof callback)
          throw Error(
            "Invalid argument passed as callback. Expected a function. Instead received: " + callback
          );
        callback.call(context);
      }
      function commitHiddenCallbacks(updateQueue, context) {
        var hiddenCallbacks = updateQueue.shared.hiddenCallbacks;
        if (null !== hiddenCallbacks)
          for (updateQueue.shared.hiddenCallbacks = null, updateQueue = 0; updateQueue < hiddenCallbacks.length; updateQueue++)
            callCallback(hiddenCallbacks[updateQueue], context);
      }
      function commitCallbacks(updateQueue, context) {
        var callbacks = updateQueue.callbacks;
        if (null !== callbacks)
          for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
            callCallback(callbacks[updateQueue], context);
      }
      function pushHiddenContext(fiber, context) {
        var prevEntangledRenderLanes = entangledRenderLanes;
        push(prevEntangledRenderLanesCursor, prevEntangledRenderLanes, fiber);
        push(currentTreeHiddenStackCursor, context, fiber);
        entangledRenderLanes = prevEntangledRenderLanes | context.baseLanes;
      }
      function reuseHiddenContextOnStack(fiber) {
        push(prevEntangledRenderLanesCursor, entangledRenderLanes, fiber);
        push(
          currentTreeHiddenStackCursor,
          currentTreeHiddenStackCursor.current,
          fiber
        );
      }
      function popHiddenContext(fiber) {
        entangledRenderLanes = prevEntangledRenderLanesCursor.current;
        pop(currentTreeHiddenStackCursor, fiber);
        pop(prevEntangledRenderLanesCursor, fiber);
      }
      function mountHookTypesDev() {
        var hookName = currentHookNameInDev;
        null === hookTypesDev ? hookTypesDev = [hookName] : hookTypesDev.push(hookName);
      }
      function updateHookTypesDev() {
        var hookName = currentHookNameInDev;
        if (null !== hookTypesDev && (hookTypesUpdateIndexDev++, hookTypesDev[hookTypesUpdateIndexDev] !== hookName)) {
          var componentName2 = getComponentNameFromFiber(currentlyRenderingFiber);
          if (!didWarnAboutMismatchedHooksForComponent.has(componentName2) && (didWarnAboutMismatchedHooksForComponent.add(componentName2), null !== hookTypesDev)) {
            for (var table = "", i = 0; i <= hookTypesUpdateIndexDev; i++) {
              var oldHookName = hookTypesDev[i], newHookName = i === hookTypesUpdateIndexDev ? hookName : oldHookName;
              for (oldHookName = i + 1 + ". " + oldHookName; 30 > oldHookName.length; )
                oldHookName += " ";
              oldHookName += newHookName + "\n";
              table += oldHookName;
            }
            console.error(
              "React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://react.dev/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n",
              componentName2,
              table
            );
          }
        }
      }
      function checkDepsAreArrayDev(deps) {
        void 0 === deps || null === deps || isArrayImpl(deps) || console.error(
          "%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",
          currentHookNameInDev,
          typeof deps
        );
      }
      function warnOnUseFormStateInDev() {
        var componentName2 = getComponentNameFromFiber(currentlyRenderingFiber);
        didWarnAboutUseFormState.has(componentName2) || (didWarnAboutUseFormState.add(componentName2), console.error(
          "ReactDOM.useFormState has been renamed to React.useActionState. Please update %s to use React.useActionState.",
          componentName2
        ));
      }
      function throwInvalidHookError() {
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      }
      function areHookInputsEqual(nextDeps, prevDeps) {
        if (ignorePreviousDependencies)
          return false;
        if (null === prevDeps)
          return console.error(
            "%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",
            currentHookNameInDev
          ), false;
        nextDeps.length !== prevDeps.length && console.error(
          "The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s",
          currentHookNameInDev,
          "[" + prevDeps.join(", ") + "]",
          "[" + nextDeps.join(", ") + "]"
        );
        for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
          if (!objectIs(nextDeps[i], prevDeps[i]))
            return false;
        return true;
      }
      function renderWithHooks(current2, workInProgress2, Component, props, secondArg, nextRenderLanes) {
        renderLanes = nextRenderLanes;
        currentlyRenderingFiber = workInProgress2;
        hookTypesDev = null !== current2 ? current2._debugHookTypes : null;
        hookTypesUpdateIndexDev = -1;
        ignorePreviousDependencies = null !== current2 && current2.type !== workInProgress2.type;
        if ("[object AsyncFunction]" === Object.prototype.toString.call(Component) || "[object AsyncGeneratorFunction]" === Object.prototype.toString.call(Component))
          nextRenderLanes = getComponentNameFromFiber(currentlyRenderingFiber), didWarnAboutAsyncClientComponent.has(nextRenderLanes) || (didWarnAboutAsyncClientComponent.add(nextRenderLanes), console.error(
            "%s is an async Client Component. Only Server Components can be async at the moment. This error is often caused by accidentally adding `'use client'` to a module that was originally written for the server.",
            null === nextRenderLanes ? "An unknown Component" : "<" + nextRenderLanes + ">"
          ));
        workInProgress2.memoizedState = null;
        workInProgress2.updateQueue = null;
        workInProgress2.lanes = 0;
        ReactSharedInternals.H = null !== current2 && null !== current2.memoizedState ? HooksDispatcherOnUpdateInDEV : null !== hookTypesDev ? HooksDispatcherOnMountWithHookTypesInDEV : HooksDispatcherOnMountInDEV;
        shouldDoubleInvokeUserFnsInHooksDEV = nextRenderLanes = (workInProgress2.mode & StrictLegacyMode) !== NoMode;
        var children = callComponentInDEV(Component, props, secondArg);
        shouldDoubleInvokeUserFnsInHooksDEV = false;
        didScheduleRenderPhaseUpdateDuringThisPass && (children = renderWithHooksAgain(
          workInProgress2,
          Component,
          props,
          secondArg
        ));
        if (nextRenderLanes) {
          setIsStrictModeForDevtools(true);
          try {
            children = renderWithHooksAgain(
              workInProgress2,
              Component,
              props,
              secondArg
            );
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        finishRenderingHooks(current2, workInProgress2);
        return children;
      }
      function finishRenderingHooks(current2, workInProgress2) {
        workInProgress2._debugHookTypes = hookTypesDev;
        null === workInProgress2.dependencies ? null !== thenableState$1 && (workInProgress2.dependencies = {
          lanes: 0,
          firstContext: null,
          _debugThenableState: thenableState$1
        }) : workInProgress2.dependencies._debugThenableState = thenableState$1;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
        renderLanes = 0;
        hookTypesDev = currentHookNameInDev = workInProgressHook = currentHook = currentlyRenderingFiber = null;
        hookTypesUpdateIndexDev = -1;
        null !== current2 && (current2.flags & 65011712) !== (workInProgress2.flags & 65011712) && console.error(
          "Internal React error: Expected static flag was missing. Please notify the React team."
        );
        didScheduleRenderPhaseUpdate = false;
        thenableIndexCounter$1 = 0;
        thenableState$1 = null;
        if (didRenderTooFewHooks)
          throw Error(
            "Rendered fewer hooks than expected. This may be caused by an accidental early return statement."
          );
        null === current2 || didReceiveUpdate || (current2 = current2.dependencies, null !== current2 && checkIfContextChanged(current2) && (didReceiveUpdate = true));
        needsToResetSuspendedThenableDEV ? (needsToResetSuspendedThenableDEV = false, current2 = true) : current2 = false;
        current2 && (workInProgress2 = getComponentNameFromFiber(workInProgress2) || "Unknown", didWarnAboutUseWrappedInTryCatch.has(workInProgress2) || didWarnAboutAsyncClientComponent.has(workInProgress2) || (didWarnAboutUseWrappedInTryCatch.add(workInProgress2), console.error(
          "`use` was called from inside a try/catch block. This is not allowed and can lead to unexpected behavior. To handle errors triggered by `use`, wrap your component in a error boundary."
        )));
      }
      function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
        currentlyRenderingFiber = workInProgress2;
        var numberOfReRenders = 0;
        do {
          didScheduleRenderPhaseUpdateDuringThisPass && (thenableState$1 = null);
          thenableIndexCounter$1 = 0;
          didScheduleRenderPhaseUpdateDuringThisPass = false;
          if (numberOfReRenders >= RE_RENDER_LIMIT)
            throw Error(
              "Too many re-renders. React limits the number of renders to prevent an infinite loop."
            );
          numberOfReRenders += 1;
          ignorePreviousDependencies = false;
          workInProgressHook = currentHook = null;
          if (null != workInProgress2.updateQueue) {
            var children = workInProgress2.updateQueue;
            children.lastEffect = null;
            children.events = null;
            children.stores = null;
            null != children.memoCache && (children.memoCache.index = 0);
          }
          hookTypesUpdateIndexDev = -1;
          ReactSharedInternals.H = HooksDispatcherOnRerenderInDEV;
          children = callComponentInDEV(Component, props, secondArg);
        } while (didScheduleRenderPhaseUpdateDuringThisPass);
        return children;
      }
      function TransitionAwareHostComponent() {
        var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
        maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
        dispatcher = dispatcher.useState()[0];
        (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber.flags |= 1024);
        return maybeThenable;
      }
      function checkDidRenderIdHook() {
        var didRenderIdHook = 0 !== localIdCounter;
        localIdCounter = 0;
        return didRenderIdHook;
      }
      function bailoutHooks(current2, workInProgress2, lanes) {
        workInProgress2.updateQueue = current2.updateQueue;
        workInProgress2.flags = (workInProgress2.mode & StrictEffectsMode) !== NoMode ? workInProgress2.flags & -402655237 : workInProgress2.flags & -2053;
        current2.lanes &= ~lanes;
      }
      function resetHooksOnUnwind(workInProgress2) {
        if (didScheduleRenderPhaseUpdate) {
          for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
            var queue = workInProgress2.queue;
            null !== queue && (queue.pending = null);
            workInProgress2 = workInProgress2.next;
          }
          didScheduleRenderPhaseUpdate = false;
        }
        renderLanes = 0;
        hookTypesDev = workInProgressHook = currentHook = currentlyRenderingFiber = null;
        hookTypesUpdateIndexDev = -1;
        currentHookNameInDev = null;
        didScheduleRenderPhaseUpdateDuringThisPass = false;
        thenableIndexCounter$1 = localIdCounter = 0;
        thenableState$1 = null;
      }
      function mountWorkInProgressHook() {
        var hook = {
          memoizedState: null,
          baseState: null,
          baseQueue: null,
          queue: null,
          next: null
        };
        null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
        return workInProgressHook;
      }
      function updateWorkInProgressHook() {
        if (null === currentHook) {
          var nextCurrentHook = currentlyRenderingFiber.alternate;
          nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
        } else
          nextCurrentHook = currentHook.next;
        var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber.memoizedState : workInProgressHook.next;
        if (null !== nextWorkInProgressHook)
          workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
        else {
          if (null === nextCurrentHook) {
            if (null === currentlyRenderingFiber.alternate)
              throw Error(
                "Update hook called on initial render. This is likely a bug in React. Please file an issue."
              );
            throw Error("Rendered more hooks than during the previous render.");
          }
          currentHook = nextCurrentHook;
          nextCurrentHook = {
            memoizedState: currentHook.memoizedState,
            baseState: currentHook.baseState,
            baseQueue: currentHook.baseQueue,
            queue: currentHook.queue,
            next: null
          };
          null === workInProgressHook ? currentlyRenderingFiber.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
        }
        return workInProgressHook;
      }
      function createFunctionComponentUpdateQueue() {
        return { lastEffect: null, events: null, stores: null, memoCache: null };
      }
      function useThenable(thenable) {
        var index = thenableIndexCounter$1;
        thenableIndexCounter$1 += 1;
        null === thenableState$1 && (thenableState$1 = createThenableState());
        thenable = trackUsedThenable(thenableState$1, thenable, index);
        index = currentlyRenderingFiber;
        null === (null === workInProgressHook ? index.memoizedState : workInProgressHook.next) && (index = index.alternate, ReactSharedInternals.H = null !== index && null !== index.memoizedState ? HooksDispatcherOnUpdateInDEV : HooksDispatcherOnMountInDEV);
        return thenable;
      }
      function use(usable) {
        if (null !== usable && "object" === typeof usable) {
          if ("function" === typeof usable.then)
            return useThenable(usable);
          if (usable.$$typeof === REACT_CONTEXT_TYPE)
            return readContext(usable);
        }
        throw Error("An unsupported type was passed to use(): " + String(usable));
      }
      function useMemoCache(size) {
        var memoCache = null, updateQueue = currentlyRenderingFiber.updateQueue;
        null !== updateQueue && (memoCache = updateQueue.memoCache);
        if (null == memoCache) {
          var current2 = currentlyRenderingFiber.alternate;
          null !== current2 && (current2 = current2.updateQueue, null !== current2 && (current2 = current2.memoCache, null != current2 && (memoCache = {
            data: current2.data.map(function(array) {
              return array.slice();
            }),
            index: 0
          })));
        }
        null == memoCache && (memoCache = { data: [], index: 0 });
        null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = updateQueue);
        updateQueue.memoCache = memoCache;
        updateQueue = memoCache.data[memoCache.index];
        if (void 0 === updateQueue || ignorePreviousDependencies)
          for (updateQueue = memoCache.data[memoCache.index] = Array(size), current2 = 0; current2 < size; current2++)
            updateQueue[current2] = REACT_MEMO_CACHE_SENTINEL;
        else
          updateQueue.length !== size && console.error(
            "Expected a constant size argument for each invocation of useMemoCache. The previous cache was allocated with size %s but size %s was requested.",
            updateQueue.length,
            size
          );
        memoCache.index++;
        return updateQueue;
      }
      function basicStateReducer(state, action) {
        return "function" === typeof action ? action(state) : action;
      }
      function mountReducer(reducer, initialArg, init) {
        var hook = mountWorkInProgressHook();
        if (void 0 !== init) {
          var initialState = init(initialArg);
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              init(initialArg);
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        } else
          initialState = initialArg;
        hook.memoizedState = hook.baseState = initialState;
        reducer = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: reducer,
          lastRenderedState: initialState
        };
        hook.queue = reducer;
        reducer = reducer.dispatch = dispatchReducerAction.bind(
          null,
          currentlyRenderingFiber,
          reducer
        );
        return [hook.memoizedState, reducer];
      }
      function updateReducer(reducer) {
        var hook = updateWorkInProgressHook();
        return updateReducerImpl(hook, currentHook, reducer);
      }
      function updateReducerImpl(hook, current2, reducer) {
        var queue = hook.queue;
        if (null === queue)
          throw Error(
            "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
          );
        queue.lastRenderedReducer = reducer;
        var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
        if (null !== pendingQueue) {
          if (null !== baseQueue) {
            var baseFirst = baseQueue.next;
            baseQueue.next = pendingQueue.next;
            pendingQueue.next = baseFirst;
          }
          current2.baseQueue !== baseQueue && console.error(
            "Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."
          );
          current2.baseQueue = baseQueue = pendingQueue;
          queue.pending = null;
        }
        pendingQueue = hook.baseState;
        if (null === baseQueue)
          hook.memoizedState = pendingQueue;
        else {
          current2 = baseQueue.next;
          var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current2, didReadFromEntangledAsyncAction2 = false;
          do {
            var updateLane = update.lane & -536870913;
            if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
              var revertLane = update.revertLane;
              if (0 === revertLane)
                null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
                  lane: 0,
                  revertLane: 0,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction2 = true);
              else if ((renderLanes & revertLane) === revertLane) {
                update = update.next;
                revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction2 = true);
                continue;
              } else
                updateLane = {
                  lane: 0,
                  revertLane: update.revertLane,
                  action: update.action,
                  hasEagerState: update.hasEagerState,
                  eagerState: update.eagerState,
                  next: null
                }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
              updateLane = update.action;
              shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
              pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
            } else
              revertLane = {
                lane: updateLane,
                revertLane: update.revertLane,
                action: update.action,
                hasEagerState: update.hasEagerState,
                eagerState: update.eagerState,
                next: null
              }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
            update = update.next;
          } while (null !== update && update !== current2);
          null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
          if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction2 && (reducer = currentEntangledActionThenable, null !== reducer)))
            throw reducer;
          hook.memoizedState = pendingQueue;
          hook.baseState = baseFirst;
          hook.baseQueue = newBaseQueueLast;
          queue.lastRenderedState = pendingQueue;
        }
        null === baseQueue && (queue.lanes = 0);
        return [hook.memoizedState, queue.dispatch];
      }
      function rerenderReducer(reducer) {
        var hook = updateWorkInProgressHook(), queue = hook.queue;
        if (null === queue)
          throw Error(
            "Should have a queue. You are likely calling Hooks conditionally, which is not allowed. (https://react.dev/link/invalid-hook-call)"
          );
        queue.lastRenderedReducer = reducer;
        var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
        if (null !== lastRenderPhaseUpdate) {
          queue.pending = null;
          var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
          do
            newState = reducer(newState, update.action), update = update.next;
          while (update !== lastRenderPhaseUpdate);
          objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
          hook.memoizedState = newState;
          null === hook.baseQueue && (hook.baseState = newState);
          queue.lastRenderedState = newState;
        }
        return [newState, dispatch];
      }
      function mountSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = mountWorkInProgressHook();
        if (isHydrating) {
          if (void 0 === getServerSnapshot)
            throw Error(
              "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
            );
          var nextSnapshot = getServerSnapshot();
          didWarnUncachedGetSnapshot || nextSnapshot === getServerSnapshot() || (console.error(
            "The result of getServerSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        } else {
          nextSnapshot = getSnapshot();
          didWarnUncachedGetSnapshot || (getServerSnapshot = getSnapshot(), objectIs(nextSnapshot, getServerSnapshot) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true));
          if (null === workInProgressRoot)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          0 !== (workInProgressRootRenderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, nextSnapshot);
        }
        hook.memoizedState = nextSnapshot;
        getServerSnapshot = { value: nextSnapshot, getSnapshot };
        hook.queue = getServerSnapshot;
        mountEffect(
          subscribeToStore.bind(null, fiber, getServerSnapshot, subscribe),
          [subscribe]
        );
        fiber.flags |= 2048;
        pushSimpleEffect(
          HasEffect | Passive,
          createEffectInstance(),
          updateStoreInstance.bind(
            null,
            fiber,
            getServerSnapshot,
            nextSnapshot,
            getSnapshot
          ),
          null
        );
        return nextSnapshot;
      }
      function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
        var fiber = currentlyRenderingFiber, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
        if (isHydrating$jscomp$0) {
          if (void 0 === getServerSnapshot)
            throw Error(
              "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
            );
          getServerSnapshot = getServerSnapshot();
        } else if (getServerSnapshot = getSnapshot(), !didWarnUncachedGetSnapshot) {
          var cachedSnapshot = getSnapshot();
          objectIs(getServerSnapshot, cachedSnapshot) || (console.error(
            "The result of getSnapshot should be cached to avoid an infinite loop"
          ), didWarnUncachedGetSnapshot = true);
        }
        if (cachedSnapshot = !objectIs(
          (currentHook || hook).memoizedState,
          getServerSnapshot
        ))
          hook.memoizedState = getServerSnapshot, didReceiveUpdate = true;
        hook = hook.queue;
        var create = subscribeToStore.bind(null, fiber, hook, subscribe);
        updateEffectImpl(2048, Passive, create, [subscribe]);
        if (hook.getSnapshot !== getSnapshot || cachedSnapshot || null !== workInProgressHook && workInProgressHook.memoizedState.tag & HasEffect) {
          fiber.flags |= 2048;
          pushSimpleEffect(
            HasEffect | Passive,
            createEffectInstance(),
            updateStoreInstance.bind(
              null,
              fiber,
              hook,
              getServerSnapshot,
              getSnapshot
            ),
            null
          );
          if (null === workInProgressRoot)
            throw Error(
              "Expected a work-in-progress root. This is a bug in React. Please file an issue."
            );
          isHydrating$jscomp$0 || 0 !== (renderLanes & 124) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
        }
        return getServerSnapshot;
      }
      function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
        fiber.flags |= 16384;
        fiber = { getSnapshot, value: renderedSnapshot };
        getSnapshot = currentlyRenderingFiber.updateQueue;
        null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
      }
      function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
        inst.value = nextSnapshot;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
      }
      function subscribeToStore(fiber, inst, subscribe) {
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
        });
      }
      function checkIfSnapshotChanged(inst) {
        var latestGetSnapshot = inst.getSnapshot;
        inst = inst.value;
        try {
          var nextValue = latestGetSnapshot();
          return !objectIs(inst, nextValue);
        } catch (error) {
          return true;
        }
      }
      function forceStoreRerender(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
      }
      function mountStateImpl(initialState) {
        var hook = mountWorkInProgressHook();
        if ("function" === typeof initialState) {
          var initialStateInitializer = initialState;
          initialState = initialStateInitializer();
          if (shouldDoubleInvokeUserFnsInHooksDEV) {
            setIsStrictModeForDevtools(true);
            try {
              initialStateInitializer();
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
        }
        hook.memoizedState = hook.baseState = initialState;
        hook.queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: basicStateReducer,
          lastRenderedState: initialState
        };
        return hook;
      }
      function mountState(initialState) {
        initialState = mountStateImpl(initialState);
        var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue);
        queue.dispatch = dispatch;
        return [initialState.memoizedState, dispatch];
      }
      function mountOptimistic(passthrough) {
        var hook = mountWorkInProgressHook();
        hook.memoizedState = hook.baseState = passthrough;
        var queue = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null
        };
        hook.queue = queue;
        hook = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          true,
          queue
        );
        queue.dispatch = hook;
        return [passthrough, hook];
      }
      function updateOptimistic(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
      }
      function updateOptimisticImpl(hook, current2, passthrough, reducer) {
        hook.baseState = passthrough;
        return updateReducerImpl(
          hook,
          currentHook,
          "function" === typeof reducer ? reducer : basicStateReducer
        );
      }
      function rerenderOptimistic(passthrough, reducer) {
        var hook = updateWorkInProgressHook();
        if (null !== currentHook)
          return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
        hook.baseState = passthrough;
        return [passthrough, hook.queue.dispatch];
      }
      function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
        if (isRenderPhaseUpdate(fiber))
          throw Error("Cannot update form state while rendering.");
        fiber = actionQueue.action;
        if (null !== fiber) {
          var actionNode = {
            payload,
            action: fiber,
            next: null,
            isTransition: true,
            status: "pending",
            value: null,
            reason: null,
            listeners: [],
            then: function(listener) {
              actionNode.listeners.push(listener);
            }
          };
          null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
          setState(actionNode);
          setPendingState = actionQueue.pending;
          null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
        }
      }
      function runActionStateAction(actionQueue, node) {
        var action = node.action, payload = node.payload, prevState = actionQueue.state;
        if (node.isTransition) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          ReactSharedInternals.T = currentTransition;
          ReactSharedInternals.T._updatedFibers = /* @__PURE__ */ new Set();
          try {
            var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            handleActionReturnValue(actionQueue, node, returnValue);
          } catch (error) {
            onActionError(actionQueue, node, error);
          } finally {
            ReactSharedInternals.T = prevTransition, null === prevTransition && currentTransition._updatedFibers && (actionQueue = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < actionQueue && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            ));
          }
        } else
          try {
            currentTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, currentTransition);
          } catch (error$4) {
            onActionError(actionQueue, node, error$4);
          }
      }
      function handleActionReturnValue(actionQueue, node, returnValue) {
        null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? (returnValue.then(
          function(nextState) {
            onActionSuccess(actionQueue, node, nextState);
          },
          function(error) {
            return onActionError(actionQueue, node, error);
          }
        ), node.isTransition || console.error(
          "An async function with useActionState was called outside of a transition. This is likely not what you intended (for example, isPending will not update correctly). Either call the returned function inside startTransition, or pass it to an `action` or `formAction` prop."
        )) : onActionSuccess(actionQueue, node, returnValue);
      }
      function onActionSuccess(actionQueue, actionNode, nextState) {
        actionNode.status = "fulfilled";
        actionNode.value = nextState;
        notifyActionListeners(actionNode);
        actionQueue.state = nextState;
        actionNode = actionQueue.pending;
        null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
      }
      function onActionError(actionQueue, actionNode, error) {
        var last = actionQueue.pending;
        actionQueue.pending = null;
        if (null !== last) {
          last = last.next;
          do
            actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
          while (actionNode !== last);
        }
        actionQueue.action = null;
      }
      function notifyActionListeners(actionNode) {
        actionNode = actionNode.listeners;
        for (var i = 0; i < actionNode.length; i++)
          (0, actionNode[i])();
      }
      function actionStateReducer(oldState, newState) {
        return newState;
      }
      function mountActionState(action, initialStateProp) {
        if (isHydrating) {
          var ssrFormState = workInProgressRoot.formState;
          if (null !== ssrFormState) {
            a: {
              var isMatching = currentlyRenderingFiber;
              if (isHydrating) {
                if (nextHydratableInstance) {
                  b: {
                    var markerInstance = nextHydratableInstance;
                    for (var inRootOrSingleton = rootOrSingletonContext; 8 !== markerInstance.nodeType; ) {
                      if (!inRootOrSingleton) {
                        markerInstance = null;
                        break b;
                      }
                      markerInstance = getNextHydratable(
                        markerInstance.nextSibling
                      );
                      if (null === markerInstance) {
                        markerInstance = null;
                        break b;
                      }
                    }
                    inRootOrSingleton = markerInstance.data;
                    markerInstance = inRootOrSingleton === FORM_STATE_IS_MATCHING || inRootOrSingleton === FORM_STATE_IS_NOT_MATCHING ? markerInstance : null;
                  }
                  if (markerInstance) {
                    nextHydratableInstance = getNextHydratable(
                      markerInstance.nextSibling
                    );
                    isMatching = markerInstance.data === FORM_STATE_IS_MATCHING;
                    break a;
                  }
                }
                throwOnHydrationMismatch(isMatching);
              }
              isMatching = false;
            }
            isMatching && (initialStateProp = ssrFormState[0]);
          }
        }
        ssrFormState = mountWorkInProgressHook();
        ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
        isMatching = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: actionStateReducer,
          lastRenderedState: initialStateProp
        };
        ssrFormState.queue = isMatching;
        ssrFormState = dispatchSetState.bind(
          null,
          currentlyRenderingFiber,
          isMatching
        );
        isMatching.dispatch = ssrFormState;
        isMatching = mountStateImpl(false);
        inRootOrSingleton = dispatchOptimisticSetState.bind(
          null,
          currentlyRenderingFiber,
          false,
          isMatching.queue
        );
        isMatching = mountWorkInProgressHook();
        markerInstance = {
          state: initialStateProp,
          dispatch: null,
          action,
          pending: null
        };
        isMatching.queue = markerInstance;
        ssrFormState = dispatchActionState.bind(
          null,
          currentlyRenderingFiber,
          markerInstance,
          inRootOrSingleton,
          ssrFormState
        );
        markerInstance.dispatch = ssrFormState;
        isMatching.memoizedState = action;
        return [initialStateProp, ssrFormState, false];
      }
      function updateActionState(action) {
        var stateHook = updateWorkInProgressHook();
        return updateActionStateImpl(stateHook, currentHook, action);
      }
      function updateActionStateImpl(stateHook, currentStateHook, action) {
        currentStateHook = updateReducerImpl(
          stateHook,
          currentStateHook,
          actionStateReducer
        )[0];
        stateHook = updateReducer(basicStateReducer)[0];
        if ("object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then)
          try {
            var state = useThenable(currentStateHook);
          } catch (x) {
            if (x === SuspenseException)
              throw SuspenseActionException;
            throw x;
          }
        else
          state = currentStateHook;
        currentStateHook = updateWorkInProgressHook();
        var actionQueue = currentStateHook.queue, dispatch = actionQueue.dispatch;
        action !== currentStateHook.memoizedState && (currentlyRenderingFiber.flags |= 2048, pushSimpleEffect(
          HasEffect | Passive,
          createEffectInstance(),
          actionStateActionEffect.bind(null, actionQueue, action),
          null
        ));
        return [state, dispatch, stateHook];
      }
      function actionStateActionEffect(actionQueue, action) {
        actionQueue.action = action;
      }
      function rerenderActionState(action) {
        var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
        if (null !== currentStateHook)
          return updateActionStateImpl(stateHook, currentStateHook, action);
        updateWorkInProgressHook();
        stateHook = stateHook.memoizedState;
        currentStateHook = updateWorkInProgressHook();
        var dispatch = currentStateHook.queue.dispatch;
        currentStateHook.memoizedState = action;
        return [stateHook, dispatch, false];
      }
      function pushSimpleEffect(tag, inst, create, createDeps) {
        tag = {
          tag,
          create,
          deps: createDeps,
          inst,
          next: null
        };
        inst = currentlyRenderingFiber.updateQueue;
        null === inst && (inst = createFunctionComponentUpdateQueue(), currentlyRenderingFiber.updateQueue = inst);
        create = inst.lastEffect;
        null === create ? inst.lastEffect = tag.next = tag : (createDeps = create.next, create.next = tag, tag.next = createDeps, inst.lastEffect = tag);
        return tag;
      }
      function createEffectInstance() {
        return { destroy: void 0, resource: void 0 };
      }
      function mountRef(initialValue) {
        var hook = mountWorkInProgressHook();
        initialValue = { current: initialValue };
        return hook.memoizedState = initialValue;
      }
      function mountEffectImpl(fiberFlags, hookFlags, create, createDeps) {
        var hook = mountWorkInProgressHook();
        createDeps = void 0 === createDeps ? null : createDeps;
        currentlyRenderingFiber.flags |= fiberFlags;
        hook.memoizedState = pushSimpleEffect(
          HasEffect | hookFlags,
          createEffectInstance(),
          create,
          createDeps
        );
      }
      function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var inst = hook.memoizedState.inst;
        null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushSimpleEffect(hookFlags, inst, create, deps) : (currentlyRenderingFiber.flags |= fiberFlags, hook.memoizedState = pushSimpleEffect(
          HasEffect | hookFlags,
          inst,
          create,
          deps
        ));
      }
      function mountEffect(create, createDeps) {
        (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode && (currentlyRenderingFiber.mode & NoStrictPassiveEffectsMode) === NoMode ? mountEffectImpl(276826112, Passive, create, createDeps) : mountEffectImpl(8390656, Passive, create, createDeps);
      }
      function mountLayoutEffect(create, deps) {
        var fiberFlags = 4194308;
        (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode && (fiberFlags |= 134217728);
        return mountEffectImpl(fiberFlags, Layout, create, deps);
      }
      function imperativeHandleEffect(create, ref) {
        if ("function" === typeof ref) {
          create = create();
          var refCleanup = ref(create);
          return function() {
            "function" === typeof refCleanup ? refCleanup() : ref(null);
          };
        }
        if (null !== ref && void 0 !== ref)
          return ref.hasOwnProperty("current") || console.error(
            "Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.",
            "an object with keys {" + Object.keys(ref).join(", ") + "}"
          ), create = create(), ref.current = create, function() {
            ref.current = null;
          };
      }
      function mountImperativeHandle(ref, create, deps) {
        "function" !== typeof create && console.error(
          "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
          null !== create ? typeof create : "null"
        );
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        var fiberFlags = 4194308;
        (currentlyRenderingFiber.mode & StrictEffectsMode) !== NoMode && (fiberFlags |= 134217728);
        mountEffectImpl(
          fiberFlags,
          Layout,
          imperativeHandleEffect.bind(null, create, ref),
          deps
        );
      }
      function updateImperativeHandle(ref, create, deps) {
        "function" !== typeof create && console.error(
          "Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",
          null !== create ? typeof create : "null"
        );
        deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
        updateEffectImpl(
          4,
          Layout,
          imperativeHandleEffect.bind(null, create, ref),
          deps
        );
      }
      function mountCallback(callback, deps) {
        mountWorkInProgressHook().memoizedState = [
          callback,
          void 0 === deps ? null : deps
        ];
        return callback;
      }
      function updateCallback(callback, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        hook.memoizedState = [callback, deps];
        return callback;
      }
      function mountMemo(nextCreate, deps) {
        var hook = mountWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var nextValue = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [nextValue, deps];
        return nextValue;
      }
      function updateMemo(nextCreate, deps) {
        var hook = updateWorkInProgressHook();
        deps = void 0 === deps ? null : deps;
        var prevState = hook.memoizedState;
        if (null !== deps && areHookInputsEqual(deps, prevState[1]))
          return prevState[0];
        prevState = nextCreate();
        if (shouldDoubleInvokeUserFnsInHooksDEV) {
          setIsStrictModeForDevtools(true);
          try {
            nextCreate();
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        hook.memoizedState = [prevState, deps];
        return prevState;
      }
      function mountDeferredValue(value, initialValue) {
        var hook = mountWorkInProgressHook();
        return mountDeferredValueImpl(hook, value, initialValue);
      }
      function updateDeferredValue(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return updateDeferredValueImpl(
          hook,
          currentHook.memoizedState,
          value,
          initialValue
        );
      }
      function rerenderDeferredValue(value, initialValue) {
        var hook = updateWorkInProgressHook();
        return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue) : updateDeferredValueImpl(
          hook,
          currentHook.memoizedState,
          value,
          initialValue
        );
      }
      function mountDeferredValueImpl(hook, value, initialValue) {
        if (void 0 === initialValue || 0 !== (renderLanes & 1073741824))
          return hook.memoizedState = value;
        hook.memoizedState = initialValue;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return initialValue;
      }
      function updateDeferredValueImpl(hook, prevValue, value, initialValue) {
        if (objectIs(value, prevValue))
          return value;
        if (null !== currentTreeHiddenStackCursor.current)
          return hook = mountDeferredValueImpl(hook, value, initialValue), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
        if (0 === (renderLanes & 42))
          return didReceiveUpdate = true, hook.memoizedState = value;
        hook = requestDeferredLane();
        currentlyRenderingFiber.lanes |= hook;
        workInProgressRootSkippedLanes |= hook;
        return prevValue;
      }
      function startTransition(fiber, queue, pendingState, finishedState, callback) {
        var previousPriority = ReactDOMSharedInternals.p;
        ReactDOMSharedInternals.p = 0 !== previousPriority && previousPriority < ContinuousEventPriority ? previousPriority : ContinuousEventPriority;
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        ReactSharedInternals.T = currentTransition;
        dispatchOptimisticSetState(fiber, false, queue, pendingState);
        currentTransition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
          null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
          if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
            var thenableForFinishedState = chainThenableValue(
              returnValue,
              finishedState
            );
            dispatchSetStateInternal(
              fiber,
              queue,
              thenableForFinishedState,
              requestUpdateLane(fiber)
            );
          } else
            dispatchSetStateInternal(
              fiber,
              queue,
              finishedState,
              requestUpdateLane(fiber)
            );
        } catch (error) {
          dispatchSetStateInternal(
            fiber,
            queue,
            { then: function() {
            }, status: "rejected", reason: error },
            requestUpdateLane(fiber)
          );
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, null === prevTransition && currentTransition._updatedFibers && (fiber = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < fiber && console.warn(
            "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
          ));
        }
      }
      function startHostTransition(formFiber, pendingState, action, formData) {
        if (5 !== formFiber.tag)
          throw Error(
            "Expected the form instance to be a HostComponent. This is a bug in React."
          );
        var queue = ensureFormComponentIsStateful(formFiber).queue;
        startTransition(
          formFiber,
          queue,
          pendingState,
          NotPendingTransition,
          null === action ? noop$2 : function() {
            requestFormReset$1(formFiber);
            return action(formData);
          }
        );
      }
      function ensureFormComponentIsStateful(formFiber) {
        var existingStateHook = formFiber.memoizedState;
        if (null !== existingStateHook)
          return existingStateHook;
        existingStateHook = {
          memoizedState: NotPendingTransition,
          baseState: NotPendingTransition,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: NotPendingTransition
          },
          next: null
        };
        var initialResetState = {};
        existingStateHook.next = {
          memoizedState: initialResetState,
          baseState: initialResetState,
          baseQueue: null,
          queue: {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: basicStateReducer,
            lastRenderedState: initialResetState
          },
          next: null
        };
        formFiber.memoizedState = existingStateHook;
        formFiber = formFiber.alternate;
        null !== formFiber && (formFiber.memoizedState = existingStateHook);
        return existingStateHook;
      }
      function requestFormReset$1(formFiber) {
        null === ReactSharedInternals.T && console.error(
          "requestFormReset was called outside a transition or action. To fix, move to an action, or wrap with startTransition."
        );
        var resetStateQueue = ensureFormComponentIsStateful(formFiber).next.queue;
        dispatchSetStateInternal(
          formFiber,
          resetStateQueue,
          {},
          requestUpdateLane(formFiber)
        );
      }
      function mountTransition() {
        var stateHook = mountStateImpl(false);
        stateHook = startTransition.bind(
          null,
          currentlyRenderingFiber,
          stateHook.queue,
          true,
          false
        );
        mountWorkInProgressHook().memoizedState = stateHook;
        return [false, stateHook];
      }
      function updateTransition() {
        var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      }
      function rerenderTransition() {
        var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
        return [
          "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
          start
        ];
      }
      function useHostTransitionStatus() {
        return readContext(HostTransitionContext);
      }
      function mountId() {
        var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
        if (isHydrating) {
          var treeId = treeContextOverflow;
          var idWithLeadingBit = treeContextId;
          treeId = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + treeId;
          identifierPrefix = "«" + identifierPrefix + "R" + treeId;
          treeId = localIdCounter++;
          0 < treeId && (identifierPrefix += "H" + treeId.toString(32));
          identifierPrefix += "»";
        } else
          treeId = globalClientIdCounter++, identifierPrefix = "«" + identifierPrefix + "r" + treeId.toString(32) + "»";
        return hook.memoizedState = identifierPrefix;
      }
      function mountRefresh() {
        return mountWorkInProgressHook().memoizedState = refreshCache.bind(
          null,
          currentlyRenderingFiber
        );
      }
      function refreshCache(fiber, seedKey) {
        for (var provider = fiber.return; null !== provider; ) {
          switch (provider.tag) {
            case 24:
            case 3:
              var lane = requestUpdateLane(provider);
              fiber = createUpdate(lane);
              var root2 = enqueueUpdate(provider, fiber, lane);
              null !== root2 && (scheduleUpdateOnFiber(root2, provider, lane), entangleTransitions(root2, provider, lane));
              provider = createCache();
              null !== seedKey && void 0 !== seedKey && null !== root2 && console.error(
                "The seed argument is not enabled outside experimental channels."
              );
              fiber.payload = { cache: provider };
              return;
          }
          provider = provider.return;
        }
      }
      function dispatchReducerAction(fiber, queue, action) {
        var args = arguments;
        "function" === typeof args[3] && console.error(
          "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
        );
        args = requestUpdateLane(fiber);
        var update = {
          lane: args,
          revertLane: 0,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, update) : (update = enqueueConcurrentHookUpdate(fiber, queue, update, args), null !== update && (scheduleUpdateOnFiber(update, fiber, args), entangleTransitionUpdate(update, queue, args)));
        markStateUpdateScheduled(fiber, args);
      }
      function dispatchSetState(fiber, queue, action) {
        var args = arguments;
        "function" === typeof args[3] && console.error(
          "State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect()."
        );
        args = requestUpdateLane(fiber);
        dispatchSetStateInternal(fiber, queue, action, args);
        markStateUpdateScheduled(fiber, args);
      }
      function dispatchSetStateInternal(fiber, queue, action, lane) {
        var update = {
          lane,
          revertLane: 0,
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber))
          enqueueRenderPhaseUpdate(queue, update);
        else {
          var alternate = fiber.alternate;
          if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate)) {
            var prevDispatcher = ReactSharedInternals.H;
            ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
            try {
              var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
              update.hasEagerState = true;
              update.eagerState = eagerState;
              if (objectIs(eagerState, currentState))
                return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
            } catch (error) {
            } finally {
              ReactSharedInternals.H = prevDispatcher;
            }
          }
          action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
          if (null !== action)
            return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
        }
        return false;
      }
      function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
        null === ReactSharedInternals.T && 0 === currentEntangledLane && console.error(
          "An optimistic state update occurred outside a transition or action. To fix, move the update to an action, or wrap with startTransition."
        );
        action = {
          lane: 2,
          revertLane: requestTransitionLane(),
          action,
          hasEagerState: false,
          eagerState: null,
          next: null
        };
        if (isRenderPhaseUpdate(fiber)) {
          if (throwIfDuringRender)
            throw Error("Cannot update optimistic state while rendering.");
          console.error("Cannot call startTransition while rendering.");
        } else
          throwIfDuringRender = enqueueConcurrentHookUpdate(
            fiber,
            queue,
            action,
            2
          ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
        markStateUpdateScheduled(fiber, 2);
      }
      function isRenderPhaseUpdate(fiber) {
        var alternate = fiber.alternate;
        return fiber === currentlyRenderingFiber || null !== alternate && alternate === currentlyRenderingFiber;
      }
      function enqueueRenderPhaseUpdate(queue, update) {
        didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
        var pending = queue.pending;
        null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
        queue.pending = update;
      }
      function entangleTransitionUpdate(root2, queue, lane) {
        if (0 !== (lane & 4194048)) {
          var queueLanes = queue.lanes;
          queueLanes &= root2.pendingLanes;
          lane |= queueLanes;
          queue.lanes = lane;
          markRootEntangled(root2, lane);
        }
      }
      function pushDebugInfo(debugInfo) {
        var previousDebugInfo = currentDebugInfo;
        null != debugInfo && (currentDebugInfo = null === previousDebugInfo ? debugInfo : previousDebugInfo.concat(debugInfo));
        return previousDebugInfo;
      }
      function validateFragmentProps(element, fiber, returnFiber) {
        for (var keys = Object.keys(element.props), i = 0; i < keys.length; i++) {
          var key = keys[i];
          if ("children" !== key && "key" !== key) {
            null === fiber && (fiber = createFiberFromElement(element, returnFiber.mode, 0), fiber._debugInfo = currentDebugInfo, fiber.return = returnFiber);
            runWithFiberInDEV(
              fiber,
              function(erroredKey) {
                console.error(
                  "Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",
                  erroredKey
                );
              },
              key
            );
            break;
          }
        }
      }
      function unwrapThenable(thenable) {
        var index = thenableIndexCounter;
        thenableIndexCounter += 1;
        null === thenableState && (thenableState = createThenableState());
        return trackUsedThenable(thenableState, thenable, index);
      }
      function coerceRef(workInProgress2, element) {
        element = element.props.ref;
        workInProgress2.ref = void 0 !== element ? element : null;
      }
      function throwOnInvalidObjectType(returnFiber, newChild) {
        if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
          throw Error(
            'A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.'
          );
        returnFiber = Object.prototype.toString.call(newChild);
        throw Error(
          "Objects are not valid as a React child (found: " + ("[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber) + "). If you meant to render a collection of children, use an array instead."
        );
      }
      function warnOnFunctionType(returnFiber, invalidChild) {
        var parentName = getComponentNameFromFiber(returnFiber) || "Component";
        ownerHasFunctionTypeWarning[parentName] || (ownerHasFunctionTypeWarning[parentName] = true, invalidChild = invalidChild.displayName || invalidChild.name || "Component", 3 === returnFiber.tag ? console.error(
          "Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  root.render(%s)",
          invalidChild,
          invalidChild,
          invalidChild
        ) : console.error(
          "Functions are not valid as a React child. This may happen if you return %s instead of <%s /> from render. Or maybe you meant to call this function rather than return it.\n  <%s>{%s}</%s>",
          invalidChild,
          invalidChild,
          parentName,
          invalidChild,
          parentName
        ));
      }
      function warnOnSymbolType(returnFiber, invalidChild) {
        var parentName = getComponentNameFromFiber(returnFiber) || "Component";
        ownerHasSymbolTypeWarning[parentName] || (ownerHasSymbolTypeWarning[parentName] = true, invalidChild = String(invalidChild), 3 === returnFiber.tag ? console.error(
          "Symbols are not valid as a React child.\n  root.render(%s)",
          invalidChild
        ) : console.error(
          "Symbols are not valid as a React child.\n  <%s>%s</%s>",
          parentName,
          invalidChild,
          parentName
        ));
      }
      function createChildReconciler(shouldTrackSideEffects) {
        function deleteChild(returnFiber, childToDelete) {
          if (shouldTrackSideEffects) {
            var deletions = returnFiber.deletions;
            null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
          }
        }
        function deleteRemainingChildren(returnFiber, currentFirstChild) {
          if (!shouldTrackSideEffects)
            return null;
          for (; null !== currentFirstChild; )
            deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return null;
        }
        function mapRemainingChildren(currentFirstChild) {
          for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
            null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
          return existingChildren;
        }
        function useFiber(fiber, pendingProps) {
          fiber = createWorkInProgress(fiber, pendingProps);
          fiber.index = 0;
          fiber.sibling = null;
          return fiber;
        }
        function placeChild(newFiber, lastPlacedIndex, newIndex) {
          newFiber.index = newIndex;
          if (!shouldTrackSideEffects)
            return newFiber.flags |= 1048576, lastPlacedIndex;
          newIndex = newFiber.alternate;
          if (null !== newIndex)
            return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 67108866, lastPlacedIndex) : newIndex;
          newFiber.flags |= 67108866;
          return lastPlacedIndex;
        }
        function placeSingleChild(newFiber) {
          shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 67108866);
          return newFiber;
        }
        function updateTextNode(returnFiber, current2, textContent, lanes) {
          if (null === current2 || 6 !== current2.tag)
            return current2 = createFiberFromText(
              textContent,
              returnFiber.mode,
              lanes
            ), current2.return = returnFiber, current2._debugOwner = returnFiber, current2._debugTask = returnFiber._debugTask, current2._debugInfo = currentDebugInfo, current2;
          current2 = useFiber(current2, textContent);
          current2.return = returnFiber;
          current2._debugInfo = currentDebugInfo;
          return current2;
        }
        function updateElement(returnFiber, current2, element, lanes) {
          var elementType = element.type;
          if (elementType === REACT_FRAGMENT_TYPE)
            return current2 = updateFragment(
              returnFiber,
              current2,
              element.props.children,
              lanes,
              element.key
            ), validateFragmentProps(element, current2, returnFiber), current2;
          if (null !== current2 && (current2.elementType === elementType || isCompatibleFamilyForHotReloading(current2, element) || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && callLazyInitInDEV(elementType) === current2.type))
            return current2 = useFiber(current2, element.props), coerceRef(current2, element), current2.return = returnFiber, current2._debugOwner = element._owner, current2._debugInfo = currentDebugInfo, current2;
          current2 = createFiberFromElement(element, returnFiber.mode, lanes);
          coerceRef(current2, element);
          current2.return = returnFiber;
          current2._debugInfo = currentDebugInfo;
          return current2;
        }
        function updatePortal(returnFiber, current2, portal, lanes) {
          if (null === current2 || 4 !== current2.tag || current2.stateNode.containerInfo !== portal.containerInfo || current2.stateNode.implementation !== portal.implementation)
            return current2 = createFiberFromPortal(portal, returnFiber.mode, lanes), current2.return = returnFiber, current2._debugInfo = currentDebugInfo, current2;
          current2 = useFiber(current2, portal.children || []);
          current2.return = returnFiber;
          current2._debugInfo = currentDebugInfo;
          return current2;
        }
        function updateFragment(returnFiber, current2, fragment, lanes, key) {
          if (null === current2 || 7 !== current2.tag)
            return current2 = createFiberFromFragment(
              fragment,
              returnFiber.mode,
              lanes,
              key
            ), current2.return = returnFiber, current2._debugOwner = returnFiber, current2._debugTask = returnFiber._debugTask, current2._debugInfo = currentDebugInfo, current2;
          current2 = useFiber(current2, fragment);
          current2.return = returnFiber;
          current2._debugInfo = currentDebugInfo;
          return current2;
        }
        function createChild(returnFiber, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return newChild = createFiberFromText(
              "" + newChild,
              returnFiber.mode,
              lanes
            ), newChild.return = returnFiber, newChild._debugOwner = returnFiber, newChild._debugTask = returnFiber._debugTask, newChild._debugInfo = currentDebugInfo, newChild;
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return lanes = createFiberFromElement(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = pushDebugInfo(newChild._debugInfo), lanes._debugInfo = currentDebugInfo, currentDebugInfo = returnFiber, lanes;
              case REACT_PORTAL_TYPE:
                return newChild = createFiberFromPortal(
                  newChild,
                  returnFiber.mode,
                  lanes
                ), newChild.return = returnFiber, newChild._debugInfo = currentDebugInfo, newChild;
              case REACT_LAZY_TYPE:
                var _prevDebugInfo = pushDebugInfo(newChild._debugInfo);
                newChild = callLazyInitInDEV(newChild);
                returnFiber = createChild(returnFiber, newChild, lanes);
                currentDebugInfo = _prevDebugInfo;
                return returnFiber;
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return lanes = createFiberFromFragment(
                newChild,
                returnFiber.mode,
                lanes,
                null
              ), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, returnFiber = pushDebugInfo(newChild._debugInfo), lanes._debugInfo = currentDebugInfo, currentDebugInfo = returnFiber, lanes;
            if ("function" === typeof newChild.then)
              return _prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = createChild(
                returnFiber,
                unwrapThenable(newChild),
                lanes
              ), currentDebugInfo = _prevDebugInfo, returnFiber;
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return createChild(
                returnFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          "function" === typeof newChild && warnOnFunctionType(returnFiber, newChild);
          "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
          return null;
        }
        function updateSlot(returnFiber, oldFiber, newChild, lanes) {
          var key = null !== oldFiber ? oldFiber.key : null;
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newChild.key === key ? (key = pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(
                  returnFiber,
                  oldFiber,
                  newChild,
                  lanes
                ), currentDebugInfo = key, returnFiber) : null;
              case REACT_PORTAL_TYPE:
                return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
              case REACT_LAZY_TYPE:
                return key = pushDebugInfo(newChild._debugInfo), newChild = callLazyInitInDEV(newChild), returnFiber = updateSlot(
                  returnFiber,
                  oldFiber,
                  newChild,
                  lanes
                ), currentDebugInfo = key, returnFiber;
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild)) {
              if (null !== key)
                return null;
              key = pushDebugInfo(newChild._debugInfo);
              returnFiber = updateFragment(
                returnFiber,
                oldFiber,
                newChild,
                lanes,
                null
              );
              currentDebugInfo = key;
              return returnFiber;
            }
            if ("function" === typeof newChild.then)
              return key = pushDebugInfo(newChild._debugInfo), returnFiber = updateSlot(
                returnFiber,
                oldFiber,
                unwrapThenable(newChild),
                lanes
              ), currentDebugInfo = key, returnFiber;
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateSlot(
                returnFiber,
                oldFiber,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          "function" === typeof newChild && warnOnFunctionType(returnFiber, newChild);
          "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
          return null;
        }
        function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                return newIdx = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, existingChildren = pushDebugInfo(newChild._debugInfo), returnFiber = updateElement(
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                ), currentDebugInfo = existingChildren, returnFiber;
              case REACT_PORTAL_TYPE:
                return existingChildren = existingChildren.get(
                  null === newChild.key ? newIdx : newChild.key
                ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
              case REACT_LAZY_TYPE:
                var _prevDebugInfo7 = pushDebugInfo(newChild._debugInfo);
                newChild = callLazyInitInDEV(newChild);
                returnFiber = updateFromMap(
                  existingChildren,
                  returnFiber,
                  newIdx,
                  newChild,
                  lanes
                );
                currentDebugInfo = _prevDebugInfo7;
                return returnFiber;
            }
            if (isArrayImpl(newChild) || getIteratorFn(newChild))
              return newIdx = existingChildren.get(newIdx) || null, existingChildren = pushDebugInfo(newChild._debugInfo), returnFiber = updateFragment(
                returnFiber,
                newIdx,
                newChild,
                lanes,
                null
              ), currentDebugInfo = existingChildren, returnFiber;
            if ("function" === typeof newChild.then)
              return _prevDebugInfo7 = pushDebugInfo(newChild._debugInfo), returnFiber = updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                unwrapThenable(newChild),
                lanes
              ), currentDebugInfo = _prevDebugInfo7, returnFiber;
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return updateFromMap(
                existingChildren,
                returnFiber,
                newIdx,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          "function" === typeof newChild && warnOnFunctionType(returnFiber, newChild);
          "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
          return null;
        }
        function warnOnInvalidKey(returnFiber, workInProgress2, child, knownKeys) {
          if ("object" !== typeof child || null === child)
            return knownKeys;
          switch (child.$$typeof) {
            case REACT_ELEMENT_TYPE:
            case REACT_PORTAL_TYPE:
              warnForMissingKey(returnFiber, workInProgress2, child);
              var key = child.key;
              if ("string" !== typeof key)
                break;
              if (null === knownKeys) {
                knownKeys = /* @__PURE__ */ new Set();
                knownKeys.add(key);
                break;
              }
              if (!knownKeys.has(key)) {
                knownKeys.add(key);
                break;
              }
              runWithFiberInDEV(workInProgress2, function() {
                console.error(
                  "Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",
                  key
                );
              });
              break;
            case REACT_LAZY_TYPE:
              child = callLazyInitInDEV(child), warnOnInvalidKey(returnFiber, workInProgress2, child, knownKeys);
          }
          return knownKeys;
        }
        function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
          for (var knownKeys = null, resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(
              returnFiber,
              oldFiber,
              newChildren[newIdx],
              lanes
            );
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            knownKeys = warnOnInvalidKey(
              returnFiber,
              newFiber,
              newChildren[newIdx],
              knownKeys
            );
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (newIdx === newChildren.length)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; newIdx < newChildren.length; newIdx++)
              oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (knownKeys = warnOnInvalidKey(
                returnFiber,
                oldFiber,
                newChildren[newIdx],
                knownKeys
              ), currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              newChildren[newIdx],
              lanes
            ), null !== nextOldFiber && (knownKeys = warnOnInvalidKey(
              returnFiber,
              nextOldFiber,
              newChildren[newIdx],
              knownKeys
            ), shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
          if (null == newChildren)
            throw Error("An iterable object provided no iterator.");
          for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, knownKeys = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
            oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
            var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
            if (null === newFiber) {
              null === oldFiber && (oldFiber = nextOldFiber);
              break;
            }
            knownKeys = warnOnInvalidKey(
              returnFiber,
              newFiber,
              step.value,
              knownKeys
            );
            shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
            currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
            null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
            previousNewFiber = newFiber;
            oldFiber = nextOldFiber;
          }
          if (step.done)
            return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
          if (null === oldFiber) {
            for (; !step.done; newIdx++, step = newChildren.next())
              oldFiber = createChild(returnFiber, step.value, lanes), null !== oldFiber && (knownKeys = warnOnInvalidKey(
                returnFiber,
                oldFiber,
                step.value,
                knownKeys
              ), currentFirstChild = placeChild(
                oldFiber,
                currentFirstChild,
                newIdx
              ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
            isHydrating && pushTreeFork(returnFiber, newIdx);
            return resultingFirstChild;
          }
          for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
            nextOldFiber = updateFromMap(
              oldFiber,
              returnFiber,
              newIdx,
              step.value,
              lanes
            ), null !== nextOldFiber && (knownKeys = warnOnInvalidKey(
              returnFiber,
              nextOldFiber,
              step.value,
              knownKeys
            ), shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ), currentFirstChild = placeChild(
              nextOldFiber,
              currentFirstChild,
              newIdx
            ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
          shouldTrackSideEffects && oldFiber.forEach(function(child) {
            return deleteChild(returnFiber, child);
          });
          isHydrating && pushTreeFork(returnFiber, newIdx);
          return resultingFirstChild;
        }
        function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
          "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (validateFragmentProps(newChild, null, returnFiber), newChild = newChild.props.children);
          if ("object" === typeof newChild && null !== newChild) {
            switch (newChild.$$typeof) {
              case REACT_ELEMENT_TYPE:
                var prevDebugInfo = pushDebugInfo(newChild._debugInfo);
                a: {
                  for (var key = newChild.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === key) {
                      key = newChild.type;
                      if (key === REACT_FRAGMENT_TYPE) {
                        if (7 === currentFirstChild.tag) {
                          deleteRemainingChildren(
                            returnFiber,
                            currentFirstChild.sibling
                          );
                          lanes = useFiber(
                            currentFirstChild,
                            newChild.props.children
                          );
                          lanes.return = returnFiber;
                          lanes._debugOwner = newChild._owner;
                          lanes._debugInfo = currentDebugInfo;
                          validateFragmentProps(newChild, lanes, returnFiber);
                          returnFiber = lanes;
                          break a;
                        }
                      } else if (currentFirstChild.elementType === key || isCompatibleFamilyForHotReloading(
                        currentFirstChild,
                        newChild
                      ) || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && callLazyInitInDEV(key) === currentFirstChild.type) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(currentFirstChild, newChild.props);
                        coerceRef(lanes, newChild);
                        lanes.return = returnFiber;
                        lanes._debugOwner = newChild._owner;
                        lanes._debugInfo = currentDebugInfo;
                        returnFiber = lanes;
                        break a;
                      }
                      deleteRemainingChildren(returnFiber, currentFirstChild);
                      break;
                    } else
                      deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
                    newChild.props.children,
                    returnFiber.mode,
                    lanes,
                    newChild.key
                  ), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = currentDebugInfo, validateFragmentProps(newChild, lanes, returnFiber), returnFiber = lanes) : (lanes = createFiberFromElement(
                    newChild,
                    returnFiber.mode,
                    lanes
                  ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes._debugInfo = currentDebugInfo, returnFiber = lanes);
                }
                returnFiber = placeSingleChild(returnFiber);
                currentDebugInfo = prevDebugInfo;
                return returnFiber;
              case REACT_PORTAL_TYPE:
                a: {
                  prevDebugInfo = newChild;
                  for (newChild = prevDebugInfo.key; null !== currentFirstChild; ) {
                    if (currentFirstChild.key === newChild)
                      if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === prevDebugInfo.containerInfo && currentFirstChild.stateNode.implementation === prevDebugInfo.implementation) {
                        deleteRemainingChildren(
                          returnFiber,
                          currentFirstChild.sibling
                        );
                        lanes = useFiber(
                          currentFirstChild,
                          prevDebugInfo.children || []
                        );
                        lanes.return = returnFiber;
                        returnFiber = lanes;
                        break a;
                      } else {
                        deleteRemainingChildren(returnFiber, currentFirstChild);
                        break;
                      }
                    else
                      deleteChild(returnFiber, currentFirstChild);
                    currentFirstChild = currentFirstChild.sibling;
                  }
                  lanes = createFiberFromPortal(
                    prevDebugInfo,
                    returnFiber.mode,
                    lanes
                  );
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                }
                return placeSingleChild(returnFiber);
              case REACT_LAZY_TYPE:
                return prevDebugInfo = pushDebugInfo(newChild._debugInfo), newChild = callLazyInitInDEV(newChild), returnFiber = reconcileChildFibersImpl(
                  returnFiber,
                  currentFirstChild,
                  newChild,
                  lanes
                ), currentDebugInfo = prevDebugInfo, returnFiber;
            }
            if (isArrayImpl(newChild))
              return prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildrenArray(
                returnFiber,
                currentFirstChild,
                newChild,
                lanes
              ), currentDebugInfo = prevDebugInfo, returnFiber;
            if (getIteratorFn(newChild)) {
              prevDebugInfo = pushDebugInfo(newChild._debugInfo);
              key = getIteratorFn(newChild);
              if ("function" !== typeof key)
                throw Error(
                  "An object is not an iterable. This error is likely caused by a bug in React. Please file an issue."
                );
              var newChildren = key.call(newChild);
              if (newChildren === newChild) {
                if (0 !== returnFiber.tag || "[object GeneratorFunction]" !== Object.prototype.toString.call(returnFiber.type) || "[object Generator]" !== Object.prototype.toString.call(newChildren))
                  didWarnAboutGenerators || console.error(
                    "Using Iterators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. You can also use an Iterable that can iterate multiple times over the same items."
                  ), didWarnAboutGenerators = true;
              } else
                newChild.entries !== key || didWarnAboutMaps || (console.error(
                  "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
                ), didWarnAboutMaps = true);
              returnFiber = reconcileChildrenIterator(
                returnFiber,
                currentFirstChild,
                newChildren,
                lanes
              );
              currentDebugInfo = prevDebugInfo;
              return returnFiber;
            }
            if ("function" === typeof newChild.then)
              return prevDebugInfo = pushDebugInfo(newChild._debugInfo), returnFiber = reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                unwrapThenable(newChild),
                lanes
              ), currentDebugInfo = prevDebugInfo, returnFiber;
            if (newChild.$$typeof === REACT_CONTEXT_TYPE)
              return reconcileChildFibersImpl(
                returnFiber,
                currentFirstChild,
                readContextDuringReconciliation(returnFiber, newChild),
                lanes
              );
            throwOnInvalidObjectType(returnFiber, newChild);
          }
          if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
            return prevDebugInfo = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(
              returnFiber,
              currentFirstChild.sibling
            ), lanes = useFiber(currentFirstChild, prevDebugInfo), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(
              prevDebugInfo,
              returnFiber.mode,
              lanes
            ), lanes.return = returnFiber, lanes._debugOwner = returnFiber, lanes._debugTask = returnFiber._debugTask, lanes._debugInfo = currentDebugInfo, returnFiber = lanes), placeSingleChild(returnFiber);
          "function" === typeof newChild && warnOnFunctionType(returnFiber, newChild);
          "symbol" === typeof newChild && warnOnSymbolType(returnFiber, newChild);
          return deleteRemainingChildren(returnFiber, currentFirstChild);
        }
        return function(returnFiber, currentFirstChild, newChild, lanes) {
          var prevDebugInfo = currentDebugInfo;
          currentDebugInfo = null;
          try {
            thenableIndexCounter = 0;
            var firstChildFiber = reconcileChildFibersImpl(
              returnFiber,
              currentFirstChild,
              newChild,
              lanes
            );
            thenableState = null;
            return firstChildFiber;
          } catch (x) {
            if (x === SuspenseException || x === SuspenseActionException)
              throw x;
            var fiber = createFiber(29, x, null, returnFiber.mode);
            fiber.lanes = lanes;
            fiber.return = returnFiber;
            var debugInfo = fiber._debugInfo = currentDebugInfo;
            fiber._debugOwner = returnFiber._debugOwner;
            fiber._debugTask = returnFiber._debugTask;
            if (null != debugInfo) {
              for (var i = debugInfo.length - 1; 0 <= i; i--)
                if ("string" === typeof debugInfo[i].stack) {
                  fiber._debugOwner = debugInfo[i];
                  fiber._debugTask = debugInfo[i].debugTask;
                  break;
                }
            }
            return fiber;
          } finally {
            currentDebugInfo = prevDebugInfo;
          }
        };
      }
      function pushPrimaryTreeSuspenseHandler(handler) {
        var current2 = handler.alternate;
        push(
          suspenseStackCursor,
          suspenseStackCursor.current & SubtreeSuspenseContextMask,
          handler
        );
        push(suspenseHandlerStackCursor, handler, handler);
        null === shellBoundary && (null === current2 || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current2.memoizedState && (shellBoundary = handler));
      }
      function pushOffscreenSuspenseHandler(fiber) {
        if (22 === fiber.tag) {
          if (push(suspenseStackCursor, suspenseStackCursor.current, fiber), push(suspenseHandlerStackCursor, fiber, fiber), null === shellBoundary) {
            var current2 = fiber.alternate;
            null !== current2 && null !== current2.memoizedState && (shellBoundary = fiber);
          }
        } else
          reuseSuspenseHandlerOnStack(fiber);
      }
      function reuseSuspenseHandlerOnStack(fiber) {
        push(suspenseStackCursor, suspenseStackCursor.current, fiber);
        push(
          suspenseHandlerStackCursor,
          suspenseHandlerStackCursor.current,
          fiber
        );
      }
      function popSuspenseHandler(fiber) {
        pop(suspenseHandlerStackCursor, fiber);
        shellBoundary === fiber && (shellBoundary = null);
        pop(suspenseStackCursor, fiber);
      }
      function findFirstSuspended(row) {
        for (var node = row; null !== node; ) {
          if (13 === node.tag) {
            var state = node.memoizedState;
            if (null !== state && (state = state.dehydrated, null === state || state.data === SUSPENSE_PENDING_START_DATA || isSuspenseInstanceFallback(state)))
              return node;
          } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
            if (0 !== (node.flags & 128))
              return node;
          } else if (null !== node.child) {
            node.child.return = node;
            node = node.child;
            continue;
          }
          if (node === row)
            break;
          for (; null === node.sibling; ) {
            if (null === node.return || node.return === row)
              return null;
            node = node.return;
          }
          node.sibling.return = node.return;
          node = node.sibling;
        }
        return null;
      }
      function warnOnInvalidCallback(callback) {
        if (null !== callback && "function" !== typeof callback) {
          var key = String(callback);
          didWarnOnInvalidCallback.has(key) || (didWarnOnInvalidCallback.add(key), console.error(
            "Expected the last optional `callback` argument to be a function. Instead received: %s.",
            callback
          ));
        }
      }
      function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
        var prevState = workInProgress2.memoizedState, partialState = getDerivedStateFromProps(nextProps, prevState);
        if (workInProgress2.mode & StrictLegacyMode) {
          setIsStrictModeForDevtools(true);
          try {
            partialState = getDerivedStateFromProps(nextProps, prevState);
          } finally {
            setIsStrictModeForDevtools(false);
          }
        }
        void 0 === partialState && (ctor = getComponentNameFromType(ctor) || "Component", didWarnAboutUndefinedDerivedState.has(ctor) || (didWarnAboutUndefinedDerivedState.add(ctor), console.error(
          "%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",
          ctor
        )));
        prevState = null === partialState || void 0 === partialState ? prevState : assign({}, prevState, partialState);
        workInProgress2.memoizedState = prevState;
        0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = prevState);
      }
      function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
        var instance = workInProgress2.stateNode;
        if ("function" === typeof instance.shouldComponentUpdate) {
          oldProps = instance.shouldComponentUpdate(
            newProps,
            newState,
            nextContext
          );
          if (workInProgress2.mode & StrictLegacyMode) {
            setIsStrictModeForDevtools(true);
            try {
              oldProps = instance.shouldComponentUpdate(
                newProps,
                newState,
                nextContext
              );
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          void 0 === oldProps && console.error(
            "%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",
            getComponentNameFromType(ctor) || "Component"
          );
          return oldProps;
        }
        return ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
      }
      function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
        var oldState = instance.state;
        "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
        "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
        instance.state !== oldState && (workInProgress2 = getComponentNameFromFiber(workInProgress2) || "Component", didWarnAboutStateAssignmentForComponent.has(workInProgress2) || (didWarnAboutStateAssignmentForComponent.add(workInProgress2), console.error(
          "%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
          workInProgress2
        )), classComponentUpdater.enqueueReplaceState(
          instance,
          instance.state,
          null
        ));
      }
      function resolveClassComponentProps(Component, baseProps) {
        var newProps = baseProps;
        if ("ref" in baseProps) {
          newProps = {};
          for (var propName in baseProps)
            "ref" !== propName && (newProps[propName] = baseProps[propName]);
        }
        if (Component = Component.defaultProps) {
          newProps === baseProps && (newProps = assign({}, newProps));
          for (var _propName in Component)
            void 0 === newProps[_propName] && (newProps[_propName] = Component[_propName]);
        }
        return newProps;
      }
      function defaultOnUncaughtError(error) {
        reportGlobalError(error);
        console.warn(
          "%s\n\n%s\n",
          componentName ? "An error occurred in the <" + componentName + "> component." : "An error occurred in one of your React components.",
          "Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://react.dev/link/error-boundaries to learn more about error boundaries."
        );
      }
      function defaultOnCaughtError(error) {
        var componentNameMessage = componentName ? "The above error occurred in the <" + componentName + "> component." : "The above error occurred in one of your React components.", recreateMessage = "React will try to recreate this component tree from scratch using the error boundary you provided, " + ((errorBoundaryName || "Anonymous") + ".");
        if ("object" === typeof error && null !== error && "string" === typeof error.environmentName) {
          var JSCompiler_inline_result = error.environmentName;
          error = [
            "%o\n\n%s\n\n%s\n",
            error,
            componentNameMessage,
            recreateMessage
          ].slice(0);
          "string" === typeof error[0] ? error.splice(
            0,
            1,
            badgeFormat + error[0],
            badgeStyle,
            pad + JSCompiler_inline_result + pad,
            resetStyle
          ) : error.splice(
            0,
            0,
            badgeFormat,
            badgeStyle,
            pad + JSCompiler_inline_result + pad,
            resetStyle
          );
          error.unshift(console);
          JSCompiler_inline_result = bind.apply(console.error, error);
          JSCompiler_inline_result();
        } else
          console.error(
            "%o\n\n%s\n\n%s\n",
            error,
            componentNameMessage,
            recreateMessage
          );
      }
      function defaultOnRecoverableError(error) {
        reportGlobalError(error);
      }
      function logUncaughtError(root2, errorInfo) {
        try {
          componentName = errorInfo.source ? getComponentNameFromFiber(errorInfo.source) : null;
          errorBoundaryName = null;
          var error = errorInfo.value;
          if (null !== ReactSharedInternals.actQueue)
            ReactSharedInternals.thrownErrors.push(error);
          else {
            var onUncaughtError = root2.onUncaughtError;
            onUncaughtError(error, { componentStack: errorInfo.stack });
          }
        } catch (e$5) {
          setTimeout(function() {
            throw e$5;
          });
        }
      }
      function logCaughtError(root2, boundary, errorInfo) {
        try {
          componentName = errorInfo.source ? getComponentNameFromFiber(errorInfo.source) : null;
          errorBoundaryName = getComponentNameFromFiber(boundary);
          var onCaughtError = root2.onCaughtError;
          onCaughtError(errorInfo.value, {
            componentStack: errorInfo.stack,
            errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
          });
        } catch (e$6) {
          setTimeout(function() {
            throw e$6;
          });
        }
      }
      function createRootErrorUpdate(root2, errorInfo, lane) {
        lane = createUpdate(lane);
        lane.tag = CaptureUpdate;
        lane.payload = { element: null };
        lane.callback = function() {
          runWithFiberInDEV(errorInfo.source, logUncaughtError, root2, errorInfo);
        };
        return lane;
      }
      function createClassErrorUpdate(lane) {
        lane = createUpdate(lane);
        lane.tag = CaptureUpdate;
        return lane;
      }
      function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
        var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
        if ("function" === typeof getDerivedStateFromError) {
          var error = errorInfo.value;
          update.payload = function() {
            return getDerivedStateFromError(error);
          };
          update.callback = function() {
            markFailedErrorBoundaryForHotReloading(fiber);
            runWithFiberInDEV(
              errorInfo.source,
              logCaughtError,
              root2,
              fiber,
              errorInfo
            );
          };
        }
        var inst = fiber.stateNode;
        null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
          markFailedErrorBoundaryForHotReloading(fiber);
          runWithFiberInDEV(
            errorInfo.source,
            logCaughtError,
            root2,
            fiber,
            errorInfo
          );
          "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
          callComponentDidCatchInDEV(this, errorInfo);
          "function" === typeof getDerivedStateFromError || 0 === (fiber.lanes & 2) && console.error(
            "%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",
            getComponentNameFromFiber(fiber) || "Unknown"
          );
        });
      }
      function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
        sourceFiber.flags |= 32768;
        isDevToolsPresent && restorePendingUpdaters(root2, rootRenderLanes);
        if (null !== value && "object" === typeof value && "function" === typeof value.then) {
          returnFiber = sourceFiber.alternate;
          null !== returnFiber && propagateParentContextChanges(
            returnFiber,
            sourceFiber,
            rootRenderLanes,
            true
          );
          isHydrating && (didSuspendOrErrorDEV = true);
          sourceFiber = suspenseHandlerStackCursor.current;
          if (null !== sourceFiber) {
            switch (sourceFiber.tag) {
              case 13:
                return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && workInProgressRootExitStatus === RootInProgress && (workInProgressRootExitStatus = RootSuspended), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
              case 22:
                return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: /* @__PURE__ */ new Set([value])
                }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
            }
            throw Error(
              "Unexpected Suspense handler tag (" + sourceFiber.tag + "). This is a bug in React."
            );
          }
          attachPingListener(root2, value, rootRenderLanes);
          renderDidSuspendDelayIfPossible();
          return false;
        }
        if (isHydrating)
          return didSuspendOrErrorDEV = true, returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && queueHydrationError(
            createCapturedValueAtFiber(
              Error(
                "There was an error while hydrating but React was able to recover by instead client rendering from the nearest Suspense boundary.",
                { cause: value }
              ),
              sourceFiber
            )
          )) : (value !== HydrationMismatchException && queueHydrationError(
            createCapturedValueAtFiber(
              Error(
                "There was an error while hydrating but React was able to recover by instead client rendering the entire root.",
                { cause: value }
              ),
              sourceFiber
            )
          ), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
            root2.stateNode,
            value,
            rootRenderLanes
          ), enqueueCapturedUpdate(root2, rootRenderLanes), workInProgressRootExitStatus !== RootSuspendedWithDelay && (workInProgressRootExitStatus = RootErrored)), false;
        var error = createCapturedValueAtFiber(
          Error(
            "There was an error during concurrent rendering but React was able to recover by instead synchronously rendering the entire root.",
            { cause: value }
          ),
          sourceFiber
        );
        null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [error] : workInProgressRootConcurrentErrors.push(error);
        workInProgressRootExitStatus !== RootSuspendedWithDelay && (workInProgressRootExitStatus = RootErrored);
        if (null === returnFiber)
          return true;
        value = createCapturedValueAtFiber(value, sourceFiber);
        sourceFiber = returnFiber;
        do {
          switch (sourceFiber.tag) {
            case 3:
              return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(
                sourceFiber.stateNode,
                value,
                root2
              ), enqueueCapturedUpdate(sourceFiber, root2), false;
            case 1:
              if (returnFiber = sourceFiber.type, error = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== error && "function" === typeof error.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(error))))
                return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
                  rootRenderLanes,
                  root2,
                  sourceFiber,
                  value
                ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
          }
          sourceFiber = sourceFiber.return;
        } while (null !== sourceFiber);
        return false;
      }
      function reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2) {
        workInProgress2.child = null === current2 ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
          workInProgress2,
          current2.child,
          nextChildren,
          renderLanes2
        );
      }
      function updateForwardRef(current2, workInProgress2, Component, nextProps, renderLanes2) {
        Component = Component.render;
        var ref = workInProgress2.ref;
        if ("ref" in nextProps) {
          var propsWithoutRef = {};
          for (var key in nextProps)
            "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
        } else
          propsWithoutRef = nextProps;
        prepareToReadContext(workInProgress2);
        markComponentRenderStarted(workInProgress2);
        nextProps = renderWithHooks(
          current2,
          workInProgress2,
          Component,
          propsWithoutRef,
          ref,
          renderLanes2
        );
        key = checkDidRenderIdHook();
        markComponentRenderStopped();
        if (null !== current2 && !didReceiveUpdate)
          return bailoutHooks(current2, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
        isHydrating && key && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current2, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateMemoComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
        if (null === current2) {
          var type = Component.type;
          if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
            return Component = resolveFunctionForHotReloading(type), workInProgress2.tag = 15, workInProgress2.type = Component, validateFunctionComponentInDev(workInProgress2, type), updateSimpleMemoComponent(
              current2,
              workInProgress2,
              Component,
              nextProps,
              renderLanes2
            );
          current2 = createFiberFromTypeAndProps(
            Component.type,
            null,
            nextProps,
            workInProgress2,
            workInProgress2.mode,
            renderLanes2
          );
          current2.ref = workInProgress2.ref;
          current2.return = workInProgress2;
          return workInProgress2.child = current2;
        }
        type = current2.child;
        if (!checkScheduledUpdateOrContext(current2, renderLanes2)) {
          var prevProps = type.memoizedProps;
          Component = Component.compare;
          Component = null !== Component ? Component : shallowEqual;
          if (Component(prevProps, nextProps) && current2.ref === workInProgress2.ref)
            return bailoutOnAlreadyFinishedWork(
              current2,
              workInProgress2,
              renderLanes2
            );
        }
        workInProgress2.flags |= 1;
        current2 = createWorkInProgress(type, nextProps);
        current2.ref = workInProgress2.ref;
        current2.return = workInProgress2;
        return workInProgress2.child = current2;
      }
      function updateSimpleMemoComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
        if (null !== current2) {
          var prevProps = current2.memoizedProps;
          if (shallowEqual(prevProps, nextProps) && current2.ref === workInProgress2.ref && workInProgress2.type === current2.type)
            if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current2, renderLanes2))
              0 !== (current2.flags & 131072) && (didReceiveUpdate = true);
            else
              return workInProgress2.lanes = current2.lanes, bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
        }
        return updateFunctionComponent(
          current2,
          workInProgress2,
          Component,
          nextProps,
          renderLanes2
        );
      }
      function updateOffscreenComponent(current2, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, nextChildren = nextProps.children, prevState = null !== current2 ? current2.memoizedState : null;
        if ("hidden" === nextProps.mode) {
          if (0 !== (workInProgress2.flags & 128)) {
            nextProps = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
            if (null !== current2) {
              nextChildren = workInProgress2.child = current2.child;
              for (prevState = 0; null !== nextChildren; )
                prevState = prevState | nextChildren.lanes | nextChildren.childLanes, nextChildren = nextChildren.sibling;
              workInProgress2.childLanes = prevState & ~nextProps;
            } else
              workInProgress2.childLanes = 0, workInProgress2.child = null;
            return deferHiddenOffscreenComponent(
              current2,
              workInProgress2,
              nextProps,
              renderLanes2
            );
          }
          if (0 !== (renderLanes2 & 536870912))
            workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current2 && pushTransition(
              workInProgress2,
              null !== prevState ? prevState.cachePool : null
            ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(workInProgress2), pushOffscreenSuspenseHandler(workInProgress2);
          else
            return workInProgress2.lanes = workInProgress2.childLanes = 536870912, deferHiddenOffscreenComponent(
              current2,
              workInProgress2,
              null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
              renderLanes2
            );
        } else
          null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.memoizedState = null) : (null !== current2 && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(workInProgress2), reuseSuspenseHandlerOnStack(workInProgress2));
        reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      function deferHiddenOffscreenComponent(current2, workInProgress2, nextBaseLanes, renderLanes2) {
        var JSCompiler_inline_result = peekCacheFromPool();
        JSCompiler_inline_result = null === JSCompiler_inline_result ? null : {
          parent: CacheContext._currentValue,
          pool: JSCompiler_inline_result
        };
        workInProgress2.memoizedState = {
          baseLanes: nextBaseLanes,
          cachePool: JSCompiler_inline_result
        };
        null !== current2 && pushTransition(workInProgress2, null);
        reuseHiddenContextOnStack(workInProgress2);
        pushOffscreenSuspenseHandler(workInProgress2);
        null !== current2 && propagateParentContextChanges(current2, workInProgress2, renderLanes2, true);
        return null;
      }
      function markRef(current2, workInProgress2) {
        var ref = workInProgress2.ref;
        if (null === ref)
          null !== current2 && null !== current2.ref && (workInProgress2.flags |= 4194816);
        else {
          if ("function" !== typeof ref && "object" !== typeof ref)
            throw Error(
              "Expected ref to be a function, an object returned by React.createRef(), or undefined/null."
            );
          if (null === current2 || current2.ref !== ref)
            workInProgress2.flags |= 4194816;
        }
      }
      function updateFunctionComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
        if (Component.prototype && "function" === typeof Component.prototype.render) {
          var componentName2 = getComponentNameFromType(Component) || "Unknown";
          didWarnAboutBadClass[componentName2] || (console.error(
            "The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",
            componentName2,
            componentName2
          ), didWarnAboutBadClass[componentName2] = true);
        }
        workInProgress2.mode & StrictLegacyMode && ReactStrictModeWarnings.recordLegacyContextWarning(
          workInProgress2,
          null
        );
        null === current2 && (validateFunctionComponentInDev(workInProgress2, workInProgress2.type), Component.contextTypes && (componentName2 = getComponentNameFromType(Component) || "Unknown", didWarnAboutContextTypes[componentName2] || (didWarnAboutContextTypes[componentName2] = true, console.error(
          "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with React.useContext() instead. (https://react.dev/link/legacy-context)",
          componentName2
        ))));
        prepareToReadContext(workInProgress2);
        markComponentRenderStarted(workInProgress2);
        Component = renderWithHooks(
          current2,
          workInProgress2,
          Component,
          nextProps,
          void 0,
          renderLanes2
        );
        nextProps = checkDidRenderIdHook();
        markComponentRenderStopped();
        if (null !== current2 && !didReceiveUpdate)
          return bailoutHooks(current2, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
        isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current2, workInProgress2, Component, renderLanes2);
        return workInProgress2.child;
      }
      function replayFunctionComponent(current2, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
        prepareToReadContext(workInProgress2);
        markComponentRenderStarted(workInProgress2);
        hookTypesUpdateIndexDev = -1;
        ignorePreviousDependencies = null !== current2 && current2.type !== workInProgress2.type;
        workInProgress2.updateQueue = null;
        nextProps = renderWithHooksAgain(
          workInProgress2,
          Component,
          nextProps,
          secondArg
        );
        finishRenderingHooks(current2, workInProgress2);
        Component = checkDidRenderIdHook();
        markComponentRenderStopped();
        if (null !== current2 && !didReceiveUpdate)
          return bailoutHooks(current2, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
        isHydrating && Component && pushMaterializedTreeId(workInProgress2);
        workInProgress2.flags |= 1;
        reconcileChildren(current2, workInProgress2, nextProps, renderLanes2);
        return workInProgress2.child;
      }
      function updateClassComponent(current2, workInProgress2, Component, nextProps, renderLanes2) {
        switch (shouldErrorImpl(workInProgress2)) {
          case false:
            var _instance = workInProgress2.stateNode, state = new workInProgress2.type(
              workInProgress2.memoizedProps,
              _instance.context
            ).state;
            _instance.updater.enqueueSetState(_instance, state, null);
            break;
          case true:
            workInProgress2.flags |= 128;
            workInProgress2.flags |= 65536;
            _instance = Error("Simulated error coming from DevTools");
            var lane = renderLanes2 & -renderLanes2;
            workInProgress2.lanes |= lane;
            state = workInProgressRoot;
            if (null === state)
              throw Error(
                "Expected a work-in-progress root. This is a bug in React. Please file an issue."
              );
            lane = createClassErrorUpdate(lane);
            initializeClassErrorUpdate(
              lane,
              state,
              workInProgress2,
              createCapturedValueAtFiber(_instance, workInProgress2)
            );
            enqueueCapturedUpdate(workInProgress2, lane);
        }
        prepareToReadContext(workInProgress2);
        if (null === workInProgress2.stateNode) {
          state = emptyContextObject;
          _instance = Component.contextType;
          "contextType" in Component && null !== _instance && (void 0 === _instance || _instance.$$typeof !== REACT_CONTEXT_TYPE) && !didWarnAboutInvalidateContextType.has(Component) && (didWarnAboutInvalidateContextType.add(Component), lane = void 0 === _instance ? " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : "object" !== typeof _instance ? " However, it is set to a " + typeof _instance + "." : _instance.$$typeof === REACT_CONSUMER_TYPE ? " Did you accidentally pass the Context.Consumer instead?" : " However, it is set to an object with keys {" + Object.keys(_instance).join(", ") + "}.", console.error(
            "%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",
            getComponentNameFromType(Component) || "Component",
            lane
          ));
          "object" === typeof _instance && null !== _instance && (state = readContext(_instance));
          _instance = new Component(nextProps, state);
          if (workInProgress2.mode & StrictLegacyMode) {
            setIsStrictModeForDevtools(true);
            try {
              _instance = new Component(nextProps, state);
            } finally {
              setIsStrictModeForDevtools(false);
            }
          }
          state = workInProgress2.memoizedState = null !== _instance.state && void 0 !== _instance.state ? _instance.state : null;
          _instance.updater = classComponentUpdater;
          workInProgress2.stateNode = _instance;
          _instance._reactInternals = workInProgress2;
          _instance._reactInternalInstance = fakeInternalInstance;
          "function" === typeof Component.getDerivedStateFromProps && null === state && (state = getComponentNameFromType(Component) || "Component", didWarnAboutUninitializedState.has(state) || (didWarnAboutUninitializedState.add(state), console.error(
            "`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",
            state,
            null === _instance.state ? "null" : "undefined",
            state
          )));
          if ("function" === typeof Component.getDerivedStateFromProps || "function" === typeof _instance.getSnapshotBeforeUpdate) {
            var foundWillUpdateName = lane = state = null;
            "function" === typeof _instance.componentWillMount && true !== _instance.componentWillMount.__suppressDeprecationWarning ? state = "componentWillMount" : "function" === typeof _instance.UNSAFE_componentWillMount && (state = "UNSAFE_componentWillMount");
            "function" === typeof _instance.componentWillReceiveProps && true !== _instance.componentWillReceiveProps.__suppressDeprecationWarning ? lane = "componentWillReceiveProps" : "function" === typeof _instance.UNSAFE_componentWillReceiveProps && (lane = "UNSAFE_componentWillReceiveProps");
            "function" === typeof _instance.componentWillUpdate && true !== _instance.componentWillUpdate.__suppressDeprecationWarning ? foundWillUpdateName = "componentWillUpdate" : "function" === typeof _instance.UNSAFE_componentWillUpdate && (foundWillUpdateName = "UNSAFE_componentWillUpdate");
            if (null !== state || null !== lane || null !== foundWillUpdateName) {
              _instance = getComponentNameFromType(Component) || "Component";
              var newApiName = "function" === typeof Component.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
              didWarnAboutLegacyLifecyclesAndDerivedState.has(_instance) || (didWarnAboutLegacyLifecyclesAndDerivedState.add(_instance), console.error(
                "Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://react.dev/link/unsafe-component-lifecycles",
                _instance,
                newApiName,
                null !== state ? "\n  " + state : "",
                null !== lane ? "\n  " + lane : "",
                null !== foundWillUpdateName ? "\n  " + foundWillUpdateName : ""
              ));
            }
          }
          _instance = workInProgress2.stateNode;
          state = getComponentNameFromType(Component) || "Component";
          _instance.render || (Component.prototype && "function" === typeof Component.prototype.render ? console.error(
            "No `render` method found on the %s instance: did you accidentally return an object from the constructor?",
            state
          ) : console.error(
            "No `render` method found on the %s instance: you may have forgotten to define `render`.",
            state
          ));
          !_instance.getInitialState || _instance.getInitialState.isReactClassApproved || _instance.state || console.error(
            "getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",
            state
          );
          _instance.getDefaultProps && !_instance.getDefaultProps.isReactClassApproved && console.error(
            "getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",
            state
          );
          _instance.contextType && console.error(
            "contextType was defined as an instance property on %s. Use a static property to define contextType instead.",
            state
          );
          Component.childContextTypes && !didWarnAboutChildContextTypes.has(Component) && (didWarnAboutChildContextTypes.add(Component), console.error(
            "%s uses the legacy childContextTypes API which was removed in React 19. Use React.createContext() instead. (https://react.dev/link/legacy-context)",
            state
          ));
          Component.contextTypes && !didWarnAboutContextTypes$1.has(Component) && (didWarnAboutContextTypes$1.add(Component), console.error(
            "%s uses the legacy contextTypes API which was removed in React 19. Use React.createContext() with static contextType instead. (https://react.dev/link/legacy-context)",
            state
          ));
          "function" === typeof _instance.componentShouldUpdate && console.error(
            "%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",
            state
          );
          Component.prototype && Component.prototype.isPureReactComponent && "undefined" !== typeof _instance.shouldComponentUpdate && console.error(
            "%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",
            getComponentNameFromType(Component) || "A pure component"
          );
          "function" === typeof _instance.componentDidUnmount && console.error(
            "%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",
            state
          );
          "function" === typeof _instance.componentDidReceiveProps && console.error(
            "%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",
            state
          );
          "function" === typeof _instance.componentWillRecieveProps && console.error(
            "%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",
            state
          );
          "function" === typeof _instance.UNSAFE_componentWillRecieveProps && console.error(
            "%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",
            state
          );
          lane = _instance.props !== nextProps;
          void 0 !== _instance.props && lane && console.error(
            "When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",
            state
          );
          _instance.defaultProps && console.error(
            "Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",
            state,
            state
          );
          "function" !== typeof _instance.getSnapshotBeforeUpdate || "function" === typeof _instance.componentDidUpdate || didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.has(Component) || (didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate.add(Component), console.error(
            "%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",
            getComponentNameFromType(Component)
          ));
          "function" === typeof _instance.getDerivedStateFromProps && console.error(
            "%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
            state
          );
          "function" === typeof _instance.getDerivedStateFromError && console.error(
            "%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",
            state
          );
          "function" === typeof Component.getSnapshotBeforeUpdate && console.error(
            "%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",
            state
          );
          (lane = _instance.state) && ("object" !== typeof lane || isArrayImpl(lane)) && console.error("%s.state: must be set to an object or null", state);
          "function" === typeof _instance.getChildContext && "object" !== typeof Component.childContextTypes && console.error(
            "%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",
            state
          );
          _instance = workInProgress2.stateNode;
          _instance.props = nextProps;
          _instance.state = workInProgress2.memoizedState;
          _instance.refs = {};
          initializeUpdateQueue(workInProgress2);
          state = Component.contextType;
          _instance.context = "object" === typeof state && null !== state ? readContext(state) : emptyContextObject;
          _instance.state === nextProps && (state = getComponentNameFromType(Component) || "Component", didWarnAboutDirectlyAssigningPropsToState.has(state) || (didWarnAboutDirectlyAssigningPropsToState.add(state), console.error(
            "%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",
            state
          )));
          workInProgress2.mode & StrictLegacyMode && ReactStrictModeWarnings.recordLegacyContextWarning(
            workInProgress2,
            _instance
          );
          ReactStrictModeWarnings.recordUnsafeLifecycleWarnings(
            workInProgress2,
            _instance
          );
          _instance.state = workInProgress2.memoizedState;
          state = Component.getDerivedStateFromProps;
          "function" === typeof state && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            state,
            nextProps
          ), _instance.state = workInProgress2.memoizedState);
          "function" === typeof Component.getDerivedStateFromProps || "function" === typeof _instance.getSnapshotBeforeUpdate || "function" !== typeof _instance.UNSAFE_componentWillMount && "function" !== typeof _instance.componentWillMount || (state = _instance.state, "function" === typeof _instance.componentWillMount && _instance.componentWillMount(), "function" === typeof _instance.UNSAFE_componentWillMount && _instance.UNSAFE_componentWillMount(), state !== _instance.state && (console.error(
            "%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",
            getComponentNameFromFiber(workInProgress2) || "Component"
          ), classComponentUpdater.enqueueReplaceState(
            _instance,
            _instance.state,
            null
          )), processUpdateQueue(workInProgress2, nextProps, _instance, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), _instance.state = workInProgress2.memoizedState);
          "function" === typeof _instance.componentDidMount && (workInProgress2.flags |= 4194308);
          (workInProgress2.mode & StrictEffectsMode) !== NoMode && (workInProgress2.flags |= 134217728);
          _instance = true;
        } else if (null === current2) {
          _instance = workInProgress2.stateNode;
          var unresolvedOldProps = workInProgress2.memoizedProps;
          lane = resolveClassComponentProps(Component, unresolvedOldProps);
          _instance.props = lane;
          var oldContext = _instance.context;
          foundWillUpdateName = Component.contextType;
          state = emptyContextObject;
          "object" === typeof foundWillUpdateName && null !== foundWillUpdateName && (state = readContext(foundWillUpdateName));
          newApiName = Component.getDerivedStateFromProps;
          foundWillUpdateName = "function" === typeof newApiName || "function" === typeof _instance.getSnapshotBeforeUpdate;
          unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
          foundWillUpdateName || "function" !== typeof _instance.UNSAFE_componentWillReceiveProps && "function" !== typeof _instance.componentWillReceiveProps || (unresolvedOldProps || oldContext !== state) && callComponentWillReceiveProps(
            workInProgress2,
            _instance,
            nextProps,
            state
          );
          hasForceUpdate = false;
          var oldState = workInProgress2.memoizedState;
          _instance.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, _instance, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          oldContext = workInProgress2.memoizedState;
          unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof newApiName && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            newApiName,
            nextProps
          ), oldContext = workInProgress2.memoizedState), (lane = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            lane,
            nextProps,
            oldState,
            oldContext,
            state
          )) ? (foundWillUpdateName || "function" !== typeof _instance.UNSAFE_componentWillMount && "function" !== typeof _instance.componentWillMount || ("function" === typeof _instance.componentWillMount && _instance.componentWillMount(), "function" === typeof _instance.UNSAFE_componentWillMount && _instance.UNSAFE_componentWillMount()), "function" === typeof _instance.componentDidMount && (workInProgress2.flags |= 4194308), (workInProgress2.mode & StrictEffectsMode) !== NoMode && (workInProgress2.flags |= 134217728)) : ("function" === typeof _instance.componentDidMount && (workInProgress2.flags |= 4194308), (workInProgress2.mode & StrictEffectsMode) !== NoMode && (workInProgress2.flags |= 134217728), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), _instance.props = nextProps, _instance.state = oldContext, _instance.context = state, _instance = lane) : ("function" === typeof _instance.componentDidMount && (workInProgress2.flags |= 4194308), (workInProgress2.mode & StrictEffectsMode) !== NoMode && (workInProgress2.flags |= 134217728), _instance = false);
        } else {
          _instance = workInProgress2.stateNode;
          cloneUpdateQueue(current2, workInProgress2);
          state = workInProgress2.memoizedProps;
          foundWillUpdateName = resolveClassComponentProps(Component, state);
          _instance.props = foundWillUpdateName;
          newApiName = workInProgress2.pendingProps;
          oldState = _instance.context;
          oldContext = Component.contextType;
          lane = emptyContextObject;
          "object" === typeof oldContext && null !== oldContext && (lane = readContext(oldContext));
          unresolvedOldProps = Component.getDerivedStateFromProps;
          (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof _instance.getSnapshotBeforeUpdate) || "function" !== typeof _instance.UNSAFE_componentWillReceiveProps && "function" !== typeof _instance.componentWillReceiveProps || (state !== newApiName || oldState !== lane) && callComponentWillReceiveProps(
            workInProgress2,
            _instance,
            nextProps,
            lane
          );
          hasForceUpdate = false;
          oldState = workInProgress2.memoizedState;
          _instance.state = oldState;
          processUpdateQueue(workInProgress2, nextProps, _instance, renderLanes2);
          suspendIfUpdateReadFromEntangledAsyncAction();
          var newState = workInProgress2.memoizedState;
          state !== newApiName || oldState !== newState || hasForceUpdate || null !== current2 && null !== current2.dependencies && checkIfContextChanged(current2.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
            workInProgress2,
            Component,
            unresolvedOldProps,
            nextProps
          ), newState = workInProgress2.memoizedState), (foundWillUpdateName = hasForceUpdate || checkShouldComponentUpdate(
            workInProgress2,
            Component,
            foundWillUpdateName,
            nextProps,
            oldState,
            newState,
            lane
          ) || null !== current2 && null !== current2.dependencies && checkIfContextChanged(current2.dependencies)) ? (oldContext || "function" !== typeof _instance.UNSAFE_componentWillUpdate && "function" !== typeof _instance.componentWillUpdate || ("function" === typeof _instance.componentWillUpdate && _instance.componentWillUpdate(nextProps, newState, lane), "function" === typeof _instance.UNSAFE_componentWillUpdate && _instance.UNSAFE_componentWillUpdate(
            nextProps,
            newState,
            lane
          )), "function" === typeof _instance.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof _instance.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof _instance.componentDidUpdate || state === current2.memoizedProps && oldState === current2.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof _instance.getSnapshotBeforeUpdate || state === current2.memoizedProps && oldState === current2.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), _instance.props = nextProps, _instance.state = newState, _instance.context = lane, _instance = foundWillUpdateName) : ("function" !== typeof _instance.componentDidUpdate || state === current2.memoizedProps && oldState === current2.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof _instance.getSnapshotBeforeUpdate || state === current2.memoizedProps && oldState === current2.memoizedState || (workInProgress2.flags |= 1024), _instance = false);
        }
        lane = _instance;
        markRef(current2, workInProgress2);
        state = 0 !== (workInProgress2.flags & 128);
        if (lane || state) {
          lane = workInProgress2.stateNode;
          setCurrentFiber(workInProgress2);
          if (state && "function" !== typeof Component.getDerivedStateFromError)
            Component = null, profilerStartTime = -1;
          else {
            markComponentRenderStarted(workInProgress2);
            Component = callRenderInDEV(lane);
            if (workInProgress2.mode & StrictLegacyMode) {
              setIsStrictModeForDevtools(true);
              try {
                callRenderInDEV(lane);
              } finally {
                setIsStrictModeForDevtools(false);
              }
            }
            markComponentRenderStopped();
          }
          workInProgress2.flags |= 1;
          null !== current2 && state ? (workInProgress2.child = reconcileChildFibers(
            workInProgress2,
            current2.child,
            null,
            renderLanes2
          ), workInProgress2.child = reconcileChildFibers(
            workInProgress2,
            null,
            Component,
            renderLanes2
          )) : reconcileChildren(current2, workInProgress2, Component, renderLanes2);
          workInProgress2.memoizedState = lane.state;
          current2 = workInProgress2.child;
        } else
          current2 = bailoutOnAlreadyFinishedWork(
            current2,
            workInProgress2,
            renderLanes2
          );
        renderLanes2 = workInProgress2.stateNode;
        _instance && renderLanes2.props !== nextProps && (didWarnAboutReassigningProps || console.error(
          "It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",
          getComponentNameFromFiber(workInProgress2) || "a component"
        ), didWarnAboutReassigningProps = true);
        return current2;
      }
      function mountHostRootWithoutHydrating(current2, workInProgress2, nextChildren, renderLanes2) {
        resetHydrationState();
        workInProgress2.flags |= 256;
        reconcileChildren(current2, workInProgress2, nextChildren, renderLanes2);
        return workInProgress2.child;
      }
      function validateFunctionComponentInDev(workInProgress2, Component) {
        Component && Component.childContextTypes && console.error(
          "childContextTypes cannot be defined on a function component.\n  %s.childContextTypes = ...",
          Component.displayName || Component.name || "Component"
        );
        "function" === typeof Component.getDerivedStateFromProps && (workInProgress2 = getComponentNameFromType(Component) || "Unknown", didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress2] || (console.error(
          "%s: Function components do not support getDerivedStateFromProps.",
          workInProgress2
        ), didWarnAboutGetDerivedStateOnFunctionComponent[workInProgress2] = true));
        "object" === typeof Component.contextType && null !== Component.contextType && (Component = getComponentNameFromType(Component) || "Unknown", didWarnAboutContextTypeOnFunctionComponent[Component] || (console.error(
          "%s: Function components do not support contextType.",
          Component
        ), didWarnAboutContextTypeOnFunctionComponent[Component] = true));
      }
      function mountSuspenseOffscreenState(renderLanes2) {
        return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
      }
      function getRemainingWorkInPrimaryTree(current2, primaryTreeDidDefer, renderLanes2) {
        current2 = null !== current2 ? current2.childLanes & ~renderLanes2 : 0;
        primaryTreeDidDefer && (current2 |= workInProgressDeferredLane);
        return current2;
      }
      function updateSuspenseComponent(current2, workInProgress2, renderLanes2) {
        var JSCompiler_object_inline_digest_2451;
        var JSCompiler_object_inline_stack_2452 = workInProgress2.pendingProps;
        shouldSuspendImpl(workInProgress2) && (workInProgress2.flags |= 128);
        var JSCompiler_object_inline_componentStack_2453 = false;
        var didSuspend = 0 !== (workInProgress2.flags & 128);
        (JSCompiler_object_inline_digest_2451 = didSuspend) || (JSCompiler_object_inline_digest_2451 = null !== current2 && null === current2.memoizedState ? false : 0 !== (suspenseStackCursor.current & ForceSuspenseFallback));
        JSCompiler_object_inline_digest_2451 && (JSCompiler_object_inline_componentStack_2453 = true, workInProgress2.flags &= -129);
        JSCompiler_object_inline_digest_2451 = 0 !== (workInProgress2.flags & 32);
        workInProgress2.flags &= -33;
        if (null === current2) {
          if (isHydrating) {
            JSCompiler_object_inline_componentStack_2453 ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack(workInProgress2);
            if (isHydrating) {
              var JSCompiler_object_inline_message_2450 = nextHydratableInstance;
              var JSCompiler_temp;
              if (!(JSCompiler_temp = !JSCompiler_object_inline_message_2450)) {
                c: {
                  var instance = JSCompiler_object_inline_message_2450;
                  for (JSCompiler_temp = rootOrSingletonContext; 8 !== instance.nodeType; ) {
                    if (!JSCompiler_temp) {
                      JSCompiler_temp = null;
                      break c;
                    }
                    instance = getNextHydratable(instance.nextSibling);
                    if (null === instance) {
                      JSCompiler_temp = null;
                      break c;
                    }
                  }
                  JSCompiler_temp = instance;
                }
                null !== JSCompiler_temp ? (warnIfNotHydrating(), workInProgress2.memoizedState = {
                  dehydrated: JSCompiler_temp,
                  treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
                  retryLane: 536870912,
                  hydrationErrors: null
                }, instance = createFiber(18, null, null, NoMode), instance.stateNode = JSCompiler_temp, instance.return = workInProgress2, workInProgress2.child = instance, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, JSCompiler_temp = true) : JSCompiler_temp = false;
                JSCompiler_temp = !JSCompiler_temp;
              }
              JSCompiler_temp && (warnNonHydratedInstance(
                workInProgress2,
                JSCompiler_object_inline_message_2450
              ), throwOnHydrationMismatch(workInProgress2));
            }
            JSCompiler_object_inline_message_2450 = workInProgress2.memoizedState;
            if (null !== JSCompiler_object_inline_message_2450 && (JSCompiler_object_inline_message_2450 = JSCompiler_object_inline_message_2450.dehydrated, null !== JSCompiler_object_inline_message_2450))
              return isSuspenseInstanceFallback(JSCompiler_object_inline_message_2450) ? workInProgress2.lanes = 32 : workInProgress2.lanes = 536870912, null;
            popSuspenseHandler(workInProgress2);
          }
          JSCompiler_object_inline_message_2450 = JSCompiler_object_inline_stack_2452.children;
          JSCompiler_object_inline_stack_2452 = JSCompiler_object_inline_stack_2452.fallback;
          if (JSCompiler_object_inline_componentStack_2453)
            return reuseSuspenseHandlerOnStack(workInProgress2), JSCompiler_object_inline_componentStack_2453 = workInProgress2.mode, JSCompiler_object_inline_message_2450 = mountWorkInProgressOffscreenFiber(
              {
                mode: "hidden",
                children: JSCompiler_object_inline_message_2450
              },
              JSCompiler_object_inline_componentStack_2453
            ), JSCompiler_object_inline_stack_2452 = createFiberFromFragment(
              JSCompiler_object_inline_stack_2452,
              JSCompiler_object_inline_componentStack_2453,
              renderLanes2,
              null
            ), JSCompiler_object_inline_message_2450.return = workInProgress2, JSCompiler_object_inline_stack_2452.return = workInProgress2, JSCompiler_object_inline_message_2450.sibling = JSCompiler_object_inline_stack_2452, workInProgress2.child = JSCompiler_object_inline_message_2450, JSCompiler_object_inline_componentStack_2453 = workInProgress2.child, JSCompiler_object_inline_componentStack_2453.memoizedState = mountSuspenseOffscreenState(renderLanes2), JSCompiler_object_inline_componentStack_2453.childLanes = getRemainingWorkInPrimaryTree(
              current2,
              JSCompiler_object_inline_digest_2451,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, JSCompiler_object_inline_stack_2452;
          pushPrimaryTreeSuspenseHandler(workInProgress2);
          return mountSuspensePrimaryChildren(
            workInProgress2,
            JSCompiler_object_inline_message_2450
          );
        }
        var prevState = current2.memoizedState;
        if (null !== prevState && (JSCompiler_object_inline_message_2450 = prevState.dehydrated, null !== JSCompiler_object_inline_message_2450)) {
          if (didSuspend)
            workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current2,
              workInProgress2,
              renderLanes2
            )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(workInProgress2), workInProgress2.child = current2.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(workInProgress2), JSCompiler_object_inline_componentStack_2453 = JSCompiler_object_inline_stack_2452.fallback, JSCompiler_object_inline_message_2450 = workInProgress2.mode, JSCompiler_object_inline_stack_2452 = mountWorkInProgressOffscreenFiber(
              {
                mode: "visible",
                children: JSCompiler_object_inline_stack_2452.children
              },
              JSCompiler_object_inline_message_2450
            ), JSCompiler_object_inline_componentStack_2453 = createFiberFromFragment(
              JSCompiler_object_inline_componentStack_2453,
              JSCompiler_object_inline_message_2450,
              renderLanes2,
              null
            ), JSCompiler_object_inline_componentStack_2453.flags |= 2, JSCompiler_object_inline_stack_2452.return = workInProgress2, JSCompiler_object_inline_componentStack_2453.return = workInProgress2, JSCompiler_object_inline_stack_2452.sibling = JSCompiler_object_inline_componentStack_2453, workInProgress2.child = JSCompiler_object_inline_stack_2452, reconcileChildFibers(
              workInProgress2,
              current2.child,
              null,
              renderLanes2
            ), JSCompiler_object_inline_stack_2452 = workInProgress2.child, JSCompiler_object_inline_stack_2452.memoizedState = mountSuspenseOffscreenState(renderLanes2), JSCompiler_object_inline_stack_2452.childLanes = getRemainingWorkInPrimaryTree(
              current2,
              JSCompiler_object_inline_digest_2451,
              renderLanes2
            ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = JSCompiler_object_inline_componentStack_2453);
          else if (pushPrimaryTreeSuspenseHandler(workInProgress2), isHydrating && console.error(
            "We should not be hydrating here. This is a bug in React. Please file a bug."
          ), isSuspenseInstanceFallback(JSCompiler_object_inline_message_2450)) {
            JSCompiler_object_inline_digest_2451 = JSCompiler_object_inline_message_2450.nextSibling && JSCompiler_object_inline_message_2450.nextSibling.dataset;
            if (JSCompiler_object_inline_digest_2451) {
              JSCompiler_temp = JSCompiler_object_inline_digest_2451.dgst;
              var message = JSCompiler_object_inline_digest_2451.msg;
              instance = JSCompiler_object_inline_digest_2451.stck;
              var componentStack = JSCompiler_object_inline_digest_2451.cstck;
            }
            JSCompiler_object_inline_message_2450 = message;
            JSCompiler_object_inline_digest_2451 = JSCompiler_temp;
            JSCompiler_object_inline_stack_2452 = instance;
            JSCompiler_temp = JSCompiler_object_inline_componentStack_2453 = componentStack;
            JSCompiler_object_inline_componentStack_2453 = JSCompiler_object_inline_message_2450 ? Error(JSCompiler_object_inline_message_2450) : Error(
              "The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."
            );
            JSCompiler_object_inline_componentStack_2453.stack = JSCompiler_object_inline_stack_2452 || "";
            JSCompiler_object_inline_componentStack_2453.digest = JSCompiler_object_inline_digest_2451;
            JSCompiler_object_inline_digest_2451 = void 0 === JSCompiler_temp ? null : JSCompiler_temp;
            JSCompiler_object_inline_stack_2452 = {
              value: JSCompiler_object_inline_componentStack_2453,
              source: null,
              stack: JSCompiler_object_inline_digest_2451
            };
            "string" === typeof JSCompiler_object_inline_digest_2451 && CapturedStacks.set(
              JSCompiler_object_inline_componentStack_2453,
              JSCompiler_object_inline_stack_2452
            );
            queueHydrationError(JSCompiler_object_inline_stack_2452);
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current2,
              workInProgress2,
              renderLanes2
            );
          } else if (didReceiveUpdate || propagateParentContextChanges(
            current2,
            workInProgress2,
            renderLanes2,
            false
          ), JSCompiler_object_inline_digest_2451 = 0 !== (renderLanes2 & current2.childLanes), didReceiveUpdate || JSCompiler_object_inline_digest_2451) {
            JSCompiler_object_inline_digest_2451 = workInProgressRoot;
            if (null !== JSCompiler_object_inline_digest_2451 && (JSCompiler_object_inline_stack_2452 = renderLanes2 & -renderLanes2, JSCompiler_object_inline_stack_2452 = 0 !== (JSCompiler_object_inline_stack_2452 & 42) ? 1 : getBumpedLaneForHydrationByLane(
              JSCompiler_object_inline_stack_2452
            ), JSCompiler_object_inline_stack_2452 = 0 !== (JSCompiler_object_inline_stack_2452 & (JSCompiler_object_inline_digest_2451.suspendedLanes | renderLanes2)) ? 0 : JSCompiler_object_inline_stack_2452, 0 !== JSCompiler_object_inline_stack_2452 && JSCompiler_object_inline_stack_2452 !== prevState.retryLane))
              throw prevState.retryLane = JSCompiler_object_inline_stack_2452, enqueueConcurrentRenderForLane(
                current2,
                JSCompiler_object_inline_stack_2452
              ), scheduleUpdateOnFiber(
                JSCompiler_object_inline_digest_2451,
                current2,
                JSCompiler_object_inline_stack_2452
              ), SelectiveHydrationException;
            JSCompiler_object_inline_message_2450.data === SUSPENSE_PENDING_START_DATA || renderDidSuspendDelayIfPossible();
            workInProgress2 = retrySuspenseComponentWithoutHydrating(
              current2,
              workInProgress2,
              renderLanes2
            );
          } else
            JSCompiler_object_inline_message_2450.data === SUSPENSE_PENDING_START_DATA ? (workInProgress2.flags |= 192, workInProgress2.child = current2.child, workInProgress2 = null) : (current2 = prevState.treeContext, nextHydratableInstance = getNextHydratable(
              JSCompiler_object_inline_message_2450.nextSibling
            ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, didSuspendOrErrorDEV = false, hydrationDiffRootDEV = null, rootOrSingletonContext = false, null !== current2 && (warnIfNotHydrating(), idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextId = current2.id, treeContextOverflow = current2.overflow, treeContextProvider = workInProgress2), workInProgress2 = mountSuspensePrimaryChildren(
              workInProgress2,
              JSCompiler_object_inline_stack_2452.children
            ), workInProgress2.flags |= 4096);
          return workInProgress2;
        }
        if (JSCompiler_object_inline_componentStack_2453)
          return reuseSuspenseHandlerOnStack(workInProgress2), JSCompiler_object_inline_componentStack_2453 = JSCompiler_object_inline_stack_2452.fallback, JSCompiler_object_inline_message_2450 = workInProgress2.mode, JSCompiler_temp = current2.child, instance = JSCompiler_temp.sibling, JSCompiler_object_inline_stack_2452 = createWorkInProgress(
            JSCompiler_temp,
            {
              mode: "hidden",
              children: JSCompiler_object_inline_stack_2452.children
            }
          ), JSCompiler_object_inline_stack_2452.subtreeFlags = JSCompiler_temp.subtreeFlags & 65011712, null !== instance ? JSCompiler_object_inline_componentStack_2453 = createWorkInProgress(
            instance,
            JSCompiler_object_inline_componentStack_2453
          ) : (JSCompiler_object_inline_componentStack_2453 = createFiberFromFragment(
            JSCompiler_object_inline_componentStack_2453,
            JSCompiler_object_inline_message_2450,
            renderLanes2,
            null
          ), JSCompiler_object_inline_componentStack_2453.flags |= 2), JSCompiler_object_inline_componentStack_2453.return = workInProgress2, JSCompiler_object_inline_stack_2452.return = workInProgress2, JSCompiler_object_inline_stack_2452.sibling = JSCompiler_object_inline_componentStack_2453, workInProgress2.child = JSCompiler_object_inline_stack_2452, JSCompiler_object_inline_stack_2452 = JSCompiler_object_inline_componentStack_2453, JSCompiler_object_inline_componentStack_2453 = workInProgress2.child, JSCompiler_object_inline_message_2450 = current2.child.memoizedState, null === JSCompiler_object_inline_message_2450 ? JSCompiler_object_inline_message_2450 = mountSuspenseOffscreenState(renderLanes2) : (JSCompiler_temp = JSCompiler_object_inline_message_2450.cachePool, null !== JSCompiler_temp ? (instance = CacheContext._currentValue, JSCompiler_temp = JSCompiler_temp.parent !== instance ? { parent: instance, pool: instance } : JSCompiler_temp) : JSCompiler_temp = getSuspendedCache(), JSCompiler_object_inline_message_2450 = {
            baseLanes: JSCompiler_object_inline_message_2450.baseLanes | renderLanes2,
            cachePool: JSCompiler_temp
          }), JSCompiler_object_inline_componentStack_2453.memoizedState = JSCompiler_object_inline_message_2450, JSCompiler_object_inline_componentStack_2453.childLanes = getRemainingWorkInPrimaryTree(
            current2,
            JSCompiler_object_inline_digest_2451,
            renderLanes2
          ), workInProgress2.memoizedState = SUSPENDED_MARKER, JSCompiler_object_inline_stack_2452;
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        renderLanes2 = current2.child;
        current2 = renderLanes2.sibling;
        renderLanes2 = createWorkInProgress(renderLanes2, {
          mode: "visible",
          children: JSCompiler_object_inline_stack_2452.children
        });
        renderLanes2.return = workInProgress2;
        renderLanes2.sibling = null;
        null !== current2 && (JSCompiler_object_inline_digest_2451 = workInProgress2.deletions, null === JSCompiler_object_inline_digest_2451 ? (workInProgress2.deletions = [current2], workInProgress2.flags |= 16) : JSCompiler_object_inline_digest_2451.push(current2));
        workInProgress2.child = renderLanes2;
        workInProgress2.memoizedState = null;
        return renderLanes2;
      }
      function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
        primaryChildren = mountWorkInProgressOffscreenFiber(
          { mode: "visible", children: primaryChildren },
          workInProgress2.mode
        );
        primaryChildren.return = workInProgress2;
        return workInProgress2.child = primaryChildren;
      }
      function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
        offscreenProps = createFiber(22, offscreenProps, null, mode);
        offscreenProps.lanes = 0;
        offscreenProps.stateNode = {
          _visibility: OffscreenVisible,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        };
        return offscreenProps;
      }
      function retrySuspenseComponentWithoutHydrating(current2, workInProgress2, renderLanes2) {
        reconcileChildFibers(workInProgress2, current2.child, null, renderLanes2);
        current2 = mountSuspensePrimaryChildren(
          workInProgress2,
          workInProgress2.pendingProps.children
        );
        current2.flags |= 2;
        workInProgress2.memoizedState = null;
        return current2;
      }
      function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
        fiber.lanes |= renderLanes2;
        var alternate = fiber.alternate;
        null !== alternate && (alternate.lanes |= renderLanes2);
        scheduleContextWorkOnParentPath(
          fiber.return,
          renderLanes2,
          propagationRoot
        );
      }
      function validateSuspenseListNestedChild(childSlot, index) {
        var isAnArray = isArrayImpl(childSlot);
        childSlot = !isAnArray && "function" === typeof getIteratorFn(childSlot);
        return isAnArray || childSlot ? (isAnArray = isAnArray ? "array" : "iterable", console.error(
          "A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",
          isAnArray,
          index,
          isAnArray
        ), false) : true;
      }
      function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode) {
        var renderState = workInProgress2.memoizedState;
        null === renderState ? workInProgress2.memoizedState = {
          isBackwards,
          rendering: null,
          renderingStartTime: 0,
          last: lastContentRow,
          tail,
          tailMode
        } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode);
      }
      function updateSuspenseListComponent(current2, workInProgress2, renderLanes2) {
        var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
        nextProps = nextProps.children;
        if (void 0 !== revealOrder && "forwards" !== revealOrder && "backwards" !== revealOrder && "together" !== revealOrder && !didWarnAboutRevealOrder[revealOrder])
          if (didWarnAboutRevealOrder[revealOrder] = true, "string" === typeof revealOrder)
            switch (revealOrder.toLowerCase()) {
              case "together":
              case "forwards":
              case "backwards":
                console.error(
                  '"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',
                  revealOrder,
                  revealOrder.toLowerCase()
                );
                break;
              case "forward":
              case "backward":
                console.error(
                  '"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',
                  revealOrder,
                  revealOrder.toLowerCase()
                );
                break;
              default:
                console.error(
                  '"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
                  revealOrder
                );
            }
          else
            console.error(
              '%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',
              revealOrder
            );
        void 0 === tailMode || didWarnAboutTailOptions[tailMode] || ("collapsed" !== tailMode && "hidden" !== tailMode ? (didWarnAboutTailOptions[tailMode] = true, console.error(
          '"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',
          tailMode
        )) : "forwards" !== revealOrder && "backwards" !== revealOrder && (didWarnAboutTailOptions[tailMode] = true, console.error(
          '<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',
          tailMode
        )));
        a:
          if (("forwards" === revealOrder || "backwards" === revealOrder) && void 0 !== nextProps && null !== nextProps && false !== nextProps)
            if (isArrayImpl(nextProps))
              for (var i = 0; i < nextProps.length; i++) {
                if (!validateSuspenseListNestedChild(nextProps[i], i))
                  break a;
              }
            else if (i = getIteratorFn(nextProps), "function" === typeof i) {
              if (i = i.call(nextProps))
                for (var step = i.next(), _i = 0; !step.done; step = i.next()) {
                  if (!validateSuspenseListNestedChild(step.value, _i))
                    break a;
                  _i++;
                }
            } else
              console.error(
                'A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',
                revealOrder
              );
        reconcileChildren(current2, workInProgress2, nextProps, renderLanes2);
        nextProps = suspenseStackCursor.current;
        if (0 !== (nextProps & ForceSuspenseFallback))
          nextProps = nextProps & SubtreeSuspenseContextMask | ForceSuspenseFallback, workInProgress2.flags |= 128;
        else {
          if (null !== current2 && 0 !== (current2.flags & 128))
            a:
              for (current2 = workInProgress2.child; null !== current2; ) {
                if (13 === current2.tag)
                  null !== current2.memoizedState && scheduleSuspenseWorkOnFiber(
                    current2,
                    renderLanes2,
                    workInProgress2
                  );
                else if (19 === current2.tag)
                  scheduleSuspenseWorkOnFiber(current2, renderLanes2, workInProgress2);
                else if (null !== current2.child) {
                  current2.child.return = current2;
                  current2 = current2.child;
                  continue;
                }
                if (current2 === workInProgress2)
                  break a;
                for (; null === current2.sibling; ) {
                  if (null === current2.return || current2.return === workInProgress2)
                    break a;
                  current2 = current2.return;
                }
                current2.sibling.return = current2.return;
                current2 = current2.sibling;
              }
          nextProps &= SubtreeSuspenseContextMask;
        }
        push(suspenseStackCursor, nextProps, workInProgress2);
        switch (revealOrder) {
          case "forwards":
            renderLanes2 = workInProgress2.child;
            for (revealOrder = null; null !== renderLanes2; )
              current2 = renderLanes2.alternate, null !== current2 && null === findFirstSuspended(current2) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
            renderLanes2 = revealOrder;
            null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
            initSuspenseListRenderState(
              workInProgress2,
              false,
              revealOrder,
              renderLanes2,
              tailMode
            );
            break;
          case "backwards":
            renderLanes2 = null;
            revealOrder = workInProgress2.child;
            for (workInProgress2.child = null; null !== revealOrder; ) {
              current2 = revealOrder.alternate;
              if (null !== current2 && null === findFirstSuspended(current2)) {
                workInProgress2.child = revealOrder;
                break;
              }
              current2 = revealOrder.sibling;
              revealOrder.sibling = renderLanes2;
              renderLanes2 = revealOrder;
              revealOrder = current2;
            }
            initSuspenseListRenderState(
              workInProgress2,
              true,
              renderLanes2,
              null,
              tailMode
            );
            break;
          case "together":
            initSuspenseListRenderState(workInProgress2, false, null, null, void 0);
            break;
          default:
            workInProgress2.memoizedState = null;
        }
        return workInProgress2.child;
      }
      function bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2) {
        null !== current2 && (workInProgress2.dependencies = current2.dependencies);
        profilerStartTime = -1;
        workInProgressRootSkippedLanes |= workInProgress2.lanes;
        if (0 === (renderLanes2 & workInProgress2.childLanes))
          if (null !== current2) {
            if (propagateParentContextChanges(
              current2,
              workInProgress2,
              renderLanes2,
              false
            ), 0 === (renderLanes2 & workInProgress2.childLanes))
              return null;
          } else
            return null;
        if (null !== current2 && workInProgress2.child !== current2.child)
          throw Error("Resuming work not yet implemented.");
        if (null !== workInProgress2.child) {
          current2 = workInProgress2.child;
          renderLanes2 = createWorkInProgress(current2, current2.pendingProps);
          workInProgress2.child = renderLanes2;
          for (renderLanes2.return = workInProgress2; null !== current2.sibling; )
            current2 = current2.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current2, current2.pendingProps), renderLanes2.return = workInProgress2;
          renderLanes2.sibling = null;
        }
        return workInProgress2.child;
      }
      function checkScheduledUpdateOrContext(current2, renderLanes2) {
        if (0 !== (current2.lanes & renderLanes2))
          return true;
        current2 = current2.dependencies;
        return null !== current2 && checkIfContextChanged(current2) ? true : false;
      }
      function attemptEarlyBailoutIfNoScheduledUpdate(current2, workInProgress2, renderLanes2) {
        switch (workInProgress2.tag) {
          case 3:
            pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            );
            pushProvider(
              workInProgress2,
              CacheContext,
              current2.memoizedState.cache
            );
            resetHydrationState();
            break;
          case 27:
          case 5:
            pushHostContext(workInProgress2);
            break;
          case 4:
            pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            );
            break;
          case 10:
            pushProvider(
              workInProgress2,
              workInProgress2.type,
              workInProgress2.memoizedProps.value
            );
            break;
          case 12:
            0 !== (renderLanes2 & workInProgress2.childLanes) && (workInProgress2.flags |= 4);
            workInProgress2.flags |= 2048;
            var stateNode = workInProgress2.stateNode;
            stateNode.effectDuration = -0;
            stateNode.passiveEffectDuration = -0;
            break;
          case 13:
            stateNode = workInProgress2.memoizedState;
            if (null !== stateNode) {
              if (null !== stateNode.dehydrated)
                return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
              if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
                return updateSuspenseComponent(
                  current2,
                  workInProgress2,
                  renderLanes2
                );
              pushPrimaryTreeSuspenseHandler(workInProgress2);
              current2 = bailoutOnAlreadyFinishedWork(
                current2,
                workInProgress2,
                renderLanes2
              );
              return null !== current2 ? current2.sibling : null;
            }
            pushPrimaryTreeSuspenseHandler(workInProgress2);
            break;
          case 19:
            var didSuspendBefore = 0 !== (current2.flags & 128);
            stateNode = 0 !== (renderLanes2 & workInProgress2.childLanes);
            stateNode || (propagateParentContextChanges(
              current2,
              workInProgress2,
              renderLanes2,
              false
            ), stateNode = 0 !== (renderLanes2 & workInProgress2.childLanes));
            if (didSuspendBefore) {
              if (stateNode)
                return updateSuspenseListComponent(
                  current2,
                  workInProgress2,
                  renderLanes2
                );
              workInProgress2.flags |= 128;
            }
            didSuspendBefore = workInProgress2.memoizedState;
            null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
            push(
              suspenseStackCursor,
              suspenseStackCursor.current,
              workInProgress2
            );
            if (stateNode)
              break;
            else
              return null;
          case 22:
          case 23:
            return workInProgress2.lanes = 0, updateOffscreenComponent(current2, workInProgress2, renderLanes2);
          case 24:
            pushProvider(
              workInProgress2,
              CacheContext,
              current2.memoizedState.cache
            );
        }
        return bailoutOnAlreadyFinishedWork(current2, workInProgress2, renderLanes2);
      }
      function beginWork(current2, workInProgress2, renderLanes2) {
        if (workInProgress2._debugNeedsRemount && null !== current2) {
          renderLanes2 = createFiberFromTypeAndProps(
            workInProgress2.type,
            workInProgress2.key,
            workInProgress2.pendingProps,
            workInProgress2._debugOwner || null,
            workInProgress2.mode,
            workInProgress2.lanes
          );
          renderLanes2._debugStack = workInProgress2._debugStack;
          renderLanes2._debugTask = workInProgress2._debugTask;
          var returnFiber = workInProgress2.return;
          if (null === returnFiber)
            throw Error("Cannot swap the root fiber.");
          current2.alternate = null;
          workInProgress2.alternate = null;
          renderLanes2.index = workInProgress2.index;
          renderLanes2.sibling = workInProgress2.sibling;
          renderLanes2.return = workInProgress2.return;
          renderLanes2.ref = workInProgress2.ref;
          renderLanes2._debugInfo = workInProgress2._debugInfo;
          if (workInProgress2 === returnFiber.child)
            returnFiber.child = renderLanes2;
          else {
            var prevSibling = returnFiber.child;
            if (null === prevSibling)
              throw Error("Expected parent to have a child.");
            for (; prevSibling.sibling !== workInProgress2; )
              if (prevSibling = prevSibling.sibling, null === prevSibling)
                throw Error("Expected to find the previous sibling.");
            prevSibling.sibling = renderLanes2;
          }
          workInProgress2 = returnFiber.deletions;
          null === workInProgress2 ? (returnFiber.deletions = [current2], returnFiber.flags |= 16) : workInProgress2.push(current2);
          renderLanes2.flags |= 2;
          return renderLanes2;
        }
        if (null !== current2)
          if (current2.memoizedProps !== workInProgress2.pendingProps || workInProgress2.type !== current2.type)
            didReceiveUpdate = true;
          else {
            if (!checkScheduledUpdateOrContext(current2, renderLanes2) && 0 === (workInProgress2.flags & 128))
              return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
                current2,
                workInProgress2,
                renderLanes2
              );
            didReceiveUpdate = 0 !== (current2.flags & 131072) ? true : false;
          }
        else {
          didReceiveUpdate = false;
          if (returnFiber = isHydrating)
            warnIfNotHydrating(), returnFiber = 0 !== (workInProgress2.flags & 1048576);
          returnFiber && (returnFiber = workInProgress2.index, warnIfNotHydrating(), pushTreeId(workInProgress2, treeForkCount, returnFiber));
        }
        workInProgress2.lanes = 0;
        switch (workInProgress2.tag) {
          case 16:
            a:
              if (returnFiber = workInProgress2.pendingProps, current2 = callLazyInitInDEV(workInProgress2.elementType), workInProgress2.type = current2, "function" === typeof current2)
                shouldConstruct(current2) ? (returnFiber = resolveClassComponentProps(
                  current2,
                  returnFiber
                ), workInProgress2.tag = 1, workInProgress2.type = current2 = resolveFunctionForHotReloading(current2), workInProgress2 = updateClassComponent(
                  null,
                  workInProgress2,
                  current2,
                  returnFiber,
                  renderLanes2
                )) : (workInProgress2.tag = 0, validateFunctionComponentInDev(workInProgress2, current2), workInProgress2.type = current2 = resolveFunctionForHotReloading(current2), workInProgress2 = updateFunctionComponent(
                  null,
                  workInProgress2,
                  current2,
                  returnFiber,
                  renderLanes2
                ));
              else {
                if (void 0 !== current2 && null !== current2) {
                  if (prevSibling = current2.$$typeof, prevSibling === REACT_FORWARD_REF_TYPE) {
                    workInProgress2.tag = 11;
                    workInProgress2.type = current2 = resolveForwardRefForHotReloading(current2);
                    workInProgress2 = updateForwardRef(
                      null,
                      workInProgress2,
                      current2,
                      returnFiber,
                      renderLanes2
                    );
                    break a;
                  } else if (prevSibling === REACT_MEMO_TYPE) {
                    workInProgress2.tag = 14;
                    workInProgress2 = updateMemoComponent(
                      null,
                      workInProgress2,
                      current2,
                      returnFiber,
                      renderLanes2
                    );
                    break a;
                  }
                }
                workInProgress2 = "";
                null !== current2 && "object" === typeof current2 && current2.$$typeof === REACT_LAZY_TYPE && (workInProgress2 = " Did you wrap a component in React.lazy() more than once?");
                current2 = getComponentNameFromType(current2) || current2;
                throw Error(
                  "Element type is invalid. Received a promise that resolves to: " + current2 + ". Lazy element type must resolve to a class or function." + workInProgress2
                );
              }
            return workInProgress2;
          case 0:
            return updateFunctionComponent(
              current2,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 1:
            return returnFiber = workInProgress2.type, prevSibling = resolveClassComponentProps(
              returnFiber,
              workInProgress2.pendingProps
            ), updateClassComponent(
              current2,
              workInProgress2,
              returnFiber,
              prevSibling,
              renderLanes2
            );
          case 3:
            a: {
              pushHostContainer(
                workInProgress2,
                workInProgress2.stateNode.containerInfo
              );
              if (null === current2)
                throw Error(
                  "Should have a current fiber. This is a bug in React."
                );
              returnFiber = workInProgress2.pendingProps;
              var prevState = workInProgress2.memoizedState;
              prevSibling = prevState.element;
              cloneUpdateQueue(current2, workInProgress2);
              processUpdateQueue(workInProgress2, returnFiber, null, renderLanes2);
              var nextState = workInProgress2.memoizedState;
              returnFiber = nextState.cache;
              pushProvider(workInProgress2, CacheContext, returnFiber);
              returnFiber !== prevState.cache && propagateContextChanges(
                workInProgress2,
                [CacheContext],
                renderLanes2,
                true
              );
              suspendIfUpdateReadFromEntangledAsyncAction();
              returnFiber = nextState.element;
              if (prevState.isDehydrated)
                if (prevState = {
                  element: returnFiber,
                  isDehydrated: false,
                  cache: nextState.cache
                }, workInProgress2.updateQueue.baseState = prevState, workInProgress2.memoizedState = prevState, workInProgress2.flags & 256) {
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current2,
                    workInProgress2,
                    returnFiber,
                    renderLanes2
                  );
                  break a;
                } else if (returnFiber !== prevSibling) {
                  prevSibling = createCapturedValueAtFiber(
                    Error(
                      "This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."
                    ),
                    workInProgress2
                  );
                  queueHydrationError(prevSibling);
                  workInProgress2 = mountHostRootWithoutHydrating(
                    current2,
                    workInProgress2,
                    returnFiber,
                    renderLanes2
                  );
                  break a;
                } else {
                  current2 = workInProgress2.stateNode.containerInfo;
                  switch (current2.nodeType) {
                    case 9:
                      current2 = current2.body;
                      break;
                    default:
                      current2 = "HTML" === current2.nodeName ? current2.ownerDocument.body : current2;
                  }
                  nextHydratableInstance = getNextHydratable(current2.firstChild);
                  hydrationParentFiber = workInProgress2;
                  isHydrating = true;
                  hydrationErrors = null;
                  didSuspendOrErrorDEV = false;
                  hydrationDiffRootDEV = null;
                  rootOrSingletonContext = true;
                  current2 = mountChildFibers(
                    workInProgress2,
                    null,
                    returnFiber,
                    renderLanes2
                  );
                  for (workInProgress2.child = current2; current2; )
                    current2.flags = current2.flags & -3 | 4096, current2 = current2.sibling;
                }
              else {
                resetHydrationState();
                if (returnFiber === prevSibling) {
                  workInProgress2 = bailoutOnAlreadyFinishedWork(
                    current2,
                    workInProgress2,
                    renderLanes2
                  );
                  break a;
                }
                reconcileChildren(
                  current2,
                  workInProgress2,
                  returnFiber,
                  renderLanes2
                );
              }
              workInProgress2 = workInProgress2.child;
            }
            return workInProgress2;
          case 26:
            return markRef(current2, workInProgress2), null === current2 ? (current2 = getResource(
              workInProgress2.type,
              null,
              workInProgress2.pendingProps,
              null
            )) ? workInProgress2.memoizedState = current2 : isHydrating || (current2 = workInProgress2.type, renderLanes2 = workInProgress2.pendingProps, returnFiber = requiredContext(
              rootInstanceStackCursor.current
            ), returnFiber = getOwnerDocumentFromRootContainer(
              returnFiber
            ).createElement(current2), returnFiber[internalInstanceKey] = workInProgress2, returnFiber[internalPropsKey] = renderLanes2, setInitialProperties(returnFiber, current2, renderLanes2), markNodeAsHoistable(returnFiber), workInProgress2.stateNode = returnFiber) : workInProgress2.memoizedState = getResource(
              workInProgress2.type,
              current2.memoizedProps,
              workInProgress2.pendingProps,
              current2.memoizedState
            ), null;
          case 27:
            return pushHostContext(workInProgress2), null === current2 && isHydrating && (returnFiber = requiredContext(rootInstanceStackCursor.current), prevSibling = getHostContext(), returnFiber = workInProgress2.stateNode = resolveSingletonInstance(
              workInProgress2.type,
              workInProgress2.pendingProps,
              returnFiber,
              prevSibling,
              false
            ), didSuspendOrErrorDEV || (prevSibling = diffHydratedProperties(
              returnFiber,
              workInProgress2.type,
              workInProgress2.pendingProps,
              prevSibling
            ), null !== prevSibling && (buildHydrationDiffNode(workInProgress2, 0).serverProps = prevSibling)), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, prevSibling = nextHydratableInstance, isSingletonScope(workInProgress2.type) ? (previousHydratableOnEnteringScopedSingleton = prevSibling, nextHydratableInstance = getNextHydratable(
              returnFiber.firstChild
            )) : nextHydratableInstance = prevSibling), reconcileChildren(
              current2,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), markRef(current2, workInProgress2), null === current2 && (workInProgress2.flags |= 4194304), workInProgress2.child;
          case 5:
            return null === current2 && isHydrating && (prevState = getHostContext(), returnFiber = validateDOMNesting(
              workInProgress2.type,
              prevState.ancestorInfo
            ), prevSibling = nextHydratableInstance, (nextState = !prevSibling) || (nextState = canHydrateInstance(
              prevSibling,
              workInProgress2.type,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== nextState ? (workInProgress2.stateNode = nextState, didSuspendOrErrorDEV || (prevState = diffHydratedProperties(
              nextState,
              workInProgress2.type,
              workInProgress2.pendingProps,
              prevState
            ), null !== prevState && (buildHydrationDiffNode(workInProgress2, 0).serverProps = prevState)), hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(
              nextState.firstChild
            ), rootOrSingletonContext = false, prevState = true) : prevState = false, nextState = !prevState), nextState && (returnFiber && warnNonHydratedInstance(workInProgress2, prevSibling), throwOnHydrationMismatch(workInProgress2))), pushHostContext(workInProgress2), prevSibling = workInProgress2.type, prevState = workInProgress2.pendingProps, nextState = null !== current2 ? current2.memoizedProps : null, returnFiber = prevState.children, shouldSetTextContent(prevSibling, prevState) ? returnFiber = null : null !== nextState && shouldSetTextContent(prevSibling, nextState) && (workInProgress2.flags |= 32), null !== workInProgress2.memoizedState && (prevSibling = renderWithHooks(
              current2,
              workInProgress2,
              TransitionAwareHostComponent,
              null,
              null,
              renderLanes2
            ), HostTransitionContext._currentValue = prevSibling), markRef(current2, workInProgress2), reconcileChildren(
              current2,
              workInProgress2,
              returnFiber,
              renderLanes2
            ), workInProgress2.child;
          case 6:
            return null === current2 && isHydrating && (current2 = workInProgress2.pendingProps, renderLanes2 = getHostContext(), returnFiber = renderLanes2.ancestorInfo.current, current2 = null != returnFiber ? validateTextNesting(
              current2,
              returnFiber.tag,
              renderLanes2.ancestorInfo.implicitRootScope
            ) : true, renderLanes2 = nextHydratableInstance, (returnFiber = !renderLanes2) || (returnFiber = canHydrateTextInstance(
              renderLanes2,
              workInProgress2.pendingProps,
              rootOrSingletonContext
            ), null !== returnFiber ? (workInProgress2.stateNode = returnFiber, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, returnFiber = true) : returnFiber = false, returnFiber = !returnFiber), returnFiber && (current2 && warnNonHydratedInstance(workInProgress2, renderLanes2), throwOnHydrationMismatch(workInProgress2))), null;
          case 13:
            return updateSuspenseComponent(current2, workInProgress2, renderLanes2);
          case 4:
            return pushHostContainer(
              workInProgress2,
              workInProgress2.stateNode.containerInfo
            ), returnFiber = workInProgress2.pendingProps, null === current2 ? workInProgress2.child = reconcileChildFibers(
              workInProgress2,
              null,
              returnFiber,
              renderLanes2
            ) : reconcileChildren(
              current2,
              workInProgress2,
              returnFiber,
              renderLanes2
            ), workInProgress2.child;
          case 11:
            return updateForwardRef(
              current2,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 7:
            return reconcileChildren(
              current2,
              workInProgress2,
              workInProgress2.pendingProps,
              renderLanes2
            ), workInProgress2.child;
          case 8:
            return reconcileChildren(
              current2,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 12:
            return workInProgress2.flags |= 4, workInProgress2.flags |= 2048, returnFiber = workInProgress2.stateNode, returnFiber.effectDuration = -0, returnFiber.passiveEffectDuration = -0, reconcileChildren(
              current2,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 10:
            return returnFiber = workInProgress2.type, prevSibling = workInProgress2.pendingProps, prevState = prevSibling.value, "value" in prevSibling || hasWarnedAboutUsingNoValuePropOnContextProvider || (hasWarnedAboutUsingNoValuePropOnContextProvider = true, console.error(
              "The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"
            )), pushProvider(workInProgress2, returnFiber, prevState), reconcileChildren(
              current2,
              workInProgress2,
              prevSibling.children,
              renderLanes2
            ), workInProgress2.child;
          case 9:
            return prevSibling = workInProgress2.type._context, returnFiber = workInProgress2.pendingProps.children, "function" !== typeof returnFiber && console.error(
              "A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."
            ), prepareToReadContext(workInProgress2), prevSibling = readContext(prevSibling), markComponentRenderStarted(workInProgress2), returnFiber = callComponentInDEV(
              returnFiber,
              prevSibling,
              void 0
            ), markComponentRenderStopped(), workInProgress2.flags |= 1, reconcileChildren(
              current2,
              workInProgress2,
              returnFiber,
              renderLanes2
            ), workInProgress2.child;
          case 14:
            return updateMemoComponent(
              current2,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 15:
            return updateSimpleMemoComponent(
              current2,
              workInProgress2,
              workInProgress2.type,
              workInProgress2.pendingProps,
              renderLanes2
            );
          case 19:
            return updateSuspenseListComponent(
              current2,
              workInProgress2,
              renderLanes2
            );
          case 31:
            return returnFiber = workInProgress2.pendingProps, renderLanes2 = workInProgress2.mode, returnFiber = {
              mode: returnFiber.mode,
              children: returnFiber.children
            }, null === current2 ? (current2 = mountWorkInProgressOffscreenFiber(
              returnFiber,
              renderLanes2
            ), current2.ref = workInProgress2.ref, workInProgress2.child = current2, current2.return = workInProgress2, workInProgress2 = current2) : (current2 = createWorkInProgress(current2.child, returnFiber), current2.ref = workInProgress2.ref, workInProgress2.child = current2, current2.return = workInProgress2, workInProgress2 = current2), workInProgress2;
          case 22:
            return updateOffscreenComponent(current2, workInProgress2, renderLanes2);
          case 24:
            return prepareToReadContext(workInProgress2), returnFiber = readContext(CacheContext), null === current2 ? (prevSibling = peekCacheFromPool(), null === prevSibling && (prevSibling = workInProgressRoot, prevState = createCache(), prevSibling.pooledCache = prevState, retainCache(prevState), null !== prevState && (prevSibling.pooledCacheLanes |= renderLanes2), prevSibling = prevState), workInProgress2.memoizedState = {
              parent: returnFiber,
              cache: prevSibling
            }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, prevSibling)) : (0 !== (current2.lanes & renderLanes2) && (cloneUpdateQueue(current2, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), prevSibling = current2.memoizedState, prevState = workInProgress2.memoizedState, prevSibling.parent !== returnFiber ? (prevSibling = {
              parent: returnFiber,
              cache: returnFiber
            }, workInProgress2.memoizedState = prevSibling, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = prevSibling), pushProvider(workInProgress2, CacheContext, returnFiber)) : (returnFiber = prevState.cache, pushProvider(workInProgress2, CacheContext, returnFiber), returnFiber !== prevSibling.cache && propagateContextChanges(
              workInProgress2,
              [CacheContext],
              renderLanes2,
              true
            ))), reconcileChildren(
              current2,
              workInProgress2,
              workInProgress2.pendingProps.children,
              renderLanes2
            ), workInProgress2.child;
          case 29:
            throw workInProgress2.pendingProps;
        }
        throw Error(
          "Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue."
        );
      }
      function markUpdate(workInProgress2) {
        workInProgress2.flags |= 4;
      }
      function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
        if ("stylesheet" !== resource.type || (resource.state.loading & Inserted) !== NotLoaded)
          workInProgress2.flags &= -16777217;
        else if (workInProgress2.flags |= 16777216, !preloadResource(resource)) {
          resource = suspenseHandlerStackCursor.current;
          if (null !== resource && ((workInProgressRootRenderLanes & 4194048) === workInProgressRootRenderLanes ? null !== shellBoundary : (workInProgressRootRenderLanes & 62914560) !== workInProgressRootRenderLanes && 0 === (workInProgressRootRenderLanes & 536870912) || resource !== shellBoundary))
            throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
          workInProgress2.flags |= 8192;
        }
      }
      function scheduleRetryEffect(workInProgress2, retryQueue) {
        null !== retryQueue && (workInProgress2.flags |= 4);
        workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
      }
      function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
        if (!isHydrating)
          switch (renderState.tailMode) {
            case "hidden":
              hasRenderedATailFallback = renderState.tail;
              for (var lastTailNode = null; null !== hasRenderedATailFallback; )
                null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
              null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
              break;
            case "collapsed":
              lastTailNode = renderState.tail;
              for (var _lastTailNode = null; null !== lastTailNode; )
                null !== lastTailNode.alternate && (_lastTailNode = lastTailNode), lastTailNode = lastTailNode.sibling;
              null === _lastTailNode ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : _lastTailNode.sibling = null;
          }
      }
      function bubbleProperties(completedWork) {
        var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
        if (didBailout)
          if ((completedWork.mode & ProfileMode) !== NoMode) {
            for (var _treeBaseDuration = completedWork.selfBaseDuration, _child2 = completedWork.child; null !== _child2; )
              newChildLanes |= _child2.lanes | _child2.childLanes, subtreeFlags |= _child2.subtreeFlags & 65011712, subtreeFlags |= _child2.flags & 65011712, _treeBaseDuration += _child2.treeBaseDuration, _child2 = _child2.sibling;
            completedWork.treeBaseDuration = _treeBaseDuration;
          } else
            for (_treeBaseDuration = completedWork.child; null !== _treeBaseDuration; )
              newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags & 65011712, subtreeFlags |= _treeBaseDuration.flags & 65011712, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
        else if ((completedWork.mode & ProfileMode) !== NoMode) {
          _treeBaseDuration = completedWork.actualDuration;
          _child2 = completedWork.selfBaseDuration;
          for (var child = completedWork.child; null !== child; )
            newChildLanes |= child.lanes | child.childLanes, subtreeFlags |= child.subtreeFlags, subtreeFlags |= child.flags, _treeBaseDuration += child.actualDuration, _child2 += child.treeBaseDuration, child = child.sibling;
          completedWork.actualDuration = _treeBaseDuration;
          completedWork.treeBaseDuration = _child2;
        } else
          for (_treeBaseDuration = completedWork.child; null !== _treeBaseDuration; )
            newChildLanes |= _treeBaseDuration.lanes | _treeBaseDuration.childLanes, subtreeFlags |= _treeBaseDuration.subtreeFlags, subtreeFlags |= _treeBaseDuration.flags, _treeBaseDuration.return = completedWork, _treeBaseDuration = _treeBaseDuration.sibling;
        completedWork.subtreeFlags |= subtreeFlags;
        completedWork.childLanes = newChildLanes;
        return didBailout;
      }
      function completeWork(current2, workInProgress2, renderLanes2) {
        var newProps = workInProgress2.pendingProps;
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 31:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return bubbleProperties(workInProgress2), null;
          case 1:
            return bubbleProperties(workInProgress2), null;
          case 3:
            renderLanes2 = workInProgress2.stateNode;
            newProps = null;
            null !== current2 && (newProps = current2.memoizedState.cache);
            workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
            popProvider(CacheContext, workInProgress2);
            popHostContainer(workInProgress2);
            renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
            if (null === current2 || null === current2.child)
              popHydrationState(workInProgress2) ? (emitPendingHydrationWarnings(), markUpdate(workInProgress2)) : null === current2 || current2.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, upgradeHydrationErrorsToRecoverable());
            bubbleProperties(workInProgress2);
            return null;
          case 26:
            return renderLanes2 = workInProgress2.memoizedState, null === current2 ? (markUpdate(workInProgress2), null !== renderLanes2 ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(
              workInProgress2,
              renderLanes2
            )) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217)) : renderLanes2 ? renderLanes2 !== current2.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(
              workInProgress2,
              renderLanes2
            )) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current2.memoizedProps !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217), null;
          case 27:
            popHostContext(workInProgress2);
            renderLanes2 = requiredContext(rootInstanceStackCursor.current);
            var _type = workInProgress2.type;
            if (null !== current2 && null != workInProgress2.stateNode)
              current2.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(
                    "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                  );
                bubbleProperties(workInProgress2);
                return null;
              }
              current2 = getHostContext();
              popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2, current2) : (current2 = resolveSingletonInstance(
                _type,
                newProps,
                renderLanes2,
                current2,
                true
              ), workInProgress2.stateNode = current2, markUpdate(workInProgress2));
            }
            bubbleProperties(workInProgress2);
            return null;
          case 5:
            popHostContext(workInProgress2);
            renderLanes2 = workInProgress2.type;
            if (null !== current2 && null != workInProgress2.stateNode)
              current2.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if (!newProps) {
                if (null === workInProgress2.stateNode)
                  throw Error(
                    "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                  );
                bubbleProperties(workInProgress2);
                return null;
              }
              _type = getHostContext();
              if (popHydrationState(workInProgress2))
                prepareToHydrateHostInstance(workInProgress2, _type);
              else {
                current2 = requiredContext(rootInstanceStackCursor.current);
                validateDOMNesting(renderLanes2, _type.ancestorInfo);
                _type = _type.context;
                current2 = getOwnerDocumentFromRootContainer(current2);
                switch (_type) {
                  case HostContextNamespaceSvg:
                    current2 = current2.createElementNS(SVG_NAMESPACE, renderLanes2);
                    break;
                  case HostContextNamespaceMath:
                    current2 = current2.createElementNS(
                      MATH_NAMESPACE,
                      renderLanes2
                    );
                    break;
                  default:
                    switch (renderLanes2) {
                      case "svg":
                        current2 = current2.createElementNS(
                          SVG_NAMESPACE,
                          renderLanes2
                        );
                        break;
                      case "math":
                        current2 = current2.createElementNS(
                          MATH_NAMESPACE,
                          renderLanes2
                        );
                        break;
                      case "script":
                        current2 = current2.createElement("div");
                        current2.innerHTML = "<script><\/script>";
                        current2 = current2.removeChild(current2.firstChild);
                        break;
                      case "select":
                        current2 = "string" === typeof newProps.is ? current2.createElement("select", { is: newProps.is }) : current2.createElement("select");
                        newProps.multiple ? current2.multiple = true : newProps.size && (current2.size = newProps.size);
                        break;
                      default:
                        current2 = "string" === typeof newProps.is ? current2.createElement(renderLanes2, {
                          is: newProps.is
                        }) : current2.createElement(renderLanes2), -1 === renderLanes2.indexOf("-") && (renderLanes2 !== renderLanes2.toLowerCase() && console.error(
                          "<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",
                          renderLanes2
                        ), "[object HTMLUnknownElement]" !== Object.prototype.toString.call(current2) || hasOwnProperty.call(
                          warnedUnknownTags,
                          renderLanes2
                        ) || (warnedUnknownTags[renderLanes2] = true, console.error(
                          "The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",
                          renderLanes2
                        )));
                    }
                }
                current2[internalInstanceKey] = workInProgress2;
                current2[internalPropsKey] = newProps;
                a:
                  for (_type = workInProgress2.child; null !== _type; ) {
                    if (5 === _type.tag || 6 === _type.tag)
                      current2.appendChild(_type.stateNode);
                    else if (4 !== _type.tag && 27 !== _type.tag && null !== _type.child) {
                      _type.child.return = _type;
                      _type = _type.child;
                      continue;
                    }
                    if (_type === workInProgress2)
                      break a;
                    for (; null === _type.sibling; ) {
                      if (null === _type.return || _type.return === workInProgress2)
                        break a;
                      _type = _type.return;
                    }
                    _type.sibling.return = _type.return;
                    _type = _type.sibling;
                  }
                workInProgress2.stateNode = current2;
                a:
                  switch (setInitialProperties(current2, renderLanes2, newProps), renderLanes2) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      current2 = !!newProps.autoFocus;
                      break a;
                    case "img":
                      current2 = true;
                      break a;
                    default:
                      current2 = false;
                  }
                current2 && markUpdate(workInProgress2);
              }
            }
            bubbleProperties(workInProgress2);
            workInProgress2.flags &= -16777217;
            return null;
          case 6:
            if (current2 && null != workInProgress2.stateNode)
              current2.memoizedProps !== newProps && markUpdate(workInProgress2);
            else {
              if ("string" !== typeof newProps && null === workInProgress2.stateNode)
                throw Error(
                  "We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue."
                );
              current2 = requiredContext(rootInstanceStackCursor.current);
              renderLanes2 = getHostContext();
              if (popHydrationState(workInProgress2)) {
                current2 = workInProgress2.stateNode;
                renderLanes2 = workInProgress2.memoizedProps;
                _type = !didSuspendOrErrorDEV;
                newProps = null;
                var returnFiber = hydrationParentFiber;
                if (null !== returnFiber)
                  switch (returnFiber.tag) {
                    case 3:
                      _type && (_type = diffHydratedTextForDevWarnings(
                        current2,
                        renderLanes2,
                        newProps
                      ), null !== _type && (buildHydrationDiffNode(workInProgress2, 0).serverProps = _type));
                      break;
                    case 27:
                    case 5:
                      newProps = returnFiber.memoizedProps, _type && (_type = diffHydratedTextForDevWarnings(
                        current2,
                        renderLanes2,
                        newProps
                      ), null !== _type && (buildHydrationDiffNode(
                        workInProgress2,
                        0
                      ).serverProps = _type));
                  }
                current2[internalInstanceKey] = workInProgress2;
                current2 = current2.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current2.nodeValue, renderLanes2) ? true : false;
                current2 || throwOnHydrationMismatch(workInProgress2);
              } else
                _type = renderLanes2.ancestorInfo.current, null != _type && validateTextNesting(
                  newProps,
                  _type.tag,
                  renderLanes2.ancestorInfo.implicitRootScope
                ), current2 = getOwnerDocumentFromRootContainer(current2).createTextNode(
                  newProps
                ), current2[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current2;
            }
            bubbleProperties(workInProgress2);
            return null;
          case 13:
            newProps = workInProgress2.memoizedState;
            if (null === current2 || null !== current2.memoizedState && null !== current2.memoizedState.dehydrated) {
              _type = popHydrationState(workInProgress2);
              if (null !== newProps && null !== newProps.dehydrated) {
                if (null === current2) {
                  if (!_type)
                    throw Error(
                      "A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React."
                    );
                  _type = workInProgress2.memoizedState;
                  _type = null !== _type ? _type.dehydrated : null;
                  if (!_type)
                    throw Error(
                      "Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue."
                    );
                  _type[internalInstanceKey] = workInProgress2;
                  bubbleProperties(workInProgress2);
                  (workInProgress2.mode & ProfileMode) !== NoMode && null !== newProps && (_type = workInProgress2.child, null !== _type && (workInProgress2.treeBaseDuration -= _type.treeBaseDuration));
                } else
                  emitPendingHydrationWarnings(), resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4, bubbleProperties(workInProgress2), (workInProgress2.mode & ProfileMode) !== NoMode && null !== newProps && (_type = workInProgress2.child, null !== _type && (workInProgress2.treeBaseDuration -= _type.treeBaseDuration));
                _type = false;
              } else
                _type = upgradeHydrationErrorsToRecoverable(), null !== current2 && null !== current2.memoizedState && (current2.memoizedState.hydrationErrors = _type), _type = true;
              if (!_type) {
                if (workInProgress2.flags & 256)
                  return popSuspenseHandler(workInProgress2), workInProgress2;
                popSuspenseHandler(workInProgress2);
                return null;
              }
            }
            popSuspenseHandler(workInProgress2);
            if (0 !== (workInProgress2.flags & 128))
              return workInProgress2.lanes = renderLanes2, (workInProgress2.mode & ProfileMode) !== NoMode && transferActualDuration(workInProgress2), workInProgress2;
            renderLanes2 = null !== newProps;
            current2 = null !== current2 && null !== current2.memoizedState;
            renderLanes2 && (newProps = workInProgress2.child, _type = null, null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (_type = newProps.alternate.memoizedState.cachePool.pool), returnFiber = null, null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (returnFiber = newProps.memoizedState.cachePool.pool), returnFiber !== _type && (newProps.flags |= 2048));
            renderLanes2 !== current2 && renderLanes2 && (workInProgress2.child.flags |= 8192);
            scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
            bubbleProperties(workInProgress2);
            (workInProgress2.mode & ProfileMode) !== NoMode && renderLanes2 && (current2 = workInProgress2.child, null !== current2 && (workInProgress2.treeBaseDuration -= current2.treeBaseDuration));
            return null;
          case 4:
            return popHostContainer(workInProgress2), null === current2 && listenToAllSupportedEvents(
              workInProgress2.stateNode.containerInfo
            ), bubbleProperties(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type, workInProgress2), bubbleProperties(workInProgress2), null;
          case 19:
            pop(suspenseStackCursor, workInProgress2);
            _type = workInProgress2.memoizedState;
            if (null === _type)
              return bubbleProperties(workInProgress2), null;
            newProps = 0 !== (workInProgress2.flags & 128);
            returnFiber = _type.rendering;
            if (null === returnFiber)
              if (newProps)
                cutOffTailIfNeeded(_type, false);
              else {
                if (workInProgressRootExitStatus !== RootInProgress || null !== current2 && 0 !== (current2.flags & 128))
                  for (current2 = workInProgress2.child; null !== current2; ) {
                    returnFiber = findFirstSuspended(current2);
                    if (null !== returnFiber) {
                      workInProgress2.flags |= 128;
                      cutOffTailIfNeeded(_type, false);
                      current2 = returnFiber.updateQueue;
                      workInProgress2.updateQueue = current2;
                      scheduleRetryEffect(workInProgress2, current2);
                      workInProgress2.subtreeFlags = 0;
                      current2 = renderLanes2;
                      for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                        resetWorkInProgress(renderLanes2, current2), renderLanes2 = renderLanes2.sibling;
                      push(
                        suspenseStackCursor,
                        suspenseStackCursor.current & SubtreeSuspenseContextMask | ForceSuspenseFallback,
                        workInProgress2
                      );
                      return workInProgress2.child;
                    }
                    current2 = current2.sibling;
                  }
                null !== _type.tail && now$1() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(_type, false), workInProgress2.lanes = 4194304);
              }
            else {
              if (!newProps)
                if (current2 = findFirstSuspended(returnFiber), null !== current2) {
                  if (workInProgress2.flags |= 128, newProps = true, current2 = current2.updateQueue, workInProgress2.updateQueue = current2, scheduleRetryEffect(workInProgress2, current2), cutOffTailIfNeeded(_type, true), null === _type.tail && "hidden" === _type.tailMode && !returnFiber.alternate && !isHydrating)
                    return bubbleProperties(workInProgress2), null;
                } else
                  2 * now$1() - _type.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(_type, false), workInProgress2.lanes = 4194304);
              _type.isBackwards ? (returnFiber.sibling = workInProgress2.child, workInProgress2.child = returnFiber) : (current2 = _type.last, null !== current2 ? current2.sibling = returnFiber : workInProgress2.child = returnFiber, _type.last = returnFiber);
            }
            if (null !== _type.tail)
              return current2 = _type.tail, _type.rendering = current2, _type.tail = current2.sibling, _type.renderingStartTime = now$1(), current2.sibling = null, renderLanes2 = suspenseStackCursor.current, renderLanes2 = newProps ? renderLanes2 & SubtreeSuspenseContextMask | ForceSuspenseFallback : renderLanes2 & SubtreeSuspenseContextMask, push(suspenseStackCursor, renderLanes2, workInProgress2), current2;
            bubbleProperties(workInProgress2);
            return null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(workInProgress2), newProps = null !== workInProgress2.memoizedState, null !== current2 ? null !== current2.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current2 && null !== current2.memoizedState && null !== current2.memoizedState.cachePool && (renderLanes2 = current2.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current2 && pop(resumedCache, workInProgress2), null;
          case 24:
            return renderLanes2 = null, null !== current2 && (renderLanes2 = current2.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext, workInProgress2), bubbleProperties(workInProgress2), null;
          case 25:
            return null;
          case 30:
            return null;
        }
        throw Error(
          "Unknown unit of work tag (" + workInProgress2.tag + "). This error is likely caused by a bug in React. Please file an issue."
        );
      }
      function unwindWork(current2, workInProgress2) {
        popTreeContext(workInProgress2);
        switch (workInProgress2.tag) {
          case 1:
            return current2 = workInProgress2.flags, current2 & 65536 ? (workInProgress2.flags = current2 & -65537 | 128, (workInProgress2.mode & ProfileMode) !== NoMode && transferActualDuration(workInProgress2), workInProgress2) : null;
          case 3:
            return popProvider(CacheContext, workInProgress2), popHostContainer(workInProgress2), current2 = workInProgress2.flags, 0 !== (current2 & 65536) && 0 === (current2 & 128) ? (workInProgress2.flags = current2 & -65537 | 128, workInProgress2) : null;
          case 26:
          case 27:
          case 5:
            return popHostContext(workInProgress2), null;
          case 13:
            popSuspenseHandler(workInProgress2);
            current2 = workInProgress2.memoizedState;
            if (null !== current2 && null !== current2.dehydrated) {
              if (null === workInProgress2.alternate)
                throw Error(
                  "Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue."
                );
              resetHydrationState();
            }
            current2 = workInProgress2.flags;
            return current2 & 65536 ? (workInProgress2.flags = current2 & -65537 | 128, (workInProgress2.mode & ProfileMode) !== NoMode && transferActualDuration(workInProgress2), workInProgress2) : null;
          case 19:
            return pop(suspenseStackCursor, workInProgress2), null;
          case 4:
            return popHostContainer(workInProgress2), null;
          case 10:
            return popProvider(workInProgress2.type, workInProgress2), null;
          case 22:
          case 23:
            return popSuspenseHandler(workInProgress2), popHiddenContext(workInProgress2), null !== current2 && pop(resumedCache, workInProgress2), current2 = workInProgress2.flags, current2 & 65536 ? (workInProgress2.flags = current2 & -65537 | 128, (workInProgress2.mode & ProfileMode) !== NoMode && transferActualDuration(workInProgress2), workInProgress2) : null;
          case 24:
            return popProvider(CacheContext, workInProgress2), null;
          case 25:
            return null;
          default:
            return null;
        }
      }
      function unwindInterruptedWork(current2, interruptedWork) {
        popTreeContext(interruptedWork);
        switch (interruptedWork.tag) {
          case 3:
            popProvider(CacheContext, interruptedWork);
            popHostContainer(interruptedWork);
            break;
          case 26:
          case 27:
          case 5:
            popHostContext(interruptedWork);
            break;
          case 4:
            popHostContainer(interruptedWork);
            break;
          case 13:
            popSuspenseHandler(interruptedWork);
            break;
          case 19:
            pop(suspenseStackCursor, interruptedWork);
            break;
          case 10:
            popProvider(interruptedWork.type, interruptedWork);
            break;
          case 22:
          case 23:
            popSuspenseHandler(interruptedWork);
            popHiddenContext(interruptedWork);
            null !== current2 && pop(resumedCache, interruptedWork);
            break;
          case 24:
            popProvider(CacheContext, interruptedWork);
        }
      }
      function shouldProfile(current2) {
        return (current2.mode & ProfileMode) !== NoMode;
      }
      function commitHookLayoutEffects(finishedWork, hookFlags) {
        shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListMount(hookFlags, finishedWork), recordEffectDuration()) : commitHookEffectListMount(hookFlags, finishedWork);
      }
      function commitHookLayoutUnmountEffects(finishedWork, nearestMountedAncestor, hookFlags) {
        shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListUnmount(
          hookFlags,
          finishedWork,
          nearestMountedAncestor
        ), recordEffectDuration()) : commitHookEffectListUnmount(
          hookFlags,
          finishedWork,
          nearestMountedAncestor
        );
      }
      function commitHookEffectListMount(flags, finishedWork) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags && ((flags & Passive) !== NoFlags ? null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentPassiveEffectMountStarted && injectedProfilingHooks.markComponentPassiveEffectMountStarted(
                finishedWork
              ) : (flags & Layout) !== NoFlags && null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentLayoutEffectMountStarted && injectedProfilingHooks.markComponentLayoutEffectMountStarted(
                finishedWork
              ), lastEffect = void 0, (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = true), lastEffect = runWithFiberInDEV(
                finishedWork,
                callCreateInDEV,
                updateQueue
              ), (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = false), (flags & Passive) !== NoFlags ? null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentPassiveEffectMountStopped && injectedProfilingHooks.markComponentPassiveEffectMountStopped() : (flags & Layout) !== NoFlags && null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentLayoutEffectMountStopped && injectedProfilingHooks.markComponentLayoutEffectMountStopped(), void 0 !== lastEffect && "function" !== typeof lastEffect)) {
                var hookName = void 0;
                hookName = 0 !== (updateQueue.tag & Layout) ? "useLayoutEffect" : 0 !== (updateQueue.tag & Insertion) ? "useInsertionEffect" : "useEffect";
                var addendum = void 0;
                addendum = null === lastEffect ? " You returned null. If your effect does not require clean up, return undefined (or nothing)." : "function" === typeof lastEffect.then ? "\n\nIt looks like you wrote " + hookName + "(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n" + hookName + "(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching" : " You returned: " + lastEffect;
                runWithFiberInDEV(
                  finishedWork,
                  function(n, a) {
                    console.error(
                      "%s must not return anything besides a function, which is used for clean-up.%s",
                      n,
                      a
                    );
                  },
                  hookName,
                  addendum
                );
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor) {
        try {
          var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
          if (null !== lastEffect) {
            var firstEffect = lastEffect.next;
            updateQueue = firstEffect;
            do {
              if ((updateQueue.tag & flags) === flags) {
                var inst = updateQueue.inst, destroy = inst.destroy;
                void 0 !== destroy && (inst.destroy = void 0, (flags & Passive) !== NoFlags ? null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStarted && injectedProfilingHooks.markComponentPassiveEffectUnmountStarted(
                  finishedWork
                ) : (flags & Layout) !== NoFlags && null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStarted && injectedProfilingHooks.markComponentLayoutEffectUnmountStarted(
                  finishedWork
                ), (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = true), lastEffect = finishedWork, runWithFiberInDEV(
                  lastEffect,
                  callDestroyInDEV,
                  lastEffect,
                  nearestMountedAncestor,
                  destroy
                ), (flags & Insertion) !== NoFlags && (isRunningInsertionEffect = false), (flags & Passive) !== NoFlags ? null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentPassiveEffectUnmountStopped && injectedProfilingHooks.markComponentPassiveEffectUnmountStopped() : (flags & Layout) !== NoFlags && null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentLayoutEffectUnmountStopped && injectedProfilingHooks.markComponentLayoutEffectUnmountStopped());
              }
              updateQueue = updateQueue.next;
            } while (updateQueue !== firstEffect);
          }
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHookPassiveMountEffects(finishedWork, hookFlags) {
        shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListMount(hookFlags, finishedWork), recordEffectDuration()) : commitHookEffectListMount(hookFlags, finishedWork);
      }
      function commitHookPassiveUnmountEffects(finishedWork, nearestMountedAncestor, hookFlags) {
        shouldProfile(finishedWork) ? (startEffectTimer(), commitHookEffectListUnmount(
          hookFlags,
          finishedWork,
          nearestMountedAncestor
        ), recordEffectDuration()) : commitHookEffectListUnmount(
          hookFlags,
          finishedWork,
          nearestMountedAncestor
        );
      }
      function commitClassCallbacks(finishedWork) {
        var updateQueue = finishedWork.updateQueue;
        if (null !== updateQueue) {
          var instance = finishedWork.stateNode;
          finishedWork.type.defaultProps || "ref" in finishedWork.memoizedProps || didWarnAboutReassigningProps || (instance.props !== finishedWork.memoizedProps && console.error(
            "Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
            getComponentNameFromFiber(finishedWork) || "instance"
          ), instance.state !== finishedWork.memoizedState && console.error(
            "Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
            getComponentNameFromFiber(finishedWork) || "instance"
          ));
          try {
            runWithFiberInDEV(
              finishedWork,
              commitCallbacks,
              updateQueue,
              instance
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }
      function callGetSnapshotBeforeUpdates(instance, prevProps, prevState) {
        return instance.getSnapshotBeforeUpdate(prevProps, prevState);
      }
      function commitClassSnapshot(finishedWork, current2) {
        var prevProps = current2.memoizedProps, prevState = current2.memoizedState;
        current2 = finishedWork.stateNode;
        finishedWork.type.defaultProps || "ref" in finishedWork.memoizedProps || didWarnAboutReassigningProps || (current2.props !== finishedWork.memoizedProps && console.error(
          "Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
          getComponentNameFromFiber(finishedWork) || "instance"
        ), current2.state !== finishedWork.memoizedState && console.error(
          "Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
          getComponentNameFromFiber(finishedWork) || "instance"
        ));
        try {
          var resolvedPrevProps = resolveClassComponentProps(
            finishedWork.type,
            prevProps,
            finishedWork.elementType === finishedWork.type
          );
          var snapshot = runWithFiberInDEV(
            finishedWork,
            callGetSnapshotBeforeUpdates,
            current2,
            resolvedPrevProps,
            prevState
          );
          prevProps = didWarnAboutUndefinedSnapshotBeforeUpdate;
          void 0 !== snapshot || prevProps.has(finishedWork.type) || (prevProps.add(finishedWork.type), runWithFiberInDEV(finishedWork, function() {
            console.error(
              "%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",
              getComponentNameFromFiber(finishedWork)
            );
          }));
          current2.__reactInternalSnapshotBeforeUpdate = snapshot;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function safelyCallComponentWillUnmount(current2, nearestMountedAncestor, instance) {
        instance.props = resolveClassComponentProps(
          current2.type,
          current2.memoizedProps
        );
        instance.state = current2.memoizedState;
        shouldProfile(current2) ? (startEffectTimer(), runWithFiberInDEV(
          current2,
          callComponentWillUnmountInDEV,
          current2,
          nearestMountedAncestor,
          instance
        ), recordEffectDuration()) : runWithFiberInDEV(
          current2,
          callComponentWillUnmountInDEV,
          current2,
          nearestMountedAncestor,
          instance
        );
      }
      function commitAttachRef(finishedWork) {
        var ref = finishedWork.ref;
        if (null !== ref) {
          switch (finishedWork.tag) {
            case 26:
            case 27:
            case 5:
              var instanceToUse = finishedWork.stateNode;
              break;
            case 30:
              instanceToUse = finishedWork.stateNode;
              break;
            default:
              instanceToUse = finishedWork.stateNode;
          }
          if ("function" === typeof ref)
            if (shouldProfile(finishedWork))
              try {
                startEffectTimer(), finishedWork.refCleanup = ref(instanceToUse);
              } finally {
                recordEffectDuration();
              }
            else
              finishedWork.refCleanup = ref(instanceToUse);
          else
            "string" === typeof ref ? console.error("String refs are no longer supported.") : ref.hasOwnProperty("current") || console.error(
              "Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",
              getComponentNameFromFiber(finishedWork)
            ), ref.current = instanceToUse;
        }
      }
      function safelyAttachRef(current2, nearestMountedAncestor) {
        try {
          runWithFiberInDEV(current2, commitAttachRef, current2);
        } catch (error) {
          captureCommitPhaseError(current2, nearestMountedAncestor, error);
        }
      }
      function safelyDetachRef(current2, nearestMountedAncestor) {
        var ref = current2.ref, refCleanup = current2.refCleanup;
        if (null !== ref)
          if ("function" === typeof refCleanup)
            try {
              if (shouldProfile(current2))
                try {
                  startEffectTimer(), runWithFiberInDEV(current2, refCleanup);
                } finally {
                  recordEffectDuration(current2);
                }
              else
                runWithFiberInDEV(current2, refCleanup);
            } catch (error) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error);
            } finally {
              current2.refCleanup = null, current2 = current2.alternate, null != current2 && (current2.refCleanup = null);
            }
          else if ("function" === typeof ref)
            try {
              if (shouldProfile(current2))
                try {
                  startEffectTimer(), runWithFiberInDEV(current2, ref, null);
                } finally {
                  recordEffectDuration(current2);
                }
              else
                runWithFiberInDEV(current2, ref, null);
            } catch (error$7) {
              captureCommitPhaseError(current2, nearestMountedAncestor, error$7);
            }
          else
            ref.current = null;
      }
      function commitProfiler(finishedWork, current2, commitStartTime2, effectDuration) {
        var _finishedWork$memoize = finishedWork.memoizedProps, id = _finishedWork$memoize.id, onCommit = _finishedWork$memoize.onCommit;
        _finishedWork$memoize = _finishedWork$memoize.onRender;
        current2 = null === current2 ? "mount" : "update";
        currentUpdateIsNested && (current2 = "nested-update");
        "function" === typeof _finishedWork$memoize && _finishedWork$memoize(
          id,
          current2,
          finishedWork.actualDuration,
          finishedWork.treeBaseDuration,
          finishedWork.actualStartTime,
          commitStartTime2
        );
        "function" === typeof onCommit && onCommit(
          finishedWork.memoizedProps.id,
          current2,
          effectDuration,
          commitStartTime2
        );
      }
      function commitProfilerPostCommitImpl(finishedWork, current2, commitStartTime2, passiveEffectDuration) {
        var _finishedWork$memoize2 = finishedWork.memoizedProps;
        finishedWork = _finishedWork$memoize2.id;
        _finishedWork$memoize2 = _finishedWork$memoize2.onPostCommit;
        current2 = null === current2 ? "mount" : "update";
        currentUpdateIsNested && (current2 = "nested-update");
        "function" === typeof _finishedWork$memoize2 && _finishedWork$memoize2(
          finishedWork,
          current2,
          passiveEffectDuration,
          commitStartTime2
        );
      }
      function commitHostMount(finishedWork) {
        var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
        try {
          runWithFiberInDEV(
            finishedWork,
            commitMount,
            instance,
            type,
            props,
            finishedWork
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitHostUpdate(finishedWork, newProps, oldProps) {
        try {
          runWithFiberInDEV(
            finishedWork,
            commitUpdate,
            finishedWork.stateNode,
            finishedWork.type,
            oldProps,
            newProps,
            finishedWork
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function isHostParent(fiber) {
        return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag && isSingletonScope(fiber.type) || 4 === fiber.tag;
      }
      function getHostSibling(fiber) {
        a:
          for (; ; ) {
            for (; null === fiber.sibling; ) {
              if (null === fiber.return || isHostParent(fiber.return))
                return null;
              fiber = fiber.return;
            }
            fiber.sibling.return = fiber.return;
            for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 18 !== fiber.tag; ) {
              if (27 === fiber.tag && isSingletonScope(fiber.type))
                continue a;
              if (fiber.flags & 2)
                continue a;
              if (null === fiber.child || 4 === fiber.tag)
                continue a;
              else
                fiber.child.return = fiber, fiber = fiber.child;
            }
            if (!(fiber.flags & 2))
              return fiber.stateNode;
          }
      }
      function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? (9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent).insertBefore(node, before) : (before = 9 === parent.nodeType ? parent.body : "HTML" === parent.nodeName ? parent.ownerDocument.body : parent, before.appendChild(node), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode, before = null), node = node.child, null !== node))
          for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
      }
      function insertOrAppendPlacementNode(node, before, parent) {
        var tag = node.tag;
        if (5 === tag || 6 === tag)
          node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
        else if (4 !== tag && (27 === tag && isSingletonScope(node.type) && (parent = node.stateNode), node = node.child, null !== node))
          for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
            insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
      }
      function commitPlacement(finishedWork) {
        for (var hostParentFiber, parentFiber = finishedWork.return; null !== parentFiber; ) {
          if (isHostParent(parentFiber)) {
            hostParentFiber = parentFiber;
            break;
          }
          parentFiber = parentFiber.return;
        }
        if (null == hostParentFiber)
          throw Error(
            "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
          );
        switch (hostParentFiber.tag) {
          case 27:
            hostParentFiber = hostParentFiber.stateNode;
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              parentFiber,
              hostParentFiber
            );
            break;
          case 5:
            parentFiber = hostParentFiber.stateNode;
            hostParentFiber.flags & 32 && (resetTextContent(parentFiber), hostParentFiber.flags &= -33);
            hostParentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(
              finishedWork,
              hostParentFiber,
              parentFiber
            );
            break;
          case 3:
          case 4:
            hostParentFiber = hostParentFiber.stateNode.containerInfo;
            parentFiber = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              parentFiber,
              hostParentFiber
            );
            break;
          default:
            throw Error(
              "Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue."
            );
        }
      }
      function commitHostSingletonAcquisition(finishedWork) {
        var singleton = finishedWork.stateNode, props = finishedWork.memoizedProps;
        try {
          runWithFiberInDEV(
            finishedWork,
            acquireSingletonInstance,
            finishedWork.type,
            props,
            singleton,
            finishedWork
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      function commitBeforeMutationEffects(root2, firstChild) {
        root2 = root2.containerInfo;
        eventsEnabled = _enabled;
        root2 = getActiveElementDeep(root2);
        if (hasSelectionCapabilities(root2)) {
          if ("selectionStart" in root2)
            var JSCompiler_temp = {
              start: root2.selectionStart,
              end: root2.selectionEnd
            };
          else
            a: {
              JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
              var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
              if (selection && 0 !== selection.rangeCount) {
                JSCompiler_temp = selection.anchorNode;
                var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
                selection = selection.focusOffset;
                try {
                  JSCompiler_temp.nodeType, focusNode.nodeType;
                } catch (e$2) {
                  JSCompiler_temp = null;
                  break a;
                }
                var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
                b:
                  for (; ; ) {
                    for (var next; ; ) {
                      node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
                      node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
                      3 === node.nodeType && (length += node.nodeValue.length);
                      if (null === (next = node.firstChild))
                        break;
                      parentNode = node;
                      node = next;
                    }
                    for (; ; ) {
                      if (node === root2)
                        break b;
                      parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
                      parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
                      if (null !== (next = node.nextSibling))
                        break;
                      node = parentNode;
                      parentNode = node.parentNode;
                    }
                    node = next;
                  }
                JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
              } else
                JSCompiler_temp = null;
            }
          JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
        } else
          JSCompiler_temp = null;
        selectionInformation = {
          focusedElem: root2,
          selectionRange: JSCompiler_temp
        };
        _enabled = false;
        for (nextEffect = firstChild; null !== nextEffect; )
          if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1024) && null !== root2)
            root2.return = firstChild, nextEffect = root2;
          else
            for (; null !== nextEffect; ) {
              root2 = firstChild = nextEffect;
              JSCompiler_temp = root2.alternate;
              anchorOffset = root2.flags;
              switch (root2.tag) {
                case 0:
                  break;
                case 11:
                case 15:
                  break;
                case 1:
                  0 !== (anchorOffset & 1024) && null !== JSCompiler_temp && commitClassSnapshot(root2, JSCompiler_temp);
                  break;
                case 3:
                  if (0 !== (anchorOffset & 1024)) {
                    if (root2 = root2.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                      clearContainerSparingly(root2);
                    else if (1 === JSCompiler_temp)
                      switch (root2.nodeName) {
                        case "HEAD":
                        case "HTML":
                        case "BODY":
                          clearContainerSparingly(root2);
                          break;
                        default:
                          root2.textContent = "";
                      }
                  }
                  break;
                case 5:
                case 26:
                case 27:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  if (0 !== (anchorOffset & 1024))
                    throw Error(
                      "This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue."
                    );
              }
              root2 = firstChild.sibling;
              if (null !== root2) {
                root2.return = firstChild.return;
                nextEffect = root2;
                break;
              }
              nextEffect = firstChild.return;
            }
      }
      function commitLayoutEffectOnFiber(finishedRoot, current2, finishedWork) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitHookLayoutEffects(finishedWork, Layout | HasEffect);
            break;
          case 1:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 4)
              if (finishedRoot = finishedWork.stateNode, null === current2)
                finishedWork.type.defaultProps || "ref" in finishedWork.memoizedProps || didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error(
                  "Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                  getComponentNameFromFiber(finishedWork) || "instance"
                ), finishedRoot.state !== finishedWork.memoizedState && console.error(
                  "Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                  getComponentNameFromFiber(finishedWork) || "instance"
                )), shouldProfile(finishedWork) ? (startEffectTimer(), runWithFiberInDEV(
                  finishedWork,
                  callComponentDidMountInDEV,
                  finishedWork,
                  finishedRoot
                ), recordEffectDuration()) : runWithFiberInDEV(
                  finishedWork,
                  callComponentDidMountInDEV,
                  finishedWork,
                  finishedRoot
                );
              else {
                var prevProps = resolveClassComponentProps(
                  finishedWork.type,
                  current2.memoizedProps
                );
                current2 = current2.memoizedState;
                finishedWork.type.defaultProps || "ref" in finishedWork.memoizedProps || didWarnAboutReassigningProps || (finishedRoot.props !== finishedWork.memoizedProps && console.error(
                  "Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",
                  getComponentNameFromFiber(finishedWork) || "instance"
                ), finishedRoot.state !== finishedWork.memoizedState && console.error(
                  "Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",
                  getComponentNameFromFiber(finishedWork) || "instance"
                ));
                shouldProfile(finishedWork) ? (startEffectTimer(), runWithFiberInDEV(
                  finishedWork,
                  callComponentDidUpdateInDEV,
                  finishedWork,
                  finishedRoot,
                  prevProps,
                  current2,
                  finishedRoot.__reactInternalSnapshotBeforeUpdate
                ), recordEffectDuration()) : runWithFiberInDEV(
                  finishedWork,
                  callComponentDidUpdateInDEV,
                  finishedWork,
                  finishedRoot,
                  prevProps,
                  current2,
                  finishedRoot.__reactInternalSnapshotBeforeUpdate
                );
              }
            flags & 64 && commitClassCallbacks(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 3:
            current2 = pushNestedEffectDurations();
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            if (flags & 64 && (flags = finishedWork.updateQueue, null !== flags)) {
              prevProps = null;
              if (null !== finishedWork.child)
                switch (finishedWork.child.tag) {
                  case 27:
                  case 5:
                    prevProps = finishedWork.child.stateNode;
                    break;
                  case 1:
                    prevProps = finishedWork.child.stateNode;
                }
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitCallbacks,
                  flags,
                  prevProps
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            finishedRoot.effectDuration += popNestedEffectDurations(current2);
            break;
          case 27:
            null === current2 && flags & 4 && commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            null === current2 && flags & 4 && commitHostMount(finishedWork);
            flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            if (flags & 4) {
              flags = pushNestedEffectDurations();
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              finishedRoot = finishedWork.stateNode;
              finishedRoot.effectDuration += bubbleNestedEffectDurations(flags);
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitProfiler,
                  finishedWork,
                  current2,
                  commitStartTime,
                  finishedRoot.effectDuration
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            break;
          case 13:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
            flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            flags & 64 && (finishedRoot = finishedWork.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot && (finishedWork = retryDehydratedSuspenseBoundary.bind(
              null,
              finishedWork
            ), registerSuspenseInstanceRetry(finishedRoot, finishedWork))));
            break;
          case 22:
            flags = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
            if (!flags) {
              current2 = null !== current2 && null !== current2.memoizedState || offscreenSubtreeWasHidden;
              prevProps = offscreenSubtreeIsHidden;
              var prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
              offscreenSubtreeIsHidden = flags;
              (offscreenSubtreeWasHidden = current2) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                0 !== (finishedWork.subtreeFlags & 8772)
              ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
              offscreenSubtreeIsHidden = prevProps;
              offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            }
            break;
          case 30:
            break;
          default:
            recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        }
      }
      function detachFiberAfterEffects(fiber) {
        var alternate = fiber.alternate;
        null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
        fiber.child = null;
        fiber.deletions = null;
        fiber.sibling = null;
        5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
        fiber.stateNode = null;
        fiber._debugOwner = null;
        fiber.return = null;
        fiber.dependencies = null;
        fiber.memoizedProps = null;
        fiber.memoizedState = null;
        fiber.pendingProps = null;
        fiber.stateNode = null;
        fiber.updateQueue = null;
      }
      function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
        for (parent = parent.child; null !== parent; )
          commitDeletionEffectsOnFiber(
            finishedRoot,
            nearestMountedAncestor,
            parent
          ), parent = parent.sibling;
      }
      function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
        if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
          try {
            injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
          } catch (err) {
            hasLoggedError || (hasLoggedError = true, console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
          }
        switch (deletedFiber.tag) {
          case 26:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
            break;
          case 27:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
            var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
            isSingletonScope(deletedFiber.type) && (hostParent = deletedFiber.stateNode, hostParentIsContainer = false);
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            runWithFiberInDEV(
              deletedFiber,
              releaseSingletonInstance,
              deletedFiber.stateNode
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 5:
            offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
          case 6:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = null;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            if (null !== hostParent)
              if (hostParentIsContainer)
                try {
                  runWithFiberInDEV(
                    deletedFiber,
                    removeChildFromContainer,
                    hostParent,
                    deletedFiber.stateNode
                  );
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
              else
                try {
                  runWithFiberInDEV(
                    deletedFiber,
                    removeChild,
                    hostParent,
                    deletedFiber.stateNode
                  );
                } catch (error) {
                  captureCommitPhaseError(
                    deletedFiber,
                    nearestMountedAncestor,
                    error
                  );
                }
            break;
          case 18:
            null !== hostParent && (hostParentIsContainer ? (finishedRoot = hostParent, clearSuspenseBoundary(
              9 === finishedRoot.nodeType ? finishedRoot.body : "HTML" === finishedRoot.nodeName ? finishedRoot.ownerDocument.body : finishedRoot,
              deletedFiber.stateNode
            ), retryIfBlockedOn(finishedRoot)) : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
            break;
          case 4:
            prevHostParent = hostParent;
            prevHostParentIsContainer = hostParentIsContainer;
            hostParent = deletedFiber.stateNode.containerInfo;
            hostParentIsContainer = true;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            hostParent = prevHostParent;
            hostParentIsContainer = prevHostParentIsContainer;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            offscreenSubtreeWasHidden || commitHookEffectListUnmount(
              Insertion,
              deletedFiber,
              nearestMountedAncestor
            );
            offscreenSubtreeWasHidden || commitHookLayoutUnmountEffects(
              deletedFiber,
              nearestMountedAncestor,
              Layout
            );
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 1:
            offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
              deletedFiber,
              nearestMountedAncestor,
              prevHostParent
            ));
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 21:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            break;
          case 22:
            offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
            offscreenSubtreeWasHidden = prevHostParent;
            break;
          default:
            recursivelyTraverseDeletionEffects(
              finishedRoot,
              nearestMountedAncestor,
              deletedFiber
            );
        }
      }
      function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
        if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
          try {
            runWithFiberInDEV(
              finishedWork,
              commitHydratedSuspenseInstance,
              finishedRoot
            );
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
      }
      function getRetryCache(finishedWork) {
        switch (finishedWork.tag) {
          case 13:
          case 19:
            var retryCache = finishedWork.stateNode;
            null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
            return retryCache;
          case 22:
            return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
          default:
            throw Error(
              "Unexpected Suspense handler tag (" + finishedWork.tag + "). This is a bug in React."
            );
        }
      }
      function attachSuspenseRetryListeners(finishedWork, wakeables) {
        var retryCache = getRetryCache(finishedWork);
        wakeables.forEach(function(wakeable) {
          var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
          if (!retryCache.has(wakeable)) {
            retryCache.add(wakeable);
            if (isDevToolsPresent)
              if (null !== inProgressLanes && null !== inProgressRoot)
                restorePendingUpdaters(inProgressRoot, inProgressLanes);
              else
                throw Error(
                  "Expected finished root and lanes to be set. This is a bug in React."
                );
            wakeable.then(retry, retry);
          }
        });
      }
      function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
        var deletions = parentFiber.deletions;
        if (null !== deletions)
          for (var i = 0; i < deletions.length; i++) {
            var root2 = root$jscomp$0, returnFiber = parentFiber, deletedFiber = deletions[i], parent = returnFiber;
            a:
              for (; null !== parent; ) {
                switch (parent.tag) {
                  case 27:
                    if (isSingletonScope(parent.type)) {
                      hostParent = parent.stateNode;
                      hostParentIsContainer = false;
                      break a;
                    }
                    break;
                  case 5:
                    hostParent = parent.stateNode;
                    hostParentIsContainer = false;
                    break a;
                  case 3:
                  case 4:
                    hostParent = parent.stateNode.containerInfo;
                    hostParentIsContainer = true;
                    break a;
                }
                parent = parent.return;
              }
            if (null === hostParent)
              throw Error(
                "Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue."
              );
            commitDeletionEffectsOnFiber(root2, returnFiber, deletedFiber);
            hostParent = null;
            hostParentIsContainer = false;
            root2 = deletedFiber;
            returnFiber = root2.alternate;
            null !== returnFiber && (returnFiber.return = null);
            root2.return = null;
          }
        if (parentFiber.subtreeFlags & 13878)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
      }
      function commitMutationEffectsOnFiber(finishedWork, root2) {
        var current2 = finishedWork.alternate, flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (commitHookEffectListUnmount(
              Insertion | HasEffect,
              finishedWork,
              finishedWork.return
            ), commitHookEffectListMount(Insertion | HasEffect, finishedWork), commitHookLayoutUnmountEffects(
              finishedWork,
              finishedWork.return,
              Layout | HasEffect
            ));
            break;
          case 1:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current2 || safelyDetachRef(current2, current2.return));
            flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current2 = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current2 ? flags : current2.concat(flags))));
            break;
          case 26:
            var hoistableRoot = currentHoistableRoot;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current2 || safelyDetachRef(current2, current2.return));
            if (flags & 4)
              if (root2 = null !== current2 ? current2.memoizedState : null, flags = finishedWork.memoizedState, null === current2)
                if (null === flags)
                  if (null === finishedWork.stateNode) {
                    a: {
                      flags = finishedWork.type;
                      current2 = finishedWork.memoizedProps;
                      root2 = hoistableRoot.ownerDocument || hoistableRoot;
                      b:
                        switch (flags) {
                          case "title":
                            hoistableRoot = root2.getElementsByTagName("title")[0];
                            if (!hoistableRoot || hoistableRoot[internalHoistableMarker] || hoistableRoot[internalInstanceKey] || hoistableRoot.namespaceURI === SVG_NAMESPACE || hoistableRoot.hasAttribute("itemprop"))
                              hoistableRoot = root2.createElement(flags), root2.head.insertBefore(
                                hoistableRoot,
                                root2.querySelector("head > title")
                              );
                            setInitialProperties(hoistableRoot, flags, current2);
                            hoistableRoot[internalInstanceKey] = finishedWork;
                            markNodeAsHoistable(hoistableRoot);
                            flags = hoistableRoot;
                            break a;
                          case "link":
                            var maybeNodes = getHydratableHoistableCache(
                              "link",
                              "href",
                              root2
                            ).get(flags + (current2.href || ""));
                            if (maybeNodes) {
                              for (var i = 0; i < maybeNodes.length; i++)
                                if (hoistableRoot = maybeNodes[i], hoistableRoot.getAttribute("href") === (null == current2.href || "" === current2.href ? null : current2.href) && hoistableRoot.getAttribute("rel") === (null == current2.rel ? null : current2.rel) && hoistableRoot.getAttribute("title") === (null == current2.title ? null : current2.title) && hoistableRoot.getAttribute("crossorigin") === (null == current2.crossOrigin ? null : current2.crossOrigin)) {
                                  maybeNodes.splice(i, 1);
                                  break b;
                                }
                            }
                            hoistableRoot = root2.createElement(flags);
                            setInitialProperties(hoistableRoot, flags, current2);
                            root2.head.appendChild(hoistableRoot);
                            break;
                          case "meta":
                            if (maybeNodes = getHydratableHoistableCache(
                              "meta",
                              "content",
                              root2
                            ).get(flags + (current2.content || ""))) {
                              for (i = 0; i < maybeNodes.length; i++)
                                if (hoistableRoot = maybeNodes[i], checkAttributeStringCoercion(
                                  current2.content,
                                  "content"
                                ), hoistableRoot.getAttribute("content") === (null == current2.content ? null : "" + current2.content) && hoistableRoot.getAttribute("name") === (null == current2.name ? null : current2.name) && hoistableRoot.getAttribute("property") === (null == current2.property ? null : current2.property) && hoistableRoot.getAttribute("http-equiv") === (null == current2.httpEquiv ? null : current2.httpEquiv) && hoistableRoot.getAttribute("charset") === (null == current2.charSet ? null : current2.charSet)) {
                                  maybeNodes.splice(i, 1);
                                  break b;
                                }
                            }
                            hoistableRoot = root2.createElement(flags);
                            setInitialProperties(hoistableRoot, flags, current2);
                            root2.head.appendChild(hoistableRoot);
                            break;
                          default:
                            throw Error(
                              'getNodesForType encountered a type it did not expect: "' + flags + '". This is a bug in React.'
                            );
                        }
                      hoistableRoot[internalInstanceKey] = finishedWork;
                      markNodeAsHoistable(hoistableRoot);
                      flags = hoistableRoot;
                    }
                    finishedWork.stateNode = flags;
                  } else
                    mountHoistable(
                      hoistableRoot,
                      finishedWork.type,
                      finishedWork.stateNode
                    );
                else
                  finishedWork.stateNode = acquireResource(
                    hoistableRoot,
                    flags,
                    finishedWork.memoizedProps
                  );
              else
                root2 !== flags ? (null === root2 ? null !== current2.stateNode && (current2 = current2.stateNode, current2.parentNode.removeChild(current2)) : root2.count--, null === flags ? mountHoistable(
                  hoistableRoot,
                  finishedWork.type,
                  finishedWork.stateNode
                ) : acquireResource(
                  hoistableRoot,
                  flags,
                  finishedWork.memoizedProps
                )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
                  finishedWork,
                  finishedWork.memoizedProps,
                  current2.memoizedProps
                );
            break;
          case 27:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current2 || safelyDetachRef(current2, current2.return));
            null !== current2 && flags & 4 && commitHostUpdate(
              finishedWork,
              finishedWork.memoizedProps,
              current2.memoizedProps
            );
            break;
          case 5:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 512 && (offscreenSubtreeWasHidden || null === current2 || safelyDetachRef(current2, current2.return));
            if (finishedWork.flags & 32) {
              root2 = finishedWork.stateNode;
              try {
                runWithFiberInDEV(finishedWork, resetTextContent, root2);
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            flags & 4 && null != finishedWork.stateNode && (root2 = finishedWork.memoizedProps, commitHostUpdate(
              finishedWork,
              root2,
              null !== current2 ? current2.memoizedProps : root2
            ));
            flags & 1024 && (needsFormReset = true, "form" !== finishedWork.type && console.error(
              "Unexpected host component type. Expected a form. This is a bug in React."
            ));
            break;
          case 6:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            if (flags & 4) {
              if (null === finishedWork.stateNode)
                throw Error(
                  "This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue."
                );
              flags = finishedWork.memoizedProps;
              current2 = null !== current2 ? current2.memoizedProps : flags;
              root2 = finishedWork.stateNode;
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitTextUpdate,
                  root2,
                  current2,
                  flags
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            break;
          case 3:
            hoistableRoot = pushNestedEffectDurations();
            tagCaches = null;
            maybeNodes = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(root2.containerInfo);
            recursivelyTraverseMutationEffects(root2, finishedWork);
            currentHoistableRoot = maybeNodes;
            commitReconciliationEffects(finishedWork);
            if (flags & 4 && null !== current2 && current2.memoizedState.isDehydrated)
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitHydratedContainer,
                  root2.containerInfo
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
            root2.effectDuration += popNestedEffectDurations(hoistableRoot);
            break;
          case 4:
            flags = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(
              finishedWork.stateNode.containerInfo
            );
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            currentHoistableRoot = flags;
            break;
          case 12:
            flags = pushNestedEffectDurations();
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            finishedWork.stateNode.effectDuration += bubbleNestedEffectDurations(flags);
            break;
          case 13:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current2 && null !== current2.memoizedState) && (globalMostRecentFallbackTime = now$1());
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 22:
            hoistableRoot = null !== finishedWork.memoizedState;
            var wasHidden = null !== current2 && null !== current2.memoizedState, prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden || hoistableRoot;
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden || wasHidden;
            recursivelyTraverseMutationEffects(root2, finishedWork);
            offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
            offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
            commitReconciliationEffects(finishedWork);
            if (flags & 8192)
              a:
                for (root2 = finishedWork.stateNode, root2._visibility = hoistableRoot ? root2._visibility & ~OffscreenVisible : root2._visibility | OffscreenVisible, hoistableRoot && (null === current2 || wasHidden || offscreenSubtreeIsHidden || offscreenSubtreeWasHidden || recursivelyTraverseDisappearLayoutEffects(finishedWork)), current2 = null, root2 = finishedWork; ; ) {
                  if (5 === root2.tag || 26 === root2.tag) {
                    if (null === current2) {
                      wasHidden = current2 = root2;
                      try {
                        maybeNodes = wasHidden.stateNode, hoistableRoot ? runWithFiberInDEV(wasHidden, hideInstance, maybeNodes) : runWithFiberInDEV(
                          wasHidden,
                          unhideInstance,
                          wasHidden.stateNode,
                          wasHidden.memoizedProps
                        );
                      } catch (error) {
                        captureCommitPhaseError(wasHidden, wasHidden.return, error);
                      }
                    }
                  } else if (6 === root2.tag) {
                    if (null === current2) {
                      wasHidden = root2;
                      try {
                        i = wasHidden.stateNode, hoistableRoot ? runWithFiberInDEV(wasHidden, hideTextInstance, i) : runWithFiberInDEV(
                          wasHidden,
                          unhideTextInstance,
                          i,
                          wasHidden.memoizedProps
                        );
                      } catch (error) {
                        captureCommitPhaseError(wasHidden, wasHidden.return, error);
                      }
                    }
                  } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
                    root2.child.return = root2;
                    root2 = root2.child;
                    continue;
                  }
                  if (root2 === finishedWork)
                    break a;
                  for (; null === root2.sibling; ) {
                    if (null === root2.return || root2.return === finishedWork)
                      break a;
                    current2 === root2 && (current2 = null);
                    root2 = root2.return;
                  }
                  current2 === root2 && (current2 = null);
                  root2.sibling.return = root2.return;
                  root2 = root2.sibling;
                }
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current2 = flags.retryQueue, null !== current2 && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current2))));
            break;
          case 19:
            recursivelyTraverseMutationEffects(root2, finishedWork);
            commitReconciliationEffects(finishedWork);
            flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
            break;
          case 30:
            break;
          case 21:
            break;
          default:
            recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
        }
      }
      function commitReconciliationEffects(finishedWork) {
        var flags = finishedWork.flags;
        if (flags & 2) {
          try {
            runWithFiberInDEV(finishedWork, commitPlacement, finishedWork);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
          finishedWork.flags &= -3;
        }
        flags & 4096 && (finishedWork.flags &= -4097);
      }
      function recursivelyResetForms(parentFiber) {
        if (parentFiber.subtreeFlags & 1024)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var fiber = parentFiber;
            recursivelyResetForms(fiber);
            5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
            parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyTraverseLayoutEffects(root2, parentFiber) {
        if (parentFiber.subtreeFlags & 8772)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
      }
      function disappearLayoutEffects(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            commitHookLayoutUnmountEffects(
              finishedWork,
              finishedWork.return,
              Layout
            );
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 1:
            safelyDetachRef(finishedWork, finishedWork.return);
            var instance = finishedWork.stateNode;
            "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
              finishedWork,
              finishedWork.return,
              instance
            );
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 27:
            runWithFiberInDEV(
              finishedWork,
              releaseSingletonInstance,
              finishedWork.stateNode
            );
          case 26:
          case 5:
            safelyDetachRef(finishedWork, finishedWork.return);
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 22:
            null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          case 30:
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
            break;
          default:
            recursivelyTraverseDisappearLayoutEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          disappearLayoutEffects(parentFiber), parentFiber = parentFiber.sibling;
      }
      function reappearLayoutEffects(finishedRoot, current2, finishedWork, includeWorkInProgressEffects) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            commitHookLayoutEffects(finishedWork, Layout);
            break;
          case 1:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            current2 = finishedWork.stateNode;
            "function" === typeof current2.componentDidMount && runWithFiberInDEV(
              finishedWork,
              callComponentDidMountInDEV,
              finishedWork,
              current2
            );
            current2 = finishedWork.updateQueue;
            if (null !== current2) {
              finishedRoot = finishedWork.stateNode;
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitHiddenCallbacks,
                  current2,
                  finishedRoot
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            }
            includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 27:
            commitHostSingletonAcquisition(finishedWork);
          case 26:
          case 5:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && null === current2 && flags & 4 && commitHostMount(finishedWork);
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 12:
            if (includeWorkInProgressEffects && flags & 4) {
              flags = pushNestedEffectDurations();
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
              includeWorkInProgressEffects = finishedWork.stateNode;
              includeWorkInProgressEffects.effectDuration += bubbleNestedEffectDurations(flags);
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitProfiler,
                  finishedWork,
                  current2,
                  commitStartTime,
                  includeWorkInProgressEffects.effectDuration
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraverseReappearLayoutEffects(
                finishedRoot,
                finishedWork,
                includeWorkInProgressEffects
              );
            break;
          case 13:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
            break;
          case 22:
            null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
            safelyAttachRef(finishedWork, finishedWork.return);
            break;
          case 30:
            break;
          default:
            recursivelyTraverseReappearLayoutEffects(
              finishedRoot,
              finishedWork,
              includeWorkInProgressEffects
            );
        }
      }
      function recursivelyTraverseReappearLayoutEffects(finishedRoot, parentFiber, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          reappearLayoutEffects(
            finishedRoot,
            parentFiber.alternate,
            parentFiber,
            includeWorkInProgressEffects
          ), parentFiber = parentFiber.sibling;
      }
      function commitOffscreenPassiveMountEffects(current2, finishedWork) {
        var previousCache = null;
        null !== current2 && null !== current2.memoizedState && null !== current2.memoizedState.cachePool && (previousCache = current2.memoizedState.cachePool.pool);
        current2 = null;
        null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current2 = finishedWork.memoizedState.cachePool.pool);
        current2 !== previousCache && (null != current2 && retainCache(current2), null != previousCache && releaseCache(previousCache));
      }
      function commitCachePassiveMountEffect(current2, finishedWork) {
        current2 = null;
        null !== finishedWork.alternate && (current2 = finishedWork.alternate.memoizedState.cache);
        finishedWork = finishedWork.memoizedState.cache;
        finishedWork !== current2 && (retainCache(finishedWork), null != current2 && releaseCache(current2));
      }
      function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveMountOnFiber(
              root2,
              parentFiber,
              committedLanes,
              committedTransitions
            ), parentFiber = parentFiber.sibling;
      }
      function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitHookPassiveMountEffects(finishedWork, Passive | HasEffect);
            break;
          case 1:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 3:
            var prevEffectDuration = pushNestedEffectDurations();
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && (committedLanes = null, null !== finishedWork.alternate && (committedLanes = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== committedLanes && (retainCache(finishedWork), null != committedLanes && releaseCache(committedLanes)));
            finishedRoot.passiveEffectDuration += popNestedEffectDurations(prevEffectDuration);
            break;
          case 12:
            if (flags & 2048) {
              flags = pushNestedEffectDurations();
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
              finishedRoot = finishedWork.stateNode;
              finishedRoot.passiveEffectDuration += bubbleNestedEffectDurations(flags);
              try {
                runWithFiberInDEV(
                  finishedWork,
                  commitProfilerPostCommitImpl,
                  finishedWork,
                  finishedWork.alternate,
                  commitStartTime,
                  finishedRoot.passiveEffectDuration
                );
              } catch (error) {
                captureCommitPhaseError(finishedWork, finishedWork.return, error);
              }
            } else
              recursivelyTraversePassiveMountEffects(
                finishedRoot,
                finishedWork,
                committedLanes,
                committedTransitions
              );
            break;
          case 13:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            break;
          case 23:
            break;
          case 22:
            prevEffectDuration = finishedWork.stateNode;
            var _current = finishedWork.alternate;
            null !== finishedWork.memoizedState ? prevEffectDuration._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : recursivelyTraverseAtomicPassiveEffects(
              finishedRoot,
              finishedWork
            ) : prevEffectDuration._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            ) : (prevEffectDuration._visibility |= OffscreenPassiveEffectsConnected, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              0 !== (finishedWork.subtreeFlags & 10256)
            ));
            flags & 2048 && commitOffscreenPassiveMountEffects(_current, finishedWork);
            break;
          case 24:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
            flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraversePassiveMountEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions
            );
        }
      }
      function recursivelyTraverseReconnectPassiveEffects(finishedRoot, parentFiber, committedLanes, committedTransitions, includeWorkInProgressEffects) {
        includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 10256);
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          reconnectPassiveEffects(
            finishedRoot,
            parentFiber,
            committedLanes,
            committedTransitions,
            includeWorkInProgressEffects
          ), parentFiber = parentFiber.sibling;
      }
      function reconnectPassiveEffects(finishedRoot, finishedWork, committedLanes, committedTransitions, includeWorkInProgressEffects) {
        var flags = finishedWork.flags;
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
            commitHookPassiveMountEffects(finishedWork, Passive);
            break;
          case 23:
            break;
          case 22:
            var _instance2 = finishedWork.stateNode;
            null !== finishedWork.memoizedState ? _instance2._visibility & OffscreenPassiveEffectsConnected ? recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            ) : recursivelyTraverseAtomicPassiveEffects(
              finishedRoot,
              finishedWork
            ) : (_instance2._visibility |= OffscreenPassiveEffectsConnected, recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            ));
            includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
              finishedWork.alternate,
              finishedWork
            );
            break;
          case 24:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
            includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
            break;
          default:
            recursivelyTraverseReconnectPassiveEffects(
              finishedRoot,
              finishedWork,
              committedLanes,
              committedTransitions,
              includeWorkInProgressEffects
            );
        }
      }
      function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
            switch (finishedWork.tag) {
              case 22:
                recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                );
                flags & 2048 && commitOffscreenPassiveMountEffects(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              case 24:
                recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                );
                flags & 2048 && commitCachePassiveMountEffect(
                  finishedWork.alternate,
                  finishedWork
                );
                break;
              default:
                recursivelyTraverseAtomicPassiveEffects(
                  finishedRoot,
                  finishedWork
                );
            }
            parentFiber = parentFiber.sibling;
          }
      }
      function recursivelyAccumulateSuspenseyCommit(parentFiber) {
        if (parentFiber.subtreeFlags & suspenseyCommitFlag)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            accumulateSuspenseyCommitOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function accumulateSuspenseyCommitOnFiber(fiber) {
        switch (fiber.tag) {
          case 26:
            recursivelyAccumulateSuspenseyCommit(fiber);
            fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
              currentHoistableRoot,
              fiber.memoizedState,
              fiber.memoizedProps
            );
            break;
          case 5:
            recursivelyAccumulateSuspenseyCommit(fiber);
            break;
          case 3:
          case 4:
            var previousHoistableRoot = currentHoistableRoot;
            currentHoistableRoot = getHoistableRoot(
              fiber.stateNode.containerInfo
            );
            recursivelyAccumulateSuspenseyCommit(fiber);
            currentHoistableRoot = previousHoistableRoot;
            break;
          case 22:
            null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber));
            break;
          default:
            recursivelyAccumulateSuspenseyCommit(fiber);
        }
      }
      function detachAlternateSiblings(parentFiber) {
        var previousFiber = parentFiber.alternate;
        if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
          previousFiber.child = null;
          do
            previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
          while (null !== parentFiber);
        }
      }
      function recursivelyTraversePassiveUnmountEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        if (parentFiber.subtreeFlags & 10256)
          for (parentFiber = parentFiber.child; null !== parentFiber; )
            commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
      }
      function commitPassiveUnmountOnFiber(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.flags & 2048 && commitHookPassiveUnmountEffects(
              finishedWork,
              finishedWork.return,
              Passive | HasEffect
            );
            break;
          case 3:
            var prevEffectDuration = pushNestedEffectDurations();
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.stateNode.passiveEffectDuration += popNestedEffectDurations(prevEffectDuration);
            break;
          case 12:
            prevEffectDuration = pushNestedEffectDurations();
            recursivelyTraversePassiveUnmountEffects(finishedWork);
            finishedWork.stateNode.passiveEffectDuration += bubbleNestedEffectDurations(prevEffectDuration);
            break;
          case 22:
            prevEffectDuration = finishedWork.stateNode;
            null !== finishedWork.memoizedState && prevEffectDuration._visibility & OffscreenPassiveEffectsConnected && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (prevEffectDuration._visibility &= ~OffscreenPassiveEffectsConnected, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
            break;
          default:
            recursivelyTraversePassiveUnmountEffects(finishedWork);
        }
      }
      function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
        var deletions = parentFiber.deletions;
        if (0 !== (parentFiber.flags & 16)) {
          if (null !== deletions)
            for (var i = 0; i < deletions.length; i++) {
              var childToDelete = deletions[i];
              nextEffect = childToDelete;
              commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
                childToDelete,
                parentFiber
              );
            }
          detachAlternateSiblings(parentFiber);
        }
        for (parentFiber = parentFiber.child; null !== parentFiber; )
          disconnectPassiveEffect(parentFiber), parentFiber = parentFiber.sibling;
      }
      function disconnectPassiveEffect(finishedWork) {
        switch (finishedWork.tag) {
          case 0:
          case 11:
          case 15:
            commitHookPassiveUnmountEffects(
              finishedWork,
              finishedWork.return,
              Passive
            );
            recursivelyTraverseDisconnectPassiveEffects(finishedWork);
            break;
          case 22:
            var instance = finishedWork.stateNode;
            instance._visibility & OffscreenPassiveEffectsConnected && (instance._visibility &= ~OffscreenPassiveEffectsConnected, recursivelyTraverseDisconnectPassiveEffects(finishedWork));
            break;
          default:
            recursivelyTraverseDisconnectPassiveEffects(finishedWork);
        }
      }
      function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
        for (; null !== nextEffect; ) {
          var fiber = nextEffect, current2 = fiber;
          switch (current2.tag) {
            case 0:
            case 11:
            case 15:
              commitHookPassiveUnmountEffects(
                current2,
                nearestMountedAncestor,
                Passive
              );
              break;
            case 23:
            case 22:
              null !== current2.memoizedState && null !== current2.memoizedState.cachePool && (current2 = current2.memoizedState.cachePool.pool, null != current2 && retainCache(current2));
              break;
            case 24:
              releaseCache(current2.memoizedState.cache);
          }
          current2 = fiber.child;
          if (null !== current2)
            current2.return = fiber, nextEffect = current2;
          else
            a:
              for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
                current2 = nextEffect;
                var sibling = current2.sibling, returnFiber = current2.return;
                detachFiberAfterEffects(current2);
                if (current2 === fiber) {
                  nextEffect = null;
                  break a;
                }
                if (null !== sibling) {
                  sibling.return = returnFiber;
                  nextEffect = sibling;
                  break a;
                }
                nextEffect = returnFiber;
              }
        }
      }
      function onCommitRoot() {
        commitHooks.forEach(function(commitHook) {
          return commitHook();
        });
      }
      function isConcurrentActEnvironment() {
        var isReactActEnvironmentGlobal = "undefined" !== typeof IS_REACT_ACT_ENVIRONMENT ? IS_REACT_ACT_ENVIRONMENT : void 0;
        isReactActEnvironmentGlobal || null === ReactSharedInternals.actQueue || console.error(
          "The current testing environment is not configured to support act(...)"
        );
        return isReactActEnvironmentGlobal;
      }
      function requestUpdateLane(fiber) {
        if ((executionContext & RenderContext) !== NoContext && 0 !== workInProgressRootRenderLanes)
          return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
        var transition = ReactSharedInternals.T;
        return null !== transition ? (transition._updatedFibers || (transition._updatedFibers = /* @__PURE__ */ new Set()), transition._updatedFibers.add(fiber), fiber = currentEntangledLane, 0 !== fiber ? fiber : requestTransitionLane()) : resolveUpdatePriority();
      }
      function requestDeferredLane() {
        0 === workInProgressDeferredLane && (workInProgressDeferredLane = 0 === (workInProgressRootRenderLanes & 536870912) || isHydrating ? claimNextTransitionLane() : 536870912);
        var suspenseHandler = suspenseHandlerStackCursor.current;
        null !== suspenseHandler && (suspenseHandler.flags |= 32);
        return workInProgressDeferredLane;
      }
      function scheduleUpdateOnFiber(root2, fiber, lane) {
        isRunningInsertionEffect && console.error("useInsertionEffect must not schedule updates.");
        isFlushingPassiveEffects && (didScheduleUpdateDuringPassiveEffects = true);
        if (root2 === workInProgressRoot && (workInProgressSuspendedReason === SuspendedOnData || workInProgressSuspendedReason === SuspendedOnAction) || null !== root2.cancelPendingCommit)
          prepareFreshStack(root2, 0), markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          );
        markRootUpdated$1(root2, lane);
        if (0 !== (executionContext & RenderContext) && root2 === workInProgressRoot) {
          if (isRendering)
            switch (fiber.tag) {
              case 0:
              case 11:
              case 15:
                root2 = workInProgress && getComponentNameFromFiber(workInProgress) || "Unknown";
                didWarnAboutUpdateInRenderForAnotherComponent.has(root2) || (didWarnAboutUpdateInRenderForAnotherComponent.add(root2), fiber = getComponentNameFromFiber(fiber) || "Unknown", console.error(
                  "Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://react.dev/link/setstate-in-render",
                  fiber,
                  root2,
                  root2
                ));
                break;
              case 1:
                didWarnAboutUpdateInRender || (console.error(
                  "Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."
                ), didWarnAboutUpdateInRender = true);
            }
        } else
          isDevToolsPresent && addFiberToLanesMap(root2, fiber, lane), warnIfUpdatesNotWrappedWithActDEV(fiber), root2 === workInProgressRoot && ((executionContext & RenderContext) === NoContext && (workInProgressRootInterleavedUpdatedLanes |= lane), workInProgressRootExitStatus === RootSuspendedWithDelay && markRootSuspended(
            root2,
            workInProgressRootRenderLanes,
            workInProgressDeferredLane,
            false
          )), ensureRootIsScheduled(root2);
      }
      function performWorkOnRoot(root2, lanes, forceSync) {
        if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
          throw Error("Should not already be working.");
        var shouldTimeSlice = !forceSync && 0 === (lanes & 124) && 0 === (lanes & root2.expiredLanes) || checkIfRootIsPrerendering(root2, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root2, lanes) : renderRootSync(root2, lanes, true), renderWasConcurrent = shouldTimeSlice;
        do {
          if (exitStatus === RootInProgress) {
            workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root2, lanes, 0, false);
            break;
          } else {
            forceSync = root2.current.alternate;
            if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
              exitStatus = renderRootSync(root2, lanes, false);
              renderWasConcurrent = false;
              continue;
            }
            if (exitStatus === RootErrored) {
              renderWasConcurrent = lanes;
              if (root2.errorRecoveryDisabledLanes & renderWasConcurrent)
                var errorRetryLanes = 0;
              else
                errorRetryLanes = root2.pendingLanes & -536870913, errorRetryLanes = 0 !== errorRetryLanes ? errorRetryLanes : errorRetryLanes & 536870912 ? 536870912 : 0;
              if (0 !== errorRetryLanes) {
                lanes = errorRetryLanes;
                a: {
                  exitStatus = root2;
                  var errorRetryLanes$jscomp$0 = errorRetryLanes;
                  errorRetryLanes = workInProgressRootConcurrentErrors;
                  var wasRootDehydrated = exitStatus.current.memoizedState.isDehydrated;
                  wasRootDehydrated && (prepareFreshStack(
                    exitStatus,
                    errorRetryLanes$jscomp$0
                  ).flags |= 256);
                  errorRetryLanes$jscomp$0 = renderRootSync(
                    exitStatus,
                    errorRetryLanes$jscomp$0,
                    false
                  );
                  if (errorRetryLanes$jscomp$0 !== RootErrored) {
                    if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                      exitStatus.errorRecoveryDisabledLanes |= renderWasConcurrent;
                      workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                      exitStatus = RootSuspendedWithDelay;
                      break a;
                    }
                    exitStatus = workInProgressRootRecoverableErrors;
                    workInProgressRootRecoverableErrors = errorRetryLanes;
                    null !== exitStatus && (null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = exitStatus : workInProgressRootRecoverableErrors.push.apply(
                      workInProgressRootRecoverableErrors,
                      exitStatus
                    ));
                  }
                  exitStatus = errorRetryLanes$jscomp$0;
                }
                renderWasConcurrent = false;
                if (exitStatus !== RootErrored)
                  continue;
              }
            }
            if (exitStatus === RootFatalErrored) {
              prepareFreshStack(root2, 0);
              markRootSuspended(root2, lanes, 0, true);
              break;
            }
            a: {
              shouldTimeSlice = root2;
              switch (exitStatus) {
                case RootInProgress:
                case RootFatalErrored:
                  throw Error("Root did not complete. This is a bug in React.");
                case RootSuspendedWithDelay:
                  if ((lanes & 4194048) !== lanes)
                    break;
                case RootSuspendedAtTheShell:
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  break a;
                case RootErrored:
                  workInProgressRootRecoverableErrors = null;
                  break;
                case RootSuspended:
                case RootCompleted:
                  break;
                default:
                  throw Error("Unknown root exit status.");
              }
              if (null !== ReactSharedInternals.actQueue)
                commitRoot(
                  shouldTimeSlice,
                  forceSync,
                  lanes,
                  workInProgressRootRecoverableErrors,
                  workInProgressTransitions,
                  workInProgressRootDidIncludeRecursiveRenderUpdate,
                  workInProgressDeferredLane,
                  workInProgressRootInterleavedUpdatedLanes,
                  workInProgressSuspendedRetryLanes
                );
              else {
                if ((lanes & 62914560) === lanes && (renderWasConcurrent = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now$1(), 10 < renderWasConcurrent)) {
                  markRootSuspended(
                    shouldTimeSlice,
                    lanes,
                    workInProgressDeferredLane,
                    !workInProgressRootDidSkipSuspendedSiblings
                  );
                  if (0 !== getNextLanes(shouldTimeSlice, 0, true))
                    break a;
                  shouldTimeSlice.timeoutHandle = scheduleTimeout(
                    commitRootWhenReady.bind(
                      null,
                      shouldTimeSlice,
                      forceSync,
                      workInProgressRootRecoverableErrors,
                      workInProgressTransitions,
                      workInProgressRootDidIncludeRecursiveRenderUpdate,
                      lanes,
                      workInProgressDeferredLane,
                      workInProgressRootInterleavedUpdatedLanes,
                      workInProgressSuspendedRetryLanes,
                      workInProgressRootDidSkipSuspendedSiblings,
                      exitStatus,
                      THROTTLED_COMMIT,
                      renderStartTime,
                      0
                    ),
                    renderWasConcurrent
                  );
                  break a;
                }
                commitRootWhenReady(
                  shouldTimeSlice,
                  forceSync,
                  workInProgressRootRecoverableErrors,
                  workInProgressTransitions,
                  workInProgressRootDidIncludeRecursiveRenderUpdate,
                  lanes,
                  workInProgressDeferredLane,
                  workInProgressRootInterleavedUpdatedLanes,
                  workInProgressSuspendedRetryLanes,
                  workInProgressRootDidSkipSuspendedSiblings,
                  exitStatus,
                  IMMEDIATE_COMMIT,
                  renderStartTime,
                  0
                );
              }
            }
          }
          break;
        } while (1);
        ensureRootIsScheduled(root2);
      }
      function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, exitStatus, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
        root2.timeoutHandle = noTimeout;
        suspendedCommitReason = finishedWork.subtreeFlags;
        if (suspendedCommitReason & 8192 || 16785408 === (suspendedCommitReason & 16785408)) {
          if (suspendedState = { stylesheets: null, count: 0, unsuspend: noop }, accumulateSuspenseyCommitOnFiber(finishedWork), suspendedCommitReason = waitForCommitToBeReady(), null !== suspendedCommitReason) {
            root2.cancelPendingCommit = suspendedCommitReason(
              commitRoot.bind(
                null,
                root2,
                finishedWork,
                lanes,
                recoverableErrors,
                transitions,
                didIncludeRenderPhaseUpdate,
                spawnedLane,
                updatedLanes,
                suspendedRetryLanes,
                exitStatus,
                SUSPENDED_COMMIT,
                completedRenderStartTime,
                completedRenderEndTime
              )
            );
            markRootSuspended(
              root2,
              lanes,
              spawnedLane,
              !didSkipSuspendedSiblings
            );
            return;
          }
        }
        commitRoot(
          root2,
          finishedWork,
          lanes,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes
        );
      }
      function isRenderConsistentWithExternalStores(finishedWork) {
        for (var node = finishedWork; ; ) {
          var tag = node.tag;
          if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
            for (var i = 0; i < tag.length; i++) {
              var check = tag[i], getSnapshot = check.getSnapshot;
              check = check.value;
              try {
                if (!objectIs(getSnapshot(), check))
                  return false;
              } catch (error) {
                return false;
              }
            }
          tag = node.child;
          if (node.subtreeFlags & 16384 && null !== tag)
            tag.return = node, node = tag;
          else {
            if (node === finishedWork)
              break;
            for (; null === node.sibling; ) {
              if (null === node.return || node.return === finishedWork)
                return true;
              node = node.return;
            }
            node.sibling.return = node.return;
            node = node.sibling;
          }
        }
        return true;
      }
      function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
        suspendedLanes &= ~workInProgressRootPingedLanes;
        suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
        root2.suspendedLanes |= suspendedLanes;
        root2.pingedLanes &= ~suspendedLanes;
        didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
        didAttemptEntireTree = root2.expirationTimes;
        for (var lanes = suspendedLanes; 0 < lanes; ) {
          var index = 31 - clz32(lanes), lane = 1 << index;
          didAttemptEntireTree[index] = -1;
          lanes &= ~lane;
        }
        0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
      }
      function flushSyncWork$1() {
        return (executionContext & (RenderContext | CommitContext)) === NoContext ? (flushSyncWorkAcrossRoots_impl(0, false), false) : true;
      }
      function resetWorkInProgressStack() {
        if (null !== workInProgress) {
          if (workInProgressSuspendedReason === NotSuspended)
            var interruptedWork = workInProgress.return;
          else
            interruptedWork = workInProgress, resetContextDependencies(), resetHooksOnUnwind(interruptedWork), thenableState = null, thenableIndexCounter = 0, interruptedWork = workInProgress;
          for (; null !== interruptedWork; )
            unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
          workInProgress = null;
        }
      }
      function prepareFreshStack(root2, lanes) {
        var timeoutHandle = root2.timeoutHandle;
        timeoutHandle !== noTimeout && (root2.timeoutHandle = noTimeout, cancelTimeout(timeoutHandle));
        timeoutHandle = root2.cancelPendingCommit;
        null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
        resetWorkInProgressStack();
        workInProgressRoot = root2;
        workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
        workInProgressRootRenderLanes = lanes;
        workInProgressSuspendedReason = NotSuspended;
        workInProgressThrownValue = null;
        workInProgressRootDidSkipSuspendedSiblings = false;
        workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
        workInProgressRootDidAttachPingListener = false;
        workInProgressRootExitStatus = RootInProgress;
        workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = 0;
        workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
        workInProgressRootDidIncludeRecursiveRenderUpdate = false;
        0 !== (lanes & 8) && (lanes |= lanes & 32);
        var allEntangledLanes = root2.entangledLanes;
        if (0 !== allEntangledLanes)
          for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
            var index = 31 - clz32(allEntangledLanes), lane = 1 << index;
            lanes |= root2[index];
            allEntangledLanes &= ~lane;
          }
        entangledRenderLanes = lanes;
        finishQueueingConcurrentUpdates();
        lanes = getCurrentTime();
        1e3 < lanes - lastResetTime && (ReactSharedInternals.recentlyCreatedOwnerStacks = 0, lastResetTime = lanes);
        ReactStrictModeWarnings.discardPendingWarnings();
        return timeoutHandle;
      }
      function handleThrow(root2, thrownValue) {
        currentlyRenderingFiber = null;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        ReactSharedInternals.getCurrentStack = null;
        isRendering = false;
        current = null;
        thrownValue === SuspenseException || thrownValue === SuspenseActionException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = SuspendedOnImmediate) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = SuspendedOnInstance) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? SuspendedOnHydration : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? SuspendedOnDeprecatedThrowPromise : SuspendedOnError;
        workInProgressThrownValue = thrownValue;
        var erroredWork = workInProgress;
        if (null === erroredWork)
          workInProgressRootExitStatus = RootFatalErrored, logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          );
        else
          switch (erroredWork.mode & ProfileMode && stopProfilerTimerIfRunningAndRecordDuration(erroredWork), markComponentRenderStopped(), workInProgressSuspendedReason) {
            case SuspendedOnError:
              null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentErrored && injectedProfilingHooks.markComponentErrored(
                erroredWork,
                thrownValue,
                workInProgressRootRenderLanes
              );
              break;
            case SuspendedOnData:
            case SuspendedOnAction:
            case SuspendedOnImmediate:
            case SuspendedOnDeprecatedThrowPromise:
            case SuspendedAndReadyToContinue:
              null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markComponentSuspended && injectedProfilingHooks.markComponentSuspended(
                erroredWork,
                thrownValue,
                workInProgressRootRenderLanes
              );
          }
      }
      function pushDispatcher() {
        var prevDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = ContextOnlyDispatcher;
        return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
      }
      function pushAsyncDispatcher() {
        var prevAsyncDispatcher = ReactSharedInternals.A;
        ReactSharedInternals.A = DefaultAsyncDispatcher;
        return prevAsyncDispatcher;
      }
      function renderDidSuspendDelayIfPossible() {
        workInProgressRootExitStatus = RootSuspendedWithDelay;
        workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194048) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
        0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
          workInProgressRoot,
          workInProgressRootRenderLanes,
          workInProgressDeferredLane,
          false
        );
      }
      function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
        var prevExecutionContext = executionContext;
        executionContext |= RenderContext;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes) {
          if (isDevToolsPresent) {
            var memoizedUpdaters = root2.memoizedUpdaters;
            0 < memoizedUpdaters.size && (restorePendingUpdaters(root2, workInProgressRootRenderLanes), memoizedUpdaters.clear());
            movePendingFibersToMemoized(root2, lanes);
          }
          workInProgressTransitions = null;
          prepareFreshStack(root2, lanes);
        }
        markRenderStarted(lanes);
        lanes = false;
        memoizedUpdaters = workInProgressRootExitStatus;
        a:
          do
            try {
              if (workInProgressSuspendedReason !== NotSuspended && null !== workInProgress) {
                var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
                switch (workInProgressSuspendedReason) {
                  case SuspendedOnHydration:
                    resetWorkInProgressStack();
                    memoizedUpdaters = RootSuspendedAtTheShell;
                    break a;
                  case SuspendedOnImmediate:
                  case SuspendedOnData:
                  case SuspendedOnAction:
                  case SuspendedOnDeprecatedThrowPromise:
                    null === suspenseHandlerStackCursor.current && (lanes = true);
                    var reason = workInProgressSuspendedReason;
                    workInProgressSuspendedReason = NotSuspended;
                    workInProgressThrownValue = null;
                    throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                    if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
                      memoizedUpdaters = RootInProgress;
                      break a;
                    }
                    break;
                  default:
                    reason = workInProgressSuspendedReason, workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
                }
              }
              workLoopSync();
              memoizedUpdaters = workInProgressRootExitStatus;
              break;
            } catch (thrownValue$8) {
              handleThrow(root2, thrownValue$8);
            }
          while (1);
        lanes && root2.shellSuspendCounter++;
        resetContextDependencies();
        executionContext = prevExecutionContext;
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        markRenderStopped();
        null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
        return memoizedUpdaters;
      }
      function workLoopSync() {
        for (; null !== workInProgress; )
          performUnitOfWork(workInProgress);
      }
      function renderRootConcurrent(root2, lanes) {
        var prevExecutionContext = executionContext;
        executionContext |= RenderContext;
        var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
        if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes) {
          if (isDevToolsPresent) {
            var memoizedUpdaters = root2.memoizedUpdaters;
            0 < memoizedUpdaters.size && (restorePendingUpdaters(root2, workInProgressRootRenderLanes), memoizedUpdaters.clear());
            movePendingFibersToMemoized(root2, lanes);
          }
          workInProgressTransitions = null;
          workInProgressRootRenderTargetTime = now$1() + RENDER_TIMEOUT_MS;
          prepareFreshStack(root2, lanes);
        } else
          workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
            root2,
            lanes
          );
        markRenderStarted(lanes);
        a:
          do
            try {
              if (workInProgressSuspendedReason !== NotSuspended && null !== workInProgress)
                b:
                  switch (lanes = workInProgress, memoizedUpdaters = workInProgressThrownValue, workInProgressSuspendedReason) {
                    case SuspendedOnError:
                      workInProgressSuspendedReason = NotSuspended;
                      workInProgressThrownValue = null;
                      throwAndUnwindWorkLoop(
                        root2,
                        lanes,
                        memoizedUpdaters,
                        SuspendedOnError
                      );
                      break;
                    case SuspendedOnData:
                    case SuspendedOnAction:
                      if (isThenableResolved(memoizedUpdaters)) {
                        workInProgressSuspendedReason = NotSuspended;
                        workInProgressThrownValue = null;
                        replaySuspendedUnitOfWork(lanes);
                        break;
                      }
                      lanes = function() {
                        workInProgressSuspendedReason !== SuspendedOnData && workInProgressSuspendedReason !== SuspendedOnAction || workInProgressRoot !== root2 || (workInProgressSuspendedReason = SuspendedAndReadyToContinue);
                        ensureRootIsScheduled(root2);
                      };
                      memoizedUpdaters.then(lanes, lanes);
                      break a;
                    case SuspendedOnImmediate:
                      workInProgressSuspendedReason = SuspendedAndReadyToContinue;
                      break a;
                    case SuspendedOnInstance:
                      workInProgressSuspendedReason = SuspendedOnInstanceAndReadyToContinue;
                      break a;
                    case SuspendedAndReadyToContinue:
                      isThenableResolved(memoizedUpdaters) ? (workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = null, throwAndUnwindWorkLoop(
                        root2,
                        lanes,
                        memoizedUpdaters,
                        SuspendedAndReadyToContinue
                      ));
                      break;
                    case SuspendedOnInstanceAndReadyToContinue:
                      var resource = null;
                      switch (workInProgress.tag) {
                        case 26:
                          resource = workInProgress.memoizedState;
                        case 5:
                        case 27:
                          var hostFiber = workInProgress;
                          if (resource ? preloadResource(resource) : 1) {
                            workInProgressSuspendedReason = NotSuspended;
                            workInProgressThrownValue = null;
                            var sibling = hostFiber.sibling;
                            if (null !== sibling)
                              workInProgress = sibling;
                            else {
                              var returnFiber = hostFiber.return;
                              null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                            }
                            break b;
                          }
                          break;
                        default:
                          console.error(
                            "Unexpected type of fiber triggered a suspensey commit. This is a bug in React."
                          );
                      }
                      workInProgressSuspendedReason = NotSuspended;
                      workInProgressThrownValue = null;
                      throwAndUnwindWorkLoop(
                        root2,
                        lanes,
                        memoizedUpdaters,
                        SuspendedOnInstanceAndReadyToContinue
                      );
                      break;
                    case SuspendedOnDeprecatedThrowPromise:
                      workInProgressSuspendedReason = NotSuspended;
                      workInProgressThrownValue = null;
                      throwAndUnwindWorkLoop(
                        root2,
                        lanes,
                        memoizedUpdaters,
                        SuspendedOnDeprecatedThrowPromise
                      );
                      break;
                    case SuspendedOnHydration:
                      resetWorkInProgressStack();
                      workInProgressRootExitStatus = RootSuspendedAtTheShell;
                      break a;
                    default:
                      throw Error(
                        "Unexpected SuspendedReason. This is a bug in React."
                      );
                  }
              null !== ReactSharedInternals.actQueue ? workLoopSync() : workLoopConcurrentByScheduler();
              break;
            } catch (thrownValue$9) {
              handleThrow(root2, thrownValue$9);
            }
          while (1);
        resetContextDependencies();
        ReactSharedInternals.H = prevDispatcher;
        ReactSharedInternals.A = prevAsyncDispatcher;
        executionContext = prevExecutionContext;
        if (null !== workInProgress)
          return null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markRenderYielded && injectedProfilingHooks.markRenderYielded(), RootInProgress;
        markRenderStopped();
        workInProgressRoot = null;
        workInProgressRootRenderLanes = 0;
        finishQueueingConcurrentUpdates();
        return workInProgressRootExitStatus;
      }
      function workLoopConcurrentByScheduler() {
        for (; null !== workInProgress && !shouldYield(); )
          performUnitOfWork(workInProgress);
      }
      function performUnitOfWork(unitOfWork) {
        var current2 = unitOfWork.alternate;
        (unitOfWork.mode & ProfileMode) !== NoMode ? (startProfilerTimer(unitOfWork), current2 = runWithFiberInDEV(
          unitOfWork,
          beginWork,
          current2,
          unitOfWork,
          entangledRenderLanes
        ), stopProfilerTimerIfRunningAndRecordDuration(unitOfWork)) : current2 = runWithFiberInDEV(
          unitOfWork,
          beginWork,
          current2,
          unitOfWork,
          entangledRenderLanes
        );
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === current2 ? completeUnitOfWork(unitOfWork) : workInProgress = current2;
      }
      function replaySuspendedUnitOfWork(unitOfWork) {
        var next = runWithFiberInDEV(unitOfWork, replayBeginWork, unitOfWork);
        unitOfWork.memoizedProps = unitOfWork.pendingProps;
        null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
      }
      function replayBeginWork(unitOfWork) {
        var current2 = unitOfWork.alternate, isProfilingMode = (unitOfWork.mode & ProfileMode) !== NoMode;
        isProfilingMode && startProfilerTimer(unitOfWork);
        switch (unitOfWork.tag) {
          case 15:
          case 0:
            current2 = replayFunctionComponent(
              current2,
              unitOfWork,
              unitOfWork.pendingProps,
              unitOfWork.type,
              void 0,
              workInProgressRootRenderLanes
            );
            break;
          case 11:
            current2 = replayFunctionComponent(
              current2,
              unitOfWork,
              unitOfWork.pendingProps,
              unitOfWork.type.render,
              unitOfWork.ref,
              workInProgressRootRenderLanes
            );
            break;
          case 5:
            resetHooksOnUnwind(unitOfWork);
          default:
            unwindInterruptedWork(current2, unitOfWork), unitOfWork = workInProgress = resetWorkInProgress(unitOfWork, entangledRenderLanes), current2 = beginWork(current2, unitOfWork, entangledRenderLanes);
        }
        isProfilingMode && stopProfilerTimerIfRunningAndRecordDuration(unitOfWork);
        return current2;
      }
      function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
        resetContextDependencies();
        resetHooksOnUnwind(unitOfWork);
        thenableState = null;
        thenableIndexCounter = 0;
        var returnFiber = unitOfWork.return;
        try {
          if (throwException(
            root2,
            returnFiber,
            unitOfWork,
            thrownValue,
            workInProgressRootRenderLanes
          )) {
            workInProgressRootExitStatus = RootFatalErrored;
            logUncaughtError(
              root2,
              createCapturedValueAtFiber(thrownValue, root2.current)
            );
            workInProgress = null;
            return;
          }
        } catch (error) {
          if (null !== returnFiber)
            throw workInProgress = returnFiber, error;
          workInProgressRootExitStatus = RootFatalErrored;
          logUncaughtError(
            root2,
            createCapturedValueAtFiber(thrownValue, root2.current)
          );
          workInProgress = null;
          return;
        }
        if (unitOfWork.flags & 32768) {
          if (isHydrating || suspendedReason === SuspendedOnError)
            root2 = true;
          else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
            root2 = false;
          else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, suspendedReason === SuspendedOnData || suspendedReason === SuspendedOnAction || suspendedReason === SuspendedOnImmediate || suspendedReason === SuspendedOnDeprecatedThrowPromise)
            suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
          unwindUnitOfWork(unitOfWork, root2);
        } else
          completeUnitOfWork(unitOfWork);
      }
      function completeUnitOfWork(unitOfWork) {
        var completedWork = unitOfWork;
        do {
          if (0 !== (completedWork.flags & 32768)) {
            unwindUnitOfWork(
              completedWork,
              workInProgressRootDidSkipSuspendedSiblings
            );
            return;
          }
          var current2 = completedWork.alternate;
          unitOfWork = completedWork.return;
          startProfilerTimer(completedWork);
          current2 = runWithFiberInDEV(
            completedWork,
            completeWork,
            current2,
            completedWork,
            entangledRenderLanes
          );
          (completedWork.mode & ProfileMode) !== NoMode && stopProfilerTimerIfRunningAndRecordIncompleteDuration(completedWork);
          if (null !== current2) {
            workInProgress = current2;
            return;
          }
          completedWork = completedWork.sibling;
          if (null !== completedWork) {
            workInProgress = completedWork;
            return;
          }
          workInProgress = completedWork = unitOfWork;
        } while (null !== completedWork);
        workInProgressRootExitStatus === RootInProgress && (workInProgressRootExitStatus = RootCompleted);
      }
      function unwindUnitOfWork(unitOfWork, skipSiblings) {
        do {
          var next = unwindWork(unitOfWork.alternate, unitOfWork);
          if (null !== next) {
            next.flags &= 32767;
            workInProgress = next;
            return;
          }
          if ((unitOfWork.mode & ProfileMode) !== NoMode) {
            stopProfilerTimerIfRunningAndRecordIncompleteDuration(unitOfWork);
            next = unitOfWork.actualDuration;
            for (var child = unitOfWork.child; null !== child; )
              next += child.actualDuration, child = child.sibling;
            unitOfWork.actualDuration = next;
          }
          next = unitOfWork.return;
          null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
          if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
            workInProgress = unitOfWork;
            return;
          }
          workInProgress = unitOfWork = next;
        } while (null !== unitOfWork);
        workInProgressRootExitStatus = RootSuspendedAtTheShell;
        workInProgress = null;
      }
      function commitRoot(root2, finishedWork, lanes, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes) {
        root2.cancelPendingCommit = null;
        do
          flushPendingEffects();
        while (pendingEffectsStatus !== NO_PENDING_EFFECTS);
        ReactStrictModeWarnings.flushLegacyContextWarning();
        ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings();
        if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
          throw Error("Should not already be working.");
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markCommitStarted && injectedProfilingHooks.markCommitStarted(lanes);
        if (null === finishedWork)
          markCommitStopped();
        else {
          0 === lanes && console.error(
            "finishedLanes should not be empty during a commit. This is a bug in React."
          );
          if (finishedWork === root2.current)
            throw Error(
              "Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue."
            );
          didIncludeRenderPhaseUpdate = finishedWork.lanes | finishedWork.childLanes;
          didIncludeRenderPhaseUpdate |= concurrentlyUpdatedLanes;
          markRootFinished(
            root2,
            lanes,
            didIncludeRenderPhaseUpdate,
            spawnedLane,
            updatedLanes,
            suspendedRetryLanes
          );
          root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
          pendingFinishedWork = finishedWork;
          pendingEffectsRoot = root2;
          pendingEffectsLanes = lanes;
          pendingEffectsRemainingLanes = didIncludeRenderPhaseUpdate;
          pendingPassiveTransitions = transitions;
          pendingRecoverableErrors = recoverableErrors;
          0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256) ? (root2.callbackNode = null, root2.callbackPriority = 0, scheduleCallback$1(NormalPriority$1, function() {
            flushPassiveEffects(true);
            return null;
          })) : (root2.callbackNode = null, root2.callbackPriority = 0);
          commitStartTime = now();
          recoverableErrors = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || recoverableErrors) {
            recoverableErrors = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            transitions = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = DiscreteEventPriority;
            spawnedLane = executionContext;
            executionContext |= CommitContext;
            try {
              commitBeforeMutationEffects(root2, finishedWork, lanes);
            } finally {
              executionContext = spawnedLane, ReactDOMSharedInternals.p = transitions, ReactSharedInternals.T = recoverableErrors;
            }
          }
          pendingEffectsStatus = PENDING_MUTATION_PHASE;
          flushMutationEffects();
          flushLayoutEffects();
          flushSpawnedWork();
        }
      }
      function flushMutationEffects() {
        if (pendingEffectsStatus === PENDING_MUTATION_PHASE) {
          pendingEffectsStatus = NO_PENDING_EFFECTS;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootMutationHasEffect = 0 !== (finishedWork.flags & 13878);
          if (0 !== (finishedWork.subtreeFlags & 13878) || rootMutationHasEffect) {
            rootMutationHasEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = DiscreteEventPriority;
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            try {
              inProgressLanes = lanes;
              inProgressRoot = root2;
              commitMutationEffectsOnFiber(finishedWork, root2);
              inProgressRoot = inProgressLanes = null;
              lanes = selectionInformation;
              var curFocusedElem = getActiveElementDeep(root2.containerInfo), priorFocusedElem = lanes.focusedElem, priorSelectionRange = lanes.selectionRange;
              if (curFocusedElem !== priorFocusedElem && priorFocusedElem && priorFocusedElem.ownerDocument && containsNode(
                priorFocusedElem.ownerDocument.documentElement,
                priorFocusedElem
              )) {
                if (null !== priorSelectionRange && hasSelectionCapabilities(priorFocusedElem)) {
                  var start = priorSelectionRange.start, end = priorSelectionRange.end;
                  void 0 === end && (end = start);
                  if ("selectionStart" in priorFocusedElem)
                    priorFocusedElem.selectionStart = start, priorFocusedElem.selectionEnd = Math.min(
                      end,
                      priorFocusedElem.value.length
                    );
                  else {
                    var doc = priorFocusedElem.ownerDocument || document, win = doc && doc.defaultView || window;
                    if (win.getSelection) {
                      var selection = win.getSelection(), length = priorFocusedElem.textContent.length, start$jscomp$0 = Math.min(
                        priorSelectionRange.start,
                        length
                      ), end$jscomp$0 = void 0 === priorSelectionRange.end ? start$jscomp$0 : Math.min(priorSelectionRange.end, length);
                      !selection.extend && start$jscomp$0 > end$jscomp$0 && (curFocusedElem = end$jscomp$0, end$jscomp$0 = start$jscomp$0, start$jscomp$0 = curFocusedElem);
                      var startMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        start$jscomp$0
                      ), endMarker = getNodeForCharacterOffset(
                        priorFocusedElem,
                        end$jscomp$0
                      );
                      if (startMarker && endMarker && (1 !== selection.rangeCount || selection.anchorNode !== startMarker.node || selection.anchorOffset !== startMarker.offset || selection.focusNode !== endMarker.node || selection.focusOffset !== endMarker.offset)) {
                        var range = doc.createRange();
                        range.setStart(startMarker.node, startMarker.offset);
                        selection.removeAllRanges();
                        start$jscomp$0 > end$jscomp$0 ? (selection.addRange(range), selection.extend(endMarker.node, endMarker.offset)) : (range.setEnd(endMarker.node, endMarker.offset), selection.addRange(range));
                      }
                    }
                  }
                }
                doc = [];
                for (selection = priorFocusedElem; selection = selection.parentNode; )
                  1 === selection.nodeType && doc.push({
                    element: selection,
                    left: selection.scrollLeft,
                    top: selection.scrollTop
                  });
                "function" === typeof priorFocusedElem.focus && priorFocusedElem.focus();
                for (priorFocusedElem = 0; priorFocusedElem < doc.length; priorFocusedElem++) {
                  var info = doc[priorFocusedElem];
                  info.element.scrollLeft = info.left;
                  info.element.scrollTop = info.top;
                }
              }
              _enabled = !!eventsEnabled;
              selectionInformation = eventsEnabled = null;
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootMutationHasEffect;
            }
          }
          root2.current = finishedWork;
          pendingEffectsStatus = PENDING_LAYOUT_PHASE;
        }
      }
      function flushLayoutEffects() {
        if (pendingEffectsStatus === PENDING_LAYOUT_PHASE) {
          pendingEffectsStatus = NO_PENDING_EFFECTS;
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, rootHasLayoutEffect = 0 !== (finishedWork.flags & 8772);
          if (0 !== (finishedWork.subtreeFlags & 8772) || rootHasLayoutEffect) {
            rootHasLayoutEffect = ReactSharedInternals.T;
            ReactSharedInternals.T = null;
            var previousPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = DiscreteEventPriority;
            var prevExecutionContext = executionContext;
            executionContext |= CommitContext;
            try {
              null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markLayoutEffectsStarted && injectedProfilingHooks.markLayoutEffectsStarted(lanes), inProgressLanes = lanes, inProgressRoot = root2, commitLayoutEffectOnFiber(
                root2,
                finishedWork.alternate,
                finishedWork
              ), inProgressRoot = inProgressLanes = null, null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markLayoutEffectsStopped && injectedProfilingHooks.markLayoutEffectsStopped();
            } finally {
              executionContext = prevExecutionContext, ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = rootHasLayoutEffect;
            }
          }
          pendingEffectsStatus = PENDING_AFTER_MUTATION_PHASE;
        }
      }
      function flushSpawnedWork() {
        if (pendingEffectsStatus === PENDING_SPAWNED_WORK || pendingEffectsStatus === PENDING_AFTER_MUTATION_PHASE) {
          pendingEffectsStatus = NO_PENDING_EFFECTS;
          requestPaint();
          var root2 = pendingEffectsRoot, finishedWork = pendingFinishedWork, lanes = pendingEffectsLanes, recoverableErrors = pendingRecoverableErrors, rootDidHavePassiveEffects = 0 !== (finishedWork.subtreeFlags & 10256) || 0 !== (finishedWork.flags & 10256);
          rootDidHavePassiveEffects ? pendingEffectsStatus = PENDING_PASSIVE_PHASE : (pendingEffectsStatus = NO_PENDING_EFFECTS, pendingFinishedWork = pendingEffectsRoot = null, releaseRootPooledCache(root2, root2.pendingLanes), nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = null);
          var remainingLanes = root2.pendingLanes;
          0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
          rootDidHavePassiveEffects || commitDoubleInvokeEffectsInDEV(root2);
          rootDidHavePassiveEffects = lanesToEventPriority(lanes);
          finishedWork = finishedWork.stateNode;
          if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
            try {
              var didError = 128 === (finishedWork.current.flags & 128);
              switch (rootDidHavePassiveEffects) {
                case DiscreteEventPriority:
                  var schedulerPriority = ImmediatePriority;
                  break;
                case ContinuousEventPriority:
                  schedulerPriority = UserBlockingPriority;
                  break;
                case DefaultEventPriority:
                  schedulerPriority = NormalPriority$1;
                  break;
                case IdleEventPriority:
                  schedulerPriority = IdlePriority;
                  break;
                default:
                  schedulerPriority = NormalPriority$1;
              }
              injectedHook.onCommitFiberRoot(
                rendererID,
                finishedWork,
                schedulerPriority,
                didError
              );
            } catch (err) {
              hasLoggedError || (hasLoggedError = true, console.error(
                "React instrumentation encountered an error: %s",
                err
              ));
            }
          isDevToolsPresent && root2.memoizedUpdaters.clear();
          onCommitRoot();
          if (null !== recoverableErrors) {
            didError = ReactSharedInternals.T;
            schedulerPriority = ReactDOMSharedInternals.p;
            ReactDOMSharedInternals.p = DiscreteEventPriority;
            ReactSharedInternals.T = null;
            try {
              var onRecoverableError = root2.onRecoverableError;
              for (finishedWork = 0; finishedWork < recoverableErrors.length; finishedWork++) {
                var recoverableError = recoverableErrors[finishedWork], errorInfo = makeErrorInfo(recoverableError.stack);
                runWithFiberInDEV(
                  recoverableError.source,
                  onRecoverableError,
                  recoverableError.value,
                  errorInfo
                );
              }
            } finally {
              ReactSharedInternals.T = didError, ReactDOMSharedInternals.p = schedulerPriority;
            }
          }
          0 !== (pendingEffectsLanes & 3) && flushPendingEffects();
          ensureRootIsScheduled(root2);
          remainingLanes = root2.pendingLanes;
          0 !== (lanes & 4194090) && 0 !== (remainingLanes & 42) ? (nestedUpdateScheduled = true, root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2)) : nestedUpdateCount = 0;
          flushSyncWorkAcrossRoots_impl(0, false);
          markCommitStopped();
        }
      }
      function makeErrorInfo(componentStack) {
        componentStack = { componentStack };
        Object.defineProperty(componentStack, "digest", {
          get: function() {
            console.error(
              'You are accessing "digest" from the errorInfo object passed to onRecoverableError. This property is no longer provided as part of errorInfo but can be accessed as a property of the Error instance itself.'
            );
          }
        });
        return componentStack;
      }
      function releaseRootPooledCache(root2, remainingLanes) {
        0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
      }
      function flushPendingEffects(wasDelayedCommit) {
        flushMutationEffects();
        flushLayoutEffects();
        flushSpawnedWork();
        return flushPassiveEffects(wasDelayedCommit);
      }
      function flushPassiveEffects() {
        if (pendingEffectsStatus !== PENDING_PASSIVE_PHASE)
          return false;
        var root2 = pendingEffectsRoot, remainingLanes = pendingEffectsRemainingLanes;
        pendingEffectsRemainingLanes = 0;
        var renderPriority = lanesToEventPriority(pendingEffectsLanes), priority = 0 === DefaultEventPriority || DefaultEventPriority > renderPriority ? DefaultEventPriority : renderPriority;
        renderPriority = ReactSharedInternals.T;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = priority;
          ReactSharedInternals.T = null;
          priority = pendingPassiveTransitions;
          pendingPassiveTransitions = null;
          var root$jscomp$0 = pendingEffectsRoot, lanes = pendingEffectsLanes;
          pendingEffectsStatus = NO_PENDING_EFFECTS;
          pendingFinishedWork = pendingEffectsRoot = null;
          pendingEffectsLanes = 0;
          if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
            throw Error("Cannot flush passive effects while already rendering.");
          isFlushingPassiveEffects = true;
          didScheduleUpdateDuringPassiveEffects = false;
          null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markPassiveEffectsStarted && injectedProfilingHooks.markPassiveEffectsStarted(lanes);
          var prevExecutionContext = executionContext;
          executionContext |= CommitContext;
          commitPassiveUnmountOnFiber(root$jscomp$0.current);
          commitPassiveMountOnFiber(
            root$jscomp$0,
            root$jscomp$0.current,
            lanes,
            priority
          );
          null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markPassiveEffectsStopped && injectedProfilingHooks.markPassiveEffectsStopped();
          commitDoubleInvokeEffectsInDEV(root$jscomp$0);
          executionContext = prevExecutionContext;
          flushSyncWorkAcrossRoots_impl(0, false);
          didScheduleUpdateDuringPassiveEffects ? root$jscomp$0 === rootWithPassiveNestedUpdates ? nestedPassiveUpdateCount++ : (nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = root$jscomp$0) : nestedPassiveUpdateCount = 0;
          didScheduleUpdateDuringPassiveEffects = isFlushingPassiveEffects = false;
          if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
            try {
              injectedHook.onPostCommitFiberRoot(rendererID, root$jscomp$0);
            } catch (err) {
              hasLoggedError || (hasLoggedError = true, console.error(
                "React instrumentation encountered an error: %s",
                err
              ));
            }
          var stateNode = root$jscomp$0.current.stateNode;
          stateNode.effectDuration = 0;
          stateNode.passiveEffectDuration = 0;
          return true;
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = renderPriority, releaseRootPooledCache(root2, remainingLanes);
        }
      }
      function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
        sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
        sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
        rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
        null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
      }
      function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
        isRunningInsertionEffect = false;
        if (3 === sourceFiber.tag)
          captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
        else {
          for (; null !== nearestMountedAncestor; ) {
            if (3 === nearestMountedAncestor.tag) {
              captureCommitPhaseErrorOnRoot(
                nearestMountedAncestor,
                sourceFiber,
                error
              );
              return;
            }
            if (1 === nearestMountedAncestor.tag) {
              var instance = nearestMountedAncestor.stateNode;
              if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
                sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
                error = createClassErrorUpdate(2);
                instance = enqueueUpdate(nearestMountedAncestor, error, 2);
                null !== instance && (initializeClassErrorUpdate(
                  error,
                  instance,
                  nearestMountedAncestor,
                  sourceFiber
                ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
                return;
              }
            }
            nearestMountedAncestor = nearestMountedAncestor.return;
          }
          console.error(
            "Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Potential causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s",
            error
          );
        }
      }
      function attachPingListener(root2, wakeable, lanes) {
        var pingCache = root2.pingCache;
        if (null === pingCache) {
          pingCache = root2.pingCache = new PossiblyWeakMap();
          var threadIDs = /* @__PURE__ */ new Set();
          pingCache.set(wakeable, threadIDs);
        } else
          threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
        threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), pingCache = pingSuspendedRoot.bind(null, root2, wakeable, lanes), isDevToolsPresent && restorePendingUpdaters(root2, lanes), wakeable.then(pingCache, pingCache));
      }
      function pingSuspendedRoot(root2, wakeable, pingedLanes) {
        var pingCache = root2.pingCache;
        null !== pingCache && pingCache.delete(wakeable);
        root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
        root2.warmLanes &= ~pingedLanes;
        isConcurrentActEnvironment() && null === ReactSharedInternals.actQueue && console.error(
          "A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act"
        );
        workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (workInProgressRootExitStatus === RootSuspendedWithDelay || workInProgressRootExitStatus === RootSuspended && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && now$1() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS ? (executionContext & RenderContext) === NoContext && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
        ensureRootIsScheduled(root2);
      }
      function retryTimedOutBoundary(boundaryFiber, retryLane) {
        0 === retryLane && (retryLane = claimNextRetryLane());
        boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
        null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
      }
      function retryDehydratedSuspenseBoundary(boundaryFiber) {
        var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
        null !== suspenseState && (retryLane = suspenseState.retryLane);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function resolveRetryWakeable(boundaryFiber, wakeable) {
        var retryLane = 0;
        switch (boundaryFiber.tag) {
          case 13:
            var retryCache = boundaryFiber.stateNode;
            var suspenseState = boundaryFiber.memoizedState;
            null !== suspenseState && (retryLane = suspenseState.retryLane);
            break;
          case 19:
            retryCache = boundaryFiber.stateNode;
            break;
          case 22:
            retryCache = boundaryFiber.stateNode._retryCache;
            break;
          default:
            throw Error(
              "Pinged unknown suspense boundary type. This is probably a bug in React."
            );
        }
        null !== retryCache && retryCache.delete(wakeable);
        retryTimedOutBoundary(boundaryFiber, retryLane);
      }
      function recursivelyTraverseAndDoubleInvokeEffectsInDEV(root$jscomp$0, parentFiber, isInStrictMode) {
        if (0 !== (parentFiber.subtreeFlags & 67117056))
          for (parentFiber = parentFiber.child; null !== parentFiber; ) {
            var root2 = root$jscomp$0, fiber = parentFiber, isStrictModeFiber = fiber.type === REACT_STRICT_MODE_TYPE;
            isStrictModeFiber = isInStrictMode || isStrictModeFiber;
            22 !== fiber.tag ? fiber.flags & 67108864 ? isStrictModeFiber && runWithFiberInDEV(
              fiber,
              doubleInvokeEffectsOnFiber,
              root2,
              fiber,
              (fiber.mode & NoStrictPassiveEffectsMode) === NoMode
            ) : recursivelyTraverseAndDoubleInvokeEffectsInDEV(
              root2,
              fiber,
              isStrictModeFiber
            ) : null === fiber.memoizedState && (isStrictModeFiber && fiber.flags & 8192 ? runWithFiberInDEV(
              fiber,
              doubleInvokeEffectsOnFiber,
              root2,
              fiber
            ) : fiber.subtreeFlags & 67108864 && runWithFiberInDEV(
              fiber,
              recursivelyTraverseAndDoubleInvokeEffectsInDEV,
              root2,
              fiber,
              isStrictModeFiber
            ));
            parentFiber = parentFiber.sibling;
          }
      }
      function doubleInvokeEffectsOnFiber(root2, fiber) {
        var shouldDoubleInvokePassiveEffects = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : true;
        setIsStrictModeForDevtools(true);
        try {
          disappearLayoutEffects(fiber), shouldDoubleInvokePassiveEffects && disconnectPassiveEffect(fiber), reappearLayoutEffects(root2, fiber.alternate, fiber, false), shouldDoubleInvokePassiveEffects && reconnectPassiveEffects(root2, fiber, 0, null, false, 0);
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
      function commitDoubleInvokeEffectsInDEV(root2) {
        var doubleInvokeEffects = true;
        root2.current.mode & (StrictLegacyMode | StrictEffectsMode) || (doubleInvokeEffects = false);
        recursivelyTraverseAndDoubleInvokeEffectsInDEV(
          root2,
          root2.current,
          doubleInvokeEffects
        );
      }
      function warnAboutUpdateOnNotYetMountedFiberInDEV(fiber) {
        if ((executionContext & RenderContext) === NoContext) {
          var tag = fiber.tag;
          if (3 === tag || 1 === tag || 0 === tag || 11 === tag || 14 === tag || 15 === tag) {
            tag = getComponentNameFromFiber(fiber) || "ReactComponent";
            if (null !== didWarnStateUpdateForNotYetMountedComponent) {
              if (didWarnStateUpdateForNotYetMountedComponent.has(tag))
                return;
              didWarnStateUpdateForNotYetMountedComponent.add(tag);
            } else
              didWarnStateUpdateForNotYetMountedComponent = /* @__PURE__ */ new Set([tag]);
            runWithFiberInDEV(fiber, function() {
              console.error(
                "Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead."
              );
            });
          }
        }
      }
      function restorePendingUpdaters(root2, lanes) {
        isDevToolsPresent && root2.memoizedUpdaters.forEach(function(schedulingFiber) {
          addFiberToLanesMap(root2, schedulingFiber, lanes);
        });
      }
      function scheduleCallback$1(priorityLevel, callback) {
        var actQueue = ReactSharedInternals.actQueue;
        return null !== actQueue ? (actQueue.push(callback), fakeActCallbackNode$1) : scheduleCallback$3(priorityLevel, callback);
      }
      function warnIfUpdatesNotWrappedWithActDEV(fiber) {
        isConcurrentActEnvironment() && null === ReactSharedInternals.actQueue && runWithFiberInDEV(fiber, function() {
          console.error(
            "An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://react.dev/link/wrap-tests-with-act",
            getComponentNameFromFiber(fiber)
          );
        });
      }
      function ensureRootIsScheduled(root2) {
        root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
        mightHavePendingSyncWork = true;
        null !== ReactSharedInternals.actQueue ? didScheduleMicrotask_act || (didScheduleMicrotask_act = true, scheduleImmediateRootScheduleTask()) : didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateRootScheduleTask());
      }
      function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
        if (!isFlushingWork && mightHavePendingSyncWork) {
          isFlushingWork = true;
          do {
            var didPerformSomeWork = false;
            for (var root2 = firstScheduledRoot; null !== root2; ) {
              if (!onlyLegacy)
                if (0 !== syncTransitionLanes) {
                  var pendingLanes = root2.pendingLanes;
                  if (0 === pendingLanes)
                    var nextLanes = 0;
                  else {
                    var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes;
                    nextLanes = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
                    nextLanes &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
                    nextLanes = nextLanes & 201326741 ? nextLanes & 201326741 | 1 : nextLanes ? nextLanes | 2 : 0;
                  }
                  0 !== nextLanes && (didPerformSomeWork = true, performSyncWorkOnRoot(root2, nextLanes));
                } else
                  nextLanes = workInProgressRootRenderLanes, nextLanes = getNextLanes(
                    root2,
                    root2 === workInProgressRoot ? nextLanes : 0,
                    null !== root2.cancelPendingCommit || root2.timeoutHandle !== noTimeout
                  ), 0 === (nextLanes & 3) || checkIfRootIsPrerendering(root2, nextLanes) || (didPerformSomeWork = true, performSyncWorkOnRoot(root2, nextLanes));
              root2 = root2.next;
            }
          } while (didPerformSomeWork);
          isFlushingWork = false;
        }
      }
      function processRootScheduleInImmediateTask() {
        processRootScheduleInMicrotask();
      }
      function processRootScheduleInMicrotask() {
        mightHavePendingSyncWork = didScheduleMicrotask_act = didScheduleMicrotask = false;
        var syncTransitionLanes = 0;
        0 !== currentEventTransitionLane && (shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane), currentEventTransitionLane = 0);
        for (var currentTime = now$1(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
          var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
          if (0 === nextLanes)
            root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
          else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
            mightHavePendingSyncWork = true;
          root2 = next;
        }
        flushSyncWorkAcrossRoots_impl(syncTransitionLanes, false);
      }
      function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
        for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
          var index = 31 - clz32(lanes), lane = 1 << index, expirationTime = expirationTimes[index];
          if (-1 === expirationTime) {
            if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
              expirationTimes[index] = computeExpirationTime(lane, currentTime);
          } else
            expirationTime <= currentTime && (root2.expiredLanes |= lane);
          lanes &= ~lane;
        }
        currentTime = workInProgressRoot;
        suspendedLanes = workInProgressRootRenderLanes;
        suspendedLanes = getNextLanes(
          root2,
          root2 === currentTime ? suspendedLanes : 0,
          null !== root2.cancelPendingCommit || root2.timeoutHandle !== noTimeout
        );
        pingedLanes = root2.callbackNode;
        if (0 === suspendedLanes || root2 === currentTime && (workInProgressSuspendedReason === SuspendedOnData || workInProgressSuspendedReason === SuspendedOnAction) || null !== root2.cancelPendingCommit)
          return null !== pingedLanes && cancelCallback(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
        if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
          currentTime = suspendedLanes & -suspendedLanes;
          if (currentTime !== root2.callbackPriority || null !== ReactSharedInternals.actQueue && pingedLanes !== fakeActCallbackNode)
            cancelCallback(pingedLanes);
          else
            return currentTime;
          switch (lanesToEventPriority(suspendedLanes)) {
            case DiscreteEventPriority:
            case ContinuousEventPriority:
              suspendedLanes = UserBlockingPriority;
              break;
            case DefaultEventPriority:
              suspendedLanes = NormalPriority$1;
              break;
            case IdleEventPriority:
              suspendedLanes = IdlePriority;
              break;
            default:
              suspendedLanes = NormalPriority$1;
          }
          pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
          null !== ReactSharedInternals.actQueue ? (ReactSharedInternals.actQueue.push(pingedLanes), suspendedLanes = fakeActCallbackNode) : suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
          root2.callbackPriority = currentTime;
          root2.callbackNode = suspendedLanes;
          return currentTime;
        }
        null !== pingedLanes && cancelCallback(pingedLanes);
        root2.callbackPriority = 2;
        root2.callbackNode = null;
        return 2;
      }
      function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
        nestedUpdateScheduled = currentUpdateIsNested = false;
        if (pendingEffectsStatus !== NO_PENDING_EFFECTS && pendingEffectsStatus !== PENDING_PASSIVE_PHASE)
          return root2.callbackNode = null, root2.callbackPriority = 0, null;
        var originalCallbackNode = root2.callbackNode;
        if (flushPendingEffects(true) && root2.callbackNode !== originalCallbackNode)
          return null;
        var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
        workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
          root2,
          root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0,
          null !== root2.cancelPendingCommit || root2.timeoutHandle !== noTimeout
        );
        if (0 === workInProgressRootRenderLanes$jscomp$0)
          return null;
        performWorkOnRoot(
          root2,
          workInProgressRootRenderLanes$jscomp$0,
          didTimeout
        );
        scheduleTaskForRootDuringMicrotask(root2, now$1());
        return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
      }
      function performSyncWorkOnRoot(root2, lanes) {
        if (flushPendingEffects())
          return null;
        currentUpdateIsNested = nestedUpdateScheduled;
        nestedUpdateScheduled = false;
        performWorkOnRoot(root2, lanes, true);
      }
      function cancelCallback(callbackNode) {
        callbackNode !== fakeActCallbackNode && null !== callbackNode && cancelCallback$1(callbackNode);
      }
      function scheduleImmediateRootScheduleTask() {
        null !== ReactSharedInternals.actQueue && ReactSharedInternals.actQueue.push(function() {
          processRootScheduleInMicrotask();
          return null;
        });
        scheduleMicrotask(function() {
          (executionContext & (RenderContext | CommitContext)) !== NoContext ? scheduleCallback$3(
            ImmediatePriority,
            processRootScheduleInImmediateTask
          ) : processRootScheduleInMicrotask();
        });
      }
      function requestTransitionLane() {
        0 === currentEventTransitionLane && (currentEventTransitionLane = claimNextTransitionLane());
        return currentEventTransitionLane;
      }
      function coerceFormActionProp(actionProp) {
        if (null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp)
          return null;
        if ("function" === typeof actionProp)
          return actionProp;
        checkAttributeStringCoercion(actionProp, "action");
        return sanitizeURL("" + actionProp);
      }
      function createFormDataWithSubmitter(form, submitter) {
        var temp = submitter.ownerDocument.createElement("input");
        temp.name = submitter.name;
        temp.value = submitter.value;
        form.id && temp.setAttribute("form", form.id);
        submitter.parentNode.insertBefore(temp, submitter);
        form = new FormData(form);
        temp.parentNode.removeChild(temp);
        return form;
      }
      function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
        if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
          var action = coerceFormActionProp(
            (nativeEventTarget[internalPropsKey] || null).action
          ), submitter = nativeEvent.submitter;
          submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
          var event = new SyntheticEvent(
            "action",
            "action",
            null,
            nativeEvent,
            nativeEventTarget
          );
          dispatchQueue.push({
            event,
            listeners: [
              {
                instance: null,
                listener: function() {
                  if (nativeEvent.defaultPrevented) {
                    if (0 !== currentEventTransitionLane) {
                      var formData = submitter ? createFormDataWithSubmitter(
                        nativeEventTarget,
                        submitter
                      ) : new FormData(nativeEventTarget), pendingState = {
                        pending: true,
                        data: formData,
                        method: nativeEventTarget.method,
                        action
                      };
                      Object.freeze(pendingState);
                      startHostTransition(
                        maybeTargetInst,
                        pendingState,
                        null,
                        formData
                      );
                    }
                  } else
                    "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(
                      nativeEventTarget,
                      submitter
                    ) : new FormData(nativeEventTarget), pendingState = {
                      pending: true,
                      data: formData,
                      method: nativeEventTarget.method,
                      action
                    }, Object.freeze(pendingState), startHostTransition(
                      maybeTargetInst,
                      pendingState,
                      action,
                      formData
                    ));
                },
                currentTarget: nativeEventTarget
              }
            ]
          });
        }
      }
      function executeDispatch(event, listener, currentTarget) {
        event.currentTarget = currentTarget;
        try {
          listener(event);
        } catch (error) {
          reportGlobalError(error);
        }
        event.currentTarget = null;
      }
      function processDispatchQueue(dispatchQueue, eventSystemFlags) {
        eventSystemFlags = 0 !== (eventSystemFlags & 4);
        for (var i = 0; i < dispatchQueue.length; i++) {
          var _dispatchQueue$i = dispatchQueue[i];
          a: {
            var previousInstance = void 0, event = _dispatchQueue$i.event;
            _dispatchQueue$i = _dispatchQueue$i.listeners;
            if (eventSystemFlags)
              for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
                var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                null !== instance ? runWithFiberInDEV(
                  instance,
                  executeDispatch,
                  event,
                  _dispatchListeners$i,
                  currentTarget
                ) : executeDispatch(event, _dispatchListeners$i, currentTarget);
                previousInstance = instance;
              }
            else
              for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
                _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
                instance = _dispatchListeners$i.instance;
                currentTarget = _dispatchListeners$i.currentTarget;
                _dispatchListeners$i = _dispatchListeners$i.listener;
                if (instance !== previousInstance && event.isPropagationStopped())
                  break a;
                null !== instance ? runWithFiberInDEV(
                  instance,
                  executeDispatch,
                  event,
                  _dispatchListeners$i,
                  currentTarget
                ) : executeDispatch(event, _dispatchListeners$i, currentTarget);
                previousInstance = instance;
              }
          }
        }
      }
      function listenToNonDelegatedEvent(domEventName, targetElement) {
        nonDelegatedEvents.has(domEventName) || console.error(
          'Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',
          domEventName
        );
        var listenerSet = targetElement[internalEventHandlersKey];
        void 0 === listenerSet && (listenerSet = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
        var listenerSetKey = domEventName + "__bubble";
        listenerSet.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), listenerSet.add(listenerSetKey));
      }
      function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
        nonDelegatedEvents.has(domEventName) && !isCapturePhaseListener && console.error(
          'Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',
          domEventName
        );
        var eventSystemFlags = 0;
        isCapturePhaseListener && (eventSystemFlags |= 4);
        addTrappedEventListener(
          target,
          domEventName,
          eventSystemFlags,
          isCapturePhaseListener
        );
      }
      function listenToAllSupportedEvents(rootContainerElement) {
        if (!rootContainerElement[listeningMarker]) {
          rootContainerElement[listeningMarker] = true;
          allNativeEvents.forEach(function(domEventName) {
            "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
          });
          var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
          null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
        }
      }
      function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
        switch (getEventPriority(domEventName)) {
          case DiscreteEventPriority:
            var listenerWrapper = dispatchDiscreteEvent;
            break;
          case ContinuousEventPriority:
            listenerWrapper = dispatchContinuousEvent;
            break;
          default:
            listenerWrapper = dispatchEvent;
        }
        eventSystemFlags = listenerWrapper.bind(
          null,
          domEventName,
          eventSystemFlags,
          targetContainer
        );
        listenerWrapper = void 0;
        !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
        isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          capture: true,
          passive: listenerWrapper
        }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
          passive: listenerWrapper
        }) : targetContainer.addEventListener(
          domEventName,
          eventSystemFlags,
          false
        );
      }
      function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
        var ancestorInst = targetInst$jscomp$0;
        if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
          a:
            for (; ; ) {
              if (null === targetInst$jscomp$0)
                return;
              var nodeTag = targetInst$jscomp$0.tag;
              if (3 === nodeTag || 4 === nodeTag) {
                var container = targetInst$jscomp$0.stateNode.containerInfo;
                if (container === targetContainer)
                  break;
                if (4 === nodeTag)
                  for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
                    var grandTag = nodeTag.tag;
                    if ((3 === grandTag || 4 === grandTag) && nodeTag.stateNode.containerInfo === targetContainer)
                      return;
                    nodeTag = nodeTag.return;
                  }
                for (; null !== container; ) {
                  nodeTag = getClosestInstanceFromNode(container);
                  if (null === nodeTag)
                    return;
                  grandTag = nodeTag.tag;
                  if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
                    targetInst$jscomp$0 = ancestorInst = nodeTag;
                    continue a;
                  }
                  container = container.parentNode;
                }
              }
              targetInst$jscomp$0 = targetInst$jscomp$0.return;
            }
        batchedUpdates$1(function() {
          var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
          a: {
            var reactName = topLevelEventsToReactNames.get(domEventName);
            if (void 0 !== reactName) {
              var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
              switch (domEventName) {
                case "keypress":
                  if (0 === getEventCharCode(nativeEvent))
                    break a;
                case "keydown":
                case "keyup":
                  SyntheticEventCtor = SyntheticKeyboardEvent;
                  break;
                case "focusin":
                  reactEventType = "focus";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "focusout":
                  reactEventType = "blur";
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "beforeblur":
                case "afterblur":
                  SyntheticEventCtor = SyntheticFocusEvent;
                  break;
                case "click":
                  if (2 === nativeEvent.button)
                    break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  SyntheticEventCtor = SyntheticMouseEvent;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  SyntheticEventCtor = SyntheticDragEvent;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  SyntheticEventCtor = SyntheticTouchEvent;
                  break;
                case ANIMATION_END:
                case ANIMATION_ITERATION:
                case ANIMATION_START:
                  SyntheticEventCtor = SyntheticAnimationEvent;
                  break;
                case TRANSITION_END:
                  SyntheticEventCtor = SyntheticTransitionEvent;
                  break;
                case "scroll":
                case "scrollend":
                  SyntheticEventCtor = SyntheticUIEvent;
                  break;
                case "wheel":
                  SyntheticEventCtor = SyntheticWheelEvent;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  SyntheticEventCtor = SyntheticClipboardEvent;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  SyntheticEventCtor = SyntheticPointerEvent;
                  break;
                case "toggle":
                case "beforetoggle":
                  SyntheticEventCtor = SyntheticToggleEvent;
              }
              var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
              inCapturePhase = [];
              for (var instance = targetInst, lastHostComponent; null !== instance; ) {
                var _instance2 = instance;
                lastHostComponent = _instance2.stateNode;
                _instance2 = _instance2.tag;
                5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === lastHostComponent || null === reactEventName || (_instance2 = getListener(instance, reactEventName), null != _instance2 && inCapturePhase.push(
                  createDispatchListener(
                    instance,
                    _instance2,
                    lastHostComponent
                  )
                ));
                if (accumulateTargetOnly)
                  break;
                instance = instance.return;
              }
              0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
                reactName,
                reactEventType,
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({
                event: reactName,
                listeners: inCapturePhase
              }));
            }
          }
          if (0 === (eventSystemFlags & 7)) {
            a: {
              reactName = "mouseover" === domEventName || "pointerover" === domEventName;
              SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
              if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
                break a;
              if (SyntheticEventCtor || reactName) {
                reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
                if (SyntheticEventCtor) {
                  if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
                    reactEventType = null;
                } else
                  SyntheticEventCtor = null, reactEventType = targetInst;
                if (SyntheticEventCtor !== reactEventType) {
                  inCapturePhase = SyntheticMouseEvent;
                  _instance2 = "onMouseLeave";
                  reactEventName = "onMouseEnter";
                  instance = "mouse";
                  if ("pointerout" === domEventName || "pointerover" === domEventName)
                    inCapturePhase = SyntheticPointerEvent, _instance2 = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
                  accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
                  lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
                  reactName = new inCapturePhase(
                    _instance2,
                    instance + "leave",
                    SyntheticEventCtor,
                    nativeEvent,
                    nativeEventTarget
                  );
                  reactName.target = accumulateTargetOnly;
                  reactName.relatedTarget = lastHostComponent;
                  _instance2 = null;
                  getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
                    reactEventName,
                    instance + "enter",
                    reactEventType,
                    nativeEvent,
                    nativeEventTarget
                  ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance2 = inCapturePhase);
                  accumulateTargetOnly = _instance2;
                  if (SyntheticEventCtor && reactEventType)
                    b: {
                      inCapturePhase = SyntheticEventCtor;
                      reactEventName = reactEventType;
                      instance = 0;
                      for (lastHostComponent = inCapturePhase; lastHostComponent; lastHostComponent = getParent(lastHostComponent))
                        instance++;
                      lastHostComponent = 0;
                      for (_instance2 = reactEventName; _instance2; _instance2 = getParent(_instance2))
                        lastHostComponent++;
                      for (; 0 < instance - lastHostComponent; )
                        inCapturePhase = getParent(inCapturePhase), instance--;
                      for (; 0 < lastHostComponent - instance; )
                        reactEventName = getParent(reactEventName), lastHostComponent--;
                      for (; instance--; ) {
                        if (inCapturePhase === reactEventName || null !== reactEventName && inCapturePhase === reactEventName.alternate)
                          break b;
                        inCapturePhase = getParent(inCapturePhase);
                        reactEventName = getParent(reactEventName);
                      }
                      inCapturePhase = null;
                    }
                  else
                    inCapturePhase = null;
                  null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    reactName,
                    SyntheticEventCtor,
                    inCapturePhase,
                    false
                  );
                  null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
                    dispatchQueue,
                    accumulateTargetOnly,
                    reactEventType,
                    inCapturePhase,
                    true
                  );
                }
              }
            }
            a: {
              reactName = targetInst ? getNodeFromInstance(targetInst) : window;
              SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
              if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
                var getTargetInstFunc = getTargetInstForChangeEvent;
              else if (isTextInputElement(reactName))
                if (isInputEventSupported)
                  getTargetInstFunc = getTargetInstForInputOrChangeEvent;
                else {
                  getTargetInstFunc = getTargetInstForInputEventPolyfill;
                  var handleEventFunc = handleEventsForInputEventPolyfill;
                }
              else
                SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
              if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
                createAndAccumulateChangeEvent(
                  dispatchQueue,
                  getTargetInstFunc,
                  nativeEvent,
                  nativeEventTarget
                );
                break a;
              }
              handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
              "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
            }
            handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
            switch (domEventName) {
              case "focusin":
                if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
                  activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
                break;
              case "focusout":
                lastSelection = activeElementInst = activeElement = null;
                break;
              case "mousedown":
                mouseDown = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                mouseDown = false;
                constructSelectEvent(
                  dispatchQueue,
                  nativeEvent,
                  nativeEventTarget
                );
                break;
              case "selectionchange":
                if (skipSelectionChangeEvent)
                  break;
              case "keydown":
              case "keyup":
                constructSelectEvent(
                  dispatchQueue,
                  nativeEvent,
                  nativeEventTarget
                );
            }
            var fallbackData;
            if (canUseCompositionEvent)
              b: {
                switch (domEventName) {
                  case "compositionstart":
                    var eventType = "onCompositionStart";
                    break b;
                  case "compositionend":
                    eventType = "onCompositionEnd";
                    break b;
                  case "compositionupdate":
                    eventType = "onCompositionUpdate";
                    break b;
                }
                eventType = void 0;
              }
            else
              isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && nativeEvent.keyCode === START_KEYCODE && (eventType = "onCompositionStart");
            eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(
              targetInst,
              eventType
            ), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
              eventType,
              domEventName,
              null,
              nativeEvent,
              nativeEventTarget
            ), dispatchQueue.push({
              event: eventType,
              listeners: handleEventFunc
            }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
            if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
              eventType = accumulateTwoPhaseListeners(
                targetInst,
                "onBeforeInput"
              ), 0 < eventType.length && (handleEventFunc = new SyntheticInputEvent(
                "onBeforeInput",
                "beforeinput",
                null,
                nativeEvent,
                nativeEventTarget
              ), dispatchQueue.push({
                event: handleEventFunc,
                listeners: eventType
              }), handleEventFunc.data = fallbackData);
            extractEvents$1(
              dispatchQueue,
              domEventName,
              targetInst,
              nativeEvent,
              nativeEventTarget
            );
          }
          processDispatchQueue(dispatchQueue, eventSystemFlags);
        });
      }
      function createDispatchListener(instance, listener, currentTarget) {
        return {
          instance,
          listener,
          currentTarget
        };
      }
      function accumulateTwoPhaseListeners(targetFiber, reactName) {
        for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
          var _instance3 = targetFiber, stateNode = _instance3.stateNode;
          _instance3 = _instance3.tag;
          5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (_instance3 = getListener(targetFiber, captureName), null != _instance3 && listeners.unshift(
            createDispatchListener(targetFiber, _instance3, stateNode)
          ), _instance3 = getListener(targetFiber, reactName), null != _instance3 && listeners.push(
            createDispatchListener(targetFiber, _instance3, stateNode)
          ));
          if (3 === targetFiber.tag)
            return listeners;
          targetFiber = targetFiber.return;
        }
        return [];
      }
      function getParent(inst) {
        if (null === inst)
          return null;
        do
          inst = inst.return;
        while (inst && 5 !== inst.tag && 27 !== inst.tag);
        return inst ? inst : null;
      }
      function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
        for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
          var _instance4 = target, alternate = _instance4.alternate, stateNode = _instance4.stateNode;
          _instance4 = _instance4.tag;
          if (null !== alternate && alternate === common)
            break;
          5 !== _instance4 && 26 !== _instance4 && 27 !== _instance4 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
            createDispatchListener(target, stateNode, alternate)
          )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
            createDispatchListener(target, stateNode, alternate)
          )));
          target = target.return;
        }
        0 !== listeners.length && dispatchQueue.push({ event, listeners });
      }
      function validatePropertiesInDevelopment(type, props) {
        validateProperties$2(type, props);
        "input" !== type && "textarea" !== type && "select" !== type || null == props || null !== props.value || didWarnValueNull || (didWarnValueNull = true, "select" === type && props.multiple ? console.error(
          "`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",
          type
        ) : console.error(
          "`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",
          type
        ));
        var eventRegistry = {
          registrationNameDependencies,
          possibleRegistrationNames
        };
        isCustomElement(type) || "string" === typeof props.is || warnUnknownProperties(type, props, eventRegistry);
        props.contentEditable && !props.suppressContentEditableWarning && null != props.children && console.error(
          "A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."
        );
      }
      function warnForPropDifference(propName, serverValue, clientValue, serverDifferences) {
        serverValue !== clientValue && (clientValue = normalizeMarkupForTextOrAttribute(clientValue), normalizeMarkupForTextOrAttribute(serverValue) !== clientValue && (serverDifferences[propName] = serverValue));
      }
      function warnForExtraAttributes(domElement, attributeNames, serverDifferences) {
        attributeNames.forEach(function(attributeName) {
          serverDifferences[getPropNameFromAttributeName(attributeName)] = "style" === attributeName ? getStylesObjectFromElement(domElement) : domElement.getAttribute(attributeName);
        });
      }
      function warnForInvalidEventListener(registrationName, listener) {
        false === listener ? console.error(
          "Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",
          registrationName,
          registrationName,
          registrationName
        ) : console.error(
          "Expected `%s` listener to be a function, instead got a value of `%s` type.",
          registrationName,
          typeof listener
        );
      }
      function normalizeHTML(parent, html) {
        parent = parent.namespaceURI === MATH_NAMESPACE || parent.namespaceURI === SVG_NAMESPACE ? parent.ownerDocument.createElementNS(
          parent.namespaceURI,
          parent.tagName
        ) : parent.ownerDocument.createElement(parent.tagName);
        parent.innerHTML = html;
        return parent.innerHTML;
      }
      function normalizeMarkupForTextOrAttribute(markup) {
        willCoercionThrow(markup) && (console.error(
          "The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before using it here.",
          typeName(markup)
        ), testStringCoercion(markup));
        return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
      }
      function checkForUnmatchedText(serverText, clientText) {
        clientText = normalizeMarkupForTextOrAttribute(clientText);
        return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
      }
      function noop$1() {
      }
      function setProp(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "children":
            if ("string" === typeof value)
              validateTextNesting(value, tag, false), "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value);
            else if ("number" === typeof value || "bigint" === typeof value)
              validateTextNesting("" + value, tag, false), "body" !== tag && setTextContent(domElement, "" + value);
            break;
          case "className":
            setValueForKnownAttribute(domElement, "class", value);
            break;
          case "tabIndex":
            setValueForKnownAttribute(domElement, "tabindex", value);
            break;
          case "dir":
          case "role":
          case "viewBox":
          case "width":
          case "height":
            setValueForKnownAttribute(domElement, key, value);
            break;
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "data":
            if ("object" !== tag) {
              setValueForKnownAttribute(domElement, "data", value);
              break;
            }
          case "src":
          case "href":
            if ("" === value && ("a" !== tag || "href" !== key)) {
              "src" === key ? console.error(
                'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                key,
                key
              ) : console.error(
                'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                key,
                key
              );
              domElement.removeAttribute(key);
              break;
            }
            if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            checkAttributeStringCoercion(value, key);
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "action":
          case "formAction":
            null != value && ("form" === tag ? "formAction" === key ? console.error(
              "You can only pass the formAction prop to <input> or <button>. Use the action prop on <form>."
            ) : "function" === typeof value && (null == props.encType && null == props.method || didWarnFormActionMethod || (didWarnFormActionMethod = true, console.error(
              "Cannot specify a encType or method for a form that specifies a function as the action. React provides those automatically. They will get overridden."
            )), null == props.target || didWarnFormActionTarget || (didWarnFormActionTarget = true, console.error(
              "Cannot specify a target for a form that specifies a function as the action. The function will always be executed in the same window."
            ))) : "input" === tag || "button" === tag ? "action" === key ? console.error(
              "You can only pass the action prop to <form>. Use the formAction prop on <input> or <button>."
            ) : "input" !== tag || "submit" === props.type || "image" === props.type || didWarnFormActionType ? "button" !== tag || null == props.type || "submit" === props.type || didWarnFormActionType ? "function" === typeof value && (null == props.name || didWarnFormActionName || (didWarnFormActionName = true, console.error(
              'Cannot specify a "name" prop for a button that specifies a function as a formAction. React needs it to encode which action should be invoked. It will get overridden.'
            )), null == props.formEncType && null == props.formMethod || didWarnFormActionMethod || (didWarnFormActionMethod = true, console.error(
              "Cannot specify a formEncType or formMethod for a button that specifies a function as a formAction. React provides those automatically. They will get overridden."
            )), null == props.formTarget || didWarnFormActionTarget || (didWarnFormActionTarget = true, console.error(
              "Cannot specify a formTarget for a button that specifies a function as a formAction. The function will always be executed in the same window."
            ))) : (didWarnFormActionType = true, console.error(
              'A button can only specify a formAction along with type="submit" or no type.'
            )) : (didWarnFormActionType = true, console.error(
              'An input can only specify a formAction along with type="submit" or type="image".'
            )) : "action" === key ? console.error(
              "You can only pass the action prop to <form>."
            ) : console.error(
              "You can only pass the formAction prop to <input> or <button>."
            ));
            if ("function" === typeof value) {
              domElement.setAttribute(
                key,
                "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
              break;
            } else
              "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
                domElement,
                tag,
                "formEncType",
                props.formEncType,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formMethod",
                props.formMethod,
                props,
                null
              ), setProp(
                domElement,
                tag,
                "formTarget",
                props.formTarget,
                props,
                null
              )) : (setProp(
                domElement,
                tag,
                "encType",
                props.encType,
                props,
                null
              ), setProp(domElement, tag, "method", props.method, props, null), setProp(
                domElement,
                tag,
                "target",
                props.target,
                props,
                null
              )));
            if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
              domElement.removeAttribute(key);
              break;
            }
            checkAttributeStringCoercion(value, key);
            value = sanitizeURL("" + value);
            domElement.setAttribute(key, value);
            break;
          case "onClick":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), domElement.onclick = noop$1);
            break;
          case "onScroll":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), listenToNonDelegatedEvent("scroll", domElement));
            break;
          case "onScrollEnd":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), listenToNonDelegatedEvent("scrollend", domElement));
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(
                  "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
                );
              key = value.__html;
              if (null != key) {
                if (null != props.children)
                  throw Error(
                    "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                  );
                domElement.innerHTML = key;
              }
            }
            break;
          case "multiple":
            domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "muted":
            domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "defaultValue":
          case "defaultChecked":
          case "innerHTML":
          case "ref":
            break;
          case "autoFocus":
            break;
          case "xlinkHref":
            if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
              domElement.removeAttribute("xlink:href");
              break;
            }
            checkAttributeStringCoercion(value, key);
            key = sanitizeURL("" + value);
            domElement.setAttributeNS(xlinkNamespace, "xlink:href", key);
            break;
          case "contentEditable":
          case "spellCheck":
          case "draggable":
          case "value":
          case "autoReverse":
          case "externalResourcesRequired":
          case "focusable":
          case "preserveAlpha":
            null != value && "function" !== typeof value && "symbol" !== typeof value ? (checkAttributeStringCoercion(value, key), domElement.setAttribute(key, "" + value)) : domElement.removeAttribute(key);
            break;
          case "inert":
            "" !== value || didWarnForNewBooleanPropsWithEmptyValue[key] || (didWarnForNewBooleanPropsWithEmptyValue[key] = true, console.error(
              "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
              key
            ));
          case "allowFullScreen":
          case "async":
          case "autoPlay":
          case "controls":
          case "default":
          case "defer":
          case "disabled":
          case "disablePictureInPicture":
          case "disableRemotePlayback":
          case "formNoValidate":
          case "hidden":
          case "loop":
          case "noModule":
          case "noValidate":
          case "open":
          case "playsInline":
          case "readOnly":
          case "required":
          case "reversed":
          case "scoped":
          case "seamless":
          case "itemScope":
            value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
            break;
          case "capture":
          case "download":
            true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? (checkAttributeStringCoercion(value, key), domElement.setAttribute(key, value)) : domElement.removeAttribute(key);
            break;
          case "cols":
          case "rows":
          case "size":
          case "span":
            null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? (checkAttributeStringCoercion(value, key), domElement.setAttribute(key, value)) : domElement.removeAttribute(key);
            break;
          case "rowSpan":
          case "start":
            null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : (checkAttributeStringCoercion(value, key), domElement.setAttribute(key, value));
            break;
          case "popover":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            setValueForAttribute(domElement, "popover", value);
            break;
          case "xlinkActuate":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:actuate",
              value
            );
            break;
          case "xlinkArcrole":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:arcrole",
              value
            );
            break;
          case "xlinkRole":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:role",
              value
            );
            break;
          case "xlinkShow":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:show",
              value
            );
            break;
          case "xlinkTitle":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:title",
              value
            );
            break;
          case "xlinkType":
            setValueForNamespacedAttribute(
              domElement,
              xlinkNamespace,
              "xlink:type",
              value
            );
            break;
          case "xmlBase":
            setValueForNamespacedAttribute(
              domElement,
              xmlNamespace,
              "xml:base",
              value
            );
            break;
          case "xmlLang":
            setValueForNamespacedAttribute(
              domElement,
              xmlNamespace,
              "xml:lang",
              value
            );
            break;
          case "xmlSpace":
            setValueForNamespacedAttribute(
              domElement,
              xmlNamespace,
              "xml:space",
              value
            );
            break;
          case "is":
            null != prevValue && console.error(
              'Cannot update the "is" prop after it has been initialized.'
            );
            setValueForAttribute(domElement, "is", value);
            break;
          case "innerText":
          case "textContent":
            break;
          case "popoverTarget":
            didWarnPopoverTargetObject || null == value || "object" !== typeof value || (didWarnPopoverTargetObject = true, console.error(
              "The `popoverTarget` prop expects the ID of an Element as a string. Received %s instead.",
              value
            ));
          default:
            !(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1] ? (key = getAttributeAlias(key), setValueForAttribute(domElement, key, value)) : registrationNameDependencies.hasOwnProperty(key) && null != value && "function" !== typeof value && warnForInvalidEventListener(key, value);
        }
      }
      function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
        switch (key) {
          case "style":
            setValueForStyles(domElement, value, prevValue);
            break;
          case "dangerouslySetInnerHTML":
            if (null != value) {
              if ("object" !== typeof value || !("__html" in value))
                throw Error(
                  "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://react.dev/link/dangerously-set-inner-html for more information."
                );
              key = value.__html;
              if (null != key) {
                if (null != props.children)
                  throw Error(
                    "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
                  );
                domElement.innerHTML = key;
              }
            }
            break;
          case "children":
            "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
            break;
          case "onScroll":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), listenToNonDelegatedEvent("scroll", domElement));
            break;
          case "onScrollEnd":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), listenToNonDelegatedEvent("scrollend", domElement));
            break;
          case "onClick":
            null != value && ("function" !== typeof value && warnForInvalidEventListener(key, value), domElement.onclick = noop$1);
            break;
          case "suppressContentEditableWarning":
          case "suppressHydrationWarning":
          case "innerHTML":
          case "ref":
            break;
          case "innerText":
          case "textContent":
            break;
          default:
            if (registrationNameDependencies.hasOwnProperty(key))
              null != value && "function" !== typeof value && warnForInvalidEventListener(key, value);
            else
              a: {
                if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
                  "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
                  domElement.addEventListener(tag, value, props);
                  break a;
                }
                key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
              }
        }
      }
      function setInitialProperties(domElement, tag, props) {
        validatePropertiesInDevelopment(tag, props);
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "img":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            var hasSrc = false, hasSrcSet = false, propKey;
            for (propKey in props)
              if (props.hasOwnProperty(propKey)) {
                var propValue = props[propKey];
                if (null != propValue)
                  switch (propKey) {
                    case "src":
                      hasSrc = true;
                      break;
                    case "srcSet":
                      hasSrcSet = true;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      throw Error(
                        tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    default:
                      setProp(domElement, tag, propKey, propValue, props, null);
                  }
              }
            hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
            hasSrc && setProp(domElement, tag, "src", props.src, props, null);
            return;
          case "input":
            checkControlledValueProps("input", props);
            listenToNonDelegatedEvent("invalid", domElement);
            var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
            for (hasSrc in props)
              if (props.hasOwnProperty(hasSrc)) {
                var _propValue = props[hasSrc];
                if (null != _propValue)
                  switch (hasSrc) {
                    case "name":
                      hasSrcSet = _propValue;
                      break;
                    case "type":
                      propValue = _propValue;
                      break;
                    case "checked":
                      checked = _propValue;
                      break;
                    case "defaultChecked":
                      defaultChecked = _propValue;
                      break;
                    case "value":
                      propKey = _propValue;
                      break;
                    case "defaultValue":
                      defaultValue = _propValue;
                      break;
                    case "children":
                    case "dangerouslySetInnerHTML":
                      if (null != _propValue)
                        throw Error(
                          tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                        );
                      break;
                    default:
                      setProp(domElement, tag, hasSrc, _propValue, props, null);
                  }
              }
            validateInputProps(domElement, props);
            initInput(
              domElement,
              propKey,
              defaultValue,
              checked,
              defaultChecked,
              propValue,
              hasSrcSet,
              false
            );
            track(domElement);
            return;
          case "select":
            checkControlledValueProps("select", props);
            listenToNonDelegatedEvent("invalid", domElement);
            hasSrc = propValue = propKey = null;
            for (hasSrcSet in props)
              if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
                switch (hasSrcSet) {
                  case "value":
                    propKey = defaultValue;
                    break;
                  case "defaultValue":
                    propValue = defaultValue;
                    break;
                  case "multiple":
                    hasSrc = defaultValue;
                  default:
                    setProp(
                      domElement,
                      tag,
                      hasSrcSet,
                      defaultValue,
                      props,
                      null
                    );
                }
            validateSelectProps(domElement, props);
            tag = propKey;
            props = propValue;
            domElement.multiple = !!hasSrc;
            null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
            return;
          case "textarea":
            checkControlledValueProps("textarea", props);
            listenToNonDelegatedEvent("invalid", domElement);
            propKey = hasSrcSet = hasSrc = null;
            for (propValue in props)
              if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
                switch (propValue) {
                  case "value":
                    hasSrc = defaultValue;
                    break;
                  case "defaultValue":
                    hasSrcSet = defaultValue;
                    break;
                  case "children":
                    propKey = defaultValue;
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != defaultValue)
                      throw Error(
                        "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                      );
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      propValue,
                      defaultValue,
                      props,
                      null
                    );
                }
            validateTextareaProps(domElement, props);
            initTextarea(domElement, hasSrc, hasSrcSet, propKey);
            track(domElement);
            return;
          case "option":
            validateOptionProps(domElement, props);
            for (checked in props)
              if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
                switch (checked) {
                  case "selected":
                    domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
                    break;
                  default:
                    setProp(domElement, tag, checked, hasSrc, props, null);
                }
            return;
          case "dialog":
            listenToNonDelegatedEvent("beforetoggle", domElement);
            listenToNonDelegatedEvent("toggle", domElement);
            listenToNonDelegatedEvent("cancel", domElement);
            listenToNonDelegatedEvent("close", domElement);
            break;
          case "iframe":
          case "object":
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "video":
          case "audio":
            for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
              listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
            break;
          case "image":
            listenToNonDelegatedEvent("error", domElement);
            listenToNonDelegatedEvent("load", domElement);
            break;
          case "details":
            listenToNonDelegatedEvent("toggle", domElement);
            break;
          case "embed":
          case "source":
          case "link":
            listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
          case "area":
          case "base":
          case "br":
          case "col":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "track":
          case "wbr":
          case "menuitem":
            for (defaultChecked in props)
              if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
                switch (defaultChecked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    throw Error(
                      tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                    );
                  default:
                    setProp(domElement, tag, defaultChecked, hasSrc, props, null);
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (_propValue in props)
                props.hasOwnProperty(_propValue) && (hasSrc = props[_propValue], void 0 !== hasSrc && setPropOnCustomElement(
                  domElement,
                  tag,
                  _propValue,
                  hasSrc,
                  props,
                  void 0
                ));
              return;
            }
        }
        for (defaultValue in props)
          props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
      }
      function updateProperties(domElement, tag, lastProps, nextProps) {
        validatePropertiesInDevelopment(tag, nextProps);
        switch (tag) {
          case "div":
          case "span":
          case "svg":
          case "path":
          case "a":
          case "g":
          case "p":
          case "li":
            break;
          case "input":
            var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
            for (propKey in lastProps) {
              var lastProp = lastProps[propKey];
              if (lastProps.hasOwnProperty(propKey) && null != lastProp)
                switch (propKey) {
                  case "checked":
                    break;
                  case "value":
                    break;
                  case "defaultValue":
                    lastDefaultValue = lastProp;
                  default:
                    nextProps.hasOwnProperty(propKey) || setProp(
                      domElement,
                      tag,
                      propKey,
                      null,
                      nextProps,
                      lastProp
                    );
                }
            }
            for (var _propKey8 in nextProps) {
              var propKey = nextProps[_propKey8];
              lastProp = lastProps[_propKey8];
              if (nextProps.hasOwnProperty(_propKey8) && (null != propKey || null != lastProp))
                switch (_propKey8) {
                  case "type":
                    type = propKey;
                    break;
                  case "name":
                    name = propKey;
                    break;
                  case "checked":
                    checked = propKey;
                    break;
                  case "defaultChecked":
                    defaultChecked = propKey;
                    break;
                  case "value":
                    value = propKey;
                    break;
                  case "defaultValue":
                    defaultValue = propKey;
                    break;
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != propKey)
                      throw Error(
                        tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    propKey !== lastProp && setProp(
                      domElement,
                      tag,
                      _propKey8,
                      propKey,
                      nextProps,
                      lastProp
                    );
                }
            }
            tag = "checkbox" === lastProps.type || "radio" === lastProps.type ? null != lastProps.checked : null != lastProps.value;
            nextProps = "checkbox" === nextProps.type || "radio" === nextProps.type ? null != nextProps.checked : null != nextProps.value;
            tag || !nextProps || didWarnUncontrolledToControlled || (console.error(
              "A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
            ), didWarnUncontrolledToControlled = true);
            !tag || nextProps || didWarnControlledToUncontrolled || (console.error(
              "A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://react.dev/link/controlled-components"
            ), didWarnControlledToUncontrolled = true);
            updateInput(
              domElement,
              value,
              defaultValue,
              lastDefaultValue,
              checked,
              defaultChecked,
              type,
              name
            );
            return;
          case "select":
            propKey = value = defaultValue = _propKey8 = null;
            for (type in lastProps)
              if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
                switch (type) {
                  case "value":
                    break;
                  case "multiple":
                    propKey = lastDefaultValue;
                  default:
                    nextProps.hasOwnProperty(type) || setProp(
                      domElement,
                      tag,
                      type,
                      null,
                      nextProps,
                      lastDefaultValue
                    );
                }
            for (name in nextProps)
              if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
                switch (name) {
                  case "value":
                    _propKey8 = type;
                    break;
                  case "defaultValue":
                    defaultValue = type;
                    break;
                  case "multiple":
                    value = type;
                  default:
                    type !== lastDefaultValue && setProp(
                      domElement,
                      tag,
                      name,
                      type,
                      nextProps,
                      lastDefaultValue
                    );
                }
            nextProps = defaultValue;
            tag = value;
            lastProps = propKey;
            null != _propKey8 ? updateOptions(domElement, !!tag, _propKey8, false) : !!lastProps !== !!tag && (null != nextProps ? updateOptions(domElement, !!tag, nextProps, true) : updateOptions(domElement, !!tag, tag ? [] : "", false));
            return;
          case "textarea":
            propKey = _propKey8 = null;
            for (defaultValue in lastProps)
              if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
                switch (defaultValue) {
                  case "value":
                    break;
                  case "children":
                    break;
                  default:
                    setProp(domElement, tag, defaultValue, null, nextProps, name);
                }
            for (value in nextProps)
              if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
                switch (value) {
                  case "value":
                    _propKey8 = name;
                    break;
                  case "defaultValue":
                    propKey = name;
                    break;
                  case "children":
                    break;
                  case "dangerouslySetInnerHTML":
                    if (null != name)
                      throw Error(
                        "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                      );
                    break;
                  default:
                    name !== type && setProp(domElement, tag, value, name, nextProps, type);
                }
            updateTextarea(domElement, _propKey8, propKey);
            return;
          case "option":
            for (var _propKey13 in lastProps)
              if (_propKey8 = lastProps[_propKey13], lastProps.hasOwnProperty(_propKey13) && null != _propKey8 && !nextProps.hasOwnProperty(_propKey13))
                switch (_propKey13) {
                  case "selected":
                    domElement.selected = false;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      _propKey13,
                      null,
                      nextProps,
                      _propKey8
                    );
                }
            for (lastDefaultValue in nextProps)
              if (_propKey8 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && _propKey8 !== propKey && (null != _propKey8 || null != propKey))
                switch (lastDefaultValue) {
                  case "selected":
                    domElement.selected = _propKey8 && "function" !== typeof _propKey8 && "symbol" !== typeof _propKey8;
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      lastDefaultValue,
                      _propKey8,
                      nextProps,
                      propKey
                    );
                }
            return;
          case "img":
          case "link":
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "keygen":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
          case "menuitem":
            for (var _propKey15 in lastProps)
              _propKey8 = lastProps[_propKey15], lastProps.hasOwnProperty(_propKey15) && null != _propKey8 && !nextProps.hasOwnProperty(_propKey15) && setProp(
                domElement,
                tag,
                _propKey15,
                null,
                nextProps,
                _propKey8
              );
            for (checked in nextProps)
              if (_propKey8 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && _propKey8 !== propKey && (null != _propKey8 || null != propKey))
                switch (checked) {
                  case "children":
                  case "dangerouslySetInnerHTML":
                    if (null != _propKey8)
                      throw Error(
                        tag + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                      );
                    break;
                  default:
                    setProp(
                      domElement,
                      tag,
                      checked,
                      _propKey8,
                      nextProps,
                      propKey
                    );
                }
            return;
          default:
            if (isCustomElement(tag)) {
              for (var _propKey17 in lastProps)
                _propKey8 = lastProps[_propKey17], lastProps.hasOwnProperty(_propKey17) && void 0 !== _propKey8 && !nextProps.hasOwnProperty(_propKey17) && setPropOnCustomElement(
                  domElement,
                  tag,
                  _propKey17,
                  void 0,
                  nextProps,
                  _propKey8
                );
              for (defaultChecked in nextProps)
                _propKey8 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || _propKey8 === propKey || void 0 === _propKey8 && void 0 === propKey || setPropOnCustomElement(
                  domElement,
                  tag,
                  defaultChecked,
                  _propKey8,
                  nextProps,
                  propKey
                );
              return;
            }
        }
        for (var _propKey19 in lastProps)
          _propKey8 = lastProps[_propKey19], lastProps.hasOwnProperty(_propKey19) && null != _propKey8 && !nextProps.hasOwnProperty(_propKey19) && setProp(domElement, tag, _propKey19, null, nextProps, _propKey8);
        for (lastProp in nextProps)
          _propKey8 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || _propKey8 === propKey || null == _propKey8 && null == propKey || setProp(domElement, tag, lastProp, _propKey8, nextProps, propKey);
      }
      function getPropNameFromAttributeName(attrName) {
        switch (attrName) {
          case "class":
            return "className";
          case "for":
            return "htmlFor";
          default:
            return attrName;
        }
      }
      function getStylesObjectFromElement(domElement) {
        var serverValueInObjectForm = {};
        domElement = domElement.style;
        for (var i = 0; i < domElement.length; i++) {
          var styleName = domElement[i];
          serverValueInObjectForm[styleName] = domElement.getPropertyValue(styleName);
        }
        return serverValueInObjectForm;
      }
      function diffHydratedStyles(domElement, value$jscomp$0, serverDifferences) {
        if (null != value$jscomp$0 && "object" !== typeof value$jscomp$0)
          console.error(
            "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
          );
        else {
          var clientValue;
          var delimiter = clientValue = "", styleName;
          for (styleName in value$jscomp$0)
            if (value$jscomp$0.hasOwnProperty(styleName)) {
              var value = value$jscomp$0[styleName];
              null != value && "boolean" !== typeof value && "" !== value && (0 === styleName.indexOf("--") ? (checkCSSPropertyStringCoercion(value, styleName), clientValue += delimiter + styleName + ":" + ("" + value).trim()) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? (checkCSSPropertyStringCoercion(value, styleName), clientValue += delimiter + styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-") + ":" + ("" + value).trim()) : clientValue += delimiter + styleName.replace(uppercasePattern, "-$1").toLowerCase().replace(msPattern$1, "-ms-") + ":" + value + "px", delimiter = ";");
            }
          clientValue = clientValue || null;
          value$jscomp$0 = domElement.getAttribute("style");
          value$jscomp$0 !== clientValue && (clientValue = normalizeMarkupForTextOrAttribute(clientValue), normalizeMarkupForTextOrAttribute(value$jscomp$0) !== clientValue && (serverDifferences.style = getStylesObjectFromElement(domElement)));
        }
      }
      function hydrateAttribute(domElement, propKey, attributeName, value, extraAttributes, serverDifferences) {
        extraAttributes.delete(attributeName);
        domElement = domElement.getAttribute(attributeName);
        if (null === domElement)
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              return;
          }
        else if (null != value)
          switch (typeof value) {
            case "function":
            case "symbol":
            case "boolean":
              break;
            default:
              if (checkAttributeStringCoercion(value, propKey), domElement === "" + value)
                return;
          }
        warnForPropDifference(propKey, domElement, value, serverDifferences);
      }
      function hydrateBooleanAttribute(domElement, propKey, attributeName, value, extraAttributes, serverDifferences) {
        extraAttributes.delete(attributeName);
        domElement = domElement.getAttribute(attributeName);
        if (null === domElement) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
          }
          if (!value)
            return;
        } else
          switch (typeof value) {
            case "function":
            case "symbol":
              break;
            default:
              if (value)
                return;
          }
        warnForPropDifference(propKey, domElement, value, serverDifferences);
      }
      function hydrateBooleanishAttribute(domElement, propKey, attributeName, value, extraAttributes, serverDifferences) {
        extraAttributes.delete(attributeName);
        domElement = domElement.getAttribute(attributeName);
        if (null === domElement)
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
              return;
          }
        else if (null != value)
          switch (typeof value) {
            case "function":
            case "symbol":
              break;
            default:
              if (checkAttributeStringCoercion(value, attributeName), domElement === "" + value)
                return;
          }
        warnForPropDifference(propKey, domElement, value, serverDifferences);
      }
      function hydrateNumericAttribute(domElement, propKey, attributeName, value, extraAttributes, serverDifferences) {
        extraAttributes.delete(attributeName);
        domElement = domElement.getAttribute(attributeName);
        if (null === domElement)
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              return;
            default:
              if (isNaN(value))
                return;
          }
        else if (null != value)
          switch (typeof value) {
            case "function":
            case "symbol":
            case "boolean":
              break;
            default:
              if (!isNaN(value) && (checkAttributeStringCoercion(value, propKey), domElement === "" + value))
                return;
          }
        warnForPropDifference(propKey, domElement, value, serverDifferences);
      }
      function hydrateSanitizedAttribute(domElement, propKey, attributeName, value, extraAttributes, serverDifferences) {
        extraAttributes.delete(attributeName);
        domElement = domElement.getAttribute(attributeName);
        if (null === domElement)
          switch (typeof value) {
            case "undefined":
            case "function":
            case "symbol":
            case "boolean":
              return;
          }
        else if (null != value)
          switch (typeof value) {
            case "function":
            case "symbol":
            case "boolean":
              break;
            default:
              if (checkAttributeStringCoercion(value, propKey), attributeName = sanitizeURL("" + value), domElement === attributeName)
                return;
          }
        warnForPropDifference(propKey, domElement, value, serverDifferences);
      }
      function diffHydratedProperties(domElement, tag, props, hostContext) {
        for (var serverDifferences = {}, extraAttributes = /* @__PURE__ */ new Set(), attributes = domElement.attributes, i = 0; i < attributes.length; i++)
          switch (attributes[i].name.toLowerCase()) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              extraAttributes.add(attributes[i].name);
          }
        if (isCustomElement(tag))
          for (var propKey in props) {
            if (props.hasOwnProperty(propKey)) {
              var value = props[propKey];
              if (null != value) {
                if (registrationNameDependencies.hasOwnProperty(propKey))
                  "function" !== typeof value && warnForInvalidEventListener(propKey, value);
                else if (true !== props.suppressHydrationWarning)
                  switch (propKey) {
                    case "children":
                      "string" !== typeof value && "number" !== typeof value || warnForPropDifference(
                        "children",
                        domElement.textContent,
                        value,
                        serverDifferences
                      );
                      continue;
                    case "suppressContentEditableWarning":
                    case "suppressHydrationWarning":
                    case "defaultValue":
                    case "defaultChecked":
                    case "innerHTML":
                    case "ref":
                      continue;
                    case "dangerouslySetInnerHTML":
                      attributes = domElement.innerHTML;
                      value = value ? value.__html : void 0;
                      null != value && (value = normalizeHTML(domElement, value), warnForPropDifference(
                        propKey,
                        attributes,
                        value,
                        serverDifferences
                      ));
                      continue;
                    case "style":
                      extraAttributes.delete(propKey);
                      diffHydratedStyles(domElement, value, serverDifferences);
                      continue;
                    case "offsetParent":
                    case "offsetTop":
                    case "offsetLeft":
                    case "offsetWidth":
                    case "offsetHeight":
                    case "isContentEditable":
                    case "outerText":
                    case "outerHTML":
                      extraAttributes.delete(propKey.toLowerCase());
                      console.error(
                        "Assignment to read-only property will result in a no-op: `%s`",
                        propKey
                      );
                      continue;
                    case "className":
                      extraAttributes.delete("class");
                      attributes = getValueForAttributeOnCustomComponent(
                        domElement,
                        "class",
                        value
                      );
                      warnForPropDifference(
                        "className",
                        attributes,
                        value,
                        serverDifferences
                      );
                      continue;
                    default:
                      hostContext.context === HostContextNamespaceNone && "svg" !== tag && "math" !== tag ? extraAttributes.delete(propKey.toLowerCase()) : extraAttributes.delete(propKey), attributes = getValueForAttributeOnCustomComponent(
                        domElement,
                        propKey,
                        value
                      ), warnForPropDifference(
                        propKey,
                        attributes,
                        value,
                        serverDifferences
                      );
                  }
              }
            }
          }
        else
          for (value in props)
            if (props.hasOwnProperty(value) && (propKey = props[value], null != propKey)) {
              if (registrationNameDependencies.hasOwnProperty(value))
                "function" !== typeof propKey && warnForInvalidEventListener(value, propKey);
              else if (true !== props.suppressHydrationWarning)
                switch (value) {
                  case "children":
                    "string" !== typeof propKey && "number" !== typeof propKey || warnForPropDifference(
                      "children",
                      domElement.textContent,
                      propKey,
                      serverDifferences
                    );
                    continue;
                  case "suppressContentEditableWarning":
                  case "suppressHydrationWarning":
                  case "value":
                  case "checked":
                  case "selected":
                  case "defaultValue":
                  case "defaultChecked":
                  case "innerHTML":
                  case "ref":
                    continue;
                  case "dangerouslySetInnerHTML":
                    attributes = domElement.innerHTML;
                    propKey = propKey ? propKey.__html : void 0;
                    null != propKey && (propKey = normalizeHTML(domElement, propKey), attributes !== propKey && (serverDifferences[value] = { __html: attributes }));
                    continue;
                  case "className":
                    hydrateAttribute(
                      domElement,
                      value,
                      "class",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "tabIndex":
                    hydrateAttribute(
                      domElement,
                      value,
                      "tabindex",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "style":
                    extraAttributes.delete(value);
                    diffHydratedStyles(domElement, propKey, serverDifferences);
                    continue;
                  case "multiple":
                    extraAttributes.delete(value);
                    warnForPropDifference(
                      value,
                      domElement.multiple,
                      propKey,
                      serverDifferences
                    );
                    continue;
                  case "muted":
                    extraAttributes.delete(value);
                    warnForPropDifference(
                      value,
                      domElement.muted,
                      propKey,
                      serverDifferences
                    );
                    continue;
                  case "autoFocus":
                    extraAttributes.delete("autofocus");
                    warnForPropDifference(
                      value,
                      domElement.autofocus,
                      propKey,
                      serverDifferences
                    );
                    continue;
                  case "data":
                    if ("object" !== tag) {
                      extraAttributes.delete(value);
                      attributes = domElement.getAttribute("data");
                      warnForPropDifference(
                        value,
                        attributes,
                        propKey,
                        serverDifferences
                      );
                      continue;
                    }
                  case "src":
                  case "href":
                    if (!("" !== propKey || "a" === tag && "href" === value || "object" === tag && "data" === value)) {
                      "src" === value ? console.error(
                        'An empty string ("") was passed to the %s attribute. This may cause the browser to download the whole page again over the network. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                        value,
                        value
                      ) : console.error(
                        'An empty string ("") was passed to the %s attribute. To fix this, either do not render the element at all or pass null to %s instead of an empty string.',
                        value,
                        value
                      );
                      continue;
                    }
                    hydrateSanitizedAttribute(
                      domElement,
                      value,
                      value,
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "action":
                  case "formAction":
                    attributes = domElement.getAttribute(value);
                    if ("function" === typeof propKey) {
                      extraAttributes.delete(value.toLowerCase());
                      "formAction" === value ? (extraAttributes.delete("name"), extraAttributes.delete("formenctype"), extraAttributes.delete("formmethod"), extraAttributes.delete("formtarget")) : (extraAttributes.delete("enctype"), extraAttributes.delete("method"), extraAttributes.delete("target"));
                      continue;
                    } else if (attributes === EXPECTED_FORM_ACTION_URL) {
                      extraAttributes.delete(value.toLowerCase());
                      warnForPropDifference(
                        value,
                        "function",
                        propKey,
                        serverDifferences
                      );
                      continue;
                    }
                    hydrateSanitizedAttribute(
                      domElement,
                      value,
                      value.toLowerCase(),
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkHref":
                    hydrateSanitizedAttribute(
                      domElement,
                      value,
                      "xlink:href",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "contentEditable":
                    hydrateBooleanishAttribute(
                      domElement,
                      value,
                      "contenteditable",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "spellCheck":
                    hydrateBooleanishAttribute(
                      domElement,
                      value,
                      "spellcheck",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "draggable":
                  case "autoReverse":
                  case "externalResourcesRequired":
                  case "focusable":
                  case "preserveAlpha":
                    hydrateBooleanishAttribute(
                      domElement,
                      value,
                      value,
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "allowFullScreen":
                  case "async":
                  case "autoPlay":
                  case "controls":
                  case "default":
                  case "defer":
                  case "disabled":
                  case "disablePictureInPicture":
                  case "disableRemotePlayback":
                  case "formNoValidate":
                  case "hidden":
                  case "loop":
                  case "noModule":
                  case "noValidate":
                  case "open":
                  case "playsInline":
                  case "readOnly":
                  case "required":
                  case "reversed":
                  case "scoped":
                  case "seamless":
                  case "itemScope":
                    hydrateBooleanAttribute(
                      domElement,
                      value,
                      value.toLowerCase(),
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "capture":
                  case "download":
                    a: {
                      i = domElement;
                      var attributeName = attributes = value, serverDifferences$jscomp$0 = serverDifferences;
                      extraAttributes.delete(attributeName);
                      i = i.getAttribute(attributeName);
                      if (null === i)
                        switch (typeof propKey) {
                          case "undefined":
                          case "function":
                          case "symbol":
                            break a;
                          default:
                            if (false === propKey)
                              break a;
                        }
                      else if (null != propKey)
                        switch (typeof propKey) {
                          case "function":
                          case "symbol":
                            break;
                          case "boolean":
                            if (true === propKey && "" === i)
                              break a;
                            break;
                          default:
                            if (checkAttributeStringCoercion(propKey, attributes), i === "" + propKey)
                              break a;
                        }
                      warnForPropDifference(
                        attributes,
                        i,
                        propKey,
                        serverDifferences$jscomp$0
                      );
                    }
                    continue;
                  case "cols":
                  case "rows":
                  case "size":
                  case "span":
                    a: {
                      i = domElement;
                      attributeName = attributes = value;
                      serverDifferences$jscomp$0 = serverDifferences;
                      extraAttributes.delete(attributeName);
                      i = i.getAttribute(attributeName);
                      if (null === i)
                        switch (typeof propKey) {
                          case "undefined":
                          case "function":
                          case "symbol":
                          case "boolean":
                            break a;
                          default:
                            if (isNaN(propKey) || 1 > propKey)
                              break a;
                        }
                      else if (null != propKey)
                        switch (typeof propKey) {
                          case "function":
                          case "symbol":
                          case "boolean":
                            break;
                          default:
                            if (!(isNaN(propKey) || 1 > propKey) && (checkAttributeStringCoercion(propKey, attributes), i === "" + propKey))
                              break a;
                        }
                      warnForPropDifference(
                        attributes,
                        i,
                        propKey,
                        serverDifferences$jscomp$0
                      );
                    }
                    continue;
                  case "rowSpan":
                    hydrateNumericAttribute(
                      domElement,
                      value,
                      "rowspan",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "start":
                    hydrateNumericAttribute(
                      domElement,
                      value,
                      value,
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xHeight":
                    hydrateAttribute(
                      domElement,
                      value,
                      "x-height",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkActuate":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:actuate",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkArcrole":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:arcrole",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkRole":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:role",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkShow":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:show",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkTitle":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:title",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xlinkType":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xlink:type",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xmlBase":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xml:base",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xmlLang":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xml:lang",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "xmlSpace":
                    hydrateAttribute(
                      domElement,
                      value,
                      "xml:space",
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  case "inert":
                    "" !== propKey || didWarnForNewBooleanPropsWithEmptyValue[value] || (didWarnForNewBooleanPropsWithEmptyValue[value] = true, console.error(
                      "Received an empty string for a boolean attribute `%s`. This will treat the attribute as if it were false. Either pass `false` to silence this warning, or pass `true` if you used an empty string in earlier versions of React to indicate this attribute is true.",
                      value
                    ));
                    hydrateBooleanAttribute(
                      domElement,
                      value,
                      value,
                      propKey,
                      extraAttributes,
                      serverDifferences
                    );
                    continue;
                  default:
                    if (!(2 < value.length) || "o" !== value[0] && "O" !== value[0] || "n" !== value[1] && "N" !== value[1]) {
                      i = getAttributeAlias(value);
                      attributes = false;
                      hostContext.context === HostContextNamespaceNone && "svg" !== tag && "math" !== tag ? extraAttributes.delete(i.toLowerCase()) : (attributeName = value.toLowerCase(), attributeName = possibleStandardNames.hasOwnProperty(
                        attributeName
                      ) ? possibleStandardNames[attributeName] || null : null, null !== attributeName && attributeName !== value && (attributes = true, extraAttributes.delete(attributeName)), extraAttributes.delete(i));
                      a:
                        if (attributeName = domElement, serverDifferences$jscomp$0 = i, i = propKey, isAttributeNameSafe(serverDifferences$jscomp$0))
                          if (attributeName.hasAttribute(serverDifferences$jscomp$0))
                            attributeName = attributeName.getAttribute(
                              serverDifferences$jscomp$0
                            ), checkAttributeStringCoercion(
                              i,
                              serverDifferences$jscomp$0
                            ), i = attributeName === "" + i ? i : attributeName;
                          else {
                            switch (typeof i) {
                              case "function":
                              case "symbol":
                                break a;
                              case "boolean":
                                if (attributeName = serverDifferences$jscomp$0.toLowerCase().slice(0, 5), "data-" !== attributeName && "aria-" !== attributeName)
                                  break a;
                            }
                            i = void 0 === i ? void 0 : null;
                          }
                        else
                          i = void 0;
                      attributes || warnForPropDifference(
                        value,
                        i,
                        propKey,
                        serverDifferences
                      );
                    }
                }
            }
        0 < extraAttributes.size && true !== props.suppressHydrationWarning && warnForExtraAttributes(domElement, extraAttributes, serverDifferences);
        return 0 === Object.keys(serverDifferences).length ? null : serverDifferences;
      }
      function propNamesListJoin(list, combinator) {
        switch (list.length) {
          case 0:
            return "";
          case 1:
            return list[0];
          case 2:
            return list[0] + " " + combinator + " " + list[1];
          default:
            return list.slice(0, -1).join(", ") + ", " + combinator + " " + list[list.length - 1];
        }
      }
      function getOwnerDocumentFromRootContainer(rootContainerElement) {
        return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
      }
      function getOwnHostContext(namespaceURI) {
        switch (namespaceURI) {
          case SVG_NAMESPACE:
            return HostContextNamespaceSvg;
          case MATH_NAMESPACE:
            return HostContextNamespaceMath;
          default:
            return HostContextNamespaceNone;
        }
      }
      function getChildHostContextProd(parentNamespace, type) {
        if (parentNamespace === HostContextNamespaceNone)
          switch (type) {
            case "svg":
              return HostContextNamespaceSvg;
            case "math":
              return HostContextNamespaceMath;
            default:
              return HostContextNamespaceNone;
          }
        return parentNamespace === HostContextNamespaceSvg && "foreignObject" === type ? HostContextNamespaceNone : parentNamespace;
      }
      function shouldSetTextContent(type, props) {
        return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
      }
      function shouldAttemptEagerTransition() {
        var event = window.event;
        if (event && "popstate" === event.type) {
          if (event === currentPopstateTransitionEvent)
            return false;
          currentPopstateTransitionEvent = event;
          return true;
        }
        currentPopstateTransitionEvent = null;
        return false;
      }
      function handleErrorInNextTick(error) {
        setTimeout(function() {
          throw error;
        });
      }
      function commitMount(domElement, type, newProps) {
        switch (type) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            newProps.autoFocus && domElement.focus();
            break;
          case "img":
            newProps.src ? domElement.src = newProps.src : newProps.srcSet && (domElement.srcset = newProps.srcSet);
        }
      }
      function commitUpdate(domElement, type, oldProps, newProps) {
        updateProperties(domElement, type, oldProps, newProps);
        domElement[internalPropsKey] = newProps;
      }
      function resetTextContent(domElement) {
        setTextContent(domElement, "");
      }
      function commitTextUpdate(textInstance, oldText, newText) {
        textInstance.nodeValue = newText;
      }
      function isSingletonScope(type) {
        return "head" === type;
      }
      function removeChild(parentInstance, child) {
        parentInstance.removeChild(child);
      }
      function removeChildFromContainer(container, child) {
        (9 === container.nodeType ? container.body : "HTML" === container.nodeName ? container.ownerDocument.body : container).removeChild(child);
      }
      function clearSuspenseBoundary(parentInstance, suspenseInstance) {
        var node = suspenseInstance, possiblePreambleContribution = 0, depth = 0;
        do {
          var nextNode = node.nextSibling;
          parentInstance.removeChild(node);
          if (nextNode && 8 === nextNode.nodeType)
            if (node = nextNode.data, node === SUSPENSE_END_DATA) {
              if (0 < possiblePreambleContribution && 8 > possiblePreambleContribution) {
                node = possiblePreambleContribution;
                var ownerDocument = parentInstance.ownerDocument;
                node & PREAMBLE_CONTRIBUTION_HTML && releaseSingletonInstance(ownerDocument.documentElement);
                node & PREAMBLE_CONTRIBUTION_BODY && releaseSingletonInstance(ownerDocument.body);
                if (node & PREAMBLE_CONTRIBUTION_HEAD)
                  for (node = ownerDocument.head, releaseSingletonInstance(node), ownerDocument = node.firstChild; ownerDocument; ) {
                    var nextNode$jscomp$0 = ownerDocument.nextSibling, nodeName = ownerDocument.nodeName;
                    ownerDocument[internalHoistableMarker] || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === ownerDocument.rel.toLowerCase() || node.removeChild(ownerDocument);
                    ownerDocument = nextNode$jscomp$0;
                  }
              }
              if (0 === depth) {
                parentInstance.removeChild(nextNode);
                retryIfBlockedOn(suspenseInstance);
                return;
              }
              depth--;
            } else
              node === SUSPENSE_START_DATA || node === SUSPENSE_PENDING_START_DATA || node === SUSPENSE_FALLBACK_START_DATA ? depth++ : possiblePreambleContribution = node.charCodeAt(0) - 48;
          else
            possiblePreambleContribution = 0;
          node = nextNode;
        } while (node);
        retryIfBlockedOn(suspenseInstance);
      }
      function hideInstance(instance) {
        instance = instance.style;
        "function" === typeof instance.setProperty ? instance.setProperty("display", "none", "important") : instance.display = "none";
      }
      function hideTextInstance(textInstance) {
        textInstance.nodeValue = "";
      }
      function unhideInstance(instance, props) {
        props = props[STYLE];
        props = void 0 !== props && null !== props && props.hasOwnProperty("display") ? props.display : null;
        instance.style.display = null == props || "boolean" === typeof props ? "" : ("" + props).trim();
      }
      function unhideTextInstance(textInstance, text) {
        textInstance.nodeValue = text;
      }
      function clearContainerSparingly(container) {
        var nextNode = container.firstChild;
        nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
        for (; nextNode; ) {
          var node = nextNode;
          nextNode = nextNode.nextSibling;
          switch (node.nodeName) {
            case "HTML":
            case "HEAD":
            case "BODY":
              clearContainerSparingly(node);
              detachDeletedInstance(node);
              continue;
            case "SCRIPT":
            case "STYLE":
              continue;
            case "LINK":
              if ("stylesheet" === node.rel.toLowerCase())
                continue;
          }
          container.removeChild(node);
        }
      }
      function canHydrateInstance(instance, type, props, inRootOrSingleton) {
        for (; 1 === instance.nodeType; ) {
          var anyProps = props;
          if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
            if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
              break;
          } else if (!inRootOrSingleton)
            if ("input" === type && "hidden" === instance.type) {
              checkAttributeStringCoercion(anyProps.name, "name");
              var name = null == anyProps.name ? null : "" + anyProps.name;
              if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
                return instance;
            } else
              return instance;
          else if (!instance[internalHoistableMarker])
            switch (type) {
              case "meta":
                if (!instance.hasAttribute("itemprop"))
                  break;
                return instance;
              case "link":
                name = instance.getAttribute("rel");
                if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
                  break;
                else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href || "" === anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
                  break;
                return instance;
              case "style":
                if (instance.hasAttribute("data-precedence"))
                  break;
                return instance;
              case "script":
                name = instance.getAttribute("src");
                if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
                  break;
                return instance;
              default:
                return instance;
            }
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance)
            break;
        }
        return null;
      }
      function canHydrateTextInstance(instance, text, inRootOrSingleton) {
        if ("" === text)
          return null;
        for (; 3 !== instance.nodeType; ) {
          if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
            return null;
          instance = getNextHydratable(instance.nextSibling);
          if (null === instance)
            return null;
        }
        return instance;
      }
      function isSuspenseInstanceFallback(instance) {
        return instance.data === SUSPENSE_FALLBACK_START_DATA || instance.data === SUSPENSE_PENDING_START_DATA && instance.ownerDocument.readyState === DOCUMENT_READY_STATE_COMPLETE;
      }
      function registerSuspenseInstanceRetry(instance, callback) {
        var ownerDocument = instance.ownerDocument;
        if (instance.data !== SUSPENSE_PENDING_START_DATA || ownerDocument.readyState === DOCUMENT_READY_STATE_COMPLETE)
          callback();
        else {
          var listener = function() {
            callback();
            ownerDocument.removeEventListener("DOMContentLoaded", listener);
          };
          ownerDocument.addEventListener("DOMContentLoaded", listener);
          instance._reactRetry = listener;
        }
      }
      function getNextHydratable(node) {
        for (; null != node; node = node.nextSibling) {
          var nodeType = node.nodeType;
          if (1 === nodeType || 3 === nodeType)
            break;
          if (8 === nodeType) {
            nodeType = node.data;
            if (nodeType === SUSPENSE_START_DATA || nodeType === SUSPENSE_FALLBACK_START_DATA || nodeType === SUSPENSE_PENDING_START_DATA || nodeType === FORM_STATE_IS_MATCHING || nodeType === FORM_STATE_IS_NOT_MATCHING)
              break;
            if (nodeType === SUSPENSE_END_DATA)
              return null;
          }
        }
        return node;
      }
      function describeHydratableInstanceForDevWarnings(instance) {
        if (1 === instance.nodeType) {
          for (var JSCompiler_temp_const = instance.nodeName.toLowerCase(), serverDifferences = {}, attributes = instance.attributes, i = 0; i < attributes.length; i++) {
            var attr = attributes[i];
            serverDifferences[getPropNameFromAttributeName(attr.name)] = "style" === attr.name.toLowerCase() ? getStylesObjectFromElement(instance) : attr.value;
          }
          return { type: JSCompiler_temp_const, props: serverDifferences };
        }
        return 8 === instance.nodeType ? { type: "Suspense", props: {} } : instance.nodeValue;
      }
      function diffHydratedTextForDevWarnings(textInstance, text, parentProps) {
        return null === parentProps || true !== parentProps[SUPPRESS_HYDRATION_WARNING] ? (textInstance.nodeValue === text ? textInstance = null : (text = normalizeMarkupForTextOrAttribute(text), textInstance = normalizeMarkupForTextOrAttribute(textInstance.nodeValue) === text ? null : textInstance.nodeValue), textInstance) : null;
      }
      function getNextHydratableInstanceAfterSuspenseInstance(suspenseInstance) {
        suspenseInstance = suspenseInstance.nextSibling;
        for (var depth = 0; suspenseInstance; ) {
          if (8 === suspenseInstance.nodeType) {
            var data = suspenseInstance.data;
            if (data === SUSPENSE_END_DATA) {
              if (0 === depth)
                return getNextHydratable(suspenseInstance.nextSibling);
              depth--;
            } else
              data !== SUSPENSE_START_DATA && data !== SUSPENSE_FALLBACK_START_DATA && data !== SUSPENSE_PENDING_START_DATA || depth++;
          }
          suspenseInstance = suspenseInstance.nextSibling;
        }
        return null;
      }
      function getParentSuspenseInstance(targetInstance) {
        targetInstance = targetInstance.previousSibling;
        for (var depth = 0; targetInstance; ) {
          if (8 === targetInstance.nodeType) {
            var data = targetInstance.data;
            if (data === SUSPENSE_START_DATA || data === SUSPENSE_FALLBACK_START_DATA || data === SUSPENSE_PENDING_START_DATA) {
              if (0 === depth)
                return targetInstance;
              depth--;
            } else
              data === SUSPENSE_END_DATA && depth++;
          }
          targetInstance = targetInstance.previousSibling;
        }
        return null;
      }
      function commitHydratedContainer(container) {
        retryIfBlockedOn(container);
      }
      function commitHydratedSuspenseInstance(suspenseInstance) {
        retryIfBlockedOn(suspenseInstance);
      }
      function resolveSingletonInstance(type, props, rootContainerInstance, hostContext, validateDOMNestingDev) {
        validateDOMNestingDev && validateDOMNesting(type, hostContext.ancestorInfo);
        props = getOwnerDocumentFromRootContainer(rootContainerInstance);
        switch (type) {
          case "html":
            type = props.documentElement;
            if (!type)
              throw Error(
                "React expected an <html> element (document.documentElement) to exist in the Document but one was not found. React never removes the documentElement for any Document it renders into so the cause is likely in some other script running on this page."
              );
            return type;
          case "head":
            type = props.head;
            if (!type)
              throw Error(
                "React expected a <head> element (document.head) to exist in the Document but one was not found. React never removes the head for any Document it renders into so the cause is likely in some other script running on this page."
              );
            return type;
          case "body":
            type = props.body;
            if (!type)
              throw Error(
                "React expected a <body> element (document.body) to exist in the Document but one was not found. React never removes the body for any Document it renders into so the cause is likely in some other script running on this page."
              );
            return type;
          default:
            throw Error(
              "resolveSingletonInstance was called with an element type that is not supported. This is a bug in React."
            );
        }
      }
      function acquireSingletonInstance(type, props, instance, internalInstanceHandle) {
        if (!instance[internalContainerInstanceKey] && getInstanceFromNode(instance)) {
          var tagName = instance.tagName.toLowerCase();
          console.error(
            "You are mounting a new %s component when a previous one has not first unmounted. It is an error to render more than one %s component at a time and attributes and children of these components will likely fail in unpredictable ways. Please only render a single instance of <%s> and if you need to mount a new one, ensure any previous ones have unmounted first.",
            tagName,
            tagName,
            tagName
          );
        }
        switch (type) {
          case "html":
          case "head":
          case "body":
            break;
          default:
            console.error(
              "acquireSingletonInstance was called with an element type that is not supported. This is a bug in React."
            );
        }
        for (tagName = instance.attributes; tagName.length; )
          instance.removeAttributeNode(tagName[0]);
        setInitialProperties(instance, type, props);
        instance[internalInstanceKey] = internalInstanceHandle;
        instance[internalPropsKey] = props;
      }
      function releaseSingletonInstance(instance) {
        for (var attributes = instance.attributes; attributes.length; )
          instance.removeAttributeNode(attributes[0]);
        detachDeletedInstance(instance);
      }
      function getHoistableRoot(container) {
        return "function" === typeof container.getRootNode ? container.getRootNode() : 9 === container.nodeType ? container : container.ownerDocument;
      }
      function preconnectAs(rel, href, crossOrigin) {
        var ownerDocument = globalDocument;
        if (ownerDocument && "string" === typeof href && href) {
          var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
          limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
          "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
          preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
        }
      }
      function getResource(type, currentProps, pendingProps, currentResource) {
        var resourceRoot = (resourceRoot = rootInstanceStackCursor.current) ? getHoistableRoot(resourceRoot) : null;
        if (!resourceRoot)
          throw Error(
            '"resourceRoot" was expected to exist. This is a bug in React.'
          );
        switch (type) {
          case "meta":
          case "title":
            return null;
          case "style":
            return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (pendingProps = getStyleKey(pendingProps.href), currentProps = getResourcesFromRoot(resourceRoot).hoistableStyles, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
              type: "style",
              instance: null,
              count: 0,
              state: null
            }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          case "link":
            if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
              type = getStyleKey(pendingProps.href);
              var _styles = getResourcesFromRoot(resourceRoot).hoistableStyles, _resource = _styles.get(type);
              if (!_resource && (resourceRoot = resourceRoot.ownerDocument || resourceRoot, _resource = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: NotLoaded, preload: null }
              }, _styles.set(type, _resource), (_styles = resourceRoot.querySelector(
                getStylesheetSelectorFromKey(type)
              )) && !_styles._p && (_resource.instance = _styles, _resource.state.loading = Loaded | Inserted), !preloadPropsMap.has(type))) {
                var preloadProps = {
                  rel: "preload",
                  as: "style",
                  href: pendingProps.href,
                  crossOrigin: pendingProps.crossOrigin,
                  integrity: pendingProps.integrity,
                  media: pendingProps.media,
                  hrefLang: pendingProps.hrefLang,
                  referrerPolicy: pendingProps.referrerPolicy
                };
                preloadPropsMap.set(type, preloadProps);
                _styles || preloadStylesheet(
                  resourceRoot,
                  type,
                  preloadProps,
                  _resource.state
                );
              }
              if (currentProps && null === currentResource)
                throw pendingProps = "\n\n  - " + describeLinkForResourceErrorDEV(currentProps) + "\n  + " + describeLinkForResourceErrorDEV(pendingProps), Error(
                  "Expected <link> not to update to be updated to a stylesheet with precedence. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + pendingProps
                );
              return _resource;
            }
            if (currentProps && null !== currentResource)
              throw pendingProps = "\n\n  - " + describeLinkForResourceErrorDEV(currentProps) + "\n  + " + describeLinkForResourceErrorDEV(pendingProps), Error(
                "Expected stylesheet with precedence to not be updated to a different kind of <link>. Check the `rel`, `href`, and `precedence` props of this component. Alternatively, check whether two different <link> components render in the same slot or share the same key." + pendingProps
              );
            return null;
          case "script":
            return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (pendingProps = getScriptKey(pendingProps), currentProps = getResourcesFromRoot(resourceRoot).hoistableScripts, currentResource = currentProps.get(pendingProps), currentResource || (currentResource = {
              type: "script",
              instance: null,
              count: 0,
              state: null
            }, currentProps.set(pendingProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
          default:
            throw Error(
              'getResource encountered a type it did not expect: "' + type + '". this is a bug in React.'
            );
        }
      }
      function describeLinkForResourceErrorDEV(props) {
        var describedProps = 0, description = "<link";
        "string" === typeof props.rel ? (describedProps++, description += ' rel="' + props.rel + '"') : hasOwnProperty.call(props, "rel") && (describedProps++, description += ' rel="' + (null === props.rel ? "null" : "invalid type " + typeof props.rel) + '"');
        "string" === typeof props.href ? (describedProps++, description += ' href="' + props.href + '"') : hasOwnProperty.call(props, "href") && (describedProps++, description += ' href="' + (null === props.href ? "null" : "invalid type " + typeof props.href) + '"');
        "string" === typeof props.precedence ? (describedProps++, description += ' precedence="' + props.precedence + '"') : hasOwnProperty.call(props, "precedence") && (describedProps++, description += " precedence={" + (null === props.precedence ? "null" : "invalid type " + typeof props.precedence) + "}");
        Object.getOwnPropertyNames(props).length > describedProps && (description += " ...");
        return description + " />";
      }
      function getStyleKey(href) {
        return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
      }
      function getStylesheetSelectorFromKey(key) {
        return 'link[rel="stylesheet"][' + key + "]";
      }
      function stylesheetPropsFromRawProps(rawProps) {
        return assign({}, rawProps, {
          "data-precedence": rawProps.precedence,
          precedence: null
        });
      }
      function preloadStylesheet(ownerDocument, key, preloadProps, state) {
        ownerDocument.querySelector(
          'link[rel="preload"][as="style"][' + key + "]"
        ) ? state.loading = Loaded : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
          return state.loading |= Loaded;
        }), key.addEventListener("error", function() {
          return state.loading |= Errored;
        }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
      }
      function getScriptKey(src) {
        return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
      }
      function getScriptSelectorFromKey(key) {
        return "script[async]" + key;
      }
      function acquireResource(hoistableRoot, resource, props) {
        resource.count++;
        if (null === resource.instance)
          switch (resource.type) {
            case "style":
              var instance = hoistableRoot.querySelector(
                'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
              );
              if (instance)
                return resource.instance = instance, markNodeAsHoistable(instance), instance;
              var styleProps = assign({}, props, {
                "data-href": props.href,
                "data-precedence": props.precedence,
                href: null,
                precedence: null
              });
              instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("style");
              markNodeAsHoistable(instance);
              setInitialProperties(instance, "style", styleProps);
              insertStylesheet(instance, props.precedence, hoistableRoot);
              return resource.instance = instance;
            case "stylesheet":
              styleProps = getStyleKey(props.href);
              var _instance = hoistableRoot.querySelector(
                getStylesheetSelectorFromKey(styleProps)
              );
              if (_instance)
                return resource.state.loading |= Inserted, resource.instance = _instance, markNodeAsHoistable(_instance), _instance;
              instance = stylesheetPropsFromRawProps(props);
              (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
              _instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
              markNodeAsHoistable(_instance);
              var linkInstance = _instance;
              linkInstance._p = new Promise(function(resolve, reject) {
                linkInstance.onload = resolve;
                linkInstance.onerror = reject;
              });
              setInitialProperties(_instance, "link", instance);
              resource.state.loading |= Inserted;
              insertStylesheet(_instance, props.precedence, hoistableRoot);
              return resource.instance = _instance;
            case "script":
              _instance = getScriptKey(props.src);
              if (styleProps = hoistableRoot.querySelector(
                getScriptSelectorFromKey(_instance)
              ))
                return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
              instance = props;
              if (styleProps = preloadPropsMap.get(_instance))
                instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
              hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
              styleProps = hoistableRoot.createElement("script");
              markNodeAsHoistable(styleProps);
              setInitialProperties(styleProps, "link", instance);
              hoistableRoot.head.appendChild(styleProps);
              return resource.instance = styleProps;
            case "void":
              return null;
            default:
              throw Error(
                'acquireResource encountered a resource type it did not expect: "' + resource.type + '". this is a bug in React.'
              );
          }
        else
          "stylesheet" === resource.type && (resource.state.loading & Inserted) === NotLoaded && (instance = resource.instance, resource.state.loading |= Inserted, insertStylesheet(instance, props.precedence, hoistableRoot));
        return resource.instance;
      }
      function insertStylesheet(instance, precedence, root2) {
        for (var nodes = root2.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]'
        ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
          var node = nodes[i];
          if (node.dataset.precedence === precedence)
            prior = node;
          else if (prior !== last)
            break;
        }
        prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
      }
      function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
        null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
        null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
        null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
      }
      function adoptPreloadPropsForScript(scriptProps, preloadProps) {
        null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
        null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
        null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
      }
      function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
        if (null === tagCaches) {
          var cache = /* @__PURE__ */ new Map();
          var caches = tagCaches = /* @__PURE__ */ new Map();
          caches.set(ownerDocument, cache);
        } else
          caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
        if (cache.has(type))
          return cache;
        cache.set(type, null);
        ownerDocument = ownerDocument.getElementsByTagName(type);
        for (caches = 0; caches < ownerDocument.length; caches++) {
          var node = ownerDocument[caches];
          if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && node.namespaceURI !== SVG_NAMESPACE) {
            var nodeKey = node.getAttribute(keyAttribute) || "";
            nodeKey = type + nodeKey;
            var existing = cache.get(nodeKey);
            existing ? existing.push(node) : cache.set(nodeKey, [node]);
          }
        }
        return cache;
      }
      function mountHoistable(hoistableRoot, type, instance) {
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        hoistableRoot.head.insertBefore(
          instance,
          "title" === type ? hoistableRoot.querySelector("head > title") : null
        );
      }
      function isHostHoistableType(type, props, hostContext) {
        var outsideHostContainerContext = !hostContext.ancestorInfo.containerTagInScope;
        if (hostContext.context === HostContextNamespaceSvg || null != props.itemProp)
          return !outsideHostContainerContext || null == props.itemProp || "meta" !== type && "title" !== type && "style" !== type && "link" !== type && "script" !== type || console.error(
            "Cannot render a <%s> outside the main document if it has an `itemProp` prop. `itemProp` suggests the tag belongs to an `itemScope` which can appear anywhere in the DOM. If you were intending for React to hoist this <%s> remove the `itemProp` prop. Otherwise, try moving this tag into the <head> or <body> of the Document.",
            type,
            type
          ), false;
        switch (type) {
          case "meta":
          case "title":
            return true;
          case "style":
            if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href) {
              outsideHostContainerContext && console.error(
                'Cannot render a <style> outside the main document without knowing its precedence and a unique href key. React can hoist and deduplicate <style> tags if you provide a `precedence` prop along with an `href` prop that does not conflict with the `href` values used in any other hoisted <style> or <link rel="stylesheet" ...> tags.  Note that hoisting <style> tags is considered an advanced feature that most will not use directly. Consider moving the <style> tag to the <head> or consider adding a `precedence="default"` and `href="some unique resource identifier"`.'
              );
              break;
            }
            return true;
          case "link":
            if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError) {
              if ("stylesheet" === props.rel && "string" === typeof props.precedence) {
                type = props.href;
                var onError = props.onError, disabled = props.disabled;
                hostContext = [];
                props.onLoad && hostContext.push("`onLoad`");
                onError && hostContext.push("`onError`");
                null != disabled && hostContext.push("`disabled`");
                onError = propNamesListJoin(hostContext, "and");
                onError += 1 === hostContext.length ? " prop" : " props";
                disabled = 1 === hostContext.length ? "an " + onError : "the " + onError;
                hostContext.length && console.error(
                  'React encountered a <link rel="stylesheet" href="%s" ... /> with a `precedence` prop that also included %s. The presence of loading and error handlers indicates an intent to manage the stylesheet loading state from your from your Component code and React will not hoist or deduplicate this stylesheet. If your intent was to have React hoist and deduplciate this stylesheet using the `precedence` prop remove the %s, otherwise remove the `precedence` prop.',
                  type,
                  disabled,
                  onError
                );
              }
              outsideHostContainerContext && ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href ? console.error(
                "Cannot render a <link> outside the main document without a `rel` and `href` prop. Try adding a `rel` and/or `href` prop to this <link> or moving the link into the <head> tag"
              ) : (props.onError || props.onLoad) && console.error(
                "Cannot render a <link> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
              ));
              break;
            }
            switch (props.rel) {
              case "stylesheet":
                return type = props.precedence, props = props.disabled, "string" !== typeof type && outsideHostContainerContext && console.error(
                  'Cannot render a <link rel="stylesheet" /> outside the main document without knowing its precedence. Consider adding precedence="default" or moving it into the root <head> tag.'
                ), "string" === typeof type && null == props;
              default:
                return true;
            }
          case "script":
            type = props.async && "function" !== typeof props.async && "symbol" !== typeof props.async;
            if (!type || props.onLoad || props.onError || !props.src || "string" !== typeof props.src) {
              outsideHostContainerContext && (type ? props.onLoad || props.onError ? console.error(
                "Cannot render a <script> with onLoad or onError listeners outside the main document. Try removing onLoad={...} and onError={...} or moving it into the root <head> tag or somewhere in the <body>."
              ) : console.error(
                "Cannot render a <script> outside the main document without `async={true}` and a non-empty `src` prop. Ensure there is a valid `src` and either make the script async or move it into the root <head> tag or somewhere in the <body>."
              ) : console.error(
                'Cannot render a sync or defer <script> outside the main document without knowing its order. Try adding async="" or moving it into the root <head> tag.'
              ));
              break;
            }
            return true;
          case "noscript":
          case "template":
            outsideHostContainerContext && console.error(
              "Cannot render <%s> outside the main document. Try moving it into the root <head> tag.",
              type
            );
        }
        return false;
      }
      function preloadResource(resource) {
        return "stylesheet" === resource.type && (resource.state.loading & Settled) === NotLoaded ? false : true;
      }
      function noop() {
      }
      function suspendResource(hoistableRoot, resource, props) {
        if (null === suspendedState)
          throw Error(
            "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
          );
        var state = suspendedState;
        if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && (resource.state.loading & Inserted) === NotLoaded) {
          if (null === resource.instance) {
            var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
              getStylesheetSelectorFromKey(key)
            );
            if (instance) {
              hoistableRoot = instance._p;
              null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
              resource.state.loading |= Inserted;
              resource.instance = instance;
              markNodeAsHoistable(instance);
              return;
            }
            instance = hoistableRoot.ownerDocument || hoistableRoot;
            props = stylesheetPropsFromRawProps(props);
            (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
            instance = instance.createElement("link");
            markNodeAsHoistable(instance);
            var linkInstance = instance;
            linkInstance._p = new Promise(function(resolve, reject) {
              linkInstance.onload = resolve;
              linkInstance.onerror = reject;
            });
            setInitialProperties(instance, "link", props);
            resource.instance = instance;
          }
          null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
          state.stylesheets.set(resource, hoistableRoot);
          (hoistableRoot = resource.state.preload) && (resource.state.loading & Settled) === NotLoaded && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
        }
      }
      function waitForCommitToBeReady() {
        if (null === suspendedState)
          throw Error(
            "Internal React Error: suspendedState null when it was expected to exists. Please report this as a React bug."
          );
        var state = suspendedState;
        state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
        return 0 < state.count ? function(commit) {
          var stylesheetTimer = setTimeout(function() {
            state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
            if (state.unsuspend) {
              var unsuspend = state.unsuspend;
              state.unsuspend = null;
              unsuspend();
            }
          }, 6e4);
          state.unsuspend = commit;
          return function() {
            state.unsuspend = null;
            clearTimeout(stylesheetTimer);
          };
        } : null;
      }
      function onUnsuspend() {
        this.count--;
        if (0 === this.count) {
          if (this.stylesheets)
            insertSuspendedStylesheets(this, this.stylesheets);
          else if (this.unsuspend) {
            var unsuspend = this.unsuspend;
            this.unsuspend = null;
            unsuspend();
          }
        }
      }
      function insertSuspendedStylesheets(state, resources) {
        state.stylesheets = null;
        null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
      }
      function insertStylesheetIntoRoot(root2, resource) {
        if (!(resource.state.loading & Inserted)) {
          var precedences = precedencesByRoot.get(root2);
          if (precedences)
            var last = precedences.get(LAST_PRECEDENCE);
          else {
            precedences = /* @__PURE__ */ new Map();
            precedencesByRoot.set(root2, precedences);
            for (var nodes = root2.querySelectorAll(
              "link[data-precedence],style[data-precedence]"
            ), i = 0; i < nodes.length; i++) {
              var node = nodes[i];
              if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
                precedences.set(node.dataset.precedence, node), last = node;
            }
            last && precedences.set(LAST_PRECEDENCE, last);
          }
          nodes = resource.instance;
          node = nodes.getAttribute("data-precedence");
          i = precedences.get(node) || last;
          i === last && precedences.set(LAST_PRECEDENCE, nodes);
          precedences.set(node, nodes);
          this.count++;
          last = onUnsuspend.bind(this);
          nodes.addEventListener("load", last);
          nodes.addEventListener("error", last);
          i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
          resource.state.loading |= Inserted;
        }
      }
      function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, formState) {
        this.tag = 1;
        this.containerInfo = containerInfo;
        this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = noTimeout;
        this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
        this.callbackPriority = 0;
        this.expirationTimes = createLaneMap(-1);
        this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = createLaneMap(0);
        this.hiddenUpdates = createLaneMap(null);
        this.identifierPrefix = identifierPrefix;
        this.onUncaughtError = onUncaughtError;
        this.onCaughtError = onCaughtError;
        this.onRecoverableError = onRecoverableError;
        this.pooledCache = null;
        this.pooledCacheLanes = 0;
        this.formState = formState;
        this.incompleteTransitions = /* @__PURE__ */ new Map();
        this.passiveEffectDuration = this.effectDuration = -0;
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        containerInfo = this.pendingUpdatersLaneMap = [];
        for (tag = 0; 31 > tag; tag++)
          containerInfo.push(/* @__PURE__ */ new Set());
        this._debugRootType = hydrate ? "hydrateRoot()" : "createRoot()";
      }
      function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks, formState) {
        containerInfo = new FiberRootNode(
          containerInfo,
          tag,
          hydrate,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          formState
        );
        tag = ConcurrentMode;
        true === isStrictMode && (tag |= StrictLegacyMode | StrictEffectsMode);
        isDevToolsPresent && (tag |= ProfileMode);
        isStrictMode = createFiber(3, null, null, tag);
        containerInfo.current = isStrictMode;
        isStrictMode.stateNode = containerInfo;
        tag = createCache();
        retainCache(tag);
        containerInfo.pooledCache = tag;
        retainCache(tag);
        isStrictMode.memoizedState = {
          element: initialChildren,
          isDehydrated: hydrate,
          cache: tag
        };
        initializeUpdateQueue(isStrictMode);
        return containerInfo;
      }
      function getContextForSubtree(parentComponent) {
        if (!parentComponent)
          return emptyContextObject;
        parentComponent = emptyContextObject;
        return parentComponent;
      }
      function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
        if (injectedHook && "function" === typeof injectedHook.onScheduleFiberRoot)
          try {
            injectedHook.onScheduleFiberRoot(rendererID, container, element);
          } catch (err) {
            hasLoggedError || (hasLoggedError = true, console.error(
              "React instrumentation encountered an error: %s",
              err
            ));
          }
        null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markRenderScheduled && injectedProfilingHooks.markRenderScheduled(lane);
        parentComponent = getContextForSubtree(parentComponent);
        null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
        isRendering && null !== current && !didWarnAboutNestedUpdates && (didWarnAboutNestedUpdates = true, console.error(
          "Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.",
          getComponentNameFromFiber(current) || "Unknown"
        ));
        container = createUpdate(lane);
        container.payload = { element };
        callback = void 0 === callback ? null : callback;
        null !== callback && ("function" !== typeof callback && console.error(
          "Expected the last optional `callback` argument to be a function. Instead received: %s.",
          callback
        ), container.callback = callback);
        element = enqueueUpdate(rootFiber, container, lane);
        null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
      }
      function markRetryLaneImpl(fiber, retryLane) {
        fiber = fiber.memoizedState;
        if (null !== fiber && null !== fiber.dehydrated) {
          var a = fiber.retryLane;
          fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
        }
      }
      function markRetryLaneIfNotHydrated(fiber, retryLane) {
        markRetryLaneImpl(fiber, retryLane);
        (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
      }
      function attemptContinuousHydration(fiber) {
        if (13 === fiber.tag) {
          var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
          null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
          markRetryLaneIfNotHydrated(fiber, 67108864);
        }
      }
      function getCurrentFiberForDevTools() {
        return current;
      }
      function getLaneLabelMap() {
        for (var map = /* @__PURE__ */ new Map(), lane = 1, index = 0; 31 > index; index++) {
          var label = getLabelForLane(lane);
          map.set(lane, label);
          lane *= 2;
        }
        return map;
      }
      function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = DiscreteEventPriority, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
        var prevTransition = ReactSharedInternals.T;
        ReactSharedInternals.T = null;
        var previousPriority = ReactDOMSharedInternals.p;
        try {
          ReactDOMSharedInternals.p = ContinuousEventPriority, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
        } finally {
          ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
        }
      }
      function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (_enabled) {
          var blockedOn = findInstanceBlockingEvent(nativeEvent);
          if (null === blockedOn)
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              return_targetInst,
              targetContainer
            ), clearIfContinuousEvent(domEventName, nativeEvent);
          else if (queueIfContinuousEvent(
            blockedOn,
            domEventName,
            eventSystemFlags,
            targetContainer,
            nativeEvent
          ))
            nativeEvent.stopPropagation();
          else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
            for (; null !== blockedOn; ) {
              var fiber = getInstanceFromNode(blockedOn);
              if (null !== fiber)
                switch (fiber.tag) {
                  case 3:
                    fiber = fiber.stateNode;
                    if (fiber.current.memoizedState.isDehydrated) {
                      var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                      if (0 !== lanes) {
                        var root2 = fiber;
                        root2.pendingLanes |= 2;
                        for (root2.entangledLanes |= 2; lanes; ) {
                          var lane = 1 << 31 - clz32(lanes);
                          root2.entanglements[1] |= lane;
                          lanes &= ~lane;
                        }
                        ensureRootIsScheduled(fiber);
                        (executionContext & (RenderContext | CommitContext)) === NoContext && (workInProgressRootRenderTargetTime = now$1() + RENDER_TIMEOUT_MS, flushSyncWorkAcrossRoots_impl(0, false));
                      }
                    }
                    break;
                  case 13:
                    root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
                }
              fiber = findInstanceBlockingEvent(nativeEvent);
              null === fiber && dispatchEventForPluginEventSystem(
                domEventName,
                eventSystemFlags,
                nativeEvent,
                return_targetInst,
                targetContainer
              );
              if (fiber === blockedOn)
                break;
              blockedOn = fiber;
            }
            null !== blockedOn && nativeEvent.stopPropagation();
          } else
            dispatchEventForPluginEventSystem(
              domEventName,
              eventSystemFlags,
              nativeEvent,
              null,
              targetContainer
            );
        }
      }
      function findInstanceBlockingEvent(nativeEvent) {
        nativeEvent = getEventTarget(nativeEvent);
        return findInstanceBlockingTarget(nativeEvent);
      }
      function findInstanceBlockingTarget(targetNode) {
        return_targetInst = null;
        targetNode = getClosestInstanceFromNode(targetNode);
        if (null !== targetNode) {
          var nearestMounted = getNearestMountedFiber(targetNode);
          if (null === nearestMounted)
            targetNode = null;
          else {
            var tag = nearestMounted.tag;
            if (13 === tag) {
              targetNode = getSuspenseInstanceFromFiber(nearestMounted);
              if (null !== targetNode)
                return targetNode;
              targetNode = null;
            } else if (3 === tag) {
              if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
                return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              targetNode = null;
            } else
              nearestMounted !== targetNode && (targetNode = null);
          }
        }
        return_targetInst = targetNode;
        return null;
      }
      function getEventPriority(domEventName) {
        switch (domEventName) {
          case "beforetoggle":
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "toggle":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return DiscreteEventPriority;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return ContinuousEventPriority;
          case "message":
            switch (getCurrentPriorityLevel()) {
              case ImmediatePriority:
                return DiscreteEventPriority;
              case UserBlockingPriority:
                return ContinuousEventPriority;
              case NormalPriority$1:
              case LowPriority:
                return DefaultEventPriority;
              case IdlePriority:
                return IdleEventPriority;
              default:
                return DefaultEventPriority;
            }
          default:
            return DefaultEventPriority;
        }
      }
      function clearIfContinuousEvent(domEventName, nativeEvent) {
        switch (domEventName) {
          case "focusin":
          case "focusout":
            queuedFocus = null;
            break;
          case "dragenter":
          case "dragleave":
            queuedDrag = null;
            break;
          case "mouseover":
          case "mouseout":
            queuedMouse = null;
            break;
          case "pointerover":
          case "pointerout":
            queuedPointers.delete(nativeEvent.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            queuedPointerCaptures.delete(nativeEvent.pointerId);
        }
      }
      function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
          return existingQueuedEvent = {
            blockedOn,
            domEventName,
            eventSystemFlags,
            nativeEvent,
            targetContainers: [targetContainer]
          }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
        existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
        blockedOn = existingQueuedEvent.targetContainers;
        null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
        return existingQueuedEvent;
      }
      function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
        switch (domEventName) {
          case "focusin":
            return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedFocus,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "dragenter":
            return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedDrag,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "mouseover":
            return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
              queuedMouse,
              blockedOn,
              domEventName,
              eventSystemFlags,
              targetContainer,
              nativeEvent
            ), true;
          case "pointerover":
            var pointerId = nativeEvent.pointerId;
            queuedPointers.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointers.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            );
            return true;
          case "gotpointercapture":
            return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
              pointerId,
              accumulateOrCreateContinuousQueuedReplayableEvent(
                queuedPointerCaptures.get(pointerId) || null,
                blockedOn,
                domEventName,
                eventSystemFlags,
                targetContainer,
                nativeEvent
              )
            ), true;
        }
        return false;
      }
      function attemptExplicitHydrationTarget(queuedTarget) {
        var targetInst = getClosestInstanceFromNode(queuedTarget.target);
        if (null !== targetInst) {
          var nearestMounted = getNearestMountedFiber(targetInst);
          if (null !== nearestMounted) {
            if (targetInst = nearestMounted.tag, 13 === targetInst) {
              if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
                queuedTarget.blockedOn = targetInst;
                runWithPriority(queuedTarget.priority, function() {
                  if (13 === nearestMounted.tag) {
                    var lane = requestUpdateLane(nearestMounted);
                    lane = getBumpedLaneForHydrationByLane(lane);
                    var root2 = enqueueConcurrentRenderForLane(
                      nearestMounted,
                      lane
                    );
                    null !== root2 && scheduleUpdateOnFiber(root2, nearestMounted, lane);
                    markRetryLaneIfNotHydrated(nearestMounted, lane);
                  }
                });
                return;
              }
            } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
              queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
              return;
            }
          }
        }
        queuedTarget.blockedOn = null;
      }
      function attemptReplayContinuousQueuedEvent(queuedEvent) {
        if (null !== queuedEvent.blockedOn)
          return false;
        for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
          var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
          if (null === nextBlockedOn) {
            nextBlockedOn = queuedEvent.nativeEvent;
            var nativeEventClone = new nextBlockedOn.constructor(
              nextBlockedOn.type,
              nextBlockedOn
            ), event = nativeEventClone;
            null !== currentReplayingEvent && console.error(
              "Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."
            );
            currentReplayingEvent = event;
            nextBlockedOn.target.dispatchEvent(nativeEventClone);
            null === currentReplayingEvent && console.error(
              "Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."
            );
            currentReplayingEvent = null;
          } else
            return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
          targetContainers.shift();
        }
        return true;
      }
      function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
        attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
      }
      function replayUnblockedEvents() {
        hasScheduledReplayAttempt = false;
        null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
        null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
        null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
        queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
        queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
      }
      function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
        queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          replayUnblockedEvents
        )));
      }
      function scheduleReplayQueueIfNeeded(formReplayingQueue) {
        lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
          Scheduler.unstable_NormalPriority,
          function() {
            lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
            for (var i = 0; i < formReplayingQueue.length; i += 3) {
              var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
              if ("function" !== typeof submitterOrAction)
                if (null === findInstanceBlockingTarget(submitterOrAction || form))
                  continue;
                else
                  break;
              var formInst = getInstanceFromNode(form);
              null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, form = {
                pending: true,
                data: formData,
                method: form.method,
                action: submitterOrAction
              }, Object.freeze(form), startHostTransition(
                formInst,
                form,
                submitterOrAction,
                formData
              ));
            }
          }
        ));
      }
      function retryIfBlockedOn(unblocked) {
        function unblock(queuedEvent) {
          return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
        }
        null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
        null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
        null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
        queuedPointers.forEach(unblock);
        queuedPointerCaptures.forEach(unblock);
        for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
          var queuedTarget = queuedExplicitHydrationTargets[i];
          queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
        }
        for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
          attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
        i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
        if (null != i)
          for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
            var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
            if ("function" === typeof submitterOrAction)
              formProps || scheduleReplayQueueIfNeeded(i);
            else if (formProps) {
              var action = null;
              if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
                if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
                  action = formProps.formAction;
                else {
                  if (null !== findInstanceBlockingTarget(form))
                    continue;
                }
              else
                action = formProps.action;
              "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
              scheduleReplayQueueIfNeeded(i);
            }
          }
      }
      function ReactDOMRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      function ReactDOMHydrationRoot(internalRoot) {
        this._internalRoot = internalRoot;
      }
      function warnIfReactDOMContainerInDEV(container) {
        container[internalContainerInstanceKey] && (container._reactRootContainer ? console.error(
          "You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."
        ) : console.error(
          "You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."
        ));
      }
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
      var Scheduler = require_scheduler(), React = require_react(), ReactDOM = require_react_dom(), assign = Object.assign, REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.tracing_marker");
      var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel");
      Symbol.for("react.view_transition");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), isArrayImpl = Array.isArray, ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, NotPending = Object.freeze({
        pending: false,
        data: null,
        method: null,
        action: null
      }), valueStack = [];
      var fiberStack = [];
      var index$jscomp$0 = -1, contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null), hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now$1 = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null, injectedProfilingHooks = null, hasLoggedError = false, isDevToolsPresent = "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__, clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2, nextTransitionLane = 256, nextRetryLane = 4194304, DiscreteEventPriority = 2, ContinuousEventPriority = 8, DefaultEventPriority = 32, IdleEventPriority = 268435456, randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey, allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {}, possibleRegistrationNames = {}, hasReadOnlyValue = {
        button: true,
        checkbox: true,
        image: true,
        hidden: true,
        radio: true,
        reset: true,
        submit: true
      }, VALID_ATTRIBUTE_NAME_REGEX = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), illegalAttributeNameCache = {}, validatedAttributeNameCache = {}, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
      disabledLog.__reactDisabledLog = true;
      var prefix, suffix, reentry = false;
      var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
      var current = null, isRendering = false, escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g, didWarnValueDefaultValue$1 = false, didWarnCheckedDefaultChecked = false, didWarnSelectedSetOnOption = false, didWarnInvalidChild = false, didWarnInvalidInnerHTML = false;
      var didWarnValueDefaultValue = false;
      var valuePropNames = ["value", "defaultValue"], didWarnValDefaultVal = false, needsEscaping = /["'&<>\n\t]|^\s|\s$/, specialTags = "address applet area article aside base basefont bgsound blockquote body br button caption center col colgroup dd details dir div dl dt embed fieldset figcaption figure footer form frame frameset h1 h2 h3 h4 h5 h6 head header hgroup hr html iframe img input isindex li link listing main marquee menu menuitem meta nav noembed noframes noscript object ol p param plaintext pre script section select source style summary table tbody td template textarea tfoot th thead title tr track ul wbr xmp".split(
        " "
      ), inScopeTags = "applet caption html table td th marquee object template foreignObject desc title".split(
        " "
      ), buttonScopeTags = inScopeTags.concat(["button"]), impliedEndTags = "dd dt li option optgroup p rp rt".split(" "), emptyAncestorInfoDev = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null,
        containerTagInScope: null,
        implicitRootScope: false
      }, didWarn = {}, shorthandToLonghand = {
        animation: "animationDelay animationDirection animationDuration animationFillMode animationIterationCount animationName animationPlayState animationTimingFunction".split(
          " "
        ),
        background: "backgroundAttachment backgroundClip backgroundColor backgroundImage backgroundOrigin backgroundPositionX backgroundPositionY backgroundRepeat backgroundSize".split(
          " "
        ),
        backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
        border: "borderBottomColor borderBottomStyle borderBottomWidth borderImageOutset borderImageRepeat borderImageSlice borderImageSource borderImageWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderTopColor borderTopStyle borderTopWidth".split(
          " "
        ),
        borderBlockEnd: [
          "borderBlockEndColor",
          "borderBlockEndStyle",
          "borderBlockEndWidth"
        ],
        borderBlockStart: [
          "borderBlockStartColor",
          "borderBlockStartStyle",
          "borderBlockStartWidth"
        ],
        borderBottom: [
          "borderBottomColor",
          "borderBottomStyle",
          "borderBottomWidth"
        ],
        borderColor: [
          "borderBottomColor",
          "borderLeftColor",
          "borderRightColor",
          "borderTopColor"
        ],
        borderImage: [
          "borderImageOutset",
          "borderImageRepeat",
          "borderImageSlice",
          "borderImageSource",
          "borderImageWidth"
        ],
        borderInlineEnd: [
          "borderInlineEndColor",
          "borderInlineEndStyle",
          "borderInlineEndWidth"
        ],
        borderInlineStart: [
          "borderInlineStartColor",
          "borderInlineStartStyle",
          "borderInlineStartWidth"
        ],
        borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
        borderRadius: [
          "borderBottomLeftRadius",
          "borderBottomRightRadius",
          "borderTopLeftRadius",
          "borderTopRightRadius"
        ],
        borderRight: [
          "borderRightColor",
          "borderRightStyle",
          "borderRightWidth"
        ],
        borderStyle: [
          "borderBottomStyle",
          "borderLeftStyle",
          "borderRightStyle",
          "borderTopStyle"
        ],
        borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
        borderWidth: [
          "borderBottomWidth",
          "borderLeftWidth",
          "borderRightWidth",
          "borderTopWidth"
        ],
        columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
        columns: ["columnCount", "columnWidth"],
        flex: ["flexBasis", "flexGrow", "flexShrink"],
        flexFlow: ["flexDirection", "flexWrap"],
        font: "fontFamily fontFeatureSettings fontKerning fontLanguageOverride fontSize fontSizeAdjust fontStretch fontStyle fontVariant fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition fontWeight lineHeight".split(
          " "
        ),
        fontVariant: "fontVariantAlternates fontVariantCaps fontVariantEastAsian fontVariantLigatures fontVariantNumeric fontVariantPosition".split(
          " "
        ),
        gap: ["columnGap", "rowGap"],
        grid: "gridAutoColumns gridAutoFlow gridAutoRows gridTemplateAreas gridTemplateColumns gridTemplateRows".split(
          " "
        ),
        gridArea: [
          "gridColumnEnd",
          "gridColumnStart",
          "gridRowEnd",
          "gridRowStart"
        ],
        gridColumn: ["gridColumnEnd", "gridColumnStart"],
        gridColumnGap: ["columnGap"],
        gridGap: ["columnGap", "rowGap"],
        gridRow: ["gridRowEnd", "gridRowStart"],
        gridRowGap: ["rowGap"],
        gridTemplate: [
          "gridTemplateAreas",
          "gridTemplateColumns",
          "gridTemplateRows"
        ],
        listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
        margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
        marker: ["markerEnd", "markerMid", "markerStart"],
        mask: "maskClip maskComposite maskImage maskMode maskOrigin maskPositionX maskPositionY maskRepeat maskSize".split(
          " "
        ),
        maskPosition: ["maskPositionX", "maskPositionY"],
        outline: ["outlineColor", "outlineStyle", "outlineWidth"],
        overflow: ["overflowX", "overflowY"],
        padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
        placeContent: ["alignContent", "justifyContent"],
        placeItems: ["alignItems", "justifyItems"],
        placeSelf: ["alignSelf", "justifySelf"],
        textDecoration: [
          "textDecorationColor",
          "textDecorationLine",
          "textDecorationStyle"
        ],
        textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
        transition: [
          "transitionDelay",
          "transitionDuration",
          "transitionProperty",
          "transitionTimingFunction"
        ],
        wordWrap: ["overflowWrap"]
      }, uppercasePattern = /([A-Z])/g, msPattern$1 = /^ms-/, badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/, msPattern = /^-ms-/, hyphenPattern = /-(.)/g, badStyleValueWithSemicolonPattern = /;\s*$/, warnedStyleNames = {}, warnedStyleValues = {}, warnedForNaNValue = false, warnedForInfinityValue = false, unitlessNumbers = new Set(
        "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
          " "
        )
      ), MATH_NAMESPACE = "http://www.w3.org/1998/Math/MathML", SVG_NAMESPACE = "http://www.w3.org/2000/svg", aliases = /* @__PURE__ */ new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]), possibleStandardNames = {
        accept: "accept",
        acceptcharset: "acceptCharset",
        "accept-charset": "acceptCharset",
        accesskey: "accessKey",
        action: "action",
        allowfullscreen: "allowFullScreen",
        alt: "alt",
        as: "as",
        async: "async",
        autocapitalize: "autoCapitalize",
        autocomplete: "autoComplete",
        autocorrect: "autoCorrect",
        autofocus: "autoFocus",
        autoplay: "autoPlay",
        autosave: "autoSave",
        capture: "capture",
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        challenge: "challenge",
        charset: "charSet",
        checked: "checked",
        children: "children",
        cite: "cite",
        class: "className",
        classid: "classID",
        classname: "className",
        cols: "cols",
        colspan: "colSpan",
        content: "content",
        contenteditable: "contentEditable",
        contextmenu: "contextMenu",
        controls: "controls",
        controlslist: "controlsList",
        coords: "coords",
        crossorigin: "crossOrigin",
        dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
        data: "data",
        datetime: "dateTime",
        default: "default",
        defaultchecked: "defaultChecked",
        defaultvalue: "defaultValue",
        defer: "defer",
        dir: "dir",
        disabled: "disabled",
        disablepictureinpicture: "disablePictureInPicture",
        disableremoteplayback: "disableRemotePlayback",
        download: "download",
        draggable: "draggable",
        enctype: "encType",
        enterkeyhint: "enterKeyHint",
        fetchpriority: "fetchPriority",
        for: "htmlFor",
        form: "form",
        formmethod: "formMethod",
        formaction: "formAction",
        formenctype: "formEncType",
        formnovalidate: "formNoValidate",
        formtarget: "formTarget",
        frameborder: "frameBorder",
        headers: "headers",
        height: "height",
        hidden: "hidden",
        high: "high",
        href: "href",
        hreflang: "hrefLang",
        htmlfor: "htmlFor",
        httpequiv: "httpEquiv",
        "http-equiv": "httpEquiv",
        icon: "icon",
        id: "id",
        imagesizes: "imageSizes",
        imagesrcset: "imageSrcSet",
        inert: "inert",
        innerhtml: "innerHTML",
        inputmode: "inputMode",
        integrity: "integrity",
        is: "is",
        itemid: "itemID",
        itemprop: "itemProp",
        itemref: "itemRef",
        itemscope: "itemScope",
        itemtype: "itemType",
        keyparams: "keyParams",
        keytype: "keyType",
        kind: "kind",
        label: "label",
        lang: "lang",
        list: "list",
        loop: "loop",
        low: "low",
        manifest: "manifest",
        marginwidth: "marginWidth",
        marginheight: "marginHeight",
        max: "max",
        maxlength: "maxLength",
        media: "media",
        mediagroup: "mediaGroup",
        method: "method",
        min: "min",
        minlength: "minLength",
        multiple: "multiple",
        muted: "muted",
        name: "name",
        nomodule: "noModule",
        nonce: "nonce",
        novalidate: "noValidate",
        open: "open",
        optimum: "optimum",
        pattern: "pattern",
        placeholder: "placeholder",
        playsinline: "playsInline",
        poster: "poster",
        preload: "preload",
        profile: "profile",
        radiogroup: "radioGroup",
        readonly: "readOnly",
        referrerpolicy: "referrerPolicy",
        rel: "rel",
        required: "required",
        reversed: "reversed",
        role: "role",
        rows: "rows",
        rowspan: "rowSpan",
        sandbox: "sandbox",
        scope: "scope",
        scoped: "scoped",
        scrolling: "scrolling",
        seamless: "seamless",
        selected: "selected",
        shape: "shape",
        size: "size",
        sizes: "sizes",
        span: "span",
        spellcheck: "spellCheck",
        src: "src",
        srcdoc: "srcDoc",
        srclang: "srcLang",
        srcset: "srcSet",
        start: "start",
        step: "step",
        style: "style",
        summary: "summary",
        tabindex: "tabIndex",
        target: "target",
        title: "title",
        type: "type",
        usemap: "useMap",
        value: "value",
        width: "width",
        wmode: "wmode",
        wrap: "wrap",
        about: "about",
        accentheight: "accentHeight",
        "accent-height": "accentHeight",
        accumulate: "accumulate",
        additive: "additive",
        alignmentbaseline: "alignmentBaseline",
        "alignment-baseline": "alignmentBaseline",
        allowreorder: "allowReorder",
        alphabetic: "alphabetic",
        amplitude: "amplitude",
        arabicform: "arabicForm",
        "arabic-form": "arabicForm",
        ascent: "ascent",
        attributename: "attributeName",
        attributetype: "attributeType",
        autoreverse: "autoReverse",
        azimuth: "azimuth",
        basefrequency: "baseFrequency",
        baselineshift: "baselineShift",
        "baseline-shift": "baselineShift",
        baseprofile: "baseProfile",
        bbox: "bbox",
        begin: "begin",
        bias: "bias",
        by: "by",
        calcmode: "calcMode",
        capheight: "capHeight",
        "cap-height": "capHeight",
        clip: "clip",
        clippath: "clipPath",
        "clip-path": "clipPath",
        clippathunits: "clipPathUnits",
        cliprule: "clipRule",
        "clip-rule": "clipRule",
        color: "color",
        colorinterpolation: "colorInterpolation",
        "color-interpolation": "colorInterpolation",
        colorinterpolationfilters: "colorInterpolationFilters",
        "color-interpolation-filters": "colorInterpolationFilters",
        colorprofile: "colorProfile",
        "color-profile": "colorProfile",
        colorrendering: "colorRendering",
        "color-rendering": "colorRendering",
        contentscripttype: "contentScriptType",
        contentstyletype: "contentStyleType",
        cursor: "cursor",
        cx: "cx",
        cy: "cy",
        d: "d",
        datatype: "datatype",
        decelerate: "decelerate",
        descent: "descent",
        diffuseconstant: "diffuseConstant",
        direction: "direction",
        display: "display",
        divisor: "divisor",
        dominantbaseline: "dominantBaseline",
        "dominant-baseline": "dominantBaseline",
        dur: "dur",
        dx: "dx",
        dy: "dy",
        edgemode: "edgeMode",
        elevation: "elevation",
        enablebackground: "enableBackground",
        "enable-background": "enableBackground",
        end: "end",
        exponent: "exponent",
        externalresourcesrequired: "externalResourcesRequired",
        fill: "fill",
        fillopacity: "fillOpacity",
        "fill-opacity": "fillOpacity",
        fillrule: "fillRule",
        "fill-rule": "fillRule",
        filter: "filter",
        filterres: "filterRes",
        filterunits: "filterUnits",
        floodopacity: "floodOpacity",
        "flood-opacity": "floodOpacity",
        floodcolor: "floodColor",
        "flood-color": "floodColor",
        focusable: "focusable",
        fontfamily: "fontFamily",
        "font-family": "fontFamily",
        fontsize: "fontSize",
        "font-size": "fontSize",
        fontsizeadjust: "fontSizeAdjust",
        "font-size-adjust": "fontSizeAdjust",
        fontstretch: "fontStretch",
        "font-stretch": "fontStretch",
        fontstyle: "fontStyle",
        "font-style": "fontStyle",
        fontvariant: "fontVariant",
        "font-variant": "fontVariant",
        fontweight: "fontWeight",
        "font-weight": "fontWeight",
        format: "format",
        from: "from",
        fx: "fx",
        fy: "fy",
        g1: "g1",
        g2: "g2",
        glyphname: "glyphName",
        "glyph-name": "glyphName",
        glyphorientationhorizontal: "glyphOrientationHorizontal",
        "glyph-orientation-horizontal": "glyphOrientationHorizontal",
        glyphorientationvertical: "glyphOrientationVertical",
        "glyph-orientation-vertical": "glyphOrientationVertical",
        glyphref: "glyphRef",
        gradienttransform: "gradientTransform",
        gradientunits: "gradientUnits",
        hanging: "hanging",
        horizadvx: "horizAdvX",
        "horiz-adv-x": "horizAdvX",
        horizoriginx: "horizOriginX",
        "horiz-origin-x": "horizOriginX",
        ideographic: "ideographic",
        imagerendering: "imageRendering",
        "image-rendering": "imageRendering",
        in2: "in2",
        in: "in",
        inlist: "inlist",
        intercept: "intercept",
        k1: "k1",
        k2: "k2",
        k3: "k3",
        k4: "k4",
        k: "k",
        kernelmatrix: "kernelMatrix",
        kernelunitlength: "kernelUnitLength",
        kerning: "kerning",
        keypoints: "keyPoints",
        keysplines: "keySplines",
        keytimes: "keyTimes",
        lengthadjust: "lengthAdjust",
        letterspacing: "letterSpacing",
        "letter-spacing": "letterSpacing",
        lightingcolor: "lightingColor",
        "lighting-color": "lightingColor",
        limitingconeangle: "limitingConeAngle",
        local: "local",
        markerend: "markerEnd",
        "marker-end": "markerEnd",
        markerheight: "markerHeight",
        markermid: "markerMid",
        "marker-mid": "markerMid",
        markerstart: "markerStart",
        "marker-start": "markerStart",
        markerunits: "markerUnits",
        markerwidth: "markerWidth",
        mask: "mask",
        maskcontentunits: "maskContentUnits",
        maskunits: "maskUnits",
        mathematical: "mathematical",
        mode: "mode",
        numoctaves: "numOctaves",
        offset: "offset",
        opacity: "opacity",
        operator: "operator",
        order: "order",
        orient: "orient",
        orientation: "orientation",
        origin: "origin",
        overflow: "overflow",
        overlineposition: "overlinePosition",
        "overline-position": "overlinePosition",
        overlinethickness: "overlineThickness",
        "overline-thickness": "overlineThickness",
        paintorder: "paintOrder",
        "paint-order": "paintOrder",
        panose1: "panose1",
        "panose-1": "panose1",
        pathlength: "pathLength",
        patterncontentunits: "patternContentUnits",
        patterntransform: "patternTransform",
        patternunits: "patternUnits",
        pointerevents: "pointerEvents",
        "pointer-events": "pointerEvents",
        points: "points",
        pointsatx: "pointsAtX",
        pointsaty: "pointsAtY",
        pointsatz: "pointsAtZ",
        popover: "popover",
        popovertarget: "popoverTarget",
        popovertargetaction: "popoverTargetAction",
        prefix: "prefix",
        preservealpha: "preserveAlpha",
        preserveaspectratio: "preserveAspectRatio",
        primitiveunits: "primitiveUnits",
        property: "property",
        r: "r",
        radius: "radius",
        refx: "refX",
        refy: "refY",
        renderingintent: "renderingIntent",
        "rendering-intent": "renderingIntent",
        repeatcount: "repeatCount",
        repeatdur: "repeatDur",
        requiredextensions: "requiredExtensions",
        requiredfeatures: "requiredFeatures",
        resource: "resource",
        restart: "restart",
        result: "result",
        results: "results",
        rotate: "rotate",
        rx: "rx",
        ry: "ry",
        scale: "scale",
        security: "security",
        seed: "seed",
        shaperendering: "shapeRendering",
        "shape-rendering": "shapeRendering",
        slope: "slope",
        spacing: "spacing",
        specularconstant: "specularConstant",
        specularexponent: "specularExponent",
        speed: "speed",
        spreadmethod: "spreadMethod",
        startoffset: "startOffset",
        stddeviation: "stdDeviation",
        stemh: "stemh",
        stemv: "stemv",
        stitchtiles: "stitchTiles",
        stopcolor: "stopColor",
        "stop-color": "stopColor",
        stopopacity: "stopOpacity",
        "stop-opacity": "stopOpacity",
        strikethroughposition: "strikethroughPosition",
        "strikethrough-position": "strikethroughPosition",
        strikethroughthickness: "strikethroughThickness",
        "strikethrough-thickness": "strikethroughThickness",
        string: "string",
        stroke: "stroke",
        strokedasharray: "strokeDasharray",
        "stroke-dasharray": "strokeDasharray",
        strokedashoffset: "strokeDashoffset",
        "stroke-dashoffset": "strokeDashoffset",
        strokelinecap: "strokeLinecap",
        "stroke-linecap": "strokeLinecap",
        strokelinejoin: "strokeLinejoin",
        "stroke-linejoin": "strokeLinejoin",
        strokemiterlimit: "strokeMiterlimit",
        "stroke-miterlimit": "strokeMiterlimit",
        strokewidth: "strokeWidth",
        "stroke-width": "strokeWidth",
        strokeopacity: "strokeOpacity",
        "stroke-opacity": "strokeOpacity",
        suppresscontenteditablewarning: "suppressContentEditableWarning",
        suppresshydrationwarning: "suppressHydrationWarning",
        surfacescale: "surfaceScale",
        systemlanguage: "systemLanguage",
        tablevalues: "tableValues",
        targetx: "targetX",
        targety: "targetY",
        textanchor: "textAnchor",
        "text-anchor": "textAnchor",
        textdecoration: "textDecoration",
        "text-decoration": "textDecoration",
        textlength: "textLength",
        textrendering: "textRendering",
        "text-rendering": "textRendering",
        to: "to",
        transform: "transform",
        transformorigin: "transformOrigin",
        "transform-origin": "transformOrigin",
        typeof: "typeof",
        u1: "u1",
        u2: "u2",
        underlineposition: "underlinePosition",
        "underline-position": "underlinePosition",
        underlinethickness: "underlineThickness",
        "underline-thickness": "underlineThickness",
        unicode: "unicode",
        unicodebidi: "unicodeBidi",
        "unicode-bidi": "unicodeBidi",
        unicoderange: "unicodeRange",
        "unicode-range": "unicodeRange",
        unitsperem: "unitsPerEm",
        "units-per-em": "unitsPerEm",
        unselectable: "unselectable",
        valphabetic: "vAlphabetic",
        "v-alphabetic": "vAlphabetic",
        values: "values",
        vectoreffect: "vectorEffect",
        "vector-effect": "vectorEffect",
        version: "version",
        vertadvy: "vertAdvY",
        "vert-adv-y": "vertAdvY",
        vertoriginx: "vertOriginX",
        "vert-origin-x": "vertOriginX",
        vertoriginy: "vertOriginY",
        "vert-origin-y": "vertOriginY",
        vhanging: "vHanging",
        "v-hanging": "vHanging",
        videographic: "vIdeographic",
        "v-ideographic": "vIdeographic",
        viewbox: "viewBox",
        viewtarget: "viewTarget",
        visibility: "visibility",
        vmathematical: "vMathematical",
        "v-mathematical": "vMathematical",
        vocab: "vocab",
        widths: "widths",
        wordspacing: "wordSpacing",
        "word-spacing": "wordSpacing",
        writingmode: "writingMode",
        "writing-mode": "writingMode",
        x1: "x1",
        x2: "x2",
        x: "x",
        xchannelselector: "xChannelSelector",
        xheight: "xHeight",
        "x-height": "xHeight",
        xlinkactuate: "xlinkActuate",
        "xlink:actuate": "xlinkActuate",
        xlinkarcrole: "xlinkArcrole",
        "xlink:arcrole": "xlinkArcrole",
        xlinkhref: "xlinkHref",
        "xlink:href": "xlinkHref",
        xlinkrole: "xlinkRole",
        "xlink:role": "xlinkRole",
        xlinkshow: "xlinkShow",
        "xlink:show": "xlinkShow",
        xlinktitle: "xlinkTitle",
        "xlink:title": "xlinkTitle",
        xlinktype: "xlinkType",
        "xlink:type": "xlinkType",
        xmlbase: "xmlBase",
        "xml:base": "xmlBase",
        xmllang: "xmlLang",
        "xml:lang": "xmlLang",
        xmlns: "xmlns",
        "xml:space": "xmlSpace",
        xmlnsxlink: "xmlnsXlink",
        "xmlns:xlink": "xmlnsXlink",
        xmlspace: "xmlSpace",
        y1: "y1",
        y2: "y2",
        y: "y",
        ychannelselector: "yChannelSelector",
        z: "z",
        zoomandpan: "zoomAndPan"
      }, ariaProperties = {
        "aria-current": 0,
        "aria-description": 0,
        "aria-details": 0,
        "aria-disabled": 0,
        "aria-hidden": 0,
        "aria-invalid": 0,
        "aria-keyshortcuts": 0,
        "aria-label": 0,
        "aria-roledescription": 0,
        "aria-autocomplete": 0,
        "aria-checked": 0,
        "aria-expanded": 0,
        "aria-haspopup": 0,
        "aria-level": 0,
        "aria-modal": 0,
        "aria-multiline": 0,
        "aria-multiselectable": 0,
        "aria-orientation": 0,
        "aria-placeholder": 0,
        "aria-pressed": 0,
        "aria-readonly": 0,
        "aria-required": 0,
        "aria-selected": 0,
        "aria-sort": 0,
        "aria-valuemax": 0,
        "aria-valuemin": 0,
        "aria-valuenow": 0,
        "aria-valuetext": 0,
        "aria-atomic": 0,
        "aria-busy": 0,
        "aria-live": 0,
        "aria-relevant": 0,
        "aria-dropeffect": 0,
        "aria-grabbed": 0,
        "aria-activedescendant": 0,
        "aria-colcount": 0,
        "aria-colindex": 0,
        "aria-colspan": 0,
        "aria-controls": 0,
        "aria-describedby": 0,
        "aria-errormessage": 0,
        "aria-flowto": 0,
        "aria-labelledby": 0,
        "aria-owns": 0,
        "aria-posinset": 0,
        "aria-rowcount": 0,
        "aria-rowindex": 0,
        "aria-rowspan": 0,
        "aria-setsize": 0
      }, warnedProperties$1 = {}, rARIA$1 = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), rARIACamel$1 = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), didWarnValueNull = false, warnedProperties = {}, EVENT_NAME_REGEX = /^on./, INVALID_EVENT_NAME_REGEX = /^on[^A-Z]/, rARIA = RegExp(
        "^(aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), rARIACamel = RegExp(
        "^(aria)[A-Z][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
      ), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i, currentReplayingEvent = null, restoreTarget = null, restoreQueue = null, isInsideEventHandler = false, canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), passiveBrowserEventsSupported = false;
      if (canUseDOM)
        try {
          var options$jscomp$0 = {};
          Object.defineProperty(options$jscomp$0, "passive", {
            get: function() {
              passiveBrowserEventsSupported = true;
            }
          });
          window.addEventListener("test", options$jscomp$0, options$jscomp$0);
          window.removeEventListener("test", options$jscomp$0, options$jscomp$0);
        } catch (e) {
          passiveBrowserEventsSupported = false;
        }
      var root = null, startText = null, fallbackText = null, EventInterface = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(event) {
          return event.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0
      }, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: getEventModifierState,
        button: 0,
        buttons: 0,
        relatedTarget: function(event) {
          return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
        },
        movementX: function(event) {
          if ("movementX" in event)
            return event.movementX;
          event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
          return lastMovementX;
        },
        movementY: function(event) {
          return "movementY" in event ? event.movementY : lastMovementY;
        }
      }), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
        clipboardData: function(event) {
          return "clipboardData" in event ? event.clipboardData : window.clipboardData;
        }
      }), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(
        CompositionEventInterface
      ), SyntheticInputEvent = SyntheticCompositionEvent, normalizeKey = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      }, translateToKey = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      }, modifierKeyToProp = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      }, KeyboardEventInterface = assign({}, UIEventInterface, {
        key: function(nativeEvent) {
          if (nativeEvent.key) {
            var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
            if ("Unidentified" !== key)
              return key;
          }
          return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: getEventModifierState,
        charCode: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : 0;
        },
        keyCode: function(event) {
          return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        },
        which: function(event) {
          return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
        }
      }), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      }), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: getEventModifierState
      }), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
        deltaX: function(event) {
          return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
        },
        deltaY: function(event) {
          return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      }), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
        newState: 0,
        oldState: 0
      }), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], START_KEYCODE = 229, canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
      canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
      var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CODE = 32, SPACEBAR_CHAR = String.fromCharCode(SPACEBAR_CODE), hasSpaceKeypress = false, isComposing = false, supportedInputTypes = {
        color: true,
        date: true,
        datetime: true,
        "datetime-local": true,
        email: true,
        month: true,
        number: true,
        password: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true
      }, activeElement$1 = null, activeElementInst$1 = null, isInputEventSupported = false;
      canUseDOM && (isInputEventSupported = isEventSupported("input") && (!document.documentMode || 9 < document.documentMode));
      var objectIs = "function" === typeof Object.is ? Object.is : is, skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false, vendorPrefixes = {
        animationend: makePrefixMap("Animation", "AnimationEnd"),
        animationiteration: makePrefixMap("Animation", "AnimationIteration"),
        animationstart: makePrefixMap("Animation", "AnimationStart"),
        transitionrun: makePrefixMap("Transition", "TransitionRun"),
        transitionstart: makePrefixMap("Transition", "TransitionStart"),
        transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
        transitionend: makePrefixMap("Transition", "TransitionEnd")
      }, prefixedEventNames = {}, style = {};
      canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
      var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
      simpleEventPluginEvents.push("scrollEnd");
      var CapturedStacks = /* @__PURE__ */ new WeakMap(), OffscreenVisible = 1, OffscreenPassiveEffectsConnected = 2, concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0, emptyContextObject = {};
      Object.freeze(emptyContextObject);
      var resolveFamily = null, failedBoundaries = null, NoMode = 0, ConcurrentMode = 1, ProfileMode = 2, StrictLegacyMode = 8, StrictEffectsMode = 16, NoStrictPassiveEffectsMode = 64;
      var hasBadMapPolyfill = false;
      try {
        var nonExtensibleObject = Object.preventExtensions({});
        /* @__PURE__ */ new Map([[nonExtensibleObject, null]]);
        /* @__PURE__ */ new Set([nonExtensibleObject]);
      } catch (e$3) {
        hasBadMapPolyfill = true;
      }
      var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "", hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, didSuspendOrErrorDEV = false, hydrationDiffRootDEV = null, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(
        "Hydration Mismatch Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
      ), lastResetTime = 0;
      if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        var getCurrentTime = function() {
          return localPerformance.now();
        };
      } else {
        var localDate = Date;
        getCurrentTime = function() {
          return localDate.now();
        };
      }
      var valueCursor = createCursor(null);
      var rendererCursorDEV = createCursor(null);
      var rendererSigil = {};
      var currentlyRenderingFiber$1 = null, lastContextDependency = null, isDisallowedContextReadInDEV = false, AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
        var listeners = [], signal = this.signal = {
          aborted: false,
          addEventListener: function(type, listener) {
            listeners.push(listener);
          }
        };
        this.abort = function() {
          signal.aborted = true;
          listeners.forEach(function(listener) {
            return listener();
          });
        };
      }, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0,
        _currentRenderer: null,
        _currentRenderer2: null
      }, now = Scheduler.unstable_now, renderStartTime = -0, commitStartTime = -0, profilerStartTime = -1.1, profilerEffectDuration = -0, currentUpdateIsNested = false, nestedUpdateScheduled = false, currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null, prevOnStartTransitionFinish = ReactSharedInternals.S;
      ReactSharedInternals.S = function(transition, returnValue) {
        "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
        null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
      };
      var resumedCache = createCursor(null), ReactStrictModeWarnings = {
        recordUnsafeLifecycleWarnings: function() {
        },
        flushPendingUnsafeLifecycleWarnings: function() {
        },
        recordLegacyContextWarning: function() {
        },
        flushLegacyContextWarning: function() {
        },
        discardPendingWarnings: function() {
        }
      }, pendingComponentWillMountWarnings = [], pendingUNSAFE_ComponentWillMountWarnings = [], pendingComponentWillReceivePropsWarnings = [], pendingUNSAFE_ComponentWillReceivePropsWarnings = [], pendingComponentWillUpdateWarnings = [], pendingUNSAFE_ComponentWillUpdateWarnings = [], didWarnAboutUnsafeLifecycles = /* @__PURE__ */ new Set();
      ReactStrictModeWarnings.recordUnsafeLifecycleWarnings = function(fiber, instance) {
        didWarnAboutUnsafeLifecycles.has(fiber.type) || ("function" === typeof instance.componentWillMount && true !== instance.componentWillMount.__suppressDeprecationWarning && pendingComponentWillMountWarnings.push(fiber), fiber.mode & StrictLegacyMode && "function" === typeof instance.UNSAFE_componentWillMount && pendingUNSAFE_ComponentWillMountWarnings.push(fiber), "function" === typeof instance.componentWillReceiveProps && true !== instance.componentWillReceiveProps.__suppressDeprecationWarning && pendingComponentWillReceivePropsWarnings.push(fiber), fiber.mode & StrictLegacyMode && "function" === typeof instance.UNSAFE_componentWillReceiveProps && pendingUNSAFE_ComponentWillReceivePropsWarnings.push(fiber), "function" === typeof instance.componentWillUpdate && true !== instance.componentWillUpdate.__suppressDeprecationWarning && pendingComponentWillUpdateWarnings.push(fiber), fiber.mode & StrictLegacyMode && "function" === typeof instance.UNSAFE_componentWillUpdate && pendingUNSAFE_ComponentWillUpdateWarnings.push(fiber));
      };
      ReactStrictModeWarnings.flushPendingUnsafeLifecycleWarnings = function() {
        var componentWillMountUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingComponentWillMountWarnings.length && (pendingComponentWillMountWarnings.forEach(function(fiber) {
          componentWillMountUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }), pendingComponentWillMountWarnings = []);
        var UNSAFE_componentWillMountUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingUNSAFE_ComponentWillMountWarnings.length && (pendingUNSAFE_ComponentWillMountWarnings.forEach(function(fiber) {
          UNSAFE_componentWillMountUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }), pendingUNSAFE_ComponentWillMountWarnings = []);
        var componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingComponentWillReceivePropsWarnings.length && (pendingComponentWillReceivePropsWarnings.forEach(function(fiber) {
          componentWillReceivePropsUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }), pendingComponentWillReceivePropsWarnings = []);
        var UNSAFE_componentWillReceivePropsUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingUNSAFE_ComponentWillReceivePropsWarnings.length && (pendingUNSAFE_ComponentWillReceivePropsWarnings.forEach(
          function(fiber) {
            UNSAFE_componentWillReceivePropsUniqueNames.add(
              getComponentNameFromFiber(fiber) || "Component"
            );
            didWarnAboutUnsafeLifecycles.add(fiber.type);
          }
        ), pendingUNSAFE_ComponentWillReceivePropsWarnings = []);
        var componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingComponentWillUpdateWarnings.length && (pendingComponentWillUpdateWarnings.forEach(function(fiber) {
          componentWillUpdateUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }), pendingComponentWillUpdateWarnings = []);
        var UNSAFE_componentWillUpdateUniqueNames = /* @__PURE__ */ new Set();
        0 < pendingUNSAFE_ComponentWillUpdateWarnings.length && (pendingUNSAFE_ComponentWillUpdateWarnings.forEach(function(fiber) {
          UNSAFE_componentWillUpdateUniqueNames.add(
            getComponentNameFromFiber(fiber) || "Component"
          );
          didWarnAboutUnsafeLifecycles.add(fiber.type);
        }), pendingUNSAFE_ComponentWillUpdateWarnings = []);
        if (0 < UNSAFE_componentWillMountUniqueNames.size) {
          var sortedNames = setToSortedString(
            UNSAFE_componentWillMountUniqueNames
          );
          console.error(
            "Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s",
            sortedNames
          );
        }
        0 < UNSAFE_componentWillReceivePropsUniqueNames.size && (sortedNames = setToSortedString(
          UNSAFE_componentWillReceivePropsUniqueNames
        ), console.error(
          "Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n\nPlease update the following components: %s",
          sortedNames
        ));
        0 < UNSAFE_componentWillUpdateUniqueNames.size && (sortedNames = setToSortedString(
          UNSAFE_componentWillUpdateUniqueNames
        ), console.error(
          "Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s",
          sortedNames
        ));
        0 < componentWillMountUniqueNames.size && (sortedNames = setToSortedString(componentWillMountUniqueNames), console.warn(
          "componentWillMount has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
        0 < componentWillReceivePropsUniqueNames.size && (sortedNames = setToSortedString(
          componentWillReceivePropsUniqueNames
        ), console.warn(
          "componentWillReceiveProps has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://react.dev/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
        0 < componentWillUpdateUniqueNames.size && (sortedNames = setToSortedString(componentWillUpdateUniqueNames), console.warn(
          "componentWillUpdate has been renamed, and is not recommended for use. See https://react.dev/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",
          sortedNames
        ));
      };
      var pendingLegacyContextWarning = /* @__PURE__ */ new Map(), didWarnAboutLegacyContext = /* @__PURE__ */ new Set();
      ReactStrictModeWarnings.recordLegacyContextWarning = function(fiber, instance) {
        var strictRoot = null;
        for (var node = fiber; null !== node; )
          node.mode & StrictLegacyMode && (strictRoot = node), node = node.return;
        null === strictRoot ? console.error(
          "Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue."
        ) : !didWarnAboutLegacyContext.has(fiber.type) && (node = pendingLegacyContextWarning.get(strictRoot), null != fiber.type.contextTypes || null != fiber.type.childContextTypes || null !== instance && "function" === typeof instance.getChildContext) && (void 0 === node && (node = [], pendingLegacyContextWarning.set(strictRoot, node)), node.push(fiber));
      };
      ReactStrictModeWarnings.flushLegacyContextWarning = function() {
        pendingLegacyContextWarning.forEach(function(fiberArray) {
          if (0 !== fiberArray.length) {
            var firstFiber = fiberArray[0], uniqueNames = /* @__PURE__ */ new Set();
            fiberArray.forEach(function(fiber) {
              uniqueNames.add(getComponentNameFromFiber(fiber) || "Component");
              didWarnAboutLegacyContext.add(fiber.type);
            });
            var sortedNames = setToSortedString(uniqueNames);
            runWithFiberInDEV(firstFiber, function() {
              console.error(
                "Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://react.dev/link/legacy-context",
                sortedNames
              );
            });
          }
        });
      };
      ReactStrictModeWarnings.discardPendingWarnings = function() {
        pendingComponentWillMountWarnings = [];
        pendingUNSAFE_ComponentWillMountWarnings = [];
        pendingComponentWillReceivePropsWarnings = [];
        pendingUNSAFE_ComponentWillReceivePropsWarnings = [];
        pendingComponentWillUpdateWarnings = [];
        pendingUNSAFE_ComponentWillUpdateWarnings = [];
        pendingLegacyContextWarning = /* @__PURE__ */ new Map();
      };
      var SuspenseException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`."
      ), SuspenseyCommitException = Error(
        "Suspense Exception: This is not a real error, and should not leak into userspace. If you're seeing this, it's likely a bug in React."
      ), SuspenseActionException = Error(
        "Suspense Exception: This is not a real error! It's an implementation detail of `useActionState` to interrupt the current render. You must either rethrow it immediately, or move the `useActionState` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary."
      ), noopSuspenseyCommitThenable = {
        then: function() {
          console.error(
            'Internal React error: A listener was unexpectedly attached to a "noop" thenable. This is a bug in React. Please file an issue.'
          );
        }
      }, suspendedThenable = null, needsToResetSuspendedThenableDEV = false, NoFlags = 0, HasEffect = 1, Insertion = 2, Layout = 4, Passive = 8, UpdateState = 0, ReplaceState = 1, ForceUpdate = 2, CaptureUpdate = 3, hasForceUpdate = false;
      var didWarnUpdateInsideUpdate = false;
      var currentlyProcessingQueue = null;
      var didReadFromEntangledAsyncAction = false, currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0), didWarnUncachedGetSnapshot;
      var didWarnAboutMismatchedHooksForComponent = /* @__PURE__ */ new Set();
      var didWarnAboutUseWrappedInTryCatch = /* @__PURE__ */ new Set();
      var didWarnAboutAsyncClientComponent = /* @__PURE__ */ new Set();
      var didWarnAboutUseFormState = /* @__PURE__ */ new Set();
      var renderLanes = 0, currentlyRenderingFiber = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter$1 = 0, thenableState$1 = null, globalClientIdCounter = 0, RE_RENDER_LIMIT = 25, currentHookNameInDev = null, hookTypesDev = null, hookTypesUpdateIndexDev = -1, ignorePreviousDependencies = false, ContextOnlyDispatcher = {
        readContext,
        use,
        useCallback: throwInvalidHookError,
        useContext: throwInvalidHookError,
        useEffect: throwInvalidHookError,
        useImperativeHandle: throwInvalidHookError,
        useLayoutEffect: throwInvalidHookError,
        useInsertionEffect: throwInvalidHookError,
        useMemo: throwInvalidHookError,
        useReducer: throwInvalidHookError,
        useRef: throwInvalidHookError,
        useState: throwInvalidHookError,
        useDebugValue: throwInvalidHookError,
        useDeferredValue: throwInvalidHookError,
        useTransition: throwInvalidHookError,
        useSyncExternalStore: throwInvalidHookError,
        useId: throwInvalidHookError,
        useHostTransitionStatus: throwInvalidHookError,
        useFormState: throwInvalidHookError,
        useActionState: throwInvalidHookError,
        useOptimistic: throwInvalidHookError,
        useMemoCache: throwInvalidHookError,
        useCacheRefresh: throwInvalidHookError
      }, HooksDispatcherOnMountInDEV = null, HooksDispatcherOnMountWithHookTypesInDEV = null, HooksDispatcherOnUpdateInDEV = null, HooksDispatcherOnRerenderInDEV = null, InvalidNestedHooksDispatcherOnMountInDEV = null, InvalidNestedHooksDispatcherOnUpdateInDEV = null, InvalidNestedHooksDispatcherOnRerenderInDEV = null;
      HooksDispatcherOnMountInDEV = {
        readContext: function(context) {
          return readContext(context);
        },
        use,
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          mountHookTypesDev();
          checkDepsAreArrayDev(deps);
          return mountCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          mountHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          mountHookTypesDev();
          checkDepsAreArrayDev(createDeps);
          return mountEffect(create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          mountHookTypesDev();
          checkDepsAreArrayDev(deps);
          return mountImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          mountHookTypesDev();
          checkDepsAreArrayDev(deps);
          mountEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          mountHookTypesDev();
          checkDepsAreArrayDev(deps);
          return mountLayoutEffect(create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          mountHookTypesDev();
          checkDepsAreArrayDev(deps);
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          mountHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function(initialValue) {
          currentHookNameInDev = "useRef";
          mountHookTypesDev();
          return mountRef(initialValue);
        },
        useState: function(initialState) {
          currentHookNameInDev = "useState";
          mountHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountState(initialState);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          mountHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          mountHookTypesDev();
          return mountDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          mountHookTypesDev();
          return mountTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          mountHookTypesDev();
          return mountSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          mountHookTypesDev();
          return mountId();
        },
        useFormState: function(action, initialState) {
          currentHookNameInDev = "useFormState";
          mountHookTypesDev();
          warnOnUseFormStateInDev();
          return mountActionState(action, initialState);
        },
        useActionState: function(action, initialState) {
          currentHookNameInDev = "useActionState";
          mountHookTypesDev();
          return mountActionState(action, initialState);
        },
        useOptimistic: function(passthrough) {
          currentHookNameInDev = "useOptimistic";
          mountHookTypesDev();
          return mountOptimistic(passthrough);
        },
        useHostTransitionStatus,
        useMemoCache,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          mountHookTypesDev();
          return mountRefresh();
        }
      };
      HooksDispatcherOnMountWithHookTypesInDEV = {
        readContext: function(context) {
          return readContext(context);
        },
        use,
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          updateHookTypesDev();
          return mountCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          updateHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          updateHookTypesDev();
          return mountEffect(create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          updateHookTypesDev();
          return mountImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          updateHookTypesDev();
          mountEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          updateHookTypesDev();
          return mountLayoutEffect(create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function(initialValue) {
          currentHookNameInDev = "useRef";
          updateHookTypesDev();
          return mountRef(initialValue);
        },
        useState: function(initialState) {
          currentHookNameInDev = "useState";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountState(initialState);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          updateHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          updateHookTypesDev();
          return mountDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          updateHookTypesDev();
          return mountTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          updateHookTypesDev();
          return mountSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          updateHookTypesDev();
          return mountId();
        },
        useActionState: function(action, initialState) {
          currentHookNameInDev = "useActionState";
          updateHookTypesDev();
          return mountActionState(action, initialState);
        },
        useFormState: function(action, initialState) {
          currentHookNameInDev = "useFormState";
          updateHookTypesDev();
          warnOnUseFormStateInDev();
          return mountActionState(action, initialState);
        },
        useOptimistic: function(passthrough) {
          currentHookNameInDev = "useOptimistic";
          updateHookTypesDev();
          return mountOptimistic(passthrough);
        },
        useHostTransitionStatus,
        useMemoCache,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          updateHookTypesDev();
          return mountRefresh();
        }
      };
      HooksDispatcherOnUpdateInDEV = {
        readContext: function(context) {
          return readContext(context);
        },
        use,
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          updateHookTypesDev();
          return updateCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          updateHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          updateHookTypesDev();
          updateEffectImpl(2048, Passive, create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          updateHookTypesDev();
          return updateImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          updateHookTypesDev();
          return updateEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          updateHookTypesDev();
          return updateEffectImpl(4, Layout, create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function() {
          currentHookNameInDev = "useRef";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useState: function() {
          currentHookNameInDev = "useState";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateReducer(basicStateReducer);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          updateHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          updateHookTypesDev();
          return updateDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          updateHookTypesDev();
          return updateTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          updateHookTypesDev();
          return updateSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useFormState: function(action) {
          currentHookNameInDev = "useFormState";
          updateHookTypesDev();
          warnOnUseFormStateInDev();
          return updateActionState(action);
        },
        useActionState: function(action) {
          currentHookNameInDev = "useActionState";
          updateHookTypesDev();
          return updateActionState(action);
        },
        useOptimistic: function(passthrough, reducer) {
          currentHookNameInDev = "useOptimistic";
          updateHookTypesDev();
          return updateOptimistic(passthrough, reducer);
        },
        useHostTransitionStatus,
        useMemoCache,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        }
      };
      HooksDispatcherOnRerenderInDEV = {
        readContext: function(context) {
          return readContext(context);
        },
        use,
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          updateHookTypesDev();
          return updateCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          updateHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          updateHookTypesDev();
          updateEffectImpl(2048, Passive, create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          updateHookTypesDev();
          return updateImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          updateHookTypesDev();
          return updateEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          updateHookTypesDev();
          return updateEffectImpl(4, Layout, create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
          try {
            return updateMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
          try {
            return rerenderReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function() {
          currentHookNameInDev = "useRef";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useState: function() {
          currentHookNameInDev = "useState";
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnRerenderInDEV;
          try {
            return rerenderReducer(basicStateReducer);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          updateHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          updateHookTypesDev();
          return rerenderDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          updateHookTypesDev();
          return rerenderTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          updateHookTypesDev();
          return updateSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useFormState: function(action) {
          currentHookNameInDev = "useFormState";
          updateHookTypesDev();
          warnOnUseFormStateInDev();
          return rerenderActionState(action);
        },
        useActionState: function(action) {
          currentHookNameInDev = "useActionState";
          updateHookTypesDev();
          return rerenderActionState(action);
        },
        useOptimistic: function(passthrough, reducer) {
          currentHookNameInDev = "useOptimistic";
          updateHookTypesDev();
          return rerenderOptimistic(passthrough, reducer);
        },
        useHostTransitionStatus,
        useMemoCache,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        }
      };
      InvalidNestedHooksDispatcherOnMountInDEV = {
        readContext: function(context) {
          warnInvalidContextAccess();
          return readContext(context);
        },
        use: function(usable) {
          warnInvalidHookAccess();
          return use(usable);
        },
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountEffect(create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          warnInvalidHookAccess();
          mountHookTypesDev();
          mountEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountLayoutEffect(create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          warnInvalidHookAccess();
          mountHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          warnInvalidHookAccess();
          mountHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function(initialValue) {
          currentHookNameInDev = "useRef";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountRef(initialValue);
        },
        useState: function(initialState) {
          currentHookNameInDev = "useState";
          warnInvalidHookAccess();
          mountHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnMountInDEV;
          try {
            return mountState(initialState);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          warnInvalidHookAccess();
          mountHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountId();
        },
        useFormState: function(action, initialState) {
          currentHookNameInDev = "useFormState";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountActionState(action, initialState);
        },
        useActionState: function(action, initialState) {
          currentHookNameInDev = "useActionState";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountActionState(action, initialState);
        },
        useOptimistic: function(passthrough) {
          currentHookNameInDev = "useOptimistic";
          warnInvalidHookAccess();
          mountHookTypesDev();
          return mountOptimistic(passthrough);
        },
        useMemoCache: function(size) {
          warnInvalidHookAccess();
          return useMemoCache(size);
        },
        useHostTransitionStatus,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          mountHookTypesDev();
          return mountRefresh();
        }
      };
      InvalidNestedHooksDispatcherOnUpdateInDEV = {
        readContext: function(context) {
          warnInvalidContextAccess();
          return readContext(context);
        },
        use: function(usable) {
          warnInvalidHookAccess();
          return use(usable);
        },
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          updateEffectImpl(2048, Passive, create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateEffectImpl(4, Layout, create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function() {
          currentHookNameInDev = "useRef";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useState: function() {
          currentHookNameInDev = "useState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateReducer(basicStateReducer);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          warnInvalidHookAccess();
          updateHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useFormState: function(action) {
          currentHookNameInDev = "useFormState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateActionState(action);
        },
        useActionState: function(action) {
          currentHookNameInDev = "useActionState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateActionState(action);
        },
        useOptimistic: function(passthrough, reducer) {
          currentHookNameInDev = "useOptimistic";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateOptimistic(passthrough, reducer);
        },
        useMemoCache: function(size) {
          warnInvalidHookAccess();
          return useMemoCache(size);
        },
        useHostTransitionStatus,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        }
      };
      InvalidNestedHooksDispatcherOnRerenderInDEV = {
        readContext: function(context) {
          warnInvalidContextAccess();
          return readContext(context);
        },
        use: function(usable) {
          warnInvalidHookAccess();
          return use(usable);
        },
        useCallback: function(callback, deps) {
          currentHookNameInDev = "useCallback";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateCallback(callback, deps);
        },
        useContext: function(context) {
          currentHookNameInDev = "useContext";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return readContext(context);
        },
        useEffect: function(create, createDeps) {
          currentHookNameInDev = "useEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          updateEffectImpl(2048, Passive, create, createDeps);
        },
        useImperativeHandle: function(ref, create, deps) {
          currentHookNameInDev = "useImperativeHandle";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateImperativeHandle(ref, create, deps);
        },
        useInsertionEffect: function(create, deps) {
          currentHookNameInDev = "useInsertionEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateEffectImpl(4, Insertion, create, deps);
        },
        useLayoutEffect: function(create, deps) {
          currentHookNameInDev = "useLayoutEffect";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateEffectImpl(4, Layout, create, deps);
        },
        useMemo: function(create, deps) {
          currentHookNameInDev = "useMemo";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return updateMemo(create, deps);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useReducer: function(reducer, initialArg, init) {
          currentHookNameInDev = "useReducer";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return rerenderReducer(reducer, initialArg, init);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useRef: function() {
          currentHookNameInDev = "useRef";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useState: function() {
          currentHookNameInDev = "useState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          var prevDispatcher = ReactSharedInternals.H;
          ReactSharedInternals.H = InvalidNestedHooksDispatcherOnUpdateInDEV;
          try {
            return rerenderReducer(basicStateReducer);
          } finally {
            ReactSharedInternals.H = prevDispatcher;
          }
        },
        useDebugValue: function() {
          currentHookNameInDev = "useDebugValue";
          warnInvalidHookAccess();
          updateHookTypesDev();
        },
        useDeferredValue: function(value, initialValue) {
          currentHookNameInDev = "useDeferredValue";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return rerenderDeferredValue(value, initialValue);
        },
        useTransition: function() {
          currentHookNameInDev = "useTransition";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return rerenderTransition();
        },
        useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
          currentHookNameInDev = "useSyncExternalStore";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        },
        useId: function() {
          currentHookNameInDev = "useId";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        },
        useFormState: function(action) {
          currentHookNameInDev = "useFormState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return rerenderActionState(action);
        },
        useActionState: function(action) {
          currentHookNameInDev = "useActionState";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return rerenderActionState(action);
        },
        useOptimistic: function(passthrough, reducer) {
          currentHookNameInDev = "useOptimistic";
          warnInvalidHookAccess();
          updateHookTypesDev();
          return rerenderOptimistic(passthrough, reducer);
        },
        useMemoCache: function(size) {
          warnInvalidHookAccess();
          return useMemoCache(size);
        },
        useHostTransitionStatus,
        useCacheRefresh: function() {
          currentHookNameInDev = "useCacheRefresh";
          updateHookTypesDev();
          return updateWorkInProgressHook().memoizedState;
        }
      };
      var callComponent = {
        "react-stack-bottom-frame": function(Component, props, secondArg) {
          var wasRendering = isRendering;
          isRendering = true;
          try {
            return Component(props, secondArg);
          } finally {
            isRendering = wasRendering;
          }
        }
      }, callComponentInDEV = callComponent["react-stack-bottom-frame"].bind(callComponent), callRender = {
        "react-stack-bottom-frame": function(instance) {
          var wasRendering = isRendering;
          isRendering = true;
          try {
            return instance.render();
          } finally {
            isRendering = wasRendering;
          }
        }
      }, callRenderInDEV = callRender["react-stack-bottom-frame"].bind(callRender), callComponentDidMount = {
        "react-stack-bottom-frame": function(finishedWork, instance) {
          try {
            instance.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }, callComponentDidMountInDEV = callComponentDidMount["react-stack-bottom-frame"].bind(callComponentDidMount), callComponentDidUpdate = {
        "react-stack-bottom-frame": function(finishedWork, instance, prevProps, prevState, snapshot) {
          try {
            instance.componentDidUpdate(prevProps, prevState, snapshot);
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        }
      }, callComponentDidUpdateInDEV = callComponentDidUpdate["react-stack-bottom-frame"].bind(callComponentDidUpdate), callComponentDidCatch = {
        "react-stack-bottom-frame": function(instance, errorInfo) {
          var stack = errorInfo.stack;
          instance.componentDidCatch(errorInfo.value, {
            componentStack: null !== stack ? stack : ""
          });
        }
      }, callComponentDidCatchInDEV = callComponentDidCatch["react-stack-bottom-frame"].bind(callComponentDidCatch), callComponentWillUnmount = {
        "react-stack-bottom-frame": function(current2, nearestMountedAncestor, instance) {
          try {
            instance.componentWillUnmount();
          } catch (error) {
            captureCommitPhaseError(current2, nearestMountedAncestor, error);
          }
        }
      }, callComponentWillUnmountInDEV = callComponentWillUnmount["react-stack-bottom-frame"].bind(callComponentWillUnmount), callCreate = {
        "react-stack-bottom-frame": function(effect) {
          null != effect.resourceKind && console.error(
            "Expected only SimpleEffects when enableUseEffectCRUDOverload is disabled, got %s",
            effect.resourceKind
          );
          var create = effect.create;
          effect = effect.inst;
          create = create();
          return effect.destroy = create;
        }
      }, callCreateInDEV = callCreate["react-stack-bottom-frame"].bind(callCreate), callDestroy = {
        "react-stack-bottom-frame": function(current2, nearestMountedAncestor, destroy) {
          try {
            destroy();
          } catch (error) {
            captureCommitPhaseError(current2, nearestMountedAncestor, error);
          }
        }
      }, callDestroyInDEV = callDestroy["react-stack-bottom-frame"].bind(callDestroy), callLazyInit = {
        "react-stack-bottom-frame": function(lazy) {
          var init = lazy._init;
          return init(lazy._payload);
        }
      }, callLazyInitInDEV = callLazyInit["react-stack-bottom-frame"].bind(callLazyInit), thenableState = null, thenableIndexCounter = 0, currentDebugInfo = null, didWarnAboutMaps;
      var didWarnAboutGenerators = didWarnAboutMaps = false;
      var ownerHasKeyUseWarning = {};
      var ownerHasFunctionTypeWarning = {};
      var ownerHasSymbolTypeWarning = {};
      warnForMissingKey = function(returnFiber, workInProgress2, child) {
        if (null !== child && "object" === typeof child && child._store && (!child._store.validated && null == child.key || 2 === child._store.validated)) {
          if ("object" !== typeof child._store)
            throw Error(
              "React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue."
            );
          child._store.validated = 1;
          var componentName2 = getComponentNameFromFiber(returnFiber), componentKey = componentName2 || "null";
          if (!ownerHasKeyUseWarning[componentKey]) {
            ownerHasKeyUseWarning[componentKey] = true;
            child = child._owner;
            returnFiber = returnFiber._debugOwner;
            var currentComponentErrorInfo = "";
            returnFiber && "number" === typeof returnFiber.tag && (componentKey = getComponentNameFromFiber(returnFiber)) && (currentComponentErrorInfo = "\n\nCheck the render method of `" + componentKey + "`.");
            currentComponentErrorInfo || componentName2 && (currentComponentErrorInfo = "\n\nCheck the top-level render call using <" + componentName2 + ">.");
            var childOwnerAppendix = "";
            null != child && returnFiber !== child && (componentName2 = null, "number" === typeof child.tag ? componentName2 = getComponentNameFromFiber(child) : "string" === typeof child.name && (componentName2 = child.name), componentName2 && (childOwnerAppendix = " It was passed a child from " + componentName2 + "."));
            runWithFiberInDEV(workInProgress2, function() {
              console.error(
                'Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.',
                currentComponentErrorInfo,
                childOwnerAppendix
              );
            });
          }
        }
      };
      var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), suspenseHandlerStackCursor = createCursor(null), shellBoundary = null, SubtreeSuspenseContextMask = 1, ForceSuspenseFallback = 2, suspenseStackCursor = createCursor(0), fakeInternalInstance = {};
      var didWarnAboutStateAssignmentForComponent = /* @__PURE__ */ new Set();
      var didWarnAboutUninitializedState = /* @__PURE__ */ new Set();
      var didWarnAboutGetSnapshotBeforeUpdateWithoutDidUpdate = /* @__PURE__ */ new Set();
      var didWarnAboutLegacyLifecyclesAndDerivedState = /* @__PURE__ */ new Set();
      var didWarnAboutDirectlyAssigningPropsToState = /* @__PURE__ */ new Set();
      var didWarnAboutUndefinedDerivedState = /* @__PURE__ */ new Set();
      var didWarnAboutContextTypes$1 = /* @__PURE__ */ new Set();
      var didWarnAboutChildContextTypes = /* @__PURE__ */ new Set();
      var didWarnAboutInvalidateContextType = /* @__PURE__ */ new Set();
      var didWarnOnInvalidCallback = /* @__PURE__ */ new Set();
      Object.freeze(fakeInternalInstance);
      var classComponentUpdater = {
        enqueueSetState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst), update = createUpdate(lane);
          update.payload = payload;
          void 0 !== callback && null !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
          markStateUpdateScheduled(inst, lane);
        },
        enqueueReplaceState: function(inst, payload, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst), update = createUpdate(lane);
          update.tag = ReplaceState;
          update.payload = payload;
          void 0 !== callback && null !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
          payload = enqueueUpdate(inst, update, lane);
          null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
          markStateUpdateScheduled(inst, lane);
        },
        enqueueForceUpdate: function(inst, callback) {
          inst = inst._reactInternals;
          var lane = requestUpdateLane(inst), update = createUpdate(lane);
          update.tag = ForceUpdate;
          void 0 !== callback && null !== callback && (warnOnInvalidCallback(callback), update.callback = callback);
          callback = enqueueUpdate(inst, update, lane);
          null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
          null !== injectedProfilingHooks && "function" === typeof injectedProfilingHooks.markForceUpdateScheduled && injectedProfilingHooks.markForceUpdateScheduled(inst, lane);
        }
      }, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
          var event = new window.ErrorEvent("error", {
            bubbles: true,
            cancelable: true,
            message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
            error
          });
          if (!window.dispatchEvent(event))
            return;
        } else if ("object" === typeof process && "function" === typeof process.emit) {
          process.emit("uncaughtException", error);
          return;
        }
        console.error(error);
      }, componentName = null, errorBoundaryName = null, SelectiveHydrationException = Error(
        "This is not a real error. It's an implementation detail of React's selective hydration feature. If this leaks into userspace, it's a bug in React. Please file an issue."
      ), didReceiveUpdate = false;
      var didWarnAboutBadClass = {};
      var didWarnAboutContextTypeOnFunctionComponent = {};
      var didWarnAboutContextTypes = {};
      var didWarnAboutGetDerivedStateOnFunctionComponent = {};
      var didWarnAboutReassigningProps = false;
      var didWarnAboutRevealOrder = {};
      var didWarnAboutTailOptions = {};
      var SUSPENDED_MARKER = {
        dehydrated: null,
        treeContext: null,
        retryLane: 0,
        hydrationErrors: null
      }, hasWarnedAboutUsingNoValuePropOnContextProvider = false, didWarnAboutUndefinedSnapshotBeforeUpdate = null;
      didWarnAboutUndefinedSnapshotBeforeUpdate = /* @__PURE__ */ new Set();
      var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, inProgressLanes = null, inProgressRoot = null, hostParent = null, hostParentIsContainer = false, currentHoistableRoot = null, suspenseyCommitFlag = 8192, DefaultAsyncDispatcher = {
        getCacheForType: function(resourceType) {
          var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
          void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
          return cacheForType;
        },
        getOwner: function() {
          return current;
        }
      };
      if ("function" === typeof Symbol && Symbol.for) {
        var symbolFor = Symbol.for;
        symbolFor("selector.component");
        symbolFor("selector.has_pseudo_class");
        symbolFor("selector.role");
        symbolFor("selector.test_id");
        symbolFor("selector.text");
      }
      var commitHooks = [], PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, NoContext = 0, RenderContext = 2, CommitContext = 4, RootInProgress = 0, RootFatalErrored = 1, RootErrored = 2, RootSuspended = 3, RootSuspendedWithDelay = 4, RootSuspendedAtTheShell = 6, RootCompleted = 5, executionContext = NoContext, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, NotSuspended = 0, SuspendedOnError = 1, SuspendedOnData = 2, SuspendedOnImmediate = 3, SuspendedOnInstance = 4, SuspendedOnInstanceAndReadyToContinue = 5, SuspendedOnDeprecatedThrowPromise = 6, SuspendedAndReadyToContinue = 7, SuspendedOnHydration = 8, SuspendedOnAction = 9, workInProgressSuspendedReason = NotSuspended, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = RootInProgress, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, FALLBACK_THROTTLE_MS = 300, workInProgressRootRenderTargetTime = Infinity, RENDER_TIMEOUT_MS = 500, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, IMMEDIATE_COMMIT = 0, SUSPENDED_COMMIT = 1, THROTTLED_COMMIT = 2, NO_PENDING_EFFECTS = 0, PENDING_MUTATION_PHASE = 1, PENDING_LAYOUT_PHASE = 2, PENDING_AFTER_MUTATION_PHASE = 3, PENDING_SPAWNED_WORK = 4, PENDING_PASSIVE_PHASE = 5, pendingEffectsStatus = 0, pendingEffectsRoot = null, pendingFinishedWork = null, pendingEffectsLanes = 0, pendingEffectsRemainingLanes = 0, pendingPassiveTransitions = null, pendingRecoverableErrors = null, NESTED_UPDATE_LIMIT = 50, nestedUpdateCount = 0, rootWithNestedUpdates = null, isFlushingPassiveEffects = false, didScheduleUpdateDuringPassiveEffects = false, NESTED_PASSIVE_UPDATE_LIMIT = 50, nestedPassiveUpdateCount = 0, rootWithPassiveNestedUpdates = null, isRunningInsertionEffect = false, didWarnStateUpdateForNotYetMountedComponent = null, didWarnAboutUpdateInRender = false;
      var didWarnAboutUpdateInRenderForAnotherComponent = /* @__PURE__ */ new Set();
      var fakeActCallbackNode$1 = {}, firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, didScheduleMicrotask_act = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0, fakeActCallbackNode = {};
      (function() {
        for (var i = 0; i < simpleEventPluginEvents.length; i++) {
          var eventName = simpleEventPluginEvents[i], domEventName = eventName.toLowerCase();
          eventName = eventName[0].toUpperCase() + eventName.slice(1);
          registerSimpleEvent(domEventName, "on" + eventName);
        }
        registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
        registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
        registerSimpleEvent(ANIMATION_START, "onAnimationStart");
        registerSimpleEvent("dblclick", "onDoubleClick");
        registerSimpleEvent("focusin", "onFocus");
        registerSimpleEvent("focusout", "onBlur");
        registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
        registerSimpleEvent(TRANSITION_START, "onTransitionStart");
        registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
        registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
      })();
      registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
      registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
      registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
      registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
      registerTwoPhaseEvent(
        "onChange",
        "change click focusin focusout input keydown keyup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent(
        "onSelect",
        "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
          " "
        )
      );
      registerTwoPhaseEvent("onBeforeInput", [
        "compositionend",
        "keypress",
        "textInput",
        "paste"
      ]);
      registerTwoPhaseEvent(
        "onCompositionEnd",
        "compositionend focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionStart",
        "compositionstart focusout keydown keypress keyup mousedown".split(" ")
      );
      registerTwoPhaseEvent(
        "onCompositionUpdate",
        "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
      );
      var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ), nonDelegatedEvents = new Set(
        "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
      ), listeningMarker = "_reactListening" + Math.random().toString(36).slice(2), didWarnControlledToUncontrolled = false, didWarnUncontrolledToControlled = false, didWarnFormActionType = false, didWarnFormActionName = false, didWarnFormActionTarget = false, didWarnFormActionMethod = false, didWarnPopoverTargetObject = false;
      var didWarnForNewBooleanPropsWithEmptyValue = {};
      var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g, xlinkNamespace = "http://www.w3.org/1999/xlink", xmlNamespace = "http://www.w3.org/XML/1998/namespace", EXPECTED_FORM_ACTION_URL = "javascript:throw new Error('React form unexpectedly submitted.')", SUPPRESS_HYDRATION_WARNING = "suppressHydrationWarning", SUSPENSE_START_DATA = "$", SUSPENSE_END_DATA = "/$", SUSPENSE_PENDING_START_DATA = "$?", SUSPENSE_FALLBACK_START_DATA = "$!", PREAMBLE_CONTRIBUTION_HTML = 1, PREAMBLE_CONTRIBUTION_BODY = 2, PREAMBLE_CONTRIBUTION_HEAD = 4, FORM_STATE_IS_MATCHING = "F!", FORM_STATE_IS_NOT_MATCHING = "F", DOCUMENT_READY_STATE_COMPLETE = "complete", STYLE = "style", HostContextNamespaceNone = 0, HostContextNamespaceSvg = 1, HostContextNamespaceMath = 2, eventsEnabled = null, selectionInformation = null, warnedUnknownTags = { dialog: true, webview: true }, currentPopstateTransitionEvent = null, scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, noTimeout = -1, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
        return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
      } : scheduleTimeout, previousHydratableOnEnteringScopedSingleton = null, NotLoaded = 0, Loaded = 1, Errored = 2, Settled = 3, Inserted = 4, preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set(), previousDispatcher = ReactDOMSharedInternals.d;
      ReactDOMSharedInternals.d = {
        f: function() {
          var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
          return previousWasRendering || wasRendering;
        },
        r: function(form) {
          var formInst = getInstanceFromNode(form);
          null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
        },
        D: function(href) {
          previousDispatcher.D(href);
          preconnectAs("dns-prefetch", href, null);
        },
        C: function(href, crossOrigin) {
          previousDispatcher.C(href, crossOrigin);
          preconnectAs("preconnect", href, crossOrigin);
        },
        L: function(href, as, options) {
          previousDispatcher.L(href, as, options);
          var ownerDocument = globalDocument;
          if (ownerDocument && href && as) {
            var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
            "image" === as ? options && options.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
              options.imageSrcSet
            ) + '"]', "string" === typeof options.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
              options.imageSizes
            ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
            var key = preloadSelector;
            switch (as) {
              case "style":
                key = getStyleKey(href);
                break;
              case "script":
                key = getScriptKey(href);
            }
            preloadPropsMap.has(key) || (href = assign(
              {
                rel: "preload",
                href: "image" === as && options && options.imageSrcSet ? void 0 : href,
                as
              },
              options
            ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(
              getStylesheetSelectorFromKey(key)
            ) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
          }
        },
        m: function(href, options) {
          previousDispatcher.m(href, options);
          var ownerDocument = globalDocument;
          if (ownerDocument && href) {
            var as = options && "string" === typeof options.as ? options.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
            switch (as) {
              case "audioworklet":
              case "paintworklet":
              case "serviceworker":
              case "sharedworker":
              case "worker":
              case "script":
                key = getScriptKey(href);
            }
            if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
              switch (as) {
                case "audioworklet":
                case "paintworklet":
                case "serviceworker":
                case "sharedworker":
                case "worker":
                case "script":
                  if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
                    return;
              }
              as = ownerDocument.createElement("link");
              setInitialProperties(as, "link", href);
              markNodeAsHoistable(as);
              ownerDocument.head.appendChild(as);
            }
          }
        },
        X: function(src, options) {
          previousDispatcher.X(src, options);
          var ownerDocument = globalDocument;
          if (ownerDocument && src) {
            var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
            resource || (resource = ownerDocument.querySelector(
              getScriptSelectorFromKey(key)
            ), resource || (src = assign({ src, async: true }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
              type: "script",
              instance: resource,
              count: 1,
              state: null
            }, scripts.set(key, resource));
          }
        },
        S: function(href, precedence, options) {
          previousDispatcher.S(href, precedence, options);
          var ownerDocument = globalDocument;
          if (ownerDocument && href) {
            var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
            precedence = precedence || "default";
            var resource = styles.get(key);
            if (!resource) {
              var state = { loading: NotLoaded, preload: null };
              if (resource = ownerDocument.querySelector(
                getStylesheetSelectorFromKey(key)
              ))
                state.loading = Loaded | Inserted;
              else {
                href = assign(
                  {
                    rel: "stylesheet",
                    href,
                    "data-precedence": precedence
                  },
                  options
                );
                (options = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options);
                var link = resource = ownerDocument.createElement("link");
                markNodeAsHoistable(link);
                setInitialProperties(link, "link", href);
                link._p = new Promise(function(resolve, reject) {
                  link.onload = resolve;
                  link.onerror = reject;
                });
                link.addEventListener("load", function() {
                  state.loading |= Loaded;
                });
                link.addEventListener("error", function() {
                  state.loading |= Errored;
                });
                state.loading |= Inserted;
                insertStylesheet(resource, precedence, ownerDocument);
              }
              resource = {
                type: "stylesheet",
                instance: resource,
                count: 1,
                state
              };
              styles.set(key, resource);
            }
          }
        },
        M: function(src, options) {
          previousDispatcher.M(src, options);
          var ownerDocument = globalDocument;
          if (ownerDocument && src) {
            var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
            resource || (resource = ownerDocument.querySelector(
              getScriptSelectorFromKey(key)
            ), resource || (src = assign({ src, async: true, type: "module" }, options), (options = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
              type: "script",
              instance: resource,
              count: 1,
              state: null
            }, scripts.set(key, resource));
          }
        }
      };
      var globalDocument = "undefined" === typeof document ? null : document, tagCaches = null, suspendedState = null, LAST_PRECEDENCE = null, precedencesByRoot = null, NotPendingTransition = NotPending, HostTransitionContext = {
        $$typeof: REACT_CONTEXT_TYPE,
        Provider: null,
        Consumer: null,
        _currentValue: NotPendingTransition,
        _currentValue2: NotPendingTransition,
        _threadCount: 0
      }, badgeFormat = "%c%s%c ", badgeStyle = "background: #e6e6e6;background: light-dark(rgba(0,0,0,0.1), rgba(255,255,255,0.25));color: #000000;color: light-dark(#000000, #ffffff);border-radius: 2px", resetStyle = "", pad = " ", bind = Function.prototype.bind;
      var didWarnAboutNestedUpdates = false;
      var overrideHookState = null, overrideHookStateDeletePath = null, overrideHookStateRenamePath = null, overrideProps = null, overridePropsDeletePath = null, overridePropsRenamePath = null, scheduleUpdate = null, setErrorHandler = null, setSuspenseHandler = null;
      overrideHookState = function(fiber, id, path, value) {
        id = findHook(fiber, id);
        null !== id && (path = copyWithSetImpl(id.memoizedState, path, 0, value), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = assign({}, fiber.memoizedProps), path = enqueueConcurrentRenderForLane(fiber, 2), null !== path && scheduleUpdateOnFiber(path, fiber, 2));
      };
      overrideHookStateDeletePath = function(fiber, id, path) {
        id = findHook(fiber, id);
        null !== id && (path = copyWithDeleteImpl(id.memoizedState, path, 0), id.memoizedState = path, id.baseState = path, fiber.memoizedProps = assign({}, fiber.memoizedProps), path = enqueueConcurrentRenderForLane(fiber, 2), null !== path && scheduleUpdateOnFiber(path, fiber, 2));
      };
      overrideHookStateRenamePath = function(fiber, id, oldPath, newPath) {
        id = findHook(fiber, id);
        null !== id && (oldPath = copyWithRename(id.memoizedState, oldPath, newPath), id.memoizedState = oldPath, id.baseState = oldPath, fiber.memoizedProps = assign({}, fiber.memoizedProps), oldPath = enqueueConcurrentRenderForLane(fiber, 2), null !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2));
      };
      overrideProps = function(fiber, path, value) {
        fiber.pendingProps = copyWithSetImpl(fiber.memoizedProps, path, 0, value);
        fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
        path = enqueueConcurrentRenderForLane(fiber, 2);
        null !== path && scheduleUpdateOnFiber(path, fiber, 2);
      };
      overridePropsDeletePath = function(fiber, path) {
        fiber.pendingProps = copyWithDeleteImpl(fiber.memoizedProps, path, 0);
        fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
        path = enqueueConcurrentRenderForLane(fiber, 2);
        null !== path && scheduleUpdateOnFiber(path, fiber, 2);
      };
      overridePropsRenamePath = function(fiber, oldPath, newPath) {
        fiber.pendingProps = copyWithRename(
          fiber.memoizedProps,
          oldPath,
          newPath
        );
        fiber.alternate && (fiber.alternate.pendingProps = fiber.pendingProps);
        oldPath = enqueueConcurrentRenderForLane(fiber, 2);
        null !== oldPath && scheduleUpdateOnFiber(oldPath, fiber, 2);
      };
      scheduleUpdate = function(fiber) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
      };
      setErrorHandler = function(newShouldErrorImpl) {
        shouldErrorImpl = newShouldErrorImpl;
      };
      setSuspenseHandler = function(newShouldSuspendImpl) {
        shouldSuspendImpl = newShouldSuspendImpl;
      };
      var _enabled = true, return_targetInst = null, hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " "
      ), lastScheduledReplayQueue = null;
      ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
        var root2 = this._internalRoot;
        if (null === root2)
          throw Error("Cannot update an unmounted root.");
        var args = arguments;
        "function" === typeof args[1] ? console.error(
          "does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
        ) : isValidContainer(args[1]) ? console.error(
          "You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."
        ) : "undefined" !== typeof args[1] && console.error(
          "You passed a second argument to root.render(...) but it only accepts one argument."
        );
        args = children;
        var current2 = root2.current, lane = requestUpdateLane(current2);
        updateContainerImpl(current2, lane, args, root2, null, null);
      };
      ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
        var args = arguments;
        "function" === typeof args[0] && console.error(
          "does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."
        );
        args = this._internalRoot;
        if (null !== args) {
          this._internalRoot = null;
          var container = args.containerInfo;
          (executionContext & (RenderContext | CommitContext)) !== NoContext && console.error(
            "Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."
          );
          updateContainerImpl(args.current, 2, null, args, null, null);
          flushSyncWork$1();
          container[internalContainerInstanceKey] = null;
        }
      };
      ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
        if (target) {
          var updatePriority = resolveUpdatePriority();
          target = { blockedOn: null, target, priority: updatePriority };
          for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++)
            ;
          queuedExplicitHydrationTargets.splice(i, 0, target);
          0 === i && attemptExplicitHydrationTarget(target);
        }
      };
      (function() {
        var isomorphicReactPackageVersion = React.version;
        if ("19.1.0" !== isomorphicReactPackageVersion)
          throw Error(
            'Incompatible React versions: The "react" and "react-dom" packages must have the exact same version. Instead got:\n  - react:      ' + (isomorphicReactPackageVersion + "\n  - react-dom:  19.1.0\nLearn more: https://react.dev/warnings/version-mismatch")
          );
      })();
      "function" === typeof Map && null != Map.prototype && "function" === typeof Map.prototype.forEach && "function" === typeof Set && null != Set.prototype && "function" === typeof Set.prototype.clear && "function" === typeof Set.prototype.forEach || console.error(
        "React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://react.dev/link/react-polyfills"
      );
      ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
        var fiber = componentOrElement._reactInternals;
        if (void 0 === fiber) {
          if ("function" === typeof componentOrElement.render)
            throw Error("Unable to find node on an unmounted component.");
          componentOrElement = Object.keys(componentOrElement).join(",");
          throw Error(
            "Argument appears to not be a ReactComponent. Keys: " + componentOrElement
          );
        }
        componentOrElement = findCurrentFiberUsingSlowPath(fiber);
        componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
        componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
        return componentOrElement;
      };
      if (!function() {
        var internals = {
          bundleType: 1,
          version: "19.1.0",
          rendererPackageName: "react-dom",
          currentDispatcherRef: ReactSharedInternals,
          reconcilerVersion: "19.1.0"
        };
        internals.overrideHookState = overrideHookState;
        internals.overrideHookStateDeletePath = overrideHookStateDeletePath;
        internals.overrideHookStateRenamePath = overrideHookStateRenamePath;
        internals.overrideProps = overrideProps;
        internals.overridePropsDeletePath = overridePropsDeletePath;
        internals.overridePropsRenamePath = overridePropsRenamePath;
        internals.scheduleUpdate = scheduleUpdate;
        internals.setErrorHandler = setErrorHandler;
        internals.setSuspenseHandler = setSuspenseHandler;
        internals.scheduleRefresh = scheduleRefresh;
        internals.scheduleRoot = scheduleRoot;
        internals.setRefreshHandler = setRefreshHandler;
        internals.getCurrentFiber = getCurrentFiberForDevTools;
        internals.getLaneLabelMap = getLaneLabelMap;
        internals.injectProfilingHooks = injectProfilingHooks;
        return injectInternals(internals);
      }() && canUseDOM && window.top === window.self && (-1 < navigator.userAgent.indexOf("Chrome") && -1 === navigator.userAgent.indexOf("Edge") || -1 < navigator.userAgent.indexOf("Firefox"))) {
        var protocol = window.location.protocol;
        /^(https?|file):$/.test(protocol) && console.info(
          "%cDownload the React DevTools for a better development experience: https://react.dev/link/react-devtools" + ("file:" === protocol ? "\nYou might need to use a local HTTP server (instead of file://): https://react.dev/link/react-devtools-faq" : ""),
          "font-weight:bold"
        );
      }
      exports.createRoot = function(container, options) {
        if (!isValidContainer(container))
          throw Error("Target container is not a DOM element.");
        warnIfReactDOMContainerInDEV(container);
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null;
        null !== options && void 0 !== options && (options.hydrate ? console.warn(
          "hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."
        ) : "object" === typeof options && null !== options && options.$$typeof === REACT_ELEMENT_TYPE && console.error(
          "You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"
        ), true === options.unstable_strictMode && (isStrictMode = true), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError), void 0 !== options.unstable_transitionCallbacks && (transitionCallbacks = options.unstable_transitionCallbacks));
        options = createFiberRoot(
          container,
          1,
          false,
          null,
          null,
          isStrictMode,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          transitionCallbacks,
          null
        );
        container[internalContainerInstanceKey] = options.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMRoot(options);
      };
      exports.hydrateRoot = function(container, initialChildren, options) {
        if (!isValidContainer(container))
          throw Error("Target container is not a DOM element.");
        warnIfReactDOMContainerInDEV(container);
        void 0 === initialChildren && console.error(
          "Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)"
        );
        var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null, formState = null;
        null !== options && void 0 !== options && (true === options.unstable_strictMode && (isStrictMode = true), void 0 !== options.identifierPrefix && (identifierPrefix = options.identifierPrefix), void 0 !== options.onUncaughtError && (onUncaughtError = options.onUncaughtError), void 0 !== options.onCaughtError && (onCaughtError = options.onCaughtError), void 0 !== options.onRecoverableError && (onRecoverableError = options.onRecoverableError), void 0 !== options.unstable_transitionCallbacks && (transitionCallbacks = options.unstable_transitionCallbacks), void 0 !== options.formState && (formState = options.formState));
        initialChildren = createFiberRoot(
          container,
          1,
          true,
          initialChildren,
          null != options ? options : null,
          isStrictMode,
          identifierPrefix,
          onUncaughtError,
          onCaughtError,
          onRecoverableError,
          transitionCallbacks,
          formState
        );
        initialChildren.context = getContextForSubtree(null);
        options = initialChildren.current;
        isStrictMode = requestUpdateLane(options);
        isStrictMode = getBumpedLaneForHydrationByLane(isStrictMode);
        identifierPrefix = createUpdate(isStrictMode);
        identifierPrefix.callback = null;
        enqueueUpdate(options, identifierPrefix, isStrictMode);
        options = isStrictMode;
        initialChildren.current.lanes = options;
        markRootUpdated$1(initialChildren, options);
        ensureRootIsScheduled(initialChildren);
        container[internalContainerInstanceKey] = initialChildren.current;
        listenToAllSupportedEvents(container);
        return new ReactDOMHydrationRoot(initialChildren);
      };
      exports.version = "19.1.0";
      "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
    })();
  }
});

// node_modules/react-dom/client.js
var require_client = __commonJS({
  "node_modules/react-dom/client.js"(exports, module) {
    if (false) {
      checkDCE();
      module.exports = null;
    } else {
      module.exports = require_react_dom_client_development();
    }
  }
});
export default require_client();
/*! Bundled license information:

scheduler/cjs/scheduler.development.js:
  (**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.development.js:
  (**
   * @license React
   * react-dom-client.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
//# sourceMappingURL=react-dom_client.js.map
