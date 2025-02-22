sap.ui.define([
    "sap/ui/core/UIComponent",
    "logaligroup/sapui5/model/Models",
    "sap/ui/model/resource/ResourceModel",
    "./controller/HelloDialog",
    "sap/ui/Device"
],
    /**
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     * @param {typeof sap.ui.Device} Device
     */
    function (UIComponent, Models, ResourceModel, HelloDialog, Device) {
        return UIComponent.extend("logaligroup.sapui5.Component", {
            metadata: { manifest: "json" },
            init: function () {
                //call init function del padre
                UIComponent.prototype.init.apply(this, arguments);

                //Data Model
                this.setModel(Models.createRecipient());
                this.setModel(Models.createDeviceModel(), "device");

                //i18n
                var i18nModel = new ResourceModel({ bundleName: "logaligroup.sapui5.i18n.i18n" });
                this.setModel(i18nModel, "i18n");

                //Instancia Dialogo
                this._helloDialog = new HelloDialog(this.getRootControl());

                //Enrutamiento
                this.getRouter().initialize();
            },
            exit: function () {
                this._helloDialog.destroy();
                delete this._helloDialog;
            },
            openHelloDialog: function () {
                this._helloDialog.open();
            },
            getContentDensityClass: function () {
                if (!Device.support.touch){
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
                return this._sContentDensityClass;
            }
        })
    });



