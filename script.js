import { html, renderById } from './html-template.js';

const TESTING = true;
const crowdPleaserId = "crowd-pleaser-6652982253"

const getSelection = () => {
	const x = window.getSelection();
	const text = x.toString();
	if(text) {
		const range = x.getRangeAt(0);

		const y = range.getBoundingClientRect();
		const { bottom, right, left, height, width, top } = y
		let crowdPleaser = document.getElementById(crowdPleaserId)
		console.log(right, left);
		crowdPleaser.style.width = width;
		crowdPleaser.style.height = height;
		crowdPleaser.style.top = bottom - 2 * height;
		crowdPleaser.style.left = right;
	}
}

window.onload = () => {
	document.onmouseup = getSelection
	let crowdPleaser = document.createElement("div");
	crowdPleaser.id = crowdPleaserId;
	crowdPleaser.style.position = "absolute";
	if(TESTING) { 
		// crowdPleaser.style.width = "10px";
		// crowdPleaser.style.height = "10px";
		crowdPleaser.style.border = "solid 2px red"
	}
	document.body.appendChild(crowdPleaser)
}