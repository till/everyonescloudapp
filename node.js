/*
 * @author  Till Klampaeckel <till@php.net>
 * @license New BSD License
 */
var fs = require('fs'), path = require('path'), sys = require('sys');

var cloudapp = require('./everyonescloudapp');
var config   = require('./config');

var screenshotPath = "/home/till/Dropbox/Public/screenshots/";

sys.puts("Path: " + screenshotPath);

fs.stat(screenshotPath, function (err, stats) {
    if (err) {
        throw err;
    }
    //console.log('stats: ' + JSON.stringify(stats));
});

var allFiles = cloudapp.filter(fs.readdirSync(screenshotPath));
var newFiles = [];

/**
 * Figure out if something happened inside the directory.
 */
fs.watchFile(screenshotPath, function (curr, prev) {

    if (curr.mtime == prev.mtime) {
        return;
    }

    // block
    newFiles = fs.readdirSync(screenshotPath);
    newFiles = cloudapp.filter(newFiles);

    sys.puts("All: " + allFiles);
    sys.puts("New: " + newFiles);

    //sys.puts('current mtime is: ' + curr.mtime);
    //sys.puts('previous mtime was: ' + prev.mtime);
});


/* list = fs.readdir(screenshotPath); */
