/*
	In this file:
		Utilities
			- parseQueryStringToObject
			- parseStringToObject
			- get_browser
			- get_browser_version
		Prevent 'console' errors in old browsers
		Polyfills
			- Array.reduce
			- Array.indexOf
 */

if( whro === undefined ){ var whro = {}; }
if( typeof whro !== 'object' ){ alert('Dev Error: whro is not an object.'); }
 
whro.utilities = (function( window, document, undefined ){
	
	function parseQueryStringToObject(){
		var urlParams = {};
		(function () {
		    var e,
		        d = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); },
		        q = window.location.search.substring(1),
		        r = /([^&=]+)=?([^&]*)/g;

		    while (e = r.exec(q))
		       urlParams[d(e[1])] = d(e[2]);
		})();

		return urlParams;
	}
	
	
	function parseStringToObject(e){ 
		var t={};
		
		(function(){
			var n,
				r=function(e){
					return decodeURIComponent(e.replace(/\+/g," "))
				},
				i=/([^&=]+)=?([^&]*)/g;
			
			while( n=i.exec(e) ) t[r(n[1])] = r(n[2])
		})();
		
		return t;
	}
	
	//taken from http://stackoverflow.com/questions/5916900/detect-version-of-browser
	function get_browser(){
		var N=navigator.appName, ua=navigator.userAgent, tem;
		var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return M[0];
	}
	function get_browser_version(){
		var N=navigator.appName, ua=navigator.userAgent, tem;
		var M=ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
		M=M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];
		return M[1];
	}
	
	return {
		get_browser : get_browser,
		get_browser_version : get_browser_version,
		parseQueryStringToObject : parseQueryStringToObject,
		parseStringToObject:parseStringToObject
	}
})(this, this.document);


 
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


//Polyfills

//Array.reduce
//	IE8 doesn't have Array.reduce()
if( 'function' !== typeof Array.prototype.reduce ){
	Array.prototype.reduce = function( callback /*, initialValue*/ ) {
		'use strict';
		if ( null === this || 'undefined' === typeof this ) {
			throw new TypeError( 'Array.prototype.reduce called on null or undefined' );
		}
		if ( 'function' !== typeof callback ) {
			throw new TypeError( callback + ' is not a function' );
		}
		var t = Object( this ), len = t.length >>> 0, k = 0, value;
		if ( arguments.length >= 2 ) {
			value = arguments[1];
		} else {
			while ( k < len && ! k in t ) k++; 
			if ( k >= len )
				throw new TypeError('Reduce of empty array with no initial value');
			value = t[ k++ ];
		}
		for ( ; k < len ; k++ ) {
			if ( k in t ) {
				value = callback( value, t[k], k, t );
			}
		}
		return value;
	};
}

//Array.indexOf
//	IE8 doesn't have Array.indexOf()
if(!Array.prototype.indexOf){
	Array.prototype.indexOf = function (searchElement, fromIndex) {
		if ( this === undefined || this === null ) {
			throw new TypeError( '"this" is null or not defined' );
		}

		var length = this.length >>> 0; // Hack to convert object.length to a UInt32

		fromIndex = +fromIndex || 0;

		if (Math.abs(fromIndex) === Infinity) {
			fromIndex = 0;
		}

		if (fromIndex < 0) {
			fromIndex += length;
			if (fromIndex < 0) {
				fromIndex = 0;
			}
		}

		for (;fromIndex < length; fromIndex++) {
			if (this[fromIndex] === searchElement) {
				return fromIndex;
			}
		}

		return -1;
	};
}