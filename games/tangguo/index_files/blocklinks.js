    /**
 * WARNING!!!
 *
 * The below code is tricky and hacky. It is meant as a temporary solution
 * to block outgoing links within HTML5 games. It is strongly adviced to not
 * use this script, unless you know exactly what you are doing.
 */
(function (w, d) {
    'use strict';
    var blockList = [508], // site IDs for which you'd like to block the outgoing links
        addEventListener = (function () {
            var overwrite;
            if (w.addEventListener) {
                overwrite = function (type, listener, element) {
                    element.addEventListener(type, listener, false);
                };
            } else if (w.attachEvent) {
                overwrite = function (type, listener, element) {
                    element.attachEvent('on' + type, listener);
                };
            }

            return overwrite;
        }()),
        preventDefault = function (e) {
            if (e.preventDefault) {
                e.preventDefault();
            }

            if (e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }

            if (e.stopPropagation) {
                e.stopPropagation();
            }

            if (e.stop) {
                e.stop();
            }

            e.returnValue = false;
            return false;
        },
        blockOutgoingLinks = function () {
            var nativeFunctions = {
                'createElement': d.createElement,
                'open': w.open
            };

            /**
             * Overwrite the native functions so we can intercept the calls to them
             */

            // func signature: window.open(strUrl, strWindowName[, strWindowFeatures]);
            d.createElement = function (tagName) {
                var elementFromMemory = nativeFunctions.createElement.apply(this, arguments);

                if (tagName && 'a' === tagName) {
                    addEventListener('click', function (e) {
                        preventDefault(e);
                    }, elementFromMemory);
                }

                return elementFromMemory;
            };

            // func signature: window.open(strUrl, strWindowName[, strWindowFeatures]);
            w.open = function () {
                // just don't do anything
            };
        },
        getUrlParam = function(paramName) {
            var keyvaluePairs = w.location.href.slice(w.location.href.indexOf('?') + 1).split('&'),
                pairsCount = keyvaluePairs.length,
                keyvalueArray,
                value,
                key,
                i;

            for (i = 0; i < pairsCount; i += 1) {
                keyvalueArray = keyvaluePairs[i].split('=');
                key = keyvalueArray[0];
                value = keyvalueArray[1];

                if (key === paramName) {
                    return decodeURIComponent(value);
                }
            }

            return null;
        },
        indexOf = [].indexOf||(function(a,b,c){for(c=this.length,b=(c+~~b)%c;b<c&&(!(b in this)||this[b]!==a);b++);return b^c?b:-1;}), //polyfill
        siteId = parseInt(getUrlParam('siteid'), 10);

    // check if we should block the outgoing links based on the site ID query string parameter
    if (siteId && indexOf.call(blockList, siteId) > -1) {
        blockOutgoingLinks();
    }
}(window, window.document));
