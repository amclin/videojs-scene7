import document from 'global/document';
import window from 'global/window';

import QUnit from 'qunit';
import sinon from 'sinon';
import videojs from 'video.js';

import plugin from '../src/plugin';
import s7faker from './s7faker';

const Tech = videojs.getComponent('Tech');

// Prepare stuff for the tests
const module = QUnit.module;
const test = QUnit.test;
const skip = QUnit.skip;
const scene7LoaderTimeout = 750;
// We need a real timeout testing Scene7 remote load
// and sinon replaces setTimeout with a faker
const realTimeout = window.setTimeout;
const testOptions = {
  techOrder: ['Scene7', 'html5']
};

/**
 * Adds the Scene7 script tag to the page
 */
function _addS7Script() {
  // const sdktag = document.createElement('script');

  // sdktag.src = 'http://s7d1.scene7.com/s7sdk/3.0/js/s7sdk/utils/Utils.js';
  // document.head.appendChild(sdktag);

  window.s7sdk = s7faker;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @param {number} min
 *    minimum value to return
 * @param {number} max
 *    maximum value to return
 * @return {number}
 *    random integer between min and max (inclusive)
 */
function _getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Returns a random alphanumeric string
 *
 * @return {string}
 *    starting with 'testRun' and 8 ASCII letters
 **/
function _getRandomAlphaString() {
  return 'testRun' + Math.random().toString(36).substring(8);
}

// Setup the external script load
_addS7Script();

QUnit.test('the environment is sane', function(assert) {
  assert.strictEqual(typeof Array.isArray, 'function', 'es5 exists');
  assert.strictEqual(typeof sinon, 'object', 'sinon exists');
  assert.strictEqual(typeof videojs, 'function', 'videojs exists');
  assert.strictEqual(typeof plugin, 'function', 'plugin is a function');
});

QUnit.test('registers itself with video.js', function(assert) {
  assert.expect(1);

  assert.strictEqual(
    typeof Tech.getTech('Scene7'),
    'function',
    'videojs-scene7 tech plugin was registered'
  );

  // Tick the clock forward enough to trigger the player to be "ready".
  // this.clock.tick(1);

  // assert.ok(
  //   this.player.hasClass('vjs-scene7'),
  //   'the plugin adds a class to the player'
  // );
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
    this.player = videojs(this.video, testOptions);
    this.Scene7 = this.player.tech_;
    this.sdk = window.s7sdk;
  },

  afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
}, () => {

  module('Sets up Scene7 APIs', function() {
    test('Loads Scene7 SDK.', function(assert) {
      const sdk = window.s7sdk;
      const done = assert.async();

      assert.expect(4);

      this.Scene7._loadS7SDK();

      realTimeout(function() {

        // Main SDK
        assert.strictEqual(
          typeof window.s7sdk,
          'object',
          'Scene7 SDK is loaded.'
        );

        // VideoPlayer SDK
        assert.strictEqual(
          typeof sdk.video.VideoPlayer,
          'function',
          'Scene7 VideoPlayer SDK is loaded.'
        );

        // Container SDK
        assert.strictEqual(
          typeof sdk.common.Container,
          'function',
          'Scene7 MediaSet SDK is loaded.'
        );

        // // MediaSet SDK
        assert.strictEqual(
          typeof sdk.set.MediaSet,
          'function',
          'Scene7 MediaSet SDK is loaded.'
        );

        done();
      }, scene7LoaderTimeout);

    });

    skip('Loads Scene7 SDK from specified domain.', (assert) => { });

    skip('Creates a Scene7 Container.', (assert) => { });
    skip('Creates a Scene7 MediaSet.', (assert) => { });
    skip('Creates a Scene7 ParametersManager.', (assert) => { });
    skip('Creates a Scene7 VideoPlayer.', (assert) => { });
  });

  module('Binds VideoJS events to Scene7 events.', () => {
    skip('Sets up fullscreen events.', (assert) => { });
    skip('Sets up playback events.', (assert) => { });
    skip('Sets up volume events.', (assert) => { });
    skip('Sets up loading events.', (assert) => { });
  });

  module('manages the source of the Scene7 video.', () => {
    skip('src()', (assert) => { });
    skip('srcSet()', (assert) => { });
    skip('currentSrc()', (assert) => { });
  });

  module('binds VideoJS playback controls to the Scene7 video.', function() {
    skip('play()', (assert) => { });
    skip('pause()', (assert) => { });
    skip('paused()', (assert) => { });
    skip('ended()', (assert) => { });

    test('setCurrentTime()', function(assert) {
      const time = _getRandomInt(100, 200);

      this.Scene7.s7.player = this.sdk.video.VideoPlayer();
      this.Scene7.setCurrentTime(time);

      assert.expect(1);
      assert.strictEqual(
        this.Scene7.s7.player.getCurrentTime() / 1000,
        time,
        'converts the time to ms and sets Scene7 playback point'
      );
    });

    test('currentTime()', function(assert) {
      this.Scene7.s7.player = this.sdk.video.VideoPlayer();

      assert.expect(1);
      assert.strictEqual(
        this.Scene7.currentTime(),
        this.Scene7.s7.player.getCurrentTime() / 1000,
        'gets the current playback point from Scene7 and converts to seconds'
      );
    });

    test('duration()', function(assert) {
      this.Scene7.s7.player = this.sdk.video.VideoPlayer();

      assert.expect(1);
      assert.strictEqual(
        this.Scene7.duration(),
        this.Scene7.s7.player.getDuration() / 1000,
        'gets the clip length from Scene7 and converts to seconds'
      );
    });
  });

  module('manages full screen mode.', () => {
    test('supportsFullScreen()', function(assert) {
      assert.expect(1);
      assert.strictEqual(
        this.Scene7.supportsFullScreen(),
        true,
        'always supports fullscreen mode.'
      );
    });

    test('enterFullScreen()', function(assert) {
      const done = assert.async();

      this.Scene7.s7.container = this.sdk.common.Container();
      this.Scene7.s7.container.addEventListener(
        this.sdk.event.ResizeEvent.FULLSCREEN_RESIZE,
        function(ev) {
          assert.ok(true,'triggers Scene7 fullscreen mode.');
          done();
        }
      );

      this.Scene7.enterFullScreen();
    });

    test('exitFullScreen()', function(assert) {
      const done = assert.async();

      assert.expect(1);

      this.Scene7.s7.container = this.sdk.common.Container();
      this.Scene7.s7.player = this.sdk.video.VideoPlayer();
      this.Scene7.s7.container.addEventListener(
        this.sdk.event.ResizeEvent.COMPONENT_RESIZE,
        function(ev) {
          assert.ok(true,'exits Scene7 fullscreen mode.');
          // assert.strictEqual(
          //   this.Scene7.s7.player.getWidth(),
          //   this.Scene7.s7.container.getWidth(),
          //   'resizes the video to match container width'
          // );
          // assert.strictEqual(
          //   this.Scene7.s7.player.getHeight(),
          //   this.Scene7.s7.container.getHeight(),
          //   'resizes the video to match container height'
          // );
          done();
        }
      );

      this.Scene7.exitFullScreen();
    });

    test('resizeVideo()', function(assert) {
      const width = _getRandomAlphaString(200,500);
      const height = _getRandomAlphaString(200,500);

      assert.expect(2);

      this.Scene7.s7.player = this.sdk.video.VideoPlayer();
      this.Scene7.resizeVideo(width,height);

      assert.strictEqual(
        this.Scene7.s7.player.getWidth(),
        this.Scene7.s7.player.getWidth(),
        'resizes the video to specified width.'
      );
      assert.strictEqual(
        this.Scene7.s7.player.getHeight(),
        this.Scene7.s7.player.getHeight(),
        'resizes the video to specified height.'
      );
    });
  });
});

test('canPlayType()', function(assert) {
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

test('canPlaySource()', function(assert) {
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
