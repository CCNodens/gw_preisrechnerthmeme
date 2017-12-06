

var nennwarmeArray = ['46569'];



TYPO3.jQuery(document).ready(function() {
	// Match Height
	//TYPO3.jQuery('.match-height').matchHeight();

	// Extend Accordion to add class 'active to panel-heading
	TYPO3.jQuery('.accordion .panel').on('show.bs.collapse', function() {
		TYPO3.jQuery(this).parent().find('.panel').removeClass('active');
		TYPO3.jQuery(this).addClass('active');
	});

	TYPO3.jQuery('.accordion .panel').on('hide.bs.collapse', function() {
		console.log(TYPO3.jQuery(this));
		TYPO3.jQuery(this).removeClass('active');
	});

	// CALCULATOR 
	// Make Tabs Work
	TYPO3.jQuery('ul.nav li').on('click', function(e) {
		var vpWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		if (vpWidth < 641) {
			if (TYPO3.jQuery(this).hasClass('active')) {
				TYPO3.jQuery('ul.nav li:not(.active)').toggle();
				TYPO3.jQuery(this).toggleClass('focus');
			} else {
				TYPO3.jQuery('ul.nav li').toggle().removeClass('focus');
				TYPO3.jQuery(this).toggle();
			}
		}
	});

	// Hover & Click for the Flatsize & Number of persons icons
	TYPO3.jQuery('.flatsize').hover(function(e) {
		var size = TYPO3.jQuery(this).data('size');
		var hlColor = TYPO3.jQuery(this).css('border-color');
		TYPO3.jQuery('svg symbol#icon-house-' + size + ' path').css('stroke', hlColor);
		TYPO3.jQuery('svg symbol#icon-house-' + size + ' path').css('fill', hlColor);
	}, function(e) {
		var size = TYPO3.jQuery(this).data('size');
		var color = TYPO3.jQuery(this).css('border-color');
		TYPO3.jQuery('svg symbol#icon-house-' + size + ' path').css('stroke', color);
		TYPO3.jQuery('svg symbol#icon-house-' + size + ' path').css('fill', color);
	});

	TYPO3.jQuery('.flatsize').click(function(e) {
		TYPO3.jQuery('.flatsize').removeClass('active');
		TYPO3.jQuery(this).addClass('active');
		var size = parseInt(TYPO3.jQuery(this).data('size'));
		TYPO3.jQuery('input#annualConsumptionGas').val(size * 162);
	});

	TYPO3.jQuery('.persons').click(function(e) {
		TYPO3.jQuery('.persons').removeClass('active');
		TYPO3.jQuery(this).addClass('active');
		var size = parseInt(TYPO3.jQuery(this).data('size'));
		var kwh = (size < 2) ? 2000 : (size < 3) ? 3100 : (size < 4) ? 4000 : (size < 5) ? 4800 : 5500;
		TYPO3.jQuery('input#annualConsumptionCurrent').val(kwh);
	});

	// Dropdown-selection for type of counter
	TYPO3.jQuery('.select-type.counter .select').on('click', function() {
		TYPO3.jQuery('.counter-types').toggleClass('hidden');
		TYPO3.jQuery('.heating-types').addClass('hidden');
	});

	TYPO3.jQuery('.select-type.counter .ws-col').on('click', function() {
		var ctype = TYPO3.jQuery(this).parent().data("counter-type");
		if (ctype != undefined) {
			TYPO3.jQuery('input#counter-type').val(TYPO3.jQuery(this).parent().data("counter-type"));
			TYPO3.jQuery('.select-type.counter .select .txt').html(TYPO3.jQuery(this).find(".txt .title").text() + '<br>' + TYPO3.jQuery(this).find('.txt .subtext').text()).addClass('filled');
			TYPO3.jQuery('.counter-types').addClass('hidden');
			showCounter();
			showStep2();
		}
	});

	// Dropdown-selection for type of heating
	TYPO3.jQuery('.select-type.heating .select').on('click', function() {
		TYPO3.jQuery('.heating-types').toggleClass('hidden');
		TYPO3.jQuery('.counter-types').addClass('hidden');
	});

	TYPO3.jQuery('.select-type.heating .option').on('click', function() {
		TYPO3.jQuery('input#heating-type').val(TYPO3.jQuery(this).data("heating-type"));
		TYPO3.jQuery('.select-type.heating .select').html(TYPO3.jQuery(this).text()).addClass('filled');
		TYPO3.jQuery('.heating-types').addClass('hidden');
		showStep2();
	});

	// Limit postcode-inputs to five chars
	TYPO3.jQuery('input.postcode').on('input', function() {
		var v = TYPO3.jQuery(this).val();
		if (v.length > 5) {
			TYPO3.jQuery(this).val(v.slice(0, -1));
		}
	});

	// Show / hide additional 'nennwarmebelastung' input field
	TYPO3.jQuery('.tab-pane#gas .inputField#postcode-gas input').on('input', function() {
		if (nennwarmeArray.indexOf(TYPO3.jQuery(this).val()) >= 0) {
			TYPO3.jQuery('.tab-pane#gas').addClass('nennwaerme');
		} else {
			TYPO3.jQuery('.tab-pane#gas').removeClass('nennwaerme');
		}
	});

	// Fallback for CSS-Blendmode
	if (TYPO3.jQuery('html').hasClass('no-mix-blend-mode')) {
		TYPO3.jQuery('.content-teaser.bg-image.blend').each(function(i) {
			var bgImg = TYPO3.jQuery(this).css('background-image');
			var bgClr = TYPO3.jQuery(this).css('background-color');
			var bgPos = TYPO3.jQuery(this).css('background-position');
			var bgRpt = TYPO3.jQuery(this).css('background-repeat');
			var bgSize = TYPO3.jQuery(this).css('background-size');
			bgClr = colorConvert(bgClr, -.5, .75);
			TYPO3.jQuery(this).css('background', 'linear-gradient(' + bgClr + ', ' + bgClr + '), ' + bgImg);
			TYPO3.jQuery(this).css('background-position', bgPos + ', ' + bgPos);
			TYPO3.jQuery(this).css('background-repeat', bgRpt + ', ' + bgRpt);
			TYPO3.jQuery(this).css('background-size', bgSize + ', ' + bgSize);
			TYPO3.jQuery(this).css('filter', 'brightness(120%) contrast(160%) saturate(80%)');
		});
	}

});

