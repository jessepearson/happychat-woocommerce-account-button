// ==UserScript==
// @name         HC WC Account Button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a WC account button to HC
// @author       theonetheonlyjesse
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://*.happychat.io/*
// @updateURL    https://raw.githubusercontent.com/jessepearson/hc-wc-account-button/master/hc-wc-account-button.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

// Where the magic happens. 
function get_user_id() {

	// Look for the WP user ID.
    $( 'section.user-data-panel__items div.user-panel-items div.user-panel-items__item:first-child div.user-panel-items__item-content' ).each( function( message ) {

    	// Grab the user ID.
        var $user_id = $( this ).text();
        
        // Since this loops, remove existing button. 
        $( 'a.hcwcab_wpcom_user_id_button' ).remove();

        // Now add the button to access the WC account via WP ID. 
        $( 'section.user-data-panel__items div.user-panel-items' ).append( '<a class="user-data-panel__button button hcwcab_wpcom_user_id_button" target="_blank" href="https://woocommerce.com/wp-admin/?wpcom_user_id=' + $user_id + '">WooCommerce User Account</a>' );
    });
}

// Make the magic happen on load. 
$("body").on('DOMSubtreeModified', ".ReactVirtualized__Grid__innerScrollContainer", function() {
    get_user_id();
});

// Wave the magic wand every 5 seconds to make sure the button is up to date. 
window.setInterval( function() {
  get_user_id();
}, 5000);
