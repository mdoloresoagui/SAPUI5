sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "logaligroup/employees/model/formatter"
],
    function (Controller, formatter) {
        return Controller.extend("logaligroup.employees.controller.EmployeeDetails", {
            formatter: formatter,
            onInit: function () {
            },
            onCreateInci: function () {
                var TbIncident = this.getView().byId("tableInci"),
                    newIncident = sap.ui.xmlfragment("logaligroup.employees.fragment.NewIncidence", this),
                    incidentModel = this.getView().getModel("incidenceModel"),
                    oData = incidentModel.getData(),
                    index = oData.length;

                oData.push({ index: index + 1 });
                incidentModel.refresh();
                newIncident.bindElement("incidenceModel>/" + index);
                TbIncident.addContent(newIncident);
            },
            onDeleteIncident: function (oEvent) {
                var TbIncident = this.getView().byId("tableInci"),
                    rowIncident = oEvent.getSource().getParent().getParent(),
                    incidenceModel = this.getView().getModel("incidenceModel"),
                    oData = incidenceModel.getData(),
                    contextObject = rowIncident.getBindingContext("incidenceModel");

                oData.splice(contextObject.index - 1, 1);
                for (var i in oData) {
                    oData[i].index = parseInt(i) + 1;
                };

                incidenceModel.refresh();
                TbIncident.removeContent(rowIncident);

                for (var j in TbIncident.getContent()) {
                    TbIncident.getContent()[j].bindElement("incidenceModel>/" + j);
                }
            }
        });
    });