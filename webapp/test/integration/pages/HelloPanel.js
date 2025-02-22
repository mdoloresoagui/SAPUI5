sap.ui.define([
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/Press"
],
    /**
     * @param {typeof sap.ui.test.Opa5} Opa5
     * @param {typeof sap.ui.test.actions.Press} Press
     */
    function (Opa5, Press) {
        Opa5.createPageObjects({
            onTheAppPage: {
                actions: {
                    iSayHelloDialog: function () {
                        return this.waitFor({
                            id: 'BHelloDialog',
                            viewName: "logaligroup.sapui5.view.HelloPanel",
                            actions: new Press(),
                            errorMessage: "No se ha encontrado el texto vinculado al botón"
                        });
                    }
                },
                assertions: {
                    iSeeTheHelloDialog: function () {
                        return this.waitFor({
                            controlType: "sap.m.Dialog",
                            success: function () {
                                Opa5.assert.ok(true, "El dialogo se ha abierto");
                            },
                            errorMessage: "No se ha encontrado el controlador del dialogo"
                        });
                    }
                }
            }
        });

    });
