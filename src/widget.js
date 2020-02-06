import { defineHelper, toggleHelper, isHelper } from './util.js';

const listenForHighlight = ({ target }) => !isHelper(target) ? toggleHelper() : undefined;

const onLoad = () => {
	defineHelper();	
	let lastOnMouseUp = document.onmouseup || function() {}
	if(document.onmouseup){
		console.warn("highlightHelper: document.onmouseup declared before this script is run.")
	}
	document.onmouseup = function(e) {
		lastOnMouseUp(e);
		listenForHighlight(e);
	}
}
const lastOnLoad = window.onload || function() {}
window.onload = (e) => {
	lastOnLoad(e)
	onLoad(e)
}