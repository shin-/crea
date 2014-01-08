qx.Class.define("crea.plugins.common.dice.Widget", {
    extend: crea.plugins.abstr.Widget,
    construct: function() {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.VBox());
        this._logField = new qx.ui.form.TextArea('');
        this._logField.setReadOnly(true);
        this.add(this._logField);
        this._buttonCtr = new qx.ui.container.Composite();
        this._buttonCtr.setLayout(new qx.ui.layout.HBox());
        this._fillButtonCtr();
        this.add(this._buttonCtr);
    },
    members: {
        _logField: null,
        _buttonCtr: null,

        _roll: function(d) {
            return Math.floor(Math.random() * d) + 1;
        },

        _logRoll: function(res, d) {
            this._logField.setValue(this._logField.getValue() +
                "[00:00.00] Rolled " + res + " out of " + d + "\n");
            this._logField.getContentElement().scrollToY(200000);
        },

        _fillButtonCtr: function() {
            var buttons = [
                [new qx.ui.form.Button("d2"), 2],
                [new qx.ui.form.Button("d4"), 4],
                [new qx.ui.form.Button("d6"), 6],
                [new qx.ui.form.Button("d8"), 8],
                [new qx.ui.form.Button("d10"), 10],
                [new qx.ui.form.Button("d12"), 12],
                [new qx.ui.form.Button("d20"), 20],
                [new qx.ui.form.Button("d100"), 100]
            ]
            buttons.forEach(function(b) {
                b[0].addListener("execute", function() {
                    this._logRoll(this._roll(b[1]), b[1]);
                }, this)
                this._buttonCtr.add(b[0]);
            }, this)
        }
    }
});