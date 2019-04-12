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
		
		var rNumId = this.createId("selBankControlKey");
		var rNumber = this.byId(rNumId);
		var oModel = this.getView().getModel("ValueHelpBankControlKey");
		if (!oModel) {
			if (rNumber.getItems().length === 0) {
				rNumber.addItem(new sap.ui.core.Item({
					key: "",
					text: ""
				}));
				rNumber.addItem(new sap.ui.core.Item({
					key: "01",
					text: "Checking"
				}));
				rNumber.addItem(new sap.ui.core.Item({
					key: "02",
					text: "Savings"
				}));
			}
		}
		
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
// removing Country selector form which record type selection
        var pItems = this.oView.getParent().getAggregation("items");
        pItems.forEach(function (form, indx) {
            var formId = form.getId();
            if (formId.indexOf("CountrySelectorForm") > -1) {
                if (form.getTitle()) {
                    form.destroyTitle();
                }
                var fContainer = form.getAggregation("form").getAggregation("formContainers");
                var fElements = fContainer[0].getAggregation("formElements");
                fElements.forEach(function (elem) {
                    var field = elem.getAggregation("fields");
                    field[0].setVisible(false);
                    var label = elem.getAggregation("label");
                    label.setVisible(false);
                });
            }
        });
        //removing Other Bank title
        var obTitle = this.getView().getContent()[0].getTitle();
        if (obTitle) {
            this.getView().getContent()[0].destroyTitle();
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