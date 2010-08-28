/**
 * This nodejs script monitors a given directory. If new files appear, the public URL is displayed.
 *
 * @author  Till Klampaeckel <till@php.net>
 * @license New BSD License
 */

var sys = require('sys'),
    path = require('path'),
    exec = require('child_process').exec;

exports.filter = function (files) {
    return files.filter(ignoreByPattern);
}

exports.validateStore = function (p) {
    path.exists(p, function (exists) {
        if (exists == false) {
            throw "Path "+ p + " does not exist.";
        }
    });
    if (p.substr(-1, 1) == '/') {
        throw "No trailing slash.";
    }
}

exports.openUrl = function (url, browser) {
    var foo;
    foo = exec(browser + ' "' + url + '"', 
        function (error, stdout, stderr) {
            //sys.print('stdout: ' + stdout);
            //sys.print('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
}

/**
 * This filters the array. Function is not exposed.
 *
 * @param string file The filename to filter.
 *
 * @return boolean
 */
function ignoreByPattern(file) {

    var ignorePattern = ['.goutputstream*', '*.psd', 'test.txt'];
    var pattern;

    for (var i in ignorePattern) {

        pattern = ignorePattern[i].toString();

        if (pattern.substr(-1, 1) == '*') {

            start = 0;
            end   = (pattern.length-1);

            //sys.puts("END: " + file + " / " + pattern);

            if (file.substr(start, end) == pattern.substr(0, end)) {
                return false;
            }

        } else if (pattern.substr(0, 1) == '*') {
            //sys.puts("START: ");

            start = "-" + pattern.length;
            end   = pattern.length;

            if (file.substr(start, end) == pattern.substr(1, pattern.length)) {
                return false;
            }

        } else { // no wildcard
            //sys.puts("NONE: " + file + " / " + pattern);

            if (file == pattern) {
                return false;
            }

        }

        //sys.puts(pattern);
    }
    return true;
}