/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var url = 'https://free.currencyconverterapi.com/api/v5/currencies';

var fromSelect = document.getElementById('fromSelect');
var toSelect = document.getElementById('toSelect');

var fromInput = document.getElementById('fromInput');
var toInput = document.getElementById('toInput');

function updateOutput(event) {
  if (isNaN(fromInput.value) || fromInput.value < 0) {
    toInput.value = 'Please enter a number greater than zero';
    toInput.style.fontSize = '1rem';
  }
  if (fromInput.value !== '') {
    convert(fromSelect.value, toSelect.value, fromInput.value);
    toInput.style.fontSize = '2rem';
  }
}

function clearOutput(event) {
  var key = event.key;
  if (key === 8 || key === 48 || fromInput.value === '') {
    toInput.value = '';
  }
}

fromInput.addEventListener('keyup', updateOutput);
fromInput.addEventListener('keyup', clearOutput);
fromSelect.addEventListener('change', updateOutput);
toSelect.addEventListener('change', updateOutput);

fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  var currencies = data.results;

  currencies = Object.values(currencies);
  currencies.sort(function (a, b) {
    var textA = a.currencyName.toUpperCase();
    var textB = b.currencyName.toUpperCase();
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = currencies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      var currencyName = el.currencyName;
      var currencyId = el.id;

      var option = document.createElement('option');
      if (currencyName.length > 20) {
        currencyName = currencyName.substring(0, 19) + ' ...';
      }
      option.innerHTML = currencyName + ' (' + currencyId + ')';
      option.value = currencyId;

      var optionClone = option.cloneNode(true);

      fromSelect.appendChild(option);
      toSelect.appendChild(optionClone);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}).catch(function (err) {
  return console.log(err);
});

function convert(from, to, amt) {

  var url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + from + '_' + to;

  fetch(url).then(function (response) {
    return response.json();
  }).then(function (data) {
    var conversion = data.results;

    var value = conversion[Object.keys(conversion)].val;

    var converted = amt * value;
    converted = converted.toFixed(2);

    toInput.value = converted;
  });
}

