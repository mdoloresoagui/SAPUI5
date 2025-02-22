sap.ui.define([
    'sap/ui/core/Control',
    "sap/m/RatingIndicator",
    "sap/m/Label",
    "sap/m/Button"
],
    /**
     * @param {typeof sap.ui.core.Control} Control 
     * @param {typeof sap.m.RatingIndicator} RatingIndicator
     * @param {typeof sap.m.Label} Label
     * @param {typeof sap.m.Button} Button
     */
    function (Control, RatingIndicator, Label, Button) {
        "use strict";

        return Control.extend("logaligroup.sapui5.control.ProductRating", {
            metadata: {
                properties: {
                    value: { type: "float", defaultValue: 0 }
                },
                aggregations: {
                    _rating: { type: "sap.m.RatingIndicator", multiple: false, visibility: "hidden" },
                    _label: { type: "sap.m.Label", multiple: false, visibility: "hidden" },
                    _button: { type: "sap.m.Button", multiple: false, visibility: "hidden" }
                },
                events: {
                    change: { parameters: { value: { type: "int" } } }
                }
            },
            //inicializacion del controller personalizado
            init: function () {
                this.setAggregation("_rating", new RatingIndicator({
                    value: this.getValue(),
                    iconSize: "2rem",
                    visualMode: "Half",
                    liveChange: this._onRate.bind(this)
                }));
                this.setAggregation("_label", new Label({
                    text: "{i18n>LblProdRatIni}"
                }).addStyleClass("sapUiSmallMargin"));

                this.setAggregation("_button", new Button({
                    text: "{i18n>BtProdRatIni}",
                    press: this._onSubmit.bind(this)
                }).addStyleClass("sapUiTinyMarginTopBottom"));
            },
            _onRate: function (oEvent) {
                const oResourceBundle = this.getModel("i18n").getResourceBundle(),
                    fValue = oEvent.getParameter("value");

                this.setProperty("value", fValue, true);
                this.getAggregation("_label").setText(oResourceBundle.getText("LblProdRatFinal", [fValue, oEvent.getSource().getMaxValue()]));
                this.getAggregation("_label").setDesign("Bold");
            },
            _onSubmit: function (oEvent) {
                const oResourceBundle = this.getModel("i18n").getResourceBundle();
                this.getAggregation("_rating").setEnabled(false);
                this.getAggregation("_button").setEnabled(false);
                this.getAggregation("_label").setText(oResourceBundle.getText("LblProdRatReset"));
                //Dispara el evento
                this.fireEvent("change", {
                    value: this.getValue()
                });
            },
            reset: function () {
                const oResourceBundle = this.getModel("i18n").getResourceBundle();
                this.setValue(0);
                this.getAggregation("_rating").setEnabled(true);
                this.getAggregation("_button").setEnabled(true);
                this.getAggregation("_label").setText(oResourceBundle.getText("LblProdRatIni"));
                this.getAggregation("_label").setDesign("Standard");
            },
            setValue: function (fValue) {
                this.setProperty("value", fValue, true);
                this.getAggregation("_rating").setValue(fValue);
            },
            //Cuando se va a llegar a mostrar la interfaz del usuario, 
            //se llama al renderer
            renderer: function (oRm, oControl) {
                oRm.openStart("div", oControl);
                oRm.class("productRating");
                oRm.openEnd();
                oRm.renderControl(oControl.getAggregation("_rating"));
                oRm.renderControl(oControl.getAggregation("_label"));
                oRm.renderControl(oControl.getAggregation("_button"));
                oRm.close("div");
            }
        })
    });