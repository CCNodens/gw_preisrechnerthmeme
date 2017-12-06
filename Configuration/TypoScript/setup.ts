config.additionalHeaders {
	10 {
		# The header string
		header = X-Frame-Options: ALLOW-FROM https://www.gelsenwasser.de
		# Do not replace previous headers with the same name.
		replace = 1
	}

	20 {
		header = Access-Control-Allow-Origin: https://www.gelsenwasser.de
		replace = 1
	}
}

# Module configuration
module.tx_gwpreisrechnertheme_web_gwpreisrechnerthememod1 {
	persistence {
		storagePid = {$module.tx_gwpreisrechnertheme_mod1.persistence.storagePid}
	}

	view {
		templateRootPaths.0 = EXT:gw_preisrechnertheme/Resources/Private/Backend/Templates/
		templateRootPaths.1 = {$module.tx_gwpreisrechnertheme_mod1.view.templateRootPath}
		partialRootPaths.0 = EXT:gw_preisrechnertheme/Resources/Private/Backend/Partials/
		partialRootPaths.1 = {$module.tx_gwpreisrechnertheme_mod1.view.partialRootPath}
		layoutRootPaths.0 = EXT:gw_preisrechnertheme/Resources/Private/Backend/Layouts/
		layoutRootPaths.1 = {$module.tx_gwpreisrechnertheme_mod1.view.layoutRootPath}
	}

	settings {
		preisrechnerTmpl = {$module.tx_gwpreisrechnertheme_mod1.settings.preisrechnerTmpl}
		lightOrDark.light = #efefef
		lightOrDark.dark = #424242
		power {
			primary = #01a427
			secondary = #015815
		}

		heat {
			primary = #01a427
			secondary = #01a422
		}

		gas {
			primary = #ffcc00
			secondary = #e6b800
		}
	}
}
