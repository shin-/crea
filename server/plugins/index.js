var fs = require('fs');

module.exports.start = function(app) {
    plugins = [];
    fs.readdirSync('./plugins').forEach(function(plugin) {
        if (plugin == '.' || plugin == '..' || plugin == 'index.js') {
            return;
        }
        var mod = require('./' + plugin);
        if (!(mod.root && mod.routes)) {
            console.error("Plugin " + plugin + " not loaded, missing mandatory routes information");
            return;
        }

        if (!mod.name || !mod.ns) {
            console.error("Plugin " + plugin + " not loaded, missing mandatory metadata");
        }

        ['post', 'get', 'put', 'delete'].forEach(function(method) {
            for (var route in mod.routes[method]) {
                console.log("[" + method + "] Plugin " + mod.name + " (" + 
                    mod.ns + ") declares " + mod.root + route);
                app[method](mod.root + route, mod[mod.routes[method][route]](mod));
            }
        });
        plugins.push({"name": mod.name, "ns": mod.ns});
    });

    app.get('/plugins', function(req, res) {
        res.send(plugins);
    });

    app.get('/state', (function(req, res) {
        res.send(this.state());
    }).bind(this));

    app.post('/register', (function(req, res) {
        var namespace = req.body.namespace,
            options = req.body.options;
        this.register(namespace, options);
    }).bind(this));

    this._state = [];
}

module.exports.register = function(namespace, options) {
    this._state.push({
        namespace: namespace,
        options: options
    });
}

module.exports.state = function() {
    return this._state;
}