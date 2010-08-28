var sys = require('sys');

exports.filter = function (files) {
    return files.filter(ignoreByPattern);
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

    for (var i in ignorePattern) {

        if (ignorePattern[i].substr(-1, 1) == '*') {
            //sys.puts("END: ");

            start = 0;
            end   = (ignorePattern[i].length-1);

            sys.puts("END: " + file + " / " + ignorePattern[i]);

            if (file.substr(start, end) == ignorePattern[i].substr(0, end)) {
                return false;
            }

        } else if (ignorePattern[i].substr(0, 1) == '*') {
            //sys.puts("START: ");

            start = "-" + ignorePattern[i].length;
            end   = ignorePattern[i].length;

            if (file.substr(start, end) == ignorePattern[i].substr(1, ignorePattern[i].length)) {
                return false;
            }

        } else { // no wildcard
            //sys.puts("NONE: " + file + " / " + ignorePattern[i]);

            if (file == ignorePattern[i]) {
                return false;
            }

        }

        //sys.puts(ignorePattern[i]);
    }
    return true;
}