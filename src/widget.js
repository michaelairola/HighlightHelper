const DEV_MODE = "{{ DEV_MODE }}";
const highlightHelperId = "{{ ID }}"
const ID = `highlight-helper-${highlightHelperId}`

const InitialHighlightHelperStyles = {
	position: "absolute",
	border: "solid 2px grey",
	borderRadius: "5px",
	width: "200px",
	height: "100px",
	background: "#bbb",
}

const getHelper = () => 
	document.getElementById(ID)

const getStyle = key => getHelper().style[key];
const getStyles = (...keys) => keys.reduce((values, key) => Object.assign(values, { [key]: getStyle(key) }), {})

const setStyle = (key, value) => 
	getHelper().style[key] = value;

const setStyles = values => 
	Object.keys(values).forEach(key => setStyle(key, values[key]));

const createDiv = (id, initStyles) => {
	let div = document.createElement("div");
	Object.keys(initStyles).forEach(key => div.style[key] = initStyles[key])
	div.id = id;
	document.body.appendChild(div)
}
const createHelperDiv = () => createDiv(ID, InitialHighlightHelperStyles);
const addHelperClassDefs = () => {
	let style = document.createElement("style");
	const trans = `opacity .5s linear`
	style.innerHTML = `#${ID}.show{opacity:1;transition:${trans};-webkit-transition:${trans};-moz-transition:${trans};-ms-transition:${trans};-o-transition:${trans};}#${ID}.hide{opacity:0;top:0!IMPORTANT;left:0!IMPORTANT;width:0!IMPORTANT;height:0!IMPORTANT;}`
	document.head.appendChild(style)
}

const addClass = c => getHelper().classList.add(c)
const removeClass = c => getHelper().classList.remove(c)
const hideHelper = () => {
	removeClass("show")
	addClass("hide")
}
const showHelper = () => {
	removeClass("hide")
	addClass("show")
}
const setHelperPosition = (top, left) => setStyles({ top, left })

const getSelectionPos = () => {try{
	const { width, height, left, top, right, bottom } = 
		document.getSelection().getRangeAt(0).getBoundingClientRect();
	return { found: true, width, height, left, top, right, bottom };
} catch(e) {
	return { found: false }
}}

function getAbsolutePosition() {try{
	const boundingRect = getSelectionPos();
    const { found, width, height } = boundingRect;
    const baseRect = document.body.getBoundingClientRect();
    // const found = true;
    const left = boundingRect.left - baseRect.left;
    const right = left + width;
    const top = boundingRect.top - baseRect.top;
    const bottom = top + height;
    return { found, left, top, width, height, right, bottom, };
} catch(e) {
	console.log("highlight-helper: error getting position:", e)
	return { found: false };
}}
const setHelper = () => {
	let helperStyles = getStyles("width", "height")
	const helperWidth = Number(helperStyles.width.replace("px", ""));
	const helperHeight = Number(helperStyles.height.replace("px", ""));
	const { right, width, height } = getAbsolutePosition();
	const { top } = getSelectionPos();
	const vertical = (0 <= top - helperHeight) ? "top" : "bottom";
	const horizontal = (0 <= document.body.clientWidth - right - helperWidth) ? "right" : "left";
	setHelperToCorner(`${vertical}-${horizontal}`)
}

const setHelperToCorner = (key) => {
	const map = { 
		"bottom-right": [ 0, 0 ],
		"bottom-left":  [ 0, 1 ],
		"top-right":    [ 1, 0 ],
		"top-left":     [ 1, 1 ],
	}
	let helperStyles = getStyles("width", "height")
	const helperWidth = Number(helperStyles.width.replace("px", ""));
	const helperHeight = Number(helperStyles.height.replace("px", ""));
	let { found, right, bottom, width, height } = getAbsolutePosition()
	if(!found) return

	const [ lat, long ] = map[key];
	const offSet = 20;
	let left = right - long * (helperWidth + width) 
	left += long ? offSet : -1 * offSet; 
	let top = bottom - lat * (helperHeight + height);
	top += lat ? 0 : 10;
	setHelperPosition(top, left)
}

const setSelectionBorder = ({ height, width, top, left }) => {
	const selectionDiv = document.getElementById("highlight-helper-testing")
	selectionDiv.style.top = top;
	selectionDiv.style.height= height;
	selectionDiv.style.left = left;
	selectionDiv.style.width = width;
}

const listenForHighlight = () => {
	hideHelper()
	const x = window.getSelection();
	const text = x.toString();
	
	const position = getAbsolutePosition();
	// if(DEV_MODE) {
	// 	if(position.found) setSelectionBorder(position);
	// }
	if(text) {
		setTimeout(() => {
			setHelper();
			showHelper(); 
		},500);
	}
}
const onLoad = () => {
	addHelperClassDefs();	
	createHelperDiv();	
	// if(DEV_MODE) {
	// 	createDiv("highlight-helper-testing", { position: "absolute", border: "solid 2px red" })
	// }
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
window.onload = function(e) {
	lastOnLoad(e)
	onLoad(e)
}