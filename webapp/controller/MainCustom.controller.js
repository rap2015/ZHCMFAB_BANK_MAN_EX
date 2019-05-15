sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.MainCustom", {

	extHookGetCustomEntityNameForVersionId: function (v) {
		// Place your hook implementation code here

		var i18nz = this.getModel("i18nz");
		var dObjLayout = this.getView().byId("BankDetails--displayObjectPageLayout");
		var dObjLayoutC = dObjLayout.getHeaderContent();
		var objPageTitle = dObjLayout.getHeaderTitle();

		var i = 0,
			textAvail, aLength = dObjLayoutC.length;
		for (; i < aLength; i++) {
			if (dObjLayoutC[i].getId() === "HBox1") {
				textAvail = dObjLayoutC[i];
				var msgstrip, oDummyText1;
				msgstrip = dObjLayoutC[i].getFixContent()[0];

				var data1 = this._readPyUtil();
				var msgType = msgstrip.getType();
				var layout1;
				if (data1.d.ZpyLock === true && msgType === "Information") {
					//remove info and add error
					layout1 = msgstrip.getParent();
					layout1.removeAllFixContent();

					oDummyText1 = new sap.m.MessageStrip({
						type: "Error",
						enableFormattedText: true,
						showIcon: true,
						text: "{i18nz>headerPyLkError}"
					}).addStyleClass("sapUiTinyMarginBegin");
					layout1.addFixContent(oDummyText1);
				} else if (data1.d.ZpyLock === false && msgType === "Error") {
					//remove error and add info
					layout1 = msgstrip.getParent();
					layout1.removeAllFixContent();

					var datev1 = data1.d.ZpyNextPydt.slice(4, 6) + "/" + data1.d.ZpyNextPydt.slice(6, 8) + "/" + data1.d.ZpyNextPydt.slice(0, 4);
					oDummyText1 = new sap.m.MessageStrip({
						enableFormattedText: true,
						showIcon: true,
						text: "{i18nz>headerEffDtInfo1} " + datev1 + " {i18nz>headerEffDtInfo2}"
					}).addStyleClass("sapUiTinyMarginBegin");
					layout1.addFixContent(oDummyText1);
				}

			} else {
				dObjLayoutC[i].setVisible(false);
			}
		}
		if (!textAvail) {
			//Remove Picture Button

			var chgPicBtn = this.getView().byId("BankDetails--displayHeader--changePictureBtn");
			if (chgPicBtn) {
				chgPicBtn.setVisible(false);
			}

			//Remove assignment button
			var chgAssignBtn = this.getView().byId("BankDetails--displayHeader--assignmentSwitchBtn");
			if (chgAssignBtn) {
				chgAssignBtn.setVisible(false);
			}

			//Rename Create Button

			var creatBtn = this.getView().byId("BankDetails--displayHeader--createRecordBtn");
			// creatBtn.setText("Add Account");

			var data2 = this._readPyUtil();
			var oDummyText;

			if (data2.d.ZpyLock === true) {
				//Payroll Lock
				oDummyText = new sap.m.MessageStrip({
					type: "Error",
					showIcon: true,
					text: "{i18nz>headerPyLkError}"
				}).addStyleClass("sapUiTinyMarginBegin");

			} else {
				var datev = data2.d.ZpyNextPydt.slice(4, 6) + "/" + data2.d.ZpyNextPydt.slice(6, 8) + "/" + data2.d.ZpyNextPydt.slice(0, 4);
				oDummyText = new sap.m.MessageStrip({
					enableFormattedText: true,
					showIcon: true,
					text: "{i18nz>headerEffDtInfo1} " + datev + " {i18nz>headerEffDtInfo2}"
				}).addStyleClass("sapUiTinyMarginBegin");
			}

			var oHBox = new sap.ui.layout.FixFlex("HBox1", {
				vertical: false
			}).addStyleClass("sapUiSmallMargin");

			// oHBox.addFixContent(oIcon);
			oHBox.addFixContent(oDummyText);
			dObjLayout.addHeaderContent(oHBox);

			// error when more than 4 banks.
			if (objPageTitle.getActions().length > 0) {

				var bd = this.getView().byId("BankDetails");
				creatBtn.detachPress(bd.onCreate, bd);
				var that = this;
				var customCreate = function customCreate(oEvent) {
					var data3 = that._readPyUtil();

					if (data3.d.ZpyMaxBanks === true) {
						var msg = i18nz.getProperty("maxBankError");
						sap.m.MessageBox.error(msg);
					} else {
						bd.onCreate();
					}

				};
				creatBtn.attachPress(customCreate);

			}

		}
	},
	_readPyUtil: function () {
		var oDModel = this.getView().getModel("MPYUTIL");
		var url = oDModel.sServiceUrl;
		var pernr = this.getView().getModel("local").getData().assignmentId;
		var path = url + "/PyDataUtil?Pernr='" + pernr + "'";
		var oJModel = new sap.ui.model.json.JSONModel();
		oJModel.loadData(path, "", false);
		return oJModel.getData();
	}

});