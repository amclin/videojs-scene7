import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import window from 'global/window';

const Tech = videojs.getComponent('Tech');

// Default options for the plugin.
const defaults = {
  serverurl: 'http://s7d1.scene7.com/is/image/',
  videoserverurl: 'http://s7d1.scene7.com/is/content/',
  // specify content url for closed caption and chapter navigation asset
  contenturl: 'http://s7d1.scene7.com/is/content/',
  // configures the icon effect when video is in paused state
  // as follows: enable,# times to appear, fade duration, auto-hide duration
  iconeffect: '0,-1,0.3,0'
};

// Scene7 tracks at a different timescale than VideoJS
const timeRatio = 1000;

// Cross-compatibility for Video.js 5 and 6.
// const registerTech = videojs.registerTech || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Scene7 Media Controller - Wrapper for Scene7 Player API
 *
 * @extends Tech
 */
class Scene7 extends Tech {

 /**
  * Create an instance of this Tech.
  *
  * @param {Object} [options]
  *        The key/value store of player options.
  *
  * @param {Component~ReadyCallback} ready
  *        Callback function to call when the `Scene7` Tech is ready.
  */
  constructor(options, ready) {
    // Merge the videojs options with the defaults
    options = Object.assign({}, defaults, options);

    super(options, ready);

    this.s7 = {};

    this._loadS7SDK();
    this._setupS7Params(options);
  }

  /**
  * Load and Initialize the Scene7 SDK
  */
  _loadS7SDK() {

    // TODO add the SDK path from defaults

    // S7 SDK is in the global namespace
    this.s7.sdk = window.s7sdk;

    const sdk = this.s7.sdk;

    // Load specific modules
    sdk.Util.lib.include('s7sdk.common.Container');
    sdk.Util.lib.include('s7sdk.set.MediaSet');
    sdk.Util.lib.include('s7sdk.video.VideoPlayer');

    // Initialize the SDK
    sdk.Util.init();
  }

  /**
   * Create a S7 Parameters manager
   */
  _setupS7Params() {
    const sdk = this.s7.sdk;
    const that = this;
    /* Create an instance of the ParameterManager component to collect
    components' configuration that can come from a viewer preset, URL,
    or the HTML page itself. The ParameterManager component also sends
    a notification s7sdk.Event.SDK_READY when all needed files are
    loaded and the configuration parameters are processed. The other
    components should never be initialized outside of this handler.
    After defining the handler for the s7sdk.Event.SDK_READY event, it
    is safe to initiate configuration initialization by calling
    ParameterManager.init(). */
    const params = new sdk.ParameterManager();

    /* Setup event to call next steps when PackageManager dispatches
    s7sdk.Event.SDK_READY event when all modifiers are processed and
    it is safe to initialize the viewer. */
    params.addEventListener(that.s7.sdk.Event.SDK_READY, function(event) {
      that._initViewer();
    }, false);

    // Initialize ParameterManager
    params.init();

    this.s7.params = params;
  }

  /**
   * Maps videojs options to Scene7 parameters
   * and sets them in the ParameterManager object
   **/
  setParameters() {
    const paramMgr = this.s7.params;
    const options = this.options_;
    const params = {};
    // List of supported settings to get from the videojs options
    const settings = [
      'serverurl',
      'videoserverurl',
      'contenturl',
      'loop',
      'iconeffect'
    ];

    // Get supported settings from videojs
    settings.forEach(function(setting) {
      if (typeof options[setting] !== 'undefined') {
        params[setting] = options[setting];
      }
    });

    // Add source Media Set from <video> <source> tag
    params['MediaSet.asset'] = options.source.src;

    // Convert autoplay setting from boolean to numeric strings
    params.autoplay = (this.options_.autoplay) ? '1' : '0';

    // Provide settings to Scene7 ParametersManager
    for (const param in params) {
      paramMgr.push(param, params[param]);
    }

  }

