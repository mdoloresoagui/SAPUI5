sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
     */
    function (Controller, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("logaligroup.employees.controller.MasterEmployee", {
            onInit() {
                this._bus = sap.ui.getCore().getEventBus();
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
            onShowCity: function () {
                var oConfigView = this.getView().getModel("ConfigView");

                oConfigView.setProperty("/visibleCity", true);
                oConfigView.setProperty("/visibleBtnCity", false);
                oConfigView.setProperty("/HideBtnCity", true);
            },
            onHideCity: function () {
                var oConfigView = this.getView().getModel("ConfigView");

                oConfigView.setProperty("/visibleCity", false);
                oConfigView.setProperty("/visibleBtnCity", true);
                oConfigView.setProperty("/HideBtnCity", false);
            },
            showOrders: function (oEvent) {
                //Obtenemos el item seleccionado
                var oLinePress = oEvent.getSource(),
                    oContext = oLinePress.getBindingContext("Employee");

                if (!this._oDialogOrder) {
                    this._oDialogOrder = sap.ui.xmlfragment("logaligroup.employees.fragment.DialogOrders", this);
                    this.getView().addDependent(this._oDialogOrder);
                };

                this._oDialogOrder.bindElement("Employee>" + oContext.getPath());
                this._oDialogOrder.open();
            },
            onCloseOrders: function () {
                this._oDialogOrder.close();
            },
            showEmpl: function (oEvent) {
                var path = oEvent.getSource().getBindingContext("Employee").getPath();
                this._bus.publish("flexible", "showEmployee", path);
            }
        });
    });