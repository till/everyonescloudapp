# cloudapp with node.js

So the most convenient thing about [cloudapp][] (aside from unlimited free storage) is that you can do a screenshot, and it auto-uploads and gives you a URL to share it.

The annoying part is - only available to Mac users. ;-)

## My take

I'm using [Dropbox][] a lot, so I build this for Dropbox. It's a simple _file access monitor_ written in node.js which when you save a file in a designated folder, will open it in the browser and *copy it to the clipboard* so you can _CTRL+v_ away. ;-) And the URL in your clipboard will be shortened with bit.ly. Yay!

Even though I wrote this today, this is not an official [node.js knockout][ko] project.

## HowTo

 * install `xclip`: `sudo apt-get install xclip`
 * install [node.js][nodejs]
 * `git clone` this repository
 * edit config:
   * go into `etc/`, edit and rename `config.js-dist` to `config.js`
   * configure bit.ly settings (I should make them optional - sorry)
   * if you don't have Google Chrome, adjust that setting as well
   * create dropbox folder (mine is `/home/till/Dropbox/Public/screenshots`)
 * start: `node node.js`

I tested this on Ubuntu 10.04, with Google Chrome and obviously a working Dropbox account. :-)

## Todo

 * the code lacks robustness
 * refactor, refactor, refactor

... This is a POC. And it works. (I'm always open to pull requests.) 

[cloudapp]: http://www.getcloudapp.com/
[nodejs]: http://nodejs.org/#build
[Dropbox]: http://www.dropbox.com/referrals/NTI2MTQzOTg5
[ko]: http://nodeknockout.com/