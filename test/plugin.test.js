import document from 'global/document';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';

const Tech = videojs.getComponent('Tech');

// Create some shorthand for test methods
const module = QUnit.module;
const test = QUnit.test;
const skip = QUnit.skip;

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

module('Sets up Scene7 APIs',function() {
  skip('Loads Scene7 SDK.',(assert) => {
    assert.expect(4);
    // Main SDK
    // Container SDK
    // MediaSet SDK
    // VideoPlayer SDK
  });
  skip('Creates a Scene7 Container.',(assert) => {  });
  skip('Creates a Scene7 MediaSet.',(assert) => {  });
  skip('Creates a Scene7 ParametersManager.',(assert) => {  });
  skip('Creates a Scene7 VideoPlayer.',(assert) => {  });
});

module('Binds VideoJS events to Scene7 events.', () => {
  skip('Sets up fullscreen events.',(assert) => {  });
  skip('Sets up playback events.',(assert) => {  });
  skip('Sets up volume events.',(assert) => {  });
  skip('Sets up loading events.',(assert) => {  });
});

module('manages the source of the Scene7 video.', () => {
  skip('src()',(assert) => {  });
  skip('srcSet()',(assert) => {  });
  skip('currentSrc()',(assert) => {  });
});

module('binds VideoJS playback controls to the Scene7 video.', () => {
  skip('play()',(assert) => {  });
  skip('pause()',(assert) => {  });
  skip('paused()',(assert) => {  });
  skip('ended()',(assert) => {  });
  skip('setCurrentTime()',(assert) => {  });
  skip('currentTime()',(assert) => {  });
  skip('duration()',(assert) => {  });
});

module('manages full screen mode.', () => {
  skip('supportsFullScreen()',(assert) => {  });
  skip('enterFullScreen()',(assert) => {  });
  skip('exitFullScreen()',(assert) => {  });
  skip('resizeVideo()',(assert) => {  });
});

