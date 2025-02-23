sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Label"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel 
     * @param {typeof sap.ui.model.Filter} Filter 
     * @param {typeof sap.ui.model.FilterOperator} FilterOperator 
     * @param {typeof sap.m.MessageToast} MessageToast
     * @param {typeof sap.m.ColumnListItem} ColumnListItem
     * @param {typeof sap.m.Label} Label
     */
    function (Controller, JSONModel, Filter, FilterOperator, MessageToast, ColumnListItem, Label) {
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
                var TbOrders = this.getView().byId("TbOrders"),
                    itemPress = oEvent.getSource(),
                    oContext = itemPress.getBindingContext("Employee"),
                    objectContext = oContext.getObject(),
                    orders = objectContext.Orders,
                    orderItems = [];

                TbOrders.destroyItems();

                for (var i in orders) {
                    orderItems.push(new ColumnListItem({
                        cells: [new Label({ text: orders[i].OrderID }),
                                new Label({ text: orders[i].Freight }),
                                new Label({ text: orders[i].ShipAddress })
                        ]
                    }));
                }

                var newTable = new sap.m.Table({
                    width: "auto",
                    columns: [new sap.m.Column({ header: new Label({ text: "{i18n>orderId}" }) }),
                              new sap.m.Column({ header: new Label({ text: "{i18n>freight}" },) }),
                              new sap.m.Column({ header: new Label({ text: "{i18n>shipAddress}" }) })
                    ],
                    items: orderItems
                }).addStyleClass("sapUiSmallMargin");

                TbOrders.addItem(newTable);

                //Second Table
                var newTableJson = new sap.m.Table(),
                    columnOrderId = new sap.m.Column(),
                    labelOrderId = new Label(),
                    cellOrderId = new Label(),
                    columnFreight = new sap.m.Column(),
                    labelFreight = new Label(),
                    cellFreight = new Label(),
                    columnShipAdd = new sap.m.Column(),
                    labelShipAdd = new Label(),
                    cellShipAdd = new Label(),
                    columnListItemJson = new ColumnListItem(),
                    oBindingInfo = { model : "Employee", 
                                     path  : "Orders",
                                     template : columnListItemJson };
                    

                newTableJson.setWidth("auto");
                newTableJson.addStyleClass("sapUiSmallMargin");

                //OrderID
                labelOrderId.bindProperty("text", "i18n>orderId");
                columnOrderId.setHeader(labelOrderId);
                newTableJson.addColumn(columnOrderId);
                cellOrderId.bindProperty("text", "Employee>OrderID");
                columnListItemJson.addCell(cellOrderId);
                //Freight
                labelFreight.bindProperty("text", "i18n>freight");
                columnFreight.setHeader(labelFreight);
                newTableJson.addColumn(columnFreight);
                cellFreight.bindProperty("text", "Employee>Freight");
                columnListItemJson.addCell(cellFreight);
                //ShipAddress
                labelShipAdd.bindProperty("text", "i18n>shipAddress");
                columnShipAdd.setHeader(labelShipAdd);
                newTableJson.addColumn(columnShipAdd);
                cellShipAdd.bindProperty("text", "Employee>ShipAddress");
                columnListItemJson.addCell(cellShipAdd);

                newTableJson.bindAggregation("items", oBindingInfo);
                newTableJson.bindElement("Employee>" + oContext.getPath());

                TbOrders.addItem(newTableJson);
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
            },
            showPostalCode: function (oEvent) {
                var itemPressed = oEvent.getSource(),
                    oContext = itemPressed.getBindingContext("Employee"),
                    objectContext = oContext.getObject();

                MessageToast.show(objectContext.PostalCode);
            }*/
        });
    });