# cloudapp with node.js

So the most convenient thing about [cloudapp][] (aside from unlimited free storage) is that you can do a screenshot, and it auto-uploads and gives you a URL to share it.

The annoying part is - only available to Mac users. ;-)

## My take

I'm using [Dropbox][] a lot, so I build this for Dropbox. It's a simple _file access monitor_ written in node.js which when you save a file in a designated folder, will open it in the browser - then copy and paste to share it.

Even though I wrote this today, this is not an official [node.js knockout][ko] project.

## HowTo

 * install [node.js][nodejs]
 * `git clone` this repository
 * edit and rename `config.js-dist` to `config.js`
 * start: `node node.js`

I tested this on Ubuntu 10.04, with Google Chrome and obviously a working Dropbox account. :-)

[cloudapp]: http://www.getcloudapp.com/
[nodejs]: http://nodejs.org/#build
[Dropbox]: http://www.dropbox.com/referrals/NTI2MTQzOTg5
[ko]: http://nodeknockout.com/