TYPO3.jQuery(window).resize(function() {
	resetNavTabs();
	//TYPO3.jQuery('.match-height').matchHeight();
});

function showCounter() {
	var n = parseInt(TYPO3.jQuery('input#counter-type').val());
	if (n > 0) {
		TYPO3.jQuery('.select-type.select-counter .title .icon').hide();
		if (n < 3) {
			TYPO3.jQuery('.select-type.select-counter .title .icon.counter-1').show();
			TYPO3.jQuery('.select-type.select-counter .title .icon.counter-' + (n + 1)).show();
		} else {
			TYPO3.jQuery('.select-type.select-counter .title .icon.counter-' + n).show();
		}
	}
}

function showStep2() {
	if (parseInt(TYPO3.jQuery('input#counter-type').val()) != 0 && parseInt(TYPO3.jQuery('input#heating-type').val()) != 0) {
		TYPO3.jQuery('.step-2').removeClass('hidden');
	}
}

function resetNavTabs() {
	TYPO3.jQuery('ul.nav li').removeAttr('style');
}

// Darken Color and add Alpha 
function colorConvert(color, percent, alpha) {
	var f = color.split(','), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent *-1 : percent, R = parseInt(f[0].slice(4)), G = parseInt(f[1]), B = parseInt(f[2]);
	color = "rgb(" + (Math.round((t - R) * p) + R) + "," + (Math.round((t - G) * p) + G) + "," + (Math.round((t - B) * p) + B) + ")";
	console.log(color);
	return color.replace(')', ', 0.75)').replace('rgb', 'rgba');
}

