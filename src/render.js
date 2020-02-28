import { define } from "hybrids"
import { HighlightHelper } from "./helper.js"
import { Options } from "./utils.js";
import { positionDebugger } from "./position.js"

const { debug } = Options;
const TIMESTAMP = Date.now();
const Id = `highlight-helper-${TIMESTAMP}`
const DebugId = `highlight-helper-debugger-${TIMESTAMP}`


export const defineHelper = () => {
	define(Id, HighlightHelper)
	if(debug) define(DebugId, positionDebugger)
}

const createElement = (name) => {
	let el = document.querySelector(name)
	if (!el){
		el = document.createElement(name)
		el.id = name
		document.body.appendChild(el)
	} 
	return el
}
const getHelper = () => createElement(Id)
const getDebugger = () => createElement(DebugId)

export const toggleHelper = ({ target }) => {
	if (target.id == Id) return
	const helper = getHelper();
	helper.text = "";
	const text = window.getSelection().toString()
	if(debug) getDebugger().show = false;
	requestAnimationFrame(() => {
		helper.text = text
		if(debug) getDebugger().show = true;
	})
}