  /**
   * Initialize the various parts of the Scene7 Video Player
   */
  _initViewer() {
    this.setParameters();
    this._setupS7Container();
    this._setupS7MediaSet();
    this._setupS7Player();
    this._mapEvents();
    this.injectS7Player();
    this.triggerReady();
  }

  /**
   * Create the Scene7 Adaptive Video media set
   *
   * @param {string} src
   *    - Optional media set path to use. Replaces value in ParamsManager when provided.
   */
  _setupS7MediaSet(src) {
    const that = this;
    const sdk = that.s7.sdk;
    const container = that.s7.container;
    const params = that.s7.params;
    let mediaSet = {};

    // Update parameters if specified
    if (src) {
      params.params['MediaSet.asset'] = src;
    }

    // Get new MediaSet object
    mediaSet = new sdk.set.MediaSet(container, params, container.parentId + '-s7mediaSet');

    // Add MediaSet event listeners
    mediaSet.addEventListener(sdk.event.AssetEvent.NOTF_SET_PARSED, function(event) {
      that._setS7Source(event.s7event.asset);
    }, false);

    // Store new MediaSet
    this.s7.mediaSet = mediaSet;
  }

  /**
   * Creates the Scene7 Viewer Container as a parent for the
   * other S7 UI components that are part of the application
   **/
  _setupS7Container() {
    const that = this;
    const sdk = that.s7.sdk;
    const params = that.s7.params;

    that.el_.id = that.el_.id || that.getUniqueId();

    const container = new sdk.common.Container(that.el_.id, params, that.el_.id + '-s7container');

    // Setup events to resize the player when the container changes size/fullscreen
    container.addEventListener(sdk.event.ResizeEvent.COMPONENT_RESIZE, function(event) {
      that._resizeEventHandler(event);
    }, false);
    container.addEventListener(sdk.event.ResizeEvent.FULLSCREEN_RESIZE, function(event) {
      that._resizeEventHandler(event);
    }, false);

    that.s7.container = container;
  }

  /**
   * Handles Scene7 resize events and triggers a resize of the video player
   *
   * @param {Object} event
   *        Scene7 Event object
   *
   **/
  _resizeEventHandler(event) {
    const width = event.s7event.w;
    const height = event.s7event.h;

    this.resizeVideo(width, height);
  }

  /**
   * Creates the Scene7 Video Player component used inside the container
   */
  _setupS7Player() {
    const that = this;
    const sdk = that.s7.sdk;
    const container = that.s7.container;
    const params = that.s7.params;
    const player = new sdk.video.VideoPlayer(container, params, container.parentId + '-s7viewer');

    that.s7.player = player;
  }

  /**
   * Set the Scene7 source for the player
   *
   * @param {Object} asset
   *        Scene7 Media Set object
   *
   **/
  _setS7Source(asset) {
    const that = this;
    const sdk = that.s7.sdk;
    const player = that.s7.player;
    let src = {};

    // Ensure this is a media set asset
    if (!(asset instanceof sdk.MediaSetDesc)) {
      throw new Error('Failed to get meta data for video: ' + asset);
    }

    if (asset.type === sdk.ItemDescType.VIDEO_SET) {
      // Adaptive Video Set
      src = asset;
    } else {
      // Single Video
      src = asset.items[0];
    }

    player.setItem(src);
  }

  /**
   * A getter/setter for the `Html5` Tech's source object.
   * > Note: Please use {@link Html5#setSource}
   *
   * @param {Tech~SourceObject} [src]
   *        The source object you want to set on the `HTML5` techs element.
   *
   * @return {Tech~SourceObject|undefined}
   *         - The current source object when a source is not passed in.
   *         - undefined when setting
   *
   * @deprecated Since version 5.
   */
  src(src) {
    if (typeof src === 'undefined') {
      return this.currentSrc();
    }

    // Setting src through `src` instead of `setSrc` will be deprecated
    this.setSrc(src);
  }

  /**
   * Set the video source for Scene7
   * {@link Tech~SourceObject} for the media.
   *
   * @method Scene7#setSrc
   * @param {Tech~SourceObject} src
   *        The source object to set as the current source.
   *
   * @see [Spec]{@link https://www.w3.org/TR/html5/embedded-content-0.html#dom-media-src}
   */
  setSrc(src) {
    this._setupS7MediaSet(src.src);
  }

