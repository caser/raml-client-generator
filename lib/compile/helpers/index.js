var _      = require('lodash');
var indent = require('indent-string');
var _trim  = String.prototype.trim;

/**
 * Case sanitization support.
 */
exports.camelCase    = require('camel-case');
exports.pascalCase   = require('pascal-case');
exports.constantCase = require('constant-case');
exports.paramCase    = require('param-case');
exports.lowerCase    = require('lower-case');
exports.upperCase    = require('upper-case');
exports.snakeCase    = require('snake-case');

/**
 * Formatting utilities.
 */
exports.indent = function (/* input, count, character, opts */) {
  var args      = Array.prototype.slice.call(arguments);
  var opts      = args.pop();
  var input     = (opts.fn ? opts.fn(this) : args[0]);
  var count     = (opts.fn ? args[0] : args[1]) || 2;
  var character = (opts.fn ? args[1] : args[2]) || ' ';

  return indent(input, character, count);
};

/**
 * Helpful utility functions.
 */
exports.map    = _.map;
exports.keys   = _.keys;
exports.values = _.values;
exports.unique = _.uniq;
exports.pluck  = _.pluck;
exports.object = _.object;

/**
 * Debugging.
 */
exports.log = function () {
  var opts = arguments[arguments.length - 1];

  if (opts.fn) {
    console.log(opts.fn(this));
  } else {
    console.log.apply(console, Array.prototype.slice.call(arguments, 0, -1));
  }
};

/**
 * Trim a string.
 *
 * @return {String}
 */
exports.trim = function () {
  var opts = arguments[arguments.length - 1];

  if (arguments.length > 1) {
    return _trim.call(arguments[0] == null ? '' : arguments[0]);
  } else {
    return _trim.call(opts.fn(this));
  }
};

/**
 * Check that a number of arguments are equal.
 *
 * @return {Boolean}
 */
exports.equal = function () {
  var args = Array.prototype.slice.call(arguments, 0, -1);
  var opts = arguments[arguments.length - 1];

  for (var i = 1; i < args.length; i++) {
    if (args[i - 1] !== args[i]) {
      return opts.fn ? opts.inverse(this) : false;
    }
  }

  return opts.fn ? opts.fn(this) : true;
};

/**
 * Serialize as a JSON string.
 *
 * @return {String}
 */
exports.json = function () {
  if (arguments.length > 2) {
    return JSON.stringify(arguments[0], null, arguments[1]);
  }

  if (arguments.length === 2) {
    return JSON.stringify(arguments[0]);
  }

  throw new Error('Unsupported usage of json helper');
};
