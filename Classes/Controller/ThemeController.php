<?php

	namespace Vancado\GwPreisrechnertheme\Controller;

	/***
	 *
	 * This file is part of the "Preisrechner Theme" Extension for TYPO3 CMS.
	 *
	 * For the full copyright and license information, please read the
	 * LICENSE.txt file that was distributed with this source code.
	 *
	 *  (c) 2017
	 *
	 ***/

	/**
	 * ThemeController
	 */
	class ThemeController extends \TYPO3\CMS\Extbase\Mvc\Controller\ActionController {
		/**
		 * action index
		 *
		 * @return void
		 */
		public function indexAction() {

			$args                         = $this->request->getArguments();
			$this->settings['fontFamily'] = array(
				'Roboto Regular'   => 'Roboto Regular',
				'Roboto Medium'    => 'Roboto Medium',
				'Roboto Light'     => 'Roboto Light',
				'Roboto Condensed' => 'Roboto Condensed'
			);

			$this->settings['opacity'] = array(
				'0.1' => '0.1',
				'0.2' => '0.2',
				'0.3' => '0.3',
				'0.4' => '0.4',
				'0.5' => '0.5',
				'0.6' => '0.6',
				'0.7' => '0.7',
				'0.8' => '0.8',
				'0.9' => '0.9',
				'1.0' => '1.0'
			);

			$cssDefault = array(
				'power_act'                      => ' active',
				'cf_currentActiveTab'            => '01',
				'cf_input_act_dark_check'        => true,
				'cf_input_act_light_check'       => false,
				'cf_input_act_dark'              => ' active focus',
				'cf_background'                  => '#898d92',
				'cf_background_tabs'             => '#898d92',
				'cf_background_tabs_act'         => '#83878c',
				'cf_background_tabs_opacity'     => $this->settings['opacity']['0.9'],
				'cf_background_tabs_gradient'    => '#a2a2a2',
				'cf_font_headlines'              => '#dcdbd9',
				'cf_font'                        => '#ffffff',
				'cf_font_hover'                  => '#ffffff',
				'cf_input'                       => $this->settings['lightOrDark']['dark'],
				'cf_input_bgr'                   => '#dcdbd9',
				'cf_svg'                         => '#ffffff',
				'cf_power'                       => $this->settings['power']['primary'],
				'cf_power_hover'                 => $this->settings['power']['secondary'],
				'cf_heat'                        => $this->settings['heat']['primary'],
				'cf_heat_hover'                  => $this->settings['heat']['secondary'],
				'cf_heat_input_select_fontcolor' => $this->settings['lightOrDark']['dark'],
				'cf_heat_input_select'           => '#dcdbd9',
				'cf_heat_input_select_hover'     => '#eeedec',
				'cf_gas'                         => $this->settings['gas']['primary'],
				'cf_gas_hover'                   => $this->settings['gas']['secondary'],
				'cf_font_family_first'           => $this->settings['fontFamily']['Roboto Regular'],
				'cf_font_family_second'          => $this->settings['fontFamily']['Roboto Light'],
			);

			// in case of update or save create a
			if ( $args['formaction'] === 'update' || $args['formaction'] === 'save' ) {


				$runtimeCss = $cssDefault;
				// create a runtime css as a mix from default values and incoming arguments
				foreach ( $runtimeCss as $key => $val ) {
					if ( array_key_exists( $key, $args ) && $args[$key] !='' ) {
						$runtimeCss[ $key ] = $args[ $key ];
					} else {
						$runtimeCss[ $key ] ='';
					}
				}

				// create themes array after update/save
				$themes = array_filter($runtimeCss);

				// set active pane
				switch ( $args['cf_currentActiveTab'] ) {
					case'03':
						$themes['heat_act'] = ' active';
						break;
					case'02':
						$themes['gas_act'] = ' active';
						break;
					default:
						$themes['power_act'] = ' active';
						break;
				}

				// clumpsy handling of input radio status and color flavours (light/dark)
				if ( $args['cf_input_lightOrDarkFont'] == $this->settings['lightOrDark']['dark'] ) {
					$themes['cf_input_act_dark']        = ' active focus';
					$themes['cf_input_act_light']       = '';
					$themes['cf_input_act_dark_check']  = true;
					$themes['cf_input_act_light_check'] = false;

				} elseif ( $args['cf_input_lightOrDarkFont'] == $this->settings['lightOrDark']['light'] ) {
					$themes['cf_input']                 = $this->settings['lightOrDark']['light'];
					$themes['cf_input_act_light']       = ' active focus';
					$themes['cf_input_act_dark']        = '';
					$themes['cf_input_act_light_check'] = true;
					$themes['cf_input_act_dark_check']  = false;
				}

				// create inline css
				$themes['cssruntime'] = self::cssRuntime( $themes );

				// create additional theme css to persist
				if ( $args['formaction'] === 'save' ) {
					$themes['saveTextArea'] = true;
				}
			}


			else {
				// reset to default
				$themes               = $cssDefault;
				$themes['cssruntime'] = false;
				$themes['saveTextArea'] = false;

			}
			// fill selectors options from settings
			$themes['fontSelectors']   = $this->settings['fontFamily'];
			$themes['opacity']         = $this->settings['opacity'];
			$themes['canvasInlineCss'] = 'background-color:#fafafa;border:1px solid #ccc';
			// make acopy of args for easy debugging
			$themes['args'] = $args;
			$this->view->assign( 'themes', $themes );
		}

		/**
		 * action edit
		 *
		 * @param \Vancado\GwPreisrechnertheme\Domain\Model\Theme $theme
		 * @ignorevalidation $theme
		 *
		 * @return void
		 */
		public function editAction( \Vancado\GwPreisrechnertheme\Domain\Model\Theme $theme ) {
			$this->view->assign( 'theme', $theme );
		}

		/**
		 * action update
		 *
		 * @param \Vancado\GwPreisrechnertheme\Domain\Model\Theme $theme
		 *
		 * @return void
		 */
		public function updateAction( \Vancado\GwPreisrechnertheme\Domain\Model\Theme $theme ) {

		}

		protected function cssRuntime( $themes ) {
			$cssruntime = '
				.icon-house-icon,
				.icon-persons-icon,
				.tab-icon {
				   stroke: ' . $themes['cf_font'] . ';
				   fill: ' . $themes['cf_font'] . ';
				 }
				 ul.nav.nav-tabs.nav-justified > li:hover svg , 
				 .tab-icon:hover {
				   stroke: ' . $themes['cf_font_hover'] . ';
				   fill: ' . $themes['cf_font_hover'] . ';
				 }
				 .row.content-calculator .tab-content {
					background: ' . $themes['cf_background'] . ';
				}
				.row.content-calculator ul.nav li.active {
					background:' . $themes['cf_background_tabs_act'] . ';
				}
				.row.content-calculator ul.nav li a:hover {
					color: ' . $themes['cf_font_hover'] . ';
				} 
				.row.content-calculator ul.nav li {
					background: ' . $themes['cf_background_tabs'] . ';
					background: -moz-linear-gradient(left, ' . $themes['cf_background_tabs_gradient'] . ' 0%, ' . $themes['cf_background_tabs_gradient'] . ' 100%);
					background: -webkit-linear-gradient(left, ' . $themes['cf_background_tabs'] . ' 0%, ' . $themes['cf_background_tabs_gradient'] . ' 100%);
					background: linear-gradient(to right, ' . $themes['cf_background_tabs'] . ' 0%,  ' . $themes['cf_background_tabs_gradient'] . ' 100%);
					filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="' . $themes['cf_background_tabs'] . '", endColorstr="' . $themes['cf_background_tabs_gradient'] . '", GradientType=1);
					opacity:  ' . $themes['cf_background_tabs_opacity'] . ';
				} 
				.row.content-calculator .tab-content .tab-pane .calculatorContent p {
					font-family:' . $themes['cf_font_family_second'] . ', sans-serif!important;
					color: ' . $themes['cf_font'] . ';
				}
				.row.content-calculator .tab-content #gas.tab-pane ul li::before,
				.row.content-calculator .tab-content #current.tab-pane ul li::before,
				.row.content-calculator .tab-content #heat.tab-pane ul li::before,
				.row.content-calculator ul.nav li a,
				.row.content-calculator {
					font-family: ' . $themes['cf_font_family_first'] . ', sans-serif!important;
					content: "• ";
					color: ' . $themes['cf_font'] . ';
				}
				.row.content-calculator .tab-content #current.tab-pane input {
					border-bottom: 2px solid ' . $themes['cf_power'] . ';
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .numberOfPersons .persons:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .numberOfPersons .persons.active,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .persons:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .persons.active {
					border-color: ' . $themes['cf_power'] . ';
					background-color: ' . $themes['cf_power'] . ';
				}
				.select.title,
				.row.content-calculator .tab-content  input {
					background-color: ' . $themes['cf_input_bgr'] . '!important;
					color:' . $themes['cf_input'] . '!important;
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .counter-types,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .option,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .select,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .heating-types,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .counter-types .hhs-col,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .counter-types .ws-col {
				background-color: ' . $themes['cf_heat_input_select'] . '!important;
				color:' . $themes['cf_heat_input_select_fontcolor'] . '!important;
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .option:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .counter-types .ws-col:hover:not(.title) {
				background-color: ' . $themes['cf_heat_input_select_hover'] . '!important;
				color:' . $themes['cf_heat_input_select_fontcolor'] . '!important;
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .counter-types .ws-col .txt .subtext {
				color:' . $themes['cf_heat_input_select_fontcolor'] . '!important;
				}
				#current.tab-pane .inputField.button input,
				#sumbmitPower {
					background-color:' . $themes['cf_power'] . '!important;
				}
				.row.content-calculator .tab-content .tab-pane#current .inputField.button input:hover {
				background-color: ' . $themes['cf_power_hover'] . '!important;
				}
				#sumbmitPower:hover {
					border-color: ' . $themes['cf_power'] . ';
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent p {
					font-family:' . $themes['cf_font_family_second'] . ', sans-serif!important;
					color: ' . $themes['cf_font'] . ';
				}
				.row.content-calculator .tab-content  .tab-pane.active .calculatorContent  {
				color: ' . $themes['cf_font'] . '!important;
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .flatsize:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .flatsize.active {
					background-color: ' . $themes['cf_gas_hover'] . ';
					color:' . $themes['cf_gas_input'] . ';
				}
				#sumbmitGas {
					background-color: ' . $themes['cf_gas'] . ';
				}
				#sumbmitGas:hover {
				background-color: ' . $themes['cf_gas_hover'] . '!important;
				color: ' . $themes['cf_input'] . ';
				}
				#gas.tab-pane input {
				    border-bottom: 2px solid ' . $themes['cf_gas'] . ';
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .numberOfPersons .flatsize:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .numberOfPersons .flatsize.active,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .flatsize:hover,
				.row.content-calculator .tab-content .tab-pane .calculatorContent .flatSizes .flatsize.active {
					border-color: ' . $themes['cf_gas'] . ';
					background-color: ' . $themes['cf_gas'] . ';
				}
				.row.content-calculator .tab-content .tab-pane .calculatorContent .inputField label .select-type .select.title,
				.row.content-calculator .tab-content #heat.tab-pane input {
					border-bottom: 2px solid ' . $themes['cf_heat'] . ';
				}
				h2.title.h3 {
					color:' . $themes['cf_font_headlines'] . ';
					font-family:' . $themes['cf_font_family_second'] . ', sans-serif!important;
				}';

			return $cssruntime;
		}

	}
