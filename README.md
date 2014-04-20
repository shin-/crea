CREA
====

Connected Roleplay Enhancement Application.

## Manifesto

* CREA is a project that aims to help 
[tabletop RPG](http://en.wikipedia.org/wiki/Tabletop_role-playing_game) players organize and play games
online in a real-time manner. 
* While it won't propose to implement every possible game system in existence, it is designed from the
ground up to be highly extensible through a system of plugins.
* As such, CREA is an open-source, free for non-commercial use project.
* While its core purpose is to enable tabletop RPG to be played seamlessly online, the plugin system should
be extensible enough to allow any real-time social activity to happen on its framework.

## Planned features

* Highly flexible plugin system
* Real-time events
* Prepackaged native plugins for common tasks such as image sharing, live chat or dice roll
* Additional plugins for free-to-use game systems (d20, etc.)
* Authentication and ACLs (player identifcation, private plugins, DM rights)
* Session management
* Documentation on how to write additional plugins
* Documentation on how to install external plugins
* Plugin packaging and auto-installer

## Technicalities

This is a web application developed in Javascript using 

* [qooxdoo](http://qooxdoo.org/) as a client-side framework
* [node.js](http://nodejs.org) on the server-side
    * More specifically the [express](http://expressjs.com) microframework

## Installing / running

These instructions will evolve as the project matures. Right now it's aimed at producing
a development version of the project.

You need node.js v0.10.x and Python 2.x to follow these instructions.

* Download the Qooxdoo >=3.5 SDK from [here](http://qooxdoo.org/downloads).
* Extract the qx folder in this project's parent folder.
* Run `./generate.py source-all`.
* Do the following:

        path/to/crea $ cd server/public
        path/to/crea/server/public $ ln -s ../../source .
        path/to/crea/server/public $ ln -s ../../../qx .

* Inside the `server/` directory, run `npm install`
* Go to the `server/` directory and run `node app.js`
* Point your browser to http://0.0.0.0:3000/source/index.html

## Q&A

> Why make this project?

I want to recapture the feeling of tabletop sessions with friends who live all across the country.
It's also easier to organize a session when you don't have to worry about finding a place,
going there and coming back.
And it's an interesting technical challenge when framed like that.
 
> Why choose Qooxdoo? It's obscure! You should use Angular/Knockout/Ember/Backbone/Batman/wtfjs

In my limited experience, Qooxdoo is actually the best at enabling creation of rich web applications
with limited resources. While I don't agree with all its design choices, I still feel it 
is a relatively flexible framework and I enjoy working with it.

> Why no D&D/WoD/etc. plugins?

Legal reasons.

> It seems like the system can only support one group of players at a time. What gives?

This may change in the future, right now I feel this prevents abuse if a corporation were to take it and try to make it a paying service, which I don't want to see happen.
