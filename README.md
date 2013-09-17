jquery.getFirstVisible
===
by Dave Vedder


USAGE:
---
This plugin will watch a set of elements and whichever is the first visible in the viewport, will either add a class to it, or execute a callback function with the element that was "topmost" and the element that is now "topmost" passed in.

OPTIONS:
---
You can call the plugin in one of two ways, either by simply passing in a selector string (ex: `"#someWrapper p"`) or an object to override base options:

__watchSelector__:  _(default: false)_
what elements should we keep track of?

__activeClass__: _(default: 'topElement')_
what class should be added to the topmost element

__showRatio__: _(default: 0.85)_ 
what percent of an element can be off-screen and still count as "visible"?
 
- 0 = we are not "visible" once ANY part is offscreen. 
- .5 = half of us can be off screen and we still count as "Visible"
- 1 = as long as one pixel is onscreen, we are "visible"

__padValue__: _(default: 0)_
padding value to force "top-most" to occur this many px early (or late)

EXAMPLES:
---
Watch all DIVs inside #someElement with default values:

        jQuery().getFirstVisible('#someElement div');
_or_

        jQuery().getFirstVisible({ 
            watchSelector: '#someElement div'
        });
    
Watch all P elements, and use the class "whoopy" on the top-most, and make it so once something is half off-screen, we highlight the next:

        jQuery().getFirstVisible({
            watchSelector: 'p',
            activeClass: "whoopy",
            showRatio: 0.5
        });

Watch DIVs inside things with the class 'watchMe', and add a stupid message to the top of the newly top-most DIV via a callback:

        jQuery().getFirstVisible({
            watchSelector: '.watchMe div',
            showRatio: 0.25,
            callback: function(oldTop, newTop) {
                oldTop.find('.Hay').remove();
                newTop.prepend('<h2 class="Hay">Oh Hay!</h2>');
            }
       });

