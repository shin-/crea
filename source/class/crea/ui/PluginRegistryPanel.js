qx.Class.define("crea.ui.PluginRegistryPanel", {
    extend: qx.ui.container.Composite,
    construct: function() {
        this.base(arguments);
        this.emitter = new qx.event.Emitter();
        this.io = new crea.utils.IoHelper();
        var layout = new qx.ui.layout.VBox();
        this.setLayout(layout);
        this._addListWidget();
        this._addOptionsBox();
        this._addHooks();
    },
    members: {
        _list: null,
        _optionsBox: null,
        emitter: null,

        _getPluginList: function(cb, ctx) {
            this.io.get('plugins', cb.bind(ctx));
        },
        _getPluginOptions: function(obj) {
            var namespace = obj.getNs();
            var cls = qx.Class.getByName(namespace + ".OptionsBox");
            if (cls) {
                return new cls();
            }
            return new qx.ui.basic.Label("No options box for " + namespace);
        },
        _addListWidget: function() {
            var list = new qx.ui.list.List();
            var delegate = {
                sorter: function(a, b) {
                    return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
                }
            };
            this._list = list;
            list.setDelegate(delegate);
            list.setLabelPath("name");

            this._getPluginList(function(data) {
                var model = qx.data.marshal.Json.createModel(data);
                this._list.setModel(model);
            }, this)
            this.add(list);
        },
        _addHooks: function() {
            this._list.getSelection().addListener("change", function(e) {
                if (!this._optionsBox) {
                    this.debug("PluginRegistryPanel#_optionsBox is NULL");
                    return;
                }
                this._optionsBox.removeAll();
                var selection = this._list.getSelection().getItem(0);
                this._optionsBox.add(this._getPluginOptions(selection));
                this._optionsBox.getChildren()[0].emitter.on(
                    "plugin_enable",
                    function(e) {
                        this.debug("PLUGIN ENABLE _______\n" + e);
                        this.emitter.emit("plugin_enable", e);
                    },
                    this
                );
            }, this);
        },
        _addOptionsBox: function() {
            var box = new qx.ui.groupbox.GroupBox("Plugin options");
            box.setLayout(new qx.ui.layout.VBox());
            this.add(box);
            this._optionsBox = box;
        }
    }
})