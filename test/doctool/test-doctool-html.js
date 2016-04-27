'use strict';

const common = require('../common');
const assert = require('assert');
const fs = require('fs');

const html = require('../../tools/doc/html.js');

// Test data is a list of objects with two properties.
// The file property is the file path.
// The html property is some html which will be generated by the doctool.
// This html will be stripped of all whitespace because we don't currently
// have an html parser.
const testData = [
  {
    'file': common.fixturesDir + '/sample_document.md',
    'html': '<ol><li>fish</li><li><p>fish</p></li><li><p>Redfish</p></li>' +
      '<li>Bluefish</li></ol>'
  },
  {
    'file': common.fixturesDir + '/order_of_end_tags_5873.md',
    'html': '<h3>ClassMethod: Buffer.from(array) <span> ' +
      '<a class="mark" href="#foo_class_method_buffer_from_array" ' +
      'id="foo_class_method_buffer_from_array">#</a> </span> </h3><div' +
      'class="signature"><ul><li><code>array</code><a ' +
      'href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/' +
      'Reference/Global_Objects/Array" class="type">&lt;Array&gt;</a></li>' +
      '</ul></div>'
  },
];

testData.forEach(function(item) {
  // Normalize expected data by stripping whitespace
  const expected = item.html.replace(/\s/g, '');

  fs.readFile(item.file, 'utf8', common.mustCall(function(err, input) {
    assert.ifError(err);
    html(input, 'foo', 'doc/template.html',
      common.mustCall(function(err, output) {
        assert.ifError(err);

        const actual = output.replace(/\s/g, '');
        // Assert that the input stripped of all whitespace contains the
        // expected list
        assert.notEqual(actual.indexOf(expected), -1);
      }));
  }));
});