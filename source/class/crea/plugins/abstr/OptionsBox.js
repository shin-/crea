qx.Class.define("crea.plugins.abstr.OptionsBox", {
    type: "abstract",
    extend: qx.ui.container.Composite,
    construct: function() {
        this.base(arguments);
        this.emitter = new qx.event.Emitter();
    },
    members: {
        emitter: null,
        addToPanel: function(options) {
            this.debug(this.classname);
            var namespace = this.classname.split('.').slice(0, -1).join('.');
            this.emitter.emit("plugin_enable", [namespace, options]);
        }
    }
});