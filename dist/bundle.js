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
  if (fromInput.value != "") {
    console.log("event triggered");
    convert(fromSelect.value, toSelect.value, fromInput.value);
  }
}

function clearOutput(event) {
  var key = event.key;
  if (key == 8 || key == 48 || fromInput.value == "") {
    toInput.value = "";
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
  var currencyNames = [];
  for (var index in currencies) {
    var currencyName = currencies[index].currencyName;
    var currencyId = currencies[index].id;

    var option = document.createElement('option');
    option.innerHTML = currencyName;
    option.value = currencyId;

    var optionClone = option.cloneNode(true);

    fromSelect.appendChild(option);
    toSelect.appendChild(optionClone);
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
    toInput.value = converted.toFixed(2);
  });
}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9zY3NzL21haW4uc2NzcyJdLCJuYW1lcyI6WyJ1cmwiLCJmcm9tU2VsZWN0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRvU2VsZWN0IiwiZnJvbUlucHV0IiwidG9JbnB1dCIsInVwZGF0ZU91dHB1dCIsImV2ZW50IiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwiY29udmVydCIsImNsZWFyT3V0cHV0Iiwia2V5IiwiYWRkRXZlbnRMaXN0ZW5lciIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImN1cnJlbmNpZXMiLCJkYXRhIiwicmVzdWx0cyIsImN1cnJlbmN5TmFtZXMiLCJpbmRleCIsImN1cnJlbmN5TmFtZSIsImN1cnJlbmN5SWQiLCJpZCIsIm9wdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJvcHRpb25DbG9uZSIsImNsb25lTm9kZSIsImFwcGVuZENoaWxkIiwiY2F0Y2giLCJlcnIiLCJmcm9tIiwidG8iLCJhbXQiLCJjb252ZXJzaW9uIiwiT2JqZWN0Iiwia2V5cyIsInZhbCIsImNvbnZlcnRlZCIsInRvRml4ZWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0csR0FBaEQ7O0FBRUEsUUFBSUMsWUFBWUwsTUFBTTdCLEtBQXRCO0FBQ0FILFlBQVFHLEtBQVIsR0FBZ0JrQyxVQUFVQyxPQUFWLENBQWtCLENBQWxCLENBQWhCO0FBQ0QsR0FURDtBQVVELEM7Ozs7Ozs7Ozs7O0FDaEVELHlDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsImNvbnN0IHVybCA9ICdodHRwczovL2ZyZWUuY3VycmVuY3ljb252ZXJ0ZXJhcGkuY29tL2FwaS92NS9jdXJyZW5jaWVzJztcblxubGV0IGZyb21TZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJvbVNlbGVjdCcpO1xubGV0IHRvU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RvU2VsZWN0Jyk7XG5cbmxldCBmcm9tSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnJvbUlucHV0Jyk7XG5sZXQgdG9JbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b0lucHV0Jyk7XG5cbmZ1bmN0aW9uIHVwZGF0ZU91dHB1dChldmVudCl7XG4gIGlmIChmcm9tSW5wdXQudmFsdWUgIT0gXCJcIil7XG4gICAgY29uc29sZS5sb2coXCJldmVudCB0cmlnZ2VyZWRcIik7XG4gICAgY29udmVydChmcm9tU2VsZWN0LnZhbHVlLCB0b1NlbGVjdC52YWx1ZSwgZnJvbUlucHV0LnZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGVhck91dHB1dChldmVudCl7XG4gIGxldCBrZXkgPSBldmVudC5rZXk7XG4gIGlmIChrZXkgPT0gOCB8fCBrZXkgPT0gNDggfHwgZnJvbUlucHV0LnZhbHVlID09IFwiXCIpe1xuICAgIHRvSW5wdXQudmFsdWU9XCJcIjtcbiAgfVxufVxuXG5mcm9tSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVPdXRwdXQpO1xuZnJvbUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgY2xlYXJPdXRwdXQpO1xuZnJvbVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB1cGRhdGVPdXRwdXQpO1xudG9TZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdXBkYXRlT3V0cHV0KTtcblxuXG5mZXRjaCh1cmwpXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oZGF0YSA9PiB7XG4gICAgbGV0IGN1cnJlbmNpZXMgPSBkYXRhLnJlc3VsdHM7XG4gICAgbGV0IGN1cnJlbmN5TmFtZXMgPSBbXTtcbiAgICBmb3IgKGxldCBpbmRleCBpbiBjdXJyZW5jaWVzKXtcbiAgICAgIGxldCBjdXJyZW5jeU5hbWUgPSBjdXJyZW5jaWVzW2luZGV4XS5jdXJyZW5jeU5hbWU7XG4gICAgICBsZXQgY3VycmVuY3lJZCA9IGN1cnJlbmNpZXNbaW5kZXhdLmlkO1xuXG4gICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHRpb24uaW5uZXJIVE1MID0gY3VycmVuY3lOYW1lO1xuICAgICAgb3B0aW9uLnZhbHVlID0gY3VycmVuY3lJZDtcblxuICAgICAgdmFyIG9wdGlvbkNsb25lID0gb3B0aW9uLmNsb25lTm9kZSh0cnVlKTtcblxuICAgICAgZnJvbVNlbGVjdC5hcHBlbmRDaGlsZChvcHRpb24pO1xuICAgICAgdG9TZWxlY3QuYXBwZW5kQ2hpbGQob3B0aW9uQ2xvbmUpO1xuICAgIH1cbiAgfSlcbiAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgXG5cbmZ1bmN0aW9uIGNvbnZlcnQoZnJvbSwgdG8sIGFtdCl7XG5cbiAgbGV0IHVybCA9IGBodHRwczovL2ZyZWUuY3VycmVuY3ljb252ZXJ0ZXJhcGkuY29tL2FwaS92NS9jb252ZXJ0P3E9JHtmcm9tfV8ke3RvfWA7XG5cbiAgZmV0Y2godXJsKVxuICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKGRhdGEgPT4ge1xuICAgIGxldCBjb252ZXJzaW9uID0gZGF0YS5yZXN1bHRzO1xuXG4gICAgbGV0IHZhbHVlID0gY29udmVyc2lvbltPYmplY3Qua2V5cyhjb252ZXJzaW9uKV0udmFsO1xuXG4gICAgbGV0IGNvbnZlcnRlZCA9IGFtdCAqIHZhbHVlO1xuICAgIHRvSW5wdXQudmFsdWUgPSBjb252ZXJ0ZWQudG9GaXhlZCgyKTtcbiAgfSk7XG59IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9