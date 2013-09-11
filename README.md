# grunt-sips

> image manipulation on Mac OSX with sips. Change image format (jpeg|tiff|png|gif|jp2|pict|bmp|qtif|psd|sgi|tga), size, crop, rotate, flip

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sips --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sips');
```

## The "sips" task

### Overview
In your project's Gruntfile, add a section named `sips` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sips: {
    options: {
      // Task-specific options go here.
      parameters: '-s format jpeg -s formatOptions low',
    },
    your_target: {
      src: ['src/*.png'],
      dest: 'dest/img',
    },
  },
})
```

### Options

#### options.parameters
Type: `String`
Default value: `'-s format jpeg -s formatOptions low'`

Convert the image to JPEG in LOW quality.

For all Options of `sips` look into the [man pages](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/sips.1.html).

`-z <height in pixels> <width in pixel>` this one alters the aspect ratio of your image if the specified size has a different ratio
`-Z <max. heightwidth in pixels>` this defines the maximum dimensions and if the original images don’t fit the specified value in either height or width, they will be resized to the point where they fit both. Keeps the aspect ratio.
In most cases -Zshould do the trick but in case you only want or only can provide either height or width you can use the following parameters, both respecting aspect ratio:

`--resampleWidth <width in pixel>`
`--resampleHeight <height in pixels>`

##### EXAMPLES of resize parameters

resizing an image of any size to 1024x768 (ignoring aspect ratio)
`-z 768 1024 example.png` 
Note: Keep in mind the right order

resizing an image of 1423x1066 to fit in 1024x1024 (retaining aspect ratio)
`--resampleHeightWidthMax 1024 example.png` 
Note: Resulting image is 1024x759. As it is retaining the aspect ratio we only provide one pixel value, if you are decreasing the size of the image use the bigger value, usually the width.

resiszing an image of 825x978 to a height of 489px (retaining aspect ratio)
`--resampleHeight 489 example.png` 
Note: Resulting image is 413x489.

resizing all PNG-images in your working directory to 1024x768 (ignoring aspect ratio)
`-z 768 1024 *.png` 

resizing any images in a specified folder to fit a width of 1024 (retaining aspect ratio)
`--resmpleWidth 1024 /path/to/directory/*` 


This examples where posted in [Mac](http://www.ainotenshi.org/818/resizing-images-using-the-command-line) by [Julian Saraceni](http://www.ainotenshi.org/author/mrigns).

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  sips: {
    options: {
      parameters: '-s format jpeg -s formatOptions low',
    },
    your_target: {
      src: ['src/*.png','src2/*.gif'],
      dest: 'dest/img',
    },
  },
})
```



## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
