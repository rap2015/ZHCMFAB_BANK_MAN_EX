sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.CommonCountryDisplayControllerCustom", {

	onAfterRendering: function () {

		var oForm = this.oView.getContent()[0].getAggregation("form");
		if (oForm) {
			var oToolbar = oForm.getAggregation("toolbar");
			oToolbar.getTitleControl().setText("");
		}
	}
});