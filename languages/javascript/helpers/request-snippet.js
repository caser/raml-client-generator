var stringify = require('javascript-stringify');

/**
 * Pull out request parameters from the resource.
 *
 * @param  {Object} resource
 * @return {String}
 */
var params = function (resource) {
  return resource.uriParameters.map(function (parameter) {
    var displayName  = parameter.displayName;
    var defaultValue = parameter.default ? stringify(parameter.default) : null;

    return displayName + (defaultValue ? ' = ' + defaultValue : '');
  }).join(', ');
};

/**
 * Stringify a method into a resource request snippet.
 *
 * @param  {Object} method
 * @return {String}
 */
module.exports = function (method) {
  var parts = [];
  var part  = method.resource;

  while (part && part.parent) {
    var segment = part.key;

    // If uri parameters exist, push onto the stack.
    if (part.uriParameters.length) {
      segment += '(' + params(part) + ')';
    }

    parts.unshift(segment);

    part = part.parent;
  }

  // Push the request method onto the segment stack.
  parts.push(method.key + '()');

  return 'resources.' + parts.join('.');
};
