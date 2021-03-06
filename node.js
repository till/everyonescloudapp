/**
 * This nodejs script monitors a given directory. If new files appear, the public URL is displayed.
 *
 * @author  Till Klampaeckel <till@php.net>
 * @license New BSD License
 */
var fs = require('fs'), path = require('path'), sys = require('sys');

var cloudapp = require('./lib/everyonescloudapp');
var config   = require('./etc/config');
var bitly    = require('./lib/bit.ly.js');

var screenshotPath = config.getPath();

cloudapp.validateStore(screenshotPath);

var allFiles = cloudapp.filter(fs.readdirSync(screenshotPath));
var newFiles = [];

var publicUrl  = "http://dl.dropbox.com/u/";
    publicUrl += config.dropboxUser() + "/"
    publicUrl += path.basename(screenshotPath) + "/";

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

    if (allFiles.compare(newFiles) == true) { 
        return;
    }

    var reallyNew = newFiles.getDiff(allFiles);

    // allow 10 seconds for the files to upload
    setTimeout(function(){
        app.handleNew(reallyNew);
    }, 10000);

    
});

function Application () {
    this.config;
    this.url;
}

/**
 * Inherit.
 */
Application.prototype = new process.EventEmitter();

/**
 * Handle all new files. We'll attempt to shorten them with bit.ly.
 *
 * When done we emit 'shortened' - always.
 *
 * @param array reallyNew
 *
 * @return void
 */
Application.prototype.handleNew = function (reallyNew) {

    for (var x = 0; x < reallyNew.length; x++) {

        this.url = publicUrl + reallyNew[x];

        var shortie = bitly.shorten(
            this.url,
            this.config.getBitlyLogin(),
            this.config.getBitlyKey()
        );

        if (shortie != '') {
            this.url = shortie;
        }

        this.emit('shortened');
    }
}

/**
 * Set the config.
 *
 * @param config config
 *
 * @return void
 */
Application.prototype.setConfig = function (config) {
    this.config = config;
}

var app = new Application();
app.setConfig(config);
app.on('shortened', function() {
    cloudapp.copy(this.url);
    cloudapp.openUrl(this.url, config.getBrowser());
});


/* helpers */

/**
 * Allows us to check if arrays are identical.
 *
 * @param array testArr
 *
 * @return boolean
 * @link   http://www.hunlock.com/blogs/Mastering_Javascript_Arrays
 */
Array.prototype.compare = function(testArr) {

    if (this.length != testArr.length) {
        return false;
    }

    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) {
                return false;
            }
        }
        if (this[i] !== testArr[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Find the difference between two arrays.
 *
 * @param array testArr
 *
 * @return array
 */
Array.prototype.getDiff = function (testArr) {

    if (this.length == 0) {
        return testArr;
    }

    var lookup = {};

    for (var j = 0; j < testArr.length; j++) {
        lookup[testArr[j]] = testArr[j];
    }

    var difference = [];

    for (var y =0; y < this.length; y++) {

        if (typeof lookup[this[y]] == 'undefined') {
            difference.push(this[y]);
        } 
    }

    return difference;
}