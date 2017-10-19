import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import window from 'global/window';

const Tech = videojs.getComponent('Tech');

// Default options for the plugin.
const defaults = {
  'serverurl': 'http://s7d1.scene7.com/is/image/',
  'videoserverurl': 'http://s7d1.scene7.com/is/content/',
  // specify content url for closed caption and chapter navigation asset
  'contenturl': 'http://s7d1.scene7.com/is/content/',
  'MediaSet.asset': 'Scene7SharedAssets/Adobe_QBP-AVS',
  // specify closed caption file
  'caption': 'Scene7SharedAssets/adobe_qbc_final_cc,1',
  // specify chapter navigation file
  'navigation': 'Scene7SharedAssets/adobe_qbc_final_nc',
  // disable video player to play video after load operation has completed
  'autoplay': '0',
  // enable single click on video to toggle between play and pause
  'singleclick': 'playPause',
  // configures the icon effect when video is in paused state
  // as follows: enable,# times to appear, fade duration, auto-hide duration
  'iconeffect': '1,-1,0.3,0'
};

// Cross-compatibility for Video.js 5 and 6.
const registerTech = videojs.registerTech || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-scene7');
};

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
    super(options, ready);

    _loadS7SDK();
    _setupParams();

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
   * Initialize the various parts of the Scene7 Video Player
   */
  _initViewer() {
    const params = this.s7.params;

    // Provide settings to Scene7 ParametersManager
    for (const param in defaults) {
      params.push(param, defaults[param]);
    }

    this._setupS7MediaSet();
    this._setupS7Container();
    this._setupS7Player();
    this._mapEvents();
  }

  /**
   * Create the Scene7 Adaptive Video media set
   */
  _setupS7MediaSet() {
    const that = this;
    const sdk = that.s7.sdk;
    const params = that.s7.params;
    const mediaSet = new sdk.set.MediaSet(null, params, 'mediaSet');

    // Add MediaSet event listeners
    mediaSet.addEventListener(sdk.event.AssetEvent.NOTF_SET_PARSED, function(event) {
      that._setS7Source(event.s7event.asset);
    }, false);

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
    const container = new sdk.common.Container(null, params, 'cont');

    // Setup events to resize the player when the container changes size/fullscreen
    container.addEventListener(sdk.event.ResizeEvent.COMPONENT_RESIZE, function(event) {
      that.resizeEventHandler(event);
    }, false);
    container.addEventListener(sdk.event.ResizeEvent.FULLSCREEN_RESIZE, function(event) {
      that.resizeEventHandler(event);
    }, false);

    that.container = container;
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

    this.resizePlayer(width, height);
  }

  /**
   * Creates the Scene7 Video Player component used inside the container
   */
  _setupS7Player() {
    const that = this;
    const sdk = that.s7.sdk;
    const container = that.s7.container;
    const params = that.s7.params;
    const player = new sdk.video.VideoPlayer(container, params, 's7viewer');

    that.player = player;
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
   * Tells VideoJS whether the Scene7 Tech can play the proposed video
   * based on the specified mime/type
   *
   * @param {string} mimetype
   *        mime/type of the video
   *
   * @return {string}
   *    - 'probably' if S7 can play the video
   *    - 'maybe'
   *    - '' empty string if S7 cannot play the video
   **/
  function(mimetype) {
    return mimetype === 'video/scene7' ? 'probably' : '';
  }

  /**
   * Starts video playback. Restarts the video if we're already at the end
   *
   * @return {undefined}
   **/
  play() {
    const that = this;
    const player = that.s7.player;
    const remainingTime = player.getDuration() - player.getCurrentTime();

    // IF the video is over, restart from the beginning
    if (remainingTime <= 1) {
      player.seek(0);
    }

    return player.play();
  }

  /**
   * Pauses video playback
   *
   * @return {undefined}
   **/
  pause() {
    return this.s7.player.pause();
  }

  /**
   * Get the current playback time
   *
   * @return {number}
   *    - seconds since beginning
   **/
  currentTime() {
    return this.s7.player.getCurrentTime();
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
   * Get the current duration of the Scene7 media element.
   *
   * @return {number}
   *         The duration of the media in seconds or NaN if there is no duration.
   */
  duration() {
    return this.s7.player.getDuration();
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
          return player.getLoadedPosition() * player.getDuration();
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
    player.addEventListener(sdk.event.VideoEvent.NOTF_LOAD_PROGRESS, function(event) {
      that._handleLoadProgress();
    }, false);
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
}

// Register the plugin with video.js.
registerTech('Scene7', Scene7);

// Include the version number.
Scene7.VERSION = VERSION;

export default Scene7;
