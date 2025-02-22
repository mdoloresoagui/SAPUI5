sap.ui.define([
    "logaligroup/sapui5/model/InvoicesFormatter",
    "sap/ui/model/resource/ResourceModel"
],
    /**
     * @param {typeof sap.ui.model.resource.ResourceModel} ResourceModel
     */
    function (InvoicesFormatter, ResourceModel) {
        QUnit.module("Qnvoices Status", {
            beforeEach: function () {
                this._oResourceModel = new ResourceModel({
                    bundleUrl: sap.ui.require.toUrl("logaligroup/sapui5/") + "i18n/i18n.properties"
                });
            },

            afterEach: function () {
                this._oResourceModel.destroy();
            }
        });

        QUnit.test("Return the Invoice Status", function (assert) {
            let oModel = this.stub(); //simulación modelo-controlador-vista
            oModel.withArgs("i18n").returns(this._oResourceModel);

            let oViewStub = {
                getModel: oModel
            };

            let oControllerStub = {
                getView: this.stub().returns(oViewStub)
            };

            let fnIsolatedFormatter = InvoicesFormatter.invoiceStatus.bind(oControllerStub);
            assert.strictEqual(fnIsolatedFormatter("A"), "New", "El estado A para la factura es correcto");
            assert.strictEqual(fnIsolatedFormatter("B"), "In progress", "El estado B para la factura es correcto");
            assert.strictEqual(fnIsolatedFormatter("C"), "Done", "El estado C para la factura es correcto");

        });
    });