sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.CommonCountryControllerCustom", {

	onInit: function () {
		var selId = this.createId("selPaymentMethodId");
		var selPmMtd = this.byId(selId);
		selPmMtd.attachChange(this.onPaymentMethodChg, this);

		//Dummy
		var bankIdId = this.createId("inpBankId");
		var bankId = this.byId(bankIdId);

		var customConfig = bankId.data("searchHelpConfig");
		//Removing SWIFT Code filed
		customConfig.filterAttributes.pop();
		//Removing SWIFT Code filed from Table
		customConfig.resultListAttributes.splice(3, 1);
	},

	onAfterRendering: function () {
		var selId = this.createId("selPaymentMethodId");
		var selPmMtd = this.byId(selId);
		var selKey = selPmMtd.getSelectedKey();
		if (selKey === "K") {
			var bnkKey = this.byId(this.createId("inpBankId"));
			var bnkCtrlK = this.byId(this.createId("selBankControlKey"));
			var bnkAcN = this.byId(this.createId("inpBankAccountNumber"));
			this.clearField("BankId");
			this.clearField("BankControlKey");
			this.clearField("BankAccountNumber");
			bnkKey.setVisible(false);
			bnkKey.setDescription();
			bnkCtrlK.setVisible(false);
			bnkAcN.setVisible(false);
		}
	},

	onPaymentMethodChg: function (e) {
		var selKey = e.getParameter("selectedItem").getProperty("key");
		var bnkKey = this.byId(this.createId("inpBankId"));
		var bnkCtrlK = this.byId(this.createId("selBankControlKey"));
		var bnkAcN = this.byId(this.createId("inpBankAccountNumber"));
		if (selKey === "K") {
			this.clearField("BankId");
			this.clearField("BankControlKey");
			this.clearField("BankAccountNumber");
			bnkKey.setVisible(false);
			bnkKey.setDescription();
			bnkCtrlK.setVisible(false);
			bnkAcN.setVisible(false);
		} else {
			bnkKey.setVisible(true);
			bnkCtrlK.setVisible(true);
			bnkAcN.setVisible(true);
		}
	},
	_handleBankFieldMetaData: function () {

	}

});