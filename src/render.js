import { define } from "hybrids"
import { HighlightHelper } from "./helper.js"
// import { Options } from "./utils.js";

const Id = `highlight-helper-${`${Math.floor(Math.random()*(10**7))}`}`

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
	
export const toggleHelper = ({ target }) => {
	if (target.id == Id) return
	const helper = getHelper();
	helper.text = "";
	const text = window.getSelection().toString()
	requestAnimationFrame(() => helper.text = text)
}
