// ==UserScript==
// @name         HC WC Account Button
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds a WC account button to HC
// @author       theonetheonlyjesse
// @require      https://code.jquery.com/jquery-1.12.4.js
// @match        https://*.happychat.io/*
// @updateURL    https://raw.githubusercontent.com/jessepearson/hc-wc-account-button/master/hc-wc-account-button.js
// @grant        none
// ==/UserScript==

var $ = window.jQuery;

// === Detect messages and mark them as SSR ===================================================
function get_user_id() {
    $( 'section.user-data-panel__items div.user-panel-items div.user-panel-items__item:first-child div.user-panel-items__item-content' ).each( function( message ) {
        var $user_id = $(this).text();
        //console.log( $user_id );
        $( 'a.hcwcab_wpcom_user_id_button' ).remove();
        $( 'section.user-data-panel__items div.user-panel-items' ).append( '<a class="user-data-panel__button button hcwcab_wpcom_user_id_button" target="_blank" href="https://woocommerce.com/wp-admin/?wpcom_user_id=' + $user_id + '">WooCommerce User Account</a>' );
    });

}

// === Execute function on load ===================================================
$("body").on('DOMSubtreeModified', ".ReactVirtualized__Grid__innerScrollContainer", function() {
    get_user_id();
});

window.setInterval(function(){
  get_user_id();
}, 5000);
