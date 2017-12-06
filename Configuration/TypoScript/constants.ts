module.tx_gwpreisrechnertheme_mod1 {
	view {
		# cat=module.tx_gwpreisrechnertheme_mod1/file; type=string; label=Path to template root (BE)
		templateRootPath = EXT:gw_preisrechnertheme/Resources/Private/Backend/Templates/
		# cat=module.tx_gwpreisrechnertheme_mod1/file; type=string; label=Path to template partials (BE)
		partialRootPath = EXT:gw_preisrechnertheme/Resources/Private/Backend/Partials/
		# cat=module.tx_gwpreisrechnertheme_mod1/file; type=string; label=Path to template layouts (BE)
		layoutRootPath = EXT:gw_preisrechnertheme/Resources/Private/Backend/Layouts/
	}

	persistence {
		# cat=module.tx_gwpreisrechnertheme_mod1//a; type=string; label=Default storage PID
		storagePid =
	}

	settings {
		preisrechnerTmpl = EXT:Resources/Public/Templates/Preisrechner/preisrechner2017.html
	}
}
