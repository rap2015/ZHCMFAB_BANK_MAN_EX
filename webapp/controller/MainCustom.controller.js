sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.MainCustom", {

	extHookGetCustomEntityNameForVersionId: function (v) {
		// Place your hook implementation code here 
		var i18nz = this.getModel("i18nz");
		//Adding text element.
		var dObjLayoutId = this.createId("BankDetails--displayObjectPageLayout");
		var dObjLayout = this.byId(dObjLayoutId);
		var dObjLayoutC = dObjLayout.getHeaderContent();
		var objPageTitle = dObjLayout.getHeaderTitle();

		var i = 0,
			textAvail, aLength = dObjLayoutC.length;
		for (; i < aLength; i++) {
			if (dObjLayoutC[i].getId() === "HBox1") {
				textAvail = dObjLayoutC[i];
			var msgstrip, oDummyText1;
				msgstrip = dObjLayoutC[i].getFixContent()[0];
				var oJModel = new sap.ui.model.json.JSONModel();
				oJModel.loadData("/sap/opu/odata/sap/ZHPY_BANK_UTIL_SRV/PyData", "", false);
				var oData2 = oJModel.getData();
				var msgType = msgstrip.getType();
				var layout1;
				if (oData2.d.ZpyLock === true && msgType === "Information") {
					//remove info add error
					layout1 = msgstrip.getParent();
					layout1.removeAllFixContent();

					oDummyText1 = new sap.m.MessageStrip({
						type: "Error",
						enableFormattedText: true,
						showIcon: true,
						text: "{i18nz>headerPyLkError}"
					}).addStyleClass("sapUiTinyMarginBegin");
					layout1.addFixContent(oDummyText1);
				} else if (oData2.d.ZpyLock === false && msgType === "Error") {
					//remove error add info
					layout1 = msgstrip.getParent();
					layout1.removeAllFixContent();

					var datev1 = oData2.d.ZpyCurrPydt.slice(4, 6) + "/" + oData2.d.ZpyCurrPydt.slice(6, 8) + "/" + oData2.d.ZpyCurrPydt.slice(0, 4);
					oDummyText1 = new sap.m.MessageStrip({
						showIcon: true,
						text: "{i18nz>headerEffDtInfo1} " + datev1 + "." + " {i18nz>headerEffDtInfo2}"
					}).addStyleClass("sapUiTinyMarginBegin");
					layout1.addFixContent(oDummyText1);
				}	
				
			} else {
				dObjLayoutC[i].setVisible(false);
			}
		}
		if (!textAvail) {
			//Remove Picture Button
			var btnId = this.createId("BankDetails--displayHeader--changePictureBtn");
			var chgPicBtn = this.byId(btnId);
			if (chgPicBtn) {
				chgPicBtn.setVisible(false);
			}

			//Rename Create Button
			var cBtnId = this.createId("BankDetails--displayHeader--createRecordBtn");
			var creatBtn = this.byId(cBtnId);
			creatBtn.setText("Add Account");

			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/opu/odata/sap/ZHPY_BANK_UTIL_SRV/PyData", "", false);
			var oData = oModel.getData();
			var oDummyText;

			if (oData.d.ZpyLock === true) {
				//Payroll Lock
				oDummyText = new sap.m.MessageStrip({
					type: "Error",
					showIcon: true,
					text: "{i18nz>headerPyLkError}"
				}).addStyleClass("sapUiTinyMarginBegin");

			} else {
				var datev = oData.d.ZpyCurrPydt.slice(4, 6) + "/" + oData.d.ZpyCurrPydt.slice(6, 8) + "/" + oData.d.ZpyCurrPydt.slice(0, 4);
				oDummyText = new sap.m.MessageStrip({
					showIcon: true,
					text: "{i18nz>headerEffDtInfo1} " + datev + "." + " {i18nz>headerEffDtInfo2}"
				}).addStyleClass("sapUiTinyMarginBegin");
			}

			var oHBox = new sap.ui.layout.FixFlex("HBox1", {
				vertical: false
			}).addStyleClass("sapUiSmallMargin");

			// oHBox.addFixContent(oIcon);
			oHBox.addFixContent(oDummyText);
			dObjLayout.addHeaderContent(oHBox);

			// giving error more than 4 banks.
			if (objPageTitle.getActions().length > 0) {
				var funName = creatBtn.mEventRegistry.press[0].fFunction._sapui_handlerName;
				if (funName === "onCreate") {
					var bdid = this.createId("BankDetails");
					var bd = this.byId(bdid);
					creatBtn.detachPress(bd.onCreate, bd);

					var customCreate = function customCreate(oEvent) {
						var oModel1 = new sap.ui.model.json.JSONModel();
						oModel1.loadData("/sap/opu/odata/sap/ZHPY_BANK_UTIL_SRV/PyData", "", false);
						var oData1 = oModel1.getData();
						if (oData1.d.ZpyMaxBanks === true) {
							var msg = i18nz.getProperty("maxBankError");
							sap.m.MessageBox.error(msg);
						} else {
							bd.onCreate();
						}

					};
					creatBtn.attachPress(customCreate);
				}
			}

		}
	}

});