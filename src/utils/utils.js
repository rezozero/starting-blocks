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

export class Utils {

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

        let color = '#fff';
        if(typeof textColor !== 'undefined') color = textColor;

        console.log('%c   ', 'font-size:3px;');
        console.log('%c'+siteName, 'background:'+bgColor+'; color: '+color+'; font-size:14px; padding:5px 10px;');
        console.log('%c   ', 'font-size:3px;');

        if(creditsList !== null){
            let creditsLength = creditsList.length;
            if (creditsLength){
                for(let indexCredit = 0; indexCredit < creditsLength; indexCredit++) {
                    console.log(creditsList[indexCredit].name +' - '+creditsList[indexCredit].website);
                }
            }
        }

        if(thanksList !== null){
            let thanksLength = thanksList.length;
            if (thanksLength){
                console.log("-");
                console.log("Thanks to");
                for(let indexThanks = 0; indexThanks < thanksLength; indexThanks++) {
                    console.log(thanksList[indexThanks].name +' ('+thanksList[indexThanks].website+')');
                }
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
        const elStyle = $el.css(style);
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
            const posLastCar = el.className.length-1;
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
     * @param  {Number} decimal
     * @return {Number}
     */
    static getRandomNumber(min, max, decimal) {
        const result = Math.random() * (max - min) + min;

        if(typeof decimal !== 'undefined'){
            return Number(result.toFixed(decimal));
        }
        else return result;
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
                    const input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    const input = $(this);
                    if (input.val() === '' || input.val() == input.attr('placeholder')) {
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                }).blur();
                $('[placeholder]').parents('form').submit(function() {
                    $(this).find('[placeholder]').each(function() {
                        const input = $(this);
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
        let e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
    }

    /**
     * Get a css property with the vendor prefix.
     *
     * @param  {String} property the css property
     * @return {String}          the prefixed property
     */
    static prefixProperty(property){
        const prefixes = ['', 'ms', 'Webkit', 'Moz', 'O'];
        const numPrefixes = prefixes.length;
        const tmp = document.createElement("div");

        for(let i = 0; i < numPrefixes; i++) {
            let prefix = prefixes[i];
            property = prefix === '' ? property : property.charAt(0).toUpperCase() + property.substring(1).toLowerCase();
            const prop = prefix + property;

            if(typeof tmp.style[prop] != "undefined") {
                return prop;
            }
        }
    }


    /**
     * Gets normalized ratio of value inside range.
     *
     * from https://github.com/mout/mout/blob/master/src/math/norm.js
     *
     * @param  {Number} val
     * @param  {Number} min
     * @param  {Number} max
     * @return {Number}
     */
    static getNormRatio(val, min, max){
        if (val < min) return 0;
        if (val > max) return 1;

        return val === max ? 1 : (val - min) / (max - min);
    }
}
