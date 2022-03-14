/*------------------------------------------------------------------------------

	ZOMBLER
	Writen by Alexander Momot
	https://www.zombler.com
	(c)2001-2021 Zombler Group

------------------------------------------------------------------------------*/

var curDev = false, fdone = new Array, fcall = new Array;

//------------------------------------------------------------------------------

function abi_resize() {
	let width = window.innerWidth,
	html = document.documentElement,
	dev1 = (width <= 480)? 'w1': (width <= 768)? 'w2': (width <= 1024)? 'w3': (width <= 1280)? 'w4': 'w5',
	dev2 = (width <= 768)? 'no-wide': 'wide',
	dev3 = (width <= 480)? 'small': (width <= 1024)? 'medium': 'large';
	if(dev1 != curDev) {
		html.classList.remove('w1', 'w2', 'w3', 'w4', 'w5', 'small', 'medium', 'large', 'wide', 'no-wide');
		html.classList.add(dev1, dev2, dev3);
		curDev = dev1;
	}
}

//------------------------------------------------------------------------------

async function checkWebp() {
	let WebP = new Image();
	WebP.onload = WebP.onerror = function() {
		let isOK = (WebP.height === 2);
		document.documentElement.classList.add((isOK)? 'webp': 'no-webp');
	}
	WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

window.addEventListener('DOMContentLoaded', function() {
		abi_resize();
		checkWebp();
		abi_done('dom');
});

window.addEventListener('resize', function() {abi_resize();}, true);
document.fonts.onloadingdone = function(e) {
	e.fontfaces.forEach(function(ff){
		if( ff['family']){
			let a = ff['family'].replace(/^"|"$/g, '').split(' ');
			if( a.length ){
				document.documentElement.classList.add('font-'+a[0].toLowerCase());
			}
		}
	});
}

//------------------------------------------------------------------------------

function loadScript(url, name, callback) {
	let elem = document.createElement('SCRIPT');
	elem.setAttribute('src', url);
	elem.addEventListener('load', function()
		{
			abi_done(name);
			if(typeof callback == 'function') {
				callback();
			}
		}
	);
	document.head.appendChild(elem);
}

//------------------------------------------------------------------------------

function abi_loaded(arr) {
	return arr.every(function(v)
		{
			return fdone.indexOf(v) >= 0;
		}
	)
}

//------------------------------------------------------------------------------

function abi_onload(name, func) {
	if(typeof func === 'function') {
		var mods = name.split(/(\s+)/).filter(e => e.trim().length > 0);
		if(abi_loaded(mods)) {
			func();
		}
		else {
			fcall.push([name, func]);
		}
	}
}

//------------------------------------------------------------------------------

function abi_done(name) {
	fdone.push(name);
	var c = fcall.length-1;
	while(c >= 0) {
		var item = fcall[c],
		mods = item[0].split(/(\s+)/).filter(e => e.trim().length > 0);
		if(abi_loaded(mods)) {
			fcall.splice(c, 1);
			item[1]();
		}
		c--;
	}
	if(name == 'body') document.documentElement.classList.remove('load');
}