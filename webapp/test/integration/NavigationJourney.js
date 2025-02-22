sap.ui.define([
    "logaligroup/sapui5/localService/mockserver",
    "sap/ui/test/opaQunit",
    "./pages/HelloPanel"
],
    /**
     * @param {typeof sap.ui.test.opaQunit} opaQunit 
     */
    function (mockserver, opaQunit) {
        QUnit.module("Navigation");
        opaQunit("Debe abrir el dialogo", function (Given, When, Then) {
            mockserver.init();
            //Arreglos
            Given.iStartMyUIComponent({
                componentConfig: {
                    name: "logaligroup.sapui5"
                }
            });
            //Acciones
            When.onTheAppPage.iSayHelloDialog();
            //Aserciones
            Then.onTheAppPage.iSeeTheHelloDialog();
            //Liberación de recursos
            Then.iTeardownMyApp();
        });

    });