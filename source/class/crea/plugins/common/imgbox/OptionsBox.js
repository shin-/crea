qx.Class.define("crea.plugins.common.imgbox.OptionsBox", {
    extend: crea.plugins.abstr.OptionsBox,
    construct: function() {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox());
        this.add(new qx.ui.basic.Label("URL:"));
        this._urlField = new qx.ui.form.TextField();
        this.add(this._urlField);
        this._execButton = new qx.ui.form.Button("Create!");
        this.add(this._execButton);
        this._execButton.addListener("execute", function(e) {
            var val = this._urlField.getValue();
            if (!val) {
                return;
            }
            this.addToPanel(this._urlField.getValue());
        }, this);
    },
    members: {
        _urlField: null,
        _execButton: null
    }
});