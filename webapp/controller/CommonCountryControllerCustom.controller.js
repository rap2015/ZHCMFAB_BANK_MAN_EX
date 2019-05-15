sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.CommonCountryControllerCustom", {

// ON INIT
	onInit: function () {
		
		// Attach event to Select Payment Method Dropdown, to control the visibility of bank fields
		this.getView().byId("selPaymentMethodId").attachChange(this.onPaymentMethodChg, this);
		var bankId = this.getView().byId("inpBankId");
		var customConfig = bankId.data("searchHelpConfig");
	
		//Removing SWIFT Code filed on Bank F4 help
		customConfig.filterAttributes.pop();

		//Removing Bank Number on Bank F4 help
		customConfig.filterAttributes.pop();

		//Removing SWIFT Code filled in Table
		customConfig.resultListAttributes.splice(3, 1);
	},

	onAfterRendering: function () {
		// Add Bank Type dropedown values for Add Account Scenario
		var selKey = this.getView().byId("selPaymentMethodId").getSelectedKey();
		var rNumber = this.getView().byId("selBankControlKey");
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
		
// Control Visibility of bank fields for payment method K (Check)		
		if (selKey === "K") {
		
			this.clearField("BankId");
			this.clearField("BankControlKey");
			this.clearField("BankAccountNumber");
			
			this.getView().byId("inpBankId").setVisible(false);
			this.getView().byId("inpBankId").setDescription();
			this.getView().byId("selBankControlKey").setVisible(false);
			this.getView().byId("inpBankAccountNumber").setVisible(false);
			
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
	
		if (selKey === "K") {
			
			this.getView().byId("inpBankId").setValue("");
			this.getView().byId("selBankControlKey").setSelectedKey();
			this.getView().byId("inpBankAccountNumber").setValue("");
			
			this.getView().byId("inpBankId").setVisible(false);
			this.getView().byId("inpBankId").setDescription();
			this.getView().byId("selBankControlKey").setVisible(false);
			this.getView().byId("inpBankAccountNumber").setVisible(false);
		} else {
		
			this.getView().byId("inpBankId").setVisible(true);
			this.getView().byId("selBankControlKey").setVisible(true);
			this.getView().byId("inpBankAccountNumber").setVisible(true);
		}
	},
	_handleBankFieldMetaData: function() {

	}

});