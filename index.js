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
	    /*! *****************************************************************************
	    Copyright (c) Microsoft Corporation. All rights reserved.
	    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	    this file except in compliance with the License. You may obtain a copy of the
	    License at http://www.apache.org/licenses/LICENSE-2.0

	    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	    MERCHANTABLITY OR NON-INFRINGEMENT.

	    See the Apache Version 2.0 License for specific language governing permissions
	    and limitations under the License.
	    ***************************************************************************** */

	    var __assign = function() {
	        __assign = Object.assign || function __assign(t) {
	            for (var s, i = 1, n = arguments.length; i < n; i++) {
	                s = arguments[i];
	                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	            }
	            return t;
	        };
	        return __assign.apply(this, arguments);
	    };

	    function __spreadArrays() {
	        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
	        for (var r = Array(s), k = 0, i = 0; i < il; i++)
	            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
	                r[k] = a[j];
	        return r;
	    }

	    function styleInject(css, ref) {
	      if ( ref === void 0 ) ref = {};
	      var insertAt = ref.insertAt;

	      if (!css || typeof document === 'undefined') { return; }

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

	    var css = "@keyframes show {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8);\n  }\n\n  50% {\n    transform: scale3d(1.05, 1.05, 1.05);\n  }\n\n  100% {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n@keyframes hide {\n  0% {\n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n\n  100% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8);\n  }\n}\n\n@keyframes grow {\n  0% {\n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8); \n  }\n\n  100% { \n    opacity: 1;\n    transform: scale3d(1, 1, 1); \n  }\n}\n\n@keyframes shrink {\n  0% { \n    opacity: 1;\n    transform: scale3d(1, 1, 1);\n  }\n\n  100% { \n    opacity: 0;\n    transform: scale3d(0.8, 0.8, 0.8); \n  }\n}\n\n@keyframes fade-in {\n  0% { opacity: 0; }\n  100% { opacity: 1; }\n}\n\n@keyframes fade-out {\n  0% { opacity: 1; }\n  100% { opacity: 0; }\n}\n\n.emoji-picker {\n  --animation-duration: 0.2s;\n  --animation-easing: ease-in-out;\n\n  --emoji-size: 1.8em;\n  --emoji-size-multiplier: 1.5;\n  --emoji-preview-size: 2em;\n  --emoji-per-row: 8;\n  --row-count: 6;\n\n  --content-height: calc((var(--emoji-size) * var(--emoji-size-multiplier)) * var(--row-count) + var(--category-name-size) + var(--category-button-height) + 0.5em);\n\n  --category-name-size: 0.85em;\n\n  --category-button-height: 2em;\n  --category-button-size: 1.1em;\n  --category-border-bottom-size: 4px;\n\n  --focus-indicator-color: #999999;\n\n  --search-height: 2em;\n\n  --blue-color: #4F81E5;\n\n  --border-color: #CCCCCC;\n  --background-color: #FFFFFF;\n  --text-color: #000000;\n  --secondary-text-color: #666666;\n  --hover-color: #E8F4F9;\n  --search-focus-border-color: var(--blue-color);\n  --search-icon-color: #CCCCCC;\n  --overlay-background-color: rgba(0, 0, 0, 0.8);\n  --popup-background-color: #FFFFFF;\n  --category-button-color: #666666;\n  --category-button-active-color: var(--blue-color);\n\n  --dark-border-color: #666666;\n  --dark-background-color: #333333;\n  --dark-text-color: #FFFFFF;\n  --dark-secondary-text-color: #999999;\n  --dark-hover-color: #666666;\n  --dark-search-background-color: #666666;\n  --dark-search-border-color: #999999;\n  --dark-search-placeholder-color: #999999;\n  --dark-search-focus-border-color: #DBE5F9;\n  --dark-popup-background-color: #333333;\n  --dark-category-button-color: #FFFFFF;\n}\n\n.emoji-picker {\n  font-size: 16px;\n\n  border: 1px solid var(--border-color);\n  border-radius: 5px;\n  background: var(--background-color);\n  width: calc(var(--emoji-per-row) * var(--emoji-size) * var(--emoji-size-multiplier) + 1em + 2px);\n  font-family: Arial, Helvetica, sans-serif;\n  overflow: hidden;\n  animation: show var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker.hiding {\n  animation: hide var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker.dark {\n  background: var(--dark-background-color);\n  color: var(--dark-text-color);\n  border-color: var(--dark-border-color);\n}\n\n.emoji-picker__content {\n  padding: 0.5em;\n  height: var(--content-height);\n  position: relative;\n}\n\n.emoji-picker__preview {\n  height: var(--emoji-preview-size);\n  padding: 0.5em;\n  border-top: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.emoji-picker.dark .emoji-picker__preview {\n  border-top-color: var(--dark-border-color);\n}\n\n.emoji-picker__preview-emoji {\n  font-size: var(--emoji-preview-size);\n  margin-right: 0.25em;\n  font-family: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\";\n}\n\n.emoji-picker__preview-emoji img.emoji {\n  height: 1em;\n  width: 1em;\n  margin: 0 .05em 0 .1em;\n  vertical-align: -0.1em;\n}\n\n.emoji-picker__preview-name {\n  color: var(--text-color);\n  font-size: 0.85em;\n  overflow-wrap: break-word;\n  word-break: break-all;\n}\n\n.emoji-picker.dark .emoji-picker__preview-name {\n  color: var(--dark-text-color);\n}\n\n.emoji-picker__container {\n  display: grid;\n  grid-template-columns: repeat(var(--emoji-per-row), 1fr);\n  grid-auto-rows: calc(var(--emoji-size) * var(--emoji-size-multiplier));\n}\n\n.emoji-picker__container.search-results {\n  height: var(--content-height);\n  overflow-y: scroll;\n}\n\n.emoji-picker__emoji {\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  font-size: var(--emoji-size);\n  width: 1.5em;\n  height: 1.5em;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  font-family: \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Segoe UI\", \"Apple Color Emoji\", \"Twemoji Mozilla\", \"Noto Color Emoji\", \"EmojiOne Color\", \"Android Emoji\";\n}\n\n.emoji-picker__emoji img.emoji {\n  height: 1em;\n  width: 1em;\n  margin: 0 .05em 0 .1em;\n  vertical-align: -0.1em;\n}\n\n.emoji-picker__emoji:focus, .emoji-picker__emoji:hover {\n  background: var(--hover-color);\n}\n\n.emoji-picker__emoji:focus {\n  outline: 1px dotted var(--focus-indicator-color);\n}\n\n.emoji-picker.dark .emoji-picker__emoji:focus, .emoji-picker.dark .emoji-picker__emoji:hover {\n  background: var(--dark-hover-color);\n}\n\n.emoji-picker__search-container {\n  margin: 0.5em;\n  position: relative;\n  height: var(--search-height);\n  display: flex;\n}\n\n.emoji-picker__search {\n  box-sizing: border-box;\n  width: 100%;\n  border-radius: 3px;\n  border: 1px solid var(--border-color);\n  padding-right: 2em;\n  padding: 0.5em 2.25em 0.5em 0.5em;\n  font-size: 0.85em;\n  outline: none;\n}\n\n.emoji-picker.dark .emoji-picker__search {\n  background: var(--dark-search-background-color);\n  color: var(--dark-text-color);\n  border-color: var(--dark-search-border-color);\n}\n\n.emoji-picker.dark .emoji-picker__search::placeholder {\n  color: var(--dark-search-placeholder-color);\n}\n\n.emoji-picker__search:focus {\n  border: 1px solid var(--search-focus-border-color);\n}\n\n.emoji-picker.dark .emoji-picker__search:focus {\n  border-color: var(--dark-search-focus-border-color);\n}\n\n.emoji-picker__search-icon {\n  position: absolute;\n  color: var(--search-icon-color);\n  width: 1em;\n  height: 1em;\n  right: 0.75em;\n  top: calc(50% - 0.5em);\n}\n\n.emoji-picker__search-not-found {\n  color: var(--secondary-text-color);\n  text-align: center;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.emoji-picker__search-not-found h2 {\n  color: var(--secondary-text-color);\n}\n\n.emoji-picker.dark .emoji-picker__search-not-found {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker.dark .emoji-picker__search-not-found h2 {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker__search-not-found-icon {\n  font-size: 3em;\n}\n\n.emoji-picker__search-not-found h2 {\n  margin: 0.5em 0;\n  font-size: 1em;\n}\n\n.emoji-picker__variant-overlay {\n  background: var(--overlay-background-color);\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  animation: fade-in var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker__variant-overlay.hiding {\n  animation: fade-out var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker__variant-popup {\n  background: var(--popup-background-color);\n  margin: 0.5em;\n  padding: 0.5em;\n  text-align: center;\n  border-radius: 5px;\n  animation: grow var(--animation-duration) var(--animation-easing);\n  user-select: none;\n}\n\n.emoji-picker__variant-overlay.hiding .emoji-picker__variant-popup {\n  animation: shrink var(--animation-duration) var(--animation-easing);\n}\n\n.emoji-picker.dark .emoji-picker__variant-popup {\n  background: var(--dark-popup-background-color);\n}\n\n.emoji-picker__emojis {\n  overflow-y: scroll;\n  position: relative;\n  height: calc((var(--emoji-size) * var(--emoji-size-multiplier)) * var(--row-count) + var(--category-name-size));\n  padding-left: 1px;\n  padding-right: 1px;\n}\n\n.emoji-picker__emojis.hiding {\n  animation: fade-out 0.05s var(--animation-easing);\n}\n\n.emoji-picker__emojis h2.emoji-picker__category-name {\n  font-size: 0.85em;\n  color: var(--secondary-text-color);\n  text-transform: uppercase;\n  margin: 0.25em 0;\n  text-align: left;\n}\n\n.emoji-picker.dark h2.emoji-picker__category-name {\n  color: var(--dark-secondary-text-color);\n}\n\n.emoji-picker__category-buttons {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  height: var(--category-button-height);\n  margin-bottom: 0.5em;\n}\n\nbutton.emoji-picker__category-button {\n  flex-grow: 1;\n  background: transparent;\n  border: none;\n  cursor: pointer;\n  font-size: var(--category-button-size);\n  vertical-align: middle;\n  color: var(--category-button-color);\n  border-bottom: var(--category-border-bottom-size) solid transparent;\n  outline: none;\n}\n\n.emoji-picker.keyboard button.emoji-picker__category-button:focus {\n  outline: 1px dotted var(--focus-indicator-color);\n}\n\n.emoji-picker.dark button.emoji-picker__category-button.active {\n  color: var(--category-button-active-color);\n}\n\n.emoji-picker.dark button.emoji-picker__category-button {\n  color: var(--dark-category-button-color);\n}\n\nbutton.emoji-picker__category-button.active {\n  color: var(--category-button-active-color);\n  border-bottom: var(--category-border-bottom-size) solid var(--category-button-active-color);\n}\n\n@media (prefers-color-scheme: dark) {\n  .emoji-picker.auto {\n    background: var(--dark-background-color);\n    color: var(--dark-text-color);\n    border-color: var(--dark-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__preview {\n    border-top-color: var(--dark-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__preview-name {\n    color: var(--dark-text-color);\n  }\n\n  .emoji-picker.auto button.emoji-picker__category-button {\n    color: var(--dark-category-button-color);\n  }\n\n  .emoji-picker.auto button.emoji-picker__category-button.active {\n    color: var(--category-button-active-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__emoji:focus, .emoji-picker.auto .emoji-picker__emoji:hover {\n    background: var(--dark-hover-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search {\n    background: var(--dark-search-background-color);\n    color: var(--dark-text-color);\n    border-color: var(--dark-search-border-color);\n  }\n \n  .emoji-picker.auto h2.emoji-picker__category-name {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search::placeholder {\n    color: var(--dark-search-placeholder-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search:focus {\n    border-color: var(--dark-search-focus-border-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search-not-found {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__search-not-found h2 {\n    color: var(--dark-secondary-text-color);\n  }\n\n  .emoji-picker.auto .emoji-picker__variant-popup {\n    background: var(--dark-popup-background-color);\n  }\n}";
	    styleInject(css);

	    var candidateSelectors = [
	      'input',
	      'select',
	      'textarea',
	      'a[href]',
	      'button',
	      '[tabindex]',
	      'audio[controls]',
	      'video[controls]',
	      '[contenteditable]:not([contenteditable="false"])',
	    ];
	    var candidateSelector = candidateSelectors.join(',');

	    var matches = typeof Element === 'undefined'
	      ? function () {}
	      : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;

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
	            node: candidate,
	          });
	        }
	      }

	      var tabbableNodes = orderedTabbables
	        .sort(sortOrderedTabbables)
	        .map(function(a) { return a.node })
	        .concat(regularTabbables);

	      return tabbableNodes;
	    }

	    tabbable.isTabbable = isTabbable;
	    tabbable.isFocusable = isFocusable;

	    function isNodeMatchingSelectorTabbable(node) {
	      if (
	        !isNodeMatchingSelectorFocusable(node)
	        || isNonTabbableRadio(node)
	        || getTabindex(node) < 0
	      ) {
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
	      if (
	        node.disabled
	        || isHiddenInput(node)
	        || isHidden(node)
	      ) {
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
	      if (!isNaN(tabindexAttr)) return tabindexAttr;
	      // Browsers do not return `tabIndex` correctly for contentEditable nodes;
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
	      if (!node.name) return true;
	      // This won't account for the edge case where you have radio groups with the same
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

	        return target
	    }

	    var activeFocusDelay;

	    var activeFocusTraps = (function() {
	      var trapQueue = [];
	      return {
	        activateTrap: function(trap) {
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

	        deactivateTrap: function(trap) {
	          var trapIndex = trapQueue.indexOf(trap);
	          if (trapIndex !== -1) {
	            trapQueue.splice(trapIndex, 1);
	          }

	          if (trapQueue.length > 0) {
	            trapQueue[trapQueue.length - 1].unpause();
	          }
	        }
	      };
	    })();

	    function focusTrap(element, userOptions) {
	      var doc = document;
	      var container =
	        typeof element === 'string' ? doc.querySelector(element) : element;

	      var config = immutable(
	        {
	          returnFocusOnDeactivate: true,
	          escapeDeactivates: true
	        },
	        userOptions
	      );

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

	        var onActivate =
	          activateOptions && activateOptions.onActivate
	            ? activateOptions.onActivate
	            : config.onActivate;
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

	        var onDeactivate =
	          deactivateOptions && deactivateOptions.onDeactivate !== undefined
	            ? deactivateOptions.onDeactivate
	            : config.onDeactivate;
	        if (onDeactivate) {
	          onDeactivate();
	        }

	        var returnFocus =
	          deactivateOptions && deactivateOptions.returnFocus !== undefined
	            ? deactivateOptions.returnFocus
	            : config.returnFocusOnDeactivate;
	        if (returnFocus) {
	          delay(function() {
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
	        if (!state.active) return;

	        // There can be only one listening focus trap at a time
	        activeFocusTraps.activateTrap(trap);

	        // Delay ensures that the focused element doesn't capture the event
	        // that caused the focus trap activation.
	        activeFocusDelay = delay(function() {
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
	          throw new Error(
	            'Your focus-trap needs to have at least one focusable element'
	          );
	        }

	        return node;
	      }

	      function getReturnFocusNode(previousActiveElement) {
	        var node = getNodeForOption('setReturnFocus');
	        return node ? node : previousActiveElement;
	      }

	      // This needs to be done on mousedown and touchstart instead of click
	      // so that it precedes the focus event.
	      function checkPointerDown(e) {
	        if (container.contains(e.target)) return;
	        if (config.clickOutsideDeactivates) {
	          deactivate({
	            returnFocus: !tabbable_1.isFocusable(e.target)
	          });
	          return;
	        }
	        // This is needed for mobile devices.
	        // (If we'll only let `click` events through,
	        // then on mobile they will be blocked anyways if `touchstart` is blocked.)
	        if (config.allowOutsideClick && config.allowOutsideClick(e)) {
	          return;
	        }
	        e.preventDefault();
	      }

	      // In case focus escapes the trap for some strange reason, pull it back in.
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
	      }

	      // Hijack Tab events on the first and last focusable nodes of the trap,
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
	        state.lastTabbableNode =
	          tabbableNodes[tabbableNodes.length - 1] || getInitialFocusNode();
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
	      return (
	        node.tagName &&
	        node.tagName.toLowerCase() === 'input' &&
	        typeof node.select === 'function'
	      );
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

	    function E () {
	      // Keep this empty so it's easier to inherit from
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
	        function listener () {
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
	            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
	              liveEvents.push(evts[i]);
	          }
	        }

	        // Remove event from queue to prevent memory leak
	        // Suggested by https://github.com/lazd
	        // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

	        (liveEvents.length)
	          ? e[name] = liveEvents
	          : delete e[name];

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
	          name = _ref.name;
	      // Offsets are the actual position the popper needs to have to be
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

	    var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : typeof self !== 'undefined' ? self : {};

	    var location = commonjsGlobal$1.location || {};
	    /*jslint indent: 2, browser: true, bitwise: true, plusplus: true */
	    var twemoji = (function (
	      /*! Copyright Twitter Inc. and other contributors. Licensed under MIT *//*
	        https://github.com/twitter/twemoji/blob/gh-pages/LICENSE
	      */

	      // WARNING:   this file is generated automatically via
	      //            `node scripts/build.js`
	      //            please update its `createTwemoji` function
	      //            at the bottom of the same file instead.

	    ) {

	      /*jshint maxparams:4 */

	      var
	        // the exported module object
	        twemoji = {


	        /////////////////////////
	        //      properties     //
	        /////////////////////////

	          // default assets url, by default will be Twitter Inc. CDN
	          base: 'https://twemoji.maxcdn.com/v/12.1.5/',

	          // default assets file extensions, by default '.png'
	          ext: '.png',

	          // default assets/folder size, by default "72x72"
	          // available via Twitter CDN: 72
	          size: '72x72',

	          // default class name, by default 'emoji'
	          className: 'emoji',

	          // basic utilities / helpers to convert code points
	          // to JavaScript surrogates and vice versa
	          convert: {

	            /**
	             * Given an HEX codepoint, returns UTF16 surrogate pairs.
	             *
	             * @param   string  generic codepoint, i.e. '1F4A9'
	             * @return  string  codepoint transformed into utf16 surrogates pair,
	             *          i.e. \uD83D\uDCA9
	             *
	             * @example
	             *  twemoji.convert.fromCodePoint('1f1e8');
	             *  // "\ud83c\udde8"
	             *
	             *  '1f1e8-1f1f3'.split('-').map(twemoji.convert.fromCodePoint).join('')
	             *  // "\ud83c\udde8\ud83c\uddf3"
	             */
	            fromCodePoint: fromCodePoint,

	            /**
	             * Given UTF16 surrogate pairs, returns the equivalent HEX codepoint.
	             *
	             * @param   string  generic utf16 surrogates pair, i.e. \uD83D\uDCA9
	             * @param   string  optional separator for double code points, default='-'
	             * @return  string  utf16 transformed into codepoint, i.e. '1F4A9'
	             *
	             * @example
	             *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3');
	             *  // "1f1e8-1f1f3"
	             *
	             *  twemoji.convert.toCodePoint('\ud83c\udde8\ud83c\uddf3', '~');
	             *  // "1f1e8~1f1f3"
	             */
	            toCodePoint: toCodePoint
	          },


	        /////////////////////////
	        //       methods       //
	        /////////////////////////

	          /**
	           * User first: used to remove missing images
	           * preserving the original text intent when
	           * a fallback for network problems is desired.
	           * Automatically added to Image nodes via DOM
	           * It could be recycled for string operations via:
	           *  $('img.emoji').on('error', twemoji.onerror)
	           */
	          onerror: function onerror() {
	            if (this.parentNode) {
	              this.parentNode.replaceChild(createText(this.alt, false), this);
	            }
	          },

	          /**
	           * Main method/logic to generate either <img> tags or HTMLImage nodes.
	           *  "emojify" a generic text or DOM Element.
	           *
	           * @overloads
	           *
	           * String replacement for `innerHTML` or server side operations
	           *  twemoji.parse(string);
	           *  twemoji.parse(string, Function);
	           *  twemoji.parse(string, Object);
	           *
	           * HTMLElement tree parsing for safer operations over existing DOM
	           *  twemoji.parse(HTMLElement);
	           *  twemoji.parse(HTMLElement, Function);
	           *  twemoji.parse(HTMLElement, Object);
	           *
	           * @param   string|HTMLElement  the source to parse and enrich with emoji.
	           *
	           *          string              replace emoji matches with <img> tags.
	           *                              Mainly used to inject emoji via `innerHTML`
	           *                              It does **not** parse the string or validate it,
	           *                              it simply replaces found emoji with a tag.
	           *                              NOTE: be sure this won't affect security.
	           *
	           *          HTMLElement         walk through the DOM tree and find emoji
	           *                              that are inside **text node only** (nodeType === 3)
	           *                              Mainly used to put emoji in already generated DOM
	           *                              without compromising surrounding nodes and
	           *                              **avoiding** the usage of `innerHTML`.
	           *                              NOTE: Using DOM elements instead of strings should
	           *                              improve security without compromising too much
	           *                              performance compared with a less safe `innerHTML`.
	           *
	           * @param   Function|Object  [optional]
	           *                              either the callback that will be invoked or an object
	           *                              with all properties to use per each found emoji.
	           *
	           *          Function            if specified, this will be invoked per each emoji
	           *                              that has been found through the RegExp except
	           *                              those follwed by the invariant \uFE0E ("as text").
	           *                              Once invoked, parameters will be:
	           *
	           *                                iconId:string     the lower case HEX code point
	           *                                                  i.e. "1f4a9"
	           *
	           *                                options:Object    all info for this parsing operation
	           *
	           *                                variant:char      the optional \uFE0F ("as image")
	           *                                                  variant, in case this info
	           *                                                  is anyhow meaningful.
	           *                                                  By default this is ignored.
	           *
	           *                              If such callback will return a falsy value instead
	           *                              of a valid `src` to use for the image, nothing will
	           *                              actually change for that specific emoji.
	           *
	           *
	           *          Object              if specified, an object containing the following properties
	           *
	           *            callback   Function  the callback to invoke per each found emoji.
	           *            base       string    the base url, by default twemoji.base
	           *            ext        string    the image extension, by default twemoji.ext
	           *            size       string    the assets size, by default twemoji.size
	           *
	           * @example
	           *
	           *  twemoji.parse("I \u2764\uFE0F emoji!");
	           *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
	           *
	           *
	           *  twemoji.parse("I \u2764\uFE0F emoji!", function(iconId, options) {
	           *    return '/assets/' + iconId + '.gif';
	           *  });
	           *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/2764.gif"/> emoji!
	           *
	           *
	           * twemoji.parse("I \u2764\uFE0F emoji!", {
	           *   size: 72,
	           *   callback: function(iconId, options) {
	           *     return '/assets/' + options.size + '/' + iconId + options.ext;
	           *   }
	           * });
	           *  // I <img class="emoji" draggable="false" alt="❤️" src="/assets/72x72/2764.png"/> emoji!
	           *
	           */
	          parse: parse,

	          /**
	           * Given a string, invokes the callback argument
	           *  per each emoji found in such string.
	           * This is the most raw version used by
	           *  the .parse(string) method itself.
	           *
	           * @param   string    generic string to parse
	           * @param   Function  a generic callback that will be
	           *                    invoked to replace the content.
	           *                    This calback wil receive standard
	           *                    String.prototype.replace(str, callback)
	           *                    arguments such:
	           *  callback(
	           *    rawText,  // the emoji match
	           *  );
	           *
	           *                    and others commonly received via replace.
	           */
	          replace: replace,

	          /**
	           * Simplify string tests against emoji.
	           *
	           * @param   string  some text that might contain emoji
	           * @return  boolean true if any emoji was found, false otherwise.
	           *
	           * @example
	           *
	           *  if (twemoji.test(someContent)) {
	           *    console.log("emoji All The Things!");
	           *  }
	           */
	          test: test
	        },

	        // used to escape HTML special chars in attributes
	        escaper = {
	          '&': '&amp;',
	          '<': '&lt;',
	          '>': '&gt;',
	          "'": '&#39;',
	          '"': '&quot;'
	        },

	        // RegExp based on emoji's official Unicode standards
	        // http://www.unicode.org/Public/UNIDATA/EmojiSources.txt
	        re = /(?:\ud83d\udc68\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc68\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc68\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc68\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc68\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffc-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffd-\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb\udffc\udffe\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffd\udfff]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc68\ud83c[\udffb-\udffe]|\ud83d\udc69\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83d\udc69\ud83c[\udffb-\udffe]|\ud83e\uddd1\ud83c\udffb\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffc\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffd\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udffe\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\ud83c\udfff\u200d\ud83e\udd1d\u200d\ud83e\uddd1\ud83c[\udffb-\udfff]|\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1|\ud83d\udc6b\ud83c[\udffb-\udfff]|\ud83d\udc6c\ud83c[\udffb-\udfff]|\ud83d\udc6d\ud83c[\udffb-\udfff]|\ud83d[\udc6b-\udc6d])|(?:\ud83d[\udc68\udc69]|\ud83e\uddd1)(?:\ud83c[\udffb-\udfff])?\u200d(?:\u2695\ufe0f|\u2696\ufe0f|\u2708\ufe0f|\ud83c[\udf3e\udf73\udf93\udfa4\udfa8\udfeb\udfed]|\ud83d[\udcbb\udcbc\udd27\udd2c\ude80\ude92]|\ud83e[\uddaf-\uddb3\uddbc\uddbd])|(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75]|\u26f9)((?:\ud83c[\udffb-\udfff]|\ufe0f)\u200d[\u2640\u2642]\ufe0f)|(?:\ud83c[\udfc3\udfc4\udfca]|\ud83d[\udc6e\udc71\udc73\udc77\udc81\udc82\udc86\udc87\ude45-\ude47\ude4b\ude4d\ude4e\udea3\udeb4-\udeb6]|\ud83e[\udd26\udd35\udd37-\udd39\udd3d\udd3e\uddb8\uddb9\uddcd-\uddcf\uddd6-\udddd])(?:\ud83c[\udffb-\udfff])?\u200d[\u2640\u2642]\ufe0f|(?:\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68|\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d[\udc68\udc69]|\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66|\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83c\udff3\ufe0f\u200d\u26a7\ufe0f|\ud83c\udff3\ufe0f\u200d\ud83c\udf08|\ud83c\udff4\u200d\u2620\ufe0f|\ud83d\udc15\u200d\ud83e\uddba|\ud83d\udc41\u200d\ud83d\udde8|\ud83d\udc68\u200d\ud83d[\udc66\udc67]|\ud83d\udc69\u200d\ud83d[\udc66\udc67]|\ud83d\udc6f\u200d\u2640\ufe0f|\ud83d\udc6f\u200d\u2642\ufe0f|\ud83e\udd3c\u200d\u2640\ufe0f|\ud83e\udd3c\u200d\u2642\ufe0f|\ud83e\uddde\u200d\u2640\ufe0f|\ud83e\uddde\u200d\u2642\ufe0f|\ud83e\udddf\u200d\u2640\ufe0f|\ud83e\udddf\u200d\u2642\ufe0f)|[#*0-9]\ufe0f?\u20e3|(?:[©®\u2122\u265f]\ufe0f)|(?:\ud83c[\udc04\udd70\udd71\udd7e\udd7f\ude02\ude1a\ude2f\ude37\udf21\udf24-\udf2c\udf36\udf7d\udf96\udf97\udf99-\udf9b\udf9e\udf9f\udfcd\udfce\udfd4-\udfdf\udff3\udff5\udff7]|\ud83d[\udc3f\udc41\udcfd\udd49\udd4a\udd6f\udd70\udd73\udd76-\udd79\udd87\udd8a-\udd8d\udda5\udda8\uddb1\uddb2\uddbc\uddc2-\uddc4\uddd1-\uddd3\udddc-\uddde\udde1\udde3\udde8\uddef\uddf3\uddfa\udecb\udecd-\udecf\udee0-\udee5\udee9\udef0\udef3]|[\u203c\u2049\u2139\u2194-\u2199\u21a9\u21aa\u231a\u231b\u2328\u23cf\u23ed-\u23ef\u23f1\u23f2\u23f8-\u23fa\u24c2\u25aa\u25ab\u25b6\u25c0\u25fb-\u25fe\u2600-\u2604\u260e\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262a\u262e\u262f\u2638-\u263a\u2640\u2642\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267b\u267f\u2692-\u2697\u2699\u269b\u269c\u26a0\u26a1\u26a7\u26aa\u26ab\u26b0\u26b1\u26bd\u26be\u26c4\u26c5\u26c8\u26cf\u26d1\u26d3\u26d4\u26e9\u26ea\u26f0-\u26f5\u26f8\u26fa\u26fd\u2702\u2708\u2709\u270f\u2712\u2714\u2716\u271d\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u2764\u27a1\u2934\u2935\u2b05-\u2b07\u2b1b\u2b1c\u2b50\u2b55\u3030\u303d\u3297\u3299])(?:\ufe0f|(?!\ufe0e))|(?:(?:\ud83c[\udfcb\udfcc]|\ud83d[\udd74\udd75\udd90]|[\u261d\u26f7\u26f9\u270c\u270d])(?:\ufe0f|(?!\ufe0e))|(?:\ud83c[\udf85\udfc2-\udfc4\udfc7\udfca]|\ud83d[\udc42\udc43\udc46-\udc50\udc66-\udc69\udc6e\udc70-\udc78\udc7c\udc81-\udc83\udc85-\udc87\udcaa\udd7a\udd95\udd96\ude45-\ude47\ude4b-\ude4f\udea3\udeb4-\udeb6\udec0\udecc]|\ud83e[\udd0f\udd18-\udd1c\udd1e\udd1f\udd26\udd30-\udd39\udd3d\udd3e\uddb5\uddb6\uddb8\uddb9\uddbb\uddcd-\uddcf\uddd1-\udddd]|[\u270a\u270b]))(?:\ud83c[\udffb-\udfff])?|(?:\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f|\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f|\ud83c\udde6\ud83c[\udde8-\uddec\uddee\uddf1\uddf2\uddf4\uddf6-\uddfa\uddfc\uddfd\uddff]|\ud83c\udde7\ud83c[\udde6\udde7\udde9-\uddef\uddf1-\uddf4\uddf6-\uddf9\uddfb\uddfc\uddfe\uddff]|\ud83c\udde8\ud83c[\udde6\udde8\udde9\uddeb-\uddee\uddf0-\uddf5\uddf7\uddfa-\uddff]|\ud83c\udde9\ud83c[\uddea\uddec\uddef\uddf0\uddf2\uddf4\uddff]|\ud83c\uddea\ud83c[\udde6\udde8\uddea\uddec\udded\uddf7-\uddfa]|\ud83c\uddeb\ud83c[\uddee-\uddf0\uddf2\uddf4\uddf7]|\ud83c\uddec\ud83c[\udde6\udde7\udde9-\uddee\uddf1-\uddf3\uddf5-\uddfa\uddfc\uddfe]|\ud83c\udded\ud83c[\uddf0\uddf2\uddf3\uddf7\uddf9\uddfa]|\ud83c\uddee\ud83c[\udde8-\uddea\uddf1-\uddf4\uddf6-\uddf9]|\ud83c\uddef\ud83c[\uddea\uddf2\uddf4\uddf5]|\ud83c\uddf0\ud83c[\uddea\uddec-\uddee\uddf2\uddf3\uddf5\uddf7\uddfc\uddfe\uddff]|\ud83c\uddf1\ud83c[\udde6-\udde8\uddee\uddf0\uddf7-\uddfb\uddfe]|\ud83c\uddf2\ud83c[\udde6\udde8-\udded\uddf0-\uddff]|\ud83c\uddf3\ud83c[\udde6\udde8\uddea-\uddec\uddee\uddf1\uddf4\uddf5\uddf7\uddfa\uddff]|\ud83c\uddf4\ud83c\uddf2|\ud83c\uddf5\ud83c[\udde6\uddea-\udded\uddf0-\uddf3\uddf7-\uddf9\uddfc\uddfe]|\ud83c\uddf6\ud83c\udde6|\ud83c\uddf7\ud83c[\uddea\uddf4\uddf8\uddfa\uddfc]|\ud83c\uddf8\ud83c[\udde6-\uddea\uddec-\uddf4\uddf7-\uddf9\uddfb\uddfd-\uddff]|\ud83c\uddf9\ud83c[\udde6\udde8\udde9\uddeb-\udded\uddef-\uddf4\uddf7\uddf9\uddfb\uddfc\uddff]|\ud83c\uddfa\ud83c[\udde6\uddec\uddf2\uddf3\uddf8\uddfe\uddff]|\ud83c\uddfb\ud83c[\udde6\udde8\uddea\uddec\uddee\uddf3\uddfa]|\ud83c\uddfc\ud83c[\uddeb\uddf8]|\ud83c\uddfd\ud83c\uddf0|\ud83c\uddfe\ud83c[\uddea\uddf9]|\ud83c\uddff\ud83c[\udde6\uddf2\uddfc]|\ud83c[\udccf\udd8e\udd91-\udd9a\udde6-\uddff\ude01\ude32-\ude36\ude38-\ude3a\ude50\ude51\udf00-\udf20\udf2d-\udf35\udf37-\udf7c\udf7e-\udf84\udf86-\udf93\udfa0-\udfc1\udfc5\udfc6\udfc8\udfc9\udfcf-\udfd3\udfe0-\udff0\udff4\udff8-\udfff]|\ud83d[\udc00-\udc3e\udc40\udc44\udc45\udc51-\udc65\udc6a\udc6f\udc79-\udc7b\udc7d-\udc80\udc84\udc88-\udca9\udcab-\udcfc\udcff-\udd3d\udd4b-\udd4e\udd50-\udd67\udda4\uddfb-\ude44\ude48-\ude4a\ude80-\udea2\udea4-\udeb3\udeb7-\udebf\udec1-\udec5\uded0-\uded2\uded5\udeeb\udeec\udef4-\udefa\udfe0-\udfeb]|\ud83e[\udd0d\udd0e\udd10-\udd17\udd1d\udd20-\udd25\udd27-\udd2f\udd3a\udd3c\udd3f-\udd45\udd47-\udd71\udd73-\udd76\udd7a-\udda2\udda5-\uddaa\uddae-\uddb4\uddb7\uddba\uddbc-\uddca\uddd0\uddde-\uddff\ude70-\ude73\ude78-\ude7a\ude80-\ude82\ude90-\ude95]|[\u23e9-\u23ec\u23f0\u23f3\u267e\u26ce\u2705\u2728\u274c\u274e\u2753-\u2755\u2795-\u2797\u27b0\u27bf\ue50a])|\ufe0f/g,

	        // avoid runtime RegExp creation for not so smart,
	        // not JIT based, and old browsers / engines
	        UFE0Fg = /\uFE0F/g,

	        // avoid using a string literal like '\u200D' here because minifiers expand it inline
	        U200D = String.fromCharCode(0x200D),

	        // used to find HTML special chars in attributes
	        rescaper = /[&<>'"]/g,

	        // nodes with type 1 which should **not** be parsed
	        shouldntBeParsed = /^(?:iframe|noframes|noscript|script|select|style|textarea)$/,

	        // just a private shortcut
	        fromCharCode = String.fromCharCode;

	      return twemoji;


	      /////////////////////////
	      //  private functions  //
	      //     declaration     //
	      /////////////////////////

	      /**
	       * Shortcut to create text nodes
	       * @param   string  text used to create DOM text node
	       * @return  Node  a DOM node with that text
	       */
	      function createText(text, clean) {
	        return document.createTextNode(clean ? text.replace(UFE0Fg, '') : text);
	      }

	      /**
	       * Utility function to escape html attribute text
	       * @param   string  text use in HTML attribute
	       * @return  string  text encoded to use in HTML attribute
	       */
	      function escapeHTML(s) {
	        return s.replace(rescaper, replacer);
	      }

	      /**
	       * Default callback used to generate emoji src
	       *  based on Twitter CDN
	       * @param   string    the emoji codepoint string
	       * @param   string    the default size to use, i.e. "36x36"
	       * @return  string    the image source to use
	       */
	      function defaultImageSrcGenerator(icon, options) {
	        return ''.concat(options.base, options.size, '/', icon, options.ext);
	      }

	      /**
	       * Given a generic DOM nodeType 1, walk through all children
	       * and store every nodeType 3 (#text) found in the tree.
	       * @param   Element a DOM Element with probably some text in it
	       * @param   Array the list of previously discovered text nodes
	       * @return  Array same list with new discovered nodes, if any
	       */
	      function grabAllTextNodes(node, allText) {
	        var
	          childNodes = node.childNodes,
	          length = childNodes.length,
	          subnode,
	          nodeType;
	        while (length--) {
	          subnode = childNodes[length];
	          nodeType = subnode.nodeType;
	          // parse emoji only in text nodes
	          if (nodeType === 3) {
	            // collect them to process emoji later
	            allText.push(subnode);
	          }
	          // ignore all nodes that are not type 1, that are svg, or that
	          // should not be parsed as script, style, and others
	          else if (nodeType === 1 && !('ownerSVGElement' in subnode) &&
	              !shouldntBeParsed.test(subnode.nodeName.toLowerCase())) {
	            grabAllTextNodes(subnode, allText);
	          }
	        }
	        return allText;
	      }

	      /**
	       * Used to both remove the possible variant
	       *  and to convert utf16 into code points.
	       *  If there is a zero-width-joiner (U+200D), leave the variants in.
	       * @param   string    the raw text of the emoji match
	       * @return  string    the code point
	       */
	      function grabTheRightIcon(rawText) {
	        // if variant is present as \uFE0F
	        return toCodePoint(rawText.indexOf(U200D) < 0 ?
	          rawText.replace(UFE0Fg, '') :
	          rawText
	        );
	      }

	      /**
	       * DOM version of the same logic / parser:
	       *  emojify all found sub-text nodes placing images node instead.
	       * @param   Element   generic DOM node with some text in some child node
	       * @param   Object    options  containing info about how to parse
	        *
	        *            .callback   Function  the callback to invoke per each found emoji.
	        *            .base       string    the base url, by default twemoji.base
	        *            .ext        string    the image extension, by default twemoji.ext
	        *            .size       string    the assets size, by default twemoji.size
	        *
	       * @return  Element same generic node with emoji in place, if any.
	       */
	      function parseNode(node, options) {
	        var
	          allText = grabAllTextNodes(node, []),
	          length = allText.length,
	          attrib,
	          attrname,
	          modified,
	          fragment,
	          subnode,
	          text,
	          match,
	          i,
	          index,
	          img,
	          rawText,
	          iconId,
	          src;
	        while (length--) {
	          modified = false;
	          fragment = document.createDocumentFragment();
	          subnode = allText[length];
	          text = subnode.nodeValue;
	          i = 0;
	          while ((match = re.exec(text))) {
	            index = match.index;
	            if (index !== i) {
	              fragment.appendChild(
	                createText(text.slice(i, index), true)
	              );
	            }
	            rawText = match[0];
	            iconId = grabTheRightIcon(rawText);
	            i = index + rawText.length;
	            src = options.callback(iconId, options);
	            if (iconId && src) {
	              img = new Image();
	              img.onerror = options.onerror;
	              img.setAttribute('draggable', 'false');
	              attrib = options.attributes(rawText, iconId);
	              for (attrname in attrib) {
	                if (
	                  attrib.hasOwnProperty(attrname) &&
	                  // don't allow any handlers to be set + don't allow overrides
	                  attrname.indexOf('on') !== 0 &&
	                  !img.hasAttribute(attrname)
	                ) {
	                  img.setAttribute(attrname, attrib[attrname]);
	                }
	              }
	              img.className = options.className;
	              img.alt = rawText;
	              img.src = src;
	              modified = true;
	              fragment.appendChild(img);
	            }
	            if (!img) fragment.appendChild(createText(rawText, false));
	            img = null;
	          }
	          // is there actually anything to replace in here ?
	          if (modified) {
	            // any text left to be added ?
	            if (i < text.length) {
	              fragment.appendChild(
	                createText(text.slice(i), true)
	              );
	            }
	            // replace the text node only, leave intact
	            // anything else surrounding such text
	            subnode.parentNode.replaceChild(fragment, subnode);
	          }
	        }
	        return node;
	      }

	      /**
	       * String/HTML version of the same logic / parser:
	       *  emojify a generic text placing images tags instead of surrogates pair.
	       * @param   string    generic string with possibly some emoji in it
	       * @param   Object    options  containing info about how to parse
	       *
	       *            .callback   Function  the callback to invoke per each found emoji.
	       *            .base       string    the base url, by default twemoji.base
	       *            .ext        string    the image extension, by default twemoji.ext
	       *            .size       string    the assets size, by default twemoji.size
	       *
	       * @return  the string with <img tags> replacing all found and parsed emoji
	       */
	      function parseString(str, options) {
	        return replace(str, function (rawText) {
	          var
	            ret = rawText,
	            iconId = grabTheRightIcon(rawText),
	            src = options.callback(iconId, options),
	            attrib,
	            attrname;
	          if (iconId && src) {
	            // recycle the match string replacing the emoji
	            // with its image counter part
	            ret = '<img '.concat(
	              'class="', options.className, '" ',
	              'draggable="false" ',
	              // needs to preserve user original intent
	              // when variants should be copied and pasted too
	              'alt="',
	              rawText,
	              '"',
	              ' src="',
	              src,
	              '"'
	            );
	            attrib = options.attributes(rawText, iconId);
	            for (attrname in attrib) {
	              if (
	                attrib.hasOwnProperty(attrname) &&
	                // don't allow any handlers to be set + don't allow overrides
	                attrname.indexOf('on') !== 0 &&
	                ret.indexOf(' ' + attrname + '=') === -1
	              ) {
	                ret = ret.concat(' ', attrname, '="', escapeHTML(attrib[attrname]), '"');
	              }
	            }
	            ret = ret.concat('/>');
	          }
	          return ret;
	        });
	      }

	      /**
	       * Function used to actually replace HTML special chars
	       * @param   string  HTML special char
	       * @return  string  encoded HTML special char
	       */
	      function replacer(m) {
	        return escaper[m];
	      }

	      /**
	       * Default options.attribute callback
	       * @return  null
	       */
	      function returnNull() {
	        return null;
	      }

	      /**
	       * Given a generic value, creates its squared counterpart if it's a number.
	       *  As example, number 36 will return '36x36'.
	       * @param   any     a generic value.
	       * @return  any     a string representing asset size, i.e. "36x36"
	       *                  only in case the value was a number.
	       *                  Returns initial value otherwise.
	       */
	      function toSizeSquaredAsset(value) {
	        return typeof value === 'number' ?
	          value + 'x' + value :
	          value;
	      }


	      /////////////////////////
	      //  exported functions //
	      //     declaration     //
	      /////////////////////////

	      function fromCodePoint(codepoint) {
	        var code = typeof codepoint === 'string' ?
	              parseInt(codepoint, 16) : codepoint;
	        if (code < 0x10000) {
	          return fromCharCode(code);
	        }
	        code -= 0x10000;
	        return fromCharCode(
	          0xD800 + (code >> 10),
	          0xDC00 + (code & 0x3FF)
	        );
	      }

	      function parse(what, how) {
	        if (!how || typeof how === 'function') {
	          how = {callback: how};
	        }
	        // if first argument is string, inject html <img> tags
	        // otherwise use the DOM tree and parse text nodes only
	        return (typeof what === 'string' ? parseString : parseNode)(what, {
	          callback:   how.callback || defaultImageSrcGenerator,
	          attributes: typeof how.attributes === 'function' ? how.attributes : returnNull,
	          base:       typeof how.base === 'string' ? how.base : twemoji.base,
	          ext:        how.ext || twemoji.ext,
	          size:       how.folder || toSizeSquaredAsset(how.size || twemoji.size),
	          className:  how.className || twemoji.className,
	          onerror:    how.onerror || twemoji.onerror
	        });
	      }

	      function replace(text, callback) {
	        return String(text).replace(re, callback);
	      }

	      function test(text) {
	        // IE6 needs a reset before too
	        re.lastIndex = 0;
	        var result = re.test(text);
	        re.lastIndex = 0;
	        return result;
	      }

	      function toCodePoint(unicodeSurrogates, sep) {
	        var
	          r = [],
	          c = 0,
	          p = 0,
	          i = 0;
	        while (i < unicodeSurrogates.length) {
	          c = unicodeSurrogates.charCodeAt(i++);
	          if (p) {
	            r.push((0x10000 + ((p - 0xD800) << 10) + (c - 0xDC00)).toString(16));
	            p = 0;
	          } else if (0xD800 <= c && c <= 0xDBFF) {
	            p = c;
	          } else {
	            r.push(c.toString(16));
	          }
	        }
	        return r.join(sep || '-');
	      }

	    }());
	    if (!location.protocol) {
	      twemoji.base = twemoji.base.replace(/^http:/, "");
	    }
	    var twemoji_npm = twemoji;

	    var emojiData = {"categories":["smileys","people","animals","food","travel","activities","objects","symbols","flags"],"emoji":[{"emoji":"😀","category":0,"name":"grinning face","version":"1.0"},{"emoji":"😃","category":0,"name":"grinning face with big eyes","version":"1.0"},{"emoji":"😄","category":0,"name":"grinning face with smiling eyes","version":"1.0"},{"emoji":"😁","category":0,"name":"beaming face with smiling eyes","version":"1.0"},{"emoji":"😆","category":0,"name":"grinning squinting face","version":"1.0"},{"emoji":"😅","category":0,"name":"grinning face with sweat","version":"1.0"},{"emoji":"🤣","category":0,"name":"rolling on the floor laughing","version":"3.0"},{"emoji":"😂","category":0,"name":"face with tears of joy","version":"1.0"},{"emoji":"🙂","category":0,"name":"slightly smiling face","version":"1.0"},{"emoji":"🙃","category":0,"name":"upside-down face","version":"1.0"},{"emoji":"😉","category":0,"name":"winking face","version":"1.0"},{"emoji":"😊","category":0,"name":"smiling face with smiling eyes","version":"1.0"},{"emoji":"😇","category":0,"name":"smiling face with halo","version":"1.0"},{"emoji":"🥰","category":0,"name":"smiling face with hearts","version":"11.0"},{"emoji":"😍","category":0,"name":"smiling face with heart-eyes","version":"1.0"},{"emoji":"🤩","category":0,"name":"star-struck","version":"5.0"},{"emoji":"😘","category":0,"name":"face blowing a kiss","version":"1.0"},{"emoji":"😗","category":0,"name":"kissing face","version":"1.0"},{"emoji":"☺️","category":0,"name":"smiling face","version":"1.0"},{"emoji":"😚","category":0,"name":"kissing face with closed eyes","version":"1.0"},{"emoji":"😙","category":0,"name":"kissing face with smiling eyes","version":"1.0"},{"emoji":"🥲","category":0,"name":"smiling face with tear","version":"13.0"},{"emoji":"😋","category":0,"name":"face savoring food","version":"1.0"},{"emoji":"😛","category":0,"name":"face with tongue","version":"1.0"},{"emoji":"😜","category":0,"name":"winking face with tongue","version":"1.0"},{"emoji":"🤪","category":0,"name":"zany face","version":"5.0"},{"emoji":"😝","category":0,"name":"squinting face with tongue","version":"1.0"},{"emoji":"🤑","category":0,"name":"money-mouth face","version":"1.0"},{"emoji":"🤗","category":0,"name":"hugging face","version":"1.0"},{"emoji":"🤭","category":0,"name":"face with hand over mouth","version":"5.0"},{"emoji":"🤫","category":0,"name":"shushing face","version":"5.0"},{"emoji":"🤔","category":0,"name":"thinking face","version":"1.0"},{"emoji":"🤐","category":0,"name":"zipper-mouth face","version":"1.0"},{"emoji":"🤨","category":0,"name":"face with raised eyebrow","version":"5.0"},{"emoji":"😐","category":0,"name":"neutral face","version":"1.0"},{"emoji":"😑","category":0,"name":"expressionless face","version":"1.0"},{"emoji":"😶","category":0,"name":"face without mouth","version":"1.0"},{"emoji":"😏","category":0,"name":"smirking face","version":"1.0"},{"emoji":"😒","category":0,"name":"unamused face","version":"1.0"},{"emoji":"🙄","category":0,"name":"face with rolling eyes","version":"1.0"},{"emoji":"😬","category":0,"name":"grimacing face","version":"1.0"},{"emoji":"🤥","category":0,"name":"lying face","version":"3.0"},{"emoji":"😌","category":0,"name":"relieved face","version":"1.0"},{"emoji":"😔","category":0,"name":"pensive face","version":"1.0"},{"emoji":"😪","category":0,"name":"sleepy face","version":"1.0"},{"emoji":"🤤","category":0,"name":"drooling face","version":"3.0"},{"emoji":"😴","category":0,"name":"sleeping face","version":"1.0"},{"emoji":"😷","category":0,"name":"face with medical mask","version":"1.0"},{"emoji":"🤒","category":0,"name":"face with thermometer","version":"1.0"},{"emoji":"🤕","category":0,"name":"face with head-bandage","version":"1.0"},{"emoji":"🤢","category":0,"name":"nauseated face","version":"3.0"},{"emoji":"🤮","category":0,"name":"face vomiting","version":"5.0"},{"emoji":"🤧","category":0,"name":"sneezing face","version":"3.0"},{"emoji":"🥵","category":0,"name":"hot face","version":"11.0"},{"emoji":"🥶","category":0,"name":"cold face","version":"11.0"},{"emoji":"🥴","category":0,"name":"woozy face","version":"11.0"},{"emoji":"😵","category":0,"name":"dizzy face","version":"1.0"},{"emoji":"🤯","category":0,"name":"exploding head","version":"5.0"},{"emoji":"🤠","category":0,"name":"cowboy hat face","version":"3.0"},{"emoji":"🥳","category":0,"name":"partying face","version":"11.0"},{"emoji":"🥸","category":0,"name":"disguised face","version":"13.0"},{"emoji":"😎","category":0,"name":"smiling face with sunglasses","version":"1.0"},{"emoji":"🤓","category":0,"name":"nerd face","version":"1.0"},{"emoji":"🧐","category":0,"name":"face with monocle","version":"5.0"},{"emoji":"😕","category":0,"name":"confused face","version":"1.0"},{"emoji":"😟","category":0,"name":"worried face","version":"1.0"},{"emoji":"🙁","category":0,"name":"slightly frowning face","version":"1.0"},{"emoji":"☹️","category":0,"name":"frowning face","version":"1.0"},{"emoji":"😮","category":0,"name":"face with open mouth","version":"1.0"},{"emoji":"😯","category":0,"name":"hushed face","version":"1.0"},{"emoji":"😲","category":0,"name":"astonished face","version":"1.0"},{"emoji":"😳","category":0,"name":"flushed face","version":"1.0"},{"emoji":"🥺","category":0,"name":"pleading face","version":"11.0"},{"emoji":"😦","category":0,"name":"frowning face with open mouth","version":"1.0"},{"emoji":"😧","category":0,"name":"anguished face","version":"1.0"},{"emoji":"😨","category":0,"name":"fearful face","version":"1.0"},{"emoji":"😰","category":0,"name":"anxious face with sweat","version":"1.0"},{"emoji":"😥","category":0,"name":"sad but relieved face","version":"1.0"},{"emoji":"😢","category":0,"name":"crying face","version":"1.0"},{"emoji":"😭","category":0,"name":"loudly crying face","version":"1.0"},{"emoji":"😱","category":0,"name":"face screaming in fear","version":"1.0"},{"emoji":"😖","category":0,"name":"confounded face","version":"1.0"},{"emoji":"😣","category":0,"name":"persevering face","version":"1.0"},{"emoji":"😞","category":0,"name":"disappointed face","version":"1.0"},{"emoji":"😓","category":0,"name":"downcast face with sweat","version":"1.0"},{"emoji":"😩","category":0,"name":"weary face","version":"1.0"},{"emoji":"😫","category":0,"name":"tired face","version":"1.0"},{"emoji":"🥱","category":0,"name":"yawning face","version":"12.0"},{"emoji":"😤","category":0,"name":"face with steam from nose","version":"1.0"},{"emoji":"😡","category":0,"name":"pouting face","version":"1.0"},{"emoji":"😠","category":0,"name":"angry face","version":"1.0"},{"emoji":"🤬","category":0,"name":"face with symbols on mouth","version":"5.0"},{"emoji":"😈","category":0,"name":"smiling face with horns","version":"1.0"},{"emoji":"👿","category":0,"name":"angry face with horns","version":"1.0"},{"emoji":"💀","category":0,"name":"skull","version":"1.0"},{"emoji":"☠️","category":0,"name":"skull and crossbones","version":"1.0"},{"emoji":"💩","category":0,"name":"pile of poo","version":"1.0"},{"emoji":"🤡","category":0,"name":"clown face","version":"3.0"},{"emoji":"👹","category":0,"name":"ogre","version":"1.0"},{"emoji":"👺","category":0,"name":"goblin","version":"1.0"},{"emoji":"👻","category":0,"name":"ghost","version":"1.0"},{"emoji":"👽","category":0,"name":"alien","version":"1.0"},{"emoji":"👾","category":0,"name":"alien monster","version":"1.0"},{"emoji":"🤖","category":0,"name":"robot","version":"1.0"},{"emoji":"😺","category":0,"name":"grinning cat","version":"1.0"},{"emoji":"😸","category":0,"name":"grinning cat with smiling eyes","version":"1.0"},{"emoji":"😹","category":0,"name":"cat with tears of joy","version":"1.0"},{"emoji":"😻","category":0,"name":"smiling cat with heart-eyes","version":"1.0"},{"emoji":"😼","category":0,"name":"cat with wry smile","version":"1.0"},{"emoji":"😽","category":0,"name":"kissing cat","version":"1.0"},{"emoji":"🙀","category":0,"name":"weary cat","version":"1.0"},{"emoji":"😿","category":0,"name":"crying cat","version":"1.0"},{"emoji":"😾","category":0,"name":"pouting cat","version":"1.0"},{"emoji":"🙈","category":0,"name":"see-no-evil monkey","version":"1.0"},{"emoji":"🙉","category":0,"name":"hear-no-evil monkey","version":"1.0"},{"emoji":"🙊","category":0,"name":"speak-no-evil monkey","version":"1.0"},{"emoji":"💋","category":0,"name":"kiss mark","version":"1.0"},{"emoji":"💌","category":0,"name":"love letter","version":"1.0"},{"emoji":"💘","category":0,"name":"heart with arrow","version":"1.0"},{"emoji":"💝","category":0,"name":"heart with ribbon","version":"1.0"},{"emoji":"💖","category":0,"name":"sparkling heart","version":"1.0"},{"emoji":"💗","category":0,"name":"growing heart","version":"1.0"},{"emoji":"💓","category":0,"name":"beating heart","version":"1.0"},{"emoji":"💞","category":0,"name":"revolving hearts","version":"1.0"},{"emoji":"💕","category":0,"name":"two hearts","version":"1.0"},{"emoji":"💟","category":0,"name":"heart decoration","version":"1.0"},{"emoji":"❣️","category":0,"name":"heart exclamation","version":"1.0"},{"emoji":"💔","category":0,"name":"broken heart","version":"1.0"},{"emoji":"❤️","category":0,"name":"red heart","version":"1.0"},{"emoji":"🧡","category":0,"name":"orange heart","version":"5.0"},{"emoji":"💛","category":0,"name":"yellow heart","version":"1.0"},{"emoji":"💚","category":0,"name":"green heart","version":"1.0"},{"emoji":"💙","category":0,"name":"blue heart","version":"1.0"},{"emoji":"💜","category":0,"name":"purple heart","version":"1.0"},{"emoji":"🤎","category":0,"name":"brown heart","version":"12.0"},{"emoji":"🖤","category":0,"name":"black heart","version":"3.0"},{"emoji":"🤍","category":0,"name":"white heart","version":"12.0"},{"emoji":"💯","category":0,"name":"hundred points","version":"1.0"},{"emoji":"💢","category":0,"name":"anger symbol","version":"1.0"},{"emoji":"💥","category":0,"name":"collision","version":"1.0"},{"emoji":"💫","category":0,"name":"dizzy","version":"1.0"},{"emoji":"💦","category":0,"name":"sweat droplets","version":"1.0"},{"emoji":"💨","category":0,"name":"dashing away","version":"1.0"},{"emoji":"🕳️","category":0,"name":"hole","version":"1.0"},{"emoji":"💣","category":0,"name":"bomb","version":"1.0"},{"emoji":"💬","category":0,"name":"speech balloon","version":"1.0"},{"emoji":"👁️‍🗨️","category":0,"name":"eye in speech bubble","version":"2.0"},{"emoji":"🗨️","category":0,"name":"left speech bubble","version":"2.0"},{"emoji":"🗯️","category":0,"name":"right anger bubble","version":"1.0"},{"emoji":"💭","category":0,"name":"thought balloon","version":"1.0"},{"emoji":"💤","category":0,"name":"zzz","version":"1.0"},{"emoji":"👋","category":1,"name":"waving hand","variations":["👋🏻","👋🏼","👋🏽","👋🏾","👋🏿"],"version":"1.0"},{"emoji":"🤚","category":1,"name":"raised back of hand","variations":["🤚🏻","🤚🏼","🤚🏽","🤚🏾","🤚🏿"],"version":"3.0"},{"emoji":"🖐️","category":1,"name":"hand with fingers splayed","variations":["🖐🏻","🖐🏼","🖐🏽","🖐🏾","🖐🏿"],"version":"1.0"},{"emoji":"✋","category":1,"name":"raised hand","variations":["✋🏻","✋🏼","✋🏽","✋🏾","✋🏿"],"version":"1.0"},{"emoji":"🖖","category":1,"name":"vulcan salute","variations":["🖖🏻","🖖🏼","🖖🏽","🖖🏾","🖖🏿"],"version":"1.0"},{"emoji":"👌","category":1,"name":"OK hand","variations":["👌🏻","👌🏼","👌🏽","👌🏾","👌🏿"],"version":"1.0"},{"emoji":"🤌","category":1,"name":"pinched fingers","variations":["🤌🏻","🤌🏼","🤌🏽","🤌🏾","🤌🏿"],"version":"13.0"},{"emoji":"🤏","category":1,"name":"pinching hand","variations":["🤏🏻","🤏🏼","🤏🏽","🤏🏾","🤏🏿"],"version":"12.0"},{"emoji":"✌️","category":1,"name":"victory hand","variations":["✌🏻","✌🏼","✌🏽","✌🏾","✌🏿"],"version":"1.0"},{"emoji":"🤞","category":1,"name":"crossed fingers","variations":["🤞🏻","🤞🏼","🤞🏽","🤞🏾","🤞🏿"],"version":"3.0"},{"emoji":"🤟","category":1,"name":"love-you gesture","variations":["🤟🏻","🤟🏼","🤟🏽","🤟🏾","🤟🏿"],"version":"5.0"},{"emoji":"🤘","category":1,"name":"sign of the horns","variations":["🤘🏻","🤘🏼","🤘🏽","🤘🏾","🤘🏿"],"version":"1.0"},{"emoji":"🤙","category":1,"name":"call me hand","variations":["🤙🏻","🤙🏼","🤙🏽","🤙🏾","🤙🏿"],"version":"3.0"},{"emoji":"👈","category":1,"name":"backhand index pointing left","variations":["👈🏻","👈🏼","👈🏽","👈🏾","👈🏿"],"version":"1.0"},{"emoji":"👉","category":1,"name":"backhand index pointing right","variations":["👉🏻","👉🏼","👉🏽","👉🏾","👉🏿"],"version":"1.0"},{"emoji":"👆","category":1,"name":"backhand index pointing up","variations":["👆🏻","👆🏼","👆🏽","👆🏾","👆🏿"],"version":"1.0"},{"emoji":"🖕","category":1,"name":"middle finger","variations":["🖕🏻","🖕🏼","🖕🏽","🖕🏾","🖕🏿"],"version":"1.0"},{"emoji":"👇","category":1,"name":"backhand index pointing down","variations":["👇🏻","👇🏼","👇🏽","👇🏾","👇🏿"],"version":"1.0"},{"emoji":"☝️","category":1,"name":"index pointing up","variations":["☝🏻","☝🏼","☝🏽","☝🏾","☝🏿"],"version":"1.0"},{"emoji":"👍","category":1,"name":"thumbs up","variations":["👍🏻","👍🏼","👍🏽","👍🏾","👍🏿"],"version":"1.0"},{"emoji":"👎","category":1,"name":"thumbs down","variations":["👎🏻","👎🏼","👎🏽","👎🏾","👎🏿"],"version":"1.0"},{"emoji":"✊","category":1,"name":"raised fist","variations":["✊🏻","✊🏼","✊🏽","✊🏾","✊🏿"],"version":"1.0"},{"emoji":"👊","category":1,"name":"oncoming fist","variations":["👊🏻","👊🏼","👊🏽","👊🏾","👊🏿"],"version":"1.0"},{"emoji":"🤛","category":1,"name":"left-facing fist","variations":["🤛🏻","🤛🏼","🤛🏽","🤛🏾","🤛🏿"],"version":"3.0"},{"emoji":"🤜","category":1,"name":"right-facing fist","variations":["🤜🏻","🤜🏼","🤜🏽","🤜🏾","🤜🏿"],"version":"3.0"},{"emoji":"👏","category":1,"name":"clapping hands","variations":["👏🏻","👏🏼","👏🏽","👏🏾","👏🏿"],"version":"1.0"},{"emoji":"🙌","category":1,"name":"raising hands","variations":["🙌🏻","🙌🏼","🙌🏽","🙌🏾","🙌🏿"],"version":"1.0"},{"emoji":"👐","category":1,"name":"open hands","variations":["👐🏻","👐🏼","👐🏽","👐🏾","👐🏿"],"version":"1.0"},{"emoji":"🤲","category":1,"name":"palms up together","variations":["🤲🏻","🤲🏼","🤲🏽","🤲🏾","🤲🏿"],"version":"5.0"},{"emoji":"🤝","category":1,"name":"handshake","version":"3.0"},{"emoji":"🙏","category":1,"name":"folded hands","variations":["🙏🏻","🙏🏼","🙏🏽","🙏🏾","🙏🏿"],"version":"1.0"},{"emoji":"✍️","category":1,"name":"writing hand","variations":["✍🏻","✍🏼","✍🏽","✍🏾","✍🏿"],"version":"1.0"},{"emoji":"💅","category":1,"name":"nail polish","variations":["💅🏻","💅🏼","💅🏽","💅🏾","💅🏿"],"version":"1.0"},{"emoji":"🤳","category":1,"name":"selfie","variations":["🤳🏻","🤳🏼","🤳🏽","🤳🏾","🤳🏿"],"version":"3.0"},{"emoji":"💪","category":1,"name":"flexed biceps","variations":["💪🏻","💪🏼","💪🏽","💪🏾","💪🏿"],"version":"1.0"},{"emoji":"🦾","category":1,"name":"mechanical arm","version":"12.0"},{"emoji":"🦿","category":1,"name":"mechanical leg","version":"12.0"},{"emoji":"🦵","category":1,"name":"leg","variations":["🦵🏻","🦵🏼","🦵🏽","🦵🏾","🦵🏿"],"version":"11.0"},{"emoji":"🦶","category":1,"name":"foot","variations":["🦶🏻","🦶🏼","🦶🏽","🦶🏾","🦶🏿"],"version":"11.0"},{"emoji":"👂","category":1,"name":"ear","variations":["👂🏻","👂🏼","👂🏽","👂🏾","👂🏿"],"version":"1.0"},{"emoji":"🦻","category":1,"name":"ear with hearing aid","variations":["🦻🏻","🦻🏼","🦻🏽","🦻🏾","🦻🏿"],"version":"12.0"},{"emoji":"👃","category":1,"name":"nose","variations":["👃🏻","👃🏼","👃🏽","👃🏾","👃🏿"],"version":"1.0"},{"emoji":"🧠","category":1,"name":"brain","version":"5.0"},{"emoji":"🫀","category":1,"name":"anatomical heart","version":"13.0"},{"emoji":"🫁","category":1,"name":"lungs","version":"13.0"},{"emoji":"🦷","category":1,"name":"tooth","version":"11.0"},{"emoji":"🦴","category":1,"name":"bone","version":"11.0"},{"emoji":"👀","category":1,"name":"eyes","version":"1.0"},{"emoji":"👁️","category":1,"name":"eye","version":"1.0"},{"emoji":"👅","category":1,"name":"tongue","version":"1.0"},{"emoji":"👄","category":1,"name":"mouth","version":"1.0"},{"emoji":"👶","category":1,"name":"baby","variations":["👶🏻","👶🏼","👶🏽","👶🏾","👶🏿"],"version":"1.0"},{"emoji":"🧒","category":1,"name":"child","variations":["🧒🏻","🧒🏼","🧒🏽","🧒🏾","🧒🏿"],"version":"5.0"},{"emoji":"👦","category":1,"name":"boy","variations":["👦🏻","👦🏼","👦🏽","👦🏾","👦🏿"],"version":"1.0"},{"emoji":"👧","category":1,"name":"girl","variations":["👧🏻","👧🏼","👧🏽","👧🏾","👧🏿"],"version":"1.0"},{"emoji":"🧑","category":1,"name":"person","variations":["🧑🏻","🧑🏼","🧑🏽","🧑🏾","🧑🏿"],"version":"5.0"},{"emoji":"👱","category":1,"name":"person with blond hair","variations":["👱🏻","👱🏼","👱🏽","👱🏾","👱🏿"],"version":"1.0"},{"emoji":"👨","category":1,"name":"man","variations":["👨🏻","👨🏼","👨🏽","👨🏾","👨🏿"],"version":"1.0"},{"emoji":"🧔","category":1,"name":"man with beard","variations":["🧔🏻","🧔🏼","🧔🏽","🧔🏾","🧔🏿"],"version":"5.0"},{"emoji":"👨‍🦰","category":1,"name":"man with red hair","variations":["👨🏻‍🦰","👨🏼‍🦰","👨🏽‍🦰","👨🏾‍🦰","👨🏿‍🦰"],"version":"11.0"},{"emoji":"👨‍🦱","category":1,"name":"man with curly hair","variations":["👨🏻‍🦱","👨🏼‍🦱","👨🏽‍🦱","👨🏾‍🦱","👨🏿‍🦱"],"version":"11.0"},{"emoji":"👨‍🦳","category":1,"name":"man with white hair","variations":["👨🏻‍🦳","👨🏼‍🦳","👨🏽‍🦳","👨🏾‍🦳","👨🏿‍🦳"],"version":"11.0"},{"emoji":"👨‍🦲","category":1,"name":"man with no hair","variations":["👨🏻‍🦲","👨🏼‍🦲","👨🏽‍🦲","👨🏾‍🦲","👨🏿‍🦲"],"version":"11.0"},{"emoji":"👩","category":1,"name":"woman","variations":["👩🏻","👩🏼","👩🏽","👩🏾","👩🏿"],"version":"1.0"},{"emoji":"👩‍🦰","category":1,"name":"woman with red hair","variations":["👩🏻‍🦰","👩🏼‍🦰","👩🏽‍🦰","👩🏾‍🦰","👩🏿‍🦰"],"version":"11.0"},{"emoji":"🧑‍🦰","category":1,"name":"person with red hair","variations":["🧑🏻‍🦰","🧑🏼‍🦰","🧑🏽‍🦰","🧑🏾‍🦰","🧑🏿‍🦰"],"version":"12.1"},{"emoji":"👩‍🦱","category":1,"name":"woman with curly hair","variations":["👩🏻‍🦱","👩🏼‍🦱","👩🏽‍🦱","👩🏾‍🦱","👩🏿‍🦱"],"version":"11.0"},{"emoji":"🧑‍🦱","category":1,"name":"person with curly hair","variations":["🧑🏻‍🦱","🧑🏼‍🦱","🧑🏽‍🦱","🧑🏾‍🦱","🧑🏿‍🦱"],"version":"12.1"},{"emoji":"👩‍🦳","category":1,"name":"woman with white hair","variations":["👩🏻‍🦳","👩🏼‍🦳","👩🏽‍🦳","👩🏾‍🦳","👩🏿‍🦳"],"version":"11.0"},{"emoji":"🧑‍🦳","category":1,"name":"person with white hair","variations":["🧑🏻‍🦳","🧑🏼‍🦳","🧑🏽‍🦳","🧑🏾‍🦳","🧑🏿‍🦳"],"version":"12.1"},{"emoji":"👩‍🦲","category":1,"name":"woman with no hair","variations":["👩🏻‍🦲","👩🏼‍🦲","👩🏽‍🦲","👩🏾‍🦲","👩🏿‍🦲"],"version":"11.0"},{"emoji":"🧑‍🦲","category":1,"name":"person with no hair","variations":["🧑🏻‍🦲","🧑🏼‍🦲","🧑🏽‍🦲","🧑🏾‍🦲","🧑🏿‍🦲"],"version":"12.1"},{"emoji":"👱‍♀️","category":1,"name":"woman with blond hair","variations":["👱🏻‍♀️","👱🏼‍♀️","👱🏽‍♀️","👱🏾‍♀️","👱🏿‍♀️"],"version":"4.0"},{"emoji":"👱‍♂️","category":1,"name":"man with blond hair","variations":["👱🏻‍♂️","👱🏼‍♂️","👱🏽‍♂️","👱🏾‍♂️","👱🏿‍♂️"],"version":"4.0"},{"emoji":"🧓","category":1,"name":"older person","variations":["🧓🏻","🧓🏼","🧓🏽","🧓🏾","🧓🏿"],"version":"5.0"},{"emoji":"👴","category":1,"name":"old man","variations":["👴🏻","👴🏼","👴🏽","👴🏾","👴🏿"],"version":"1.0"},{"emoji":"👵","category":1,"name":"old woman","variations":["👵🏻","👵🏼","👵🏽","👵🏾","👵🏿"],"version":"1.0"},{"emoji":"🙍","category":1,"name":"person frowning","variations":["🙍🏻","🙍🏼","🙍🏽","🙍🏾","🙍🏿"],"version":"1.0"},{"emoji":"🙍‍♂️","category":1,"name":"man frowning","variations":["🙍🏻‍♂️","🙍🏼‍♂️","🙍🏽‍♂️","🙍🏾‍♂️","🙍🏿‍♂️"],"version":"4.0"},{"emoji":"🙍‍♀️","category":1,"name":"woman frowning","variations":["🙍🏻‍♀️","🙍🏼‍♀️","🙍🏽‍♀️","🙍🏾‍♀️","🙍🏿‍♀️"],"version":"4.0"},{"emoji":"🙎","category":1,"name":"person pouting","variations":["🙎🏻","🙎🏼","🙎🏽","🙎🏾","🙎🏿"],"version":"1.0"},{"emoji":"🙎‍♂️","category":1,"name":"man pouting","variations":["🙎🏻‍♂️","🙎🏼‍♂️","🙎🏽‍♂️","🙎🏾‍♂️","🙎🏿‍♂️"],"version":"4.0"},{"emoji":"🙎‍♀️","category":1,"name":"woman pouting","variations":["🙎🏻‍♀️","🙎🏼‍♀️","🙎🏽‍♀️","🙎🏾‍♀️","🙎🏿‍♀️"],"version":"4.0"},{"emoji":"🙅","category":1,"name":"person gesturing NO","variations":["🙅🏻","🙅🏼","🙅🏽","🙅🏾","🙅🏿"],"version":"1.0"},{"emoji":"🙅‍♂️","category":1,"name":"man gesturing NO","variations":["🙅🏻‍♂️","🙅🏼‍♂️","🙅🏽‍♂️","🙅🏾‍♂️","🙅🏿‍♂️"],"version":"4.0"},{"emoji":"🙅‍♀️","category":1,"name":"woman gesturing NO","variations":["🙅🏻‍♀️","🙅🏼‍♀️","🙅🏽‍♀️","🙅🏾‍♀️","🙅🏿‍♀️"],"version":"4.0"},{"emoji":"🙆","category":1,"name":"person gesturing OK","variations":["🙆🏻","🙆🏼","🙆🏽","🙆🏾","🙆🏿"],"version":"1.0"},{"emoji":"🙆‍♂️","category":1,"name":"man gesturing OK","variations":["🙆🏻‍♂️","🙆🏼‍♂️","🙆🏽‍♂️","🙆🏾‍♂️","🙆🏿‍♂️"],"version":"4.0"},{"emoji":"🙆‍♀️","category":1,"name":"woman gesturing OK","variations":["🙆🏻‍♀️","🙆🏼‍♀️","🙆🏽‍♀️","🙆🏾‍♀️","🙆🏿‍♀️"],"version":"4.0"},{"emoji":"💁","category":1,"name":"person tipping hand","variations":["💁🏻","💁🏼","💁🏽","💁🏾","💁🏿"],"version":"1.0"},{"emoji":"💁‍♂️","category":1,"name":"man tipping hand","variations":["💁🏻‍♂️","💁🏼‍♂️","💁🏽‍♂️","💁🏾‍♂️","💁🏿‍♂️"],"version":"4.0"},{"emoji":"💁‍♀️","category":1,"name":"woman tipping hand","variations":["💁🏻‍♀️","💁🏼‍♀️","💁🏽‍♀️","💁🏾‍♀️","💁🏿‍♀️"],"version":"4.0"},{"emoji":"🙋","category":1,"name":"person raising hand","variations":["🙋🏻","🙋🏼","🙋🏽","🙋🏾","🙋🏿"],"version":"1.0"},{"emoji":"🙋‍♂️","category":1,"name":"man raising hand","variations":["🙋🏻‍♂️","🙋🏼‍♂️","🙋🏽‍♂️","🙋🏾‍♂️","🙋🏿‍♂️"],"version":"4.0"},{"emoji":"🙋‍♀️","category":1,"name":"woman raising hand","variations":["🙋🏻‍♀️","🙋🏼‍♀️","🙋🏽‍♀️","🙋🏾‍♀️","🙋🏿‍♀️"],"version":"4.0"},{"emoji":"🧏","category":1,"name":"deaf person","variations":["🧏🏻","🧏🏼","🧏🏽","🧏🏾","🧏🏿"],"version":"12.0"},{"emoji":"🧏‍♂️","category":1,"name":"deaf man","variations":["🧏🏻‍♂️","🧏🏼‍♂️","🧏🏽‍♂️","🧏🏾‍♂️","🧏🏿‍♂️"],"version":"12.0"},{"emoji":"🧏‍♀️","category":1,"name":"deaf woman","variations":["🧏🏻‍♀️","🧏🏼‍♀️","🧏🏽‍♀️","🧏🏾‍♀️","🧏🏿‍♀️"],"version":"12.0"},{"emoji":"🙇","category":1,"name":"person bowing","variations":["🙇🏻","🙇🏼","🙇🏽","🙇🏾","🙇🏿"],"version":"1.0"},{"emoji":"🙇‍♂️","category":1,"name":"man bowing","variations":["🙇🏻‍♂️","🙇🏼‍♂️","🙇🏽‍♂️","🙇🏾‍♂️","🙇🏿‍♂️"],"version":"4.0"},{"emoji":"🙇‍♀️","category":1,"name":"woman bowing","variations":["🙇🏻‍♀️","🙇🏼‍♀️","🙇🏽‍♀️","🙇🏾‍♀️","🙇🏿‍♀️"],"version":"4.0"},{"emoji":"🤦","category":1,"name":"person facepalming","variations":["🤦🏻","🤦🏼","🤦🏽","🤦🏾","🤦🏿"],"version":"3.0"},{"emoji":"🤦‍♂️","category":1,"name":"man facepalming","variations":["🤦🏻‍♂️","🤦🏼‍♂️","🤦🏽‍♂️","🤦🏾‍♂️","🤦🏿‍♂️"],"version":"4.0"},{"emoji":"🤦‍♀️","category":1,"name":"woman facepalming","variations":["🤦🏻‍♀️","🤦🏼‍♀️","🤦🏽‍♀️","🤦🏾‍♀️","🤦🏿‍♀️"],"version":"4.0"},{"emoji":"🤷","category":1,"name":"person shrugging","variations":["🤷🏻","🤷🏼","🤷🏽","🤷🏾","🤷🏿"],"version":"3.0"},{"emoji":"🤷‍♂️","category":1,"name":"man shrugging","variations":["🤷🏻‍♂️","🤷🏼‍♂️","🤷🏽‍♂️","🤷🏾‍♂️","🤷🏿‍♂️"],"version":"4.0"},{"emoji":"🤷‍♀️","category":1,"name":"woman shrugging","variations":["🤷🏻‍♀️","🤷🏼‍♀️","🤷🏽‍♀️","🤷🏾‍♀️","🤷🏿‍♀️"],"version":"4.0"},{"emoji":"🧑‍⚕️","category":1,"name":"health worker","variations":["🧑🏻‍⚕️","🧑🏼‍⚕️","🧑🏽‍⚕️","🧑🏾‍⚕️","🧑🏿‍⚕️"],"version":"12.1"},{"emoji":"👨‍⚕️","category":1,"name":"man health worker","variations":["👨🏻‍⚕️","👨🏼‍⚕️","👨🏽‍⚕️","👨🏾‍⚕️","👨🏿‍⚕️"],"version":"4.0"},{"emoji":"👩‍⚕️","category":1,"name":"woman health worker","variations":["👩🏻‍⚕️","👩🏼‍⚕️","👩🏽‍⚕️","👩🏾‍⚕️","👩🏿‍⚕️"],"version":"4.0"},{"emoji":"🧑‍🎓","category":1,"name":"student","variations":["🧑🏻‍🎓","🧑🏼‍🎓","🧑🏽‍🎓","🧑🏾‍🎓","🧑🏿‍🎓"],"version":"12.1"},{"emoji":"👨‍🎓","category":1,"name":"man student","variations":["👨🏻‍🎓","👨🏼‍🎓","👨🏽‍🎓","👨🏾‍🎓","👨🏿‍🎓"],"version":"4.0"},{"emoji":"👩‍🎓","category":1,"name":"woman student","variations":["👩🏻‍🎓","👩🏼‍🎓","👩🏽‍🎓","👩🏾‍🎓","👩🏿‍🎓"],"version":"4.0"},{"emoji":"🧑‍🏫","category":1,"name":"teacher","variations":["🧑🏻‍🏫","🧑🏼‍🏫","🧑🏽‍🏫","🧑🏾‍🏫","🧑🏿‍🏫"],"version":"12.1"},{"emoji":"👨‍🏫","category":1,"name":"man teacher","variations":["👨🏻‍🏫","👨🏼‍🏫","👨🏽‍🏫","👨🏾‍🏫","👨🏿‍🏫"],"version":"4.0"},{"emoji":"👩‍🏫","category":1,"name":"woman teacher","variations":["👩🏻‍🏫","👩🏼‍🏫","👩🏽‍🏫","👩🏾‍🏫","👩🏿‍🏫"],"version":"4.0"},{"emoji":"🧑‍⚖️","category":1,"name":"judge","variations":["🧑🏻‍⚖️","🧑🏼‍⚖️","🧑🏽‍⚖️","🧑🏾‍⚖️","🧑🏿‍⚖️"],"version":"12.1"},{"emoji":"👨‍⚖️","category":1,"name":"man judge","variations":["👨🏻‍⚖️","👨🏼‍⚖️","👨🏽‍⚖️","👨🏾‍⚖️","👨🏿‍⚖️"],"version":"4.0"},{"emoji":"👩‍⚖️","category":1,"name":"woman judge","variations":["👩🏻‍⚖️","👩🏼‍⚖️","👩🏽‍⚖️","👩🏾‍⚖️","👩🏿‍⚖️"],"version":"4.0"},{"emoji":"🧑‍🌾","category":1,"name":"farmer","variations":["🧑🏻‍🌾","🧑🏼‍🌾","🧑🏽‍🌾","🧑🏾‍🌾","🧑🏿‍🌾"],"version":"12.1"},{"emoji":"👨‍🌾","category":1,"name":"man farmer","variations":["👨🏻‍🌾","👨🏼‍🌾","👨🏽‍🌾","👨🏾‍🌾","👨🏿‍🌾"],"version":"4.0"},{"emoji":"👩‍🌾","category":1,"name":"woman farmer","variations":["👩🏻‍🌾","👩🏼‍🌾","👩🏽‍🌾","👩🏾‍🌾","👩🏿‍🌾"],"version":"4.0"},{"emoji":"🧑‍🍳","category":1,"name":"cook","variations":["🧑🏻‍🍳","🧑🏼‍🍳","🧑🏽‍🍳","🧑🏾‍🍳","🧑🏿‍🍳"],"version":"12.1"},{"emoji":"👨‍🍳","category":1,"name":"man cook","variations":["👨🏻‍🍳","👨🏼‍🍳","👨🏽‍🍳","👨🏾‍🍳","👨🏿‍🍳"],"version":"4.0"},{"emoji":"👩‍🍳","category":1,"name":"woman cook","variations":["👩🏻‍🍳","👩🏼‍🍳","👩🏽‍🍳","👩🏾‍🍳","👩🏿‍🍳"],"version":"4.0"},{"emoji":"🧑‍🔧","category":1,"name":"mechanic","variations":["🧑🏻‍🔧","🧑🏼‍🔧","🧑🏽‍🔧","🧑🏾‍🔧","🧑🏿‍🔧"],"version":"12.1"},{"emoji":"👨‍🔧","category":1,"name":"man mechanic","variations":["👨🏻‍🔧","👨🏼‍🔧","👨🏽‍🔧","👨🏾‍🔧","👨🏿‍🔧"],"version":"4.0"},{"emoji":"👩‍🔧","category":1,"name":"woman mechanic","variations":["👩🏻‍🔧","👩🏼‍🔧","👩🏽‍🔧","👩🏾‍🔧","👩🏿‍🔧"],"version":"4.0"},{"emoji":"🧑‍🏭","category":1,"name":"factory worker","variations":["🧑🏻‍🏭","🧑🏼‍🏭","🧑🏽‍🏭","🧑🏾‍🏭","🧑🏿‍🏭"],"version":"12.1"},{"emoji":"👨‍🏭","category":1,"name":"man factory worker","variations":["👨🏻‍🏭","👨🏼‍🏭","👨🏽‍🏭","👨🏾‍🏭","👨🏿‍🏭"],"version":"4.0"},{"emoji":"👩‍🏭","category":1,"name":"woman factory worker","variations":["👩🏻‍🏭","👩🏼‍🏭","👩🏽‍🏭","👩🏾‍🏭","👩🏿‍🏭"],"version":"4.0"},{"emoji":"🧑‍💼","category":1,"name":"office worker","variations":["🧑🏻‍💼","🧑🏼‍💼","🧑🏽‍💼","🧑🏾‍💼","🧑🏿‍💼"],"version":"12.1"},{"emoji":"👨‍💼","category":1,"name":"man office worker","variations":["👨🏻‍💼","👨🏼‍💼","👨🏽‍💼","👨🏾‍💼","👨🏿‍💼"],"version":"4.0"},{"emoji":"👩‍💼","category":1,"name":"woman office worker","variations":["👩🏻‍💼","👩🏼‍💼","👩🏽‍💼","👩🏾‍💼","👩🏿‍💼"],"version":"4.0"},{"emoji":"🧑‍🔬","category":1,"name":"scientist","variations":["🧑🏻‍🔬","🧑🏼‍🔬","🧑🏽‍🔬","🧑🏾‍🔬","🧑🏿‍🔬"],"version":"12.1"},{"emoji":"👨‍🔬","category":1,"name":"man scientist","variations":["👨🏻‍🔬","👨🏼‍🔬","👨🏽‍🔬","👨🏾‍🔬","👨🏿‍🔬"],"version":"4.0"},{"emoji":"👩‍🔬","category":1,"name":"woman scientist","variations":["👩🏻‍🔬","👩🏼‍🔬","👩🏽‍🔬","👩🏾‍🔬","👩🏿‍🔬"],"version":"4.0"},{"emoji":"🧑‍💻","category":1,"name":"technologist","variations":["🧑🏻‍💻","🧑🏼‍💻","🧑🏽‍💻","🧑🏾‍💻","🧑🏿‍💻"],"version":"12.1"},{"emoji":"👨‍💻","category":1,"name":"man technologist","variations":["👨🏻‍💻","👨🏼‍💻","👨🏽‍💻","👨🏾‍💻","👨🏿‍💻"],"version":"4.0"},{"emoji":"👩‍💻","category":1,"name":"woman technologist","variations":["👩🏻‍💻","👩🏼‍💻","👩🏽‍💻","👩🏾‍💻","👩🏿‍💻"],"version":"4.0"},{"emoji":"🧑‍🎤","category":1,"name":"singer","variations":["🧑🏻‍🎤","🧑🏼‍🎤","🧑🏽‍🎤","🧑🏾‍🎤","🧑🏿‍🎤"],"version":"12.1"},{"emoji":"👨‍🎤","category":1,"name":"man singer","variations":["👨🏻‍🎤","👨🏼‍🎤","👨🏽‍🎤","👨🏾‍🎤","👨🏿‍🎤"],"version":"4.0"},{"emoji":"👩‍🎤","category":1,"name":"woman singer","variations":["👩🏻‍🎤","👩🏼‍🎤","👩🏽‍🎤","👩🏾‍🎤","👩🏿‍🎤"],"version":"4.0"},{"emoji":"🧑‍🎨","category":1,"name":"artist","variations":["🧑🏻‍🎨","🧑🏼‍🎨","🧑🏽‍🎨","🧑🏾‍🎨","🧑🏿‍🎨"],"version":"12.1"},{"emoji":"👨‍🎨","category":1,"name":"man artist","variations":["👨🏻‍🎨","👨🏼‍🎨","👨🏽‍🎨","👨🏾‍🎨","👨🏿‍🎨"],"version":"4.0"},{"emoji":"👩‍🎨","category":1,"name":"woman artist","variations":["👩🏻‍🎨","👩🏼‍🎨","👩🏽‍🎨","👩🏾‍🎨","👩🏿‍🎨"],"version":"4.0"},{"emoji":"🧑‍✈️","category":1,"name":"pilot","variations":["🧑🏻‍✈️","🧑🏼‍✈️","🧑🏽‍✈️","🧑🏾‍✈️","🧑🏿‍✈️"],"version":"12.1"},{"emoji":"👨‍✈️","category":1,"name":"man pilot","variations":["👨🏻‍✈️","👨🏼‍✈️","👨🏽‍✈️","👨🏾‍✈️","👨🏿‍✈️"],"version":"4.0"},{"emoji":"👩‍✈️","category":1,"name":"woman pilot","variations":["👩🏻‍✈️","👩🏼‍✈️","👩🏽‍✈️","👩🏾‍✈️","👩🏿‍✈️"],"version":"4.0"},{"emoji":"🧑‍🚀","category":1,"name":"astronaut","variations":["🧑🏻‍🚀","🧑🏼‍🚀","🧑🏽‍🚀","🧑🏾‍🚀","🧑🏿‍🚀"],"version":"12.1"},{"emoji":"👨‍🚀","category":1,"name":"man astronaut","variations":["👨🏻‍🚀","👨🏼‍🚀","👨🏽‍🚀","👨🏾‍🚀","👨🏿‍🚀"],"version":"4.0"},{"emoji":"👩‍🚀","category":1,"name":"woman astronaut","variations":["👩🏻‍🚀","👩🏼‍🚀","👩🏽‍🚀","👩🏾‍🚀","👩🏿‍🚀"],"version":"4.0"},{"emoji":"🧑‍🚒","category":1,"name":"firefighter","variations":["🧑🏻‍🚒","🧑🏼‍🚒","🧑🏽‍🚒","🧑🏾‍🚒","🧑🏿‍🚒"],"version":"12.1"},{"emoji":"👨‍🚒","category":1,"name":"man firefighter","variations":["👨🏻‍🚒","👨🏼‍🚒","👨🏽‍🚒","👨🏾‍🚒","👨🏿‍🚒"],"version":"4.0"},{"emoji":"👩‍🚒","category":1,"name":"woman firefighter","variations":["👩🏻‍🚒","👩🏼‍🚒","👩🏽‍🚒","👩🏾‍🚒","👩🏿‍🚒"],"version":"4.0"},{"emoji":"👮","category":1,"name":"police officer","variations":["👮🏻","👮🏼","👮🏽","👮🏾","👮🏿"],"version":"1.0"},{"emoji":"👮‍♂️","category":1,"name":"man police officer","variations":["👮🏻‍♂️","👮🏼‍♂️","👮🏽‍♂️","👮🏾‍♂️","👮🏿‍♂️"],"version":"4.0"},{"emoji":"👮‍♀️","category":1,"name":"woman police officer","variations":["👮🏻‍♀️","👮🏼‍♀️","👮🏽‍♀️","👮🏾‍♀️","👮🏿‍♀️"],"version":"4.0"},{"emoji":"🕵️","category":1,"name":"detective","variations":["🕵🏻","🕵🏼","🕵🏽","🕵🏾","🕵🏿"],"version":"1.0"},{"emoji":"🕵️‍♂️","category":1,"name":"man detective","variations":["🕵🏻‍♂️","🕵🏼‍♂️","🕵🏽‍♂️","🕵🏾‍♂️","🕵🏿‍♂️"],"version":"4.0"},{"emoji":"🕵️‍♀️","category":1,"name":"woman detective","variations":["🕵🏻‍♀️","🕵🏼‍♀️","🕵🏽‍♀️","🕵🏾‍♀️","🕵🏿‍♀️"],"version":"4.0"},{"emoji":"💂","category":1,"name":"guard","variations":["💂🏻","💂🏼","💂🏽","💂🏾","💂🏿"],"version":"1.0"},{"emoji":"💂‍♂️","category":1,"name":"man guard","variations":["💂🏻‍♂️","💂🏼‍♂️","💂🏽‍♂️","💂🏾‍♂️","💂🏿‍♂️"],"version":"4.0"},{"emoji":"💂‍♀️","category":1,"name":"woman guard","variations":["💂🏻‍♀️","💂🏼‍♀️","💂🏽‍♀️","💂🏾‍♀️","💂🏿‍♀️"],"version":"4.0"},{"emoji":"🥷","category":1,"name":"ninja","variations":["🥷🏻","🥷🏼","🥷🏽","🥷🏾","🥷🏿"],"version":"13.0"},{"emoji":"👷","category":1,"name":"construction worker","variations":["👷🏻","👷🏼","👷🏽","👷🏾","👷🏿"],"version":"1.0"},{"emoji":"👷‍♂️","category":1,"name":"man construction worker","variations":["👷🏻‍♂️","👷🏼‍♂️","👷🏽‍♂️","👷🏾‍♂️","👷🏿‍♂️"],"version":"4.0"},{"emoji":"👷‍♀️","category":1,"name":"woman construction worker","variations":["👷🏻‍♀️","👷🏼‍♀️","👷🏽‍♀️","👷🏾‍♀️","👷🏿‍♀️"],"version":"4.0"},{"emoji":"🤴","category":1,"name":"prince","variations":["🤴🏻","🤴🏼","🤴🏽","🤴🏾","🤴🏿"],"version":"3.0"},{"emoji":"👸","category":1,"name":"princess","variations":["👸🏻","👸🏼","👸🏽","👸🏾","👸🏿"],"version":"1.0"},{"emoji":"👳","category":1,"name":"person wearing turban","variations":["👳🏻","👳🏼","👳🏽","👳🏾","👳🏿"],"version":"1.0"},{"emoji":"👳‍♂️","category":1,"name":"man wearing turban","variations":["👳🏻‍♂️","👳🏼‍♂️","👳🏽‍♂️","👳🏾‍♂️","👳🏿‍♂️"],"version":"4.0"},{"emoji":"👳‍♀️","category":1,"name":"woman wearing turban","variations":["👳🏻‍♀️","👳🏼‍♀️","👳🏽‍♀️","👳🏾‍♀️","👳🏿‍♀️"],"version":"4.0"},{"emoji":"👲","category":1,"name":"person with skullcap","variations":["👲🏻","👲🏼","👲🏽","👲🏾","👲🏿"],"version":"1.0"},{"emoji":"🧕","category":1,"name":"woman with headscarf","variations":["🧕🏻","🧕🏼","🧕🏽","🧕🏾","🧕🏿"],"version":"5.0"},{"emoji":"🤵","category":1,"name":"person in tuxedo","variations":["🤵🏻","🤵🏼","🤵🏽","🤵🏾","🤵🏿"],"version":"3.0"},{"emoji":"🤵‍♂️","category":1,"name":"man in tuxedo","variations":["🤵🏻‍♂️","🤵🏼‍♂️","🤵🏽‍♂️","🤵🏾‍♂️","🤵🏿‍♂️"],"version":"13.0"},{"emoji":"🤵‍♀️","category":1,"name":"woman in tuxedo","variations":["🤵🏻‍♀️","🤵🏼‍♀️","🤵🏽‍♀️","🤵🏾‍♀️","🤵🏿‍♀️"],"version":"13.0"},{"emoji":"👰","category":1,"name":"person with veil","variations":["👰🏻","👰🏼","👰🏽","👰🏾","👰🏿"],"version":"1.0"},{"emoji":"👰‍♂️","category":1,"name":"man with veil","variations":["👰🏻‍♂️","👰🏼‍♂️","👰🏽‍♂️","👰🏾‍♂️","👰🏿‍♂️"],"version":"13.0"},{"emoji":"👰‍♀️","category":1,"name":"woman with veil","variations":["👰🏻‍♀️","👰🏼‍♀️","👰🏽‍♀️","👰🏾‍♀️","👰🏿‍♀️"],"version":"13.0"},{"emoji":"🤰","category":1,"name":"pregnant woman","variations":["🤰🏻","🤰🏼","🤰🏽","🤰🏾","🤰🏿"],"version":"3.0"},{"emoji":"🤱","category":1,"name":"breast-feeding","variations":["🤱🏻","🤱🏼","🤱🏽","🤱🏾","🤱🏿"],"version":"5.0"},{"emoji":"👩‍🍼","category":1,"name":"woman feeding baby","variations":["👩🏻‍🍼","👩🏼‍🍼","👩🏽‍🍼","👩🏾‍🍼","👩🏿‍🍼"],"version":"13.0"},{"emoji":"👨‍🍼","category":1,"name":"man feeding baby","variations":["👨🏻‍🍼","👨🏼‍🍼","👨🏽‍🍼","👨🏾‍🍼","👨🏿‍🍼"],"version":"13.0"},{"emoji":"🧑‍🍼","category":1,"name":"person feeding baby","variations":["🧑🏻‍🍼","🧑🏼‍🍼","🧑🏽‍🍼","🧑🏾‍🍼","🧑🏿‍🍼"],"version":"13.0"},{"emoji":"👼","category":1,"name":"baby angel","variations":["👼🏻","👼🏼","👼🏽","👼🏾","👼🏿"],"version":"1.0"},{"emoji":"🎅","category":1,"name":"Santa Claus","variations":["🎅🏻","🎅🏼","🎅🏽","🎅🏾","🎅🏿"],"version":"1.0"},{"emoji":"🤶","category":1,"name":"Mrs. Claus","variations":["🤶🏻","🤶🏼","🤶🏽","🤶🏾","🤶🏿"],"version":"3.0"},{"emoji":"🧑‍🎄","category":1,"name":"mx claus","variations":["🧑🏻‍🎄","🧑🏼‍🎄","🧑🏽‍🎄","🧑🏾‍🎄","🧑🏿‍🎄"],"version":"13.0"},{"emoji":"🦸","category":1,"name":"superhero","variations":["🦸🏻","🦸🏼","🦸🏽","🦸🏾","🦸🏿"],"version":"11.0"},{"emoji":"🦸‍♂️","category":1,"name":"man superhero","variations":["🦸🏻‍♂️","🦸🏼‍♂️","🦸🏽‍♂️","🦸🏾‍♂️","🦸🏿‍♂️"],"version":"11.0"},{"emoji":"🦸‍♀️","category":1,"name":"woman superhero","variations":["🦸🏻‍♀️","🦸🏼‍♀️","🦸🏽‍♀️","🦸🏾‍♀️","🦸🏿‍♀️"],"version":"11.0"},{"emoji":"🦹","category":1,"name":"supervillain","variations":["🦹🏻","🦹🏼","🦹🏽","🦹🏾","🦹🏿"],"version":"11.0"},{"emoji":"🦹‍♂️","category":1,"name":"man supervillain","variations":["🦹🏻‍♂️","🦹🏼‍♂️","🦹🏽‍♂️","🦹🏾‍♂️","🦹🏿‍♂️"],"version":"11.0"},{"emoji":"🦹‍♀️","category":1,"name":"woman supervillain","variations":["🦹🏻‍♀️","🦹🏼‍♀️","🦹🏽‍♀️","🦹🏾‍♀️","🦹🏿‍♀️"],"version":"11.0"},{"emoji":"🧙","category":1,"name":"mage","variations":["🧙🏻","🧙🏼","🧙🏽","🧙🏾","🧙🏿"],"version":"5.0"},{"emoji":"🧙‍♂️","category":1,"name":"man mage","variations":["🧙🏻‍♂️","🧙🏼‍♂️","🧙🏽‍♂️","🧙🏾‍♂️","🧙🏿‍♂️"],"version":"5.0"},{"emoji":"🧙‍♀️","category":1,"name":"woman mage","variations":["🧙🏻‍♀️","🧙🏼‍♀️","🧙🏽‍♀️","🧙🏾‍♀️","🧙🏿‍♀️"],"version":"5.0"},{"emoji":"🧚","category":1,"name":"fairy","variations":["🧚🏻","🧚🏼","🧚🏽","🧚🏾","🧚🏿"],"version":"5.0"},{"emoji":"🧚‍♂️","category":1,"name":"man fairy","variations":["🧚🏻‍♂️","🧚🏼‍♂️","🧚🏽‍♂️","🧚🏾‍♂️","🧚🏿‍♂️"],"version":"5.0"},{"emoji":"🧚‍♀️","category":1,"name":"woman fairy","variations":["🧚🏻‍♀️","🧚🏼‍♀️","🧚🏽‍♀️","🧚🏾‍♀️","🧚🏿‍♀️"],"version":"5.0"},{"emoji":"🧛","category":1,"name":"vampire","variations":["🧛🏻","🧛🏼","🧛🏽","🧛🏾","🧛🏿"],"version":"5.0"},{"emoji":"🧛‍♂️","category":1,"name":"man vampire","variations":["🧛🏻‍♂️","🧛🏼‍♂️","🧛🏽‍♂️","🧛🏾‍♂️","🧛🏿‍♂️"],"version":"5.0"},{"emoji":"🧛‍♀️","category":1,"name":"woman vampire","variations":["🧛🏻‍♀️","🧛🏼‍♀️","🧛🏽‍♀️","🧛🏾‍♀️","🧛🏿‍♀️"],"version":"5.0"},{"emoji":"🧜","category":1,"name":"merperson","variations":["🧜🏻","🧜🏼","🧜🏽","🧜🏾","🧜🏿"],"version":"5.0"},{"emoji":"🧜‍♂️","category":1,"name":"merman","variations":["🧜🏻‍♂️","🧜🏼‍♂️","🧜🏽‍♂️","🧜🏾‍♂️","🧜🏿‍♂️"],"version":"5.0"},{"emoji":"🧜‍♀️","category":1,"name":"mermaid","variations":["🧜🏻‍♀️","🧜🏼‍♀️","🧜🏽‍♀️","🧜🏾‍♀️","🧜🏿‍♀️"],"version":"5.0"},{"emoji":"🧝","category":1,"name":"elf","variations":["🧝🏻","🧝🏼","🧝🏽","🧝🏾","🧝🏿"],"version":"5.0"},{"emoji":"🧝‍♂️","category":1,"name":"man elf","variations":["🧝🏻‍♂️","🧝🏼‍♂️","🧝🏽‍♂️","🧝🏾‍♂️","🧝🏿‍♂️"],"version":"5.0"},{"emoji":"🧝‍♀️","category":1,"name":"woman elf","variations":["🧝🏻‍♀️","🧝🏼‍♀️","🧝🏽‍♀️","🧝🏾‍♀️","🧝🏿‍♀️"],"version":"5.0"},{"emoji":"🧞","category":1,"name":"genie","version":"5.0"},{"emoji":"🧞‍♂️","category":1,"name":"man genie","version":"5.0"},{"emoji":"🧞‍♀️","category":1,"name":"woman genie","version":"5.0"},{"emoji":"🧟","category":1,"name":"zombie","version":"5.0"},{"emoji":"🧟‍♂️","category":1,"name":"man zombie","version":"5.0"},{"emoji":"🧟‍♀️","category":1,"name":"woman zombie","version":"5.0"},{"emoji":"💆","category":1,"name":"person getting massage","variations":["💆🏻","💆🏼","💆🏽","💆🏾","💆🏿"],"version":"1.0"},{"emoji":"💆‍♂️","category":1,"name":"man getting massage","variations":["💆🏻‍♂️","💆🏼‍♂️","💆🏽‍♂️","💆🏾‍♂️","💆🏿‍♂️"],"version":"4.0"},{"emoji":"💆‍♀️","category":1,"name":"woman getting massage","variations":["💆🏻‍♀️","💆🏼‍♀️","💆🏽‍♀️","💆🏾‍♀️","💆🏿‍♀️"],"version":"4.0"},{"emoji":"💇","category":1,"name":"person getting haircut","variations":["💇🏻","💇🏼","💇🏽","💇🏾","💇🏿"],"version":"1.0"},{"emoji":"💇‍♂️","category":1,"name":"man getting haircut","variations":["💇🏻‍♂️","💇🏼‍♂️","💇🏽‍♂️","💇🏾‍♂️","💇🏿‍♂️"],"version":"4.0"},{"emoji":"💇‍♀️","category":1,"name":"woman getting haircut","variations":["💇🏻‍♀️","💇🏼‍♀️","💇🏽‍♀️","💇🏾‍♀️","💇🏿‍♀️"],"version":"4.0"},{"emoji":"🚶","category":1,"name":"person walking","variations":["🚶🏻","🚶🏼","🚶🏽","🚶🏾","🚶🏿"],"version":"1.0"},{"emoji":"🚶‍♂️","category":1,"name":"man walking","variations":["🚶🏻‍♂️","🚶🏼‍♂️","🚶🏽‍♂️","🚶🏾‍♂️","🚶🏿‍♂️"],"version":"4.0"},{"emoji":"🚶‍♀️","category":1,"name":"woman walking","variations":["🚶🏻‍♀️","🚶🏼‍♀️","🚶🏽‍♀️","🚶🏾‍♀️","🚶🏿‍♀️"],"version":"4.0"},{"emoji":"🧍","category":1,"name":"person standing","variations":["🧍🏻","🧍🏼","🧍🏽","🧍🏾","🧍🏿"],"version":"12.0"},{"emoji":"🧍‍♂️","category":1,"name":"man standing","variations":["🧍🏻‍♂️","🧍🏼‍♂️","🧍🏽‍♂️","🧍🏾‍♂️","🧍🏿‍♂️"],"version":"12.0"},{"emoji":"🧍‍♀️","category":1,"name":"woman standing","variations":["🧍🏻‍♀️","🧍🏼‍♀️","🧍🏽‍♀️","🧍🏾‍♀️","🧍🏿‍♀️"],"version":"12.0"},{"emoji":"🧎","category":1,"name":"person kneeling","variations":["🧎🏻","🧎🏼","🧎🏽","🧎🏾","🧎🏿"],"version":"12.0"},{"emoji":"🧎‍♂️","category":1,"name":"man kneeling","variations":["🧎🏻‍♂️","🧎🏼‍♂️","🧎🏽‍♂️","🧎🏾‍♂️","🧎🏿‍♂️"],"version":"12.0"},{"emoji":"🧎‍♀️","category":1,"name":"woman kneeling","variations":["🧎🏻‍♀️","🧎🏼‍♀️","🧎🏽‍♀️","🧎🏾‍♀️","🧎🏿‍♀️"],"version":"12.0"},{"emoji":"🧑‍🦯","category":1,"name":"person with white cane","variations":["🧑🏻‍🦯","🧑🏼‍🦯","🧑🏽‍🦯","🧑🏾‍🦯","🧑🏿‍🦯"],"version":"12.1"},{"emoji":"👨‍🦯","category":1,"name":"man with white cane","variations":["👨🏻‍🦯","👨🏼‍🦯","👨🏽‍🦯","👨🏾‍🦯","👨🏿‍🦯"],"version":"12.0"},{"emoji":"👩‍🦯","category":1,"name":"woman with white cane","variations":["👩🏻‍🦯","👩🏼‍🦯","👩🏽‍🦯","👩🏾‍🦯","👩🏿‍🦯"],"version":"12.0"},{"emoji":"🧑‍🦼","category":1,"name":"person in motorized wheelchair","variations":["🧑🏻‍🦼","🧑🏼‍🦼","🧑🏽‍🦼","🧑🏾‍🦼","🧑🏿‍🦼"],"version":"12.1"},{"emoji":"👨‍🦼","category":1,"name":"man in motorized wheelchair","variations":["👨🏻‍🦼","👨🏼‍🦼","👨🏽‍🦼","👨🏾‍🦼","👨🏿‍🦼"],"version":"12.0"},{"emoji":"👩‍🦼","category":1,"name":"woman in motorized wheelchair","variations":["👩🏻‍🦼","👩🏼‍🦼","👩🏽‍🦼","👩🏾‍🦼","👩🏿‍🦼"],"version":"12.0"},{"emoji":"🧑‍🦽","category":1,"name":"person in manual wheelchair","variations":["🧑🏻‍🦽","🧑🏼‍🦽","🧑🏽‍🦽","🧑🏾‍🦽","🧑🏿‍🦽"],"version":"12.1"},{"emoji":"👨‍🦽","category":1,"name":"man in manual wheelchair","variations":["👨🏻‍🦽","👨🏼‍🦽","👨🏽‍🦽","👨🏾‍🦽","👨🏿‍🦽"],"version":"12.0"},{"emoji":"👩‍🦽","category":1,"name":"woman in manual wheelchair","variations":["👩🏻‍🦽","👩🏼‍🦽","👩🏽‍🦽","👩🏾‍🦽","👩🏿‍🦽"],"version":"12.0"},{"emoji":"🏃","category":1,"name":"person running","variations":["🏃🏻","🏃🏼","🏃🏽","🏃🏾","🏃🏿"],"version":"1.0"},{"emoji":"🏃‍♂️","category":1,"name":"man running","variations":["🏃🏻‍♂️","🏃🏼‍♂️","🏃🏽‍♂️","🏃🏾‍♂️","🏃🏿‍♂️"],"version":"4.0"},{"emoji":"🏃‍♀️","category":1,"name":"woman running","variations":["🏃🏻‍♀️","🏃🏼‍♀️","🏃🏽‍♀️","🏃🏾‍♀️","🏃🏿‍♀️"],"version":"4.0"},{"emoji":"💃","category":1,"name":"woman dancing","variations":["💃🏻","💃🏼","💃🏽","💃🏾","💃🏿"],"version":"1.0"},{"emoji":"🕺","category":1,"name":"man dancing","variations":["🕺🏻","🕺🏼","🕺🏽","🕺🏾","🕺🏿"],"version":"3.0"},{"emoji":"🕴️","category":1,"name":"person in suit levitating","variations":["🕴🏻","🕴🏼","🕴🏽","🕴🏾","🕴🏿"],"version":"1.0"},{"emoji":"👯","category":1,"name":"people with bunny ears","version":"1.0"},{"emoji":"👯‍♂️","category":1,"name":"men with bunny ears","version":"4.0"},{"emoji":"👯‍♀️","category":1,"name":"women with bunny ears","version":"4.0"},{"emoji":"🧖","category":1,"name":"person in steamy room","variations":["🧖🏻","🧖🏼","🧖🏽","🧖🏾","🧖🏿"],"version":"5.0"},{"emoji":"🧖‍♂️","category":1,"name":"man in steamy room","variations":["🧖🏻‍♂️","🧖🏼‍♂️","🧖🏽‍♂️","🧖🏾‍♂️","🧖🏿‍♂️"],"version":"5.0"},{"emoji":"🧖‍♀️","category":1,"name":"woman in steamy room","variations":["🧖🏻‍♀️","🧖🏼‍♀️","🧖🏽‍♀️","🧖🏾‍♀️","🧖🏿‍♀️"],"version":"5.0"},{"emoji":"🧗","category":1,"name":"person climbing","variations":["🧗🏻","🧗🏼","🧗🏽","🧗🏾","🧗🏿"],"version":"5.0"},{"emoji":"🧗‍♂️","category":1,"name":"man climbing","variations":["🧗🏻‍♂️","🧗🏼‍♂️","🧗🏽‍♂️","🧗🏾‍♂️","🧗🏿‍♂️"],"version":"5.0"},{"emoji":"🧗‍♀️","category":1,"name":"woman climbing","variations":["🧗🏻‍♀️","🧗🏼‍♀️","🧗🏽‍♀️","🧗🏾‍♀️","🧗🏿‍♀️"],"version":"5.0"},{"emoji":"🤺","category":1,"name":"person fencing","version":"3.0"},{"emoji":"🏇","category":1,"name":"horse racing","variations":["🏇🏻","🏇🏼","🏇🏽","🏇🏾","🏇🏿"],"version":"1.0"},{"emoji":"⛷️","category":1,"name":"skier","version":"1.0"},{"emoji":"🏂","category":1,"name":"snowboarder","variations":["🏂🏻","🏂🏼","🏂🏽","🏂🏾","🏂🏿"],"version":"1.0"},{"emoji":"🏌️","category":1,"name":"person golfing","variations":["🏌🏻","🏌🏼","🏌🏽","🏌🏾","🏌🏿"],"version":"1.0"},{"emoji":"🏌️‍♂️","category":1,"name":"man golfing","variations":["🏌🏻‍♂️","🏌🏼‍♂️","🏌🏽‍♂️","🏌🏾‍♂️","🏌🏿‍♂️"],"version":"4.0"},{"emoji":"🏌️‍♀️","category":1,"name":"woman golfing","variations":["🏌🏻‍♀️","🏌🏼‍♀️","🏌🏽‍♀️","🏌🏾‍♀️","🏌🏿‍♀️"],"version":"4.0"},{"emoji":"🏄","category":1,"name":"person surfing","variations":["🏄🏻","🏄🏼","🏄🏽","🏄🏾","🏄🏿"],"version":"1.0"},{"emoji":"🏄‍♂️","category":1,"name":"man surfing","variations":["🏄🏻‍♂️","🏄🏼‍♂️","🏄🏽‍♂️","🏄🏾‍♂️","🏄🏿‍♂️"],"version":"4.0"},{"emoji":"🏄‍♀️","category":1,"name":"woman surfing","variations":["🏄🏻‍♀️","🏄🏼‍♀️","🏄🏽‍♀️","🏄🏾‍♀️","🏄🏿‍♀️"],"version":"4.0"},{"emoji":"🚣","category":1,"name":"person rowing boat","variations":["🚣🏻","🚣🏼","🚣🏽","🚣🏾","🚣🏿"],"version":"1.0"},{"emoji":"🚣‍♂️","category":1,"name":"man rowing boat","variations":["🚣🏻‍♂️","🚣🏼‍♂️","🚣🏽‍♂️","🚣🏾‍♂️","🚣🏿‍♂️"],"version":"4.0"},{"emoji":"🚣‍♀️","category":1,"name":"woman rowing boat","variations":["🚣🏻‍♀️","🚣🏼‍♀️","🚣🏽‍♀️","🚣🏾‍♀️","🚣🏿‍♀️"],"version":"4.0"},{"emoji":"🏊","category":1,"name":"person swimming","variations":["🏊🏻","🏊🏼","🏊🏽","🏊🏾","🏊🏿"],"version":"1.0"},{"emoji":"🏊‍♂️","category":1,"name":"man swimming","variations":["🏊🏻‍♂️","🏊🏼‍♂️","🏊🏽‍♂️","🏊🏾‍♂️","🏊🏿‍♂️"],"version":"4.0"},{"emoji":"🏊‍♀️","category":1,"name":"woman swimming","variations":["🏊🏻‍♀️","🏊🏼‍♀️","🏊🏽‍♀️","🏊🏾‍♀️","🏊🏿‍♀️"],"version":"4.0"},{"emoji":"⛹️","category":1,"name":"person bouncing ball","variations":["⛹🏻","⛹🏼","⛹🏽","⛹🏾","⛹🏿"],"version":"1.0"},{"emoji":"⛹️‍♂️","category":1,"name":"man bouncing ball","variations":["⛹🏻‍♂️","⛹🏼‍♂️","⛹🏽‍♂️","⛹🏾‍♂️","⛹🏿‍♂️"],"version":"4.0"},{"emoji":"⛹️‍♀️","category":1,"name":"woman bouncing ball","variations":["⛹🏻‍♀️","⛹🏼‍♀️","⛹🏽‍♀️","⛹🏾‍♀️","⛹🏿‍♀️"],"version":"4.0"},{"emoji":"🏋️","category":1,"name":"person lifting weights","variations":["🏋🏻","🏋🏼","🏋🏽","🏋🏾","🏋🏿"],"version":"1.0"},{"emoji":"🏋️‍♂️","category":1,"name":"man lifting weights","variations":["🏋🏻‍♂️","🏋🏼‍♂️","🏋🏽‍♂️","🏋🏾‍♂️","🏋🏿‍♂️"],"version":"4.0"},{"emoji":"🏋️‍♀️","category":1,"name":"woman lifting weights","variations":["🏋🏻‍♀️","🏋🏼‍♀️","🏋🏽‍♀️","🏋🏾‍♀️","🏋🏿‍♀️"],"version":"4.0"},{"emoji":"🚴","category":1,"name":"person biking","variations":["🚴🏻","🚴🏼","🚴🏽","🚴🏾","🚴🏿"],"version":"1.0"},{"emoji":"🚴‍♂️","category":1,"name":"man biking","variations":["🚴🏻‍♂️","🚴🏼‍♂️","🚴🏽‍♂️","🚴🏾‍♂️","🚴🏿‍♂️"],"version":"4.0"},{"emoji":"🚴‍♀️","category":1,"name":"woman biking","variations":["🚴🏻‍♀️","🚴🏼‍♀️","🚴🏽‍♀️","🚴🏾‍♀️","🚴🏿‍♀️"],"version":"4.0"},{"emoji":"🚵","category":1,"name":"person mountain biking","variations":["🚵🏻","🚵🏼","🚵🏽","🚵🏾","🚵🏿"],"version":"1.0"},{"emoji":"🚵‍♂️","category":1,"name":"man mountain biking","variations":["🚵🏻‍♂️","🚵🏼‍♂️","🚵🏽‍♂️","🚵🏾‍♂️","🚵🏿‍♂️"],"version":"4.0"},{"emoji":"🚵‍♀️","category":1,"name":"woman mountain biking","variations":["🚵🏻‍♀️","🚵🏼‍♀️","🚵🏽‍♀️","🚵🏾‍♀️","🚵🏿‍♀️"],"version":"4.0"},{"emoji":"🤸","category":1,"name":"person cartwheeling","variations":["🤸🏻","🤸🏼","🤸🏽","🤸🏾","🤸🏿"],"version":"3.0"},{"emoji":"🤸‍♂️","category":1,"name":"man cartwheeling","variations":["🤸🏻‍♂️","🤸🏼‍♂️","🤸🏽‍♂️","🤸🏾‍♂️","🤸🏿‍♂️"],"version":"4.0"},{"emoji":"🤸‍♀️","category":1,"name":"woman cartwheeling","variations":["🤸🏻‍♀️","🤸🏼‍♀️","🤸🏽‍♀️","🤸🏾‍♀️","🤸🏿‍♀️"],"version":"4.0"},{"emoji":"🤼","category":1,"name":"people wrestling","version":"3.0"},{"emoji":"🤼‍♂️","category":1,"name":"men wrestling","version":"4.0"},{"emoji":"🤼‍♀️","category":1,"name":"women wrestling","version":"4.0"},{"emoji":"🤽","category":1,"name":"person playing water polo","variations":["🤽🏻","🤽🏼","🤽🏽","🤽🏾","🤽🏿"],"version":"3.0"},{"emoji":"🤽‍♂️","category":1,"name":"man playing water polo","variations":["🤽🏻‍♂️","🤽🏼‍♂️","🤽🏽‍♂️","🤽🏾‍♂️","🤽🏿‍♂️"],"version":"4.0"},{"emoji":"🤽‍♀️","category":1,"name":"woman playing water polo","variations":["🤽🏻‍♀️","🤽🏼‍♀️","🤽🏽‍♀️","🤽🏾‍♀️","🤽🏿‍♀️"],"version":"4.0"},{"emoji":"🤾","category":1,"name":"person playing handball","variations":["🤾🏻","🤾🏼","🤾🏽","🤾🏾","🤾🏿"],"version":"3.0"},{"emoji":"🤾‍♂️","category":1,"name":"man playing handball","variations":["🤾🏻‍♂️","🤾🏼‍♂️","🤾🏽‍♂️","🤾🏾‍♂️","🤾🏿‍♂️"],"version":"4.0"},{"emoji":"🤾‍♀️","category":1,"name":"woman playing handball","variations":["🤾🏻‍♀️","🤾🏼‍♀️","🤾🏽‍♀️","🤾🏾‍♀️","🤾🏿‍♀️"],"version":"4.0"},{"emoji":"🤹","category":1,"name":"person juggling","variations":["🤹🏻","🤹🏼","🤹🏽","🤹🏾","🤹🏿"],"version":"3.0"},{"emoji":"🤹‍♂️","category":1,"name":"man juggling","variations":["🤹🏻‍♂️","🤹🏼‍♂️","🤹🏽‍♂️","🤹🏾‍♂️","🤹🏿‍♂️"],"version":"4.0"},{"emoji":"🤹‍♀️","category":1,"name":"woman juggling","variations":["🤹🏻‍♀️","🤹🏼‍♀️","🤹🏽‍♀️","🤹🏾‍♀️","🤹🏿‍♀️"],"version":"4.0"},{"emoji":"🧘","category":1,"name":"person in lotus position","variations":["🧘🏻","🧘🏼","🧘🏽","🧘🏾","🧘🏿"],"version":"5.0"},{"emoji":"🧘‍♂️","category":1,"name":"man in lotus position","variations":["🧘🏻‍♂️","🧘🏼‍♂️","🧘🏽‍♂️","🧘🏾‍♂️","🧘🏿‍♂️"],"version":"5.0"},{"emoji":"🧘‍♀️","category":1,"name":"woman in lotus position","variations":["🧘🏻‍♀️","🧘🏼‍♀️","🧘🏽‍♀️","🧘🏾‍♀️","🧘🏿‍♀️"],"version":"5.0"},{"emoji":"🛀","category":1,"name":"person taking bath","variations":["🛀🏻","🛀🏼","🛀🏽","🛀🏾","🛀🏿"],"version":"1.0"},{"emoji":"🛌","category":1,"name":"person in bed","variations":["🛌🏻","🛌🏼","🛌🏽","🛌🏾","🛌🏿"],"version":"1.0"},{"emoji":"🧑‍🤝‍🧑","category":1,"name":"people holding hands","variations":["🧑🏻‍🤝‍🧑🏻","🧑🏻‍🤝‍🧑🏼","🧑🏻‍🤝‍🧑🏽","🧑🏻‍🤝‍🧑🏾","🧑🏻‍🤝‍🧑🏿","🧑🏼‍🤝‍🧑🏻","🧑🏼‍🤝‍🧑🏼","🧑🏼‍🤝‍🧑🏽","🧑🏼‍🤝‍🧑🏾","🧑🏼‍🤝‍🧑🏿","🧑🏽‍🤝‍🧑🏻","🧑🏽‍🤝‍🧑🏼","🧑🏽‍🤝‍🧑🏽","🧑🏽‍🤝‍🧑🏾","🧑🏽‍🤝‍🧑🏿","🧑🏾‍🤝‍🧑🏻","🧑🏾‍🤝‍🧑🏼","🧑🏾‍🤝‍🧑🏽","🧑🏾‍🤝‍🧑🏾","🧑🏾‍🤝‍🧑🏿","🧑🏿‍🤝‍🧑🏻","🧑🏿‍🤝‍🧑🏼","🧑🏿‍🤝‍🧑🏽","🧑🏿‍🤝‍🧑🏾","🧑🏿‍🤝‍🧑🏿"],"version":"12.0"},{"emoji":"👭","category":1,"name":"women holding hands","variations":["👭🏻","👩🏻‍🤝‍👩🏼","👩🏻‍🤝‍👩🏽","👩🏻‍🤝‍👩🏾","👩🏻‍🤝‍👩🏿","👩🏼‍🤝‍👩🏻","👭🏼","👩🏼‍🤝‍👩🏽","👩🏼‍🤝‍👩🏾","👩🏼‍🤝‍👩🏿","👩🏽‍🤝‍👩🏻","👩🏽‍🤝‍👩🏼","👭🏽","👩🏽‍🤝‍👩🏾","👩🏽‍🤝‍👩🏿","👩🏾‍🤝‍👩🏻","👩🏾‍🤝‍👩🏼","👩🏾‍🤝‍👩🏽","👭🏾","👩🏾‍🤝‍👩🏿","👩🏿‍🤝‍👩🏻","👩🏿‍🤝‍👩🏼","👩🏿‍🤝‍👩🏽","👩🏿‍🤝‍👩🏾","👭🏿"],"version":"1.0"},{"emoji":"👫","category":1,"name":"woman and man holding hands","variations":["👫🏻","👩🏻‍🤝‍👨🏼","👩🏻‍🤝‍👨🏽","👩🏻‍🤝‍👨🏾","👩🏻‍🤝‍👨🏿","👩🏼‍🤝‍👨🏻","👫🏼","👩🏼‍🤝‍👨🏽","👩🏼‍🤝‍👨🏾","👩🏼‍🤝‍👨🏿","👩🏽‍🤝‍👨🏻","👩🏽‍🤝‍👨🏼","👫🏽","👩🏽‍🤝‍👨🏾","👩🏽‍🤝‍👨🏿","👩🏾‍🤝‍👨🏻","👩🏾‍🤝‍👨🏼","👩🏾‍🤝‍👨🏽","👫🏾","👩🏾‍🤝‍👨🏿","👩🏿‍🤝‍👨🏻","👩🏿‍🤝‍👨🏼","👩🏿‍🤝‍👨🏽","👩🏿‍🤝‍👨🏾","👫🏿"],"version":"1.0"},{"emoji":"👬","category":1,"name":"men holding hands","variations":["👬🏻","👨🏻‍🤝‍👨🏼","👨🏻‍🤝‍👨🏽","👨🏻‍🤝‍👨🏾","👨🏻‍🤝‍👨🏿","👨🏼‍🤝‍👨🏻","👬🏼","👨🏼‍🤝‍👨🏽","👨🏼‍🤝‍👨🏾","👨🏼‍🤝‍👨🏿","👨🏽‍🤝‍👨🏻","👨🏽‍🤝‍👨🏼","👬🏽","👨🏽‍🤝‍👨🏾","👨🏽‍🤝‍👨🏿","👨🏾‍🤝‍👨🏻","👨🏾‍🤝‍👨🏼","👨🏾‍🤝‍👨🏽","👬🏾","👨🏾‍🤝‍👨🏿","👨🏿‍🤝‍👨🏻","👨🏿‍🤝‍👨🏼","👨🏿‍🤝‍👨🏽","👨🏿‍🤝‍👨🏾","👬🏿"],"version":"1.0"},{"emoji":"💏","category":1,"name":"kiss","variations":["👩‍❤️‍💋‍👨","👨‍❤️‍💋‍👨","👩‍❤️‍💋‍👩"],"version":"1.0"},{"emoji":"💑","category":1,"name":"couple with heart","variations":["👩‍❤️‍👨","👨‍❤️‍👨","👩‍❤️‍👩"],"version":"1.0"},{"emoji":"👪","category":1,"name":"family","version":"1.0"},{"emoji":"👨‍👩‍👦","category":1,"name":"family: man, woman, boy","version":"2.0"},{"emoji":"👨‍👩‍👧","category":1,"name":"family: man, woman, girl","version":"2.0"},{"emoji":"👨‍👩‍👧‍👦","category":1,"name":"family: man, woman, girl, boy","version":"2.0"},{"emoji":"👨‍👩‍👦‍👦","category":1,"name":"family: man, woman, boy, boy","version":"2.0"},{"emoji":"👨‍👩‍👧‍👧","category":1,"name":"family: man, woman, girl, girl","version":"2.0"},{"emoji":"👨‍👨‍👦","category":1,"name":"family: man, man, boy","version":"2.0"},{"emoji":"👨‍👨‍👧","category":1,"name":"family: man, man, girl","version":"2.0"},{"emoji":"👨‍👨‍👧‍👦","category":1,"name":"family: man, man, girl, boy","version":"2.0"},{"emoji":"👨‍👨‍👦‍👦","category":1,"name":"family: man, man, boy, boy","version":"2.0"},{"emoji":"👨‍👨‍👧‍👧","category":1,"name":"family: man, man, girl, girl","version":"2.0"},{"emoji":"👩‍👩‍👦","category":1,"name":"family: woman, woman, boy","version":"2.0"},{"emoji":"👩‍👩‍👧","category":1,"name":"family: woman, woman, girl","version":"2.0"},{"emoji":"👩‍👩‍👧‍👦","category":1,"name":"family: woman, woman, girl, boy","version":"2.0"},{"emoji":"👩‍👩‍👦‍👦","category":1,"name":"family: woman, woman, boy, boy","version":"2.0"},{"emoji":"👩‍👩‍👧‍👧","category":1,"name":"family: woman, woman, girl, girl","version":"2.0"},{"emoji":"👨‍👦","category":1,"name":"family: man, boy","version":"4.0"},{"emoji":"👨‍👦‍👦","category":1,"name":"family: man, boy, boy","version":"4.0"},{"emoji":"👨‍👧","category":1,"name":"family: man, girl","version":"4.0"},{"emoji":"👨‍👧‍👦","category":1,"name":"family: man, girl, boy","version":"4.0"},{"emoji":"👨‍👧‍👧","category":1,"name":"family: man, girl, girl","version":"4.0"},{"emoji":"👩‍👦","category":1,"name":"family: woman, boy","version":"4.0"},{"emoji":"👩‍👦‍👦","category":1,"name":"family: woman, boy, boy","version":"4.0"},{"emoji":"👩‍👧","category":1,"name":"family: woman, girl","version":"4.0"},{"emoji":"👩‍👧‍👦","category":1,"name":"family: woman, girl, boy","version":"4.0"},{"emoji":"👩‍👧‍👧","category":1,"name":"family: woman, girl, girl","version":"4.0"},{"emoji":"🗣️","category":1,"name":"speaking head","version":"1.0"},{"emoji":"👤","category":1,"name":"bust in silhouette","version":"1.0"},{"emoji":"👥","category":1,"name":"busts in silhouette","version":"1.0"},{"emoji":"🫂","category":1,"name":"people hugging","version":"13.0"},{"emoji":"👣","category":1,"name":"footprints","version":"1.0"},{"emoji":"🐵","category":2,"name":"monkey face","version":"1.0"},{"emoji":"🐒","category":2,"name":"monkey","version":"1.0"},{"emoji":"🦍","category":2,"name":"gorilla","version":"3.0"},{"emoji":"🦧","category":2,"name":"orangutan","version":"12.0"},{"emoji":"🐶","category":2,"name":"dog face","version":"1.0"},{"emoji":"🐕","category":2,"name":"dog","version":"1.0"},{"emoji":"🦮","category":2,"name":"guide dog","version":"12.0"},{"emoji":"🐕‍🦺","category":2,"name":"service dog","version":"12.0"},{"emoji":"🐩","category":2,"name":"poodle","version":"1.0"},{"emoji":"🐺","category":2,"name":"wolf","version":"1.0"},{"emoji":"🦊","category":2,"name":"fox","version":"3.0"},{"emoji":"🦝","category":2,"name":"raccoon","version":"11.0"},{"emoji":"🐱","category":2,"name":"cat face","version":"1.0"},{"emoji":"🐈","category":2,"name":"cat","version":"1.0"},{"emoji":"🐈‍⬛","category":2,"name":"black cat","version":"13.0"},{"emoji":"🦁","category":2,"name":"lion","version":"1.0"},{"emoji":"🐯","category":2,"name":"tiger face","version":"1.0"},{"emoji":"🐅","category":2,"name":"tiger","version":"1.0"},{"emoji":"🐆","category":2,"name":"leopard","version":"1.0"},{"emoji":"🐴","category":2,"name":"horse face","version":"1.0"},{"emoji":"🐎","category":2,"name":"horse","version":"1.0"},{"emoji":"🦄","category":2,"name":"unicorn","version":"1.0"},{"emoji":"🦓","category":2,"name":"zebra","version":"5.0"},{"emoji":"🦌","category":2,"name":"deer","version":"3.0"},{"emoji":"🦬","category":2,"name":"bison","version":"13.0"},{"emoji":"🐮","category":2,"name":"cow face","version":"1.0"},{"emoji":"🐂","category":2,"name":"ox","version":"1.0"},{"emoji":"🐃","category":2,"name":"water buffalo","version":"1.0"},{"emoji":"🐄","category":2,"name":"cow","version":"1.0"},{"emoji":"🐷","category":2,"name":"pig face","version":"1.0"},{"emoji":"🐖","category":2,"name":"pig","version":"1.0"},{"emoji":"🐗","category":2,"name":"boar","version":"1.0"},{"emoji":"🐽","category":2,"name":"pig nose","version":"1.0"},{"emoji":"🐏","category":2,"name":"ram","version":"1.0"},{"emoji":"🐑","category":2,"name":"ewe","version":"1.0"},{"emoji":"🐐","category":2,"name":"goat","version":"1.0"},{"emoji":"🐪","category":2,"name":"camel","version":"1.0"},{"emoji":"🐫","category":2,"name":"two-hump camel","version":"1.0"},{"emoji":"🦙","category":2,"name":"llama","version":"11.0"},{"emoji":"🦒","category":2,"name":"giraffe","version":"5.0"},{"emoji":"🐘","category":2,"name":"elephant","version":"1.0"},{"emoji":"🦣","category":2,"name":"mammoth","version":"13.0"},{"emoji":"🦏","category":2,"name":"rhinoceros","version":"3.0"},{"emoji":"🦛","category":2,"name":"hippopotamus","version":"11.0"},{"emoji":"🐭","category":2,"name":"mouse face","version":"1.0"},{"emoji":"🐁","category":2,"name":"mouse","version":"1.0"},{"emoji":"🐀","category":2,"name":"rat","version":"1.0"},{"emoji":"🐹","category":2,"name":"hamster","version":"1.0"},{"emoji":"🐰","category":2,"name":"rabbit face","version":"1.0"},{"emoji":"🐇","category":2,"name":"rabbit","version":"1.0"},{"emoji":"🐿️","category":2,"name":"chipmunk","version":"1.0"},{"emoji":"🦫","category":2,"name":"beaver","version":"13.0"},{"emoji":"🦔","category":2,"name":"hedgehog","version":"5.0"},{"emoji":"🦇","category":2,"name":"bat","version":"3.0"},{"emoji":"🐻","category":2,"name":"bear","version":"1.0"},{"emoji":"🐻‍❄️","category":2,"name":"polar bear","version":"13.0"},{"emoji":"🐨","category":2,"name":"koala","version":"1.0"},{"emoji":"🐼","category":2,"name":"panda","version":"1.0"},{"emoji":"🦥","category":2,"name":"sloth","version":"12.0"},{"emoji":"🦦","category":2,"name":"otter","version":"12.0"},{"emoji":"🦨","category":2,"name":"skunk","version":"12.0"},{"emoji":"🦘","category":2,"name":"kangaroo","version":"11.0"},{"emoji":"🦡","category":2,"name":"badger","version":"11.0"},{"emoji":"🐾","category":2,"name":"paw prints","version":"1.0"},{"emoji":"🦃","category":2,"name":"turkey","version":"1.0"},{"emoji":"🐔","category":2,"name":"chicken","version":"1.0"},{"emoji":"🐓","category":2,"name":"rooster","version":"1.0"},{"emoji":"🐣","category":2,"name":"hatching chick","version":"1.0"},{"emoji":"🐤","category":2,"name":"baby chick","version":"1.0"},{"emoji":"🐥","category":2,"name":"front-facing baby chick","version":"1.0"},{"emoji":"🐦","category":2,"name":"bird","version":"1.0"},{"emoji":"🐧","category":2,"name":"penguin","version":"1.0"},{"emoji":"🕊️","category":2,"name":"dove","version":"1.0"},{"emoji":"🦅","category":2,"name":"eagle","version":"3.0"},{"emoji":"🦆","category":2,"name":"duck","version":"3.0"},{"emoji":"🦢","category":2,"name":"swan","version":"11.0"},{"emoji":"🦉","category":2,"name":"owl","version":"3.0"},{"emoji":"🦤","category":2,"name":"dodo","version":"13.0"},{"emoji":"🪶","category":2,"name":"feather","version":"13.0"},{"emoji":"🦩","category":2,"name":"flamingo","version":"12.0"},{"emoji":"🦚","category":2,"name":"peacock","version":"11.0"},{"emoji":"🦜","category":2,"name":"parrot","version":"11.0"},{"emoji":"🐸","category":2,"name":"frog","version":"1.0"},{"emoji":"🐊","category":2,"name":"crocodile","version":"1.0"},{"emoji":"🐢","category":2,"name":"turtle","version":"1.0"},{"emoji":"🦎","category":2,"name":"lizard","version":"3.0"},{"emoji":"🐍","category":2,"name":"snake","version":"1.0"},{"emoji":"🐲","category":2,"name":"dragon face","version":"1.0"},{"emoji":"🐉","category":2,"name":"dragon","version":"1.0"},{"emoji":"🦕","category":2,"name":"sauropod","version":"5.0"},{"emoji":"🦖","category":2,"name":"T-Rex","version":"5.0"},{"emoji":"🐳","category":2,"name":"spouting whale","version":"1.0"},{"emoji":"🐋","category":2,"name":"whale","version":"1.0"},{"emoji":"🐬","category":2,"name":"dolphin","version":"1.0"},{"emoji":"🦭","category":2,"name":"seal","version":"13.0"},{"emoji":"🐟","category":2,"name":"fish","version":"1.0"},{"emoji":"🐠","category":2,"name":"tropical fish","version":"1.0"},{"emoji":"🐡","category":2,"name":"blowfish","version":"1.0"},{"emoji":"🦈","category":2,"name":"shark","version":"3.0"},{"emoji":"🐙","category":2,"name":"octopus","version":"1.0"},{"emoji":"🐚","category":2,"name":"spiral shell","version":"1.0"},{"emoji":"🐌","category":2,"name":"snail","version":"1.0"},{"emoji":"🦋","category":2,"name":"butterfly","version":"3.0"},{"emoji":"🐛","category":2,"name":"bug","version":"1.0"},{"emoji":"🐜","category":2,"name":"ant","version":"1.0"},{"emoji":"🐝","category":2,"name":"honeybee","version":"1.0"},{"emoji":"🪲","category":2,"name":"beetle","version":"13.0"},{"emoji":"🐞","category":2,"name":"lady beetle","version":"1.0"},{"emoji":"🦗","category":2,"name":"cricket","version":"5.0"},{"emoji":"🪳","category":2,"name":"cockroach","version":"13.0"},{"emoji":"🕷️","category":2,"name":"spider","version":"1.0"},{"emoji":"🕸️","category":2,"name":"spider web","version":"1.0"},{"emoji":"🦂","category":2,"name":"scorpion","version":"1.0"},{"emoji":"🦟","category":2,"name":"mosquito","version":"11.0"},{"emoji":"🪰","category":2,"name":"fly","version":"13.0"},{"emoji":"🪱","category":2,"name":"worm","version":"13.0"},{"emoji":"🦠","category":2,"name":"microbe","version":"11.0"},{"emoji":"💐","category":2,"name":"bouquet","version":"1.0"},{"emoji":"🌸","category":2,"name":"cherry blossom","version":"1.0"},{"emoji":"💮","category":2,"name":"white flower","version":"1.0"},{"emoji":"🏵️","category":2,"name":"rosette","version":"1.0"},{"emoji":"🌹","category":2,"name":"rose","version":"1.0"},{"emoji":"🥀","category":2,"name":"wilted flower","version":"3.0"},{"emoji":"🌺","category":2,"name":"hibiscus","version":"1.0"},{"emoji":"🌻","category":2,"name":"sunflower","version":"1.0"},{"emoji":"🌼","category":2,"name":"blossom","version":"1.0"},{"emoji":"🌷","category":2,"name":"tulip","version":"1.0"},{"emoji":"🌱","category":2,"name":"seedling","version":"1.0"},{"emoji":"🪴","category":2,"name":"potted plant","version":"13.0"},{"emoji":"🌲","category":2,"name":"evergreen tree","version":"1.0"},{"emoji":"🌳","category":2,"name":"deciduous tree","version":"1.0"},{"emoji":"🌴","category":2,"name":"palm tree","version":"1.0"},{"emoji":"🌵","category":2,"name":"cactus","version":"1.0"},{"emoji":"🌾","category":2,"name":"sheaf of rice","version":"1.0"},{"emoji":"🌿","category":2,"name":"herb","version":"1.0"},{"emoji":"☘️","category":2,"name":"shamrock","version":"1.0"},{"emoji":"🍀","category":2,"name":"four leaf clover","version":"1.0"},{"emoji":"🍁","category":2,"name":"maple leaf","version":"1.0"},{"emoji":"🍂","category":2,"name":"fallen leaf","version":"1.0"},{"emoji":"🍃","category":2,"name":"leaf fluttering in wind","version":"1.0"},{"emoji":"🍇","category":3,"name":"grapes","version":"1.0"},{"emoji":"🍈","category":3,"name":"melon","version":"1.0"},{"emoji":"🍉","category":3,"name":"watermelon","version":"1.0"},{"emoji":"🍊","category":3,"name":"tangerine","version":"1.0"},{"emoji":"🍋","category":3,"name":"lemon","version":"1.0"},{"emoji":"🍌","category":3,"name":"banana","version":"1.0"},{"emoji":"🍍","category":3,"name":"pineapple","version":"1.0"},{"emoji":"🥭","category":3,"name":"mango","version":"11.0"},{"emoji":"🍎","category":3,"name":"red apple","version":"1.0"},{"emoji":"🍏","category":3,"name":"green apple","version":"1.0"},{"emoji":"🍐","category":3,"name":"pear","version":"1.0"},{"emoji":"🍑","category":3,"name":"peach","version":"1.0"},{"emoji":"🍒","category":3,"name":"cherries","version":"1.0"},{"emoji":"🍓","category":3,"name":"strawberry","version":"1.0"},{"emoji":"🫐","category":3,"name":"blueberries","version":"13.0"},{"emoji":"🥝","category":3,"name":"kiwi fruit","version":"3.0"},{"emoji":"🍅","category":3,"name":"tomato","version":"1.0"},{"emoji":"🫒","category":3,"name":"olive","version":"13.0"},{"emoji":"🥥","category":3,"name":"coconut","version":"5.0"},{"emoji":"🥑","category":3,"name":"avocado","version":"3.0"},{"emoji":"🍆","category":3,"name":"eggplant","version":"1.0"},{"emoji":"🥔","category":3,"name":"potato","version":"3.0"},{"emoji":"🥕","category":3,"name":"carrot","version":"3.0"},{"emoji":"🌽","category":3,"name":"ear of corn","version":"1.0"},{"emoji":"🌶️","category":3,"name":"hot pepper","version":"1.0"},{"emoji":"🫑","category":3,"name":"bell pepper","version":"13.0"},{"emoji":"🥒","category":3,"name":"cucumber","version":"3.0"},{"emoji":"🥬","category":3,"name":"leafy green","version":"11.0"},{"emoji":"🥦","category":3,"name":"broccoli","version":"5.0"},{"emoji":"🧄","category":3,"name":"garlic","version":"12.0"},{"emoji":"🧅","category":3,"name":"onion","version":"12.0"},{"emoji":"🍄","category":3,"name":"mushroom","version":"1.0"},{"emoji":"🥜","category":3,"name":"peanuts","version":"3.0"},{"emoji":"🌰","category":3,"name":"chestnut","version":"1.0"},{"emoji":"🍞","category":3,"name":"bread","version":"1.0"},{"emoji":"🥐","category":3,"name":"croissant","version":"3.0"},{"emoji":"🥖","category":3,"name":"baguette bread","version":"3.0"},{"emoji":"🫓","category":3,"name":"flatbread","version":"13.0"},{"emoji":"🥨","category":3,"name":"pretzel","version":"5.0"},{"emoji":"🥯","category":3,"name":"bagel","version":"11.0"},{"emoji":"🥞","category":3,"name":"pancakes","version":"3.0"},{"emoji":"🧇","category":3,"name":"waffle","version":"12.0"},{"emoji":"🧀","category":3,"name":"cheese wedge","version":"1.0"},{"emoji":"🍖","category":3,"name":"meat on bone","version":"1.0"},{"emoji":"🍗","category":3,"name":"poultry leg","version":"1.0"},{"emoji":"🥩","category":3,"name":"cut of meat","version":"5.0"},{"emoji":"🥓","category":3,"name":"bacon","version":"3.0"},{"emoji":"🍔","category":3,"name":"hamburger","version":"1.0"},{"emoji":"🍟","category":3,"name":"french fries","version":"1.0"},{"emoji":"🍕","category":3,"name":"pizza","version":"1.0"},{"emoji":"🌭","category":3,"name":"hot dog","version":"1.0"},{"emoji":"🥪","category":3,"name":"sandwich","version":"5.0"},{"emoji":"🌮","category":3,"name":"taco","version":"1.0"},{"emoji":"🌯","category":3,"name":"burrito","version":"1.0"},{"emoji":"🫔","category":3,"name":"tamale","version":"13.0"},{"emoji":"🥙","category":3,"name":"stuffed flatbread","version":"3.0"},{"emoji":"🧆","category":3,"name":"falafel","version":"12.0"},{"emoji":"🥚","category":3,"name":"egg","version":"3.0"},{"emoji":"🍳","category":3,"name":"cooking","version":"1.0"},{"emoji":"🥘","category":3,"name":"shallow pan of food","version":"3.0"},{"emoji":"🍲","category":3,"name":"pot of food","version":"1.0"},{"emoji":"🫕","category":3,"name":"fondue","version":"13.0"},{"emoji":"🥣","category":3,"name":"bowl with spoon","version":"5.0"},{"emoji":"🥗","category":3,"name":"green salad","version":"3.0"},{"emoji":"🍿","category":3,"name":"popcorn","version":"1.0"},{"emoji":"🧈","category":3,"name":"butter","version":"12.0"},{"emoji":"🧂","category":3,"name":"salt","version":"11.0"},{"emoji":"🥫","category":3,"name":"canned food","version":"5.0"},{"emoji":"🍱","category":3,"name":"bento box","version":"1.0"},{"emoji":"🍘","category":3,"name":"rice cracker","version":"1.0"},{"emoji":"🍙","category":3,"name":"rice ball","version":"1.0"},{"emoji":"🍚","category":3,"name":"cooked rice","version":"1.0"},{"emoji":"🍛","category":3,"name":"curry rice","version":"1.0"},{"emoji":"🍜","category":3,"name":"steaming bowl","version":"1.0"},{"emoji":"🍝","category":3,"name":"spaghetti","version":"1.0"},{"emoji":"🍠","category":3,"name":"roasted sweet potato","version":"1.0"},{"emoji":"🍢","category":3,"name":"oden","version":"1.0"},{"emoji":"🍣","category":3,"name":"sushi","version":"1.0"},{"emoji":"🍤","category":3,"name":"fried shrimp","version":"1.0"},{"emoji":"🍥","category":3,"name":"fish cake with swirl","version":"1.0"},{"emoji":"🥮","category":3,"name":"moon cake","version":"11.0"},{"emoji":"🍡","category":3,"name":"dango","version":"1.0"},{"emoji":"🥟","category":3,"name":"dumpling","version":"5.0"},{"emoji":"🥠","category":3,"name":"fortune cookie","version":"5.0"},{"emoji":"🥡","category":3,"name":"takeout box","version":"5.0"},{"emoji":"🦀","category":3,"name":"crab","version":"1.0"},{"emoji":"🦞","category":3,"name":"lobster","version":"11.0"},{"emoji":"🦐","category":3,"name":"shrimp","version":"3.0"},{"emoji":"🦑","category":3,"name":"squid","version":"3.0"},{"emoji":"🦪","category":3,"name":"oyster","version":"12.0"},{"emoji":"🍦","category":3,"name":"soft ice cream","version":"1.0"},{"emoji":"🍧","category":3,"name":"shaved ice","version":"1.0"},{"emoji":"🍨","category":3,"name":"ice cream","version":"1.0"},{"emoji":"🍩","category":3,"name":"doughnut","version":"1.0"},{"emoji":"🍪","category":3,"name":"cookie","version":"1.0"},{"emoji":"🎂","category":3,"name":"birthday cake","version":"1.0"},{"emoji":"🍰","category":3,"name":"shortcake","version":"1.0"},{"emoji":"🧁","category":3,"name":"cupcake","version":"11.0"},{"emoji":"🥧","category":3,"name":"pie","version":"5.0"},{"emoji":"🍫","category":3,"name":"chocolate bar","version":"1.0"},{"emoji":"🍬","category":3,"name":"candy","version":"1.0"},{"emoji":"🍭","category":3,"name":"lollipop","version":"1.0"},{"emoji":"🍮","category":3,"name":"custard","version":"1.0"},{"emoji":"🍯","category":3,"name":"honey pot","version":"1.0"},{"emoji":"🍼","category":3,"name":"baby bottle","version":"1.0"},{"emoji":"🥛","category":3,"name":"glass of milk","version":"3.0"},{"emoji":"☕","category":3,"name":"hot beverage","version":"1.0"},{"emoji":"🫖","category":3,"name":"teapot","version":"13.0"},{"emoji":"🍵","category":3,"name":"teacup without handle","version":"1.0"},{"emoji":"🍶","category":3,"name":"sake","version":"1.0"},{"emoji":"🍾","category":3,"name":"bottle with popping cork","version":"1.0"},{"emoji":"🍷","category":3,"name":"wine glass","version":"1.0"},{"emoji":"🍸","category":3,"name":"cocktail glass","version":"1.0"},{"emoji":"🍹","category":3,"name":"tropical drink","version":"1.0"},{"emoji":"🍺","category":3,"name":"beer mug","version":"1.0"},{"emoji":"🍻","category":3,"name":"clinking beer mugs","version":"1.0"},{"emoji":"🥂","category":3,"name":"clinking glasses","version":"3.0"},{"emoji":"🥃","category":3,"name":"tumbler glass","version":"3.0"},{"emoji":"🥤","category":3,"name":"cup with straw","version":"5.0"},{"emoji":"🧋","category":3,"name":"bubble tea","version":"13.0"},{"emoji":"🧃","category":3,"name":"beverage box","version":"12.0"},{"emoji":"🧉","category":3,"name":"mate","version":"12.0"},{"emoji":"🧊","category":3,"name":"ice","version":"12.0"},{"emoji":"🥢","category":3,"name":"chopsticks","version":"5.0"},{"emoji":"🍽️","category":3,"name":"fork and knife with plate","version":"1.0"},{"emoji":"🍴","category":3,"name":"fork and knife","version":"1.0"},{"emoji":"🥄","category":3,"name":"spoon","version":"3.0"},{"emoji":"🔪","category":3,"name":"kitchen knife","version":"1.0"},{"emoji":"🏺","category":3,"name":"amphora","version":"1.0"},{"emoji":"🌍","category":4,"name":"globe showing Europe-Africa","version":"1.0"},{"emoji":"🌎","category":4,"name":"globe showing Americas","version":"1.0"},{"emoji":"🌏","category":4,"name":"globe showing Asia-Australia","version":"1.0"},{"emoji":"🌐","category":4,"name":"globe with meridians","version":"1.0"},{"emoji":"🗺️","category":4,"name":"world map","version":"1.0"},{"emoji":"🗾","category":4,"name":"map of Japan","version":"1.0"},{"emoji":"🧭","category":4,"name":"compass","version":"11.0"},{"emoji":"🏔️","category":4,"name":"snow-capped mountain","version":"1.0"},{"emoji":"⛰️","category":4,"name":"mountain","version":"1.0"},{"emoji":"🌋","category":4,"name":"volcano","version":"1.0"},{"emoji":"🗻","category":4,"name":"mount fuji","version":"1.0"},{"emoji":"🏕️","category":4,"name":"camping","version":"1.0"},{"emoji":"🏖️","category":4,"name":"beach with umbrella","version":"1.0"},{"emoji":"🏜️","category":4,"name":"desert","version":"1.0"},{"emoji":"🏝️","category":4,"name":"desert island","version":"1.0"},{"emoji":"🏞️","category":4,"name":"national park","version":"1.0"},{"emoji":"🏟️","category":4,"name":"stadium","version":"1.0"},{"emoji":"🏛️","category":4,"name":"classical building","version":"1.0"},{"emoji":"🏗️","category":4,"name":"building construction","version":"1.0"},{"emoji":"🧱","category":4,"name":"brick","version":"11.0"},{"emoji":"🪨","category":4,"name":"rock","version":"13.0"},{"emoji":"🪵","category":4,"name":"wood","version":"13.0"},{"emoji":"🛖","category":4,"name":"hut","version":"13.0"},{"emoji":"🏘️","category":4,"name":"houses","version":"1.0"},{"emoji":"🏚️","category":4,"name":"derelict house","version":"1.0"},{"emoji":"🏠","category":4,"name":"house","version":"1.0"},{"emoji":"🏡","category":4,"name":"house with garden","version":"1.0"},{"emoji":"🏢","category":4,"name":"office building","version":"1.0"},{"emoji":"🏣","category":4,"name":"Japanese post office","version":"1.0"},{"emoji":"🏤","category":4,"name":"post office","version":"1.0"},{"emoji":"🏥","category":4,"name":"hospital","version":"1.0"},{"emoji":"🏦","category":4,"name":"bank","version":"1.0"},{"emoji":"🏨","category":4,"name":"hotel","version":"1.0"},{"emoji":"🏩","category":4,"name":"love hotel","version":"1.0"},{"emoji":"🏪","category":4,"name":"convenience store","version":"1.0"},{"emoji":"🏫","category":4,"name":"school","version":"1.0"},{"emoji":"🏬","category":4,"name":"department store","version":"1.0"},{"emoji":"🏭","category":4,"name":"factory","version":"1.0"},{"emoji":"🏯","category":4,"name":"Japanese castle","version":"1.0"},{"emoji":"🏰","category":4,"name":"castle","version":"1.0"},{"emoji":"💒","category":4,"name":"wedding","version":"1.0"},{"emoji":"🗼","category":4,"name":"Tokyo tower","version":"1.0"},{"emoji":"🗽","category":4,"name":"Statue of Liberty","version":"1.0"},{"emoji":"⛪","category":4,"name":"church","version":"1.0"},{"emoji":"🕌","category":4,"name":"mosque","version":"1.0"},{"emoji":"🛕","category":4,"name":"hindu temple","version":"12.0"},{"emoji":"🕍","category":4,"name":"synagogue","version":"1.0"},{"emoji":"⛩️","category":4,"name":"shinto shrine","version":"1.0"},{"emoji":"🕋","category":4,"name":"kaaba","version":"1.0"},{"emoji":"⛲","category":4,"name":"fountain","version":"1.0"},{"emoji":"⛺","category":4,"name":"tent","version":"1.0"},{"emoji":"🌁","category":4,"name":"foggy","version":"1.0"},{"emoji":"🌃","category":4,"name":"night with stars","version":"1.0"},{"emoji":"🏙️","category":4,"name":"cityscape","version":"1.0"},{"emoji":"🌄","category":4,"name":"sunrise over mountains","version":"1.0"},{"emoji":"🌅","category":4,"name":"sunrise","version":"1.0"},{"emoji":"🌆","category":4,"name":"cityscape at dusk","version":"1.0"},{"emoji":"🌇","category":4,"name":"sunset","version":"1.0"},{"emoji":"🌉","category":4,"name":"bridge at night","version":"1.0"},{"emoji":"♨️","category":4,"name":"hot springs","version":"1.0"},{"emoji":"🎠","category":4,"name":"carousel horse","version":"1.0"},{"emoji":"🎡","category":4,"name":"ferris wheel","version":"1.0"},{"emoji":"🎢","category":4,"name":"roller coaster","version":"1.0"},{"emoji":"💈","category":4,"name":"barber pole","version":"1.0"},{"emoji":"🎪","category":4,"name":"circus tent","version":"1.0"},{"emoji":"🚂","category":4,"name":"locomotive","version":"1.0"},{"emoji":"🚃","category":4,"name":"railway car","version":"1.0"},{"emoji":"🚄","category":4,"name":"high-speed train","version":"1.0"},{"emoji":"🚅","category":4,"name":"bullet train","version":"1.0"},{"emoji":"🚆","category":4,"name":"train","version":"1.0"},{"emoji":"🚇","category":4,"name":"metro","version":"1.0"},{"emoji":"🚈","category":4,"name":"light rail","version":"1.0"},{"emoji":"🚉","category":4,"name":"station","version":"1.0"},{"emoji":"🚊","category":4,"name":"tram","version":"1.0"},{"emoji":"🚝","category":4,"name":"monorail","version":"1.0"},{"emoji":"🚞","category":4,"name":"mountain railway","version":"1.0"},{"emoji":"🚋","category":4,"name":"tram car","version":"1.0"},{"emoji":"🚌","category":4,"name":"bus","version":"1.0"},{"emoji":"🚍","category":4,"name":"oncoming bus","version":"1.0"},{"emoji":"🚎","category":4,"name":"trolleybus","version":"1.0"},{"emoji":"🚐","category":4,"name":"minibus","version":"1.0"},{"emoji":"🚑","category":4,"name":"ambulance","version":"1.0"},{"emoji":"🚒","category":4,"name":"fire engine","version":"1.0"},{"emoji":"🚓","category":4,"name":"police car","version":"1.0"},{"emoji":"🚔","category":4,"name":"oncoming police car","version":"1.0"},{"emoji":"🚕","category":4,"name":"taxi","version":"1.0"},{"emoji":"🚖","category":4,"name":"oncoming taxi","version":"1.0"},{"emoji":"🚗","category":4,"name":"automobile","version":"1.0"},{"emoji":"🚘","category":4,"name":"oncoming automobile","version":"1.0"},{"emoji":"🚙","category":4,"name":"sport utility vehicle","version":"1.0"},{"emoji":"🛻","category":4,"name":"pickup truck","version":"13.0"},{"emoji":"🚚","category":4,"name":"delivery truck","version":"1.0"},{"emoji":"🚛","category":4,"name":"articulated lorry","version":"1.0"},{"emoji":"🚜","category":4,"name":"tractor","version":"1.0"},{"emoji":"🏎️","category":4,"name":"racing car","version":"1.0"},{"emoji":"🏍️","category":4,"name":"motorcycle","version":"1.0"},{"emoji":"🛵","category":4,"name":"motor scooter","version":"3.0"},{"emoji":"🦽","category":4,"name":"manual wheelchair","version":"12.0"},{"emoji":"🦼","category":4,"name":"motorized wheelchair","version":"12.0"},{"emoji":"🛺","category":4,"name":"auto rickshaw","version":"12.0"},{"emoji":"🚲","category":4,"name":"bicycle","version":"1.0"},{"emoji":"🛴","category":4,"name":"kick scooter","version":"3.0"},{"emoji":"🛹","category":4,"name":"skateboard","version":"11.0"},{"emoji":"🛼","category":4,"name":"roller skate","version":"13.0"},{"emoji":"🚏","category":4,"name":"bus stop","version":"1.0"},{"emoji":"🛣️","category":4,"name":"motorway","version":"1.0"},{"emoji":"🛤️","category":4,"name":"railway track","version":"1.0"},{"emoji":"🛢️","category":4,"name":"oil drum","version":"1.0"},{"emoji":"⛽","category":4,"name":"fuel pump","version":"1.0"},{"emoji":"🚨","category":4,"name":"police car light","version":"1.0"},{"emoji":"🚥","category":4,"name":"horizontal traffic light","version":"1.0"},{"emoji":"🚦","category":4,"name":"vertical traffic light","version":"1.0"},{"emoji":"🛑","category":4,"name":"stop sign","version":"3.0"},{"emoji":"🚧","category":4,"name":"construction","version":"1.0"},{"emoji":"⚓","category":4,"name":"anchor","version":"1.0"},{"emoji":"⛵","category":4,"name":"sailboat","version":"1.0"},{"emoji":"🛶","category":4,"name":"canoe","version":"3.0"},{"emoji":"🚤","category":4,"name":"speedboat","version":"1.0"},{"emoji":"🛳️","category":4,"name":"passenger ship","version":"1.0"},{"emoji":"⛴️","category":4,"name":"ferry","version":"1.0"},{"emoji":"🛥️","category":4,"name":"motor boat","version":"1.0"},{"emoji":"🚢","category":4,"name":"ship","version":"1.0"},{"emoji":"✈️","category":4,"name":"airplane","version":"1.0"},{"emoji":"🛩️","category":4,"name":"small airplane","version":"1.0"},{"emoji":"🛫","category":4,"name":"airplane departure","version":"1.0"},{"emoji":"🛬","category":4,"name":"airplane arrival","version":"1.0"},{"emoji":"🪂","category":4,"name":"parachute","version":"12.0"},{"emoji":"💺","category":4,"name":"seat","version":"1.0"},{"emoji":"🚁","category":4,"name":"helicopter","version":"1.0"},{"emoji":"🚟","category":4,"name":"suspension railway","version":"1.0"},{"emoji":"🚠","category":4,"name":"mountain cableway","version":"1.0"},{"emoji":"🚡","category":4,"name":"aerial tramway","version":"1.0"},{"emoji":"🛰️","category":4,"name":"satellite","version":"1.0"},{"emoji":"🚀","category":4,"name":"rocket","version":"1.0"},{"emoji":"🛸","category":4,"name":"flying saucer","version":"5.0"},{"emoji":"🛎️","category":4,"name":"bellhop bell","version":"1.0"},{"emoji":"🧳","category":4,"name":"luggage","version":"11.0"},{"emoji":"⌛","category":4,"name":"hourglass done","version":"1.0"},{"emoji":"⏳","category":4,"name":"hourglass not done","version":"1.0"},{"emoji":"⌚","category":4,"name":"watch","version":"1.0"},{"emoji":"⏰","category":4,"name":"alarm clock","version":"1.0"},{"emoji":"⏱️","category":4,"name":"stopwatch","version":"1.0"},{"emoji":"⏲️","category":4,"name":"timer clock","version":"1.0"},{"emoji":"🕰️","category":4,"name":"mantelpiece clock","version":"1.0"},{"emoji":"🕛","category":4,"name":"twelve o’clock","version":"1.0"},{"emoji":"🕧","category":4,"name":"twelve-thirty","version":"1.0"},{"emoji":"🕐","category":4,"name":"one o’clock","version":"1.0"},{"emoji":"🕜","category":4,"name":"one-thirty","version":"1.0"},{"emoji":"🕑","category":4,"name":"two o’clock","version":"1.0"},{"emoji":"🕝","category":4,"name":"two-thirty","version":"1.0"},{"emoji":"🕒","category":4,"name":"three o’clock","version":"1.0"},{"emoji":"🕞","category":4,"name":"three-thirty","version":"1.0"},{"emoji":"🕓","category":4,"name":"four o’clock","version":"1.0"},{"emoji":"🕟","category":4,"name":"four-thirty","version":"1.0"},{"emoji":"🕔","category":4,"name":"five o’clock","version":"1.0"},{"emoji":"🕠","category":4,"name":"five-thirty","version":"1.0"},{"emoji":"🕕","category":4,"name":"six o’clock","version":"1.0"},{"emoji":"🕡","category":4,"name":"six-thirty","version":"1.0"},{"emoji":"🕖","category":4,"name":"seven o’clock","version":"1.0"},{"emoji":"🕢","category":4,"name":"seven-thirty","version":"1.0"},{"emoji":"🕗","category":4,"name":"eight o’clock","version":"1.0"},{"emoji":"🕣","category":4,"name":"eight-thirty","version":"1.0"},{"emoji":"🕘","category":4,"name":"nine o’clock","version":"1.0"},{"emoji":"🕤","category":4,"name":"nine-thirty","version":"1.0"},{"emoji":"🕙","category":4,"name":"ten o’clock","version":"1.0"},{"emoji":"🕥","category":4,"name":"ten-thirty","version":"1.0"},{"emoji":"🕚","category":4,"name":"eleven o’clock","version":"1.0"},{"emoji":"🕦","category":4,"name":"eleven-thirty","version":"1.0"},{"emoji":"🌑","category":4,"name":"new moon","version":"1.0"},{"emoji":"🌒","category":4,"name":"waxing crescent moon","version":"1.0"},{"emoji":"🌓","category":4,"name":"first quarter moon","version":"1.0"},{"emoji":"🌔","category":4,"name":"waxing gibbous moon","version":"1.0"},{"emoji":"🌕","category":4,"name":"full moon","version":"1.0"},{"emoji":"🌖","category":4,"name":"waning gibbous moon","version":"1.0"},{"emoji":"🌗","category":4,"name":"last quarter moon","version":"1.0"},{"emoji":"🌘","category":4,"name":"waning crescent moon","version":"1.0"},{"emoji":"🌙","category":4,"name":"crescent moon","version":"1.0"},{"emoji":"🌚","category":4,"name":"new moon face","version":"1.0"},{"emoji":"🌛","category":4,"name":"first quarter moon face","version":"1.0"},{"emoji":"🌜","category":4,"name":"last quarter moon face","version":"1.0"},{"emoji":"🌡️","category":4,"name":"thermometer","version":"1.0"},{"emoji":"☀️","category":4,"name":"sun","version":"1.0"},{"emoji":"🌝","category":4,"name":"full moon face","version":"1.0"},{"emoji":"🌞","category":4,"name":"sun with face","version":"1.0"},{"emoji":"🪐","category":4,"name":"ringed planet","version":"12.0"},{"emoji":"⭐","category":4,"name":"star","version":"1.0"},{"emoji":"🌟","category":4,"name":"glowing star","version":"1.0"},{"emoji":"🌠","category":4,"name":"shooting star","version":"1.0"},{"emoji":"🌌","category":4,"name":"milky way","version":"1.0"},{"emoji":"☁️","category":4,"name":"cloud","version":"1.0"},{"emoji":"⛅","category":4,"name":"sun behind cloud","version":"1.0"},{"emoji":"⛈️","category":4,"name":"cloud with lightning and rain","version":"1.0"},{"emoji":"🌤️","category":4,"name":"sun behind small cloud","version":"1.0"},{"emoji":"🌥️","category":4,"name":"sun behind large cloud","version":"1.0"},{"emoji":"🌦️","category":4,"name":"sun behind rain cloud","version":"1.0"},{"emoji":"🌧️","category":4,"name":"cloud with rain","version":"1.0"},{"emoji":"🌨️","category":4,"name":"cloud with snow","version":"1.0"},{"emoji":"🌩️","category":4,"name":"cloud with lightning","version":"1.0"},{"emoji":"🌪️","category":4,"name":"tornado","version":"1.0"},{"emoji":"🌫️","category":4,"name":"fog","version":"1.0"},{"emoji":"🌬️","category":4,"name":"wind face","version":"1.0"},{"emoji":"🌀","category":4,"name":"cyclone","version":"1.0"},{"emoji":"🌈","category":4,"name":"rainbow","version":"1.0"},{"emoji":"🌂","category":4,"name":"closed umbrella","version":"1.0"},{"emoji":"☂️","category":4,"name":"umbrella","version":"1.0"},{"emoji":"☔","category":4,"name":"umbrella with rain drops","version":"1.0"},{"emoji":"⛱️","category":4,"name":"umbrella on ground","version":"1.0"},{"emoji":"⚡","category":4,"name":"high voltage","version":"1.0"},{"emoji":"❄️","category":4,"name":"snowflake","version":"1.0"},{"emoji":"☃️","category":4,"name":"snowman","version":"1.0"},{"emoji":"⛄","category":4,"name":"snowman without snow","version":"1.0"},{"emoji":"☄️","category":4,"name":"comet","version":"1.0"},{"emoji":"🔥","category":4,"name":"fire","version":"1.0"},{"emoji":"💧","category":4,"name":"droplet","version":"1.0"},{"emoji":"🌊","category":4,"name":"water wave","version":"1.0"},{"emoji":"🎃","category":5,"name":"jack-o-lantern","version":"1.0"},{"emoji":"🎄","category":5,"name":"Christmas tree","version":"1.0"},{"emoji":"🎆","category":5,"name":"fireworks","version":"1.0"},{"emoji":"🎇","category":5,"name":"sparkler","version":"1.0"},{"emoji":"🧨","category":5,"name":"firecracker","version":"11.0"},{"emoji":"✨","category":5,"name":"sparkles","version":"1.0"},{"emoji":"🎈","category":5,"name":"balloon","version":"1.0"},{"emoji":"🎉","category":5,"name":"party popper","version":"1.0"},{"emoji":"🎊","category":5,"name":"confetti ball","version":"1.0"},{"emoji":"🎋","category":5,"name":"tanabata tree","version":"1.0"},{"emoji":"🎍","category":5,"name":"pine decoration","version":"1.0"},{"emoji":"🎎","category":5,"name":"Japanese dolls","version":"1.0"},{"emoji":"🎏","category":5,"name":"carp streamer","version":"1.0"},{"emoji":"🎐","category":5,"name":"wind chime","version":"1.0"},{"emoji":"🎑","category":5,"name":"moon viewing ceremony","version":"1.0"},{"emoji":"🧧","category":5,"name":"red envelope","version":"11.0"},{"emoji":"🎀","category":5,"name":"ribbon","version":"1.0"},{"emoji":"🎁","category":5,"name":"wrapped gift","version":"1.0"},{"emoji":"🎗️","category":5,"name":"reminder ribbon","version":"1.0"},{"emoji":"🎟️","category":5,"name":"admission tickets","version":"1.0"},{"emoji":"🎫","category":5,"name":"ticket","version":"1.0"},{"emoji":"🎖️","category":5,"name":"military medal","version":"1.0"},{"emoji":"🏆","category":5,"name":"trophy","version":"1.0"},{"emoji":"🏅","category":5,"name":"sports medal","version":"1.0"},{"emoji":"🥇","category":5,"name":"1st place medal","version":"3.0"},{"emoji":"🥈","category":5,"name":"2nd place medal","version":"3.0"},{"emoji":"🥉","category":5,"name":"3rd place medal","version":"3.0"},{"emoji":"⚽","category":5,"name":"soccer ball","version":"1.0"},{"emoji":"⚾","category":5,"name":"baseball","version":"1.0"},{"emoji":"🥎","category":5,"name":"softball","version":"11.0"},{"emoji":"🏀","category":5,"name":"basketball","version":"1.0"},{"emoji":"🏐","category":5,"name":"volleyball","version":"1.0"},{"emoji":"🏈","category":5,"name":"american football","version":"1.0"},{"emoji":"🏉","category":5,"name":"rugby football","version":"1.0"},{"emoji":"🎾","category":5,"name":"tennis","version":"1.0"},{"emoji":"🥏","category":5,"name":"flying disc","version":"11.0"},{"emoji":"🎳","category":5,"name":"bowling","version":"1.0"},{"emoji":"🏏","category":5,"name":"cricket game","version":"1.0"},{"emoji":"🏑","category":5,"name":"field hockey","version":"1.0"},{"emoji":"🏒","category":5,"name":"ice hockey","version":"1.0"},{"emoji":"🥍","category":5,"name":"lacrosse","version":"11.0"},{"emoji":"🏓","category":5,"name":"ping pong","version":"1.0"},{"emoji":"🏸","category":5,"name":"badminton","version":"1.0"},{"emoji":"🥊","category":5,"name":"boxing glove","version":"3.0"},{"emoji":"🥋","category":5,"name":"martial arts uniform","version":"3.0"},{"emoji":"🥅","category":5,"name":"goal net","version":"3.0"},{"emoji":"⛳","category":5,"name":"flag in hole","version":"1.0"},{"emoji":"⛸️","category":5,"name":"ice skate","version":"1.0"},{"emoji":"🎣","category":5,"name":"fishing pole","version":"1.0"},{"emoji":"🤿","category":5,"name":"diving mask","version":"12.0"},{"emoji":"🎽","category":5,"name":"running shirt","version":"1.0"},{"emoji":"🎿","category":5,"name":"skis","version":"1.0"},{"emoji":"🛷","category":5,"name":"sled","version":"5.0"},{"emoji":"🥌","category":5,"name":"curling stone","version":"5.0"},{"emoji":"🎯","category":5,"name":"direct hit","version":"1.0"},{"emoji":"🪀","category":5,"name":"yo-yo","version":"12.0"},{"emoji":"🪁","category":5,"name":"kite","version":"12.0"},{"emoji":"🎱","category":5,"name":"pool 8 ball","version":"1.0"},{"emoji":"🔮","category":5,"name":"crystal ball","version":"1.0"},{"emoji":"🪄","category":5,"name":"magic wand","version":"13.0"},{"emoji":"🧿","category":5,"name":"nazar amulet","version":"11.0"},{"emoji":"🎮","category":5,"name":"video game","version":"1.0"},{"emoji":"🕹️","category":5,"name":"joystick","version":"1.0"},{"emoji":"🎰","category":5,"name":"slot machine","version":"1.0"},{"emoji":"🎲","category":5,"name":"game die","version":"1.0"},{"emoji":"🧩","category":5,"name":"puzzle piece","version":"11.0"},{"emoji":"🧸","category":5,"name":"teddy bear","version":"11.0"},{"emoji":"🪅","category":5,"name":"piñata","version":"13.0"},{"emoji":"🪆","category":5,"name":"nesting dolls","version":"13.0"},{"emoji":"♠️","category":5,"name":"spade suit","version":"1.0"},{"emoji":"♥️","category":5,"name":"heart suit","version":"1.0"},{"emoji":"♦️","category":5,"name":"diamond suit","version":"1.0"},{"emoji":"♣️","category":5,"name":"club suit","version":"1.0"},{"emoji":"♟️","category":5,"name":"chess pawn","version":"11.0"},{"emoji":"🃏","category":5,"name":"joker","version":"1.0"},{"emoji":"🀄","category":5,"name":"mahjong red dragon","version":"1.0"},{"emoji":"🎴","category":5,"name":"flower playing cards","version":"1.0"},{"emoji":"🎭","category":5,"name":"performing arts","version":"1.0"},{"emoji":"🖼️","category":5,"name":"framed picture","version":"1.0"},{"emoji":"🎨","category":5,"name":"artist palette","version":"1.0"},{"emoji":"🧵","category":5,"name":"thread","version":"11.0"},{"emoji":"🪡","category":5,"name":"sewing needle","version":"13.0"},{"emoji":"🧶","category":5,"name":"yarn","version":"11.0"},{"emoji":"🪢","category":5,"name":"knot","version":"13.0"},{"emoji":"👓","category":6,"name":"glasses","version":"1.0"},{"emoji":"🕶️","category":6,"name":"sunglasses","version":"1.0"},{"emoji":"🥽","category":6,"name":"goggles","version":"11.0"},{"emoji":"🥼","category":6,"name":"lab coat","version":"11.0"},{"emoji":"🦺","category":6,"name":"safety vest","version":"12.0"},{"emoji":"👔","category":6,"name":"necktie","version":"1.0"},{"emoji":"👕","category":6,"name":"t-shirt","version":"1.0"},{"emoji":"👖","category":6,"name":"jeans","version":"1.0"},{"emoji":"🧣","category":6,"name":"scarf","version":"5.0"},{"emoji":"🧤","category":6,"name":"gloves","version":"5.0"},{"emoji":"🧥","category":6,"name":"coat","version":"5.0"},{"emoji":"🧦","category":6,"name":"socks","version":"5.0"},{"emoji":"👗","category":6,"name":"dress","version":"1.0"},{"emoji":"👘","category":6,"name":"kimono","version":"1.0"},{"emoji":"🥻","category":6,"name":"sari","version":"12.0"},{"emoji":"🩱","category":6,"name":"one-piece swimsuit","version":"12.0"},{"emoji":"🩲","category":6,"name":"briefs","version":"12.0"},{"emoji":"🩳","category":6,"name":"shorts","version":"12.0"},{"emoji":"👙","category":6,"name":"bikini","version":"1.0"},{"emoji":"👚","category":6,"name":"woman’s clothes","version":"1.0"},{"emoji":"👛","category":6,"name":"purse","version":"1.0"},{"emoji":"👜","category":6,"name":"handbag","version":"1.0"},{"emoji":"👝","category":6,"name":"clutch bag","version":"1.0"},{"emoji":"🛍️","category":6,"name":"shopping bags","version":"1.0"},{"emoji":"🎒","category":6,"name":"backpack","version":"1.0"},{"emoji":"🩴","category":6,"name":"thong sandal","version":"13.0"},{"emoji":"👞","category":6,"name":"man’s shoe","version":"1.0"},{"emoji":"👟","category":6,"name":"running shoe","version":"1.0"},{"emoji":"🥾","category":6,"name":"hiking boot","version":"11.0"},{"emoji":"🥿","category":6,"name":"flat shoe","version":"11.0"},{"emoji":"👠","category":6,"name":"high-heeled shoe","version":"1.0"},{"emoji":"👡","category":6,"name":"woman’s sandal","version":"1.0"},{"emoji":"🩰","category":6,"name":"ballet shoes","version":"12.0"},{"emoji":"👢","category":6,"name":"woman’s boot","version":"1.0"},{"emoji":"👑","category":6,"name":"crown","version":"1.0"},{"emoji":"👒","category":6,"name":"woman’s hat","version":"1.0"},{"emoji":"🎩","category":6,"name":"top hat","version":"1.0"},{"emoji":"🎓","category":6,"name":"graduation cap","version":"1.0"},{"emoji":"🧢","category":6,"name":"billed cap","version":"5.0"},{"emoji":"🪖","category":6,"name":"military helmet","version":"13.0"},{"emoji":"⛑️","category":6,"name":"rescue worker’s helmet","version":"1.0"},{"emoji":"📿","category":6,"name":"prayer beads","version":"1.0"},{"emoji":"💄","category":6,"name":"lipstick","version":"1.0"},{"emoji":"💍","category":6,"name":"ring","version":"1.0"},{"emoji":"💎","category":6,"name":"gem stone","version":"1.0"},{"emoji":"🔇","category":6,"name":"muted speaker","version":"1.0"},{"emoji":"🔈","category":6,"name":"speaker low volume","version":"1.0"},{"emoji":"🔉","category":6,"name":"speaker medium volume","version":"1.0"},{"emoji":"🔊","category":6,"name":"speaker high volume","version":"1.0"},{"emoji":"📢","category":6,"name":"loudspeaker","version":"1.0"},{"emoji":"📣","category":6,"name":"megaphone","version":"1.0"},{"emoji":"📯","category":6,"name":"postal horn","version":"1.0"},{"emoji":"🔔","category":6,"name":"bell","version":"1.0"},{"emoji":"🔕","category":6,"name":"bell with slash","version":"1.0"},{"emoji":"🎼","category":6,"name":"musical score","version":"1.0"},{"emoji":"🎵","category":6,"name":"musical note","version":"1.0"},{"emoji":"🎶","category":6,"name":"musical notes","version":"1.0"},{"emoji":"🎙️","category":6,"name":"studio microphone","version":"1.0"},{"emoji":"🎚️","category":6,"name":"level slider","version":"1.0"},{"emoji":"🎛️","category":6,"name":"control knobs","version":"1.0"},{"emoji":"🎤","category":6,"name":"microphone","version":"1.0"},{"emoji":"🎧","category":6,"name":"headphone","version":"1.0"},{"emoji":"📻","category":6,"name":"radio","version":"1.0"},{"emoji":"🎷","category":6,"name":"saxophone","version":"1.0"},{"emoji":"🪗","category":6,"name":"accordion","version":"13.0"},{"emoji":"🎸","category":6,"name":"guitar","version":"1.0"},{"emoji":"🎹","category":6,"name":"musical keyboard","version":"1.0"},{"emoji":"🎺","category":6,"name":"trumpet","version":"1.0"},{"emoji":"🎻","category":6,"name":"violin","version":"1.0"},{"emoji":"🪕","category":6,"name":"banjo","version":"12.0"},{"emoji":"🥁","category":6,"name":"drum","version":"3.0"},{"emoji":"🪘","category":6,"name":"long drum","version":"13.0"},{"emoji":"📱","category":6,"name":"mobile phone","version":"1.0"},{"emoji":"📲","category":6,"name":"mobile phone with arrow","version":"1.0"},{"emoji":"☎️","category":6,"name":"telephone","version":"1.0"},{"emoji":"📞","category":6,"name":"telephone receiver","version":"1.0"},{"emoji":"📟","category":6,"name":"pager","version":"1.0"},{"emoji":"📠","category":6,"name":"fax machine","version":"1.0"},{"emoji":"🔋","category":6,"name":"battery","version":"1.0"},{"emoji":"🔌","category":6,"name":"electric plug","version":"1.0"},{"emoji":"💻","category":6,"name":"laptop","version":"1.0"},{"emoji":"🖥️","category":6,"name":"desktop computer","version":"1.0"},{"emoji":"🖨️","category":6,"name":"printer","version":"1.0"},{"emoji":"⌨️","category":6,"name":"keyboard","version":"1.0"},{"emoji":"🖱️","category":6,"name":"computer mouse","version":"1.0"},{"emoji":"🖲️","category":6,"name":"trackball","version":"1.0"},{"emoji":"💽","category":6,"name":"computer disk","version":"1.0"},{"emoji":"💾","category":6,"name":"floppy disk","version":"1.0"},{"emoji":"💿","category":6,"name":"optical disk","version":"1.0"},{"emoji":"📀","category":6,"name":"dvd","version":"1.0"},{"emoji":"🧮","category":6,"name":"abacus","version":"11.0"},{"emoji":"🎥","category":6,"name":"movie camera","version":"1.0"},{"emoji":"🎞️","category":6,"name":"film frames","version":"1.0"},{"emoji":"📽️","category":6,"name":"film projector","version":"1.0"},{"emoji":"🎬","category":6,"name":"clapper board","version":"1.0"},{"emoji":"📺","category":6,"name":"television","version":"1.0"},{"emoji":"📷","category":6,"name":"camera","version":"1.0"},{"emoji":"📸","category":6,"name":"camera with flash","version":"1.0"},{"emoji":"📹","category":6,"name":"video camera","version":"1.0"},{"emoji":"📼","category":6,"name":"videocassette","version":"1.0"},{"emoji":"🔍","category":6,"name":"magnifying glass tilted left","version":"1.0"},{"emoji":"🔎","category":6,"name":"magnifying glass tilted right","version":"1.0"},{"emoji":"🕯️","category":6,"name":"candle","version":"1.0"},{"emoji":"💡","category":6,"name":"light bulb","version":"1.0"},{"emoji":"🔦","category":6,"name":"flashlight","version":"1.0"},{"emoji":"🏮","category":6,"name":"red paper lantern","version":"1.0"},{"emoji":"🪔","category":6,"name":"diya lamp","version":"12.0"},{"emoji":"📔","category":6,"name":"notebook with decorative cover","version":"1.0"},{"emoji":"📕","category":6,"name":"closed book","version":"1.0"},{"emoji":"📖","category":6,"name":"open book","version":"1.0"},{"emoji":"📗","category":6,"name":"green book","version":"1.0"},{"emoji":"📘","category":6,"name":"blue book","version":"1.0"},{"emoji":"📙","category":6,"name":"orange book","version":"1.0"},{"emoji":"📚","category":6,"name":"books","version":"1.0"},{"emoji":"📓","category":6,"name":"notebook","version":"1.0"},{"emoji":"📒","category":6,"name":"ledger","version":"1.0"},{"emoji":"📃","category":6,"name":"page with curl","version":"1.0"},{"emoji":"📜","category":6,"name":"scroll","version":"1.0"},{"emoji":"📄","category":6,"name":"page facing up","version":"1.0"},{"emoji":"📰","category":6,"name":"newspaper","version":"1.0"},{"emoji":"🗞️","category":6,"name":"rolled-up newspaper","version":"1.0"},{"emoji":"📑","category":6,"name":"bookmark tabs","version":"1.0"},{"emoji":"🔖","category":6,"name":"bookmark","version":"1.0"},{"emoji":"🏷️","category":6,"name":"label","version":"1.0"},{"emoji":"💰","category":6,"name":"money bag","version":"1.0"},{"emoji":"🪙","category":6,"name":"coin","version":"13.0"},{"emoji":"💴","category":6,"name":"yen banknote","version":"1.0"},{"emoji":"💵","category":6,"name":"dollar banknote","version":"1.0"},{"emoji":"💶","category":6,"name":"euro banknote","version":"1.0"},{"emoji":"💷","category":6,"name":"pound banknote","version":"1.0"},{"emoji":"💸","category":6,"name":"money with wings","version":"1.0"},{"emoji":"💳","category":6,"name":"credit card","version":"1.0"},{"emoji":"🧾","category":6,"name":"receipt","version":"11.0"},{"emoji":"💹","category":6,"name":"chart increasing with yen","version":"1.0"},{"emoji":"✉️","category":6,"name":"envelope","version":"1.0"},{"emoji":"📧","category":6,"name":"e-mail","version":"1.0"},{"emoji":"📨","category":6,"name":"incoming envelope","version":"1.0"},{"emoji":"📩","category":6,"name":"envelope with arrow","version":"1.0"},{"emoji":"📤","category":6,"name":"outbox tray","version":"1.0"},{"emoji":"📥","category":6,"name":"inbox tray","version":"1.0"},{"emoji":"📦","category":6,"name":"package","version":"1.0"},{"emoji":"📫","category":6,"name":"closed mailbox with raised flag","version":"1.0"},{"emoji":"📪","category":6,"name":"closed mailbox with lowered flag","version":"1.0"},{"emoji":"📬","category":6,"name":"open mailbox with raised flag","version":"1.0"},{"emoji":"📭","category":6,"name":"open mailbox with lowered flag","version":"1.0"},{"emoji":"📮","category":6,"name":"postbox","version":"1.0"},{"emoji":"🗳️","category":6,"name":"ballot box with ballot","version":"1.0"},{"emoji":"✏️","category":6,"name":"pencil","version":"1.0"},{"emoji":"✒️","category":6,"name":"black nib","version":"1.0"},{"emoji":"🖋️","category":6,"name":"fountain pen","version":"1.0"},{"emoji":"🖊️","category":6,"name":"pen","version":"1.0"},{"emoji":"🖌️","category":6,"name":"paintbrush","version":"1.0"},{"emoji":"🖍️","category":6,"name":"crayon","version":"1.0"},{"emoji":"📝","category":6,"name":"memo","version":"1.0"},{"emoji":"💼","category":6,"name":"briefcase","version":"1.0"},{"emoji":"📁","category":6,"name":"file folder","version":"1.0"},{"emoji":"📂","category":6,"name":"open file folder","version":"1.0"},{"emoji":"🗂️","category":6,"name":"card index dividers","version":"1.0"},{"emoji":"📅","category":6,"name":"calendar","version":"1.0"},{"emoji":"📆","category":6,"name":"tear-off calendar","version":"1.0"},{"emoji":"🗒️","category":6,"name":"spiral notepad","version":"1.0"},{"emoji":"🗓️","category":6,"name":"spiral calendar","version":"1.0"},{"emoji":"📇","category":6,"name":"card index","version":"1.0"},{"emoji":"📈","category":6,"name":"chart increasing","version":"1.0"},{"emoji":"📉","category":6,"name":"chart decreasing","version":"1.0"},{"emoji":"📊","category":6,"name":"bar chart","version":"1.0"},{"emoji":"📋","category":6,"name":"clipboard","version":"1.0"},{"emoji":"📌","category":6,"name":"pushpin","version":"1.0"},{"emoji":"📍","category":6,"name":"round pushpin","version":"1.0"},{"emoji":"📎","category":6,"name":"paperclip","version":"1.0"},{"emoji":"🖇️","category":6,"name":"linked paperclips","version":"1.0"},{"emoji":"📏","category":6,"name":"straight ruler","version":"1.0"},{"emoji":"📐","category":6,"name":"triangular ruler","version":"1.0"},{"emoji":"✂️","category":6,"name":"scissors","version":"1.0"},{"emoji":"🗃️","category":6,"name":"card file box","version":"1.0"},{"emoji":"🗄️","category":6,"name":"file cabinet","version":"1.0"},{"emoji":"🗑️","category":6,"name":"wastebasket","version":"1.0"},{"emoji":"🔒","category":6,"name":"locked","version":"1.0"},{"emoji":"🔓","category":6,"name":"unlocked","version":"1.0"},{"emoji":"🔏","category":6,"name":"locked with pen","version":"1.0"},{"emoji":"🔐","category":6,"name":"locked with key","version":"1.0"},{"emoji":"🔑","category":6,"name":"key","version":"1.0"},{"emoji":"🗝️","category":6,"name":"old key","version":"1.0"},{"emoji":"🔨","category":6,"name":"hammer","version":"1.0"},{"emoji":"🪓","category":6,"name":"axe","version":"12.0"},{"emoji":"⛏️","category":6,"name":"pick","version":"1.0"},{"emoji":"⚒️","category":6,"name":"hammer and pick","version":"1.0"},{"emoji":"🛠️","category":6,"name":"hammer and wrench","version":"1.0"},{"emoji":"🗡️","category":6,"name":"dagger","version":"1.0"},{"emoji":"⚔️","category":6,"name":"crossed swords","version":"1.0"},{"emoji":"🔫","category":6,"name":"pistol","version":"1.0"},{"emoji":"🪃","category":6,"name":"boomerang","version":"13.0"},{"emoji":"🏹","category":6,"name":"bow and arrow","version":"1.0"},{"emoji":"🛡️","category":6,"name":"shield","version":"1.0"},{"emoji":"🪚","category":6,"name":"carpentry saw","version":"13.0"},{"emoji":"🔧","category":6,"name":"wrench","version":"1.0"},{"emoji":"🪛","category":6,"name":"screwdriver","version":"13.0"},{"emoji":"🔩","category":6,"name":"nut and bolt","version":"1.0"},{"emoji":"⚙️","category":6,"name":"gear","version":"1.0"},{"emoji":"🗜️","category":6,"name":"clamp","version":"1.0"},{"emoji":"⚖️","category":6,"name":"balance scale","version":"1.0"},{"emoji":"🦯","category":6,"name":"white cane","version":"12.0"},{"emoji":"🔗","category":6,"name":"link","version":"1.0"},{"emoji":"⛓️","category":6,"name":"chains","version":"1.0"},{"emoji":"🪝","category":6,"name":"hook","version":"13.0"},{"emoji":"🧰","category":6,"name":"toolbox","version":"11.0"},{"emoji":"🧲","category":6,"name":"magnet","version":"11.0"},{"emoji":"🪜","category":6,"name":"ladder","version":"13.0"},{"emoji":"⚗️","category":6,"name":"alembic","version":"1.0"},{"emoji":"🧪","category":6,"name":"test tube","version":"11.0"},{"emoji":"🧫","category":6,"name":"petri dish","version":"11.0"},{"emoji":"🧬","category":6,"name":"dna","version":"11.0"},{"emoji":"🔬","category":6,"name":"microscope","version":"1.0"},{"emoji":"🔭","category":6,"name":"telescope","version":"1.0"},{"emoji":"📡","category":6,"name":"satellite antenna","version":"1.0"},{"emoji":"💉","category":6,"name":"syringe","version":"1.0"},{"emoji":"🩸","category":6,"name":"drop of blood","version":"12.0"},{"emoji":"💊","category":6,"name":"pill","version":"1.0"},{"emoji":"🩹","category":6,"name":"adhesive bandage","version":"12.0"},{"emoji":"🩺","category":6,"name":"stethoscope","version":"12.0"},{"emoji":"🚪","category":6,"name":"door","version":"1.0"},{"emoji":"🛗","category":6,"name":"elevator","version":"13.0"},{"emoji":"🪞","category":6,"name":"mirror","version":"13.0"},{"emoji":"🪟","category":6,"name":"window","version":"13.0"},{"emoji":"🛏️","category":6,"name":"bed","version":"1.0"},{"emoji":"🛋️","category":6,"name":"couch and lamp","version":"1.0"},{"emoji":"🪑","category":6,"name":"chair","version":"12.0"},{"emoji":"🚽","category":6,"name":"toilet","version":"1.0"},{"emoji":"🪠","category":6,"name":"plunger","version":"13.0"},{"emoji":"🚿","category":6,"name":"shower","version":"1.0"},{"emoji":"🛁","category":6,"name":"bathtub","version":"1.0"},{"emoji":"🪤","category":6,"name":"mouse trap","version":"13.0"},{"emoji":"🪒","category":6,"name":"razor","version":"12.0"},{"emoji":"🧴","category":6,"name":"lotion bottle","version":"11.0"},{"emoji":"🧷","category":6,"name":"safety pin","version":"11.0"},{"emoji":"🧹","category":6,"name":"broom","version":"11.0"},{"emoji":"🧺","category":6,"name":"basket","version":"11.0"},{"emoji":"🧻","category":6,"name":"roll of paper","version":"11.0"},{"emoji":"🪣","category":6,"name":"bucket","version":"13.0"},{"emoji":"🧼","category":6,"name":"soap","version":"11.0"},{"emoji":"🪥","category":6,"name":"toothbrush","version":"13.0"},{"emoji":"🧽","category":6,"name":"sponge","version":"11.0"},{"emoji":"🧯","category":6,"name":"fire extinguisher","version":"11.0"},{"emoji":"🛒","category":6,"name":"shopping cart","version":"3.0"},{"emoji":"🚬","category":6,"name":"cigarette","version":"1.0"},{"emoji":"⚰️","category":6,"name":"coffin","version":"1.0"},{"emoji":"🪦","category":6,"name":"headstone","version":"13.0"},{"emoji":"⚱️","category":6,"name":"funeral urn","version":"1.0"},{"emoji":"🗿","category":6,"name":"moai","version":"1.0"},{"emoji":"🪧","category":6,"name":"placard","version":"13.0"},{"emoji":"🏧","category":7,"name":"ATM sign","version":"1.0"},{"emoji":"🚮","category":7,"name":"litter in bin sign","version":"1.0"},{"emoji":"🚰","category":7,"name":"potable water","version":"1.0"},{"emoji":"♿","category":7,"name":"wheelchair symbol","version":"1.0"},{"emoji":"🚹","category":7,"name":"men’s room","version":"1.0"},{"emoji":"🚺","category":7,"name":"women’s room","version":"1.0"},{"emoji":"🚻","category":7,"name":"restroom","version":"1.0"},{"emoji":"🚼","category":7,"name":"baby symbol","version":"1.0"},{"emoji":"🚾","category":7,"name":"water closet","version":"1.0"},{"emoji":"🛂","category":7,"name":"passport control","version":"1.0"},{"emoji":"🛃","category":7,"name":"customs","version":"1.0"},{"emoji":"🛄","category":7,"name":"baggage claim","version":"1.0"},{"emoji":"🛅","category":7,"name":"left luggage","version":"1.0"},{"emoji":"⚠️","category":7,"name":"warning","version":"1.0"},{"emoji":"🚸","category":7,"name":"children crossing","version":"1.0"},{"emoji":"⛔","category":7,"name":"no entry","version":"1.0"},{"emoji":"🚫","category":7,"name":"prohibited","version":"1.0"},{"emoji":"🚳","category":7,"name":"no bicycles","version":"1.0"},{"emoji":"🚭","category":7,"name":"no smoking","version":"1.0"},{"emoji":"🚯","category":7,"name":"no littering","version":"1.0"},{"emoji":"🚱","category":7,"name":"non-potable water","version":"1.0"},{"emoji":"🚷","category":7,"name":"no pedestrians","version":"1.0"},{"emoji":"📵","category":7,"name":"no mobile phones","version":"1.0"},{"emoji":"🔞","category":7,"name":"no one under eighteen","version":"1.0"},{"emoji":"☢️","category":7,"name":"radioactive","version":"1.0"},{"emoji":"☣️","category":7,"name":"biohazard","version":"1.0"},{"emoji":"⬆️","category":7,"name":"up arrow","version":"1.0"},{"emoji":"↗️","category":7,"name":"up-right arrow","version":"1.0"},{"emoji":"➡️","category":7,"name":"right arrow","version":"1.0"},{"emoji":"↘️","category":7,"name":"down-right arrow","version":"1.0"},{"emoji":"⬇️","category":7,"name":"down arrow","version":"1.0"},{"emoji":"↙️","category":7,"name":"down-left arrow","version":"1.0"},{"emoji":"⬅️","category":7,"name":"left arrow","version":"1.0"},{"emoji":"↖️","category":7,"name":"up-left arrow","version":"1.0"},{"emoji":"↕️","category":7,"name":"up-down arrow","version":"1.0"},{"emoji":"↔️","category":7,"name":"left-right arrow","version":"1.0"},{"emoji":"↩️","category":7,"name":"right arrow curving left","version":"1.0"},{"emoji":"↪️","category":7,"name":"left arrow curving right","version":"1.0"},{"emoji":"⤴️","category":7,"name":"right arrow curving up","version":"1.0"},{"emoji":"⤵️","category":7,"name":"right arrow curving down","version":"1.0"},{"emoji":"🔃","category":7,"name":"clockwise vertical arrows","version":"1.0"},{"emoji":"🔄","category":7,"name":"counterclockwise arrows button","version":"1.0"},{"emoji":"🔙","category":7,"name":"BACK arrow","version":"1.0"},{"emoji":"🔚","category":7,"name":"END arrow","version":"1.0"},{"emoji":"🔛","category":7,"name":"ON! arrow","version":"1.0"},{"emoji":"🔜","category":7,"name":"SOON arrow","version":"1.0"},{"emoji":"🔝","category":7,"name":"TOP arrow","version":"1.0"},{"emoji":"🛐","category":7,"name":"place of worship","version":"1.0"},{"emoji":"⚛️","category":7,"name":"atom symbol","version":"1.0"},{"emoji":"🕉️","category":7,"name":"om","version":"1.0"},{"emoji":"✡️","category":7,"name":"star of David","version":"1.0"},{"emoji":"☸️","category":7,"name":"wheel of dharma","version":"1.0"},{"emoji":"☯️","category":7,"name":"yin yang","version":"1.0"},{"emoji":"✝️","category":7,"name":"latin cross","version":"1.0"},{"emoji":"☦️","category":7,"name":"orthodox cross","version":"1.0"},{"emoji":"☪️","category":7,"name":"star and crescent","version":"1.0"},{"emoji":"☮️","category":7,"name":"peace symbol","version":"1.0"},{"emoji":"🕎","category":7,"name":"menorah","version":"1.0"},{"emoji":"🔯","category":7,"name":"dotted six-pointed star","version":"1.0"},{"emoji":"♈","category":7,"name":"Aries","version":"1.0"},{"emoji":"♉","category":7,"name":"Taurus","version":"1.0"},{"emoji":"♊","category":7,"name":"Gemini","version":"1.0"},{"emoji":"♋","category":7,"name":"Cancer","version":"1.0"},{"emoji":"♌","category":7,"name":"Leo","version":"1.0"},{"emoji":"♍","category":7,"name":"Virgo","version":"1.0"},{"emoji":"♎","category":7,"name":"Libra","version":"1.0"},{"emoji":"♏","category":7,"name":"Scorpio","version":"1.0"},{"emoji":"♐","category":7,"name":"Sagittarius","version":"1.0"},{"emoji":"♑","category":7,"name":"Capricorn","version":"1.0"},{"emoji":"♒","category":7,"name":"Aquarius","version":"1.0"},{"emoji":"♓","category":7,"name":"Pisces","version":"1.0"},{"emoji":"⛎","category":7,"name":"Ophiuchus","version":"1.0"},{"emoji":"🔀","category":7,"name":"shuffle tracks button","version":"1.0"},{"emoji":"🔁","category":7,"name":"repeat button","version":"1.0"},{"emoji":"🔂","category":7,"name":"repeat single button","version":"1.0"},{"emoji":"▶️","category":7,"name":"play button","version":"1.0"},{"emoji":"⏩","category":7,"name":"fast-forward button","version":"1.0"},{"emoji":"⏭️","category":7,"name":"next track button","version":"1.0"},{"emoji":"⏯️","category":7,"name":"play or pause button","version":"1.0"},{"emoji":"◀️","category":7,"name":"reverse button","version":"1.0"},{"emoji":"⏪","category":7,"name":"fast reverse button","version":"1.0"},{"emoji":"⏮️","category":7,"name":"last track button","version":"1.0"},{"emoji":"🔼","category":7,"name":"upwards button","version":"1.0"},{"emoji":"⏫","category":7,"name":"fast up button","version":"1.0"},{"emoji":"🔽","category":7,"name":"downwards button","version":"1.0"},{"emoji":"⏬","category":7,"name":"fast down button","version":"1.0"},{"emoji":"⏸️","category":7,"name":"pause button","version":"1.0"},{"emoji":"⏹️","category":7,"name":"stop button","version":"1.0"},{"emoji":"⏺️","category":7,"name":"record button","version":"1.0"},{"emoji":"⏏️","category":7,"name":"eject button","version":"1.0"},{"emoji":"🎦","category":7,"name":"cinema","version":"1.0"},{"emoji":"🔅","category":7,"name":"dim button","version":"1.0"},{"emoji":"🔆","category":7,"name":"bright button","version":"1.0"},{"emoji":"📶","category":7,"name":"antenna bars","version":"1.0"},{"emoji":"📳","category":7,"name":"vibration mode","version":"1.0"},{"emoji":"📴","category":7,"name":"mobile phone off","version":"1.0"},{"emoji":"♀️","category":7,"name":"female sign","version":"4.0"},{"emoji":"♂️","category":7,"name":"male sign","version":"4.0"},{"emoji":"⚧️","category":7,"name":"transgender symbol","version":"13.0"},{"emoji":"✖️","category":7,"name":"multiply","version":"1.0"},{"emoji":"➕","category":7,"name":"plus","version":"1.0"},{"emoji":"➖","category":7,"name":"minus","version":"1.0"},{"emoji":"➗","category":7,"name":"divide","version":"1.0"},{"emoji":"♾️","category":7,"name":"infinity","version":"11.0"},{"emoji":"‼️","category":7,"name":"double exclamation mark","version":"1.0"},{"emoji":"⁉️","category":7,"name":"exclamation question mark","version":"1.0"},{"emoji":"❓","category":7,"name":"question mark","version":"1.0"},{"emoji":"❔","category":7,"name":"white question mark","version":"1.0"},{"emoji":"❕","category":7,"name":"white exclamation mark","version":"1.0"},{"emoji":"❗","category":7,"name":"exclamation mark","version":"1.0"},{"emoji":"〰️","category":7,"name":"wavy dash","version":"1.0"},{"emoji":"💱","category":7,"name":"currency exchange","version":"1.0"},{"emoji":"💲","category":7,"name":"heavy dollar sign","version":"1.0"},{"emoji":"⚕️","category":7,"name":"medical symbol","version":"4.0"},{"emoji":"♻️","category":7,"name":"recycling symbol","version":"1.0"},{"emoji":"⚜️","category":7,"name":"fleur-de-lis","version":"1.0"},{"emoji":"🔱","category":7,"name":"trident emblem","version":"1.0"},{"emoji":"📛","category":7,"name":"name badge","version":"1.0"},{"emoji":"🔰","category":7,"name":"Japanese symbol for beginner","version":"1.0"},{"emoji":"⭕","category":7,"name":"hollow red circle","version":"1.0"},{"emoji":"✅","category":7,"name":"check mark button","version":"1.0"},{"emoji":"☑️","category":7,"name":"check box with check","version":"1.0"},{"emoji":"✔️","category":7,"name":"check mark","version":"1.0"},{"emoji":"❌","category":7,"name":"cross mark","version":"1.0"},{"emoji":"❎","category":7,"name":"cross mark button","version":"1.0"},{"emoji":"➰","category":7,"name":"curly loop","version":"1.0"},{"emoji":"➿","category":7,"name":"double curly loop","version":"1.0"},{"emoji":"〽️","category":7,"name":"part alternation mark","version":"1.0"},{"emoji":"✳️","category":7,"name":"eight-spoked asterisk","version":"1.0"},{"emoji":"✴️","category":7,"name":"eight-pointed star","version":"1.0"},{"emoji":"❇️","category":7,"name":"sparkle","version":"1.0"},{"emoji":"©️","category":7,"name":"copyright","version":"1.0"},{"emoji":"®️","category":7,"name":"registered","version":"1.0"},{"emoji":"™️","category":7,"name":"trade mark","version":"1.0"},{"emoji":"#️⃣","category":7,"name":"keycap: #","version":"1.0"},{"emoji":"*️⃣","category":7,"name":"keycap: *","version":"2.0"},{"emoji":"0️⃣","category":7,"name":"keycap: 0","version":"1.0"},{"emoji":"1️⃣","category":7,"name":"keycap: 1","version":"1.0"},{"emoji":"2️⃣","category":7,"name":"keycap: 2","version":"1.0"},{"emoji":"3️⃣","category":7,"name":"keycap: 3","version":"1.0"},{"emoji":"4️⃣","category":7,"name":"keycap: 4","version":"1.0"},{"emoji":"5️⃣","category":7,"name":"keycap: 5","version":"1.0"},{"emoji":"6️⃣","category":7,"name":"keycap: 6","version":"1.0"},{"emoji":"7️⃣","category":7,"name":"keycap: 7","version":"1.0"},{"emoji":"8️⃣","category":7,"name":"keycap: 8","version":"1.0"},{"emoji":"9️⃣","category":7,"name":"keycap: 9","version":"1.0"},{"emoji":"🔟","category":7,"name":"keycap: 10","version":"1.0"},{"emoji":"🔠","category":7,"name":"input latin uppercase","version":"1.0"},{"emoji":"🔡","category":7,"name":"input latin lowercase","version":"1.0"},{"emoji":"🔢","category":7,"name":"input numbers","version":"1.0"},{"emoji":"🔣","category":7,"name":"input symbols","version":"1.0"},{"emoji":"🔤","category":7,"name":"input latin letters","version":"1.0"},{"emoji":"🅰️","category":7,"name":"A button (blood type)","version":"1.0"},{"emoji":"🆎","category":7,"name":"AB button (blood type)","version":"1.0"},{"emoji":"🅱️","category":7,"name":"B button (blood type)","version":"1.0"},{"emoji":"🆑","category":7,"name":"CL button","version":"1.0"},{"emoji":"🆒","category":7,"name":"COOL button","version":"1.0"},{"emoji":"🆓","category":7,"name":"FREE button","version":"1.0"},{"emoji":"ℹ️","category":7,"name":"information","version":"1.0"},{"emoji":"🆔","category":7,"name":"ID button","version":"1.0"},{"emoji":"Ⓜ️","category":7,"name":"circled M","version":"1.0"},{"emoji":"🆕","category":7,"name":"NEW button","version":"1.0"},{"emoji":"🆖","category":7,"name":"NG button","version":"1.0"},{"emoji":"🅾️","category":7,"name":"O button (blood type)","version":"1.0"},{"emoji":"🆗","category":7,"name":"OK button","version":"1.0"},{"emoji":"🅿️","category":7,"name":"P button","version":"1.0"},{"emoji":"🆘","category":7,"name":"SOS button","version":"1.0"},{"emoji":"🆙","category":7,"name":"UP! button","version":"1.0"},{"emoji":"🆚","category":7,"name":"VS button","version":"1.0"},{"emoji":"🈁","category":7,"name":"Japanese “here” button","version":"1.0"},{"emoji":"🈂️","category":7,"name":"Japanese “service charge” button","version":"1.0"},{"emoji":"🈷️","category":7,"name":"Japanese “monthly amount” button","version":"1.0"},{"emoji":"🈶","category":7,"name":"Japanese “not free of charge” button","version":"1.0"},{"emoji":"🈯","category":7,"name":"Japanese “reserved” button","version":"1.0"},{"emoji":"🉐","category":7,"name":"Japanese “bargain” button","version":"1.0"},{"emoji":"🈹","category":7,"name":"Japanese “discount” button","version":"1.0"},{"emoji":"🈚","category":7,"name":"Japanese “free of charge” button","version":"1.0"},{"emoji":"🈲","category":7,"name":"Japanese “prohibited” button","version":"1.0"},{"emoji":"🉑","category":7,"name":"Japanese “acceptable” button","version":"1.0"},{"emoji":"🈸","category":7,"name":"Japanese “application” button","version":"1.0"},{"emoji":"🈴","category":7,"name":"Japanese “passing grade” button","version":"1.0"},{"emoji":"🈳","category":7,"name":"Japanese “vacancy” button","version":"1.0"},{"emoji":"㊗️","category":7,"name":"Japanese “congratulations” button","version":"1.0"},{"emoji":"㊙️","category":7,"name":"Japanese “secret” button","version":"1.0"},{"emoji":"🈺","category":7,"name":"Japanese “open for business” button","version":"1.0"},{"emoji":"🈵","category":7,"name":"Japanese “no vacancy” button","version":"1.0"},{"emoji":"🔴","category":7,"name":"red circle","version":"1.0"},{"emoji":"🟠","category":7,"name":"orange circle","version":"12.0"},{"emoji":"🟡","category":7,"name":"yellow circle","version":"12.0"},{"emoji":"🟢","category":7,"name":"green circle","version":"12.0"},{"emoji":"🔵","category":7,"name":"blue circle","version":"1.0"},{"emoji":"🟣","category":7,"name":"purple circle","version":"12.0"},{"emoji":"🟤","category":7,"name":"brown circle","version":"12.0"},{"emoji":"⚫","category":7,"name":"black circle","version":"1.0"},{"emoji":"⚪","category":7,"name":"white circle","version":"1.0"},{"emoji":"🟥","category":7,"name":"red square","version":"12.0"},{"emoji":"🟧","category":7,"name":"orange square","version":"12.0"},{"emoji":"🟨","category":7,"name":"yellow square","version":"12.0"},{"emoji":"🟩","category":7,"name":"green square","version":"12.0"},{"emoji":"🟦","category":7,"name":"blue square","version":"12.0"},{"emoji":"🟪","category":7,"name":"purple square","version":"12.0"},{"emoji":"🟫","category":7,"name":"brown square","version":"12.0"},{"emoji":"⬛","category":7,"name":"black large square","version":"1.0"},{"emoji":"⬜","category":7,"name":"white large square","version":"1.0"},{"emoji":"◼️","category":7,"name":"black medium square","version":"1.0"},{"emoji":"◻️","category":7,"name":"white medium square","version":"1.0"},{"emoji":"◾","category":7,"name":"black medium-small square","version":"1.0"},{"emoji":"◽","category":7,"name":"white medium-small square","version":"1.0"},{"emoji":"▪️","category":7,"name":"black small square","version":"1.0"},{"emoji":"▫️","category":7,"name":"white small square","version":"1.0"},{"emoji":"🔶","category":7,"name":"large orange diamond","version":"1.0"},{"emoji":"🔷","category":7,"name":"large blue diamond","version":"1.0"},{"emoji":"🔸","category":7,"name":"small orange diamond","version":"1.0"},{"emoji":"🔹","category":7,"name":"small blue diamond","version":"1.0"},{"emoji":"🔺","category":7,"name":"red triangle pointed up","version":"1.0"},{"emoji":"🔻","category":7,"name":"red triangle pointed down","version":"1.0"},{"emoji":"💠","category":7,"name":"diamond with a dot","version":"1.0"},{"emoji":"🔘","category":7,"name":"radio button","version":"1.0"},{"emoji":"🔳","category":7,"name":"white square button","version":"1.0"},{"emoji":"🔲","category":7,"name":"black square button","version":"1.0"},{"emoji":"🏁","category":8,"name":"chequered flag","version":"1.0"},{"emoji":"🚩","category":8,"name":"triangular flag","version":"1.0"},{"emoji":"🎌","category":8,"name":"crossed flags","version":"1.0"},{"emoji":"🏴","category":8,"name":"black flag","version":"1.0"},{"emoji":"🏳️","category":8,"name":"white flag","version":"1.0"},{"emoji":"🏳️‍🌈","category":8,"name":"rainbow flag","version":"4.0"},{"emoji":"🏳️‍⚧️","category":8,"name":"transgender flag","version":"13.0"},{"emoji":"🏴‍☠️","category":8,"name":"pirate flag","version":"11.0"},{"emoji":"🇦🇨","category":8,"name":"flag: Ascension Island","version":"2.0"},{"emoji":"🇦🇩","category":8,"name":"flag: Andorra","version":"2.0"},{"emoji":"🇦🇪","category":8,"name":"flag: United Arab Emirates","version":"2.0"},{"emoji":"🇦🇫","category":8,"name":"flag: Afghanistan","version":"2.0"},{"emoji":"🇦🇬","category":8,"name":"flag: Antigua & Barbuda","version":"2.0"},{"emoji":"🇦🇮","category":8,"name":"flag: Anguilla","version":"2.0"},{"emoji":"🇦🇱","category":8,"name":"flag: Albania","version":"2.0"},{"emoji":"🇦🇲","category":8,"name":"flag: Armenia","version":"2.0"},{"emoji":"🇦🇴","category":8,"name":"flag: Angola","version":"2.0"},{"emoji":"🇦🇶","category":8,"name":"flag: Antarctica","version":"2.0"},{"emoji":"🇦🇷","category":8,"name":"flag: Argentina","version":"2.0"},{"emoji":"🇦🇸","category":8,"name":"flag: American Samoa","version":"2.0"},{"emoji":"🇦🇹","category":8,"name":"flag: Austria","version":"2.0"},{"emoji":"🇦🇺","category":8,"name":"flag: Australia","version":"2.0"},{"emoji":"🇦🇼","category":8,"name":"flag: Aruba","version":"2.0"},{"emoji":"🇦🇽","category":8,"name":"flag: Åland Islands","version":"2.0"},{"emoji":"🇦🇿","category":8,"name":"flag: Azerbaijan","version":"2.0"},{"emoji":"🇧🇦","category":8,"name":"flag: Bosnia & Herzegovina","version":"2.0"},{"emoji":"🇧🇧","category":8,"name":"flag: Barbados","version":"2.0"},{"emoji":"🇧🇩","category":8,"name":"flag: Bangladesh","version":"2.0"},{"emoji":"🇧🇪","category":8,"name":"flag: Belgium","version":"2.0"},{"emoji":"🇧🇫","category":8,"name":"flag: Burkina Faso","version":"2.0"},{"emoji":"🇧🇬","category":8,"name":"flag: Bulgaria","version":"2.0"},{"emoji":"🇧🇭","category":8,"name":"flag: Bahrain","version":"2.0"},{"emoji":"🇧🇮","category":8,"name":"flag: Burundi","version":"2.0"},{"emoji":"🇧🇯","category":8,"name":"flag: Benin","version":"2.0"},{"emoji":"🇧🇱","category":8,"name":"flag: St. Barthélemy","version":"2.0"},{"emoji":"🇧🇲","category":8,"name":"flag: Bermuda","version":"2.0"},{"emoji":"🇧🇳","category":8,"name":"flag: Brunei","version":"2.0"},{"emoji":"🇧🇴","category":8,"name":"flag: Bolivia","version":"2.0"},{"emoji":"🇧🇶","category":8,"name":"flag: Caribbean Netherlands","version":"2.0"},{"emoji":"🇧🇷","category":8,"name":"flag: Brazil","version":"2.0"},{"emoji":"🇧🇸","category":8,"name":"flag: Bahamas","version":"2.0"},{"emoji":"🇧🇹","category":8,"name":"flag: Bhutan","version":"2.0"},{"emoji":"🇧🇻","category":8,"name":"flag: Bouvet Island","version":"2.0"},{"emoji":"🇧🇼","category":8,"name":"flag: Botswana","version":"2.0"},{"emoji":"🇧🇾","category":8,"name":"flag: Belarus","version":"2.0"},{"emoji":"🇧🇿","category":8,"name":"flag: Belize","version":"2.0"},{"emoji":"🇨🇦","category":8,"name":"flag: Canada","version":"2.0"},{"emoji":"🇨🇨","category":8,"name":"flag: Cocos (Keeling) Islands","version":"2.0"},{"emoji":"🇨🇩","category":8,"name":"flag: Congo - Kinshasa","version":"2.0"},{"emoji":"🇨🇫","category":8,"name":"flag: Central African Republic","version":"2.0"},{"emoji":"🇨🇬","category":8,"name":"flag: Congo - Brazzaville","version":"2.0"},{"emoji":"🇨🇭","category":8,"name":"flag: Switzerland","version":"2.0"},{"emoji":"🇨🇮","category":8,"name":"flag: Côte d’Ivoire","version":"2.0"},{"emoji":"🇨🇰","category":8,"name":"flag: Cook Islands","version":"2.0"},{"emoji":"🇨🇱","category":8,"name":"flag: Chile","version":"2.0"},{"emoji":"🇨🇲","category":8,"name":"flag: Cameroon","version":"2.0"},{"emoji":"🇨🇳","category":8,"name":"flag: China","version":"1.0"},{"emoji":"🇨🇴","category":8,"name":"flag: Colombia","version":"2.0"},{"emoji":"🇨🇵","category":8,"name":"flag: Clipperton Island","version":"2.0"},{"emoji":"🇨🇷","category":8,"name":"flag: Costa Rica","version":"2.0"},{"emoji":"🇨🇺","category":8,"name":"flag: Cuba","version":"2.0"},{"emoji":"🇨🇻","category":8,"name":"flag: Cape Verde","version":"2.0"},{"emoji":"🇨🇼","category":8,"name":"flag: Curaçao","version":"2.0"},{"emoji":"🇨🇽","category":8,"name":"flag: Christmas Island","version":"2.0"},{"emoji":"🇨🇾","category":8,"name":"flag: Cyprus","version":"2.0"},{"emoji":"🇨🇿","category":8,"name":"flag: Czechia","version":"2.0"},{"emoji":"🇩🇪","category":8,"name":"flag: Germany","version":"1.0"},{"emoji":"🇩🇬","category":8,"name":"flag: Diego Garcia","version":"2.0"},{"emoji":"🇩🇯","category":8,"name":"flag: Djibouti","version":"2.0"},{"emoji":"🇩🇰","category":8,"name":"flag: Denmark","version":"2.0"},{"emoji":"🇩🇲","category":8,"name":"flag: Dominica","version":"2.0"},{"emoji":"🇩🇴","category":8,"name":"flag: Dominican Republic","version":"2.0"},{"emoji":"🇩🇿","category":8,"name":"flag: Algeria","version":"2.0"},{"emoji":"🇪🇦","category":8,"name":"flag: Ceuta & Melilla","version":"2.0"},{"emoji":"🇪🇨","category":8,"name":"flag: Ecuador","version":"2.0"},{"emoji":"🇪🇪","category":8,"name":"flag: Estonia","version":"2.0"},{"emoji":"🇪🇬","category":8,"name":"flag: Egypt","version":"2.0"},{"emoji":"🇪🇭","category":8,"name":"flag: Western Sahara","version":"2.0"},{"emoji":"🇪🇷","category":8,"name":"flag: Eritrea","version":"2.0"},{"emoji":"🇪🇸","category":8,"name":"flag: Spain","version":"1.0"},{"emoji":"🇪🇹","category":8,"name":"flag: Ethiopia","version":"2.0"},{"emoji":"🇪🇺","category":8,"name":"flag: European Union","version":"2.0"},{"emoji":"🇫🇮","category":8,"name":"flag: Finland","version":"2.0"},{"emoji":"🇫🇯","category":8,"name":"flag: Fiji","version":"2.0"},{"emoji":"🇫🇰","category":8,"name":"flag: Falkland Islands","version":"2.0"},{"emoji":"🇫🇲","category":8,"name":"flag: Micronesia","version":"2.0"},{"emoji":"🇫🇴","category":8,"name":"flag: Faroe Islands","version":"2.0"},{"emoji":"🇫🇷","category":8,"name":"flag: France","version":"1.0"},{"emoji":"🇬🇦","category":8,"name":"flag: Gabon","version":"2.0"},{"emoji":"🇬🇧","category":8,"name":"flag: United Kingdom","version":"1.0"},{"emoji":"🇬🇩","category":8,"name":"flag: Grenada","version":"2.0"},{"emoji":"🇬🇪","category":8,"name":"flag: Georgia","version":"2.0"},{"emoji":"🇬🇫","category":8,"name":"flag: French Guiana","version":"2.0"},{"emoji":"🇬🇬","category":8,"name":"flag: Guernsey","version":"2.0"},{"emoji":"🇬🇭","category":8,"name":"flag: Ghana","version":"2.0"},{"emoji":"🇬🇮","category":8,"name":"flag: Gibraltar","version":"2.0"},{"emoji":"🇬🇱","category":8,"name":"flag: Greenland","version":"2.0"},{"emoji":"🇬🇲","category":8,"name":"flag: Gambia","version":"2.0"},{"emoji":"🇬🇳","category":8,"name":"flag: Guinea","version":"2.0"},{"emoji":"🇬🇵","category":8,"name":"flag: Guadeloupe","version":"2.0"},{"emoji":"🇬🇶","category":8,"name":"flag: Equatorial Guinea","version":"2.0"},{"emoji":"🇬🇷","category":8,"name":"flag: Greece","version":"2.0"},{"emoji":"🇬🇸","category":8,"name":"flag: South Georgia & South Sandwich Islands","version":"2.0"},{"emoji":"🇬🇹","category":8,"name":"flag: Guatemala","version":"2.0"},{"emoji":"🇬🇺","category":8,"name":"flag: Guam","version":"2.0"},{"emoji":"🇬🇼","category":8,"name":"flag: Guinea-Bissau","version":"2.0"},{"emoji":"🇬🇾","category":8,"name":"flag: Guyana","version":"2.0"},{"emoji":"🇭🇰","category":8,"name":"flag: Hong Kong SAR China","version":"2.0"},{"emoji":"🇭🇲","category":8,"name":"flag: Heard & McDonald Islands","version":"2.0"},{"emoji":"🇭🇳","category":8,"name":"flag: Honduras","version":"2.0"},{"emoji":"🇭🇷","category":8,"name":"flag: Croatia","version":"2.0"},{"emoji":"🇭🇹","category":8,"name":"flag: Haiti","version":"2.0"},{"emoji":"🇭🇺","category":8,"name":"flag: Hungary","version":"2.0"},{"emoji":"🇮🇨","category":8,"name":"flag: Canary Islands","version":"2.0"},{"emoji":"🇮🇩","category":8,"name":"flag: Indonesia","version":"2.0"},{"emoji":"🇮🇪","category":8,"name":"flag: Ireland","version":"2.0"},{"emoji":"🇮🇱","category":8,"name":"flag: Israel","version":"2.0"},{"emoji":"🇮🇲","category":8,"name":"flag: Isle of Man","version":"2.0"},{"emoji":"🇮🇳","category":8,"name":"flag: India","version":"2.0"},{"emoji":"🇮🇴","category":8,"name":"flag: British Indian Ocean Territory","version":"2.0"},{"emoji":"🇮🇶","category":8,"name":"flag: Iraq","version":"2.0"},{"emoji":"🇮🇷","category":8,"name":"flag: Iran","version":"2.0"},{"emoji":"🇮🇸","category":8,"name":"flag: Iceland","version":"2.0"},{"emoji":"🇮🇹","category":8,"name":"flag: Italy","version":"1.0"},{"emoji":"🇯🇪","category":8,"name":"flag: Jersey","version":"2.0"},{"emoji":"🇯🇲","category":8,"name":"flag: Jamaica","version":"2.0"},{"emoji":"🇯🇴","category":8,"name":"flag: Jordan","version":"2.0"},{"emoji":"🇯🇵","category":8,"name":"flag: Japan","version":"1.0"},{"emoji":"🇰🇪","category":8,"name":"flag: Kenya","version":"2.0"},{"emoji":"🇰🇬","category":8,"name":"flag: Kyrgyzstan","version":"2.0"},{"emoji":"🇰🇭","category":8,"name":"flag: Cambodia","version":"2.0"},{"emoji":"🇰🇮","category":8,"name":"flag: Kiribati","version":"2.0"},{"emoji":"🇰🇲","category":8,"name":"flag: Comoros","version":"2.0"},{"emoji":"🇰🇳","category":8,"name":"flag: St. Kitts & Nevis","version":"2.0"},{"emoji":"🇰🇵","category":8,"name":"flag: North Korea","version":"2.0"},{"emoji":"🇰🇷","category":8,"name":"flag: South Korea","version":"1.0"},{"emoji":"🇰🇼","category":8,"name":"flag: Kuwait","version":"2.0"},{"emoji":"🇰🇾","category":8,"name":"flag: Cayman Islands","version":"2.0"},{"emoji":"🇰🇿","category":8,"name":"flag: Kazakhstan","version":"2.0"},{"emoji":"🇱🇦","category":8,"name":"flag: Laos","version":"2.0"},{"emoji":"🇱🇧","category":8,"name":"flag: Lebanon","version":"2.0"},{"emoji":"🇱🇨","category":8,"name":"flag: St. Lucia","version":"2.0"},{"emoji":"🇱🇮","category":8,"name":"flag: Liechtenstein","version":"2.0"},{"emoji":"🇱🇰","category":8,"name":"flag: Sri Lanka","version":"2.0"},{"emoji":"🇱🇷","category":8,"name":"flag: Liberia","version":"2.0"},{"emoji":"🇱🇸","category":8,"name":"flag: Lesotho","version":"2.0"},{"emoji":"🇱🇹","category":8,"name":"flag: Lithuania","version":"2.0"},{"emoji":"🇱🇺","category":8,"name":"flag: Luxembourg","version":"2.0"},{"emoji":"🇱🇻","category":8,"name":"flag: Latvia","version":"2.0"},{"emoji":"🇱🇾","category":8,"name":"flag: Libya","version":"2.0"},{"emoji":"🇲🇦","category":8,"name":"flag: Morocco","version":"2.0"},{"emoji":"🇲🇨","category":8,"name":"flag: Monaco","version":"2.0"},{"emoji":"🇲🇩","category":8,"name":"flag: Moldova","version":"2.0"},{"emoji":"🇲🇪","category":8,"name":"flag: Montenegro","version":"2.0"},{"emoji":"🇲🇫","category":8,"name":"flag: St. Martin","version":"2.0"},{"emoji":"🇲🇬","category":8,"name":"flag: Madagascar","version":"2.0"},{"emoji":"🇲🇭","category":8,"name":"flag: Marshall Islands","version":"2.0"},{"emoji":"🇲🇰","category":8,"name":"flag: North Macedonia","version":"2.0"},{"emoji":"🇲🇱","category":8,"name":"flag: Mali","version":"2.0"},{"emoji":"🇲🇲","category":8,"name":"flag: Myanmar (Burma)","version":"2.0"},{"emoji":"🇲🇳","category":8,"name":"flag: Mongolia","version":"2.0"},{"emoji":"🇲🇴","category":8,"name":"flag: Macao SAR China","version":"2.0"},{"emoji":"🇲🇵","category":8,"name":"flag: Northern Mariana Islands","version":"2.0"},{"emoji":"🇲🇶","category":8,"name":"flag: Martinique","version":"2.0"},{"emoji":"🇲🇷","category":8,"name":"flag: Mauritania","version":"2.0"},{"emoji":"🇲🇸","category":8,"name":"flag: Montserrat","version":"2.0"},{"emoji":"🇲🇹","category":8,"name":"flag: Malta","version":"2.0"},{"emoji":"🇲🇺","category":8,"name":"flag: Mauritius","version":"2.0"},{"emoji":"🇲🇻","category":8,"name":"flag: Maldives","version":"2.0"},{"emoji":"🇲🇼","category":8,"name":"flag: Malawi","version":"2.0"},{"emoji":"🇲🇽","category":8,"name":"flag: Mexico","version":"2.0"},{"emoji":"🇲🇾","category":8,"name":"flag: Malaysia","version":"2.0"},{"emoji":"🇲🇿","category":8,"name":"flag: Mozambique","version":"2.0"},{"emoji":"🇳🇦","category":8,"name":"flag: Namibia","version":"2.0"},{"emoji":"🇳🇨","category":8,"name":"flag: New Caledonia","version":"2.0"},{"emoji":"🇳🇪","category":8,"name":"flag: Niger","version":"2.0"},{"emoji":"🇳🇫","category":8,"name":"flag: Norfolk Island","version":"2.0"},{"emoji":"🇳🇬","category":8,"name":"flag: Nigeria","version":"2.0"},{"emoji":"🇳🇮","category":8,"name":"flag: Nicaragua","version":"2.0"},{"emoji":"🇳🇱","category":8,"name":"flag: Netherlands","version":"2.0"},{"emoji":"🇳🇴","category":8,"name":"flag: Norway","version":"2.0"},{"emoji":"🇳🇵","category":8,"name":"flag: Nepal","version":"2.0"},{"emoji":"🇳🇷","category":8,"name":"flag: Nauru","version":"2.0"},{"emoji":"🇳🇺","category":8,"name":"flag: Niue","version":"2.0"},{"emoji":"🇳🇿","category":8,"name":"flag: New Zealand","version":"2.0"},{"emoji":"🇴🇲","category":8,"name":"flag: Oman","version":"2.0"},{"emoji":"🇵🇦","category":8,"name":"flag: Panama","version":"2.0"},{"emoji":"🇵🇪","category":8,"name":"flag: Peru","version":"2.0"},{"emoji":"🇵🇫","category":8,"name":"flag: French Polynesia","version":"2.0"},{"emoji":"🇵🇬","category":8,"name":"flag: Papua New Guinea","version":"2.0"},{"emoji":"🇵🇭","category":8,"name":"flag: Philippines","version":"2.0"},{"emoji":"🇵🇰","category":8,"name":"flag: Pakistan","version":"2.0"},{"emoji":"🇵🇱","category":8,"name":"flag: Poland","version":"2.0"},{"emoji":"🇵🇲","category":8,"name":"flag: St. Pierre & Miquelon","version":"2.0"},{"emoji":"🇵🇳","category":8,"name":"flag: Pitcairn Islands","version":"2.0"},{"emoji":"🇵🇷","category":8,"name":"flag: Puerto Rico","version":"2.0"},{"emoji":"🇵🇸","category":8,"name":"flag: Palestinian Territories","version":"2.0"},{"emoji":"🇵🇹","category":8,"name":"flag: Portugal","version":"2.0"},{"emoji":"🇵🇼","category":8,"name":"flag: Palau","version":"2.0"},{"emoji":"🇵🇾","category":8,"name":"flag: Paraguay","version":"2.0"},{"emoji":"🇶🇦","category":8,"name":"flag: Qatar","version":"2.0"},{"emoji":"🇷🇪","category":8,"name":"flag: Réunion","version":"2.0"},{"emoji":"🇷🇴","category":8,"name":"flag: Romania","version":"2.0"},{"emoji":"🇷🇸","category":8,"name":"flag: Serbia","version":"2.0"},{"emoji":"🇷🇺","category":8,"name":"flag: Russia","version":"1.0"},{"emoji":"🇷🇼","category":8,"name":"flag: Rwanda","version":"2.0"},{"emoji":"🇸🇦","category":8,"name":"flag: Saudi Arabia","version":"2.0"},{"emoji":"🇸🇧","category":8,"name":"flag: Solomon Islands","version":"2.0"},{"emoji":"🇸🇨","category":8,"name":"flag: Seychelles","version":"2.0"},{"emoji":"🇸🇩","category":8,"name":"flag: Sudan","version":"2.0"},{"emoji":"🇸🇪","category":8,"name":"flag: Sweden","version":"2.0"},{"emoji":"🇸🇬","category":8,"name":"flag: Singapore","version":"2.0"},{"emoji":"🇸🇭","category":8,"name":"flag: St. Helena","version":"2.0"},{"emoji":"🇸🇮","category":8,"name":"flag: Slovenia","version":"2.0"},{"emoji":"🇸🇯","category":8,"name":"flag: Svalbard & Jan Mayen","version":"2.0"},{"emoji":"🇸🇰","category":8,"name":"flag: Slovakia","version":"2.0"},{"emoji":"🇸🇱","category":8,"name":"flag: Sierra Leone","version":"2.0"},{"emoji":"🇸🇲","category":8,"name":"flag: San Marino","version":"2.0"},{"emoji":"🇸🇳","category":8,"name":"flag: Senegal","version":"2.0"},{"emoji":"🇸🇴","category":8,"name":"flag: Somalia","version":"2.0"},{"emoji":"🇸🇷","category":8,"name":"flag: Suriname","version":"2.0"},{"emoji":"🇸🇸","category":8,"name":"flag: South Sudan","version":"2.0"},{"emoji":"🇸🇹","category":8,"name":"flag: São Tomé & Príncipe","version":"2.0"},{"emoji":"🇸🇻","category":8,"name":"flag: El Salvador","version":"2.0"},{"emoji":"🇸🇽","category":8,"name":"flag: Sint Maarten","version":"2.0"},{"emoji":"🇸🇾","category":8,"name":"flag: Syria","version":"2.0"},{"emoji":"🇸🇿","category":8,"name":"flag: Eswatini","version":"2.0"},{"emoji":"🇹🇦","category":8,"name":"flag: Tristan da Cunha","version":"2.0"},{"emoji":"🇹🇨","category":8,"name":"flag: Turks & Caicos Islands","version":"2.0"},{"emoji":"🇹🇩","category":8,"name":"flag: Chad","version":"2.0"},{"emoji":"🇹🇫","category":8,"name":"flag: French Southern Territories","version":"2.0"},{"emoji":"🇹🇬","category":8,"name":"flag: Togo","version":"2.0"},{"emoji":"🇹🇭","category":8,"name":"flag: Thailand","version":"2.0"},{"emoji":"🇹🇯","category":8,"name":"flag: Tajikistan","version":"2.0"},{"emoji":"🇹🇰","category":8,"name":"flag: Tokelau","version":"2.0"},{"emoji":"🇹🇱","category":8,"name":"flag: Timor-Leste","version":"2.0"},{"emoji":"🇹🇲","category":8,"name":"flag: Turkmenistan","version":"2.0"},{"emoji":"🇹🇳","category":8,"name":"flag: Tunisia","version":"2.0"},{"emoji":"🇹🇴","category":8,"name":"flag: Tonga","version":"2.0"},{"emoji":"🇹🇷","category":8,"name":"flag: Turkey","version":"2.0"},{"emoji":"🇹🇹","category":8,"name":"flag: Trinidad & Tobago","version":"2.0"},{"emoji":"🇹🇻","category":8,"name":"flag: Tuvalu","version":"2.0"},{"emoji":"🇹🇼","category":8,"name":"flag: Taiwan","version":"2.0"},{"emoji":"🇹🇿","category":8,"name":"flag: Tanzania","version":"2.0"},{"emoji":"🇺🇦","category":8,"name":"flag: Ukraine","version":"2.0"},{"emoji":"🇺🇬","category":8,"name":"flag: Uganda","version":"2.0"},{"emoji":"🇺🇲","category":8,"name":"flag: U.S. Outlying Islands","version":"2.0"},{"emoji":"🇺🇳","category":8,"name":"flag: United Nations","version":"4.0"},{"emoji":"🇺🇸","category":8,"name":"flag: United States","version":"1.0"},{"emoji":"🇺🇾","category":8,"name":"flag: Uruguay","version":"2.0"},{"emoji":"🇺🇿","category":8,"name":"flag: Uzbekistan","version":"2.0"},{"emoji":"🇻🇦","category":8,"name":"flag: Vatican City","version":"2.0"},{"emoji":"🇻🇨","category":8,"name":"flag: St. Vincent & Grenadines","version":"2.0"},{"emoji":"🇻🇪","category":8,"name":"flag: Venezuela","version":"2.0"},{"emoji":"🇻🇬","category":8,"name":"flag: British Virgin Islands","version":"2.0"},{"emoji":"🇻🇮","category":8,"name":"flag: U.S. Virgin Islands","version":"2.0"},{"emoji":"🇻🇳","category":8,"name":"flag: Vietnam","version":"2.0"},{"emoji":"🇻🇺","category":8,"name":"flag: Vanuatu","version":"2.0"},{"emoji":"🇼🇫","category":8,"name":"flag: Wallis & Futuna","version":"2.0"},{"emoji":"🇼🇸","category":8,"name":"flag: Samoa","version":"2.0"},{"emoji":"🇽🇰","category":8,"name":"flag: Kosovo","version":"2.0"},{"emoji":"🇾🇪","category":8,"name":"flag: Yemen","version":"2.0"},{"emoji":"🇾🇹","category":8,"name":"flag: Mayotte","version":"2.0"},{"emoji":"🇿🇦","category":8,"name":"flag: South Africa","version":"2.0"},{"emoji":"🇿🇲","category":8,"name":"flag: Zambia","version":"2.0"},{"emoji":"🇿🇼","category":8,"name":"flag: Zimbabwe","version":"2.0"},{"emoji":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","category":8,"name":"flag: England","version":"5.0"},{"emoji":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","category":8,"name":"flag: Scotland","version":"5.0"},{"emoji":"🏴󠁧󠁢󠁷󠁬󠁳󠁿","category":8,"name":"flag: Wales","version":"5.0"}]};

	    var EMOJI = 'emoji';
	    var SHOW_SEARCH_RESULTS = 'showSearchResults';
	    var HIDE_SEARCH_RESULTS = 'hideSearchResults';
	    var SHOW_PREVIEW = 'showPreview';
	    var HIDE_PREVIEW = 'hidePreview';
	    var HIDE_VARIANT_POPUP = 'hideVariantPopup';
	    var CATEGORY_CLICKED = 'categoryClicked';
	    

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
	    

	    var CLASS_PREVIEW = 'emoji-picker__preview';
	    var CLASS_PREVIEW_EMOJI = 'emoji-picker__preview-emoji';
	    var CLASS_PREVIEW_NAME = 'emoji-picker__preview-name';
	    var EmojiPreview = /** @class */ (function () {
	        function EmojiPreview(events, options) {
	            this.events = events;
	            this.options = options;
	        }
	        EmojiPreview.prototype.render = function () {
	            var _this = this;
	            var preview = createElement('div', CLASS_PREVIEW);
	            this.emoji = createElement('div', CLASS_PREVIEW_EMOJI);
	            preview.appendChild(this.emoji);
	            this.name = createElement('div', CLASS_PREVIEW_NAME);
	            preview.appendChild(this.name);
	            this.events.on(SHOW_PREVIEW, function (emoji) {
	                return _this.showPreview(emoji);
	            });
	            this.events.on(HIDE_PREVIEW, function () { return _this.hidePreview(); });
	            return preview;
	        };
	        EmojiPreview.prototype.showPreview = function (emoji) {
	            this.emoji.innerHTML =
	                this.options.style === 'native'
	                    ? emoji.emoji
	                    : twemoji_npm.parse(emoji.emoji);
	            this.name.innerHTML = emoji.name;
	        };
	        EmojiPreview.prototype.hidePreview = function () {
	            this.emoji.innerHTML = '';
	            this.name.innerHTML = '';
	        };
	        return EmojiPreview;
	    }());
	    

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
	          _defineProperty(target, key, source[key]);
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

	    function makeIconMasking (_ref) {
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

	    function makeIconStandard (_ref) {
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

	    function asIcon (_ref) {
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

	    function asSymbol (_ref) {
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

	    function css$1 () {
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
	        _classCallCheck(this, Library);

	        this.definitions = {};
	      }

	      _createClass(Library, [{
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
	    var faUser = {
	      prefix: 'fas',
	      iconName: 'user',
	      icon: [448, 512, [], "f007", "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"]
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

	    library.add(faBuilding, faCat, faCoffee, faFlag, faFrown, faFutbol, faHistory, faLightbulb, faMusic, faSearch, faSmile, faTimes, faUser);
	    var building = icon({ prefix: 'far', iconName: 'building' }).html[0];
	    var cat = icon({ prefix: 'fas', iconName: 'cat' }).html[0];
	    var coffee = icon({ prefix: 'fas', iconName: 'coffee' }).html[0];
	    var flag = icon({ prefix: 'far', iconName: 'flag' }).html[0];
	    var futbol = icon({ prefix: 'fas', iconName: 'futbol' }).html[0];
	    var frown = icon({ prefix: 'far', iconName: 'frown' }).html[0];
	    var history = icon({ prefix: 'fas', iconName: 'history' }).html[0];
	    var lightbulb = icon({ prefix: 'far', iconName: 'lightbulb' }).html[0];
	    var music = icon({ prefix: 'fas', iconName: 'music' }).html[0];
	    var search = icon({ prefix: 'fas', iconName: 'search' }).html[0];
	    var smile = icon({ prefix: 'far', iconName: 'smile' }).html[0];
	    var times = icon({ prefix: 'fas', iconName: 'times' }).html[0];
	    var user = icon({ prefix: 'fas', iconName: 'user' }).html[0];
	    

	    var LOCAL_STORAGE_KEY = 'emojiPicker.recent';
	    function load() {
	        var recentJson = localStorage.getItem(LOCAL_STORAGE_KEY);
	        var recents = recentJson ? JSON.parse(recentJson) : [];
	        return recents.filter(function (recent) { return !!recent.emoji; });
	    }
	    function save(emoji, options) {
	        var recents = load();
	        var recent = {
	            emoji: emoji.emoji,
	            name: emoji.name,
	            key: emoji.key || emoji.name
	        };
	        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(__spreadArrays([
	            recent
	        ], recents.filter(function (r) { return !!r.emoji && r.key !== recent.key; })).slice(0, options.recentsCount)));
	    }
	    

	    var CLASS_EMOJI = 'emoji-picker__emoji';
	    var Emoji = /** @class */ (function () {
	        function Emoji(emoji, showVariants, showPreview, events, options) {
	            this.emoji = emoji;
	            this.showVariants = showVariants;
	            this.showPreview = showPreview;
	            this.events = events;
	            this.options = options;
	        }
	        Emoji.prototype.render = function () {
	            var _this = this;
	            this.emojiButton = createElement('button', CLASS_EMOJI);
	            this.emojiButton.innerHTML =
	                this.options.style === 'native'
	                    ? this.emoji.emoji
	                    : twemoji_npm.parse(this.emoji.emoji);
	            this.emojiButton.tabIndex = -1;
	            this.emojiButton.title = this.emoji.name;
	            this.emojiButton.addEventListener('focus', function () { return _this.onEmojiHover(); });
	            this.emojiButton.addEventListener('blur', function () { return _this.onEmojiLeave(); });
	            this.emojiButton.addEventListener('click', function () { return _this.onEmojiClick(); });
	            this.emojiButton.addEventListener('mouseover', function () { return _this.onEmojiHover(); });
	            this.emojiButton.addEventListener('mouseout', function () { return _this.onEmojiLeave(); });
	            return this.emojiButton;
	        };
	        Emoji.prototype.onEmojiClick = function () {
	            // TODO move this side effect out of Emoji, make the recent module listen for event
	            if ((!this.emoji.variations ||
	                !this.showVariants ||
	                !this.options.showVariants) &&
	                this.options.showRecents) {
	                save(this.emoji, this.options);
	            }
	            this.events.emit(EMOJI, {
	                emoji: this.emoji,
	                showVariants: this.showVariants,
	                button: this.emojiButton
	            });
	        };
	        Emoji.prototype.onEmojiHover = function () {
	            if (this.showPreview) {
	                this.events.emit(SHOW_PREVIEW, this.emoji);
	            }
	        };
	        Emoji.prototype.onEmojiLeave = function () {
	            if (this.showPreview) {
	                this.events.emit(HIDE_PREVIEW);
	            }
	        };
	        return Emoji;
	    }());
	    

	    var CLASS_EMOJI_CONTAINER = 'emoji-picker__container';
	    var EmojiContainer = /** @class */ (function () {
	        function EmojiContainer(emojis, showVariants, events, options) {
	            this.showVariants = showVariants;
	            this.events = events;
	            this.options = options;
	            this.emojis = emojis.filter(function (e) {
	                return !e.version ||
	                    parseFloat(e.version) <=
	                        parseFloat(options.emojiVersion);
	            });
	        }
	        EmojiContainer.prototype.render = function () {
	            var _this = this;
	            var emojiContainer = createElement('div', CLASS_EMOJI_CONTAINER);
	            this.emojis.forEach(function (emoji) {
	                return emojiContainer.appendChild(new Emoji(emoji, _this.showVariants, true, _this.events, _this.options).render());
	            });
	            return emojiContainer;
	        };
	        return EmojiContainer;
	    }());
	    

	    var CLASS_SEARCH_CONTAINER = 'emoji-picker__search-container';
	    var CLASS_SEARCH_FIELD = 'emoji-picker__search';
	    var CLASS_SEARCH_ICON = 'emoji-picker__search-icon';
	    var CLASS_NOT_FOUND = 'emoji-picker__search-not-found';
	    var CLASS_NOT_FOUND_ICON = 'emoji-picker__search-not-found-icon';
	    var NotFoundMessage = /** @class */ (function () {
	        function NotFoundMessage(message) {
	            this.message = message;
	        }
	        NotFoundMessage.prototype.render = function () {
	            var container = createElement('div', CLASS_NOT_FOUND);
	            var iconContainer = createElement('div', CLASS_NOT_FOUND_ICON);
	            iconContainer.innerHTML = frown;
	            container.appendChild(iconContainer);
	            var messageContainer = createElement('h2');
	            messageContainer.innerHTML = this.message;
	            container.appendChild(messageContainer);
	            return container;
	        };
	        return NotFoundMessage;
	    }());
	    var Search = /** @class */ (function () {
	        function Search(events, i18n, options, emojiData, categories) {
	            var _this = this;
	            this.events = events;
	            this.i18n = i18n;
	            this.options = options;
	            this.focusedEmojiIndex = 0;
	            this.emojisPerRow = this.options.emojisPerRow || 8;
	            this.emojiData = emojiData.filter(function (e) {
	                return e.version &&
	                    parseFloat(e.version) <= parseFloat(options.emojiVersion) &&
	                    e.category !== undefined &&
	                    categories.indexOf(e.category) >= 0;
	            });
	            this.events.on(HIDE_VARIANT_POPUP, function () {
	                setTimeout(function () { return _this.setFocusedEmoji(_this.focusedEmojiIndex); });
	            });
	        }
	        Search.prototype.render = function () {
	            var _this = this;
	            this.searchContainer = createElement('div', CLASS_SEARCH_CONTAINER);
	            this.searchField = createElement('input', CLASS_SEARCH_FIELD);
	            this.searchField.placeholder = this.i18n.search;
	            this.searchContainer.appendChild(this.searchField);
	            this.searchIcon = createElement('span', CLASS_SEARCH_ICON);
	            this.searchIcon.innerHTML = search;
	            this.searchIcon.addEventListener('click', function (event) {
	                return _this.onClearSearch(event);
	            });
	            this.searchContainer.appendChild(this.searchIcon);
	            this.searchField.addEventListener('keydown', function (event) {
	                return _this.onKeyDown(event);
	            });
	            this.searchField.addEventListener('keyup', function () { return _this.onKeyUp(); });
	            return this.searchContainer;
	        };
	        Search.prototype.onClearSearch = function (event) {
	            var _this = this;
	            event.stopPropagation();
	            if (this.searchField.value) {
	                this.searchField.value = '';
	                this.resultsContainer = null;
	                this.searchIcon.innerHTML = search;
	                this.searchIcon.style.cursor = 'default';
	                this.events.emit(HIDE_SEARCH_RESULTS);
	                setTimeout(function () { return _this.searchField.focus(); });
	            }
	        };
	        Search.prototype.setFocusedEmoji = function (index) {
	            if (this.resultsContainer) {
	                var emojis = this.resultsContainer.querySelectorAll('.emoji-picker__emoji');
	                var currentFocusedEmoji = emojis[this.focusedEmojiIndex];
	                currentFocusedEmoji.tabIndex = -1;
	                this.focusedEmojiIndex = index;
	                var newFocusedEmoji = emojis[this.focusedEmojiIndex];
	                newFocusedEmoji.tabIndex = 0;
	                newFocusedEmoji.focus();
	            }
	        };
	        Search.prototype.handleResultsKeydown = function (event) {
	            if (this.resultsContainer) {
	                var emojis = this.resultsContainer.querySelectorAll('.emoji-picker__emoji');
	                if (event.key === 'ArrowRight') {
	                    this.setFocusedEmoji(Math.min(this.focusedEmojiIndex + 1, emojis.length - 1));
	                }
	                else if (event.key === 'ArrowLeft') {
	                    this.setFocusedEmoji(Math.max(0, this.focusedEmojiIndex - 1));
	                }
	                else if (event.key === 'ArrowDown') {
	                    event.preventDefault();
	                    if (this.focusedEmojiIndex < emojis.length - this.emojisPerRow) {
	                        this.setFocusedEmoji(this.focusedEmojiIndex + this.emojisPerRow);
	                    }
	                }
	                else if (event.key === 'ArrowUp') {
	                    event.preventDefault();
	                    if (this.focusedEmojiIndex >= this.emojisPerRow) {
	                        this.setFocusedEmoji(this.focusedEmojiIndex - this.emojisPerRow);
	                    }
	                }
	                else if (event.key === 'Escape') {
	                    this.onClearSearch(event);
	                }
	            }
	        };
	        Search.prototype.onKeyDown = function (event) {
	            if (event.key === 'Escape' && this.searchField.value) {
	                this.onClearSearch(event);
	            }
	        };
	        Search.prototype.onKeyUp = function () {
	            var _this = this;
	            if (!this.searchField.value) {
	                this.searchIcon.innerHTML = search;
	                this.searchIcon.style.cursor = 'default';
	                this.events.emit(HIDE_SEARCH_RESULTS);
	            }
	            else {
	                this.searchIcon.innerHTML = times;
	                this.searchIcon.style.cursor = 'pointer';
	                var searchResults = this.emojiData.filter(function (emoji) {
	                    return emoji.name
	                        .toLowerCase()
	                        .indexOf(_this.searchField.value.toLowerCase()) >= 0;
	                });
	                this.events.emit(HIDE_PREVIEW);
	                if (searchResults.length) {
	                    this.resultsContainer = new EmojiContainer(searchResults, true, this.events, this.options).render();
	                    if (this.resultsContainer) {
	                        this.resultsContainer.querySelector('.emoji-picker__emoji').tabIndex = 0;
	                        this.focusedEmojiIndex = 0;
	                        this.resultsContainer.addEventListener('keydown', function (event) {
	                            return _this.handleResultsKeydown(event);
	                        });
	                        this.events.emit(SHOW_SEARCH_RESULTS, this.resultsContainer);
	                    }
	                }
	                else {
	                    this.events.emit(SHOW_SEARCH_RESULTS, new NotFoundMessage(this.i18n.notFound).render());
	                }
	            }
	        };
	        return Search;
	    }());
	    

	    var CLASS_OVERLAY = 'emoji-picker__variant-overlay';
	    var CLASS_POPUP = 'emoji-picker__variant-popup';
	    var VariantPopup = /** @class */ (function () {
	        function VariantPopup(events, emoji, options) {
	            this.events = events;
	            this.emoji = emoji;
	            this.options = options;
	            this.focusedEmojiIndex = 0;
	        }
	        VariantPopup.prototype.getEmoji = function (index) {
	            return this.popup.querySelectorAll('.emoji-picker__emoji')[index];
	        };
	        VariantPopup.prototype.setFocusedEmoji = function (newIndex) {
	            var currentFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
	            currentFocusedEmoji.tabIndex = -1;
	            this.focusedEmojiIndex = newIndex;
	            var newFocusedEmoji = this.getEmoji(this.focusedEmojiIndex);
	            newFocusedEmoji.tabIndex = 0;
	            newFocusedEmoji.focus();
	        };
	        VariantPopup.prototype.render = function () {
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
	            (this.emoji.variations || []).forEach(function (variation, index) {
	                return _this.popup.appendChild(new Emoji({
	                    name: _this.emoji.name,
	                    emoji: variation,
	                    key: _this.emoji.name + index
	                }, false, false, _this.events, _this.options).render());
	            });
	            var firstEmoji = this.popup.querySelector('.emoji-picker__emoji');
	            this.focusedEmojiIndex = 0;
	            firstEmoji.tabIndex = 0;
	            setTimeout(function () { return firstEmoji.focus(); });
	            this.popup.addEventListener('keydown', function (event) {
	                if (event.key === 'ArrowRight') {
	                    _this.setFocusedEmoji(Math.min(_this.focusedEmojiIndex + 1, _this.popup.querySelectorAll('.emoji-picker__emoji').length - 1));
	                }
	                else if (event.key === 'ArrowLeft') {
	                    _this.setFocusedEmoji(Math.max(_this.focusedEmojiIndex - 1, 0));
	                }
	                else if (event.key === 'Escape') {
	                    event.stopPropagation();
	                    _this.events.emit(HIDE_VARIANT_POPUP);
	                }
	            });
	            overlay.appendChild(this.popup);
	            return overlay;
	        };
	        return VariantPopup;
	    }());
	    

	    var i18n = {
	        search: 'Search emojis...',
	        categories: {
	            recents: 'Recent Emojis',
	            smileys: 'Smileys & Emotion',
	            people: 'People & Body',
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
	    

	    var CLASS_CATEGORY_BUTTONS = 'emoji-picker__category-buttons';
	    var CLASS_CATEGORY_BUTTON = 'emoji-picker__category-button';
	    var categoryIcons = {
	        recents: history,
	        smileys: smile,
	        people: user,
	        animals: cat,
	        food: coffee,
	        activities: futbol,
	        travel: building,
	        objects: lightbulb,
	        symbols: music,
	        flags: flag
	    };
	    var CategoryButtons = /** @class */ (function () {
	        function CategoryButtons(options, events, i18n) {
	            this.options = options;
	            this.events = events;
	            this.i18n = i18n;
	            this.activeButton = 0;
	            this.buttons = [];
	        }
	        CategoryButtons.prototype.render = function () {
	            var _this = this;
	            var container = createElement('div', CLASS_CATEGORY_BUTTONS);
	            var categories = this.options.showRecents
	                ? __spreadArrays(['recents'], (this.options.categories || emojiData.categories)) : this.options.categories || emojiData.categories;
	            categories.forEach(function (category) {
	                var button = createElement('button', CLASS_CATEGORY_BUTTON);
	                button.innerHTML = categoryIcons[category];
	                button.tabIndex = -1;
	                button.title = _this.i18n.categories[category];
	                container.appendChild(button);
	                _this.buttons.push(button);
	                button.addEventListener('click', function () {
	                    _this.events.emit(CATEGORY_CLICKED, category);
	                });
	            });
	            container.addEventListener('keydown', function (event) {
	                switch (event.key) {
	                    case 'ArrowRight':
	                        _this.events.emit(CATEGORY_CLICKED, categories[(_this.activeButton + 1) % _this.buttons.length]);
	                        break;
	                    case 'ArrowLeft':
	                        _this.events.emit(CATEGORY_CLICKED, categories[_this.activeButton === 0
	                            ? _this.buttons.length - 1
	                            : _this.activeButton - 1]);
	                        break;
	                    case 'ArrowUp':
	                    case 'ArrowDown':
	                        event.stopPropagation();
	                        event.preventDefault();
	                }
	            });
	            return container;
	        };
	        CategoryButtons.prototype.setActiveButton = function (activeButton, focus) {
	            if (focus === void 0) { focus = true; }
	            var activeButtonEl = this.buttons[this.activeButton];
	            activeButtonEl.classList.remove('active');
	            activeButtonEl.tabIndex = -1;
	            this.activeButton = activeButton;
	            activeButtonEl = this.buttons[this.activeButton];
	            activeButtonEl.classList.add('active');
	            activeButtonEl.tabIndex = 0;
	            if (focus) {
	                activeButtonEl.focus();
	            }
	        };
	        return CategoryButtons;
	    }());
	    

	    var emojiCategories = {};
	    emojiData.emoji.forEach(function (emoji) {
	        var categoryList = emojiCategories[emojiData.categories[emoji.category]];
	        if (!categoryList) {
	            categoryList = emojiCategories[emojiData.categories[emoji.category]] = [];
	        }
	        categoryList.push(emoji);
	    });
	    var EmojiArea = /** @class */ (function () {
	        function EmojiArea(events, i18n$1, options) {
	            var _this = this;
	            this.events = events;
	            this.i18n = i18n$1;
	            this.options = options;
	            this.currentCategory = 0;
	            this.headers = [];
	            this.focusedIndex = 0;
	            this.handleKeyDown = function (event) {
	                _this.emojis.removeEventListener('scroll', _this.highlightCategory);
	                switch (event.key) {
	                    case 'ArrowRight':
	                        _this.focusedEmoji.tabIndex = -1;
	                        if (_this.focusedIndex === _this.currentEmojiCount - 1 &&
	                            _this.currentCategory < _this.categories.length) {
	                            if (_this.options.showCategoryButtons) {
	                                _this.categoryButtons.setActiveButton(++_this.currentCategory);
	                            }
	                            _this.setFocusedEmoji(0);
	                        }
	                        else {
	                            _this.setFocusedEmoji(_this.focusedIndex + 1);
	                        }
	                        break;
	                    case 'ArrowLeft':
	                        _this.focusedEmoji.tabIndex = -1;
	                        if (_this.focusedIndex === 0 && _this.currentCategory > 0) {
	                            if (_this.options.showCategoryButtons) {
	                                _this.categoryButtons.setActiveButton(--_this.currentCategory);
	                            }
	                            _this.setFocusedEmoji(_this.currentEmojiCount - 1);
	                        }
	                        else {
	                            _this.setFocusedEmoji(Math.max(0, _this.focusedIndex - 1));
	                        }
	                        break;
	                    case 'ArrowDown':
	                        event.preventDefault();
	                        _this.focusedEmoji.tabIndex = -1;
	                        if (_this.focusedIndex + _this.emojisPerRow >= _this.currentEmojiCount &&
	                            _this.currentCategory < _this.categories.length) {
	                            _this.currentCategory++;
	                            if (_this.options.showCategoryButtons) {
	                                _this.categoryButtons.setActiveButton(_this.currentCategory);
	                            }
	                            _this.setFocusedEmoji(_this.focusedIndex % _this.emojisPerRow);
	                        }
	                        else {
	                            _this.setFocusedEmoji(_this.focusedIndex + _this.emojisPerRow);
	                        }
	                        break;
	                    case 'ArrowUp':
	                        event.preventDefault();
	                        _this.focusedEmoji.tabIndex = -1;
	                        if (_this.focusedIndex < _this.emojisPerRow && _this.currentCategory > 0) {
	                            var previousCategoryCount = _this.getEmojiCount(_this.currentCategory - 1);
	                            var previousLastRowCount = previousCategoryCount % _this.emojisPerRow;
	                            if (previousLastRowCount === 0) {
	                                previousLastRowCount = _this.emojisPerRow;
	                            }
	                            var currentColumn = _this.focusedIndex;
	                            var newIndex = currentColumn > previousLastRowCount - 1
	                                ? previousCategoryCount - 1
	                                : previousCategoryCount - previousLastRowCount + currentColumn;
	                            _this.currentCategory--;
	                            if (_this.options.showCategoryButtons) {
	                                _this.categoryButtons.setActiveButton(_this.currentCategory);
	                            }
	                            _this.setFocusedEmoji(newIndex);
	                        }
	                        else {
	                            _this.setFocusedEmoji(_this.focusedIndex >= _this.emojisPerRow
	                                ? _this.focusedIndex - _this.emojisPerRow
	                                : _this.focusedIndex);
	                        }
	                        break;
	                }
	                requestAnimationFrame(function () {
	                    return _this.emojis.addEventListener('scroll', _this.highlightCategory);
	                });
	            };
	            this.addCategory = function (category, emojis) {
	                var name = createElement('h2', 'emoji-picker__category-name');
	                name.innerHTML =
	                    _this.i18n.categories[category] || i18n.categories[category];
	                _this.emojis.appendChild(name);
	                _this.headers.push(name);
	                _this.emojis.appendChild(new EmojiContainer(emojis, true, _this.events, _this.options).render());
	            };
	            this.selectCategory = function (category, focus) {
	                if (focus === void 0) { focus = true; }
	                _this.emojis.removeEventListener('scroll', _this.highlightCategory);
	                if (_this.focusedEmoji) {
	                    _this.focusedEmoji.tabIndex = -1;
	                }
	                var categoryIndex = _this.categories.indexOf(category);
	                _this.currentCategory = categoryIndex;
	                _this.setFocusedEmoji(0, false);
	                if (_this.options.showCategoryButtons) {
	                    _this.categoryButtons.setActiveButton(_this.currentCategory, focus);
	                }
	                var targetPosition = _this.headerOffsets[categoryIndex];
	                _this.emojis.scrollTop = targetPosition;
	                requestAnimationFrame(function () {
	                    return _this.emojis.addEventListener('scroll', _this.highlightCategory);
	                });
	            };
	            this.highlightCategory = function () {
	                if (document.activeElement &&
	                    document.activeElement.classList.contains('emoji-picker__emoji')) {
	                    return;
	                }
	                var closestHeaderIndex = _this.headerOffsets.findIndex(function (offset) { return offset > Math.round(_this.emojis.scrollTop); });
	                if (closestHeaderIndex === 0) {
	                    closestHeaderIndex = 1;
	                }
	                else if (closestHeaderIndex < 0) {
	                    closestHeaderIndex = _this.headerOffsets.length;
	                }
	                _this.currentCategory = closestHeaderIndex - 1;
	                if (_this.options.showCategoryButtons) {
	                    _this.categoryButtons.setActiveButton(_this.currentCategory);
	                }
	            };
	            this.emojisPerRow = options.emojisPerRow || 8;
	            this.categories = options.categories || emojiData.categories;
	            if (options.showRecents) {
	                this.categories = __spreadArrays(['recents'], this.categories);
	            }
	        }
	        EmojiArea.prototype.render = function () {
	            var _this = this;
	            this.container = createElement('div', 'emoji-picker__emoji-area');
	            if (this.options.showCategoryButtons) {
	                this.categoryButtons = new CategoryButtons(this.options, this.events, this.i18n);
	                this.container.appendChild(this.categoryButtons.render());
	            }
	            this.emojis = createElement('div', 'emoji-picker__emojis');
	            if (this.options.showRecents) {
	                emojiCategories.recents = load();
	            }
	            this.categories.forEach(function (category) {
	                return _this.addCategory(category, emojiCategories[category]);
	            });
	            requestAnimationFrame(function () {
	                _this.headerOffsets = Array.prototype.map.call(_this.headers, function (header) { return header.offsetTop; });
	                _this.selectCategory('smileys', false);
	                _this.currentCategory = _this.options.showRecents ? 1 : 0;
	                if (_this.options.showCategoryButtons) {
	                    _this.categoryButtons.setActiveButton(_this.currentCategory, false);
	                }
	                setTimeout(function () {
	                    setTimeout(function () {
	                        return _this.emojis.addEventListener('scroll', _this.highlightCategory);
	                    });
	                });
	            });
	            this.emojis.addEventListener('keydown', this.handleKeyDown);
	            this.events.on(CATEGORY_CLICKED, this.selectCategory);
	            this.container.appendChild(this.emojis);
	            var firstEmoji = this.container.querySelectorAll('.emoji-picker__emoji')[0];
	            firstEmoji.tabIndex = 0;
	            return this.container;
	        };
	        Object.defineProperty(EmojiArea.prototype, "currentCategoryEl", {
	            get: function () {
	                return this.emojis.querySelectorAll('.emoji-picker__container')[this.currentCategory];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(EmojiArea.prototype, "focusedEmoji", {
	            get: function () {
	                return this.currentCategoryEl.querySelectorAll('.emoji-picker__emoji')[this.focusedIndex];
	            },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(EmojiArea.prototype, "currentEmojiCount", {
	            get: function () {
	                return this.currentCategoryEl.querySelectorAll('.emoji-picker__emoji')
	                    .length;
	            },
	            enumerable: true,
	            configurable: true
	        });
	        EmojiArea.prototype.getEmojiCount = function (category) {
	            var container = this.emojis.querySelectorAll('.emoji-picker__container')[category];
	            return container.querySelectorAll('.emoji-picker__emoji').length;
	        };
	        EmojiArea.prototype.setFocusedEmoji = function (index, focus) {
	            if (focus === void 0) { focus = true; }
	            this.focusedIndex = index;
	            if (this.focusedEmoji) {
	                this.focusedEmoji.tabIndex = 0;
	                if (focus) {
	                    this.focusedEmoji.focus();
	                }
	            }
	        };
	        return EmojiArea;
	    }());
	    

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
	        showCategoryButtons: true,
	        recentsCount: 50,
	        emojiVersion: '12.1',
	        theme: 'light',
	        categories: [
	            'smileys',
	            'people',
	            'animals',
	            'food',
	            'activities',
	            'travel',
	            'objects',
	            'symbols',
	            'flags'
	        ],
	        style: 'native',
	        emojisPerRow: 8,
	        rows: 6,
	        emojiSize: '1.8em'
	    };
	    var EmojiButton = /** @class */ (function () {
	        function EmojiButton(options) {
	            if (options === void 0) { options = {}; }
	            this.events = new TinyEmitter();
	            this.publicEvents = new TinyEmitter();
	            this.pickerVisible = false;
	            this.options = __assign(__assign({}, DEFAULT_OPTIONS$1), options);
	            if (!this.options.rootElement) {
	                this.options.rootElement = document.body;
	            }
	            this.i18n = __assign(__assign({}, i18n), options.i18n);
	            this.onDocumentClick = this.onDocumentClick.bind(this);
	            this.onDocumentKeydown = this.onDocumentKeydown.bind(this);
	        }
	        EmojiButton.prototype.on = function (event, callback) {
	            this.publicEvents.on(event, callback);
	        };
	        EmojiButton.prototype.off = function (event, callback) {
	            this.publicEvents.off(event, callback);
	        };
	        EmojiButton.prototype.buildPicker = function () {
	            var _this = this;
	            this.pickerEl = createElement('div', CLASS_PICKER);
	            this.pickerEl.classList.add(this.options.theme);
	            this.options.emojisPerRow &&
	                this.pickerEl.style.setProperty('--emoji-per-row', this.options.emojisPerRow.toString());
	            this.options.rows &&
	                this.pickerEl.style.setProperty('--row-count', this.options.rows.toString());
	            this.options.emojiSize &&
	                this.pickerEl.style.setProperty('--emoji-size', this.options.emojiSize);
	            if (!this.options.showCategoryButtons) {
	                this.pickerEl.style.setProperty('--category-button-height', '0');
	            }
	            this.focusTrap = focusTrap_1(this.pickerEl, {
	                clickOutsideDeactivates: true,
	                initialFocus: this.options.autoFocusSearch
	                    ? '.emoji-picker__search'
	                    : '.emoji-picker__emoji[tabindex="0"]'
	            });
	            if (this.options.zIndex) {
	                this.pickerEl.style.zIndex = this.options.zIndex + '';
	            }
	            var pickerContent = createElement('div', CLASS_PICKER_CONTENT);
	            if (this.options.showSearch) {
	                var searchContainer = new Search(this.events, this.i18n, this.options, emojiData.emoji, (this.options.categories || []).map(function (category) {
	                    return emojiData.categories.indexOf(category);
	                })).render();
	                this.pickerEl.appendChild(searchContainer);
	            }
	            this.pickerEl.appendChild(pickerContent);
	            var emojiArea = new EmojiArea(this.events, this.i18n, this.options).render();
	            pickerContent.appendChild(emojiArea);
	            this.events.on(SHOW_SEARCH_RESULTS, function (searchResults) {
	                empty(pickerContent);
	                searchResults.classList.add('search-results');
	                pickerContent.appendChild(searchResults);
	            });
	            this.events.on(HIDE_SEARCH_RESULTS, function () {
	                if (pickerContent.firstChild !== emojiArea) {
	                    empty(pickerContent);
	                    pickerContent.appendChild(emojiArea);
	                }
	            });
	            if (this.options.showPreview) {
	                this.pickerEl.appendChild(new EmojiPreview(this.events, this.options).render());
	            }
	            var variantPopup;
	            this.events.on(EMOJI, function (_a) {
	                var emoji = _a.emoji, showVariants = _a.showVariants;
	                if (emoji.variations &&
	                    showVariants &&
	                    _this.options.showVariants) {
	                    variantPopup = new VariantPopup(_this.events, emoji, _this.options).render();
	                    if (variantPopup) {
	                        _this.pickerEl.appendChild(variantPopup);
	                    }
	                }
	                else {
	                    if (variantPopup && variantPopup.parentNode === _this.pickerEl) {
	                        _this.pickerEl.removeChild(variantPopup);
	                    }
	                    if (_this.options.style === 'twemoji') {
	                        _this.publicEvents.emit('emoji', twemoji_npm.parse(emoji.emoji));
	                    }
	                    else {
	                        _this.publicEvents.emit('emoji', emoji.emoji);
	                    }
	                    if (_this.options.autoHide) {
	                        _this.hidePicker();
	                    }
	                }
	            });
	            this.events.on(HIDE_VARIANT_POPUP, function () {
	                if (variantPopup) {
	                    variantPopup.classList.add('hiding');
	                    setTimeout(function () {
	                        variantPopup && _this.pickerEl.removeChild(variantPopup);
	                        variantPopup = null;
	                    }, 175);
	                }
	            });
	            this.wrapper = createElement('div', 'wrapper');
	            this.wrapper.appendChild(this.pickerEl);
	            if (this.options.rootElement) {
	                this.options.rootElement.appendChild(this.wrapper);
	            }
	            setTimeout(function () {
	                document.addEventListener('click', _this.onDocumentClick);
	                document.addEventListener('keydown', _this.onDocumentKeydown);
	            });
	        };
	        EmojiButton.prototype.onDocumentClick = function (event) {
	            if (!this.pickerEl.contains(event.target)) {
	                this.hidePicker();
	            }
	        };
	        EmojiButton.prototype.destroyPicker = function () {
	            if (this.options.rootElement) {
	                this.options.rootElement.removeChild(this.wrapper);
	                if (this.overlay) {
	                    document.body.removeChild(this.overlay);
	                }
	                this.popper && this.popper.destroy();
	                this.hideInProgress = false;
	            }
	        };
	        EmojiButton.prototype.hidePicker = function () {
	            this.focusTrap.deactivate();
	            this.pickerVisible = false;
	            this.events.off(EMOJI);
	            this.events.off(HIDE_VARIANT_POPUP);
	            this.hideInProgress = true;
	            this.pickerEl.classList.add('hiding');
	            this.destroyTimeout = setTimeout(this.destroyPicker.bind(this), 170);
	            document.removeEventListener('click', this.onDocumentClick);
	            document.removeEventListener('keydown', this.onDocumentKeydown);
	        };
	        EmojiButton.prototype.showPicker = function (referenceEl, options) {
	            if (options === void 0) { options = {}; }
	            if (this.hideInProgress) {
	                clearTimeout(this.destroyTimeout);
	                this.destroyPicker();
	            }
	            this.pickerVisible = true;
	            this.buildPicker();
	            if (window.matchMedia('screen and (max-width: 450px)').matches) {
	                var style = window.getComputedStyle(this.pickerEl);
	                var htmlEl = document.querySelector('html');
	                var viewportHeight = htmlEl && htmlEl.clientHeight;
	                var viewportWidth = htmlEl && htmlEl.clientWidth;
	                var height = parseInt(style.height);
	                var newTop = viewportHeight ? viewportHeight / 2 - height / 2 : 0;
	                var width = parseInt(style.width);
	                var newLeft = viewportWidth ? viewportWidth / 2 - width / 2 : 0;
	                this.wrapper.style.position = 'fixed';
	                this.wrapper.style.top = newTop + "px";
	                this.wrapper.style.left = newLeft + "px";
	                this.wrapper.style.zIndex = '5000';
	                this.overlay = document.createElement('div');
	                this.overlay.style.background = 'rgba(0, 0, 0, 0.75)';
	                this.overlay.style.zIndex = '1000';
	                this.overlay.style.position = 'fixed';
	                this.overlay.style.top = '0';
	                this.overlay.style.left = '0';
	                this.overlay.style.width = '100%';
	                this.overlay.style.height = '100%';
	                document.body.appendChild(this.overlay);
	            }
	            else {
	                this.popper = createPopper(referenceEl, this.wrapper, {
	                    placement: options.position || this.options.position
	                });
	            }
	            this.focusTrap.activate();
	        };
	        EmojiButton.prototype.togglePicker = function (referenceEl, options) {
	            if (options === void 0) { options = {}; }
	            this.pickerVisible
	                ? this.hidePicker()
	                : this.showPicker(referenceEl, options);
	        };
	        EmojiButton.prototype.onDocumentKeydown = function (event) {
	            if (event.key === 'Escape') {
	                this.hidePicker();
	            }
	            else if (event.key === 'Tab') {
	                this.pickerEl.classList.add('keyboard');
	            }
	            else if (event.key.match(/^[\w]$/)) {
	                var searchField = this.pickerEl.querySelector('.emoji-picker__search');
	                searchField && searchField.focus();
	            }
	        };
	        return EmojiButton;
	    }());

	    return EmojiButton;

	}));
	});

	hljs.initHighlightingOnLoad();



	window.addEventListener('DOMContentLoaded', function () {
	  var button = document.querySelector('#native-button');
	  var picker = new dist({
	    theme: 'auto',
	    position: 'bottom-end'
	  });

	  picker.on('emoji', function (emoji) {
	    document.querySelector('#native-contenteditable').innerHTML += emoji;
	  });

	  button.addEventListener('click', function () {
	    picker.togglePicker(button);
	  });


	  var twemojiButton = document.querySelector('#twemoji-button');
	  var twemojiPicker = new dist({
	    theme: 'auto',
	    style: 'twemoji',
	    position: 'bottom-end'
	  });

	  twemojiPicker.on('emoji', function (emoji) {
	    const textarea = document.querySelector('#emoji-contenteditable');
	    const newEl = document.createElement('span');
	    newEl.innerHTML = emoji;
	    textarea.appendChild(newEl);
	  });

	  twemojiButton.addEventListener('click', function () {
	    twemojiPicker.togglePicker(twemojiButton);
	  });
	});

	var src = {

	};

	return src;

}());
