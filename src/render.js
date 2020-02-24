import { define } from "hybrids"
import { HighlightHelper } from "./helper.js"

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
const showHelper = (text) => getHelper().show(text);
const hideHelper = () => getHelper().hide();
	
export const toggleHelper = ({ target }) => {
	if (target.id == Id) return
	hideHelper()
	const text = window.getSelection().toString();
	if(text) showHelper(text)
}
