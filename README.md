# videojs-scene7

Tech plugin for VideoJS to support Scene7 players

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-scene7
```

## Usage

To include videojs-scene7 on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-scene7.min.js"></script>
<script>
  var player = videojs('my-video');

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

var player = videojs('my-video');

player.scene7();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-scene7'], function(videojs) {
  var player = videojs('my-video');

  player.scene7();
});
```

## License

MIT. Copyright (c) Anthony McLin &lt;npm@anthonymclin.com&gt;


[videojs]: http://videojs.com/
