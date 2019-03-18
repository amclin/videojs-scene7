# videojs-scene7

[![Build Status][travis-icon]][travis-link]
[![Coverage Status][coveralls-icon]][coveralls-link]

[![NPM][npm-icon]][npm-link]

Tech plugin for VideoJS to support Scene7 players

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Installation

- [Installation](#installation)
- [Usage](#usage)
  - [`<script>` Tag with a `<video>` tag](#script-tag-with-a-video-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [RequireJS/AMD](#requirejsamd)
- [Options](#options)
  - [`serverurl`](#serverurl)
  - [`videoserverurl`](#videoserverurl)
  - [`contenturl`](#contenturl)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

```sh
npm install --save videojs-scene7
```

## Usage

To include videojs-scene7 on your website or web application, use any of the following methods.

### `<script>` Tag with a `<video>` tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available. Make sure to set:
- techOrder so VideoJS will leverage the Scene7 plugin
- source of the Scene7 MediaSet
- the type to `videojs/scene7`
- The Scene7 [player options](#options)

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-scene7.min.js"></script>
<video id='my-video'
  controls
  autoplay
  >
  <source src='Scene7SharedAssets/Adobe_QBP-AVS' type='videojs/scene7'>
</video>
<script>
  var player = videojs('my-video',{
    techOrder: [ 'Scene7']
  });

  player.scene7();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-scene7 via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-scene7');

var player = videojs('my-video',{
  techOrder: [ 'Scene7']
});

player.scene7();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-scene7'], function(videojs) {
  var player = videojs('my-video',{
    techOrder: [ 'Scene7']
  });

  player.scene7();
});
```

## Options
Provide Scene7 options to VideoJS through the normal VideoJS options object or data-options attribute. The options

```js
options: {
  scene7: {
    serverurl: "http://s7d1.scene7.com/is/image/", // Path to Scene7 server
    videoserverurl: "http://s7d1.scene7.com/is/content/", // 
  }
}
```

### `serverurl`

URL to the image API for Scene7. Default when not set is `http://s7d1.scene7.com/is/image/`

### `videoserverurl`

URL to the content API for Scene7. Default when not set is `http://s7d1.scene7.com/is/content/`

### `contenturl`

URL to the content API for Scene7 where losed caption and chapter navigation assets are located. Default when not set is `http://s7d1.scene7.com/is/content/`



## License

MIT. Copyright (c) Anthony McLin &lt;npm@anthonymclin.com&gt;


[videojs]: http://videojs.com/

[coveralls-icon]: https://coveralls.io/repos/github/amclin/videojs-scene7/badge.svg?branch=master

[coveralls-link]: https://coveralls.io/github/amclin/videojs-scene7?branch=master

[npm-icon]: https://nodei.co/npm/videojs-scene7.png?downloads=true&downloadRank=true

[npm-link]: https://nodei.co/npm/videojs-scene7/

[travis-icon]: https://travis-ci.org/amclin/videojs-scene7.svg?branch=master

[travis-link]: https://travis-ci.org/amclin/videojs-scene7
