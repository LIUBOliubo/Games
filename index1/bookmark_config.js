/*
  Copyright 2010 Google Inc
  Copyright 2011 Takashi Okamoto

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

/** @fileoverview Example of how to use the bookmark bubble. */

/** Don't show the bubble if click dismiss button at 3 times. */
google.bookmarkbubble.Bubble.prototype.NUMBER_OF_TIMES_TO_DISMISS=3;

/** page to bookmark bubble (generally, this should be top page) */
/** page to bookmark bubble (generally, this should be top page) */
/* if(typeof(page_popup_bubble)=="undefined"){
  page_popup_bubble = "#index";
} */
var bubble;

window.addEventListener('load', bubbleloaded, false);

function bubbleloaded() {
  window.setTimeout(function() {
    bubble = new google.bookmarkbubble.Bubble();

    bubble.getViewportHeight = function() {
      return window.innerHeight;
    };

    bubble.getViewportScrollY = function() {
      return window.pageYOffset;
    };

    bubble.registerScrollHandler = function(handler) {
      window.addEventListener('scroll', handler, false);
    };

    bubble.deregisterScrollHandler = function(handler) {
      window.removeEventListener('scroll', handler, false);
    };

	if(bubble.isMobileSafari_() && !bubble.hasHashParameter()) {
		document.title = document.getElementsByName('apple-mobile-web-app-title')[0].content;
	}
	
    bubble.showIfAllowed();
  }, 1000 /** delay to show the bubble */ );
}