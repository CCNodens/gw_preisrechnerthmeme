<?php
defined('TYPO3_MODE') || die('Access denied.');

call_user_func(
    function()
    {

        if (TYPO3_MODE === 'BE') {

            \TYPO3\CMS\Extbase\Utility\ExtensionUtility::registerModule(
                'Vancado.GwPreisrechnertheme',
                'web', // Make module a submodule of 'web'
                'mod1', // Submodule key
                '', // Position
                [
                    'Theme' => 'index',
                    
                ],
                [
                    'access' => 'user,group',
                    'icon'   => 'EXT:gw_preisrechnertheme/Resources/Public/Icons/gw-logo90.png',
                    'labels' => 'LLL:EXT:gw_preisrechnertheme/Resources/Private/Language/locallang_mod1.xlf',
                ]
            );

        }

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addStaticFile('gw_preisrechnertheme', 'Configuration/TypoScript', 'Preisrechner Theme');

        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addLLrefForTCAdescr('tx_gwpreisrechnertheme_domain_model_theme', 'EXT:gw_preisrechnertheme/Resources/Private/Language/locallang_csh_tx_gwpreisrechnertheme_domain_model_theme.xlf');
        \TYPO3\CMS\Core\Utility\ExtensionManagementUtility::allowTableOnStandardPages('tx_gwpreisrechnertheme_domain_model_theme');

    }
);
