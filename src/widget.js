import { defineHelper, toggleHelper } from './util.js';

const onLoad = () => {
	defineHelper();	
	const lastOnMouseUp = document.onmouseup || function() {}
	if(document.onmouseup){
		console.warn("highlightHelper: document.onmouseup declared before this script is run.")
	}
	document.onmouseup = function(e) {
		lastOnMouseUp(e);
		toggleHelper(e)
	}
}
const lastOnLoad = window.onload || function() {}
window.onload = (e) => {
	lastOnLoad(e)
	onLoad(e)
}