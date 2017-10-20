import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Tech = videojs.getComponent('Tech');

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
// function _getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

/**
 * Returns a random alphanumeric string
 *
 * @return {string}
 *    starting with 'testRun' and 8 ASCII letters
 **/
function _getRandomAlphaString() {
  return 'testRun' + Math.random().toString(36).substring(8);
}

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.module('videojs-scene7', {

  beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document.getElementById('qunit-fixture');
    this.video = document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(1);

  assert.strictEqual(
    typeof Tech.getTech('Scene7'),
    'function',
    'videojs-scene7 tech plugin was registered'
  );

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  // assert.ok(
  //   this.player.hasClass('vjs-scene7'),
  //   'the plugin adds a class to the player'
  // );
});

QUnit.test('canPlayType()', function(assert) {
  const Scene7 = Tech.getTech('Scene7');

  assert.expect(3);

  assert.strictEqual(
    typeof Scene7.canPlayType,
    'function',
    'is a function.'
  );

  assert.strictEqual(
    Scene7.canPlayType('videojs/scene7'),
    'probably',
    'returns \'probably\' when the mime type is videojs/scene7.'
  );

  assert.strictEqual(
    Scene7.canPlayType(_getRandomAlphaString()),
    '',
    'returns an empty string when the video mime type is not a match.'
  );

  // Not implemented because we only want to support S7 video sets
  // assert.strictEqual(
  //   Scene7.canPlayType('video/mp4'),
  //   'maybe',
  //   'returns \'maybe\' when the mime type is video/mp4.'
  // );
});

QUnit.test('canPlaySource()', function(assert) {
  const Scene7 = Tech.getTech('Scene7');

  assert.expect(3);

  assert.strictEqual(
    typeof Scene7.canPlaySource,
    'function',
    'is a function.'
  );

  assert.strictEqual(
    Scene7.canPlaySource({
      src: 'https://example.com/video',
      type: 'videojs/scene7'}),
    'probably',
    'returns \'probably\' when the mime type is videojs/scene7.'
  );

  assert.strictEqual(
    Scene7.canPlayType({
      src: 'https://example.com/video',
      type: _getRandomAlphaString()}),
    '',
    'returns an empty string when the video mime type is not a match.'
  );

  // Not implemented because we only want to support S7 video sets
  // assert.strictEqual(
  //   Scene7.canPlayType('video/mp4'),
  //   'maybe',
  //   'returns \'maybe\' when the mime type is video/mp4.'
  // );
});
