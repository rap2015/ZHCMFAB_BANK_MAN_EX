function initModel() {
	var sUrl = "/sap/opu/odata/sap/ZHPY_BANK_UTIL_SRV/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}