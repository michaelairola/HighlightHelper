import { defineHelperElement } from './helper-template.js'

const Id = `highlight-helper-${`${Math.floor(Math.random()*(10**7))}`}`
let helperWidth = 200;
let helperHeight = 100;

let DEV_MODE = [ "localhost", "lvh.me" ].includes(window.location.hostname)
let DEBUG = false; DEBUG = DEV_MODE ? DEBUG : false;

export const defineHelper = () => defineHelperElement(Id);

const getHelper = () => 
	document.querySelector(Id)

const getSelectionPos = () => {try{
	const { width, height, left, top, right, bottom } = document.getSelection().getRangeAt(0).getBoundingClientRect();
	return { found: true, width, height, left, top, right, bottom };
} catch(e) {
	return { found: false }
}}

const getAbsolutePosition = () => {try{
	const boundingRect = getSelectionPos();
	const { found, width, height } = boundingRect;
	const baseRect = document.body.getBoundingClientRect();
	const left = boundingRect.left - baseRect.left;
	const right = left + width;
	const top = boundingRect.top - baseRect.top;
	const bottom = top + height;
	return { found, left, top, width, height, right, bottom, };
} catch(e) {
	console.log("highlight-helper: error getting position:", e)
	return { found: false };
}}

const postionOfCorner = (key) => {
	const map = { 
		"bottom-right": [ 0, 0 ],
		"bottom-center":[ 0, 1 ],
		"bottom-left":  [ 0, 2 ],
		"top-right":    [ 1, 0 ],
		"top-center":   [ 1, 1 ],
		"top-left":     [ 1, 2 ],
	}

	let { found, right, bottom, width, height } = getAbsolutePosition()
	if(!found) return

	const [ lat, long ] = map[key];
	let left = right - long * (helperWidth + width) / 2;
	const offSet = long == 1 ? width/10 : width/5;
	left += long ? offSet : -1 * offSet; 
	let top = bottom - lat * (helperHeight + height);
	top += lat ? 0 : 10;
	return { top, left }
}

const getPosition = () => {
	const { right, width, height } = getAbsolutePosition();
	const { top } = getSelectionPos();
	const vertical = (0 <= top - helperHeight) ? "top" : "bottom";
	const horizontal = 
		(0 <= document.body.clientWidth - right - helperWidth) ? "right" : 
		(50 <= document.body.clientWidth - width) ? "left" : "center";
	return postionOfCorner(`${vertical}-${horizontal}`)
}

// const getQueryFromStr = (str, ...keys) => 
// 	keys.reduce((queries, k) => {
// 		const regex = new RegExp(`${k}=([^&]*)`)
// 		const matches = str.match(regex);
// 		const match = matches && matches.length > 1 ? decodeURI(matches[1]) : undefined
// 		queries = { ...queries, [k]: match }
// 		return queries
// 	}, {})

// const getScriptQueries = () => {
// 	const match = DEV_MODE ? "localhost" : "highlighthelper.com"
// 	const scripts = document.scripts;
// 	for(let i = 0; i < scripts.length; i ++) {
// 		const src = scripts[i].src;
// 		if(src && src.includes(match)) {
// 			return getQueryFromStr(src, "email", "BackgroundColor", "hi")
// 		}
// 	}
// }

const removeHelper = () => {
	const helper = getHelper();
	if(helper) {
		helper.remove()
	}
}
const showHelper = () => {
	let helper = getHelper();
	if(!helper) {
		const helper = document.createElement(Id)
		const { left, top } = getPosition();
		helper.top = top;
		helper.left = left;
		document.body.appendChild(helper)
	}
}
	
export const isHelper = (element) => element.id == Id

export const toggleHelper = () => {
	removeHelper()
	const text = window.getSelection().toString();
	if(text) showHelper()
}
