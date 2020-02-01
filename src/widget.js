import { createHelperDiv, showHelper, hideHelper } from './util.js';

const listenForHighlight = () => {
	hideHelper()
	const x = window.getSelection();
	const text = x.toString();
	if(text) setTimeout(() => showHelper(), 500);
}
const onLoad = () => {
	createHelperDiv();	
	hideHelper();
	let lastOnMouseUp = document.onmouseup || function() {}
	if(document.onmouseup){
		console.warn("highlightHelper warning: document.onmouseup function has already been declared. this is the entrypoint function for HighlightHelper")
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