qx.Class.define("crea.plugins.common.dice.OptionsBox", {
    extend: crea.plugins.abstr.OptionsBox,
    construct: function() {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox());
        this._execButton = new qx.ui.form.Button("Create!");
        this.add(this._execButton);
        this._execButton.addListener("execute", function(e) {
            this.addToPanel();
        }, this);
    },
    members: {
        _execButton: null
    }
});