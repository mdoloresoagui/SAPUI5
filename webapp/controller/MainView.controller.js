sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
     */
    function (Controller, JSONModel, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit() {
                var oJSONModel = new JSONModel(),
                    oView = this.getView(),
                    i18nBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                oJSONModel.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJSONModel);
            },
            onFilter: function(){
                var oJson = this.getView().getModel().getData(),
                    oList = this.getView().byId("tbEmpl"),
                    oBinding = oList.getBinding("items"),
                    filters = [];
                
                if(oJson.EmployeeId !== ''){
                    filters.push( new Filter("EmployeeID", FilterOperator.EQ, oJson.EmployeeId));
                };
                if(oJson.CountryKey !== ''){
                    filters.push( new Filter("Country", FilterOperator.EQ, oJson.CountryKey));
                };
                oBinding.filter(filters);
            },
            onClearFilter: function(){
                var oModel = this.getView().getModel();
                    oModel.setProperty("/EmployeeId", '');
                    oModel.setProperty("/CountryKey",'');
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