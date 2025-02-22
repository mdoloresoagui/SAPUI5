sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.routing.History} History
     * @param {typeof sap.ui.core.UIComponent} UIComponent
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, History, UIComponent, MessageToast) {
        "use strict";
        return Controller.extend("logaligroup.sapui5.controller.Details", {
            _onObjectMatch: function (oEvent) {
                //reset control
                this.byId("rating").reset();

                this.getView().bindElement({
                    path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").invoicePath),
                    model: "northwind"
                });
            },
            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("Details").attachPatternMatched(this._onObjectMatch, this);
            },
            onNavBack: function () {
                const oHistory = History.getInstance();
                const sPreviousHash = oHistory.getPreviousHash();

                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    const oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("RouteMain", {}, true);
                }
            },
            onRatingChange: function (oEvent) {
                const fValue = oEvent.getParameter("value"),
                    oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                MessageToast.show(oResourceBundle.getText("ratingConfirm", [fValue]));
            }
        });
    }); 