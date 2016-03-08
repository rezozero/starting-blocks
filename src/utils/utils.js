/**
 * Copyright REZO ZERO 2016
 *
 *
 *
 * @file utils.js
 * @copyright REZO ZERO 2016
 * @author Maxime Bérard
 */
import $ from "jquery";

export default class Utils {

    /**
     * @param  {String} str
     * @return {String}
     */
    static stripTrailingSlash(str) {
        if(str.substr(-1) == '/') {
            return str.substr(0, str.length - 1);
        }
        return str;
    }

    /**
     * Log credits to console for code lovers.
     *
     * @param  {String} siteName
     * @param  {String} bgColor
     * @param  {Array}  creditsList
     * @param  {Array}  thanksList
     * @param  {String} textColor (optional)
     */
    static logCredits(siteName, bgColor, creditsList, thanksList, textColor){

        var color = '#fff';
        if(typeof textColor !== 'undefined') color = textColor;

        console.log('%c   ', 'font-size:3px;');
        console.log('%c'+siteName, 'background:'+bgColor+'; color: '+color+'; font-size:14px; padding:5px 10px;');
        console.log('%c   ', 'font-size:3px;');

        var creditsLength = creditsList.length;
        if (creditsLength){
            for(var indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                console.log(creditsList[indexCredit].name +' - '+creditsList[indexCredit].website);
            }
        }

        var thanksLength = thanksList.length;
        if (thanksLength){
            console.log("-");
            console.log("Thanks to");
            for(var indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                console.log(thanksList[indexThanks].name +' : '+thanksList[indexThanks].website);
            }
        }

        console.log("-");
        console.log(" ");
    }

    /**
     * Get style value.
     *
     * @param  {jQuery} element $el [element to check]
     * @param  {String} style
     * @return {mixed}
     */
    static getStyleVal($el, style){
        var elStyle = $el.css(style);
        return Math.round(Number(elStyle.substr(0, elStyle.length - 2)));
    }

    /**
     * Add class custom.
     *
     * @param {DOM object} el      [dom element]
     * @param {String} classToAdd  [class to add]
     */
    static addClass(el, classToAdd){
        if (el.classList) el.classList.add(classToAdd);
        else el.className += ' ' + classToAdd;
    }

    /**
     * Remove class custom.
     *
     * @param {DOM object} el
     * @param {String} classToRemove
     */
    static removeClass(el, classToRemove){
        if(el.classList) {
            el.classList.remove(classToRemove);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + classToRemove.split(' ').join('|') + '(\\b|$)', 'gi'), '');
            var posLastCar = el.className.length-1;
            if(el.className[posLastCar] == ' ') {
                el.className = el.className.substring(0, posLastCar);
            }
        }
    }

    /**
     * Get random number.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @return {Number}
     */
    static getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * Get random integer.
     *
     * @param  {Number} min [min value]
     * @param  {Number} max [max value]
     * @return {Number}
     */
    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Replace placeholder for browser that
     * do not support it.
     */
    static replacePlaceholder() {
        if (typeof Modernizr !== "undefined") {
            if(!Modernizr.input.placeholder){
                $('[placeholder]').focus(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                }).blur();
                $('[placeholder]').parents('form').submit(function() {
                    $(this).find('[placeholder]').each(function() {
                        var input = $(this);
                        if (input.val() == input.attr('placeholder')) {
                            input.val('');
                        }
                    });
                });
            }
        }
    }

    /**
     * Match CSS media queries and JavaScript window width.
     *
     * @see http://stackoverflow.com/a/11310353
     * @return {Object}
     */
    static getViewportSize() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }
}
