/**
 * Scene7 API Faker
 *
 * simulates the Scene7 API for use within unit tests
 * because it takes to long to load the real libraries
 * from Scene7
 */

import document from 'global/document';

const events = {};
const params = {
  params: {},

  init() {
    return;
  },

  push(arg1, arg2) {
    params.params[arg1] = arg2;
  }
};
const mediaset = {
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
  component: { },
  resize(width, height) {
    container.defaults.width = width;
    container.defaults.height = height;
  },
  getHeight() {
    return player.defaults.height;
  },
  getWidth() {
    return player.defaults.width;
  }
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
    AssetEvent: {
      NOTF_SET_PARSED: 'NOTF_SET_PARSED'
    },
    CapabilityStateEvent: {
      NOTF_VIDEO_CAPABILITY_STATE: 'NOTF_VIDEO_CAPABILITY_STATE'
    },
    ResizeEvent: {
      FULLSCREEN_RESIZE: 'FULLSCREEN_RESIZE',
      COMPONENT_RESIZE: 'COMPONENT_RESIZE'
    },
    StatusEvent: {
      NOTF_VIEW_READY: 'NOTF_VIEW_READY'
    },
    UserEvent: {
      PAUSE: 'PAUSE',
      PLAY: 'PLAY'
    },
    VideoEvent: {
      NOTF_CURRENT_TIME: 'NOTF_CURRENT_TIME',
      NOTF_DURATION: 'NOTF_DURATION',
      NOTF_VIDEO_END: 'NOTF_VIDEO_END',
      NOTF_VOLUME: 'NOTF_VOLUME'
    }
  },

  ParameterManager() {
    return params;
  },

  common: { },

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

function addEventListener(name, callback) {
  if (typeof events[name] === 'undefined') {
    events[name] = [];
  }

  if (typeof callback === 'function') {
    events[name].push(callback);
  }
}

function dispatchEvent(name) {
  events[name].forEach((callback) => {
    callback();
  });
}

function initContainer(arg, opts, id) {
  let node;

  if (typeof container.component.obj === 'undefined') {
    node = document.createElement('div');
    node.id = id;
    container.component.obj = node;
    document.body.appendChild(node);
  }

  return container;
}

mediaset.addEventListener = addEventListener;
mediaset.dispatchEvent = dispatchEvent;
params.addEventListener = addEventListener;
params.dispatchEvent = dispatchEvent;
player.addEventListener = addEventListener;
player.dispatchEvent = dispatchEvent;
container.addEventListener = addEventListener;
container.dispatchEvent = dispatchEvent;
s7faker.common.Container = initContainer;
container.requestFullScreen = function() {
  container.dispatchEvent(
    s7faker.event.ResizeEvent.FULLSCREEN_RESIZE
  );
};
container.cancelFullScreen = function() {
  container.dispatchEvent(
    s7faker.event.ResizeEvent.COMPONENT_RESIZE
  );
};

export default s7faker;
