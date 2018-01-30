var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  path = require('path'),
  nodemon = require('gulp-nodemon');

// Run Nodemon and connect to BrowserSync
gulp.task('server', function (cb) {
  var called = false;
  return nodemon({

      // Nodemon the dev server
      script: 'server',

      // Watch core server file(s) that require restart on change
      watch: ['server/**/*.*']
    })
    .on('start', function onStart() {

      // Ensure only one call
      if (!called) {
        return cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // Reload connected browsers after a slight delay
      console.log('Reload');
      setTimeout(function () {
        browserSync.reload({
          stream: false
        });
      }, 1000);
    });
});

gulp.task('browser-sync', ['vue'], function () {

  // Config options: http://www.browsersync.io/docs/options/
  browserSync.init({

    // Watch the following files, inject changes or refresh
    // files: ['public/assets/js/**/*.*', 'public/assets/css/**/*.*', 'public/assets/images/**/*.*'],

    // Proxy our Hapi app
    proxy: 'http://localhost:8080',
    // Use the following port for the proxied app to avoid clash
    port: 8000,
    // reloadDelay: 500,
    // injectChanges: true,
    open: true
  });
  console.log('Initiate BrowserSync');
});

// BUILD

gulp.task('default', ['server'],function(cb){
	var called = false;
	return nodemon({

      // Nodemon the dev server
      script: 'build/dev-server.js',

      // Watch core server file(s) that require restart on change
      watch: ['src/**/*.*']
    })
    .on('start', function onStart() {

      // Ensure only one call
      if (!called) {
        return cb();
      }
      called = true;
    })
    .on('restart', function onRestart() {
      // Reload connected browsers after a slight delay
      console.log('Reload');
      setTimeout(function () {
        browserSync.reload({
          stream: false
        });
      }, 1000);
    });
});

// gulp.task('default',['browser-sync']);
