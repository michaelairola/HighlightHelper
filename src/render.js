import { define } from "hybrids"
import { HighlightHelper } from "./helper.js"
import { getPosition } from './position.js';

const Id = `highlight-helper-${`${Math.floor(Math.random()*(10**7))}`}`

let DEV_MODE = [ "localhost", "lvh.me" ].includes(window.location.hostname)
let DEBUG = false; DEBUG = DEV_MODE ? DEBUG : false;

export const defineHelper = () => {
	define(Id, HighlightHelper)
	createHelper()
}
const createHelper = () => {
	const helper = document.createElement(Id)
	helper.id = Id
	document.body.appendChild(helper)
	return helper
}
const getHelper = () => 
	document.querySelector(Id)
const showHelper = () => {
	let helper = getHelper();
	if (!helper) helper = createHelper();
	helper.show = getPosition();
}
const hideHelper = () => {
	let helper = getHelper();
	if(!helper) helper = createHelper
	helper.show = undefined;
}
	
export const toggleHelper = ({ target }) => {
	if (target.id == Id) return
	hideHelper()
	const text = window.getSelection().toString();
	if(text) showHelper()
}
