/**
 * Small module to interface bit.ly.
 *
 * @author  Till Klampaeckel <till@php.net>
 * @license New BSD License
 */
var http = require('http'),
    sys = require('sys'),
    url = require('url');

/**
 * @param string url
 * @param string username
 * @param string key
 */
exports.shorten = function (dropboxUrl, username, key) {

    var endpoint  = "http://api.bit.ly/v3/shorten?";
        endpoint += "&login=" + username;
        endpoint += "&apiKey=" + key;
        endpoint += "&longUrl=" + encodeURI(dropboxUrl);
        endpoint += "&format=json";

    var parsed = url.parse(endpoint, true);

    var request = getRequest(parsed);
    request.end();

    request.on('response', function (response) {

        response.setEncoding('utf8');

        response.on('data', function (chunk) {

            var data = JSON.parse(chunk);
            var code = data.status_code;
            var txt  = data.status_txt;

            if (code != 200) {
                 throw "bit.ly error: " + txt;
            }

            var shortie = data.data.url;

            return shortie;
        });
    });
}

/**
 * Get a request object.
 *
 * @param url parsed
 *
 * @return request
 */
function getRequest(parsed) {

    if (typeof parsed.port == "undefined") {
        parsed.port = 80;
    }

    var client = getClient(parsed.port, parsed.hostname);

    return client.request(
        'GET',
        parsed.pathname + '?' + parsed.search,
        {'host': parsed.hostname}
    );
}

function getClient(port, hostname) {
    return http.createClient(port, hostname);
}