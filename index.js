var app = (function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var dist = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	   module.exports = factory() ;
	}(commonjsGlobal, function () {
	  function _classCallCheck(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties(Constructor, staticProps);
	    return Constructor;
	  }

	  function _defineProperty(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  function ownKeys(object, enumerableOnly) {
	    var keys = Object.keys(object);

	    if (Object.getOwnPropertySymbols) {
	      var symbols = Object.getOwnPropertySymbols(object);
	      if (enumerableOnly) symbols = symbols.filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	      });
	      keys.push.apply(keys, symbols);
	    }

	    return keys;
	  }

	  function _objectSpread2(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i] != null ? arguments[i] : {};

	      if (i % 2) {
	        ownKeys(source, true).forEach(function (key) {
	          _defineProperty(target, key, source[key]);
	        });
	      } else if (Object.getOwnPropertyDescriptors) {
	        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
	      } else {
	        ownKeys(source).forEach(function (key) {
	          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	        });
	      }
	    }

	    return target;
	  }

	  function _toConsumableArray(arr) {
	    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
	  }

	  function _arrayWithoutHoles(arr) {
	    if (Array.isArray(arr)) {
	      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

	      return arr2;
	    }
	  }

	  function _iterableToArray(iter) {
	    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
	  }

	  function _nonIterableSpread() {
	    throw new TypeError("Invalid attempt to spread non-iterable instance");
	  }

	  function styleInject(css, ref) {
	    if (ref === void 0) ref = {};
	    var insertAt = ref.insertAt;

	    if (!css || typeof document === 'undefined') {
	      return;
	    }

	    var head = document.head || document.getElementsByTagName('head')[0];
	    var style = document.createElement('style');
	    style.type = 'text/css';

	    if (insertAt === 'top') {
	      if (head.firstChild) {
	        head.insertBefore(style, head.firstChild);
	      } else {
	        head.appendChild(style);
	      }
	    } else {
	      head.appendChild(style);
	    }

	    if (style.styleSheet) {
	      style.styleSheet.cssText = css;
	    } else {
	      style.appendChild(document.createTextNode(css));
	    }
	  }

	  var css = ".emoji-picker {\n  border: 1px solid #CCCCCC;\n  border-radius: 5px;\n  background: #FFFFFF;\n  width: 23rem;\n  font-family: Arial, Helvetica, sans-serif;\n  opacity: 0;\n  transition: opacity 0.3s;\n  overflow: hidden;\n}\n\n.emoji-picker.visible {\n  opacity: 1;\n}\n\n.emoji-picker__content {\n  padding: 0.5em;\n  height: 20rem;\n  overflow: hidden;\n  position: relative;\n}\n\n.emoji-picker__preview {\n  height: 2em;\n  padding: 0.5em;\n  border-top: 1px solid #CCCCCC;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.emoji-picker__preview-emoji {\n  font-size: 2em;\n  margin-right: 0.25em;\n  font-family: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\";\n}\n\n.emoji-picker__preview-name {\n  color: #666666;\n  font-size: 0.85em;\n  overflow-wrap: break-word;\n  word-break: break-all;\n}\n\n.emoji-picker__tabs {\n  margin: 0;\n  padding: 0;\n  display: flex;\n}\n\n.emoji-picker__tab {\n  font-size: 1.5rem;\n  list-style: none;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  flex-grow: 1;\n  text-align: center;\n  color: #666666;\n  border-radius: 3px;\n  transition: background 0.25s;\n}\n\n.emoji-picker__tab:hover {\n  background: #E8F4F9;\n}\n\n.emoji-picker__tab svg {\n  padding: 0.5rem;\n}\n\n.emoji-picker__tab.active {\n  background: #4F81E5;\n  color: #FFFFFF;\n}\n\n.emoji-picker__tab-body {\n  margin-top: 0.5em;\n  transform: translateX(25rem);\n  transition: transform 0.25s;\n  position: absolute;\n}\n\n.emoji-picker__tab-body h2 {\n  font-size: 0.85rem;\n  color: #333333;\n  margin: 0;\n  text-align: left;\n}\n\n.emoji-picker__tab-body.active {\n  display: block;\n  transform: translateX(0);\n}\n\n.emoji-picker__emojis {\n  height: 16.5rem;\n  overflow-y: scroll;\n  display: flex;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  width: calc((1.8rem * 1.5 * 8) + 0.5rem);\n  margin: auto;\n}\n\n.emoji-picker__emojis.search-results {\n  height: 21rem;\n}\n\n.emoji-picker__emoji {\n  background: transparent;\n  border: none;\n  border-radius: 5px;\n  cursor: pointer;\n  font-size: 1.8rem;\n  width: 1.5em;\n  height: 1.5em;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  font-family: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\";\n}\n\n.emoji-picker__emoji:focus, .emoji-picker__emoji:hover {\n  background: #E8F4F9;\n}\n\n.emoji-picker__search-container {\n  margin: 0.5em;\n  position: relative;\n  height: 2em;\n  display: flex;\n}\n\n.emoji-picker__search {\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 3px;\n  border: 1px solid #CCCCCC;\n  padding-right: 2em;\n  padding: 0.5em 2.25em 0.5em 0.5em;\n  font-size: 0.85rem;\n  outline: none;\n}\n\n.emoji-picker__search:focus {\n  border: 1px solid #4F81E5;\n}\n\n.emoji-picker__search-icon {\n  position: absolute;\n  color: #CCCCCC;\n  width: 1em;\n  height: 1em;\n  right: 0.75em;\n  top: calc(50% - 0.5em);\n}\n\n.emoji-picker__search-not-found {\n  color: #666666;\n  text-align: center;\n  margin-top: 2em;\n}\n\n.emoji-picker__search-not-found-icon {\n  font-size: 3em;\n}\n\n.emoji-picker__search-not-found h2 {\n  margin: 0.5em 0;\n  font-size: 1em;\n}\n\n.emoji-picker__variant-overlay {\n  background: rgba(0, 0, 0, 0.7);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 23rem;\n  height: 27.5rem;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.emoji-picker__variant-popup {\n  background: #FFFFFF;\n  margin: 0.5em;\n  padding: 0.5em;\n  text-align: center;\n}\n\n.emoji-picker__variant-popup-close-button {\n  cursor: pointer;\n  background: transparent;\n  border: none;\n  position: absolute;\n  right: 0.5em;\n  padding: 0;\n  top: calc(50% - 0.75em);\n  height: 1.5em;\n  width: 1.5em;\n  font-size: 1.5em;\n}\n";
	  styleInject(css);

	  var candidateSelectors = ['input', 'select', 'textarea', 'a[href]', 'button', '[tabindex]', 'audio[controls]', 'video[controls]', '[contenteditable]:not([contenteditable="false"])'];
	  var candidateSelector = candidateSelectors.join(',');
	  var matches = typeof Element === 'undefined' ? function () {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

	  function tabbable(el, options) {
	    options = options || {};
	    var regularTabbables = [];
	    var orderedTabbables = [];
	    var candidates = el.querySelectorAll(candidateSelector);

	    if (options.includeContainer) {
	      if (matches.call(el, candidateSelector)) {
	        candidates = Array.prototype.slice.apply(candidates);
	        candidates.unshift(el);
	      }
	    }

	    var i, candidate, candidateTabindex;

	    for (i = 0; i < candidates.length; i++) {
	      candidate = candidates[i];
	      if (!isNodeMatchingSelectorTabbable(candidate)) continue;
	      candidateTabindex = getTabindex(candidate);

	      if (candidateTabindex === 0) {
	        regularTabbables.push(candidate);
	      } else {
	        orderedTabbables.push({
	          documentOrder: i,
	          tabIndex: candidateTabindex,
	          node: candidate
	        });
	      }
	    }

	    var tabbableNodes = orderedTabbables.sort(sortOrderedTabbables).map(function (a) {
	      return a.node;
	    }).concat(regularTabbables);
	    return tabbableNodes;
	  }

	  tabbable.isTabbable = isTabbable;
	  tabbable.isFocusable = isFocusable;

	  function isNodeMatchingSelectorTabbable(node) {
	    if (!isNodeMatchingSelectorFocusable(node) || isNonTabbableRadio(node) || getTabindex(node) < 0) {
	      return false;
	    }

	    return true;
	  }

	  function isTabbable(node) {
	    if (!node) throw new Error('No node provided');
	    if (matches.call(node, candidateSelector) === false) return false;
	    return isNodeMatchingSelectorTabbable(node);
	  }

	  function isNodeMatchingSelectorFocusable(node) {
	    if (node.disabled || isHiddenInput(node) || isHidden(node)) {
	      return false;
	    }

	    return true;
	  }

	  var focusableCandidateSelector = candidateSelectors.concat('iframe').join(',');

	  function isFocusable(node) {
	    if (!node) throw new Error('No node provided');
	    if (matches.call(node, focusableCandidateSelector) === false) return false;
	    return isNodeMatchingSelectorFocusable(node);
	  }

	  function getTabindex(node) {
	    var tabindexAttr = parseInt(node.getAttribute('tabindex'), 10);
	    if (!isNaN(tabindexAttr)) return tabindexAttr; // Browsers do not return `tabIndex` correctly for contentEditable nodes;
	    // so if they don't have a tabindex attribute specifically set, assume it's 0.

	    if (isContentEditable(node)) return 0;
	    return node.tabIndex;
	  }

	  function sortOrderedTabbables(a, b) {
	    return a.tabIndex === b.tabIndex ? a.documentOrder - b.documentOrder : a.tabIndex - b.tabIndex;
	  }

	  function isContentEditable(node) {
	    return node.contentEditable === 'true';
	  }

	  function isInput(node) {
	    return node.tagName === 'INPUT';
	  }

	  function isHiddenInput(node) {
	    return isInput(node) && node.type === 'hidden';
	  }

	  function isRadio(node) {
	    return isInput(node) && node.type === 'radio';
	  }

	  function isNonTabbableRadio(node) {
	    return isRadio(node) && !isTabbableRadio(node);
	  }

	  function getCheckedRadio(nodes) {
	    for (var i = 0; i < nodes.length; i++) {
	      if (nodes[i].checked) {
	        return nodes[i];
	      }
	    }
	  }

	  function isTabbableRadio(node) {
	    if (!node.name) return true; // This won't account for the edge case where you have radio groups with the same
	    // in separate forms on the same page.

	    var radioSet = node.ownerDocument.querySelectorAll('input[type="radio"][name="' + node.name + '"]');
	    var checked = getCheckedRadio(radioSet);
	    return !checked || checked === node;
	  }

	  function isHidden(node) {
	    // offsetParent being null will allow detecting cases where an element is invisible or inside an invisible element,
	    // as long as the element does not use position: fixed. For them, their visibility has to be checked directly as well.
	    return node.offsetParent === null || getComputedStyle(node).visibility === 'hidden';
	  }

	  var tabbable_1 = tabbable;

	  var immutable = extend;
	  var hasOwnProperty = Object.prototype.hasOwnProperty;

	  function extend() {
	    var target = {};

	    for (var i = 0; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  }

	  var activeFocusDelay;

	  var activeFocusTraps = function () {
	    var trapQueue = [];
	    return {
	      activateTrap: function (trap) {
	        if (trapQueue.length > 0) {
	          var activeTrap = trapQueue[trapQueue.length - 1];

	          if (activeTrap !== trap) {
	            activeTrap.pause();
	          }
	        }

	        var trapIndex = trapQueue.indexOf(trap);

	        if (trapIndex === -1) {
	          trapQueue.push(trap);
	        } else {
	          // move this existing trap to the front of the queue
	          trapQueue.splice(trapIndex, 1);
	          trapQueue.push(trap);
	        }
	      },
	      deactivateTrap: function (trap) {
	        var trapIndex = trapQueue.indexOf(trap);

	        if (trapIndex !== -1) {
	          trapQueue.splice(trapIndex, 1);
	        }

	        if (trapQueue.length > 0) {
	          trapQueue[trapQueue.length - 1].unpause();
	        }
	      }
	    };
	  }();

	  function focusTrap(element, userOptions) {
	    var doc = document;
	    var container = typeof element === 'string' ? doc.querySelector(element) : element;
	    var config = immutable({
	      returnFocusOnDeactivate: true,
	      escapeDeactivates: true
	    }, userOptions);
	    var state = {
	      firstTabbableNode: null,
	      lastTabbableNode: null,
	      nodeFocusedBeforeActivation: null,
	      mostRecentlyFocusedNode: null,
	      active: false,
	      paused: false
	    };
	    var trap = {
	      activate: activate,
	      deactivate: deactivate,
	      pause: pause,
	      unpause: unpause
	    };
	    return trap;

	    function activate(activateOptions) {
	      if (state.active) return;
	      updateTabbableNodes();
	      state.active = true;
	      state.paused = false;
	      state.nodeFocusedBeforeActivation = doc.activeElement;
	      var onActivate = activateOptions && activateOptions.onActivate ? activateOptions.onActivate : config.onActivate;

	      if (onActivate) {
	        onActivate();
	      }

	      addListeners();
	      return trap;
	    }

	    function deactivate(deactivateOptions) {
	      if (!state.active) return;
	      clearTimeout(activeFocusDelay);
	      removeListeners();
	      state.active = false;
	      state.paused = false;
	      activeFocusTraps.deactivateTrap(trap);
	      var onDeactivate = deactivateOptions && deactivateOptions.onDeactivate !== undefined ? deactivateOptions.onDeactivate : config.onDeactivate;

	      if (onDeactivate) {
	        onDeactivate();
	      }

	      var returnFocus = deactivateOptions && deactivateOptions.returnFocus !== undefined ? deactivateOptions.returnFocus : config.returnFocusOnDeactivate;

	      if (returnFocus) {
	        delay(function () {
	          tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
	        });
	      }

	      return trap;
	    }

	    function pause() {
	      if (state.paused || !state.active) return;
	      state.paused = true;
	      removeListeners();
	    }

	    function unpause() {
	      if (!state.paused || !state.active) return;
	      state.paused = false;
	      updateTabbableNodes();
	      addListeners();
	    }

	    function addListeners() {
	      if (!state.active) return; // There can be only one listening focus trap at a time

	      activeFocusTraps.activateTrap(trap); // Delay ensures that the focused element doesn't capture the event
	      // that caused the focus trap activation.

	      activeFocusDelay = delay(function () {
	        tryFocus(getInitialFocusNode());
	      });
	      doc.addEventListener('focusin', checkFocusIn, true);
	      doc.addEventListener('mousedown', checkPointerDown, {
	        capture: true,
	        passive: false
	      });
	      doc.addEventListener('touchstart', checkPointerDown, {
	        capture: true,
	        passive: false
	      });
	      doc.addEventListener('click', checkClick, {
	        capture: true,
	        passive: false
	      });
	      doc.addEventListener('keydown', checkKey, {
	        capture: true,
	        passive: false
	      });
	      return trap;
	    }

	    function removeListeners() {
	      if (!state.active) return;
	      doc.removeEventListener('focusin', checkFocusIn, true);
	      doc.removeEventListener('mousedown', checkPointerDown, true);
	      doc.removeEventListener('touchstart', checkPointerDown, true);
	      doc.removeEventListener('click', checkClick, true);
	      doc.removeEventListener('keydown', checkKey, true);
	      return trap;
	    }

	    function getNodeForOption(optionName) {
	      var optionValue = config[optionName];
	      var node = optionValue;

	      if (!optionValue) {
	        return null;
	      }

	      if (typeof optionValue === 'string') {
	        node = doc.querySelector(optionValue);

	        if (!node) {
	          throw new Error('`' + optionName + '` refers to no known node');
	        }
	      }

	      if (typeof optionValue === 'function') {
	        node = optionValue();

	        if (!node) {
	          throw new Error('`' + optionName + '` did not return a node');
	        }
	      }

	      return node;
	    }

	    function getInitialFocusNode() {
	      var node;

	      if (getNodeForOption('initialFocus') !== null) {
	        node = getNodeForOption('initialFocus');
	      } else if (container.contains(doc.activeElement)) {
	        node = doc.activeElement;
	      } else {
	        node = state.firstTabbableNode || getNodeForOption('fallbackFocus');
	      }

	      if (!node) {
	        throw new Error('Your focus-trap needs to have at least one focusable element');
	      }

	      return node;
	    }

	    function getReturnFocusNode(previousActiveElement) {
	      var node = getNodeForOption('setReturnFocus');
	      return node ? node : previousActiveElement;
	    } // This needs to be done on mousedown and touchstart instead of click
	    // so that it precedes the focus event.


	    function checkPointerDown(e) {
	      if (container.contains(e.target)) return;

	      if (config.clickOutsideDeactivates) {
	        deactivate({
	          returnFocus: !tabbable_1.isFocusable(e.target)
	        });
	        return;
	      } // This is needed for mobile devices.
	      // (If we'll only let `click` events through,
	      // then on mobile they will be blocked anyways if `touchstart` is blocked.)


	      if (config.allowOutsideClick && config.allowOutsideClick(e)) {
	        return;
	      }

	      e.preventDefault();
	    } // In case focus escapes the trap for some strange reason, pull it back in.


	    function checkFocusIn(e) {
	      // In Firefox when you Tab out of an iframe the Document is briefly focused.
	      if (container.contains(e.target) || e.target instanceof Document) {
	        return;
	      }

	      e.stopImmediatePropagation();
	      tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
	    }

	    function checkKey(e) {
	      if (config.escapeDeactivates !== false && isEscapeEvent(e)) {
	        e.preventDefault();
	        deactivate();
	        return;
	      }

	      if (isTabEvent(e)) {
	        checkTab(e);
	        return;
	      }
	    } // Hijack Tab events on the first and last focusable nodes of the trap,
	    // in order to prevent focus from escaping. If it escapes for even a
	    // moment it can end up scrolling the page and causing confusion so we
	    // kind of need to capture the action at the keydown phase.


	    function checkTab(e) {
	      updateTabbableNodes();

	      if (e.shiftKey && e.target === state.firstTabbableNode) {
	        e.preventDefault();
	        tryFocus(state.lastTabbableNode);
	        return;
	      }

	      if (!e.shiftKey && e.target === state.lastTabbableNode) {
	        e.preventDefault();
	        tryFocus(state.firstTabbableNode);
	        return;
	      }
	    }

	    function checkClick(e) {
	      if (config.clickOutsideDeactivates) return;
	      if (container.contains(e.target)) return;

	      if (config.allowOutsideClick && config.allowOutsideClick(e)) {
	        return;
	      }

	      e.preventDefault();
	      e.stopImmediatePropagation();
	    }

	    function updateTabbableNodes() {
	      var tabbableNodes = tabbable_1(container);
	      state.firstTabbableNode = tabbableNodes[0] || getInitialFocusNode();
	      state.lastTabbableNode = tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
	    }

	    function tryFocus(node) {
	      if (node === doc.activeElement) return;

	      if (!node || !node.focus) {
	        tryFocus(getInitialFocusNode());
	        return;
	      }

	      node.focus();
	      state.mostRecentlyFocusedNode = node;

	      if (isSelectableInput(node)) {
	        node.select();
	      }
	    }
	  }

	  function isSelectableInput(node) {
	    return node.tagName && node.tagName.toLowerCase() === 'input' && typeof node.select === 'function';
	  }

	  function isEscapeEvent(e) {
	    return e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27;
	  }

	  function isTabEvent(e) {
	    return e.key === 'Tab' || e.keyCode === 9;
	  }

	  function delay(fn) {
	    return setTimeout(fn, 0);
	  }

	  var focusTrap_1 = focusTrap;

	  function E() {// Keep this empty so it's easier to inherit from
	    // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
	  }

	  E.prototype = {
	    on: function (name, callback, ctx) {
	      var e = this.e || (this.e = {});
	      (e[name] || (e[name] = [])).push({
	        fn: callback,
	        ctx: ctx
	      });
	      return this;
	    },
	    once: function (name, callback, ctx) {
	      var self = this;

	      function listener() {
	        self.off(name, listener);
	        callback.apply(ctx, arguments);
	      }
	      listener._ = callback;
	      return this.on(name, listener, ctx);
	    },
	    emit: function (name) {
	      var data = [].slice.call(arguments, 1);
	      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
	      var i = 0;
	      var len = evtArr.length;

	      for (i; i < len; i++) {
	        evtArr[i].fn.apply(evtArr[i].ctx, data);
	      }

	      return this;
	    },
	    off: function (name, callback) {
	      var e = this.e || (this.e = {});
	      var evts = e[name];
	      var liveEvents = [];

	      if (evts && callback) {
	        for (var i = 0, len = evts.length; i < len; i++) {
	          if (evts[i].fn !== callback && evts[i].fn._ !== callback) liveEvents.push(evts[i]);
	        }
	      } // Remove event from queue to prevent memory leak
	      // Suggested by https://github.com/lazd
	      // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910


	      liveEvents.length ? e[name] = liveEvents : delete e[name];
	      return this;
	    }
	  };
	  var tinyEmitter = E;
	  var TinyEmitter = E;
	  tinyEmitter.TinyEmitter = TinyEmitter;

	  function getBoundingClientRect(element) {
	    var rect = element.getBoundingClientRect();
	    return {
	      width: rect.width,
	      height: rect.height,
	      top: rect.top,
	      right: rect.right,
	      bottom: rect.bottom,
	      left: rect.left,
	      x: rect.left,
	      y: rect.top
	    };
	  }

	  function getWindow(node) {
	    if ({}.toString.call(node) !== '[object Window]') {
	      var ownerDocument = node.ownerDocument;
	      return ownerDocument ? ownerDocument.defaultView : window;
	    }

	    return node;
	  }

	  function getWindowScroll(node) {
	    var win = getWindow(node);
	    var scrollLeft = win.pageXOffset;
	    var scrollTop = win.pageYOffset;
	    return {
	      scrollLeft: scrollLeft,
	      scrollTop: scrollTop
	    };
	  }

	  /*:: declare function isElement(node: mixed): boolean %checks(node instanceof
	    Element); */

	  function isElement(node) {
	    var OwnElement = getWindow(node).Element;
	    return node instanceof OwnElement;
	  }
	  /*:: declare function isHTMLElement(node: mixed): boolean %checks(node instanceof
	    HTMLElement); */


	  function isHTMLElement(node) {
	    var OwnElement = getWindow(node).HTMLElement;
	    return node instanceof OwnElement;
	  }

	  function getHTMLElementScroll(element) {
	    return {
	      scrollLeft: element.scrollLeft,
	      scrollTop: element.scrollTop
	    };
	  }

	  function getNodeScroll(node) {
	    if (node === getWindow(node) || !isHTMLElement(node)) {
	      return getWindowScroll(node);
	    } else {
	      return getHTMLElementScroll(node);
	    }
	  }

	  function getNodeName(element) {
	    return element ? (element.nodeName || '').toLowerCase() : null;
	  }

	  function getComputedStyle$1(element) {
	    return getWindow(element).getComputedStyle(element);
	  }

	  function toNumber(cssValue) {
	    return parseFloat(cssValue) || 0;
	  }

	  function getBorders(element) {
	    var computedStyle = isHTMLElement(element) ? getComputedStyle$1(element) : {};
	    return {
	      top: toNumber(computedStyle.borderTopWidth),
	      right: toNumber(computedStyle.borderRightWidth),
	      bottom: toNumber(computedStyle.borderBottomWidth),
	      left: toNumber(computedStyle.borderLeftWidth)
	    };
	  }

	  function getInnerOffsets(offsetParent) {
	    var rect = getBoundingClientRect(offsetParent);
	    var borders = getBorders(offsetParent);
	    return {
	      x: rect.x + borders.left,
	      y: rect.y + borders.top
	    };
	  } // Returns the composite rect of an element relative to its offsetParent.
	  // Composite means it takes into account transforms as well as layout.


	  function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
	    if (isFixed === void 0) {
	      isFixed = false;
	    }

	    var rect = getBoundingClientRect(elementOrVirtualElement);
	    var scroll = {
	      scrollLeft: 0,
	      scrollTop: 0
	    };
	    var offsets = {
	      x: 0,
	      y: 0
	    };

	    if (!isFixed) {
	      if (getNodeName(offsetParent) !== 'body') {
	        scroll = getNodeScroll(offsetParent);
	      }

	      if (isHTMLElement(offsetParent)) {
	        offsets = getInnerOffsets(offsetParent);
	      }
	    }

	    return {
	      x: rect.left + scroll.scrollLeft - offsets.x,
	      y: rect.top + scroll.scrollTop - offsets.y,
	      width: rect.width,
	      height: rect.height
	    };
	  }

	  // Returns the layout rect of an element relative to its offsetParent. Layout
	  // means it doesn't take into account transforms.
	  function getLayoutRect(element) {
	    return {
	      x: element.offsetLeft,
	      y: element.offsetTop,
	      width: element.offsetWidth,
	      height: element.offsetHeight
	    };
	  }

	  function getParentNode(element) {
	    if (getNodeName(element) === 'html') {
	      return element;
	    }

	    return element.parentNode || // DOM Element detected
	    // $FlowFixMe: need a better way to handle this...
	    element.host || // ShadowRoot detected
	    document.ownerDocument || // Fallback to ownerDocument if available
	    document.documentElement // Or to documentElement if everything else fails
	    ;
	  }

	  function getScrollParent(node) {
	    if (['html', 'body', '#document'].includes(getNodeName(node))) {
	      return node.ownerDocument.body;
	    }

	    if (isHTMLElement(node)) {
	      // Firefox wants us to check `-x` and `-y` variations as well
	      var _getComputedStyle = getComputedStyle$1(node),
	          overflow = _getComputedStyle.overflow,
	          overflowX = _getComputedStyle.overflowX,
	          overflowY = _getComputedStyle.overflowY;

	      if (/auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX)) {
	        return node;
	      }
	    }

	    return getScrollParent(getParentNode(node));
	  }

	  function listScrollParents(element, list) {
	    if (list === void 0) {
	      list = [];
	    }

	    var scrollParent = getScrollParent(element);
	    var isBody = getNodeName(scrollParent) === 'body';
	    var target = isBody ? getWindow(scrollParent) : scrollParent;
	    var updatedList = list.concat(target);
	    return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
	  }

	  function isTableElement(element) {
	    return ['table', 'td', 'th'].includes(getNodeName(element));
	  }

	  var isFirefox = function isFirefox() {
	    return typeof window.InstallTrigger !== 'undefined';
	  };

	  function getTrueOffsetParent(element) {
	    var offsetParent;

	    if (!isHTMLElement(element) || !(offsetParent = element.offsetParent) || // https://github.com/popperjs/popper.js/issues/837
	    isFirefox() && getComputedStyle$1(offsetParent).position === 'fixed') {
	      return null;
	    }

	    return offsetParent;
	  }

	  function getOffsetParent(element) {
	    var window = getWindow(element);
	    var offsetParent = getTrueOffsetParent(element); // Find the nearest non-table offsetParent

	    while (offsetParent && isTableElement(offsetParent)) {
	      offsetParent = getTrueOffsetParent(offsetParent);
	    }

	    if (offsetParent && getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static') {
	      return window;
	    }

	    return offsetParent || window;
	  }

	  var top = 'top';
	  var bottom = 'bottom';
	  var right = 'right';
	  var left = 'left';
	  var auto = 'auto';
	  var basePlacements = [top, bottom, right, left];
	  var start = 'start';
	  var end = 'end';
	  var clippingParents = 'clippingParents';
	  var viewport = 'viewport';
	  var popper = 'popper';
	  var reference = 'reference';
	  var variationPlacements =
	  /*#__PURE__*/
	  basePlacements.reduce(function (acc, placement) {
	    return acc.concat([placement + "-" + start, placement + "-" + end]);
	  }, []);
	  var placements =
	  /*#__PURE__*/
	  [].concat(basePlacements, [auto]).reduce(function (acc, placement) {
	    return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
	  }, []); // modifiers that need to read the DOM

	  var beforeRead = 'beforeRead';
	  var read = 'read';
	  var afterRead = 'afterRead'; // pure-logic modifiers

	  var beforeMain = 'beforeMain';
	  var main = 'main';
	  var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

	  var beforeWrite = 'beforeWrite';
	  var write = 'write';
	  var afterWrite = 'afterWrite';
	  var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

	  function order(modifiers) {
	    var map = new Map();
	    var visited = new Set();
	    var result = [];
	    modifiers.forEach(function (modifier) {
	      map.set(modifier.name, modifier);
	    }); // On visiting object, check for its dependencies and visit them recursively

	    function sort(modifier) {
	      visited.add(modifier.name);
	      var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
	      requires.forEach(function (dep) {
	        if (!visited.has(dep)) {
	          var depModifier = map.get(dep);

	          if (depModifier) {
	            sort(depModifier);
	          }
	        }
	      });
	      result.push(modifier);
	    }

	    modifiers.forEach(function (modifier) {
	      if (!visited.has(modifier.name)) {
	        // check for visited object
	        sort(modifier);
	      }
	    });
	    return result;
	  }

	  function orderModifiers(modifiers) {
	    // order based on dependencies
	    var orderedModifiers = order(modifiers); // order based on phase

	    return modifierPhases.reduce(function (acc, phase) {
	      return acc.concat(orderedModifiers.filter(function (modifier) {
	        return modifier.phase === phase;
	      }));
	    }, []);
	  }

	  function debounce(fn) {
	    var pending;
	    return function () {
	      if (!pending) {
	        pending = new Promise(function (resolve) {
	          Promise.resolve().then(function () {
	            pending = undefined;
	            resolve(fn());
	          });
	        });
	      }

	      return pending;
	    };
	  }

	  function format(str) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    return [].concat(args).reduce(function (p, c) {
	      return p.replace(/%s/, c);
	    }, str);
	  }

	  var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
	  var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
	  var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
	  function validateModifiers(modifiers) {
	    modifiers.forEach(function (modifier) {
	      Object.keys(modifier).forEach(function (key) {
	        switch (key) {
	          case 'name':
	            if (typeof modifier.name !== 'string') {
	              console.error(format(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
	            }

	            break;

	          case 'enabled':
	            if (typeof modifier.enabled !== 'boolean') {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
	            }

	          case 'phase':
	            if (!modifierPhases.includes(modifier.phase)) {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
	            }

	            break;

	          case 'fn':
	            if (typeof modifier.fn !== 'function') {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
	            }

	            break;

	          case 'effect':
	            if (typeof modifier.effect !== 'function') {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
	            }

	            break;

	          case 'requires':
	            if (!Array.isArray(modifier.requires)) {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
	            }

	            break;

	          case 'requiresIfExists':
	            if (!Array.isArray(modifier.requiresIfExists)) {
	              console.error(format(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
	            }

	            break;

	          case 'options':
	          case 'data':
	            break;

	          default:
	            console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
	              return "\"" + s + "\"";
	            }).join(', ') + "; but \"" + key + "\" was provided.");
	        }

	        modifier.requires && modifier.requires.forEach(function (requirement) {
	          if (modifiers.find(function (mod) {
	            return mod.name === requirement;
	          }) == null) {
	            console.error(format(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
	          }
	        });
	      });
	    });
	  }

	  function uniqueBy(arr, fn) {
	    var identifiers = new Set();
	    return arr.filter(function (item) {
	      var identifier = fn(item);

	      if (!identifiers.has(identifier)) {
	        identifiers.add(identifier);
	        return true;
	      }
	    });
	  }

	  function getBasePlacement(placement) {
	    return placement.split('-')[0];
	  }

	  var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided to Popper, they must be either a valid DOM element, virtual element, or a jQuery-wrapped DOM element.';
	  var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
	  var DEFAULT_OPTIONS = {
	    placement: 'bottom',
	    modifiers: [],
	    strategy: 'absolute'
	  };

	  function areValidElements() {
	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return !args.some(function (element) {
	      return !(element && typeof element.getBoundingClientRect === 'function');
	    });
	  }

	  function popperGenerator(generatorOptions) {
	    if (generatorOptions === void 0) {
	      generatorOptions = {};
	    }

	    var _generatorOptions = generatorOptions,
	        _generatorOptions$def = _generatorOptions.defaultModifiers,
	        defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
	        _generatorOptions$def2 = _generatorOptions.defaultOptions,
	        defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
	    return function createPopper(reference, popper, options) {
	      if (options === void 0) {
	        options = defaultOptions;
	      }

	      var state = {
	        placement: 'bottom',
	        orderedModifiers: [],
	        options: Object.assign({}, DEFAULT_OPTIONS, {}, defaultOptions),
	        modifiersData: {},
	        elements: {
	          reference: reference,
	          popper: popper
	        },
	        attributes: {},
	        styles: {}
	      };
	      var effectCleanupFns = [];
	      var isDestroyed = false;
	      var instance = {
	        state: state,
	        setOptions: function setOptions(options) {
	          cleanupModifierEffects();
	          state.options = Object.assign({}, defaultOptions, {}, state.options, {}, options);
	          state.scrollParents = {
	            reference: isElement(reference) ? listScrollParents(reference) : [],
	            popper: listScrollParents(popper)
	          }; // Orders the modifiers based on their dependencies and `phase`
	          // properties

	          var orderedModifiers = orderModifiers([].concat(state.options.modifiers.filter(function (modifier) {
	            return !defaultModifiers.find(function (_ref) {
	              var name = _ref.name;
	              return name === modifier.name;
	            });
	          }), defaultModifiers.map(function (defaultModifier) {
	            return Object.assign({}, defaultModifier, {}, state.options.modifiers.find(function (_ref2) {
	              var name = _ref2.name;
	              return name === defaultModifier.name;
	            }));
	          }))); // Validate the provided modifiers so that the consumer will get warned
	          // if one of the modifiers is invalid for any reason

	          {
	            var modifiers = uniqueBy([].concat(orderedModifiers, state.options.modifiers), function (_ref3) {
	              var name = _ref3.name;
	              return name;
	            });
	            validateModifiers(modifiers);

	            if (getBasePlacement(state.options.placement) === auto) {
	              var flipModifier = orderedModifiers.find(function (_ref4) {
	                var name = _ref4.name;
	                return name === 'flip';
	              });

	              if (!flipModifier) {
	                console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
	              }
	            }
	          } // Strip out disabled modifiers


	          state.orderedModifiers = orderedModifiers.filter(function (m) {
	            return m.enabled;
	          });
	          runModifierEffects();
	          return instance.update();
	        },
	        // Sync update – it will always be executed, even if not necessary. This
	        // is useful for low frequency updates where sync behavior simplifies the
	        // logic.
	        // For high frequency updates (e.g. `resize` and `scroll` events), always
	        // prefer the async Popper#update method
	        forceUpdate: function forceUpdate() {
	          if (isDestroyed) {
	            return;
	          }

	          var _state$elements = state.elements,
	              reference = _state$elements.reference,
	              popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
	          // anymore

	          if (!areValidElements(reference, popper)) {
	            {
	              console.error(INVALID_ELEMENT_ERROR);
	            }

	            return;
	          } // Store the reference and popper rects to be read by modifiers


	          state.rects = {
	            reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
	            popper: getLayoutRect(popper)
	          }; // Modifiers have the ability to reset the current update cycle. The
	          // most common use case for this is the `flip` modifier changing the
	          // placement, which then needs to re-run all the modifiers, because the
	          // logic was previously ran for the previous placement and is therefore
	          // stale/incorrect

	          state.reset = false;
	          state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
	          // is filled with the initial data specified by the modifier. This means
	          // it doesn't persist and is fresh on each update.
	          // To ensure persistent data, use `${name}#persistent`

	          state.orderedModifiers.forEach(function (modifier) {
	            return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
	          });
	          var __debug_loops__ = 0;

	          for (var index = 0; index < state.orderedModifiers.length; index++) {
	            {
	              __debug_loops__ += 1;

	              if (__debug_loops__ > 100) {
	                console.error(INFINITE_LOOP_ERROR);
	                break;
	              }
	            }

	            if (state.reset === true) {
	              state.reset = false;
	              index = -1;
	              continue;
	            }

	            var _state$orderedModifie = state.orderedModifiers[index],
	                fn = _state$orderedModifie.fn,
	                _state$orderedModifie2 = _state$orderedModifie.options,
	                _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
	                name = _state$orderedModifie.name;

	            if (typeof fn === 'function') {
	              state = fn({
	                state: state,
	                options: _options,
	                name: name,
	                instance: instance
	              }) || state;
	            }
	          }
	        },
	        // Async and optimistically optimized update – it will not be executed if
	        // not necessary (debounced to run at most once-per-tick)
	        update: debounce(function () {
	          return new Promise(function (resolve) {
	            instance.forceUpdate();
	            resolve(state);
	          });
	        }),
	        destroy: function destroy() {
	          cleanupModifierEffects();
	          isDestroyed = true;
	        }
	      };

	      if (!areValidElements(reference, popper)) {
	        {
	          console.error(INVALID_ELEMENT_ERROR);
	        }

	        return instance;
	      }

	      instance.setOptions(options).then(function (state) {
	        if (!isDestroyed && options.onFirstUpdate) {
	          options.onFirstUpdate(state);
	        }
	      }); // Modifiers have the ability to execute arbitrary code before the first
	      // update cycle runs. They will be executed in the same order as the update
	      // cycle. This is useful when a modifier adds some persistent data that
	      // other modifiers need to use, but the modifier is run after the dependent
	      // one.

	      function runModifierEffects() {
	        state.orderedModifiers.forEach(function (_ref5) {
	          var name = _ref5.name,
	              _ref5$options = _ref5.options,
	              options = _ref5$options === void 0 ? {} : _ref5$options,
	              effect = _ref5.effect;

	          if (typeof effect === 'function') {
	            var cleanupFn = effect({
	              state: state,
	              name: name,
	              instance: instance,
	              options: options
	            });

	            var noopFn = function noopFn() {};

	            effectCleanupFns.push(cleanupFn || noopFn);
	          }
	        });
	      }

	      function cleanupModifierEffects() {
	        effectCleanupFns.forEach(function (fn) {
	          return fn();
	        });
	        effectCleanupFns = [];
	      }

	      return instance;
	    };
	  }

	  var passive = {
	    passive: true
	  };

	  function effect(_ref) {
	    var state = _ref.state,
	        instance = _ref.instance,
	        options = _ref.options;
	    var _options$scroll = options.scroll,
	        scroll = _options$scroll === void 0 ? true : _options$scroll,
	        _options$resize = options.resize,
	        resize = _options$resize === void 0 ? true : _options$resize;
	    var window = getWindow(state.elements.popper);
	    var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

	    if (scroll) {
	      scrollParents.forEach(function (scrollParent) {
	        scrollParent.addEventListener('scroll', instance.update, passive);
	      });
	    }

	    if (resize) {
	      window.addEventListener('resize', instance.update, passive);
	    }

	    return function () {
	      if (scroll) {
	        scrollParents.forEach(function (scrollParent) {
	          scrollParent.removeEventListener('scroll', instance.update, passive);
	        });
	      }

	      if (resize) {
	        window.removeEventListener('resize', instance.update, passive);
	      }
	    };
	  }

	  var eventListeners = {
	    name: 'eventListeners',
	    enabled: true,
	    phase: 'write',
	    fn: function fn() {},
	    effect: effect,
	    data: {}
	  };

	  function getVariation(placement) {
	    return placement.split('-')[1];
	  }

	  function getMainAxisFromPlacement(placement) {
	    return ['top', 'bottom'].includes(placement) ? 'x' : 'y';
	  }

	  function computeOffsets(_ref) {
	    var reference = _ref.reference,
	        element = _ref.element,
	        placement = _ref.placement;
	    var basePlacement = placement ? getBasePlacement(placement) : null;
	    var variation = placement ? getVariation(placement) : null;
	    var commonX = reference.x + reference.width / 2 - element.width / 2;
	    var commonY = reference.y + reference.height / 2 - element.height / 2;
	    var offsets;

	    switch (basePlacement) {
	      case top:
	        offsets = {
	          x: commonX,
	          y: reference.y - element.height
	        };
	        break;

	      case bottom:
	        offsets = {
	          x: commonX,
	          y: reference.y + reference.height
	        };
	        break;

	      case right:
	        offsets = {
	          x: reference.x + reference.width,
	          y: commonY
	        };
	        break;

	      case left:
	        offsets = {
	          x: reference.x - element.width,
	          y: commonY
	        };
	        break;

	      default:
	        offsets = {
	          x: reference.x,
	          y: reference.y
	        };
	    }

	    var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

	    if (mainAxis != null) {
	      var len = mainAxis === 'y' ? 'height' : 'width';

	      switch (variation) {
	        case start:
	          offsets[mainAxis] = Math.floor(offsets[mainAxis]) - Math.floor(reference[len] / 2 - element[len] / 2);
	          break;

	        case end:
	          offsets[mainAxis] = Math.floor(offsets[mainAxis]) + Math.ceil(reference[len] / 2 - element[len] / 2);
	          break;

	        default:
	      }
	    }

	    return offsets;
	  }

	  function popperOffsets(_ref) {
	    var state = _ref.state,
	        name = _ref.name; // Offsets are the actual position the popper needs to have to be
	    // properly positioned near its reference element
	    // This is the most basic placement, and will be adjusted by
	    // the modifiers in the next step

	    state.modifiersData[name] = computeOffsets({
	      reference: state.rects.reference,
	      element: state.rects.popper,
	      strategy: 'absolute',
	      placement: state.placement
	    });
	  }

	  var popperOffsets$1 = {
	    name: 'popperOffsets',
	    enabled: true,
	    phase: 'read',
	    fn: popperOffsets,
	    data: {}
	  };

	  function getDocumentElement(element) {
	    return element.ownerDocument.documentElement;
	  }

	  var unsetSides = {
	    top: 'auto',
	    right: 'auto',
	    bottom: 'auto',
	    left: 'auto'
	  }; // Round the offsets to the nearest suitable subpixel based on the DPR.
	  // Zooming can change the DPR, but it seems to report a value that will
	  // cleanly divide the values into the appropriate subpixels.

	  function roundOffsets(_ref) {
	    var x = _ref.x,
	        y = _ref.y;
	    var dpr = window.devicePixelRatio || 1;
	    return {
	      x: Math.round(x * dpr) / dpr || 0,
	      y: Math.round(y * dpr) / dpr || 0
	    };
	  }

	  function mapToStyles(_ref2) {
	    var _Object$assign2;

	    var popper = _ref2.popper,
	        popperRect = _ref2.popperRect,
	        placement = _ref2.placement,
	        offsets = _ref2.offsets,
	        position = _ref2.position,
	        gpuAcceleration = _ref2.gpuAcceleration,
	        adaptive = _ref2.adaptive;

	    var _roundOffsets = roundOffsets(offsets),
	        x = _roundOffsets.x,
	        y = _roundOffsets.y;

	    var hasX = offsets.hasOwnProperty('x');
	    var hasY = offsets.hasOwnProperty('y');
	    var sideX = left;
	    var sideY = top;

	    if (adaptive) {
	      var offsetParent = getOffsetParent(popper);

	      if (offsetParent === getWindow(popper)) {
	        offsetParent = getDocumentElement(popper);
	      }

	      if (placement === top) {
	        y = y - offsetParent.clientHeight + popperRect.height;
	        sideY = bottom;
	      }

	      if (placement === left) {
	        x = x - offsetParent.clientWidth + popperRect.width;
	        sideX = right;
	      }
	    }

	    var commonStyles = Object.assign({
	      position: position
	    }, adaptive && unsetSides);

	    if (gpuAcceleration) {
	      var _Object$assign;

	      return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (window.devicePixelRatio || 1) < 2 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
	    }

	    return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
	  }

	  function computeStyles(_ref3) {
	    var state = _ref3.state,
	        options = _ref3.options;
	    var _options$gpuAccelerat = options.gpuAcceleration,
	        gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
	        _options$adaptive = options.adaptive,
	        adaptive = _options$adaptive === void 0 ? true : _options$adaptive;
	    var commonStyles = {
	      placement: getBasePlacement(state.placement),
	      popper: state.elements.popper,
	      popperRect: state.rects.popper,
	      gpuAcceleration: gpuAcceleration
	    }; // popper offsets are always available

	    state.styles.popper = Object.assign({}, state.styles.popper, {}, mapToStyles(Object.assign({}, commonStyles, {
	      offsets: state.modifiersData.popperOffsets,
	      position: state.options.strategy,
	      adaptive: adaptive
	    }))); // arrow offsets may not be available

	    if (state.modifiersData.arrow != null) {
	      state.styles.arrow = Object.assign({}, state.styles.arrow, {}, mapToStyles(Object.assign({}, commonStyles, {
	        offsets: state.modifiersData.arrow,
	        position: 'absolute',
	        adaptive: false
	      })));
	    }

	    state.attributes.popper = Object.assign({}, state.attributes.popper, {
	      'data-popper-placement': state.placement
	    });
	  }

	  var computeStyles$1 = {
	    name: 'computeStyles',
	    enabled: true,
	    phase: 'beforeWrite',
	    fn: computeStyles,
	    data: {}
	  };

	  // and applies them to the HTMLElements such as popper and arrow

	  function applyStyles(_ref) {
	    var state = _ref.state;
	    Object.keys(state.elements).forEach(function (name) {
	      var style = state.styles[name] || {};
	      var attributes = state.attributes[name] || {};
	      var element = state.elements[name]; // arrow is optional + virtual elements

	      if (!isHTMLElement(element) || !getNodeName(element)) {
	        return;
	      } // Flow doesn't support to extend this property, but it's the most
	      // effective way to apply styles to an HTMLElement
	      // $FlowFixMe


	      Object.assign(element.style, style);
	      Object.entries(attributes).forEach(function (_ref2) {
	        var name = _ref2[0],
	            value = _ref2[1];

	        if (value === false) {
	          element.removeAttribute(name);
	        } else {
	          element.setAttribute(name, value === true ? '' : value);
	        }
	      });
	    });
	  }

	  function effect$1(_ref3) {
	    var state = _ref3.state;
	    var initialStyles = {
	      position: 'absolute',
	      left: '0',
	      top: '0'
	    };
	    Object.assign(state.elements.popper.style, initialStyles);
	    return function () {
	      Object.keys(state.elements).forEach(function (name) {
	        var element = state.elements[name];
	        var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? Object.assign({}, state.styles[name]) : initialStyles);
	        var attributes = state.attributes[name] || {}; // Set all values to an empty string to unset them

	        var style = styleProperties.reduce(function (style, property) {
	          var _Object$assign;

	          return Object.assign({}, style, (_Object$assign = {}, _Object$assign[String(property)] = '', _Object$assign));
	        }, {}); // arrow is optional + virtual elements

	        if (!isHTMLElement(element) || !getNodeName(element)) {
	          return;
	        } // Flow doesn't support to extend this property, but it's the most
	        // effective way to apply styles to an HTMLElement
	        // $FlowFixMe


	        Object.assign(element.style, style);
	        Object.keys(attributes).forEach(function (attribute) {
	          return element.removeAttribute(attribute);
	        });
	      });
	    };
	  }

	  var applyStyles$1 = {
	    name: 'applyStyles',
	    enabled: true,
	    phase: 'write',
	    fn: applyStyles,
	    effect: effect$1,
	    requires: ['computeStyles']
	  };

	  function distanceAndSkiddingToXY(placement, rects, offset) {
	    var basePlacement = getBasePlacement(placement);
	    var invertDistance = [left, top].includes(basePlacement) ? -1 : 1;

	    var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
	      placement: placement
	    })) : offset,
	        skidding = _ref[0],
	        distance = _ref[1];

	    skidding = skidding || 0;
	    distance = (distance || 0) * invertDistance;
	    return [left, right].includes(basePlacement) ? {
	      x: distance,
	      y: skidding
	    } : {
	      x: skidding,
	      y: distance
	    };
	  }

	  function offset(_ref2) {
	    var state = _ref2.state,
	        options = _ref2.options,
	        name = _ref2.name;
	    var _options$offset = options.offset,
	        offset = _options$offset === void 0 ? [0, 0] : _options$offset;
	    var data = placements.reduce(function (acc, placement) {
	      acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
	      return acc;
	    }, {});
	    var _data$state$placement = data[state.placement],
	        x = _data$state$placement.x,
	        y = _data$state$placement.y;
	    state.modifiersData.popperOffsets.x += x;
	    state.modifiersData.popperOffsets.y += y;
	    state.modifiersData[name] = data;
	  }

	  var offset$1 = {
	    name: 'offset',
	    enabled: true,
	    phase: 'main',
	    requires: ['popperOffsets'],
	    fn: offset
	  };

	  var hash = {
	    left: 'right',
	    right: 'left',
	    bottom: 'top',
	    top: 'bottom'
	  };
	  function getOppositePlacement(placement) {
	    return placement.replace(/left|right|bottom|top/g, function (matched) {
	      return hash[matched];
	    });
	  }

	  var hash$1 = {
	    start: 'end',
	    end: 'start'
	  };
	  function getOppositeVariationPlacement(placement) {
	    return placement.replace(/start|end/g, function (matched) {
	      return hash$1[matched];
	    });
	  }

	  function getViewportRect(element) {
	    var win = getWindow(element);
	    return {
	      width: win.innerWidth,
	      height: win.innerHeight,
	      x: 0,
	      y: 0
	    };
	  }

	  function getDocumentRect(element) {
	    var win = getWindow(element);
	    var winScroll = getWindowScroll(element);
	    var documentRect = getCompositeRect(getDocumentElement(element), win);
	    documentRect.height = Math.max(documentRect.height, win.innerHeight);
	    documentRect.width = Math.max(documentRect.width, win.innerWidth);
	    documentRect.x = -winScroll.scrollLeft;
	    documentRect.y = -winScroll.scrollTop;
	    return documentRect;
	  }

	  function getDecorations(element) {
	    var borders = getBorders(element);
	    return {
	      top: borders.top,
	      right: element.offsetWidth - (element.clientWidth + borders.right),
	      bottom: element.offsetHeight - (element.clientHeight + borders.bottom),
	      left: borders.left
	    };
	  }

	  function contains(parent, child) {
	    // $FlowFixMe: hasOwnProperty doesn't seem to work in tests
	    var isShadow = Boolean(child.getRootNode && child.getRootNode().host); // First, attempt with faster native method

	    if (parent.contains(child)) {
	      return true;
	    } // then fallback to custom implementation with Shadow DOM support
	    else if (isShadow) {
	        var next = child;

	        do {
	          if (next && next.isSameNode(parent)) {
	            return true;
	          } // $FlowFixMe: need a better way to handle this...


	          next = next.parentNode || next.host;
	        } while (next);
	      } // Give up, the result is false


	    return false;
	  }

	  function rectToClientRect(rect) {
	    return Object.assign({}, rect, {
	      left: rect.x,
	      top: rect.y,
	      right: rect.x + rect.width,
	      bottom: rect.y + rect.height
	    });
	  }

	  function getFreshSideObject() {
	    return {
	      top: 0,
	      right: 0,
	      bottom: 0,
	      left: 0
	    };
	  }

	  function getClientRectFromMixedType(element, clippingParent) {
	    return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
	  } // A "clipping parent" is an overflowable container with the characteristic of
	  // clipping (or hiding) overflowing elements with a position different from
	  // `initial`


	  function getClippingParents(element) {
	    var clippingParents = listScrollParents(element);
	    var canEscapeClipping = ['absolute', 'fixed'].includes(getComputedStyle$1(element).position);
	    var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

	    if (!isElement(clipperElement)) {
	      return [];
	    }

	    return clippingParents.filter(function (clippingParent) {
	      return isElement(clippingParent) && contains(clippingParent, clipperElement);
	    });
	  } // Gets the maximum area that the element is visible in due to any number of
	  // clipping parents


	  function getClippingRect(element, boundary, rootBoundary) {
	    var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
	    var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
	    var firstClippingParent = clippingParents[0];
	    var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
	      var rect = getClientRectFromMixedType(element, clippingParent);
	      var decorations = isHTMLElement(clippingParent) ? getDecorations(clippingParent) : getFreshSideObject();
	      accRect.top = Math.max(rect.top + decorations.top, accRect.top);
	      accRect.right = Math.min(rect.right - decorations.right, accRect.right);
	      accRect.bottom = Math.min(rect.bottom - decorations.bottom, accRect.bottom);
	      accRect.left = Math.max(rect.left + decorations.left, accRect.left);
	      return accRect;
	    }, getClientRectFromMixedType(element, firstClippingParent));
	    clippingRect.width = clippingRect.right - clippingRect.left;
	    clippingRect.height = clippingRect.bottom - clippingRect.top;
	    clippingRect.x = clippingRect.left;
	    clippingRect.y = clippingRect.top;
	    return clippingRect;
	  }

	  function mergePaddingObject(paddingObject) {
	    return Object.assign({}, getFreshSideObject(), {}, paddingObject);
	  }

	  function expandToHashMap(value, keys) {
	    return keys.reduce(function (hashMap, key) {
	      hashMap[key] = value;
	      return hashMap;
	    }, {});
	  }

	  function detectOverflow(state, options) {
	    if (options === void 0) {
	      options = {};
	    }

	    var _options = options,
	        _options$placement = _options.placement,
	        placement = _options$placement === void 0 ? state.placement : _options$placement,
	        _options$boundary = _options.boundary,
	        boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
	        _options$rootBoundary = _options.rootBoundary,
	        rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
	        _options$elementConte = _options.elementContext,
	        elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
	        _options$altBoundary = _options.altBoundary,
	        altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
	        _options$padding = _options.padding,
	        padding = _options$padding === void 0 ? 0 : _options$padding;
	    var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
	    var altContext = elementContext === popper ? reference : popper;
	    var referenceElement = state.elements.reference;
	    var popperRect = state.rects.popper;
	    var element = state.elements[altBoundary ? altContext : elementContext];
	    var clippingClientRect = getClippingRect(isElement(element) ? element : getDocumentElement(state.elements.popper), boundary, rootBoundary);
	    var referenceClientRect = getBoundingClientRect(referenceElement);
	    var popperOffsets = computeOffsets({
	      reference: referenceClientRect,
	      element: popperRect,
	      strategy: 'absolute',
	      placement: placement
	    });
	    var popperClientRect = rectToClientRect(Object.assign({}, popperRect, {}, popperOffsets));
	    var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
	    // 0 or negative = within the clipping rect

	    var overflowOffsets = {
	      top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
	      bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
	      left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
	      right: elementClientRect.right - clippingClientRect.right + paddingObject.right
	    };
	    var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

	    if (elementContext === popper && offsetData) {
	      var offset = offsetData[placement];
	      Object.keys(overflowOffsets).forEach(function (key) {
	        var multiply = [right, bottom].includes(key) ? 1 : -1;
	        var axis = [top, bottom].includes(key) ? 'y' : 'x';
	        overflowOffsets[key] += offset[axis] * multiply;
	      });
	    }

	    return overflowOffsets;
	  }

	  function computeAutoPlacement(state, options) {
	    if (options === void 0) {
	      options = {};
	    }

	    var _options = options,
	        placement = _options.placement,
	        boundary = _options.boundary,
	        rootBoundary = _options.rootBoundary,
	        padding = _options.padding,
	        flipVariations = _options.flipVariations;
	    var variation = getVariation(placement);
	    var placements = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
	      return placement.includes(variation);
	    }) : basePlacements; // $FlowFixMe: Flow seems to have problems with two array unions...

	    var overflows = placements.reduce(function (acc, placement) {
	      acc[placement] = detectOverflow(state, {
	        placement: placement,
	        boundary: boundary,
	        rootBoundary: rootBoundary,
	        padding: padding
	      })[getBasePlacement(placement)];
	      return acc;
	    }, {});
	    return Object.keys(overflows).sort(function (a, b) {
	      return overflows[a] - overflows[b];
	    });
	  }

	  function getExpandedFallbackPlacements(placement) {
	    if (getBasePlacement(placement) === auto) {
	      return [];
	    }

	    var oppositePlacement = getOppositePlacement(placement);
	    return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
	  }

	  function flip(_ref) {
	    var state = _ref.state,
	        options = _ref.options,
	        name = _ref.name;

	    if (state.modifiersData[name]._skip) {
	      return;
	    }

	    var specifiedFallbackPlacements = options.fallbackPlacements,
	        padding = options.padding,
	        boundary = options.boundary,
	        rootBoundary = options.rootBoundary,
	        _options$flipVariatio = options.flipVariations,
	        flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio;
	    var preferredPlacement = state.options.placement;
	    var basePlacement = getBasePlacement(preferredPlacement);
	    var isBasePlacement = basePlacement === preferredPlacement;
	    var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
	    var placements = uniqueBy([preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
	      return getBasePlacement(placement) === auto ? acc.concat(computeAutoPlacement(state, {
	        placement: placement,
	        boundary: boundary,
	        rootBoundary: rootBoundary,
	        padding: padding,
	        flipVariations: flipVariations
	      })) : acc.concat(placement);
	    }, []), function (placement) {
	      return placement;
	    });
	    var referenceRect = state.rects.reference;
	    var popperRect = state.rects.popper;
	    var checksMap = new Map();
	    var makeFallbackChecks = true;
	    var firstFittingPlacement = placements[0];

	    for (var i = 0; i < placements.length; i++) {
	      var placement = placements[i];

	      var _basePlacement = getBasePlacement(placement);

	      var isStartVariation = getVariation(placement) === start;
	      var isVertical = [top, bottom].includes(_basePlacement);
	      var len = isVertical ? 'width' : 'height';
	      var overflow = detectOverflow(state, {
	        placement: placement,
	        boundary: boundary,
	        rootBoundary: rootBoundary,
	        padding: padding
	      });
	      var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

	      if (referenceRect[len] > popperRect[len]) {
	        mainVariationSide = getOppositePlacement(mainVariationSide);
	      }

	      var altVariationSide = getOppositePlacement(mainVariationSide);
	      var checks = [overflow[_basePlacement] <= 0, overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0];

	      if (checks.every(function (check) {
	        return check;
	      })) {
	        firstFittingPlacement = placement;
	        makeFallbackChecks = false;
	        break;
	      }

	      checksMap.set(placement, checks);
	    }

	    if (makeFallbackChecks) {
	      // `2` may be desired in some cases – research later
	      var numberOfChecks = flipVariations ? 3 : 1;

	      var _loop = function _loop(_i) {
	        var fittingPlacement = placements.find(function (placement) {
	          var checks = checksMap.get(placement);

	          if (checks) {
	            return checks.slice(0, _i).every(function (check) {
	              return check;
	            });
	          }
	        });

	        if (fittingPlacement) {
	          firstFittingPlacement = fittingPlacement;
	          return "break";
	        }
	      };

	      for (var _i = numberOfChecks; _i > 0; _i--) {
	        var _ret = _loop(_i);

	        if (_ret === "break") break;
	      }
	    }

	    if (state.placement !== firstFittingPlacement) {
	      state.modifiersData[name]._skip = true;
	      state.placement = firstFittingPlacement;
	      state.reset = true;
	    }
	  }

	  var flip$1 = {
	    name: 'flip',
	    enabled: true,
	    phase: 'main',
	    fn: flip,
	    requiresIfExists: ['offset'],
	    data: {
	      _skip: false
	    }
	  };

	  function getAltAxis(axis) {
	    return axis === 'x' ? 'y' : 'x';
	  }

	  function within(min, value, max) {
	    return Math.max(min, Math.min(value, max));
	  }

	  function preventOverflow(_ref) {
	    var state = _ref.state,
	        options = _ref.options,
	        name = _ref.name;
	    var _options$mainAxis = options.mainAxis,
	        checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
	        _options$altAxis = options.altAxis,
	        checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
	        boundary = options.boundary,
	        rootBoundary = options.rootBoundary,
	        padding = options.padding,
	        _options$tether = options.tether,
	        tether = _options$tether === void 0 ? true : _options$tether,
	        _options$tetherOffset = options.tetherOffset,
	        tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
	    var overflow = detectOverflow(state, {
	      boundary: boundary,
	      rootBoundary: rootBoundary,
	      padding: padding
	    });
	    var basePlacement = getBasePlacement(state.placement);
	    var variation = getVariation(state.placement);
	    var isBasePlacement = !variation;
	    var mainAxis = getMainAxisFromPlacement(basePlacement);
	    var altAxis = getAltAxis(mainAxis);
	    var popperOffsets = state.modifiersData.popperOffsets;
	    var referenceRect = state.rects.reference;
	    var popperRect = state.rects.popper;
	    var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
	      placement: state.placement
	    })) : tetherOffset;
	    var data = {
	      x: 0,
	      y: 0
	    };

	    if (checkMainAxis) {
	      var mainSide = mainAxis === 'y' ? top : left;
	      var altSide = mainAxis === 'y' ? bottom : right;
	      var len = mainAxis === 'y' ? 'height' : 'width';
	      var offset = popperOffsets[mainAxis];
	      var min = popperOffsets[mainAxis] + overflow[mainSide];
	      var max = popperOffsets[mainAxis] - overflow[altSide];
	      var additive = tether ? -popperRect[len] / 2 : 0;
	      var minLen = variation === start ? referenceRect[len] : popperRect[len];
	      var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
	      // outside the reference bounds

	      var arrowElement = state.elements.arrow;
	      var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
	        width: 0,
	        height: 0
	      };
	      var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
	      var arrowPaddingMin = arrowPaddingObject[mainSide];
	      var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
	      // to include its full size in the calculation. If the reference is small
	      // and near the edge of a boundary, the popper can overflow even if the
	      // reference is not overflowing as well (e.g. virtual elements with no
	      // width or height)

	      var arrowLen = within(0, Math.abs(referenceRect[len] - arrowRect[len]), arrowRect[len]);
	      var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
	      var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
	      var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
	      var tetherMin = state.modifiersData.popperOffsets[mainAxis] + minOffset - offsetModifierValue;
	      var tetherMax = state.modifiersData.popperOffsets[mainAxis] + maxOffset - offsetModifierValue;
	      var preventedOffset = within(tether ? Math.min(min, tetherMin) : min, offset, tether ? Math.max(max, tetherMax) : max);
	      state.modifiersData.popperOffsets[mainAxis] = preventedOffset;
	      data[mainAxis] = preventedOffset - offset;
	    }

	    if (checkAltAxis) {
	      var _mainSide = mainAxis === 'x' ? top : left;

	      var _altSide = mainAxis === 'x' ? bottom : right;

	      var _offset = popperOffsets[altAxis];

	      var _min = _offset + overflow[_mainSide];

	      var _max = _offset - overflow[_altSide];

	      var _preventedOffset = within(_min, _offset, _max);

	      state.modifiersData.popperOffsets[altAxis] = _preventedOffset;
	      data[altAxis] = _preventedOffset - _offset;
	    }

	    state.modifiersData[name] = data;
	  }

	  var preventOverflow$1 = {
	    name: 'preventOverflow',
	    enabled: true,
	    phase: 'main',
	    fn: preventOverflow,
	    requiresIfExists: ['offset']
	  };

	  function arrow(_ref) {
	    var _state$modifiersData$;

	    var state = _ref.state,
	        name = _ref.name;
	    var arrowElement = state.elements.arrow;
	    var popperOffsets = state.modifiersData.popperOffsets;
	    var basePlacement = getBasePlacement(state.placement);
	    var axis = getMainAxisFromPlacement(basePlacement);
	    var isVertical = [left, right].includes(basePlacement);
	    var len = isVertical ? 'height' : 'width';

	    if (!arrowElement) {
	      return;
	    }

	    var paddingObject = state.modifiersData[name + "#persistent"].padding;
	    var arrowRect = getLayoutRect(arrowElement);
	    var minProp = axis === 'y' ? top : left;
	    var maxProp = axis === 'y' ? bottom : right;
	    var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
	    var startDiff = popperOffsets[axis] - state.rects.reference[axis];
	    var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
	    // outside of the popper bounds

	    var center = within(paddingObject[minProp], state.rects.popper[len] / 2 - arrowRect[len] / 2 + centerToReference, state.rects.popper[len] - arrowRect[len] - paddingObject[maxProp]); // Prevents breaking syntax highlighting...

	    var axisProp = axis;
	    state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = center, _state$modifiersData$);
	  }

	  function effect$2(_ref2) {
	    var state = _ref2.state,
	        options = _ref2.options,
	        name = _ref2.name;
	    var _options$element = options.element,
	        arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element,
	        _options$padding = options.padding,
	        padding = _options$padding === void 0 ? 0 : _options$padding; // CSS selector

	    if (typeof arrowElement === 'string') {
	      arrowElement = state.elements.popper.querySelector(arrowElement);

	      if (!arrowElement) {
	        return;
	      }
	    }

	    if (!contains(state.elements.popper, arrowElement)) {
	      {
	        console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
	      }

	      return;
	    }

	    state.elements.arrow = arrowElement;
	    state.modifiersData[name + "#persistent"] = {
	      padding: mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements))
	    };
	  }

	  var arrow$1 = {
	    name: 'arrow',
	    enabled: true,
	    phase: 'main',
	    fn: arrow,
	    effect: effect$2,
	    requires: ['popperOffsets'],
	    requiresIfExists: ['preventOverflow']
	  };

	  function getSideOffsets(overflow, rect, preventedOffsets) {
	    if (preventedOffsets === void 0) {
	      preventedOffsets = {
	        x: 0,
	        y: 0
	      };
	    }

	    return {
	      top: overflow.top - rect.height - preventedOffsets.y,
	      right: overflow.right - rect.width + preventedOffsets.x,
	      bottom: overflow.bottom - rect.height + preventedOffsets.y,
	      left: overflow.left - rect.width - preventedOffsets.x
	    };
	  }

	  function isAnySideFullyClipped(overflow) {
	    return [top, right, bottom, left].some(function (side) {
	      return overflow[side] >= 0;
	    });
	  }

	  function hide(_ref) {
	    var state = _ref.state,
	        name = _ref.name;
	    var referenceRect = state.rects.reference;
	    var popperRect = state.rects.popper;
	    var preventedOffsets = state.modifiersData.preventOverflow;
	    var referenceOverflow = detectOverflow(state, {
	      elementContext: 'reference'
	    });
	    var popperAltOverflow = detectOverflow(state, {
	      altBoundary: true
	    });
	    var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
	    var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
	    var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
	    var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
	    state.modifiersData[name] = {
	      referenceClippingOffsets: referenceClippingOffsets,
	      popperEscapeOffsets: popperEscapeOffsets,
	      isReferenceHidden: isReferenceHidden,
	      hasPopperEscaped: hasPopperEscaped
	    };
	    state.attributes.popper = Object.assign({}, state.attributes.popper, {
	      'data-popper-reference-hidden': isReferenceHidden,
	      'data-popper-escaped': hasPopperEscaped
	    });
	  }

	  var hide$1 = {
	    name: 'hide',
	    enabled: true,
	    phase: 'main',
	    requiresIfExists: ['preventOverflow'],
	    fn: hide
	  };

	  var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
	  var createPopper =
	  /*#__PURE__*/
	  popperGenerator({
	    defaultModifiers: defaultModifiers
	  }); // eslint-disable-next-line import/no-unused-modules

	  var categories = ["travel", "food", "activities", "flags", "symbols", "skinTones", "animals", "objects", "smileys", "smileys"];
	  var emojiData = [{
	    "n": ["earth_africa"],
	    "e": "🌍",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["grapes"],
	    "e": "🍇",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["jack_o_lantern"],
	    "e": "🎃",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["checkered_flag"],
	    "e": "🏁",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["atm"],
	    "e": "🏧",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["skin-tone-2"],
	    "e": "🏻",
	    "c": 5,
	    "ver": "2.0"
	  }, {
	    "n": ["monkey_face"],
	    "e": "🐵",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["eyeglasses"],
	    "e": "👓",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["grinning"],
	    "e": "😀",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["earth_americas"],
	    "e": "🌎",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["melon"],
	    "e": "🍈",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["christmas_tree"],
	    "e": "🎄",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["skin-tone-3"],
	    "e": "🏼",
	    "c": 5,
	    "ver": "2.0"
	  }, {
	    "n": ["monkey"],
	    "e": "🐒",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["dark_sunglasses"],
	    "e": "🕶️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["smiley"],
	    "e": "😃",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["triangular_flag_on_post"],
	    "e": "🚩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["put_litter_in_its_place"],
	    "e": "🚮",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["earth_asia"],
	    "e": "🌏",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["watermelon"],
	    "e": "🍉",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["fireworks"],
	    "e": "🎆",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["crossed_flags"],
	    "e": "🎌",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["skin-tone-4"],
	    "e": "🏽",
	    "c": 5,
	    "ver": "2.0"
	  }, {
	    "n": ["smile"],
	    "e": "😄",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["potable_water"],
	    "e": "🚰",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["goggles"],
	    "e": "🥽",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["gorilla"],
	    "e": "🦍",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["globe_with_meridians"],
	    "e": "🌐",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["tangerine"],
	    "e": "🍊",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["sparkler"],
	    "e": "🎇",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["waving_black_flag"],
	    "e": "🏴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["skin-tone-5"],
	    "e": "🏾",
	    "c": 5,
	    "ver": "2.0"
	  }, {
	    "n": ["grin"],
	    "e": "😁",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["lab_coat"],
	    "e": "🥼",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["orangutan"],
	    "e": "🦧",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["wheelchair"],
	    "e": "♿",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["lemon"],
	    "e": "🍋",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["waving_white_flag"],
	    "e": "🏳️",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["skin-tone-6"],
	    "e": "🏿",
	    "c": 5,
	    "ver": "2.0"
	  }, {
	    "n": ["dog"],
	    "e": "🐶",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["world_map"],
	    "e": "🗺️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["laughing", "satisfied"],
	    "e": "😆",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mens"],
	    "e": "🚹",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["safety_vest"],
	    "e": "🦺",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["firecracker"],
	    "e": "🧨",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["banana"],
	    "e": "🍌",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["rainbow-flag"],
	    "e": "🏳️‍🌈",
	    "c": 3,
	    "ver": "4.0"
	  }, {
	    "n": ["dog2"],
	    "e": "🐕",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["necktie"],
	    "e": "👔",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["japan"],
	    "e": "🗾",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sweat_smile"],
	    "e": "😅",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["womens"],
	    "e": "🚺",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["sparkles"],
	    "e": "✨",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["pineapple"],
	    "e": "🍍",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["balloon"],
	    "e": "🎈",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["pirate_flag"],
	    "e": "🏴‍☠️",
	    "c": 3,
	    "ver": "11.0"
	  }, {
	    "n": ["shirt", "tshirt"],
	    "e": "👕",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["restroom"],
	    "e": "🚻",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["rolling_on_the_floor_laughing"],
	    "e": "🤣",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["guide_dog"],
	    "e": "🦮",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["compass"],
	    "e": "🧭",
	    "c": 0,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-ac"],
	    "e": "🇦🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tada"],
	    "e": "🎉",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["snow_capped_mountain"],
	    "e": "🏔️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["service_dog"],
	    "e": "🐕‍🦺",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["jeans"],
	    "e": "👖",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["joy"],
	    "e": "😂",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["baby_symbol"],
	    "e": "🚼",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["mango"],
	    "e": "🥭",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-ad"],
	    "e": "🇦🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["apple"],
	    "e": "🍎",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["confetti_ball"],
	    "e": "🎊",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["poodle"],
	    "e": "🐩",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["slightly_smiling_face"],
	    "e": "🙂",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["wc"],
	    "e": "🚾",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["scarf"],
	    "e": "🧣",
	    "c": 7,
	    "ver": "5.0"
	  }, {
	    "n": ["mountain"],
	    "e": "⛰️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ae"],
	    "e": "🇦🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["volcano"],
	    "e": "🌋",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["green_apple"],
	    "e": "🍏",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["tanabata_tree"],
	    "e": "🎋",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["wolf"],
	    "e": "🐺",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["upside_down_face"],
	    "e": "🙃",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["passport_control"],
	    "e": "🛂",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["gloves"],
	    "e": "🧤",
	    "c": 7,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-af"],
	    "e": "🇦🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["pear"],
	    "e": "🍐",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["bamboo"],
	    "e": "🎍",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["mount_fuji"],
	    "e": "🗻",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["wink"],
	    "e": "😉",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["customs"],
	    "e": "🛃",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["fox_face"],
	    "e": "🦊",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["coat"],
	    "e": "🧥",
	    "c": 7,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-ag"],
	    "e": "🇦🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["peach"],
	    "e": "🍑",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["dolls"],
	    "e": "🎎",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["camping"],
	    "e": "🏕️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["blush"],
	    "e": "😊",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["baggage_claim"],
	    "e": "🛄",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["raccoon"],
	    "e": "🦝",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["socks"],
	    "e": "🧦",
	    "c": 7,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-ai"],
	    "e": "🇦🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cherries"],
	    "e": "🍒",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["flags"],
	    "e": "🎏",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["beach_with_umbrella"],
	    "e": "🏖️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["cat"],
	    "e": "🐱",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["dress"],
	    "e": "👗",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["innocent"],
	    "e": "😇",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["left_luggage"],
	    "e": "🛅",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-al"],
	    "e": "🇦🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["strawberry"],
	    "e": "🍓",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["wind_chime"],
	    "e": "🎐",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["desert"],
	    "e": "🏜️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["cat2"],
	    "e": "🐈",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["kimono"],
	    "e": "👘",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["smiling_face_with_3_hearts"],
	    "e": "🥰",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["warning"],
	    "e": "⚠️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-am"],
	    "e": "🇦🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rice_scene"],
	    "e": "🎑",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["desert_island"],
	    "e": "🏝️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["heart_eyes"],
	    "e": "😍",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["children_crossing"],
	    "e": "🚸",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["kiwifruit"],
	    "e": "🥝",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["sari"],
	    "e": "🥻",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["lion_face"],
	    "e": "🦁",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ao"],
	    "e": "🇦🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tomato"],
	    "e": "🍅",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["national_park"],
	    "e": "🏞️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["tiger"],
	    "e": "🐯",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["star-struck", "grinning_face_with_star_eyes"],
	    "e": "🤩",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["red_envelope"],
	    "e": "🧧",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["one-piece_swimsuit"],
	    "e": "🩱",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["no_entry"],
	    "e": "⛔",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-aq"],
	    "e": "🇦🇶",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ribbon"],
	    "e": "🎀",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["stadium"],
	    "e": "🏟️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["tiger2"],
	    "e": "🐅",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["kissing_heart"],
	    "e": "😘",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["no_entry_sign"],
	    "e": "🚫",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["coconut"],
	    "e": "🥥",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["briefs"],
	    "e": "🩲",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-ar"],
	    "e": "🇦🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["gift"],
	    "e": "🎁",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["classical_building"],
	    "e": "🏛️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["leopard"],
	    "e": "🐆",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["kissing"],
	    "e": "😗",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["no_bicycles"],
	    "e": "🚳",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["avocado"],
	    "e": "🥑",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["shorts"],
	    "e": "🩳",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-as"],
	    "e": "🇦🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["eggplant"],
	    "e": "🍆",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["reminder_ribbon"],
	    "e": "🎗️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["building_construction"],
	    "e": "🏗️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["horse"],
	    "e": "🐴",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["bikini"],
	    "e": "👙",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["no_smoking"],
	    "e": "🚭",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["relaxed"],
	    "e": "☺️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-at"],
	    "e": "🇦🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["admission_tickets"],
	    "e": "🎟️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["racehorse"],
	    "e": "🐎",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["womans_clothes"],
	    "e": "👚",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["kissing_closed_eyes"],
	    "e": "😚",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["do_not_litter"],
	    "e": "🚯",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["potato"],
	    "e": "🥔",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["bricks"],
	    "e": "🧱",
	    "c": 0,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-au"],
	    "e": "🇦🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ticket"],
	    "e": "🎫",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["house_buildings"],
	    "e": "🏘️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["purse"],
	    "e": "👛",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["kissing_smiling_eyes"],
	    "e": "😙",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["non-potable_water"],
	    "e": "🚱",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["carrot"],
	    "e": "🥕",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["unicorn_face"],
	    "e": "🦄",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-aw"],
	    "e": "🇦🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["corn"],
	    "e": "🌽",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["medal"],
	    "e": "🎖️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["derelict_house_building"],
	    "e": "🏚️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["handbag"],
	    "e": "👜",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["yum"],
	    "e": "😋",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["no_pedestrians"],
	    "e": "🚷",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["zebra_face"],
	    "e": "🦓",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-ax"],
	    "e": "🇦🇽",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hot_pepper"],
	    "e": "🌶️",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["trophy"],
	    "e": "🏆",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["house"],
	    "e": "🏠",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pouch"],
	    "e": "👝",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["no_mobile_phones"],
	    "e": "📵",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["stuck_out_tongue"],
	    "e": "😛",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["deer"],
	    "e": "🦌",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-az"],
	    "e": "🇦🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sports_medal"],
	    "e": "🏅",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["house_with_garden"],
	    "e": "🏡",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["cow"],
	    "e": "🐮",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["underage"],
	    "e": "🔞",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["stuck_out_tongue_winking_eye"],
	    "e": "😜",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["shopping_bags"],
	    "e": "🛍️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["cucumber"],
	    "e": "🥒",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-ba"],
	    "e": "🇧🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["school_satchel"],
	    "e": "🎒",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["office"],
	    "e": "🏢",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ox"],
	    "e": "🐂",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["zany_face", "grinning_face_with_one_large_and_one_small_eye"],
	    "e": "🤪",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["first_place_medal"],
	    "e": "🥇",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["leafy_green"],
	    "e": "🥬",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["radioactive_sign"],
	    "e": "☢️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bb"],
	    "e": "🇧🇧",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["post_office"],
	    "e": "🏣",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["water_buffalo"],
	    "e": "🐃",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["mans_shoe", "shoe"],
	    "e": "👞",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["stuck_out_tongue_closed_eyes"],
	    "e": "😝",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["second_place_medal"],
	    "e": "🥈",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["broccoli"],
	    "e": "🥦",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["biohazard_sign"],
	    "e": "☣️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bd"],
	    "e": "🇧🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["european_post_office"],
	    "e": "🏤",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["cow2"],
	    "e": "🐄",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["athletic_shoe"],
	    "e": "👟",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["money_mouth_face"],
	    "e": "🤑",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["third_place_medal"],
	    "e": "🥉",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["garlic"],
	    "e": "🧄",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["arrow_up"],
	    "e": "⬆️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-be"],
	    "e": "🇧🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hospital"],
	    "e": "🏥",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pig"],
	    "e": "🐷",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["hugging_face"],
	    "e": "🤗",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["hiking_boot"],
	    "e": "🥾",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["onion"],
	    "e": "🧅",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["arrow_upper_right"],
	    "e": "↗️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["soccer"],
	    "e": "⚽",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bf"],
	    "e": "🇧🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["mushroom"],
	    "e": "🍄",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["bank"],
	    "e": "🏦",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pig2"],
	    "e": "🐖",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_hand_over_mouth", "smiling_face_with_smiling_eyes_and_hand_covering_mouth"],
	    "e": "🤭",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["womans_flat_shoe"],
	    "e": "🥿",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["baseball"],
	    "e": "⚾",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_right"],
	    "e": "➡️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bg"],
	    "e": "🇧🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hotel"],
	    "e": "🏨",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["boar"],
	    "e": "🐗",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["high_heel"],
	    "e": "👠",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["shushing_face", "face_with_finger_covering_closed_lips"],
	    "e": "🤫",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["softball"],
	    "e": "🥎",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["peanuts"],
	    "e": "🥜",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["arrow_lower_right"],
	    "e": "↘️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bh"],
	    "e": "🇧🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["chestnut"],
	    "e": "🌰",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["basketball"],
	    "e": "🏀",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["love_hotel"],
	    "e": "🏩",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pig_nose"],
	    "e": "🐽",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["sandal"],
	    "e": "👡",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["thinking_face"],
	    "e": "🤔",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_down"],
	    "e": "⬇️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bi"],
	    "e": "🇧🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bread"],
	    "e": "🍞",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["volleyball"],
	    "e": "🏐",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["convenience_store"],
	    "e": "🏪",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ram"],
	    "e": "🐏",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["zipper_mouth_face"],
	    "e": "🤐",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["ballet_shoes"],
	    "e": "🩰",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["arrow_lower_left"],
	    "e": "↙️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bj"],
	    "e": "🇧🇯",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["football"],
	    "e": "🏈",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["school"],
	    "e": "🏫",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sheep"],
	    "e": "🐑",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["boot"],
	    "e": "👢",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_raised_eyebrow", "face_with_one_eyebrow_raised"],
	    "e": "🤨",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["croissant"],
	    "e": "🥐",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["arrow_left"],
	    "e": "⬅️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bl"],
	    "e": "🇧🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rugby_football"],
	    "e": "🏉",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["department_store"],
	    "e": "🏬",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["goat"],
	    "e": "🐐",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["crown"],
	    "e": "👑",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["neutral_face"],
	    "e": "😐",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["baguette_bread"],
	    "e": "🥖",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["arrow_upper_left"],
	    "e": "↖️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bm"],
	    "e": "🇧🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tennis"],
	    "e": "🎾",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["factory"],
	    "e": "🏭",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["dromedary_camel"],
	    "e": "🐪",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["womans_hat"],
	    "e": "👒",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["expressionless"],
	    "e": "😑",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["pretzel"],
	    "e": "🥨",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["arrow_up_down"],
	    "e": "↕️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bn"],
	    "e": "🇧🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tophat"],
	    "e": "🎩",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["japanese_castle"],
	    "e": "🏯",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["camel"],
	    "e": "🐫",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["no_mouth"],
	    "e": "😶",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flying_disc"],
	    "e": "🥏",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["bagel"],
	    "e": "🥯",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["left_right_arrow"],
	    "e": "↔️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bo"],
	    "e": "🇧🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["mortar_board"],
	    "e": "🎓",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bowling"],
	    "e": "🎳",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["european_castle"],
	    "e": "🏰",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["smirk"],
	    "e": "😏",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["pancakes"],
	    "e": "🥞",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["llama"],
	    "e": "🦙",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["leftwards_arrow_with_hook"],
	    "e": "↩️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bq"],
	    "e": "🇧🇶",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cricket_bat_and_ball"],
	    "e": "🏏",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["wedding"],
	    "e": "💒",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["unamused"],
	    "e": "😒",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["giraffe_face"],
	    "e": "🦒",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["waffle"],
	    "e": "🧇",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["billed_cap"],
	    "e": "🧢",
	    "c": 7,
	    "ver": "5.0"
	  }, {
	    "n": ["arrow_right_hook"],
	    "e": "↪️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-br"],
	    "e": "🇧🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["field_hockey_stick_and_ball"],
	    "e": "🏑",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["elephant"],
	    "e": "🐘",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["tokyo_tower"],
	    "e": "🗼",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_rolling_eyes"],
	    "e": "🙄",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["cheese_wedge"],
	    "e": "🧀",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["helmet_with_white_cross"],
	    "e": "⛑️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_heading_up"],
	    "e": "⤴️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bs"],
	    "e": "🇧🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["meat_on_bone"],
	    "e": "🍖",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["ice_hockey_stick_and_puck"],
	    "e": "🏒",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["prayer_beads"],
	    "e": "📿",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["statue_of_liberty"],
	    "e": "🗽",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["grimacing"],
	    "e": "😬",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["rhinoceros"],
	    "e": "🦏",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["arrow_heading_down"],
	    "e": "⤵️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bt"],
	    "e": "🇧🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["poultry_leg"],
	    "e": "🍗",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["lipstick"],
	    "e": "💄",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrows_clockwise"],
	    "e": "🔃",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["lying_face"],
	    "e": "🤥",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["lacrosse"],
	    "e": "🥍",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["hippopotamus"],
	    "e": "🦛",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["church"],
	    "e": "⛪",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-bv"],
	    "e": "🇧🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["table_tennis_paddle_and_ball"],
	    "e": "🏓",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["mouse"],
	    "e": "🐭",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["ring"],
	    "e": "💍",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrows_counterclockwise"],
	    "e": "🔄",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["mosque"],
	    "e": "🕌",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["relieved"],
	    "e": "😌",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["cut_of_meat"],
	    "e": "🥩",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-bw"],
	    "e": "🇧🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["badminton_racquet_and_shuttlecock"],
	    "e": "🏸",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["mouse2"],
	    "e": "🐁",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["gem"],
	    "e": "💎",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["back"],
	    "e": "🔙",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["pensive"],
	    "e": "😔",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["hindu_temple"],
	    "e": "🛕",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["bacon"],
	    "e": "🥓",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-by"],
	    "e": "🇧🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hamburger"],
	    "e": "🍔",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["rat"],
	    "e": "🐀",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["mute"],
	    "e": "🔇",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["end"],
	    "e": "🔚",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["synagogue"],
	    "e": "🕍",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sleepy"],
	    "e": "😪",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["boxing_glove"],
	    "e": "🥊",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-bz"],
	    "e": "🇧🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["fries"],
	    "e": "🍟",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["hamster"],
	    "e": "🐹",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["speaker"],
	    "e": "🔈",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["on"],
	    "e": "🔛",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["drooling_face"],
	    "e": "🤤",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["martial_arts_uniform"],
	    "e": "🥋",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["shinto_shrine"],
	    "e": "⛩️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ca"],
	    "e": "🇨🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["pizza"],
	    "e": "🍕",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["rabbit"],
	    "e": "🐰",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["sound"],
	    "e": "🔉",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["soon"],
	    "e": "🔜",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["kaaba"],
	    "e": "🕋",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sleeping"],
	    "e": "😴",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["goal_net"],
	    "e": "🥅",
	    "c": 2,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-cc"],
	    "e": "🇨🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hotdog"],
	    "e": "🌭",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["rabbit2"],
	    "e": "🐇",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["loud_sound"],
	    "e": "🔊",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["top"],
	    "e": "🔝",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["mask"],
	    "e": "😷",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["fountain"],
	    "e": "⛲",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["golf"],
	    "e": "⛳",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cd"],
	    "e": "🇨🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["chipmunk"],
	    "e": "🐿️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["loudspeaker"],
	    "e": "📢",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["place_of_worship"],
	    "e": "🛐",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_thermometer"],
	    "e": "🤒",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["sandwich"],
	    "e": "🥪",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["ice_skate"],
	    "e": "⛸️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["tent"],
	    "e": "⛺",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cf"],
	    "e": "🇨🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["foggy"],
	    "e": "🌁",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["taco"],
	    "e": "🌮",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["fishing_pole_and_fish"],
	    "e": "🎣",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["mega"],
	    "e": "📣",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_head_bandage"],
	    "e": "🤕",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["hedgehog"],
	    "e": "🦔",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["atom_symbol"],
	    "e": "⚛️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cg"],
	    "e": "🇨🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["night_with_stars"],
	    "e": "🌃",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["burrito"],
	    "e": "🌯",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["postal_horn"],
	    "e": "📯",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["om_symbol"],
	    "e": "🕉️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["nauseated_face"],
	    "e": "🤢",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["diving_mask"],
	    "e": "🤿",
	    "c": 2,
	    "ver": "12.1"
	  }, {
	    "n": ["bat"],
	    "e": "🦇",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-ch"],
	    "e": "🇨🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["running_shirt_with_sash"],
	    "e": "🎽",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["cityscape"],
	    "e": "🏙️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["bear"],
	    "e": "🐻",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["bell"],
	    "e": "🔔",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["face_vomiting", "face_with_open_mouth_vomiting"],
	    "e": "🤮",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["stuffed_flatbread"],
	    "e": "🥙",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["star_of_david"],
	    "e": "✡️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ci"],
	    "e": "🇨🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sunrise_over_mountains"],
	    "e": "🌄",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ski"],
	    "e": "🎿",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["koala"],
	    "e": "🐨",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["no_bell"],
	    "e": "🔕",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["sneezing_face"],
	    "e": "🤧",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["falafel"],
	    "e": "🧆",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["wheel_of_dharma"],
	    "e": "☸️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ck"],
	    "e": "🇨🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sunrise"],
	    "e": "🌅",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["musical_score"],
	    "e": "🎼",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["panda_face"],
	    "e": "🐼",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["sled"],
	    "e": "🛷",
	    "c": 2,
	    "ver": "5.0"
	  }, {
	    "n": ["egg"],
	    "e": "🥚",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["hot_face"],
	    "e": "🥵",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["yin_yang"],
	    "e": "☯️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cl"],
	    "e": "🇨🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["city_sunset"],
	    "e": "🌆",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["fried_egg", "cooking"],
	    "e": "🍳",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["musical_note"],
	    "e": "🎵",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["curling_stone"],
	    "e": "🥌",
	    "c": 2,
	    "ver": "5.0"
	  }, {
	    "n": ["cold_face"],
	    "e": "🥶",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["sloth"],
	    "e": "🦥",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["latin_cross"],
	    "e": "✝️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cm"],
	    "e": "🇨🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["city_sunrise"],
	    "e": "🌇",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["dart"],
	    "e": "🎯",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["notes"],
	    "e": "🎶",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["shallow_pan_of_food"],
	    "e": "🥘",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["woozy_face"],
	    "e": "🥴",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["otter"],
	    "e": "🦦",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["orthodox_cross"],
	    "e": "☦️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["cn", "flag-cn"],
	    "e": "🇨🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bridge_at_night"],
	    "e": "🌉",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["stew"],
	    "e": "🍲",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["studio_microphone"],
	    "e": "🎙️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["dizzy_face"],
	    "e": "😵",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["skunk"],
	    "e": "🦨",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["yo-yo"],
	    "e": "🪀",
	    "c": 2,
	    "ver": "12.1"
	  }, {
	    "n": ["star_and_crescent"],
	    "e": "☪️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-co"],
	    "e": "🇨🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["level_slider"],
	    "e": "🎚️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["exploding_head", "shocked_face_with_exploding_head"],
	    "e": "🤯",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["bowl_with_spoon"],
	    "e": "🥣",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["kangaroo"],
	    "e": "🦘",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["kite"],
	    "e": "🪁",
	    "c": 2,
	    "ver": "12.1"
	  }, {
	    "n": ["peace_symbol"],
	    "e": "☮️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["hotsprings"],
	    "e": "♨️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cp"],
	    "e": "🇨🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["control_knobs"],
	    "e": "🎛️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["carousel_horse"],
	    "e": "🎠",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["8ball"],
	    "e": "🎱",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["menorah_with_nine_branches"],
	    "e": "🕎",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_cowboy_hat"],
	    "e": "🤠",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["green_salad"],
	    "e": "🥗",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["badger"],
	    "e": "🦡",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-cr"],
	    "e": "🇨🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["popcorn"],
	    "e": "🍿",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["ferris_wheel"],
	    "e": "🎡",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["microphone"],
	    "e": "🎤",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["feet", "paw_prints"],
	    "e": "🐾",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["crystal_ball"],
	    "e": "🔮",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["six_pointed_star"],
	    "e": "🔯",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["partying_face"],
	    "e": "🥳",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-cu"],
	    "e": "🇨🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["roller_coaster"],
	    "e": "🎢",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["headphones"],
	    "e": "🎧",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["sunglasses"],
	    "e": "😎",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["turkey"],
	    "e": "🦃",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["butter"],
	    "e": "🧈",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["nazar_amulet"],
	    "e": "🧿",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["aries"],
	    "e": "♈",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cv"],
	    "e": "🇨🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["video_game"],
	    "e": "🎮",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["chicken"],
	    "e": "🐔",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["barber"],
	    "e": "💈",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["radio"],
	    "e": "📻",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["nerd_face"],
	    "e": "🤓",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["salt"],
	    "e": "🧂",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["taurus"],
	    "e": "♉",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cw"],
	    "e": "🇨🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["circus_tent"],
	    "e": "🎪",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["saxophone"],
	    "e": "🎷",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["rooster"],
	    "e": "🐓",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["joystick"],
	    "e": "🕹️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["canned_food"],
	    "e": "🥫",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["face_with_monocle"],
	    "e": "🧐",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["gemini"],
	    "e": "♊",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cx"],
	    "e": "🇨🇽",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bento"],
	    "e": "🍱",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["slot_machine"],
	    "e": "🎰",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["guitar"],
	    "e": "🎸",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["hatching_chick"],
	    "e": "🐣",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["confused"],
	    "e": "😕",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["steam_locomotive"],
	    "e": "🚂",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["cancer"],
	    "e": "♋",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cy"],
	    "e": "🇨🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rice_cracker"],
	    "e": "🍘",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["game_die"],
	    "e": "🎲",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["musical_keyboard"],
	    "e": "🎹",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["baby_chick"],
	    "e": "🐤",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["worried"],
	    "e": "😟",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["railway_car"],
	    "e": "🚃",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["leo"],
	    "e": "♌",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-cz"],
	    "e": "🇨🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rice_ball"],
	    "e": "🍙",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["trumpet"],
	    "e": "🎺",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["hatched_chick"],
	    "e": "🐥",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["slightly_frowning_face"],
	    "e": "🙁",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["bullettrain_side"],
	    "e": "🚄",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["jigsaw"],
	    "e": "🧩",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["virgo"],
	    "e": "♍",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["de", "flag-de"],
	    "e": "🇩🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rice"],
	    "e": "🍚",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["violin"],
	    "e": "🎻",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bird"],
	    "e": "🐦",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["bullettrain_front"],
	    "e": "🚅",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["teddy_bear"],
	    "e": "🧸",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["white_frowning_face"],
	    "e": "☹️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["libra"],
	    "e": "♎",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-dg"],
	    "e": "🇩🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["curry"],
	    "e": "🍛",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["penguin"],
	    "e": "🐧",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["open_mouth"],
	    "e": "😮",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["train2"],
	    "e": "🚆",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["banjo"],
	    "e": "🪕",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["scorpius"],
	    "e": "♏",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["spades"],
	    "e": "♠️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-dj"],
	    "e": "🇩🇯",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ramen"],
	    "e": "🍜",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["dove_of_peace"],
	    "e": "🕊️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["hushed"],
	    "e": "😯",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["metro"],
	    "e": "🚇",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["drum_with_drumsticks"],
	    "e": "🥁",
	    "c": 7,
	    "ver": "4.0"
	  }, {
	    "n": ["sagittarius"],
	    "e": "♐",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["hearts"],
	    "e": "♥️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-dk"],
	    "e": "🇩🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["spaghetti"],
	    "e": "🍝",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["iphone"],
	    "e": "📱",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["astonished"],
	    "e": "😲",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["light_rail"],
	    "e": "🚈",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["eagle"],
	    "e": "🦅",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["capricorn"],
	    "e": "♑",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["diamonds"],
	    "e": "♦️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-dm"],
	    "e": "🇩🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sweet_potato"],
	    "e": "🍠",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["calling"],
	    "e": "📲",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flushed"],
	    "e": "😳",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["station"],
	    "e": "🚉",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["duck"],
	    "e": "🦆",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["aquarius"],
	    "e": "♒",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clubs"],
	    "e": "♣️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-do"],
	    "e": "🇩🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["oden"],
	    "e": "🍢",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["tram"],
	    "e": "🚊",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pleading_face"],
	    "e": "🥺",
	    "c": 8,
	    "ver": "11.0"
	  }, {
	    "n": ["swan"],
	    "e": "🦢",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["phone", "telephone"],
	    "e": "☎️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["pisces"],
	    "e": "♓",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["chess_pawn"],
	    "e": "♟️",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["black_joker"],
	    "e": "🃏",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-dz"],
	    "e": "🇩🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sushi"],
	    "e": "🍣",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["telephone_receiver"],
	    "e": "📞",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["frowning"],
	    "e": "😦",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["monorail"],
	    "e": "🚝",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["owl"],
	    "e": "🦉",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["ophiuchus"],
	    "e": "⛎",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["mahjong"],
	    "e": "🀄",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ea"],
	    "e": "🇪🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["fried_shrimp"],
	    "e": "🍤",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["pager"],
	    "e": "📟",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["twisted_rightwards_arrows"],
	    "e": "🔀",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["anguished"],
	    "e": "😧",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mountain_railway"],
	    "e": "🚞",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flamingo"],
	    "e": "🦩",
	    "c": 6,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-ec"],
	    "e": "🇪🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["fish_cake"],
	    "e": "🍥",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["flower_playing_cards"],
	    "e": "🎴",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["fax"],
	    "e": "📠",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["repeat"],
	    "e": "🔁",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["fearful"],
	    "e": "😨",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["train"],
	    "e": "🚋",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["peacock"],
	    "e": "🦚",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-ee"],
	    "e": "🇪🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["performing_arts"],
	    "e": "🎭",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["repeat_one"],
	    "e": "🔂",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["battery"],
	    "e": "🔋",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["cold_sweat"],
	    "e": "😰",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["bus"],
	    "e": "🚌",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["moon_cake"],
	    "e": "🥮",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["parrot"],
	    "e": "🦜",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-eg"],
	    "e": "🇪🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dango"],
	    "e": "🍡",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["frog"],
	    "e": "🐸",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["electric_plug"],
	    "e": "🔌",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["frame_with_picture"],
	    "e": "🖼️",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["disappointed_relieved"],
	    "e": "😥",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["oncoming_bus"],
	    "e": "🚍",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_forward"],
	    "e": "▶️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-eh"],
	    "e": "🇪🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["art"],
	    "e": "🎨",
	    "c": 2,
	    "ver": "2.0"
	  }, {
	    "n": ["crocodile"],
	    "e": "🐊",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["computer"],
	    "e": "💻",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["cry"],
	    "e": "😢",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["trolleybus"],
	    "e": "🚎",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["dumpling"],
	    "e": "🥟",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["fast_forward"],
	    "e": "⏩",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-er"],
	    "e": "🇪🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["turtle"],
	    "e": "🐢",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["desktop_computer"],
	    "e": "🖥️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["sob"],
	    "e": "😭",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["minibus"],
	    "e": "🚐",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["fortune_cookie"],
	    "e": "🥠",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["thread"],
	    "e": "🧵",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["black_right_pointing_double_triangle_with_vertical_bar"],
	    "e": "⏭️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["es", "flag-es"],
	    "e": "🇪🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["printer"],
	    "e": "🖨️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["scream"],
	    "e": "😱",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["ambulance"],
	    "e": "🚑",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["takeout_box"],
	    "e": "🥡",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["lizard"],
	    "e": "🦎",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["yarn"],
	    "e": "🧶",
	    "c": 2,
	    "ver": "11.0"
	  }, {
	    "n": ["black_right_pointing_triangle_with_double_vertical_bar"],
	    "e": "⏯️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-et"],
	    "e": "🇪🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["snake"],
	    "e": "🐍",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["confounded"],
	    "e": "😖",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["fire_engine"],
	    "e": "🚒",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["crab"],
	    "e": "🦀",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["keyboard"],
	    "e": "⌨️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_backward"],
	    "e": "◀️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-eu"],
	    "e": "🇪🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dragon_face"],
	    "e": "🐲",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["three_button_mouse"],
	    "e": "🖱️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["persevere"],
	    "e": "😣",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["police_car"],
	    "e": "🚓",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lobster"],
	    "e": "🦞",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["rewind"],
	    "e": "⏪",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-fi"],
	    "e": "🇫🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dragon"],
	    "e": "🐉",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["trackball"],
	    "e": "🖲️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["disappointed"],
	    "e": "😞",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["oncoming_police_car"],
	    "e": "🚔",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["shrimp"],
	    "e": "🦐",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["black_left_pointing_double_triangle_with_vertical_bar"],
	    "e": "⏮️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-fj"],
	    "e": "🇫🇯",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["minidisc"],
	    "e": "💽",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_up_small"],
	    "e": "🔼",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["sweat"],
	    "e": "😓",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["taxi"],
	    "e": "🚕",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["squid"],
	    "e": "🦑",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["sauropod"],
	    "e": "🦕",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-fk"],
	    "e": "🇫🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["floppy_disk"],
	    "e": "💾",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["weary"],
	    "e": "😩",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["oncoming_taxi"],
	    "e": "🚖",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["t-rex"],
	    "e": "🦖",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["oyster"],
	    "e": "🦪",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["arrow_double_up"],
	    "e": "⏫",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-fm"],
	    "e": "🇫🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["icecream"],
	    "e": "🍦",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["whale"],
	    "e": "🐳",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["cd"],
	    "e": "💿",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["arrow_down_small"],
	    "e": "🔽",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["tired_face"],
	    "e": "😫",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["car", "red_car"],
	    "e": "🚗",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-fo"],
	    "e": "🇫🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["shaved_ice"],
	    "e": "🍧",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["whale2"],
	    "e": "🐋",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["dvd"],
	    "e": "📀",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["oncoming_automobile"],
	    "e": "🚘",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["yawning_face"],
	    "e": "🥱",
	    "c": 8,
	    "ver": "12.1"
	  }, {
	    "n": ["arrow_double_down"],
	    "e": "⏬",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["fr", "flag-fr"],
	    "e": "🇫🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ice_cream"],
	    "e": "🍨",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["dolphin", "flipper"],
	    "e": "🐬",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["triumph"],
	    "e": "😤",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["blue_car"],
	    "e": "🚙",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["abacus"],
	    "e": "🧮",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["double_vertical_bar"],
	    "e": "⏸️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ga"],
	    "e": "🇬🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["doughnut"],
	    "e": "🍩",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["movie_camera"],
	    "e": "🎥",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["fish"],
	    "e": "🐟",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["rage"],
	    "e": "😡",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["truck"],
	    "e": "🚚",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["black_square_for_stop"],
	    "e": "⏹️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["gb", "uk", "flag-gb"],
	    "e": "🇬🇧",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cookie"],
	    "e": "🍪",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["film_frames"],
	    "e": "🎞️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["tropical_fish"],
	    "e": "🐠",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["angry"],
	    "e": "😠",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["articulated_lorry"],
	    "e": "🚛",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["black_circle_for_record"],
	    "e": "⏺️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-gd"],
	    "e": "🇬🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["birthday"],
	    "e": "🎂",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["blowfish"],
	    "e": "🐡",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["film_projector"],
	    "e": "📽️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["tractor"],
	    "e": "🚜",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["face_with_symbols_on_mouth", "serious_face_with_symbols_covering_mouth"],
	    "e": "🤬",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["eject"],
	    "e": "⏏️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ge"],
	    "e": "🇬🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cake"],
	    "e": "🍰",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["cinema"],
	    "e": "🎦",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clapper"],
	    "e": "🎬",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["racing_car"],
	    "e": "🏎️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["smiling_imp"],
	    "e": "😈",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["shark"],
	    "e": "🦈",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-gf"],
	    "e": "🇬🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["racing_motorcycle"],
	    "e": "🏍️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["octopus"],
	    "e": "🐙",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["imp"],
	    "e": "👿",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["tv"],
	    "e": "📺",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["low_brightness"],
	    "e": "🔅",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["cupcake"],
	    "e": "🧁",
	    "c": 1,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-gg"],
	    "e": "🇬🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["shell"],
	    "e": "🐚",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["skull"],
	    "e": "💀",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["camera"],
	    "e": "📷",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["high_brightness"],
	    "e": "🔆",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["motor_scooter"],
	    "e": "🛵",
	    "c": 0,
	    "ver": "4.0"
	  }, {
	    "n": ["pie"],
	    "e": "🥧",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-gh"],
	    "e": "🇬🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["chocolate_bar"],
	    "e": "🍫",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["snail"],
	    "e": "🐌",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["signal_strength"],
	    "e": "📶",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["camera_with_flash"],
	    "e": "📸",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["manual_wheelchair"],
	    "e": "🦽",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["skull_and_crossbones"],
	    "e": "☠️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-gi"],
	    "e": "🇬🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["candy"],
	    "e": "🍬",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["hankey", "poop", "shit"],
	    "e": "💩",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["vibration_mode"],
	    "e": "📳",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["video_camera"],
	    "e": "📹",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["butterfly"],
	    "e": "🦋",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["motorized_wheelchair"],
	    "e": "🦼",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-gl"],
	    "e": "🇬🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["lollipop"],
	    "e": "🍭",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["bug"],
	    "e": "🐛",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["mobile_phone_off"],
	    "e": "📴",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["vhs"],
	    "e": "📼",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["auto_rickshaw"],
	    "e": "🛺",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["clown_face"],
	    "e": "🤡",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-gm"],
	    "e": "🇬🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["custard"],
	    "e": "🍮",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["ant"],
	    "e": "🐜",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["japanese_ogre"],
	    "e": "👹",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mag"],
	    "e": "🔍",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bike"],
	    "e": "🚲",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["female_sign"],
	    "e": "♀️",
	    "c": 4,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-gn"],
	    "e": "🇬🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["honey_pot"],
	    "e": "🍯",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["bee", "honeybee"],
	    "e": "🐝",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["japanese_goblin"],
	    "e": "👺",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mag_right"],
	    "e": "🔎",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["scooter"],
	    "e": "🛴",
	    "c": 0,
	    "ver": "4.0"
	  }, {
	    "n": ["male_sign"],
	    "e": "♂️",
	    "c": 4,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-gp"],
	    "e": "🇬🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["baby_bottle"],
	    "e": "🍼",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["beetle"],
	    "e": "🐞",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["ghost"],
	    "e": "👻",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["candle"],
	    "e": "🕯️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["skateboard"],
	    "e": "🛹",
	    "c": 0,
	    "ver": "11.0"
	  }, {
	    "n": ["medical_symbol", "staff_of_aesculapius"],
	    "e": "⚕️",
	    "c": 4,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-gq"],
	    "e": "🇬🇶",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["alien"],
	    "e": "👽",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["bulb"],
	    "e": "💡",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["busstop"],
	    "e": "🚏",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["glass_of_milk"],
	    "e": "🥛",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["cricket"],
	    "e": "🦗",
	    "c": 6,
	    "ver": "5.0"
	  }, {
	    "n": ["infinity"],
	    "e": "♾️",
	    "c": 4,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-gr"],
	    "e": "🇬🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["space_invader"],
	    "e": "👾",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flashlight"],
	    "e": "🔦",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["spider"],
	    "e": "🕷️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["motorway"],
	    "e": "🛣️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["coffee"],
	    "e": "☕",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["recycle"],
	    "e": "♻️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-gs"],
	    "e": "🇬🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tea"],
	    "e": "🍵",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["izakaya_lantern", "lantern"],
	    "e": "🏮",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["spider_web"],
	    "e": "🕸️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["railway_track"],
	    "e": "🛤️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["robot_face"],
	    "e": "🤖",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["fleur_de_lis"],
	    "e": "⚜️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-gt"],
	    "e": "🇬🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sake"],
	    "e": "🍶",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["trident"],
	    "e": "🔱",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["smiley_cat"],
	    "e": "😺",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["oil_drum"],
	    "e": "🛢️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["scorpion"],
	    "e": "🦂",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["diya_lamp"],
	    "e": "🪔",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-gu"],
	    "e": "🇬🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["champagne"],
	    "e": "🍾",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["notebook_with_decorative_cover"],
	    "e": "📔",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["name_badge"],
	    "e": "📛",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["smile_cat"],
	    "e": "😸",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mosquito"],
	    "e": "🦟",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["fuelpump"],
	    "e": "⛽",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-gw"],
	    "e": "🇬🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["wine_glass"],
	    "e": "🍷",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["closed_book"],
	    "e": "📕",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["beginner"],
	    "e": "🔰",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["joy_cat"],
	    "e": "😹",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["rotating_light"],
	    "e": "🚨",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["microbe"],
	    "e": "🦠",
	    "c": 6,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-gy"],
	    "e": "🇬🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cocktail"],
	    "e": "🍸",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["bouquet"],
	    "e": "💐",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["book", "open_book"],
	    "e": "📖",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["heart_eyes_cat"],
	    "e": "😻",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["traffic_light"],
	    "e": "🚥",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["o"],
	    "e": "⭕",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-hk"],
	    "e": "🇭🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cherry_blossom"],
	    "e": "🌸",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["tropical_drink"],
	    "e": "🍹",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["green_book"],
	    "e": "📗",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["smirk_cat"],
	    "e": "😼",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["vertical_traffic_light"],
	    "e": "🚦",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["white_check_mark"],
	    "e": "✅",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-hm"],
	    "e": "🇭🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["beer"],
	    "e": "🍺",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["white_flower"],
	    "e": "💮",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["blue_book"],
	    "e": "📘",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["kissing_cat"],
	    "e": "😽",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["octagonal_sign"],
	    "e": "🛑",
	    "c": 0,
	    "ver": "4.0"
	  }, {
	    "n": ["ballot_box_with_check"],
	    "e": "☑️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-hn"],
	    "e": "🇭🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["beers"],
	    "e": "🍻",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["rosette"],
	    "e": "🏵️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["orange_book"],
	    "e": "📙",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["scream_cat"],
	    "e": "🙀",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["construction"],
	    "e": "🚧",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["heavy_check_mark"],
	    "e": "✔️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-hr"],
	    "e": "🇭🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rose"],
	    "e": "🌹",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["books"],
	    "e": "📚",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["crying_cat_face"],
	    "e": "😿",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["clinking_glasses"],
	    "e": "🥂",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["anchor"],
	    "e": "⚓",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["heavy_multiplication_x"],
	    "e": "✖️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ht"],
	    "e": "🇭🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["notebook"],
	    "e": "📓",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["pouting_cat"],
	    "e": "😾",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["wilted_flower"],
	    "e": "🥀",
	    "c": 6,
	    "ver": "4.0"
	  }, {
	    "n": ["tumbler_glass"],
	    "e": "🥃",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["boat", "sailboat"],
	    "e": "⛵",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["x"],
	    "e": "❌",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-hu"],
	    "e": "🇭🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hibiscus"],
	    "e": "🌺",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["ledger"],
	    "e": "📒",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["see_no_evil"],
	    "e": "🙈",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["canoe"],
	    "e": "🛶",
	    "c": 0,
	    "ver": "4.0"
	  }, {
	    "n": ["cup_with_straw"],
	    "e": "🥤",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["negative_squared_cross_mark"],
	    "e": "❎",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ic"],
	    "e": "🇮🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sunflower"],
	    "e": "🌻",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["page_with_curl"],
	    "e": "📃",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["hear_no_evil"],
	    "e": "🙉",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["speedboat"],
	    "e": "🚤",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["beverage_box"],
	    "e": "🧃",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["heavy_plus_sign"],
	    "e": "➕",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-id"],
	    "e": "🇮🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["blossom"],
	    "e": "🌼",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["scroll"],
	    "e": "📜",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["speak_no_evil"],
	    "e": "🙊",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["passenger_ship"],
	    "e": "🛳️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["mate_drink"],
	    "e": "🧉",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["heavy_minus_sign"],
	    "e": "➖",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ie"],
	    "e": "🇮🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tulip"],
	    "e": "🌷",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["kiss"],
	    "e": "💋",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["page_facing_up"],
	    "e": "📄",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["ice_cube"],
	    "e": "🧊",
	    "c": 1,
	    "ver": "12.1"
	  }, {
	    "n": ["ferry"],
	    "e": "⛴️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["heavy_division_sign"],
	    "e": "➗",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-il"],
	    "e": "🇮🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["seedling"],
	    "e": "🌱",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["love_letter"],
	    "e": "💌",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["newspaper"],
	    "e": "📰",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["motor_boat"],
	    "e": "🛥️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["chopsticks"],
	    "e": "🥢",
	    "c": 1,
	    "ver": "5.0"
	  }, {
	    "n": ["curly_loop"],
	    "e": "➰",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-im"],
	    "e": "🇮🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["evergreen_tree"],
	    "e": "🌲",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["knife_fork_plate"],
	    "e": "🍽️",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["cupid"],
	    "e": "💘",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["rolled_up_newspaper"],
	    "e": "🗞️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["ship"],
	    "e": "🚢",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["loop"],
	    "e": "➿",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-in"],
	    "e": "🇮🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["deciduous_tree"],
	    "e": "🌳",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["fork_and_knife"],
	    "e": "🍴",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["gift_heart"],
	    "e": "💝",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["bookmark_tabs"],
	    "e": "📑",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["airplane"],
	    "e": "✈️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["part_alternation_mark"],
	    "e": "〽️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-io"],
	    "e": "🇮🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["palm_tree"],
	    "e": "🌴",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["sparkling_heart"],
	    "e": "💖",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["bookmark"],
	    "e": "🔖",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["small_airplane"],
	    "e": "🛩️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["spoon"],
	    "e": "🥄",
	    "c": 1,
	    "ver": "4.0"
	  }, {
	    "n": ["eight_spoked_asterisk"],
	    "e": "✳️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-iq"],
	    "e": "🇮🇶",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cactus"],
	    "e": "🌵",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["label"],
	    "e": "🏷️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["heartpulse"],
	    "e": "💗",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["hocho", "knife"],
	    "e": "🔪",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["airplane_departure"],
	    "e": "🛫",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["eight_pointed_black_star"],
	    "e": "✴️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ir"],
	    "e": "🇮🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ear_of_rice"],
	    "e": "🌾",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["amphora"],
	    "e": "🏺",
	    "c": 1,
	    "ver": "2.0"
	  }, {
	    "n": ["heartbeat"],
	    "e": "💓",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["moneybag"],
	    "e": "💰",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["airplane_arriving"],
	    "e": "🛬",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sparkle"],
	    "e": "❇️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-is"],
	    "e": "🇮🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["herb"],
	    "e": "🌿",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["revolving_hearts"],
	    "e": "💞",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["yen"],
	    "e": "💴",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["parachute"],
	    "e": "🪂",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["bangbang"],
	    "e": "‼️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["it", "flag-it"],
	    "e": "🇮🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["two_hearts"],
	    "e": "💕",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["dollar"],
	    "e": "💵",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["seat"],
	    "e": "💺",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["interrobang"],
	    "e": "⁉️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["shamrock"],
	    "e": "☘️",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-je"],
	    "e": "🇯🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["four_leaf_clover"],
	    "e": "🍀",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["heart_decoration"],
	    "e": "💟",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["euro"],
	    "e": "💶",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["helicopter"],
	    "e": "🚁",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["question"],
	    "e": "❓",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-jm"],
	    "e": "🇯🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["maple_leaf"],
	    "e": "🍁",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["pound"],
	    "e": "💷",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["suspension_railway"],
	    "e": "🚟",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["grey_question"],
	    "e": "❔",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["heavy_heart_exclamation_mark_ornament"],
	    "e": "❣️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-jo"],
	    "e": "🇯🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["fallen_leaf"],
	    "e": "🍂",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["broken_heart"],
	    "e": "💔",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["money_with_wings"],
	    "e": "💸",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["mountain_cableway"],
	    "e": "🚠",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["grey_exclamation"],
	    "e": "❕",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["jp", "flag-jp"],
	    "e": "🇯🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["leaves"],
	    "e": "🍃",
	    "c": 6,
	    "ver": "2.0"
	  }, {
	    "n": ["credit_card"],
	    "e": "💳",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["aerial_tramway"],
	    "e": "🚡",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["exclamation", "heavy_exclamation_mark"],
	    "e": "❗",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["heart"],
	    "e": "❤️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ke"],
	    "e": "🇰🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["satellite"],
	    "e": "🛰️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["orange_heart"],
	    "e": "🧡",
	    "c": 8,
	    "ver": "5.0"
	  }, {
	    "n": ["receipt"],
	    "e": "🧾",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["wavy_dash"],
	    "e": "〰️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["copyright"],
	    "e": "©️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-kg"],
	    "e": "🇰🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["yellow_heart"],
	    "e": "💛",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["chart"],
	    "e": "💹",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["rocket"],
	    "e": "🚀",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["registered"],
	    "e": "®️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-kh"],
	    "e": "🇰🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["green_heart"],
	    "e": "💚",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["currency_exchange"],
	    "e": "💱",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flying_saucer"],
	    "e": "🛸",
	    "c": 0,
	    "ver": "5.0"
	  }, {
	    "n": ["flag-ki"],
	    "e": "🇰🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["blue_heart"],
	    "e": "💙",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["heavy_dollar_sign"],
	    "e": "💲",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bellhop_bell"],
	    "e": "🛎️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["tm"],
	    "e": "™️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["hash"],
	    "e": "#️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-km"],
	    "e": "🇰🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["purple_heart"],
	    "e": "💜",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["luggage"],
	    "e": "🧳",
	    "c": 0,
	    "ver": "11.0"
	  }, {
	    "n": ["email", "envelope"],
	    "e": "✉️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["keycap_star"],
	    "e": "*️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-kn"],
	    "e": "🇰🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["e-mail"],
	    "e": "📧",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["brown_heart"],
	    "e": "🤎",
	    "c": 8,
	    "ver": "12.1"
	  }, {
	    "n": ["hourglass"],
	    "e": "⌛",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["zero"],
	    "e": "0️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-kp"],
	    "e": "🇰🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["incoming_envelope"],
	    "e": "📨",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["black_heart"],
	    "e": "🖤",
	    "c": 8,
	    "ver": "4.0"
	  }, {
	    "n": ["hourglass_flowing_sand"],
	    "e": "⏳",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["one"],
	    "e": "1️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["kr", "flag-kr"],
	    "e": "🇰🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["envelope_with_arrow"],
	    "e": "📩",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["white_heart"],
	    "e": "🤍",
	    "c": 8,
	    "ver": "12.1"
	  }, {
	    "n": ["watch"],
	    "e": "⌚",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["two"],
	    "e": "2️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-kw"],
	    "e": "🇰🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["100"],
	    "e": "💯",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["outbox_tray"],
	    "e": "📤",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["alarm_clock"],
	    "e": "⏰",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["three"],
	    "e": "3️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-ky"],
	    "e": "🇰🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["anger"],
	    "e": "💢",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["inbox_tray"],
	    "e": "📥",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["stopwatch"],
	    "e": "⏱️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["four"],
	    "e": "4️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-kz"],
	    "e": "🇰🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["boom", "collision"],
	    "e": "💥",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["package"],
	    "e": "📦",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["timer_clock"],
	    "e": "⏲️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["five"],
	    "e": "5️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-la"],
	    "e": "🇱🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dizzy"],
	    "e": "💫",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mailbox"],
	    "e": "📫",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["mantelpiece_clock"],
	    "e": "🕰️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["six"],
	    "e": "6️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-lb"],
	    "e": "🇱🇧",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sweat_drops"],
	    "e": "💦",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mailbox_closed"],
	    "e": "📪",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock12"],
	    "e": "🕛",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["seven"],
	    "e": "7️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-lc"],
	    "e": "🇱🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dash"],
	    "e": "💨",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["mailbox_with_mail"],
	    "e": "📬",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock1230"],
	    "e": "🕧",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["eight"],
	    "e": "8️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-li"],
	    "e": "🇱🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["mailbox_with_no_mail"],
	    "e": "📭",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock1"],
	    "e": "🕐",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["hole"],
	    "e": "🕳️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["nine"],
	    "e": "9️⃣",
	    "c": 4,
	    "ver": "0.0"
	  }, {
	    "n": ["flag-lk"],
	    "e": "🇱🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bomb"],
	    "e": "💣",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["postbox"],
	    "e": "📮",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock130"],
	    "e": "🕜",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-lr"],
	    "e": "🇱🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["speech_balloon"],
	    "e": "💬",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["keycap_ten"],
	    "e": "🔟",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock2"],
	    "e": "🕑",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ballot_box_with_ballot"],
	    "e": "🗳️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ls"],
	    "e": "🇱🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["eye-in-speech-bubble"],
	    "e": "👁️‍🗨️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["capital_abcd"],
	    "e": "🔠",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock230"],
	    "e": "🕝",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pencil2"],
	    "e": "✏️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-lt"],
	    "e": "🇱🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["abcd"],
	    "e": "🔡",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock3"],
	    "e": "🕒",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["left_speech_bubble"],
	    "e": "🗨️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["black_nib"],
	    "e": "✒️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-lu"],
	    "e": "🇱🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["1234"],
	    "e": "🔢",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock330"],
	    "e": "🕞",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lower_left_fountain_pen"],
	    "e": "🖋️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["right_anger_bubble"],
	    "e": "🗯️",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-lv"],
	    "e": "🇱🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["thought_balloon"],
	    "e": "💭",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["symbols"],
	    "e": "🔣",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock4"],
	    "e": "🕓",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lower_left_ballpoint_pen"],
	    "e": "🖊️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ly"],
	    "e": "🇱🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["zzz"],
	    "e": "💤",
	    "c": 8,
	    "ver": "2.0"
	  }, {
	    "n": ["abc"],
	    "e": "🔤",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["clock430"],
	    "e": "🕟",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lower_left_paintbrush"],
	    "e": "🖌️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["a"],
	    "e": "🅰️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ma"],
	    "e": "🇲🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["wave"],
	    "e": "👋",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "wave-1F3FB",
	        "n": "wave",
	        "e": "👋🏻"
	      },
	      "1F3FC": {
	        "k": "wave-1F3FC",
	        "n": "wave",
	        "e": "👋🏼"
	      },
	      "1F3FD": {
	        "k": "wave-1F3FD",
	        "n": "wave",
	        "e": "👋🏽"
	      },
	      "1F3FE": {
	        "k": "wave-1F3FE",
	        "n": "wave",
	        "e": "👋🏾"
	      },
	      "1F3FF": {
	        "k": "wave-1F3FF",
	        "n": "wave",
	        "e": "👋🏿"
	      }
	    }
	  }, {
	    "n": ["clock5"],
	    "e": "🕔",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lower_left_crayon"],
	    "e": "🖍️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["ab"],
	    "e": "🆎",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mc"],
	    "e": "🇲🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["memo", "pencil"],
	    "e": "📝",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock530"],
	    "e": "🕠",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["raised_back_of_hand"],
	    "e": "🤚",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "raised_back_of_hand-1F3FB",
	        "n": "raised_back_of_hand",
	        "e": "🤚🏻"
	      },
	      "1F3FC": {
	        "k": "raised_back_of_hand-1F3FC",
	        "n": "raised_back_of_hand",
	        "e": "🤚🏼"
	      },
	      "1F3FD": {
	        "k": "raised_back_of_hand-1F3FD",
	        "n": "raised_back_of_hand",
	        "e": "🤚🏽"
	      },
	      "1F3FE": {
	        "k": "raised_back_of_hand-1F3FE",
	        "n": "raised_back_of_hand",
	        "e": "🤚🏾"
	      },
	      "1F3FF": {
	        "k": "raised_back_of_hand-1F3FF",
	        "n": "raised_back_of_hand",
	        "e": "🤚🏿"
	      }
	    }
	  }, {
	    "n": ["b"],
	    "e": "🅱️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-md"],
	    "e": "🇲🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["briefcase"],
	    "e": "💼",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock6"],
	    "e": "🕕",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["raised_hand_with_fingers_splayed"],
	    "e": "🖐️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "raised_hand_with_fingers_splayed-1F3FB",
	        "n": "raised_hand_with_fingers_splayed",
	        "e": "🖐🏻"
	      },
	      "1F3FC": {
	        "k": "raised_hand_with_fingers_splayed-1F3FC",
	        "n": "raised_hand_with_fingers_splayed",
	        "e": "🖐🏼"
	      },
	      "1F3FD": {
	        "k": "raised_hand_with_fingers_splayed-1F3FD",
	        "n": "raised_hand_with_fingers_splayed",
	        "e": "🖐🏽"
	      },
	      "1F3FE": {
	        "k": "raised_hand_with_fingers_splayed-1F3FE",
	        "n": "raised_hand_with_fingers_splayed",
	        "e": "🖐🏾"
	      },
	      "1F3FF": {
	        "k": "raised_hand_with_fingers_splayed-1F3FF",
	        "n": "raised_hand_with_fingers_splayed",
	        "e": "🖐🏿"
	      }
	    }
	  }, {
	    "n": ["cl"],
	    "e": "🆑",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-me"],
	    "e": "🇲🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["file_folder"],
	    "e": "📁",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock630"],
	    "e": "🕡",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["hand", "raised_hand"],
	    "e": "✋",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "hand-1F3FB",
	        "n": "hand",
	        "e": "✋🏻"
	      },
	      "1F3FC": {
	        "k": "hand-1F3FC",
	        "n": "hand",
	        "e": "✋🏼"
	      },
	      "1F3FD": {
	        "k": "hand-1F3FD",
	        "n": "hand",
	        "e": "✋🏽"
	      },
	      "1F3FE": {
	        "k": "hand-1F3FE",
	        "n": "hand",
	        "e": "✋🏾"
	      },
	      "1F3FF": {
	        "k": "hand-1F3FF",
	        "n": "hand",
	        "e": "✋🏿"
	      }
	    }
	  }, {
	    "n": ["cool"],
	    "e": "🆒",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mf"],
	    "e": "🇲🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["open_file_folder"],
	    "e": "📂",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock7"],
	    "e": "🕖",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["spock-hand"],
	    "e": "🖖",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "spock-hand-1F3FB",
	        "n": "spock-hand",
	        "e": "🖖🏻"
	      },
	      "1F3FC": {
	        "k": "spock-hand-1F3FC",
	        "n": "spock-hand",
	        "e": "🖖🏼"
	      },
	      "1F3FD": {
	        "k": "spock-hand-1F3FD",
	        "n": "spock-hand",
	        "e": "🖖🏽"
	      },
	      "1F3FE": {
	        "k": "spock-hand-1F3FE",
	        "n": "spock-hand",
	        "e": "🖖🏾"
	      },
	      "1F3FF": {
	        "k": "spock-hand-1F3FF",
	        "n": "spock-hand",
	        "e": "🖖🏿"
	      }
	    }
	  }, {
	    "n": ["free"],
	    "e": "🆓",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mg"],
	    "e": "🇲🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ok_hand"],
	    "e": "👌",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "ok_hand-1F3FB",
	        "n": "ok_hand",
	        "e": "👌🏻"
	      },
	      "1F3FC": {
	        "k": "ok_hand-1F3FC",
	        "n": "ok_hand",
	        "e": "👌🏼"
	      },
	      "1F3FD": {
	        "k": "ok_hand-1F3FD",
	        "n": "ok_hand",
	        "e": "👌🏽"
	      },
	      "1F3FE": {
	        "k": "ok_hand-1F3FE",
	        "n": "ok_hand",
	        "e": "👌🏾"
	      },
	      "1F3FF": {
	        "k": "ok_hand-1F3FF",
	        "n": "ok_hand",
	        "e": "👌🏿"
	      }
	    }
	  }, {
	    "n": ["clock730"],
	    "e": "🕢",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["card_index_dividers"],
	    "e": "🗂️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mh"],
	    "e": "🇲🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["date"],
	    "e": "📅",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock8"],
	    "e": "🕗",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pinching_hand"],
	    "e": "🤏",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "pinching_hand-1F3FB",
	        "n": "pinching_hand",
	        "e": "🤏🏻"
	      },
	      "1F3FC": {
	        "k": "pinching_hand-1F3FC",
	        "n": "pinching_hand",
	        "e": "🤏🏼"
	      },
	      "1F3FD": {
	        "k": "pinching_hand-1F3FD",
	        "n": "pinching_hand",
	        "e": "🤏🏽"
	      },
	      "1F3FE": {
	        "k": "pinching_hand-1F3FE",
	        "n": "pinching_hand",
	        "e": "🤏🏾"
	      },
	      "1F3FF": {
	        "k": "pinching_hand-1F3FF",
	        "n": "pinching_hand",
	        "e": "🤏🏿"
	      }
	    }
	  }, {
	    "n": ["information_source"],
	    "e": "ℹ️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["id"],
	    "e": "🆔",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mk"],
	    "e": "🇲🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["calendar"],
	    "e": "📆",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock830"],
	    "e": "🕣",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["v"],
	    "e": "✌️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "v-1F3FB",
	        "n": "v",
	        "e": "✌🏻"
	      },
	      "1F3FC": {
	        "k": "v-1F3FC",
	        "n": "v",
	        "e": "✌🏼"
	      },
	      "1F3FD": {
	        "k": "v-1F3FD",
	        "n": "v",
	        "e": "✌🏽"
	      },
	      "1F3FE": {
	        "k": "v-1F3FE",
	        "n": "v",
	        "e": "✌🏾"
	      },
	      "1F3FF": {
	        "k": "v-1F3FF",
	        "n": "v",
	        "e": "✌🏿"
	      }
	    }
	  }, {
	    "n": ["flag-ml"],
	    "e": "🇲🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["clock9"],
	    "e": "🕘",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["spiral_note_pad"],
	    "e": "🗒️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["crossed_fingers", "hand_with_index_and_middle_fingers_crossed"],
	    "e": "🤞",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "crossed_fingers-1F3FB",
	        "n": "crossed_fingers",
	        "e": "🤞🏻"
	      },
	      "1F3FC": {
	        "k": "crossed_fingers-1F3FC",
	        "n": "crossed_fingers",
	        "e": "🤞🏼"
	      },
	      "1F3FD": {
	        "k": "crossed_fingers-1F3FD",
	        "n": "crossed_fingers",
	        "e": "🤞🏽"
	      },
	      "1F3FE": {
	        "k": "crossed_fingers-1F3FE",
	        "n": "crossed_fingers",
	        "e": "🤞🏾"
	      },
	      "1F3FF": {
	        "k": "crossed_fingers-1F3FF",
	        "n": "crossed_fingers",
	        "e": "🤞🏿"
	      }
	    }
	  }, {
	    "n": ["m"],
	    "e": "Ⓜ️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["new"],
	    "e": "🆕",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mm"],
	    "e": "🇲🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["clock930"],
	    "e": "🕤",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["spiral_calendar_pad"],
	    "e": "🗓️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["i_love_you_hand_sign"],
	    "e": "🤟",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "i_love_you_hand_sign-1F3FB",
	        "n": "i_love_you_hand_sign",
	        "e": "🤟🏻"
	      },
	      "1F3FC": {
	        "k": "i_love_you_hand_sign-1F3FC",
	        "n": "i_love_you_hand_sign",
	        "e": "🤟🏼"
	      },
	      "1F3FD": {
	        "k": "i_love_you_hand_sign-1F3FD",
	        "n": "i_love_you_hand_sign",
	        "e": "🤟🏽"
	      },
	      "1F3FE": {
	        "k": "i_love_you_hand_sign-1F3FE",
	        "n": "i_love_you_hand_sign",
	        "e": "🤟🏾"
	      },
	      "1F3FF": {
	        "k": "i_love_you_hand_sign-1F3FF",
	        "n": "i_love_you_hand_sign",
	        "e": "🤟🏿"
	      }
	    }
	  }, {
	    "n": ["ng"],
	    "e": "🆖",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mn"],
	    "e": "🇲🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["card_index"],
	    "e": "📇",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock10"],
	    "e": "🕙",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["the_horns", "sign_of_the_horns"],
	    "e": "🤘",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "the_horns-1F3FB",
	        "n": "the_horns",
	        "e": "🤘🏻"
	      },
	      "1F3FC": {
	        "k": "the_horns-1F3FC",
	        "n": "the_horns",
	        "e": "🤘🏼"
	      },
	      "1F3FD": {
	        "k": "the_horns-1F3FD",
	        "n": "the_horns",
	        "e": "🤘🏽"
	      },
	      "1F3FE": {
	        "k": "the_horns-1F3FE",
	        "n": "the_horns",
	        "e": "🤘🏾"
	      },
	      "1F3FF": {
	        "k": "the_horns-1F3FF",
	        "n": "the_horns",
	        "e": "🤘🏿"
	      }
	    }
	  }, {
	    "n": ["o2"],
	    "e": "🅾️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mo"],
	    "e": "🇲🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["chart_with_upwards_trend"],
	    "e": "📈",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock1030"],
	    "e": "🕥",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["call_me_hand"],
	    "e": "🤙",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "call_me_hand-1F3FB",
	        "n": "call_me_hand",
	        "e": "🤙🏻"
	      },
	      "1F3FC": {
	        "k": "call_me_hand-1F3FC",
	        "n": "call_me_hand",
	        "e": "🤙🏼"
	      },
	      "1F3FD": {
	        "k": "call_me_hand-1F3FD",
	        "n": "call_me_hand",
	        "e": "🤙🏽"
	      },
	      "1F3FE": {
	        "k": "call_me_hand-1F3FE",
	        "n": "call_me_hand",
	        "e": "🤙🏾"
	      },
	      "1F3FF": {
	        "k": "call_me_hand-1F3FF",
	        "n": "call_me_hand",
	        "e": "🤙🏿"
	      }
	    }
	  }, {
	    "n": ["ok"],
	    "e": "🆗",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mp"],
	    "e": "🇲🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["point_left"],
	    "e": "👈",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "point_left-1F3FB",
	        "n": "point_left",
	        "e": "👈🏻"
	      },
	      "1F3FC": {
	        "k": "point_left-1F3FC",
	        "n": "point_left",
	        "e": "👈🏼"
	      },
	      "1F3FD": {
	        "k": "point_left-1F3FD",
	        "n": "point_left",
	        "e": "👈🏽"
	      },
	      "1F3FE": {
	        "k": "point_left-1F3FE",
	        "n": "point_left",
	        "e": "👈🏾"
	      },
	      "1F3FF": {
	        "k": "point_left-1F3FF",
	        "n": "point_left",
	        "e": "👈🏿"
	      }
	    }
	  }, {
	    "n": ["chart_with_downwards_trend"],
	    "e": "📉",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock11"],
	    "e": "🕚",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["parking"],
	    "e": "🅿️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mq"],
	    "e": "🇲🇶",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["point_right"],
	    "e": "👉",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "point_right-1F3FB",
	        "n": "point_right",
	        "e": "👉🏻"
	      },
	      "1F3FC": {
	        "k": "point_right-1F3FC",
	        "n": "point_right",
	        "e": "👉🏼"
	      },
	      "1F3FD": {
	        "k": "point_right-1F3FD",
	        "n": "point_right",
	        "e": "👉🏽"
	      },
	      "1F3FE": {
	        "k": "point_right-1F3FE",
	        "n": "point_right",
	        "e": "👉🏾"
	      },
	      "1F3FF": {
	        "k": "point_right-1F3FF",
	        "n": "point_right",
	        "e": "👉🏿"
	      }
	    }
	  }, {
	    "n": ["bar_chart"],
	    "e": "📊",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["clock1130"],
	    "e": "🕦",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["sos"],
	    "e": "🆘",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mr"],
	    "e": "🇲🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["new_moon"],
	    "e": "🌑",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["point_up_2"],
	    "e": "👆",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "point_up_2-1F3FB",
	        "n": "point_up_2",
	        "e": "👆🏻"
	      },
	      "1F3FC": {
	        "k": "point_up_2-1F3FC",
	        "n": "point_up_2",
	        "e": "👆🏼"
	      },
	      "1F3FD": {
	        "k": "point_up_2-1F3FD",
	        "n": "point_up_2",
	        "e": "👆🏽"
	      },
	      "1F3FE": {
	        "k": "point_up_2-1F3FE",
	        "n": "point_up_2",
	        "e": "👆🏾"
	      },
	      "1F3FF": {
	        "k": "point_up_2-1F3FF",
	        "n": "point_up_2",
	        "e": "👆🏿"
	      }
	    }
	  }, {
	    "n": ["clipboard"],
	    "e": "📋",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["up"],
	    "e": "🆙",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ms"],
	    "e": "🇲🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["waxing_crescent_moon"],
	    "e": "🌒",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["pushpin"],
	    "e": "📌",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["middle_finger", "reversed_hand_with_middle_finger_extended"],
	    "e": "🖕",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "middle_finger-1F3FB",
	        "n": "middle_finger",
	        "e": "🖕🏻"
	      },
	      "1F3FC": {
	        "k": "middle_finger-1F3FC",
	        "n": "middle_finger",
	        "e": "🖕🏼"
	      },
	      "1F3FD": {
	        "k": "middle_finger-1F3FD",
	        "n": "middle_finger",
	        "e": "🖕🏽"
	      },
	      "1F3FE": {
	        "k": "middle_finger-1F3FE",
	        "n": "middle_finger",
	        "e": "🖕🏾"
	      },
	      "1F3FF": {
	        "k": "middle_finger-1F3FF",
	        "n": "middle_finger",
	        "e": "🖕🏿"
	      }
	    }
	  }, {
	    "n": ["vs"],
	    "e": "🆚",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mt"],
	    "e": "🇲🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["first_quarter_moon"],
	    "e": "🌓",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["point_down"],
	    "e": "👇",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "point_down-1F3FB",
	        "n": "point_down",
	        "e": "👇🏻"
	      },
	      "1F3FC": {
	        "k": "point_down-1F3FC",
	        "n": "point_down",
	        "e": "👇🏼"
	      },
	      "1F3FD": {
	        "k": "point_down-1F3FD",
	        "n": "point_down",
	        "e": "👇🏽"
	      },
	      "1F3FE": {
	        "k": "point_down-1F3FE",
	        "n": "point_down",
	        "e": "👇🏾"
	      },
	      "1F3FF": {
	        "k": "point_down-1F3FF",
	        "n": "point_down",
	        "e": "👇🏿"
	      }
	    }
	  }, {
	    "n": ["round_pushpin"],
	    "e": "📍",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mu"],
	    "e": "🇲🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["koko"],
	    "e": "🈁",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["moon", "waxing_gibbous_moon"],
	    "e": "🌔",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["paperclip"],
	    "e": "📎",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["point_up"],
	    "e": "☝️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "point_up-1F3FB",
	        "n": "point_up",
	        "e": "☝🏻"
	      },
	      "1F3FC": {
	        "k": "point_up-1F3FC",
	        "n": "point_up",
	        "e": "☝🏼"
	      },
	      "1F3FD": {
	        "k": "point_up-1F3FD",
	        "n": "point_up",
	        "e": "☝🏽"
	      },
	      "1F3FE": {
	        "k": "point_up-1F3FE",
	        "n": "point_up",
	        "e": "☝🏾"
	      },
	      "1F3FF": {
	        "k": "point_up-1F3FF",
	        "n": "point_up",
	        "e": "☝🏿"
	      }
	    }
	  }, {
	    "n": ["flag-mv"],
	    "e": "🇲🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["sa"],
	    "e": "🈂️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["full_moon"],
	    "e": "🌕",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["+1", "thumbsup"],
	    "e": "👍",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "+1-1F3FB",
	        "n": "+1",
	        "e": "👍🏻"
	      },
	      "1F3FC": {
	        "k": "+1-1F3FC",
	        "n": "+1",
	        "e": "👍🏼"
	      },
	      "1F3FD": {
	        "k": "+1-1F3FD",
	        "n": "+1",
	        "e": "👍🏽"
	      },
	      "1F3FE": {
	        "k": "+1-1F3FE",
	        "n": "+1",
	        "e": "👍🏾"
	      },
	      "1F3FF": {
	        "k": "+1-1F3FF",
	        "n": "+1",
	        "e": "👍🏿"
	      }
	    }
	  }, {
	    "n": ["linked_paperclips"],
	    "e": "🖇️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mw"],
	    "e": "🇲🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u6708"],
	    "e": "🈷️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["waning_gibbous_moon"],
	    "e": "🌖",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["-1", "thumbsdown"],
	    "e": "👎",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "-1-1F3FB",
	        "n": "-1",
	        "e": "👎🏻"
	      },
	      "1F3FC": {
	        "k": "-1-1F3FC",
	        "n": "-1",
	        "e": "👎🏼"
	      },
	      "1F3FD": {
	        "k": "-1-1F3FD",
	        "n": "-1",
	        "e": "👎🏽"
	      },
	      "1F3FE": {
	        "k": "-1-1F3FE",
	        "n": "-1",
	        "e": "👎🏾"
	      },
	      "1F3FF": {
	        "k": "-1-1F3FF",
	        "n": "-1",
	        "e": "👎🏿"
	      }
	    }
	  }, {
	    "n": ["straight_ruler"],
	    "e": "📏",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mx"],
	    "e": "🇲🇽",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u6709"],
	    "e": "🈶",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["last_quarter_moon"],
	    "e": "🌗",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["triangular_ruler"],
	    "e": "📐",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["fist"],
	    "e": "✊",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "fist-1F3FB",
	        "n": "fist",
	        "e": "✊🏻"
	      },
	      "1F3FC": {
	        "k": "fist-1F3FC",
	        "n": "fist",
	        "e": "✊🏼"
	      },
	      "1F3FD": {
	        "k": "fist-1F3FD",
	        "n": "fist",
	        "e": "✊🏽"
	      },
	      "1F3FE": {
	        "k": "fist-1F3FE",
	        "n": "fist",
	        "e": "✊🏾"
	      },
	      "1F3FF": {
	        "k": "fist-1F3FF",
	        "n": "fist",
	        "e": "✊🏿"
	      }
	    }
	  }, {
	    "n": ["flag-my"],
	    "e": "🇲🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u6307"],
	    "e": "🈯",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["waning_crescent_moon"],
	    "e": "🌘",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["facepunch", "punch"],
	    "e": "👊",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "facepunch-1F3FB",
	        "n": "facepunch",
	        "e": "👊🏻"
	      },
	      "1F3FC": {
	        "k": "facepunch-1F3FC",
	        "n": "facepunch",
	        "e": "👊🏼"
	      },
	      "1F3FD": {
	        "k": "facepunch-1F3FD",
	        "n": "facepunch",
	        "e": "👊🏽"
	      },
	      "1F3FE": {
	        "k": "facepunch-1F3FE",
	        "n": "facepunch",
	        "e": "👊🏾"
	      },
	      "1F3FF": {
	        "k": "facepunch-1F3FF",
	        "n": "facepunch",
	        "e": "👊🏿"
	      }
	    }
	  }, {
	    "n": ["scissors"],
	    "e": "✂️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-mz"],
	    "e": "🇲🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ideograph_advantage"],
	    "e": "🉐",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["crescent_moon"],
	    "e": "🌙",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["card_file_box"],
	    "e": "🗃️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["left-facing_fist"],
	    "e": "🤛",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "left-facing_fist-1F3FB",
	        "n": "left-facing_fist",
	        "e": "🤛🏻"
	      },
	      "1F3FC": {
	        "k": "left-facing_fist-1F3FC",
	        "n": "left-facing_fist",
	        "e": "🤛🏼"
	      },
	      "1F3FD": {
	        "k": "left-facing_fist-1F3FD",
	        "n": "left-facing_fist",
	        "e": "🤛🏽"
	      },
	      "1F3FE": {
	        "k": "left-facing_fist-1F3FE",
	        "n": "left-facing_fist",
	        "e": "🤛🏾"
	      },
	      "1F3FF": {
	        "k": "left-facing_fist-1F3FF",
	        "n": "left-facing_fist",
	        "e": "🤛🏿"
	      }
	    }
	  }, {
	    "n": ["flag-na"],
	    "e": "🇳🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u5272"],
	    "e": "🈹",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["new_moon_with_face"],
	    "e": "🌚",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["file_cabinet"],
	    "e": "🗄️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["right-facing_fist"],
	    "e": "🤜",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "right-facing_fist-1F3FB",
	        "n": "right-facing_fist",
	        "e": "🤜🏻"
	      },
	      "1F3FC": {
	        "k": "right-facing_fist-1F3FC",
	        "n": "right-facing_fist",
	        "e": "🤜🏼"
	      },
	      "1F3FD": {
	        "k": "right-facing_fist-1F3FD",
	        "n": "right-facing_fist",
	        "e": "🤜🏽"
	      },
	      "1F3FE": {
	        "k": "right-facing_fist-1F3FE",
	        "n": "right-facing_fist",
	        "e": "🤜🏾"
	      },
	      "1F3FF": {
	        "k": "right-facing_fist-1F3FF",
	        "n": "right-facing_fist",
	        "e": "🤜🏿"
	      }
	    }
	  }, {
	    "n": ["flag-nc"],
	    "e": "🇳🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u7121"],
	    "e": "🈚",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["first_quarter_moon_with_face"],
	    "e": "🌛",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["clap"],
	    "e": "👏",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "clap-1F3FB",
	        "n": "clap",
	        "e": "👏🏻"
	      },
	      "1F3FC": {
	        "k": "clap-1F3FC",
	        "n": "clap",
	        "e": "👏🏼"
	      },
	      "1F3FD": {
	        "k": "clap-1F3FD",
	        "n": "clap",
	        "e": "👏🏽"
	      },
	      "1F3FE": {
	        "k": "clap-1F3FE",
	        "n": "clap",
	        "e": "👏🏾"
	      },
	      "1F3FF": {
	        "k": "clap-1F3FF",
	        "n": "clap",
	        "e": "👏🏿"
	      }
	    }
	  }, {
	    "n": ["wastebasket"],
	    "e": "🗑️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ne"],
	    "e": "🇳🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u7981"],
	    "e": "🈲",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["last_quarter_moon_with_face"],
	    "e": "🌜",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lock"],
	    "e": "🔒",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["raised_hands"],
	    "e": "🙌",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "raised_hands-1F3FB",
	        "n": "raised_hands",
	        "e": "🙌🏻"
	      },
	      "1F3FC": {
	        "k": "raised_hands-1F3FC",
	        "n": "raised_hands",
	        "e": "🙌🏼"
	      },
	      "1F3FD": {
	        "k": "raised_hands-1F3FD",
	        "n": "raised_hands",
	        "e": "🙌🏽"
	      },
	      "1F3FE": {
	        "k": "raised_hands-1F3FE",
	        "n": "raised_hands",
	        "e": "🙌🏾"
	      },
	      "1F3FF": {
	        "k": "raised_hands-1F3FF",
	        "n": "raised_hands",
	        "e": "🙌🏿"
	      }
	    }
	  }, {
	    "n": ["flag-nf"],
	    "e": "🇳🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["accept"],
	    "e": "🉑",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["thermometer"],
	    "e": "🌡️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["open_hands"],
	    "e": "👐",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "open_hands-1F3FB",
	        "n": "open_hands",
	        "e": "👐🏻"
	      },
	      "1F3FC": {
	        "k": "open_hands-1F3FC",
	        "n": "open_hands",
	        "e": "👐🏼"
	      },
	      "1F3FD": {
	        "k": "open_hands-1F3FD",
	        "n": "open_hands",
	        "e": "👐🏽"
	      },
	      "1F3FE": {
	        "k": "open_hands-1F3FE",
	        "n": "open_hands",
	        "e": "👐🏾"
	      },
	      "1F3FF": {
	        "k": "open_hands-1F3FF",
	        "n": "open_hands",
	        "e": "👐🏿"
	      }
	    }
	  }, {
	    "n": ["unlock"],
	    "e": "🔓",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ng"],
	    "e": "🇳🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u7533"],
	    "e": "🈸",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["lock_with_ink_pen"],
	    "e": "🔏",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["palms_up_together"],
	    "e": "🤲",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "palms_up_together-1F3FB",
	        "n": "palms_up_together",
	        "e": "🤲🏻"
	      },
	      "1F3FC": {
	        "k": "palms_up_together-1F3FC",
	        "n": "palms_up_together",
	        "e": "🤲🏼"
	      },
	      "1F3FD": {
	        "k": "palms_up_together-1F3FD",
	        "n": "palms_up_together",
	        "e": "🤲🏽"
	      },
	      "1F3FE": {
	        "k": "palms_up_together-1F3FE",
	        "n": "palms_up_together",
	        "e": "🤲🏾"
	      },
	      "1F3FF": {
	        "k": "palms_up_together-1F3FF",
	        "n": "palms_up_together",
	        "e": "🤲🏿"
	      }
	    }
	  }, {
	    "n": ["sunny"],
	    "e": "☀️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ni"],
	    "e": "🇳🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u5408"],
	    "e": "🈴",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["full_moon_with_face"],
	    "e": "🌝",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["closed_lock_with_key"],
	    "e": "🔐",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["handshake"],
	    "e": "🤝",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-nl"],
	    "e": "🇳🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u7a7a"],
	    "e": "🈳",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["sun_with_face"],
	    "e": "🌞",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["key"],
	    "e": "🔑",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["pray"],
	    "e": "🙏",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "pray-1F3FB",
	        "n": "pray",
	        "e": "🙏🏻"
	      },
	      "1F3FC": {
	        "k": "pray-1F3FC",
	        "n": "pray",
	        "e": "🙏🏼"
	      },
	      "1F3FD": {
	        "k": "pray-1F3FD",
	        "n": "pray",
	        "e": "🙏🏽"
	      },
	      "1F3FE": {
	        "k": "pray-1F3FE",
	        "n": "pray",
	        "e": "🙏🏾"
	      },
	      "1F3FF": {
	        "k": "pray-1F3FF",
	        "n": "pray",
	        "e": "🙏🏿"
	      }
	    }
	  }, {
	    "n": ["flag-no"],
	    "e": "🇳🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["old_key"],
	    "e": "🗝️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["ringed_planet"],
	    "e": "🪐",
	    "c": 0,
	    "ver": "12.1"
	  }, {
	    "n": ["writing_hand"],
	    "e": "✍️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "writing_hand-1F3FB",
	        "n": "writing_hand",
	        "e": "✍🏻"
	      },
	      "1F3FC": {
	        "k": "writing_hand-1F3FC",
	        "n": "writing_hand",
	        "e": "✍🏼"
	      },
	      "1F3FD": {
	        "k": "writing_hand-1F3FD",
	        "n": "writing_hand",
	        "e": "✍🏽"
	      },
	      "1F3FE": {
	        "k": "writing_hand-1F3FE",
	        "n": "writing_hand",
	        "e": "✍🏾"
	      },
	      "1F3FF": {
	        "k": "writing_hand-1F3FF",
	        "n": "writing_hand",
	        "e": "✍🏿"
	      }
	    }
	  }, {
	    "n": ["congratulations"],
	    "e": "㊗️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-np"],
	    "e": "🇳🇵",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["nail_care"],
	    "e": "💅",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "nail_care-1F3FB",
	        "n": "nail_care",
	        "e": "💅🏻"
	      },
	      "1F3FC": {
	        "k": "nail_care-1F3FC",
	        "n": "nail_care",
	        "e": "💅🏼"
	      },
	      "1F3FD": {
	        "k": "nail_care-1F3FD",
	        "n": "nail_care",
	        "e": "💅🏽"
	      },
	      "1F3FE": {
	        "k": "nail_care-1F3FE",
	        "n": "nail_care",
	        "e": "💅🏾"
	      },
	      "1F3FF": {
	        "k": "nail_care-1F3FF",
	        "n": "nail_care",
	        "e": "💅🏿"
	      }
	    }
	  }, {
	    "n": ["hammer"],
	    "e": "🔨",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["star"],
	    "e": "⭐",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["secret"],
	    "e": "㊙️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-nr"],
	    "e": "🇳🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u55b6"],
	    "e": "🈺",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["star2"],
	    "e": "🌟",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["selfie"],
	    "e": "🤳",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "selfie-1F3FB",
	        "n": "selfie",
	        "e": "🤳🏻"
	      },
	      "1F3FC": {
	        "k": "selfie-1F3FC",
	        "n": "selfie",
	        "e": "🤳🏼"
	      },
	      "1F3FD": {
	        "k": "selfie-1F3FD",
	        "n": "selfie",
	        "e": "🤳🏽"
	      },
	      "1F3FE": {
	        "k": "selfie-1F3FE",
	        "n": "selfie",
	        "e": "🤳🏾"
	      },
	      "1F3FF": {
	        "k": "selfie-1F3FF",
	        "n": "selfie",
	        "e": "🤳🏿"
	      }
	    }
	  }, {
	    "n": ["axe"],
	    "e": "🪓",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-nu"],
	    "e": "🇳🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["u6e80"],
	    "e": "🈵",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["stars"],
	    "e": "🌠",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["muscle"],
	    "e": "💪",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "muscle-1F3FB",
	        "n": "muscle",
	        "e": "💪🏻"
	      },
	      "1F3FC": {
	        "k": "muscle-1F3FC",
	        "n": "muscle",
	        "e": "💪🏼"
	      },
	      "1F3FD": {
	        "k": "muscle-1F3FD",
	        "n": "muscle",
	        "e": "💪🏽"
	      },
	      "1F3FE": {
	        "k": "muscle-1F3FE",
	        "n": "muscle",
	        "e": "💪🏾"
	      },
	      "1F3FF": {
	        "k": "muscle-1F3FF",
	        "n": "muscle",
	        "e": "💪🏿"
	      }
	    }
	  }, {
	    "n": ["pick"],
	    "e": "⛏️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-nz"],
	    "e": "🇳🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["milky_way"],
	    "e": "🌌",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["red_circle"],
	    "e": "🔴",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["mechanical_arm"],
	    "e": "🦾",
	    "c": 9,
	    "ver": "12.1"
	  }, {
	    "n": ["hammer_and_pick"],
	    "e": "⚒️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-om"],
	    "e": "🇴🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["hammer_and_wrench"],
	    "e": "🛠️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_orange_circle"],
	    "e": "🟠",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["mechanical_leg"],
	    "e": "🦿",
	    "c": 9,
	    "ver": "12.1"
	  }, {
	    "n": ["cloud"],
	    "e": "☁️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pa"],
	    "e": "🇵🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["dagger_knife"],
	    "e": "🗡️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_yellow_circle"],
	    "e": "🟡",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["leg"],
	    "e": "🦵",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "leg-1F3FB",
	        "n": "leg",
	        "e": "🦵🏻"
	      },
	      "1F3FC": {
	        "k": "leg-1F3FC",
	        "n": "leg",
	        "e": "🦵🏼"
	      },
	      "1F3FD": {
	        "k": "leg-1F3FD",
	        "n": "leg",
	        "e": "🦵🏽"
	      },
	      "1F3FE": {
	        "k": "leg-1F3FE",
	        "n": "leg",
	        "e": "🦵🏾"
	      },
	      "1F3FF": {
	        "k": "leg-1F3FF",
	        "n": "leg",
	        "e": "🦵🏿"
	      }
	    }
	  }, {
	    "n": ["partly_sunny"],
	    "e": "⛅",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pe"],
	    "e": "🇵🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["large_green_circle"],
	    "e": "🟢",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["foot"],
	    "e": "🦶",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "foot-1F3FB",
	        "n": "foot",
	        "e": "🦶🏻"
	      },
	      "1F3FC": {
	        "k": "foot-1F3FC",
	        "n": "foot",
	        "e": "🦶🏼"
	      },
	      "1F3FD": {
	        "k": "foot-1F3FD",
	        "n": "foot",
	        "e": "🦶🏽"
	      },
	      "1F3FE": {
	        "k": "foot-1F3FE",
	        "n": "foot",
	        "e": "🦶🏾"
	      },
	      "1F3FF": {
	        "k": "foot-1F3FF",
	        "n": "foot",
	        "e": "🦶🏿"
	      }
	    }
	  }, {
	    "n": ["crossed_swords"],
	    "e": "⚔️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["thunder_cloud_and_rain"],
	    "e": "⛈️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pf"],
	    "e": "🇵🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["mostly_sunny", "sun_small_cloud"],
	    "e": "🌤️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ear"],
	    "e": "👂",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "ear-1F3FB",
	        "n": "ear",
	        "e": "👂🏻"
	      },
	      "1F3FC": {
	        "k": "ear-1F3FC",
	        "n": "ear",
	        "e": "👂🏼"
	      },
	      "1F3FD": {
	        "k": "ear-1F3FD",
	        "n": "ear",
	        "e": "👂🏽"
	      },
	      "1F3FE": {
	        "k": "ear-1F3FE",
	        "n": "ear",
	        "e": "👂🏾"
	      },
	      "1F3FF": {
	        "k": "ear-1F3FF",
	        "n": "ear",
	        "e": "👂🏿"
	      }
	    }
	  }, {
	    "n": ["gun"],
	    "e": "🔫",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_blue_circle"],
	    "e": "🔵",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pg"],
	    "e": "🇵🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["barely_sunny", "sun_behind_cloud"],
	    "e": "🌥️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["bow_and_arrow"],
	    "e": "🏹",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_purple_circle"],
	    "e": "🟣",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["ear_with_hearing_aid"],
	    "e": "🦻",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "ear_with_hearing_aid-1F3FB",
	        "n": "ear_with_hearing_aid",
	        "e": "🦻🏻"
	      },
	      "1F3FC": {
	        "k": "ear_with_hearing_aid-1F3FC",
	        "n": "ear_with_hearing_aid",
	        "e": "🦻🏼"
	      },
	      "1F3FD": {
	        "k": "ear_with_hearing_aid-1F3FD",
	        "n": "ear_with_hearing_aid",
	        "e": "🦻🏽"
	      },
	      "1F3FE": {
	        "k": "ear_with_hearing_aid-1F3FE",
	        "n": "ear_with_hearing_aid",
	        "e": "🦻🏾"
	      },
	      "1F3FF": {
	        "k": "ear_with_hearing_aid-1F3FF",
	        "n": "ear_with_hearing_aid",
	        "e": "🦻🏿"
	      }
	    }
	  }, {
	    "n": ["flag-ph"],
	    "e": "🇵🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["partly_sunny_rain", "sun_behind_rain_cloud"],
	    "e": "🌦️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["nose"],
	    "e": "👃",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "nose-1F3FB",
	        "n": "nose",
	        "e": "👃🏻"
	      },
	      "1F3FC": {
	        "k": "nose-1F3FC",
	        "n": "nose",
	        "e": "👃🏼"
	      },
	      "1F3FD": {
	        "k": "nose-1F3FD",
	        "n": "nose",
	        "e": "👃🏽"
	      },
	      "1F3FE": {
	        "k": "nose-1F3FE",
	        "n": "nose",
	        "e": "👃🏾"
	      },
	      "1F3FF": {
	        "k": "nose-1F3FF",
	        "n": "nose",
	        "e": "👃🏿"
	      }
	    }
	  }, {
	    "n": ["shield"],
	    "e": "🛡️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_brown_circle"],
	    "e": "🟤",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-pk"],
	    "e": "🇵🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rain_cloud"],
	    "e": "🌧️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["wrench"],
	    "e": "🔧",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["brain"],
	    "e": "🧠",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["black_circle"],
	    "e": "⚫",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pl"],
	    "e": "🇵🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["snow_cloud"],
	    "e": "🌨️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["nut_and_bolt"],
	    "e": "🔩",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["tooth"],
	    "e": "🦷",
	    "c": 9,
	    "ver": "11.0"
	  }, {
	    "n": ["white_circle"],
	    "e": "⚪",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pm"],
	    "e": "🇵🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["lightning", "lightning_cloud"],
	    "e": "🌩️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["large_red_square"],
	    "e": "🟥",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["bone"],
	    "e": "🦴",
	    "c": 9,
	    "ver": "11.0"
	  }, {
	    "n": ["gear"],
	    "e": "⚙️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-pn"],
	    "e": "🇵🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["tornado", "tornado_cloud"],
	    "e": "🌪️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["eyes"],
	    "e": "👀",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["compression"],
	    "e": "🗜️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_orange_square"],
	    "e": "🟧",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-pr"],
	    "e": "🇵🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["fog"],
	    "e": "🌫️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["eye"],
	    "e": "👁️",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["large_yellow_square"],
	    "e": "🟨",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["scales"],
	    "e": "⚖️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ps"],
	    "e": "🇵🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["wind_blowing_face"],
	    "e": "🌬️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["tongue"],
	    "e": "👅",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["large_green_square"],
	    "e": "🟩",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["probing_cane"],
	    "e": "🦯",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-pt"],
	    "e": "🇵🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["cyclone"],
	    "e": "🌀",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["lips"],
	    "e": "👄",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["link"],
	    "e": "🔗",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["large_blue_square"],
	    "e": "🟦",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-pw"],
	    "e": "🇵🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["rainbow"],
	    "e": "🌈",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["baby"],
	    "e": "👶",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "baby-1F3FB",
	        "n": "baby",
	        "e": "👶🏻"
	      },
	      "1F3FC": {
	        "k": "baby-1F3FC",
	        "n": "baby",
	        "e": "👶🏼"
	      },
	      "1F3FD": {
	        "k": "baby-1F3FD",
	        "n": "baby",
	        "e": "👶🏽"
	      },
	      "1F3FE": {
	        "k": "baby-1F3FE",
	        "n": "baby",
	        "e": "👶🏾"
	      },
	      "1F3FF": {
	        "k": "baby-1F3FF",
	        "n": "baby",
	        "e": "👶🏿"
	      }
	    }
	  }, {
	    "n": ["large_purple_square"],
	    "e": "🟪",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["chains"],
	    "e": "⛓️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-py"],
	    "e": "🇵🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["closed_umbrella"],
	    "e": "🌂",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["large_brown_square"],
	    "e": "🟫",
	    "c": 4,
	    "ver": "12.1"
	  }, {
	    "n": ["child"],
	    "e": "🧒",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "child-1F3FB",
	        "n": "child",
	        "e": "🧒🏻"
	      },
	      "1F3FC": {
	        "k": "child-1F3FC",
	        "n": "child",
	        "e": "🧒🏼"
	      },
	      "1F3FD": {
	        "k": "child-1F3FD",
	        "n": "child",
	        "e": "🧒🏽"
	      },
	      "1F3FE": {
	        "k": "child-1F3FE",
	        "n": "child",
	        "e": "🧒🏾"
	      },
	      "1F3FF": {
	        "k": "child-1F3FF",
	        "n": "child",
	        "e": "🧒🏿"
	      }
	    }
	  }, {
	    "n": ["toolbox"],
	    "e": "🧰",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-qa"],
	    "e": "🇶🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["boy"],
	    "e": "👦",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "boy-1F3FB",
	        "n": "boy",
	        "e": "👦🏻"
	      },
	      "1F3FC": {
	        "k": "boy-1F3FC",
	        "n": "boy",
	        "e": "👦🏼"
	      },
	      "1F3FD": {
	        "k": "boy-1F3FD",
	        "n": "boy",
	        "e": "👦🏽"
	      },
	      "1F3FE": {
	        "k": "boy-1F3FE",
	        "n": "boy",
	        "e": "👦🏾"
	      },
	      "1F3FF": {
	        "k": "boy-1F3FF",
	        "n": "boy",
	        "e": "👦🏿"
	      }
	    }
	  }, {
	    "n": ["magnet"],
	    "e": "🧲",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["umbrella"],
	    "e": "☂️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["black_large_square"],
	    "e": "⬛",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-re"],
	    "e": "🇷🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["girl"],
	    "e": "👧",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "girl-1F3FB",
	        "n": "girl",
	        "e": "👧🏻"
	      },
	      "1F3FC": {
	        "k": "girl-1F3FC",
	        "n": "girl",
	        "e": "👧🏼"
	      },
	      "1F3FD": {
	        "k": "girl-1F3FD",
	        "n": "girl",
	        "e": "👧🏽"
	      },
	      "1F3FE": {
	        "k": "girl-1F3FE",
	        "n": "girl",
	        "e": "👧🏾"
	      },
	      "1F3FF": {
	        "k": "girl-1F3FF",
	        "n": "girl",
	        "e": "👧🏿"
	      }
	    }
	  }, {
	    "n": ["umbrella_with_rain_drops"],
	    "e": "☔",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["alembic"],
	    "e": "⚗️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["white_large_square"],
	    "e": "⬜",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-ro"],
	    "e": "🇷🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["adult"],
	    "e": "🧑",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "adult-1F3FB",
	        "n": "adult",
	        "e": "🧑🏻"
	      },
	      "1F3FC": {
	        "k": "adult-1F3FC",
	        "n": "adult",
	        "e": "🧑🏼"
	      },
	      "1F3FD": {
	        "k": "adult-1F3FD",
	        "n": "adult",
	        "e": "🧑🏽"
	      },
	      "1F3FE": {
	        "k": "adult-1F3FE",
	        "n": "adult",
	        "e": "🧑🏾"
	      },
	      "1F3FF": {
	        "k": "adult-1F3FF",
	        "n": "adult",
	        "e": "🧑🏿"
	      }
	    }
	  }, {
	    "n": ["test_tube"],
	    "e": "🧪",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["black_medium_square"],
	    "e": "◼️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["umbrella_on_ground"],
	    "e": "⛱️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-rs"],
	    "e": "🇷🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["person_with_blond_hair"],
	    "e": "👱",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_with_blond_hair-1F3FB",
	        "n": "person_with_blond_hair",
	        "e": "👱🏻"
	      },
	      "1F3FC": {
	        "k": "person_with_blond_hair-1F3FC",
	        "n": "person_with_blond_hair",
	        "e": "👱🏼"
	      },
	      "1F3FD": {
	        "k": "person_with_blond_hair-1F3FD",
	        "n": "person_with_blond_hair",
	        "e": "👱🏽"
	      },
	      "1F3FE": {
	        "k": "person_with_blond_hair-1F3FE",
	        "n": "person_with_blond_hair",
	        "e": "👱🏾"
	      },
	      "1F3FF": {
	        "k": "person_with_blond_hair-1F3FF",
	        "n": "person_with_blond_hair",
	        "e": "👱🏿"
	      }
	    }
	  }, {
	    "n": ["petri_dish"],
	    "e": "🧫",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["white_medium_square"],
	    "e": "◻️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["zap"],
	    "e": "⚡",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["ru", "flag-ru"],
	    "e": "🇷🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man"],
	    "e": "👨",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-1F3FB",
	        "n": "man",
	        "e": "👨🏻"
	      },
	      "1F3FC": {
	        "k": "man-1F3FC",
	        "n": "man",
	        "e": "👨🏼"
	      },
	      "1F3FD": {
	        "k": "man-1F3FD",
	        "n": "man",
	        "e": "👨🏽"
	      },
	      "1F3FE": {
	        "k": "man-1F3FE",
	        "n": "man",
	        "e": "👨🏾"
	      },
	      "1F3FF": {
	        "k": "man-1F3FF",
	        "n": "man",
	        "e": "👨🏿"
	      }
	    }
	  }, {
	    "n": ["dna"],
	    "e": "🧬",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["black_medium_small_square"],
	    "e": "◾",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["snowflake"],
	    "e": "❄️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-rw"],
	    "e": "🇷🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["microscope"],
	    "e": "🔬",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bearded_person"],
	    "e": "🧔",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "bearded_person-1F3FB",
	        "n": "bearded_person",
	        "e": "🧔🏻"
	      },
	      "1F3FC": {
	        "k": "bearded_person-1F3FC",
	        "n": "bearded_person",
	        "e": "🧔🏼"
	      },
	      "1F3FD": {
	        "k": "bearded_person-1F3FD",
	        "n": "bearded_person",
	        "e": "🧔🏽"
	      },
	      "1F3FE": {
	        "k": "bearded_person-1F3FE",
	        "n": "bearded_person",
	        "e": "🧔🏾"
	      },
	      "1F3FF": {
	        "k": "bearded_person-1F3FF",
	        "n": "bearded_person",
	        "e": "🧔🏿"
	      }
	    }
	  }, {
	    "n": ["white_medium_small_square"],
	    "e": "◽",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["snowman"],
	    "e": "☃️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sa"],
	    "e": "🇸🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["red_haired_man"],
	    "e": "👨‍🦰",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "red_haired_man-1F3FB",
	        "n": "red_haired_man",
	        "e": "👨🏻‍🦰"
	      },
	      "1F3FC": {
	        "k": "red_haired_man-1F3FC",
	        "n": "red_haired_man",
	        "e": "👨🏼‍🦰"
	      },
	      "1F3FD": {
	        "k": "red_haired_man-1F3FD",
	        "n": "red_haired_man",
	        "e": "👨🏽‍🦰"
	      },
	      "1F3FE": {
	        "k": "red_haired_man-1F3FE",
	        "n": "red_haired_man",
	        "e": "👨🏾‍🦰"
	      },
	      "1F3FF": {
	        "k": "red_haired_man-1F3FF",
	        "n": "red_haired_man",
	        "e": "👨🏿‍🦰"
	      }
	    }
	  }, {
	    "n": ["telescope"],
	    "e": "🔭",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["black_small_square"],
	    "e": "▪️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["snowman_without_snow"],
	    "e": "⛄",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sb"],
	    "e": "🇸🇧",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["curly_haired_man"],
	    "e": "👨‍🦱",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "curly_haired_man-1F3FB",
	        "n": "curly_haired_man",
	        "e": "👨🏻‍🦱"
	      },
	      "1F3FC": {
	        "k": "curly_haired_man-1F3FC",
	        "n": "curly_haired_man",
	        "e": "👨🏼‍🦱"
	      },
	      "1F3FD": {
	        "k": "curly_haired_man-1F3FD",
	        "n": "curly_haired_man",
	        "e": "👨🏽‍🦱"
	      },
	      "1F3FE": {
	        "k": "curly_haired_man-1F3FE",
	        "n": "curly_haired_man",
	        "e": "👨🏾‍🦱"
	      },
	      "1F3FF": {
	        "k": "curly_haired_man-1F3FF",
	        "n": "curly_haired_man",
	        "e": "👨🏿‍🦱"
	      }
	    }
	  }, {
	    "n": ["satellite_antenna"],
	    "e": "📡",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["white_small_square"],
	    "e": "▫️",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["comet"],
	    "e": "☄️",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sc"],
	    "e": "🇸🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["white_haired_man"],
	    "e": "👨‍🦳",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "white_haired_man-1F3FB",
	        "n": "white_haired_man",
	        "e": "👨🏻‍🦳"
	      },
	      "1F3FC": {
	        "k": "white_haired_man-1F3FC",
	        "n": "white_haired_man",
	        "e": "👨🏼‍🦳"
	      },
	      "1F3FD": {
	        "k": "white_haired_man-1F3FD",
	        "n": "white_haired_man",
	        "e": "👨🏽‍🦳"
	      },
	      "1F3FE": {
	        "k": "white_haired_man-1F3FE",
	        "n": "white_haired_man",
	        "e": "👨🏾‍🦳"
	      },
	      "1F3FF": {
	        "k": "white_haired_man-1F3FF",
	        "n": "white_haired_man",
	        "e": "👨🏿‍🦳"
	      }
	    }
	  }, {
	    "n": ["syringe"],
	    "e": "💉",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["fire"],
	    "e": "🔥",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["large_orange_diamond"],
	    "e": "🔶",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sd"],
	    "e": "🇸🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bald_man"],
	    "e": "👨‍🦲",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "bald_man-1F3FB",
	        "n": "bald_man",
	        "e": "👨🏻‍🦲"
	      },
	      "1F3FC": {
	        "k": "bald_man-1F3FC",
	        "n": "bald_man",
	        "e": "👨🏼‍🦲"
	      },
	      "1F3FD": {
	        "k": "bald_man-1F3FD",
	        "n": "bald_man",
	        "e": "👨🏽‍🦲"
	      },
	      "1F3FE": {
	        "k": "bald_man-1F3FE",
	        "n": "bald_man",
	        "e": "👨🏾‍🦲"
	      },
	      "1F3FF": {
	        "k": "bald_man-1F3FF",
	        "n": "bald_man",
	        "e": "👨🏿‍🦲"
	      }
	    }
	  }, {
	    "n": ["droplet"],
	    "e": "💧",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["large_blue_diamond"],
	    "e": "🔷",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["drop_of_blood"],
	    "e": "🩸",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-se"],
	    "e": "🇸🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["ocean"],
	    "e": "🌊",
	    "c": 0,
	    "ver": "2.0"
	  }, {
	    "n": ["woman"],
	    "e": "👩",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-1F3FB",
	        "n": "woman",
	        "e": "👩🏻"
	      },
	      "1F3FC": {
	        "k": "woman-1F3FC",
	        "n": "woman",
	        "e": "👩🏼"
	      },
	      "1F3FD": {
	        "k": "woman-1F3FD",
	        "n": "woman",
	        "e": "👩🏽"
	      },
	      "1F3FE": {
	        "k": "woman-1F3FE",
	        "n": "woman",
	        "e": "👩🏾"
	      },
	      "1F3FF": {
	        "k": "woman-1F3FF",
	        "n": "woman",
	        "e": "👩🏿"
	      }
	    }
	  }, {
	    "n": ["pill"],
	    "e": "💊",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["small_orange_diamond"],
	    "e": "🔸",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sg"],
	    "e": "🇸🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["red_haired_woman"],
	    "e": "👩‍🦰",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "red_haired_woman-1F3FB",
	        "n": "red_haired_woman",
	        "e": "👩🏻‍🦰"
	      },
	      "1F3FC": {
	        "k": "red_haired_woman-1F3FC",
	        "n": "red_haired_woman",
	        "e": "👩🏼‍🦰"
	      },
	      "1F3FD": {
	        "k": "red_haired_woman-1F3FD",
	        "n": "red_haired_woman",
	        "e": "👩🏽‍🦰"
	      },
	      "1F3FE": {
	        "k": "red_haired_woman-1F3FE",
	        "n": "red_haired_woman",
	        "e": "👩🏾‍🦰"
	      },
	      "1F3FF": {
	        "k": "red_haired_woman-1F3FF",
	        "n": "red_haired_woman",
	        "e": "👩🏿‍🦰"
	      }
	    }
	  }, {
	    "n": ["small_blue_diamond"],
	    "e": "🔹",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["adhesive_bandage"],
	    "e": "🩹",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-sh"],
	    "e": "🇸🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["small_red_triangle"],
	    "e": "🔺",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["red_haired_person"],
	    "e": "🧑‍🦰",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "red_haired_person-1F3FB",
	        "n": "red_haired_person",
	        "e": "🧑🏻‍🦰"
	      },
	      "1F3FC": {
	        "k": "red_haired_person-1F3FC",
	        "n": "red_haired_person",
	        "e": "🧑🏼‍🦰"
	      },
	      "1F3FD": {
	        "k": "red_haired_person-1F3FD",
	        "n": "red_haired_person",
	        "e": "🧑🏽‍🦰"
	      },
	      "1F3FE": {
	        "k": "red_haired_person-1F3FE",
	        "n": "red_haired_person",
	        "e": "🧑🏾‍🦰"
	      },
	      "1F3FF": {
	        "k": "red_haired_person-1F3FF",
	        "n": "red_haired_person",
	        "e": "🧑🏿‍🦰"
	      }
	    }
	  }, {
	    "n": ["stethoscope"],
	    "e": "🩺",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-si"],
	    "e": "🇸🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["curly_haired_woman"],
	    "e": "👩‍🦱",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "curly_haired_woman-1F3FB",
	        "n": "curly_haired_woman",
	        "e": "👩🏻‍🦱"
	      },
	      "1F3FC": {
	        "k": "curly_haired_woman-1F3FC",
	        "n": "curly_haired_woman",
	        "e": "👩🏼‍🦱"
	      },
	      "1F3FD": {
	        "k": "curly_haired_woman-1F3FD",
	        "n": "curly_haired_woman",
	        "e": "👩🏽‍🦱"
	      },
	      "1F3FE": {
	        "k": "curly_haired_woman-1F3FE",
	        "n": "curly_haired_woman",
	        "e": "👩🏾‍🦱"
	      },
	      "1F3FF": {
	        "k": "curly_haired_woman-1F3FF",
	        "n": "curly_haired_woman",
	        "e": "👩🏿‍🦱"
	      }
	    }
	  }, {
	    "n": ["small_red_triangle_down"],
	    "e": "🔻",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["door"],
	    "e": "🚪",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sj"],
	    "e": "🇸🇯",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["diamond_shape_with_a_dot_inside"],
	    "e": "💠",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["bed"],
	    "e": "🛏️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["curly_haired_person"],
	    "e": "🧑‍🦱",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "curly_haired_person-1F3FB",
	        "n": "curly_haired_person",
	        "e": "🧑🏻‍🦱"
	      },
	      "1F3FC": {
	        "k": "curly_haired_person-1F3FC",
	        "n": "curly_haired_person",
	        "e": "🧑🏼‍🦱"
	      },
	      "1F3FD": {
	        "k": "curly_haired_person-1F3FD",
	        "n": "curly_haired_person",
	        "e": "🧑🏽‍🦱"
	      },
	      "1F3FE": {
	        "k": "curly_haired_person-1F3FE",
	        "n": "curly_haired_person",
	        "e": "🧑🏾‍🦱"
	      },
	      "1F3FF": {
	        "k": "curly_haired_person-1F3FF",
	        "n": "curly_haired_person",
	        "e": "🧑🏿‍🦱"
	      }
	    }
	  }, {
	    "n": ["flag-sk"],
	    "e": "🇸🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["white_haired_woman"],
	    "e": "👩‍🦳",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "white_haired_woman-1F3FB",
	        "n": "white_haired_woman",
	        "e": "👩🏻‍🦳"
	      },
	      "1F3FC": {
	        "k": "white_haired_woman-1F3FC",
	        "n": "white_haired_woman",
	        "e": "👩🏼‍🦳"
	      },
	      "1F3FD": {
	        "k": "white_haired_woman-1F3FD",
	        "n": "white_haired_woman",
	        "e": "👩🏽‍🦳"
	      },
	      "1F3FE": {
	        "k": "white_haired_woman-1F3FE",
	        "n": "white_haired_woman",
	        "e": "👩🏾‍🦳"
	      },
	      "1F3FF": {
	        "k": "white_haired_woman-1F3FF",
	        "n": "white_haired_woman",
	        "e": "👩🏿‍🦳"
	      }
	    }
	  }, {
	    "n": ["radio_button"],
	    "e": "🔘",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["couch_and_lamp"],
	    "e": "🛋️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sl"],
	    "e": "🇸🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["white_square_button"],
	    "e": "🔳",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["white_haired_person"],
	    "e": "🧑‍🦳",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "white_haired_person-1F3FB",
	        "n": "white_haired_person",
	        "e": "🧑🏻‍🦳"
	      },
	      "1F3FC": {
	        "k": "white_haired_person-1F3FC",
	        "n": "white_haired_person",
	        "e": "🧑🏼‍🦳"
	      },
	      "1F3FD": {
	        "k": "white_haired_person-1F3FD",
	        "n": "white_haired_person",
	        "e": "🧑🏽‍🦳"
	      },
	      "1F3FE": {
	        "k": "white_haired_person-1F3FE",
	        "n": "white_haired_person",
	        "e": "🧑🏾‍🦳"
	      },
	      "1F3FF": {
	        "k": "white_haired_person-1F3FF",
	        "n": "white_haired_person",
	        "e": "🧑🏿‍🦳"
	      }
	    }
	  }, {
	    "n": ["chair"],
	    "e": "🪑",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-sm"],
	    "e": "🇸🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bald_woman"],
	    "e": "👩‍🦲",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "bald_woman-1F3FB",
	        "n": "bald_woman",
	        "e": "👩🏻‍🦲"
	      },
	      "1F3FC": {
	        "k": "bald_woman-1F3FC",
	        "n": "bald_woman",
	        "e": "👩🏼‍🦲"
	      },
	      "1F3FD": {
	        "k": "bald_woman-1F3FD",
	        "n": "bald_woman",
	        "e": "👩🏽‍🦲"
	      },
	      "1F3FE": {
	        "k": "bald_woman-1F3FE",
	        "n": "bald_woman",
	        "e": "👩🏾‍🦲"
	      },
	      "1F3FF": {
	        "k": "bald_woman-1F3FF",
	        "n": "bald_woman",
	        "e": "👩🏿‍🦲"
	      }
	    }
	  }, {
	    "n": ["black_square_button"],
	    "e": "🔲",
	    "c": 4,
	    "ver": "2.0"
	  }, {
	    "n": ["toilet"],
	    "e": "🚽",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sn"],
	    "e": "🇸🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["shower"],
	    "e": "🚿",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["bald_person"],
	    "e": "🧑‍🦲",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "bald_person-1F3FB",
	        "n": "bald_person",
	        "e": "🧑🏻‍🦲"
	      },
	      "1F3FC": {
	        "k": "bald_person-1F3FC",
	        "n": "bald_person",
	        "e": "🧑🏼‍🦲"
	      },
	      "1F3FD": {
	        "k": "bald_person-1F3FD",
	        "n": "bald_person",
	        "e": "🧑🏽‍🦲"
	      },
	      "1F3FE": {
	        "k": "bald_person-1F3FE",
	        "n": "bald_person",
	        "e": "🧑🏾‍🦲"
	      },
	      "1F3FF": {
	        "k": "bald_person-1F3FF",
	        "n": "bald_person",
	        "e": "🧑🏿‍🦲"
	      }
	    }
	  }, {
	    "n": ["flag-so"],
	    "e": "🇸🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["blond-haired-woman"],
	    "e": "👱‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "blond-haired-woman-1F3FB",
	        "n": "blond-haired-woman",
	        "e": "👱🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "blond-haired-woman-1F3FC",
	        "n": "blond-haired-woman",
	        "e": "👱🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "blond-haired-woman-1F3FD",
	        "n": "blond-haired-woman",
	        "e": "👱🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "blond-haired-woman-1F3FE",
	        "n": "blond-haired-woman",
	        "e": "👱🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "blond-haired-woman-1F3FF",
	        "n": "blond-haired-woman",
	        "e": "👱🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["bathtub"],
	    "e": "🛁",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-sr"],
	    "e": "🇸🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["blond-haired-man"],
	    "e": "👱‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "blond-haired-man-1F3FB",
	        "n": "blond-haired-man",
	        "e": "👱🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "blond-haired-man-1F3FC",
	        "n": "blond-haired-man",
	        "e": "👱🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "blond-haired-man-1F3FD",
	        "n": "blond-haired-man",
	        "e": "👱🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "blond-haired-man-1F3FE",
	        "n": "blond-haired-man",
	        "e": "👱🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "blond-haired-man-1F3FF",
	        "n": "blond-haired-man",
	        "e": "👱🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["razor"],
	    "e": "🪒",
	    "c": 7,
	    "ver": "12.1"
	  }, {
	    "n": ["flag-ss"],
	    "e": "🇸🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["older_adult"],
	    "e": "🧓",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "older_adult-1F3FB",
	        "n": "older_adult",
	        "e": "🧓🏻"
	      },
	      "1F3FC": {
	        "k": "older_adult-1F3FC",
	        "n": "older_adult",
	        "e": "🧓🏼"
	      },
	      "1F3FD": {
	        "k": "older_adult-1F3FD",
	        "n": "older_adult",
	        "e": "🧓🏽"
	      },
	      "1F3FE": {
	        "k": "older_adult-1F3FE",
	        "n": "older_adult",
	        "e": "🧓🏾"
	      },
	      "1F3FF": {
	        "k": "older_adult-1F3FF",
	        "n": "older_adult",
	        "e": "🧓🏿"
	      }
	    }
	  }, {
	    "n": ["lotion_bottle"],
	    "e": "🧴",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-st"],
	    "e": "🇸🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["older_man"],
	    "e": "👴",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "older_man-1F3FB",
	        "n": "older_man",
	        "e": "👴🏻"
	      },
	      "1F3FC": {
	        "k": "older_man-1F3FC",
	        "n": "older_man",
	        "e": "👴🏼"
	      },
	      "1F3FD": {
	        "k": "older_man-1F3FD",
	        "n": "older_man",
	        "e": "👴🏽"
	      },
	      "1F3FE": {
	        "k": "older_man-1F3FE",
	        "n": "older_man",
	        "e": "👴🏾"
	      },
	      "1F3FF": {
	        "k": "older_man-1F3FF",
	        "n": "older_man",
	        "e": "👴🏿"
	      }
	    }
	  }, {
	    "n": ["safety_pin"],
	    "e": "🧷",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-sv"],
	    "e": "🇸🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["older_woman"],
	    "e": "👵",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "older_woman-1F3FB",
	        "n": "older_woman",
	        "e": "👵🏻"
	      },
	      "1F3FC": {
	        "k": "older_woman-1F3FC",
	        "n": "older_woman",
	        "e": "👵🏼"
	      },
	      "1F3FD": {
	        "k": "older_woman-1F3FD",
	        "n": "older_woman",
	        "e": "👵🏽"
	      },
	      "1F3FE": {
	        "k": "older_woman-1F3FE",
	        "n": "older_woman",
	        "e": "👵🏾"
	      },
	      "1F3FF": {
	        "k": "older_woman-1F3FF",
	        "n": "older_woman",
	        "e": "👵🏿"
	      }
	    }
	  }, {
	    "n": ["broom"],
	    "e": "🧹",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-sx"],
	    "e": "🇸🇽",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["person_frowning"],
	    "e": "🙍",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_frowning-1F3FB",
	        "n": "person_frowning",
	        "e": "🙍🏻"
	      },
	      "1F3FC": {
	        "k": "person_frowning-1F3FC",
	        "n": "person_frowning",
	        "e": "🙍🏼"
	      },
	      "1F3FD": {
	        "k": "person_frowning-1F3FD",
	        "n": "person_frowning",
	        "e": "🙍🏽"
	      },
	      "1F3FE": {
	        "k": "person_frowning-1F3FE",
	        "n": "person_frowning",
	        "e": "🙍🏾"
	      },
	      "1F3FF": {
	        "k": "person_frowning-1F3FF",
	        "n": "person_frowning",
	        "e": "🙍🏿"
	      }
	    }
	  }, {
	    "n": ["basket"],
	    "e": "🧺",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-sy"],
	    "e": "🇸🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-frowning"],
	    "e": "🙍‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-frowning-1F3FB",
	        "n": "man-frowning",
	        "e": "🙍🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-frowning-1F3FC",
	        "n": "man-frowning",
	        "e": "🙍🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-frowning-1F3FD",
	        "n": "man-frowning",
	        "e": "🙍🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-frowning-1F3FE",
	        "n": "man-frowning",
	        "e": "🙍🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-frowning-1F3FF",
	        "n": "man-frowning",
	        "e": "🙍🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["roll_of_paper"],
	    "e": "🧻",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-sz"],
	    "e": "🇸🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-frowning"],
	    "e": "🙍‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-frowning-1F3FB",
	        "n": "woman-frowning",
	        "e": "🙍🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-frowning-1F3FC",
	        "n": "woman-frowning",
	        "e": "🙍🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-frowning-1F3FD",
	        "n": "woman-frowning",
	        "e": "🙍🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-frowning-1F3FE",
	        "n": "woman-frowning",
	        "e": "🙍🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-frowning-1F3FF",
	        "n": "woman-frowning",
	        "e": "🙍🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["soap"],
	    "e": "🧼",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-ta"],
	    "e": "🇹🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["person_with_pouting_face"],
	    "e": "🙎",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_with_pouting_face-1F3FB",
	        "n": "person_with_pouting_face",
	        "e": "🙎🏻"
	      },
	      "1F3FC": {
	        "k": "person_with_pouting_face-1F3FC",
	        "n": "person_with_pouting_face",
	        "e": "🙎🏼"
	      },
	      "1F3FD": {
	        "k": "person_with_pouting_face-1F3FD",
	        "n": "person_with_pouting_face",
	        "e": "🙎🏽"
	      },
	      "1F3FE": {
	        "k": "person_with_pouting_face-1F3FE",
	        "n": "person_with_pouting_face",
	        "e": "🙎🏾"
	      },
	      "1F3FF": {
	        "k": "person_with_pouting_face-1F3FF",
	        "n": "person_with_pouting_face",
	        "e": "🙎🏿"
	      }
	    }
	  }, {
	    "n": ["sponge"],
	    "e": "🧽",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-tc"],
	    "e": "🇹🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-pouting"],
	    "e": "🙎‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-pouting-1F3FB",
	        "n": "man-pouting",
	        "e": "🙎🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-pouting-1F3FC",
	        "n": "man-pouting",
	        "e": "🙎🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-pouting-1F3FD",
	        "n": "man-pouting",
	        "e": "🙎🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-pouting-1F3FE",
	        "n": "man-pouting",
	        "e": "🙎🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-pouting-1F3FF",
	        "n": "man-pouting",
	        "e": "🙎🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["fire_extinguisher"],
	    "e": "🧯",
	    "c": 7,
	    "ver": "11.0"
	  }, {
	    "n": ["flag-td"],
	    "e": "🇹🇩",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-pouting"],
	    "e": "🙎‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-pouting-1F3FB",
	        "n": "woman-pouting",
	        "e": "🙎🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-pouting-1F3FC",
	        "n": "woman-pouting",
	        "e": "🙎🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-pouting-1F3FD",
	        "n": "woman-pouting",
	        "e": "🙎🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-pouting-1F3FE",
	        "n": "woman-pouting",
	        "e": "🙎🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-pouting-1F3FF",
	        "n": "woman-pouting",
	        "e": "🙎🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["shopping_trolley"],
	    "e": "🛒",
	    "c": 7,
	    "ver": "4.0"
	  }, {
	    "n": ["flag-tf"],
	    "e": "🇹🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["no_good"],
	    "e": "🙅",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "no_good-1F3FB",
	        "n": "no_good",
	        "e": "🙅🏻"
	      },
	      "1F3FC": {
	        "k": "no_good-1F3FC",
	        "n": "no_good",
	        "e": "🙅🏼"
	      },
	      "1F3FD": {
	        "k": "no_good-1F3FD",
	        "n": "no_good",
	        "e": "🙅🏽"
	      },
	      "1F3FE": {
	        "k": "no_good-1F3FE",
	        "n": "no_good",
	        "e": "🙅🏾"
	      },
	      "1F3FF": {
	        "k": "no_good-1F3FF",
	        "n": "no_good",
	        "e": "🙅🏿"
	      }
	    }
	  }, {
	    "n": ["smoking"],
	    "e": "🚬",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-tg"],
	    "e": "🇹🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-gesturing-no"],
	    "e": "🙅‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-gesturing-no-1F3FB",
	        "n": "man-gesturing-no",
	        "e": "🙅🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-gesturing-no-1F3FC",
	        "n": "man-gesturing-no",
	        "e": "🙅🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-gesturing-no-1F3FD",
	        "n": "man-gesturing-no",
	        "e": "🙅🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-gesturing-no-1F3FE",
	        "n": "man-gesturing-no",
	        "e": "🙅🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-gesturing-no-1F3FF",
	        "n": "man-gesturing-no",
	        "e": "🙅🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["coffin"],
	    "e": "⚰️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-th"],
	    "e": "🇹🇭",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-gesturing-no"],
	    "e": "🙅‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-gesturing-no-1F3FB",
	        "n": "woman-gesturing-no",
	        "e": "🙅🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-gesturing-no-1F3FC",
	        "n": "woman-gesturing-no",
	        "e": "🙅🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-gesturing-no-1F3FD",
	        "n": "woman-gesturing-no",
	        "e": "🙅🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-gesturing-no-1F3FE",
	        "n": "woman-gesturing-no",
	        "e": "🙅🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-gesturing-no-1F3FF",
	        "n": "woman-gesturing-no",
	        "e": "🙅🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["funeral_urn"],
	    "e": "⚱️",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["flag-tj"],
	    "e": "🇹🇯",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["moyai"],
	    "e": "🗿",
	    "c": 7,
	    "ver": "2.0"
	  }, {
	    "n": ["ok_woman"],
	    "e": "🙆",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "ok_woman-1F3FB",
	        "n": "ok_woman",
	        "e": "🙆🏻"
	      },
	      "1F3FC": {
	        "k": "ok_woman-1F3FC",
	        "n": "ok_woman",
	        "e": "🙆🏼"
	      },
	      "1F3FD": {
	        "k": "ok_woman-1F3FD",
	        "n": "ok_woman",
	        "e": "🙆🏽"
	      },
	      "1F3FE": {
	        "k": "ok_woman-1F3FE",
	        "n": "ok_woman",
	        "e": "🙆🏾"
	      },
	      "1F3FF": {
	        "k": "ok_woman-1F3FF",
	        "n": "ok_woman",
	        "e": "🙆🏿"
	      }
	    }
	  }, {
	    "n": ["flag-tk"],
	    "e": "🇹🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-gesturing-ok"],
	    "e": "🙆‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-gesturing-ok-1F3FB",
	        "n": "man-gesturing-ok",
	        "e": "🙆🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-gesturing-ok-1F3FC",
	        "n": "man-gesturing-ok",
	        "e": "🙆🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-gesturing-ok-1F3FD",
	        "n": "man-gesturing-ok",
	        "e": "🙆🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-gesturing-ok-1F3FE",
	        "n": "man-gesturing-ok",
	        "e": "🙆🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-gesturing-ok-1F3FF",
	        "n": "man-gesturing-ok",
	        "e": "🙆🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-tl"],
	    "e": "🇹🇱",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-gesturing-ok"],
	    "e": "🙆‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-gesturing-ok-1F3FB",
	        "n": "woman-gesturing-ok",
	        "e": "🙆🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-gesturing-ok-1F3FC",
	        "n": "woman-gesturing-ok",
	        "e": "🙆🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-gesturing-ok-1F3FD",
	        "n": "woman-gesturing-ok",
	        "e": "🙆🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-gesturing-ok-1F3FE",
	        "n": "woman-gesturing-ok",
	        "e": "🙆🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-gesturing-ok-1F3FF",
	        "n": "woman-gesturing-ok",
	        "e": "🙆🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-tm"],
	    "e": "🇹🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["information_desk_person"],
	    "e": "💁",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "information_desk_person-1F3FB",
	        "n": "information_desk_person",
	        "e": "💁🏻"
	      },
	      "1F3FC": {
	        "k": "information_desk_person-1F3FC",
	        "n": "information_desk_person",
	        "e": "💁🏼"
	      },
	      "1F3FD": {
	        "k": "information_desk_person-1F3FD",
	        "n": "information_desk_person",
	        "e": "💁🏽"
	      },
	      "1F3FE": {
	        "k": "information_desk_person-1F3FE",
	        "n": "information_desk_person",
	        "e": "💁🏾"
	      },
	      "1F3FF": {
	        "k": "information_desk_person-1F3FF",
	        "n": "information_desk_person",
	        "e": "💁🏿"
	      }
	    }
	  }, {
	    "n": ["flag-tn"],
	    "e": "🇹🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-tipping-hand"],
	    "e": "💁‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-tipping-hand-1F3FB",
	        "n": "man-tipping-hand",
	        "e": "💁🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-tipping-hand-1F3FC",
	        "n": "man-tipping-hand",
	        "e": "💁🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-tipping-hand-1F3FD",
	        "n": "man-tipping-hand",
	        "e": "💁🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-tipping-hand-1F3FE",
	        "n": "man-tipping-hand",
	        "e": "💁🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-tipping-hand-1F3FF",
	        "n": "man-tipping-hand",
	        "e": "💁🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-to"],
	    "e": "🇹🇴",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-tipping-hand"],
	    "e": "💁‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-tipping-hand-1F3FB",
	        "n": "woman-tipping-hand",
	        "e": "💁🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-tipping-hand-1F3FC",
	        "n": "woman-tipping-hand",
	        "e": "💁🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-tipping-hand-1F3FD",
	        "n": "woman-tipping-hand",
	        "e": "💁🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-tipping-hand-1F3FE",
	        "n": "woman-tipping-hand",
	        "e": "💁🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-tipping-hand-1F3FF",
	        "n": "woman-tipping-hand",
	        "e": "💁🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-tr"],
	    "e": "🇹🇷",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["raising_hand"],
	    "e": "🙋",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "raising_hand-1F3FB",
	        "n": "raising_hand",
	        "e": "🙋🏻"
	      },
	      "1F3FC": {
	        "k": "raising_hand-1F3FC",
	        "n": "raising_hand",
	        "e": "🙋🏼"
	      },
	      "1F3FD": {
	        "k": "raising_hand-1F3FD",
	        "n": "raising_hand",
	        "e": "🙋🏽"
	      },
	      "1F3FE": {
	        "k": "raising_hand-1F3FE",
	        "n": "raising_hand",
	        "e": "🙋🏾"
	      },
	      "1F3FF": {
	        "k": "raising_hand-1F3FF",
	        "n": "raising_hand",
	        "e": "🙋🏿"
	      }
	    }
	  }, {
	    "n": ["flag-tt"],
	    "e": "🇹🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-raising-hand"],
	    "e": "🙋‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-raising-hand-1F3FB",
	        "n": "man-raising-hand",
	        "e": "🙋🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-raising-hand-1F3FC",
	        "n": "man-raising-hand",
	        "e": "🙋🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-raising-hand-1F3FD",
	        "n": "man-raising-hand",
	        "e": "🙋🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-raising-hand-1F3FE",
	        "n": "man-raising-hand",
	        "e": "🙋🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-raising-hand-1F3FF",
	        "n": "man-raising-hand",
	        "e": "🙋🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-tv"],
	    "e": "🇹🇻",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-raising-hand"],
	    "e": "🙋‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-raising-hand-1F3FB",
	        "n": "woman-raising-hand",
	        "e": "🙋🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-raising-hand-1F3FC",
	        "n": "woman-raising-hand",
	        "e": "🙋🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-raising-hand-1F3FD",
	        "n": "woman-raising-hand",
	        "e": "🙋🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-raising-hand-1F3FE",
	        "n": "woman-raising-hand",
	        "e": "🙋🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-raising-hand-1F3FF",
	        "n": "woman-raising-hand",
	        "e": "🙋🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-tw"],
	    "e": "🇹🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["deaf_person"],
	    "e": "🧏",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "deaf_person-1F3FB",
	        "n": "deaf_person",
	        "e": "🧏🏻"
	      },
	      "1F3FC": {
	        "k": "deaf_person-1F3FC",
	        "n": "deaf_person",
	        "e": "🧏🏼"
	      },
	      "1F3FD": {
	        "k": "deaf_person-1F3FD",
	        "n": "deaf_person",
	        "e": "🧏🏽"
	      },
	      "1F3FE": {
	        "k": "deaf_person-1F3FE",
	        "n": "deaf_person",
	        "e": "🧏🏾"
	      },
	      "1F3FF": {
	        "k": "deaf_person-1F3FF",
	        "n": "deaf_person",
	        "e": "🧏🏿"
	      }
	    }
	  }, {
	    "n": ["flag-tz"],
	    "e": "🇹🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["deaf_man"],
	    "e": "🧏‍♂️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "deaf_man-1F3FB",
	        "n": "deaf_man",
	        "e": "🧏🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "deaf_man-1F3FC",
	        "n": "deaf_man",
	        "e": "🧏🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "deaf_man-1F3FD",
	        "n": "deaf_man",
	        "e": "🧏🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "deaf_man-1F3FE",
	        "n": "deaf_man",
	        "e": "🧏🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "deaf_man-1F3FF",
	        "n": "deaf_man",
	        "e": "🧏🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-ua"],
	    "e": "🇺🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["deaf_woman"],
	    "e": "🧏‍♀️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "deaf_woman-1F3FB",
	        "n": "deaf_woman",
	        "e": "🧏🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "deaf_woman-1F3FC",
	        "n": "deaf_woman",
	        "e": "🧏🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "deaf_woman-1F3FD",
	        "n": "deaf_woman",
	        "e": "🧏🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "deaf_woman-1F3FE",
	        "n": "deaf_woman",
	        "e": "🧏🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "deaf_woman-1F3FF",
	        "n": "deaf_woman",
	        "e": "🧏🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-ug"],
	    "e": "🇺🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["bow"],
	    "e": "🙇",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "bow-1F3FB",
	        "n": "bow",
	        "e": "🙇🏻"
	      },
	      "1F3FC": {
	        "k": "bow-1F3FC",
	        "n": "bow",
	        "e": "🙇🏼"
	      },
	      "1F3FD": {
	        "k": "bow-1F3FD",
	        "n": "bow",
	        "e": "🙇🏽"
	      },
	      "1F3FE": {
	        "k": "bow-1F3FE",
	        "n": "bow",
	        "e": "🙇🏾"
	      },
	      "1F3FF": {
	        "k": "bow-1F3FF",
	        "n": "bow",
	        "e": "🙇🏿"
	      }
	    }
	  }, {
	    "n": ["flag-um"],
	    "e": "🇺🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-bowing"],
	    "e": "🙇‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-bowing-1F3FB",
	        "n": "man-bowing",
	        "e": "🙇🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-bowing-1F3FC",
	        "n": "man-bowing",
	        "e": "🙇🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-bowing-1F3FD",
	        "n": "man-bowing",
	        "e": "🙇🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-bowing-1F3FE",
	        "n": "man-bowing",
	        "e": "🙇🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-bowing-1F3FF",
	        "n": "man-bowing",
	        "e": "🙇🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-un"],
	    "e": "🇺🇳",
	    "c": 3,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-bowing"],
	    "e": "🙇‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-bowing-1F3FB",
	        "n": "woman-bowing",
	        "e": "🙇🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-bowing-1F3FC",
	        "n": "woman-bowing",
	        "e": "🙇🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-bowing-1F3FD",
	        "n": "woman-bowing",
	        "e": "🙇🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-bowing-1F3FE",
	        "n": "woman-bowing",
	        "e": "🙇🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-bowing-1F3FF",
	        "n": "woman-bowing",
	        "e": "🙇🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["us", "flag-us"],
	    "e": "🇺🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["face_palm"],
	    "e": "🤦",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "face_palm-1F3FB",
	        "n": "face_palm",
	        "e": "🤦🏻"
	      },
	      "1F3FC": {
	        "k": "face_palm-1F3FC",
	        "n": "face_palm",
	        "e": "🤦🏼"
	      },
	      "1F3FD": {
	        "k": "face_palm-1F3FD",
	        "n": "face_palm",
	        "e": "🤦🏽"
	      },
	      "1F3FE": {
	        "k": "face_palm-1F3FE",
	        "n": "face_palm",
	        "e": "🤦🏾"
	      },
	      "1F3FF": {
	        "k": "face_palm-1F3FF",
	        "n": "face_palm",
	        "e": "🤦🏿"
	      }
	    }
	  }, {
	    "n": ["flag-uy"],
	    "e": "🇺🇾",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-facepalming"],
	    "e": "🤦‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-facepalming-1F3FB",
	        "n": "man-facepalming",
	        "e": "🤦🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-facepalming-1F3FC",
	        "n": "man-facepalming",
	        "e": "🤦🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-facepalming-1F3FD",
	        "n": "man-facepalming",
	        "e": "🤦🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-facepalming-1F3FE",
	        "n": "man-facepalming",
	        "e": "🤦🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-facepalming-1F3FF",
	        "n": "man-facepalming",
	        "e": "🤦🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-uz"],
	    "e": "🇺🇿",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-facepalming"],
	    "e": "🤦‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-facepalming-1F3FB",
	        "n": "woman-facepalming",
	        "e": "🤦🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-facepalming-1F3FC",
	        "n": "woman-facepalming",
	        "e": "🤦🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-facepalming-1F3FD",
	        "n": "woman-facepalming",
	        "e": "🤦🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-facepalming-1F3FE",
	        "n": "woman-facepalming",
	        "e": "🤦🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-facepalming-1F3FF",
	        "n": "woman-facepalming",
	        "e": "🤦🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-va"],
	    "e": "🇻🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["shrug"],
	    "e": "🤷",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "shrug-1F3FB",
	        "n": "shrug",
	        "e": "🤷🏻"
	      },
	      "1F3FC": {
	        "k": "shrug-1F3FC",
	        "n": "shrug",
	        "e": "🤷🏼"
	      },
	      "1F3FD": {
	        "k": "shrug-1F3FD",
	        "n": "shrug",
	        "e": "🤷🏽"
	      },
	      "1F3FE": {
	        "k": "shrug-1F3FE",
	        "n": "shrug",
	        "e": "🤷🏾"
	      },
	      "1F3FF": {
	        "k": "shrug-1F3FF",
	        "n": "shrug",
	        "e": "🤷🏿"
	      }
	    }
	  }, {
	    "n": ["flag-vc"],
	    "e": "🇻🇨",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["man-shrugging"],
	    "e": "🤷‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-shrugging-1F3FB",
	        "n": "man-shrugging",
	        "e": "🤷🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-shrugging-1F3FC",
	        "n": "man-shrugging",
	        "e": "🤷🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-shrugging-1F3FD",
	        "n": "man-shrugging",
	        "e": "🤷🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-shrugging-1F3FE",
	        "n": "man-shrugging",
	        "e": "🤷🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-shrugging-1F3FF",
	        "n": "man-shrugging",
	        "e": "🤷🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["flag-ve"],
	    "e": "🇻🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-shrugging"],
	    "e": "🤷‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-shrugging-1F3FB",
	        "n": "woman-shrugging",
	        "e": "🤷🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-shrugging-1F3FC",
	        "n": "woman-shrugging",
	        "e": "🤷🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-shrugging-1F3FD",
	        "n": "woman-shrugging",
	        "e": "🤷🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-shrugging-1F3FE",
	        "n": "woman-shrugging",
	        "e": "🤷🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-shrugging-1F3FF",
	        "n": "woman-shrugging",
	        "e": "🤷🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["flag-vg"],
	    "e": "🇻🇬",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["health_worker"],
	    "e": "🧑‍⚕️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "health_worker-1F3FB",
	        "n": "health_worker",
	        "e": "🧑🏻‍⚕️"
	      },
	      "1F3FC": {
	        "k": "health_worker-1F3FC",
	        "n": "health_worker",
	        "e": "🧑🏼‍⚕️"
	      },
	      "1F3FD": {
	        "k": "health_worker-1F3FD",
	        "n": "health_worker",
	        "e": "🧑🏽‍⚕️"
	      },
	      "1F3FE": {
	        "k": "health_worker-1F3FE",
	        "n": "health_worker",
	        "e": "🧑🏾‍⚕️"
	      },
	      "1F3FF": {
	        "k": "health_worker-1F3FF",
	        "n": "health_worker",
	        "e": "🧑🏿‍⚕️"
	      }
	    }
	  }, {
	    "n": ["flag-vi"],
	    "e": "🇻🇮",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["male-doctor"],
	    "e": "👨‍⚕️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-doctor-1F3FB",
	        "n": "male-doctor",
	        "e": "👨🏻‍⚕️"
	      },
	      "1F3FC": {
	        "k": "male-doctor-1F3FC",
	        "n": "male-doctor",
	        "e": "👨🏼‍⚕️"
	      },
	      "1F3FD": {
	        "k": "male-doctor-1F3FD",
	        "n": "male-doctor",
	        "e": "👨🏽‍⚕️"
	      },
	      "1F3FE": {
	        "k": "male-doctor-1F3FE",
	        "n": "male-doctor",
	        "e": "👨🏾‍⚕️"
	      },
	      "1F3FF": {
	        "k": "male-doctor-1F3FF",
	        "n": "male-doctor",
	        "e": "👨🏿‍⚕️"
	      }
	    }
	  }, {
	    "n": ["flag-vn"],
	    "e": "🇻🇳",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["female-doctor"],
	    "e": "👩‍⚕️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-doctor-1F3FB",
	        "n": "female-doctor",
	        "e": "👩🏻‍⚕️"
	      },
	      "1F3FC": {
	        "k": "female-doctor-1F3FC",
	        "n": "female-doctor",
	        "e": "👩🏼‍⚕️"
	      },
	      "1F3FD": {
	        "k": "female-doctor-1F3FD",
	        "n": "female-doctor",
	        "e": "👩🏽‍⚕️"
	      },
	      "1F3FE": {
	        "k": "female-doctor-1F3FE",
	        "n": "female-doctor",
	        "e": "👩🏾‍⚕️"
	      },
	      "1F3FF": {
	        "k": "female-doctor-1F3FF",
	        "n": "female-doctor",
	        "e": "👩🏿‍⚕️"
	      }
	    }
	  }, {
	    "n": ["flag-vu"],
	    "e": "🇻🇺",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["student"],
	    "e": "🧑‍🎓",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "student-1F3FB",
	        "n": "student",
	        "e": "🧑🏻‍🎓"
	      },
	      "1F3FC": {
	        "k": "student-1F3FC",
	        "n": "student",
	        "e": "🧑🏼‍🎓"
	      },
	      "1F3FD": {
	        "k": "student-1F3FD",
	        "n": "student",
	        "e": "🧑🏽‍🎓"
	      },
	      "1F3FE": {
	        "k": "student-1F3FE",
	        "n": "student",
	        "e": "🧑🏾‍🎓"
	      },
	      "1F3FF": {
	        "k": "student-1F3FF",
	        "n": "student",
	        "e": "🧑🏿‍🎓"
	      }
	    }
	  }, {
	    "n": ["flag-wf"],
	    "e": "🇼🇫",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["male-student"],
	    "e": "👨‍🎓",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-student-1F3FB",
	        "n": "male-student",
	        "e": "👨🏻‍🎓"
	      },
	      "1F3FC": {
	        "k": "male-student-1F3FC",
	        "n": "male-student",
	        "e": "👨🏼‍🎓"
	      },
	      "1F3FD": {
	        "k": "male-student-1F3FD",
	        "n": "male-student",
	        "e": "👨🏽‍🎓"
	      },
	      "1F3FE": {
	        "k": "male-student-1F3FE",
	        "n": "male-student",
	        "e": "👨🏾‍🎓"
	      },
	      "1F3FF": {
	        "k": "male-student-1F3FF",
	        "n": "male-student",
	        "e": "👨🏿‍🎓"
	      }
	    }
	  }, {
	    "n": ["flag-ws"],
	    "e": "🇼🇸",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["female-student"],
	    "e": "👩‍🎓",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-student-1F3FB",
	        "n": "female-student",
	        "e": "👩🏻‍🎓"
	      },
	      "1F3FC": {
	        "k": "female-student-1F3FC",
	        "n": "female-student",
	        "e": "👩🏼‍🎓"
	      },
	      "1F3FD": {
	        "k": "female-student-1F3FD",
	        "n": "female-student",
	        "e": "👩🏽‍🎓"
	      },
	      "1F3FE": {
	        "k": "female-student-1F3FE",
	        "n": "female-student",
	        "e": "👩🏾‍🎓"
	      },
	      "1F3FF": {
	        "k": "female-student-1F3FF",
	        "n": "female-student",
	        "e": "👩🏿‍🎓"
	      }
	    }
	  }, {
	    "n": ["flag-xk"],
	    "e": "🇽🇰",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["teacher"],
	    "e": "🧑‍🏫",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "teacher-1F3FB",
	        "n": "teacher",
	        "e": "🧑🏻‍🏫"
	      },
	      "1F3FC": {
	        "k": "teacher-1F3FC",
	        "n": "teacher",
	        "e": "🧑🏼‍🏫"
	      },
	      "1F3FD": {
	        "k": "teacher-1F3FD",
	        "n": "teacher",
	        "e": "🧑🏽‍🏫"
	      },
	      "1F3FE": {
	        "k": "teacher-1F3FE",
	        "n": "teacher",
	        "e": "🧑🏾‍🏫"
	      },
	      "1F3FF": {
	        "k": "teacher-1F3FF",
	        "n": "teacher",
	        "e": "🧑🏿‍🏫"
	      }
	    }
	  }, {
	    "n": ["flag-ye"],
	    "e": "🇾🇪",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["male-teacher"],
	    "e": "👨‍🏫",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-teacher-1F3FB",
	        "n": "male-teacher",
	        "e": "👨🏻‍🏫"
	      },
	      "1F3FC": {
	        "k": "male-teacher-1F3FC",
	        "n": "male-teacher",
	        "e": "👨🏼‍🏫"
	      },
	      "1F3FD": {
	        "k": "male-teacher-1F3FD",
	        "n": "male-teacher",
	        "e": "👨🏽‍🏫"
	      },
	      "1F3FE": {
	        "k": "male-teacher-1F3FE",
	        "n": "male-teacher",
	        "e": "👨🏾‍🏫"
	      },
	      "1F3FF": {
	        "k": "male-teacher-1F3FF",
	        "n": "male-teacher",
	        "e": "👨🏿‍🏫"
	      }
	    }
	  }, {
	    "n": ["flag-yt"],
	    "e": "🇾🇹",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["female-teacher"],
	    "e": "👩‍🏫",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-teacher-1F3FB",
	        "n": "female-teacher",
	        "e": "👩🏻‍🏫"
	      },
	      "1F3FC": {
	        "k": "female-teacher-1F3FC",
	        "n": "female-teacher",
	        "e": "👩🏼‍🏫"
	      },
	      "1F3FD": {
	        "k": "female-teacher-1F3FD",
	        "n": "female-teacher",
	        "e": "👩🏽‍🏫"
	      },
	      "1F3FE": {
	        "k": "female-teacher-1F3FE",
	        "n": "female-teacher",
	        "e": "👩🏾‍🏫"
	      },
	      "1F3FF": {
	        "k": "female-teacher-1F3FF",
	        "n": "female-teacher",
	        "e": "👩🏿‍🏫"
	      }
	    }
	  }, {
	    "n": ["flag-za"],
	    "e": "🇿🇦",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["judge"],
	    "e": "🧑‍⚖️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "judge-1F3FB",
	        "n": "judge",
	        "e": "🧑🏻‍⚖️"
	      },
	      "1F3FC": {
	        "k": "judge-1F3FC",
	        "n": "judge",
	        "e": "🧑🏼‍⚖️"
	      },
	      "1F3FD": {
	        "k": "judge-1F3FD",
	        "n": "judge",
	        "e": "🧑🏽‍⚖️"
	      },
	      "1F3FE": {
	        "k": "judge-1F3FE",
	        "n": "judge",
	        "e": "🧑🏾‍⚖️"
	      },
	      "1F3FF": {
	        "k": "judge-1F3FF",
	        "n": "judge",
	        "e": "🧑🏿‍⚖️"
	      }
	    }
	  }, {
	    "n": ["flag-zm"],
	    "e": "🇿🇲",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["male-judge"],
	    "e": "👨‍⚖️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-judge-1F3FB",
	        "n": "male-judge",
	        "e": "👨🏻‍⚖️"
	      },
	      "1F3FC": {
	        "k": "male-judge-1F3FC",
	        "n": "male-judge",
	        "e": "👨🏼‍⚖️"
	      },
	      "1F3FD": {
	        "k": "male-judge-1F3FD",
	        "n": "male-judge",
	        "e": "👨🏽‍⚖️"
	      },
	      "1F3FE": {
	        "k": "male-judge-1F3FE",
	        "n": "male-judge",
	        "e": "👨🏾‍⚖️"
	      },
	      "1F3FF": {
	        "k": "male-judge-1F3FF",
	        "n": "male-judge",
	        "e": "👨🏿‍⚖️"
	      }
	    }
	  }, {
	    "n": ["flag-zw"],
	    "e": "🇿🇼",
	    "c": 3,
	    "ver": "2.0"
	  }, {
	    "n": ["female-judge"],
	    "e": "👩‍⚖️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-judge-1F3FB",
	        "n": "female-judge",
	        "e": "👩🏻‍⚖️"
	      },
	      "1F3FC": {
	        "k": "female-judge-1F3FC",
	        "n": "female-judge",
	        "e": "👩🏼‍⚖️"
	      },
	      "1F3FD": {
	        "k": "female-judge-1F3FD",
	        "n": "female-judge",
	        "e": "👩🏽‍⚖️"
	      },
	      "1F3FE": {
	        "k": "female-judge-1F3FE",
	        "n": "female-judge",
	        "e": "👩🏾‍⚖️"
	      },
	      "1F3FF": {
	        "k": "female-judge-1F3FF",
	        "n": "female-judge",
	        "e": "👩🏿‍⚖️"
	      }
	    }
	  }, {
	    "n": ["flag-england"],
	    "e": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	    "c": 3,
	    "ver": "5.0"
	  }, {
	    "n": ["farmer"],
	    "e": "🧑‍🌾",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "farmer-1F3FB",
	        "n": "farmer",
	        "e": "🧑🏻‍🌾"
	      },
	      "1F3FC": {
	        "k": "farmer-1F3FC",
	        "n": "farmer",
	        "e": "🧑🏼‍🌾"
	      },
	      "1F3FD": {
	        "k": "farmer-1F3FD",
	        "n": "farmer",
	        "e": "🧑🏽‍🌾"
	      },
	      "1F3FE": {
	        "k": "farmer-1F3FE",
	        "n": "farmer",
	        "e": "🧑🏾‍🌾"
	      },
	      "1F3FF": {
	        "k": "farmer-1F3FF",
	        "n": "farmer",
	        "e": "🧑🏿‍🌾"
	      }
	    }
	  }, {
	    "n": ["flag-scotland"],
	    "e": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	    "c": 3,
	    "ver": "5.0"
	  }, {
	    "n": ["male-farmer"],
	    "e": "👨‍🌾",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-farmer-1F3FB",
	        "n": "male-farmer",
	        "e": "👨🏻‍🌾"
	      },
	      "1F3FC": {
	        "k": "male-farmer-1F3FC",
	        "n": "male-farmer",
	        "e": "👨🏼‍🌾"
	      },
	      "1F3FD": {
	        "k": "male-farmer-1F3FD",
	        "n": "male-farmer",
	        "e": "👨🏽‍🌾"
	      },
	      "1F3FE": {
	        "k": "male-farmer-1F3FE",
	        "n": "male-farmer",
	        "e": "👨🏾‍🌾"
	      },
	      "1F3FF": {
	        "k": "male-farmer-1F3FF",
	        "n": "male-farmer",
	        "e": "👨🏿‍🌾"
	      }
	    }
	  }, {
	    "n": ["flag-wales"],
	    "e": "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
	    "c": 3,
	    "ver": "5.0"
	  }, {
	    "n": ["female-farmer"],
	    "e": "👩‍🌾",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-farmer-1F3FB",
	        "n": "female-farmer",
	        "e": "👩🏻‍🌾"
	      },
	      "1F3FC": {
	        "k": "female-farmer-1F3FC",
	        "n": "female-farmer",
	        "e": "👩🏼‍🌾"
	      },
	      "1F3FD": {
	        "k": "female-farmer-1F3FD",
	        "n": "female-farmer",
	        "e": "👩🏽‍🌾"
	      },
	      "1F3FE": {
	        "k": "female-farmer-1F3FE",
	        "n": "female-farmer",
	        "e": "👩🏾‍🌾"
	      },
	      "1F3FF": {
	        "k": "female-farmer-1F3FF",
	        "n": "female-farmer",
	        "e": "👩🏿‍🌾"
	      }
	    }
	  }, {
	    "n": ["cook"],
	    "e": "🧑‍🍳",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "cook-1F3FB",
	        "n": "cook",
	        "e": "🧑🏻‍🍳"
	      },
	      "1F3FC": {
	        "k": "cook-1F3FC",
	        "n": "cook",
	        "e": "🧑🏼‍🍳"
	      },
	      "1F3FD": {
	        "k": "cook-1F3FD",
	        "n": "cook",
	        "e": "🧑🏽‍🍳"
	      },
	      "1F3FE": {
	        "k": "cook-1F3FE",
	        "n": "cook",
	        "e": "🧑🏾‍🍳"
	      },
	      "1F3FF": {
	        "k": "cook-1F3FF",
	        "n": "cook",
	        "e": "🧑🏿‍🍳"
	      }
	    }
	  }, {
	    "n": ["male-cook"],
	    "e": "👨‍🍳",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-cook-1F3FB",
	        "n": "male-cook",
	        "e": "👨🏻‍🍳"
	      },
	      "1F3FC": {
	        "k": "male-cook-1F3FC",
	        "n": "male-cook",
	        "e": "👨🏼‍🍳"
	      },
	      "1F3FD": {
	        "k": "male-cook-1F3FD",
	        "n": "male-cook",
	        "e": "👨🏽‍🍳"
	      },
	      "1F3FE": {
	        "k": "male-cook-1F3FE",
	        "n": "male-cook",
	        "e": "👨🏾‍🍳"
	      },
	      "1F3FF": {
	        "k": "male-cook-1F3FF",
	        "n": "male-cook",
	        "e": "👨🏿‍🍳"
	      }
	    }
	  }, {
	    "n": ["female-cook"],
	    "e": "👩‍🍳",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-cook-1F3FB",
	        "n": "female-cook",
	        "e": "👩🏻‍🍳"
	      },
	      "1F3FC": {
	        "k": "female-cook-1F3FC",
	        "n": "female-cook",
	        "e": "👩🏼‍🍳"
	      },
	      "1F3FD": {
	        "k": "female-cook-1F3FD",
	        "n": "female-cook",
	        "e": "👩🏽‍🍳"
	      },
	      "1F3FE": {
	        "k": "female-cook-1F3FE",
	        "n": "female-cook",
	        "e": "👩🏾‍🍳"
	      },
	      "1F3FF": {
	        "k": "female-cook-1F3FF",
	        "n": "female-cook",
	        "e": "👩🏿‍🍳"
	      }
	    }
	  }, {
	    "n": ["mechanic"],
	    "e": "🧑‍🔧",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "mechanic-1F3FB",
	        "n": "mechanic",
	        "e": "🧑🏻‍🔧"
	      },
	      "1F3FC": {
	        "k": "mechanic-1F3FC",
	        "n": "mechanic",
	        "e": "🧑🏼‍🔧"
	      },
	      "1F3FD": {
	        "k": "mechanic-1F3FD",
	        "n": "mechanic",
	        "e": "🧑🏽‍🔧"
	      },
	      "1F3FE": {
	        "k": "mechanic-1F3FE",
	        "n": "mechanic",
	        "e": "🧑🏾‍🔧"
	      },
	      "1F3FF": {
	        "k": "mechanic-1F3FF",
	        "n": "mechanic",
	        "e": "🧑🏿‍🔧"
	      }
	    }
	  }, {
	    "n": ["male-mechanic"],
	    "e": "👨‍🔧",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-mechanic-1F3FB",
	        "n": "male-mechanic",
	        "e": "👨🏻‍🔧"
	      },
	      "1F3FC": {
	        "k": "male-mechanic-1F3FC",
	        "n": "male-mechanic",
	        "e": "👨🏼‍🔧"
	      },
	      "1F3FD": {
	        "k": "male-mechanic-1F3FD",
	        "n": "male-mechanic",
	        "e": "👨🏽‍🔧"
	      },
	      "1F3FE": {
	        "k": "male-mechanic-1F3FE",
	        "n": "male-mechanic",
	        "e": "👨🏾‍🔧"
	      },
	      "1F3FF": {
	        "k": "male-mechanic-1F3FF",
	        "n": "male-mechanic",
	        "e": "👨🏿‍🔧"
	      }
	    }
	  }, {
	    "n": ["female-mechanic"],
	    "e": "👩‍🔧",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-mechanic-1F3FB",
	        "n": "female-mechanic",
	        "e": "👩🏻‍🔧"
	      },
	      "1F3FC": {
	        "k": "female-mechanic-1F3FC",
	        "n": "female-mechanic",
	        "e": "👩🏼‍🔧"
	      },
	      "1F3FD": {
	        "k": "female-mechanic-1F3FD",
	        "n": "female-mechanic",
	        "e": "👩🏽‍🔧"
	      },
	      "1F3FE": {
	        "k": "female-mechanic-1F3FE",
	        "n": "female-mechanic",
	        "e": "👩🏾‍🔧"
	      },
	      "1F3FF": {
	        "k": "female-mechanic-1F3FF",
	        "n": "female-mechanic",
	        "e": "👩🏿‍🔧"
	      }
	    }
	  }, {
	    "n": ["factory_worker"],
	    "e": "🧑‍🏭",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "factory_worker-1F3FB",
	        "n": "factory_worker",
	        "e": "🧑🏻‍🏭"
	      },
	      "1F3FC": {
	        "k": "factory_worker-1F3FC",
	        "n": "factory_worker",
	        "e": "🧑🏼‍🏭"
	      },
	      "1F3FD": {
	        "k": "factory_worker-1F3FD",
	        "n": "factory_worker",
	        "e": "🧑🏽‍🏭"
	      },
	      "1F3FE": {
	        "k": "factory_worker-1F3FE",
	        "n": "factory_worker",
	        "e": "🧑🏾‍🏭"
	      },
	      "1F3FF": {
	        "k": "factory_worker-1F3FF",
	        "n": "factory_worker",
	        "e": "🧑🏿‍🏭"
	      }
	    }
	  }, {
	    "n": ["male-factory-worker"],
	    "e": "👨‍🏭",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-factory-worker-1F3FB",
	        "n": "male-factory-worker",
	        "e": "👨🏻‍🏭"
	      },
	      "1F3FC": {
	        "k": "male-factory-worker-1F3FC",
	        "n": "male-factory-worker",
	        "e": "👨🏼‍🏭"
	      },
	      "1F3FD": {
	        "k": "male-factory-worker-1F3FD",
	        "n": "male-factory-worker",
	        "e": "👨🏽‍🏭"
	      },
	      "1F3FE": {
	        "k": "male-factory-worker-1F3FE",
	        "n": "male-factory-worker",
	        "e": "👨🏾‍🏭"
	      },
	      "1F3FF": {
	        "k": "male-factory-worker-1F3FF",
	        "n": "male-factory-worker",
	        "e": "👨🏿‍🏭"
	      }
	    }
	  }, {
	    "n": ["female-factory-worker"],
	    "e": "👩‍🏭",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-factory-worker-1F3FB",
	        "n": "female-factory-worker",
	        "e": "👩🏻‍🏭"
	      },
	      "1F3FC": {
	        "k": "female-factory-worker-1F3FC",
	        "n": "female-factory-worker",
	        "e": "👩🏼‍🏭"
	      },
	      "1F3FD": {
	        "k": "female-factory-worker-1F3FD",
	        "n": "female-factory-worker",
	        "e": "👩🏽‍🏭"
	      },
	      "1F3FE": {
	        "k": "female-factory-worker-1F3FE",
	        "n": "female-factory-worker",
	        "e": "👩🏾‍🏭"
	      },
	      "1F3FF": {
	        "k": "female-factory-worker-1F3FF",
	        "n": "female-factory-worker",
	        "e": "👩🏿‍🏭"
	      }
	    }
	  }, {
	    "n": ["office_worker"],
	    "e": "🧑‍💼",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "office_worker-1F3FB",
	        "n": "office_worker",
	        "e": "🧑🏻‍💼"
	      },
	      "1F3FC": {
	        "k": "office_worker-1F3FC",
	        "n": "office_worker",
	        "e": "🧑🏼‍💼"
	      },
	      "1F3FD": {
	        "k": "office_worker-1F3FD",
	        "n": "office_worker",
	        "e": "🧑🏽‍💼"
	      },
	      "1F3FE": {
	        "k": "office_worker-1F3FE",
	        "n": "office_worker",
	        "e": "🧑🏾‍💼"
	      },
	      "1F3FF": {
	        "k": "office_worker-1F3FF",
	        "n": "office_worker",
	        "e": "🧑🏿‍💼"
	      }
	    }
	  }, {
	    "n": ["male-office-worker"],
	    "e": "👨‍💼",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-office-worker-1F3FB",
	        "n": "male-office-worker",
	        "e": "👨🏻‍💼"
	      },
	      "1F3FC": {
	        "k": "male-office-worker-1F3FC",
	        "n": "male-office-worker",
	        "e": "👨🏼‍💼"
	      },
	      "1F3FD": {
	        "k": "male-office-worker-1F3FD",
	        "n": "male-office-worker",
	        "e": "👨🏽‍💼"
	      },
	      "1F3FE": {
	        "k": "male-office-worker-1F3FE",
	        "n": "male-office-worker",
	        "e": "👨🏾‍💼"
	      },
	      "1F3FF": {
	        "k": "male-office-worker-1F3FF",
	        "n": "male-office-worker",
	        "e": "👨🏿‍💼"
	      }
	    }
	  }, {
	    "n": ["female-office-worker"],
	    "e": "👩‍💼",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-office-worker-1F3FB",
	        "n": "female-office-worker",
	        "e": "👩🏻‍💼"
	      },
	      "1F3FC": {
	        "k": "female-office-worker-1F3FC",
	        "n": "female-office-worker",
	        "e": "👩🏼‍💼"
	      },
	      "1F3FD": {
	        "k": "female-office-worker-1F3FD",
	        "n": "female-office-worker",
	        "e": "👩🏽‍💼"
	      },
	      "1F3FE": {
	        "k": "female-office-worker-1F3FE",
	        "n": "female-office-worker",
	        "e": "👩🏾‍💼"
	      },
	      "1F3FF": {
	        "k": "female-office-worker-1F3FF",
	        "n": "female-office-worker",
	        "e": "👩🏿‍💼"
	      }
	    }
	  }, {
	    "n": ["scientist"],
	    "e": "🧑‍🔬",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "scientist-1F3FB",
	        "n": "scientist",
	        "e": "🧑🏻‍🔬"
	      },
	      "1F3FC": {
	        "k": "scientist-1F3FC",
	        "n": "scientist",
	        "e": "🧑🏼‍🔬"
	      },
	      "1F3FD": {
	        "k": "scientist-1F3FD",
	        "n": "scientist",
	        "e": "🧑🏽‍🔬"
	      },
	      "1F3FE": {
	        "k": "scientist-1F3FE",
	        "n": "scientist",
	        "e": "🧑🏾‍🔬"
	      },
	      "1F3FF": {
	        "k": "scientist-1F3FF",
	        "n": "scientist",
	        "e": "🧑🏿‍🔬"
	      }
	    }
	  }, {
	    "n": ["male-scientist"],
	    "e": "👨‍🔬",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-scientist-1F3FB",
	        "n": "male-scientist",
	        "e": "👨🏻‍🔬"
	      },
	      "1F3FC": {
	        "k": "male-scientist-1F3FC",
	        "n": "male-scientist",
	        "e": "👨🏼‍🔬"
	      },
	      "1F3FD": {
	        "k": "male-scientist-1F3FD",
	        "n": "male-scientist",
	        "e": "👨🏽‍🔬"
	      },
	      "1F3FE": {
	        "k": "male-scientist-1F3FE",
	        "n": "male-scientist",
	        "e": "👨🏾‍🔬"
	      },
	      "1F3FF": {
	        "k": "male-scientist-1F3FF",
	        "n": "male-scientist",
	        "e": "👨🏿‍🔬"
	      }
	    }
	  }, {
	    "n": ["female-scientist"],
	    "e": "👩‍🔬",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-scientist-1F3FB",
	        "n": "female-scientist",
	        "e": "👩🏻‍🔬"
	      },
	      "1F3FC": {
	        "k": "female-scientist-1F3FC",
	        "n": "female-scientist",
	        "e": "👩🏼‍🔬"
	      },
	      "1F3FD": {
	        "k": "female-scientist-1F3FD",
	        "n": "female-scientist",
	        "e": "👩🏽‍🔬"
	      },
	      "1F3FE": {
	        "k": "female-scientist-1F3FE",
	        "n": "female-scientist",
	        "e": "👩🏾‍🔬"
	      },
	      "1F3FF": {
	        "k": "female-scientist-1F3FF",
	        "n": "female-scientist",
	        "e": "👩🏿‍🔬"
	      }
	    }
	  }, {
	    "n": ["technologist"],
	    "e": "🧑‍💻",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "technologist-1F3FB",
	        "n": "technologist",
	        "e": "🧑🏻‍💻"
	      },
	      "1F3FC": {
	        "k": "technologist-1F3FC",
	        "n": "technologist",
	        "e": "🧑🏼‍💻"
	      },
	      "1F3FD": {
	        "k": "technologist-1F3FD",
	        "n": "technologist",
	        "e": "🧑🏽‍💻"
	      },
	      "1F3FE": {
	        "k": "technologist-1F3FE",
	        "n": "technologist",
	        "e": "🧑🏾‍💻"
	      },
	      "1F3FF": {
	        "k": "technologist-1F3FF",
	        "n": "technologist",
	        "e": "🧑🏿‍💻"
	      }
	    }
	  }, {
	    "n": ["male-technologist"],
	    "e": "👨‍💻",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-technologist-1F3FB",
	        "n": "male-technologist",
	        "e": "👨🏻‍💻"
	      },
	      "1F3FC": {
	        "k": "male-technologist-1F3FC",
	        "n": "male-technologist",
	        "e": "👨🏼‍💻"
	      },
	      "1F3FD": {
	        "k": "male-technologist-1F3FD",
	        "n": "male-technologist",
	        "e": "👨🏽‍💻"
	      },
	      "1F3FE": {
	        "k": "male-technologist-1F3FE",
	        "n": "male-technologist",
	        "e": "👨🏾‍💻"
	      },
	      "1F3FF": {
	        "k": "male-technologist-1F3FF",
	        "n": "male-technologist",
	        "e": "👨🏿‍💻"
	      }
	    }
	  }, {
	    "n": ["female-technologist"],
	    "e": "👩‍💻",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-technologist-1F3FB",
	        "n": "female-technologist",
	        "e": "👩🏻‍💻"
	      },
	      "1F3FC": {
	        "k": "female-technologist-1F3FC",
	        "n": "female-technologist",
	        "e": "👩🏼‍💻"
	      },
	      "1F3FD": {
	        "k": "female-technologist-1F3FD",
	        "n": "female-technologist",
	        "e": "👩🏽‍💻"
	      },
	      "1F3FE": {
	        "k": "female-technologist-1F3FE",
	        "n": "female-technologist",
	        "e": "👩🏾‍💻"
	      },
	      "1F3FF": {
	        "k": "female-technologist-1F3FF",
	        "n": "female-technologist",
	        "e": "👩🏿‍💻"
	      }
	    }
	  }, {
	    "n": ["singer"],
	    "e": "🧑‍🎤",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "singer-1F3FB",
	        "n": "singer",
	        "e": "🧑🏻‍🎤"
	      },
	      "1F3FC": {
	        "k": "singer-1F3FC",
	        "n": "singer",
	        "e": "🧑🏼‍🎤"
	      },
	      "1F3FD": {
	        "k": "singer-1F3FD",
	        "n": "singer",
	        "e": "🧑🏽‍🎤"
	      },
	      "1F3FE": {
	        "k": "singer-1F3FE",
	        "n": "singer",
	        "e": "🧑🏾‍🎤"
	      },
	      "1F3FF": {
	        "k": "singer-1F3FF",
	        "n": "singer",
	        "e": "🧑🏿‍🎤"
	      }
	    }
	  }, {
	    "n": ["male-singer"],
	    "e": "👨‍🎤",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-singer-1F3FB",
	        "n": "male-singer",
	        "e": "👨🏻‍🎤"
	      },
	      "1F3FC": {
	        "k": "male-singer-1F3FC",
	        "n": "male-singer",
	        "e": "👨🏼‍🎤"
	      },
	      "1F3FD": {
	        "k": "male-singer-1F3FD",
	        "n": "male-singer",
	        "e": "👨🏽‍🎤"
	      },
	      "1F3FE": {
	        "k": "male-singer-1F3FE",
	        "n": "male-singer",
	        "e": "👨🏾‍🎤"
	      },
	      "1F3FF": {
	        "k": "male-singer-1F3FF",
	        "n": "male-singer",
	        "e": "👨🏿‍🎤"
	      }
	    }
	  }, {
	    "n": ["female-singer"],
	    "e": "👩‍🎤",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-singer-1F3FB",
	        "n": "female-singer",
	        "e": "👩🏻‍🎤"
	      },
	      "1F3FC": {
	        "k": "female-singer-1F3FC",
	        "n": "female-singer",
	        "e": "👩🏼‍🎤"
	      },
	      "1F3FD": {
	        "k": "female-singer-1F3FD",
	        "n": "female-singer",
	        "e": "👩🏽‍🎤"
	      },
	      "1F3FE": {
	        "k": "female-singer-1F3FE",
	        "n": "female-singer",
	        "e": "👩🏾‍🎤"
	      },
	      "1F3FF": {
	        "k": "female-singer-1F3FF",
	        "n": "female-singer",
	        "e": "👩🏿‍🎤"
	      }
	    }
	  }, {
	    "n": ["artist"],
	    "e": "🧑‍🎨",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "artist-1F3FB",
	        "n": "artist",
	        "e": "🧑🏻‍🎨"
	      },
	      "1F3FC": {
	        "k": "artist-1F3FC",
	        "n": "artist",
	        "e": "🧑🏼‍🎨"
	      },
	      "1F3FD": {
	        "k": "artist-1F3FD",
	        "n": "artist",
	        "e": "🧑🏽‍🎨"
	      },
	      "1F3FE": {
	        "k": "artist-1F3FE",
	        "n": "artist",
	        "e": "🧑🏾‍🎨"
	      },
	      "1F3FF": {
	        "k": "artist-1F3FF",
	        "n": "artist",
	        "e": "🧑🏿‍🎨"
	      }
	    }
	  }, {
	    "n": ["male-artist"],
	    "e": "👨‍🎨",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-artist-1F3FB",
	        "n": "male-artist",
	        "e": "👨🏻‍🎨"
	      },
	      "1F3FC": {
	        "k": "male-artist-1F3FC",
	        "n": "male-artist",
	        "e": "👨🏼‍🎨"
	      },
	      "1F3FD": {
	        "k": "male-artist-1F3FD",
	        "n": "male-artist",
	        "e": "👨🏽‍🎨"
	      },
	      "1F3FE": {
	        "k": "male-artist-1F3FE",
	        "n": "male-artist",
	        "e": "👨🏾‍🎨"
	      },
	      "1F3FF": {
	        "k": "male-artist-1F3FF",
	        "n": "male-artist",
	        "e": "👨🏿‍🎨"
	      }
	    }
	  }, {
	    "n": ["female-artist"],
	    "e": "👩‍🎨",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-artist-1F3FB",
	        "n": "female-artist",
	        "e": "👩🏻‍🎨"
	      },
	      "1F3FC": {
	        "k": "female-artist-1F3FC",
	        "n": "female-artist",
	        "e": "👩🏼‍🎨"
	      },
	      "1F3FD": {
	        "k": "female-artist-1F3FD",
	        "n": "female-artist",
	        "e": "👩🏽‍🎨"
	      },
	      "1F3FE": {
	        "k": "female-artist-1F3FE",
	        "n": "female-artist",
	        "e": "👩🏾‍🎨"
	      },
	      "1F3FF": {
	        "k": "female-artist-1F3FF",
	        "n": "female-artist",
	        "e": "👩🏿‍🎨"
	      }
	    }
	  }, {
	    "n": ["pilot"],
	    "e": "🧑‍✈️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "pilot-1F3FB",
	        "n": "pilot",
	        "e": "🧑🏻‍✈️"
	      },
	      "1F3FC": {
	        "k": "pilot-1F3FC",
	        "n": "pilot",
	        "e": "🧑🏼‍✈️"
	      },
	      "1F3FD": {
	        "k": "pilot-1F3FD",
	        "n": "pilot",
	        "e": "🧑🏽‍✈️"
	      },
	      "1F3FE": {
	        "k": "pilot-1F3FE",
	        "n": "pilot",
	        "e": "🧑🏾‍✈️"
	      },
	      "1F3FF": {
	        "k": "pilot-1F3FF",
	        "n": "pilot",
	        "e": "🧑🏿‍✈️"
	      }
	    }
	  }, {
	    "n": ["male-pilot"],
	    "e": "👨‍✈️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-pilot-1F3FB",
	        "n": "male-pilot",
	        "e": "👨🏻‍✈️"
	      },
	      "1F3FC": {
	        "k": "male-pilot-1F3FC",
	        "n": "male-pilot",
	        "e": "👨🏼‍✈️"
	      },
	      "1F3FD": {
	        "k": "male-pilot-1F3FD",
	        "n": "male-pilot",
	        "e": "👨🏽‍✈️"
	      },
	      "1F3FE": {
	        "k": "male-pilot-1F3FE",
	        "n": "male-pilot",
	        "e": "👨🏾‍✈️"
	      },
	      "1F3FF": {
	        "k": "male-pilot-1F3FF",
	        "n": "male-pilot",
	        "e": "👨🏿‍✈️"
	      }
	    }
	  }, {
	    "n": ["female-pilot"],
	    "e": "👩‍✈️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-pilot-1F3FB",
	        "n": "female-pilot",
	        "e": "👩🏻‍✈️"
	      },
	      "1F3FC": {
	        "k": "female-pilot-1F3FC",
	        "n": "female-pilot",
	        "e": "👩🏼‍✈️"
	      },
	      "1F3FD": {
	        "k": "female-pilot-1F3FD",
	        "n": "female-pilot",
	        "e": "👩🏽‍✈️"
	      },
	      "1F3FE": {
	        "k": "female-pilot-1F3FE",
	        "n": "female-pilot",
	        "e": "👩🏾‍✈️"
	      },
	      "1F3FF": {
	        "k": "female-pilot-1F3FF",
	        "n": "female-pilot",
	        "e": "👩🏿‍✈️"
	      }
	    }
	  }, {
	    "n": ["astronaut"],
	    "e": "🧑‍🚀",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "astronaut-1F3FB",
	        "n": "astronaut",
	        "e": "🧑🏻‍🚀"
	      },
	      "1F3FC": {
	        "k": "astronaut-1F3FC",
	        "n": "astronaut",
	        "e": "🧑🏼‍🚀"
	      },
	      "1F3FD": {
	        "k": "astronaut-1F3FD",
	        "n": "astronaut",
	        "e": "🧑🏽‍🚀"
	      },
	      "1F3FE": {
	        "k": "astronaut-1F3FE",
	        "n": "astronaut",
	        "e": "🧑🏾‍🚀"
	      },
	      "1F3FF": {
	        "k": "astronaut-1F3FF",
	        "n": "astronaut",
	        "e": "🧑🏿‍🚀"
	      }
	    }
	  }, {
	    "n": ["male-astronaut"],
	    "e": "👨‍🚀",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-astronaut-1F3FB",
	        "n": "male-astronaut",
	        "e": "👨🏻‍🚀"
	      },
	      "1F3FC": {
	        "k": "male-astronaut-1F3FC",
	        "n": "male-astronaut",
	        "e": "👨🏼‍🚀"
	      },
	      "1F3FD": {
	        "k": "male-astronaut-1F3FD",
	        "n": "male-astronaut",
	        "e": "👨🏽‍🚀"
	      },
	      "1F3FE": {
	        "k": "male-astronaut-1F3FE",
	        "n": "male-astronaut",
	        "e": "👨🏾‍🚀"
	      },
	      "1F3FF": {
	        "k": "male-astronaut-1F3FF",
	        "n": "male-astronaut",
	        "e": "👨🏿‍🚀"
	      }
	    }
	  }, {
	    "n": ["female-astronaut"],
	    "e": "👩‍🚀",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-astronaut-1F3FB",
	        "n": "female-astronaut",
	        "e": "👩🏻‍🚀"
	      },
	      "1F3FC": {
	        "k": "female-astronaut-1F3FC",
	        "n": "female-astronaut",
	        "e": "👩🏼‍🚀"
	      },
	      "1F3FD": {
	        "k": "female-astronaut-1F3FD",
	        "n": "female-astronaut",
	        "e": "👩🏽‍🚀"
	      },
	      "1F3FE": {
	        "k": "female-astronaut-1F3FE",
	        "n": "female-astronaut",
	        "e": "👩🏾‍🚀"
	      },
	      "1F3FF": {
	        "k": "female-astronaut-1F3FF",
	        "n": "female-astronaut",
	        "e": "👩🏿‍🚀"
	      }
	    }
	  }, {
	    "n": ["firefighter"],
	    "e": "🧑‍🚒",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "firefighter-1F3FB",
	        "n": "firefighter",
	        "e": "🧑🏻‍🚒"
	      },
	      "1F3FC": {
	        "k": "firefighter-1F3FC",
	        "n": "firefighter",
	        "e": "🧑🏼‍🚒"
	      },
	      "1F3FD": {
	        "k": "firefighter-1F3FD",
	        "n": "firefighter",
	        "e": "🧑🏽‍🚒"
	      },
	      "1F3FE": {
	        "k": "firefighter-1F3FE",
	        "n": "firefighter",
	        "e": "🧑🏾‍🚒"
	      },
	      "1F3FF": {
	        "k": "firefighter-1F3FF",
	        "n": "firefighter",
	        "e": "🧑🏿‍🚒"
	      }
	    }
	  }, {
	    "n": ["male-firefighter"],
	    "e": "👨‍🚒",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-firefighter-1F3FB",
	        "n": "male-firefighter",
	        "e": "👨🏻‍🚒"
	      },
	      "1F3FC": {
	        "k": "male-firefighter-1F3FC",
	        "n": "male-firefighter",
	        "e": "👨🏼‍🚒"
	      },
	      "1F3FD": {
	        "k": "male-firefighter-1F3FD",
	        "n": "male-firefighter",
	        "e": "👨🏽‍🚒"
	      },
	      "1F3FE": {
	        "k": "male-firefighter-1F3FE",
	        "n": "male-firefighter",
	        "e": "👨🏾‍🚒"
	      },
	      "1F3FF": {
	        "k": "male-firefighter-1F3FF",
	        "n": "male-firefighter",
	        "e": "👨🏿‍🚒"
	      }
	    }
	  }, {
	    "n": ["female-firefighter"],
	    "e": "👩‍🚒",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-firefighter-1F3FB",
	        "n": "female-firefighter",
	        "e": "👩🏻‍🚒"
	      },
	      "1F3FC": {
	        "k": "female-firefighter-1F3FC",
	        "n": "female-firefighter",
	        "e": "👩🏼‍🚒"
	      },
	      "1F3FD": {
	        "k": "female-firefighter-1F3FD",
	        "n": "female-firefighter",
	        "e": "👩🏽‍🚒"
	      },
	      "1F3FE": {
	        "k": "female-firefighter-1F3FE",
	        "n": "female-firefighter",
	        "e": "👩🏾‍🚒"
	      },
	      "1F3FF": {
	        "k": "female-firefighter-1F3FF",
	        "n": "female-firefighter",
	        "e": "👩🏿‍🚒"
	      }
	    }
	  }, {
	    "n": ["cop"],
	    "e": "👮",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "cop-1F3FB",
	        "n": "cop",
	        "e": "👮🏻"
	      },
	      "1F3FC": {
	        "k": "cop-1F3FC",
	        "n": "cop",
	        "e": "👮🏼"
	      },
	      "1F3FD": {
	        "k": "cop-1F3FD",
	        "n": "cop",
	        "e": "👮🏽"
	      },
	      "1F3FE": {
	        "k": "cop-1F3FE",
	        "n": "cop",
	        "e": "👮🏾"
	      },
	      "1F3FF": {
	        "k": "cop-1F3FF",
	        "n": "cop",
	        "e": "👮🏿"
	      }
	    }
	  }, {
	    "n": ["male-police-officer"],
	    "e": "👮‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-police-officer-1F3FB",
	        "n": "male-police-officer",
	        "e": "👮🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male-police-officer-1F3FC",
	        "n": "male-police-officer",
	        "e": "👮🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male-police-officer-1F3FD",
	        "n": "male-police-officer",
	        "e": "👮🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male-police-officer-1F3FE",
	        "n": "male-police-officer",
	        "e": "👮🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male-police-officer-1F3FF",
	        "n": "male-police-officer",
	        "e": "👮🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female-police-officer"],
	    "e": "👮‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-police-officer-1F3FB",
	        "n": "female-police-officer",
	        "e": "👮🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female-police-officer-1F3FC",
	        "n": "female-police-officer",
	        "e": "👮🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female-police-officer-1F3FD",
	        "n": "female-police-officer",
	        "e": "👮🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female-police-officer-1F3FE",
	        "n": "female-police-officer",
	        "e": "👮🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female-police-officer-1F3FF",
	        "n": "female-police-officer",
	        "e": "👮🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["sleuth_or_spy"],
	    "e": "🕵️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "sleuth_or_spy-1F3FB",
	        "n": "sleuth_or_spy",
	        "e": "🕵🏻"
	      },
	      "1F3FC": {
	        "k": "sleuth_or_spy-1F3FC",
	        "n": "sleuth_or_spy",
	        "e": "🕵🏼"
	      },
	      "1F3FD": {
	        "k": "sleuth_or_spy-1F3FD",
	        "n": "sleuth_or_spy",
	        "e": "🕵🏽"
	      },
	      "1F3FE": {
	        "k": "sleuth_or_spy-1F3FE",
	        "n": "sleuth_or_spy",
	        "e": "🕵🏾"
	      },
	      "1F3FF": {
	        "k": "sleuth_or_spy-1F3FF",
	        "n": "sleuth_or_spy",
	        "e": "🕵🏿"
	      }
	    }
	  }, {
	    "n": ["male-detective"],
	    "e": "🕵️‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-detective-1F3FB",
	        "n": "male-detective",
	        "e": "🕵🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male-detective-1F3FC",
	        "n": "male-detective",
	        "e": "🕵🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male-detective-1F3FD",
	        "n": "male-detective",
	        "e": "🕵🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male-detective-1F3FE",
	        "n": "male-detective",
	        "e": "🕵🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male-detective-1F3FF",
	        "n": "male-detective",
	        "e": "🕵🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female-detective"],
	    "e": "🕵️‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-detective-1F3FB",
	        "n": "female-detective",
	        "e": "🕵🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female-detective-1F3FC",
	        "n": "female-detective",
	        "e": "🕵🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female-detective-1F3FD",
	        "n": "female-detective",
	        "e": "🕵🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female-detective-1F3FE",
	        "n": "female-detective",
	        "e": "🕵🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female-detective-1F3FF",
	        "n": "female-detective",
	        "e": "🕵🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["guardsman"],
	    "e": "💂",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "guardsman-1F3FB",
	        "n": "guardsman",
	        "e": "💂🏻"
	      },
	      "1F3FC": {
	        "k": "guardsman-1F3FC",
	        "n": "guardsman",
	        "e": "💂🏼"
	      },
	      "1F3FD": {
	        "k": "guardsman-1F3FD",
	        "n": "guardsman",
	        "e": "💂🏽"
	      },
	      "1F3FE": {
	        "k": "guardsman-1F3FE",
	        "n": "guardsman",
	        "e": "💂🏾"
	      },
	      "1F3FF": {
	        "k": "guardsman-1F3FF",
	        "n": "guardsman",
	        "e": "💂🏿"
	      }
	    }
	  }, {
	    "n": ["male-guard"],
	    "e": "💂‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-guard-1F3FB",
	        "n": "male-guard",
	        "e": "💂🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male-guard-1F3FC",
	        "n": "male-guard",
	        "e": "💂🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male-guard-1F3FD",
	        "n": "male-guard",
	        "e": "💂🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male-guard-1F3FE",
	        "n": "male-guard",
	        "e": "💂🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male-guard-1F3FF",
	        "n": "male-guard",
	        "e": "💂🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female-guard"],
	    "e": "💂‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-guard-1F3FB",
	        "n": "female-guard",
	        "e": "💂🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female-guard-1F3FC",
	        "n": "female-guard",
	        "e": "💂🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female-guard-1F3FD",
	        "n": "female-guard",
	        "e": "💂🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female-guard-1F3FE",
	        "n": "female-guard",
	        "e": "💂🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female-guard-1F3FF",
	        "n": "female-guard",
	        "e": "💂🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["construction_worker"],
	    "e": "👷",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "construction_worker-1F3FB",
	        "n": "construction_worker",
	        "e": "👷🏻"
	      },
	      "1F3FC": {
	        "k": "construction_worker-1F3FC",
	        "n": "construction_worker",
	        "e": "👷🏼"
	      },
	      "1F3FD": {
	        "k": "construction_worker-1F3FD",
	        "n": "construction_worker",
	        "e": "👷🏽"
	      },
	      "1F3FE": {
	        "k": "construction_worker-1F3FE",
	        "n": "construction_worker",
	        "e": "👷🏾"
	      },
	      "1F3FF": {
	        "k": "construction_worker-1F3FF",
	        "n": "construction_worker",
	        "e": "👷🏿"
	      }
	    }
	  }, {
	    "n": ["male-construction-worker"],
	    "e": "👷‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "male-construction-worker-1F3FB",
	        "n": "male-construction-worker",
	        "e": "👷🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male-construction-worker-1F3FC",
	        "n": "male-construction-worker",
	        "e": "👷🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male-construction-worker-1F3FD",
	        "n": "male-construction-worker",
	        "e": "👷🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male-construction-worker-1F3FE",
	        "n": "male-construction-worker",
	        "e": "👷🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male-construction-worker-1F3FF",
	        "n": "male-construction-worker",
	        "e": "👷🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female-construction-worker"],
	    "e": "👷‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "female-construction-worker-1F3FB",
	        "n": "female-construction-worker",
	        "e": "👷🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female-construction-worker-1F3FC",
	        "n": "female-construction-worker",
	        "e": "👷🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female-construction-worker-1F3FD",
	        "n": "female-construction-worker",
	        "e": "👷🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female-construction-worker-1F3FE",
	        "n": "female-construction-worker",
	        "e": "👷🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female-construction-worker-1F3FF",
	        "n": "female-construction-worker",
	        "e": "👷🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["prince"],
	    "e": "🤴",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "prince-1F3FB",
	        "n": "prince",
	        "e": "🤴🏻"
	      },
	      "1F3FC": {
	        "k": "prince-1F3FC",
	        "n": "prince",
	        "e": "🤴🏼"
	      },
	      "1F3FD": {
	        "k": "prince-1F3FD",
	        "n": "prince",
	        "e": "🤴🏽"
	      },
	      "1F3FE": {
	        "k": "prince-1F3FE",
	        "n": "prince",
	        "e": "🤴🏾"
	      },
	      "1F3FF": {
	        "k": "prince-1F3FF",
	        "n": "prince",
	        "e": "🤴🏿"
	      }
	    }
	  }, {
	    "n": ["princess"],
	    "e": "👸",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "princess-1F3FB",
	        "n": "princess",
	        "e": "👸🏻"
	      },
	      "1F3FC": {
	        "k": "princess-1F3FC",
	        "n": "princess",
	        "e": "👸🏼"
	      },
	      "1F3FD": {
	        "k": "princess-1F3FD",
	        "n": "princess",
	        "e": "👸🏽"
	      },
	      "1F3FE": {
	        "k": "princess-1F3FE",
	        "n": "princess",
	        "e": "👸🏾"
	      },
	      "1F3FF": {
	        "k": "princess-1F3FF",
	        "n": "princess",
	        "e": "👸🏿"
	      }
	    }
	  }, {
	    "n": ["man_with_turban"],
	    "e": "👳",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_with_turban-1F3FB",
	        "n": "man_with_turban",
	        "e": "👳🏻"
	      },
	      "1F3FC": {
	        "k": "man_with_turban-1F3FC",
	        "n": "man_with_turban",
	        "e": "👳🏼"
	      },
	      "1F3FD": {
	        "k": "man_with_turban-1F3FD",
	        "n": "man_with_turban",
	        "e": "👳🏽"
	      },
	      "1F3FE": {
	        "k": "man_with_turban-1F3FE",
	        "n": "man_with_turban",
	        "e": "👳🏾"
	      },
	      "1F3FF": {
	        "k": "man_with_turban-1F3FF",
	        "n": "man_with_turban",
	        "e": "👳🏿"
	      }
	    }
	  }, {
	    "n": ["man-wearing-turban"],
	    "e": "👳‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-wearing-turban-1F3FB",
	        "n": "man-wearing-turban",
	        "e": "👳🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-wearing-turban-1F3FC",
	        "n": "man-wearing-turban",
	        "e": "👳🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-wearing-turban-1F3FD",
	        "n": "man-wearing-turban",
	        "e": "👳🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-wearing-turban-1F3FE",
	        "n": "man-wearing-turban",
	        "e": "👳🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-wearing-turban-1F3FF",
	        "n": "man-wearing-turban",
	        "e": "👳🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-wearing-turban"],
	    "e": "👳‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-wearing-turban-1F3FB",
	        "n": "woman-wearing-turban",
	        "e": "👳🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-wearing-turban-1F3FC",
	        "n": "woman-wearing-turban",
	        "e": "👳🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-wearing-turban-1F3FD",
	        "n": "woman-wearing-turban",
	        "e": "👳🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-wearing-turban-1F3FE",
	        "n": "woman-wearing-turban",
	        "e": "👳🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-wearing-turban-1F3FF",
	        "n": "woman-wearing-turban",
	        "e": "👳🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["man_with_gua_pi_mao"],
	    "e": "👲",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_with_gua_pi_mao-1F3FB",
	        "n": "man_with_gua_pi_mao",
	        "e": "👲🏻"
	      },
	      "1F3FC": {
	        "k": "man_with_gua_pi_mao-1F3FC",
	        "n": "man_with_gua_pi_mao",
	        "e": "👲🏼"
	      },
	      "1F3FD": {
	        "k": "man_with_gua_pi_mao-1F3FD",
	        "n": "man_with_gua_pi_mao",
	        "e": "👲🏽"
	      },
	      "1F3FE": {
	        "k": "man_with_gua_pi_mao-1F3FE",
	        "n": "man_with_gua_pi_mao",
	        "e": "👲🏾"
	      },
	      "1F3FF": {
	        "k": "man_with_gua_pi_mao-1F3FF",
	        "n": "man_with_gua_pi_mao",
	        "e": "👲🏿"
	      }
	    }
	  }, {
	    "n": ["person_with_headscarf"],
	    "e": "🧕",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_with_headscarf-1F3FB",
	        "n": "person_with_headscarf",
	        "e": "🧕🏻"
	      },
	      "1F3FC": {
	        "k": "person_with_headscarf-1F3FC",
	        "n": "person_with_headscarf",
	        "e": "🧕🏼"
	      },
	      "1F3FD": {
	        "k": "person_with_headscarf-1F3FD",
	        "n": "person_with_headscarf",
	        "e": "🧕🏽"
	      },
	      "1F3FE": {
	        "k": "person_with_headscarf-1F3FE",
	        "n": "person_with_headscarf",
	        "e": "🧕🏾"
	      },
	      "1F3FF": {
	        "k": "person_with_headscarf-1F3FF",
	        "n": "person_with_headscarf",
	        "e": "🧕🏿"
	      }
	    }
	  }, {
	    "n": ["man_in_tuxedo"],
	    "e": "🤵",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_tuxedo-1F3FB",
	        "n": "man_in_tuxedo",
	        "e": "🤵🏻"
	      },
	      "1F3FC": {
	        "k": "man_in_tuxedo-1F3FC",
	        "n": "man_in_tuxedo",
	        "e": "🤵🏼"
	      },
	      "1F3FD": {
	        "k": "man_in_tuxedo-1F3FD",
	        "n": "man_in_tuxedo",
	        "e": "🤵🏽"
	      },
	      "1F3FE": {
	        "k": "man_in_tuxedo-1F3FE",
	        "n": "man_in_tuxedo",
	        "e": "🤵🏾"
	      },
	      "1F3FF": {
	        "k": "man_in_tuxedo-1F3FF",
	        "n": "man_in_tuxedo",
	        "e": "🤵🏿"
	      }
	    }
	  }, {
	    "n": ["bride_with_veil"],
	    "e": "👰",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "bride_with_veil-1F3FB",
	        "n": "bride_with_veil",
	        "e": "👰🏻"
	      },
	      "1F3FC": {
	        "k": "bride_with_veil-1F3FC",
	        "n": "bride_with_veil",
	        "e": "👰🏼"
	      },
	      "1F3FD": {
	        "k": "bride_with_veil-1F3FD",
	        "n": "bride_with_veil",
	        "e": "👰🏽"
	      },
	      "1F3FE": {
	        "k": "bride_with_veil-1F3FE",
	        "n": "bride_with_veil",
	        "e": "👰🏾"
	      },
	      "1F3FF": {
	        "k": "bride_with_veil-1F3FF",
	        "n": "bride_with_veil",
	        "e": "👰🏿"
	      }
	    }
	  }, {
	    "n": ["pregnant_woman"],
	    "e": "🤰",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "pregnant_woman-1F3FB",
	        "n": "pregnant_woman",
	        "e": "🤰🏻"
	      },
	      "1F3FC": {
	        "k": "pregnant_woman-1F3FC",
	        "n": "pregnant_woman",
	        "e": "🤰🏼"
	      },
	      "1F3FD": {
	        "k": "pregnant_woman-1F3FD",
	        "n": "pregnant_woman",
	        "e": "🤰🏽"
	      },
	      "1F3FE": {
	        "k": "pregnant_woman-1F3FE",
	        "n": "pregnant_woman",
	        "e": "🤰🏾"
	      },
	      "1F3FF": {
	        "k": "pregnant_woman-1F3FF",
	        "n": "pregnant_woman",
	        "e": "🤰🏿"
	      }
	    }
	  }, {
	    "n": ["breast-feeding"],
	    "e": "🤱",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "breast-feeding-1F3FB",
	        "n": "breast-feeding",
	        "e": "🤱🏻"
	      },
	      "1F3FC": {
	        "k": "breast-feeding-1F3FC",
	        "n": "breast-feeding",
	        "e": "🤱🏼"
	      },
	      "1F3FD": {
	        "k": "breast-feeding-1F3FD",
	        "n": "breast-feeding",
	        "e": "🤱🏽"
	      },
	      "1F3FE": {
	        "k": "breast-feeding-1F3FE",
	        "n": "breast-feeding",
	        "e": "🤱🏾"
	      },
	      "1F3FF": {
	        "k": "breast-feeding-1F3FF",
	        "n": "breast-feeding",
	        "e": "🤱🏿"
	      }
	    }
	  }, {
	    "n": ["angel"],
	    "e": "👼",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "angel-1F3FB",
	        "n": "angel",
	        "e": "👼🏻"
	      },
	      "1F3FC": {
	        "k": "angel-1F3FC",
	        "n": "angel",
	        "e": "👼🏼"
	      },
	      "1F3FD": {
	        "k": "angel-1F3FD",
	        "n": "angel",
	        "e": "👼🏽"
	      },
	      "1F3FE": {
	        "k": "angel-1F3FE",
	        "n": "angel",
	        "e": "👼🏾"
	      },
	      "1F3FF": {
	        "k": "angel-1F3FF",
	        "n": "angel",
	        "e": "👼🏿"
	      }
	    }
	  }, {
	    "n": ["santa"],
	    "e": "🎅",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "santa-1F3FB",
	        "n": "santa",
	        "e": "🎅🏻"
	      },
	      "1F3FC": {
	        "k": "santa-1F3FC",
	        "n": "santa",
	        "e": "🎅🏼"
	      },
	      "1F3FD": {
	        "k": "santa-1F3FD",
	        "n": "santa",
	        "e": "🎅🏽"
	      },
	      "1F3FE": {
	        "k": "santa-1F3FE",
	        "n": "santa",
	        "e": "🎅🏾"
	      },
	      "1F3FF": {
	        "k": "santa-1F3FF",
	        "n": "santa",
	        "e": "🎅🏿"
	      }
	    }
	  }, {
	    "n": ["mrs_claus", "mother_christmas"],
	    "e": "🤶",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "mrs_claus-1F3FB",
	        "n": "mrs_claus",
	        "e": "🤶🏻"
	      },
	      "1F3FC": {
	        "k": "mrs_claus-1F3FC",
	        "n": "mrs_claus",
	        "e": "🤶🏼"
	      },
	      "1F3FD": {
	        "k": "mrs_claus-1F3FD",
	        "n": "mrs_claus",
	        "e": "🤶🏽"
	      },
	      "1F3FE": {
	        "k": "mrs_claus-1F3FE",
	        "n": "mrs_claus",
	        "e": "🤶🏾"
	      },
	      "1F3FF": {
	        "k": "mrs_claus-1F3FF",
	        "n": "mrs_claus",
	        "e": "🤶🏿"
	      }
	    }
	  }, {
	    "n": ["superhero"],
	    "e": "🦸",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "superhero-1F3FB",
	        "n": "superhero",
	        "e": "🦸🏻"
	      },
	      "1F3FC": {
	        "k": "superhero-1F3FC",
	        "n": "superhero",
	        "e": "🦸🏼"
	      },
	      "1F3FD": {
	        "k": "superhero-1F3FD",
	        "n": "superhero",
	        "e": "🦸🏽"
	      },
	      "1F3FE": {
	        "k": "superhero-1F3FE",
	        "n": "superhero",
	        "e": "🦸🏾"
	      },
	      "1F3FF": {
	        "k": "superhero-1F3FF",
	        "n": "superhero",
	        "e": "🦸🏿"
	      }
	    }
	  }, {
	    "n": ["male_superhero"],
	    "e": "🦸‍♂️",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_superhero-1F3FB",
	        "n": "male_superhero",
	        "e": "🦸🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_superhero-1F3FC",
	        "n": "male_superhero",
	        "e": "🦸🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_superhero-1F3FD",
	        "n": "male_superhero",
	        "e": "🦸🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_superhero-1F3FE",
	        "n": "male_superhero",
	        "e": "🦸🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_superhero-1F3FF",
	        "n": "male_superhero",
	        "e": "🦸🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_superhero"],
	    "e": "🦸‍♀️",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_superhero-1F3FB",
	        "n": "female_superhero",
	        "e": "🦸🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_superhero-1F3FC",
	        "n": "female_superhero",
	        "e": "🦸🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_superhero-1F3FD",
	        "n": "female_superhero",
	        "e": "🦸🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_superhero-1F3FE",
	        "n": "female_superhero",
	        "e": "🦸🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_superhero-1F3FF",
	        "n": "female_superhero",
	        "e": "🦸🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["supervillain"],
	    "e": "🦹",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "supervillain-1F3FB",
	        "n": "supervillain",
	        "e": "🦹🏻"
	      },
	      "1F3FC": {
	        "k": "supervillain-1F3FC",
	        "n": "supervillain",
	        "e": "🦹🏼"
	      },
	      "1F3FD": {
	        "k": "supervillain-1F3FD",
	        "n": "supervillain",
	        "e": "🦹🏽"
	      },
	      "1F3FE": {
	        "k": "supervillain-1F3FE",
	        "n": "supervillain",
	        "e": "🦹🏾"
	      },
	      "1F3FF": {
	        "k": "supervillain-1F3FF",
	        "n": "supervillain",
	        "e": "🦹🏿"
	      }
	    }
	  }, {
	    "n": ["male_supervillain"],
	    "e": "🦹‍♂️",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_supervillain-1F3FB",
	        "n": "male_supervillain",
	        "e": "🦹🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_supervillain-1F3FC",
	        "n": "male_supervillain",
	        "e": "🦹🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_supervillain-1F3FD",
	        "n": "male_supervillain",
	        "e": "🦹🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_supervillain-1F3FE",
	        "n": "male_supervillain",
	        "e": "🦹🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_supervillain-1F3FF",
	        "n": "male_supervillain",
	        "e": "🦹🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_supervillain"],
	    "e": "🦹‍♀️",
	    "c": 9,
	    "ver": "11.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_supervillain-1F3FB",
	        "n": "female_supervillain",
	        "e": "🦹🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_supervillain-1F3FC",
	        "n": "female_supervillain",
	        "e": "🦹🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_supervillain-1F3FD",
	        "n": "female_supervillain",
	        "e": "🦹🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_supervillain-1F3FE",
	        "n": "female_supervillain",
	        "e": "🦹🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_supervillain-1F3FF",
	        "n": "female_supervillain",
	        "e": "🦹🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["mage"],
	    "e": "🧙",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "mage-1F3FB",
	        "n": "mage",
	        "e": "🧙🏻"
	      },
	      "1F3FC": {
	        "k": "mage-1F3FC",
	        "n": "mage",
	        "e": "🧙🏼"
	      },
	      "1F3FD": {
	        "k": "mage-1F3FD",
	        "n": "mage",
	        "e": "🧙🏽"
	      },
	      "1F3FE": {
	        "k": "mage-1F3FE",
	        "n": "mage",
	        "e": "🧙🏾"
	      },
	      "1F3FF": {
	        "k": "mage-1F3FF",
	        "n": "mage",
	        "e": "🧙🏿"
	      }
	    }
	  }, {
	    "n": ["male_mage"],
	    "e": "🧙‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_mage-1F3FB",
	        "n": "male_mage",
	        "e": "🧙🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_mage-1F3FC",
	        "n": "male_mage",
	        "e": "🧙🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_mage-1F3FD",
	        "n": "male_mage",
	        "e": "🧙🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_mage-1F3FE",
	        "n": "male_mage",
	        "e": "🧙🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_mage-1F3FF",
	        "n": "male_mage",
	        "e": "🧙🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_mage"],
	    "e": "🧙‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_mage-1F3FB",
	        "n": "female_mage",
	        "e": "🧙🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_mage-1F3FC",
	        "n": "female_mage",
	        "e": "🧙🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_mage-1F3FD",
	        "n": "female_mage",
	        "e": "🧙🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_mage-1F3FE",
	        "n": "female_mage",
	        "e": "🧙🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_mage-1F3FF",
	        "n": "female_mage",
	        "e": "🧙🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["fairy"],
	    "e": "🧚",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "fairy-1F3FB",
	        "n": "fairy",
	        "e": "🧚🏻"
	      },
	      "1F3FC": {
	        "k": "fairy-1F3FC",
	        "n": "fairy",
	        "e": "🧚🏼"
	      },
	      "1F3FD": {
	        "k": "fairy-1F3FD",
	        "n": "fairy",
	        "e": "🧚🏽"
	      },
	      "1F3FE": {
	        "k": "fairy-1F3FE",
	        "n": "fairy",
	        "e": "🧚🏾"
	      },
	      "1F3FF": {
	        "k": "fairy-1F3FF",
	        "n": "fairy",
	        "e": "🧚🏿"
	      }
	    }
	  }, {
	    "n": ["male_fairy"],
	    "e": "🧚‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_fairy-1F3FB",
	        "n": "male_fairy",
	        "e": "🧚🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_fairy-1F3FC",
	        "n": "male_fairy",
	        "e": "🧚🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_fairy-1F3FD",
	        "n": "male_fairy",
	        "e": "🧚🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_fairy-1F3FE",
	        "n": "male_fairy",
	        "e": "🧚🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_fairy-1F3FF",
	        "n": "male_fairy",
	        "e": "🧚🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_fairy"],
	    "e": "🧚‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_fairy-1F3FB",
	        "n": "female_fairy",
	        "e": "🧚🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_fairy-1F3FC",
	        "n": "female_fairy",
	        "e": "🧚🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_fairy-1F3FD",
	        "n": "female_fairy",
	        "e": "🧚🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_fairy-1F3FE",
	        "n": "female_fairy",
	        "e": "🧚🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_fairy-1F3FF",
	        "n": "female_fairy",
	        "e": "🧚🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["vampire"],
	    "e": "🧛",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "vampire-1F3FB",
	        "n": "vampire",
	        "e": "🧛🏻"
	      },
	      "1F3FC": {
	        "k": "vampire-1F3FC",
	        "n": "vampire",
	        "e": "🧛🏼"
	      },
	      "1F3FD": {
	        "k": "vampire-1F3FD",
	        "n": "vampire",
	        "e": "🧛🏽"
	      },
	      "1F3FE": {
	        "k": "vampire-1F3FE",
	        "n": "vampire",
	        "e": "🧛🏾"
	      },
	      "1F3FF": {
	        "k": "vampire-1F3FF",
	        "n": "vampire",
	        "e": "🧛🏿"
	      }
	    }
	  }, {
	    "n": ["male_vampire"],
	    "e": "🧛‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_vampire-1F3FB",
	        "n": "male_vampire",
	        "e": "🧛🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_vampire-1F3FC",
	        "n": "male_vampire",
	        "e": "🧛🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_vampire-1F3FD",
	        "n": "male_vampire",
	        "e": "🧛🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_vampire-1F3FE",
	        "n": "male_vampire",
	        "e": "🧛🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_vampire-1F3FF",
	        "n": "male_vampire",
	        "e": "🧛🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_vampire"],
	    "e": "🧛‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_vampire-1F3FB",
	        "n": "female_vampire",
	        "e": "🧛🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_vampire-1F3FC",
	        "n": "female_vampire",
	        "e": "🧛🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_vampire-1F3FD",
	        "n": "female_vampire",
	        "e": "🧛🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_vampire-1F3FE",
	        "n": "female_vampire",
	        "e": "🧛🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_vampire-1F3FF",
	        "n": "female_vampire",
	        "e": "🧛🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["merperson"],
	    "e": "🧜",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "merperson-1F3FB",
	        "n": "merperson",
	        "e": "🧜🏻"
	      },
	      "1F3FC": {
	        "k": "merperson-1F3FC",
	        "n": "merperson",
	        "e": "🧜🏼"
	      },
	      "1F3FD": {
	        "k": "merperson-1F3FD",
	        "n": "merperson",
	        "e": "🧜🏽"
	      },
	      "1F3FE": {
	        "k": "merperson-1F3FE",
	        "n": "merperson",
	        "e": "🧜🏾"
	      },
	      "1F3FF": {
	        "k": "merperson-1F3FF",
	        "n": "merperson",
	        "e": "🧜🏿"
	      }
	    }
	  }, {
	    "n": ["merman"],
	    "e": "🧜‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "merman-1F3FB",
	        "n": "merman",
	        "e": "🧜🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "merman-1F3FC",
	        "n": "merman",
	        "e": "🧜🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "merman-1F3FD",
	        "n": "merman",
	        "e": "🧜🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "merman-1F3FE",
	        "n": "merman",
	        "e": "🧜🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "merman-1F3FF",
	        "n": "merman",
	        "e": "🧜🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["mermaid"],
	    "e": "🧜‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "mermaid-1F3FB",
	        "n": "mermaid",
	        "e": "🧜🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "mermaid-1F3FC",
	        "n": "mermaid",
	        "e": "🧜🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "mermaid-1F3FD",
	        "n": "mermaid",
	        "e": "🧜🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "mermaid-1F3FE",
	        "n": "mermaid",
	        "e": "🧜🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "mermaid-1F3FF",
	        "n": "mermaid",
	        "e": "🧜🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["elf"],
	    "e": "🧝",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "elf-1F3FB",
	        "n": "elf",
	        "e": "🧝🏻"
	      },
	      "1F3FC": {
	        "k": "elf-1F3FC",
	        "n": "elf",
	        "e": "🧝🏼"
	      },
	      "1F3FD": {
	        "k": "elf-1F3FD",
	        "n": "elf",
	        "e": "🧝🏽"
	      },
	      "1F3FE": {
	        "k": "elf-1F3FE",
	        "n": "elf",
	        "e": "🧝🏾"
	      },
	      "1F3FF": {
	        "k": "elf-1F3FF",
	        "n": "elf",
	        "e": "🧝🏿"
	      }
	    }
	  }, {
	    "n": ["male_elf"],
	    "e": "🧝‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "male_elf-1F3FB",
	        "n": "male_elf",
	        "e": "🧝🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "male_elf-1F3FC",
	        "n": "male_elf",
	        "e": "🧝🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "male_elf-1F3FD",
	        "n": "male_elf",
	        "e": "🧝🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "male_elf-1F3FE",
	        "n": "male_elf",
	        "e": "🧝🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "male_elf-1F3FF",
	        "n": "male_elf",
	        "e": "🧝🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["female_elf"],
	    "e": "🧝‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "female_elf-1F3FB",
	        "n": "female_elf",
	        "e": "🧝🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "female_elf-1F3FC",
	        "n": "female_elf",
	        "e": "🧝🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "female_elf-1F3FD",
	        "n": "female_elf",
	        "e": "🧝🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "female_elf-1F3FE",
	        "n": "female_elf",
	        "e": "🧝🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "female_elf-1F3FF",
	        "n": "female_elf",
	        "e": "🧝🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["genie"],
	    "e": "🧞",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["male_genie"],
	    "e": "🧞‍♂️",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["female_genie"],
	    "e": "🧞‍♀️",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["zombie"],
	    "e": "🧟",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["male_zombie"],
	    "e": "🧟‍♂️",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["female_zombie"],
	    "e": "🧟‍♀️",
	    "c": 9,
	    "ver": "5.0"
	  }, {
	    "n": ["massage"],
	    "e": "💆",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "massage-1F3FB",
	        "n": "massage",
	        "e": "💆🏻"
	      },
	      "1F3FC": {
	        "k": "massage-1F3FC",
	        "n": "massage",
	        "e": "💆🏼"
	      },
	      "1F3FD": {
	        "k": "massage-1F3FD",
	        "n": "massage",
	        "e": "💆🏽"
	      },
	      "1F3FE": {
	        "k": "massage-1F3FE",
	        "n": "massage",
	        "e": "💆🏾"
	      },
	      "1F3FF": {
	        "k": "massage-1F3FF",
	        "n": "massage",
	        "e": "💆🏿"
	      }
	    }
	  }, {
	    "n": ["man-getting-massage"],
	    "e": "💆‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-getting-massage-1F3FB",
	        "n": "man-getting-massage",
	        "e": "💆🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-getting-massage-1F3FC",
	        "n": "man-getting-massage",
	        "e": "💆🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-getting-massage-1F3FD",
	        "n": "man-getting-massage",
	        "e": "💆🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-getting-massage-1F3FE",
	        "n": "man-getting-massage",
	        "e": "💆🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-getting-massage-1F3FF",
	        "n": "man-getting-massage",
	        "e": "💆🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-getting-massage"],
	    "e": "💆‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-getting-massage-1F3FB",
	        "n": "woman-getting-massage",
	        "e": "💆🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-getting-massage-1F3FC",
	        "n": "woman-getting-massage",
	        "e": "💆🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-getting-massage-1F3FD",
	        "n": "woman-getting-massage",
	        "e": "💆🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-getting-massage-1F3FE",
	        "n": "woman-getting-massage",
	        "e": "💆🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-getting-massage-1F3FF",
	        "n": "woman-getting-massage",
	        "e": "💆🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["haircut"],
	    "e": "💇",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "haircut-1F3FB",
	        "n": "haircut",
	        "e": "💇🏻"
	      },
	      "1F3FC": {
	        "k": "haircut-1F3FC",
	        "n": "haircut",
	        "e": "💇🏼"
	      },
	      "1F3FD": {
	        "k": "haircut-1F3FD",
	        "n": "haircut",
	        "e": "💇🏽"
	      },
	      "1F3FE": {
	        "k": "haircut-1F3FE",
	        "n": "haircut",
	        "e": "💇🏾"
	      },
	      "1F3FF": {
	        "k": "haircut-1F3FF",
	        "n": "haircut",
	        "e": "💇🏿"
	      }
	    }
	  }, {
	    "n": ["man-getting-haircut"],
	    "e": "💇‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-getting-haircut-1F3FB",
	        "n": "man-getting-haircut",
	        "e": "💇🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-getting-haircut-1F3FC",
	        "n": "man-getting-haircut",
	        "e": "💇🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-getting-haircut-1F3FD",
	        "n": "man-getting-haircut",
	        "e": "💇🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-getting-haircut-1F3FE",
	        "n": "man-getting-haircut",
	        "e": "💇🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-getting-haircut-1F3FF",
	        "n": "man-getting-haircut",
	        "e": "💇🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-getting-haircut"],
	    "e": "💇‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-getting-haircut-1F3FB",
	        "n": "woman-getting-haircut",
	        "e": "💇🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-getting-haircut-1F3FC",
	        "n": "woman-getting-haircut",
	        "e": "💇🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-getting-haircut-1F3FD",
	        "n": "woman-getting-haircut",
	        "e": "💇🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-getting-haircut-1F3FE",
	        "n": "woman-getting-haircut",
	        "e": "💇🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-getting-haircut-1F3FF",
	        "n": "woman-getting-haircut",
	        "e": "💇🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["walking"],
	    "e": "🚶",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "walking-1F3FB",
	        "n": "walking",
	        "e": "🚶🏻"
	      },
	      "1F3FC": {
	        "k": "walking-1F3FC",
	        "n": "walking",
	        "e": "🚶🏼"
	      },
	      "1F3FD": {
	        "k": "walking-1F3FD",
	        "n": "walking",
	        "e": "🚶🏽"
	      },
	      "1F3FE": {
	        "k": "walking-1F3FE",
	        "n": "walking",
	        "e": "🚶🏾"
	      },
	      "1F3FF": {
	        "k": "walking-1F3FF",
	        "n": "walking",
	        "e": "🚶🏿"
	      }
	    }
	  }, {
	    "n": ["man-walking"],
	    "e": "🚶‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-walking-1F3FB",
	        "n": "man-walking",
	        "e": "🚶🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-walking-1F3FC",
	        "n": "man-walking",
	        "e": "🚶🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-walking-1F3FD",
	        "n": "man-walking",
	        "e": "🚶🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-walking-1F3FE",
	        "n": "man-walking",
	        "e": "🚶🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-walking-1F3FF",
	        "n": "man-walking",
	        "e": "🚶🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-walking"],
	    "e": "🚶‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-walking-1F3FB",
	        "n": "woman-walking",
	        "e": "🚶🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-walking-1F3FC",
	        "n": "woman-walking",
	        "e": "🚶🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-walking-1F3FD",
	        "n": "woman-walking",
	        "e": "🚶🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-walking-1F3FE",
	        "n": "woman-walking",
	        "e": "🚶🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-walking-1F3FF",
	        "n": "woman-walking",
	        "e": "🚶🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["standing_person"],
	    "e": "🧍",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "standing_person-1F3FB",
	        "n": "standing_person",
	        "e": "🧍🏻"
	      },
	      "1F3FC": {
	        "k": "standing_person-1F3FC",
	        "n": "standing_person",
	        "e": "🧍🏼"
	      },
	      "1F3FD": {
	        "k": "standing_person-1F3FD",
	        "n": "standing_person",
	        "e": "🧍🏽"
	      },
	      "1F3FE": {
	        "k": "standing_person-1F3FE",
	        "n": "standing_person",
	        "e": "🧍🏾"
	      },
	      "1F3FF": {
	        "k": "standing_person-1F3FF",
	        "n": "standing_person",
	        "e": "🧍🏿"
	      }
	    }
	  }, {
	    "n": ["man_standing"],
	    "e": "🧍‍♂️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "man_standing-1F3FB",
	        "n": "man_standing",
	        "e": "🧍🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man_standing-1F3FC",
	        "n": "man_standing",
	        "e": "🧍🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man_standing-1F3FD",
	        "n": "man_standing",
	        "e": "🧍🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man_standing-1F3FE",
	        "n": "man_standing",
	        "e": "🧍🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man_standing-1F3FF",
	        "n": "man_standing",
	        "e": "🧍🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman_standing"],
	    "e": "🧍‍♀️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "woman_standing-1F3FB",
	        "n": "woman_standing",
	        "e": "🧍🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman_standing-1F3FC",
	        "n": "woman_standing",
	        "e": "🧍🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman_standing-1F3FD",
	        "n": "woman_standing",
	        "e": "🧍🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman_standing-1F3FE",
	        "n": "woman_standing",
	        "e": "🧍🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman_standing-1F3FF",
	        "n": "woman_standing",
	        "e": "🧍🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["kneeling_person"],
	    "e": "🧎",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "kneeling_person-1F3FB",
	        "n": "kneeling_person",
	        "e": "🧎🏻"
	      },
	      "1F3FC": {
	        "k": "kneeling_person-1F3FC",
	        "n": "kneeling_person",
	        "e": "🧎🏼"
	      },
	      "1F3FD": {
	        "k": "kneeling_person-1F3FD",
	        "n": "kneeling_person",
	        "e": "🧎🏽"
	      },
	      "1F3FE": {
	        "k": "kneeling_person-1F3FE",
	        "n": "kneeling_person",
	        "e": "🧎🏾"
	      },
	      "1F3FF": {
	        "k": "kneeling_person-1F3FF",
	        "n": "kneeling_person",
	        "e": "🧎🏿"
	      }
	    }
	  }, {
	    "n": ["man_kneeling"],
	    "e": "🧎‍♂️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "man_kneeling-1F3FB",
	        "n": "man_kneeling",
	        "e": "🧎🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man_kneeling-1F3FC",
	        "n": "man_kneeling",
	        "e": "🧎🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man_kneeling-1F3FD",
	        "n": "man_kneeling",
	        "e": "🧎🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man_kneeling-1F3FE",
	        "n": "man_kneeling",
	        "e": "🧎🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man_kneeling-1F3FF",
	        "n": "man_kneeling",
	        "e": "🧎🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman_kneeling"],
	    "e": "🧎‍♀️",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "woman_kneeling-1F3FB",
	        "n": "woman_kneeling",
	        "e": "🧎🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman_kneeling-1F3FC",
	        "n": "woman_kneeling",
	        "e": "🧎🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman_kneeling-1F3FD",
	        "n": "woman_kneeling",
	        "e": "🧎🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman_kneeling-1F3FE",
	        "n": "woman_kneeling",
	        "e": "🧎🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman_kneeling-1F3FF",
	        "n": "woman_kneeling",
	        "e": "🧎🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["person_with_probing_cane"],
	    "e": "🧑‍🦯",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "person_with_probing_cane-1F3FB",
	        "n": "person_with_probing_cane",
	        "e": "🧑🏻‍🦯"
	      },
	      "1F3FC": {
	        "k": "person_with_probing_cane-1F3FC",
	        "n": "person_with_probing_cane",
	        "e": "🧑🏼‍🦯"
	      },
	      "1F3FD": {
	        "k": "person_with_probing_cane-1F3FD",
	        "n": "person_with_probing_cane",
	        "e": "🧑🏽‍🦯"
	      },
	      "1F3FE": {
	        "k": "person_with_probing_cane-1F3FE",
	        "n": "person_with_probing_cane",
	        "e": "🧑🏾‍🦯"
	      },
	      "1F3FF": {
	        "k": "person_with_probing_cane-1F3FF",
	        "n": "person_with_probing_cane",
	        "e": "🧑🏿‍🦯"
	      }
	    }
	  }, {
	    "n": ["man_with_probing_cane"],
	    "e": "👨‍🦯",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "man_with_probing_cane-1F3FB",
	        "n": "man_with_probing_cane",
	        "e": "👨🏻‍🦯"
	      },
	      "1F3FC": {
	        "k": "man_with_probing_cane-1F3FC",
	        "n": "man_with_probing_cane",
	        "e": "👨🏼‍🦯"
	      },
	      "1F3FD": {
	        "k": "man_with_probing_cane-1F3FD",
	        "n": "man_with_probing_cane",
	        "e": "👨🏽‍🦯"
	      },
	      "1F3FE": {
	        "k": "man_with_probing_cane-1F3FE",
	        "n": "man_with_probing_cane",
	        "e": "👨🏾‍🦯"
	      },
	      "1F3FF": {
	        "k": "man_with_probing_cane-1F3FF",
	        "n": "man_with_probing_cane",
	        "e": "👨🏿‍🦯"
	      }
	    }
	  }, {
	    "n": ["woman_with_probing_cane"],
	    "e": "👩‍🦯",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "woman_with_probing_cane-1F3FB",
	        "n": "woman_with_probing_cane",
	        "e": "👩🏻‍🦯"
	      },
	      "1F3FC": {
	        "k": "woman_with_probing_cane-1F3FC",
	        "n": "woman_with_probing_cane",
	        "e": "👩🏼‍🦯"
	      },
	      "1F3FD": {
	        "k": "woman_with_probing_cane-1F3FD",
	        "n": "woman_with_probing_cane",
	        "e": "👩🏽‍🦯"
	      },
	      "1F3FE": {
	        "k": "woman_with_probing_cane-1F3FE",
	        "n": "woman_with_probing_cane",
	        "e": "👩🏾‍🦯"
	      },
	      "1F3FF": {
	        "k": "woman_with_probing_cane-1F3FF",
	        "n": "woman_with_probing_cane",
	        "e": "👩🏿‍🦯"
	      }
	    }
	  }, {
	    "n": ["person_in_motorized_wheelchair"],
	    "e": "🧑‍🦼",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "person_in_motorized_wheelchair-1F3FB",
	        "n": "person_in_motorized_wheelchair",
	        "e": "🧑🏻‍🦼"
	      },
	      "1F3FC": {
	        "k": "person_in_motorized_wheelchair-1F3FC",
	        "n": "person_in_motorized_wheelchair",
	        "e": "🧑🏼‍🦼"
	      },
	      "1F3FD": {
	        "k": "person_in_motorized_wheelchair-1F3FD",
	        "n": "person_in_motorized_wheelchair",
	        "e": "🧑🏽‍🦼"
	      },
	      "1F3FE": {
	        "k": "person_in_motorized_wheelchair-1F3FE",
	        "n": "person_in_motorized_wheelchair",
	        "e": "🧑🏾‍🦼"
	      },
	      "1F3FF": {
	        "k": "person_in_motorized_wheelchair-1F3FF",
	        "n": "person_in_motorized_wheelchair",
	        "e": "🧑🏿‍🦼"
	      }
	    }
	  }, {
	    "n": ["man_in_motorized_wheelchair"],
	    "e": "👨‍🦼",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_motorized_wheelchair-1F3FB",
	        "n": "man_in_motorized_wheelchair",
	        "e": "👨🏻‍🦼"
	      },
	      "1F3FC": {
	        "k": "man_in_motorized_wheelchair-1F3FC",
	        "n": "man_in_motorized_wheelchair",
	        "e": "👨🏼‍🦼"
	      },
	      "1F3FD": {
	        "k": "man_in_motorized_wheelchair-1F3FD",
	        "n": "man_in_motorized_wheelchair",
	        "e": "👨🏽‍🦼"
	      },
	      "1F3FE": {
	        "k": "man_in_motorized_wheelchair-1F3FE",
	        "n": "man_in_motorized_wheelchair",
	        "e": "👨🏾‍🦼"
	      },
	      "1F3FF": {
	        "k": "man_in_motorized_wheelchair-1F3FF",
	        "n": "man_in_motorized_wheelchair",
	        "e": "👨🏿‍🦼"
	      }
	    }
	  }, {
	    "n": ["woman_in_motorized_wheelchair"],
	    "e": "👩‍🦼",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "woman_in_motorized_wheelchair-1F3FB",
	        "n": "woman_in_motorized_wheelchair",
	        "e": "👩🏻‍🦼"
	      },
	      "1F3FC": {
	        "k": "woman_in_motorized_wheelchair-1F3FC",
	        "n": "woman_in_motorized_wheelchair",
	        "e": "👩🏼‍🦼"
	      },
	      "1F3FD": {
	        "k": "woman_in_motorized_wheelchair-1F3FD",
	        "n": "woman_in_motorized_wheelchair",
	        "e": "👩🏽‍🦼"
	      },
	      "1F3FE": {
	        "k": "woman_in_motorized_wheelchair-1F3FE",
	        "n": "woman_in_motorized_wheelchair",
	        "e": "👩🏾‍🦼"
	      },
	      "1F3FF": {
	        "k": "woman_in_motorized_wheelchair-1F3FF",
	        "n": "woman_in_motorized_wheelchair",
	        "e": "👩🏿‍🦼"
	      }
	    }
	  }, {
	    "n": ["person_in_manual_wheelchair"],
	    "e": "🧑‍🦽",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "person_in_manual_wheelchair-1F3FB",
	        "n": "person_in_manual_wheelchair",
	        "e": "🧑🏻‍🦽"
	      },
	      "1F3FC": {
	        "k": "person_in_manual_wheelchair-1F3FC",
	        "n": "person_in_manual_wheelchair",
	        "e": "🧑🏼‍🦽"
	      },
	      "1F3FD": {
	        "k": "person_in_manual_wheelchair-1F3FD",
	        "n": "person_in_manual_wheelchair",
	        "e": "🧑🏽‍🦽"
	      },
	      "1F3FE": {
	        "k": "person_in_manual_wheelchair-1F3FE",
	        "n": "person_in_manual_wheelchair",
	        "e": "🧑🏾‍🦽"
	      },
	      "1F3FF": {
	        "k": "person_in_manual_wheelchair-1F3FF",
	        "n": "person_in_manual_wheelchair",
	        "e": "🧑🏿‍🦽"
	      }
	    }
	  }, {
	    "n": ["man_in_manual_wheelchair"],
	    "e": "👨‍🦽",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_manual_wheelchair-1F3FB",
	        "n": "man_in_manual_wheelchair",
	        "e": "👨🏻‍🦽"
	      },
	      "1F3FC": {
	        "k": "man_in_manual_wheelchair-1F3FC",
	        "n": "man_in_manual_wheelchair",
	        "e": "👨🏼‍🦽"
	      },
	      "1F3FD": {
	        "k": "man_in_manual_wheelchair-1F3FD",
	        "n": "man_in_manual_wheelchair",
	        "e": "👨🏽‍🦽"
	      },
	      "1F3FE": {
	        "k": "man_in_manual_wheelchair-1F3FE",
	        "n": "man_in_manual_wheelchair",
	        "e": "👨🏾‍🦽"
	      },
	      "1F3FF": {
	        "k": "man_in_manual_wheelchair-1F3FF",
	        "n": "man_in_manual_wheelchair",
	        "e": "👨🏿‍🦽"
	      }
	    }
	  }, {
	    "n": ["woman_in_manual_wheelchair"],
	    "e": "👩‍🦽",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB": {
	        "k": "woman_in_manual_wheelchair-1F3FB",
	        "n": "woman_in_manual_wheelchair",
	        "e": "👩🏻‍🦽"
	      },
	      "1F3FC": {
	        "k": "woman_in_manual_wheelchair-1F3FC",
	        "n": "woman_in_manual_wheelchair",
	        "e": "👩🏼‍🦽"
	      },
	      "1F3FD": {
	        "k": "woman_in_manual_wheelchair-1F3FD",
	        "n": "woman_in_manual_wheelchair",
	        "e": "👩🏽‍🦽"
	      },
	      "1F3FE": {
	        "k": "woman_in_manual_wheelchair-1F3FE",
	        "n": "woman_in_manual_wheelchair",
	        "e": "👩🏾‍🦽"
	      },
	      "1F3FF": {
	        "k": "woman_in_manual_wheelchair-1F3FF",
	        "n": "woman_in_manual_wheelchair",
	        "e": "👩🏿‍🦽"
	      }
	    }
	  }, {
	    "n": ["runner", "running"],
	    "e": "🏃",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "runner-1F3FB",
	        "n": "runner",
	        "e": "🏃🏻"
	      },
	      "1F3FC": {
	        "k": "runner-1F3FC",
	        "n": "runner",
	        "e": "🏃🏼"
	      },
	      "1F3FD": {
	        "k": "runner-1F3FD",
	        "n": "runner",
	        "e": "🏃🏽"
	      },
	      "1F3FE": {
	        "k": "runner-1F3FE",
	        "n": "runner",
	        "e": "🏃🏾"
	      },
	      "1F3FF": {
	        "k": "runner-1F3FF",
	        "n": "runner",
	        "e": "🏃🏿"
	      }
	    }
	  }, {
	    "n": ["man-running"],
	    "e": "🏃‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-running-1F3FB",
	        "n": "man-running",
	        "e": "🏃🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-running-1F3FC",
	        "n": "man-running",
	        "e": "🏃🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-running-1F3FD",
	        "n": "man-running",
	        "e": "🏃🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-running-1F3FE",
	        "n": "man-running",
	        "e": "🏃🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-running-1F3FF",
	        "n": "man-running",
	        "e": "🏃🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-running"],
	    "e": "🏃‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-running-1F3FB",
	        "n": "woman-running",
	        "e": "🏃🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-running-1F3FC",
	        "n": "woman-running",
	        "e": "🏃🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-running-1F3FD",
	        "n": "woman-running",
	        "e": "🏃🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-running-1F3FE",
	        "n": "woman-running",
	        "e": "🏃🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-running-1F3FF",
	        "n": "woman-running",
	        "e": "🏃🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["dancer"],
	    "e": "💃",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "dancer-1F3FB",
	        "n": "dancer",
	        "e": "💃🏻"
	      },
	      "1F3FC": {
	        "k": "dancer-1F3FC",
	        "n": "dancer",
	        "e": "💃🏼"
	      },
	      "1F3FD": {
	        "k": "dancer-1F3FD",
	        "n": "dancer",
	        "e": "💃🏽"
	      },
	      "1F3FE": {
	        "k": "dancer-1F3FE",
	        "n": "dancer",
	        "e": "💃🏾"
	      },
	      "1F3FF": {
	        "k": "dancer-1F3FF",
	        "n": "dancer",
	        "e": "💃🏿"
	      }
	    }
	  }, {
	    "n": ["man_dancing"],
	    "e": "🕺",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_dancing-1F3FB",
	        "n": "man_dancing",
	        "e": "🕺🏻"
	      },
	      "1F3FC": {
	        "k": "man_dancing-1F3FC",
	        "n": "man_dancing",
	        "e": "🕺🏼"
	      },
	      "1F3FD": {
	        "k": "man_dancing-1F3FD",
	        "n": "man_dancing",
	        "e": "🕺🏽"
	      },
	      "1F3FE": {
	        "k": "man_dancing-1F3FE",
	        "n": "man_dancing",
	        "e": "🕺🏾"
	      },
	      "1F3FF": {
	        "k": "man_dancing-1F3FF",
	        "n": "man_dancing",
	        "e": "🕺🏿"
	      }
	    }
	  }, {
	    "n": ["man_in_business_suit_levitating"],
	    "e": "🕴️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_business_suit_levitating-1F3FB",
	        "n": "man_in_business_suit_levitating",
	        "e": "🕴🏻"
	      },
	      "1F3FC": {
	        "k": "man_in_business_suit_levitating-1F3FC",
	        "n": "man_in_business_suit_levitating",
	        "e": "🕴🏼"
	      },
	      "1F3FD": {
	        "k": "man_in_business_suit_levitating-1F3FD",
	        "n": "man_in_business_suit_levitating",
	        "e": "🕴🏽"
	      },
	      "1F3FE": {
	        "k": "man_in_business_suit_levitating-1F3FE",
	        "n": "man_in_business_suit_levitating",
	        "e": "🕴🏾"
	      },
	      "1F3FF": {
	        "k": "man_in_business_suit_levitating-1F3FF",
	        "n": "man_in_business_suit_levitating",
	        "e": "🕴🏿"
	      }
	    }
	  }, {
	    "n": ["dancers"],
	    "e": "👯",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-with-bunny-ears-partying"],
	    "e": "👯‍♂️",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-with-bunny-ears-partying"],
	    "e": "👯‍♀️",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["person_in_steamy_room"],
	    "e": "🧖",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_in_steamy_room-1F3FB",
	        "n": "person_in_steamy_room",
	        "e": "🧖🏻"
	      },
	      "1F3FC": {
	        "k": "person_in_steamy_room-1F3FC",
	        "n": "person_in_steamy_room",
	        "e": "🧖🏼"
	      },
	      "1F3FD": {
	        "k": "person_in_steamy_room-1F3FD",
	        "n": "person_in_steamy_room",
	        "e": "🧖🏽"
	      },
	      "1F3FE": {
	        "k": "person_in_steamy_room-1F3FE",
	        "n": "person_in_steamy_room",
	        "e": "🧖🏾"
	      },
	      "1F3FF": {
	        "k": "person_in_steamy_room-1F3FF",
	        "n": "person_in_steamy_room",
	        "e": "🧖🏿"
	      }
	    }
	  }, {
	    "n": ["man_in_steamy_room"],
	    "e": "🧖‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_steamy_room-1F3FB",
	        "n": "man_in_steamy_room",
	        "e": "🧖🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man_in_steamy_room-1F3FC",
	        "n": "man_in_steamy_room",
	        "e": "🧖🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man_in_steamy_room-1F3FD",
	        "n": "man_in_steamy_room",
	        "e": "🧖🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man_in_steamy_room-1F3FE",
	        "n": "man_in_steamy_room",
	        "e": "🧖🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man_in_steamy_room-1F3FF",
	        "n": "man_in_steamy_room",
	        "e": "🧖🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman_in_steamy_room"],
	    "e": "🧖‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman_in_steamy_room-1F3FB",
	        "n": "woman_in_steamy_room",
	        "e": "🧖🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman_in_steamy_room-1F3FC",
	        "n": "woman_in_steamy_room",
	        "e": "🧖🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman_in_steamy_room-1F3FD",
	        "n": "woman_in_steamy_room",
	        "e": "🧖🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman_in_steamy_room-1F3FE",
	        "n": "woman_in_steamy_room",
	        "e": "🧖🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman_in_steamy_room-1F3FF",
	        "n": "woman_in_steamy_room",
	        "e": "🧖🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["person_climbing"],
	    "e": "🧗",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_climbing-1F3FB",
	        "n": "person_climbing",
	        "e": "🧗🏻"
	      },
	      "1F3FC": {
	        "k": "person_climbing-1F3FC",
	        "n": "person_climbing",
	        "e": "🧗🏼"
	      },
	      "1F3FD": {
	        "k": "person_climbing-1F3FD",
	        "n": "person_climbing",
	        "e": "🧗🏽"
	      },
	      "1F3FE": {
	        "k": "person_climbing-1F3FE",
	        "n": "person_climbing",
	        "e": "🧗🏾"
	      },
	      "1F3FF": {
	        "k": "person_climbing-1F3FF",
	        "n": "person_climbing",
	        "e": "🧗🏿"
	      }
	    }
	  }, {
	    "n": ["man_climbing"],
	    "e": "🧗‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_climbing-1F3FB",
	        "n": "man_climbing",
	        "e": "🧗🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man_climbing-1F3FC",
	        "n": "man_climbing",
	        "e": "🧗🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man_climbing-1F3FD",
	        "n": "man_climbing",
	        "e": "🧗🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man_climbing-1F3FE",
	        "n": "man_climbing",
	        "e": "🧗🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man_climbing-1F3FF",
	        "n": "man_climbing",
	        "e": "🧗🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman_climbing"],
	    "e": "🧗‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman_climbing-1F3FB",
	        "n": "woman_climbing",
	        "e": "🧗🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman_climbing-1F3FC",
	        "n": "woman_climbing",
	        "e": "🧗🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman_climbing-1F3FD",
	        "n": "woman_climbing",
	        "e": "🧗🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman_climbing-1F3FE",
	        "n": "woman_climbing",
	        "e": "🧗🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman_climbing-1F3FF",
	        "n": "woman_climbing",
	        "e": "🧗🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["fencer"],
	    "e": "🤺",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["horse_racing"],
	    "e": "🏇",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "horse_racing-1F3FB",
	        "n": "horse_racing",
	        "e": "🏇🏻"
	      },
	      "1F3FC": {
	        "k": "horse_racing-1F3FC",
	        "n": "horse_racing",
	        "e": "🏇🏼"
	      },
	      "1F3FD": {
	        "k": "horse_racing-1F3FD",
	        "n": "horse_racing",
	        "e": "🏇🏽"
	      },
	      "1F3FE": {
	        "k": "horse_racing-1F3FE",
	        "n": "horse_racing",
	        "e": "🏇🏾"
	      },
	      "1F3FF": {
	        "k": "horse_racing-1F3FF",
	        "n": "horse_racing",
	        "e": "🏇🏿"
	      }
	    }
	  }, {
	    "n": ["skier"],
	    "e": "⛷️",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["snowboarder"],
	    "e": "🏂",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "snowboarder-1F3FB",
	        "n": "snowboarder",
	        "e": "🏂🏻"
	      },
	      "1F3FC": {
	        "k": "snowboarder-1F3FC",
	        "n": "snowboarder",
	        "e": "🏂🏼"
	      },
	      "1F3FD": {
	        "k": "snowboarder-1F3FD",
	        "n": "snowboarder",
	        "e": "🏂🏽"
	      },
	      "1F3FE": {
	        "k": "snowboarder-1F3FE",
	        "n": "snowboarder",
	        "e": "🏂🏾"
	      },
	      "1F3FF": {
	        "k": "snowboarder-1F3FF",
	        "n": "snowboarder",
	        "e": "🏂🏿"
	      }
	    }
	  }, {
	    "n": ["golfer"],
	    "e": "🏌️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "golfer-1F3FB",
	        "n": "golfer",
	        "e": "🏌🏻"
	      },
	      "1F3FC": {
	        "k": "golfer-1F3FC",
	        "n": "golfer",
	        "e": "🏌🏼"
	      },
	      "1F3FD": {
	        "k": "golfer-1F3FD",
	        "n": "golfer",
	        "e": "🏌🏽"
	      },
	      "1F3FE": {
	        "k": "golfer-1F3FE",
	        "n": "golfer",
	        "e": "🏌🏾"
	      },
	      "1F3FF": {
	        "k": "golfer-1F3FF",
	        "n": "golfer",
	        "e": "🏌🏿"
	      }
	    }
	  }, {
	    "n": ["man-golfing"],
	    "e": "🏌️‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-golfing-1F3FB",
	        "n": "man-golfing",
	        "e": "🏌🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-golfing-1F3FC",
	        "n": "man-golfing",
	        "e": "🏌🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-golfing-1F3FD",
	        "n": "man-golfing",
	        "e": "🏌🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-golfing-1F3FE",
	        "n": "man-golfing",
	        "e": "🏌🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-golfing-1F3FF",
	        "n": "man-golfing",
	        "e": "🏌🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-golfing"],
	    "e": "🏌️‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-golfing-1F3FB",
	        "n": "woman-golfing",
	        "e": "🏌🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-golfing-1F3FC",
	        "n": "woman-golfing",
	        "e": "🏌🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-golfing-1F3FD",
	        "n": "woman-golfing",
	        "e": "🏌🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-golfing-1F3FE",
	        "n": "woman-golfing",
	        "e": "🏌🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-golfing-1F3FF",
	        "n": "woman-golfing",
	        "e": "🏌🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["surfer"],
	    "e": "🏄",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "surfer-1F3FB",
	        "n": "surfer",
	        "e": "🏄🏻"
	      },
	      "1F3FC": {
	        "k": "surfer-1F3FC",
	        "n": "surfer",
	        "e": "🏄🏼"
	      },
	      "1F3FD": {
	        "k": "surfer-1F3FD",
	        "n": "surfer",
	        "e": "🏄🏽"
	      },
	      "1F3FE": {
	        "k": "surfer-1F3FE",
	        "n": "surfer",
	        "e": "🏄🏾"
	      },
	      "1F3FF": {
	        "k": "surfer-1F3FF",
	        "n": "surfer",
	        "e": "🏄🏿"
	      }
	    }
	  }, {
	    "n": ["man-surfing"],
	    "e": "🏄‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-surfing-1F3FB",
	        "n": "man-surfing",
	        "e": "🏄🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-surfing-1F3FC",
	        "n": "man-surfing",
	        "e": "🏄🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-surfing-1F3FD",
	        "n": "man-surfing",
	        "e": "🏄🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-surfing-1F3FE",
	        "n": "man-surfing",
	        "e": "🏄🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-surfing-1F3FF",
	        "n": "man-surfing",
	        "e": "🏄🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-surfing"],
	    "e": "🏄‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-surfing-1F3FB",
	        "n": "woman-surfing",
	        "e": "🏄🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-surfing-1F3FC",
	        "n": "woman-surfing",
	        "e": "🏄🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-surfing-1F3FD",
	        "n": "woman-surfing",
	        "e": "🏄🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-surfing-1F3FE",
	        "n": "woman-surfing",
	        "e": "🏄🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-surfing-1F3FF",
	        "n": "woman-surfing",
	        "e": "🏄🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["rowboat"],
	    "e": "🚣",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "rowboat-1F3FB",
	        "n": "rowboat",
	        "e": "🚣🏻"
	      },
	      "1F3FC": {
	        "k": "rowboat-1F3FC",
	        "n": "rowboat",
	        "e": "🚣🏼"
	      },
	      "1F3FD": {
	        "k": "rowboat-1F3FD",
	        "n": "rowboat",
	        "e": "🚣🏽"
	      },
	      "1F3FE": {
	        "k": "rowboat-1F3FE",
	        "n": "rowboat",
	        "e": "🚣🏾"
	      },
	      "1F3FF": {
	        "k": "rowboat-1F3FF",
	        "n": "rowboat",
	        "e": "🚣🏿"
	      }
	    }
	  }, {
	    "n": ["man-rowing-boat"],
	    "e": "🚣‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-rowing-boat-1F3FB",
	        "n": "man-rowing-boat",
	        "e": "🚣🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-rowing-boat-1F3FC",
	        "n": "man-rowing-boat",
	        "e": "🚣🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-rowing-boat-1F3FD",
	        "n": "man-rowing-boat",
	        "e": "🚣🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-rowing-boat-1F3FE",
	        "n": "man-rowing-boat",
	        "e": "🚣🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-rowing-boat-1F3FF",
	        "n": "man-rowing-boat",
	        "e": "🚣🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-rowing-boat"],
	    "e": "🚣‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-rowing-boat-1F3FB",
	        "n": "woman-rowing-boat",
	        "e": "🚣🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-rowing-boat-1F3FC",
	        "n": "woman-rowing-boat",
	        "e": "🚣🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-rowing-boat-1F3FD",
	        "n": "woman-rowing-boat",
	        "e": "🚣🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-rowing-boat-1F3FE",
	        "n": "woman-rowing-boat",
	        "e": "🚣🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-rowing-boat-1F3FF",
	        "n": "woman-rowing-boat",
	        "e": "🚣🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["swimmer"],
	    "e": "🏊",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "swimmer-1F3FB",
	        "n": "swimmer",
	        "e": "🏊🏻"
	      },
	      "1F3FC": {
	        "k": "swimmer-1F3FC",
	        "n": "swimmer",
	        "e": "🏊🏼"
	      },
	      "1F3FD": {
	        "k": "swimmer-1F3FD",
	        "n": "swimmer",
	        "e": "🏊🏽"
	      },
	      "1F3FE": {
	        "k": "swimmer-1F3FE",
	        "n": "swimmer",
	        "e": "🏊🏾"
	      },
	      "1F3FF": {
	        "k": "swimmer-1F3FF",
	        "n": "swimmer",
	        "e": "🏊🏿"
	      }
	    }
	  }, {
	    "n": ["man-swimming"],
	    "e": "🏊‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-swimming-1F3FB",
	        "n": "man-swimming",
	        "e": "🏊🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-swimming-1F3FC",
	        "n": "man-swimming",
	        "e": "🏊🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-swimming-1F3FD",
	        "n": "man-swimming",
	        "e": "🏊🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-swimming-1F3FE",
	        "n": "man-swimming",
	        "e": "🏊🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-swimming-1F3FF",
	        "n": "man-swimming",
	        "e": "🏊🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-swimming"],
	    "e": "🏊‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-swimming-1F3FB",
	        "n": "woman-swimming",
	        "e": "🏊🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-swimming-1F3FC",
	        "n": "woman-swimming",
	        "e": "🏊🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-swimming-1F3FD",
	        "n": "woman-swimming",
	        "e": "🏊🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-swimming-1F3FE",
	        "n": "woman-swimming",
	        "e": "🏊🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-swimming-1F3FF",
	        "n": "woman-swimming",
	        "e": "🏊🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["person_with_ball"],
	    "e": "⛹️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_with_ball-1F3FB",
	        "n": "person_with_ball",
	        "e": "⛹🏻"
	      },
	      "1F3FC": {
	        "k": "person_with_ball-1F3FC",
	        "n": "person_with_ball",
	        "e": "⛹🏼"
	      },
	      "1F3FD": {
	        "k": "person_with_ball-1F3FD",
	        "n": "person_with_ball",
	        "e": "⛹🏽"
	      },
	      "1F3FE": {
	        "k": "person_with_ball-1F3FE",
	        "n": "person_with_ball",
	        "e": "⛹🏾"
	      },
	      "1F3FF": {
	        "k": "person_with_ball-1F3FF",
	        "n": "person_with_ball",
	        "e": "⛹🏿"
	      }
	    }
	  }, {
	    "n": ["man-bouncing-ball"],
	    "e": "⛹️‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-bouncing-ball-1F3FB",
	        "n": "man-bouncing-ball",
	        "e": "⛹🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-bouncing-ball-1F3FC",
	        "n": "man-bouncing-ball",
	        "e": "⛹🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-bouncing-ball-1F3FD",
	        "n": "man-bouncing-ball",
	        "e": "⛹🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-bouncing-ball-1F3FE",
	        "n": "man-bouncing-ball",
	        "e": "⛹🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-bouncing-ball-1F3FF",
	        "n": "man-bouncing-ball",
	        "e": "⛹🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-bouncing-ball"],
	    "e": "⛹️‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-bouncing-ball-1F3FB",
	        "n": "woman-bouncing-ball",
	        "e": "⛹🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-bouncing-ball-1F3FC",
	        "n": "woman-bouncing-ball",
	        "e": "⛹🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-bouncing-ball-1F3FD",
	        "n": "woman-bouncing-ball",
	        "e": "⛹🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-bouncing-ball-1F3FE",
	        "n": "woman-bouncing-ball",
	        "e": "⛹🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-bouncing-ball-1F3FF",
	        "n": "woman-bouncing-ball",
	        "e": "⛹🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["weight_lifter"],
	    "e": "🏋️",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "weight_lifter-1F3FB",
	        "n": "weight_lifter",
	        "e": "🏋🏻"
	      },
	      "1F3FC": {
	        "k": "weight_lifter-1F3FC",
	        "n": "weight_lifter",
	        "e": "🏋🏼"
	      },
	      "1F3FD": {
	        "k": "weight_lifter-1F3FD",
	        "n": "weight_lifter",
	        "e": "🏋🏽"
	      },
	      "1F3FE": {
	        "k": "weight_lifter-1F3FE",
	        "n": "weight_lifter",
	        "e": "🏋🏾"
	      },
	      "1F3FF": {
	        "k": "weight_lifter-1F3FF",
	        "n": "weight_lifter",
	        "e": "🏋🏿"
	      }
	    }
	  }, {
	    "n": ["man-lifting-weights"],
	    "e": "🏋️‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-lifting-weights-1F3FB",
	        "n": "man-lifting-weights",
	        "e": "🏋🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-lifting-weights-1F3FC",
	        "n": "man-lifting-weights",
	        "e": "🏋🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-lifting-weights-1F3FD",
	        "n": "man-lifting-weights",
	        "e": "🏋🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-lifting-weights-1F3FE",
	        "n": "man-lifting-weights",
	        "e": "🏋🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-lifting-weights-1F3FF",
	        "n": "man-lifting-weights",
	        "e": "🏋🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-lifting-weights"],
	    "e": "🏋️‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-lifting-weights-1F3FB",
	        "n": "woman-lifting-weights",
	        "e": "🏋🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-lifting-weights-1F3FC",
	        "n": "woman-lifting-weights",
	        "e": "🏋🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-lifting-weights-1F3FD",
	        "n": "woman-lifting-weights",
	        "e": "🏋🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-lifting-weights-1F3FE",
	        "n": "woman-lifting-weights",
	        "e": "🏋🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-lifting-weights-1F3FF",
	        "n": "woman-lifting-weights",
	        "e": "🏋🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["bicyclist"],
	    "e": "🚴",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "bicyclist-1F3FB",
	        "n": "bicyclist",
	        "e": "🚴🏻"
	      },
	      "1F3FC": {
	        "k": "bicyclist-1F3FC",
	        "n": "bicyclist",
	        "e": "🚴🏼"
	      },
	      "1F3FD": {
	        "k": "bicyclist-1F3FD",
	        "n": "bicyclist",
	        "e": "🚴🏽"
	      },
	      "1F3FE": {
	        "k": "bicyclist-1F3FE",
	        "n": "bicyclist",
	        "e": "🚴🏾"
	      },
	      "1F3FF": {
	        "k": "bicyclist-1F3FF",
	        "n": "bicyclist",
	        "e": "🚴🏿"
	      }
	    }
	  }, {
	    "n": ["man-biking"],
	    "e": "🚴‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-biking-1F3FB",
	        "n": "man-biking",
	        "e": "🚴🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-biking-1F3FC",
	        "n": "man-biking",
	        "e": "🚴🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-biking-1F3FD",
	        "n": "man-biking",
	        "e": "🚴🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-biking-1F3FE",
	        "n": "man-biking",
	        "e": "🚴🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-biking-1F3FF",
	        "n": "man-biking",
	        "e": "🚴🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-biking"],
	    "e": "🚴‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-biking-1F3FB",
	        "n": "woman-biking",
	        "e": "🚴🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-biking-1F3FC",
	        "n": "woman-biking",
	        "e": "🚴🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-biking-1F3FD",
	        "n": "woman-biking",
	        "e": "🚴🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-biking-1F3FE",
	        "n": "woman-biking",
	        "e": "🚴🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-biking-1F3FF",
	        "n": "woman-biking",
	        "e": "🚴🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["mountain_bicyclist"],
	    "e": "🚵",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "mountain_bicyclist-1F3FB",
	        "n": "mountain_bicyclist",
	        "e": "🚵🏻"
	      },
	      "1F3FC": {
	        "k": "mountain_bicyclist-1F3FC",
	        "n": "mountain_bicyclist",
	        "e": "🚵🏼"
	      },
	      "1F3FD": {
	        "k": "mountain_bicyclist-1F3FD",
	        "n": "mountain_bicyclist",
	        "e": "🚵🏽"
	      },
	      "1F3FE": {
	        "k": "mountain_bicyclist-1F3FE",
	        "n": "mountain_bicyclist",
	        "e": "🚵🏾"
	      },
	      "1F3FF": {
	        "k": "mountain_bicyclist-1F3FF",
	        "n": "mountain_bicyclist",
	        "e": "🚵🏿"
	      }
	    }
	  }, {
	    "n": ["man-mountain-biking"],
	    "e": "🚵‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-mountain-biking-1F3FB",
	        "n": "man-mountain-biking",
	        "e": "🚵🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-mountain-biking-1F3FC",
	        "n": "man-mountain-biking",
	        "e": "🚵🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-mountain-biking-1F3FD",
	        "n": "man-mountain-biking",
	        "e": "🚵🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-mountain-biking-1F3FE",
	        "n": "man-mountain-biking",
	        "e": "🚵🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-mountain-biking-1F3FF",
	        "n": "man-mountain-biking",
	        "e": "🚵🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-mountain-biking"],
	    "e": "🚵‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-mountain-biking-1F3FB",
	        "n": "woman-mountain-biking",
	        "e": "🚵🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-mountain-biking-1F3FC",
	        "n": "woman-mountain-biking",
	        "e": "🚵🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-mountain-biking-1F3FD",
	        "n": "woman-mountain-biking",
	        "e": "🚵🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-mountain-biking-1F3FE",
	        "n": "woman-mountain-biking",
	        "e": "🚵🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-mountain-biking-1F3FF",
	        "n": "woman-mountain-biking",
	        "e": "🚵🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["person_doing_cartwheel"],
	    "e": "🤸",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_doing_cartwheel-1F3FB",
	        "n": "person_doing_cartwheel",
	        "e": "🤸🏻"
	      },
	      "1F3FC": {
	        "k": "person_doing_cartwheel-1F3FC",
	        "n": "person_doing_cartwheel",
	        "e": "🤸🏼"
	      },
	      "1F3FD": {
	        "k": "person_doing_cartwheel-1F3FD",
	        "n": "person_doing_cartwheel",
	        "e": "🤸🏽"
	      },
	      "1F3FE": {
	        "k": "person_doing_cartwheel-1F3FE",
	        "n": "person_doing_cartwheel",
	        "e": "🤸🏾"
	      },
	      "1F3FF": {
	        "k": "person_doing_cartwheel-1F3FF",
	        "n": "person_doing_cartwheel",
	        "e": "🤸🏿"
	      }
	    }
	  }, {
	    "n": ["man-cartwheeling"],
	    "e": "🤸‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-cartwheeling-1F3FB",
	        "n": "man-cartwheeling",
	        "e": "🤸🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-cartwheeling-1F3FC",
	        "n": "man-cartwheeling",
	        "e": "🤸🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-cartwheeling-1F3FD",
	        "n": "man-cartwheeling",
	        "e": "🤸🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-cartwheeling-1F3FE",
	        "n": "man-cartwheeling",
	        "e": "🤸🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-cartwheeling-1F3FF",
	        "n": "man-cartwheeling",
	        "e": "🤸🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-cartwheeling"],
	    "e": "🤸‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-cartwheeling-1F3FB",
	        "n": "woman-cartwheeling",
	        "e": "🤸🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-cartwheeling-1F3FC",
	        "n": "woman-cartwheeling",
	        "e": "🤸🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-cartwheeling-1F3FD",
	        "n": "woman-cartwheeling",
	        "e": "🤸🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-cartwheeling-1F3FE",
	        "n": "woman-cartwheeling",
	        "e": "🤸🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-cartwheeling-1F3FF",
	        "n": "woman-cartwheeling",
	        "e": "🤸🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["wrestlers"],
	    "e": "🤼",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["man-wrestling"],
	    "e": "🤼‍♂️",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-wrestling"],
	    "e": "🤼‍♀️",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["water_polo"],
	    "e": "🤽",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "water_polo-1F3FB",
	        "n": "water_polo",
	        "e": "🤽🏻"
	      },
	      "1F3FC": {
	        "k": "water_polo-1F3FC",
	        "n": "water_polo",
	        "e": "🤽🏼"
	      },
	      "1F3FD": {
	        "k": "water_polo-1F3FD",
	        "n": "water_polo",
	        "e": "🤽🏽"
	      },
	      "1F3FE": {
	        "k": "water_polo-1F3FE",
	        "n": "water_polo",
	        "e": "🤽🏾"
	      },
	      "1F3FF": {
	        "k": "water_polo-1F3FF",
	        "n": "water_polo",
	        "e": "🤽🏿"
	      }
	    }
	  }, {
	    "n": ["man-playing-water-polo"],
	    "e": "🤽‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-playing-water-polo-1F3FB",
	        "n": "man-playing-water-polo",
	        "e": "🤽🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-playing-water-polo-1F3FC",
	        "n": "man-playing-water-polo",
	        "e": "🤽🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-playing-water-polo-1F3FD",
	        "n": "man-playing-water-polo",
	        "e": "🤽🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-playing-water-polo-1F3FE",
	        "n": "man-playing-water-polo",
	        "e": "🤽🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-playing-water-polo-1F3FF",
	        "n": "man-playing-water-polo",
	        "e": "🤽🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-playing-water-polo"],
	    "e": "🤽‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-playing-water-polo-1F3FB",
	        "n": "woman-playing-water-polo",
	        "e": "🤽🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-playing-water-polo-1F3FC",
	        "n": "woman-playing-water-polo",
	        "e": "🤽🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-playing-water-polo-1F3FD",
	        "n": "woman-playing-water-polo",
	        "e": "🤽🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-playing-water-polo-1F3FE",
	        "n": "woman-playing-water-polo",
	        "e": "🤽🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-playing-water-polo-1F3FF",
	        "n": "woman-playing-water-polo",
	        "e": "🤽🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["handball"],
	    "e": "🤾",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "handball-1F3FB",
	        "n": "handball",
	        "e": "🤾🏻"
	      },
	      "1F3FC": {
	        "k": "handball-1F3FC",
	        "n": "handball",
	        "e": "🤾🏼"
	      },
	      "1F3FD": {
	        "k": "handball-1F3FD",
	        "n": "handball",
	        "e": "🤾🏽"
	      },
	      "1F3FE": {
	        "k": "handball-1F3FE",
	        "n": "handball",
	        "e": "🤾🏾"
	      },
	      "1F3FF": {
	        "k": "handball-1F3FF",
	        "n": "handball",
	        "e": "🤾🏿"
	      }
	    }
	  }, {
	    "n": ["man-playing-handball"],
	    "e": "🤾‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-playing-handball-1F3FB",
	        "n": "man-playing-handball",
	        "e": "🤾🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-playing-handball-1F3FC",
	        "n": "man-playing-handball",
	        "e": "🤾🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-playing-handball-1F3FD",
	        "n": "man-playing-handball",
	        "e": "🤾🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-playing-handball-1F3FE",
	        "n": "man-playing-handball",
	        "e": "🤾🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-playing-handball-1F3FF",
	        "n": "man-playing-handball",
	        "e": "🤾🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-playing-handball"],
	    "e": "🤾‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-playing-handball-1F3FB",
	        "n": "woman-playing-handball",
	        "e": "🤾🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-playing-handball-1F3FC",
	        "n": "woman-playing-handball",
	        "e": "🤾🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-playing-handball-1F3FD",
	        "n": "woman-playing-handball",
	        "e": "🤾🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-playing-handball-1F3FE",
	        "n": "woman-playing-handball",
	        "e": "🤾🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-playing-handball-1F3FF",
	        "n": "woman-playing-handball",
	        "e": "🤾🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["juggling"],
	    "e": "🤹",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "juggling-1F3FB",
	        "n": "juggling",
	        "e": "🤹🏻"
	      },
	      "1F3FC": {
	        "k": "juggling-1F3FC",
	        "n": "juggling",
	        "e": "🤹🏼"
	      },
	      "1F3FD": {
	        "k": "juggling-1F3FD",
	        "n": "juggling",
	        "e": "🤹🏽"
	      },
	      "1F3FE": {
	        "k": "juggling-1F3FE",
	        "n": "juggling",
	        "e": "🤹🏾"
	      },
	      "1F3FF": {
	        "k": "juggling-1F3FF",
	        "n": "juggling",
	        "e": "🤹🏿"
	      }
	    }
	  }, {
	    "n": ["man-juggling"],
	    "e": "🤹‍♂️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "man-juggling-1F3FB",
	        "n": "man-juggling",
	        "e": "🤹🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man-juggling-1F3FC",
	        "n": "man-juggling",
	        "e": "🤹🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man-juggling-1F3FD",
	        "n": "man-juggling",
	        "e": "🤹🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man-juggling-1F3FE",
	        "n": "man-juggling",
	        "e": "🤹🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man-juggling-1F3FF",
	        "n": "man-juggling",
	        "e": "🤹🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman-juggling"],
	    "e": "🤹‍♀️",
	    "c": 9,
	    "ver": "4.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman-juggling-1F3FB",
	        "n": "woman-juggling",
	        "e": "🤹🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman-juggling-1F3FC",
	        "n": "woman-juggling",
	        "e": "🤹🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman-juggling-1F3FD",
	        "n": "woman-juggling",
	        "e": "🤹🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman-juggling-1F3FE",
	        "n": "woman-juggling",
	        "e": "🤹🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman-juggling-1F3FF",
	        "n": "woman-juggling",
	        "e": "🤹🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["person_in_lotus_position"],
	    "e": "🧘",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "person_in_lotus_position-1F3FB",
	        "n": "person_in_lotus_position",
	        "e": "🧘🏻"
	      },
	      "1F3FC": {
	        "k": "person_in_lotus_position-1F3FC",
	        "n": "person_in_lotus_position",
	        "e": "🧘🏼"
	      },
	      "1F3FD": {
	        "k": "person_in_lotus_position-1F3FD",
	        "n": "person_in_lotus_position",
	        "e": "🧘🏽"
	      },
	      "1F3FE": {
	        "k": "person_in_lotus_position-1F3FE",
	        "n": "person_in_lotus_position",
	        "e": "🧘🏾"
	      },
	      "1F3FF": {
	        "k": "person_in_lotus_position-1F3FF",
	        "n": "person_in_lotus_position",
	        "e": "🧘🏿"
	      }
	    }
	  }, {
	    "n": ["man_in_lotus_position"],
	    "e": "🧘‍♂️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "man_in_lotus_position-1F3FB",
	        "n": "man_in_lotus_position",
	        "e": "🧘🏻‍♂️"
	      },
	      "1F3FC": {
	        "k": "man_in_lotus_position-1F3FC",
	        "n": "man_in_lotus_position",
	        "e": "🧘🏼‍♂️"
	      },
	      "1F3FD": {
	        "k": "man_in_lotus_position-1F3FD",
	        "n": "man_in_lotus_position",
	        "e": "🧘🏽‍♂️"
	      },
	      "1F3FE": {
	        "k": "man_in_lotus_position-1F3FE",
	        "n": "man_in_lotus_position",
	        "e": "🧘🏾‍♂️"
	      },
	      "1F3FF": {
	        "k": "man_in_lotus_position-1F3FF",
	        "n": "man_in_lotus_position",
	        "e": "🧘🏿‍♂️"
	      }
	    }
	  }, {
	    "n": ["woman_in_lotus_position"],
	    "e": "🧘‍♀️",
	    "c": 9,
	    "ver": "5.0",
	    "v": {
	      "1F3FB": {
	        "k": "woman_in_lotus_position-1F3FB",
	        "n": "woman_in_lotus_position",
	        "e": "🧘🏻‍♀️"
	      },
	      "1F3FC": {
	        "k": "woman_in_lotus_position-1F3FC",
	        "n": "woman_in_lotus_position",
	        "e": "🧘🏼‍♀️"
	      },
	      "1F3FD": {
	        "k": "woman_in_lotus_position-1F3FD",
	        "n": "woman_in_lotus_position",
	        "e": "🧘🏽‍♀️"
	      },
	      "1F3FE": {
	        "k": "woman_in_lotus_position-1F3FE",
	        "n": "woman_in_lotus_position",
	        "e": "🧘🏾‍♀️"
	      },
	      "1F3FF": {
	        "k": "woman_in_lotus_position-1F3FF",
	        "n": "woman_in_lotus_position",
	        "e": "🧘🏿‍♀️"
	      }
	    }
	  }, {
	    "n": ["bath"],
	    "e": "🛀",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "bath-1F3FB",
	        "n": "bath",
	        "e": "🛀🏻"
	      },
	      "1F3FC": {
	        "k": "bath-1F3FC",
	        "n": "bath",
	        "e": "🛀🏼"
	      },
	      "1F3FD": {
	        "k": "bath-1F3FD",
	        "n": "bath",
	        "e": "🛀🏽"
	      },
	      "1F3FE": {
	        "k": "bath-1F3FE",
	        "n": "bath",
	        "e": "🛀🏾"
	      },
	      "1F3FF": {
	        "k": "bath-1F3FF",
	        "n": "bath",
	        "e": "🛀🏿"
	      }
	    }
	  }, {
	    "n": ["sleeping_accommodation"],
	    "e": "🛌",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "sleeping_accommodation-1F3FB",
	        "n": "sleeping_accommodation",
	        "e": "🛌🏻"
	      },
	      "1F3FC": {
	        "k": "sleeping_accommodation-1F3FC",
	        "n": "sleeping_accommodation",
	        "e": "🛌🏼"
	      },
	      "1F3FD": {
	        "k": "sleeping_accommodation-1F3FD",
	        "n": "sleeping_accommodation",
	        "e": "🛌🏽"
	      },
	      "1F3FE": {
	        "k": "sleeping_accommodation-1F3FE",
	        "n": "sleeping_accommodation",
	        "e": "🛌🏾"
	      },
	      "1F3FF": {
	        "k": "sleeping_accommodation-1F3FF",
	        "n": "sleeping_accommodation",
	        "e": "🛌🏿"
	      }
	    }
	  }, {
	    "n": ["people_holding_hands"],
	    "e": "🧑‍🤝‍🧑",
	    "c": 9,
	    "ver": "12.1",
	    "v": {
	      "1F3FB-1F3FB": {
	        "k": "people_holding_hands-1F3FB-1F3FB",
	        "n": "people_holding_hands",
	        "e": "🧑🏻‍🤝‍🧑🏻"
	      },
	      "1F3FB-1F3FC": {
	        "k": "people_holding_hands-1F3FB-1F3FC",
	        "n": "people_holding_hands",
	        "e": "🧑🏻‍🤝‍🧑🏼"
	      },
	      "1F3FB-1F3FD": {
	        "k": "people_holding_hands-1F3FB-1F3FD",
	        "n": "people_holding_hands",
	        "e": "🧑🏻‍🤝‍🧑🏽"
	      },
	      "1F3FB-1F3FE": {
	        "k": "people_holding_hands-1F3FB-1F3FE",
	        "n": "people_holding_hands",
	        "e": "🧑🏻‍🤝‍🧑🏾"
	      },
	      "1F3FB-1F3FF": {
	        "k": "people_holding_hands-1F3FB-1F3FF",
	        "n": "people_holding_hands",
	        "e": "🧑🏻‍🤝‍🧑🏿"
	      },
	      "1F3FC-1F3FB": {
	        "k": "people_holding_hands-1F3FC-1F3FB",
	        "n": "people_holding_hands",
	        "e": "🧑🏼‍🤝‍🧑🏻"
	      },
	      "1F3FC-1F3FC": {
	        "k": "people_holding_hands-1F3FC-1F3FC",
	        "n": "people_holding_hands",
	        "e": "🧑🏼‍🤝‍🧑🏼"
	      },
	      "1F3FC-1F3FD": {
	        "k": "people_holding_hands-1F3FC-1F3FD",
	        "n": "people_holding_hands",
	        "e": "🧑🏼‍🤝‍🧑🏽"
	      },
	      "1F3FC-1F3FE": {
	        "k": "people_holding_hands-1F3FC-1F3FE",
	        "n": "people_holding_hands",
	        "e": "🧑🏼‍🤝‍🧑🏾"
	      },
	      "1F3FC-1F3FF": {
	        "k": "people_holding_hands-1F3FC-1F3FF",
	        "n": "people_holding_hands",
	        "e": "🧑🏼‍🤝‍🧑🏿"
	      },
	      "1F3FD-1F3FB": {
	        "k": "people_holding_hands-1F3FD-1F3FB",
	        "n": "people_holding_hands",
	        "e": "🧑🏽‍🤝‍🧑🏻"
	      },
	      "1F3FD-1F3FC": {
	        "k": "people_holding_hands-1F3FD-1F3FC",
	        "n": "people_holding_hands",
	        "e": "🧑🏽‍🤝‍🧑🏼"
	      },
	      "1F3FD-1F3FD": {
	        "k": "people_holding_hands-1F3FD-1F3FD",
	        "n": "people_holding_hands",
	        "e": "🧑🏽‍🤝‍🧑🏽"
	      },
	      "1F3FD-1F3FE": {
	        "k": "people_holding_hands-1F3FD-1F3FE",
	        "n": "people_holding_hands",
	        "e": "🧑🏽‍🤝‍🧑🏾"
	      },
	      "1F3FD-1F3FF": {
	        "k": "people_holding_hands-1F3FD-1F3FF",
	        "n": "people_holding_hands",
	        "e": "🧑🏽‍🤝‍🧑🏿"
	      },
	      "1F3FE-1F3FB": {
	        "k": "people_holding_hands-1F3FE-1F3FB",
	        "n": "people_holding_hands",
	        "e": "🧑🏾‍🤝‍🧑🏻"
	      },
	      "1F3FE-1F3FC": {
	        "k": "people_holding_hands-1F3FE-1F3FC",
	        "n": "people_holding_hands",
	        "e": "🧑🏾‍🤝‍🧑🏼"
	      },
	      "1F3FE-1F3FD": {
	        "k": "people_holding_hands-1F3FE-1F3FD",
	        "n": "people_holding_hands",
	        "e": "🧑🏾‍🤝‍🧑🏽"
	      },
	      "1F3FE-1F3FE": {
	        "k": "people_holding_hands-1F3FE-1F3FE",
	        "n": "people_holding_hands",
	        "e": "🧑🏾‍🤝‍🧑🏾"
	      },
	      "1F3FE-1F3FF": {
	        "k": "people_holding_hands-1F3FE-1F3FF",
	        "n": "people_holding_hands",
	        "e": "🧑🏾‍🤝‍🧑🏿"
	      },
	      "1F3FF-1F3FB": {
	        "k": "people_holding_hands-1F3FF-1F3FB",
	        "n": "people_holding_hands",
	        "e": "🧑🏿‍🤝‍🧑🏻"
	      },
	      "1F3FF-1F3FC": {
	        "k": "people_holding_hands-1F3FF-1F3FC",
	        "n": "people_holding_hands",
	        "e": "🧑🏿‍🤝‍🧑🏼"
	      },
	      "1F3FF-1F3FD": {
	        "k": "people_holding_hands-1F3FF-1F3FD",
	        "n": "people_holding_hands",
	        "e": "🧑🏿‍🤝‍🧑🏽"
	      },
	      "1F3FF-1F3FE": {
	        "k": "people_holding_hands-1F3FF-1F3FE",
	        "n": "people_holding_hands",
	        "e": "🧑🏿‍🤝‍🧑🏾"
	      },
	      "1F3FF-1F3FF": {
	        "k": "people_holding_hands-1F3FF-1F3FF",
	        "n": "people_holding_hands",
	        "e": "🧑🏿‍🤝‍🧑🏿"
	      }
	    }
	  }, {
	    "n": ["two_women_holding_hands", "women_holding_hands"],
	    "e": "👭",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "two_women_holding_hands-1F3FB",
	        "n": "two_women_holding_hands",
	        "e": "👭🏻"
	      },
	      "1F3FC": {
	        "k": "two_women_holding_hands-1F3FC",
	        "n": "two_women_holding_hands",
	        "e": "👭🏼"
	      },
	      "1F3FD": {
	        "k": "two_women_holding_hands-1F3FD",
	        "n": "two_women_holding_hands",
	        "e": "👭🏽"
	      },
	      "1F3FE": {
	        "k": "two_women_holding_hands-1F3FE",
	        "n": "two_women_holding_hands",
	        "e": "👭🏾"
	      },
	      "1F3FF": {
	        "k": "two_women_holding_hands-1F3FF",
	        "n": "two_women_holding_hands",
	        "e": "👭🏿"
	      },
	      "1F3FB-1F3FC": {
	        "k": "two_women_holding_hands-1F3FB-1F3FC",
	        "n": "two_women_holding_hands",
	        "e": "👩🏻‍🤝‍👩🏼"
	      },
	      "1F3FB-1F3FD": {
	        "k": "two_women_holding_hands-1F3FB-1F3FD",
	        "n": "two_women_holding_hands",
	        "e": "👩🏻‍🤝‍👩🏽"
	      },
	      "1F3FB-1F3FE": {
	        "k": "two_women_holding_hands-1F3FB-1F3FE",
	        "n": "two_women_holding_hands",
	        "e": "👩🏻‍🤝‍👩🏾"
	      },
	      "1F3FB-1F3FF": {
	        "k": "two_women_holding_hands-1F3FB-1F3FF",
	        "n": "two_women_holding_hands",
	        "e": "👩🏻‍🤝‍👩🏿"
	      },
	      "1F3FC-1F3FB": {
	        "k": "two_women_holding_hands-1F3FC-1F3FB",
	        "n": "two_women_holding_hands",
	        "e": "👩🏼‍🤝‍👩🏻"
	      },
	      "1F3FC-1F3FD": {
	        "k": "two_women_holding_hands-1F3FC-1F3FD",
	        "n": "two_women_holding_hands",
	        "e": "👩🏼‍🤝‍👩🏽"
	      },
	      "1F3FC-1F3FE": {
	        "k": "two_women_holding_hands-1F3FC-1F3FE",
	        "n": "two_women_holding_hands",
	        "e": "👩🏼‍🤝‍👩🏾"
	      },
	      "1F3FC-1F3FF": {
	        "k": "two_women_holding_hands-1F3FC-1F3FF",
	        "n": "two_women_holding_hands",
	        "e": "👩🏼‍🤝‍👩🏿"
	      },
	      "1F3FD-1F3FB": {
	        "k": "two_women_holding_hands-1F3FD-1F3FB",
	        "n": "two_women_holding_hands",
	        "e": "👩🏽‍🤝‍👩🏻"
	      },
	      "1F3FD-1F3FC": {
	        "k": "two_women_holding_hands-1F3FD-1F3FC",
	        "n": "two_women_holding_hands",
	        "e": "👩🏽‍🤝‍👩🏼"
	      },
	      "1F3FD-1F3FE": {
	        "k": "two_women_holding_hands-1F3FD-1F3FE",
	        "n": "two_women_holding_hands",
	        "e": "👩🏽‍🤝‍👩🏾"
	      },
	      "1F3FD-1F3FF": {
	        "k": "two_women_holding_hands-1F3FD-1F3FF",
	        "n": "two_women_holding_hands",
	        "e": "👩🏽‍🤝‍👩🏿"
	      },
	      "1F3FE-1F3FB": {
	        "k": "two_women_holding_hands-1F3FE-1F3FB",
	        "n": "two_women_holding_hands",
	        "e": "👩🏾‍🤝‍👩🏻"
	      },
	      "1F3FE-1F3FC": {
	        "k": "two_women_holding_hands-1F3FE-1F3FC",
	        "n": "two_women_holding_hands",
	        "e": "👩🏾‍🤝‍👩🏼"
	      },
	      "1F3FE-1F3FD": {
	        "k": "two_women_holding_hands-1F3FE-1F3FD",
	        "n": "two_women_holding_hands",
	        "e": "👩🏾‍🤝‍👩🏽"
	      },
	      "1F3FE-1F3FF": {
	        "k": "two_women_holding_hands-1F3FE-1F3FF",
	        "n": "two_women_holding_hands",
	        "e": "👩🏾‍🤝‍👩🏿"
	      },
	      "1F3FF-1F3FB": {
	        "k": "two_women_holding_hands-1F3FF-1F3FB",
	        "n": "two_women_holding_hands",
	        "e": "👩🏿‍🤝‍👩🏻"
	      },
	      "1F3FF-1F3FC": {
	        "k": "two_women_holding_hands-1F3FF-1F3FC",
	        "n": "two_women_holding_hands",
	        "e": "👩🏿‍🤝‍👩🏼"
	      },
	      "1F3FF-1F3FD": {
	        "k": "two_women_holding_hands-1F3FF-1F3FD",
	        "n": "two_women_holding_hands",
	        "e": "👩🏿‍🤝‍👩🏽"
	      },
	      "1F3FF-1F3FE": {
	        "k": "two_women_holding_hands-1F3FF-1F3FE",
	        "n": "two_women_holding_hands",
	        "e": "👩🏿‍🤝‍👩🏾"
	      }
	    }
	  }, {
	    "n": ["couple", "man_and_woman_holding_hands", "woman_and_man_holding_hands"],
	    "e": "👫",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "couple-1F3FB",
	        "n": "couple",
	        "e": "👫🏻"
	      },
	      "1F3FC": {
	        "k": "couple-1F3FC",
	        "n": "couple",
	        "e": "👫🏼"
	      },
	      "1F3FD": {
	        "k": "couple-1F3FD",
	        "n": "couple",
	        "e": "👫🏽"
	      },
	      "1F3FE": {
	        "k": "couple-1F3FE",
	        "n": "couple",
	        "e": "👫🏾"
	      },
	      "1F3FF": {
	        "k": "couple-1F3FF",
	        "n": "couple",
	        "e": "👫🏿"
	      },
	      "1F3FB-1F3FC": {
	        "k": "couple-1F3FB-1F3FC",
	        "n": "couple",
	        "e": "👩🏻‍🤝‍👨🏼"
	      },
	      "1F3FB-1F3FD": {
	        "k": "couple-1F3FB-1F3FD",
	        "n": "couple",
	        "e": "👩🏻‍🤝‍👨🏽"
	      },
	      "1F3FB-1F3FE": {
	        "k": "couple-1F3FB-1F3FE",
	        "n": "couple",
	        "e": "👩🏻‍🤝‍👨🏾"
	      },
	      "1F3FB-1F3FF": {
	        "k": "couple-1F3FB-1F3FF",
	        "n": "couple",
	        "e": "👩🏻‍🤝‍👨🏿"
	      },
	      "1F3FC-1F3FB": {
	        "k": "couple-1F3FC-1F3FB",
	        "n": "couple",
	        "e": "👩🏼‍🤝‍👨🏻"
	      },
	      "1F3FC-1F3FD": {
	        "k": "couple-1F3FC-1F3FD",
	        "n": "couple",
	        "e": "👩🏼‍🤝‍👨🏽"
	      },
	      "1F3FC-1F3FE": {
	        "k": "couple-1F3FC-1F3FE",
	        "n": "couple",
	        "e": "👩🏼‍🤝‍👨🏾"
	      },
	      "1F3FC-1F3FF": {
	        "k": "couple-1F3FC-1F3FF",
	        "n": "couple",
	        "e": "👩🏼‍🤝‍👨🏿"
	      },
	      "1F3FD-1F3FB": {
	        "k": "couple-1F3FD-1F3FB",
	        "n": "couple",
	        "e": "👩🏽‍🤝‍👨🏻"
	      },
	      "1F3FD-1F3FC": {
	        "k": "couple-1F3FD-1F3FC",
	        "n": "couple",
	        "e": "👩🏽‍🤝‍👨🏼"
	      },
	      "1F3FD-1F3FE": {
	        "k": "couple-1F3FD-1F3FE",
	        "n": "couple",
	        "e": "👩🏽‍🤝‍👨🏾"
	      },
	      "1F3FD-1F3FF": {
	        "k": "couple-1F3FD-1F3FF",
	        "n": "couple",
	        "e": "👩🏽‍🤝‍👨🏿"
	      },
	      "1F3FE-1F3FB": {
	        "k": "couple-1F3FE-1F3FB",
	        "n": "couple",
	        "e": "👩🏾‍🤝‍👨🏻"
	      },
	      "1F3FE-1F3FC": {
	        "k": "couple-1F3FE-1F3FC",
	        "n": "couple",
	        "e": "👩🏾‍🤝‍👨🏼"
	      },
	      "1F3FE-1F3FD": {
	        "k": "couple-1F3FE-1F3FD",
	        "n": "couple",
	        "e": "👩🏾‍🤝‍👨🏽"
	      },
	      "1F3FE-1F3FF": {
	        "k": "couple-1F3FE-1F3FF",
	        "n": "couple",
	        "e": "👩🏾‍🤝‍👨🏿"
	      },
	      "1F3FF-1F3FB": {
	        "k": "couple-1F3FF-1F3FB",
	        "n": "couple",
	        "e": "👩🏿‍🤝‍👨🏻"
	      },
	      "1F3FF-1F3FC": {
	        "k": "couple-1F3FF-1F3FC",
	        "n": "couple",
	        "e": "👩🏿‍🤝‍👨🏼"
	      },
	      "1F3FF-1F3FD": {
	        "k": "couple-1F3FF-1F3FD",
	        "n": "couple",
	        "e": "👩🏿‍🤝‍👨🏽"
	      },
	      "1F3FF-1F3FE": {
	        "k": "couple-1F3FF-1F3FE",
	        "n": "couple",
	        "e": "👩🏿‍🤝‍👨🏾"
	      }
	    }
	  }, {
	    "n": ["two_men_holding_hands", "men_holding_hands"],
	    "e": "👬",
	    "c": 9,
	    "ver": "2.0",
	    "v": {
	      "1F3FB": {
	        "k": "two_men_holding_hands-1F3FB",
	        "n": "two_men_holding_hands",
	        "e": "👬🏻"
	      },
	      "1F3FC": {
	        "k": "two_men_holding_hands-1F3FC",
	        "n": "two_men_holding_hands",
	        "e": "👬🏼"
	      },
	      "1F3FD": {
	        "k": "two_men_holding_hands-1F3FD",
	        "n": "two_men_holding_hands",
	        "e": "👬🏽"
	      },
	      "1F3FE": {
	        "k": "two_men_holding_hands-1F3FE",
	        "n": "two_men_holding_hands",
	        "e": "👬🏾"
	      },
	      "1F3FF": {
	        "k": "two_men_holding_hands-1F3FF",
	        "n": "two_men_holding_hands",
	        "e": "👬🏿"
	      },
	      "1F3FB-1F3FC": {
	        "k": "two_men_holding_hands-1F3FB-1F3FC",
	        "n": "two_men_holding_hands",
	        "e": "👨🏻‍🤝‍👨🏼"
	      },
	      "1F3FB-1F3FD": {
	        "k": "two_men_holding_hands-1F3FB-1F3FD",
	        "n": "two_men_holding_hands",
	        "e": "👨🏻‍🤝‍👨🏽"
	      },
	      "1F3FB-1F3FE": {
	        "k": "two_men_holding_hands-1F3FB-1F3FE",
	        "n": "two_men_holding_hands",
	        "e": "👨🏻‍🤝‍👨🏾"
	      },
	      "1F3FB-1F3FF": {
	        "k": "two_men_holding_hands-1F3FB-1F3FF",
	        "n": "two_men_holding_hands",
	        "e": "👨🏻‍🤝‍👨🏿"
	      },
	      "1F3FC-1F3FB": {
	        "k": "two_men_holding_hands-1F3FC-1F3FB",
	        "n": "two_men_holding_hands",
	        "e": "👨🏼‍🤝‍👨🏻"
	      },
	      "1F3FC-1F3FD": {
	        "k": "two_men_holding_hands-1F3FC-1F3FD",
	        "n": "two_men_holding_hands",
	        "e": "👨🏼‍🤝‍👨🏽"
	      },
	      "1F3FC-1F3FE": {
	        "k": "two_men_holding_hands-1F3FC-1F3FE",
	        "n": "two_men_holding_hands",
	        "e": "👨🏼‍🤝‍👨🏾"
	      },
	      "1F3FC-1F3FF": {
	        "k": "two_men_holding_hands-1F3FC-1F3FF",
	        "n": "two_men_holding_hands",
	        "e": "👨🏼‍🤝‍👨🏿"
	      },
	      "1F3FD-1F3FB": {
	        "k": "two_men_holding_hands-1F3FD-1F3FB",
	        "n": "two_men_holding_hands",
	        "e": "👨🏽‍🤝‍👨🏻"
	      },
	      "1F3FD-1F3FC": {
	        "k": "two_men_holding_hands-1F3FD-1F3FC",
	        "n": "two_men_holding_hands",
	        "e": "👨🏽‍🤝‍👨🏼"
	      },
	      "1F3FD-1F3FE": {
	        "k": "two_men_holding_hands-1F3FD-1F3FE",
	        "n": "two_men_holding_hands",
	        "e": "👨🏽‍🤝‍👨🏾"
	      },
	      "1F3FD-1F3FF": {
	        "k": "two_men_holding_hands-1F3FD-1F3FF",
	        "n": "two_men_holding_hands",
	        "e": "👨🏽‍🤝‍👨🏿"
	      },
	      "1F3FE-1F3FB": {
	        "k": "two_men_holding_hands-1F3FE-1F3FB",
	        "n": "two_men_holding_hands",
	        "e": "👨🏾‍🤝‍👨🏻"
	      },
	      "1F3FE-1F3FC": {
	        "k": "two_men_holding_hands-1F3FE-1F3FC",
	        "n": "two_men_holding_hands",
	        "e": "👨🏾‍🤝‍👨🏼"
	      },
	      "1F3FE-1F3FD": {
	        "k": "two_men_holding_hands-1F3FE-1F3FD",
	        "n": "two_men_holding_hands",
	        "e": "👨🏾‍🤝‍👨🏽"
	      },
	      "1F3FE-1F3FF": {
	        "k": "two_men_holding_hands-1F3FE-1F3FF",
	        "n": "two_men_holding_hands",
	        "e": "👨🏾‍🤝‍👨🏿"
	      },
	      "1F3FF-1F3FB": {
	        "k": "two_men_holding_hands-1F3FF-1F3FB",
	        "n": "two_men_holding_hands",
	        "e": "👨🏿‍🤝‍👨🏻"
	      },
	      "1F3FF-1F3FC": {
	        "k": "two_men_holding_hands-1F3FF-1F3FC",
	        "n": "two_men_holding_hands",
	        "e": "👨🏿‍🤝‍👨🏼"
	      },
	      "1F3FF-1F3FD": {
	        "k": "two_men_holding_hands-1F3FF-1F3FD",
	        "n": "two_men_holding_hands",
	        "e": "👨🏿‍🤝‍👨🏽"
	      },
	      "1F3FF-1F3FE": {
	        "k": "two_men_holding_hands-1F3FF-1F3FE",
	        "n": "two_men_holding_hands",
	        "e": "👨🏿‍🤝‍👨🏾"
	      }
	    }
	  }, {
	    "n": ["couplekiss"],
	    "e": "💏",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-kiss-man"],
	    "e": "👩‍❤️‍💋‍👨",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-kiss-man"],
	    "e": "👨‍❤️‍💋‍👨",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-kiss-woman"],
	    "e": "👩‍❤️‍💋‍👩",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["couple_with_heart"],
	    "e": "💑",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-heart-man"],
	    "e": "👩‍❤️‍👨",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-heart-man"],
	    "e": "👨‍❤️‍👨",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-heart-woman"],
	    "e": "👩‍❤️‍👩",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["family", "man-woman-boy"],
	    "e": "👪",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-woman-boy", "family"],
	    "e": "👨‍👩‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-woman-girl"],
	    "e": "👨‍👩‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-woman-girl-boy"],
	    "e": "👨‍👩‍👧‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-woman-boy-boy"],
	    "e": "👨‍👩‍👦‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-woman-girl-girl"],
	    "e": "👨‍👩‍👧‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-man-boy"],
	    "e": "👨‍👨‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-man-girl"],
	    "e": "👨‍👨‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-man-girl-boy"],
	    "e": "👨‍👨‍👧‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-man-boy-boy"],
	    "e": "👨‍👨‍👦‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-man-girl-girl"],
	    "e": "👨‍👨‍👧‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-woman-boy"],
	    "e": "👩‍👩‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-woman-girl"],
	    "e": "👩‍👩‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-woman-girl-boy"],
	    "e": "👩‍👩‍👧‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-woman-boy-boy"],
	    "e": "👩‍👩‍👦‍👦",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["woman-woman-girl-girl"],
	    "e": "👩‍👩‍👧‍👧",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["man-boy"],
	    "e": "👨‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["man-boy-boy"],
	    "e": "👨‍👦‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["man-girl"],
	    "e": "👨‍👧",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["man-girl-boy"],
	    "e": "👨‍👧‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["man-girl-girl"],
	    "e": "👨‍👧‍👧",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-boy"],
	    "e": "👩‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-boy-boy"],
	    "e": "👩‍👦‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-girl"],
	    "e": "👩‍👧",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-girl-boy"],
	    "e": "👩‍👧‍👦",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["woman-girl-girl"],
	    "e": "👩‍👧‍👧",
	    "c": 9,
	    "ver": "4.0"
	  }, {
	    "n": ["speaking_head_in_silhouette"],
	    "e": "🗣️",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["bust_in_silhouette"],
	    "e": "👤",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["busts_in_silhouette"],
	    "e": "👥",
	    "c": 9,
	    "ver": "2.0"
	  }, {
	    "n": ["footprints"],
	    "e": "👣",
	    "c": 9,
	    "ver": "2.0"
	  }];

	  var EMOJI = 'emoji';
	  var SHOW_TABS = 'showTabs';
	  var HIDE_TABS = 'hideTabs';
	  var SHOW_SEARCH_RESULTS = 'showSearchResults';
	  var SHOW_PREVIEW = 'showPreview';
	  var HIDE_PREVIEW = 'hidePreview';
	  var HIDE_VARIANT_POPUP = 'hideVariantPopup';

	  function createElement(tagName, className) {
	    var element = document.createElement(tagName);

	    if (className) {
	      element.className = className;
	    }

	    return element;
	  }
	  function empty(element) {
	    while (element.firstChild) {
	      element.removeChild(element.firstChild);
	    }
	  }
	  function getEmojiName(emoji) {
	    return typeof emoji.n === 'string' ? emoji.n : emoji.n[0];
	  }

	  var CLASS_PREVIEW = 'emoji-picker__preview';
	  var CLASS_PREVIEW_EMOJI = 'emoji-picker__preview-emoji';
	  var CLASS_PREVIEW_NAME = 'emoji-picker__preview-name';
	  var EmojiPreview =
	  /*#__PURE__*/
	  function () {
	    function EmojiPreview(events) {
	      _classCallCheck(this, EmojiPreview);

	      this.events = events;
	    }

	    _createClass(EmojiPreview, [{
	      key: "render",
	      value: function render() {
	        var _this = this;

	        var preview = createElement('div', CLASS_PREVIEW);
	        this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
	        preview.appendChild(this.emoji);
	        this.name = createElement('div', CLASS_PREVIEW_NAME);
	        preview.appendChild(this.name);
	        this.events.on(SHOW_PREVIEW, function (emoji) {
	          return _this.showPreview(emoji);
	        });
	        this.events.on(HIDE_PREVIEW, function () {
	          return _this.hidePreview();
	        });
	        return preview;
	      }
	    }, {
	      key: "showPreview",
	      value: function showPreview(emoji) {
	        this.emoji.innerHTML = emoji.e;
	        this.name.innerHTML = getEmojiName(emoji);
	      }
	    }, {
	      key: "hidePreview",
	      value: function hidePreview() {
	        this.emoji.innerHTML = '';
	        this.name.innerHTML = '';
	      }
	    }]);

	    return EmojiPreview;
	  }();

	  function _classCallCheck$1(instance, Constructor) {
	    if (!(instance instanceof Constructor)) {
	      throw new TypeError("Cannot call a class as a function");
	    }
	  }

	  function _defineProperties$1(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }

	  function _createClass$1(Constructor, protoProps, staticProps) {
	    if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
	    if (staticProps) _defineProperties$1(Constructor, staticProps);
	    return Constructor;
	  }

	  function _defineProperty$1(obj, key, value) {
	    if (key in obj) {
	      Object.defineProperty(obj, key, {
	        value: value,
	        enumerable: true,
	        configurable: true,
	        writable: true
	      });
	    } else {
	      obj[key] = value;
	    }

	    return obj;
	  }

	  function _objectSpread(target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i] != null ? arguments[i] : {};
	      var ownKeys = Object.keys(source);

	      if (typeof Object.getOwnPropertySymbols === 'function') {
	        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	        }));
	      }

	      ownKeys.forEach(function (key) {
	        _defineProperty$1(target, key, source[key]);
	      });
	    }

	    return target;
	  }

	  function _slicedToArray(arr, i) {
	    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	  }

	  function _arrayWithHoles(arr) {
	    if (Array.isArray(arr)) return arr;
	  }

	  function _iterableToArrayLimit(arr, i) {
	    var _arr = [];
	    var _n = true;
	    var _d = false;
	    var _e = undefined;

	    try {
	      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	        _arr.push(_s.value);

	        if (i && _arr.length === i) break;
	      }
	    } catch (err) {
	      _d = true;
	      _e = err;
	    } finally {
	      try {
	        if (!_n && _i["return"] != null) _i["return"]();
	      } finally {
	        if (_d) throw _e;
	      }
	    }

	    return _arr;
	  }

	  function _nonIterableRest() {
	    throw new TypeError("Invalid attempt to destructure non-iterable instance");
	  }

	  var noop = function noop() {};

	  var _WINDOW = {};
	  var _DOCUMENT = {};
	  var _MUTATION_OBSERVER = null;
	  var _PERFORMANCE = {
	    mark: noop,
	    measure: noop
	  };

	  try {
	    if (typeof window !== 'undefined') _WINDOW = window;
	    if (typeof document !== 'undefined') _DOCUMENT = document;
	    if (typeof MutationObserver !== 'undefined') _MUTATION_OBSERVER = MutationObserver;
	    if (typeof performance !== 'undefined') _PERFORMANCE = performance;
	  } catch (e) {}

	  var _ref = _WINDOW.navigator || {},
	      _ref$userAgent = _ref.userAgent,
	      userAgent = _ref$userAgent === void 0 ? '' : _ref$userAgent;

	  var WINDOW = _WINDOW;
	  var DOCUMENT = _DOCUMENT;
	  var PERFORMANCE = _PERFORMANCE;
	  var IS_BROWSER = !!WINDOW.document;
	  var IS_DOM = !!DOCUMENT.documentElement && !!DOCUMENT.head && typeof DOCUMENT.addEventListener === 'function' && typeof DOCUMENT.createElement === 'function';
	  var IS_IE = ~userAgent.indexOf('MSIE') || ~userAgent.indexOf('Trident/');
	  var NAMESPACE_IDENTIFIER = '___FONT_AWESOME___';
	  var DEFAULT_FAMILY_PREFIX = 'fa';
	  var DEFAULT_REPLACEMENT_CLASS = 'svg-inline--fa';
	  var DATA_FA_I2SVG = 'data-fa-i2svg';

	  var PRODUCTION = function () {
	    try {
	      return "development" === 'production';
	    } catch (e) {
	      return false;
	    }
	  }();
	  var DUOTONE_CLASSES = {
	    GROUP: 'group',
	    SWAP_OPACITY: 'swap-opacity',
	    PRIMARY: 'primary',
	    SECONDARY: 'secondary'
	  };
	  var initial = WINDOW.FontAwesomeConfig || {};

	  function getAttrConfig(attr) {
	    var element = DOCUMENT.querySelector('script[' + attr + ']');

	    if (element) {
	      return element.getAttribute(attr);
	    }
	  }

	  function coerce(val) {
	    // Getting an empty string will occur if the attribute is set on the HTML tag but without a value
	    // We'll assume that this is an indication that it should be toggled to true
	    // For example <script data-search-pseudo-elements src="..."></script>
	    if (val === '') return true;
	    if (val === 'false') return false;
	    if (val === 'true') return true;
	    return val;
	  }

	  if (DOCUMENT && typeof DOCUMENT.querySelector === 'function') {
	    var attrs = [['data-family-prefix', 'familyPrefix'], ['data-replacement-class', 'replacementClass'], ['data-auto-replace-svg', 'autoReplaceSvg'], ['data-auto-add-css', 'autoAddCss'], ['data-auto-a11y', 'autoA11y'], ['data-search-pseudo-elements', 'searchPseudoElements'], ['data-observe-mutations', 'observeMutations'], ['data-mutate-approach', 'mutateApproach'], ['data-keep-original-source', 'keepOriginalSource'], ['data-measure-performance', 'measurePerformance'], ['data-show-missing-icons', 'showMissingIcons']];
	    attrs.forEach(function (_ref) {
	      var _ref2 = _slicedToArray(_ref, 2),
	          attr = _ref2[0],
	          key = _ref2[1];

	      var val = coerce(getAttrConfig(attr));

	      if (val !== undefined && val !== null) {
	        initial[key] = val;
	      }
	    });
	  }

	  var _default = {
	    familyPrefix: DEFAULT_FAMILY_PREFIX,
	    replacementClass: DEFAULT_REPLACEMENT_CLASS,
	    autoReplaceSvg: true,
	    autoAddCss: true,
	    autoA11y: true,
	    searchPseudoElements: false,
	    observeMutations: true,
	    mutateApproach: 'async',
	    keepOriginalSource: true,
	    measurePerformance: false,
	    showMissingIcons: true
	  };

	  var _config = _objectSpread({}, _default, initial);

	  if (!_config.autoReplaceSvg) _config.observeMutations = false;

	  var config = _objectSpread({}, _config);

	  WINDOW.FontAwesomeConfig = config;
	  var w = WINDOW || {};
	  if (!w[NAMESPACE_IDENTIFIER]) w[NAMESPACE_IDENTIFIER] = {};
	  if (!w[NAMESPACE_IDENTIFIER].styles) w[NAMESPACE_IDENTIFIER].styles = {};
	  if (!w[NAMESPACE_IDENTIFIER].hooks) w[NAMESPACE_IDENTIFIER].hooks = {};
	  if (!w[NAMESPACE_IDENTIFIER].shims) w[NAMESPACE_IDENTIFIER].shims = [];
	  var namespace = w[NAMESPACE_IDENTIFIER];
	  var functions = [];

	  var listener = function listener() {
	    DOCUMENT.removeEventListener('DOMContentLoaded', listener);
	    loaded = 1;
	    functions.map(function (fn) {
	      return fn();
	    });
	  };

	  var loaded = false;

	  if (IS_DOM) {
	    loaded = (DOCUMENT.documentElement.doScroll ? /^loaded|^c/ : /^loaded|^i|^c/).test(DOCUMENT.readyState);
	    if (!loaded) DOCUMENT.addEventListener('DOMContentLoaded', listener);
	  }

	  var isNode = typeof commonjsGlobal !== 'undefined' && typeof commonjsGlobal.process !== 'undefined' && typeof commonjsGlobal.process.emit === 'function';
	  var meaninglessTransform = {
	    size: 16,
	    x: 0,
	    y: 0,
	    rotate: 0,
	    flipX: false,
	    flipY: false
	  };

	  function insertCss(css) {
	    if (!css || !IS_DOM) {
	      return;
	    }

	    var style = DOCUMENT.createElement('style');
	    style.setAttribute('type', 'text/css');
	    style.innerHTML = css;
	    var headChildren = DOCUMENT.head.childNodes;
	    var beforeChild = null;

	    for (var i = headChildren.length - 1; i > -1; i--) {
	      var child = headChildren[i];
	      var tagName = (child.tagName || '').toUpperCase();

	      if (['STYLE', 'LINK'].indexOf(tagName) > -1) {
	        beforeChild = child;
	      }
	    }

	    DOCUMENT.head.insertBefore(style, beforeChild);
	    return css;
	  }

	  var idPool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

	  function nextUniqueId() {
	    var size = 12;
	    var id = '';

	    while (size-- > 0) {
	      id += idPool[Math.random() * 62 | 0];
	    }

	    return id;
	  }

	  function htmlEscape(str) {
	    return "".concat(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	  }

	  function joinAttributes(attributes) {
	    return Object.keys(attributes || {}).reduce(function (acc, attributeName) {
	      return acc + "".concat(attributeName, "=\"").concat(htmlEscape(attributes[attributeName]), "\" ");
	    }, '').trim();
	  }

	  function joinStyles(styles) {
	    return Object.keys(styles || {}).reduce(function (acc, styleName) {
	      return acc + "".concat(styleName, ": ").concat(styles[styleName], ";");
	    }, '');
	  }

	  function transformIsMeaningful(transform) {
	    return transform.size !== meaninglessTransform.size || transform.x !== meaninglessTransform.x || transform.y !== meaninglessTransform.y || transform.rotate !== meaninglessTransform.rotate || transform.flipX || transform.flipY;
	  }

	  function transformForSvg(_ref) {
	    var transform = _ref.transform,
	        containerWidth = _ref.containerWidth,
	        iconWidth = _ref.iconWidth;
	    var outer = {
	      transform: "translate(".concat(containerWidth / 2, " 256)")
	    };
	    var innerTranslate = "translate(".concat(transform.x * 32, ", ").concat(transform.y * 32, ") ");
	    var innerScale = "scale(".concat(transform.size / 16 * (transform.flipX ? -1 : 1), ", ").concat(transform.size / 16 * (transform.flipY ? -1 : 1), ") ");
	    var innerRotate = "rotate(".concat(transform.rotate, " 0 0)");
	    var inner = {
	      transform: "".concat(innerTranslate, " ").concat(innerScale, " ").concat(innerRotate)
	    };
	    var path = {
	      transform: "translate(".concat(iconWidth / 2 * -1, " -256)")
	    };
	    return {
	      outer: outer,
	      inner: inner,
	      path: path
	    };
	  }

	  var ALL_SPACE = {
	    x: 0,
	    y: 0,
	    width: '100%',
	    height: '100%'
	  };

	  function fillBlack(abstract) {
	    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	    if (abstract.attributes && (abstract.attributes.fill || force)) {
	      abstract.attributes.fill = 'black';
	    }

	    return abstract;
	  }

	  function deGroup(abstract) {
	    if (abstract.tag === 'g') {
	      return abstract.children;
	    } else {
	      return [abstract];
	    }
	  }

	  function makeIconMasking(_ref) {
	    var children = _ref.children,
	        attributes = _ref.attributes,
	        main = _ref.main,
	        mask = _ref.mask,
	        transform = _ref.transform;
	    var mainWidth = main.width,
	        mainPath = main.icon;
	    var maskWidth = mask.width,
	        maskPath = mask.icon;
	    var trans = transformForSvg({
	      transform: transform,
	      containerWidth: maskWidth,
	      iconWidth: mainWidth
	    });
	    var maskRect = {
	      tag: 'rect',
	      attributes: _objectSpread({}, ALL_SPACE, {
	        fill: 'white'
	      })
	    };
	    var maskInnerGroupChildrenMixin = mainPath.children ? {
	      children: mainPath.children.map(fillBlack)
	    } : {};
	    var maskInnerGroup = {
	      tag: 'g',
	      attributes: _objectSpread({}, trans.inner),
	      children: [fillBlack(_objectSpread({
	        tag: mainPath.tag,
	        attributes: _objectSpread({}, mainPath.attributes, trans.path)
	      }, maskInnerGroupChildrenMixin))]
	    };
	    var maskOuterGroup = {
	      tag: 'g',
	      attributes: _objectSpread({}, trans.outer),
	      children: [maskInnerGroup]
	    };
	    var maskId = "mask-".concat(nextUniqueId());
	    var clipId = "clip-".concat(nextUniqueId());
	    var maskTag = {
	      tag: 'mask',
	      attributes: _objectSpread({}, ALL_SPACE, {
	        id: maskId,
	        maskUnits: 'userSpaceOnUse',
	        maskContentUnits: 'userSpaceOnUse'
	      }),
	      children: [maskRect, maskOuterGroup]
	    };
	    var defs = {
	      tag: 'defs',
	      children: [{
	        tag: 'clipPath',
	        attributes: {
	          id: clipId
	        },
	        children: deGroup(maskPath)
	      }, maskTag]
	    };
	    children.push(defs, {
	      tag: 'rect',
	      attributes: _objectSpread({
	        fill: 'currentColor',
	        'clip-path': "url(#".concat(clipId, ")"),
	        mask: "url(#".concat(maskId, ")")
	      }, ALL_SPACE)
	    });
	    return {
	      children: children,
	      attributes: attributes
	    };
	  }

	  function makeIconStandard(_ref) {
	    var children = _ref.children,
	        attributes = _ref.attributes,
	        main = _ref.main,
	        transform = _ref.transform,
	        styles = _ref.styles;
	    var styleString = joinStyles(styles);

	    if (styleString.length > 0) {
	      attributes['style'] = styleString;
	    }

	    if (transformIsMeaningful(transform)) {
	      var trans = transformForSvg({
	        transform: transform,
	        containerWidth: main.width,
	        iconWidth: main.width
	      });
	      children.push({
	        tag: 'g',
	        attributes: _objectSpread({}, trans.outer),
	        children: [{
	          tag: 'g',
	          attributes: _objectSpread({}, trans.inner),
	          children: [{
	            tag: main.icon.tag,
	            children: main.icon.children,
	            attributes: _objectSpread({}, main.icon.attributes, trans.path)
	          }]
	        }]
	      });
	    } else {
	      children.push(main.icon);
	    }

	    return {
	      children: children,
	      attributes: attributes
	    };
	  }

	  function asIcon(_ref) {
	    var children = _ref.children,
	        main = _ref.main,
	        mask = _ref.mask,
	        attributes = _ref.attributes,
	        styles = _ref.styles,
	        transform = _ref.transform;

	    if (transformIsMeaningful(transform) && main.found && !mask.found) {
	      var width = main.width,
	          height = main.height;
	      var offset = {
	        x: width / height / 2,
	        y: 0.5
	      };
	      attributes['style'] = joinStyles(_objectSpread({}, styles, {
	        'transform-origin': "".concat(offset.x + transform.x / 16, "em ").concat(offset.y + transform.y / 16, "em")
	      }));
	    }

	    return [{
	      tag: 'svg',
	      attributes: attributes,
	      children: children
	    }];
	  }

	  function asSymbol(_ref) {
	    var prefix = _ref.prefix,
	        iconName = _ref.iconName,
	        children = _ref.children,
	        attributes = _ref.attributes,
	        symbol = _ref.symbol;
	    var id = symbol === true ? "".concat(prefix, "-").concat(config.familyPrefix, "-").concat(iconName) : symbol;
	    return [{
	      tag: 'svg',
	      attributes: {
	        style: 'display: none;'
	      },
	      children: [{
	        tag: 'symbol',
	        attributes: _objectSpread({}, attributes, {
	          id: id
	        }),
	        children: children
	      }]
	    }];
	  }

	  function makeInlineSvgAbstract(params) {
	    var _params$icons = params.icons,
	        main = _params$icons.main,
	        mask = _params$icons.mask,
	        prefix = params.prefix,
	        iconName = params.iconName,
	        transform = params.transform,
	        symbol = params.symbol,
	        title = params.title,
	        extra = params.extra,
	        _params$watchable = params.watchable,
	        watchable = _params$watchable === void 0 ? false : _params$watchable;

	    var _ref = mask.found ? mask : main,
	        width = _ref.width,
	        height = _ref.height;

	    var widthClass = "fa-w-".concat(Math.ceil(width / height * 16));
	    var attrClass = [config.replacementClass, iconName ? "".concat(config.familyPrefix, "-").concat(iconName) : '', widthClass].filter(function (c) {
	      return extra.classes.indexOf(c) === -1;
	    }).concat(extra.classes).join(' ');
	    var content = {
	      children: [],
	      attributes: _objectSpread({}, extra.attributes, {
	        'data-prefix': prefix,
	        'data-icon': iconName,
	        'class': attrClass,
	        'role': extra.attributes.role || 'img',
	        'xmlns': 'http://www.w3.org/2000/svg',
	        'viewBox': "0 0 ".concat(width, " ").concat(height)
	      })
	    };

	    if (watchable) {
	      content.attributes[DATA_FA_I2SVG] = '';
	    }

	    if (title) content.children.push({
	      tag: 'title',
	      attributes: {
	        id: content.attributes['aria-labelledby'] || "title-".concat(nextUniqueId())
	      },
	      children: [title]
	    });

	    var args = _objectSpread({}, content, {
	      prefix: prefix,
	      iconName: iconName,
	      main: main,
	      mask: mask,
	      transform: transform,
	      symbol: symbol,
	      styles: extra.styles
	    });

	    var _ref2 = mask.found && main.found ? makeIconMasking(args) : makeIconStandard(args),
	        children = _ref2.children,
	        attributes = _ref2.attributes;

	    args.children = children;
	    args.attributes = attributes;

	    if (symbol) {
	      return asSymbol(args);
	    } else {
	      return asIcon(args);
	    }
	  }

	  var noop$1 = function noop() {};

	  var p = config.measurePerformance && PERFORMANCE && PERFORMANCE.mark && PERFORMANCE.measure ? PERFORMANCE : {
	    mark: noop$1,
	    measure: noop$1
	  };
	  /**
	   * Internal helper to bind a function known to have 4 arguments
	   * to a given context.
	   */

	  var bindInternal4 = function bindInternal4(func, thisContext) {
	    return function (a, b, c, d) {
	      return func.call(thisContext, a, b, c, d);
	    };
	  };
	  /**
	   * # Reduce
	   *
	   * A fast object `.reduce()` implementation.
	   *
	   * @param  {Object}   subject      The object to reduce over.
	   * @param  {Function} fn           The reducer function.
	   * @param  {mixed}    initialValue The initial value for the reducer, defaults to subject[0].
	   * @param  {Object}   thisContext  The context for the reducer.
	   * @return {mixed}                 The final result.
	   */


	  var reduce = function fastReduceObject(subject, fn, initialValue, thisContext) {
	    var keys = Object.keys(subject),
	        length = keys.length,
	        iterator = thisContext !== undefined ? bindInternal4(fn, thisContext) : fn,
	        i,
	        key,
	        result;

	    if (initialValue === undefined) {
	      i = 1;
	      result = subject[keys[0]];
	    } else {
	      i = 0;
	      result = initialValue;
	    }

	    for (; i < length; i++) {
	      key = keys[i];
	      result = iterator(result, subject[key], key, subject);
	    }

	    return result;
	  };

	  function defineIcons(prefix, icons) {
	    var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	    var _params$skipHooks = params.skipHooks,
	        skipHooks = _params$skipHooks === void 0 ? false : _params$skipHooks;
	    var normalized = Object.keys(icons).reduce(function (acc, iconName) {
	      var icon = icons[iconName];
	      var expanded = !!icon.icon;

	      if (expanded) {
	        acc[icon.iconName] = icon.icon;
	      } else {
	        acc[iconName] = icon;
	      }

	      return acc;
	    }, {});

	    if (typeof namespace.hooks.addPack === 'function' && !skipHooks) {
	      namespace.hooks.addPack(prefix, normalized);
	    } else {
	      namespace.styles[prefix] = _objectSpread({}, namespace.styles[prefix] || {}, normalized);
	    }
	    /**
	     * Font Awesome 4 used the prefix of `fa` for all icons. With the introduction
	     * of new styles we needed to differentiate between them. Prefix `fa` is now an alias
	     * for `fas` so we'll easy the upgrade process for our users by automatically defining
	     * this as well.
	     */


	    if (prefix === 'fas') {
	      defineIcons('fa', icons);
	    }
	  }

	  var styles = namespace.styles,
	      shims = namespace.shims;
	  var _byUnicode = {};
	  var _byLigature = {};
	  var _byOldName = {};

	  var build = function build() {
	    var lookup = function lookup(reducer) {
	      return reduce(styles, function (o, style, prefix) {
	        o[prefix] = reduce(style, reducer, {});
	        return o;
	      }, {});
	    };

	    _byUnicode = lookup(function (acc, icon, iconName) {
	      if (icon[3]) {
	        acc[icon[3]] = iconName;
	      }

	      return acc;
	    });
	    _byLigature = lookup(function (acc, icon, iconName) {
	      var ligatures = icon[2];
	      acc[iconName] = iconName;
	      ligatures.forEach(function (ligature) {
	        acc[ligature] = iconName;
	      });
	      return acc;
	    });
	    var hasRegular = 'far' in styles;
	    _byOldName = reduce(shims, function (acc, shim) {
	      var oldName = shim[0];
	      var prefix = shim[1];
	      var iconName = shim[2];

	      if (prefix === 'far' && !hasRegular) {
	        prefix = 'fas';
	      }

	      acc[oldName] = {
	        prefix: prefix,
	        iconName: iconName
	      };
	      return acc;
	    }, {});
	  };

	  build();

	  var styles$1 = namespace.styles;

	  function iconFromMapping(mapping, prefix, iconName) {
	    if (mapping && mapping[prefix] && mapping[prefix][iconName]) {
	      return {
	        prefix: prefix,
	        iconName: iconName,
	        icon: mapping[prefix][iconName]
	      };
	    }
	  }

	  function toHtml(abstractNodes) {
	    var tag = abstractNodes.tag,
	        _abstractNodes$attrib = abstractNodes.attributes,
	        attributes = _abstractNodes$attrib === void 0 ? {} : _abstractNodes$attrib,
	        _abstractNodes$childr = abstractNodes.children,
	        children = _abstractNodes$childr === void 0 ? [] : _abstractNodes$childr;

	    if (typeof abstractNodes === 'string') {
	      return htmlEscape(abstractNodes);
	    } else {
	      return "<".concat(tag, " ").concat(joinAttributes(attributes), ">").concat(children.map(toHtml).join(''), "</").concat(tag, ">");
	    }
	  }

	  function MissingIcon(error) {
	    this.name = 'MissingIcon';
	    this.message = error || 'Icon unavailable';
	    this.stack = new Error().stack;
	  }

	  MissingIcon.prototype = Object.create(Error.prototype);
	  MissingIcon.prototype.constructor = MissingIcon;
	  var FILL = {
	    fill: 'currentColor'
	  };
	  var ANIMATION_BASE = {
	    attributeType: 'XML',
	    repeatCount: 'indefinite',
	    dur: '2s'
	  };
	  var RING = {
	    tag: 'path',
	    attributes: _objectSpread({}, FILL, {
	      d: 'M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z'
	    })
	  };

	  var OPACITY_ANIMATE = _objectSpread({}, ANIMATION_BASE, {
	    attributeName: 'opacity'
	  });

	  var DOT = {
	    tag: 'circle',
	    attributes: _objectSpread({}, FILL, {
	      cx: '256',
	      cy: '364',
	      r: '28'
	    }),
	    children: [{
	      tag: 'animate',
	      attributes: _objectSpread({}, ANIMATION_BASE, {
	        attributeName: 'r',
	        values: '28;14;28;28;14;28;'
	      })
	    }, {
	      tag: 'animate',
	      attributes: _objectSpread({}, OPACITY_ANIMATE, {
	        values: '1;0;1;1;0;1;'
	      })
	    }]
	  };
	  var QUESTION = {
	    tag: 'path',
	    attributes: _objectSpread({}, FILL, {
	      opacity: '1',
	      d: 'M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z'
	    }),
	    children: [{
	      tag: 'animate',
	      attributes: _objectSpread({}, OPACITY_ANIMATE, {
	        values: '1;0;0;0;0;1;'
	      })
	    }]
	  };
	  var EXCLAMATION = {
	    tag: 'path',
	    attributes: _objectSpread({}, FILL, {
	      opacity: '0',
	      d: 'M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z'
	    }),
	    children: [{
	      tag: 'animate',
	      attributes: _objectSpread({}, OPACITY_ANIMATE, {
	        values: '0;0;1;1;0;0;'
	      })
	    }]
	  };
	  var styles$2 = namespace.styles;

	  function asFoundIcon(icon) {
	    var width = icon[0];
	    var height = icon[1];

	    var _icon$slice = icon.slice(4),
	        _icon$slice2 = _slicedToArray(_icon$slice, 1),
	        vectorData = _icon$slice2[0];

	    var element = null;

	    if (Array.isArray(vectorData)) {
	      element = {
	        tag: 'g',
	        attributes: {
	          class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.GROUP)
	        },
	        children: [{
	          tag: 'path',
	          attributes: {
	            class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.SECONDARY),
	            fill: 'currentColor',
	            d: vectorData[0]
	          }
	        }, {
	          tag: 'path',
	          attributes: {
	            class: "".concat(config.familyPrefix, "-").concat(DUOTONE_CLASSES.PRIMARY),
	            fill: 'currentColor',
	            d: vectorData[1]
	          }
	        }]
	      };
	    } else {
	      element = {
	        tag: 'path',
	        attributes: {
	          fill: 'currentColor',
	          d: vectorData
	        }
	      };
	    }

	    return {
	      found: true,
	      width: width,
	      height: height,
	      icon: element
	    };
	  }

	  var styles$3 = namespace.styles;

	  var baseStyles = "svg:not(:root).svg-inline--fa {\n  overflow: visible;\n}\n\n.svg-inline--fa {\n  display: inline-block;\n  font-size: inherit;\n  height: 1em;\n  overflow: visible;\n  vertical-align: -0.125em;\n}\n.svg-inline--fa.fa-lg {\n  vertical-align: -0.225em;\n}\n.svg-inline--fa.fa-w-1 {\n  width: 0.0625em;\n}\n.svg-inline--fa.fa-w-2 {\n  width: 0.125em;\n}\n.svg-inline--fa.fa-w-3 {\n  width: 0.1875em;\n}\n.svg-inline--fa.fa-w-4 {\n  width: 0.25em;\n}\n.svg-inline--fa.fa-w-5 {\n  width: 0.3125em;\n}\n.svg-inline--fa.fa-w-6 {\n  width: 0.375em;\n}\n.svg-inline--fa.fa-w-7 {\n  width: 0.4375em;\n}\n.svg-inline--fa.fa-w-8 {\n  width: 0.5em;\n}\n.svg-inline--fa.fa-w-9 {\n  width: 0.5625em;\n}\n.svg-inline--fa.fa-w-10 {\n  width: 0.625em;\n}\n.svg-inline--fa.fa-w-11 {\n  width: 0.6875em;\n}\n.svg-inline--fa.fa-w-12 {\n  width: 0.75em;\n}\n.svg-inline--fa.fa-w-13 {\n  width: 0.8125em;\n}\n.svg-inline--fa.fa-w-14 {\n  width: 0.875em;\n}\n.svg-inline--fa.fa-w-15 {\n  width: 0.9375em;\n}\n.svg-inline--fa.fa-w-16 {\n  width: 1em;\n}\n.svg-inline--fa.fa-w-17 {\n  width: 1.0625em;\n}\n.svg-inline--fa.fa-w-18 {\n  width: 1.125em;\n}\n.svg-inline--fa.fa-w-19 {\n  width: 1.1875em;\n}\n.svg-inline--fa.fa-w-20 {\n  width: 1.25em;\n}\n.svg-inline--fa.fa-pull-left {\n  margin-right: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-pull-right {\n  margin-left: 0.3em;\n  width: auto;\n}\n.svg-inline--fa.fa-border {\n  height: 1.5em;\n}\n.svg-inline--fa.fa-li {\n  width: 2em;\n}\n.svg-inline--fa.fa-fw {\n  width: 1.25em;\n}\n\n.fa-layers svg.svg-inline--fa {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.fa-layers {\n  display: inline-block;\n  height: 1em;\n  position: relative;\n  text-align: center;\n  vertical-align: -0.125em;\n  width: 1em;\n}\n.fa-layers svg.svg-inline--fa {\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter, .fa-layers-text {\n  display: inline-block;\n  position: absolute;\n  text-align: center;\n}\n\n.fa-layers-text {\n  left: 50%;\n  top: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  -webkit-transform-origin: center center;\n          transform-origin: center center;\n}\n\n.fa-layers-counter {\n  background-color: #ff253a;\n  border-radius: 1em;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: #fff;\n  height: 1.5em;\n  line-height: 1;\n  max-width: 5em;\n  min-width: 1.5em;\n  overflow: hidden;\n  padding: 0.25em;\n  right: 0;\n  text-overflow: ellipsis;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-bottom-right {\n  bottom: 0;\n  right: 0;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom right;\n          transform-origin: bottom right;\n}\n\n.fa-layers-bottom-left {\n  bottom: 0;\n  left: 0;\n  right: auto;\n  top: auto;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: bottom left;\n          transform-origin: bottom left;\n}\n\n.fa-layers-top-right {\n  right: 0;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top right;\n          transform-origin: top right;\n}\n\n.fa-layers-top-left {\n  left: 0;\n  right: auto;\n  top: 0;\n  -webkit-transform: scale(0.25);\n          transform: scale(0.25);\n  -webkit-transform-origin: top left;\n          transform-origin: top left;\n}\n\n.fa-lg {\n  font-size: 1.3333333333em;\n  line-height: 0.75em;\n  vertical-align: -0.0667em;\n}\n\n.fa-xs {\n  font-size: 0.75em;\n}\n\n.fa-sm {\n  font-size: 0.875em;\n}\n\n.fa-1x {\n  font-size: 1em;\n}\n\n.fa-2x {\n  font-size: 2em;\n}\n\n.fa-3x {\n  font-size: 3em;\n}\n\n.fa-4x {\n  font-size: 4em;\n}\n\n.fa-5x {\n  font-size: 5em;\n}\n\n.fa-6x {\n  font-size: 6em;\n}\n\n.fa-7x {\n  font-size: 7em;\n}\n\n.fa-8x {\n  font-size: 8em;\n}\n\n.fa-9x {\n  font-size: 9em;\n}\n\n.fa-10x {\n  font-size: 10em;\n}\n\n.fa-fw {\n  text-align: center;\n  width: 1.25em;\n}\n\n.fa-ul {\n  list-style-type: none;\n  margin-left: 2.5em;\n  padding-left: 0;\n}\n.fa-ul > li {\n  position: relative;\n}\n\n.fa-li {\n  left: -2em;\n  position: absolute;\n  text-align: center;\n  width: 2em;\n  line-height: inherit;\n}\n\n.fa-border {\n  border: solid 0.08em #eee;\n  border-radius: 0.1em;\n  padding: 0.2em 0.25em 0.15em;\n}\n\n.fa-pull-left {\n  float: left;\n}\n\n.fa-pull-right {\n  float: right;\n}\n\n.fa.fa-pull-left,\n.fas.fa-pull-left,\n.far.fa-pull-left,\n.fal.fa-pull-left,\n.fab.fa-pull-left {\n  margin-right: 0.3em;\n}\n.fa.fa-pull-right,\n.fas.fa-pull-right,\n.far.fa-pull-right,\n.fal.fa-pull-right,\n.fab.fa-pull-right {\n  margin-left: 0.3em;\n}\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n          animation: fa-spin 2s infinite linear;\n}\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n          animation: fa-spin 1s infinite steps(8);\n}\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg);\n  }\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg);\n  }\n}\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n          transform: rotate(90deg);\n}\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n          transform: rotate(180deg);\n}\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n          transform: rotate(270deg);\n}\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n          transform: scale(-1, 1);\n}\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n          transform: scale(1, -1);\n}\n\n.fa-flip-both, .fa-flip-horizontal.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(-1, -1);\n          transform: scale(-1, -1);\n}\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical,\n:root .fa-flip-both {\n  -webkit-filter: none;\n          filter: none;\n}\n\n.fa-stack {\n  display: inline-block;\n  height: 2em;\n  position: relative;\n  width: 2.5em;\n}\n\n.fa-stack-1x,\n.fa-stack-2x {\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  position: absolute;\n  right: 0;\n  top: 0;\n}\n\n.svg-inline--fa.fa-stack-1x {\n  height: 1em;\n  width: 1.25em;\n}\n.svg-inline--fa.fa-stack-2x {\n  height: 2em;\n  width: 2.5em;\n}\n\n.fa-inverse {\n  color: #fff;\n}\n\n.sr-only {\n  border: 0;\n  clip: rect(0, 0, 0, 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  clip: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  position: static;\n  width: auto;\n}\n\n.svg-inline--fa .fa-primary {\n  fill: var(--fa-primary-color, currentColor);\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa .fa-secondary {\n  fill: var(--fa-secondary-color, currentColor);\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-primary {\n  opacity: 0.4;\n  opacity: var(--fa-secondary-opacity, 0.4);\n}\n\n.svg-inline--fa.fa-swap-opacity .fa-secondary {\n  opacity: 1;\n  opacity: var(--fa-primary-opacity, 1);\n}\n\n.svg-inline--fa mask .fa-primary,\n.svg-inline--fa mask .fa-secondary {\n  fill: black;\n}\n\n.fad.fa-inverse {\n  color: #fff;\n}";

	  function css$1() {
	    var dfp = DEFAULT_FAMILY_PREFIX;
	    var drc = DEFAULT_REPLACEMENT_CLASS;
	    var fp = config.familyPrefix;
	    var rc = config.replacementClass;
	    var s = baseStyles;

	    if (fp !== dfp || rc !== drc) {
	      var dPatt = new RegExp("\\.".concat(dfp, "\\-"), 'g');
	      var customPropPatt = new RegExp("\\--".concat(dfp, "\\-"), 'g');
	      var rPatt = new RegExp("\\.".concat(drc), 'g');
	      s = s.replace(dPatt, ".".concat(fp, "-")).replace(customPropPatt, "--".concat(fp, "-")).replace(rPatt, ".".concat(rc));
	    }

	    return s;
	  }

	  var Library =
	  /*#__PURE__*/
	  function () {
	    function Library() {
	      _classCallCheck$1(this, Library);

	      this.definitions = {};
	    }

	    _createClass$1(Library, [{
	      key: "add",
	      value: function add() {
	        var _this = this;

	        for (var _len = arguments.length, definitions = new Array(_len), _key = 0; _key < _len; _key++) {
	          definitions[_key] = arguments[_key];
	        }

	        var additions = definitions.reduce(this._pullDefinitions, {});
	        Object.keys(additions).forEach(function (key) {
	          _this.definitions[key] = _objectSpread({}, _this.definitions[key] || {}, additions[key]);
	          defineIcons(key, additions[key]);
	          build();
	        });
	      }
	    }, {
	      key: "reset",
	      value: function reset() {
	        this.definitions = {};
	      }
	    }, {
	      key: "_pullDefinitions",
	      value: function _pullDefinitions(additions, definition) {
	        var normalized = definition.prefix && definition.iconName && definition.icon ? {
	          0: definition
	        } : definition;
	        Object.keys(normalized).map(function (key) {
	          var _normalized$key = normalized[key],
	              prefix = _normalized$key.prefix,
	              iconName = _normalized$key.iconName,
	              icon = _normalized$key.icon;
	          if (!additions[prefix]) additions[prefix] = {};
	          additions[prefix][iconName] = icon;
	        });
	        return additions;
	      }
	    }]);

	    return Library;
	  }();

	  function ensureCss() {
	    if (config.autoAddCss && !_cssInserted) {
	      insertCss(css$1());
	      _cssInserted = true;
	    }
	  }

	  function apiObject(val, abstractCreator) {
	    Object.defineProperty(val, 'abstract', {
	      get: abstractCreator
	    });
	    Object.defineProperty(val, 'html', {
	      get: function get() {
	        return val.abstract.map(function (a) {
	          return toHtml(a);
	        });
	      }
	    });
	    Object.defineProperty(val, 'node', {
	      get: function get() {
	        if (!IS_DOM) return;
	        var container = DOCUMENT.createElement('div');
	        container.innerHTML = val.html;
	        return container.children;
	      }
	    });
	    return val;
	  }

	  function findIconDefinition(iconLookup) {
	    var _iconLookup$prefix = iconLookup.prefix,
	        prefix = _iconLookup$prefix === void 0 ? 'fa' : _iconLookup$prefix,
	        iconName = iconLookup.iconName;
	    if (!iconName) return;
	    return iconFromMapping(library.definitions, prefix, iconName) || iconFromMapping(namespace.styles, prefix, iconName);
	  }

	  function resolveIcons(next) {
	    return function (maybeIconDefinition) {
	      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var iconDefinition = (maybeIconDefinition || {}).icon ? maybeIconDefinition : findIconDefinition(maybeIconDefinition || {});
	      var mask = params.mask;

	      if (mask) {
	        mask = (mask || {}).icon ? mask : findIconDefinition(mask || {});
	      }

	      return next(iconDefinition, _objectSpread({}, params, {
	        mask: mask
	      }));
	    };
	  }

	  var library = new Library();

	  var _cssInserted = false;
	  var icon = resolveIcons(function (iconDefinition) {
	    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var _params$transform = params.transform,
	        transform = _params$transform === void 0 ? meaninglessTransform : _params$transform,
	        _params$symbol = params.symbol,
	        symbol = _params$symbol === void 0 ? false : _params$symbol,
	        _params$mask = params.mask,
	        mask = _params$mask === void 0 ? null : _params$mask,
	        _params$title = params.title,
	        title = _params$title === void 0 ? null : _params$title,
	        _params$classes = params.classes,
	        classes = _params$classes === void 0 ? [] : _params$classes,
	        _params$attributes = params.attributes,
	        attributes = _params$attributes === void 0 ? {} : _params$attributes,
	        _params$styles = params.styles,
	        styles = _params$styles === void 0 ? {} : _params$styles;
	    if (!iconDefinition) return;
	    var prefix = iconDefinition.prefix,
	        iconName = iconDefinition.iconName,
	        icon = iconDefinition.icon;
	    return apiObject(_objectSpread({
	      type: 'icon'
	    }, iconDefinition), function () {
	      ensureCss();

	      if (config.autoA11y) {
	        if (title) {
	          attributes['aria-labelledby'] = "".concat(config.replacementClass, "-title-").concat(nextUniqueId());
	        } else {
	          attributes['aria-hidden'] = 'true';
	          attributes['focusable'] = 'false';
	        }
	      }

	      return makeInlineSvgAbstract({
	        icons: {
	          main: asFoundIcon(icon),
	          mask: mask ? asFoundIcon(mask.icon) : {
	            found: false,
	            width: null,
	            height: null,
	            icon: {}
	          }
	        },
	        prefix: prefix,
	        iconName: iconName,
	        transform: _objectSpread({}, meaninglessTransform, transform),
	        symbol: symbol,
	        title: title,
	        extra: {
	          attributes: attributes,
	          styles: styles,
	          classes: classes
	        }
	      });
	    });
	  });

	  var faCat = {
	    prefix: 'fas',
	    iconName: 'cat',
	    icon: [512, 512, [], "f6be", "M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16 16 7.16 16 16-7.16 16-16 16z"]
	  };
	  var faCoffee = {
	    prefix: 'fas',
	    iconName: 'coffee',
	    icon: [640, 512, [], "f0f4", "M192 384h192c53 0 96-43 96-96h32c70.6 0 128-57.4 128-128S582.6 32 512 32H120c-13.3 0-24 10.7-24 24v232c0 53 43 96 96 96zM512 96c35.3 0 64 28.7 64 64s-28.7 64-64 64h-32V96h32zm47.7 384H48.3c-47.6 0-61-64-36-64h583.3c25 0 11.8 64-35.9 64z"]
	  };
	  var faFutbol = {
	    prefix: 'fas',
	    iconName: 'futbol',
	    icon: [512, 512, [], "f1e3", "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zm-48 0l-.003-.282-26.064 22.741-62.679-58.5 16.454-84.355 34.303 3.072c-24.889-34.216-60.004-60.089-100.709-73.141l13.651 31.939L256 139l-74.953-41.525 13.651-31.939c-40.631 13.028-75.78 38.87-100.709 73.141l34.565-3.073 16.192 84.355-62.678 58.5-26.064-22.741-.003.282c0 43.015 13.497 83.952 38.472 117.991l7.704-33.897 85.138 10.447 36.301 77.826-29.902 17.786c40.202 13.122 84.29 13.148 124.572 0l-29.902-17.786 36.301-77.826 85.138-10.447 7.704 33.897C442.503 339.952 456 299.015 456 256zm-248.102 69.571l-29.894-91.312L256 177.732l77.996 56.527-29.622 91.312h-96.476z"]
	  };
	  var faHistory = {
	    prefix: 'fas',
	    iconName: 'history',
	    icon: [512, 512, [], "f1da", "M504 255.531c.253 136.64-111.18 248.372-247.82 248.468-59.015.042-113.223-20.53-155.822-54.911-11.077-8.94-11.905-25.541-1.839-35.607l11.267-11.267c8.609-8.609 22.353-9.551 31.891-1.984C173.062 425.135 212.781 440 256 440c101.705 0 184-82.311 184-184 0-101.705-82.311-184-184-184-48.814 0-93.149 18.969-126.068 49.932l50.754 50.754c10.08 10.08 2.941 27.314-11.313 27.314H24c-8.837 0-16-7.163-16-16V38.627c0-14.254 17.234-21.393 27.314-11.314l49.372 49.372C129.209 34.136 189.552 8 256 8c136.81 0 247.747 110.78 248 247.531zm-180.912 78.784l9.823-12.63c8.138-10.463 6.253-25.542-4.21-33.679L288 256.349V152c0-13.255-10.745-24-24-24h-16c-13.255 0-24 10.745-24 24v135.651l65.409 50.874c10.463 8.137 25.541 6.253 33.679-4.21z"]
	  };
	  var faMusic = {
	    prefix: 'fas',
	    iconName: 'music',
	    icon: [512, 512, [], "f001", "M511.99 32.01c0-21.71-21.1-37.01-41.6-30.51L150.4 96c-13.3 4.2-22.4 16.5-22.4 30.5v261.42c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64V214.31l256-75.02v184.63c-10.05-2.38-20.72-3.92-32-3.92-53.02 0-96 28.65-96 64s42.98 64 96 64 96-28.65 96-64l-.01-351.99z"]
	  };
	  var faSearch = {
	    prefix: 'fas',
	    iconName: 'search',
	    icon: [512, 512, [], "f002", "M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"]
	  };
	  var faTimes = {
	    prefix: 'fas',
	    iconName: 'times',
	    icon: [352, 512, [], "f00d", "M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"]
	  };

	  var faBuilding = {
	    prefix: 'far',
	    iconName: 'building',
	    icon: [448, 512, [], "f1ad", "M128 148v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12zm140 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-128 96h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm128 0h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm-76 84v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm76 12h40c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12zm180 124v36H0v-36c0-6.6 5.4-12 12-12h19.5V24c0-13.3 10.7-24 24-24h337c13.3 0 24 10.7 24 24v440H436c6.6 0 12 5.4 12 12zM79.5 463H192v-67c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v67h112.5V49L80 48l-.5 415z"]
	  };
	  var faFlag = {
	    prefix: 'far',
	    iconName: 'flag',
	    icon: [512, 512, [], "f024", "M336.174 80c-49.132 0-93.305-32-161.913-32-31.301 0-58.303 6.482-80.721 15.168a48.04 48.04 0 0 0 2.142-20.727C93.067 19.575 74.167 1.594 51.201.104 23.242-1.71 0 20.431 0 48c0 17.764 9.657 33.262 24 41.562V496c0 8.837 7.163 16 16 16h16c8.837 0 16-7.163 16-16v-83.443C109.869 395.28 143.259 384 199.826 384c49.132 0 93.305 32 161.913 32 58.479 0 101.972-22.617 128.548-39.981C503.846 367.161 512 352.051 512 335.855V95.937c0-34.459-35.264-57.768-66.904-44.117C409.193 67.309 371.641 80 336.174 80zM464 336c-21.783 15.412-60.824 32-102.261 32-59.945 0-102.002-32-161.913-32-43.361 0-96.379 9.403-127.826 24V128c21.784-15.412 60.824-32 102.261-32 59.945 0 102.002 32 161.913 32 43.271 0 96.32-17.366 127.826-32v240z"]
	  };
	  var faFrown = {
	    prefix: 'far',
	    iconName: 'frown',
	    icon: [496, 512, [], "f119", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160-64c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zm-80 128c-40.2 0-78 17.7-103.8 48.6-8.5 10.2-7.1 25.3 3.1 33.8 10.2 8.4 25.3 7.1 33.8-3.1 16.6-19.9 41-31.4 66.9-31.4s50.3 11.4 66.9 31.4c8.1 9.7 23.1 11.9 33.8 3.1 10.2-8.5 11.5-23.6 3.1-33.8C326 321.7 288.2 304 248 304z"]
	  };
	  var faLightbulb = {
	    prefix: 'far',
	    iconName: 'lightbulb',
	    icon: [352, 512, [], "f0eb", "M176 80c-52.94 0-96 43.06-96 96 0 8.84 7.16 16 16 16s16-7.16 16-16c0-35.3 28.72-64 64-64 8.84 0 16-7.16 16-16s-7.16-16-16-16zM96.06 459.17c0 3.15.93 6.22 2.68 8.84l24.51 36.84c2.97 4.46 7.97 7.14 13.32 7.14h78.85c5.36 0 10.36-2.68 13.32-7.14l24.51-36.84c1.74-2.62 2.67-5.7 2.68-8.84l.05-43.18H96.02l.04 43.18zM176 0C73.72 0 0 82.97 0 176c0 44.37 16.45 84.85 43.56 115.78 16.64 18.99 42.74 58.8 52.42 92.16v.06h48v-.12c-.01-4.77-.72-9.51-2.15-14.07-5.59-17.81-22.82-64.77-62.17-109.67-20.54-23.43-31.52-53.15-31.61-84.14-.2-73.64 59.67-128 127.95-128 70.58 0 128 57.42 128 128 0 30.97-11.24 60.85-31.65 84.14-39.11 44.61-56.42 91.47-62.1 109.46a47.507 47.507 0 0 0-2.22 14.3v.1h48v-.05c9.68-33.37 35.78-73.18 52.42-92.16C335.55 260.85 352 220.37 352 176 352 78.8 273.2 0 176 0z"]
	  };
	  var faSmile = {
	    prefix: 'far',
	    iconName: 'smile',
	    icon: [496, 512, [], "f118", "M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"]
	  };

	  library.add(faBuilding, faCat, faCoffee, faFlag, faFrown, faFutbol, faHistory, faLightbulb, faMusic, faSearch, faSmile, faTimes);
	  var building = icon({
	    prefix: 'far',
	    iconName: 'building'
	  }).html;
	  var cat = icon({
	    prefix: 'fas',
	    iconName: 'cat'
	  }).html;
	  var coffee = icon({
	    prefix: 'fas',
	    iconName: 'coffee'
	  }).html;
	  var flag = icon({
	    prefix: 'far',
	    iconName: 'flag'
	  }).html;
	  var futbol = icon({
	    prefix: 'fas',
	    iconName: 'futbol'
	  }).html;
	  var frown = icon({
	    prefix: 'far',
	    iconName: 'frown'
	  }).html;
	  var history = icon({
	    prefix: 'fas',
	    iconName: 'history'
	  }).html;
	  var lightbulb = icon({
	    prefix: 'far',
	    iconName: 'lightbulb'
	  }).html;
	  var music = icon({
	    prefix: 'fas',
	    iconName: 'music'
	  }).html;
	  var search = icon({
	    prefix: 'fas',
	    iconName: 'search'
	  }).html;
	  var smile = icon({
	    prefix: 'far',
	    iconName: 'smile'
	  }).html;
	  var times = icon({
	    prefix: 'fas',
	    iconName: 'times'
	  }).html;

	  var LOCAL_STORAGE_KEY = 'emojiPicker.recent';
	  function load() {
	    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
	  }
	  function save(emoji, options) {
	    var recents = load();
	    var recent = {
	      e: emoji.e,
	      n: getEmojiName(emoji),
	      k: emoji.k || getEmojiName(emoji)
	    };
	    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([recent].concat(_toConsumableArray(recents.filter(function (r) {
	      return r.k !== recent.k;
	    }))).slice(0, options.recentsCount)));
	  }

	  var CLASS_EMOJI = 'emoji-picker__emoji';
	  var Emoji =
	  /*#__PURE__*/
	  function () {
	    function Emoji(emoji, showVariants, showPreview, events, options) {
	      _classCallCheck(this, Emoji);

	      this.emoji = emoji;
	      this.showVariants = showVariants;
	      this.showPreview = showPreview;
	      this.events = events;
	      this.options = options;
	    }

	    _createClass(Emoji, [{
	      key: "render",
	      value: function render() {
	        var _this = this;

	        this.emojiButton = createElement('button', CLASS_EMOJI);
	        this.emojiButton.innerHTML = this.emoji.e;
	        this.emojiButton.tabIndex = -1;
	        this.emojiButton.addEventListener('focus', function () {
	          return _this.onEmojiHover();
	        });
	        this.emojiButton.addEventListener('blur', function () {
	          return _this.onEmojiLeave();
	        });
	        this.emojiButton.addEventListener('click', function () {
	          return _this.onEmojiClick();
	        });
	        this.emojiButton.addEventListener('mouseover', function () {
	          return _this.onEmojiHover();
	        });
	        this.emojiButton.addEventListener('mouseout', function () {
	          return _this.onEmojiLeave();
	        });
	        return this.emojiButton;
	      }
	    }, {
	      key: "onEmojiClick",
	      value: function onEmojiClick() {
	        // TODO move this side effect out of Emoji, make the recent module listen for event
	        if ((!this.emoji.v || !this.showVariants || !this.options.showVariants) && this.options.showRecents) {
	          save(this.emoji, this.options);
	        }

	        this.events.emit(EMOJI, {
	          emoji: this.emoji,
	          showVariants: this.showVariants,
	          button: this.emojiButton
	        });
	      }
	    }, {
	      key: "onEmojiHover",
	      value: function onEmojiHover() {
	        if (this.showPreview) {
	          this.events.emit(SHOW_PREVIEW, this.emoji);
	        }
	      }
	    }, {
	      key: "onEmojiLeave",
	      value: function onEmojiLeave() {
	        if (this.showPreview) {
	          this.events.emit(HIDE_PREVIEW);
	        }
	      }
	    }]);

	    return Emoji;
	  }();

	  var CLASS_EMOJI_CONTAINER = 'emoji-picker__emojis';
	  var EmojiContainer =
	  /*#__PURE__*/
	  function () {
	    function EmojiContainer(emojis, showVariants, events, options) {
	      _classCallCheck(this, EmojiContainer);

	      this.emojis = emojis.filter(function (e) {
	        return !e.ver || e.ver <= parseFloat(options.emojiVersion);
	      });
	      this.showVariants = showVariants;
	      this.events = events;
	      this.options = options;
	    }

	    _createClass(EmojiContainer, [{
	      key: "render",
	      value: function render() {
	        var _this = this;

	        var emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
	        this.emojis.forEach(function (emoji) {
	          return emojiContainer.appendChild(new Emoji(emoji, _this.showVariants, true, _this.events, _this.options).render());
	        });
	        return emojiContainer;
	      }
	    }]);

	    return EmojiContainer;
	  }();

	  var CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
	  var CLASS_SEARCH_FIELD = 'emoji-picker__search';
	  var CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
	  var CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
	  var CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';
	  var EMOJIS_PER_ROW = 8;
	  var Search =
	  /*#__PURE__*/
	  function () {
	    function Search(events, i18n, options, emojiData, autoFocusSearch) {
	      var _this = this;

	      _classCallCheck(this, Search);

	      this.events = events;
	      this.i18n = i18n;
	      this.options = options;
	      this.emojiData = emojiData.filter(function (e) {
	        return e.ver <= parseFloat(options.emojiVersion);
	      });
	      this.autoFocusSearch = autoFocusSearch;
	      this.events.on(HIDE_VARIANT_POPUP, function () {
	        setTimeout(function () {
	          return _this.setFocusedEmoji(_this.focusedEmojiIndex);
	        });
	      });
	    }

	    _createClass(Search, [{
	      key: "render",
	      value: function render() {
	        var _this2 = this;

	        this.searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);
	        this.searchField = createElement('input', CLASS_SEARCH_FIELD);
	        this.searchField.placeholder = this.i18n.search;
	        this.searchContainer.appendChild(this.searchField);
	        this.searchIcon = createElement('span', CLASS_SEARCH_ICON);
	        this.searchIcon.innerHTML = search;
	        this.searchIcon.addEventListener('click', function (event) {
	          return _this2.onClearSearch(event);
	        });
	        this.searchContainer.appendChild(this.searchIcon);

	        if (this.autoFocusSearch) {
	          setTimeout(function () {
	            return _this2.searchField.focus();
	          });
	        }

	        this.searchField.addEventListener('keydown', function (event) {
	          return _this2.onKeyDown(event);
	        });
	        this.searchField.addEventListener('keyup', function () {
	          return _this2.onKeyUp();
	        });
	        return this.searchContainer;
	      }
	    }, {
	      key: "onClearSearch",
	      value: function onClearSearch(event) {
	        var _this3 = this;

	        event.stopPropagation();

	        if (this.searchField.value) {
	          this.searchField.value = '';
	          this.resultsContainer = null;
	          this.events.emit(SHOW_TABS);
	          this.searchIcon.innerHTML = search;
	          this.searchIcon.style.cursor = 'default';
	          setTimeout(function () {
	            return _this3.searchField.focus();
	          });
	        }
	      }
	    }, {
	      key: "setFocusedEmoji",
	      value: function setFocusedEmoji(index) {
	        var emojis = this.resultsContainer.querySelectorAll('.emoji-picker__emoji');
	        var currentFocusedEmoji = emojis[this.focusedEmojiIndex];
	        currentFocusedEmoji.tabIndex = -1;
	        this.focusedEmojiIndex = index;
	        var newFocusedEmoji = emojis[this.focusedEmojiIndex];
	        newFocusedEmoji.tabIndex = 0;
	        newFocusedEmoji.focus();
	      }
	    }, {
	      key: "handleResultsKeydown",
	      value: function handleResultsKeydown(event) {
	        var emojis = this.resultsContainer.querySelectorAll('.emoji-picker__emoji');

	        if (event.key === 'ArrowRight') {
	          this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, emojis.length - 1));
	        } else if (event.key === 'ArrowLeft') {
	          this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1));
	        } else if (event.key === 'ArrowDown') {
	          event.preventDefault();

	          if (this.focusedEmojiIndex < emojis.length - EMOJIS_PER_ROW) {
	            this.setFocusedEmoji(this.focusedEmojiIndex + EMOJIS_PER_ROW);
	          }
	        } else if (event.key === 'ArrowUp') {
	          event.preventDefault();

	          if (this.focusedEmojiIndex >= EMOJIS_PER_ROW) {
	            this.setFocusedEmoji(this.focusedEmojiIndex - EMOJIS_PER_ROW);
	          }
	        } else if (event.key === 'Escape') {
	          this.onClearSearch(event);
	        }
	      }
	    }, {
	      key: "onKeyDown",
	      value: function onKeyDown(event) {
	        if (event.key === 'Escape' && this.searchField.value) {
	          this.onClearSearch(event);
	        }
	      }
	    }, {
	      key: "onKeyUp",
	      value: function onKeyUp() {
	        var _this4 = this;

	        if (!this.searchField.value) {
	          this.searchIcon.innerHTML = search;
	          this.searchIcon.style.cursor = 'default';
	          this.events.emit(SHOW_TABS);
	        } else {
	          this.searchIcon.innerHTML = times;
	          this.searchIcon.style.cursor = 'pointer';
	          this.events.emit(HIDE_TABS);
	          var searchResults = this.emojiData.filter(function (emoji) {
	            return emoji.n.filter(function (name) {
	              return name.toLowerCase().indexOf(_this4.searchField.value.toLowerCase()) >= 0;
	            }).length;
	          });
	          this.events.emit(HIDE_PREVIEW);

	          if (searchResults.length) {
	            this.resultsContainer = new EmojiContainer(searchResults, true, this.events, this.options).render();
	            this.resultsContainer.querySelector('.emoji-picker__emoji').tabIndex = 0;
	            this.focusedEmojiIndex = 0;
	            this.resultsContainer.addEventListener('keydown', function (event) {
	              return _this4.handleResultsKeydown(event);
	            });
	            this.events.emit(SHOW_SEARCH_RESULTS, this.resultsContainer);
	          } else {
	            this.events.emit(SHOW_SEARCH_RESULTS, new NotFoundMessage(this.i18n.notFound).render());
	          }
	        }
	      }
	    }]);

	    return Search;
	  }();

	  var NotFoundMessage =
	  /*#__PURE__*/
	  function () {
	    function NotFoundMessage(message) {
	      _classCallCheck(this, NotFoundMessage);

	      this.message = message;
	    }

	    _createClass(NotFoundMessage, [{
	      key: "render",
	      value: function render() {
	        var container = createElement('div', CLASS_NOT_FOUND);
	        var iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
	        iconContainer.innerHTML = frown;
	        container.appendChild(iconContainer);
	        var messageContainer = createElement('h2');
	        messageContainer.innerHTML = this.message;
	        container.appendChild(messageContainer);
	        return container;
	      }
	    }]);

	    return NotFoundMessage;
	  }();

	  var i18n = {
	    search: 'Search emojis...',
	    categories: {
	      recents: 'Recent Emojis',
	      smileys: 'Smileys & People',
	      animals: 'Animals & Nature',
	      food: 'Food & Drink',
	      activities: 'Activities',
	      travel: 'Travel & Places',
	      objects: 'Objects',
	      symbols: 'Symbols',
	      flags: 'Flags'
	    },
	    notFound: 'No emojis found'
	  };

	  var CLASS_ACTIVE_TAB = 'active';
	  var CLASS_TABS_CONTAINER = 'emoji-picker__tabs-container';
	  var CLASS_TABS = 'emoji-picker__tabs';
	  var CLASS_TAB = 'emoji-picker__tab';
	  var CLASS_TAB_BODY = 'emoji-picker__tab-body';
	  var EMOJIS_PER_ROW$1 = 8;
	  var emojiCategories = {};
	  emojiData.forEach(function (emoji) {
	    var categoryList = emojiCategories[categories[emoji.c]];

	    if (!categoryList) {
	      categoryList = emojiCategories[categories[emoji.c]] = [];
	    }

	    categoryList.push(emoji);
	  });
	  var categoryIcons = {
	    smileys: smile,
	    animals: cat,
	    food: coffee,
	    activities: futbol,
	    travel: building,
	    objects: lightbulb,
	    symbols: music,
	    flags: flag
	  };
	  var Tabs =
	  /*#__PURE__*/
	  function () {
	    function Tabs(events, i18n, options) {
	      _classCallCheck(this, Tabs);

	      this.events = events;
	      this.i18n = i18n;
	      this.options = options;
	      this.setActiveTab = this.setActiveTab.bind(this);
	    }

	    _createClass(Tabs, [{
	      key: "setActiveTab",
	      value: function setActiveTab(index) {
	        var animate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	        if (index === this.activeTab) {
	          return;
	        }

	        var currentActiveTab = this.activeTab;
	        var newActiveTabBody = this.tabBodies[index].container;

	        if (currentActiveTab >= 0) {
	          this.tabs[currentActiveTab].setActive(false);
	          this.tabBodies[currentActiveTab].setActive(false);
	          var currentActiveTabBody = this.tabBodies[currentActiveTab].container;
	          currentActiveTabBody.querySelectorAll('.emoji-picker__emoji').forEach(function (emoji) {
	            return emoji.tabIndex = -1;
	          });
	          var activeEmojiContainer = newActiveTabBody.querySelector('.emoji-picker__emojis');
	          activeEmojiContainer.scrollTop = 0;
	          var firstEmoji = activeEmojiContainer.querySelector('.emoji-picker__emoji');

	          if (firstEmoji) {
	            firstEmoji.tabIndex = 0;
	          }

	          this.focusedEmojiIndex = 0;

	          if (animate) {
	            if (index > currentActiveTab) {
	              this.transitionTabs(newActiveTabBody, currentActiveTabBody, 25, -25);
	            } else {
	              this.transitionTabs(newActiveTabBody, currentActiveTabBody, -25, 25);
	            }
	          }
	        }

	        this.activeTab = index;
	        this.tabBodies[this.activeTab].setActive(true);
	        this.tabs[this.activeTab].setActive(true);
	      }
	    }, {
	      key: "transitionTabs",
	      value: function transitionTabs(newActiveTabBody, currentActiveTabBody, newTranslate, currentTranslate) {
	        requestAnimationFrame(function () {
	          newActiveTabBody.style.transition = 'none';
	          newActiveTabBody.style.transform = "translateX(".concat(newTranslate, "rem)");
	          requestAnimationFrame(function () {
	            currentActiveTabBody.style.transform = "translateX(".concat(currentTranslate, "rem)");
	            newActiveTabBody.style.transition = 'transform 0.25s';
	            requestAnimationFrame(function () {
	              newActiveTabBody.style.transform = 'translateX(0)';
	            });
	          });
	        });
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var tabsContainer = createElement('div', CLASS_TABS_CONTAINER);
	        tabsContainer.appendChild(this.createTabs());
	        tabsContainer.appendChild(this.createTabBodies());
	        var initialActiveTab = this.options.showRecents ? 1 : 0;
	        this.setActiveTab(initialActiveTab, false);
	        var firstEmoji = this.tabBodies[initialActiveTab].content.querySelector('.emoji-picker__emoji');

	        if (firstEmoji) {
	          firstEmoji.tabIndex = 0;
	        }

	        this.focusedEmojiIndex = 0;
	        return tabsContainer;
	      }
	    }, {
	      key: "setFocusedEmoji",
	      value: function setFocusedEmoji(index) {
	        var emojis = this.tabBodies[this.activeTab].content.querySelectorAll('.emoji-picker__emoji');
	        var currentFocusedEmoji = emojis[this.focusedEmojiIndex];
	        currentFocusedEmoji.tabIndex = -1;
	        this.focusedEmojiIndex = index;
	        var newFocusedEmoji = emojis[this.focusedEmojiIndex];
	        newFocusedEmoji.tabIndex = 0;
	        newFocusedEmoji.focus();
	      }
	    }, {
	      key: "createTabs",
	      value: function createTabs() {
	        var _this = this;

	        this.tabsList = createElement('ul', CLASS_TABS);
	        this.tabs = Object.keys(categoryIcons).map(function (category, index) {
	          return new Tab(categoryIcons[category], _this.options.showRecents ? index + 1 : index, _this.setActiveTab);
	        });

	        if (this.options.showRecents) {
	          var recentTab = new Tab(history, 0, this.setActiveTab);
	          this.tabs.splice(0, 0, recentTab);
	        }

	        this.tabs.forEach(function (tab) {
	          return _this.tabsList.appendChild(tab.render());
	        });
	        this.tabsList.addEventListener('keydown', function (event) {
	          if (event.key === 'ArrowLeft') {
	            _this.setActiveTab(_this.activeTab === 0 ? _this.tabs.length - 1 : _this.activeTab - 1);
	          } else if (event.key === 'ArrowRight') {
	            _this.setActiveTab((_this.activeTab + 1) % _this.tabs.length);
	          }
	        });
	        return this.tabsList;
	      }
	    }, {
	      key: "createTabBodies",
	      value: function createTabBodies() {
	        var _this2 = this;

	        this.tabBodyContainer = createElement('div');
	        this.tabBodies = Object.keys(categoryIcons).map(function (category, index) {
	          return new TabBody(_this2.i18n.categories[category] || i18n.categories[category], new EmojiContainer(emojiCategories[category], true, _this2.events, _this2.options).render(), _this2.options.showRecents ? index + 1 : index);
	        });
	        this.tabBodyContainer.addEventListener('keydown', function (event) {
	          var emojis = _this2.tabBodies[_this2.activeTab].content.querySelectorAll('.emoji-picker__emoji');

	          if (event.key === 'ArrowRight') {
	            _this2.setFocusedEmoji(Math.min(_this2.focusedEmojiIndex + 1, emojis.length - 1));
	          } else if (event.key === 'ArrowLeft') {
	            _this2.setFocusedEmoji(Math.max(0, _this2.focusedEmojiIndex - 1));
	          } else if (event.key === 'ArrowDown') {
	            event.preventDefault();

	            if (_this2.focusedEmojiIndex < emojis.length - EMOJIS_PER_ROW$1) {
	              _this2.setFocusedEmoji(_this2.focusedEmojiIndex + EMOJIS_PER_ROW$1);
	            }
	          } else if (event.key === 'ArrowUp') {
	            event.preventDefault();

	            if (_this2.focusedEmojiIndex >= EMOJIS_PER_ROW$1) {
	              _this2.setFocusedEmoji(_this2.focusedEmojiIndex - EMOJIS_PER_ROW$1);
	            }
	          }
	        });
	        this.events.on(HIDE_VARIANT_POPUP, function () {
	          setTimeout(function () {
	            return _this2.setFocusedEmoji(_this2.focusedEmojiIndex);
	          });
	        });
	        this.events.on(EMOJI, function (_ref) {
	          var button = _ref.button;

	          if (button.parentElement.classList.contains('emoji-picker__emojis')) {
	            _this2.setFocusedEmoji(Array.prototype.indexOf.call(button.parentElement.children, button));
	          } else {
	            _this2.setFocusedEmoji(_this2.focusedEmojiIndex);
	          }
	        });

	        if (this.options.showRecents) {
	          var recentTabBody = new TabBody(this.i18n.categories.recents || i18n.categories.recents, new EmojiContainer(load(), false, this.events, this.options).render(), 0);
	          this.tabBodies.splice(0, 0, recentTabBody);
	          this.events.on(EMOJI, function () {
	            var newRecents = new TabBody(_this2.i18n.categories.recents || i18n.categories.recents, new EmojiContainer(load(), false, _this2.events, _this2.options).render(), 0);
	            var newRecentsEl = newRecents.render();

	            if (_this2.activeTab === 0) {
	              newRecentsEl.style.transform = 'translateX(0)';
	            }

	            setTimeout(function () {
	              _this2.tabBodyContainer.replaceChild(newRecentsEl, _this2.tabBodyContainer.firstChild);

	              _this2.tabBodies[0] = newRecents;

	              if (_this2.activeTab === 0) {
	                _this2.setActiveTab(0);
	              }
	            });
	          });
	        }

	        this.tabBodies.forEach(function (tabBody) {
	          return _this2.tabBodyContainer.appendChild(tabBody.render());
	        });
	        return this.tabBodyContainer;
	      }
	    }]);

	    return Tabs;
	  }();

	  var Tab =
	  /*#__PURE__*/
	  function () {
	    function Tab(icon, index, setActiveTab) {
	      _classCallCheck(this, Tab);

	      this.icon = icon;
	      this.index = index;
	      this.setActiveTab = setActiveTab;
	    }

	    _createClass(Tab, [{
	      key: "render",
	      value: function render() {
	        var _this3 = this;

	        this.tab = createElement('li', CLASS_TAB);
	        this.tab.innerHTML = this.icon;
	        this.tab.addEventListener('click', function () {
	          return _this3.setActiveTab(_this3.index);
	        });
	        return this.tab;
	      }
	    }, {
	      key: "setActive",
	      value: function setActive(active) {
	        if (active) {
	          this.tab.classList.add(CLASS_ACTIVE_TAB);
	          this.tab.tabIndex = 0;
	          this.tab.focus();
	        } else {
	          this.tab.classList.remove(CLASS_ACTIVE_TAB);
	          this.tab.tabIndex = -1;
	        }
	      }
	    }]);

	    return Tab;
	  }();

	  var TabBody =
	  /*#__PURE__*/
	  function () {
	    function TabBody(category, content, index) {
	      _classCallCheck(this, TabBody);

	      this.category = category;
	      this.content = content;
	      this.index = index;
	    }

	    _createClass(TabBody, [{
	      key: "render",
	      value: function render() {
	        this.container = createElement('div', CLASS_TAB_BODY);
	        var title = createElement('h2');
	        title.innerHTML = this.category;
	        this.container.appendChild(title);
	        this.container.appendChild(this.content);
	        return this.container;
	      }
	    }, {
	      key: "setActive",
	      value: function setActive(active) {
	        if (active) {
	          this.container.classList.add(CLASS_ACTIVE_TAB);
	        } else {
	          this.container.classList.remove(CLASS_ACTIVE_TAB);
	        }
	      }
	    }]);

	    return TabBody;
	  }();

	  var CLASS_OVERLAY = 'emoji-picker__variant-overlay';
	  var CLASS_POPUP = 'emoji-picker__variant-popup';
	  var CLASS_CLOSE_BUTTON = 'emoji-picker__variant-popup-close-button';
	  var VariantPopup =
	  /*#__PURE__*/
	  function () {
	    function VariantPopup(events, emoji, options) {
	      _classCallCheck(this, VariantPopup);

	      this.events = events;
	      this.emoji = emoji;
	      this.options = options;
	    }

	    _createClass(VariantPopup, [{
	      key: "getEmoji",
	      value: function getEmoji(index) {
	        return this.popup.querySelectorAll('.emoji-picker__emoji')[index];
	      }
	    }, {
	      key: "setFocusedEmoji",
	      value: function setFocusedEmoji(newIndex) {
	        var currentFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
	        currentFocusedEmoji.tabIndex = -1;
	        this.focusedEmojiIndex = newIndex;
	        var newFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
	        newFocusedEmoji.tabIndex = 0;
	        newFocusedEmoji.focus();
	      }
	    }, {
	      key: "render",
	      value: function render() {
	        var _this = this;

	        this.popup = createElement('div', CLASS_POPUP);
	        var overlay = createElement('div', CLASS_OVERLAY);
	        overlay.addEventListener('click', function (event) {
	          event.stopPropagation();

	          if (!_this.popup.contains(event.target)) {
	            _this.events.emit(HIDE_VARIANT_POPUP);
	          }
	        });
	        this.popup.appendChild(new Emoji(this.emoji, false, false, this.events, this.options).render());
	        Object.keys(this.emoji.v).forEach(function (variant) {
	          _this.popup.appendChild(new Emoji(_this.emoji.v[variant], false, false, _this.events, _this.options).render());
	        });
	        var firstEmoji = this.popup.querySelector('.emoji-picker__emoji');
	        this.focusedEmojiIndex = 0;
	        firstEmoji.tabIndex = 0;
	        setTimeout(function () {
	          return firstEmoji.focus();
	        });
	        this.popup.addEventListener('keydown', function (event) {
	          if (event.key === 'ArrowRight') {
	            _this.setFocusedEmoji(Math.min(_this.focusedEmojiIndex + 1, _this.popup.querySelectorAll('.emoji-picker__emoji').length - 1));
	          } else if (event.key === 'ArrowLeft') {
	            _this.setFocusedEmoji(Math.max(_this.focusedEmojiIndex - 1, 0));
	          } else if (event.key === 'Escape') {
	            event.stopPropagation();

	            _this.events.emit(HIDE_VARIANT_POPUP);
	          }
	        });
	        var closeButton = createElement('button', CLASS_CLOSE_BUTTON);
	        closeButton.innerHTML = times;
	        closeButton.addEventListener('click', function (event) {
	          event.stopPropagation();

	          _this.events.emit(HIDE_VARIANT_POPUP);
	        });
	        this.popup.appendChild(closeButton);
	        overlay.appendChild(this.popup);
	        return overlay;
	      }
	    }]);

	    return VariantPopup;
	  }();

	  var CLASS_PICKER = 'emoji-picker';
	  var CLASS_PICKER_CONTENT = 'emoji-picker__content';
	  var DEFAULT_OPTIONS$1 = {
	    position: 'right-start',
	    autoHide: true,
	    autoFocusSearch: true,
	    showPreview: true,
	    showSearch: true,
	    showRecents: true,
	    showVariants: true,
	    recentsCount: 50,
	    emojiVersion: '12.1'
	  };

	  var EmojiButton =
	  /*#__PURE__*/
	  function () {
	    function EmojiButton() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      _classCallCheck(this, EmojiButton);

	      this.pickerVisible = false;
	      this.options = _objectSpread2({}, DEFAULT_OPTIONS$1, {}, options);

	      if (!this.options.rootElement) {
	        this.options.rootElement = document.body;
	      }

	      this.i18n = _objectSpread2({}, i18n, {}, options.i18n);
	      this.onDocumentClick = this.onDocumentClick.bind(this);
	      this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
	      this.events = new tinyEmitter();
	      this.publicEvents = new tinyEmitter();
	    }

	    _createClass(EmojiButton, [{
	      key: "on",
	      value: function on(event, callback) {
	        this.publicEvents.on(event, callback);
	      }
	    }, {
	      key: "off",
	      value: function off(event, callback) {
	        this.publicEvents.off(event, callback);
	      }
	    }, {
	      key: "buildPicker",
	      value: function buildPicker() {
	        var _this = this;

	        this.pickerEl = createElement('div', CLASS_PICKER);
	        this.focusTrap = focusTrap_1(this.pickerEl, {
	          clickOutsideDeactivates: true
	        });

	        if (this.options.zIndex) {
	          this.pickerEl.style.zIndex = this.options.zIndex;
	        }

	        var pickerContent = createElement('div', CLASS_PICKER_CONTENT);

	        if (this.options.showSearch) {
	          var searchContainer = new Search(this.events, this.i18n, this.options, emojiData, this.options.autoFocusSearch).render();
	          this.pickerEl.appendChild(searchContainer);
	        }

	        this.pickerEl.appendChild(pickerContent);
	        var tabs = new Tabs(this.events, this.i18n, this.options).render();
	        pickerContent.appendChild(tabs);
	        this.events.on(HIDE_TABS, function () {
	          if (pickerContent.contains(tabs)) {
	            pickerContent.removeChild(tabs);
	          }
	        });
	        this.events.on(SHOW_TABS, function () {
	          if (!pickerContent.contains(tabs)) {
	            empty(pickerContent);
	            pickerContent.appendChild(tabs);
	          }
	        });
	        this.events.on(SHOW_SEARCH_RESULTS, function (searchResults) {
	          empty(pickerContent);
	          searchResults.classList.add('search-results');
	          pickerContent.appendChild(searchResults);
	        });

	        if (this.options.showPreview) {
	          this.pickerEl.appendChild(new EmojiPreview(this.events).render());
	        }

	        var variantPopup;
	        this.events.on(EMOJI, function (_ref) {
	          var emoji = _ref.emoji,
	              showVariants = _ref.showVariants;

	          if (emoji.v && showVariants && _this.options.showVariants) {
	            variantPopup = new VariantPopup(_this.events, emoji, _this.options).render();

	            _this.pickerEl.appendChild(variantPopup);
	          } else {
	            if (variantPopup && variantPopup.parentNode === _this.pickerEl) {
	              _this.pickerEl.removeChild(variantPopup);
	            }

	            _this.publicEvents.emit('emoji', emoji.e);

	            if (_this.options.autoHide) {
	              _this.hidePicker();
	            }
	          }
	        });
	        this.events.on(HIDE_VARIANT_POPUP, function () {
	          _this.pickerEl.removeChild(variantPopup);

	          variantPopup = null;
	        });
	        this.options.rootElement.appendChild(this.pickerEl);
	        setTimeout(function () {
	          document.addEventListener('click', _this.onDocumentClick);
	          document.addEventListener('keydown', _this.onDocumentKeydown);
	        });
	      }
	    }, {
	      key: "onDocumentClick",
	      value: function onDocumentClick(event) {
	        if (!this.pickerEl.contains(event.target)) {
	          this.hidePicker();
	        }
	      }
	    }, {
	      key: "destroyPicker",
	      value: function destroyPicker() {
	        this.options.rootElement.removeChild(this.pickerEl);
	        this.popper.destroy();
	        this.pickerEl.style.transition = '';
	        this.hideInProgress = false;
	      }
	    }, {
	      key: "hidePicker",
	      value: function hidePicker() {
	        this.focusTrap.deactivate();
	        this.pickerEl.classList.remove('visible');
	        this.pickerVisible = false;
	        this.events.off(EMOJI);
	        this.events.off(HIDE_VARIANT_POPUP);
	        this.hideInProgress = true;
	        this.destroyTimeout = setTimeout(this.destroyPicker.bind(this), 500);
	        document.removeEventListener('click', this.onDocumentClick);
	        document.removeEventListener('keydown', this.onDocumentKeydown);
	      }
	    }, {
	      key: "showPicker",
	      value: function showPicker(referenceEl) {
	        var _this2 = this;

	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	        if (this.hideInProgress) {
	          clearTimeout(this.destroyTimeout);
	          this.destroyPicker();
	        }

	        this.pickerVisible = true;
	        this.buildPicker();
	        this.popper = createPopper(referenceEl, this.pickerEl, {
	          placement: options.position || this.options.position
	        });
	        this.focusTrap.activate();
	        requestAnimationFrame(function () {
	          return _this2.pickerEl.classList.add('visible');
	        });
	      }
	    }, {
	      key: "onDocumentKeydown",
	      value: function onDocumentKeydown(event) {
	        if (event.key === 'Escape') {
	          this.hidePicker();
	        }
	      }
	    }]);

	    return EmojiButton;
	  }();

	  return EmojiButton;

	}));
	});

	if (location.hostname === 'localhost') {
	  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
	  ':35729/livereload.js?snipver=1"></' + 'script>');
	}

	window.addEventListener('DOMContentLoaded', function () {
	  var button = document.querySelector('#emoji-button');
	  var picker = new dist();

	  picker.on('emoji', function (emoji) {
	    document.querySelector('input').value += emoji;
	  });

	  button.addEventListener('click', function () {
	    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(button);
	  });
	});

	var src = {

	};

	return src;

}());
