/**
 * This nodejs script monitors a given directory. If new files appear, the public URL is displayed.
 *
 * @author  Till Klampaeckel <till@php.net>
 * @license New BSD License
 */
var fs = require('fs'), path = require('path'), sys = require('sys');

var cloudapp = require('./everyonescloudapp');
var config   = require('./config');

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

    //sys.puts("All: " + allFiles);
    //sys.puts("New: " + newFiles);

    if (allFiles.compare(newFiles) == true) { 
        return;
    }

    var reallyNew = newFiles.diff(allFiles);

    sys.puts("NEW FILE(S)!");

    for (var i in reallyNew) {
        sys.puts("NEW: " + publicUrl + reallyNew[i]);
    }

    //sys.puts('current mtime is: ' + curr.mtime);
    //sys.puts('previous mtime was: ' + prev.mtime);
});


/* list = fs.readdir(screenshotPath); */

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
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) { 
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
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
Array.prototype.diff = function(testArr) {

    if (this.length == 0) {
        return testArr;
    }

    var lookup = {};

    for (var j in testArr) {
        lookup[testArr[j]] = testArr[j];
    }

    var difference = [];

    for (var i in this) {

        if (typeof lookup[this[i]] == 'undefined') {
            difference.push(this[i]);
        } 
    }

    return difference;
}