sap.ui.controller("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.controller.MainCustom", {

	extHookGetCustomEntityNameForVersionId: function (v) {
		// Place your hook implementation code here 
		var btnId = this.createId("BankDetails--displayHeader--changePictureBtn");
		var chgPicBtn = this.byId(btnId);
		chgPicBtn.setVisible(false);

		//Rename Create Button
		var cBtnId = this.createId("BankDetails--displayHeader--createRecordBtn");
		var creatBtn = this.byId(cBtnId);
		creatBtn.setText("Add Account");

		//Adding text element.
		var dObjLayoutId = this.createId("BankDetails--displayObjectPageLayout");
		var dObjLayout = this.byId(dObjLayoutId);
		var dObjLayoutC = dObjLayout.getHeaderContent();
		var textAvail = dObjLayoutC.find(function (ctrl, index) {
			if (ctrl.getId() === "HBox1") {
				return ctrl;
			} else {
				ctrl.setVisible(false);
			}
		});

		if (!textAvail) {
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/sap/opu/odata/sap/ZHPY_BANK_UTIL_SRV/PyData", "", false);
			var oData = oModel.getData();
			var oDummyText, oIcon;

			if (oData.d.ZpyLock === true) {
				//Payroll Lock
				oDummyText = new sap.m.MessageStrip({
					type: "Error",
					showIcon: true,
					text: "Payroll is in process, To make any changes please come back later"
				}).addStyleClass("sapUiTinyMarginBegin");
				// oIcon = new sap.ui.core.Icon({
				// 	src: "sap-icon://error",
				// 	width: "1rem",
				// 	color: "Negative"
				// });
			} else {
				var datev = oData.d.ZpyNextBegda.slice(4, 6) + "/" + oData.d.ZpyNextBegda.slice(6, 8) + "/" + oData.d.ZpyNextBegda.slice(0, 4);
				oDummyText = new sap.m.MessageStrip({
					showIcon: true,
					text: "Any changes that you make today will be effective from: " + datev
				}).addStyleClass("sapUiTinyMarginBegin");
				// oIcon = new sap.ui.core.Icon({
				// 	src: "sap-icon://message-information",
				// 	width: "1rem",
				// 	color: "Negative"
				// });
			}

			var oHBox = new sap.ui.layout.FixFlex("HBox1", {
				vertical: false
			}).addStyleClass("sapUiSmallMargin");

			// oHBox.addFixContent(oIcon);
			oHBox.addFixContent(oDummyText);
			dObjLayout.addHeaderContent(oHBox);

			// });

		}
		// giving error more than 4 banks.
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
						sap.m.MessageBox.error("You have already reached the max number of secondary banks i.e 4");
					} else {
						bd.onCreate();
					}

				};
				creatBtn.attachPress(customCreate);
			}
		//ObjectPage Header 
		// var oPHId = this.createId("BankDetails--displayHeader--mainPageHeaderTitle");
		// var oPHeader = this.byId(oPHId);
		//giving error more than 4 banks.
		// if (creatBtn.getVisible() === true) {
		// if (oPHeader.getActions().length >= 4) {
		// 	return;
		// } else {
		// 	function onDummyAdd(oEvent) {
		// 		new sap.m.MessageBox.error("You have already reached the max number of secondary banks i.e 4");
		// 	}
		// 	var oAdd2 = new sap.uxap.ObjectPageHeaderActionButton("Add2", {
		// 		text: "Add Account2",
		// 		type: "Emphasized",
		// 		hideText: false,
		// 		press: onDummyAdd,
		// 		visible: false
		// 	});
		// 	oPHeader.addAction(oAdd2);
		// }
		// }

	}

});