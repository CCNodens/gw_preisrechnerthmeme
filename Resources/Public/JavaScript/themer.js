TYPO3.jQuery(document).ready(function () {
    var currentActiveTab = TYPO3.jQuery("#currentActiveTab").val();
    toggleDetailsByTab(currentActiveTab);
    var result = '';
    var inputId = '';
    var css = '';
    var PreviewBox = '';

    // in case of save action a result container is rendered by fluid
    if (TYPO3.jQuery('#resultContainer').length) {
        result = TYPO3.jQuery('#resultContainer').html();
        if (result.length) {

            try {

                TYPO3.jQuery("#resultContainer").dialog({
                                                            resizable: false,
                                                            modal: true,
                                                            width: 800,
                                                            buttons: [
                                                                {
                                                                    text: "Speichern",
                                                                    icon: "ui-icon-disk",
                                                                    click: function () {
                                                                        TYPO3.jQuery('#resultContainer').css({
                                                                                                                 "background-color": "darkblue",
                                                                                                                 "color": "white"
                                                                                                             });
                                                                        setClipboard(result);
                                                                        confirm('Theme-css wurde In die Zwischenablage kopiert');
                                                                        TYPO3.jQuery(this).dialog("close");
                                                                    }
                                                                },
                                                                {
                                                                    text: "Schließen",
                                                                    icon: "ui-icon-close",
                                                                    click: function () {
                                                                        TYPO3.jQuery(this).dialog("close");
                                                                    }
                                                                }
                                                            ]
                                                        });
            } catch (err) {
                TYPO3.jQuery("#themingInterfaceErrorBox").html(err.message).show();
            }

        }
    }

    TYPO3.jQuery('#editThemeForm input.colorPicker').each(function (e) {
        css = TYPO3.jQuery(this).val();
        inputId = TYPO3.jQuery(this).attr('id');
        var border = css;
        if (css == '#ffffff' || css == '#fff') {
            border = '#000000';
        }
        //happy little colored stripe on top of each colorpicker enabled input
        PreviewBox = '<div class="colorpicker-component input-group-addon" style="background-color:' + css + ';border:1px solid ' + border + ';"></div>';
        TYPO3.jQuery('#' + inputId).before(PreviewBox);
    });


    TYPO3.jQuery('#editThemeForm .colorPicker').on('click', function () {
        try {
            var inputId = TYPO3.jQuery(this).attr('id');
            var recentColor = inputId.val();
            console.log('id: ' + inputId);
            // wanted to keep input's recent value as kind of undo option
            if (TYPO3.jQuery('#' + inputId).hasClass('fullColors')) {
                TYPO3.jQuery('#' + inputId).colorpicker({
                                                            colorSelectors: {
                                                                'Voherige': recentColor
                                                            }
                                                        });
            }
        } catch (err) {
            TYPO3.jQuery("#themingInterfaceErrorBox").html(err.message).show();
        }
    });


        TYPO3.jQuery('#editThemeForm .form-control.colorPicker').colorpicker().on('changeColor', function (e) {
            var inputId = TYPO3.jQuery(this).attr('id');
            TYPO3.jQuery(this).parent().find('.input-group-addon').css('background-color', e.color.toHex());
            TYPO3.jQuery(this).attr('value', e.color);
        });


    TYPO3.jQuery('#resetButton').on('click', function (e) {
        e.preventDefault();
        if (confirm('Alle Änderungen verwerfen?')) {
            TYPO3.jQuery("#formaction").val('reset');
            TYPO3.jQuery('#editThemeForm').submit();
        }
    });

    var cl;
    TYPO3.jQuery('#detachButton').on('click', function (e) {
        e.preventDefault();
        cl = TYPO3.jQuery('.active .calContentLeft').detach();
        TYPO3.jQuery(this).hide();
    });


    // submit values to indexAction controller -> return css in lightbox
    TYPO3.jQuery('#compileButton').on('click', function (e) {
        e.preventDefault();
        TYPO3.jQuery("#formaction").val('save');
        TYPO3.jQuery('#editThemeForm').submit();
    });


    // calculator dummy: fake submit to show loader icon todo
    TYPO3.jQuery('btn.calculate.blind').on('click', function (e) {
        TYPO3.jQuery(this).closest('.fa.fa-spinner').show();
        TYPO3.jQuery('#error-box-global').show();
        e.preventDefault();
//console.log( TYPO3.jQuery(this).closest('.fa.fa-spinner').length);
    });

    // calculator dummy: tabnavigation
    TYPO3.jQuery('ul.nav.nav-tabs li').on('click', function () {
        var inputId = TYPO3.jQuery(this).data('target');
        toggleDetailsByTab(inputId);
    });

    // preview
    TYPO3.jQuery('#previewButton').on('click', function (e) {
       // e.preventDefault();
        var i = 0;
        TYPO3.jQuery('.colorPicker').each(function () {
            TYPO3.jQuery('#error-' + i).remove();
            var error = 'farbe?';
            var hexcolor = TYPO3.jQuery(this).val();

            var result = validColor(hexcolor);
                if (!result) {
                     TYPO3.jQuery(this).after('<span id="error-' + i + '">' + error + '</span>').attr({
                                                                                                         "aria-describedby": "error-'+i+'",
                                                                                                         "aria-invalid": "true"
                                                                                                     });
                    return false;

                }
            i++;
            console.log(hexcolor + ' ' + result);
        })
        var id = TYPO3.jQuery("#theme ul li.current.active").data('target');
        TYPO3.jQuery('#editThemeForm').submit();
    })

    function validColor(color) {
        var $div = $("<div>");
        if (!color) return false;
        $div.css("border", "1px solid " + color);
        return ($div.css("border-color") != "")
    }


});


function setClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function toggleDetailsByTab(target) {
    TYPO3.jQuery('#cfpower, #cfheat, #cfgas').hide();
    var tid = '#fatalError';
    if (target === '01') {
        tid = '#cfpower';
    }
    else
        if (target === '03') {
            tid = '#cfheat';
        }
        else
            if (target === '02') {
                tid = "#cfgas";
            }
    TYPO3.jQuery('#currentActiveTab').val(target);
    TYPO3.jQuery(tid).show();
}


function require(e) {
    return e;
}

