import { defineHelper, toggleHelper } from './render.js';

(function() {
	defineHelper();	
	const lastOnMouseUp = document.onmouseup || function() {}
	if(document.onmouseup){
		console.warn("highlightHelper: document.onmouseup declared before this script is run.")
	}
	document.onmouseup = function(e) {
		lastOnMouseUp(e);
		toggleHelper(e);
	}
})()
