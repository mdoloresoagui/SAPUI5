sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.list.controller.ListTypes", {
            onInit() {
                var oJsonList = new JSONModel();
                oJsonList.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJsonList);
            },
            onShowSelItem: function () {
                var stdList = this.getView().byId("StdList"),
                    selItems = stdList.getSelectedItems(),
                    i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selItems.length === 0) {
                    MessageToast.show(i18nModel.getText("NoSelection"));
                } else {
                    var textMsg = i18nModel.getText("selection");
                    for (var i in selItems) {
                        var context = selItems[i].getBindingContext(),
                            oContext = context.getObject();

                        textMsg = textMsg + "-" + oContext.Material;
                    };
                    MessageToast.show(textMsg);
                }
            },
            onDelSelItem: function () {
                var stdList = this.getView().byId("StdList"),
                    selItems = stdList.getSelectedItems(),
                    i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if (selItems.length === 0) {
                    MessageToast.show(i18nModel.getText("NoSelection"));
                } else {
                    var textMsg = i18nModel.getText("selection");
                    var aId = [];
                    var model = this.getView().getModel();
                    var product = model.getProperty("/Products");

                    for (var i in selItems) {
                        var context = selItems[i].getBindingContext(),
                            oContext = context.getObject();

                        aId.push(oContext.Id);
                        textMsg = textMsg + "-" + oContext.Material;
                    };
                    product = product.filter(function (p) {
                        return !aId.includes(p.Id);
                    });
                    model.setProperty("/Products", product);
                    stdList.removeSelections();
                    MessageToast.show(textMsg);
                }
            },
            onDeleteInputRow: function (oEvent) {
                var selRow = oEvent.getParameter("listItem"),
                    context = selRow.getBindingContext(),
                    splitPath = context.getPath().split("/"),
                    indexSelRow = splitPath[splitPath.length - 1],
                    model = this.getView().getModel(),
                    products = model.getProperty("/Products");

                products.splice(indexSelRow, 1);
                model.refresh();
            }
        });
    });