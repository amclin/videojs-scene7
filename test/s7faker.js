/**
 * Scene7 API Faker
 *
 * simulates the Scene7 API for use within unit tests
 * because it takes to long to load the real libraries
 * from Scene7
 */

const fakeEventListener = {
  events: {},

  addEventListener(name, callback) {
    if (typeof fakeEventListener.events[name] === 'undefined') {
      fakeEventListener.events[name] = [];
    }

    if (typeof callback === 'function') {
      fakeEventListener.events[name].push(callback);
    }
  },

  dispatchEvent(name) {
    fakeEventListener.events[name].forEach((callback) => {
      callback();
    });
  }
};

const player = {
  defaults: {
    volume: 0.5,
    currentTime: 5000,
    duration: 100000,
    loadedPosition: 75000,
    width: 200,
    height: 100
  },

  play() {
    return;
  },

  pause() {
    return;
  },

  resize(width, height) {
    player.defaults.width = width;
    player.defaults.height = height;
  },

  seek(param) {
    player.defaults.currentTime = param;
  },

  getCurrentTime() {
    return player.defaults.currentTime;
  },

  getDuration() {
    return player.defaults.duration;
  },

  getHeight() {
    return player.defaults.height;
  },

  getLoadedPosition() {
    return player.defaults.loadedPosition;
  },

  getVolume() {
    return player.defaults.vol;
  },

  getWidth() {
    return player.defaults.width;
  }
};

const container = {
  defaults: {
    width: 400,
    height: 200
  },
  addEventListener: fakeEventListener.addEventListener,
  dispatchEvent: fakeEventListener.dispatchEvent,
  resize(width, height) {
    container.defaults.width = width;
    container.defaults.height = height;
  },
  requestFullScreen() {
    container.dispatchEvent(
      s7faker.event.ResizeEvent.FULLSCREEN_RESIZE
    );
  },
  cancelFullScreen() {
    container.dispatchEvent(
      s7faker.event.ResizeEvent.COMPONENT_RESIZE
    );
  },
  getHeight() {
    return player.defaults.height;
  },
  getWidth() {
    return player.defaults.width;
  }
};

const params = {
  opts: {},

  init() {
    return;
  },

  push(arg1, arg2) {
    params.opts[arg1] = arg2;
  },

  addEventListener: fakeEventListener.addEventListener,
  dispatchEvent: fakeEventListener.dispatchEvent
};

const mediaset = {

};

const s7faker = {
  // Fake the loader
  Util: {
    lib: {
      include() {
        return true;
      }
    },

    init() {
      return true;
    }
  },

  Event: {
    SDK_READY: 'SDK_READY'
  },

  event: {
    ResizeEvent: {
      FULLSCREEN_RESIZE: 'FULLSCREEN_RESIZE',
      COMPONENT_RESIZE: 'COMPONENT_RESIZE'
    }
  },

  ParameterManager() {
    return params;
  },

  common: {
    Container() {
      return container;
    }
  },

  set: {
    MediaSet() {
      return mediaset;
    }
  },

  video: {
    VideoPlayer() {
      return player;
    }
  }
};

export default s7faker;
