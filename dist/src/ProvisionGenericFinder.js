'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _httpStatusCodes = require('http-status-codes');

var _httpStatusCodes2 = _interopRequireDefault(_httpStatusCodes);

var _GenericFinder2 = require('./GenericFinder');

var _GenericFinder3 = _interopRequireDefault(_GenericFinder2);

/**
 *   This class allow make get request to user resource into Opengate North API.
 */

var ProvisionGenericFinder = (function (_GenericFinder) {
  _inherits(ProvisionGenericFinder, _GenericFinder);

  /**     
   * @param {InternalOpenGateAPI} ogapi - Reference to the API object.
   * @param {string} source - Relative url where is located the resource.
   * @param {string} reponseJsonData - Relative url where is located the resource.
   * @param {string} error_not_found - String error which will be thrown on not_found error.
   */

  function ProvisionGenericFinder(ogapi, source, entity, error_not_found) {
    _classCallCheck(this, ProvisionGenericFinder);

    _get(Object.getPrototypeOf(ProvisionGenericFinder.prototype), 'constructor', this).call(this, ogapi, "provision/" + source, entity, error_not_found);
  }

  return ProvisionGenericFinder;
})(_GenericFinder3['default']);

exports['default'] = ProvisionGenericFinder;
module.exports = exports['default'];
//# sourceMappingURL=ProvisionGenericFinder.js.map
