/**
 * Scene7 API Faker
 *
 * simulates the Scene7 API for use within unit tests
 * because it takes to long to load the real libraries
 * from Scene7
 */

const player = {
  defaults: {
    volume: 0.5,
    duration: 100000,
    loadedPosition: 75000
  },

  play() {
    return;
  },

  pause() {
    return;
  },

  getVolume() {
    return this.defaults.vol;
  },

  getDuration() {
    return this.defaults.duration;
  },

  getLoadedPosition() {
    return this.defaults.loadedPosition;
  }
};

const container = {

};

const params = {
  addEventListener() {
    return;
  },

  init() {
    return;
  }
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
    SDK_READY: ''
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