  /**
   * Get the current source on the Scene7 Tech.
   *
   * @return {Tech~SourceObject}
   *         The current source object from the Scene7 tech.
   */
  currentSrc() {
    return this.options_.source;
  }

  /**
   * Starts video playback. Restarts the video if we're already at the end
   *
   * @return {undefined}
   **/
  play() {
    const that = this;
    const player = that.s7.player;

    // IF the video is over, restart from the beginning
    if (that.ended()) {
      that.setCurrentTime(0);
    }

    return player.play();
  }

  /**
   * Checks if the video has reached the end or not
   *
   * @return {boolean}
   *    - True if ended
   *    - False if not ended
   **/
  ended() {
    const player = this.s7.player;

    if (this.state === 'ended') {
      return true;
    }

    return (player.getDuration() - player.getCurrentTime() <= 1);
  }

  /**
   * Sets the current playback point
   *
   * @param {number} time
   *    - Time in seconds since the beginning
   */
  setCurrentTime(time) {
    this.s7.player.seek(time * timeRatio);
    super.setCurrentTime();
  }

  /**
   * Pauses video playback
   *
   * @return {undefined}
   **/
  pause() {
    this.s7.player.pause();
  }

  /**
   * Get the value of `paused` from the Scene7. `paused` indicates whether the
   * media element is currently paused or not.
   *
   * @method Scene7#paused
   * @return {boolean}
   *         Whether or not Scene7 is paused
   *
   * @see [Spec]{@link https://www.w3.org/TR/html5/embedded-content-0.html#dom-media-paused}
   */
  paused() {
    // We track a state managed by events since Scene7 internal
    // player.resolveVideoProxy().paused() is unreliable and always
    // returns true
    return this.state === 'paused';
  }

  /**
   * Get the current playback time
   *
   * @return {number}
   *    - seconds since beginning
   **/
  currentTime() {
    return this.s7.player.getCurrentTime() / timeRatio;
  }

  /**
   * Check if the volume can be changed in this browser/device.
   * Volume cannot be changed in a lot of mobile devices.
   * Specifically, it can't be changed from 1 on iOS.
   *
   * @return {boolean}
   *         - True if volume can be controlled
   *         - False otherwise
   */
  canControlVolume() {
    return this.s7.player.supportsVolumeControl();
  }

  /**
   * Get the current volume level
   *
   * @return {number}
   *    The current volume level as a fractional value
   *    0 = min
   *    1 = max
   **/
  volume() {
    return this.s7.player.getVolume();
  }

  /**
   * Set the value of `volume` on the media element. `volume` indicates the current
   * audio level as a percentage in decimal form. This means that 1 is 100%,
   * 0.5 is 50%, and * so on.
   *
   * @method Scene7#setVolume
   * @param {number} percentAsDecimal
   *        The volume percent as a decimal. Valid range is from 0-1.
   * @return {undefined} on success
   *
   * @see [Spec]{@link https://www.w3.org/TR/html5/embedded-content-0.html#dom-a-volume}
   */
  setVolume(percentAsDecimal) {
    return this.s7.player.setVolume(percentAsDecimal);
  }

  /**
   * Check if video is muted
   *
   * @return {boolean} muted
   *  - True when video is muted
   *  - False when video is not muted
   * @method muted
   */
  muted() {
    return this.s7.player.muted();
  }

  /**
   * Mute/Unmute the video
   *
   * @method Scene7#setMuted
   * @param {boolean} muted
   *        - True if the audio should be set to silent
   *        - False otherwise
   * @return {undefined} on success
   */
  setMuted(muted) {
    const player = this.s7.player;

    // ensure boolean
    muted = Boolean(muted);

    if (muted) {
      return player.mute(muted);
    }

    return player.unmute();
  }

