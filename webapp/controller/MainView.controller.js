sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * 
     * @param {typeof sap.ui.core.mvc.Controller} Controller 
     */
    function (Controller) {
        "use strict";

        return Controller.extend("logaligroup.employees.controller.MainView", {
            onInit() {
            },
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
            }
        });
    });