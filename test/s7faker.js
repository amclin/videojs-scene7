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
  opts: {},

  init() {
    return;
  },

  push(arg1, arg2) {
    params.opts[arg1] = arg2;
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
    ResizeEvent: {
      FULLSCREEN_RESIZE: 'FULLSCREEN_RESIZE',
      COMPONENT_RESIZE: 'COMPONENT_RESIZE'
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
