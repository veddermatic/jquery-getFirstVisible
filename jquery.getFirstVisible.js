/* jquery.getVirstVisible
*
* copyright 2010 David Vedder
* Author: David Vedder
*/

/**
  * USAGE:
  * This plugin will watch a set of elements and whichever is the first visible
  * in the viewport, will either add a class to it, or execute a callback
  * function with the element that was "topmost" and the element that is now
  * "topmost" passed in.
  *
  * OPTIONS:
  * You can call the plugin in one of two ways, either by simply passing in a
  * selector string (ex: '#someWrapper p') or an object to override base options:
  *
  * watchSelector - (default: false) 
  *     - what elements should we keep track of?
  * activeClass - (default: 'topElement') 
  *     - what class should be added to the topmost element
  * showRatio - (default: 0.85) 
  *     - what percent of an element can be off-screen and still count as "visible" ? 
  *     - 0 = we are not "visible" once ANY part is offscreen. 
  *     - .5 = half of us can be off screen and we still count as "Visible"
  *     - 1 = as long as one pixel is onscreen, we are "visible"
  * padValue - (default: 0) 
  *     - padding value to force "top-most" to occurr this many px early (or late)
  *
  * EXAMPLES:
  *     Watch all DIVs inside #someElement with default values:
  *         jQuery().getFirstVisible('#someElement div');
  *         -or-
  *         jQuery().getFirstVisible({ watchSelector: '#someElement div' });
  *     
  *     Watch all P elements, and use the class "whoopy" on the top-most, and
  *     make it some onece something is half off-screen, we hilight the next:
  *         jQuery().getFirstVisible({
  *             watchSelector: 'p',
  *             activeClass: "whoopy",
  *             showRatio: 0.5
  *         });
  * 
  *     Watch DIVs inside things with the class 'watchMe', and add a stupid
  *     message to the top of the newly top-most DIV via a callback:
  *         jQuery().getFirstVisible({
  *             watchSelector: '.watchMe div',
  *             showRatio: 0.25,
  *             callback: function(oldTop, newTop) {
  *                 oldTop.find('.Hay').remove();
  *                 newTop.prepend('<h2 class="Hay">Oh Hay!</h2>');
*               }
  *         });
  */
(function (jQuery) {
    jQuery.fn.getFirstVisible = function (options) {
        var watchedEls, 
            prefs = {},  
            defaults = {
                watchSelector: false, 
                callback: false, // function to call on change, is passed (null, current hilighted el, el about to be hilighted)
                activeClass: 'topElement', // class to add to top-most element if we don't do a custom callback
                showRatio: 0.85, // 
                padValue: 0 // padding to get 'top most' to occur this many pixels early
            };
        if (typeof options === "string") {
            console.log("YOU ARE A STRING!!@!!");
            prefs = defaults;
            prefs.watchSelector = options;
        } else {
            prefs = jQuery.extend(defaults, options);
        }
        if (prefs.watchSelector) {
            watchedEls = jQuery(prefs.watchSelector);
            watchedEls.eq(0).addClass(prefs.activeClass);
            jQuery(window).scroll(function () {
                var currentActive, 
                    docTop = jQuery(window).scrollTop();
                if (prefs.callback) {
                    currentActive = jQuery('.' + prefs.activeClass); 
                }
                watchedEls.removeClass(prefs.activeClass).each(function () {
                    var el = jQuery(this), 
                        elTop = el.offset().top,
                        elHeight = el.outerHeight();
                    if (elTop + (elHeight * prefs.showRatio) - prefs.padValue > docTop) {
                        el.addClass(prefs.activeClass);
                        if (prefs.callback &&  watchedEls.index(el) !==  watchedEls.index(currentActive)) {
                            prefs.callback.call(null, currentActive, el);
                        }
                        return false;
                    }
                });
            });
        }
    };
}(jQuery));
