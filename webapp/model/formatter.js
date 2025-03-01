sap.ui.define([

],
    function () {
        function dateFormat(pdate) {
            var timeDate = 24 * 60 * 60 * 1000;

            if (pdate) {
                var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

                var today = new Date(),
                    dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "yyyy/MM/dd" }),
                    todayFormat = new Date(dateFormat.format(today));

                switch (true) {
                    case pdate.getTime() === todayFormat.getTime(): return oResourceBundle.getText("today");
                    case pdate.getTime() === todayFormat.getTime() + timeDate: return oResourceBundle.getText("tomorrow");
                    case pdate.getTime() === todayFormat.getTime() - timeDate: return oResourceBundle.getText("yesterday");
                    default:
                        return " ";
                }
            }
        }
        return {
            dateFormat: dateFormat
        }
    })