import { define } from "hybrids"
import { HighlightHelper } from "./templates/helper.js"
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
const getHelper = () => {
	let helper = document.querySelector(Id)
	if (!helper) helper = createHelper();
	return helper
}
const showHelper = () => getHelper().show = getPosition();
const hideHelper = () => getHelper().hide();
	
export const toggleHelper = ({ target }) => {
	if (target.id == Id) return
	hideHelper()
	const text = window.getSelection().toString();
	if(text) showHelper()
}