  /**
   * Get the current duration of the Scene7 media element.
   *
   * @return {number}
   *         The duration of the media in seconds or NaN if there is no duration.
   */
  duration() {
    return this.s7.player.getDuration() / timeRatio;
    // TODO Duration may not be available until playback has started
    // If that's the case, then use a this.on('timeupdate',checkProgress)
    // listener to poll for a duration update.
    // see https://github.com/videojs/video.js/blob/master/src/js/tech/html5.js
  }

  /**
   * Get the value of `buffered` from the media element. `buffered` is a `TimeRange`
   * object that represents the parts of the media that are already downloaded and
   * available for playback.
   *
   * @return {TimeRange}
   *         The value of `buffered` from the media element.
   *
   * @see [Spec]{@link https://www.w3.org/TR/html5/embedded-content-0.html#dom-media-buffered}
   */
  buffered() {
    const that = this;
    const player = that.player;
    let timeRange = {
      length: 0,
      start() {
        throw new Error('This TimeRanges object is empty');
      },
      end() {
        throw new Error('This TimeRanges object is empty');
      }
    };

    if (player && player.getLoadedPosition) {
      timeRange = {
        length: 1,
        start() {
          return 0;
        },
        end() {
          return (player.getLoadedPosition() * player.getDuration()) / timeRatio;
        }
      };
    } else {
      that.trigger('error');
    }

    return timeRange;
  }

  /**
   * Check if fullscreen is supported on the current playback device.
   *
   * @return {boolean}
   *         - True if fullscreen is supported.
   *         - False if fullscreen is not supported.
   */
  supportsFullScreen() {
    // Scene7 handles full-screen mode internally depending on browser type
    return true;
  }

  /**
   * Requests that Scene7 Tech open full screen mode.
   * will have different behaviors on different device types
   *
   * @return {undefined}
   **/
  enterFullScreen() {
    return this.s7.container.requestFullScreen();
  }

  /**
   * Requests that Scene7 Tech exits full screen mode.
   *
   * @return {undefined}
   **/
  exitFullScreen() {
    return this.s7.container.cancelFullScreen();
  }

  /**
   * Map required Video JS events to their Scene7 equivalents
   **/
  _mapEvents() {
    const that = this;
    const sdk = that.s7.sdk;
    const player = that.s7.player;
    const events = {
      player: [
        {
          internal: 'UserEvent.PLAY',
          external: 'play'
        }, {
          internal: 'UserEvent.PAUSE',
          external: 'pause'
        }, {
          internal: 'StatusEvent.NOTF_VIEW_READY',
          external: 'playing'
        }, {
          internal: 'VideoEvent.NOTF_CURRENT_TIME',
          external: 'timeupdate'
        }, {
          internal: 'VideoEvent.NOTF_DURATION',
          external: 'durationchange'
        }, {
          internal: 'VideoEvent.NOTF_VIDEO_END',
          external: 'ended'
        }, {
          internal: 'VideoEvent.NOTF_VOLUME',
          external: 'volumechange'
        }
      ],
      container: [
        {
          internal: 'ResizeEvent.FULLSCREEN_RESIZE',
          external: 'enterFullScreen'
        }
      ]
    };

    // wire the S7 event to the Video JS using an anonymous function
    for (const component in events) {
      events[component].forEach(function(event) {
        const splitName = event.internal.split('.');
        const target = that.s7[component];
        const s7Event = sdk.event[splitName[0]][splitName[1]];
        const vjsEvent = event.external;

        target.addEventListener(s7Event, function(ev) {
          that.trigger(vjsEvent);
        }, false);
      });
    }

    // Events that require some logic when mapping
    player.addEventListener(
      sdk.event.VideoEvent.NOTF_LOAD_PROGRESS,
      function(event) {
        that._handleLoadProgress();
      },
      false
    );

    // Video is switched into playable/pausable/replayable state
    player.addEventListener(
      sdk.event.CapabilityStateEvent.NOTF_VIDEO_CAPABILITY_STATE,
      function(event) {
        that._handleStateChange(event);
      },
      false
    );
  }

