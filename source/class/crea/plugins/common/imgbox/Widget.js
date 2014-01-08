qx.Class.define("crea.plugins.common.imgbox.Widget", {
    extend: crea.plugins.abstr.Widget,
    construct: function(imgUrl) {
    	this.base(arguments);
    	this.setLayout(new qx.ui.layout.HBox());
    	this.add(new qx.ui.basic.Image(imgUrl));
    }
});