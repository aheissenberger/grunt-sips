/*
 * grunt-sips
 * https://github.com/aheissenberger/grunt-sips
 *
 * Copyright (c) 2013 Andreas Heissenberger
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  var cp = require('child_process')
      , f = require('util').format
      , _ = grunt.util._
      , log = grunt.log
      , verbose = grunt.verbose;

  grunt.registerMultiTask('sips', 'image manipulation on Mac OSX', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      parameters: '-s format jpeg -s formatOptions low',
    });
    var cmd;
    var data = this.data
          , execOptions = {}
          , stdout = data.stdout !== undefined ? data.stdout : true
          , stderr = data.stderr !== undefined ? data.stderr : true
          , callback = _.isFunction(data.callback) ? data.callback : function() {}
          , exitCode = data.exitCode || 0
          , command
          , childProcess
          , args = [].slice.call(arguments, 0)
          , done = this.async();

        // allow for command to be specified in either
        // 'command' or 'cmd' property
        command = '/usr/bin/sips ' + options.parameters + ' ';

        data.cwd && (execOptions.cwd = data.cwd);
        data.maxBuffer && (execOptions.maxBuffer = data.maxBuffer);

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        cmd = command + JSON.stringify(filepath) + ' --out ' + JSON.stringify(f.dest);
        verbose.subhead(cmd);
        childProcess = cp.exec(cmd, execOptions, callback);

        stdout && childProcess.stdout.on('data', function (d) { log.write(d); });
        stderr && childProcess.stderr.on('data', function (d) { log.error(d); });

        childProcess.on('exit', function(code) {
          if (code !== exitCode) {
            log.error(f('Exited with code: %d.', code));
            return done(false);
          }

          //verbose.ok(f('Exited with code: %d.', code));
          done();
        });

      }) 

      // Print a success message.
      grunt.log.writeln('Files converted with sips "' + options.parameters + '" to "' + f.dest + '".');
    });
  });

};