  /**
   * Deals with the logic of switching which events to fire
   * loadstart fires only once, but progress and duration change
   * get updated multiple times
   **/
  _handleLoadProgress() {
    const that = this;

    // Only trigger loadstart once
    if (that.loadstartFired) {
      that.trigger('loadedmetadata');
      that.trigger('loadstart');
      that.loadstartFired = true;
    }

    that.trigger('progress');
    that.trigger('durationchange');
  }

  /**
   * Tracks the Scene7 player state since some methods are not exposed
   *
   * @param {Object} event
   *      Scene7 event
   */
  _handleStateChange(event) {
    const sdk = this.s7.sdk;
    const cap = event.s7event.state;

    // Scene7 is pausable means the video is playing
    if (cap.hasCapability(sdk.VideoCapabilityState.PAUSE)) {
      // this.trigger('timeupdate');
      // this.trigger('durationchange');
      this.trigger('playing');
      this.trigger('play');
      this.state = 'playing';
      return;
    }

    // Scene7 is playable means the video is paused
    if (cap.hasCapability(sdk.VideoCapabilityState.PLAY)) {
      this.trigger('canplay');
      this.trigger('pause');
      this.state = 'paused';
      return;
    }

    // if (cap.hasCapability(sdk.VideoCapabilityState.STOP)) {
    //   self.state = 'playing';
    //   return;
    // }

    // Scene7 is replayable means the video is ended
    if (cap.hasCapability(sdk.VideoCapabilityState.REPLAY)) {
      this.trigger('canplay');
      this.trigger('ended');
      this.state = 'ended';
      return;
    }
  }

  /**
   * Resize the video when the container resizes
   *
   * @param {number} width
   *    - Width of the video in pixels
   * @param {number} height
   *    - Height of the video in pixels
   **/
  resizeVideo(width, height) {
    this.s7.player.resize(width, height);
  }

  /**
   * Resize the container
   *
   * @param {number} width
   *    - Width of the container in pixels
   * @param {number} height
   *    - Height of the container in pixels
   **/
  resizeContainer(width, height) {
    this.s7.container.resize(width, height);
  }

  /**
   * Move the Scene7 container inside the VideoJS container
   */
  injectS7Player() {
    const that = this;
    const s7El = that.s7.container.component.obj;
    const vjsEl = that.el_.parentElement;

    that.el_.appendChild(s7El);

    that.resizeContainer(vjsEl.offsetWidth, vjsEl.offsetHeight);
    that.resizeVideo(vjsEl.offsetWidth, vjsEl.offsetHeight);
  }

  /**
   * Genterate a unique id
   * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  getUniqueId() {
    return 'x-' + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);

      return v.toString(16);
    });
  }
}

// ****** These methods fail to exist if defined in the class ****** //

/**
 * Check if Scene7 video is supported by this browser/device
 * (this doesn't work as a native function)
 *
 * @return {boolean} Always true when S7 is enabled
 */
Scene7.isSupported = function() {
  return true;
};

/**
 * Check if the tech can support the given mime/type
 *
 * @param {string} mimetype
 *        mime/type of the video
 *
 * @return {string}
 *    - 'probably' if S7 can play the video
 *    - 'maybe'
 *    - '' empty string if S7 cannot play the video
 **/
Scene7.canPlayType = function(mimetype) {
  return mimetype === 'videojs/scene7' ? 'probably' : '';
};

/**
 * Check if the tech can support the given source
 *
 * @param  {Object} srcObj  The source object
 *
 * @return {string}
 *    - 'probably' if S7 can play the video
 *    - 'maybe'
 *    - '' empty string if S7 cannot play the video
 */
Scene7.canPlaySource = function(srcObj) {
  return this.canPlayType(srcObj.type);
};

/**
 * Set the tech's volume control support status
 *
 * @type {Boolean}
 */
Scene7.featuresVolumeControl = true;

// Register the plugin with video.js.
videojs.registerTech('Scene7', Scene7);

// Include the version number.
Scene7.VERSION = VERSION;

export default Scene7;
