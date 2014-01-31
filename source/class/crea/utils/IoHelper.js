qx.Class.define("crea.utils.IoHelper", {
    extend: qx.core.Object,
    construct: function(namespace) {
        this._ns = namespace;
        this._rootpath = namespace ? '/' + namespace.replace('.', '/') : '';
    },
    members: {
        _request: function(resource, method, data, cb) {
            var req = new qx.io.request.Xhr(this._rootpath + '/' + resource, method);
            this.debug("[" + method + "] " + this._rootpath + '/' + resource + ' {' + data + '}');
            req.addListener('success', function(e) {
                req = e.getTarget();
                return cb(req.getResponse());
            }, this);
            req.setRequestData(data);
            return req.send();
        },
        get: function(resource, cb) {
            return this._request(resource, 'get', null, cb);
        },
        post: function(resource, data, cb) {
            return this._request(resource, 'post', data, cb);
        }
    }
});