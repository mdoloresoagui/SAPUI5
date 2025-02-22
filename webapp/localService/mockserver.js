sap.ui.define([
    'sap/ui/core/util/MockServer',
    'sap/ui/model/json/JSONModel',
    'sap/base/util/UriParameters',
    'sap/base/Log'
],
    /**
     * @param {typeof sap.ui.core.util.MockServer } MockServer
     * @param {typeof sap.ui.model.json.JSONModel } JSONModel
     * @param {typeof sap.base.util.UriParameters } UriParameters
     * @param {typeof sap.base.Log } Log
     */
    function (MockServer, JSONModel, UriParameters, Log) {
        "use strict";
        var oMockServer,
            _sAppPath = "logaligroup/sapui5/",
            _sJsonFilesPath = _sAppPath + "localService/mockdata";

        var oMockServerInterface = {
            init: function (oOptionParameter) {
                var oOptions = oOptionParameter || {};
                return new Promise(function (fnResolve, fnReject) {
                    var sManifestUrl = sap.ui.require.toUrl(_sAppPath + "manifest.json"),
                        oManifestModel = new JSONModel(sManifestUrl);

                    oManifestModel.attachRequestCompleted(function () {
                        var oUriParam = new UriParameters(window.location.href); //Parametros que componen la URI del navegador
                        var sJsonFilesUrl = sap.ui.require.toUrl(_sJsonFilesPath);
                        var oMainDataSource = oManifestModel.getProperty("/sap.app/dataSources/mainService");
                        var sMetadataUrl = sap.ui.require.toUrl(_sAppPath + oMainDataSource.settings.localUri);

                        var sMockServerUrl = oMainDataSource.uri && new URI(oMainDataSource.uri).absoluteTo(sap.ui.require.toUrl(_sAppPath)).toString();

                        if (!oMockServer) {
                            oMockServer = new MockServer({
                                rootUri: sMockServerUrl
                            });
                        } else {
                            oMockServer.stop();
                        };

                        MockServer.config({
                            autoRespond: true,
                            autoRespondAfter: (oOptions.delay || oUriParam.get("serverDelay") || 500)
                        });

                        oMockServer.simulate(sMetadataUrl, {
                            sMockDataUrl: sJsonFilesUrl,
                            bgenerateMissingMockData: true
                        });

                        var aRequests = oMockServer.getRequests();

                        var fnResponse = function (iErrorCode, sMessage, aRequest) {
                            aRequest.response = function (oXhr) {
                                oXhr.respond(iErrorCode, { "Content-Type": "text/plain;charset=utf-8", sMessage });
                            };
                        };

                        if (oOptions.metadataError || oUriParam.get("metadataError")) {
                            aRequest.foreach(function (aEntry) {
                                if (aEntry.path.toString().indexof("$metadata") > -1) {
                                    fnResponse(500, "metadata Error", aEntry);
                                };
                            });
                        };

                        var sErrorParam = oOptions.errorType || oUriParam.get("errorType");
                        var iErrorCode = sErrorParam === "badRequest" ? 400 : 500;

                        if (sErrorParam) {
                            aRequest.foreach(function (aEntry) {
                                fnResponse(iErrorCode, sErrorParam, aEntry);
                            });
                        };

                        oMockServer.setRequests(aRequests);
                        oMockServer.start();

                        Log.info("Running Mock Data");
                        fnResolve();
                    });
                    oManifestModel.attachRequestFailed(function () {
                        var sError = "Error al cargar la aplicación manifest";
                        Log.error(sError);
                        fnReject(new Error(sError));
                    });
                });
            }
        };

        return oMockServerInterface;
    })