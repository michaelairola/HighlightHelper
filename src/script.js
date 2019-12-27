const DEV_MODE = "{{ DEV_MODE }}";
const highlightHelperId = "{{ ID }}"
const ID = `${highlightHelperId}`

const InitialHighlightHelperStyles = {
	display: DEV_MODE ? "block" : "hidden",
	visibility: DEV_MODE ? "visible" : "hidden",
	// transition: "visibility 0s, opacity 0.5s linear",
	position: "absolute",
	width: "350px",
	height: "200px",
}


const getHelper = () => 
	document.getElementById(ID)

const getStyle = key => getHelper().style[key];
const getStyles = (...keys) => keys.reduce((values, key) => Object.assign(values, { [key]: getStyle(key) }), {})

const setStyle = (key, value) => 
	getHelper().style[key] = value;
const setStyles = values => 
	Object.keys(values).forEach(key => setStyle(key, values[key]));

const createHelperDiv = () => {
	let helper = document.createElement("div");
	helper.id = ID;
	document.body.appendChild(helper)
	setStyles(InitialHighlightHelperStyles)
	if(DEV_MODE) { 
		setStyles({ border: "solid 2px red" })
	}
}
const addStyle = () => {
	
}
const changeHelperVisibility = (visibility, display) => setStyles({ visibility, display})

const hideHelper = () => changeHelperVisibility("hidden", "none")
const showHelper = () => changeHelperVisibility("visible", "block")
const setHelperPosition = (top, left) => setStyles({ top, left })

const getSelectionRectangle = () => 
	document.getSelection().getRangeAt(0).getBoundingClientRect();

const setHelperToCorner = (key) => {
	const map = { 
		"bottom-right": [ 0, 0 ],
		"bottom-left":  [ 0, 1 ],
		"top-left":     [ 1, 0 ],
		"top-right":    [ 1, 1 ],
	}
	let helperStyles = getStyles("width", "height")
	const helperWidth = Number(helperStyles.width.replace("px", ""));
	const helperHeight = Number(helperStyles.height.replace("px", ""));
	let { right, bottom, width, height } = getSelectionRectangle()
	
	const [ lat, long ] = map[key];
	const left = right - long * (helperWidth + width);
	const top = bottom - lat * (helperHeight + height);
	setHelperPosition(top, left)
}

const listenForHighlight = () => {
	const x = window.getSelection();
	const text = x.toString();
	const { width } = getSelectionRectangle();
	console.log('hi:', width, document.body.clientWidth, Math.abs(width - document.body.clientWidth))
	if(text && Math.abs(width - document.body.clientWidth) > 20) {
		showHelper()
		setHelperToCorner("top-left")
	} else {
		hideHelper()
	}
}
const onLoad = () => {
	addStyle();
	createHelperDiv();		
	let lastOnMouseUp = document.onmouseup || function() {}
	if(document.onmouseup){
		console.warn("highlightHelper warning: document.onmouseup function has already been declared. this is the entrypoint function for HighlightHelper")
	}
	document.onmouseup = function() {
		lastOnMouseUp();
		listenForHighlight();
	}
}
const lastOnLoad = window.onload || function() {}
window.onload = function(e) {
	lastOnLoad(e)
	onLoad(e)
}
