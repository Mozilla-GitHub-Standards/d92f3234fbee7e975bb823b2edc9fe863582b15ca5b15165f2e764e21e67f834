#!/usr/bin/env node

/**
 * The config module can only be initialized once,
 * so we need multiple test files which are each
 * executed by tap.
 */
var path = require('path');

var tap = require('tap');

process.env['FILESYSTEM_BUILD'] = '/tmp/test';
process.env['FILESYSTEM_CACHE'] = '/tmp/test';

process.env['CONFIG_FILES'] = [
  path.join(__dirname, 'data', 'default_config.js'),
  path.join(__dirname, 'data', 'override_config.js')
].join(',');

tap.test("Multiple configs works as expected", function(test) {
  require('../lib/config')(function(conf) {
    test.deepEqual(conf, {
      foo: 'FOOBAR5000', // instead of 'bar'
      newprop: 12345, // new from override
      buz: 'baz',
      huh: undefined,
      animals: { cat: 'Snowball', dog: 'Spot', lamma: 'Rojer' },
      bar: 42,
      buildDir: "/tmp/test",
      cacheDir: "/tmp/test",
      keysDir: "/tmp/test/keys",
      force: undefined,
      debug: false,
      bind_address: undefined,
      controller_server_port:  undefined,
      generator_server_hostname:  undefined,
      generator_server_port:  undefined,
      awsAccessKeyId: undefined,
      awsSecretAccessKey: undefined,
      varPath: '/tmp/var'
    }, "Deep Equals of configuration object");
    test.end();
  });
});