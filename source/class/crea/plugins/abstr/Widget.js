qx.Class.define("crea.plugins.abstr.Widget", {
    type: "abstract",
    extend: qx.ui.container.Composite,
    construct: function() {
        this.base(arguments);
        var namespace = this.classname.split('.').slice(2, -1).join('.');
        this.io = new crea.utils.IoHelper(namespace);
    }
});