// service worker registration
function registerServiceWorker() {
  if (!navigator.serviceWorker) return;

  navigator.ServiceWorker.register('sw.js').then(function (reg) {
    if (!navigator.serviceWorker.controller) {
      return;
    }

    if (reg.waiting) {
      console.log('service worker waiting');
      return;
    }

    if (reg.installing) {
      console.log('service worker installing');
      return;
    }

    reg.addEventListener('updatefound', function () {
      console.log('service worker updated');
    });
  });

  // Ensure refresh is only called once.
  // This works around a bug in "force update on reload".
  var refreshing;
  navigator.serviceWorker.addEventListener('controllerchange', function () {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

// registerServiceWorker();

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!****************************************************!*\
  !*** multi ./src/js/index.js ./src/scss/main.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./src/js/index.js */"./src/js/index.js");
module.exports = __webpack_require__(/*! ./src/scss/main.scss */"./src/scss/main.scss");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL21haW4uc2NzcyJdLCJuYW1lcyI6WyJ1cmwiLCJmcm9tU2VsZWN0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRvU2VsZWN0IiwiZnJvbUlucHV0IiwidG9JbnB1dCIsInVwZGF0ZU91dHB1dCIsImV2ZW50IiwiaXNOYU4iLCJ2YWx1ZSIsInN0eWxlIiwiZm9udFNpemUiLCJjb252ZXJ0IiwiY2xlYXJPdXRwdXQiLCJrZXkiLCJhZGRFdmVudExpc3RlbmVyIiwiZmV0Y2giLCJ0aGVuIiwicmVzcG9uc2UiLCJqc29uIiwiY3VycmVuY2llcyIsImRhdGEiLCJyZXN1bHRzIiwiT2JqZWN0IiwidmFsdWVzIiwic29ydCIsImEiLCJiIiwidGV4dEEiLCJjdXJyZW5jeU5hbWUiLCJ0b1VwcGVyQ2FzZSIsInRleHRCIiwiZWwiLCJjdXJyZW5jeUlkIiwiaWQiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwibGVuZ3RoIiwic3Vic3RyaW5nIiwiaW5uZXJIVE1MIiwib3B0aW9uQ2xvbmUiLCJjbG9uZU5vZGUiLCJhcHBlbmRDaGlsZCIsImNhdGNoIiwiY29uc29sZSIsImxvZyIsImVyciIsImZyb20iLCJ0byIsImFtdCIsImNvbnZlcnNpb24iLCJrZXlzIiwidmFsIiwiY29udmVydGVkIiwidG9GaXhlZCIsInJlZ2lzdGVyU2VydmljZVdvcmtlciIsIm5hdmlnYXRvciIsInNlcnZpY2VXb3JrZXIiLCJTZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJyZWciLCJjb250cm9sbGVyIiwid2FpdGluZyIsImluc3RhbGxpbmciLCJyZWZyZXNoaW5nIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0FBa0IsQ0FBbEIsQ0FBWjs7QUFFQWpELFlBQVFJLEtBQVIsR0FBZ0I0QyxTQUFoQjtBQUNELEdBWEQ7QUFZRDs7QUFFRDtBQUNBLFNBQVNFLHFCQUFULEdBQWtDO0FBQ2hDLE1BQUksQ0FBQ0MsVUFBVUMsYUFBZixFQUE4Qjs7QUFFOUJELFlBQVVFLGFBQVYsQ0FBd0JDLFFBQXhCLENBQWlDLE9BQWpDLEVBQTBDMUMsSUFBMUMsQ0FBK0MsVUFBVTJDLEdBQVYsRUFBZTtBQUM1RCxRQUFJLENBQUNKLFVBQVVDLGFBQVYsQ0FBd0JJLFVBQTdCLEVBQXlDO0FBQ3ZDO0FBQ0Q7O0FBRUQsUUFBSUQsSUFBSUUsT0FBUixFQUFpQjtBQUNmbEIsY0FBUUMsR0FBUixDQUFZLHdCQUFaO0FBQ0E7QUFDRDs7QUFFRCxRQUFJZSxJQUFJRyxVQUFSLEVBQW9CO0FBQ2xCbkIsY0FBUUMsR0FBUixDQUFZLDJCQUFaO0FBQ0E7QUFDRDs7QUFFRGUsUUFBSTdDLGdCQUFKLENBQXFCLGFBQXJCLEVBQW9DLFlBQVk7QUFDOUM2QixjQUFRQyxHQUFSLENBQVksd0JBQVo7QUFDRCxLQUZEO0FBSUQsR0FuQkQ7O0FBcUJBO0FBQ0E7QUFDQSxNQUFJbUIsVUFBSjtBQUNBUixZQUFVQyxhQUFWLENBQXdCMUMsZ0JBQXhCLENBQXlDLGtCQUF6QyxFQUE2RCxZQUFZO0FBQ3ZFLFFBQUlpRCxVQUFKLEVBQWdCO0FBQ2hCQyxXQUFPQyxRQUFQLENBQWdCQyxNQUFoQjtBQUNBSCxpQkFBYSxJQUFiO0FBQ0QsR0FKRDtBQUtEOztBQUVELDJCOzs7Ozs7Ozs7OztBQ25IQSx5QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJjb25zdCB1cmwgPSAnaHR0cHM6Ly9mcmVlLmN1cnJlbmN5Y29udmVydGVyYXBpLmNvbS9hcGkvdjUvY3VycmVuY2llcyc7XG5cbmxldCBmcm9tU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb21TZWxlY3QnKTtcbmxldCB0b1NlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b1NlbGVjdCcpO1xuXG5sZXQgZnJvbUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zyb21JbnB1dCcpO1xubGV0IHRvSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9JbnB1dCcpO1xuXG5mdW5jdGlvbiB1cGRhdGVPdXRwdXQoZXZlbnQpIHtcbiAgaWYgKGlzTmFOKGZyb21JbnB1dC52YWx1ZSkgfHwgZnJvbUlucHV0LnZhbHVlIDwgMCkge1xuICAgIHRvSW5wdXQudmFsdWUgPSAnUGxlYXNlIGVudGVyIGEgbnVtYmVyIGdyZWF0ZXIgdGhhbiB6ZXJvJztcbiAgICB0b0lucHV0LnN0eWxlLmZvbnRTaXplID0gJzFyZW0nO1xuICB9XG4gIGlmIChmcm9tSW5wdXQudmFsdWUgIT09ICcnKSB7XG4gICAgY29udmVydChmcm9tU2VsZWN0LnZhbHVlLCB0b1NlbGVjdC52YWx1ZSwgZnJvbUlucHV0LnZhbHVlKTtcbiAgICB0b0lucHV0LnN0eWxlLmZvbnRTaXplID0gJzJyZW0nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyT3V0cHV0IChldmVudCkge1xuICBsZXQga2V5ID0gZXZlbnQua2V5O1xuICBpZiAoa2V5ID09PSA4IHx8IGtleSA9PT0gNDggfHwgZnJvbUlucHV0LnZhbHVlID09PSAnJykge1xuICAgIHRvSW5wdXQudmFsdWUgPSAnJztcbiAgfVxufVxuXG5mcm9tSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVPdXRwdXQpO1xuZnJvbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY2xlYXJPdXRwdXQpO1xuZnJvbVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVPdXRwdXQpO1xudG9TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlT3V0cHV0KTtcblxuZmV0Y2godXJsKVxuICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGxldCBjdXJyZW5jaWVzID0gZGF0YS5yZXN1bHRzO1xuXG4gICAgY3VycmVuY2llcyA9IE9iamVjdC52YWx1ZXMoY3VycmVuY2llcyk7XG4gICAgY3VycmVuY2llcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICB2YXIgdGV4dEEgPSBhLmN1cnJlbmN5TmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgICAgdmFyIHRleHRCID0gYi5jdXJyZW5jeU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICAgIHJldHVybiAodGV4dEEgPCB0ZXh0QikgPyAtMSA6ICh0ZXh0QSA+IHRleHRCKSA/IDEgOiAwO1xuICAgIH0pO1xuXG4gICAgZm9yIChsZXQgZWwgb2YgY3VycmVuY2llcykge1xuICAgICAgbGV0IGN1cnJlbmN5TmFtZSA9IGVsLmN1cnJlbmN5TmFtZTtcbiAgICAgIGxldCBjdXJyZW5jeUlkID0gZWwuaWQ7XG5cbiAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIGlmIChjdXJyZW5jeU5hbWUubGVuZ3RoID4gMjApIHtcbiAgICAgICAgY3VycmVuY3lOYW1lID0gYCR7Y3VycmVuY3lOYW1lLnN1YnN0cmluZygwLCAxOSl9IC4uLmA7XG4gICAgICB9XG4gICAgICBvcHRpb24uaW5uZXJIVE1MID0gYCR7Y3VycmVuY3lOYW1lfSAoJHtjdXJyZW5jeUlkfSlgO1xuICAgICAgb3B0aW9uLnZhbHVlID0gY3VycmVuY3lJZDtcblxuICAgICAgdmFyIG9wdGlvbkNsb25lID0gb3B0aW9uLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgZnJvbVNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgdG9TZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uQ2xvbmUpO1xuICAgIH1cbiAgfSlcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgXG5mdW5jdGlvbiBjb252ZXJ0IChmcm9tLCB0bywgYW10KSB7XG5cbiAgbGV0IHVybCA9IGBodHRwczovL2ZyZWUuY3VycmVuY3ljb252ZXJ0ZXJhcGkuY29tL2FwaS92NS9jb252ZXJ0P3E9JHtmcm9tfV8ke3RvfWA7XG5cbiAgZmV0Y2godXJsKVxuICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGxldCBjb252ZXJzaW9uID0gZGF0YS5yZXN1bHRzO1xuXG4gICAgbGV0IHZhbHVlID0gY29udmVyc2lvbltPYmplY3Qua2V5cyhjb252ZXJzaW9uKV0udmFsO1xuXG4gICAgbGV0IGNvbnZlcnRlZCA9IGFtdCAqIHZhbHVlO1xuICAgIGNvbnZlcnRlZCA9IGNvbnZlcnRlZC50b0ZpeGVkKDIpO1xuXG4gICAgdG9JbnB1dC52YWx1ZSA9IGNvbnZlcnRlZDtcbiAgfSk7XG59XG5cbi8vIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvblxuZnVuY3Rpb24gcmVnaXN0ZXJTZXJ2aWNlV29ya2VyICgpIHtcbiAgaWYgKCFuYXZpZ2F0b3Iuc2VydmljZVdvcmtlcikgcmV0dXJuO1xuXG4gIG5hdmlnYXRvci5TZXJ2aWNlV29ya2VyLnJlZ2lzdGVyKCdzdy5qcycpLnRoZW4oZnVuY3Rpb24gKHJlZykge1xuICAgIGlmICghbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChyZWcud2FpdGluZykge1xuICAgICAgY29uc29sZS5sb2coJ3NlcnZpY2Ugd29ya2VyIHdhaXRpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocmVnLmluc3RhbGxpbmcpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdzZXJ2aWNlIHdvcmtlciBpbnN0YWxsaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmVnLmFkZEV2ZW50TGlzdGVuZXIoJ3VwZGF0ZWZvdW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coJ3NlcnZpY2Ugd29ya2VyIHVwZGF0ZWQnKTtcbiAgICB9KTtcblxuICB9KTtcblxuICAvLyBFbnN1cmUgcmVmcmVzaCBpcyBvbmx5IGNhbGxlZCBvbmNlLlxuICAvLyBUaGlzIHdvcmtzIGFyb3VuZCBhIGJ1ZyBpbiBcImZvcmNlIHVwZGF0ZSBvbiByZWxvYWRcIi5cbiAgdmFyIHJlZnJlc2hpbmc7XG4gIG5hdmlnYXRvci5zZXJ2aWNlV29ya2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NvbnRyb2xsZXJjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHJlZnJlc2hpbmcpIHJldHVybjtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgcmVmcmVzaGluZyA9IHRydWU7XG4gIH0pO1xufVxuXG4vLyByZWdpc3RlclNlcnZpY2VXb3JrZXIoKTtcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIl0sInNvdXJjZVJvb3QiOiIifQ==