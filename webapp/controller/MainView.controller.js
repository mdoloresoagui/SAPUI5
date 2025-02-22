sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
     * @param {typeof sap.m.MessageToast} MessageToast
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
        "use strict";

        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit() {
                var oJSONModelEmp = new JSONModel(),
                    oJSONModelCtr = new JSONModel(),
                    oView = this.getView();

                oJSONModelEmp.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJSONModelEmp, "Employee");

                oJSONModelCtr.loadData("./localService/mockdata/Countries.json", false);
                oView.setModel(oJSONModelCtr, "Countries");

                //JSON - Configuración visibilidad Ciudad
                var oJSONConfigView = new JSONModel({
                    visibleID: true,
                    visibleName: true,
                    visibleCountry: true,
                    visibleCity: false,
                    visibleBtnCity: true,
                    HideBtnCity: false
                });
                oView.setModel(oJSONConfigView, "ConfigView");
            },
            onFilter: function () {
                var oJsonCtr = this.getView().getModel("Countries").getData(),
                    oList = this.getView().byId("tbEmpl"),
                    oBinding = oList.getBinding("items"),
                    filters = [];

                if (oJsonCtr.EmployeeId !== '') {
                    filters.push(new Filter("EmployeeID", FilterOperator.EQ, oJsonCtr.EmployeeId));
                };
                if (oJsonCtr.CountryKey !== '') {
                    filters.push(new Filter("Country", FilterOperator.EQ, oJsonCtr.CountryKey));
                };
                oBinding.filter(filters);
            },
            onClearFilter: function () {
                var oModel = this.getView().getModel("Countries");
                oModel.setProperty("/EmployeeId", '');
                oModel.setProperty("/CountryKey", '');
            },
            showPostalCode: function (oEvent) {
                var itemPressed = oEvent.getSource(),
                    oContext = itemPressed.getBindingContext("Employee"),
                    objectContext = oContext.getObject();

                MessageToast.show(objectContext.PostalCode);
            },
            onShowCity: function(){
                var oConfigView = this.getView().getModel("ConfigView");
                
                oConfigView.setProperty("/visibleCity", true);
                oConfigView.setProperty("/visibleBtnCity", false);
                oConfigView.setProperty("/HideBtnCity", true);
            },
            onHideCity: function(){
                var oConfigView = this.getView().getModel("ConfigView");

                oConfigView.setProperty("/visibleCity", false);
                oConfigView.setProperty("/visibleBtnCity", true);
                oConfigView.setProperty("/HideBtnCity", false);
            }
            /*Deprecated
            onLiveChangeEmpl: function () {
                var EmplValue = this.byId("InputEmpl"),
                    textEmpl = EmplValue.getValue();

                if (textEmpl.length === 6) {
                    //EmplValue.setDescription("OK");
                    this.byId("LbCountry").setVisible(true);
                    this.byId("slCountry").setVisible(true);
                } else {
                    //EmplValue.setDescription("Not OK");
                    this.byId("LbCountry").setVisible(false);
                    this.byId("slCountry").setVisible(false);
                };
            }*/
        });
    });