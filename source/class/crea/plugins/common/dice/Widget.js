qx.Class.define("crea.plugins.common.dice.Widget", {
    extend: crea.plugins.abstr.Widget,
    construct: function(id) {
        this.base(arguments, id);
        this.setLayout(new qx.ui.layout.VBox());
        this._logField = new crea.ui.LogField();
        this.add(this._logField);
        this._buttonCtr = new qx.ui.container.Composite();
        this._buttonCtr.setLayout(new qx.ui.layout.HBox());
        this._fillButtonCtr();
        this.add(this._buttonCtr);
    },
    members: {
        _logField: null,
        _buttonCtr: null,

        _roll: function(d, cb) {
            return this.io.post('roll', { 'sides': d }, cb);
        },

        _logRoll: function(res, d) {
            this._logField.log("Rolled " + res + " out of " + d);
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
                    this._roll(b[1], (function(result) {
                        this._logRoll(result.result, b[1]);
                    }).bind(this));
                }, this);
                this._buttonCtr.add(b[0]);
            }, this)
        }
    }
});