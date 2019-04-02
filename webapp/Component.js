jQuery.sap.declare("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.Component");

// use the load function for getting the optimized preload file if present
sap.ui.component.load({
	name: "hcm.fab.mybankdetails",
	// Use the below URL to run the extended application when SAP-delivered application is deployed on SAPUI5 ABAP Repository
	url: "/sap/bc/ui5_ui5/sap/HCMFAB_BANK_MAN"
		// we use a URL relative to our own component
		// extension application is deployed with customer namespace
});

this.hcm.fab.mybankdetails.Component.extend("hcm.fab.mybankdetails.ZHCMFAB_BANK_MAN_EX.Component", {
	metadata: {
		manifest: "json"
	}
});