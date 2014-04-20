qx.Class.define("crea.Application", {
    extend : qx.application.Standalone,
    members : {
        canvasPanel: null,
        main : function() {
            this.base(arguments);
            this.io = new crea.utils.IoHelper();

            if (qx.core.Environment.get("qx.debug")) {
                qx.log.appender.Native;
                qx.log.appender.Console;
            }

            var pluginRegistryPanel = new crea.ui.PluginRegistryPanel();
            this.canvasPanel = new qx.ui.container.Composite();
            this.canvasPanel.setLayout(new qx.ui.layout.Flow());
            var doc = this.getRoot();
            doc.add(pluginRegistryPanel, {
                right: 20, top: 20, width: "15%", height: "100%"
            });
            doc.add(this.canvasPanel, {
                left: 5, top: 5, width: "84%", height: "100%"
            });

            this.io.get('state', (function(state) {
                state.forEach(function(plugin) {
                    this.enablePlugin([plugin.namespace, plugin.options]);
                }, this);
            }).bind(this));

            pluginRegistryPanel.emitter.on(
                "plugin_enable", this.registerPlugin, this
            );
        },
        enablePlugin: function(data) {
            var namespace = data[0],
                opts = data[1];
            var classname = namespace + ".Widget";
            var cls = qx.Class.getByName(classname);
            if (cls == null) {
                this.error("No class found: " + classname);
                return;
            }
            this.canvasPanel.add(new cls(opts));
        },
        registerPlugin: function(data) {
            var namespace = data[0],
                opts = data[1];
            this.io.post('register', {
                'namespace': namespace,
                'options': opts
            });
            this.enablePlugin(data);
        }
    }
});
