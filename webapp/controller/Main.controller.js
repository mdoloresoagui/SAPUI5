sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, JSONModel) {
        return Controller.extend("logaligroup.employees.controller.Main", {
            onInit: function () {
                var oJSONModelEmp = new JSONModel(),
                    oJSONModelCtr = new JSONModel(),
                    oJSONModelLayout = new JSONModel(),
                    oView = this.getView();

                oJSONModelEmp.loadData("./localService/mockdata/Employees.json", false);
                oView.setModel(oJSONModelEmp, "Employee");

                oJSONModelCtr.loadData("./localService/mockdata/Countries.json", false);
                oView.setModel(oJSONModelCtr, "Countries");

                oJSONModelLayout.loadData("./localService/mockdata/Layouts.json", false);
                oView.setModel(oJSONModelLayout, "Layouts");

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

                this._bus = sap.ui.getCore().getEventBus();
                this._bus.subscribe("flexible", "showEmployee", this.showEmployeeDetail, this);
            },
            showEmployeeDetail: function (category, nameEvent, path) {
                var detailView = this.getView("").byId("detailEmpView");
                detailView.bindElement("Employee>" + path);
                //Modificar el Layout
                this.getView().getModel("Layouts").setProperty("/ActiveKey", "TwoColumnsMidExpanded");

                //Binding Elements
                var oJSONModelIncident = new JSONModel([]);
                detailView.setModel(oJSONModelIncident, "incidenceModel");
                detailView.byId("tableInci").removeAllContent();
            }
        });
    });