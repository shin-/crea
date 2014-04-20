qx.Class.define("crea.ui.LogField", {
    extend: qx.ui.form.TextArea,
    construct: function() {
        this.base(arguments, '');
        this.setReadOnly(true);
    },
    statics: {
        time: function() {
            var d = new Date();
            return d.toLocaleTimeString();
        }
    },
    members: {
        log: function(line) {
            this.setValue(this.getValue() +
                "[" + crea.ui.LogField.time() + "] " + line + "\n");
            this.getContentElement().scrollToY(200000);
        }
    }
});