// Switch between Tabs and Accordion
!function ($) {

	// TABCOLLAPSE CLASS DEFINITION
	// ======================

	var TabCollapse = function (el, options) {
		this.options   = options;
		this.$tabs  = TYPO3.jQuery(el);

		this._accordionVisible = false; //content is attached to tabs at first
		this._initAccordion();
		this._checkStateOnResize();


		// checkState() has gone to setTimeout for making it possible to attach listeners to
		// shown-accordion.bs.tabcollapse event on page load.
		// See https://github.com/flatlogic/bootstrap-tabcollapse/issues/23
		var that = this;
		setTimeout(function() {
		  that.checkState();
		}, 0);
	};

	TabCollapse.DEFAULTS = {
		accordionClass: 'visible-sm visible-xs',
		tabsClass: 'hidden-sm hidden-xs',
		accordionTemplate: function(heading, groupId, parentId, active) {
			return  '<div class="panel panel-default">' +
					'   <div class="panel-heading">' +
					'      <h4 class="panel-title">' +
					'      </h4>' +
					'   </div>' +
					'   <div id="' + groupId + '" class="panel-collapse collapse ' + (active ? 'in' : '') + '">' +
					'       <div class="panel-body js-tabcollapse-panel-body">' +
					'       </div>' +
					'   </div>' +
					'</div>'

		}
	};

	TabCollapse.prototype.checkState = function() {
		if (this.$tabs.is(':visible') && this._accordionVisible){
			this.showTabs();
			this._accordionVisible = false;
		} else if (this.$accordion.is(':visible') && !this._accordionVisible){
			this.showAccordion();
			this._accordionVisible = true;
		}
	};

	TabCollapse.prototype.showTabs = function() {
		var view = this;
		this.$tabs.trigger($.Event('show-tabs.bs.tabcollapse'));

		var $panelHeadings = this.$accordion.find('.js-tabcollapse-panel-heading').detach();

		$panelHeadings.each(function() {
			var $panelHeading = TYPO3.jQuery(this),
			$parentLi = $panelHeading.data('bs.tabcollapse.parentLi');

			var $oldHeading = view._panelHeadingToTabHeading($panelHeading);

			$parentLi.removeClass('active');
			if ($parentLi.parent().hasClass('dropdown-menu') && !$parentLi.siblings('li').hasClass('active')) {
				$parentLi.parent().parent().removeClass('active');
			}

			if (!$oldHeading.hasClass('collapsed')) {
				$parentLi.addClass('active');
				if ($parentLi.parent().hasClass('dropdown-menu')) {
					$parentLi.parent().parent().addClass('active');
				}
			} else {
				$oldHeading.removeClass('collapsed');
			}

			$parentLi.append($panelHeading);
		});

		if (!TYPO3.jQuery('li').hasClass('active')) {
			TYPO3.jQuery('li').first().addClass('active')
		}

		var $panelBodies = this.$accordion.find('.js-tabcollapse-panel-body');
		$panelBodies.each(function(){
			var $panelBody = TYPO3.jQuery(this),
				$tabPane = $panelBody.data('bs.tabcollapse.tabpane');
			$tabPane.append($panelBody.contents().detach());
		});
		this.$accordion.html('');

		if(this.options.updateLinks) {
			var $tabContents = this.getTabContentElement();
			$tabContents.find('[data-toggle-was="tab"], [data-toggle-was="pill"]').each(function() {
				var $el = TYPO3.jQuery(this);
				var href = $el.attr('href').replace(/-collapse$/g, '');
				$el.attr({
					'data-toggle': $el.attr('data-toggle-was'),
					'data-toggle-was': '',
					'data-parent': '',
					href: href
				});
			});
		}

		this.$tabs.trigger($.Event('shown-tabs.bs.tabcollapse'));
	};

	TabCollapse.prototype.getTabContentElement = function() {
		var $tabContents = TYPO3.jQuery(this.options.tabContentSelector);
		if ($tabContents.length === 0) {
			$tabContents = this.$tabs.siblings('.tab-content');
		}
		return $tabContents;
	};

	TabCollapse.prototype.showAccordion = function() {
		this.$tabs.trigger($.Event('show-accordion.bs.tabcollapse'));

		var $headings = this.$tabs.find('li:not(.dropdown) [data-toggle="tab"], li:not(.dropdown) [data-toggle="pill"]'), view = this;
		$headings.each(function() {
			var $heading = TYPO3.jQuery(this),
				$parentLi = $heading.parent();
			$heading.data('bs.tabcollapse.parentLi', $parentLi);
			view.$accordion.append(view._createAccordionGroup(view.$accordion.attr('id'), $heading.detach()));
		});

		if (this.options.updateLinks) {
			var parentId = this.$accordion.attr('id');
			var $selector = this.$accordion.find('.js-tabcollapse-panel-body');
			$selector.find('[data-toggle="tab"], [data-toggle="pill"]').each(function() {
				var $el = TYPO3.jQuery(this);
				var href = $el.attr('href') + '-collapse';
				$el.attr({
					'data-toggle-was': $el.attr('data-toggle'),
					'data-toggle': 'collapse',
					'data-parent': '#' + parentId,
					href: href
				});
			});
		}

		this.$tabs.trigger($.Event('shown-accordion.bs.tabcollapse'));
	};

	TabCollapse.prototype._panelHeadingToTabHeading = function($heading) {
		var href = $heading.attr('href').replace(/-collapse$/g, '');
		$heading.attr({
			'data-toggle': 'tab',
			'href': href,
			'data-parent': ''
		});
		return $heading;
	};

	TabCollapse.prototype._tabHeadingToPanelHeading = function($heading, groupId, parentId, active) {
		$heading.addClass('js-tabcollapse-panel-heading ' + (active ? '' : 'collapsed'));
		$heading.attr({
			'data-toggle': 'collapse',
			'data-parent': '#' + parentId,
			'href': '#' + groupId
		});
		return $heading;
	};

	TabCollapse.prototype._checkStateOnResize = function() {
		var view = this;
		TYPO3.jQuery(window).resize(function() {
			clearTimeout(view._resizeTimeout);
			view._resizeTimeout = setTimeout(function() {
				view.checkState();
			}, 100);
		});
	};


	TabCollapse.prototype._initAccordion = function() {
		var randomString = function() {
			var result = "",
				possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
			for( var i=0; i < 5; i++ ) {
				result += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return result;
		};

		var srcId = this.$tabs.attr('id'),
			accordionId = (srcId ? srcId : randomString()) + '-accordion';

		this.$accordion = TYPO3.jQuery('<div class="panel-group accordion solid ' + this.options.accordionClass + '" id="' + accordionId +'"></div>');
		this.$tabs.after(this.$accordion);
		this.$tabs.addClass(this.options.tabsClass);
		this.getTabContentElement().addClass(this.options.tabsClass);
	};

	TabCollapse.prototype._createAccordionGroup = function(parentId, $heading){
		var tabSelector = $heading.attr('data-target'),
			active = $heading.data('bs.tabcollapse.parentLi').is('.active');

		if (!tabSelector) {
			tabSelector = $heading.attr('href');
			tabSelector = tabSelector && tabSelector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
		}

		var $tabPane = TYPO3.jQuery(tabSelector),
			groupId = $tabPane.attr('id') + '-collapse',
			$panel = TYPO3.jQuery(this.options.accordionTemplate($heading, groupId, parentId, active));
		$panel.find('.panel-heading > .panel-title').append(this._tabHeadingToPanelHeading($heading, groupId, parentId, active));
		$panel.find('.panel-body').append($tabPane.contents().detach())
			.data('bs.tabcollapse.tabpane', $tabPane);

		return $panel;
	};



	// TABCOLLAPSE PLUGIN DEFINITION
	// =======================

    TYPO3.jQuery.fn.tabCollapse = function (option) {
		return this.each(function () {
			var $this   = TYPO3.jQuery(this);
			var data    = $this.data('bs.tabcollapse');
			var options = TYPO3.jQuery.extend({}, TabCollapse.DEFAULTS, $this.data(), typeof option === 'object' && option);

			if (!data) $this.data('bs.tabcollapse', new TabCollapse(this, options));
		});
	};

    TYPO3.jQuery.fn.tabCollapse.Constructor = TabCollapse;


}(window.jQuery);

TYPO3.jQuery('#resTab').tabCollapse();

