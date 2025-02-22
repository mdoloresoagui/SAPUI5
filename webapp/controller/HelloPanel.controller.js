sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/base/Log"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.base.Log} Log
     */
    function (Controller, MessageToast, Log) {
        "use strict";
        return Controller.extend("logaligroup.sapui5.controller.HelloPanel", {
            onInit: function () {
            },
            onBeforeRendering:function(){
                window.message = 'Log message - onBeforeRendering';
                Log.info(window.message);
                Log.error(window.message);
            },
            onAfterRendering:function(){
                debugger;
            },
            onShowHello: function () {
                //Lectura del texto i18n
                var oBundle = this.getView().getModel("i18n").getResourceBundle();
                //Lectura propiedades del data model
                var sRecipient = this.getView().getModel().getProperty("/recipient/name");
                var sMessage = oBundle.getText("MsgHelloText", [sRecipient]);
                MessageToast.show(sMessage);
            },
            onOpenDialog: function () {
                this.getOwnerComponent().openHelloDialog();
            }
        });
    }); 